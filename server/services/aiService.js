import { GoogleGenerativeAI } from '@google/generative-ai';

const MODEL = process.env.GEMINI_MODEL || 'gemini-3.5-flash';

function getModel() {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured');
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  return genAI.getGenerativeModel({ model: MODEL });
}

async function generateJson(prompt) {
  let lastError;
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const model = getModel();
      const suffix = attempt === 1 ? '\nYour last response was not valid JSON. Return ONLY the JSON object, nothing else.' : '';
      const result = await model.generateContent(prompt + suffix);
      const raw = result.response.text().trim().replace(/^```json\s*/i, '').replace(/```$/i, '').trim();
      return JSON.parse(raw);
    } catch (error) {
      lastError = error;
    }
  }
  throw new Error(`AI JSON response failed after retry: ${lastError?.message || 'unknown error'}`);
}

export async function extractClaim(rawText) {
  const prompt = `You will be given a forwarded message (from WhatsApp or similar), possibly in Hindi, Marathi, English, or another Indian language. Detect the language, and extract the single core factual claim being made (ignore greetings, emojis, "forward this to 10 people" filler). Respond with ONLY valid JSON:\n\n{\n  "detectedLanguage": "string",\n  "extractedClaim": "string (in English, for search purposes)"\n}\n\nMessage:\n"""\n${rawText}\n"""`;
  const data = await generateJson(prompt);
  if (!data.detectedLanguage || !data.extractedClaim) throw new Error('AI returned an incomplete claim extraction');
  return data;
}

export async function judgeClaim({ claim, detectedLanguage, sources, snippetsOnly = false }) {
  const evidence = sources.map((s, i) => ({
    source: i + 1,
    title: s.title,
    url: s.url,
    evidence: s.content || s.snippet || ''
  }));
  const mode = snippetsOnly ? 'All page fetches failed. These are search snippets only. Treat this as lower-confidence evidence and prefer Unverified when the snippets do not clearly establish the claim.' : 'Use the fetched page content as the primary evidence.';
  const prompt = `You are a cautious fact-checker. You are given a claim and the actual fetched content of several web pages about it (not just search snippets). Based ONLY on this evidence — do not use outside knowledge — decide a verdict: "True", "False", "Misleading", or "Unverified". Use "Unverified" whenever the evidence does not clearly confirm or deny the claim; do not guess. Then write a short, plain-language explanation of your reasoning, written in ${detectedLanguage}, in a calm, non-alarmist tone. Respond with ONLY valid JSON:\n\n{\n  "verdict": "True" | "False" | "Misleading" | "Unverified",\n  "explanation": "string, written in ${detectedLanguage}",\n  "citedSources": ["url1", "url2"]\n}\n\nClaim: ${claim}\n\nEvidence mode: ${mode}\n\nFetched source content:\n${JSON.stringify(evidence)}`;
  const data = await generateJson(prompt);
  const allowed = ['True', 'False', 'Misleading', 'Unverified'];
  if (!allowed.includes(data.verdict)) data.verdict = 'Unverified';
  data.citedSources = Array.isArray(data.citedSources) ? data.citedSources.slice(0, 3) : sources.slice(0, 3).map(s => s.url);
  return data;
}
