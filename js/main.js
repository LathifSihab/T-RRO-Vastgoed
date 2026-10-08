/* ============================================================
   DATA
   Interne vorm van een pand. Dit is bewust NIET de WHISE-vorm:
   de server (netlify/lib/whise.mjs → naarPand) zet WHISE om naar
   precies deze vorm. De panden hieronder zijn voorbeelden voor de
   demomodus, zolang er nog geen WHISE-gegevens ingesteld zijn.
   ============================================================ */
var PANDEN = [
  {
    slug:'herenhuis-hasselt',
    beeld:'/images/pand-herenhuis-hasselt.jpg',
    beeldAlt:'Makelaar hangt een TÈRRO-bord Te koop achter het raam van een gevel',
    titel:'Herenhuis met stadstuin',
    plaats:'Hasselt',
    type:'Woning',
    doel:'koop',                 // koop | huur
    status:'te-koop',            // te-koop | te-huur | sealed
    prijs:595000,
    periodiek:false,
    slaapkamers:4,
    badkamers:2,
    bewoonbaar:245,
    perceel:410,
    bouwjaar:1932,
    epcKlasse:'B',
    epcWaarde:142,
    kort:'Een gerestaureerd herenhuis uit het interbellum, met de oorspronkelijke cementtegels en een ommuurde tuin die de hele middag zon vangt.',
    lang:[
      'Dit huis stond veertig jaar in dezelfde familie. Dat merk je: de trap kraakt op dezelfde trede, de originele cementtegels in de gang liggen er nog, en in de keuken hangt nog de oude bel met de kamernummers erop.',
      'De vorige eigenaars renoveerden in twee fases — eerst het dak en het schrijnwerk, daarna de technieken. Wat authentiek was, bleef. Wat versleten was, werd vervangen. Het resultaat is een woning die comfortabel is zonder haar geschiedenis kwijt te zijn.',
      'De ommuurde stadstuin is het verrassende deel: veertien meter diep, met een oude perelaar tegen de zuidmuur en genoeg ruimte voor een lange tafel.'
    ]
  },
  {
    slug:'hoeve-borgloon',
    beeld:'/images/pand-hoeve-borgloon.jpg',
    beeldAlt:'Takken van een olijfboom tegen een donkere achtergrond',
    titel:'Hoeve met bijgebouw',
    plaats:'Borgloon',
    type:'Hoeve',
    doel:'koop',
    status:'te-koop',
    prijs:780000,
    periodiek:false,
    slaapkamers:5,
    badkamers:2,
    bewoonbaar:320,
    perceel:4200,
    bouwjaar:1876,
    epcKlasse:'C',
    epcWaarde:232,
    kort:'Een gesloten hoeve aan de rand van de fruitstreek, met een apart bijgebouw dat zich leent tot atelier, praktijk of vakantieverblijf.',
    lang:[
      'Vier zijden rond een binnenkoer, zoals dat hier hoort. De hoeve dateert van 1876 en werd in de jaren negentig zorgvuldig gerenoveerd met respect voor de oorspronkelijke structuur — de moerbalken zijn zichtbaar gebleven, de vloeren zijn van gerecupereerde kasseien.',
      'Het bijgebouw aan de noordzijde staat los en heeft een eigen ingang. Vandaag doet het dienst als opslag, maar de vergunning voor een zorgwoning is in het verleden al eens verkregen.',
      'Rondom liggen ruim vier duizend vierkante meter weide en hoogstamboomgaard, grenzend aan het fietsroutenetwerk van Haspengouw.'
    ]
  },
  {
    slug:'appartement-tongeren',
    beeld:'/images/pand-appartement-tongeren.jpg',
    beeldAlt:'Koffiecorner op een taupe dressoir met een lamp, een plant en een kunstwerk',
    titel:'Lichtrijk appartement aan de wal',
    plaats:'Tongeren',
    type:'Appartement',
    doel:'huur',
    status:'te-huur',
    prijs:1150,
    periodiek:true,
    slaapkamers:2,
    badkamers:1,
    bewoonbaar:98,
    perceel:null,
    bouwjaar:2019,
    epcKlasse:'A',
    epcWaarde:78,
    kort:'Tweede verdieping, ramen op het zuidwesten en een terras dat uitkijkt op de oude stadswal. Instapklaar en energiezuinig.',
    lang:[
      'Een nieuwbouwappartement uit 2019 in een klein gebouw met slechts zes eenheden. De leefruimte loopt over de volledige breedte, met raampartijen op het zuidwesten — vanaf een uur of vier staat de zon binnen.',
      'Vloerverwarming, drievoudige beglazing en zonnepanelen op het gemeenschappelijke dak: het EPC-label A is hier geen marketing maar een maandelijkse besparing.',
      'Ondergrondse staanplaats en fietsenberging inbegrepen. Het historische centrum ligt op zeven minuten te voet.'
    ]
  },
  {
    slug:'pastorij-sint-truiden',
    beeld:'/images/pand-pastorij-sint-truiden.jpg',
    beeldAlt:'Lichte muur met houten wandplanken en de tekst If not now, when?',
    titel:'Pastorijwoning met kloostertuin',
    plaats:'Sint-Truiden',
    type:'Woning',
    doel:'koop',
    status:'sealed',
    prijs:640000,
    periodiek:false,
    slaapkamers:4,
    badkamers:2,
    bewoonbaar:268,
    perceel:980,
    bouwjaar:1908,
    epcKlasse:'D',
    epcWaarde:310,
    kort:'Een klassieke pastorijwoning met symmetrische gevel en een tuin die al meer dan een eeuw dezelfde buxushagen draagt.',
    lang:[
      'Deze woning kwam bij ons binnen via de kinderen van de laatste bewoonster. Ze wilden dat het huis naar iemand ging die het zou laten zoals het was — dat maakte de begeleiding bijzonder.',
      'De symmetrische gevel, de hoge plafonds en de dubbele salondeuren zijn intact. De keuken werd in 2006 vernieuwd, de elektriciteit is conform.',
      'De tuin is het hart van het perceel: bijna duizend vierkante meter, met de oorspronkelijke buxushagen en een oude notelaar in de zuidwesthoek.'
    ]
  },
  {
    slug:'nieuwbouw-lanaken',
    beeld:'/images/pand-nieuwbouw-lanaken.jpg',
    beeldAlt:'Makelaar stapt een gebouw binnen langs een witte gevel',
    titel:'Energiezuinige nieuwbouwwoning',
    plaats:'Lanaken',
    type:'Woning',
    doel:'koop',
    status:'te-koop',
    prijs:489000,
    periodiek:false,
    slaapkamers:3,
    badkamers:1,
    bewoonbaar:176,
    perceel:520,
    bouwjaar:2023,
    epcKlasse:'A',
    epcWaarde:52,
    kort:'Instapklaar, zonder compromissen op afwerking. Warmtepomp, zonnepanelen en een tuin die op het zuiden ligt.',
    lang:[
      'Opgeleverd in 2023 en sindsdien bewoond door de bouwheren, die omwille van werk verhuizen. Alles is nog onder garantie.',
      'De open leefruimte kijkt via een schuifraam van vier meter uit op de tuin. Warmtepomp, ventilatie D en veertien zonnepanelen — de jaarlijkse energiefactuur blijft onder de vijfhonderd euro.',
      'De wijk is rustig en autoluw, met een school en een bakker binnen wandelafstand.'
    ]
  },
  {
    slug:'loft-hasselt',
    beeld:'/images/pand-loft-hasselt.jpg',
    beeldAlt:'Makelaar werkt aan een laptop aan het raam met zicht op de stad',
    titel:'Loft in de oude brouwerij',
    plaats:'Hasselt',
    type:'Appartement',
    doel:'huur',
    status:'sealed',
    prijs:1450,
    periodiek:true,
    slaapkamers:1,
    badkamers:1,
    bewoonbaar:124,
    perceel:null,
    bouwjaar:1911,
    epcKlasse:'B',
    epcWaarde:165,
    kort:'Gietijzeren kolommen, vier meter hoog en ramen die van vloer tot plafond lopen. Een industrieel casco, warm ingericht.',
    lang:[
      'De brouwerij sloot in 1978 en werd in 2018 omgebouwd tot negen lofts. Deze ligt op de tweede verdieping, aan de kant van de binnenkoer — stil, ondanks het centrum.',
      'De oorspronkelijke gietijzeren kolommen en de betonnen balklaag bleven zichtbaar. Daartegenover staan een warme eiken vloer en maatkasten die de hoogte benutten.',
      'Eén ruime slaapkamer op een mezzanine, en een leefruimte die met vier meter hoogte veel meer aanvoelt dan honderdvierentwintig vierkante meter.'
    ]
  }
];

