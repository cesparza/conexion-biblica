/* Las selecciones exploran contenido; no registran avance. */
let siguienteInstancia = 0;

const BIBLIA = 'https://www.biblegateway.com/passage/?search=Daniel%2011&version=RVR1995';
const TREIYER = 'Humberto R. Treiyer, Enigmas descifrados (2006, tercera impresión 2007)';
const FUENTES = {
  territorio: [
    ['Daniel 11:5–9 · RV1995', BIBLIA],
    [TREIYER + ', pp. 55–60'],
    ['Natural Earth · tierra física 1:50m; costa recortada, sin fronteras administrativas', 'https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_50m_land.geojson'],
    ['Natural Earth · puntos de referencia: Damasco, Jerusalén y El Cairo', 'https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_50m_populated_places.geojson'],
    ['Natural Earth · datos de dominio público; se permite adaptar su geometría', 'https://www.naturalearthdata.com/about/terms-of-use/'],
  ],
  alianza: [
    ['Daniel 11:6–8 · RV1995', BIBLIA],
    [TREIYER + ', pp. 56–60'],
    ['Bevan, The House of Ptolemy, cap. VI · tradiciones antiguas comparadas'],
  ],
  visiones: [
    ['Daniel 11:3–4; 8:21–22 · RV1995', BIBLIA],
    ['Daniel 2:32, 39; 7:6; 8:8 · RV1995', 'https://www.biblegateway.com/passage/?search=Daniel%202%3A32%2C39%3B7%3A6%3B8%3A8&version=RVR1995'],
    [TREIYER + ', pp. 52–55'],
  ],
  escape: [
    ['Daniel 11:41; 12:1; 8:9 · RV1995', BIBLIA],
    ['Génesis 19:36–38; 36:1; Apocalipsis 18:4; 13:11–17', 'https://www.biblegateway.com/passage/?search=Genesis%2019%3A36-38%3B36%3A1%3BApocalipsis%2018%3A4%3B13%3A11-17&version=RVR1995'],
    ['Elena G. de White, El conflicto de los siglos, cap. 26: formación de la imagen, PDF 364', 'https://text.egwwritings.org/amp/read/1710.2047'],
    ['Stephen Bohr, Studies on Daniel 11 (267 pp.), pp. 120–157', 'https://sumtv.store/studies-on-daniel-11-digital-download/'],
    [TREIYER + ', pp. 161–177'],
  ],
};

/* Natural Earth 1:50m physical land, public domain; cropped to 27–39 E, 28–37.5 N.
   Source: https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_50m_land.geojson
   SHA256 e874b27a51d146452be360cafb3cc50c86001074a67d534113e6534682f9826b.
   Terms: https://www.naturalearthdata.com/about/terms-of-use/
   Polygon clipping preserves the physical coast, without administrative boundaries.
   Projection: equirectangular, longitude scaled by cos(33 degrees).
   Reference points use ne_50m_populated_places.geojson from the same source.
   They locate places, not ancient capitals or territorial extents. */
