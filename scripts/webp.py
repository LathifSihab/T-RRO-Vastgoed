"""Maakt WebP-versies in meerdere breedtes van elke JPG in images/.

    python scripts/webp.py

Voor elke foto ontstaan naam-480.webp, naam-800.webp, ... (nooit breder dan
het origineel). De JPG blijft bestaan als terugval voor oude browsers.
Daarna wordt het blok BEELDMATEN in js/main.js bijgewerkt, zodat de
JavaScript weet welke breedtes er zijn voor de foto's die hij zelf tekent.
Vereist Pillow (pip install pillow).
"""
import json
import os
import re
from PIL import Image

MAP = 'images'
BREEDTES = [480, 800, 1200, 1800]
HERO_BREEDTES = [640, 1024, 1440, 2000]
OVERSLAAN = {'og-terro.jpg'}  # deelafbeelding voor sociale media: blijft JPG

maten = {}
for naam in sorted(os.listdir(MAP)):
    if not naam.lower().endswith('.jpg') or naam in OVERSLAAN:
        continue
    basis = naam[:-4]
    beeld = Image.open(os.path.join(MAP, naam)).convert('RGB')
    reeks = HERO_BREEDTES if basis.startswith('hero-') else BREEDTES
    breedtes = [b for b in reeks if b < beeld.width] + [beeld.width]
    breedtes = sorted(set(b for b in breedtes if b <= beeld.width))
    for b in breedtes:
        uit = os.path.join(MAP, f'{basis}-{b}.webp')
        kopie = beeld.resize((b, round(beeld.height * b / beeld.width)), Image.LANCZOS) if b < beeld.width else beeld
        kopie.save(uit, 'WEBP', quality=78, method=6)
    maten[basis] = breedtes
    totaal = sum(os.path.getsize(os.path.join(MAP, f'{basis}-{b}.webp')) for b in breedtes)
    print(f'{naam:34} {breedtes}  {totaal // 1024} KB webp  (jpg {os.path.getsize(os.path.join(MAP, naam)) // 1024} KB)')

# oude webp-bestanden van foto's die niet meer bestaan, opruimen
for naam in os.listdir(MAP):
    m = re.match(r'(.+)-(\d+)\.webp$', naam)
    if m and (m.group(1) not in maten or int(m.group(2)) not in maten[m.group(1)]):
        os.remove(os.path.join(MAP, naam))

js = os.path.join('js', 'main.js')
tekst = open(js, encoding='utf-8').read()
blok = '/* BEELDMATEN:begin (gegenereerd door scripts/webp.py) */\nvar BEELDMATEN = ' + json.dumps(maten, separators=(',', ':')) + ';\n/* BEELDMATEN:eind */'
tekst, n = re.subn(r'/\* BEELDMATEN:begin.*?/\* BEELDMATEN:eind \*/', lambda _: blok, tekst, flags=re.S)
if n == 0:
    raise SystemExit('Blok BEELDMATEN niet gevonden in js/main.js')
open(js, 'w', encoding='utf-8', newline='').write(tekst)
print('js/main.js bijgewerkt')
