/* PARALELOS (Camilo, 15-oct): «todo lo que se dice de algo, agrupado, cada vez que
   tengamos más información en un capítulo». Una hoja por poder y una por tema; filas =
   características, columnas = capítulos. Las hojas se arman solas en el build
   (armaParalelos) con los hechos de abajo y las láminas (fuente/laminas.js).

   EL MAPA DE MARCAS (lo único que se escribe a mano, una vez por capítulo):
     HECHOS[<lámina>] = lista de hechos. Cada hecho dice a qué celdas va ('hoja.fila',
     separadas por espacio) y a qué paso de la lámina lleva al tocarlo (`p`: el id de una
     parte, 'x-senas', 'x-periodo', 'x-fases' o 'cierre').
       ['p', 'hoja.fila …', '7:25', 'cita']        texto bíblico RV1995, literal (con «…»
                                                    entre trozos); la ref sin libro es del
                                                    mismo capítulo
       {p, en, t, k?, f?}                           una línea que YA está en la lámina
                                                    (`t`, y `k` si lleva rótulo), con su
                                                    fuente: `f` literal, '@senas', '@periodo',
                                                    '@fases', o sin `f` la de la parte
       {p, en, q, f?}                               una cita de autor (“ ”), literal
   Solas, sin escribirlas: la fila 'duracion' de cada hoja con `reinos` (las fechas de cada
   parte y de `cmpExtra` cuyo `reino` está en la lista, con la fuente de la parte), y el
   subtítulo de cada hoja de poder (los nombres de sus símbolos).
   Un capítulo nuevo (Daniel 9, 11, 12, Apocalipsis) es su lámina más su lista aquí: la
   columna aparece sola en cada hoja. Nada se deduce: una celda sin hecho queda «–».
   El build se detiene si una cita no está en la Biblia de la app, si una línea no está en
   la lámina, si una fuente no trae página o si una marca nombra una hoja o fila que no
   existe (revisaParalelos). */

/* Las filas de toda hoja de poder, en este orden. Una fila sin ningún hecho no se dibuja. */
const FILAS_PODER = [
  ['simbolo', 'El símbolo'], ['nombre', 'Qué es, según el texto'], ['origen', 'De dónde sale'],
  ['caracter', 'Cómo es'], ['obra', 'Qué hace'], ['division', 'Se divide'],
  ['contraDios', 'Contra Dios'], ['santos', 'Contra los santos'], ['ley', 'Contra la ley'],
  ['santuario', 'Contra el santuario'], ['duracion', 'Duración'], ['fin', 'Su fin'],
];

/* Las hojas. `reinos`: los `reino` de las partes de las láminas que son esta hoja.
   `enlace`: a qué parte lleva lo de `cmpExtra` de cada lámina (no es una parte).
   `cmp`: la clave de época de Comparar (para la razón `noTrae` de una visión que no la trae). */
