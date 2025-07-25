import json
import traceback
from typing import List
from util import logger
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

SYSTEM_PROMPT_2 = """You are an AI that identifies and extracts concrete, specific pain points from Reddit posts.

A pain point is a real, clearly expressed problem, obstacle, or unmet need that the author is currently experiencing. 

You must be absolutely certain a specific, real problem is being described. If the post is vague, reflective, speculative, or lacks a clearly articulated issue — return false.

For each post, return a JSON object in this format:
{ "ok": true/false, "problem": "", "description": "" }

- "problem" is a short, precise summary of the core issue. Include only the context strictly necessary to understand the problem.
- "description" provides a slightly more detailed explanation or interpretation of the issue — still concise, but with a bit more nuance (e.g. cause/effect, conditions, consequences).

Always return a JSON array of results in the same order as the input posts."""

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
    user_prompt_2 = f"""Given the following Reddit post:

Title: {post["title"]}
Body: {post["selftext"]}

Determine whether the post contains a clearly stated, specific pain point.

If yes, return:
{{
  "ok": true,
  "problem": "[A short and precise summary of the main problem. Only include context that is strictly necessary.]",
  "description": "[A slightly more detailed but still concise explanation of the problem. Add nuance if available, such as cause, consequence, or clarifying conditions.]"
}}

If no specific or clearly described problem is present, return:
{{ "ok": false }}

Always return valid JSON."""
    try:
        response = openai.chat.completions.create(model=MODEL, messages=[
            {
                "role": "system",
                "content": SYSTEM_PROMPT_2
            },
            {
                "role": "user",
                "content": user_prompt_2
            }
        ])
        match = re.search(r'\{.*\}', response.choices[0].message.content, re.DOTALL)
        if not match:
            logger.warn("The following ai output did not match JSON regex: " + response)
            return None
        else:
            jsonRes = json.loads(match.group())
            if (jsonRes.get("ok", "") == True or jsonRes.get("ok", "") == "true"):
                output_row = {
                    "problem": jsonRes.get("problem", ""),
                    "description": jsonRes.get("description", "")
                }
                return output_row
            else:
                logger.info("AI extraction returned no problem")
        
    except Exception as e:
        error_msg = "".join(traceback.format_exception(type(e), e, e.__traceback__))
        logger.error(error_msg)
    return None