var REVIEWS = [
  {
    naam:'Sabrina Van Eeckhout',
    tekst:[
      'Zeer tevreden over de samenwerking met Clotilde. De communicatie verliep vanaf het begin heel vlot, duidelijk en professioneel. Na elk contact met een kandidaat-koper kregen we snel een uitgebreid en helder verslag, waardoor we steeds goed op de hoogte waren van de stand van zaken.',
      'Reageert ook heel snel.',
      'Een enthousiaste betrokken makelaar!'
    ]
  },
  {
    naam:'Merel De Vleeschauwer',
    tekst:[
      'Kent haar job! Steeds open communicatie, betrouwbaar advies en altijd bereikbaar. We kregen geregeld een update en Clotilde was zeer betrokken. Dacht niet aan haar eigen voordeel maar aan een correcte aankoop/verkoop voor de betrokken partijen! Echt top in haar job!'
    ]
  },
  {
    naam:'Vanessa Huyghe',
    tekst:[
      'Makkelaar Clotilde (naamgenoot mijn 2de naam was wel grappig aan telefoon) heb ik keren kennen half juli bij een bezoek aan een appertement in zele .Vanaf het telefoon contact was het me duidelijk dat zij anders was als makkelaar / als mens en dat werd bevestigd bij het bezoek ze geeft je de tijd om het pand te bekijken geeft tips over verkoop van je eigen woning wat er allemaal mogelijk is zonder en dat is uitzonderlijk haar op te dringen. Een tweede bezoek was ook geen enkel probleem. We hebben dan toch de stap niet gezet het was niet het appertement waar we ons huisje zou kunnen verkopen. Een hele lieve vrouw met het hart op juiste plaats.Ze maakt echt het verschil in immowereld . We wensen haar ontzettend veel succes met haar immo kantoor. Ik hoop echt met haar te kunnen samen werken in de toekomst voor de verkoop van onze woning. Veel liefs vanessa en filip'
    ]
  }
];

/* ============================================================
   WHISE-KOPPELING
   Het echte aanbod komt van /api/aanbod (Netlify Function), die
   WHISE aanspreekt met de gegevens uit de serveromgeving. De
   browser ziet nooit een wachtwoord of token.
   - bron 'whise': de echte panden vervangen de voorbeelden;
   - bron 'demo' : nog geen WHISE-gegevens → online geen panden
     (de tekst van TÈRRO), lokaal blijven de voorbeelden;
   - fout online : een rustige melding in plaats van nep-aanbod.
   Lokaal openen (file:// of localhost zonder functies) toont de
   voorbeelden. Online verschijnt er nooit een voorbeeldpand.
   ============================================================ */
var AANBOD = { klaar:false, bron:'demo', fout:false };

function lokaleVoorvertoning(){
  return location.protocol === 'file:' || /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname);
}

function laadAanbod(){
  if(location.protocol === 'file:') return Promise.resolve();
  return fetch('/api/aanbod',{headers:{Accept:'application/json'}})
    .then(function(r){ return r.ok ? r.json() : Promise.reject(new Error('status ' + r.status)); })
    .then(function(data){
      if(data && data.bron === 'whise' && Array.isArray(data.panden)){
        PANDEN = data.panden;
        AANBOD.bron = 'whise';
      } else if(!lokaleVoorvertoning()){
        PANDEN = [];
      }
    })
    .catch(function(){
      if(!lokaleVoorvertoning()){ PANDEN = []; AANBOD.fout = true; }
    });
}

/* ============================================================
   WEERGAVE
   ============================================================ */
var euro  = new Intl.NumberFormat('nl-BE',{style:'currency',currency:'EUR',maximumFractionDigits:0});
var getal = new Intl.NumberFormat('nl-BE');   // 4200 → 4.200 ; bouwjaren blijven ongeformatteerd

