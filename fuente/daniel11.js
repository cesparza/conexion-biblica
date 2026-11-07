/* Un solo contenido alimenta el recorrido y el estudio del capítulo. */
const datos = require('./daniel11-datos.json');
const esc = s => String(s || '').replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
const parrafos = t => (Array.isArray(t) ? t : String(t || '').split(/\n\s*\n/)).filter(Boolean);
const texto = t => parrafos(t).map(p => '<p>' + esc(p) + '</p>').join('');
const titulo = a => a.titulo + ' (11:' + a.versos[0] + (a.versos[1] > a.versos[0] ? '-' + a.versos[1] : '') + ')';
const fuentes = a => '<p>Fuente: ' + a.fuentes.map(f => esc(f.titulo)
  .replace(/ · Consulta externa[\s\S]*/, '')
  .replace('Humberto Raúl Treiyer Blank', 'Humberto R. Treiyer')
  .replace('Enigmas descifrados (2006, tercera impresión 2007)', '<i>Enigmas descifrados</i>')
  .replace(/(Studies (?:on|in) Daniel [^,]+),/, '<i>$1</i>,')) .join('; ') + '.</p>';
const secciones = [{ t:'📚 En pocas palabras', h:
  '<p>Daniel 11 sigue el conflicto desde Persia hasta la liberación del pueblo de Dios. El capítulo no enumera todos los gobiernos ni ofrece una fecha para el desenlace. Sus reyes cambian, pero el hilo permanece: el poder humano, el pacto y quienes se mantienen fieles.</p>' +
  '<p>Lee primero el texto bíblico. En «Profundizar» encontrarás el contexto, las razones de la interpretación y sus diferencias. La experiencia interactiva permite recorrer las mismas explicaciones, consultar las fuentes y responder una pregunta por escena.</p>' }];

/* Las unidades breves conservan el límite del lector; nunca se corta una oración. */
function agrega(t, ps, a) {
  const pie = fuentes(a); let h = '', parte = 0;
  for (const p of ps) {
    const html = texto(p);
    if (h && h.length + html.length + pie.length > 1950) {
      secciones.push({ t:'🧭 ' + t + (parte ? ' · Continuación' : ''), capa:'contexto', verso:a.versos[0], h:h + pie });
      h = ''; parte++;
    }
    h += html;
  }
  if (h) secciones.push({ t:'🧭 ' + t + (parte ? ' · Continuación' : ''), capa:'contexto', verso:a.versos[0], h:h + pie });
}
for (const a of datos) {
  agrega(titulo(a), [a.relato, ...parrafos(a.explica)], a);
  agrega('Más a fondo · ' + titulo(a), parrafos(a.profundiza), a);
  for (const f of a.frases || []) agrega('11:' + f.verso + ' · ' + f.clave, [f.explicacion], {...a,versos:[f.verso,f.verso]});
  if (a.cita) secciones.push({t:'🧭 Testimonio documentado · ' + a.titulo, capa:'contexto', verso:a.versos[0], h:
    '<blockquote><p>' + esc(a.cita.texto) + '</p>' + (a.cita.traduccion ? '<p>Traducción del original: ' + esc(a.cita.traduccion) + '</p>' : '') + '<cite>' + esc(a.cita.referencia) + (a.cita.idioma === 'en' ? ' · Original en inglés' : '') + '</cite></blockquote>' + fuentes(a) });
  secciones.push({t:'🧭 Para pensar · ' + a.titulo, capa:'contexto', verso:a.versos[0], h:
    '<p><b>' + esc(a.pregunta.q) + '</b></p><details><summary>Ver pauta de respuesta</summary>' + texto(a.pregunta.respuesta) + '</details>' + fuentes(a) });
}
const imagenes = ['d11-persia','d11-alejandro','alianza','d11-rafia','d11-roma','d9/cruz','d11-quitim','d11-continuo','d11-comunidad','testigos','d11-autoridad','p1260/roma1798','d11-refugio','d11-mercado','d11-mensaje','miguel'];
const cortos = ['Persia','Grecia dividida','Norte y sur','Rafia y retorno','El dominio romano','El príncipe del pacto','Alianzas y ruptura','Santuario y continuo','Conocer a Dios','Los testigos','El poder se exalta','Herida y retorno','La tierra gloriosa','Poder económico','Noticias y mensaje','El desenlace'];
const actos = datos.map((a,i) => ({...a,corto:cortos[i], tipo:'estudio', alto:1.4, img:imagenes[i], adaptable:!imagenes[i].includes('/'), v:{cap:'d11',de:a.versos[0],hasta:a.versos[1]}}));
actos[2].mapa = {
  norte:{titulo:'Reino seléucida',texto:'Seleuco I, uno de los sucesores de Alejandro, consolidó un dominio que incluía Siria. Desde Judea, su reino quedaba al norte. Sus sucesores disputaron a los Tolomeos el corredor que unía ambas potencias.'},
  centro:{titulo:'Judea, tierra de paso',texto:'La tierra del pueblo de Daniel se encontraba entre los reinos enfrentados. El relato sigue esas guerras porque afectaban al pueblo y al pacto, no para presentar un inventario de todas las campañas de la época.'},
  sur:{titulo:'Egipto de los Tolomeos',texto:'Tolomeo I estableció la dinastía que gobernó Egipto después de Alejandro. Sus herederos intentaron conservar su influencia sobre Judea mediante campañas y alianzas. Berenice pertenecía a esta familia real.'}
};
actos[1].huellas = [{titulo:'Daniel 2',texto:'El bronce sucede a la plata: la secuencia de los imperios avanza desde Medopersia hacia Grecia (Daniel 2:39).'},
  {titulo:'Daniel 7',texto:'El leopardo tiene cuatro cabezas: la visión incorpora la pluralidad del dominio griego (Daniel 7:6).'},
  {titulo:'Daniel 8',texto:'El texto identifica al macho cabrío con Grecia y su gran cuerno con el primer rey; los cuatro cuernos representan cuatro reinos sucesores (Daniel 8:21–22).'}];
