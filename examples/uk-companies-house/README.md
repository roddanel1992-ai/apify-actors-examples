# Companies House API example, no API key (Python, Node.js, curl)

Search UK companies by name, company number, SIC code, incorporation date and location on the official Companies House API, and get status, SIC codes, registered address, accounts and confirmation statement due dates, PSC, filings, charges and officers in one clean schema. Built for KYB, due diligence, CRM enrichment and lead lists. The code here calls the [Companies House Scraper: UK Company Search, No API Key](https://apify.com/rod_analytics/uk-companies-house) Actor on Apify.

**API key needed:** None. The Actor uses its own built-in Companies House key, shared between users, with up to 300 requests per 5 minutes per run. You only need an Apify API token. For large bulk runs, put your own free Companies House key in `apiKey` to get the full 600 requests per 5 minutes.

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
    "companyNumbers": [
        "00445790",
        "00102498",
        "07524813",
        "01833679",
        "02557590",
        "00185647",
        "00617987",
        "00214436",
        "04190816",
        "00041424"
    ],
    "searchQueries": [
        "tesco"
    ],
    "maxResultsPerSearch": 10
}
```

Fields worth changing:

- `companyNumbers`: Company numbers such as `00445790` for Tesco PLC or `SC083026`.
- `searchQueries`, `maxResultsPerSearch`: Name search and how many matches to keep.
- `advancedSicCodes`, `advancedLocation`, `advancedStatus`: Advanced search for lead lists, for example SIC `62012` in `Manchester`.
- `advancedIncorporatedFrom`, `advancedIncorporatedTo`: Incorporation date range, YYYY-MM-DD.
- `includePsc`, `includeFilings`, `includeCharges`, `includeOfficers`: Extra sections, charged per section. Officers are off by default because they are personal data.

The full input reference is on the [Store page](https://apify.com/rod_analytics/uk-companies-house) under **Input**.

## Output

One dataset item per company with `companyNumber`, `name`, `status`, `type`, `incorporationDate`, `sicCodes[]`, `registeredAddress`, `accountsNextDue`, `accountsOverdue`, `confirmationStatementNextDue`, `hasCharges` and `url`. Numbers that are not found get a free row with `found: false`.

The Python and Node.js scripts print a short line per item. The curl script prints the raw JSON. Add `&format=csv` to the curl URL for CSV.

## Pricing

Pay per event, so you pay per result, not for compute time. At time of writing, 2026-10, the Free plan price is $3 per 1,000 company records and $1 per 1,000 detail sections such as PSC or filings. Not-found rows are free. Paid Apify plans get lower prices. Check the [Store page](https://apify.com/rod_analytics/uk-companies-house) for current prices before large runs.

## More ready-made inputs

Published tasks for this Actor on Apify Store, each with a tested input you can copy:

- [Check UK Company Status for a Supplier List (KYB)](https://apify.com/rod_analytics/uk-companies-house/examples/check-uk-company-status-supplier-list)
- [FTSE 100 Company Data from Companies House](https://apify.com/rod_analytics/uk-companies-house/examples/ftse-100-company-data-companies-house)
- [UK Company Accounts Due Dates: Companies House Check](https://apify.com/rod_analytics/uk-companies-house/examples/uk-company-accounts-due-dates)
- [Enrich CRM Data with UK SIC Codes and Addresses](https://apify.com/rod_analytics/uk-companies-house/examples/enrich-crm-uk-sic-codes-addresses)
- [Look Up Scottish Companies by SC Number](https://apify.com/rod_analytics/uk-companies-house/examples/scottish-companies-by-sc-number)
- [Find UK Software Companies in Manchester by SIC Code](https://apify.com/rod_analytics/uk-companies-house/examples/find-software-companies-manchester-sic-code)
- [New Restaurant Companies in London: Companies House List](https://apify.com/rod_analytics/uk-companies-house/examples/new-uk-restaurants-london-companies-house)
- [UK Company Directors and PSC Lookup for KYB](https://apify.com/rod_analytics/uk-companies-house/examples/uk-company-directors-psc-kyb)

---

[All 14 examples](../../README.md) · [Companies House Scraper: UK Company Search, No API Key on Apify Store](https://apify.com/rod_analytics/uk-companies-house)
