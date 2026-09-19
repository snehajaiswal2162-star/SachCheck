# SachCheck 🔎

### Don't just forward. Verify.

SachCheck is an AI-powered fact-verification tool that helps users check claims shared through WhatsApp forwards, social media posts, screenshots, and other online messages.

Instead of simply asking an AI model whether something is true, SachCheck retrieves relevant information from the web, reads the underlying source pages, compares the claim against the retrieved evidence, and produces an evidence-grounded verdict.

> **SachCheck does not claim to know "the truth." It verifies a claim against retrieved evidence and returns `Unverified` when the available evidence is insufficient.**

---

## 🚨 The Problem

Misleading information spreads quickly through:

- WhatsApp forwards
- Social media posts
- Screenshots
- Viral messages
- Health claims
- Fake offers and announcements

Most people don't have the time to manually search multiple websites and read several source articles just to verify one forwarded message.

The problem is not only finding information — it is **connecting a specific claim to reliable evidence**.

---

## 💡 Our Solution

SachCheck turns a forwarded message into an evidence-based verification report.

### The user can:

1. Paste a forwarded message
2. Upload a screenshot
3. Let SachCheck extract the core factual claim
4. Search the web for supporting or contradicting evidence
5. Fetch and read relevant source pages
6. Compare the claim against the retrieved evidence
7. Receive a clear verdict with an explanation and source links

### Verdicts

| Verdict | Meaning |
|---|---|
| 🟢 **True** | Retrieved evidence supports the claim |
| 🔴 **False** | Retrieved evidence contradicts the claim |
| 🟠 **Misleading** | The claim contains some truth but presents it inaccurately or without important context |
| ⚪ **Unverified** | Available evidence is insufficient to make a reliable determination |

---

## ⚙️ How SachCheck Works

```text
┌─────────────────────┐
│  Forward / Screenshot│
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│ Claim Extraction    │
│ + Language Detection│
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│ Web Search          │
│ Serper Search API   │
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│ Source Retrieval    │
│ Fetch + Clean Pages │
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│ Evidence Analysis   │
│ Gemini              │
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│ Verification Report │
│ Verdict + Evidence  │
│ + Sources           │
└─────────────────────┘
