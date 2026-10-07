# SEO audit API and broken link checker example (Python, Node.js, curl)

Crawl a website and get a 0-100 SEO score for every page, a list of broken links and redirect chains, and a fix hint for each issue: missing titles and meta descriptions, canonical, hreflang and JSON-LD errors. A URL list mode checks status codes and redirects after a site migration. The code here calls the [SEO Audit Tool: Site Crawler, Broken Links & Score](https://apify.com/rod_analytics/seo-site-audit) Actor on Apify.

**API key needed:** None. It sends read-only GET and HEAD requests. You only need an Apify API token.

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
    "mode": "crawl",
    "startUrl": "https://docs.apify.com/academy",
    "maxPages": 20
}
```

Fields worth changing:

- `mode`: `crawl` audits a whole site from `startUrl`. `urlList` only checks status codes and redirects of `urlList`.
- `startUrl`: Where the crawl starts. Same-site links and the XML sitemap are followed.
- `urlList`: The URLs to check in `urlList` mode.
- `maxPages`: Maximum pages to audit or URLs to check. Also caps the cost.
- `includeGlobs`, `excludeGlobs`: Limit the crawl, for example to `https://example.com/blog/**`.

The full input reference is on the [Store page](https://apify.com/rod_analytics/seo-site-audit) under **Input**.

## Output

One dataset item per page with `seoScore`, `statusCode`, `redirectChain`, `title`, `canonicalStatus`, `brokenLinks` and `issues[]`, where each issue has `severity`, `code`, `message` and `fix`. The `SUMMARY` record in the key-value store holds the site score, the top issues and the lowest-scoring pages. Only internal links are checked.

The Python and Node.js scripts print a short line per item. The curl script prints the raw JSON. Add `&format=csv` to the curl URL for CSV.

## Pricing

Pay per event, so you pay per result, not for compute time. At time of writing, 2026-10, the Free plan price is $6 per 1,000 pages in crawl mode and $0.50 per 1,000 URLs in URL list mode. Paid Apify plans get lower prices. Check the [Store page](https://apify.com/rod_analytics/seo-site-audit) for current prices before large runs.

## More ready-made inputs

Published tasks for this Actor on Apify Store, each with a tested input you can copy:

- [Find Broken Links on a Website: 404 & Dead Link Checker](https://apify.com/rod_analytics/seo-site-audit/examples/seo-find-broken-links-on-website)
- [Bulk Redirect Checker: Redirect Chains & Status Codes](https://apify.com/rod_analytics/seo-site-audit/examples/seo-check-redirect-chains-url-list)
- [Hreflang Checker: Audit a Multilingual Website](https://apify.com/rod_analytics/seo-site-audit/examples/seo-audit-hreflang-multilingual-site)
- [Find Missing Meta Descriptions & Duplicate Titles](https://apify.com/rod_analytics/seo-site-audit/examples/seo-missing-meta-descriptions-duplicate-titles)
- [Website SEO Score Checker: 0-100 Score for Every Page](https://apify.com/rod_analytics/seo-site-audit/examples/seo-score-every-page-of-website)

---

[All 14 examples](../../README.md) · [SEO Audit Tool: Site Crawler, Broken Links & Score on Apify Store](https://apify.com/rod_analytics/seo-site-audit)
