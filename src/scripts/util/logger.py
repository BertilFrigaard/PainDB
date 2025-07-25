from util.db_link import log
logger_pipeline_run_id = None

def set_pipeline_run_id(pipeline_run_id):
    global logger_pipeline_run_id
    logger_pipeline_run_id = pipeline_run_id

def info(message: str):
    if logger_pipeline_run_id is not None:
        log(logger_pipeline_run_id, message, "info")
    else:
        print("logger_pipeline_run_id NOT SET!")


def status(message: str):
    if logger_pipeline_run_id is not None:
        log(logger_pipeline_run_id, message, "status")
    else:
        print("logger_pipeline_run_id NOT SET!")

def warn(message: str):
    if logger_pipeline_run_id is not None:
        log(logger_pipeline_run_id, message, "warn")
    else:
        print("logger_pipeline_run_id NOT SET!")

def error(message: str):
    if logger_pipeline_run_id is not None:
        log(logger_pipeline_run_id, message, "error")
    else:
        print("logger_pipeline_run_id NOT SET!")

def critical(message: str):
    if logger_pipeline_run_id is not None:
        log(logger_pipeline_run_id, message, "critical")
    else:
        print("logger_pipeline_run_id NOT SET!")