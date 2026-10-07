# Bulk DNS, WHOIS, SPF and DMARC lookup API example (Python, Node.js, curl)

Look up DNS records, WHOIS registrar and expiry date, email provider, SPF, DMARC, DKIM and the SSL certificate for a list of domains, with an A-F grade and a fix for every finding. Useful for lead enrichment, email deliverability checks and certificate or domain expiry monitoring. The code here calls the [Bulk Domain Lookup: DNS, WHOIS, SPF, DMARC & SSL](https://apify.com/rod_analytics/domain-security-audit) Actor on Apify.

**API key needed:** None. It reads public DNS and registry data and does one normal TLS handshake per domain. You only need an Apify API token.

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
        "github.com",
        "google.com",
        "bbc.co.uk"
    ]
}
```

Fields worth changing:

- `domains`: Domains, URLs or email addresses. Duplicates and `www.` are removed.
- `includeWhois`: Registrar, created and expiry dates. On by default.
- `dkimSelectors`: Extra DKIM selectors to try, such as the `s=` value from a DKIM-Signature header.
- `checks`: Any of `dns`, `spf`, `dmarc`, `dkim`, `dnssec`, `mtaSts`, `bimi`, `ssl`, `headers`, `redirect`.

The full input reference is on the [Store page](https://apify.com/rod_analytics/domain-security-audit) under **Input**.

## Output

One dataset item per domain with `grade`, `score`, `emailProvider`, `mxHosts`, `dns` records, `whois` with `registrar` and `expires`, `spf`, `dmarc`, `dkim`, `ssl` with `daysLeft`, and `findings[]` with a recommendation each.

The Python and Node.js scripts print a short line per item. The curl script prints the raw JSON. Add `&format=csv` to the curl URL for CSV.

## Pricing

Pay per event, so you pay per result, not for compute time. At time of writing, 2026-10, the Free plan price is $1.50 per 1,000 domains, with WHOIS and every check included. Invalid names and domains without DNS records are not charged. Paid Apify plans get lower prices. Check the [Store page](https://apify.com/rod_analytics/domain-security-audit) for current prices before large runs.

## More ready-made inputs

Published tasks for this Actor on Apify Store, each with a tested input you can copy:

- [Check SPF and DMARC for a List of Domains in Bulk](https://apify.com/rod_analytics/domain-security-audit/examples/spf-dmarc-check-domain-list)
- [Find the Email Provider of Company Domains (MX Lookup)](https://apify.com/rod_analytics/domain-security-audit/examples/email-provider-of-company-domains)
- [Bulk WHOIS Lookup: Domain Expiry Date and Registrar](https://apify.com/rod_analytics/domain-security-audit/examples/bulk-whois-domain-expiry-registrar)
- [Bulk SSL Certificate Expiry Checker for Many Domains](https://apify.com/rod_analytics/domain-security-audit/examples/ssl-certificate-expiry-checker)
- [Bulk DNS Lookup: MX, NS, A and TXT Records for Domains](https://apify.com/rod_analytics/domain-security-audit/examples/bulk-dns-lookup-mx-ns-a-records)

---

[All 14 examples](../../README.md) · [Bulk Domain Lookup: DNS, WHOIS, SPF, DMARC & SSL on Apify Store](https://apify.com/rod_analytics/domain-security-audit)