const COSTA_D11 = [
  "M281.7,96.9L263.1,109.7L261.9,113.5L262.8,116.2L265.4,119.4L266.0,120.2L267.0,122.6L262.9,123.3L258.9,123.6L256.6,123.3L254.5,123.4L247.9,130.3L244.4,132.7L240.2,134.1L235.9,134.9L233.7,135.0L231.8,135.9L230.5,137.5L230.5,139.1L229.9,140.4L227.5,140.1L226.5,137.6L224.9,136.5L220.7,137.1L218.7,137.0L212.0,134.6L210.0,133.6L208.7,131.5L205.3,124.1L204.7,118.6L207.9,120.0L210.9,118.3L213.8,115.5L217.2,114.4L219.4,114.9L221.5,115.3L225.3,114.5L227.0,110.3L227.5,105.5L234.0,106.9L240.6,107.6L245.9,107.9L251.2,107.1L267.5,102.0L272.1,99.0L274.9,97.9L279.8,95.4L285.0,94.0L281.7,96.9ZM46.0,82.7L43.4,83.6L42.5,83.4L41.5,81.5L43.0,76.7L41.6,73.7L41.5,72.4L43.6,70.6L45.0,67.9L48.6,65.0L57.7,61.6L59.9,61.3L59.8,64.0L56.7,70.8L54.0,74.2L54.7,76.9L50.4,77.7L46.0,82.7ZM22.3,102.4L20.9,104.8L19.5,102.7L20.1,100.4L18.5,96.7L21.6,91.3L21.6,88.6L23.9,87.3L23.4,91.8L21.6,95.4L23.4,98.4L24.3,101.8L22.3,102.4ZM46.6,56.2L45.8,56.8L44.1,54.9L44.0,53.9L45.8,52.7L46.7,52.5L47.0,53.2L46.9,54.9L46.6,56.2ZM16.7,39.0L16.0,39.1L16.0,36.2L16.6,36.8L17.4,37.2L17.2,38.2L16.7,39.0ZM16.0,45.6L18.2,44.0L23.7,41.5L25.5,41.3L28.5,42.8L22.9,45.3L21.4,46.7L17.2,47.0L16.0,47.7ZM443.2,16.0L443.2,419.3L308.2,419.3L307.2,417.",
  "8L303.6,415.6L294.7,414.6L290.9,413.7L287.4,416.5L287.1,413.0L289.5,408.0L293.0,397.7L293.6,388.7L299.0,361.8L300.2,356.2L299.9,353.2L297.4,356.5L295.4,358.5L291.4,365.3L287.2,387.1L281.1,404.1L280.4,414.7L279.4,418.6L279.1,419.3L258.9,419.3L256.7,417.2L250.8,408.4L244.4,402.7L238.4,395.2L236.8,389.7L236.9,386.2L234.2,377.7L232.3,373.7L225.0,364.7L222.9,359.8L221.3,357.7L219.7,354.7L217.0,342.9L214.1,335.5L210.8,337.5L211.4,340.7L208.5,345.0L206.8,350.0L208.1,354.2L214.1,360.4L215.3,363.1L216.7,369.1L216.5,377.1L217.5,379.9L221.9,385.9L223.5,389.4L224.5,392.5L226.0,395.3L230.4,400.5L236.8,410.4L242.9,417.1L245.8,419.3L16.0,419.3L16.0,273.8L24.8,275.9L35.2,282.9L38.1,283.8L45.5,283.6L50.4,287.8L69.9,289.8L80.3,294.3L86.2,298.0L89.8,299.1L92.9,298.9L97.1,297.6L102.5,295.0L108.3,291.4L120.3,282.3L124.6,280.6L127.3,281.1L130.7,280.9L132.1,278.5L133.9,276.8L135.0,274.8L136.9,272.5L143.1,271.8L155.7,267.9L154.3,269.7L142.8,274.2L147.7,274.8L152.8,273.2L158.5,272.3L159.5,270.4L160.2,266.8L161.4,266.3L165.3,267.0L177.1,272.5L180.0,272.6L188.3,269.6L190.0,268.9L192.7,270.6L198.8,277.4L196.7,277.3L190.2,271.4L189.6,274.4L185.9,279.5L190.5,281.7L194.3,282.6L196.3,285.4L197.6,288.0L201.4,286.9",
  "L204.0,283.4L202.6,281.4L201.7,279.4L202.9,279.4L205.5,281.0L213.0,287.6L215.5,289.0L218.4,288.8L224.4,286.9L226.1,287.2L234.2,284.8L235.2,286.6L236.5,288.3L243.1,286.4L253.3,286.4L261.7,284.2L271.5,279.0L272.3,278.2L279.0,271.4L282.2,267.1L282.4,266.8L289.4,253.9L293.8,241.1L298.0,223.4L301.0,214.4L303.5,208.4L304.7,203.5L306.3,200.2L308.0,196.0L309.7,190.4L312.8,185.6L319.0,169.7L322.6,163.2L323.9,154.0L329.4,146.0L333.6,143.6L335.6,141.3L335.6,137.9L332.8,128.4L332.4,124.3L332.5,119.6L334.4,112.6L333.5,109.4L333.4,107.2L332.9,104.3L328.0,97.9L330.7,86.1L332.6,83.2L334.9,79.8L332.4,72.9L329.7,66.5L332.2,62.4L337.5,57.5L343.1,51.7L343.1,48.1L342.8,45.4L341.2,43.5L338.1,41.0L333.0,43.7L329.3,46.6L326.9,47.2L324.3,48.9L323.1,52.0L319.9,54.3L314.8,55.3L307.1,52.7L298.8,48.9L294.1,45.7L290.2,45.0L286.6,46.4L275.9,54.0L266.0,65.2L263.6,67.1L254.3,71.9L248.2,73.6L245.3,73.2L233.1,75.3L227.1,75.6L222.3,78.1L213.0,75.4L207.4,71.9L204.1,68.3L198.6,60.6L194.8,56.9L186.1,53.7L171.0,45.7L167.0,44.8L156.6,43.6L145.7,42.9L143.5,45.8L142.7,57.4L140.8,60.5L140.0,66.5L138.7,68.2L136.6,69.3L133.3,67.5L131.0,66.6L125.8,69.1L115.3,72.5L111.7,73.0L99.6,68.7L95.2,65.9L92.3,62.8L91.3,57.6L89.5,54.6L89.3",
  ",52.6L88.6,50.2L86.1,49.3L83.5,51.1L80.7,51.0L77.1,49.9L68.8,45.6L62.4,45.2L58.6,50.5L55.6,52.2L52.3,52.7L52.1,51.2L54.6,47.8L44.6,48.4L39.3,51.0L35.2,50.6L32.2,49.4L32.6,48.0L35.7,47.5L38.5,46.3L49.3,45.3L51.8,44.4L54.6,40.6L59.6,37.4L60.2,36.0L56.4,36.0L39.8,36.9L28.4,36.4L27.1,38.0L25.4,38.2L24.9,33.9L26.7,31.8L29.1,32.0L35.0,30.3L34.5,26.6L30.3,24.2L29.4,22.8L26.3,22.4L23.8,20.7L23.3,16.4L23.1,16.0Z",
].join('');

