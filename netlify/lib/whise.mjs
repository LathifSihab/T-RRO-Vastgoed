/* ============================================================
   WHISE — gedeelde servercode voor de Netlify Functions.

   Alles wat met WHISE praat, gebeurt hier en dus uitsluitend op
   de server: gebruikersnaam, wachtwoord en tokens komen nooit in
   de browser terecht.

   Configuratie via omgevingsvariabelen (Netlify → Site settings →
   Environment variables):
     WHISE_USERNAME, WHISE_PASSWORD, WHISE_CLIENT_ID, WHISE_OFFICE_ID
   Optioneel:
     WHISE_BASE_URL   (standaard https://api.whise.eu/)
     WHISE_LANGUAGE   (standaard nl-BE)

   Ontbreekt er iets, dan draait de site in demomodus: het aanbod
   komt uit de voorbeeldpanden in js/main.js en formulieren worden
   niet doorgestuurd.

   API-documentatie: https://api.whise.eu/WebsiteDesigner.html
   ============================================================ */

export function leesConfig() {
  const cfg = {
    basis: (process.env.WHISE_BASE_URL || 'https://api.whise.eu/').replace(/\/?$/, '/'),
    gebruiker: process.env.WHISE_USERNAME,
    wachtwoord: process.env.WHISE_PASSWORD,
    clientId: Number(process.env.WHISE_CLIENT_ID),
    officeId: Number(process.env.WHISE_OFFICE_ID),
    taal: process.env.WHISE_LANGUAGE || 'nl-BE'
  };
  const volledig = cfg.gebruiker && cfg.wachtwoord && cfg.clientId > 0 && cfg.officeId > 0;
  return volledig ? cfg : null;
}

export class WhiseFout extends Error {
  constructor(bericht, status) {
    super(bericht);
    this.status = status;
  }
}

async function post(cfg, pad, body, token) {
  const headers = { 'Content-Type': 'application/json', Accept: 'application/json' };
  if (token) headers.Authorization = 'Bearer ' + token;
  const antwoord = await fetch(cfg.basis + pad, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(15000)
  });
  const tekst = await antwoord.text();
  let data = null;
  try { data = tekst ? JSON.parse(tekst) : null; } catch { data = null; }
  if (!antwoord.ok) {
    throw new WhiseFout(`WHISE ${pad} gaf ${antwoord.status}`, antwoord.status);
  }
  if (data && data.isValidRequest === false) {
    const fouten = (data.validationErrors || []).map(f => f.message || JSON.stringify(f)).join('; ');
    throw new WhiseFout(`WHISE ${pad} weigerde het verzoek: ${fouten}`, 400);
  }
  return data;
}

/* ---------- tokens ----------
   Eerst een gebruikerstoken (/token), daarmee een clienttoken
   (/v1/admin/clients/token). Het clienttoken blijft bewaard zolang
   de functie warm is en wordt vernieuwd kort voor het verloopt. */
let tokenCache = null; // { token, geldigTot }

function vervaldatum(jwt) {
  try {
    const payload = JSON.parse(Buffer.from(jwt.split('.')[1], 'base64url').toString());
    if (payload.exp) return payload.exp * 1000;
  } catch { /* geen leesbaar JWT: val terug op een vaste duur */ }
  return Date.now() + 30 * 60 * 1000;
}

async function clientToken(cfg) {
  if (tokenCache && tokenCache.geldigTot - Date.now() > 5 * 60 * 1000) return tokenCache.token;
  const gebruiker = await post(cfg, 'token', { username: cfg.gebruiker, password: cfg.wachtwoord });
  if (!gebruiker || !gebruiker.token) throw new WhiseFout('WHISE gaf geen gebruikerstoken terug', 502);
  const client = await post(cfg, 'v1/admin/clients/token',
    { ClientId: cfg.clientId, OfficeId: cfg.officeId }, gebruiker.token);
  if (!client || !client.token) throw new WhiseFout('WHISE gaf geen clienttoken terug', 502);
  tokenCache = { token: client.token, geldigTot: vervaldatum(client.token) };
  return tokenCache.token;
}

/** POST naar WHISE met het clienttoken; bij een verlopen token één keer opnieuw. */
export async function whise(cfg, pad, body) {
  try {
    return await post(cfg, pad, body, await clientToken(cfg));
  } catch (fout) {
    if (fout.status === 401) {
      tokenCache = null;
      return post(cfg, pad, body, await clientToken(cfg));
    }
    throw fout;
  }
}

/* ============================================================
   AANBOD
   ============================================================ */