actos[7].huellas = [{titulo:'Daniel 8',texto:'El santuario, el continuo y el poder que se engrandece aparecen también en Daniel 8:11–13. Este paralelo sostiene la lectura de la agresión al ministerio de Cristo.'},
  {titulo:'Hebreos 7–8',texto:'Cristo vive para interceder y ministra en el verdadero tabernáculo (Hebreos 7:24–25; 8:1–2). La falsificación terrenal no destrona al Intercesor celestial.'}];
actos[11].huellas = [{titulo:'Daniel 7',texto:'El poder perseguidor actúa durante un período limitado y luego enfrenta el juicio; no recibe un dominio eterno (Daniel 7:25–26).'},
  {titulo:'Apocalipsis 13',texto:'La herida, su sanación y la imposición del culto se estudian juntas, distinguiendo el golpe de 1798 de la futura coerción religiosa (Apocalipsis 13:3, 10–17).'}];
actos[15].huellas = [{titulo:'Daniel 12',texto:'La expresión «en aquel tiempo» continúa la crisis del final de Daniel 11. Miguel interviene en favor del pueblo escrito en el libro (Daniel 12:1–3).'},
  {titulo:'Apocalipsis 17–19',texto:'Babilonia pierde el apoyo de sus aliados y Cristo vence al poder perseguidor. El ataque después del milenio de Apocalipsis 20 es otro acontecimiento.'}];