const TERRITORIOS = [
  {
    id: 'norte', nombre: 'Reino seléucida', lugar: 'Norte',
    quien: 'Seleuco I Nicátor y sus sucesores; su dominio incluía Siria.',
    epoca: 'Después de Alejandro; conflicto dinástico del siglo III a. C.',
    sentido: 'Desde Judea, este reino quedaba al norte. Sus sucesores disputaron a los Tolomeos el corredor entre ambas potencias.',
    pacto: 'La rivalidad alcanza la tierra del pueblo de Daniel. Por eso el relato sigue estas guerras y sus alianzas.',
  },
  {
    id: 'centro', nombre: 'Judea', lugar: 'Punto de referencia',
    quien: 'La tierra del pueblo de Daniel, situada entre los reinos enfrentados.',
    epoca: 'Egipto y Siria en el siglo III a. C.',
    sentido: 'Norte y sur se leen desde aquí. Judea no es una tercera dinastía equivalente a las otras dos.',
    pacto: 'Las decisiones de cortes lejanas afectan al pueblo y a su fidelidad. El mapa ayuda a entender el hilo del capítulo.',
  },
  {
    id: 'sur', nombre: 'Egipto de los Tolomeos', lugar: 'Sur',
    quien: 'Tolomeo I Sóter fundó la dinastía egipcia; Berenice pertenecía a esta familia real.',
    epoca: 'Después de Alejandro; conflicto dinástico del siglo III a. C.',
    sentido: 'Egipto quedaba al sur de Judea. Sus gobernantes buscaban conservar su influencia mediante campañas y acuerdos.',
    pacto: 'Una alianza matrimonial pretende asegurar la paz, pero su fracaso devuelve la región a la guerra.',
  },
];

const ALIANZA = [
  {
    nombre: 'La alianza', ref: 'Daniel 11:6', titulo: 'Una familia como garantía de paz',
    decision: 'Berenice, hija de Tolomeo II, se casa con Antíoco II para acercar Egipto y el reino seléucida.',
    resultado: 'La unión intenta cerrar la disputa política; abre también una rivalidad sucesoria con Laodice y su hijo Seleuco II.',
    enlace: 'Matrimonio político', naturaleza: 'Relato histórico y aplicación a Daniel 11:6',
  },
  {
    nombre: 'La ruptura', ref: 'Daniel 11:6', titulo: 'La alianza no protege a Berenice',
    decision: 'La rivalidad por la sucesión rompe el acuerdo entre las familias reales.',
    resultado: 'Berenice y su hijo mueren. Las fuentes antiguas no aclaran todos los detalles de las intrigas; el envenenamiento no se presenta aquí como un hecho probado.',
    enlace: 'Acuerdo roto', naturaleza: 'Historia; detalles de la intriga con límites documentales',
  },
  {
    nombre: 'La campaña', ref: 'Daniel 11:7–8', titulo: 'El hermano interviene',
    decision: 'Tolomeo III, hermano de Berenice, asume el trono egipcio e interviene contra el reino de Seleuco II.',
    resultado: 'La campaña lleva botín e imágenes religiosas a Egipto. El parentesco explica la continuidad entre el fracaso de la paz y la nueva guerra.',
    enlace: 'Campaña y regreso con botín', naturaleza: 'Relato histórico y lectura de Daniel 11:7–8',
  },
];

const VISIONES = [
  {
    id: 'd2', nombre: 'Daniel 2', simbolo: 'Bronce', ref: 'Daniel 2:32, 39',
    frase: 'su vientre y sus muslos, de bronce',
    conexion: 'La secuencia pasa de la plata al bronce. La lectura histórica reconoce el poder griego que sucede a Medopersia; Daniel 11 continúa hacia el rey poderoso y la división de su reino.',
    limite: 'Daniel 2 no nombra aquí a Alejandro ni describe los cuatro reinos sucesores.',
  },
  {
    id: 'd7', nombre: 'Daniel 7', simbolo: 'Leopardo · cuatro cabezas', ref: 'Daniel 7:6',
    frase: 'Esta bestia tenía cuatro cabezas; y le fue dado dominio.',
    conexion: 'Las cuatro cabezas permiten comparar la pluralidad del dominio griego con el reino repartido de Daniel 11:4. La conexión se estudia dentro de la secuencia de las visiones.',
    limite: 'El versículo no da los nombres de los cuatro generales. Su identificación pertenece a la explicación histórica.',
  },
  {
    id: 'd8', nombre: 'Daniel 8', simbolo: 'Macho cabrío · cuatro cuernos', ref: 'Daniel 8:8, 21–22',
    frase: 'cuatro reinos se levantarán de esa nación, aunque no con la fuerza de él.',
    conexion: 'Daniel 8:21 nombra a Grecia y al primer rey; 8:22 explica los cuatro reinos. Daniel 11:4 añade que el dominio no pasaría a sus descendientes.',
    limite: 'La consolidación de los reinos ocurrió tras conflictos. El reparto no fue un acuerdo pacífico e instantáneo al morir Alejandro.',
  },
];