// purposeStatus-id's (https://api.whise.eu/docs/lookup.html?key=purposestatus)
const TE_KOOP = [1, 15];
const TE_HUUR = [2];
const IN_OPTIE = [5, 6, 16];
const SEALED = [3, 4, 14, 17];
const OP_DE_SITE = [...TE_KOOP, ...TE_HUUR, ...IN_OPTIE, ...SEALED];

// category-id's (https://api.whise.eu/docs/lookup.html?key=category)
const CATEGORIE = {
  1: 'Woning', 2: 'Appartement', 3: 'Bouwgrond', 4: 'Kantoor',
  5: 'Handelspand', 6: 'Industrieel pand', 7: 'Garage / parking'
};

const EPC = { App: 'A++', Ap: 'A+' };

export async function haalAanbod(cfg) {
  const estates = [];
  const limiet = 100;
  for (let offset = 0; offset < 1000; offset += limiet) {
    const data = await whise(cfg, 'v1/estates/list', {
      Filter: {
        LanguageIds: [cfg.taal],
        PurposeStatusIds: OP_DE_SITE,
        ShowDetails: true
      },
      Page: { Limit: limiet, Offset: offset },
      Sort: [{ Field: 'putOnlineDateTime', Ascending: false }]
    });
    const pagina = (data && data.estates) || [];
    estates.push(...pagina);
    const totaal = data && typeof data.totalCount === 'number' ? data.totalCount : estates.length;
    if (pagina.length < limiet || estates.length >= totaal) break;
  }
  return estates.map(e => naarPand(e, cfg.taal));
}

/** Kies de tekst in de gevraagde taal, anders Nederlands, anders de eerste. */
function tekstIn(lijst, taal) {
  if (!Array.isArray(lijst) || !lijst.length) return '';
  const kies = lijst.find(t => t.languageId === taal)
    || lijst.find(t => (t.languageId || '').startsWith('nl'))
    || lijst[0];
  return (kies && kies.content || '').trim();
}

function alineas(tekst) {
  if (!tekst) return [];
  const schoon = tekst.replace(/\r\n?/g, '\n').replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]+>/g, '');
  const blokken = schoon.split(/\n\s*\n/).map(s => s.trim()).filter(Boolean);
  return blokken.length > 1 ? blokken : schoon.split('\n').map(s => s.trim()).filter(Boolean);
}

/* Zelfde adresregels als js/main.js (slugify, titelMetPlaats), zodat de
   sitemap en de pagina precies hetzelfde adres gebruiken. */
export function slugify(s) {
  return String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '')
    .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 70);
}
function titelMetPlaats(titel, plaats) {
  if (!plaats || titel.toLowerCase().includes(plaats.toLowerCase())) return titel;
  return titel + ' in ' + plaats;
}

function getal(v) {
  const n = typeof v === 'number' ? v : parseFloat(String(v || '').replace(',', '.'));
  return Number.isFinite(n) && n > 0 ? n : null;
}

/** Zet een WHISE-estate om naar de vorm die js/main.js verwacht. */
export function naarPand(e, taal = 'nl-BE') {
  const doelId = e.purpose && e.purpose.id;
  const statusId = e.purposeStatus && e.purposeStatus.id;
  const doel = doelId === 2 ? 'huur' : 'koop';
  const status = SEALED.includes(statusId) ? 'sealed'
    : IN_OPTIE.includes(statusId) ? 'optie'
    : doel === 'huur' ? 'te-huur' : 'te-koop';

  const type = (e.subCategory && e.subCategory.name)
    || CATEGORIE[e.category && e.category.id] || 'Pand';

  const kort = tekstIn(e.shortDescription, taal) || tekstIn(e.sms, taal);
  const lang = alineas(tekstIn(e.longDescription, taal));

  const bouwjaarDetail = (e.details || []).find(d =>
    /construct|bouwjaar/i.test(d.label || '') || (d.type === 'year' && d.id === 14));

  const fotos = (e.pictures || [])
    .slice()
    .sort((a, b) => (a.order || 0) - (b.order || 0))
    .map(f => ({
      src: f.urlXXL || f.urlLarge || f.urlOriginal || f.urlSmall,
      kaart: f.urlLarge || f.urlXXL || f.urlSmall,
      duim: f.urlSmall || f.urlLarge,
      alt: (f.description || '').trim()
    }))
    .filter(f => f.src);

  const plaats = e.city || '';
  const titel = (e.name || '').trim() || (type + (plaats ? ' in ' + plaats : ''));

  return {
    id: e.id,
    slug: String(e.id),
    pad: '/aanbod/' + e.id + '-' + slugify(titelMetPlaats(titel, plaats)),
    bijgewerkt: e.updateDateTime || e.putOnlineDateTime || null,
    titel,
    plaats,
    type,
    doel,
    status,
    prijs: e.displayPrice === false ? 0 : (getal(e.price) || 0),
    periodiek: doel === 'huur',
    slaapkamers: getal(e.rooms),
    badkamers: getal(e.bathRooms),
    bewoonbaar: getal(e.area),
    perceel: getal(e.groundArea),
    bouwjaar: bouwjaarDetail ? String(bouwjaarDetail.value).slice(0, 4) : null,
    epcKlasse: e.energyClass ? (EPC[e.energyClass] || e.energyClass) : null,
    epcWaarde: getal(e.energyValue),
    kort,
    lang,
    beeld: fotos.length ? fotos[0].kaart : null,
    beeldAlt: fotos.length ? (fotos[0].alt || titel + (plaats ? ' in ' + plaats : '')) : '',
    beelden: fotos,
    virtueelBezoek: e.linkVirtualVisit || null
  };
}

