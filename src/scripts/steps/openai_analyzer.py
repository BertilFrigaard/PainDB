import traceback
import openai
import os
from util import logger

openai.api_key = os.getenv("OPENAI_API_KEY")

MODEL = "gpt-4o-mini"

SYSTEM_PROMPT_OLD = """Your job is to asign a score to a problem statement. 
output ONE whole number between 0 and 100 representing how actionable the problem is.

Actionable means that a product can be made to solve to problem.

A low score means the problem is unclear and, very hard to solve, mostly emotional.
A high score means the problem is clear and real with a clear path to solution.

You are a strict scorer. Given a problem statement (and optional description),

ONLY output ONE whole number between 0 and 100 representing how actionable the problem is.
"""

SYSTEM_PROMPT_OLD_2 = """
Your job is to asign a score to a problem statement.
Output ONE whole number between 0 and 100 representing how actionable the problem is.

A actionable problem is solvable by a product or a service.

A low score means the problem is unclear, very hard to solve.
A high score means the problem is clear, real and easy solvable by a product or a service.

Also note that by product or a service I mean future ones, not so much current ones.

ONLY output ONE whole number between 0 and 100 representing how actionable the following problem is."""

SYSTEM_PROMPT = """
You are an evaluator of problem statements.
Your job is to assign a score between 0 and 100 representing how actionable the problem is.

Definition:
- An actionable problem is one that could realistically be solved by creating a new product or service.
- "Product or service" includes future ones, not just existing solutions.

Scoring Guidelines:
- 0–20 = Not actionable: vague, personal feelings, or impossible to solve (e.g. "I wish I could stop time").
- 21–40 = Low actionability: somewhat clear, but still very broad or unrealistic (e.g. "People get sad sometimes").
- 41–60 = Moderate actionability: the problem is real but the path to a solution is unclear or requires major innovation (e.g. "Overthinking and anxiety about others' perceptions").
- 61–80 = High actionability: a clear, specific need that could plausibly be solved with a product/service (e.g. "Small businesses struggle to schedule customer appointments efficiently").
- 81–100 = Extremely actionable: a very concrete, solvable problem with obvious product/service potential (e.g. "Farmers lack access to affordable same-day equipment repair technicians").

Instructions:
- Consider clarity, realism, and potential for a solution.
- Focus primarily on the potential for a solution, not whether it already exists.
- Output ONE whole number between 0 and 100, and nothing else.
"""
def analyze(problem, description):
    user_prompt = f"""
                        Problem
                        {problem}

                        Description
                        {description}
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

        answer = int(response.choices[0].message.content)
        if answer > 100:
            logger.warn("Answer returned was above 100, defaulted to 100")
            return 100
        
        if answer < 0:
            logger.warn("Answer returned was below 0, defaulted to 0")
            return 0
        
        return answer
    except ValueError as e:
        error_msg = "".join(traceback.format_exception(type(e), e, e.__traceback__))
        logger.warn(error_msg)
    except Exception as e:
        error_msg = "".join(traceback.format_exception(type(e), e, e.__traceback__))
        logger.error(error_msg)
    return None