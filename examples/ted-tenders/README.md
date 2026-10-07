# TED tenders API example for EU public procurement (Python, Node.js, curl)

Search and monitor EU public tenders from TED, Tenders Electronic Daily, by keyword, CPV code, country, deadline and value. Contract notices, award notices with winners and prior information notices come back as flat records. Turn on `onlyNew` and schedule a daily run for tender alerts. The code here calls the [EU TED Tenders Scraper & Alerts: Public Procurement](https://apify.com/rod_analytics/ted-tenders) Actor on Apify.

**API key needed:** None. It uses the official TED Search API with no login. You only need an Apify API token.

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
    "cpvCodes": [
        "72000000"
    ],
    "countries": [
        "DE",
        "FR",
        "IT",
        "ES",
        "NL",
        "PL"
    ],
    "noticeTypes": [
        "contract-notice",
        "contract-award"
    ],
    "publishedWithinDays": 7,
    "maxItems": 50
}
```

Fields worth changing:

- `cpvCodes`: CPV codes. Parent codes include children, so `72000000` covers all IT services.
- `keywords`: Full-text search. Add local-language terms, because notices are indexed in their original language.
- `countries`: Buyer countries as ISO codes, for example `DE` or `FR`.
- `noticeTypes`: `contract-notice`, `contract-award`, `prior-information` and more.
- `publishedWithinDays`, `minDaysToDeadline`, `minValue`, `maxValue`: Date, deadline and value filters.
- `onlyNew`: Return only notices that earlier runs with the same filters did not save. Use it with a daily schedule.

The full input reference is on the [Store page](https://apify.com/rod_analytics/ted-tenders) under **Input**.

## Output

One dataset item per notice with `publicationNumber`, `publicationDate`, `noticeType`, an English `title`, `buyerName`, `buyerCountry`, `cpvCodes`, `estimatedValue`, `awardedValue`, `winners`, `deadline`, `procedureType`, `noticeUrl` and `pdfUrl`.

The Python and Node.js scripts print a short line per item. The curl script prints the raw JSON. Add `&format=csv` to the curl URL for CSV.

## Pricing

Pay per event, so you pay per result, not for compute time. At time of writing, 2026-10, the Free plan price is $1 per 1,000 notices. Help rows for invalid input and runs with nothing new are free. Paid Apify plans get lower prices. Check the [Store page](https://apify.com/rod_analytics/ted-tenders) for current prices before large runs.

## More ready-made inputs

Published tasks for this Actor on Apify Store, each with a tested input you can copy:

- [Daily IT Tender Alerts for Germany (TED, CPV 72000000)](https://apify.com/rod_analytics/ted-tenders/examples/it-tenders-germany-daily-alerts)
- [Open Construction Tenders in the Nordics: SE, DK, FI, NO](https://apify.com/rod_analytics/ted-tenders/examples/nordic-construction-tenders-open)
- [EU Medical Equipment Contract Awards and Winners (TED)](https://apify.com/rod_analytics/ted-tenders/examples/medical-equipment-contract-awards-eu)
- [Cybersecurity Tenders in France, Belgium, Netherlands (TED)](https://apify.com/rod_analytics/ted-tenders/examples/cybersecurity-tenders-france-benelux)
- [EU Consulting Tenders Over EUR 1 Million (TED, CPV 79400000)](https://apify.com/rod_analytics/ted-tenders/examples/consulting-tenders-over-1-million-eu)

---

[All 17 examples](../../README.md) · [EU TED Tenders Scraper & Alerts: Public Procurement on Apify Store](https://apify.com/rod_analytics/ted-tenders)
