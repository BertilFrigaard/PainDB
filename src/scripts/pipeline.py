import sys
import traceback
from steps.scrape_sub_reddit import scrape
from steps.openai_extractor import classify
from steps.openai_embedder import embed
from util.db_link import set_pipeline_run_status, upload_extracted_row, finish_pipeline, upload_raw_reddit_row, upload_embedding
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
            fieldnames = ["data_point_id", "problem"]
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
                    writer.writerow({"data_point_id": id, "problem": classification["problem"]})
    
def step_embed():
    global scraped

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
            logger.status(f"Embedding row ({str(index)}/{str(scraped)})")
            embedding = embed(row["problem"])
            upload_embedding(row["data_point_id"], embedding)
    



try:
    logger.info("Starting Scraping")
    step_scrape()
    logger.info("Starting Extraction")
    step_extraction()
    logger.info("Starting Embedding")
    step_embed()
    logger.info("Finishing")
    finish_pipeline(pipeline_run_id, additions)
    set_pipeline_run_status(pipeline_run_id, "finished")
    logger.warn("Cleanup csv NOT IMPLEMENTED")
except Exception as e:
    error_msg = "".join(traceback.format_exception(type(e), e, e.__traceback__))
    logger.error(error_msg)
    logger.warn("Shutting down")
    set_pipeline_run_status(pipeline_run_id, "failed")