const ESCAPE = [
  {
    nombre: 'El pasaje', alcance: 'Texto bíblico', titulo: 'El dominio encuentra un límite',
    texto: 'Entrará en la tierra gloriosa, y muchas provincias caerán; pero escaparán de sus manos Edom, Moab y la mayoría de los hijos de Amón.',
    ref: 'Daniel 11:41 · RV1995',
    explica: 'La entrada y la caída no agotan el versículo: el texto conserva la diferencia entre caer bajo el poder y escapar de sus manos.',
  },
  {
    nombre: 'La aplicación', alcance: 'Interpretación del estudio', titulo: 'Libertad de conciencia y escape',
    texto: 'La lectura seguida relaciona la tierra gloriosa con Estados Unidos como baluarte de principios protestantes y de libertad de conciencia.',
    ref: 'Bohr, Studies on Daniel 11, pp. 120–157',
    explica: 'Edom, Moab y Amón representan en esta aplicación personas que dejan la esfera del opresor. La conexión se compara con el llamado de Apocalipsis 18:4.',
  },
  {
    nombre: 'La evidencia', alcance: 'Pasajes comparados y fuentes', titulo: 'Cada conexión tiene su referencia',
    texto: 'Daniel 11:41 presenta el escape; Daniel 12:1 desarrolla la liberación. Apocalipsis 13:11–17 trata la coerción y 18:4 el llamado a salir.',
    ref: 'Daniel 11:41; 12:1 · Apocalipsis 13:11–17; 18:4',
    explica: 'El conflicto de los siglos, cap. 26, estudia la formación de la imagen. La aplicación precisa de Daniel 11:41 se desarrolla en Bohr, pp. 120–157, y Treiyer, pp. 161–177.',
  },
  {
    nombre: 'El límite', alcance: 'Expectativa futura sin fecha', titulo: 'El esquema no es una invasión fechada',
    texto: 'El versículo no nombra a Estados Unidos. Esa identificación es una aplicación interpretativa; no documenta por sí sola una invasión geográfica moderna.',
    ref: 'Alcance de la lectura de Daniel 11:41',
    explica: 'No se asignan fechas al desenlace ni los tres pueblos a tres denominaciones modernas. El pueblo de Dios tiene alcance mundial; la promesa no condena personas por su origen.',
  },
];

