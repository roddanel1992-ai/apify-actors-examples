// Hacker News scraper API example: run rod_analytics/hackernews-scraper on Apify and print the results.
// Setup: npm install in the repo root, then set APIFY_TOKEN.
import { readFile } from 'node:fs/promises';
import { ApifyClient } from 'apify-client';

const ACTOR = 'rod_analytics/hackernews-scraper';

if (!process.env.APIFY_TOKEN) {
    console.error('Set the APIFY_TOKEN environment variable first.');
    process.exit(1);
}
const input = JSON.parse(await readFile(new URL('./input.json', import.meta.url), 'utf8'));

const client = new ApifyClient({ token: process.env.APIFY_TOKEN });
// Waits for the run to finish. maxTotalChargeUsd caps what this run can cost.
const run = await client.actor(ACTOR).call(input, { maxTotalChargeUsd: 0.5 });
console.log(`Run ${run.status}: https://console.apify.com/view/runs/${run.id}`);

const { items } = await client.dataset(run.defaultDatasetId).listItems();
for (const item of items) {
    if (item.error) {
        // Input help rows explain themselves.
        console.log('no result:', JSON.stringify(item).slice(0, 200));
        continue;
    }
    if (item.type === 'job_post') {
        console.log(item.company, '|', item.role ?? '-', '|', item.location ?? '-', '|', item.salaryText ?? 'no salary');
    } else if (item.type === 'comment') {
        console.log(item.createdAt?.slice(0, 10), item.author, '|', (item.text ?? '').slice(0, 100).replace(/\s+/g, ' '));
    } else {
        console.log(item.createdAt?.slice(0, 10), `${item.points} points, ${item.numComments} comments |`, item.title);
    }
    console.log('   ', item.hnUrl);
}
