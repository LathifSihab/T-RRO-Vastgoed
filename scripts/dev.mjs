// Lokale ontwikkelserver: de site + de Netlify Functions op /api/*,
// zonder Netlify CLI. Leest WHISE-gegevens uit .env als dat bestaat.
//   node scripts/dev.mjs            → http://localhost:8888
//   PORT=3000 node scripts/dev.mjs
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';

if (existsSync('.env')) {
  for (const regel of readFileSync('.env', 'utf8').split(/\r?\n/)) {
    const m = regel.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !(m[1] in process.env)) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}

const functies = {
  '/api/aanbod': (await import('../netlify/functions/aanbod.mjs')).default,
  '/api/lead': (await import('../netlify/functions/lead.mjs')).default,
  '/sitemap-aanbod.xml': (await import('../netlify/functions/sitemap-aanbod.mjs')).default
};

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript',
  '.svg': 'image/svg+xml', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.json': 'application/json', '.woff2': 'font/woff2', '.webp': 'image/webp', '.xml': 'application/xml', '.txt': 'text/plain'
};

const poort = Number(process.env.PORT) || 8888;
const ROUTES = [/^\/(aanbod|over|verhalen|waardescan|woonprofiel|contact)\/?$/, /^\/(aanbod|verhalen)\/[^/]+\/?$/];

createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const functie = functies[url.pathname];
  if (functie) {
    const stukken = [];
    for await (const stuk of req) stukken.push(stuk);
    const verzoek = new Request(url, {
      method: req.method,
      headers: req.headers,
      body: ['GET', 'HEAD'].includes(req.method) ? undefined : Buffer.concat(stukken)
    });
    const antwoord = await functie(verzoek, {});
    res.writeHead(antwoord.status, Object.fromEntries(antwoord.headers));
    res.end(Buffer.from(await antwoord.arrayBuffer()));
    return;
  }
  let pad = normalize(decodeURIComponent(url.pathname)).replace(/^([/\\])+/, '');
  if (!pad || pad.endsWith('/') || pad.endsWith('\\')) pad = join(pad, 'index.html');
  if (!pad.startsWith('..') && existsSync(pad) && statSync(pad).isFile()) {
    res.writeHead(200, { 'Content-Type': TYPES[extname(pad).toLowerCase()] || 'application/octet-stream' });
    res.end(readFileSync(pad));
    return;
  }
  // zoals netlify.toml: bekende paden → index.html, al de rest → 404 met dezelfde pagina
  const bekend = ROUTES.some(r => r.test(url.pathname));
  res.writeHead(bekend ? 200 : 404, { 'Content-Type': TYPES['.html'] });
  res.end(readFileSync('index.html'));
}).listen(poort, () => {
  const modus = process.env.WHISE_USERNAME ? 'WHISE' : 'demomodus (geen .env)';
  console.log(`TÈRRO lokaal: http://localhost:${poort}  —  ${modus}`);
});
