# 🛡️ SachCheck

### Don't just forward. Verify.

SachCheck is an AI-powered claim verification system that helps users verify suspicious forwarded messages, social-media claims, and online information using real web evidence.

Instead of simply asking an AI model whether a claim is true, SachCheck searches the web, retrieves relevant source pages, extracts evidence, and then uses AI to reason against that evidence.

If there is not enough reliable evidence, SachCheck can return **Unverified** instead of guessing.

---

## 🚀 Live Demo

https://sachcheck-client-7ple.onrender.com/

---

## 💡 Problem

People receive thousands of forwarded messages through WhatsApp, Instagram, Telegram, Facebook, and other platforms.

These messages may contain:

- Fake offers
- Misleading health information
- Fake announcements
- Financial scams
- False educational claims
- Fabricated information
- Clickbait
- Misleading statistics
- "Forward this to 10 people" messages

Manually verifying these claims requires opening multiple websites, reading articles, comparing information, and deciding whether the available evidence actually supports the claim.

SachCheck simplifies this process into a single verification workflow.

---

## 💡 Solution

SachCheck allows users to:

1. Paste a forwarded message
2. Upload a screenshot
3. Detect and understand the input language
4. Extract the core factual claim
5. Search the web for relevant information
6. Retrieve actual source pages
7. Extract relevant evidence
8. Analyze the evidence using AI
9. Generate a verification verdict
10. Explain the result
11. Display the sources used for verification

---

## 🔄 How SachCheck Works

```text
User Input
    │
    ├── Paste Text
    │
    └── Upload Screenshot
            │
            ▼
    Language Detection
            │
            ▼
      Claim Extraction
            │
            ▼
       Web Searching
            │
            ▼
    Source Page Retrieval
            │
            ▼
      Evidence Extraction
            │
            ▼
     Evidence-Grounded AI
            │
            ▼
         Verdict
            │
            ├── True
            ├── False
            ├── Misleading
            └── Unverified
            │
            ▼
   Explanation + Evidence
            │
            ▼
        Source Links
