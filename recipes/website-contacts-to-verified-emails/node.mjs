// Website contacts to verified emails: chain two rod_analytics Actors on Apify.
// 1. company-contact-extractor finds contact emails on company websites.
// 2. bulk-email-verifier checks them, reading the first run's dataset by ID.
// Setup: npm install in the repo root, then set APIFY_TOKEN.
import { ApifyClient } from 'apify-client';

const DOMAINS = ['apify.com', 'hetzner.com', 'pipedrive.com'];

if (!process.env.APIFY_TOKEN) {
    console.error('Set the APIFY_TOKEN environment variable first.');
    process.exit(1);
}
const client = new ApifyClient({ token: process.env.APIFY_TOKEN });
const cap = { maxTotalChargeUsd: 0.5 }; // max cost per run

const contacts = await client.actor('rod_analytics/company-contact-extractor').call({ domains: DOMAINS }, cap);
console.log(`Contacts run ${contacts.status}: https://console.apify.com/view/runs/${contacts.id}`);

// The verifier reads the "emails" field of every row. Set "emailField" for other datasets.
const checked = await client.actor('rod_analytics/bulk-email-verifier').call({ datasetId: contacts.defaultDatasetId }, cap);
console.log(`Verifier run ${checked.status}: https://console.apify.com/view/runs/${checked.id}`);

const { items } = await client.dataset(checked.defaultDatasetId).listItems();
if (items.length === 0) console.log('No emails to verify. The run status message says why.');
for (const row of items) {
    console.log(row.email, '|', row.verdict, row.score, '|', row.reason);
}
