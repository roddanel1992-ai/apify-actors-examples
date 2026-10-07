# GitHub trending repositories API example (Python, Node.js, curl)

Get the GitHub trending list by language and period, with stars gained in the period, or stats for any list of repositories: stars, forks, watchers, open issues and PRs, languages, latest release, contributors count and commit activity. Repository search and organization listing work too. The code here calls the [GitHub Scraper: Repo Stats, Stars, Trending & Search](https://apify.com/rod_analytics/github-repo-stats) Actor on Apify.

**API key needed:** None for trending, which reads the public github.com/trending page. Repo stats, search and organization modes use the official GitHub REST API. A GitHub token is optional there but recommended, because without one GitHub allows only 60 requests per hour.

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
    "mode": "trending",
    "maxItems": 25,
    "maxRateLimitWaitSecs": 60
}
```

Fields worth changing:

- `mode`: `auto`, `trending`, `repos`, `search` or `org`. Auto picks the mode from the fields you fill.
- `trendingLanguages`, `trendingPeriod`: For example `["Rust"]` and `weekly`. Empty languages means all.
- `repositories`: `owner/name` or GitHub URLs for repo stats.
- `searchQuery`, `language`, `minStars`, `topics`, `createdFrom`, `pushedFrom`: Repository search filters.
- `githubToken`: Optional. A fine-grained token with no extra permissions raises the limit to 5,000 requests per hour.
- `maxRateLimitWaitSecs`: How long the run may wait for a GitHub rate limit reset before it stops and keeps what it saved.

Stats for a list of repositories:

```json
{
    "repositories": ["microsoft/vscode", "https://github.com/python/cpython"],
    "includeCommitActivity": true
}
```

The full input reference is on the [Store page](https://apify.com/rod_analytics/github-repo-stats) under **Input**.

## Output

Trending rows have `trendingRank`, `fullName`, `url`, `description`, `language`, `stars`, `forks`, `starsInPeriod` and `builtBy`. Repo stats rows add `watchers`, `openIssues`, `openPullRequests`, `languagesPercent`, `topics`, `license`, `latestRelease`, `contributorsCount` and `commits52w`.

The Python and Node.js scripts print a short line per item. The curl script prints the raw JSON. Add `&format=csv` to the curl URL for CSV.

## Pricing

Pay per event, so you pay per result, not for compute time. At time of writing, 2026-10, the Free plan price is $2 per 1,000 repositories. Repos that are not found are free. Paid Apify plans get lower prices. Check the [Store page](https://apify.com/rod_analytics/github-repo-stats) for current prices before large runs.

## More ready-made inputs

Published tasks for this Actor on Apify Store, each with a tested input you can copy:

- [Track Trending Python Repositories on GitHub Daily](https://apify.com/rod_analytics/github-repo-stats/examples/trending-python-repos-daily)
- [Top Trending Rust Repositories on GitHub This Week](https://apify.com/rod_analytics/github-repo-stats/examples/trending-rust-repos-weekly)
- [Monthly Trending TypeScript & JavaScript GitHub Repos](https://apify.com/rod_analytics/github-repo-stats/examples/trending-typescript-javascript-monthly)
- [Get GitHub Stars, Forks and Releases for a Repo List](https://apify.com/rod_analytics/github-repo-stats/examples/github-stars-forks-for-repo-list)
- [Find New Popular LLM Repositories on GitHub by Topic](https://apify.com/rod_analytics/github-repo-stats/examples/new-llm-repos-by-topic)

---

[All 14 examples](../../README.md) · [GitHub Scraper: Repo Stats, Stars, Trending & Search on Apify Store](https://apify.com/rod_analytics/github-repo-stats)
