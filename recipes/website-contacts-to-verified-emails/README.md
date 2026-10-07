# Scrape company emails and verify them: Apify chaining example (Python, Node.js)

Find contact emails on a list of company websites, then check every address for syntax, MX records, disposable domains, role accounts and typos, in one script. The first Actor's output dataset is passed to the second by ID, so nothing is downloaded in between.

1. [Website Contact Scraper: Emails, Phones & Social Links](https://apify.com/rod_analytics/company-contact-extractor) reads up to 5 pages per site and returns one row per company with an `emails` list.
2. [Email Validator & Verifier: Bulk MX & Disposable Check](https://apify.com/rod_analytics/bulk-email-verifier) gets `{"datasetId": "<that dataset>"}` and returns one row per unique address with `verdict`, `score` and `reason`.

**API key needed:** None. You only need an Apify API token.

## Run it

```bash
read -rs APIFY_TOKEN && export APIFY_TOKEN   # paste your Apify API token, press Enter

python3 python.py   # after: pip install -r requirements.txt in the repo root
node node.mjs       # after: npm install in the repo root
```

Change `DOMAINS` at the top of the script to your own list.

## How the hand-off works

- The contact scraper writes `emails` as a list of `{ email, type, sourceUrl, mxFound }` objects.
- The verifier reads `email`, then `emails`, from each dataset row by default, and takes the `email` key from objects. For a dataset with another column name, set `emailField`, for example `contact.email`.
- By default the contact scraper returns only generic role mailboxes such as info@ and sales@, so most verdicts carry the role flag. Default verification works at DNS level and does not prove that a mailbox exists.
- To start from Google Maps, run a Google Maps scraper first and pass its dataset ID to the contact scraper as `datasetId`. It reads the `website` field.

## Cost

Both Actors charge per result: per website processed and per address checked. At time of writing, 2026-10, the three example domains cost about one cent in total. Each run in the scripts is capped at $0.50. Current prices are on the two Store pages.

## Responsible use

Only process addresses you have a lawful basis for, for example under GDPR, and do not use the results for spam.

---

[All examples](../../README.md)
