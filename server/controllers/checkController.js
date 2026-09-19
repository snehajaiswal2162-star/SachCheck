import { extractClaim, judgeClaim } from '../services/aiService.js';
import { searchEvidence } from '../services/searchService.js';
import { fetchAllSources } from '../services/fetchService.js';
import { extractTextFromImage } from '../services/visionService.js';

async function runPipeline(text) {
  if (!text || text.trim().length < 5) throw new Error('Please provide a longer message to verify.');
  const { detectedLanguage, extractedClaim } = await extractClaim(text.trim());
  const results = await searchEvidence(extractedClaim);
  if (!results.length) {
    const verdict = await judgeClaim({ claim: extractedClaim, detectedLanguage, sources: [], snippetsOnly: true });
    return { detectedLanguage, extractedClaim, ...verdict, citedSources: [] };
  }
  const fetched = await fetchAllSources(results);
  const evidenceSources = fetched.length ? fetched : results;
  const verdict = await judgeClaim({ claim: extractedClaim, detectedLanguage, sources: evidenceSources, snippetsOnly: fetched.length === 0 });
  const sourceUrls = verdict.citedSources?.filter(u => evidenceSources.some(s => s.url === u)).slice(0, 3);
  return { detectedLanguage, extractedClaim, ...verdict, citedSources: sourceUrls?.length ? sourceUrls : evidenceSources.slice(0, 3).map(s => s.url) };
}

export async function checkText(req, res) {
  try { res.json(await runPipeline(req.body?.text)); }
  catch (error) { console.error(error); res.status(500).json({ error: 'We could not complete the verification. Please try again.' }); }
}

export async function checkImage(req, res) {
  try {
    const text = await extractTextFromImage(req.body?.imageBase64 || '');
    res.json(await runPipeline(text));
  } catch (error) { console.error(error); res.status(500).json({ error: 'We could not read or verify that screenshot. Please try another image.' }); }
}
