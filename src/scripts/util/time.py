from datetime import datetime, timezone
import pytz  # Optional, for timezone support

def format_timestamp_to_pretty_local(unix_timestamp: int | float, tz: str = "Europe/Copenhagen") -> str:
    # Convert to datetime object
    dt = datetime.fromtimestamp(unix_timestamp, pytz.timezone(tz))
    # Format as string
    return dt.strftime("%b %d, %Y %H:%M:%S")