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
for (const item of ['index.html', 'css', 'js', 'images', 'fonts']) kopieer(item, join(UIT, item));
// Netlify toont 404.html (met status 404) voor onbekende paden; de router
// in main.js ziet het onbekende pad en toont het 'niet gevonden'-zicht.
copyFileSync('index.html', join(UIT, '404.html'));

// ---------- zoekmachines ----------
// SITE_URL kan in Netlify gezet worden; standaard het definitieve domein.
const SITE = (process.env.SITE_URL || 'https://terro.be').replace(/\/$/, '');
const vandaag = new Date().toISOString().slice(0, 10);
const NL = '\n';

// de verhalen staan in js/main.js; hun slugs worden daaruit gelezen
const main = readFileSync('js/main.js', 'utf8');
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
