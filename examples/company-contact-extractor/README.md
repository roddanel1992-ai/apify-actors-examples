# Website contact scraper API example: emails, phones, social links (Python, Node.js, curl)

Get company emails, the main phone number and LinkedIn, Facebook, Instagram, X and YouTube links from a list of company websites, plus address, EU VAT IDs and register numbers from the impressum. One row per company. You can also feed it the dataset of a Google Maps scraper run. The code here calls the [Website Contact Scraper: Emails, Phones & Social Links](https://apify.com/rod_analytics/company-contact-extractor) Actor on Apify.

**API key needed:** None. No browser and no social network is visited. You only need an Apify API token. By default only generic role mailboxes such as info@ and sales@ are returned.

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
    "domains": [
        "apify.com",
        "hetzner.com",
        "pipedrive.com"
    ]
}
```

Fields worth changing:

- `domains`: Company websites or domains. `acme.com` is fine.
- `datasetId`, `urlField`: Read websites from another run's dataset, for example a Google Maps scraper. The `website` field is found automatically.
- `maxPagesPerDomain`: Homepage plus priority pages, 1 to 50. The price per website stays the same.
- `includePersonalEmails`: Off by default. Turning it on returns addresses of named people and makes you the data controller under GDPR.

The full input reference is on the [Store page](https://apify.com/rod_analytics/company-contact-extractor) under **Input**.

## Output

One dataset item per website with `emails[]` holding `email`, `type`, `sourceUrl` and `mxFound`, `phones[]` in E.164, `socials` with `linkedin`, `x`, `facebook`, `instagram`, `youtube`, `tiktok` and `github`, plus `address`, `vatIds`, `registrationNumbers` and `contactPageUrl`.

The Python and Node.js scripts print a short line per item. The curl script prints the raw JSON. Add `&format=csv` to the curl URL for CSV.

## Responsible use

Only process data you have a lawful basis for, for example under GDPR, and do not use the results for spam. Details are in the FAQ on the [Store page](https://apify.com/rod_analytics/company-contact-extractor).

## Pricing

Pay per event, so you pay per result, not for compute time. At time of writing, 2026-10, the Free plan price is $3 per 1,000 websites, up to 5 pages per site included. Websites that fail with DNS errors, timeouts or bot walls are not charged. Paid Apify plans get lower prices. Check the [Store page](https://apify.com/rod_analytics/company-contact-extractor) for current prices before large runs.

## More ready-made inputs

Published tasks for this Actor on Apify Store, each with a tested input you can copy:

- [Get Emails and Phone Numbers From Company Websites](https://apify.com/rod_analytics/company-contact-extractor/examples/get-emails-phones-from-company-websites)
- [Find Company LinkedIn, Facebook & Instagram Links](https://apify.com/rod_analytics/company-contact-extractor/examples/find-social-media-links-of-companies)
- [Impressum Scraper: VAT ID, HRB and Address of German Firms](https://apify.com/rod_analytics/company-contact-extractor/examples/find-impressum-vat-id-german-companies)
- [Build a SaaS Lead List With Company Emails](https://apify.com/rod_analytics/company-contact-extractor/examples/build-saas-lead-list-with-emails)
- [Enrich CRM Company Domains With Emails and Phones](https://apify.com/rod_analytics/company-contact-extractor/examples/enrich-crm-domains-with-contact-details)

---

[All 14 examples](../../README.md) · [Website Contact Scraper: Emails, Phones & Social Links on Apify Store](https://apify.com/rod_analytics/company-contact-extractor)
