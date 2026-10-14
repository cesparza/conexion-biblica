/* LÁMINAS: estudios interactivos con imagen (v185).

   Camilo, 12-oct: un estudio «muy bien elaborado, explicando fechas y
   símbolos», que sirva para estudiar y para presentar en sus clases. Piloto:
   Daniel 2. Las imágenes las hizo Camilo con ChatGPT; la estatua viene
   recortada por metal (laminas/d2/*.webp, todas del mismo tamaño y en la misma
   posición), así cada parte se toca, se enciende y se rompe por separado.

   La interpretación de cada parte salió de la auditoría contra las notas de
   Camilo y los PDFs (Bohr, Smith, Elena de White): Roma en tres fases,
   la piedra en la segunda venida, el monte como reino eterno. */
const BOHR = 'Bohr, <i>Daniel 1-10</i>';
const LAMINAS = {
 d2: {
  titulo: 'La imagen del sueño de Nabucodonosor',
  dir: 'd2/',
  ox: 166, w: 1100, h: 1152,
  capas: ['plata', 'oro', 'bronce', 'hierro', 'barro', 'dedos'],
  cajas: { oro: [403, 0, 292, 256], plata: [359, 240, 379, 468], bronce: [423, 416, 252, 291], hierro: [430, 708, 237, 273], barro: [431, 982, 235, 104], dedos: [417, 1087, 264, 51], piedra: [850, 220, 220, 220], monte: [0, 0, 1100, 1152] },
  golpe: [550, 1085],
  /* v205: la ventana de la escena donde está la estatua (x, y, ancho, alto). Otras
     láminas (Daniel 7, después Daniel 8) la dibujan chica al lado y encienden el metal. */
  marcoEstatua: [340, 0, 420, 1152],
  /* Etiqueta de cada parte, sobre la imagen: de qué lado va, el punto de la
     estatua al que apunta (ax, ay) y la altura de la etiqueta (ly), en las
     unidades de la escena (1100 × 1152). */
  etiquetas: {
    oro: { lado: 'd', ax: 640, ay: 140, ly: 110, f: '605 – 539 a.C.' },
    plata: { lado: 'i', ax: 400, ay: 330, ly: 300, f: '539 – 331 a.C.' },
    bronce: { lado: 'd', ax: 655, ay: 600, ly: 560, f: '331 – 168 a.C.' },
    hierro: { lado: 'i', ax: 470, ay: 850, ly: 760, f: '168 a.C. – 476 d.C.' },
    barro: { lado: 'i', ax: 470, ay: 1035, ly: 960, f: '538 – 1798 d.C.' },
    dedos: { lado: 'd', ax: 640, ay: 1110, ly: 990, f: 'desde 476 d.C.' },
    /* Sin línea: la piedra se ve sola arriba a la derecha y el monte aparece
       cuando se toca. `t` reemplaza el reino en la etiqueta. */
    piedra: { lado: 'd', ly: 420, t: 'La piedra', f: 'Cristo vuelve' },
    monte: { lado: 'i', ly: 40, t: 'El gran monte', f: 'el reino eterno' },
  },
  tiempo: ['oro', 'plata', 'bronce', 'hierro', 'dedos', 'barro'],
  inicio: { ref: 'Daniel 2:31', texto: 'Tú, rey, veías en tu sueño una gran imagen. Esta imagen era muy grande y su gloria, muy sublime.',
    nota: 'Los metales bajan de valor (del oro al hierro) pero suben en dureza: la historia no camina hacia una edad de oro hecha por el hombre. Y Roma aparece en tres fases: imperial, dividida y papal. Hay una cuarta: el papado sanado de su herida (Apocalipsis 13:3), que sigue en pie cuando la piedra golpea los pies.' },
  cierre: { ref: 'Daniel 2:45', texto: 'El gran Dios ha mostrado al rey lo que ha de acontecer en lo por venir; y el sueño es verdadero, y fiel su interpretación.',
    titulo: 'Un reino que no será jamás destruido', nota: 'Hoy estamos en los pies. Lo que sigue es la piedra.' },
  /* El capítulo en orden: lo que pasa antes del sueño y después. La
     estatua no se entiende sin esto: Dios le muestra al rey el futuro que
     ningún sabio podía decirle (2:10-11, 27-28). Textos literales RV1995. */
  /* v191: `f` es la escena de cada paso de la historia (laminas/d2/hN.webp).
     Mientras no exista la imagen, se ve la estatua entera, no a media luz. */
  historia: [
    /* v203 (Camilo 13-oct): la presentación empieza por el contexto, el cautiverio de 605. */
    { f: 'e605', titulo: 'Cautivos en Babilonia', ref: 'Daniel 1:2', texto: 'El Señor entregó en sus manos a Joacim, rey de Judá',
      nota: 'En 605 a.C. Nabucodonosor sitia Jerusalén y se lleva a Daniel, Ananías, Misael y Azarías, jóvenes de unos 18 años (1:1-6). Vendrán dos deportaciones más, en 597 y 586 a.C. En el segundo año de Nabucodonosor llega el sueño (2:1).' },
    { f: 'h1', titulo: 'Un sueño que nadie puede decir', ref: 'Daniel 2:1, 11', texto: 'tuvo Nabucodonosor sueños, y se turbó su espíritu y se le fue el sueño.',
      nota: 'El rey exige que le digan el sueño y su significado. Los sabios responden que solo podrían «los dioses cuya morada no está entre los hombres» (2:11), y el rey manda matarlos a todos (2:12).' },
    { f: 'h2', titulo: 'Daniel pide tiempo y ora', ref: 'Daniel 2:18-19', texto: 'para que pidieran misericordias del Dios del cielo sobre este misterio',
      nota: 'Daniel pide tiempo al rey (2:16) y ora con Ananías, Misael y Azarías. Esa noche Dios le revela el secreto (2:19).' },
    { f: 'h3', titulo: 'Él quita reyes y pone reyes', ref: 'Daniel 2:21', texto: 'Él muda los tiempos y las edades, quita reyes y pone reyes; da la sabiduría a los sabios y la ciencia a los entendidos.',
      nota: 'Es la clave del capítulo: la historia no la mueven los imperios, la mueve Dios. Daniel lo alaba antes de ir al rey (2:20-23).' },
    { f: 'h4', titulo: 'Hay un Dios en los cielos', ref: 'Daniel 2:28', texto: 'Pero hay un Dios en los cielos que revela los misterios, y él ha hecho saber al rey Nabucodonosor lo que ha de acontecer en los últimos días.',
      nota: 'Daniel no se lleva el mérito (2:30), y dice hasta dónde llega el sueño: hasta los últimos días.' },
  ],
  despues: { f: 'h5', titulo: 'El rey reconoce al Dios de Daniel', ref: 'Daniel 2:47', texto: 'Ciertamente el Dios vuestro es Dios de dioses, Señor de los reyes y el que revela los misterios',
    nota: 'El rey se postra (2:46), engrandece a Daniel y, a pedido suyo, pone a Sadrac, Mesac y Abed-nego sobre la provincia (2:48-49).' },
  paralelo: [['oro','León con alas de águila','Babilonia'],['plata','Oso','Medo-Persia'],['bronce','Leopardo de cuatro cabezas','Grecia'],
    ['hierro','Bestia con dientes de hierro','Roma imperial'],['dedos','Diez cuernos','Roma dividida'],['barro','El cuerno pequeño','Roma papal'],
    ['piedra','El reino se da a los santos (7:27)','La segunda venida y el reino eterno']],
  paraleloFuente: 'Bohr, <i>Daniel 1-10</i>, p. 20, 83, 119-120.',
  reto: [
    {q:'¿Qué parte es «otro reino, inferior al tuyo»?',ok:'plata',e:'2:39 · Medo-Persia, que el mismo libro nombra en 5:28.'},
    {q:'¿Dónde golpeó la piedra?',ok:'barro',e:'2:34 · «hirió a la imagen en sus pies de hierro y de barro cocido».'},
    {q:'¿Qué reino «dominará sobre toda la tierra»?',ok:'bronce',e:'2:39 · el de bronce, Grecia.'},
    {q:'¿Qué parte representa la unión del poder político y el religioso?',ok:'barro',e:'El hierro mezclado con barro: Roma papal, desde 538 d.C.'},
    {q:'¿Qué representan los diez dedos?',ok:'dedos',e:'Roma dividida en diez reinos bárbaros; la división se completó en 476 d.C.'},
    {q:'«Tú eres aquella…»',ok:'oro',e:'2:38 · «Tú eres aquella cabeza de oro».'}],
  /* v190: escenas de la historia (imágenes de Camilo hechas con ChatGPT). Salen
     en la explicación de su parte y en la línea de tiempo desde su año. */
  escenas: [
    { y: -605, f: 'e605', parte: 'oro', t: '605 a.C. · Nabucodonosor sitia Jerusalén y se lleva cautivos a Daniel y sus amigos (1:1-6)' },
    { y: -597, f: 'e597', c: '597 a.C. · Segunda deportación', t: '597 a.C. · Segunda deportación: Joaquín, su madre, su corte y Ezequiel son llevados a Babilonia (2 Reyes 24:12-15; Ezequiel 1:2)' },
    { y: -586, f: 'e586', c: '586 a.C. · Cae Jerusalén y el templo', t: '586 a.C. · Jerusalén y el templo son destruidos; tercera deportación (2 Reyes 25:8-11)' },
    { y: -539, f: 'e539', parte: 'plata', t: '539 a.C. · Ciro el Grande toma Babilonia la noche del banquete de Belsasar (5:30-31)' },
    { y: -331, f: 'e331', parte: 'bronce', t: '331 a.C. · Alejandro Magno vence a Darío III en Arbela' },
    { y: -168, f: 'e168', parte: 'hierro', t: '168 a.C. · Roma vence a Macedonia en Pidna' },
    { y: 476, f: 'e476', parte: 'dedos', t: '476 d.C. · Es depuesto Rómulo Augústulo, el último emperador de occidente' },
    { y: 538, f: 'e538', parte: 'barro', t: '538 d.C. · Los ostrogodos dejan Roma; empieza la supremacía papal' },
    { y: 1798, f: 'e1798', c: '1798 d.C. · Berthier toma preso a Pío VI', t: '1798 d.C. · El general Louis-Alexandre Berthier entra en Roma y se lleva preso a Pío VI' },
    /* v195: lo que viene. Año futuro: salen en su parte, nunca en la línea de tiempo. */
    { y: 9998, f: 'e-piedra', parte: 'piedra', t: 'Futuro · Cristo vuelve en su gloria con todos sus ángeles (2:34, 44; Mateo 25:31)' },
    { y: 9999, f: 'e-monte', parte: 'monte', t: 'Para siempre · El reino de Dios llena toda la tierra (2:35, 44)' },
  ],
  partes: [
 {id:'oro',nombre:'Cabeza de oro',reino:'Babilonia',fechas:'605 – 539 a.C.',de:-605,a:-539,c:'#C9971C',
  texto:'La cabeza de esta imagen era de oro fino',ref:'2:32',texto2:'Tú eres aquella cabeza de oro.',ref2:'2:38',
  corto:'El único reino que Daniel 2 nombra: el de Nabucodonosor.',
  interp:['«El Dios del cielo te ha dado reino, poder, fuerza y majestad» (2:37): el rey tiene su reino porque Dios se lo dio. Es el único reino que nombra este capítulo. 605 a.C. es el primer año de Nabucodonosor, cuando sitia Jerusalén por primera vez (1:1); cae en 539, la noche del banquete de Belsasar (Daniel 5).','Jeremías llama a Babilonia «copa de oro» (Jeremías 51:7).'],
  fuente:BOHR+', p. 57-58; Bohr, <i>La gran cadena</i>, p. 39.'},
 {id:'plata',nombre:'Pecho y brazos de plata',reino:'Medo-Persia',fechas:'539 – 331 a.C.',de:-539,a:-331,c:'#8C98A6',
  texto:'su pecho y sus brazos, de plata',ref:'2:32',texto2:'Después de ti se levantará otro reino, inferior al tuyo',ref2:'2:39',
  corto:'Dos brazos, dos pueblos: medos y persas. Daniel 5:28 lo nombra.',
  interp:['El mismo libro lo identifica: «Tu reino ha sido roto y dado a los medos y a los persas» (Daniel 5:28).','Dos brazos, dos pueblos unidos. Ciro el Grande toma Babilonia en 539 a.C., la noche del banquete de Belsasar (5:30-31).'],
  fuente:BOHR+', p. 57; Wadsworth, <i>La estatua de Nabucodonosor</i>, p. 21.'},
 {id:'bronce',nombre:'Vientre y muslos de bronce',reino:'Grecia',fechas:'331 – 168 a.C.',de:-331,a:-168,c:'#A85A2A',
  texto:'su vientre y sus muslos, de bronce',ref:'2:32',texto2:'un tercer reino de bronce, el cual dominará sobre toda la tierra',ref2:'2:39',
  corto:'Alejandro Magno. Daniel 8:21 lo llama «el rey de Grecia».',
  interp:['Daniel 8:20-21 lo nombra: el carnero es Media y Persia; el macho cabrío, «el rey de Grecia».','De Arbela (331 a.C.), cuando Alejandro vence a Darío III, a Pidna (168 a.C.), cuando Roma acaba con la monarquía macedónica.'],
  fuente:BOHR+', p. 57; Smith, <i>Las profecías de Daniel</i>, p. 21.'},
 {id:'hierro',nombre:'Piernas de hierro',reino:'Roma imperial',fechas:'168 a.C. – 476 d.C.',de:-168,a:476,c:'#3E4651',
  texto:'sus piernas, de hierro',ref:'2:33',texto2:'el cuarto reino será fuerte como el hierro',ref2:'2:40',
  corto:'Primera fase de Roma: el reino que «desmenuza y rompe».',
  interp:['La primera de las tres fases de Roma. «Desmenuza y rompe» (2:40): el reino más fuerte y el que más duró. La historia la recuerda como la monarquía de hierro.','Roma no cayó ante otro imperio: se fue deshaciendo. Desde 330 d.C., cuando Constantino I muda la capital a Constantinopla, el occidente declina. En 476 d.C. es depuesto Rómulo Augústulo, el último emperador de occidente.','Daniel no habla de división en las piernas: la división aparece en los pies (2:41).'],
  fuente:BOHR+', p. 57-58, 133; Smith, <i>Las profecías de Daniel</i>, p. 22-25.'},
 {id:'dedos',nombre:'Los diez dedos',reino:'Roma dividida',fechas:'desde 476 d.C.',de:476,a:2026,c:'#4E6A8F',
  texto:'Lo que viste de los pies y los dedos… será un reino dividido',ref:'2:41',texto2:'este reino será en parte fuerte y en parte frágil',ref2:'2:42',
  corto:'Segunda fase: las tribus bárbaras se reparten el imperio.',
  interp:['La segunda fase: el imperio de occidente se lo repartieron las tribus bárbaras entre 351 y 476 d.C. Diez, como los diez cuernos de Daniel 7 (7:24).','Anglosajones, francos, alamanes, lombardos, suevos, visigodos, burgundios, ostrogodos, hérulos y vándalos. Los tres últimos fueron «arrancados» (7:8): hérulos en 493, vándalos en 534 y ostrogodos en 538 d.C. Otra lista pone a los hunos en lugar de los alamanes.','Llegan hasta la segunda venida: la piedra cae «en los días de estos reyes» (2:44). Hoy estamos en los dedos: el mundo sigue dividido (1T 361).'],
  fuente:'Smith, <i>Las profecías de Daniel</i>, p. 23-25; '+BOHR+', p. 58, 62; 1T 361.'},
 {id:'barro',nombre:'Hierro mezclado con barro',reino:'Roma papal',fechas:'desde 538 d.C. · supremacía 538 – 1798 d.C.',de:538,a:1798,c:'#A0694A',
  texto:'sus pies, en parte de hierro y en parte de barro cocido',ref:'2:33',texto2:'se mezclarán por medio de alianzas humanas; pero no se unirán el uno con el otro',ref2:'2:43',
  corto:'Tercera fase: el poder político unido al religioso.',
  interp:['La tercera fase: el poder político unido al religioso. El hierro es el poder civil de Roma; el barro «de alfarero» representa en la Biblia al pueblo de Dios (Jeremías 18:6). Mezclados, es la iglesia que dejó a Cristo para unirse al Estado, la ramera de Apocalipsis 17:2. Por eso la piedra destruye también el barro (2:35).','Domina 1.260 años, de 538 a 1798 d.C. (Daniel 7:25): es el cuerno pequeño. En 538 los ostrogodos son expulsados de Roma; en 1798 el general Louis-Alexandre Berthier entra en Roma y toma prisionero al papa. En 1798 recibe la herida; la herida sana y, al final, la mezcla vuelve en todo el mundo (Apocalipsis 13:3; 17:12-14). Por eso la piedra todavía la encuentra en los pies.','«La mezcla de los asuntos de la iglesia con los del Estado se representa con el hierro y el barro» (Ms 63, 1899).'],
  fuente:'Bohr, <i>¿Cuán cerca al fin?</i>, p. 42-46; '+BOHR+', p. 58-62; CBA 4:1168.'},
 {id:'piedra',nombre:'La piedra',reino:'La segunda venida de Cristo',fechas:'futuro',de:null,c:'#6B7B5A',
  texto:'una piedra se desprendió sin que la cortara mano alguna, e hirió a la imagen en sus pies',ref:'2:34',texto2:'el Dios del cielo levantará un reino que no será jamás destruido',ref2:'2:44',
  corto:'Cristo en su segunda venida. «Sin mano»: no lo hace el hombre.',
  interp:['La piedra es Cristo en su segunda venida. Golpea los pies, no la cabeza: llega «en los días de estos reyes» (2:44), con Europa ya dividida.','«Sin mano»: es Dios quien interviene al final, no una iglesia que conquista el mundo poco a poco.'],
  fuente:BOHR+', p. 63-64.'},
 {id:'monte',nombre:'El gran monte',reino:'El reino eterno',fechas:'para siempre',de:null,c:'#0E7490',
  texto:'la piedra que hirió a la imagen se hizo un gran monte que llenó toda la tierra',ref:'2:35',texto2:'él permanecerá para siempre',ref2:'2:44',
  corto:'Todo lo demás se lo lleva el viento. Solo queda el reino de Dios.',
  interp:['La piedra sale del monte Sion (2:45; 1 Pedro 2:6) y se convierte en el gran monte: el reino eterno. En la Biblia un monte es un reino (Isaías 2:2). Todo lo demás se lo lleva el viento «como tamo» (2:35).','Daniel 7 termina igual: el reino se da «al pueblo de los santos del Altísimo, cuyo reino es reino eterno» (7:27).'],
  fuente:BOHR+', p. 63-64.'}
],
 },
};