const HOJAS = [
  { id: 'babilonia', tipo: 'poder', t: 'Babilonia', reinos: ['Babilonia'], cmp: '-605' },
  { id: 'medopersia', tipo: 'poder', t: 'Medo-Persia', reinos: ['Medo-Persia'], cmp: '-539' },
  { id: 'grecia', tipo: 'poder', t: 'Grecia', reinos: ['Grecia', 'Grecia dividida en cuatro'], cmp: '-331' },
  { id: 'imperial', tipo: 'poder', t: 'Roma imperial', reinos: ['Roma imperial'], cmp: '-168' },
  { id: 'dividida', tipo: 'poder', t: 'Roma dividida', reinos: ['Roma dividida'], cmp: '476' },
  { id: 'papal', tipo: 'poder', t: 'Roma papal', reinos: ['Roma papal'], cmp: '538' },
  { id: 'sanado', tipo: 'poder', t: 'El papado sanado', s: 'Restauración final futura, sin fecha fijada; 1798 es la herida', reinos: ['Roma papal sanada'], cmp: 'fin-sanada',
    enlace: { d7: 'cuerno', d8: 'quebrantado' },
    lema: ['Apocalipsis 13:3', 'Vi una de sus cabezas como herida de muerte, pero su herida mortal fue sanada.'] },
  { id: 'juicio', tipo: 'tema', t: 'El juicio', s: 'Desde 1844, en el cielo', reinos: ['El juicio en el cielo'],
    filas: [['duracion', 'Cuándo'], ['tribunal', 'El tribunal'], ['hijo', 'El Hijo del hombre'], ['fallo', 'El fallo'], ['fases', 'Sus tres fases'], ['cuerno', 'Contra el cuerno']] },
  { id: 'santuario', tipo: 'tema', t: 'El santuario', s: 'El continuo, el santuario pisoteado y su purificación',
    filas: [['cielo', 'En el cielo'], ['continuo', 'El continuo'], ['ataque', 'Echado por tierra'], ['purif', 'Será purificado']] },
  { id: 'ley', tipo: 'tema', t: 'La ley y el sábado', s: 'Lo que el cuerno hace con la Ley de Dios',
    filas: [['cambiar', 'Cambiar los tiempos y la Ley'], ['verdad', 'La verdad por tierra']] },
  { id: 'tiempo', tipo: 'tema', t: 'El tiempo profético', s: 'Los periodos y cómo se cuentan',
    filas: [['periodo', 'El periodo'], ['regla', 'Cómo se cuenta'], ['fin', 'El tiempo del fin']] },
  { id: 'santos', tipo: 'tema', t: 'El pueblo de Dios', s: 'Los santos: perseguidos, vindicados y con el reino',
    filas: [['perseguidos', 'Perseguidos'], ['juicio', 'En el juicio'], ['reino', 'Reciben el reino']] },
  { id: 'venida', tipo: 'tema', t: 'La segunda venida y el reino', s: 'La piedra, el fin de los reinos y el reino eterno',
    filas: [['venida', 'Cristo vuelve'], ['mano', 'Sin mano humana'], ['reinos', 'Los reinos de la tierra'], ['reino', 'El reino eterno']] },
];

