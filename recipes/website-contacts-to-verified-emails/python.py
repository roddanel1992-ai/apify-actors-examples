"""Website contacts to verified emails: chain two rod_analytics Actors on Apify.

1. company-contact-extractor finds contact emails on company websites.
2. bulk-email-verifier checks them, reading the first run's dataset by ID.

Setup: pip install -r requirements.txt in the repo root, then set APIFY_TOKEN.
"""
import os
import sys
from decimal import Decimal

from apify_client import ApifyClient

DOMAINS = ["apify.com", "hetzner.com", "pipedrive.com"]

token = os.environ.get("APIFY_TOKEN") or sys.exit("Set the APIFY_TOKEN environment variable first.")
client = ApifyClient(token)
cap = Decimal("0.50")  # max cost per run

contacts = client.actor("rod_analytics/company-contact-extractor").call(
    run_input={"domains": DOMAINS}, max_total_charge_usd=cap
)
print(f"Contacts run {contacts.status}: https://console.apify.com/view/runs/{contacts.id}")

# The verifier reads the "emails" field of every row. Set "emailField" for other datasets.
checked = client.actor("rod_analytics/bulk-email-verifier").call(
    run_input={"datasetId": contacts.default_dataset_id}, max_total_charge_usd=cap
)
print(f"Verifier run {checked.status}: https://console.apify.com/view/runs/{checked.id}")

rows = list(client.dataset(checked.default_dataset_id).iterate_items())
if not rows:
    print("No emails to verify. The run status message says why.")
for row in rows:
    print(row.get("email"), "|", row.get("verdict"), row.get("score"), "|", row.get("reason"))
