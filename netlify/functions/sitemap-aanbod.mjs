/* GET /sitemap-aanbod.xml — alle panden uit WHISE, voor zoekmachines.
   Maakt deel uit van /sitemap.xml (sitemapindex, gemaakt door scripts/build.mjs).
   In demomodus is de lijst leeg: voorbeeldpanden horen niet in Google. */
import { leesConfig, haalAanbod } from '../lib/whise.mjs';

const SITE = (process.env.SITE_URL || 'https://terro.be').replace(/\/$/, '');

function xml(tekst, status = 200, cache = 'public, max-age=300') {
  return new Response(tekst, {
    status,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': cache,
      'Netlify-CDN-Cache-Control': 'public, durable, s-maxage=3600, stale-while-revalidate=86400'
    }
  });
}

const escape = s => String(s).replace(/[<>&'"]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[c]));

export default async () => {
  const cfg = leesConfig();
  let panden = [];
  if (cfg) {
    try {
      panden = await haalAanbod(cfg);
    } catch (fout) {
      console.error('sitemap-aanbod:', fout.message);
      return xml('<?xml version="1.0" encoding="UTF-8"?><error>tijdelijk niet beschikbaar</error>', 503, 'no-store');
    }
  }
  const regels = panden.map(p =>
    '  <url><loc>' + escape(SITE + p.pad) + '</loc>' +
    (p.bijgewerkt ? '<lastmod>' + escape(String(p.bijgewerkt).slice(0, 10)) + '</lastmod>' : '') +
    '</url>');
  return xml('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    regels.join('\n') + (regels.length ? '\n' : '') + '</urlset>\n');
};

export const config = { path: '/sitemap-aanbod.xml' };