var STATUS_TEKST = {'te-koop':'Te koop','te-huur':'Te huur','optie':'In optie','sealed':'SEALED'};

function prijsTekst(p){
  if(!p.prijs) return 'Prijs op aanvraag';
  return euro.format(p.prijs) + (p.periodiek ? ' / maand' : '');
}

/* ---------- adressen ----------
   Een pand uit WHISE krijgt /aanbod/<id>-<leesbare-naam>; alleen het id
   telt bij het opzoeken, de naam is er voor mensen en zoekmachines. */
function slugify(s){
  return String(s || '').normalize('NFD').replace(/[\u0300-\u036f]/g,'')
    .toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'').slice(0,70);
}
// "Titel in Plaats", zonder de plaats te herhalen als de titel die al noemt
function titelMetPlaats(p){
  var plaats = p.plaats || '';
  if(!plaats || p.titel.toLowerCase().indexOf(plaats.toLowerCase()) !== -1) return p.titel;
  return p.titel + ' in ' + plaats;
}
function pandPad(p){
  if(p.pad) return p.pad;   // uit WHISE: door de server berekend (zelfde regels)
  return '/aanbod/' + (p.id ? p.id + '-' + slugify(titelMetPlaats(p)) : p.slug);
}
function zoekPand(deel){
  var id = (String(deel).match(/^(\d+)(-|$)/) || [])[1];
  return PANDEN.filter(function(x){ return id ? String(x.id) === id : x.slug === deel; })[0];
}

function esc(s){
  return String(s == null ? '' : s).replace(/[&<>"']/g,function(c){
    return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
  });
}

/* ---------- foto's ----------
   Eigen foto's in /images hebben WebP-versies in meerdere breedtes
   (scripts/webp.py). De browser kiest de kleinste die past; de JPG blijft
   terugval. Foto's van WHISE worden getoond zoals WHISE ze levert. */
/* BEELDMATEN:begin (gegenereerd door scripts/webp.py) */
var BEELDMATEN = {"contact-koffie-kaartjes":[480,800,1200,1800],"hero-home":[640,1024,1440,2000],"over-te-koop-bord":[480,800,1200],"pand-appartement-tongeren":[480,726],"pand-herenhuis-hasselt":[480,800,1200],"pand-hoeve-borgloon":[480,690],"pand-loft-hasselt":[480,800,1200],"pand-nieuwbouw-lanaken":[480,800,1200],"pand-pastorij-sint-truiden":[480,800,1200],"portret-makelaar":[480,800,1131],"reviews-koffie":[480,800,1200],"reviews-telefoon":[480,800,1200],"waardescan-bord-koffie":[480,800,1200],"waardescan-laptop":[480,800,1200,1800],"woonprofiel-wandeling":[480,800,1164]};
/* BEELDMATEN:eind */

var MAAT_KAART = '(max-width: 760px) 100vw, 560px';
var MAAT_BREED = '(max-width: 1180px) 100vw, 1180px';

function webpSet(src){
  var m = /^\/images\/([^/]+)\.jpg$/.exec(src || '');
  var maten = m && BEELDMATEN[m[1]];
  if(!maten) return '';
  return maten.map(function(b){ return '/images/' + m[1] + '-' + b + '.webp ' + b + 'w'; }).join(', ');
}

function fotoHtml(src, alt, maat, extra){
  var img = '<img src="' + esc(src) + '" alt="' + esc(alt) + '"' + (extra ? ' ' + extra : '') + '>';
  var set = webpSet(src);
  return set ? '<picture><source type="image/webp" srcset="' + set + '" sizes="' + maat + '">' + img + '</picture>' : img;
}

// Eerste foto van een pand, of niets zodat het beeldslot zichtbaar blijft.
function beeldTag(item, alt, maat){
  var src = item.beeld || (item.beelden && item.beelden[0]);
  if(src && typeof src === 'object') src = src.kaart || src.src;
  return src ? fotoHtml(src, item.beeldAlt || alt, maat || MAAT_KAART, 'loading="lazy"') : '';
}

function pandKaart(p,index){
  var feiten = [];
  if(p.slaapkamers) feiten.push(p.slaapkamers + ' slaapkamers');
  if(p.bewoonbaar) feiten.push(getal.format(p.bewoonbaar) + ' m² bewoonbaar');
  if(p.perceel) feiten.push(getal.format(p.perceel) + ' m² perceel');

  return '' +
    '<a class="pand" href="' + esc(pandPad(p)) + '">' +
      '<div class="beeld" data-slot="Beeldslot · ' + esc(p.titel) + '">' +
        beeldTag(p, p.titel + ' in ' + p.plaats) +
        '<span class="status" data-status="' + (p.status === 'sealed' ? 'sealed' : 'actief') + '">' + esc(STATUS_TEKST[p.status]) + '</span>' +
      '</div>' +
      '<div class="stapel stapel-8">' +
        '<p class="pand-plaats">' + esc(p.plaats) + '</p>' +
        '<div class="pand-kop">' +
          '<h3>' + esc(p.titel) + '</h3>' +
          '<span class="pand-prijs">' + esc(prijsTekst(p)) + '</span>' +
        '</div>' +
        '<p class="pand-feiten">' + feiten.map(function(f){ return '<span>' + esc(f) + '</span>'; }).join('') + '</p>' +
      '</div>' +
    '</a>';
}

function initialen(naam){
  return naam.split(/\s+/).filter(function(w){ return /^[A-ZÀ-Þ]/.test(w); })
    .map(function(w){ return w.charAt(0); }).filter(function(c, i, a){ return i === 0 || i === a.length - 1; }).join('');
}

function reviewKaart(r){
  return '' +
    '<figure class="review">' +
      '<blockquote class="review-tekst">' + r.tekst.map(function(t){ return '<p>' + esc(t) + '</p>'; }).join('') + '</blockquote>' +
      '<figcaption class="review-naam">' +
        '<span class="review-initialen" aria-hidden="true">' + esc(initialen(r.naam)) + '</span>' +
        '<span>' + esc(r.naam) + '</span>' +
      '</figcaption>' +
    '</figure>';
}

/* ---------- vullen ---------- */
var LADEN_HTML = '<p class="stil laden">Het aanbod wordt geladen…</p>';
var FOUT_HTML  = '<p class="stil">Het aanbod kan op dit moment niet geladen worden. Probeer het straks opnieuw, of bel ons op <a href="tel:+32470709999">0470 70 99 99</a>.</p>';

