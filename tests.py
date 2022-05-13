from os import environ as env
import requests
import datetime
from dotenv import load_dotenv
from rich import print
load_dotenv(".env.development")


response = requests.get(
    "https://umami.dhravya.dev/api/website/1/metrics",
    headers={"Authorization": f"Bearer {env.get('GATSBY_UMAMI_TOKEN')}"},
    params={
        "start_at": 0,
        "end_at": datetime.datetime.utcnow().timestamp() + 10000000000000,
        "type": "url"
    }
)
print(response)
response = response.json()

new_res = [metric for metric in response if not "?" in metric['x']]

print(new_res)