export const estilosDaniel11 = `
.d11lab{--d11lab-bg:var(--c-noche,#090a10);--d11lab-fg:var(--c-perg,#f4eee2);--d11lab-muted:var(--c-tenue,#c9bda6);--d11lab-gold:var(--c-oro,#f2c46b);--d11lab-line:rgba(244,238,226,.2);color:var(--d11lab-fg);background:var(--d11lab-bg);border:1px solid var(--d11lab-line);border-radius:24px;padding:clamp(16px,3vw,30px);font:400 16px/1.6 var(--cine-sans,system-ui,sans-serif);overflow-wrap:anywhere;color-scheme:dark}
.d11lab *{box-sizing:border-box}.d11lab h2,.d11lab h3,.d11lab p{margin:0}.d11lab h2{font:500 clamp(1.65rem,4vw,2.6rem)/1.15 var(--cine-serif,Georgia,serif);max-width:25ch}.d11lab h3{font:500 clamp(1.35rem,3vw,1.8rem)/1.2 var(--cine-serif,Georgia,serif)}
.d11lab .d11lab-eyebrow{color:var(--d11lab-gold);font-size:.74rem;font-weight:750;letter-spacing:.1em;text-transform:uppercase}.d11lab .d11lab-intro{color:var(--d11lab-muted);max-width:70ch;margin-top:12px}.d11lab .d11lab-nav{display:flex;flex-wrap:wrap;gap:8px;margin:22px 0}
.d11lab button{appearance:none;min-height:44px;border:1px solid var(--d11lab-line);border-radius:12px;padding:10px 14px;background:rgba(244,238,226,.04);color:var(--d11lab-fg);font:650 .88rem/1.3 var(--cine-sans,system-ui,sans-serif);text-align:left;cursor:pointer;transition:background .18s,border-color .18s}.d11lab button:hover{border-color:var(--d11lab-gold)}.d11lab button[aria-pressed=true]{background:var(--d11lab-gold);border-color:var(--d11lab-gold);color:#20170b}
.d11lab button:focus-visible,.d11lab a:focus-visible,.d11lab summary:focus-visible{outline:3px solid var(--d11lab-gold);outline-offset:4px}.d11lab .d11lab-body{display:grid;gap:20px}.d11lab .d11lab-head{display:grid;gap:8px}.d11lab .d11lab-nature{color:var(--d11lab-gold);font-size:.8rem}.d11lab .d11lab-work{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:22px;align-items:start}
.d11lab .d11lab-visual{background:radial-gradient(ellipse at center,rgba(242,196,107,.09),transparent 75%);border:1px solid var(--d11lab-line);border-radius:18px;min-width:0;padding:12px}.d11lab svg{display:block;width:100%;height:auto;max-height:440px;overflow:visible}.d11lab svg text{font-family:var(--cine-sans,system-ui,sans-serif);fill:var(--d11lab-fg);font-size:18px}.d11lab svg .d11lab-small{font-size:15px;fill:var(--d11lab-muted)}
.d11lab svg .d11lab-node{fill:#14151d;stroke:var(--d11lab-line);stroke-width:2}.d11lab svg .d11lab-on .d11lab-node{fill:rgba(242,196,107,.15);stroke:var(--d11lab-gold);stroke-width:3}.d11lab svg .d11lab-wire{fill:none;stroke:var(--d11lab-muted);stroke-width:3;stroke-linecap:round}.d11lab svg .d11lab-wire.d11lab-on{stroke:var(--d11lab-gold);stroke-width:5}.d11lab svg .d11lab-dim{opacity:.35}
.d11lab svg.d11lab-map{max-height:none}.d11lab svg.d11lab-map text{font-size:22px}
.d11lab .d11lab-caption{font-size:.78rem;color:var(--d11lab-muted);margin-top:8px}.d11lab .d11lab-controls{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px}.d11lab .d11lab-detail{display:grid;gap:14px;min-width:0}.d11lab .d11lab-detail dl{display:grid;gap:12px;margin:0}.d11lab .d11lab-detail dt{font-size:.74rem;letter-spacing:.08em;text-transform:uppercase;color:var(--d11lab-gold);font-weight:750}.d11lab .d11lab-detail dd{margin:2px 0 0}
.d11lab .d11lab-callout{border-left:3px solid var(--d11lab-gold);padding:10px 14px;background:rgba(242,196,107,.055)}.d11lab .d11lab-quote{font:500 1.1rem/1.7 var(--cine-serif,Georgia,serif)}.d11lab .d11lab-ref{font-size:.8rem;color:var(--d11lab-gold)}.d11lab .d11lab-sources{border-top:1px solid var(--d11lab-line);padding-top:14px;font-size:.82rem}.d11lab .d11lab-sources summary{cursor:pointer;min-height:44px;display:list-item;padding:9px 0;color:var(--d11lab-gold);font-weight:700}.d11lab .d11lab-sources ul{padding-left:20px;margin:6px 0;display:grid;gap:8px}.d11lab a{color:var(--d11lab-gold);text-underline-offset:3px}
.d11lab .d11lab-sequence{display:grid;gap:10px}.d11lab .d11lab-sequence>div{padding:13px;border:1px solid var(--d11lab-line);border-radius:12px}.d11lab .d11lab-sequence>div.d11lab-active{border-color:var(--d11lab-gold);background:rgba(242,196,107,.08)}.d11lab .d11lab-symbols{display:grid;gap:12px}.d11lab .d11lab-symbol{border:1px solid var(--d11lab-line);border-radius:12px;padding:14px;color:var(--d11lab-muted);opacity:.5}.d11lab .d11lab-symbol.d11lab-active{color:var(--d11lab-fg);border-color:var(--d11lab-gold);opacity:1}.d11lab .d11lab-symbol strong{display:block;color:var(--d11lab-gold)}
@media(max-width:650px){.d11lab .d11lab-work{grid-template-columns:1fr}.d11lab .d11lab-nav{display:grid;grid-template-columns:repeat(2,minmax(0,1fr))}.d11lab .d11lab-nav button{font-size:.8rem;padding:10px}.d11lab .d11lab-visual{max-width:480px;width:100%;margin:auto}.d11lab svg{max-height:350px}.d11lab .d11lab-controls button{flex:1 1 110px}.d11lab .d11lab-detail{gap:12px}}
@media(prefers-reduced-motion:reduce){.d11lab *{transition:none!important;animation:none!important;scroll-behavior:auto!important}}
`;

const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const controles = (accion, datos, actual) => '<div class="d11lab-controls">' + datos.map((d, i) =>
  `<button type="button" data-d11lab-action="${accion}" data-d11lab-value="${i}" aria-pressed="${i === actual}">${esc(d.nombre)}</button>`).join('') + '</div>';
const fuentes = clave => '<details class="d11lab-sources"><summary>Consultar fuentes y localizadores</summary><ul>' + FUENTES[clave].map(([texto, url]) =>
  '<li>' + (url ? `<a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(texto)}</a>` : esc(texto)) + '</li>').join('') + '</ul></details>';
