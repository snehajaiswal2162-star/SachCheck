import * as cheerio from 'cheerio';

export async function fetchPageText(url) {
  try {
    const res = await fetch(url, {
      signal: AbortSignal.timeout(5000),
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; SachCheck/1.0)' }
    });
    if (!res.ok) return null;
    const type = res.headers.get('content-type') || '';
    if (!type.includes('text/html')) return null;
    const html = await res.text();
    const $ = cheerio.load(html);
    $('script, style, nav, footer, header, noscript, svg, form').remove();
    const text = $('body').text().replace(/\s+/g, ' ').trim();
    return text ? text.slice(0, 5000) : null;
  } catch {
    return null;
  }
}

export async function fetchAllSources(results) {
  const pages = await Promise.all(results.map(r => fetchPageText(r.url)));
  return results.map((r, i) => ({ ...r, content: pages[i] })).filter(r => r.content);
}
