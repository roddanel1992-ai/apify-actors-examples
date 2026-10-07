# Greenhouse, Lever and Ashby jobs API example (Python, Node.js, curl)

Get job postings from Greenhouse, Lever, Ashby, Workable, SmartRecruiters, Recruitee, Personio and Workday in one normalized feed, with salary ranges where employers publish them, remote flags and full descriptions. Search a curated company preset by keyword, or pass your own company boards. The code here calls the [Greenhouse, Lever & Ashby Job Scraper: 8 ATS in One Feed](https://apify.com/rod_analytics/multi-ats-jobs-api) Actor on Apify.

**API key needed:** None. It reads the public job board APIs that employers publish, with no login and no proxy. You only need an Apify API token.

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
    "presets": [
        "ai"
    ],
    "keywords": [
        "engineer"
    ],
    "maxJobs": 50,
    "maxJobsPerCompany": 5
}
```

Fields worth changing:

- `presets`: Curated company lists: `ai`, `devtools`, `fintech`, `eu-startups`, `nordics` or `all`.
- `companies`: Your own board URLs, `ats:slug` shorthands like `lever:spotify`, careers pages or domains.
- `keywords`, `excludeKeywords`, `locations`, `remoteOnly`, `postedWithinDays`: Filters on title, location, remote flag and posting date.
- `maxJobs`, `maxJobsPerCompany`: Caps on the total and per company. `0` means no limit.
- `onlyNew`: Return only jobs that earlier runs did not return. For daily alerts.

The full input reference is on the [Store page](https://apify.com/rod_analytics/multi-ats-jobs-api) under **Input**.

## Output

One dataset item per job with `company`, `ats`, `title`, `department`, `locations[]`, `isRemote`, `workplaceType`, `salaryMin`, `salaryMax`, `salaryCurrency`, `postedAt`, `jobUrl`, `applyUrl` and `descriptionText`.

The Python and Node.js scripts print a short line per item. The curl script prints the raw JSON. Add `&format=csv` to the curl URL for CSV.

## Pricing

Pay per event, so you pay per result, not for compute time. At time of writing, 2026-10, the Free plan price is $1.20 per 1,000 jobs. Detecting the ATS from a careers page or domain costs $0.002 per company. Presets and board URLs have no detection fee. Paid Apify plans get lower prices. Check the [Store page](https://apify.com/rod_analytics/multi-ats-jobs-api) for current prices before large runs.

## More ready-made inputs

Published tasks for this Actor on Apify Store, each with a tested input you can copy:

- [AI and Machine Learning Jobs at Top AI Companies](https://apify.com/rod_analytics/multi-ats-jobs-api/examples/find-ai-machine-learning-jobs)
- [Remote Software Engineer Jobs at Dev Tool Companies](https://apify.com/rod_analytics/multi-ats-jobs-api/examples/find-remote-software-engineer-jobs)
- [Fintech Jobs in Europe: Stripe, Adyen, Monzo, N26](https://apify.com/rod_analytics/multi-ats-jobs-api/examples/track-fintech-jobs-in-europe)
- [SaaS Companies Hiring Account Executives: Sales Signals](https://apify.com/rod_analytics/multi-ats-jobs-api/examples/find-sales-jobs-hiring-signals-saas)
- [New Jobs This Week at European Startups](https://apify.com/rod_analytics/multi-ats-jobs-api/examples/new-jobs-this-week-european-startups)

---

[All 14 examples](../../README.md) · [Greenhouse, Lever & Ashby Job Scraper: 8 ATS in One Feed on Apify Store](https://apify.com/rod_analytics/multi-ats-jobs-api)
