import json
from typing import List
import openai
import os
import re

openai.api_key = os.getenv("OPENAI_API_KEY")

def embed(problem):
    response = openai.embeddings.create(input=problem, model="text-embedding-3-small")
    return response.data[0].embedding