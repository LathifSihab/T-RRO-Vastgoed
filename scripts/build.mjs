// Kopieert enkel wat online hoort naar dist/ (Netlify publiceert die map).
// Bronbestanden zoals _originelen/ en de merkstijlbeelden blijven zo offline.
// (Eigen kopieer- en wisfuncties: cpSync/rmSync falen in Node 24 op Windows
//  wanneer het pad een 'È' bevat, zoals in 'TÈRRO Vastgoed'.)
import { copyFileSync, mkdirSync, readdirSync, statSync, unlinkSync, rmdirSync, existsSync } from 'node:fs';
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
console.log('dist/ klaar');
