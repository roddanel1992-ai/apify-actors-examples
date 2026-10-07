# Work email finder API example: name and domain to work email (Python, Node.js, curl)

Find a person's work email from a first name, last name and company domain. The Actor learns the company's email format from the addresses the company publishes on its own website, builds up to 3 candidates, checks MX and verifies them when you give a MillionVerifier key. Every row has a `status`: `deliverable`, `published`, `catch-all-guess`, `unverified-guess` or `not-found`. The code here calls the [Work Email Finder: Find Email by Name and Domain](https://apify.com/rod_analytics/work-email-finder) Actor on Apify.

**API key needed:** None to get a result. You only need an Apify API token. Without a verifier key you get the best pattern guess, labelled `unverified-pattern-guess`, or an address that the company publishes itself. Your own `millionVerifierApiKey` adds real mailbox checks. MillionVerifier's public test keys such as `API_KEY_FOR_OK` work for tests and are never charged.

## Run it

```bash
read -rs APIFY_TOKEN && export APIFY_TOKEN   # paste your Apify API token, press Enter

python3 python.py   # after: pip install -r requirements.txt in the repo root
node node.mjs       # after: npm install in the repo root
bash curl.sh        # needs only curl
```

All three send [`input.json`](input.json) to the Actor, wait for the run and print the results. The scripts cap the cost of a run at $0.50 with `maxTotalChargeUsd`. Raise it when you send bigger inputs.

## Input

[`input.json`](input.json) is the Actor's own prefilled example. It uses placeholder names. Replace them with real people before you rely on the results:

```json
{
    "people": [
        { "firstName": "Jane", "lastName": "Doe", "domain": "sorainen.com" },
        { "firstName": "John", "lastName": "Smith", "domain": "tlu.ee" },
        { "fullName": "Anna Meier", "companyWebsite": "https://www.ut.ee" }
    ]
}
```

Fields worth changing:

- `people`: One object per person with `firstName` and `lastName` (or `fullName`) plus `domain` (or `companyWebsite`).
- `millionVerifierApiKey`: Your own MillionVerifier key. Adds up to 3 mailbox checks per person.
- `datasetId`: Read people from another run's dataset, for example a Website Contact Scraper run with named people.
- `suppressionList`: Emails, domains or SHA-256 hashes that must never appear in the output.

The full input reference is on the [Store page](https://apify.com/rod_analytics/work-email-finder) under **Input**.

## Output

One dataset item per person with `email`, `status`, `confidence`, `pattern`, `verifiedBy`, `label`, `sources[]` (pages of the company website that show the address or the format), `candidatesTried` and `mx`. Rows without an address carry `error`, `errorCode`, `message` and `howToFix`, and are free.

The Python and Node.js scripts print a short line per item. The curl script prints the raw JSON. Add `&format=csv` to the curl URL for CSV.

## Responsible use

You are the data controller for the people you look up. You need a lawful basis, for example under GDPR, a privacy notice to each person, and a suppression list for objections. Only company addresses are built, never private mailboxes. Germany needs prior consent for advertising email, also B2B. Details are in the GDPR section of the [Store page](https://apify.com/rod_analytics/work-email-finder).

## Pricing

Pay per event, so you pay per result, not for compute time. At time of writing, 2026-10, the Free plan price is $3 per 1,000 emails found. Rows with no address are free. With your own MillionVerifier key you also pay MillionVerifier for each check. Paid Apify plans get lower prices. Check the [Store page](https://apify.com/rod_analytics/work-email-finder) for current prices before large runs.

## More ready-made inputs

Published tasks for this Actor on Apify Store, each with a tested input you can copy:

- [Find a work email from a name and a company domain](https://apify.com/rod_analytics/work-email-finder/examples/find-work-email-by-name-and-domain)
- [Try verified work email lookup with free test keys](https://apify.com/rod_analytics/work-email-finder/examples/try-work-email-finder-with-free-test-keys)
- [Find work emails for a list of leads with company websites](https://apify.com/rod_analytics/work-email-finder/examples/find-emails-for-a-lead-list)
- [Find work emails at German companies and universities](https://apify.com/rod_analytics/work-email-finder/examples/find-work-emails-at-german-companies)
- [Find a work email at a law firm from name and website](https://apify.com/rod_analytics/work-email-finder/examples/find-work-email-at-a-law-firm)

---

[All 17 examples](../../README.md) · [Work Email Finder: Find Email by Name and Domain on Apify Store](https://apify.com/rod_analytics/work-email-finder)