const HECHOS = {
  d2: [
    ['oro', 'babilonia.simbolo', '2:32', 'La cabeza de esta imagen era de oro fino'],
    ['oro', 'babilonia.nombre', '2:38', 'Tú eres aquella cabeza de oro.'],
    ['oro', 'babilonia.obra', '2:37', 'el Dios del cielo te ha dado reino, poder, fuerza y majestad'],
    ['plata', 'medopersia.simbolo', '2:32', 'su pecho y sus brazos, de plata'],
    ['plata', 'medopersia.nombre', '2:39', 'Después de ti se levantará otro reino, inferior al tuyo'],
    ['bronce', 'grecia.simbolo', '2:32', 'su vientre y sus muslos, de bronce'],
    ['bronce', 'grecia.nombre', '2:39', 'un tercer reino de bronce, el cual dominará sobre toda la tierra'],
    ['hierro', 'imperial.simbolo', '2:33', 'sus piernas, de hierro'],
    ['hierro', 'imperial.nombre', '2:40', 'el cuarto reino será fuerte como el hierro'],
    ['hierro', 'imperial.obra', '2:40', 'como el hierro desmenuza y rompe todas las cosas, así él lo desmenuzará y lo quebrantará todo'],
    ['monte', 'babilonia.fin medopersia.fin grecia.fin imperial.fin', '2:35', 'fueron como tamo de las eras del verano, y se los llevó el viento sin que de ellos quedara rastro alguno'],
    ['dedos', 'dividida.simbolo dividida.division', '2:41', 'Lo que viste de los pies y los dedos… será un reino dividido'],
    ['dedos', 'dividida.caracter', '2:42', 'este reino será en parte fuerte y en parte frágil'],
    ['dedos', 'dividida.fin', '2:44', 'En los días de estos reyes, el Dios del cielo levantará un reino'],
    { p: 'dedos', en: 'dividida.duracion', t: 'Llegan hasta la segunda venida' },
    ['barro', 'papal.simbolo', '2:33', 'sus pies, en parte de hierro y en parte de barro cocido'],
    ['barro', 'papal.origen', '2:41', 'así como viste el hierro mezclado con barro cocido'],
    ['barro', 'papal.nombre', '2:43', 'se mezclarán por medio de alianzas humanas; pero no se unirán el uno con el otro'],
    ['piedra', 'papal.fin sanado.fin', '2:34', 'hirió a la imagen en sus pies de hierro y de barro cocido, y los desmenuzó'],
    ['piedra', 'venida.venida', '2:34', 'una piedra se desprendió sin que la cortara mano alguna, e hirió a la imagen en sus pies'],
    { p: 'piedra', en: 'venida.venida', t: 'La piedra es Cristo en su segunda venida.' },
    ['piedra', 'venida.mano', '2:45', 'del monte se desprendió una piedra sin que la cortara mano alguna'],
    ['piedra', 'venida.reinos', '2:44', 'desmenuzará y consumirá a todos estos reinos'],
    ['monte', 'venida.reino', '2:35', 'la piedra que hirió a la imagen se hizo un gran monte que llenó toda la tierra'],
    ['monte', 'venida.reino', '2:44', 'él permanecerá para siempre'],
    { p: 'monte', en: 'venida.reino', t: 'Después de los mil años.' },
    ['piedra', 'santos.reino', '2:44', 'el Dios del cielo levantará un reino que no será jamás destruido, ni será el reino dejado a otro pueblo'],
    ['cierre', 'tiempo.fin', '2:45', 'El gran Dios ha mostrado al rey lo que ha de acontecer en lo por venir'],
  ],
  d7: [
    ['leon', 'babilonia.simbolo', '7:4', 'La primera era como un león, y tenía alas de águila.'],
    ['leon', 'babilonia.nombre medopersia.nombre grecia.nombre', '7:17', 'Estas cuatro grandes bestias son cuatro reyes que se levantarán en la tierra.'],
    ['leon', 'babilonia.fin', '7:4', 'sus alas le fueron arrancadas'],
    ['leon', 'babilonia.caracter', '7:4', 'se le dio corazón de hombre'],
    ['oso', 'medopersia.simbolo', '7:5', 'semejante a un oso, la cual se alzaba de un costado más que del otro'],
    ['oso', 'medopersia.caracter', '7:5', 'En su boca, entre los dientes, tenía tres costillas'],
    ['oso', 'medopersia.obra', '7:5', 'Levántate y devora mucha carne.'],
    ['leopardo', 'grecia.simbolo', '7:6', 'semejante a un leopardo, con cuatro alas de ave en sus espaldas'],
    ['leopardo', 'grecia.division', '7:6', 'Esta bestia tenía cuatro cabezas'],
    ['leopardo', 'grecia.obra', '7:6', 'le fue dado dominio'],
    ['bestia', 'imperial.simbolo', '7:7', 'la cuarta bestia, espantosa, terrible y en gran manera fuerte, la cual tenía unos grandes dientes de hierro'],
    ['bestia', 'imperial.nombre', '7:23', 'La cuarta bestia será un cuarto reino en la tierra, el cual será diferente de todos los otros reinos'],
    ['bestia', 'imperial.caracter', '7:7', 'era muy diferente de todas las bestias que había visto antes de ella'],
    ['bestia', 'imperial.caracter', '7:19', 'tenía dientes de hierro y uñas de bronce'],
    ['bestia', 'imperial.obra', '7:7', 'devoraba y desmenuzaba, pisoteaba las sobras con sus pies'],
    ['bestia', 'imperial.obra', '7:23', 'a toda la tierra devorará, trillará y despedazará'],
    ['cuernos', 'dividida.simbolo', '7:7', 'y tenía diez cuernos'],
    ['cuernos', 'dividida.nombre dividida.division', '7:24', 'Los diez cuernos significan que de aquel reino se levantarán diez reyes'],
    ['cuerno', 'papal.simbolo', '7:8', 'otro cuerno pequeño salió entre ellos'],
    ['cuerno', 'papal.origen', '7:8', 'delante de él fueron arrancados tres cuernos de los primeros'],
    ['x-senas', 'papal.origen', '7:24', 'tras ellos se levantará otro'],
    { p: 'x-senas', en: 'papal.origen', t: 'Sale de la cuarta bestia', f: '@senas' },
    ['cuerno', 'papal.nombre', '7:24', 'el cual será diferente de los primeros, y derribará a tres reyes'],
    ['cuerno', 'papal.caracter', '7:8', 'Este cuerno tenía ojos como de hombre y una boca que hablaba con gran insolencia.'],
    ['x-senas', 'papal.caracter', '7:20', 'parecía más grande que sus compañeros'],
    ['cuerno', 'papal.contraDios', '7:25', 'Hablará palabras contra el Altísimo'],
    ['cuerno', 'papal.santos santos.perseguidos', '7:25', 'a los santos del Altísimo quebrantará'],
    ['cuerno', 'papal.ley ley.cambiar', '7:25', 'pensará en cambiar los tiempos y la Ley'],
    { p: 'x-senas', en: 'ley.cambiar', t: 'El sábado: el día de reposo se pasó al domingo y se quitó el mandamiento sobre las imágenes (CS 55-56 y 499).', f: '@senas' },
    { p: 'x-senas', en: 'ley.cambiar', t: 'También quiso cambiar el calendario profético de Dios', f: 'Bohr, <i>Daniel 1-10</i>, p. 125' },
    ['x-periodo', 'papal.duracion tiempo.periodo', '7:25', 'serán entregados en sus manos hasta tiempo, tiempos y medio tiempo'],
    { p: 'x-periodo', en: 'tiempo.periodo', t: '1.260 años · 538 – 1798 d.C.', f: '@periodo' },
    { p: 'x-periodo', en: 'tiempo.regla', t: 'En la profecía simbólica cada día vale un año. Dios mismo usa esa medida en Números 14:34 y en Ezequiel 4:6.', f: '@periodo' },
    ['cuerno', 'papal.fin', '7:26', 'le quitarán su dominio, para que sea destruido y arruinado hasta el fin'],
    /* v236: 7:11-12 ya están en la lámina (pasos del juicio): «su fin» de la cuarta bestia y de las otras tres. */
    ['juicio', 'imperial.fin', '7:11', 'mataron a la bestia, y su cuerpo fue destrozado y entregado para quemarlo en el fuego'],
    ['juicio', 'babilonia.fin medopersia.fin grecia.fin', '7:12', 'También a las otras bestias les habían quitado su dominio, pero les había sido prolongada la vida hasta cierto tiempo.'],
    ['cuerno', 'sanado.santos santos.perseguidos', '7:21', 'este cuerno hacía guerra contra los santos y los vencía'],
    { p: 'cuerno', en: 'sanado.duracion', t: 'el hombre de pecado subsiste hasta la segunda venida' },
    ['santos', 'sanado.fin', '7:22', 'hasta que vino el Anciano de días, y se hizo justicia a los santos del Altísimo'],
    ['juicio', 'juicio.tribunal', '7:9', 'fueron puestos unos tronos y se sentó un Anciano de días'],
    ['juicio', 'juicio.tribunal', '7:10', 'El Juez se sentó y los libros fueron abiertos.'],
    ['juicio', 'santuario.cielo', '7:9', 'su trono, llama de fuego, y fuego ardiente las ruedas del mismo'],
    { p: 'juicio', en: 'santuario.cielo', t: 'Su trono tiene ruedas de fuego: es un trono que se mueve, al lugar santísimo del santuario celestial.' },
    ['hijo', 'juicio.hijo', '7:13', 'con las nubes del cielo venía uno como un hijo de hombre; vino hasta el Anciano de días'],
    { p: 'hijo', en: 'juicio.hijo', t: '1844: Cristo va al Padre, no a la tierra.' },
    ['santos', 'juicio.fallo santos.juicio', '7:22', 'se hizo justicia a los santos del Altísimo'],
    { p: 'x-fases', en: 'juicio.fases', k: 'Investigación', t: 'Desde 1844 hasta el cierre de la gracia', f: '@fases' },
    { p: 'x-fases', en: 'juicio.fases', k: 'Sentencia', t: 'Al cierre de la gracia: termina su mediación y el Hijo del hombre recibe el reino, antes de las plagas y de la venida', f: '@fases' },
    { p: 'x-fases', en: 'juicio.fases', k: 'Ejecución', t: 'Cuando los santos reciben el reino, en la segunda venida', f: '@fases' },
    ['santos', 'juicio.cuerno', '7:26', 'se sentará el Juez, y le quitarán su dominio'],
    ['santos', 'venida.venida santos.reino', '7:22', 'llegó el tiempo, y los santos recibieron el reino.'],
    { p: 'santos', en: 'venida.venida', t: 'Es la ejecución del juicio.' },
    ['santos', 'venida.reinos', '7:26', 'le quitarán su dominio, para que sea destruido y arruinado hasta el fin'],
    ['reino', 'santos.reino', '7:18', 'Después recibirán el reino los santos del Altísimo'],
    ['reino', 'santos.reino', '7:27', 'sean dados al pueblo de los santos del Altísimo'],
    ['hijo', 'venida.reino', '7:14', 'su dominio es dominio eterno, que nunca pasará'],
    ['reino', 'venida.reino', '7:27', 'cuyo reino es reino eterno'],
  ],
  d8: [
    ['carnero', 'medopersia.simbolo', '8:3', 'había un carnero que estaba delante del río, y tenía dos cuernos'],
    ['carnero', 'medopersia.nombre', '8:20', 'éstos son los reyes de Media y de Persia'],
    ['carnero', 'medopersia.caracter', '8:3', 'uno era más alto que el otro, y el más alto creció después'],
    ['carnero', 'medopersia.obra', '8:4', 'el carnero hería con los cuernos al poniente, al norte y al sur'],
    ['carnero', 'medopersia.obra', '8:4', 'Hacía conforme a su voluntad, y se engrandecía.'],
    ['macho', 'medopersia.fin', '8:7', 'le quebró sus dos cuernos'],
    ['macho', 'grecia.simbolo', '8:5', 'un macho cabrío venía del lado del poniente sobre la faz de toda la tierra, sin tocar tierra'],
    ['macho', 'grecia.nombre', '8:21', 'El macho cabrío es el rey de Grecia'],
    ['macho', 'grecia.caracter', '8:21', 'el cuerno grande que tenía entre sus ojos es el rey primero'],
    ['macho', 'grecia.obra', '8:7', 'se levantó contra él y lo hirió'],
    ['cuatro', 'grecia.division', '8:8', 'aquel gran cuerno fue quebrado, y en su lugar salieron otros cuatro cuernos notables hacia los cuatro vientos del cielo'],
    ['cuatro', 'grecia.division', '8:22', 'cuatro reinos se levantarán de esa nación, aunque no con la fuerza de él'],
    ['cuerno', 'imperial.simbolo', '8:9', 'De uno de ellos salió un cuerno pequeño'],
    ['cuerno', 'imperial.nombre', '8:23', 'se levantará un rey altivo de rostro y entendido en enigmas'],
    ['cuerno', 'imperial.origen papal.origen', '8:9', 'De uno de ellos salió un cuerno pequeño'],
    { p: 'cuerno', en: 'imperial.origen papal.origen', t: 'El cuerno sale de uno de los cuatro vientos del cielo (8:8), un punto cardinal, y no de uno de los cuatro cuernos' },
    { p: 'cuerno', en: 'imperial.origen', q: 'Roma salió del oeste (desde el punto de vista de Israel)', f: 'Hasel, “El ‘cuerno pequeño’, el santuario celestial y el tiempo del fin”, <i>Simposio sobre Daniel</i>, p. 399' },
    { p: 'cuerno', en: 'papal.caracter', t: 'Es Roma, la misma de Daniel 2 y 7: primero imperial y después papal, en un solo símbolo.' },
    ['cuerno', 'imperial.obra', '8:9', 'creció mucho hacia el sur y el oriente, y hacia la tierra gloriosa'],
    ['cielo', 'papal.simbolo', '8:10', 'Creció hasta llegar al ejército del cielo'],
    ['cielo', 'papal.caracter', '8:24', 'Su poder se fortalecerá, mas no con fuerza propia'],
    ['cielo', 'papal.contraDios', '8:11', 'Aun se engrandeció frente al príncipe de los ejércitos'],
    { p: 'cielo', en: 'papal.contraDios', t: 'El Príncipe del ejército es Cristo' },
    ['cielo', 'papal.santos santos.perseguidos', '8:10', 'parte del ejército y de las estrellas echó por tierra, y las pisoteó'],
    { p: 'cielo', en: 'santos.perseguidos', t: 'El ejército y las estrellas son el pueblo de Dios' },
    ['cielo', 'papal.santos santos.perseguidos', '8:24', 'destruirá a los fuertes y al pueblo de los santos'],
    ['santuario', 'papal.ley ley.verdad', '8:12', 'echó por tierra la verdad e hizo cuanto quiso, y prosperó'],
    { p: 'santuario', en: 'ley.verdad', t: 'Es la Ley de Dios, que el Salmo 119:142 llama la verdad, y con ella el sábado' },
    ['santuario', 'papal.santuario santuario.continuo', '8:11', 'por él fue quitado el sacrificio continuo'],
    ['santuario', 'papal.santuario santuario.ataque', '8:11', 'el lugar de su santuario fue echado por tierra'],
    ['purificado', 'santuario.ataque', '8:13', 'la entrega del santuario y el ejército para ser pisoteados'],
    ['purificado', 'santuario.purif juicio.fallo tiempo.periodo', '8:14', 'Hasta dos mil trescientas tardes y mañanas; luego el santuario será purificado.'],
    { p: 'purificado', en: 'santuario.purif', t: 'La purificación del santuario era el Día de la Expiación (Levítico 16), un día de juicio.' },
    { p: 'purificado', en: 'juicio.fallo', t: 'La palabra hebrea (<i>nitsdaq</i>, <span class="heb" lang="he">נִצְדַּק</span>) quiere decir también justificado, vindicado: Dios hace justicia.' },
    { p: 'x-periodo', en: 'tiempo.periodo', t: '2.300 años · 457 a.C. – 1844 d.C.', f: '@periodo' },
    { p: 'x-periodo', en: 'tiempo.regla', t: 'Una tarde y una mañana son un día, como en la creación (Génesis 1:5).', f: '@periodo' },
    ['quebrantado', 'tiempo.fin', '8:17', 'la visión es para el tiempo del fin'],
    ['quebrantado', 'tiempo.fin', '8:19', 'eso es para el tiempo del fin'],
    ['quebrantado', 'sanado.contraDios', '8:25', 'Se levantará contra el Príncipe de los príncipes'],
    ['quebrantado', 'papal.fin sanado.fin venida.venida juicio.cuerno', '8:25', 'será quebrantado, aunque no por mano humana'],
    ['quebrantado', 'venida.mano', '8:25', 'aunque no por mano humana'],
  ],
};

