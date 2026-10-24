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
const imagenes = ['camino','d8/cuatro','alianza','camino','d2/e168','d9/cruz','testigos','d8/santuario','testigos','testigos','testigos','camino','camino','camino','d8/cielo','d7/hijo'];
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
const lamina = {tipo:'cine',libro:'Daniel 11',titulo:'Los reinos y el pacto',dir:'d11/',miniF:'camino',portada:'camino',selector:true,creditoImagen:true,
  invita:'Un recorrido por los 45 versículos: el texto, la historia, las fuentes, los paralelos y una pregunta para comprender cada escena.',actos};
module.exports = {lamina, secciones};
