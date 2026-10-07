# Hacker News scraper API example: stories, comments and Who is hiring jobs (Python, Node.js, curl)

Search Hacker News stories and comments, export the front page and comment threads, and turn the monthly "Who is hiring?" thread into structured job rows with company, role, location, remote, salary and apply link. Turn on `onlyNew` and schedule runs to monitor brand mentions, Show HN launches and new job posts. The code here calls the [Hacker News Scraper: Stories, Comments & Who's Hiring Jobs](https://apify.com/rod_analytics/hackernews-scraper) Actor on Apify.

**API key needed:** None. It reads the official Hacker News Firebase API and the Algolia HN Search API with no login. You only need an Apify API token.

## Run it

```bash
read -rs APIFY_TOKEN && export APIFY_TOKEN   # paste your Apify API token, press Enter

python3 python.py   # after: pip install -r requirements.txt in the repo root
node node.mjs       # after: npm install in the repo root
bash curl.sh        # needs only curl
```

All three send [`input.json`](input.json) to the Actor, wait for the run and print the results. The scripts cap the cost of a run at $0.50 with `maxTotalChargeUsd`. Raise it when you send bigger inputs.

## Input

[`input.json`](input.json) is the Actor's own prefilled example, stories about AI agents from the last year with at least 100 points:

```json
{
    "mode": "search",
    "queries": [
        "AI agents"
    ],
    "contentTypes": [
        "story"
    ],
    "sortBy": "popularity",
    "createdWithinDays": 365,
    "minPoints": 100,
    "maxItems": 20
}
```

The `mode` field picks what the Actor does:

- `search`: stories and comments by `queries`, `contentTypes`, `author`, `createdWithinDays` or `createdAfter`, `minPoints` and `minComments`. Set `sortBy` to `date` to page past the 1,000 hit limit of popularity order.
- `frontPage`: a live list, chosen with `feed` (`top`, `new`, `best`, `ask`, `show` or `job`), with the rank of each story.
- `thread`: the story links in `storyUrls` with their comments. Use `commentDepth` and `maxCommentsPerStory` to limit the size.
- `whoIsHiring`: job posts of a monthly thread. Pick it with `hiringMonth` and filter with `jobKeywords`, `jobLocations`, `remoteOnly`, `visaSponsorshipOnly` and `salaryOnly`.

Two more inputs to try, a job feed and a monitor:

```json
{ "mode": "whoIsHiring", "remoteOnly": true, "jobKeywords": ["python"], "maxItems": 100 }
```

```json
{ "mode": "search", "queries": ["apify"], "contentTypes": ["story", "comment"], "onlyNew": true }
```

`onlyNew` returns only rows that earlier runs with the same settings did not save. Use it with a schedule. A run with nothing new ends SUCCEEDED with an empty dataset.

The full input reference is on the [Store page](https://apify.com/rod_analytics/hackernews-scraper) under **Input**.

## Output

One dataset item per story, comment or job post. Stories have `title`, `url`, `domain`, `author`, `points`, `numComments`, `createdAt` and `hnUrl`. Comments add `text`, `storyId`, `storyTitle`, `parentId`, `depth` and `rank`. Job posts (`type: "job_post"`) have `company`, `role`, `location`, `remote`, `hybrid`, `onsite`, `visaSponsorship`, `salaryText`, `salaryMin`, `salaryMax`, `salaryCurrency`, `employmentType`, `companyUrl`, `applyUrl`, `techKeywords` and the original `header` and `text`.

The Python and Node.js scripts print a short line per item. The curl script prints the raw JSON. Add `&format=csv` to the curl URL for CSV.

## Pricing

Pay per event, so you pay per result, not for compute time. At time of writing, 2026-10, the Free plan price is $0.50 per 1,000 stories or comments and $1 per 1,000 Who is hiring job posts. Help rows for invalid input and runs with nothing new are free. Paid Apify plans get lower prices. Check the [Store page](https://apify.com/rod_analytics/hackernews-scraper) for current prices before large runs.

## More ready-made inputs

Published tasks for this Actor on Apify Store, each with a tested input you can copy:

- [Find remote Python jobs on Hacker News Who is hiring](https://apify.com/rod_analytics/hackernews-scraper/examples/remote-python-jobs-hacker-news-who-is-hiring)
- [Track Show HN launches of the last 7 days](https://apify.com/rod_analytics/hackernews-scraper/examples/show-hn-launches-this-week)
- [Get alerts for new brand mentions on Hacker News](https://apify.com/rod_analytics/hackernews-scraper/examples/hacker-news-brand-mention-alerts)
- [Export the comments of a Hacker News thread](https://apify.com/rod_analytics/hackernews-scraper/examples/export-hacker-news-thread-comments)
- [Find Hacker News jobs that offer visa sponsorship](https://apify.com/rod_analytics/hackernews-scraper/examples/hacker-news-jobs-visa-sponsorship)

---

[All 17 examples](../../README.md) · [Hacker News Scraper: Stories, Comments & Who's Hiring Jobs on Apify Store](https://apify.com/rod_analytics/hackernews-scraper)
