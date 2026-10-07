# PageSpeed Insights API bulk example (Python, Node.js, curl)

Check Google PageSpeed Insights and Lighthouse scores for many URLs in one run: Performance, Accessibility, Best Practices and SEO scores, Core Web Vitals such as LCP, CLS and INP, real-user CrUX field data and the top fixes, one JSON row per page and device. The code here calls the [PageSpeed Insights & Lighthouse Bulk Checker, No API Key](https://apify.com/rod_analytics/lighthouse-audit) Actor on Apify.

**API key needed:** None by default. The `psi` engine calls the PageSpeed Insights API with a shared key of the Actor, so you do not need a Google Cloud account. The shared key has Google's normal quota for all users. If the daily quota is used up, the run ends with one free row that says so. For big or frequent runs, put your own free Google key in `psiApiKey`.

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
    "urls": [
        "https://apify.com"
    ],
    "engine": "psi",
    "strategy": "mobile"
}
```

Fields worth changing:

- `urls`: Pages to audit. `example.com` works, https is added.
- `strategy`: `mobile`, `desktop` or `both`. Both means two audits per URL.
- `categories`: Any of `performance`, `accessibility`, `best-practices`, `seo`.
- `engine`: `psi` calls Google PageSpeed Insights. `local` runs Lighthouse in Chrome inside the run and needs 8 GB memory.
- `psiApiKey`: Optional. Your own free PageSpeed Insights key for a private quota.

The full input reference is on the [Store page](https://apify.com/rod_analytics/lighthouse-audit) under **Input**.

## Output

One dataset item per URL and device with `performanceScore`, `accessibilityScore`, `bestPracticesScore`, `seoScore`, lab metrics `lcpMs`, `cls`, `tbtMs`, `fcpMs`, real-user CrUX data in `fieldData`, the top `opportunities[]` and `reportUrl` with the full HTML report.

The Python and Node.js scripts print a short line per item. The curl script prints the raw JSON. Add `&format=csv` to the curl URL for CSV.

## Pricing

Pay per event, so you pay per result, not for compute time. At time of writing, 2026-10, the Free plan price is $1.50 per 1,000 PageSpeed audits and $0.05 per local Chrome audit. Failed and blocked URLs are not charged. The price is the same with your own key. Paid Apify plans get lower prices. Check the [Store page](https://apify.com/rod_analytics/lighthouse-audit) for current prices before large runs.

## More ready-made inputs

Published tasks for this Actor on Apify Store, each with a tested input you can copy:

- [Competitor Page Speed Benchmark with Lighthouse](https://apify.com/rod_analytics/lighthouse-audit/examples/benchmark-competitor-page-speed)
- [Bulk Core Web Vitals Check: LCP, CLS, INP for Many URLs](https://apify.com/rod_analytics/lighthouse-audit/examples/check-core-web-vitals-url-list)
- [Compare Mobile vs Desktop PageSpeed Scores in Bulk](https://apify.com/rod_analytics/lighthouse-audit/examples/compare-mobile-desktop-pagespeed)
- [CrUX Field Data Checker: Real User LCP, CLS & INP](https://apify.com/rod_analytics/lighthouse-audit/examples/crux-field-data-real-users)
- [Bulk Lighthouse SEO & Accessibility Audit](https://apify.com/rod_analytics/lighthouse-audit/examples/lighthouse-seo-accessibility-audit)

---

[All 14 examples](../../README.md) · [PageSpeed Insights & Lighthouse Bulk Checker, No API Key on Apify Store](https://apify.com/rod_analytics/lighthouse-audit)
