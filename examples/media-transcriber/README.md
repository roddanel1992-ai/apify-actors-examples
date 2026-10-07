# Speech to text API example with Whisper (Python, Node.js, curl)

Transcribe audio, video and podcast episodes to text with Whisper, and get SRT and VTT subtitles and timestamped JSON segments. Paste a file link or a podcast RSS feed, 99 languages are supported and long recordings are split automatically. The code here calls the [Speech to Text: Audio, Video & Podcast Transcriber](https://apify.com/rod_analytics/media-transcriber) Actor on Apify.

**API key needed:** None. By default the Actor runs Whisper large v3 turbo on Groq through its own hosted key, so you need no Groq or OpenAI account. The hosted key is shared and has Groq's rate limits. Your own Groq or OpenAI key is optional, and it is required for translation to English and for other models. YouTube, TikTok and similar page links are rejected. Use direct file links.

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
    "audioUrls": [
        "https://www.archive.org/download/gettysburg_shurtagal_librivox/Gettysburg_Address_Lincoln_64kb.mp3"
    ]
}
```

Fields worth changing:

- `audioUrls`: Direct links to MP3, M4A, WAV, FLAC, MP4, MOV, WEBM and other media files.
- `rssFeedUrl`, `maxEpisodes`: Transcribe the newest episodes of a podcast feed instead.
- `language`: ISO 639-1 hint such as `en` or `de`. Empty means auto detect.
- `outputFormats`: Any of `text`, `srt`, `vtt`, `json`, saved as files in the key-value store.
- `dryRun`: Download and split only, without the per minute charge. Good for testing links.

The full input reference is on the [Store page](https://apify.com/rod_analytics/media-transcriber) under **Input**.

## Output

One dataset item per file or episode with `text`, `segments[]` holding `start`, `end` and `text` in seconds, `language`, `durationSeconds`, `srtUrl`, `vttUrl` and `billedMinutes`.

The Python and Node.js scripts print a short line per item. The curl script prints the raw JSON. Add `&format=csv` to the curl URL for CSV.

## Pricing

Pay per event, so you pay per result, not for compute time. At time of writing, 2026-10, the Free plan price is $0.003 per audio minute, counted per file and rounded up. Dry runs, rejected links and failed files are not charged per minute. Paid Apify plans get lower prices. Check the [Store page](https://apify.com/rod_analytics/media-transcriber) for current prices before large runs.

## More ready-made inputs

Published tasks for this Actor on Apify Store, each with a tested input you can copy:

- [Podcast RSS to Text: Transcribe Latest Episodes](https://apify.com/rod_analytics/media-transcriber/examples/transcribe-podcast-rss-feed)
- [MP3 to SRT and VTT Subtitles with Whisper](https://apify.com/rod_analytics/media-transcriber/examples/mp3-to-srt-subtitles)
- [Audio URL to Text: Speech to Text with Whisper](https://apify.com/rod_analytics/media-transcriber/examples/audio-url-speech-to-text)
- [Timestamped Transcript API: Audio to JSON Segments](https://apify.com/rod_analytics/media-transcriber/examples/timestamped-transcript-json)
- [Audiobook to Text: Transcribe LibriVox Chapters](https://apify.com/rod_analytics/media-transcriber/examples/transcribe-librivox-audiobook)

---

[All 17 examples](../../README.md) · [Speech to Text: Audio, Video & Podcast Transcriber on Apify Store](https://apify.com/rod_analytics/media-transcriber)
