/* POST /api/lead — de formulieren van de site worden een contact in WHISE.
   Soorten: contact, waardescan, woonprofiel, bezichtiging.
   Zonder WHISE-gegevens (demomodus) antwoordt de functie { ok: true, demo: true }. */
import { leesConfig, contactVoor, whise } from '../lib/whise.mjs';

const SOORTEN = ['contact', 'waardescan', 'woonprofiel', 'bezichtiging'];
const MAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function json(data, status) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' }
  });
}

function tekst(v, max) {
  return typeof v === 'string' ? v.trim().slice(0, max) : '';
}

/** Houdt enkel bekende velden over, ingekort tot redelijke lengtes. */
function schoonmaken(invoer) {
  const lijst = v => (Array.isArray(v) ? v : v ? [v] : []).map(x => tekst(x, 40)).filter(Boolean).slice(0, 10);
  return {
    soort: tekst(invoer.soort, 20),
    naam: tekst(invoer.naam, 120),
    email: tekst(invoer.email, 160),
    telefoon: tekst(invoer.telefoon, 40),
    onderwerp: tekst(invoer.onderwerp, 60),
    adres: tekst(invoer.adres, 200),
    type: invoer.soort === 'woonprofiel' ? lijst(invoer.type) : tekst(invoer.type, 60),
    timing: tekst(invoer.timing, 60),
    doel: tekst(invoer.doel, 30),
    budget: tekst(invoer.budget, 30),
    slaapkamers: tekst(invoer.slaapkamers, 20),
    streek: tekst(invoer.streek, 200),
    voorkeur: tekst(invoer.voorkeur, 60),
    pandId: tekst(String(invoer.pandId ?? ''), 20),
    pandTitel: tekst(invoer.pandTitel, 160),
    verhaal: tekst(invoer.verhaal, 4000),
    bericht: tekst(invoer.bericht, 4000),
    website: tekst(invoer.website, 200) // honeypot
  };
}

export default async (req) => {
  if (req.method !== 'POST') return json({ fout: 'Methode niet toegelaten' }, 405);

  // Enkel aanvragen vanaf de eigen site (browsers sturen altijd een Origin mee bij POST).
  const origin = req.headers.get('origin');
  if (origin) {
    let eigen = false;
    try { eigen = new URL(origin).host === new URL(req.url).host; } catch { eigen = false; }
    if (!eigen) return json({ fout: 'Niet toegelaten' }, 403);
  }

  let invoer;
  try { invoer = await req.json(); } catch { return json({ fout: 'Ongeldige aanvraag' }, 400); }
  const aanvraag = schoonmaken(invoer || {});

  // Spambot vulde het verborgen veld in: doe alsof het gelukt is.
  if (aanvraag.website) return json({ ok: true }, 200);

  if (!SOORTEN.includes(aanvraag.soort)) return json({ fout: 'Onbekend formulier' }, 400);
  if (!aanvraag.naam) return json({ fout: 'Vul je naam in.', veld: 'naam' }, 422);
  if (!MAIL.test(aanvraag.email)) return json({ fout: 'Vul een geldig e-mailadres in.', veld: 'email' }, 422);
  if (aanvraag.soort === 'waardescan' && !aanvraag.adres) {
    return json({ fout: 'Vul het adres van de woning in.', veld: 'adres' }, 422);
  }

  const cfg = leesConfig();
  if (!cfg) {
    console.log('lead (demomodus, niet doorgestuurd):', aanvraag.soort);
    return json({ ok: true, demo: true }, 200);
  }

  try {
    const resultaat = await whise(cfg, 'v1/contacts/create', contactVoor(aanvraag, cfg));
    return json({ ok: true, contactId: resultaat && resultaat.contactId }, 200);
  } catch (fout) {
    console.error('lead:', aanvraag.soort, fout.message);
    return json({ fout: 'Versturen is niet gelukt.' }, 502);
  }
};

export const config = { path: '/api/lead' };
