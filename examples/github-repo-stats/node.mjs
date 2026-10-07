// GitHub trending repositories: run rod_analytics/github-repo-stats on Apify and print the results.
// Setup: npm install in the repo root, then set APIFY_TOKEN.
import { readFile } from 'node:fs/promises';
import { ApifyClient } from 'apify-client';

const ACTOR = 'rod_analytics/github-repo-stats';

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
        // Failed items and input help rows explain themselves.
        console.log('no result:', JSON.stringify(item).slice(0, 200));
        continue;
    }
    console.log(item.trendingRank, item.fullName, '| stars', item.stars, '| gained', item.starsInPeriod);
}