function vulHomePanden(){
  var el = document.getElementById('homePanden');
  if(!AANBOD.klaar){ el.innerHTML = LADEN_HTML; return; }
  if(AANBOD.fout){ el.innerHTML = FOUT_HTML; return; }
  var lijst = PANDEN.filter(function(p){ return p.status !== 'sealed'; }).slice(0,2);
  el.innerHTML = lijst.map(pandKaart).join('');
  document.getElementById('homeBinnenkort').hidden = lijst.length > 0;
}

document.getElementById('homeVerhalen').innerHTML =
  REVIEWS.slice(0,2).map(reviewKaart).join('');

document.getElementById('verhalenRooster').innerHTML =
  REVIEWS.map(reviewKaart).join('');

/* ---------- aanbod + filter ---------- */
var huidigFilter = 'alles';

function toonAanbod(){
  var rooster = document.getElementById('aanbodRooster');
  var leeg = document.getElementById('aanbodLeeg');
  var binnenkort = document.getElementById('aanbodBinnenkort');
  var filters = document.getElementById('filters');
  if(!AANBOD.klaar || AANBOD.fout){
    rooster.innerHTML = AANBOD.fout ? FOUT_HTML : LADEN_HTML;
    leeg.hidden = binnenkort.hidden = true;
    filters.hidden = false;
    return;
  }
  // nog helemaal geen panden: tekst van TÈRRO in plaats van filters en rooster
  var geenAanbod = PANDEN.length === 0;
  binnenkort.hidden = !geenAanbod;
  filters.hidden = geenAanbod;
  if(geenAanbod){ rooster.innerHTML = ''; leeg.hidden = true; return; }
  // 'In optie' blijft zichtbaar bij koop of huur, volgens het doel van het pand
  var lijst = PANDEN.filter(function(p){
    if(huidigFilter === 'alles')  return true;
    if(huidigFilter === 'koop')   return p.status !== 'sealed' && p.doel === 'koop';
    if(huidigFilter === 'huur')   return p.status !== 'sealed' && p.doel === 'huur';
    if(huidigFilter === 'sealed') return p.status === 'sealed';
    return true;
  });
  rooster.innerHTML = lijst.map(pandKaart).join('');
  leeg.hidden = lijst.length > 0;
}

Array.prototype.forEach.call(document.querySelectorAll('.filter'),function(knop){
  knop.addEventListener('click',function(){
    huidigFilter = knop.dataset.filter;
    Array.prototype.forEach.call(document.querySelectorAll('.filter'),function(k){
      k.setAttribute('aria-pressed', String(k === knop));
    });
    toonAanbod();
  });
});
vulHomePanden();
toonAanbod();

/* ---------- pand detail ---------- */
function fotosVan(p){
  if(p.beelden && p.beelden.length){
    return p.beelden.map(function(f){
      return typeof f === 'string' ? {src:f, duim:f, alt:''} : {src:f.src, duim:f.duim || f.src, alt:f.alt || ''};
    });
  }
  return p.beeld ? [{src:p.beeld, duim:p.beeld, alt:p.beeldAlt || ''}] : [];
}

function galerijHtml(p){
  var fotos = fotosVan(p);
  var standaardAlt = p.titel + (p.plaats ? ' in ' + p.plaats : '');
  var status = '<span class="status" data-status="' + (p.status === 'sealed' ? 'sealed' : 'actief') + '">' + esc(STATUS_TEKST[p.status]) + '</span>';
  if(!fotos.length){
    return '<div class="beeld beeld--breed" data-slot="Beeldslot · hoofdbeeld ' + esc(p.titel) + '">' + status + '</div>';
  }
  var meer = fotos.length > 1;
  return '' +
    '<div class="galerij" data-galerij tabindex="-1" aria-roledescription="fotogalerij" aria-label="Foto\'s van ' + esc(p.titel) + '">' +
      '<div class="beeld beeld--breed galerij-hoofd">' +
        fotoHtml(fotos[0].src, fotos[0].alt || standaardAlt, MAAT_BREED, 'id="galerijBeeld"') +
        status +
        (meer ?
          '<button class="galerij-knop galerij-knop--vorige" type="button" data-stap="-1" aria-label="Vorige foto"><span aria-hidden="true">←</span></button>' +
          '<button class="galerij-knop galerij-knop--volgende" type="button" data-stap="1" aria-label="Volgende foto"><span aria-hidden="true">→</span></button>' +
          '<span class="galerij-teller" id="galerijTeller" aria-live="polite">1 / ' + fotos.length + '</span>'
        : '') +
      '</div>' +
      (meer ?
        '<div class="galerij-duimen">' +
          fotos.map(function(f,i){
            return '<button type="button" data-foto="' + i + '" aria-label="Toon foto ' + (i + 1) + ' van ' + fotos.length + '"' + (i === 0 ? ' aria-current="true"' : '') + '>' +
              '<img src="' + esc(f.duim) + '" alt="" loading="lazy"></button>';
          }).join('') +
        '</div>'
      : '') +
    '</div>';
}

var galerij = { fotos:[], index:0, alt:'' };

function toonFoto(i){
  var n = galerij.fotos.length;
  if(!n) return;
  galerij.index = (i + n) % n;
  var f = galerij.fotos[galerij.index];
  var img = document.getElementById('galerijBeeld');
  if(!img) return;
  var bron = img.parentNode.tagName === 'PICTURE' ? img.previousElementSibling : null;
  if(bron) bron.srcset = webpSet(f.src);   // leeg = geen webp, de browser neemt de img
  img.src = f.src;
  img.alt = f.alt || galerij.alt;
  var teller = document.getElementById('galerijTeller');
  if(teller) teller.textContent = (galerij.index + 1) + ' / ' + n;
  Array.prototype.forEach.call(document.querySelectorAll('.galerij-duimen button'),function(b,k){
    if(k === galerij.index){
      b.setAttribute('aria-current','true');
      if(b.scrollIntoView) b.scrollIntoView({block:'nearest',inline:'nearest',behavior:'smooth'});
    } else {
      b.removeAttribute('aria-current');
    }
  });
}

