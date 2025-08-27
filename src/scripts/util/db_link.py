import psycopg2
import os
from datetime import datetime, timezone
from util import logger

connection = psycopg2.connect(database=os.environ.get("PGDATABASE"), user=os.environ.get("PGUSER"), password=os.environ.get("PGPASSWORD"), host=os.environ.get("PGHOST"), port=os.environ.get("PGPORT"))

cursor = connection.cursor()

def upload_raw_reddit_row(id, pipeline_run_id, name, ups, comments):
    cursor.execute("INSERT INTO raw_data (data_point_id, pipeline_run_id, scrape_method, reddit_name, reddit_ups, reddit_comments) VALUES (%s, %s, %s, %s, %s, %s)", (id, pipeline_run_id, "reddit", name, ups, comments))
    connection.commit()

def upload_extracted_row(problem, description, created_timestamp):
    cursor.execute("INSERT INTO data_points (problem, description, created) VALUES (%s, %s, %s) RETURNING id", (problem, description, datetime.fromtimestamp(float(created_timestamp), tz=timezone.utc)))
    connection.commit()
    record = cursor.fetchall()
    if len(record) != 1:
        logger.warn("multiple records in one upload: (record: " + str(record) + ") Returning first occurrence")
    return record[0][0]

def upload_embedding(data_point_id, embedding):
    cursor.execute("INSERT INTO metadata (data_point_id, problem_embedding) VALUES (%s, %s) ON CONFLICT (data_point_id) DO UPDATE SET problem_embedding = EXCLUDED.problem_embedding", (data_point_id, embedding))
    connection.commit()

def upload_links(links):
    for link in links:
        cursor.execute("INSERT INTO data_point_links (data_point_id_1, data_point_id_2, similarity) VALUES (%s, %s, %s)", (link["data_point_id_1"], link["data_point_id_2"], link["similarity"]))
    connection.commit()

def upload_actionability(data_point_id, actionability):
    cursor.execute("INSERT INTO metadata (data_point_id, actionability) VALUES (%s, %s) ON CONFLICT (data_point_id) DO UPDATE SET actionability = EXCLUDED.actionability", (data_point_id, actionability))
    connection.commit()    

def set_pipeline_run_status(pipeline_run_id, status):
    cursor.execute("UPDATE pipeline_runs SET status = %s WHERE id = %s", (status, pipeline_run_id))
    connection.commit()

def log(pipeline_run_id, text, level):
    cursor.execute("INSERT INTO pipeline_run_logs (pipeline_run_id, message, level) VALUES (%s, %s, %s)", [pipeline_run_id, text, level])
    connection.commit()

def finish_pipeline(pipeline_run_id, additions):
    cursor.execute("UPDATE pipeline_runs SET additions = %s, run_ended = %s WHERE id = %s", (additions, datetime.now(timezone.utc), pipeline_run_id))
    connection.commit()