const lamina = {tipo:'cine',libro:'Daniel 11',titulo:'El rey del norte y el rey del sur',dir:'d11/',miniF:'camino',portada:'camino',selector:true,creditoImagen:true,
  invita:'Un recorrido por los 45 versículos: el texto, la historia, las fuentes, los paralelos y una pregunta para comprender cada escena.',actos,
  /* Comparar: Daniel 11 como columna, el microscopio de Daniel 2, 7 y 8. Las lecturas son las
     de «Daniel 8, 11 y 12 lado a lado» (complementos/profundizar.js). `acto` lleva de la
     comparación a su escena del cine. */
  partes:[
    {id:'persia',img:'d11-persia',nombre:'Tres reyes y el cuarto, rico',reino:'Medo-Persia',fechas:'539 – 331 a.C.',de:-539,a:-331,c:'#8C98A6',
      texto:'Aún habrá tres reyes en Persia, y el cuarto se hará de grandes riquezas, más que todos ellos',ref:'11:2',acto:'d11-persia',
      corto:'Cambises II, Bardiya y Darío I; el cuarto es Jerjes I (Asuero), que levantó a todos contra Grecia.'},
    {id:'valiente',img:'d11-alejandro',nombre:'Un rey valiente',reino:'Grecia',fechas:'331 – 301 a.C.',de:-331,a:-301,c:'#A85A2A',
      texto:'Se levantará luego un rey valiente, que dominará con gran poder y hará su voluntad',ref:'11:3',acto:'d11-alejandro',
      corto:'Alejandro Magno. Su reino, «repartido hacia los cuatro vientos del cielo» (11:4).'},
    {id:'nortesur',img:'alianza',nombre:'El rey del norte y el rey del sur',reino:'Grecia dividida en cuatro',fechas:'301 – 168 a.C.',de:-301,a:-168,cmp:-331,c:'#B97A45',
      texto:'su reino será quebrantado y repartido hacia los cuatro vientos del cielo',ref:'11:4',acto:'d11-dinastias',
      corto:'Después, Siria, el rey del norte, contra Egipto, el rey del sur, con Judea en medio (11:5-15).'},
    {id:'gloriosa',img:'d11-roma',nombre:'Permanecerá en la tierra gloriosa',reino:'Roma imperial',fechas:'168 a.C. – 476 d.C.',de:-168,a:476,c:'#3E4651',
      texto:'permanecerá en la tierra gloriosa, que será consumida bajo su poder',ref:'11:16',acto:'d11-roma',
      corto:'Roma se queda en Judea (11:16), y el príncipe del pacto es quebrantado (11:22). Abarca 11:16-28, o 11:16-20 según dónde se ponga la línea.'},
    {id:'continuo',img:'d11-continuo',nombre:'Quitan el continuo',reino:'Roma papal',fechas:'538 – 1798 d.C.',de:538,a:1798,c:'#A0694A',
      texto:'quitarán el sacrificio continuo y pondrán la abominación desoladora',ref:'11:31',acto:'d11-santuario',
      corto:'Desde 508 (11:31); se engrandece sobre todo dios (11:36). Abarca 11:29-39, o 11:21-39.'},
    {id:'sufin',img:'miguel',nombre:'Llegará a su fin',reino:'La segunda venida',fechas:'',de:null,fin:'venida',c:'#6B7B5A',
      texto:'pero llegará a su fin, y no tendrá quien lo ayude',ref:'11:45',acto:'d11-liberacion',
      corto:'«No tendrá quien lo ayude»: en aquel tiempo se levanta Miguel (12:1).'}
  ],
  cmpExtra:[{id:'tempestad',img:'d11-mercado',nombre:'Como una tempestad',reino:'Roma papal sanada',fechas:'restauración final futura, sin fecha fijada',de:null,fin:'sanada',c:'#8A5A3C',
    texto:'el rey del norte se levantará contra él como una tempestad',ref:'11:40',acto:'d11-herida',
    corto:'Herido en 1798, el rey del norte se recupera, se extiende por el mundo y «llegará a su fin» (11:40-45).'}],
  noTrae:{'-605':'Empieza en Persia: Babilonia ya cayó (11:1-2)','476':'Pasa de Roma imperial a Roma papal','1844':'No lo nombra: lo marcan Daniel 8:14 y 12:12','fin-reino':'Termina con la liberación de Daniel 12:1'},
  paraleloFuente:'Bohr, <i>Daniel 11</i>, p. 15-26 y 98-99; Treiyer, <i>Enigmas descifrados</i>, p. 50-52'};

module.exports = {lamina, secciones};
