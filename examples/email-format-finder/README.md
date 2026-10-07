# Email format finder API example: company email pattern (Python, Node.js, curl)

Find how a company writes its work emails: first.last, flast, first or something else. For each company domain you get the pattern, a 0-100 confidence, example addresses with the page of the company website where each one is published, and the MX hosts and mail provider. Domains with no clear pattern come back as a free row that says why. The code here calls the [Email Format Finder: Company Email Pattern Lookup](https://apify.com/rod_analytics/email-format-finder) Actor on Apify.

**API key needed:** None. You only need an Apify API token. Only the company's own website is read, with `robots.txt` respected. An optional `hunterApiKey` of your own adds Hunter.io's format as one more vote.

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
        "sorainen.com",
        "tlu.ee",
        "ut.ee"
    ]
}
```

Fields worth changing:

- `domains`: Company domains or websites. `acme.com` is fine. Free mail domains such as gmail.com are rejected.
- `datasetId`, `domainField`: Read websites from another run's dataset, for example a Google Maps scraper.
- `maxExamples`: Example addresses with their source page per domain, 1 to 10.
- `maxPagesPerDomain`: Pages read per domain, 1 to 30. The price per domain stays the same.
- `suppressionList`: Emails, domains or SHA-256 hashes that must never appear in the output.

The full input reference is on the [Store page](https://apify.com/rod_analytics/email-format-finder) under **Input**.

## Output

One dataset item per domain with `status` (`pattern-found`, `no-pattern` or `failed`), `pattern` such as `{first}.{last}`, `confidence`, `supportingExamples`, `examples[]` holding `email`, `sourceUrl` and `evidence`, `mx` with `hosts` and `provider`, and `emailsSeen` counts. Rows without a result carry `error`, `errorCode`, `message` and `howToFix`.

The Python and Node.js scripts print a short line per item. The curl script prints the raw JSON. Add `&format=csv` to the curl URL for CSV.

## Responsible use

Example addresses are work addresses that the companies publish themselves, but they are still personal data. Only process data you have a lawful basis for, for example under GDPR, tell the people concerned, and do not use the results for spam. Germany needs prior consent for advertising email, also B2B. Details are in the GDPR section of the [Store page](https://apify.com/rod_analytics/email-format-finder).

## Pricing

Pay per event, so you pay per result, not for compute time. At time of writing, 2026-10, the Free plan price is $10 per 1,000 domains with a pattern found. Domains with no pattern are free. Paid Apify plans get lower prices. Check the [Store page](https://apify.com/rod_analytics/email-format-finder) for current prices before large runs.

## More ready-made inputs

Published tasks for this Actor on Apify Store, each with a tested input you can copy:

- [Find the email format of any company website](https://apify.com/rod_analytics/email-format-finder/examples/find-company-email-format)
- [Find how universities format staff email addresses](https://apify.com/rod_analytics/email-format-finder/examples/find-university-email-format)
- [Find the email pattern of city councils and municipalities](https://apify.com/rod_analytics/email-format-finder/examples/find-city-council-email-format)
- [Get example emails with source pages for an email pattern](https://apify.com/rod_analytics/email-format-finder/examples/get-example-emails-with-source-pages)
- [Find the email format of law firms and consultancies](https://apify.com/rod_analytics/email-format-finder/examples/find-law-firm-email-format)

---

[All 17 examples](../../README.md) · [Email Format Finder: Company Email Pattern Lookup on Apify Store](https://apify.com/rod_analytics/email-format-finder)