function bezoekFormHtml(p){
  var id = /^\d+$/.test(String(p.id || '')) ? p.id : '';
  return '' +
    '<form class="formulier bezoek-form" id="formBezoek" data-soort="bezichtiging" novalidate hidden>' +
      '<input type="hidden" name="pandId" value="' + esc(id) + '">' +
      '<input type="hidden" name="pandTitel" value="' + esc(p.titel + (p.plaats ? ' — ' + p.plaats : '')) + '">' +
      honeypotHtml() +
      '<p class="veld-hulp formulier-hint">Velden met <span aria-hidden="true">*</span> zijn verplicht.</p>' +
      '<div class="veld-rij">' +
        '<div class="veld"><label for="bz-naam">Naam</label><input id="bz-naam" name="naam" type="text" autocomplete="name" required></div>' +
        '<div class="veld"><label for="bz-tel">Telefoon</label><input id="bz-tel" name="telefoon" type="tel" autocomplete="tel"></div>' +
      '</div>' +
      '<div class="veld"><label for="bz-mail">E-mailadres</label><input id="bz-mail" name="email" type="email" autocomplete="email" required></div>' +
      '<div class="veld"><label id="bz-voorkeur-label">Wanneer past het?</label>' +
        '<div class="keuzes" role="group" aria-labelledby="bz-voorkeur-label">' +
          ['Weekdag overdag','Weekdag avond','Zaterdag','Maakt niet uit'].map(function(v,i){
            return '<label class="keuze"><input type="radio" name="voorkeur" value="' + v + '"' + (i === 3 ? ' checked' : '') + '><span>' + v + '</span></label>';
          }).join('') +
        '</div>' +
      '</div>' +
      '<div class="veld"><label for="bz-bericht">Wil je ons nog iets laten weten?</label><textarea id="bz-bericht" name="bericht"></textarea></div>' +
      '<button class="knop knop--goud" type="submit" style="align-self:flex-start;">Vraag een bezichtiging aan</button>' +
      '<p class="veld-hulp formulier-privacy">We gebruiken je gegevens enkel om je aanvraag op te volgen. Lees meer in onze <a href="/privacy">privacyverklaring</a>.</p>' +
      '<div class="bevestiging" id="bzBevestiging" hidden>' +
        '<p><strong>Bedankt.</strong> We nemen binnen twee werkdagen contact op om een moment af te spreken.</p>' +
      '</div>' +
    '</form>';
}

function toonPand(slug){
  var doel = document.getElementById('pandInhoud');
  var terug = '<a class="terug" href="/aanbod"><span aria-hidden="true">←</span> Terug naar het aanbod</a>';
  if(!AANBOD.klaar){
    doel.innerHTML = terug + LADEN_HTML;
    return;
  }
  var p = zoekPand(slug);
  if(!p){
    doel.innerHTML = '<p class="stil">Dit pand is niet langer beschikbaar.</p>' + terug;
    zetMeta({titel:'Pand niet gevonden', beschrijving:PAGINA.aanbod.beschrijving, noindex:true});
    return;
  }
  if(location.pathname !== pandPad(p)) history.replaceState(null,'',pandPad(p));
  zetMeta({
    titel: titelMetPlaats(p),
    beschrijving: (p.kort || (p.type + ' ' + (STATUS_TEKST[p.status] || '').toLowerCase() + (p.plaats ? ' in ' + p.plaats : '') + '. ' + prijsTekst(p) + '.')).slice(0,160)
  });

  var specs = [
    ['Type', p.type],
    ['Status', STATUS_TEKST[p.status]],
    ['Slaapkamers', p.slaapkamers],
    ['Badkamers', p.badkamers],
    ['Bewoonbare oppervlakte', p.bewoonbaar ? getal.format(p.bewoonbaar) + ' m²' : null],
    ['Perceeloppervlakte', p.perceel ? getal.format(p.perceel) + ' m²' : null],
    ['Bouwjaar', p.bouwjaar]
  ].filter(function(r){ return r[1] != null && r[1] !== ''; });

  var specHtml = specs.map(function(r){
    return '<div class="spec"><dt>' + esc(r[0]) + '</dt><dd>' + esc(r[1]) + '</dd></div>';
  }).join('');

  if(p.epcKlasse){
    specHtml += '<div class="spec"><dt>EPC</dt><dd><span class="epc">' +
      '<span class="epc-label" data-klasse="' + esc(String(p.epcKlasse).charAt(0)) + '">' + esc(p.epcKlasse) + '</span>' +
      esc(p.epcWaarde ? getal.format(p.epcWaarde) + ' kWh/m²' : '') + '</span></dd></div>';
  }

  var sealed = p.status === 'sealed';
  doel.innerHTML = '' +
    terug +
    galerijHtml(p) +
    '<div class="duo duo--verspringend">' +
      '<div class="stapel stapel-16">' +
        '<p class="eyebrow">' + esc(p.plaats) + '</p>' +
        '<h1>' + esc(p.titel) + '</h1>' +
        '<p class="lead">' + esc(prijsTekst(p)) + '</p>' +
      '</div>' +
      '<div class="stapel stapel-24">' +
        (p.kort ? '<p class="lead">' + esc(p.kort) + '</p>' : '') +
        '<div class="artikel stil">' + (p.lang || []).map(function(t){ return '<p>' + esc(t) + '</p>'; }).join('') + '</div>' +
        (p.virtueelBezoek && /^https?:\/\//.test(p.virtueelBezoek)
          ? '<a class="tekstlink" href="' + esc(p.virtueelBezoek) + '" target="_blank" rel="noopener">Virtueel bezoek <span class="pijl" aria-hidden="true">→</span></a>'
          : '') +
      '</div>' +
    '</div>' +
    '<dl class="specs">' + specHtml + '</dl>' +
    '<div class="duo" style="align-items:center;">' +
      '<div class="stapel stapel-16">' +
        '<h2 class="kop-h3">' + (sealed ? 'Dit pand is SEALED.' : 'Iets voor jou? Kom gerust kijken.') + '</h2>' +
        '<p class="stil">' + (sealed
            ? 'Laat je woonprofiel achter, dan brengen we je op de hoogte zodra er iets vergelijkbaars binnenkomt.'
            : 'Een bezichtiging duurt bij ons minstens een uur. We nemen de tijd om je alles te tonen — ook de dingen die op foto niet te zien zijn.') + '</p>' +
      '</div>' +
      '<div class="knoppen">' +
        (sealed
          ? '<a class="knop knop--goud" href="/woonprofiel">Maak jouw woonprofiel</a>'
          : '<button class="knop knop--goud" type="button" id="bezoekKnop" aria-expanded="false" aria-controls="formBezoek">Plan een bezichtiging</button><a class="knop knop--lijn" href="/woonprofiel">Maak jouw woonprofiel</a>') +
      '</div>' +
    '</div>' +
    (sealed ? '' : bezoekFormHtml(p));

  galerij.fotos = fotosVan(p);
  galerij.index = 0;
  galerij.alt = p.titel + (p.plaats ? ' in ' + p.plaats : '');

  var bezoekKnop = document.getElementById('bezoekKnop');
  if(bezoekKnop){
    koppelFormulier('formBezoek','bzBevestiging');
    bezoekKnop.addEventListener('click',function(){
      var form = document.getElementById('formBezoek');
      var open = form.hidden;
      form.hidden = !open;
      bezoekKnop.setAttribute('aria-expanded', String(open));
      if(open){
        form.scrollIntoView({behavior:'smooth',block:'start'});
        document.getElementById('bz-naam').focus({preventScroll:true});
      }
    });
  }
}

