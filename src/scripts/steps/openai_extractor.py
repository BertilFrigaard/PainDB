import json
from typing import List
import openai
import os
import re

openai.api_key = os.getenv("OPENAI_API_KEY")

MODEL = "gpt-4o-mini"

SYSTEM_PROMPT = """You are an AI that extracts specific pain points from Reddit posts.

A pain point is a real, concrete problem, obstacle, or unmet need the author is currently experiencing and clearly expressing.

You must be absolutely certain that a specific problem is being described. If there is any ambiguity, lack of clarity, or if the post is reflective, vague, or general — return false.

For each post, return one JSON object like this:
{ "ok": true/false, "problem": "", "description": "" }

Only return a JSON list of results in the same order as the input posts.
"""

def classify(post):
    user_prompt = f"""
                        Title: {post["title"]}
                        Body: {post["selftext"]}

                        If a pain point is present, return this format:

                        {{ "ok": true, "problem": "...", "description": "..." }}

                        Otherwise return:

                        {{ "ok": false }}

                        Always return JSON
                    """
    try:
        response = openai.chat.completions.create(model=MODEL, messages=[
            {
                "role": "system",
                "content": SYSTEM_PROMPT
            },
            {
                "role": "user",
                "content": user_prompt
            }
        ])
        match = re.search(r'\{.*\}', response.choices[0].message.content, re.DOTALL)
        if not match:
            return None
        else:
            jsonRes = json.loads(match.group())
            if (jsonRes.get("ok", "") == True or jsonRes.get("ok", "") == "true"):
                output_row = {
                    "problem": jsonRes.get("problem", ""),
                    "description": jsonRes.get("description", "")
                }
                return output_row
        
    except:
        print("Something went wrong")
    return None