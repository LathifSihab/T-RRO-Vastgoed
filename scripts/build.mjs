// Kopieert enkel wat online hoort naar dist/ (Netlify publiceert die map)
// en maakt robots.txt en de sitemaps aan.
// Bronbestanden zoals _originelen/ en de merkstijlbeelden blijven zo offline.
// (Eigen kopieer- en wisfuncties: cpSync/rmSync falen in Node 24 op Windows
//  wanneer het pad een 'È' bevat, zoals in 'TÈRRO Vastgoed'.)
import {
  copyFileSync, mkdirSync, readdirSync, statSync, unlinkSync, rmdirSync, existsSync,
  readFileSync, writeFileSync
} from 'node:fs';
import { join } from 'node:path';

const UIT = 'dist';
const NIET_ONLINE = new Set(['Beachflag idee Terro.png', 'design system terro.jpeg', 'CREDITS.md']);

function kopieer(bron, doel) {
  if (statSync(bron).isDirectory()) {
    mkdirSync(doel, { recursive: true });
    for (const naam of readdirSync(bron)) {
      if (!NIET_ONLINE.has(naam)) kopieer(join(bron, naam), join(doel, naam));
    }
  } else {
    copyFileSync(bron, doel);
  }
}

function wis(pad) {
  if (!existsSync(pad)) return;
  if (statSync(pad).isDirectory()) {
    for (const naam of readdirSync(pad)) wis(join(pad, naam));
    rmdirSync(pad);
  } else {
    unlinkSync(pad);
  }
}

wis(UIT);
mkdirSync(UIT);
// google…html: eigendomsbewijs voor Google Search Console, niet verwijderen
for (const item of ['index.html', 'llms.txt', 'google1943806656245000.html', 'css', 'js', 'images', 'fonts']) kopieer(item, join(UIT, item));
// Netlify toont 404.html (met status 404) voor onbekende paden; de router
// in main.js ziet het onbekende pad en toont het 'niet gevonden'-zicht.
copyFileSync('index.html', join(UIT, '404.html'));

// ---------- zoekmachines ----------
// SITE_URL kan in Netlify gezet worden; standaard het definitieve domein.
const SITE = (process.env.SITE_URL || 'https://terro.be').replace(/\/$/, '');
const vandaag = new Date().toISOString().slice(0, 10);
const NL = '\n';
const main = readFileSync('js/main.js', 'utf8');

// ---------- één HTML-bestand per vaste pagina ----------
// Zoekmachines en AI-assistenten (ChatGPT, Perplexity, Claude …) voeren vaak
// geen JavaScript uit. Zonder dit zag elke URL eruit als de startpagina.
// Titel en beschrijving komen uit PAGINA in js/main.js, zodat ze gelijk lopen
// met wat de router zet; het juiste zicht staat meteen zichtbaar.
const bron = readFileSync('index.html', 'utf8');
const attr = t => t.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
function metaVan(naam) {
  const m = main.match(new RegExp(naam + ":\\s*\\{titel:'([^']*)', beschrijving:'([^']*)'"));
  if (!m) throw new Error('PAGINA.' + naam + ' niet gevonden in js/main.js');
  return { titel: m[1] + ' — TÈRRO Vastgoed', beschrijving: m[2] };
}
function pagina(zicht, pad, meta) {
  const html = bron.replace(`<section class="zicht" id="zicht-${zicht}" hidden>`, `<section class="zicht" id="zicht-${zicht}">`);
  if (!meta) return html;
  const url = SITE + pad;
  return html
    .replace(/<title>[^<]*<\/title>/, `<title>${attr(meta.titel)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*/, '$1' + attr(meta.beschrijving))
    .replace(/(<meta property="og:title" content=")[^"]*/, '$1' + attr(meta.titel))
    .replace(/(<meta property="og:description" content=")[^"]*/, '$1' + attr(meta.beschrijving))
    .replace(/(<meta property="og:url" content=")[^"]*/, '$1' + url)
    .replace(/(<link rel="canonical" href=")[^"]*/, '$1' + url);
}
const VASTE = ['aanbod', 'over', 'verhalen', 'waardescan', 'woonprofiel', 'contact', 'privacy'];
writeFileSync(join(UIT, 'index.html'), pagina('home', '/'));
for (const naam of VASTE) writeFileSync(join(UIT, naam + '.html'), pagina(naam, '/' + naam, metaVan(naam)));

// de verhalen staan in js/main.js; hun slugs worden daaruit gelezen
const begin = main.indexOf('var VERHALEN = [');
const verhalenBlok = begin === -1 ? '' : main.slice(begin, main.indexOf('];', begin));
const verhalen = [...verhalenBlok.matchAll(/slug:'([a-z0-9-]+)'/g)].map(m => m[1]);

const paginas = ['/', '/aanbod', '/over', '/verhalen', '/waardescan', '/woonprofiel', '/contact', '/privacy',
  ...verhalen.map(s => '/verhalen/' + s)];

writeFileSync(join(UIT, 'sitemap-paginas.xml'), [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...paginas.map(p => `  <url><loc>${SITE}${p}</loc><lastmod>${vandaag}</lastmod></url>`),
  '</urlset>', ''
].join(NL));

// index: vaste pagina's (hierboven) + panden (Netlify Function, live uit WHISE)
writeFileSync(join(UIT, 'sitemap.xml'), [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  `  <sitemap><loc>${SITE}/sitemap-paginas.xml</loc><lastmod>${vandaag}</lastmod></sitemap>`,
  `  <sitemap><loc>${SITE}/sitemap-aanbod.xml</loc></sitemap>`,
  '</sitemapindex>', ''
].join(NL));

writeFileSync(join(UIT, 'robots.txt'), [
  'User-agent: *', 'Allow: /', 'Disallow: /api/', '', `Sitemap: ${SITE}/sitemap.xml`, ''
].join(NL));

console.log(`dist/ klaar (${paginas.length} vaste pagina's in de sitemap)`);
