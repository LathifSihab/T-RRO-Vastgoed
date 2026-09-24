# WHISE integration: setup and handover

The site gets its listings from WHISE and sends every form to WHISE as a contact.
All WHISE traffic goes through two Netlify Functions, so credentials never reach the browser.

API reference: <https://api.whise.eu/WebsiteDesigner.html>

## What is connected

| Website | WHISE endpoint | Result in WHISE |
|---|---|---|
| Aanbod, home listings, property page | `POST /v1/estates/list` | Live listings with photos, specs, EPC, descriptions (nl-BE) |
| Photo gallery on the property page | `pictures[]` of the estate | All photos, in WHISE order |
| "Plan een bezichtiging" (property page) | `POST /v1/contacts/create` + `EstateIds` | Contact linked to that property |
| Woonprofiel form | `POST /v1/contacts/create` + `SearchCriteria` | Contact with a search profile, so WHISE matching works (needs postcodes) |
| Waardescan form | `POST /v1/contacts/create` | Contact, message has address, type, timing |
| Contact form | `POST /v1/contacts/create` | Contact, message has subject and text |

Every contact gets the tags `Website` plus the form type (`Waardescan`, `Woonprofiel`, `Bezichtiging`, `Contact`).

## Files

```
netlify.toml                  build + functions config
netlify/lib/whise.mjs         login + token cache, estate → site mapping, form → contact mapping
netlify/functions/aanbod.mjs  GET  /api/aanbod  (CDN-cached 10 min)
netlify/functions/lead.mjs    POST /api/lead    (validation, honeypot, same-origin check)
scripts/build.mjs             copies only public files to dist/
scripts/dev.mjs               local server with the functions, no Netlify CLI needed
.env.example                  variable names
```

## Going live, step by step

1. **Get API access.** WHISE issues website-designer credentials (username + password).
   The agency (TÈRRO) must then activate you for their account in WHISE.
   You need four values: `WHISE_USERNAME`, `WHISE_PASSWORD`, `WHISE_CLIENT_ID`, `WHISE_OFFICE_ID`.
   If you only know the username/password, `POST /v1/admin/clients/list` and
   `/v1/admin/offices/list` (with the user token) show the client and office ids.
2. **Netlify → Site configuration → Environment variables:** add the four values.
   Never put them in the code or in `netlify.toml`.
3. **Deploy.** Netlify runs `node scripts/build.mjs` and publishes `dist/`.
   Check `https://<site>/api/aanbod`: it should say `"bron":"whise"`.
4. **WHISE admin (done by the agency):** activate the estate details that should be public
   (admin > advanced > estate > details, mode `public`). Only those are returned by the API.
5. **Detail page link for WHISE e-mails.** Register the site with
   `PATCH /v1/admin/clients/settings/update` → `{ "ClientId": …, "DetailPageUrl": "https://terro.be/" }`.
   The site accepts `?pand=123`, `?id=123` and `?estateid=123` and opens that property.
   Confirm with WHISE which of those formats their e-mails use.

## Behaviour without WHISE

| Situation | Listings | Forms |
|---|---|---|
| No credentials set (demo mode) | Sample listings from `js/main.js` | Accepted, not forwarded (`demo: true`) |
| WHISE unreachable on the live site | Calm message + phone number, no fake listings | Error message + phone number |
| Opened locally (`file://`, `localhost`) | Sample listings | `file://`: simulated success |

## Local testing

```
cp .env.example .env      # fill in, or leave empty for demo mode
node scripts/dev.mjs      # http://localhost:8888
```

## To verify once real data is available

These are assumptions based on the API spec; check them against the first real response:

- **Bedrooms:** the site shows WHISE `rooms` as "slaapkamers".
- **Construction year:** read from the detail with label "construction year" (id 14 in the WHISE example).
- **Sold/rented ("SEALED"):** purpose status 3, 4, 14, 17. If the agency archives sold estates,
  they disappear from the API. `NearlySoldRentDays` (max 60) can bring recent ones back.
- **Type names:** WHISE subcategory names only come back with `WithRefDescriptions`; otherwise
  the site uses its own Dutch category names (Woning, Appartement, Bouwgrond…).
- **Woonprofiel "Hoeve"** maps to category 1 (house); WHISE subcategory for farmhouses can be added.
- **Privacy:** forms now send personal data to WHISE. The privacy statement (footer link is still
  a placeholder) should mention this.