// galerij: knoppen, duimnagels en pijltjestoetsen
document.getElementById('pandInhoud').addEventListener('click',function(e){
  var stap = e.target.closest('[data-stap]');
  var foto = e.target.closest('[data-foto]');
  if(stap) toonFoto(galerij.index + Number(stap.dataset.stap));
  else if(foto) toonFoto(Number(foto.dataset.foto));
});
document.getElementById('pandInhoud').addEventListener('keydown',function(e){
  if(!e.target.closest('[data-galerij]') || galerij.fotos.length < 2) return;
  if(e.key === 'ArrowLeft'){ e.preventDefault(); toonFoto(galerij.index - 1); }
  if(e.key === 'ArrowRight'){ e.preventDefault(); toonFoto(galerij.index + 1); }
});

/* ============================================================
   ROUTERING — echte adressen (/aanbod, /aanbod/123-naam, …)
   Netlify stuurt die paden naar index.html (zie netlify.toml);
   de router kiest hier welk zicht zichtbaar is.
   ============================================================ */
var ZICHTEN = ['home','aanbod','pand','over','verhalen','waardescan','woonprofiel','contact','privacy','nietgevonden'];
var ENKELVOUDIG = ['aanbod','over','verhalen','waardescan','woonprofiel','contact','privacy'];

var PAGINA = {
  home:        {titel:'', beschrijving:document.querySelector('meta[name="description"]').content},
  aanbod:      {titel:'Aanbod', beschrijving:'Een bewust klein aanbod: elk pand krijgt de voorbereiding, de fotografie en de tijd die het verdient.'},
  over:        {titel:'Over TÈRRO', beschrijving:'TÈRRO vertrekt niet bij vierkante meters, maar bij mensen. Persoonlijk vastgoed met een verhaal.'},
  verhalen:    {titel:'Verhalen', beschrijving:'Wat klanten vertellen over hun ervaring met TÈRRO Vastgoed, in hun eigen woorden.'},
  waardescan:  {titel:'Waardescan', beschrijving:'Een onderbouwde waardebepaling na een bezoek ter plaatse, met uitleg bij elk cijfer. Vrijblijvend.'},
  woonprofiel: {titel:'Maak jouw woonprofiel', beschrijving:'Vertel ons hoe je wil wonen. Wij leggen jouw profiel naast elk pand dat binnenkomt.'},
  contact:     {titel:'Contact', beschrijving:'Bel of schrijf TÈRRO Vastgoed. Een eerste gesprek is vrijblijvend. Dendermondse Steenweg 10, 9290 Overmere.'},
  privacy:     {titel:'Privacyverklaring', beschrijving:'Hoe TÈRRO Vastgoed omgaat met de persoonsgegevens die je via de website doorgeeft, en wat je rechten zijn.'},
  nietgevonden:{titel:'Pagina niet gevonden', beschrijving:'Deze pagina bestaat niet (meer).', noindex:true}
};

function metaTag(naam){
  var el = document.querySelector('meta[name="' + naam + '"]');
  if(!el){ el = document.createElement('meta'); el.name = naam; document.head.appendChild(el); }
  return el;
}

function zetMeta(m){
  document.title = m.titel ? m.titel + ' | TÈRRO Vastgoed' : 'TÈRRO Vastgoed | Gegrond in vastgoed';
  metaTag('description').content = m.beschrijving || PAGINA.home.beschrijving;
  metaTag('robots').content = m.noindex ? 'noindex' : 'index, follow';
  var canon = document.getElementById('canonical');
  if(canon) canon.href = 'https://terro.be' + (location.pathname.replace(/\/+$/,'') || '/');
}

function toonZicht(naam){
  ZICHTEN.forEach(function(z){
    var el = document.getElementById('zicht-' + z);
    if(el) el.hidden = (z !== naam);
  });
  var navNaam = naam === 'pand' ? 'aanbod' : naam;
  Array.prototype.forEach.call(document.querySelectorAll('.nav a[data-nav]'),function(a){
    if(a.dataset.nav === navNaam) a.setAttribute('aria-current','page');
    else a.removeAttribute('aria-current');
  });
}

function route(opties){
  var delen = location.pathname.split('/').filter(Boolean).map(decodeURIComponent);
  var zicht;
  if(!delen.length) zicht = 'home';
  else if(delen.length === 1 && ENKELVOUDIG.indexOf(delen[0]) !== -1) zicht = delen[0];
  else if(delen.length === 2 && delen[0] === 'aanbod') zicht = 'pand';
  else zicht = 'nietgevonden';

  // een pand zet zijn eigen titel en beschrijving
  if(zicht === 'pand') toonPand(delen[1]);
  else zetMeta(PAGINA[zicht]);
  toonZicht(zicht);
  // bij terugkeer naar de startpagina tekenen de waarden opnieuw
  if(zicht !== 'home' && typeof waardenLijst !== 'undefined' && waardenLijst) waardenLijst.classList.remove('zichtbaar');

  sluitNav();
  window.scrollTo({top:0,behavior:'auto'});

  // bij navigatie binnen de site: focus naar de nieuwe paginatitel (schermlezers)
  if(opties && opties.focus){
    var h1 = document.querySelector('#zicht-' + zicht + ' h1');
    if(h1){ h1.setAttribute('tabindex','-1'); h1.focus({preventScroll:true}); }
  }
}