/* ============================================================
   LEADS → WHISE-contact (/v1/contacts/create)
   ============================================================ */

const CATEGORIE_ID = { Woning: 1, Hoeve: 1, Appartement: 2, Bouwgrond: 3 };

function bedrag(tekst) {
  const n = parseInt(String(tekst || '').replace(/[^\d]/g, ''), 10);
  return Number.isFinite(n) && n > 0 ? n : null;
}

/** Bouwt de body voor /v1/contacts/create uit een gevalideerde aanvraag. */
export function contactVoor(aanvraag, cfg) {
  const regels = [];
  const tags = ['Website'];

  if (aanvraag.soort === 'contact') {
    tags.push('Contact');
    regels.push('Contactformulier website', 'Onderwerp: ' + (aanvraag.onderwerp || '-'));
  } else if (aanvraag.soort === 'waardescan') {
    tags.push('Waardescan');
    regels.push('Aanvraag waardescan',
      'Adres van de woning: ' + (aanvraag.adres || '-'),
      'Type: ' + (aanvraag.type || '-'),
      'Wanneer verkopen: ' + (aanvraag.timing || '-'));
  } else if (aanvraag.soort === 'woonprofiel') {
    tags.push('Woonprofiel');
    regels.push('Woonprofiel website',
      'Zoekt: ' + (aanvraag.doel || '-'),
      'Type: ' + ((aanvraag.type || []).join(', ') || '-'),
      'Budget tot: ' + (aanvraag.budget || '-'),
      'Slaapkamers vanaf: ' + (aanvraag.slaapkamers || '-'),
      'Waar: ' + (aanvraag.streek || '-'));
  } else if (aanvraag.soort === 'bezichtiging') {
    tags.push('Bezichtiging');
    regels.push('Aanvraag bezichtiging: ' + (aanvraag.pandTitel || '-'),
      'Voorkeur: ' + (aanvraag.voorkeur || '-'));
  }

  const vrijeTekst = aanvraag.verhaal || aanvraag.bericht;
  if (vrijeTekst) regels.push('', vrijeTekst);

  const body = {
    Name: aanvraag.naam,
    PrivateEmail: aanvraag.email,
    CountryId: 1, // België
    OfficeIds: [cfg.officeId],
    LanguageId: cfg.taal,
    Message: regels.join('\n'),
    Tags: tags
  };
  if (aanvraag.telefoon) body.PrivateTel = aanvraag.telefoon;

  if (aanvraag.soort === 'bezichtiging' && Number(aanvraag.pandId) > 0) {
    body.EstateIds = [Number(aanvraag.pandId)];
  }

  // Woonprofiel als zoekprofiel, zodat WHISE automatisch kan matchen.
  // WHISE vereist postcodes; zonder postcodes blijft het profiel in de notitie.
  if (aanvraag.soort === 'woonprofiel') {
    const postcodes = [...new Set(String(aanvraag.streek || '').match(/\b\d{4}\b/g) || [])];
    if (postcodes.length) {
      const categorieen = [...new Set((aanvraag.type || []).map(t => CATEGORIE_ID[t]).filter(Boolean))];
      const huur = /huur/i.test(aanvraag.doel || '');
      body.SearchCriteria = (categorieen.length ? categorieen : [1]).map(categorie => ({
        PurposeId: huur ? 2 : 1,
        CategoryId: categorie,
        PriceMin: 0,
        PriceMax: bedrag(aanvraag.budget) || 9999999,
        CountryId: 1,
        ZipCodes: postcodes,
        MinRooms: parseInt(aanvraag.slaapkamers, 10) || undefined
      }));
    }
  }
  return body;
}
