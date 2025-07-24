import sys
from steps.scrape_sub_reddit import scrape
from steps.openai_extractor import classify
from util.db_link import set_pipeline_run_status, upload_extracted_row, finish_pipeline, upload_raw_reddit_row
import io
import os
import csv

# Constants
DATA_FOLDER = "pipeline-data"

# Use utf-8
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# Get arguments
n = len(sys.argv)
if n != 5:
    print("Error: Wrong amount of arguments")

pipeline_id = sys.argv[1]
pipeline_run_id = int(sys.argv[2])
sub_reddit = sys.argv[3]
timestamp_end = int(sys.argv[4])

# Tracking
additions = 0

# Begin
def step_scrape():
    set_pipeline_run_status(pipeline_run_id, "scraping")
    posts = scrape(sub_reddit, timestamp_end)

    try:
        with open(DATA_FOLDER + "/1-" + str(pipeline_run_id) + ".csv", "w", newline="", encoding="utf-8") as csvfile:
            fieldnames = ["title", "selftext", "created", "name", "num_comments", "upvotes"]
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames, quoting=csv.QUOTE_MINIMAL)
            writer.writeheader()
            writer.writerows(posts)
            print("Output in " + csvfile.name)
    except Exception as e:
            print("Failed to write rows")
            print(e)

def step_extraction():
    global additions
    if not os.path.isfile(DATA_FOLDER + "/1-" + str(pipeline_run_id) + ".csv"):
        raise Exception("Failed to find file csv file.")
    set_pipeline_run_status(pipeline_run_id, "extracting")
    with open(DATA_FOLDER + "/1-" + str(pipeline_run_id) + ".csv", encoding="utf-8") as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            classification = classify(row)
            if classification != None:
                id = upload_extracted_row(classification["problem"], classification["description"], row["created"])
                upload_raw_reddit_row(id, pipeline_run_id, row["name"], row["upvotes"], row["num_comments"])
                additions += 1
    

    





step_scrape()
step_extraction()
set_pipeline_run_status(pipeline_run_id, "finished")
finish_pipeline(pipeline_run_id, additions)