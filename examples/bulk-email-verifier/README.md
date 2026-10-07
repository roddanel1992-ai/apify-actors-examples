# Bulk email verification API example (Python, Node.js, curl)

Clean an email list before you send: syntax, MX records, disposable domains, role accounts and typo fixes such as gmial.com. Every address gets a verdict of `deliverable`, `risky`, `undeliverable` or `unknown` and a 0-100 score. You can paste addresses, link a CSV file or read the dataset of a scraper run. The code here calls the [Email Validator & Verifier: Bulk MX & Disposable Check](https://apify.com/rod_analytics/bulk-email-verifier) Actor on Apify.

**API key needed:** None for the default checks. You only need an Apify API token. The default checks do not prove that a mailbox exists, so DNS-level results score at most 80. For a mailbox check, pass your own [MillionVerifier](https://www.millionverifier.com) key in `millionVerifierApiKey`: addresses that pass the DNS checks are then also checked for an existing mailbox and for catch-all domains, on your MillionVerifier credits. A direct SMTP check from the Actor needs your own SOCKS5 proxy with outbound port 25 open, because Apify blocks port 25.

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
    "emails": [
        "info@apify.com",
        "example.user@gmial.com",
        "test@mailinator.com",
        "hello@no-such-domain-4f7a2c.com",
        "not-an-email@"
    ]
}
```

Fields worth changing:

- `emails`: Addresses to check.
- `emailsFileUrl`: A CSV or text file, uploaded in the Console or a public link. Every cell with an `@` is used.
- `datasetId`, `emailField`: Read addresses from the dataset of another Actor run. See the [chaining recipe](../../recipes/website-contacts-to-verified-emails/).
- `millionVerifierApiKey`: Your own MillionVerifier key. Turns on the mailbox check. Keep it in an environment variable, never in `input.json` in a repository.
- `mailboxCheck`: On by default, runs only when a MillionVerifier key is available. Set `false` for DNS level results only.
- `smtpCheck`: Off by default. Needs `socksProxyUrl`, `heloHost` and `fromAddress` for your own proxy. It takes priority over the MillionVerifier check.

The full input reference is on the [Store page](https://apify.com/rod_analytics/bulk-email-verifier) under **Input**.

## Output

One dataset item per unique address with `verdict`, `score`, `reason`, `hasMx`, `mxHosts`, `isDisposable`, `isRole`, `isFreeProvider` and `didYouMean` with a suggested typo fix. New fields: `mailboxCheck` (`none`, `millionverifier` or `smtp`), `mailboxResult` (`ok`, `invalid`, `catch_all`, `unknown`, `disposable` or `null`) and `catchAll`. A `SUMMARY` record in the key-value store counts the verdicts.

The Python and Node.js scripts print a short line per item. The curl script prints the raw JSON. Add `&format=csv` to the curl URL for CSV.

## Responsible use

Only process data you have a lawful basis for, for example under GDPR, and do not use the results for spam. Details are in the FAQ on the [Store page](https://apify.com/rod_analytics/bulk-email-verifier).

## Pricing

Pay per event, so you pay per result, not for compute time. At time of writing, 2026-10, the Free plan price is $0.30 per 1,000 addresses. An answer from your own SMTP proxy adds $0.40 per 1,000. The mailbox check with your own MillionVerifier key adds nothing here, you pay MillionVerifier for the credits. Paid Apify plans get lower prices. Check the [Store page](https://apify.com/rod_analytics/bulk-email-verifier) for current prices before large runs.

## More ready-made inputs

Published tasks for this Actor on Apify Store, each with a tested input you can copy:

- [Clean a B2B Email List Before a Cold Email Campaign](https://apify.com/rod_analytics/bulk-email-verifier/examples/clean-email-list-before-cold-outreach)
- [Find Disposable Email Addresses in Signups](https://apify.com/rod_analytics/bulk-email-verifier/examples/find-disposable-emails-in-signups)
- [Fix Typos in Customer Email Addresses (gmial.com)](https://apify.com/rod_analytics/bulk-email-verifier/examples/fix-typos-in-customer-emails)
- [Bulk MX Record Check for Email Addresses](https://apify.com/rod_analytics/bulk-email-verifier/examples/check-mx-records-for-email-domains)
- [Flag Role-Based Emails: info@, sales@, support@](https://apify.com/rod_analytics/bulk-email-verifier/examples/flag-role-based-emails)

---

[All 17 examples](../../README.md) · [Email Validator & Verifier: Bulk MX & Disposable Check on Apify Store](https://apify.com/rod_analytics/bulk-email-verifier)
