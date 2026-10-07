# PDF to Markdown API example (Python, Node.js, curl)

Convert a PDF, Word, Excel, PowerPoint, HTML or scanned image file into clean Markdown and page-aware RAG chunks with one API call. Pages without a text layer go through OCR automatically. Paste a file link, get Markdown, metadata and chunks back. The code here calls the [PDF to Markdown & Text Extractor with OCR](https://apify.com/rod_analytics/doc-to-markdown) Actor on Apify.

**API key needed:** None. Conversion and Tesseract OCR run inside the Apify run, no third-party AI service sees the files. You only need an Apify API token.

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
    "fileUrls": [
        "https://www.govinfo.gov/content/pkg/USCODE-2011-title17/pdf/USCODE-2011-title17-chap1-sec107.pdf"
    ]
}
```

Fields worth changing:

- `fileUrls`: Direct links to documents. Google Drive, Dropbox and GitHub share links are turned into downloads.
- `ocr`: `auto` is the default and OCRs only scanned pages. `force` OCRs every page, `off` never does.
- `languages`: Tesseract language codes such as `eng`, `deu` or `fra`.
- `chunkSize`, `chunkOverlap`: Approximate tokens per chunk and overlap. `0` turns chunking off.
- `pages`: PDF page range such as `1-5, 10, 20-`. Empty means all pages.

The full input reference is on the [Store page](https://apify.com/rod_analytics/doc-to-markdown) under **Input**.

## Output

One dataset item per document with `markdown`, `chunks[]` holding `text`, `page` and `heading`, plus `title`, `pages`, `metadata`, `ocrPagesCount` and `error` for files that failed.

The Python and Node.js scripts print a short line per item. The curl script prints the raw JSON. Add `&format=csv` to the curl URL for CSV.

## Pricing

Pay per event, so you pay per result, not for compute time. At time of writing, 2026-10, the Free plan price is $3 per 1,000 documents plus $0.01 per OCR page. Failed downloads, broken files and password protected PDFs are not charged. Paid Apify plans get lower prices. Check the [Store page](https://apify.com/rod_analytics/doc-to-markdown) for current prices before large runs.

## More ready-made inputs

Published tasks for this Actor on Apify Store, each with a tested input you can copy:

- [PDF to Markdown Chunks for RAG and Vector Databases](https://apify.com/rod_analytics/doc-to-markdown/examples/pdf-to-markdown-rag-chunks)
- [Excel XLSX to Markdown Tables for LLMs](https://apify.com/rod_analytics/doc-to-markdown/examples/excel-xlsx-to-markdown-tables)
- [Scanned Image and TIFF to Text with OCR](https://apify.com/rod_analytics/doc-to-markdown/examples/ocr-scanned-images-to-text)
- [Word DOCX to Markdown Converter with Tables](https://apify.com/rod_analytics/doc-to-markdown/examples/word-docx-to-markdown)
- [Extract Text from Selected PDF Pages to Markdown](https://apify.com/rod_analytics/doc-to-markdown/examples/extract-pdf-page-range)

---

[All 14 examples](../../README.md) · [PDF to Markdown & Text Extractor with OCR on Apify Store](https://apify.com/rod_analytics/doc-to-markdown)