/* v204: DANIEL 7 (Camilo, 13-oct: «mucha de esta información se reutiliza, se
   agrega más o se complementa»). No es una estatua: no hay capas que
   encender. `tipo:'escenas'`: cada parte tiene su imagen entera (16:9,
   laminas/d7/), se elige en una tira de botones bajo la imagen y al presentar
   va a la izquierda con el texto a la derecha, como los pasos de la historia
   de Daniel 2. La línea de tiempo, las escenas de cada año y los colores de
   cada reino son los de Daniel 2: es la misma historia contada dos veces.
   Lectura de Camilo: la bestia = Roma imperial, los diez cuernos = Roma
   dividida, el cuerno pequeño = Roma papal (y sanado, Ap 13:3); la cuarta
   bestia no es el dragón. Textos literales RV1995 (tests/test.js los verifica). */
const D2_A_D7 = { oro: 'leon', plata: 'oso', bronce: 'leopardo', hierro: 'bestia', dedos: 'cuernos', barro: 'cuerno' };
LAMINAS.d7 = {
  tipo: 'escenas',
  libro: 'Daniel 7',
  titulo: 'Las cuatro bestias y el juicio',
  dir: 'd7/',
  /* La imagen de la tarjeta del capítulo y la de Explorar antes de elegir. */
  miniF: 'leon', inicioF: 'mar',
  verTodo: 'Las bestias',
  invita: 'Elige cada bestia, los cuernos y el juicio: lo que dice el texto, lo que significa, sus fechas y su fuente.',
  pista: 'Elige una parte en la tira de abajo de la imagen. Arriba están los pasos del capítulo; abajo, la historia año por año.',
  /* En la línea de tiempo: lo que se pinta encima de otro reino no va en la pista,
     y desde 1798 el cuerno herido se ve a media luz sobre los diez cuernos. */
  solapa: ['cuerno', 'juicio'],
  herida: ['cuernos', 'cuerno'],
  tiempo: ['leon', 'oso', 'leopardo', 'bestia', 'cuernos', 'cuerno', 'juicio'],
  historia: [
    { f: 'd2/babilonia', titulo: 'En el primer año de Belsasar', ref: 'Daniel 7:1', texto: 'En el primer año de Belsasar, rey de Babilonia, tuvo Daniel un sueño y visiones de su cabeza mientras estaba en su lecho',
      nota: 'Hacia el 553 a.C., unos cincuenta años después del sueño de la estatua. Daniel tiene unos setenta años, y Babilonia caerá catorce años después (Daniel 5). Daniel «escribió el sueño» (7:1).' },
    { f: 'mar', titulo: 'Cuatro vientos sobre el gran mar', ref: 'Daniel 7:2-3', texto: 'vi que los cuatro vientos del cielo combatían en el gran mar. … cuatro bestias grandes, diferentes la una de la otra, subían del mar.',
      nota: 'La Biblia explica sus símbolos. Los vientos son guerras entre naciones (Jeremías 25:32-33); el mar, «pueblos, muchedumbres, naciones y lenguas» (Apocalipsis 17:15); las bestias, reyes o reinos (7:17, 23).' },
  ],
  despues: { f: 'mar', titulo: 'Daniel guardó el asunto en su corazón', ref: 'Daniel 7:28', texto: 'mis pensamientos me turbaron y mi rostro se demudó; pero guardé el asunto en mi corazón.',
    nota: 'Daniel no lo entiende todo todavía. Daniel 8 vuelve sobre el cuerno y da la fecha del juicio: «Hasta dos mil trescientas tardes y mañanas» (8:14).' },
  cierre: { f: 'juicio', ref: 'Daniel 7:22', texto: 'se hizo justicia a los santos del Altísimo; y llegó el tiempo, y los santos recibieron el reino.',
    titulo: 'El juicio es a favor de los santos', nota: 'Hoy vivimos en el tiempo del juicio. Lo que sigue es el reino.' },
  paraleloCols: ['Daniel 7', 'Daniel 2', 'Reino'],
  /* v205: la cuarta columna es la parte de Daniel 2 que se enciende en la estatua
     chica al elegir cada parte (null: Daniel 2 no la tiene, la agrega Daniel 7).
     Daniel 8 puede reusar lo mismo con su propio `paralelo` y `comparar`. */
  comparar: 'd2',
  agrega: 'Daniel 2 no lo muestra: lo agrega Daniel 7',
  /* Donde lo que pasa está a la derecha de la imagen, la estatua va a la izquierda. */
  d2Izq: ['cuerno'],
  paralelo: [['leon', 'Cabeza de oro', 'Babilonia', 'oro'], ['oso', 'Pecho y brazos de plata', 'Medo-Persia', 'plata'], ['leopardo', 'Vientre y muslos de bronce', 'Grecia', 'bronce'],
    ['bestia', 'Piernas de hierro', 'Roma imperial', 'hierro'], ['cuernos', 'Los diez dedos', 'Roma dividida', 'dedos'], ['cuerno', 'Hierro mezclado con barro', 'Roma papal', 'barro'],
    ['juicio', 'No aparece: lo agrega Daniel 7', 'El juicio en el cielo, desde 1844', null], ['hijo', 'La piedra que se desprende sin mano', 'Cristo recibe el reino', 'piedra'],
    ['reino', 'La piedra que se hace un gran monte', 'El reino eterno', 'monte']],
  paraleloFuente: BOHR + ', p. 20, 83, 119-121.',
  retoSin: [],
  reto: [
    { q: '¿Qué bestia tenía tres costillas en la boca?', ok: 'oso', e: '7:5 · Medo-Persia y sus tres conquistas: Lidia, Babilonia y Egipto.' },
    { q: '¿Qué bestia tenía cuatro cabezas?', ok: 'leopardo', e: '7:6 · Grecia, que se repartieron los cuatro generales de Alejandro.' },
    { q: '¿Qué parte representa a Roma dividida?', ok: 'cuernos', e: '7:24 · «diez reyes»: los reinos que salieron de Roma desde 476 d.C.' },
    { q: '¿Quién domina «tiempo, tiempos y medio tiempo»?', ok: 'cuerno', e: '7:25 · 1.260 años, de 538 a 1798 d.C.: Roma papal.' },
    { q: '¿Qué empieza en 1844?', ok: 'juicio', e: '7:9-10 y 8:14 · Se sienta el Anciano de días y se abren los libros.' },
    { q: '«Lo hicieron acercarse delante de él». ¿A quién?', ok: 'hijo', e: '7:13 · Cristo llega al Anciano de días, en el cielo, no a la tierra.' }],
  /* Las escenas de la historia son las de Daniel 2, cada una en su bestia. */
  escenas: LAMINAS.d2.escenas.filter(e => e.y < 9000).map(e => Object.assign({}, e, { f: 'd2/' + e.f }, e.parte ? { parte: D2_A_D7[e.parte] } : {}))
    /* v205: al pasar de 1798 a 1844 la línea de tiempo llega al juicio. */
    .concat([{ y: 1844, f: 'juicio', c: '1844 d.C. · Empieza el juicio en el cielo (8:14)', t: '1844 d.C. · Terminan las 2.300 tardes y mañanas y empieza el juicio en el cielo (7:9-10; 8:14)' }]),
  /* v205: la línea de tiempo con 1844 (va arriba de la pista: abajo choca con 1798),
     y los años donde el recorrido se detiene un momento. */
  marcas: [[-605, '605 a.C.'], [-331, '331<i> a.C.</i>', 'chico'], [-168, '168<i> a.C.</i>', 'chico'], [1, '1<i> d.C.</i>', 'chico'], [476, '476 d.C.'], [1798, '1798 d.C.'], [1844, '1844 · el juicio', 'arriba'], [2026, 'hoy', 'chico']],
  hitos: [-539, -331, -168, 476, 538, 1798, 1844],
  /* v205: LAS BESTIAS SUBEN DEL MAR (7:3), una por paso. Hoy: la imagen entera de
     cada bestia sube y aparece sobre la anterior. Cuando existan
     laminas/d7/{leon,oso,leopardo,cuarta}-solo.png (fondo transparente; la que falte sube con su foto entera), suben
     recortadas sobre mar.webp y las anteriores quedan chicas atrás. Medidas en
     píxeles de una imagen de 1200 × 675. */
  sube: { fondo: 'mar', ids: ['leon', 'oso', 'leopardo', 'bestia'], solo: ['leon-solo.png', 'oso-solo.png', 'leopardo-solo.png', 'cuarta-solo.png'],
    sitio: [370, 110, 600, 440], atras: [[10, 210, 260, 180], [200, 250, 260, 200], [20, 340, 250, 190]], olas: 500 },
  /* v205: LOS DIEZ CUERNOS Y EL CUERNO PEQUEÑO (7:7-8, 24). En «Los diez cuernos» se
     cuentan sobre cuarta.webp (tiene exactamente diez); en «El cuerno pequeño» tres
     caen y sube el pequeño. Hoy: de cuarta.webp a cuerno.webp, con los nombres de
     los tres que caen. Cuando existan cuerno-suelto.png (un cuerno, fondo
     transparente, la punta arriba) y cuerno-pequeno.png (el pequeño, fondo
     transparente), la app los anima sobre cuarta.webp: los tres se desprenden y
     caen, y el pequeño crece entre los demás. Medidas en píxeles de 1200 × 675. */
  cuernos: {
    diezEn: 'cuernos', caenEn: 'cuerno',
    /* Los diez, de izquierda a derecha sobre cuarta.webp (un punto arriba y otro
       abajo, para que no se toquen): los tres últimos son los que caen. */
    nombres: ['Alamanes', 'Francos', 'Burgundios', 'Suevos', 'Visigodos', 'Sajones', 'Lombardos', 'Hérulos', 'Vándalos', 'Ostrogodos'],
    diez: [[587, 67], [623, 97], [665, 63], [707, 100], [742, 70], [778, 110], [808, 87], [833, 133], [868, 120], [883, 167]],
    /* `a`: adónde van al caer; en cuerno.webp, donde están los tres arrancados. */
    tres: [{ t: 'Hérulos', y: 493, a: [960, 150] }, { t: 'Vándalos', y: 534, a: [1040, 270] }, { t: 'Ostrogodos', y: 538, a: [990, 400] }],
    pequeno: { t: 'El cuerno pequeño', s: 'Roma papal · desde 538', en: [655, 130] },
    /* Con las capas: cada uno de los tres cuernos pintados se tapa con cielo de
       cuarta.webp corrido (`tapa`: caja girada x, y, ancho, alto, grados; y de
       dónde se toma el cielo: dx, dy; el borde se difumina con capas) y en su sitio se pone cuerno-suelto.png
       (`tres`: x, y, ancho, alto, grados, girando sobre la base), que se cae.
       `pq`: la ventana de donde sale el pequeño (crece desde abajo); `pqEn`: su punto. */
    capas: { suelto: 'cuerno-suelto.png', pequeno: 'cuerno-pequeno.png',
      /* cuerno-suelto.png viene con la punta arriba a la izquierda: `espejo` lo voltea. */
      espejo: true, tres: [[820, 86, 68, 76, -22], [843, 106, 68, 76, -20], [860, 130, 68, 76, -18]],
      tapa: [[798, 50, 66, 100, 6, 84, 149], [823, 74, 64, 96, 14, 60, 127], [841, 94, 66, 100, 17, 41, 105]],
      pq: [674, 20, 112, 150], pqEn: [730, 95] },
  },
  /* v205: LAS ONCE SEÑAS DEL CUERNO PEQUEÑO, las mismas de la interpretación de
     Daniel 7 (complementos/daniel/d7.js); se encienden una por una con su
     cumplimiento (en Presentar, una por paso, después del cuerno pequeño). */
  senasTras: 'cuerno',
  senas: [
    { t: 'Sale de la cuarta bestia', ref: '7:8, 24', c: 'Es romano: sede en Roma, el latín y el título de <i>Pontifex Maximus</i> que usaban los emperadores.' },
    { t: 'Sale entre los diez cuernos', ref: '7:8', c: 'Nace en Europa occidental, donde estaban los diez reinos.' },
    { t: 'Se levanta «tras ellos»', ref: '7:24', c: 'Después de 476, cuando cayó Rómulo Augústulo, el último emperador de occidente.' },
    { t: 'Es pequeño y después «parecía más grande que sus compañeros»', ref: '7:8, 20', c: 'El obispo de Roma creció poco a poco hasta estar por encima de los reyes de Europa.' },
    { t: '«Derribará a tres reyes»', ref: '7:8, 20, 24', c: 'Hérulos (493), vándalos (534) y ostrogodos (538), los tres arrianos.' },
    { t: 'Es «diferente de los primeros»', ref: '7:24', c: 'Los diez eran reinos políticos; este une la iglesia y el Estado.' },
    { t: 'Tiene «ojos como de hombre»', ref: '7:8, 20', c: 'En la profecía los ojos son entendimiento (Efesios 1:18): se apoya en la sabiduría y la tradición humanas.' },
    { t: '«Una boca que hablaba con gran insolencia»', ref: '7:8, 20, 25', c: '«Hablará palabras contra el Altísimo»: toma títulos y poderes de Dios, ocupar su lugar en la tierra y perdonar pecados (Marcos 2:7; Apocalipsis 13:5-6).' },
    { t: '«Hacía guerra contra los santos»', ref: '7:21, 25', c: 'La persecución de valdenses, albigenses y hugonotes, y la Inquisición.' },
    { t: '«Pensará en cambiar los tiempos y la Ley»', ref: '7:25', c: 'El calendario profético de Dios y el sábado: el día de reposo se pasó al domingo y se quitó el mandamiento sobre las imágenes (CS 55-56).' },
    { t: 'Domina «tiempo, tiempos y medio tiempo»', ref: '7:25', c: '1.260 años: de 538 a 1798 d.C.' }],
  senasFuente: BOHR + ', p. 119, 124-127; CS 55-56.',
  /* v208: TIEMPO, TIEMPOS Y MEDIO TIEMPO (7:25), después de las once señas: cuatro
     pasos que se arman sobre la imagen (la suma, un día por un año, el mismo
     tiempo en Apocalipsis y el cumplimiento de 538 a 1798 en la línea de tiempo).
     `citas`: lo que la hoja cita literal en RV1995 (Daniel 7 y Apocalipsis). */
  periodo: {
    tras: 'cuerno', t: 'Tiempo, tiempos y medio tiempo', s: '1.260 años · 538 – 1798 d.C.', de: 538, a: 1798,
    fotos: [['d2/e538', '538 d.C.', 'Los ostrogodos dejan Roma'], ['d2/e1798', '1798 d.C.', 'Berthier toma preso a Pío VI']],
    pasos: [
      { t: 'Tiempo, tiempos y medio tiempo', v: 'suma', citas: [['Daniel 7:25', 'y serán entregados en sus manos hasta tiempo, tiempos y medio tiempo.']],
        nota: 'Un «tiempo» es un año, «tiempos» son dos años y «medio tiempo», medio año. El año profético tiene 360 días (doce meses de 30): 360 + 720 + 180 = 1.260 días.' },
      { t: 'Un día por un año', v: 'dia', citas: [],
        nota: 'En la profecía simbólica cada día vale un año. Dios mismo usa esa medida en Números 14:34 y en Ezequiel 4:6. Por eso los 1.260 días son 1.260 años.' },
      { t: 'El mismo tiempo en Apocalipsis', v: 'mismo', citas: [['Apocalipsis 12:14', 'un tiempo, tiempos y la mitad de un tiempo'], ['Apocalipsis 12:6', 'mil doscientos sesenta días'], ['Apocalipsis 11:3', 'mil doscientos sesenta días'], ['Apocalipsis 13:5', 'cuarenta y dos meses'], ['Apocalipsis 11:2', 'cuarenta y dos meses']],
        nota: 'Tres maneras de decir el mismo periodo: tres tiempos y medio, 42 meses (42 × 30) y 1.260 días.' },
      { t: 'De 538 a 1798', v: 'cumple', citas: [['Apocalipsis 13:3', 'Vi una de sus cabezas como herida de muerte, pero su herida mortal fue sanada.']],
        nota: 'En 538 los ostrogodos dejan Roma y empieza la supremacía papal. 1.260 años después, en 1798, el general Berthier toma preso al papa Pío VI: es la herida de muerte. Después la herida sana y el cuerno sigue hasta que viene el Anciano de días (7:21-22).' }],
    fuente: BOHR + ', p. 198-199; Bohr, <i>15 principios</i> 1:226-231; CS 309 y 492.',
  },
  partes: [
 {id:'leon',img:'leon',nombre:'León con alas de águila',reino:'Babilonia',fechas:'605 – 539 a.C.',de:-605,a:-539,c:'#C9971C',
  texto:'La primera era como un león, y tenía alas de águila.',ref:'7:4',texto2:'Estas cuatro grandes bestias son cuatro reyes que se levantarán en la tierra.',ref2:'7:17',
  corto:'Babilonia, la cabeza de oro de Daniel 2. Las alas son la rapidez de sus conquistas.',
  interp:['El león es Babilonia (Jeremías 50:17), la misma cabeza de oro de Daniel 2: lo mejor de cada especie, como el oro entre los metales. Las alas de águila son la rapidez de sus conquistas (Habacuc 1:6-8).','Le arrancan las alas: Babilonia ya no conquista. Y recibe «corazón de hombre», un león sin valor. Así se vio Belsasar la noche en que cayó el reino, en 539 a.C. (5:6, 30).','Mira los verbos: sus alas «le fueron arrancadas», «fue levantada», «se le dio». Otro guía la historia.'],
  fuente:BOHR+', p. 122.'},
 {id:'oso',img:'oso',nombre:'Oso',reino:'Medo-Persia',fechas:'539 – 331 a.C.',de:-539,a:-331,c:'#8C98A6',
  texto:'semejante a un oso, la cual se alzaba de un costado más que del otro. En su boca, entre los dientes, tenía tres costillas',ref:'7:5',texto2:'Levántate y devora mucha carne.',ref2:'7:5',
  corto:'Medo-Persia, la plata de Daniel 2. Las tres costillas: Lidia, Babilonia y Egipto.',
  interp:['El oso es Medo-Persia (8:20), el pecho y los brazos de plata de Daniel 2. Se alza de un costado: de los dos pueblos, los persas llegaron a mandar más que los medos (8:3).','Las tres costillas son sus tres grandes conquistas: Lidia (547 a.C.), Babilonia (539 a.C.) y Egipto (525 a.C.).','«Levántate», se le dijo: alguien le da permiso para conquistar.'],
  fuente:BOHR+', p. 123; Smith, <i>Las profecías de Daniel</i>, p. 56.'},
 {id:'leopardo',img:'leopardo',nombre:'Leopardo de cuatro cabezas',reino:'Grecia',fechas:'331 – 168 a.C.',de:-331,a:-168,c:'#A85A2A',
  texto:'semejante a un leopardo, con cuatro alas de ave en sus espaldas',ref:'7:6',texto2:'Esta bestia tenía cuatro cabezas; y le fue dado dominio.',ref2:'7:6',
  corto:'Grecia, el bronce de Daniel 2. Cuatro alas: Alejandro conquistó más rápido que nadie.',
  interp:['El leopardo es Grecia (8:21), el vientre y los muslos de bronce de Daniel 2. Un leopardo ya es veloz, y este tiene cuatro alas: Alejandro Magno conquistó de Egipto a la India en pocos años.','Las cuatro cabezas salieron después. Alejandro murió joven y, tras la batalla de Ipso (301 a.C.), sus generales se repartieron el imperio: Casandro, Lisímaco, Tolomeo y Seleuco. Daniel 8:8 lo muestra como cuatro cuernos.','«Le fue dado dominio»: no lo tomó, se lo dieron.'],
  fuente:BOHR+', p. 123; Smith, <i>Las profecías de Daniel</i>, p. 57.'},
 {id:'bestia',img:'cuarta',nombre:'La bestia espantosa',reino:'Roma imperial',fechas:'168 a.C. – 476 d.C.',de:-168,a:476,c:'#3E4651',
  texto:'la cuarta bestia, espantosa, terrible y en gran manera fuerte, la cual tenía unos grandes dientes de hierro',ref:'7:7',texto2:'La cuarta bestia será un cuarto reino en la tierra, el cual será diferente de todos los otros reinos',ref2:'7:23',
  corto:'Roma imperial. Sus dientes de hierro son las piernas de hierro de Daniel 2.',
  interp:['La primera etapa de Roma. No se parece a ningún animal: era «muy diferente de todas las bestias» (7:7). Sus dientes de hierro son las piernas de hierro de Daniel 2, y en 7:19 tiene además «uñas de bronce».','Devora, desmenuza y pisotea: el reino más fuerte y el que más duró, la monarquía de hierro. De Pidna (168 a.C.), cuando acaba con la monarquía macedónica, a 476 d.C., cuando cae Rómulo Augústulo, el último emperador de occidente.','Daniel no le da nombre.'],
  fuente:BOHR+', p. 124; Smith, <i>Las profecías de Daniel</i>, p. 57-58.'},
 {id:'cuernos',img:'cuarta',nombre:'Los diez cuernos',reino:'Roma dividida',fechas:'desde 476 d.C.',de:476,a:2026,c:'#4E6A8F',
  texto:'y tenía diez cuernos',ref:'7:7',texto2:'Los diez cuernos significan que de aquel reino se levantarán diez reyes',ref2:'7:24',
  corto:'Roma dividida: los reinos que salieron de Roma, como los diez dedos de Daniel 2.',
  interp:['La segunda etapa de Roma. Las tribus del norte se repartieron el imperio de occidente, y en 476 d.C. cayó el último emperador. Son los diez dedos de Daniel 2.','Alamanes, francos, burgundios, vándalos, suevos, visigodos, sajones, ostrogodos, lombardos y hérulos. De ellos salieron las naciones de Europa occidental, que nunca se volvieron a unir.'],
  fuente:BOHR+', p. 124; Smith, <i>Las profecías de Daniel</i>, p. 24.'},
 {id:'cuerno',img:'cuerno',nombre:'El cuerno pequeño',reino:'Roma papal',fechas:'supremacía 538 – 1798 d.C.',de:538,a:1798,c:'#A0694A',
  texto:'otro cuerno pequeño salió entre ellos, y delante de él fueron arrancados tres cuernos de los primeros',ref:'7:8',texto2:'serán entregados en sus manos hasta tiempo, tiempos y medio tiempo.',ref2:'7:25',
  corto:'Roma papal: 1.260 años, de 538 a 1798. Herido en 1798, sana (Apocalipsis 13:3) y sigue en pie hasta que viene el Anciano de días (7:21-22).',
  interp:['La tercera etapa de Roma: el poder religioso unido al político. Sale entre los diez cuernos, después de ellos (7:24), y arranca a tres: hérulos (493), vándalos (534) y ostrogodos (538).','Tiene ojos de hombre y una boca que habla «con gran insolencia» (7:8). Habla contra el Altísimo, persigue a los santos y piensa en cambiar los tiempos y la Ley (7:25).','Domina «tiempo, tiempos y medio tiempo»: 1.260 años, de 538 a 1798 d.C. En 1798 el general Louis-Alexandre Berthier entra en Roma y toma preso al papa Pío VI.','Hay una cuarta etapa: el papado sanado de su herida, «su herida mortal fue sanada» (Apocalipsis 13:3). El cuerno hace guerra contra los santos «hasta que vino el Anciano de días» (7:21-22).'],
  fuente:BOHR+', p. 120-121, 124-127, 133-134; Smith, <i>Las profecías de Daniel</i>, p. 58; CS 492.'},
 {id:'juicio',img:'juicio',nombre:'El juicio',reino:'El juicio en el cielo',fechas:'desde 1844 d.C.',de:1844,a:2026,c:'#B45309',
  texto:'fueron puestos unos tronos y se sentó un Anciano de días',ref:'7:9',texto2:'El Juez se sentó y los libros fueron abiertos.',ref2:'7:10',
  corto:'Desde 1844 el Padre juzga en el cielo, y el fallo es a favor de los santos (7:22).',
  interp:['El juicio empieza cuando terminan los 1.260 años del cuerno (7:25-26) y antes de la segunda venida. La fecha exacta la da Daniel 8:14: las 2.300 tardes y mañanas terminan en 1844.','El Anciano de días es Dios el Padre. Su trono tiene ruedas de fuego: es un trono que se mueve, al lugar santísimo del santuario celestial. Los millones que están delante de él son ángeles, testigos del tribunal.','Los libros se abren (7:10) y «se hizo justicia a los santos» (7:22). Al cuerno «le quitarán su dominio, para que sea destruido» (7:26).'],
  fuente:'CS 477 y 533; '+BOHR+', p. 120-121, 276-280.',
  /* v205: la escena del juicio por pasos: la imagen se acerca a cada parte
     (`caja`: x, y, ancho y alto en píxeles de juicio.webp, 1200 × 675, en 16:9). */
  pasos:[
   {t:'Fueron puestos unos tronos',ref:'7:9',texto:'Estuve mirando hasta que fueron puestos unos tronos',caja:[150,40,880,495],
    nota:'Los tronos se colocan porque antes no estaban: en el cielo empieza algo nuevo. Es 1844, cuando terminan las 2.300 tardes y mañanas (8:14).'},
   {t:'Se sentó un Anciano de días',ref:'7:9',texto:'y se sentó un Anciano de días. Su vestido era blanco como la nieve; el pelo de su cabeza, como lana limpia',caja:[400,20,400,225],
    nota:'Dios el Padre preside el juicio. Blanco y lana limpia: pureza y eternidad, un Juez que no se puede comprar.'},
   {t:'Un río de fuego',ref:'7:9-10',texto:'su trono, llama de fuego, y fuego ardiente las ruedas del mismo. Un río de fuego procedía y salía de delante de él',caja:[250,200,680,383],
    nota:'Un trono con ruedas es un trono que se mueve, como el carro de Ezequiel 1: el Padre pasa al lugar santísimo. Los millones que están delante de él son ángeles, testigos del tribunal (CS 533).'},
   {t:'Los libros fueron abiertos',ref:'7:10',texto:'El Juez se sentó y los libros fueron abiertos.',caja:[380,290,680,383],
    nota:'Los libros guardan cada vida (Apocalipsis 20:12). El fallo es a favor de los santos: «se hizo justicia a los santos del Altísimo» (7:22).'}]},
 {id:'hijo',img:'hijo',nombre:'El Hijo del hombre',reino:'Cristo recibe el reino',fechas:'en el juicio',de:null,c:'#0E7490',
  texto:'con las nubes del cielo venía uno como un hijo de hombre; vino hasta el Anciano de días',ref:'7:13',texto2:'su dominio es dominio eterno, que nunca pasará',ref2:'7:14',
  corto:'Cristo va al Padre, no a la tierra: llega al juicio y recibe el reino.',
  interp:['Uno «como un hijo de hombre» es Cristo. Las nubes son ángeles (Salmo 68:17) que lo llevan ante el Padre, al juicio, no a la tierra (CS 477).','Ahí recibe «dominio, gloria y reino» (7:14). Después vuelve por los suyos: el reino se da también «al pueblo de los santos del Altísimo» (7:27), herederos con Cristo (Romanos 8:17).'],
  fuente:'CS 477; '+BOHR+', p. 280.',
  pasos:[
   {t:'Con las nubes del cielo',ref:'7:13',texto:'con las nubes del cielo venía uno como un hijo de hombre; vino hasta el Anciano de días, y lo hicieron acercarse delante de él.',caja:[0,60,780,439],
    nota:'Cristo va al Padre, no a la tierra: llega al juicio en el cielo (CS 477).'},
   {t:'Le fue dado dominio',ref:'7:14',texto:'Y le fue dado dominio, gloria y reino, para que todos los pueblos, naciones y lenguas lo sirvieran',caja:[540,0,660,371],
    nota:'Recibe el reino en el juicio. Después vuelve por los suyos: el reino se da también «al pueblo de los santos del Altísimo» (7:27).'}]},
 {id:'reino',img:'d2/e-monte',nombre:'El reino eterno',reino:'Dado a los santos',fechas:'para siempre',de:null,c:'#6B7B5A',
  texto:'Después recibirán el reino los santos del Altísimo, y poseerán el reino hasta el siglo, eternamente y para siempre.',ref:'7:18',texto2:'cuyo reino es reino eterno, y todos los dominios lo servirán y obedecerán.',ref2:'7:27',
  corto:'Las bestias pasan. El reino de Dios queda para siempre, y es de los santos.',
  interp:['Cuatro veces el capítulo termina igual: el reino se da a los santos (7:14, 18, 22, 27). Es la piedra que se hace un gran monte en Daniel 2 (2:35, 44).','El juicio no es contra el pueblo de Dios: es a favor de él (7:22).'],
  fuente:BOHR+', p. 121.'},
  ],
};
module.exports = { LAMINAS };
