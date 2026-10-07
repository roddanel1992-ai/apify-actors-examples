#!/usr/bin/env bash
# SEO audit API and broken link checker: run rod_analytics/seo-site-audit and print the dataset items as JSON.
# Needs curl and APIFY_TOKEN. The sync endpoint waits up to 300 seconds for the run.
# maxTotalChargeUsd caps what this run can cost.
set -euo pipefail
cd "$(dirname "$0")"

curl -sS -X POST \
  "https://api.apify.com/v2/acts/rod_analytics~seo-site-audit/run-sync-get-dataset-items?maxTotalChargeUsd=0.5" \
  -H "Authorization: Bearer ${APIFY_TOKEN:?Set the APIFY_TOKEN environment variable first}" \
  -H "Content-Type: application/json" \
  --data @input.json
echo
