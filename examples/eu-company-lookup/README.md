# VIES VAT number validation API example (Python, Node.js, curl)

Bulk-check EU VAT numbers in VIES and search official company registries in France (SIRENE), Norway (Brreg), Finland (PRH YTJ) and Estonia, with LEI codes from GLEIF. One normalized schema for KYB, supplier due diligence and B2B lead enrichment. The code here calls the [VIES VAT Checker & EU Company Registry Lookup](https://apify.com/rod_analytics/eu-company-lookup) Actor on Apify.

**API key needed:** None. Every source is a public open-data API. You only need an Apify API token.

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
    "mode": "auto",
    "countries": [
        "FR",
        "NO",
        "FI",
        "EE"
    ],
    "queries": [
        "Nokia"
    ],
    "maxItemsPerQuery": 2,
    "includeVies": true,
    "includeLei": true,
    "includeRaw": false
}
```

Fields worth changing:

- `mode`: `auto` picks the job from your input. Also `search`, `lookup`, `vat` and `lei`.
- `countries`: Registries for search and lookup: `FR`, `NO`, `FI`, `EE`.
- `queries`: Company names or registry IDs such as a SIREN, organisasjonsnummer, Y-tunnus or registrikood.
- `vatNumbers`: VAT numbers with country prefix, checked in VIES, for example `FR89383474814`.
- `industryCodes`: Keep only companies whose NACE code starts with these codes, for example `62`.
- `includeLei`: Add LEI codes from GLEIF.

For a plain bulk VAT check, send only VAT numbers:

```json
{
    "vatNumbers": ["FR89383474814", "EE101335276", "NO923609016MVA", "IT00743110157"]
}
```

The full input reference is on the [Store page](https://apify.com/rod_analytics/eu-company-lookup) under **Input**.

## Output

One dataset item per company with `country`, `registryId`, `name`, `legalForm`, `status`, `registrationDate`, `address`, `industryCode`, `vatNumber`, `vatValid`, `vatName`, `lei`, `sourceUrl` and the `attribution` text the source licence asks you to keep. Sole traders are skipped by default.

The Python and Node.js scripts print a short line per item. The curl script prints the raw JSON. Add `&format=csv` to the curl URL for CSV.

## Pricing

Pay per event, so you pay per result, not for compute time. At time of writing, 2026-10, the Free plan price is $4 per 1,000 company records and $0.50 per 1,000 VIES VAT checks. Wrong formats, unknown IDs and failed VIES checks are not charged. Paid Apify plans get lower prices. Check the [Store page](https://apify.com/rod_analytics/eu-company-lookup) for current prices before large runs.

## More ready-made inputs

Published tasks for this Actor on Apify Store, each with a tested input you can copy:

- [Bulk EU VAT Number Validation in VIES](https://apify.com/rod_analytics/eu-company-lookup/examples/validate-eu-vat-numbers-vies)
- [French Company Lookup by SIREN (SIRENE Register)](https://apify.com/rod_analytics/eu-company-lookup/examples/french-company-lookup-by-siren)
- [Norway Company Search in Brreg (Enhetsregisteret)](https://apify.com/rod_analytics/eu-company-lookup/examples/norway-brreg-company-search)
- [Finnish IT Company List from PRH YTJ by NACE Code](https://apify.com/rod_analytics/eu-company-lookup/examples/finland-it-companies-by-industry)
- [Estonian Company and VAT Check for KYB](https://apify.com/rod_analytics/eu-company-lookup/examples/estonia-company-vat-check-kyb)

---

[All 14 examples](../../README.md) · [VIES VAT Checker & EU Company Registry Lookup on Apify Store](https://apify.com/rod_analytics/eu-company-lookup)