const encabezado = (numero, titulo, tipo, ayuda) => `<header class="d11lab-head"><p class="d11lab-eyebrow">Exploración ${numero} de 4</p><h3>${titulo}</h3><p class="d11lab-nature">${tipo}</p><p>${ayuda}</p></header>`;
const svg = (titulo, contenido) => `<svg viewBox="0 0 460 380" role="img" aria-label="${esc(titulo)}"><title>${esc(titulo)}</title>${contenido}</svg>`;
const nodo = (x, y, ancho, alto, titulo, subtitulo, activo = false) => `<g class="${activo ? 'd11lab-on' : ''}"><rect class="d11lab-node" x="${x}" y="${y}" width="${ancho}" height="${alto}" rx="14"/><text x="${x + ancho / 2}" y="${y + 31}" text-anchor="middle">${esc(titulo)}</text><text class="d11lab-small" x="${x + ancho / 2}" y="${y + 54}" text-anchor="middle">${esc(subtitulo)}</text></g>`;

function territorio(i, id) {
  const t = TERRITORIOS[i];
  const proyecta = (lon, lat) => [16 + (lon - 27) * 35.6, 16 + (37.5 - lat) * 35.6 / Math.cos(33 * Math.PI / 180)];
  const puntos = [[36.29805, 33.50198], [35.206626, 31.778408], [31.248022, 30.051906]].map(p => proyecta(...p));
  const [norte, centro, sur] = puntos;
  const flecha = (destino, activa, nombre) => `<path class="d11lab-map-route" data-d11lab-route="${nombre}" data-active="${activa}" d="M${centro.join(',')}L${destino.join(',')}" fill="none" stroke="${activa ? '#f2c46b' : '#6e8384'}" stroke-width="${activa ? 4 : 2}" stroke-dasharray="8 6" marker-end="url(#${id}-${activa ? 'oro' : 'tenue'})"/>`;
  const marcas = puntos.map(([x, y], n) => `<g class="d11lab-map-point" data-d11lab-point="${TERRITORIOS[n].id}" data-active="${n === i}"><circle cx="${x}" cy="${y}" r="${n === i ? 25 : 15}" fill="#f2c46b" opacity="${n === i ? .2 : .07}"/><circle cx="${x}" cy="${y}" r="${n === i ? 8 : 5}" fill="${n === i || n === 1 ? '#f2c46b' : '#c9bda6'}" stroke="#090a10" stroke-width="2"/></g>`).join('');
  const dibujo = `<svg class="d11lab-map" viewBox="0 0 460 442" role="img" aria-label="Costa del Mediterráneo oriental. Siria al norte de Judea y Egipto al suroeste. Selección: ${esc(t.nombre)}"><title>Mediterráneo oriental · ${esc(t.nombre)}</title><defs><clipPath id="${id}-mapa"><rect x="8" y="8" width="444" height="426" rx="14"/></clipPath><marker id="${id}-oro" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill="#f2c46b"/></marker><marker id="${id}-tenue" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill="#6e8384"/></marker></defs>` +
    `<g clip-path="url(#${id}-mapa)"><rect x="8" y="8" width="444" height="426" fill="#122732"/><path d="${COSTA_D11}" fill="#353d31" stroke="#939d82" stroke-width="1.3" stroke-linejoin="round"/>` +
    '<text x="42" y="164" style="fill:#a0c3cf;font-size:21px">Mar</text><text x="42" y="190" style="fill:#a0c3cf;font-size:21px">Mediterráneo</text>' +
    flecha(norte, i !== 2, 'norte') + flecha(sur, i !== 0, 'sur') + marcas +
    '<g style="font-size:22px;font-weight:700;paint-order:stroke;stroke:#14201e;stroke-width:4px;stroke-linejoin:round"><text x="291" y="135">Siria</text><text x="332" y="276">Judea</text><text x="48" y="375">Egipto</text></g>' +
    '<g style="paint-order:stroke;stroke:#14201e;stroke-width:3px;font-weight:600"><text x="291" y="157" style="font-size:18px">Reino seléucida</text><text x="332" y="298" style="font-size:18px">Jerusalén</text><text x="48" y="397" style="font-size:18px">Tolomeos</text></g>' +
    '<g stroke="#c9bda6" stroke-width="1" fill="none"><path d="M332 165L344 180"/><path d="M320 263L331 271"/><path d="M159 338L129 362"/></g><path d="M419 48V24L414 32M419 24L424 32" stroke="#c9bda6" fill="none" stroke-width="2"/><text x="419" y="68" text-anchor="middle" style="font-size:17px">N</text></g></svg>';
  return encabezado(1, '¿Desde dónde se leen norte y sur?', 'Contexto geográfico e identificación histórica · Daniel 11:5–9', 'Elige un territorio. Observa su posición respecto de Judea y por qué entra en el relato.') +
    `<div class="d11lab-work"><div class="d11lab-visual">${dibujo}<p class="d11lab-caption">Costa de referencia actual · Natural Earth 1:50m. Los puntos ubican regiones; las flechas esquematizan relaciones respecto de Judea, sin fronteras de época ni trayectos militares exactos.</p></div><div>${controles('territorio', TERRITORIOS, i)}<div class="d11lab-detail" id="${id}-info" aria-live="polite"><h3>${esc(t.nombre)}</h3><dl><div><dt>Quién</dt><dd>${esc(t.quien)}</dd></div><div><dt>Época</dt><dd>${esc(t.epoca)}</dd></div><div><dt>Desde Judea</dt><dd>${esc(t.sentido)}</dd></div></dl><p class="d11lab-callout">${esc(t.pacto)}</p></div></div></div>` + fuentes('territorio');
}