/* ── El armado ── */
const sinEtiquetas = s => String(s || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
const NOMBRES_LIBRO = { d: 'Daniel', ap: 'Apocalipsis' };
const capNombre = k => { const m = /^(d|ap)(\d+)$/.exec(k); return m ? NOMBRES_LIBRO[m[1]] + ' ' + m[2] : k; };
const ORDEN_LIBRO = { d: 0, ap: 1 };
const ordenCap = (a, b) => { const x = /^(d|ap)(\d+)$/.exec(a), y = /^(d|ap)(\d+)$/.exec(b); return (ORDEN_LIBRO[x[1]] - ORDEN_LIBRO[y[1]]) || (x[2] - y[2]); };
/* La fuente de una parte, o de una entrada del riel. */
function fuenteDe(L, p, f) {
  if (f === '@senas') return L.senasFuente || '';
  if (f === '@periodo') return (L.periodo || {}).fuente || '';
  if (f === '@fases') return (L.fases || {}).fuente || '';
  if (f) return f;
  const parte = (L.partes || []).find(x => x.id === p);
  if (parte) return parte.fuente || '';
  if (p === 'x-senas') return L.senasFuente || '';
  if (p === 'x-periodo') return (L.periodo || {}).fuente || '';
  if (p === 'x-fases') return (L.fases || {}).fuente || '';
  return '';
}
/* Un hecho, en la forma que pinta la app: b (bíblico: ref y cita), n (línea de la lámina), q (cita de autor). */
function entrada(cap, h, L) {
  if (Array.isArray(h)) {
    const [p, en, ref, t] = h;
    const r = /^\d+:/.test(ref) ? capNombre(cap).replace(/ \d+$/, '') + ' ' + ref : ref;
    return { en, e: { tipo: 'b', p, ref: r, t, f: fuenteDe(L, p) } };
  }
  return { en: h.en, e: { tipo: h.q ? 'q' : 'n', p: h.p, t: h.q || h.t, k: h.k, f: fuenteDe(L, h.p, h.f) } };
}
/* Las fuentes de una hoja en UNA línea: la misma obra una sola vez, con sus páginas juntas. */
function juntaFuentes(lista) {
  const obras = new Map(), otras = [];
  const pon = (k, pag) => { if (!obras.has(k)) obras.set(k, []); for (const x of String(pag).split(/,\s*|\s+y\s+/)) if (x && !obras.get(k).includes(x)) obras.get(k).push(x); };
  for (const f of lista) for (let s of String(f || '').split(/;\s*/)) {
    s = s.trim().replace(/\.$/, '');
    if (!s) continue;
    let m = /^(.+?), p\. (.+)$/.exec(s);
    if (m) { pon(m[1] + '|p', m[2]); continue; }
    m = /^(CS|PE|PP|DTG|1T|4T|EUD|CBA|Ms)\s+(.+)$/.exec(s);
    if (m) { pon(m[1] + '|', m[2]); continue; }
    if (!otras.includes(s)) otras.push(s);
  }
  const y = l => l.length > 1 ? l.slice(0, -1).join(', ') + ' y ' + l[l.length - 1] : l[0];
  /* Las páginas en orden, y sin la que ya cubre un rango (533 dentro de 533-536). */
  const rango = x => { const m = /^(\d+)(?:-(\d+))?$/.exec(x); return m ? [+m[1], +(m[2] || m[1])] : null; };
  const limpia = l => {
    const r = l.filter(x => { const a = rango(x); return !a || !l.some(z => z !== x && rango(z) && rango(z)[0] <= a[0] && rango(z)[1] >= a[1] && (rango(z)[1] - rango(z)[0]) > (a[1] - a[0])); });
    return [...new Set(r)].sort((a, b) => ((rango(a) || [1e9])[0]) - ((rango(b) || [1e9])[0]));
  };
  return [...[...obras].map(([k, pags]) => { const [o, p] = k.split('|'); return o + (p ? ', p. ' : ' ') + y(limpia(pags)); }), ...otras].join('; ');
}
/**
 * Las hojas armadas: [{id, tipo, t, s, c, lema, cols, filas:[{id,t,celdas:{cap:[entrada]}}], vacias:{cap:razón}, fuente}].
 * `cols`: todos los capítulos que tienen hechos, en orden de libro y capítulo.
 */
function armaParalelos(LAMINAS, hechos = HECHOS, hojas = HOJAS) {
  const cols = Object.keys(hechos).filter(k => LAMINAS[k]).sort(ordenCap);
  const out = hojas.map(H => {
    const filas = (H.filas || FILAS_PODER).map(([id, t]) => ({ id, t, celdas: {} }));
    return { id: H.id, tipo: H.tipo, t: H.t, s: H.s || '', c: '', lema: H.lema || null, cmp: H.cmp || '', cols, filas, vacias: {}, fuente: '', _f: [], _nom: [] };
  });
  const hoja = id => out.find(h => h.id === id);
  const pon = (hid, fid, cap, e) => {
    const h = hoja(hid), f = h && h.filas.find(x => x.id === fid);
    if (!f) throw new Error('Paralelos: «' + hid + '.' + fid + '» no existe (' + cap + ')');
    const l = f.celdas[cap] = f.celdas[cap] || [];
    if (!l.some(x => x.tipo === e.tipo && x.ref === e.ref && x.t === e.t)) l.push(e);
    if (e.tipo !== 'b') h._f.push(e.f);
  };
  for (const cap of cols) {
    const L = LAMINAS[cap];
    /* Solo: las fechas de cada parte en la hoja de su reino. */
    for (const p of [...(L.partes || []), ...(L.cmpExtra || [])]) {
      const parte = (L.partes || []).find(x => x.id === p.id);
      for (const H of hojas) if ((H.reinos || []).includes(p.reino)) {
        const h = hoja(H.id);
        if (!h.c && p.c) h.c = p.c;
        if (H.tipo === 'poder' && !h._nom.includes(p.nombre)) h._nom.push(p.nombre);
        /* Lo de `cmpExtra` no es una parte: lleva a la que dice `enlace` y toma su fuente. */
        const k = parte ? p.id : (H.enlace || {})[cap];
        if (p.fechas && k && h.filas.some(f => f.id === 'duracion'))
          pon(H.id, 'duracion', cap, { tipo: 'n', p: k, t: p.fechas, f: fuenteDe(L, k) });
      }
    }
    for (const h of hechos[cap]) {
      const { en, e } = entrada(cap, h, L);
      for (const d of en.split(/\s+/).filter(Boolean)) { const [hid, fid] = d.split('.'); pon(hid, fid, cap, e); }
    }
  }
  /* En cada celda, primero la Biblia, después los autores y al final las líneas de la lámina. */
  const ORDEN = { b: 0, q: 1, n: 2 };
  for (const h of out) {
    h.filas = h.filas.filter(f => Object.keys(f.celdas).length);
    for (const f of h.filas) for (const k in f.celdas) f.celdas[k].sort((a, b) => ORDEN[a.tipo] - ORDEN[b.tipo]);
    for (const cap of cols) if (!h.filas.some(f => (f.celdas[cap] || []).length))
      h.vacias[cap] = ((LAMINAS[cap].noTrae || {})[h.cmp] || '');
    if (h.tipo === 'poder' && !h.s) h.s = h._nom.join(' · ');
    h.fuente = juntaFuentes(h._f);
    delete h._f; delete h._nom;
  }
  return out;
}

/* ── La revisión (la corre el build y la prueba): nada entra sin su texto ── */
const normaliza = s => sinEtiquetas(s).replace(/[«»“”"]/g, '').replace(/\s+/g, ' ').trim();
/* Los pasos de la lámina a los que se puede llevar. */
function pasosDe(L) {
  const r = new Set((L.partes || []).map(p => p.id));
  if (L.senas) r.add('x-senas');
  if (L.periodo) r.add('x-periodo');
  if (L.fases) r.add('x-fases');
  if (L.cierre) r.add('cierre');
  return r;
}
/**
 * Devuelve la lista de problemas (vacía si todo está bien).
 * @param VERS_TODO {d2:{32:'…'}, ap13:{…}} la Biblia de la app (RV1995)
 */
function revisaParalelos(LAMINAS, VERS_TODO, hechos = HECHOS, hojas = HOJAS) {
  const mal = [];
  const textoLamina = k => normaliza(JSON.stringify(LAMINAS[k]).replace(/\\"/g, '"'));
  const versiculo = ref => {
    const m = /^(?:(Daniel|Apocalipsis) )?(\d+):(\d+)$/.exec(ref);
    if (!m) return null;
    const cap = (m[1] === 'Apocalipsis' ? 'ap' : 'd') + m[2];
    return (VERS_TODO[cap] || {})[m[3]] || null;
  };
  const conPagina = f => /\bp\. ?\d|\b(CS|PE|PP|DTG|EUD|CBA|\dT)\s+\d|\d+:\d+/.test(sinEtiquetas(f));
  const esta = (frag, todo) => {
    let i = 0;
    for (const trozo of normaliza(frag).split(/\s*…\s*/).filter(Boolean)) { const j = todo.indexOf(trozo, i); if (j < 0) return false; i = j + trozo.length; }
    return true;
  };
  for (const [cap, lista] of Object.entries(hechos)) {
    const L = LAMINAS[cap];
    if (!L) { mal.push(cap + ': no hay lámina'); continue; }
    const pasos = pasosDe(L), tl = textoLamina(cap);
    lista.forEach((h, i) => {
      const id = cap + '#' + i;
      const p = Array.isArray(h) ? h[0] : h.p, en = Array.isArray(h) ? h[1] : h.en;
      if (!pasos.has(p)) mal.push(id + ': «' + p + '» no es un paso de la lámina');
      for (const d of String(en || '').split(/\s+/).filter(Boolean)) {
        const [hid, fid] = d.split('.'), H = hojas.find(x => x.id === hid);
        if (!H || !(H.filas || FILAS_PODER).some(f => f[0] === fid)) mal.push(id + ': la celda «' + d + '» no existe');
      }
      if (Array.isArray(h)) {
        const v = versiculo(/^\d+:/.test(h[2]) ? (cap.startsWith('ap') ? 'Apocalipsis ' : 'Daniel ') + h[2] : h[2]);
        if (!v) mal.push(id + ': no encontré el versículo ' + h[2]);
        else if (!esta(h[3], normaliza(v))) mal.push(id + ': «' + h[3] + '» no está literal en ' + h[2]);
      } else {
        const f = fuenteDe(L, h.p, h.f);
        if (!f || !conPagina(f)) mal.push(id + ': sin fuente con página');
        if (h.q) { if (!esta(h.q, textoLamina(cap))) mal.push(id + ': la cita “' + h.q + '” no está en la lámina'); }
        else {
          if (!h.t || !esta(h.t, tl)) mal.push(id + ': «' + h.t + '» no está en la lámina');
          if (h.k && !esta(h.k, tl)) mal.push(id + ': el rótulo «' + h.k + '» no está en la lámina');
        }
      }
    });
  }
  for (const H of hojas) if (H.lema) { const v = versiculo(H.lema[0]); if (!v || !esta(H.lema[1], normaliza(v))) mal.push(H.id + ': el lema no está literal en ' + H.lema[0]); }
  return mal;
}

module.exports = { HOJAS, HECHOS, FILAS_PODER, armaParalelos, revisaParalelos, juntaFuentes };
