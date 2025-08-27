import requests
import time
from util import logger
from util.time import format_timestamp_to_pretty_local

MAX_RETRIES = 10

headers = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/115.0.0.0 Safari/537.36"
    ),
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9",
    "Referer": "https://www.google.com/"
}

def extract_post(post):
    return {
            "title": post["data"]["title"],
            "selftext": post["data"]["selftext"],
            "created": post["data"]["created_utc"],
            "name": post["data"]["name"],
            "num_comments": post["data"]["num_comments"],
            "upvotes": post["data"]["ups"]
        }

def getAfter(json):
    return json["data"]["after"]

def scrape(sub_reddit, stop_date):
    baseurl = "https://www.reddit.com/" + sub_reddit + "/new/.json"
    posts = []
    retries = 0
    i = 0
    after = ""
    running = True
    while running:
        if after:
            res = requests.get(baseurl + "?after=" + after, headers=headers)
        else:
            res = requests.get(baseurl, headers=headers) 

        if (res.status_code == 429):
            retries += 1
            if (retries > MAX_RETRIES):
                logger.critical("Too many retries - Breaking out")
                print("Too many retries - Breaking out")
                break
            else:
                logger.info("Iteration: " + str(i) + " Recieved 429 - Waiting for retry (" + str(retries) + "/" + str(MAX_RETRIES) + ")")

            time.sleep(30)
            continue

        if (res.status_code != 200):
            logger.critical("Iteration: " + str(i) + " Recieved " + str(res.status_code) + " - Breaking out")
            break
        
        retries = 0
        i += 1
        json = res.json()

        after = getAfter(json)
        if not after:
            running = False
            logger.warn("Attempted to set after to: " + str(after) + " scraper therefore stopped")
            break
        logger.debug("Set after to: " + str(after))
        for child in json["data"]["children"]:
            post = extract_post(child)
            if int(post["created"]) < stop_date:
                running = False
                break
            else:
                logger.debug("Current date: "+ format_timestamp_to_pretty_local(post["created"]) + " Stop date: " + format_timestamp_to_pretty_local(stop_date))
            posts.append(post)

    return posts
