# SachCheck 🔍

**Don't just forward. Verify.**

SachCheck is a retrieval-augmented verification tool for forwarded messages. Paste a message or upload a screenshot, and it extracts the core claim, searches the web, reads source-page content, and returns a cautious **True / False / Misleading / Unverified** result with an explanation in the original language.

## Architecture

```text
Forward (text or screenshot)
        ↓
Language detection + claim extraction
        ↓
Web search (Serper)
        ↓
Fetch + clean top source pages
        ↓
Evidence-grounded verdict + explanation
        ↓
Verdict + citations
```

SachCheck does not claim to tell “the truth.” It helps users verify claims using retrieved evidence and favors **Unverified** when evidence is insufficient.

## Tech stack

- React + Vite + Tailwind CSS
- Node.js + Express
- Gemini Flash (configured with `GEMINI_MODEL`)
- Serper.dev Search API
- Cheerio for source-page text extraction
- Gemini multimodal input for screenshots
- No database, authentication, or persistence in the MVP

## Run locally

### Server

```bash
cd server
npm install
cp .env.example .env
# add GEMINI_API_KEY and SERPER_KEY
npm run dev
```

### Client

```bash
cd client
npm install
npm run dev
```

Open `http://localhost:5173`.

The Vite development server proxies `/api` requests to `http://localhost:5000`.

## Environment

```env
GEMINI_API_KEY=
GEMINI_MODEL=gemini-3.5-flash
SERPER_KEY=
PORT=5000
FRONTEND_ORIGIN=http://localhost:5173
```

> Model IDs can change over time. If the configured model is unavailable in your Gemini account, set `GEMINI_MODEL` to a currently available Flash model without changing the application code.

## Built for Hack Devengers 2.0
