/* ============================================================
   DATA
   Interne vorm van een pand. Dit is bewust NIET de WHISE-vorm:
   de site praat alleen met deze vorm, zodat WHISE later in één
   functie gekoppeld wordt (zie mapWhiseEstate hieronder).
   ============================================================ */
var PANDEN = [
  {
    slug:'herenhuis-hasselt',
    beeld:'images/pand-herenhuis-hasselt.jpg',
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
    beeld:'images/pand-hoeve-borgloon.jpg',
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
    beeld:'images/pand-appartement-tongeren.jpg',
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
    beeld:'images/pand-pastorij-sint-truiden.jpg',
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
    beeld:'images/pand-nieuwbouw-lanaken.jpg',
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
    beeld:'images/pand-loft-hasselt.jpg',
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

var VERHALEN = [
  {
    slug:'ann-en-pieter',
    beeld:'images/verhaal-ann-en-pieter.jpg',
    beeldAlt:'Smartphone en laptop op een tafel bij het raam, naast een kop koffie',
    citaat:'Wij wilden geen groter huis. We wilden een stiller huis.',
    mensen:'Ann & Pieter',
    plaats:'Borgloon',
    intro:'Na achttien jaar in een rijwoning in de stad verkochten ze alles voor een hoeve aan de rand van de fruitstreek. Niet voor de ruimte, zeggen ze, maar voor de stilte.',
    tekst:[
      'Het gesprek begon niet over vierkante meters. Het begon over slapen. Ann werkte al jaren in shift en werd elke ochtend wakker van het vrachtverkeer dat de straat in draaide. Pieter had zich daar allang bij neergelegd. Zij niet.',
      '"We hebben eerst geprobeerd het op te lossen met ramen," vertelt Pieter. "Drievoudig glas, gordijnen, alles. Het hielp, maar het was pleisterwerk."',
      'De zoektocht duurde elf maanden. Ze bezochten negen panden en haakten twee keer af nadat het bod al was uitgebracht. "Dat was lastig," zegt Ann. "Maar er werd nooit druk gezet. Dat is denk ik het belangrijkste wat ik erover kan zeggen."',
      'De hoeve die het uiteindelijk werd, stond niet eens online. "We kregen een telefoon op een dinsdagavond. Of we zin hadden om iets te gaan bekijken dat de week erna pas in de verkoop ging. Dat is het verschil tussen een zoekertje en iemand die weet wat je zoekt."',
      'Ze wonen er nu twee jaar. "Het eerste wat me opviel," zegt Ann, "was dat ik ’s nachts de koelkast hoorde. Dat was nieuw."'
    ]
  },
  {
    slug:'familie-vandereyt',
    beeld:'images/verhaal-familie-vandereyt.jpg',
    beeldAlt:'Iemand houdt een TÈRRO-visitekaartje omhoog',
    citaat:'Het duurde zeven maanden. Dat was precies goed.',
    mensen:'Familie Vandereyt',
    plaats:'Hasselt',
    intro:'Een verkoop na een overlijden vraagt een ander tempo. Drie kinderen, één ouderlijk huis en geen enkele haast.',
    tekst:[
      'Toen hun moeder stierf, stond het huis er nog precies zoals zij het had achtergelaten. De drie kinderen woonden in drie verschillende provincies en waren het over vrijwel niets eens — behalve dat het niet snel moest gaan.',
      '"Een andere makelaar had het binnen de maand online willen zetten," zegt de oudste dochter. "Dat konden we niet. We waren er nog niet klaar voor om vreemden door haar keuken te laten lopen."',
      'Er werd een traject uitgetekend van zeven maanden. Eerst het praktische: attesten, keuring, schatting. Daarna pas het huis zelf, kamer per kamer, met de kinderen erbij.',
      '"Het is gek om te zeggen, maar dat leegmaken samen is uiteindelijk het mooiste geweest. We hebben dingen gevonden waar we niet van wisten dat ze bestonden."',
      'Het huis werd verkocht aan een jong gezin. "Ze hebben de kersenboom in de tuin laten staan. Dat was onze enige vraag."'
    ]
  },
  {
    slug:'marleen',
    beeld:'images/verhaal-marleen.jpg',
    beeldAlt:'Makelaar aan de telefoon aan een tafel bij het raam',
    citaat:'De keuken van mijn moeder stond er nog. Dat gaf de doorslag.',
    mensen:'Marleen',
    plaats:'Sint-Truiden',
    intro:'Ze zocht een appartement en kocht een pastorij. Over hoe een woonprofiel soms iets anders oplevert dan je invulde.',
    tekst:[
      'Marleen schreef bij haar woonprofiel: appartement, maximaal twee slaapkamers, geen tuin. Ze was net zestig, alleen, en had er geen zin in om nog eens een dak te moeten laten vernieuwen.',
      '"Ik kreeg een telefoon over een pastorijwoning van tweehonderdachtenzestig vierkante meter. Ik dacht: die hebben mijn formulier niet gelezen."',
      'Ze ging toch kijken. In de keuken stond een gietijzeren fornuis van hetzelfde model als dat van haar moeder, veertig jaar eerder, in een dorp twintig kilometer verderop.',
      '"Dat klinkt sentimenteel en dat is het ook. Maar ik stond daar en ik wist het. Soms weet je dingen voor je ze kan uitleggen."',
      'Ze woont er nu anderhalf jaar en verhuurt twee kamers aan studenten. "Het dak moet inderdaad vernieuwd worden. Volgend jaar. Ik heb er vrede mee."'
    ]
  }
];

/* ============================================================
   WHISE-KOPPELING — hier komt de echte data binnen.

   De site leest uitsluitend de vorm hierboven. Om WHISE te
   koppelen hoeft er maar één ding te gebeuren: de estates
   ophalen en door mapWhiseEstate() halen. Verder verandert er
   niets aan de site.

   Aandachtspunten bij de koppeling:
   - Roep WHISE aan vanaf de server, nooit vanuit de browser:
     de client-id en het wachtwoord horen niet in de broncode.
   - Cache het antwoord (10 tot 15 minuten volstaat ruim).
   - Zet de veldnamen hieronder recht zodra het echte JSON-
     antwoord bekend is; ze zijn nu op de gangbare WHISE-
     benamingen gebaseerd, maar niet geverifieerd.
   ============================================================ */
function mapWhiseEstate(e){
  var teHuur = (e.purposeId === 2) || /huur/i.test(e.purpose && e.purpose.name || '');
  var verkocht = /sold|rented|verkocht|verhuurd/i.test(e.purposeStatus && e.purposeStatus.name || '');
  return {
    slug:        String(e.id),
    titel:       e.name || e.shortDescription || 'Pand',
    plaats:      e.city || '',
    type:        (e.category && e.category.name) || 'Woning',
    doel:        teHuur ? 'huur' : 'koop',
    status:      verkocht ? 'sealed' : (teHuur ? 'te-huur' : 'te-koop'),
    prijs:       e.price || 0,
    periodiek:   teHuur,
    slaapkamers: e.rooms || null,
    badkamers:   e.bathRooms || null,
    bewoonbaar:  e.area || null,
    perceel:     e.groundArea || null,
    bouwjaar:    e.constructionYear || null,
    epcKlasse:   (e.epcCategory && e.epcCategory.name) || null,
    epcWaarde:   e.epcValue || null,
    kort:        e.shortDescription || '',
    lang:        (e.longDescription || '').split(/\n{2,}/).filter(Boolean),
    // beelden komen als e.pictures[] met .urlLarge / .urlSmall
    beelden:     (e.pictures || []).map(function(p){ return p.urlLarge || p.urlXXL || p.url; })
  };
}

/* ============================================================
   WEERGAVE
   ============================================================ */
var euro  = new Intl.NumberFormat('nl-BE',{style:'currency',currency:'EUR',maximumFractionDigits:0});
var getal = new Intl.NumberFormat('nl-BE');   // 4200 → 4.200 ; bouwjaren blijven ongeformatteerd

var STATUS_TEKST = {'te-koop':'Te koop','te-huur':'Te huur','sealed':'SEALED'};

function prijsTekst(p){
  if(!p.prijs) return 'Prijs op aanvraag';
  return euro.format(p.prijs) + (p.periodiek ? ' / maand' : '');
}

function esc(s){
  return String(s == null ? '' : s).replace(/[&<>"']/g,function(c){
    return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
  });
}

// Eerste foto van een pand of verhaal, of niets zodat het beeldslot zichtbaar blijft.
function beeldTag(item, alt){
  var src = item.beeld || (item.beelden && item.beelden[0]);
  return src ? '<img src="' + esc(src) + '" alt="' + esc(item.beeldAlt || alt) + '" loading="lazy">' : '';
}

function pandKaart(p,index){
  var feiten = [];
  if(p.slaapkamers) feiten.push(p.slaapkamers + ' slaapkamers');
  if(p.bewoonbaar) feiten.push(getal.format(p.bewoonbaar) + ' m² bewoonbaar');
  if(p.perceel) feiten.push(getal.format(p.perceel) + ' m² perceel');

  return '' +
    '<a class="pand" href="#pand-' + esc(p.slug) + '">' +
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

function verhaalKaart(v){
  return '' +
    '<a class="verhaal-kaart" href="#verhaal-' + esc(v.slug) + '">' +
      '<div class="beeld" data-slot="Beeldslot · ' + esc(v.mensen) + '">' + beeldTag(v, 'Het verhaal van ' + v.mensen) + '</div>' +
      '<div class="stapel stapel-8">' +
        '<p class="pand-plaats">' + esc(v.mensen) + ' — ' + esc(v.plaats) + '</p>' +
        '<p class="citaat">&ldquo;' + esc(v.citaat) + '&rdquo;</p>' +
      '</div>' +
    '</a>';
}

/* ---------- vullen ---------- */
document.getElementById('homePanden').innerHTML =
  PANDEN.filter(function(p){ return p.status !== 'sealed'; }).slice(0,2).map(pandKaart).join('');

document.getElementById('homeVerhalen').innerHTML =
  VERHALEN.slice(0,2).map(verhaalKaart).join('');

document.getElementById('verhalenRooster').innerHTML =
  VERHALEN.map(verhaalKaart).join('');

/* ---------- aanbod + filter ---------- */
var huidigFilter = 'alles';

function toonAanbod(){
  var lijst = PANDEN.filter(function(p){
    if(huidigFilter === 'alles')  return true;
    if(huidigFilter === 'koop')   return p.status === 'te-koop';
    if(huidigFilter === 'huur')   return p.status === 'te-huur';
    if(huidigFilter === 'sealed') return p.status === 'sealed';
    return true;
  });
  document.getElementById('aanbodRooster').innerHTML = lijst.map(pandKaart).join('');
  document.getElementById('aanbodLeeg').hidden = lijst.length > 0;
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
toonAanbod();

/* ---------- pand detail ---------- */
function toonPand(slug){
  var p = PANDEN.filter(function(x){ return x.slug === slug; })[0];
  var doel = document.getElementById('pandInhoud');
  if(!p){
    doel.innerHTML = '<p class="stil">Dit pand is niet langer beschikbaar.</p>' +
      '<a class="terug" href="#aanbod"><span aria-hidden="true">←</span> Terug naar het aanbod</a>';
    return;
  }

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
      '<span class="epc-label" data-klasse="' + esc(p.epcKlasse) + '">' + esc(p.epcKlasse) + '</span>' +
      esc(p.epcWaarde ? getal.format(p.epcWaarde) + ' kWh/m²' : '') + '</span></dd></div>';
  }

  doel.innerHTML = '' +
    '<a class="terug" href="#aanbod"><span aria-hidden="true">←</span> Terug naar het aanbod</a>' +
    '<div class="beeld beeld--breed" data-slot="Beeldslot · hoofdbeeld ' + esc(p.titel) + '">' +
      beeldTag(p, p.titel + ' in ' + p.plaats) +
      '<span class="status" data-status="' + (p.status === 'sealed' ? 'sealed' : 'actief') + '">' + esc(STATUS_TEKST[p.status]) + '</span>' +
    '</div>' +
    '<div class="duo duo--verspringend">' +
      '<div class="stapel stapel-16">' +
        '<p class="eyebrow">' + esc(p.plaats) + '</p>' +
        '<h1>' + esc(p.titel) + '</h1>' +
        '<p class="lead">' + esc(prijsTekst(p)) + '</p>' +
      '</div>' +
      '<div class="stapel stapel-24">' +
        '<p class="lead">' + esc(p.kort) + '</p>' +
        '<div class="artikel stil">' + p.lang.map(function(t){ return '<p>' + esc(t) + '</p>'; }).join('') + '</div>' +
      '</div>' +
    '</div>' +
    '<dl class="specs">' + specHtml + '</dl>' +
    '<div class="duo" style="align-items:center;">' +
      '<div class="stapel stapel-16">' +
        '<h3>' + (p.status === 'sealed'
            ? 'Dit pand is SEALED.'
            : 'Iets voor jou? Kom gerust kijken.') + '</h3>' +
        '<p class="stil">' + (p.status === 'sealed'
            ? 'Laat je woonprofiel achter, dan brengen we je op de hoogte zodra er iets vergelijkbaars binnenkomt.'
            : 'Een bezichtiging duurt bij ons minstens een uur. We nemen de tijd om je alles te tonen — ook de dingen die op foto niet te zien zijn.') + '</p>' +
      '</div>' +
      '<div class="knoppen">' +
        (p.status === 'sealed'
          ? '<a class="knop knop--goud" href="#woonprofiel">Maak jouw woonprofiel</a>'
          : '<a class="knop knop--goud" href="#contact">Plan een bezichtiging</a><a class="knop knop--lijn" href="#woonprofiel">Maak jouw woonprofiel</a>') +
      '</div>' +
    '</div>';
}

/* ---------- verhaal detail ---------- */
function toonVerhaal(slug){
  var v = VERHALEN.filter(function(x){ return x.slug === slug; })[0];
  var doel = document.getElementById('verhaalInhoud');
  if(!v){
    doel.innerHTML = '<p class="stil">Dit verhaal bestaat niet.</p>' +
      '<a class="terug" href="#verhalen"><span aria-hidden="true">←</span> Terug naar de verhalen</a>';
    return;
  }
  doel.innerHTML = '' +
    '<a class="terug" href="#verhalen"><span aria-hidden="true">←</span> Terug naar de verhalen</a>' +
    '<div class="duo duo--verspringend">' +
      '<div class="stapel stapel-16">' +
        '<p class="eyebrow">' + esc(v.mensen) + ' — ' + esc(v.plaats) + '</p>' +
        '<h1>&ldquo;' + esc(v.citaat) + '&rdquo;</h1>' +
      '</div>' +
      '<div class="stapel stapel-24">' +
        '<p class="lead">' + esc(v.intro) + '</p>' +
      '</div>' +
    '</div>' +
    '<div class="beeld beeld--breed" data-slot="Beeldslot · portret ' + esc(v.mensen) + '">' + beeldTag(v, 'Het verhaal van ' + v.mensen) + '</div>' +
    '<div class="artikel artikel-tekst stil">' + v.tekst.map(function(t){ return '<p>' + esc(t) + '</p>'; }).join('') + '</div>' +
    '<div class="stapel stapel-16" style="align-items:flex-start;">' +
      '<h3>Ook toe aan een volgend hoofdstuk?</h3>' +
      '<div class="knoppen">' +
        '<a class="knop knop--goud" href="#contact">Vertel ons jouw verhaal</a>' +
        '<a class="knop knop--lijn" href="#waardescan">Vraag je waardescan aan</a>' +
      '</div>' +
    '</div>';
}

/* ============================================================
   ROUTERING — hash met enkel toegelaten tekens
   ============================================================ */
var ZICHTEN = ['home','aanbod','pand','over','verhalen','verhaal','waardescan','woonprofiel','contact'];

function toonZicht(naam){
  ZICHTEN.forEach(function(z){
    var el = document.getElementById('zicht-' + z);
    if(el) el.hidden = (z !== naam);
  });
  Array.prototype.forEach.call(document.querySelectorAll('.nav a[data-nav]'),function(a){
    if(a.dataset.nav === naam) a.setAttribute('aria-current','page');
    else a.removeAttribute('aria-current');
  });
}

function route(){
  var h = (location.hash || '#home').slice(1);

  if(h.indexOf('pand-') === 0){
    toonPand(h.slice(5));
    toonZicht('pand');
  } else if(h.indexOf('verhaal-') === 0){
    toonVerhaal(h.slice(8));
    toonZicht('verhaal');
  } else if(ZICHTEN.indexOf(h) !== -1 && h !== 'pand' && h !== 'verhaal'){
    toonZicht(h);
  } else {
    toonZicht('home');
  }

  sluitNav();
  window.scrollTo({top:0,behavior:'auto'});
}

window.addEventListener('hashchange',route);
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
}
function sluitNav(){
  if(!nav || !navKnop) return;
  if(mobiel()){
    nav.hidden = true;
    navKnop.setAttribute('aria-expanded','false');
  } else {
    nav.hidden = false;
  }
  document.body.style.overflow = '';
}

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
document.querySelectorAll('.illu, .hero-merk').forEach(function(svg){
  svg.querySelectorAll('path,rect,circle,ellipse').forEach(function(el,i){
    el.setAttribute('pathLength','1');
    el.style.setProperty('--i',i);
  });
});

/* nu pas de eerste routering */
route();

/* ---------- kop bij scroll ---------- */
var kop = document.getElementById('kop');
function scrollKop(){ kop.dataset.gescrold = window.scrollY > 8 ? 'ja' : 'nee'; }
window.addEventListener('scroll',scrollKop,{passive:true});
scrollKop();

/* ---------- formulieren ---------- */
function koppelFormulier(formId,bevestigingId){
  var form = document.getElementById(formId);
  var bev  = document.getElementById(bevestigingId);
  if(!form) return;
  form.addEventListener('submit',function(e){
    e.preventDefault();
    // In productie gaat dit naar je eigen endpoint of naar WHISE als lead.
    if(!form.checkValidity()){
      form.reportValidity();
      return;
    }
    bev.hidden = false;
    bev.scrollIntoView({behavior:'smooth',block:'center'});
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
