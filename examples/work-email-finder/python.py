"""Work email finder API example: run rod_analytics/work-email-finder on Apify and print the results.

Setup: pip install -r requirements.txt in the repo root, then set APIFY_TOKEN.
"""
import json
import os
import sys
from decimal import Decimal
from pathlib import Path

from apify_client import ApifyClient

ACTOR = "rod_analytics/work-email-finder"

token = os.environ.get("APIFY_TOKEN") or sys.exit("Set the APIFY_TOKEN environment variable first.")
run_input = json.loads((Path(__file__).parent / "input.json").read_text())

client = ApifyClient(token)
# Waits for the run to finish. max_total_charge_usd caps what this run can cost.
run = client.actor(ACTOR).call(run_input=run_input, max_total_charge_usd=Decimal("0.50"))
print(f"Run {run.status}: https://console.apify.com/view/runs/{run.id}")

for item in client.dataset(run.default_dataset_id).iterate_items():
    if item.get("error"):  # rows without a result and input help rows explain themselves
        print("no result:", json.dumps(item, ensure_ascii=False)[:200])
        continue
    print(item.get("firstName"), item.get("lastName"), "|", item.get("email"), "|", item.get("status"), item.get("confidence"), "|", item.get("verifiedBy") or item.get("label") or "-")
