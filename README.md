# Apify Actors API examples: PDF to Markdown, SEO audit, Companies House, email verifier and more

Copy-paste examples in curl, Python and Node.js for the 14 public [Apify](https://apify.com) Actors by Rod Services, Apify username [`rod_analytics`](https://apify.com/rod_analytics).

Every Actor is called the same way: send a JSON input, get JSON rows back. Each folder in [`examples/`](examples/) has a working `input.json` and three scripts that run with only `APIFY_TOKEN` set.

## The Actors

"API key needed" means a key for a third-party service. Every call needs your own Apify API token, nothing else unless the column says so.

### AI and RAG content

| Actor | What it does | API key needed? | Example | Store |
| --- | --- | --- | --- | --- |
| Website Content Crawler to Markdown for RAG & LLMs | Crawls a site into clean Markdown, RAG chunks and llms.txt | No | [code](examples/website-to-markdown/) | [website-to-markdown](https://apify.com/rod_analytics/website-to-markdown) |
| PDF to Markdown & Text Extractor with OCR | Turns PDF, DOCX, XLSX, PPTX, HTML and scans into Markdown with OCR | No | [code](examples/doc-to-markdown/) | [doc-to-markdown](https://apify.com/rod_analytics/doc-to-markdown) |
| Speech to Text: Audio, Video & Podcast Transcriber | Whisper transcripts, SRT and VTT subtitles from files or podcast RSS | No. Uses a hosted Groq key. Your own Groq or OpenAI key is optional | [code](examples/media-transcriber/) | [media-transcriber](https://apify.com/rod_analytics/media-transcriber) |

### SEO and web performance

| Actor | What it does | API key needed? | Example | Store |
| --- | --- | --- | --- | --- |
| SEO Audit Tool: Site Crawler, Broken Links & Score | 0-100 SEO score per page, broken links, redirect chains, fix hints | No | [code](examples/seo-site-audit/) | [seo-site-audit](https://apify.com/rod_analytics/seo-site-audit) |
| PageSpeed Insights & Lighthouse Bulk Checker, No API Key | Lighthouse scores, Core Web Vitals and CrUX data for many URLs | No. Uses a shared PageSpeed key. Your own Google key is optional | [code](examples/lighthouse-audit/) | [lighthouse-audit](https://apify.com/rod_analytics/lighthouse-audit) |
| Tech Stack Detector: Wappalyzer & BuiltWith Alternative | CMS, ecommerce, analytics, frameworks and hosting of each domain | No | [code](examples/tech-stack-detector/) | [tech-stack-detector](https://apify.com/rod_analytics/tech-stack-detector) |
| Bulk Domain Lookup: DNS, WHOIS, SPF, DMARC & SSL | DNS, WHOIS expiry, email provider, SPF, DMARC, DKIM and SSL with an A-F grade | No | [code](examples/domain-security-audit/) | [domain-security-audit](https://apify.com/rod_analytics/domain-security-audit) |

### Lead and company data

| Actor | What it does | API key needed? | Example | Store |
| --- | --- | --- | --- | --- |
| Website Contact Scraper: Emails, Phones & Social Links | Company emails, phone, social links, address and VAT IDs per website | No | [code](examples/company-contact-extractor/) | [company-contact-extractor](https://apify.com/rod_analytics/company-contact-extractor) |
| Email Validator & Verifier: Bulk MX & Disposable Check | Syntax, MX, disposable, role and typo checks with a verdict per address | No for the default checks. The optional SMTP mailbox check needs your own SOCKS5 proxy with port 25 | [code](examples/bulk-email-verifier/) | [bulk-email-verifier](https://apify.com/rod_analytics/bulk-email-verifier) |
| VIES VAT Checker & EU Company Registry Lookup | VIES VAT validation plus company registries of FR, NO, FI and EE, LEI from GLEIF | No | [code](examples/eu-company-lookup/) | [eu-company-lookup](https://apify.com/rod_analytics/eu-company-lookup) |
| Companies House Scraper: UK Company Search, No API Key | UK company search and profiles, PSC, filings, charges and officers | No. Uses a built-in key. Your own free key is optional for big runs | [code](examples/uk-companies-house/) | [uk-companies-house](https://apify.com/rod_analytics/uk-companies-house) |

### Jobs, tenders and GitHub data

| Actor | What it does | API key needed? | Example | Store |
| --- | --- | --- | --- | --- |
| EU TED Tenders Scraper & Alerts: Public Procurement | EU public tenders by CPV, keyword, country and value, with only-new alerts | No | [code](examples/ted-tenders/) | [ted-tenders](https://apify.com/rod_analytics/ted-tenders) |
| Greenhouse, Lever & Ashby Job Scraper: 8 ATS in One Feed | Jobs from 8 ATS platforms in one schema, company presets, only-new mode | No | [code](examples/multi-ats-jobs-api/) | [multi-ats-jobs-api](https://apify.com/rod_analytics/multi-ats-jobs-api) |
| GitHub Scraper: Repo Stats, Stars, Trending & Search | GitHub trending, repo stats, search and org listing | No for trending. A GitHub token is optional for API modes, which allow 60 requests per hour without one | [code](examples/github-repo-stats/) | [github-repo-stats](https://apify.com/rod_analytics/github-repo-stats) |

## Quick start

1. Create a free Apify account and copy your API token from [Console > Settings > API & Integrations](https://console.apify.com/settings/integrations).
2. Put the token in the `APIFY_TOKEN` environment variable. This keeps it out of your shell history:

```bash
read -rs APIFY_TOKEN && export APIFY_TOKEN   # paste the token, press Enter
```

### curl

One HTTP call starts the run, waits for it and returns the dataset rows:

```bash
curl -sS -X POST "https://api.apify.com/v2/acts/rod_analytics~doc-to-markdown/run-sync-get-dataset-items" \
  -H "Authorization: Bearer $APIFY_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"fileUrls": ["https://www.govinfo.gov/content/pkg/USCODE-2011-title17/pdf/USCODE-2011-title17-chap1-sec107.pdf"]}'
```

In the URL the Actor ID is written as `rod_analytics~<slug>`. The sync endpoint waits up to 300 seconds. For longer runs use a client below, or start the run with `POST /v2/acts/rod_analytics~<slug>/runs` and read the dataset when it finishes.

### Python

```bash
pip install -r requirements.txt   # apify-client 3.x, Python 3.11+
```

```python
import os
from apify_client import ApifyClient

client = ApifyClient(os.environ["APIFY_TOKEN"])
run = client.actor("rod_analytics/doc-to-markdown").call(
    run_input={"fileUrls": ["https://www.govinfo.gov/content/pkg/USCODE-2011-title17/pdf/USCODE-2011-title17-chap1-sec107.pdf"]}
)
for item in client.dataset(run.default_dataset_id).iterate_items():
    print(item["title"], item["markdown"][:200])
```

With apify-client 1.x or 2.x, the run is a dict: use `run["defaultDatasetId"]`.

### JavaScript / Node.js

```bash
npm install   # apify-client 2.x
```

```js
import { ApifyClient } from 'apify-client';

const client = new ApifyClient({ token: process.env.APIFY_TOKEN });
const run = await client.actor('rod_analytics/doc-to-markdown').call({
    fileUrls: ['https://www.govinfo.gov/content/pkg/USCODE-2011-title17/pdf/USCODE-2011-title17-chap1-sec107.pdf'],
});
const { items } = await client.dataset(run.defaultDatasetId).listItems();
console.log(items[0].title, items[0].markdown.slice(0, 200));
```

### Run any example folder

```bash
cd examples/uk-companies-house
python3 python.py
node node.mjs
bash curl.sh
```

Each script reads `input.json` from its own folder. Edit that file to change the input.

## Use from AI agents (MCP)

All 14 Actors work as tools through Apify's MCP server at [mcp.apify.com](https://mcp.apify.com). Pick the Actors you want with the `tools` query parameter. The hosted server signs you in with OAuth, or takes an `Authorization: Bearer <APIFY_TOKEN>` header.

MCP client config, for example in Cursor or VS Code:

```json
{
  "mcpServers": {
    "apify": {
      "url": "https://mcp.apify.com?tools=rod_analytics/website-to-markdown,rod_analytics/doc-to-markdown"
    }
  }
}
```

Claude Code:

```bash
claude mcp add --transport http apify "https://mcp.apify.com?tools=rod_analytics/website-to-markdown,rod_analytics/doc-to-markdown"
```

Local stdio server, with `APIFY_TOKEN` set in the environment:

```bash
npx -y @apify/actors-mcp-server --tools rod_analytics/website-to-markdown,rod_analytics/doc-to-markdown
```

Tool names for all 14 Actors, comma-separated for the `tools` parameter:

```text
rod_analytics/website-to-markdown,rod_analytics/doc-to-markdown,rod_analytics/media-transcriber,rod_analytics/seo-site-audit,rod_analytics/lighthouse-audit,rod_analytics/tech-stack-detector,rod_analytics/domain-security-audit,rod_analytics/company-contact-extractor,rod_analytics/bulk-email-verifier,rod_analytics/eu-company-lookup,rod_analytics/uk-companies-house,rod_analytics/ted-tenders,rod_analytics/multi-ats-jobs-api,rod_analytics/github-repo-stats
```

Load only the few an agent needs. Every loaded Actor adds a tool definition to the agent's context.

## Chaining: website contacts to verified emails

The output dataset of one Actor can be the input of the next. Here the [Website Contact Scraper](https://apify.com/rod_analytics/company-contact-extractor) finds company emails, and the [Email Validator & Verifier](https://apify.com/rod_analytics/bulk-email-verifier) checks them, reading the first run's dataset by ID:

```python
import os
from apify_client import ApifyClient

client = ApifyClient(os.environ["APIFY_TOKEN"])

# 1. Find contact emails on company websites.
contacts = client.actor("rod_analytics/company-contact-extractor").call(
    run_input={"domains": ["apify.com", "hetzner.com", "pipedrive.com"]}
)

# 2. Verify them. The verifier reads the "emails" field of every row in that dataset.
checked = client.actor("rod_analytics/bulk-email-verifier").call(
    run_input={"datasetId": contacts.default_dataset_id}
)

for row in client.dataset(checked.default_dataset_id).iterate_items():
    print(row["email"], row["verdict"], row["score"])
```

The contact scraper writes `emails` as a list of `{ email, type, sourceUrl, mxFound }` objects, and the verifier reads `email`, then `emails`, from each row by default. For a dataset with another column name, set `emailField`, for example `contact.email`. The contact scraper takes a `datasetId` too, so a Google Maps scraper run can feed it first.

Runnable versions in Python and Node.js are in [`recipes/website-contacts-to-verified-emails/`](recipes/website-contacts-to-verified-emails/).

## Pricing

All 14 Actors use Apify's pay-per-event pricing. You pay a small fee per run start plus a fee per result, such as per page, document, domain, audio minute, company record or job. Compute is included. Failed items are generally not charged, and each Store page lists what is free. Paid Apify plans get tier discounts.

Prices change, so this README does not list them. Each Store page linked above has the current price table. At time of writing, 2026-10, each example input in this repository costs under $0.20 per run.

To cap spend, pass `maxTotalChargeUsd`: a query parameter in the API, `max_total_charge_usd` in the Python client and `maxTotalChargeUsd` in the `call()` options of the JavaScript client. The scripts in `examples/` cap every run at $0.50.

## Repository layout

```text
examples/<slug>/
  README.md    what the Actor does, input fields, output fields
  input.json   working input, the Actor's own prefilled example
  python.py    apify-client for Python
  node.mjs     apify-client for JavaScript
  curl.sh      plain HTTP with curl
recipes/       multi-Actor workflows
```

## Support

- Bug or feature request for an Actor: open an issue on the **Issues** tab of its Store page.
- Problem with the example code: open an issue in this repository.

## License

The example code and docs in this repository are MIT licensed, see [LICENSE](LICENSE). The Actors themselves run on Apify and are covered by their own terms on Apify Store.