function alianza(i, id) {
  const a = ALIANZA[i];
  let enlaces = i === 0 ? '<path class="d11lab-wire d11lab-on" d="M194 150H265"/><text class="d11lab-small" x="230" y="88" text-anchor="middle">alianza</text>' :
    '<path class="d11lab-wire" stroke-dasharray="7 7" d="M194 150H265"/><path class="d11lab-wire d11lab-on" d="M218 138L242 162M242 138L218 162"/>';
  if (i === 2) enlaces = '<path class="d11lab-wire d11lab-on" d="M140 276Q190 203 265 150"/><path d="M265 150L249 156L257 167Z" fill="var(--d11lab-gold)"/><text class="d11lab-small" x="305" y="244" text-anchor="middle">campaña</text>';
  const dibujo = svg('Relaciones dinásticas: ' + a.nombre,
    enlaces + nodo(4, 112, 190, 76, 'Berenice', 'Hija de Tolomeo II', i !== 2) +
    nodo(265, 112, 190, 76, i === 2 ? 'Seleuco II' : 'Antíoco II', 'Reino seléucida', true) +
    '<path class="d11lab-wire" stroke-dasharray="3 7" d="M99 188V270"/>' +
    nodo(4, 276, 225, 76, 'Tolomeo III', 'Hermano de Berenice', i === 2));
  return encabezado(2, 'Una paz que desemboca en guerra', a.naturaleza, 'Recorre tres decisiones. La línea punteada vertical indica parentesco; la horizontal, el acuerdo político.') +
    `<div class="d11lab-work"><div class="d11lab-visual">${dibujo}<p class="d11lab-caption">${esc(a.enlace)} · ${esc(a.ref)}. El esquema selecciona protagonistas, no representa un árbol familiar completo.</p></div><div>${controles('alianza', ALIANZA, i)}<div class="d11lab-detail" id="${id}-info" aria-live="polite"><p class="d11lab-eyebrow">Paso ${i + 1} de 3 · ${a.ref}</p><h3>${a.titulo}</h3><dl><div><dt>Decisión y conflicto</dt><dd>${a.decision}</dd></div><div><dt>Resultado</dt><dd>${a.resultado}</dd></div></dl></div></div></div>` + fuentes('alianza');
}

function visiones(i, id) {
  const v = VISIONES[i];
  const iconos = [
    '<path d="M190 34H270L285 90L269 150H191L175 90Z" fill="#b97a45" stroke="#f2c46b" stroke-width="3"/><path d="M198 151L188 194M262 151L272 194" stroke="#b97a45" stroke-width="20"/>',
    '<ellipse cx="230" cy="100" rx="92" ry="37" fill="none" stroke="#f2c46b" stroke-width="3"/>' + [164,208,252,296].map(x => `<circle cx="${x}" cy="65" r="18" fill="#33271c" stroke="#f2c46b" stroke-width="2"/>`).join('') + '<path d="M157 125L142 160M201 132V166M259 132V166M302 123L316 158" stroke="#f2c46b" stroke-width="5"/>',
    '<ellipse cx="230" cy="115" rx="74" ry="37" fill="none" stroke="#f2c46b" stroke-width="3"/><circle cx="320" cy="87" r="22" fill="none" stroke="#f2c46b" stroke-width="3"/><path d="M174 139L165 173M257 147L270 173" stroke="#f2c46b" stroke-width="5"/>' + [191,220,249,278].map(x => `<path d="M${x} 76Q${x - 13} 46 ${x} 22" fill="none" stroke="#f2c46b" stroke-width="4"/>`).join(''),
  ];
  const dibujo = svg(v.simbolo + '. Correspondencia seleccionada con Daniel 11:4.',
    iconos[i] + '<path class="d11lab-wire d11lab-on" d="M230 198V246"/>' + nodo(50, 254, 360, 82, 'Daniel 11:4', 'El reino repartido', true));
  return encabezado(3, 'Una secuencia, más detalle en cada visión', 'Texto bíblico y comparación interpretativa · Daniel 11:3–4', 'Elige una visión. Cambian el símbolo destacado, la frase bíblica y lo que añade a la comparación.') +
    `<div class="d11lab-work"><div class="d11lab-visual">${dibujo}<p class="d11lab-caption">Símbolos esquemáticos para comparar el texto. No son retratos ni reconstrucciones históricas.</p><p class="d11lab-quote">«su reino será quebrantado y repartido hacia los cuatro vientos del cielo»</p><p class="d11lab-ref">Daniel 11:4 · RV1995</p></div><div>${controles('visiones', VISIONES, i)}<div class="d11lab-detail" id="${id}-info" aria-live="polite"><h3>${v.simbolo}</h3><p class="d11lab-quote">«${esc(v.frase)}»</p><p class="d11lab-ref">${v.ref} · RV1995</p><p>${v.conexion}</p><p class="d11lab-callout">${v.limite}</p></div></div></div>` + fuentes('visiones');
}

