# Tech stack detector API example (Python, Node.js, curl)

Find out which CMS, ecommerce platform, analytics tools, JavaScript frameworks, CDN and hosting a list of websites uses. It matches 7,600+ technology fingerprints against each homepage and returns one row per domain, which makes it a bulk alternative to looking sites up one by one in Wappalyzer or BuiltWith. The code here calls the [Tech Stack Detector: Wappalyzer & BuiltWith Alternative](https://apify.com/rod_analytics/tech-stack-detector) Actor on Apify. It is not affiliated with Wappalyzer or BuiltWith.

**API key needed:** None. No browser and no account with any other service. You only need an Apify API token. Because no browser runs, technologies that appear only after JavaScript runs can be missed.

## Run it

```bash
read -rs APIFY_TOKEN && export APIFY_TOKEN   # paste your Apify API token, press Enter

python3 python.py   # after: pip install -r requirements.txt in the repo root
node node.mjs       # after: npm install in the repo root
bash curl.sh        # needs only curl
```

All three send [`input.json`](input.json) to the Actor, wait for the run and print the results. The scripts cap the cost of a run at $0.50 with `maxTotalChargeUsd`. Raise it when you send bigger inputs.

## Input

[`input.json`](input.json) is the Actor's own prefilled example:

```json
{
    "urls": [
        "https://wordpress.org",
        "https://www.shopify.com",
        "https://github.com"
    ]
}
```

Fields worth changing:

- `urls`: Domains or URLs, one per entry. Thousands per run are fine.
- `includeCategories`: Keep only some categories, for example `["CMS", "Ecommerce"]`.
- `includeRawSignals`: Add the headers, scripts and other evidence behind each match.
- `maxConcurrency`: Websites fetched in parallel, 1 to 50.

The full input reference is on the [Store page](https://apify.com/rod_analytics/tech-stack-detector) under **Input**.

## Output

One dataset item per website with `technologies[]` holding `name`, `categories`, `version` and `confidence`, plus `technologyNames`, `categoriesSummary`, `finalUrl` and `error` for sites that could not be fetched.

The Python and Node.js scripts print a short line per item. The curl script prints the raw JSON. Add `&format=csv` to the curl URL for CSV.

## Pricing

Pay per event, so you pay per result, not for compute time. At time of writing, 2026-10, the Free plan price is $1.80 per 1,000 domains. Dead domains, timeouts and invalid URLs are not charged. Paid Apify plans get lower prices. Check the [Store page](https://apify.com/rod_analytics/tech-stack-detector) for current prices before large runs.

## More ready-made inputs

Published tasks for this Actor on Apify Store, each with a tested input you can copy:

- [CMS Checker: Find What CMS Any Website Uses, in Bulk](https://apify.com/rod_analytics/tech-stack-detector/examples/find-cms-of-websites)
- [Shopify Store Checker: Find Shopify Sites in a Domain List](https://apify.com/rod_analytics/tech-stack-detector/examples/detect-shopify-stores)
- [Analytics & Marketing Tools Checker for Competitor Websites](https://apify.com/rod_analytics/tech-stack-detector/examples/marketing-analytics-tools-of-websites)
- [WordPress Plugin Detector: Find WP Sites, Themes & Plugins](https://apify.com/rod_analytics/tech-stack-detector/examples/find-wordpress-sites-and-plugins)
- [JavaScript Framework Detector: React, Next.js, Vue & Angular](https://apify.com/rod_analytics/tech-stack-detector/examples/detect-javascript-frameworks)

---

[All 17 examples](../../README.md) · [Tech Stack Detector: Wappalyzer & BuiltWith Alternative on Apify Store](https://apify.com/rod_analytics/tech-stack-detector)
