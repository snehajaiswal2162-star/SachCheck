export async function searchEvidence(claim) {
  if (!process.env.SERPER_KEY) throw new Error('SERPER_KEY is not configured');
  const res = await fetch('https://google.serper.dev/search', {
    method: 'POST',
    headers: { 'X-API-KEY': process.env.SERPER_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({ q: claim, num: 5 })
  });
  if (!res.ok) throw new Error(`Search API returned ${res.status}`);
  const data = await res.json();
  return (data.organic || []).slice(0, 5).map(r => ({ title: r.title, url: r.link, snippet: r.snippet || '' }));
}