function ga(pad){
  if(pad !== location.pathname + location.search) history.pushState(null,'',pad);
  route({focus:true});
}

// interne links zonder herladen volgen
document.addEventListener('click',function(e){
  if(e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  var a = e.target.closest('a[href]');
  if(!a || a.target || a.hasAttribute('download')) return;
  var url = new URL(a.href, location.href);
  if(url.origin !== location.origin) return;
  if(/^\/(api|images|css|js|fonts)\//.test(url.pathname)) return;
  if(url.hash && url.pathname === location.pathname) return;   // anker op dezelfde pagina
  e.preventDefault();
  ga(url.pathname + url.search);
});
window.addEventListener('popstate',function(){ route(); });

/* Oude of externe links omzetten naar de echte adressen:
   #aanbod, #pand-123, #verhaal-marleen (vorige versie van de site) en
   ?pand=123 / ?id=123 / ?estateid=123 (links uit WHISE-mails). */
(function(){
  var h = location.hash.slice(1);
  var nieuw = null;
  if(/^pand-.+/.test(h)) nieuw = '/aanbod/' + h.slice(5);
  else if(/^verhaal-.+/.test(h)) nieuw = '/verhalen';
  else if(h === 'home') nieuw = '/';
  else if(ENKELVOUDIG.indexOf(h) !== -1) nieuw = '/' + h;
  var q = new URLSearchParams(location.search);
  var id = q.get('pand') || q.get('id') || q.get('estateid') || q.get('estateId');
  if(!nieuw && id && /^\d+$/.test(id)) nieuw = '/aanbod/' + id;
  if(nieuw) history.replaceState(null,'',nieuw);
})();
/* route() wordt pas onderaan aangeroepen: het gebruikt sluitNav(),
   en die heeft het menu hieronder nodig. */

/* ---------- mobiel menu ---------- */
var nav = document.getElementById('nav');
var navKnop = document.getElementById('navKnop');

function mobiel(){ return window.matchMedia('(max-width:900px)').matches; }

function openNav(){
  nav.hidden = false;
  navKnop.setAttribute('aria-expanded','true');
  document.body.style.overflow = 'hidden';
  // focus naar het menu, zodat toetsenbord en schermlezer erin terechtkomen
  var eerste = nav.querySelector('a');
  if(eerste) eerste.focus();
}
function sluitNav(){
  if(!nav || !navKnop) return;
  var wasOpen = navKnop.getAttribute('aria-expanded') === 'true';
  var focusInMenu = nav.contains(document.activeElement);   // vóór het verbergen bepalen
  if(mobiel()){
    nav.hidden = true;
    navKnop.setAttribute('aria-expanded','false');
  } else {
    nav.hidden = false;
  }
  document.body.style.overflow = '';
  // focus terug naar de menuknop, tenzij een link intussen een nieuwe pagina opende
  if(wasOpen && mobiel() && focusInMenu) navKnop.focus();
}

// Tab blijft binnen het open menu op mobiel
nav.addEventListener('keydown',function(e){
  if(e.key !== 'Tab' || !mobiel() || nav.hidden) return;
  var doelen = nav.querySelectorAll('a, button');
  var eerste = doelen[0], laatste = doelen[doelen.length - 1];
  if(e.shiftKey && document.activeElement === eerste){ e.preventDefault(); laatste.focus(); }
  else if(!e.shiftKey && document.activeElement === laatste){ e.preventDefault(); eerste.focus(); }
});

navKnop.addEventListener('click',openNav);
document.getElementById('navSluit').addEventListener('click',sluitNav);
// alleen sluiten bij een wissel tussen mobiel en desktop: op telefoons vuurt
// resize ook wanneer de adresbalk in- of uitschuift
var wasMobiel = mobiel();
window.addEventListener('resize',function(){
  if(mobiel() !== wasMobiel){ wasMobiel = mobiel(); sluitNav(); }
});
document.addEventListener('keydown',function(e){ if(e.key === 'Escape') sluitNav(); });
sluitNav();

/* ---------- hero-illustraties ----------
   Elke lijn krijgt lengte 1 en een volgnummer, zodat de CSS ze na elkaar
   kan laten tekenen. Zonder JS blijven de tekeningen gewoon zichtbaar. */
document.querySelectorAll('.illu, .hero-merk, .merkwaarden-lijst svg').forEach(function(svg){
  svg.querySelectorAll('path,rect,circle,ellipse').forEach(function(el,i){
    el.setAttribute('pathLength','1');
    el.style.setProperty('--i',i);
  });
});

/* ---------- waarden: tekenen bij in beeld scrollen ----------
   Speelt opnieuw af telkens de startpagina weer getoond wordt. */
var waardenLijst = document.querySelector('.merkwaarden-lijst');
if(waardenLijst){
  Array.prototype.forEach.call(waardenLijst.children,function(li,k){
    li.style.setProperty('--li',k);
    // lijnvertraging: 180 ms per icoon (= 3 × 60 ms) plus 60 ms per lijn
    Array.prototype.forEach.call(li.querySelectorAll('[pathLength]'),function(el,i){ el.style.setProperty('--i', k * 3 + i); });
  });
  if('IntersectionObserver' in window){
    waardenLijst.classList.add('wacht');
    new IntersectionObserver(function(items){
      items.forEach(function(item){
        if(item.isIntersecting) waardenLijst.classList.add('zichtbaar');
      });
    },{threshold:0.35}).observe(waardenLijst);
  }
}

/* nu pas de eerste routering */
route();

/* aanbod ophalen; daarna lijsten en een eventueel open pand opnieuw tekenen */
laadAanbod().then(function(){
  AANBOD.klaar = true;
  vulHomePanden();
  toonAanbod();
  var delen = location.pathname.split('/').filter(Boolean);
  if(delen.length === 2 && delen[0] === 'aanbod') toonPand(decodeURIComponent(delen[1]));
});

/* ---------- kop bij scroll ---------- */
var kop = document.getElementById('kop');
function scrollKop(){ kop.dataset.gescrold = window.scrollY > 8 ? 'ja' : 'nee'; }
window.addEventListener('scroll',scrollKop,{passive:true});
scrollKop();

// hoogte van de kop als CSS-variabele: de hero vult zo precies het scherm eronder
function meetKop(){ document.documentElement.style.setProperty('--kop-hoogte', kop.offsetHeight + 'px'); }
window.addEventListener('resize',meetKop,{passive:true});
meetKop();

/* ---------- formulieren ----------
   Elk formulier gaat naar /api/lead (Netlify Function), die er een
   contact in WHISE van maakt. data-soort op het formulier zegt welk
   soort aanvraag het is. Daarna gaat een kopie naar Netlify Forms
   (formuliernaam = data-soort), zodat geen aanvraag verloren gaat
   wanneer WHISE nog niet gekoppeld is of even hapert. */
function honeypotHtml(){
  // verborgen voor mensen; bots vullen het in en worden stil genegeerd
  return '<div class="veld-verborgen" aria-hidden="true"><label>Laat dit veld leeg' +
    '<input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>';
}

function formulierData(form){
  var data = {};
  new FormData(form).forEach(function(waarde,naam){
    if(Object.prototype.hasOwnProperty.call(data,naam)) data[naam] = [].concat(data[naam],waarde);
    else data[naam] = waarde;
  });
  Array.prototype.forEach.call(form.querySelectorAll('input[type="checkbox"]'),function(c){
    if(!Array.isArray(data[c.name])) data[c.name] = data[c.name] ? [data[c.name]] : [];
  });
  data.soort = form.dataset.soort;
  return data;
}

function naarWhise(data){
  // geeft altijd een antwoord terug: { status, ok, demo, fout }
  return fetch('/api/lead',{
    method:'POST',
    headers:{'Content-Type':'application/json',Accept:'application/json'},
    body:JSON.stringify(data)
  }).then(function(r){
    return r.json().catch(function(){ return {}; }).then(function(antwoord){
      antwoord.status = r.status;
      antwoord.ok = r.ok && antwoord.ok === true;
      return antwoord;
    });
  },function(){
    return { status:0, ok:false, fout:'Er is geen verbinding.' };
  });
}

function naarNetlify(data){
  // Netlify Forms verwacht een gewone formulierpost met form-name
  var velden = new URLSearchParams();
  velden.append('form-name',data.soort);
  Object.keys(data).forEach(function(naam){
    if(naam === 'soort' || naam === 'form-name') return;
    velden.append(naam,[].concat(data[naam]).join(', '));
  });
  return fetch('/',{
    method:'POST',
    headers:{'Content-Type':'application/x-www-form-urlencoded'},
    body:velden.toString()
  }).then(function(r){ return r.ok; },function(){ return false; });
}

var lokaleHost = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname);

function verstuur(data){
  // lokaal als bestand geopend: geen server, doe alsof het lukte
  if(location.protocol === 'file:') return new Promise(function(klaar){ setTimeout(klaar,400); });
  return naarWhise(data).then(function(whise){
    // 404/405: /api/lead bestaat hier niet (bv. VS Code Live Server), geen invoerfout
    var geenApi = whise.status === 404 || whise.status === 405;
    // fout in de invoer (bv. geen naam): meteen tonen, niets bewaren
    if(!geenApi && whise.status >= 400 && whise.status < 500) return Promise.reject(whise.fout || 'Versturen is niet gelukt.');
    return naarNetlify(data).then(function(bewaard){
      // gelukt zodra de aanvraag echt ergens terechtkwam
      if(bewaard || (whise.ok && !whise.demo)) return whise;
      // lokale statische server: nergens om naartoe te sturen, doe alsof het lukte
      if(lokaleHost && geenApi){
        console.warn('Geen /api/lead op deze server: aanvraag niet verstuurd. Gebruik node scripts/dev.mjs om de functies te testen.', data);
        return whise;
      }
      return Promise.reject(whise.fout || 'Versturen is niet gelukt.');
    });
  });
}

function koppelFormulier(formId,bevestigingId){
  var form = document.getElementById(formId);
  var bev  = document.getElementById(bevestigingId);
  if(!form || form.dataset.gekoppeld) return;
  form.dataset.gekoppeld = 'ja';
  var knop = form.querySelector('button[type="submit"]');
  var knopTekst = knop.textContent;
  var fout = document.createElement('p');
  fout.className = 'formulier-fout';
  fout.setAttribute('role','alert');
  fout.hidden = true;
  knop.insertAdjacentElement('afterend',fout);

  form.addEventListener('submit',function(e){
    e.preventDefault();
    if(!form.checkValidity()){
      form.reportValidity();
      return;
    }
    fout.hidden = true;
    bev.hidden = true;
    knop.disabled = true;
    knop.textContent = 'Versturen…';
    verstuur(formulierData(form)).then(function(){
      form.reset();
      bev.hidden = false;
      bev.scrollIntoView({behavior:'smooth',block:'center'});
    },function(bericht){
      fout.textContent = bericht + ' Lukt het niet? Bel ons gerust op 0470 70 99 99.';
      fout.hidden = false;
    }).then(function(){
      knop.disabled = false;
      knop.textContent = knopTekst;
    });
  });
}
koppelFormulier('formWaardescan','wsBevestiging');
koppelFormulier('formWoonprofiel','wpBevestiging');
koppelFormulier('formContact','ctBevestiging');

/* ---------- e-mail kopiëren ---------- */
var kopieerKnop = document.getElementById('kopieerKnop');
if(kopieerKnop){
  kopieerKnop.addEventListener('click',function(){
    var adres = document.getElementById('mailAdres').textContent;
    var klaar = function(){
      kopieerKnop.textContent = 'Gekopieerd';
      setTimeout(function(){ kopieerKnop.textContent = 'Kopieer e-mailadres'; },2200);
    };
    try{
      navigator.clipboard.writeText(adres).then(klaar,function(){
        var r = document.createRange();
        r.selectNodeContents(document.getElementById('mailAdres'));
        var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
      });
    }catch(err){
      var r2 = document.createRange();
      r2.selectNodeContents(document.getElementById('mailAdres'));
      var s2 = window.getSelection(); s2.removeAllRanges(); s2.addRange(r2);
    }
  });
}

document.getElementById('jaar').textContent = new Date().getFullYear();
