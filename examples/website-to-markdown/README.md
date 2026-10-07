# Website to Markdown API example for RAG (Python, Node.js, curl)

Crawl a website and get clean Markdown for every page, ready for RAG, LLM fine-tuning or an AI chatbot knowledge base. Menus, footers and cookie banners are removed, tables become GitHub-flavoured Markdown, and you can get heading-aware RAG chunks and an llms.txt file per domain. The code here calls the [Website Content Crawler to Markdown for RAG & LLMs](https://apify.com/rod_analytics/website-to-markdown) Actor on Apify.

**API key needed:** None. It is a plain HTTP crawler, no LLM or third-party service is involved. You only need an Apify API token. robots.txt is respected by default.

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
    "startUrls": [
        {
            "url": "https://docs.apify.com/academy"
        }
    ],
    "maxPages": 10
}
```

Fields worth changing:

- `startUrls`: One or more `{ "url": ... }` objects. By default the crawl stays under the start URL path.
- `maxPages`: Stop after this many saved pages. This is also your cost cap.
- `includeChunks`, `chunkSize`, `chunkOverlap`: Turn on RAG chunks and set their size in estimated tokens.
- `maxCrawlDepth`: Set `0` to fetch only the start URLs. That turns the Actor into a URL to Markdown converter for a list of pages.
- `jsRenderingFallback`: Render near-empty JavaScript pages in headless Chrome, at a higher per page price.

The full input reference is on the [Store page](https://apify.com/rod_analytics/website-to-markdown) under **Input**.

## Output

One dataset item per page with `url`, `title`, `markdown`, `wordCount`, `language`, `contentHash` and, when chunking is on, `chunks[]` with `text`, `headings` and `tokenEstimate`. The run's key-value store also holds `llms-<domain>.txt` and `llms-full-<domain>.txt`.

The Python and Node.js scripts print a short line per item. The curl script prints the raw JSON. Add `&format=csv` to the curl URL for CSV.

## Pricing

Pay per event, so you pay per result, not for compute time. At time of writing, 2026-10, the Free plan price is $0.30 per 1,000 pages fetched over HTTP and $6 per 1,000 pages rendered in Chrome. Duplicates, robots.txt blocks, errors and empty pages are not charged. Paid Apify plans get lower prices. Check the [Store page](https://apify.com/rod_analytics/website-to-markdown) for current prices before large runs.

## More ready-made inputs

Published tasks for this Actor on Apify Store, each with a tested input you can copy:

- [llms.txt Generator: Crawl a Site to llms-full.txt](https://apify.com/rod_analytics/website-to-markdown/examples/generate-llms-txt-docs-site)
- [Docs Site to Markdown RAG Chunks Crawler](https://apify.com/rod_analytics/website-to-markdown/examples/docs-site-to-markdown-rag)
- [Bulk URL to Markdown Converter for LLMs](https://apify.com/rod_analytics/website-to-markdown/examples/web-pages-to-markdown-list)
- [MDN Web Docs to Markdown for a RAG Knowledge Base](https://apify.com/rod_analytics/website-to-markdown/examples/mdn-docs-rag-knowledge-base)
- [Help Center to Markdown Export for AI Chatbots](https://apify.com/rod_analytics/website-to-markdown/examples/help-center-to-markdown-chatbot)

---

[All 17 examples](../../README.md) · [Website Content Crawler to Markdown for RAG & LLMs on Apify Store](https://apify.com/rod_analytics/website-to-markdown)
