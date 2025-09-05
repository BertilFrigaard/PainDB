import requests
import time
from util import logger
from util.time import format_timestamp_to_pretty_local
import os

MAX_RETRIES = 10

token = ""

agent = "PainDBScraper/0.1 by u/PainDB"

def updateToken():
    global token
    auth = requests.auth.HTTPBasicAuth(os.getenv("REDDIT_CLIENT_ID"), os.getenv("REDDIT_CLIENT_SECRET"))
    data = {
        "grant_type": "client_credentials",
    }
    headers = {"User-Agent": agent}
    res = requests.post("https://www.reddit.com/api/v1/access_token", auth=auth, data=data,headers=headers, timeout=30)
    if res.status_code == 200:
        logger.info("Updated access token")
        token = res.json()["access_token"]
        return True
    else:
        logger.critical("Auth endpoint returned status code " + str(res.status_code))
        return False

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
    print(sub_reddit)
    baseurl = "https://oauth.reddit.com/" + sub_reddit + "/new"
    posts = []
    retries = 0
    i = 0
    after = ""
    running = True

    if not token:
        updateToken()
    
    while running:
        headers = {
            "User-Agent": "PainDBScraper/0.1 by u/PainDB",
            "Authorization": f"bearer {token}",
            }
        if after:
            res = requests.get(baseurl + "?after=" + after + "&limit=100", headers=headers)
        else:
            res = requests.get(baseurl + "?limit=100", headers=headers) 

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

        if (res.status_code == 401 or res.status_code == 403):
            if (updateToken()):
                continue
            else:
                break

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
                logger.debug("Ended " + str(post["created"]) + " " + str(stop_date))
                running = False
                break
            else:
                logger.debug("Current date: "+ format_timestamp_to_pretty_local(post["created"]) + " Stop date: " + format_timestamp_to_pretty_local(stop_date))
            posts.append(post)

    return posts
