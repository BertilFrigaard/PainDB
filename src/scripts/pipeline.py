import sys
import traceback
from steps.scrape_sub_reddit import scrape
from steps.openai_extractor import classify
from steps.openai_embedder import embed
from steps.openai_analyzer import analyze
from util.db_link import set_pipeline_run_status, upload_extracted_row, finish_pipeline, upload_raw_reddit_row, upload_embedding, upload_actionability
from util import logger
import io
import os
import csv

# Constants
DATA_FOLDER = "pipeline-data"

# Use utf-8 and flush for each print
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', line_buffering=True)

# Get arguments
pipeline_id = sys.argv[1]
pipeline_run_id = int(sys.argv[2])
sub_reddit = sys.argv[3]
timestamp_end = int(sys.argv[4])

# Setup logging
logger.set_pipeline_run_id(pipeline_run_id)

# Tracking
additions = 0
scraped = 0

# Begin
def step_scrape():
    global scraped
    # Update status
    set_pipeline_run_status(pipeline_run_id, "scraping")

    posts = scrape(sub_reddit, timestamp_end)

    scraped = len(posts)

    logger.info("Scraped " + str(scraped) + " posts")

    with open(DATA_FOLDER + "/1-" + str(pipeline_run_id) + ".csv", "w", newline="", encoding="utf-8") as csvfile:
        fieldnames = ["title", "selftext", "created", "name", "num_comments", "upvotes"]
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames, quoting=csv.QUOTE_MINIMAL)
        writer.writeheader()
        writer.writerows(posts)
        print("Output in " + csvfile.name)

def step_extraction():
    global additions, scraped

    # Ensure file exists
    if not os.path.isfile(DATA_FOLDER + "/1-" + str(pipeline_run_id) + ".csv"):
        raise Exception("Failed to find csv file.")
    
    # Update status
    set_pipeline_run_status(pipeline_run_id, "extracting")

    # Open file to read from
    with open(DATA_FOLDER + "/1-" + str(pipeline_run_id) + ".csv", encoding="utf-8") as csvfile:
        reader = csv.DictReader(csvfile)

        # Open file to write to
        with open(DATA_FOLDER + "/2-" + str(pipeline_run_id) + ".csv", "w", newline="", encoding="utf-8") as csvfile2:

            # Write header
            fieldnames = ["data_point_id", "problem", "description"]
            writer = csv.DictWriter(csvfile2, fieldnames=fieldnames, quoting=csv.QUOTE_MINIMAL)
            writer.writeheader()

            # Tracking
            index = 0

            # Start Extracting
            for row in reader:
                index += 1
                logger.status(f"Extracting row ({str(index)}/{str(scraped)})")
                classification = classify(row)
                if classification != None:
                    id = upload_extracted_row(classification["problem"], classification["description"], row["created"])
                    upload_raw_reddit_row(id, pipeline_run_id, row["name"], row["upvotes"], row["num_comments"])
                    additions += 1
                    
                    #Write the row
                    writer.writerow({"data_point_id": id, "problem": classification["problem"], "description": classification["description"]})
    
def step_embed():
    global additions

    # Ensure file exists
    if not os.path.isfile(DATA_FOLDER + "/2-" + str(pipeline_run_id) + ".csv"):
        raise Exception("Failed to find csv file.")
    
    # Update status
    set_pipeline_run_status(pipeline_run_id, "embedding")

    # Open file to read from
    with open(DATA_FOLDER + "/2-" + str(pipeline_run_id) + ".csv", encoding="utf-8") as csvfile:
        reader = csv.DictReader(csvfile)
        index = 0
        for row in reader:
            index += 1
            logger.status(f"Embedding row ({str(index)}/{str(additions)})")
            embedding = embed(row["problem"])
            upload_embedding(row["data_point_id"], embedding)
    
def step_analyze():
    global scraped

    # Ensure file exists
    if not os.path.isfile(DATA_FOLDER + "/2-" + str(pipeline_run_id) + ".csv"):
        raise Exception("Failed to find csv file.")
    
    # Update status
    set_pipeline_run_status(pipeline_run_id, "analyzing")

    # Open file to read from
    with open(DATA_FOLDER + "/2-" + str(pipeline_run_id) + ".csv", encoding="utf-8") as csvfile:
        reader = csv.DictReader(csvfile)
        index = 0
        for row in reader:
            index += 1
            logger.status(f"Analyzing row ({str(index)}/{str(additions)})")
            value = analyze(row["problem"], row["description"])
            if value is not None:
                upload_actionability(row["data_point_id"], value)
                pass

def step_cleanup():
    set_pipeline_run_status(pipeline_run_id, "cleanup")
    if os.path.exists(DATA_FOLDER + "/1-" + str(pipeline_run_id) + ".csv"):
        os.remove(DATA_FOLDER + "/1-" + str(pipeline_run_id) + ".csv")
        logger.debug("Remove file: " + DATA_FOLDER + "/1-" + str(pipeline_run_id) + ".csv")
    else:
        logger.warn("Could not remove file: " + DATA_FOLDER + "/2-" + str(pipeline_run_id) + ".csv" + " (Not Found)")

    if os.path.exists(DATA_FOLDER + "/2-" + str(pipeline_run_id) + ".csv"):
        os.remove(DATA_FOLDER + "/2-" + str(pipeline_run_id) + ".csv")
        logger.debug("Remove file: " + DATA_FOLDER + "/2-" + str(pipeline_run_id) + ".csv")
    else:
        logger.warn("Could not remove file: " + DATA_FOLDER + "/2-" + str(pipeline_run_id) + ".csv" + " (Not Found)")

"""     
    FOR FUTURE DEBUGGING 

    logger.debug("TESTING")
    logger.debug("TESTING")
    logger.debug("TESTING")
    rows = [["Lack of enthusiasm in college path chosen due to parental pressure.", "The author feels coerced into pursuing software engineering and AI due to their father's expectations, leading to a loss of enthusiasm for their studies. Parental influence on career choices stifles the author's desire to explore game design, causing internal conflict about their future and happiness."], ["Limited budget for app promotion", "The author wants to promote their newly launched health app but has a limited budget, making it difficult to explore traditional advertising methods like paid ads and influencer marketing."], ["Lack of available service technicians for agricultural needs.", "The author struggles to find reliable workers for essential services like tire repair and equipment maintenance due to an overwhelming demand for these jobs, which go unfilled because few are willing to pursue these practical opportunities."], ["Pressure to let stepsister live rent-free in my apartment.", "The author is facing pressure from her stepdad and mom to accommodate her stepsister, who has been entitled and has no regard for personal boundaries. The author is struggling with guilt over asserting her right to privacy and independence."]]
    for i in rows:
        value = analyze(i[0], i[1])
        logger.info("Row (" + i[0] + "; " + i[1] + ") returned " + str(value))
    logger.debug("TESTING")
    logger.debug("TESTING")
    logger.debug("TESTING")
 """

try:
    logger.info("Starting Scraping")
    step_scrape()
    logger.info("Starting Extraction")
    step_extraction()
    logger.info("Starting Embedding")
    step_embed()
    logger.info("Starting Analyzing")
    step_analyze()
    logger.info("Starting cleanup")
    step_cleanup()
    logger.info("Finishing")
    set_pipeline_run_status(pipeline_run_id, "finished")
    finish_pipeline(pipeline_run_id, additions)
except Exception as e:
    error_msg = "".join(traceback.format_exception(type(e), e, e.__traceback__))
    logger.error(error_msg)
    logger.warn("Shutting down")
    set_pipeline_run_status(pipeline_run_id, "failed")