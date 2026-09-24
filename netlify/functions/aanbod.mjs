/* GET /api/aanbod — het vastgoedaanbod uit WHISE, in de vorm die de site leest.
   Netlify's CDN bewaart het antwoord 10 minuten, zodat WHISE niet bij elk
   bezoek wordt aangesproken. Zonder WHISE-gegevens: { bron: 'demo' }. */
import { leesConfig, haalAanbod } from '../lib/whise.mjs';

function json(data, status, extra = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', ...extra }
  });
}

export default async (req) => {
  if (req.method !== 'GET') return json({ fout: 'Methode niet toegelaten' }, 405, { Allow: 'GET' });

  const cfg = leesConfig();
  if (!cfg) return json({ bron: 'demo', panden: [] }, 200, { 'Cache-Control': 'no-store' });

  try {
    const panden = await haalAanbod(cfg);
    return json({ bron: 'whise', bijgewerkt: new Date().toISOString(), panden }, 200, {
      'Cache-Control': 'public, max-age=60',
      'Netlify-CDN-Cache-Control': 'public, durable, s-maxage=600, stale-while-revalidate=3600'
    });
  } catch (fout) {
    console.error('aanbod:', fout.message);
    return json({ fout: 'Het aanbod kon niet geladen worden.' }, 502, { 'Cache-Control': 'no-store' });
  }
};

export const config = { path: '/api/aanbod' };
