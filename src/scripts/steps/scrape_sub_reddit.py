import requests
import time

MAX_RETRIES = 10

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
            res = requests.get(baseurl + "?after=" + after)
        else:
            res = requests.get(baseurl) 

        if (res.status_code == 429):
            print("Iteration: " + str(i) + " Recieved 429 - Waiting for retry")
            retries += 1
            if (retries >= MAX_RETRIES):
                print("Too many retries - Breaking out")
                break
            time.sleep(30)
            continue

        if (res.status_code != 200):
            print("Iteration: " + str(i) + " Recieved " + str(res.status_code) + " - Breaking out")
            break
        
        retries = 0
        i += 1
        json = res.json()

        after = getAfter(json)
        for child in json["data"]["children"]:
            post = extract_post(child)
            if int(post["created"]) < stop_date:
                running = False
                break
            posts.append(post)

    return posts