function escape(i, id) {
  const e = ESCAPE[i];
  const dibujo = svg('El texto distingue presión y escape; no representa países modernos.',
    nodo(28, 22, 404, 76, 'Daniel 11:41', 'La entrada no alcanza a todos', true) +
    `<path class="d11lab-wire ${i === 0 ? 'd11lab-on' : ''}" d="M170 98L110 175"/><path class="d11lab-wire ${i !== 0 ? 'd11lab-on' : ''}" d="M290 98L350 175"/>` +
    nodo(5, 180, 215, 76, 'Muchas caen', 'Presión del poder', i === 0) +
    nodo(240, 180, 215, 76, 'Otros escapan', 'Edom · Moab · Amón', i !== 0) +
    '<path class="d11lab-wire d11lab-on" d="M350 258V306H260"/><text x="245" y="339" text-anchor="middle">La promesa conserva una salida</text>');
  return encabezado(4, 'Personas que escapan · escena 13', 'Interpretación y promesa · Daniel 11:41', 'Examina el pasaje, su aplicación, la evidencia y su límite. Cada selección mantiene visible qué clase de afirmación estás leyendo.') +
    `<div class="d11lab-work"><div class="d11lab-visual">${dibujo}<p class="d11lab-caption">Esquema del argumento. No es un mapa de una invasión moderna ni una cronología del futuro.</p></div><div>${controles('escape', ESCAPE, i)}<div class="d11lab-detail" id="${id}-info" aria-live="polite"><p class="d11lab-eyebrow">${e.alcance}</p><h3>${e.titulo}</h3><p class="${i === 0 ? 'd11lab-quote' : ''}">${i === 0 ? '«' : ''}${esc(e.texto)}${i === 0 ? '»' : ''}</p><p class="d11lab-ref">${e.ref}</p><p class="d11lab-callout">${e.explica}</p></div></div></div>` + fuentes('escape');
}

/** Monta una exploración independiente y devuelve una función que la retira. */
export function montarDaniel11(root, opciones = {}) {
  if (!root || typeof root.append !== 'function') throw new TypeError('Hace falta un contenedor para Daniel 11.');
  const doc = root.ownerDocument || document;
  const host = doc.createElement('section');
  const id = 'd11lab-' + (++siguienteInstancia);
  const estado = { actividad: 0, territorio: 1, alianza: 0, visiones: 0, escape: 0 };
  const vistas = [territorio, alianza, visiones, escape];
  const claves = ['territorio', 'alianza', 'visiones', 'escape'];
  const nombres = ['Norte, Judea y sur', 'La alianza de Berenice', 'Cruzar las visiones', 'Personas que escapan'];
  host.className = 'd11lab';
  host.setAttribute('aria-label', 'Laboratorio de Daniel 11');
  host.innerHTML = `${opciones.estilos === false ? '' : '<style>' + estilosDaniel11 + '</style>'}<header><p class="d11lab-eyebrow">Daniel 11 · Explorar para comprender</p><h2>Los reinos, el pacto y las personas</h2><p class="d11lab-intro">Cuatro exploraciones del contenido existente. Elige, compara y consulta la evidencia sin perder el hilo del pasaje.</p></header><nav class="d11lab-nav" aria-label="Exploraciones de Daniel 11">${nombres.map((nombre, i) => `<button type="button" data-d11lab-action="actividad" data-d11lab-value="${i}" aria-pressed="${i === 0}" aria-controls="${id}-body">${i + 1}. ${nombre}</button>`).join('')}</nav><div class="d11lab-body" id="${id}-body"></div>`;
  const cuerpo = host.querySelector('.d11lab-body');
  const pintar = () => {
    const clave = claves[estado.actividad];
    cuerpo.innerHTML = vistas[estado.actividad](estado[clave], id);
    host.querySelectorAll('[data-d11lab-action="actividad"]').forEach((b, i) => b.setAttribute('aria-pressed', String(i === estado.actividad)));
  };
  const elegir = event => {
    const boton = event.target.closest('button[data-d11lab-action]');
    if (!boton || !host.contains(boton)) return;
    const accion = boton.dataset.d11labAction;
    const valor = Number(boton.dataset.d11labValue);
    const limites = { actividad: 4, territorio: 3, alianza: 3, visiones: 3, escape: 4 };
    if (!Object.hasOwn(limites, accion) || !Number.isInteger(valor) || valor < 0 || valor >= limites[accion]) return;
    estado[accion] = valor;
    pintar();
    if (accion !== 'actividad') host.querySelector(`[data-d11lab-action="${accion}"][data-d11lab-value="${valor}"]`)?.focus({ preventScroll: true });
  };
  host.addEventListener('click', elegir);
  pintar();
  root.append(host);
  return () => {
    host.removeEventListener('click', elegir);
    host.remove();
  };
}
