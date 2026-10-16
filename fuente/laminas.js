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
/* v225: Gerhard F. Hasel, cap. VI del Simposio sobre Daniel; las páginas son las impresas del libro (fuentes/daniel/Simposio sobre Daniel.txt). */
const SIMP = 'Hasel, “El ‘cuerno pequeño’, el santuario celestial y el tiempo del fin”, <i>Simposio sobre Daniel</i>';
const LAMINAS = {
 d2: {
  libro: 'Daniel 2',
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
    /* v212: `ly` es el centro del rótulo (el hilo llega a su mitad); dos columnas parejas. */
    oro: { lado: 'd', ax: 640, ay: 140, ly: 140, f: '605 – 539 a.C.' },
    plata: { lado: 'i', ax: 400, ay: 330, ly: 330, f: '539 – 331 a.C.' },
    bronce: { lado: 'd', ax: 655, ay: 600, ly: 600, f: '331 – 168 a.C.' },
    hierro: { lado: 'i', ax: 470, ay: 850, ly: 830, f: '168 a.C. – 476 d.C.' },
    barro: { lado: 'i', ax: 470, ay: 1035, ly: 1030, f: '538 – 1798 d.C.' },
    dedos: { lado: 'd', ax: 640, ay: 1110, ly: 1060, f: 'desde 476 d.C.' },
    /* Sin línea: el rótulo de la piedra va justo debajo de ella. v212: el monte ya no
       lleva rótulo sobre la estatua (no se ve hasta que se elige): está en el riel. */
    piedra: { lado: 'd', ly: 478, t: 'La piedra', f: 'Cristo vuelve' },
  },
  /* v212: lo que se dibuja en el escenario no se repite como foto en la hoja. */
  enEscena: ['monte'],
  /* v212: la portada de Explorar (la hoja antes de elegir una parte). */
  intro: { titulo: 'Una gran imagen', ref: 'Daniel 2:31', texto: 'Tú, rey, veías en tu sueño una gran imagen. Esta imagen era muy grande y su gloria, muy sublime.',
    nota: 'De la cabeza a los pies, cuatro reinos y Roma en tres fases: imperial, dividida y papal. Hay una cuarta: el papado sanado de su herida (Apocalipsis 13:3), que sigue en pie hasta que una piedra que nadie cortó hiere los pies: Cristo vuelve. Y, pasados los mil años, un monte que llena toda la tierra.',
    datos: [['4', 'reinos'], ['3', 'fases de Roma'], ['1', 'reino eterno']] },
  tiempo: ['oro', 'plata', 'bronce', 'hierro', 'dedos', 'barro'],
  /* v211 (Camilo, 14-oct: «el play corre pero no se ve el avance»; la línea de
     tiempo llega hasta el futuro). Después de «hoy», un tramo «futuro» a escala
     propia (años que no se cuentan: `de` y `a` solo ubican el tramo): la piedra,
     que es la segunda venida, y el monte, el reino eterno. Al recorrer la
     historia la piedra cae y el monte crece en su tramo.
     v218 (Camilo, 14-oct 16:01: «la piedra y el gran monte son eventos separados»):
     entre la piedra y el monte van los mil años. `ult`: el acontecimiento de
     ULTIMOS que muestra el tramo. */
  futuro: [{ id: 'piedra', de: 2026, a: 2226, t: 'La piedra', s: 'Cristo vuelve', f: 'e-piedra', ult: 'venida' },
    { id: '', de: 2226, a: 2426, t: 'Los mil años', s: 'desde la venida y la primera resurrección: los santos con Cristo en el cielo; la tierra, desolada (CS 718)', f: 'e-piedra', ult: 'desolada' },
    { id: 'monte', de: 2426, a: 2626, t: 'El gran monte', s: 'el reino eterno, después de los mil años', f: 'e-monte', ult: 'reino' }],
  /* Daniel 2 no trae el juicio, pero la historia sí pasa por 1844 (Daniel 7 y 8). */
  juicio: 1844,
  /* v230 (Camilo: «faltan fechas»): una marca por cada reino que empieza (605, 539, 331, 168, 476,
     538), 1798 y 1844; «1 d.C.» es menor. La venida va en 2226: ahí empiezan los mil años. */
  /* v233 (Camilo: «que abarque todo pero no se vea apeñuscado»): la línea de tiempo como un mapa de
     metro, sin escala. `est`: las estaciones [año, nombre, clase, nombre más corto], con las palabras de
     la lámina (cada estación es el comienzo de su parte);
     el futuro no tiene año: la venida y el reino van en el año de su tramo (2226, 2526) y los mil años
     son el tramo entre las dos. `l2`: la segunda línea, paralela [de, a, nombre, color]. */
  metro: { est: [[-605, 'Babilonia'], [-539, 'Medo-Persia'], [-331, 'Grecia'], [-168, 'Roma imperial', '', 'Roma'], [476, 'Roma dividida'], [538, 'Roma papal'], [1798, 'La herida'], [1844, 'El juicio', 'juicio'], [2026, 'Hoy', 'hoy'], [2226, 'La piedra', 'fut'], [2526, 'El monte', 'fut']],
    l2: [[476, 2226, 'Roma dividida', '#4E6A8F']] },
  marcas: [[-605, '605 a.C.'], [-539, '539<i> a.C.</i>'], [-331, '331<i> a.C.</i>'], [-168, '168<i> a.C.</i>'], [1, '1<i> d.C.</i>', 'menor'], [476, '476<i> d.C.</i>'], [538, '538<i> d.C.</i>'],
    [1798, '1798'], [1844, '1844<i> · juicio</i>'], [2026, 'hoy'], [2226, 'la piedra', 'fut'], [2326, 'mil años', 'fut'], [2526, 'el monte', 'fut'], [2476, 'futuro', 'tel']],
  hitos: [-539, -331, -168, 476, 538, 1798, 1844],
  /* v209: el cartel de apertura, como el título de una película: capítulo, lugar y
     cuándo (lo que dice el texto, sin años que el capítulo no da). `lado`: dónde va el
     título sobre la escena ('d' a la derecha de la estatua, 'i' abajo a la izquierda). */
  cartel: { lugar: 'Babilonia', cuando: 'En el segundo año de Nabucodonosor', ref: 'Daniel 2:1', lado: 'd' },
  inicio: { ref: 'Daniel 2:31', texto: 'Tú, rey, veías en tu sueño una gran imagen. Esta imagen era muy grande y su gloria, muy sublime.',
    nota: 'Los metales bajan de valor (del oro al hierro) pero suben en dureza: la historia no camina hacia una edad de oro hecha por el hombre. Y Roma aparece en tres fases: imperial, dividida y papal. Hay una cuarta: el papado sanado de su herida (Apocalipsis 13:3), que sigue en pie cuando la piedra golpea los pies.' },
  cierre: { ref: 'Daniel 2:45', texto: 'El gran Dios ha mostrado al rey lo que ha de acontecer en lo por venir; y el sueño es verdadero, y fiel su interpretación.',
    titulo: 'Un reino que no será jamás destruido', ref2: 'Daniel 2:44',
    /* v212: la imagen propia del cierre, si existe (opcional: sin ella, la estatua en sombra). */
    fondo: 'cierre.webp', nota: 'Hoy estamos en los pies. Lo que sigue es la piedra. Fuente: Bohr, Daniel 1-10, p. 61-62.' },
  /* v227 (Camilo): la pregunta para la vida, al final de Explorar y de Presentar, anclada en un texto. */
  aplica: { pregunta: '¿Caes hoy sobre la piedra, o esperas a que ella caiga?', ref: 'Daniel 2:34', texto: 'una piedra se desprendió sin que la cortara mano alguna, e hirió a la imagen en sus pies',
    nota: 'Jesús lo aplicó a cada persona: «el que caiga sobre esta piedra será quebrantado; y sobre quien ella caiga, será desmenuzado» (Mateo 21:44).' },
  /* El capítulo en orden: lo que pasa antes del sueño y después. La
     estatua no se entiende sin esto: Dios le muestra al rey el futuro que
     ningún sabio podía decirle (2:10-11, 27-28). Textos literales RV1995. */
  /* v191: `f` es la escena de cada paso de la historia (laminas/d2/hN.webp).
     Mientras no exista la imagen, se ve la estatua entera, no a media luz. */
  historia: [
    /* v203 (Camilo 13-oct): la presentación empieza por el contexto, el cautiverio de 605. */
    { f: 'e605', titulo: 'Cautivos en Babilonia', ref: 'Daniel 1:2', texto: 'El Señor entregó en sus manos a Joacim, rey de Judá',
      nota: 'En 605 a.C. Nabucodonosor sitia Jerusalén y se lleva a Daniel, Ananías, Misael y Azarías, jóvenes de unos 18 años (1:1-6): Daniel “sólo tenía dieciocho años cuando fue llevado a una corte pagana” (4T 570, citado en Bohr, <i>Daniel 1-10</i>, p. 45). Vendrán dos deportaciones más, en 597 y 586 a.C. En el segundo año de Nabucodonosor llega el sueño (2:1).' },
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
    ['piedra','Los santos reciben el reino (7:22)','La segunda venida'],['monte','Su reino es reino eterno (7:27)','El reino eterno, después de los mil años']],
  paraleloFuente: BOHR + ', p. 20, 83, 119-121; CS 492 y 636.',
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
    { y: 1798, f: 'e1798', c: '1798 d.C. · Louis-Alexandre Berthier toma preso a Pío VI', t: '1798 d.C. · El general Louis-Alexandre Berthier entra en Roma y se lleva preso a Pío VI' },
    /* v211: 1844 también en Daniel 2 (la imagen es la del juicio de Daniel 7). */
    /* v225 (B10): `hoja: false`, solo en la línea de tiempo: no cae en la hoja de «Los diez dedos»
       (el juicio no es de Roma dividida; Daniel 2 no lo trae). */
    { y: 1844, f: 'd7/juicio', hoja: false, c: '1844 d.C. · Empieza el juicio en el cielo', t: '1844 d.C. · Terminan las 2.300 tardes y mañanas y empieza el juicio en el cielo (Daniel 7:9-10; 8:14)' },
    /* v195: lo que viene. v211: con año del tramo «futuro» de la línea de tiempo (no es un año real). */
    { y: 2027, f: 'e-piedra', parte: 'piedra', t: 'Futuro · Cristo vuelve en su gloria con todos sus ángeles (2:34, 45; Mateo 25:31)' },
    { y: 2427, f: 'e-monte', parte: 'monte', t: 'Después de los mil años · El reino de Dios llena toda la tierra (2:35, 44; Apocalipsis 21:1)' },
  ],
  /* v225 (revisión de Camilo, B1): la cuarta etapa de Roma con nombre en Comparar. `cmpExtra` va
     solo a Comparar (una época «Roma papal sanada · desde 1798 hasta la venida»), no a la lámina
     ni al río. En Daniel 2 lleva el id del barro: su retrato es el de los pies. */
  cmpExtra: [{ id: 'barro', nombre: 'Los pies, hasta que cae la piedra', reino: 'Roma papal sanada', fechas: 'desde 1798 d.C. hasta la venida', de: 1798, a: 2026, c: '#8A5A3C',
    texto: 'hirió a la imagen en sus pies de hierro y de barro cocido', ref: '2:34',
    corto: 'Herido en 1798, el papado sana de su herida (Apocalipsis 13:3) y sigue en los pies hasta que la piedra los hiere: la segunda venida (2:34, 44-45).' }],
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
  interp:['Daniel 8:20-21 lo nombra: el carnero es Media y Persia; el macho cabrío, «el rey de Grecia».','De Arbela (331 a.C.), cuando Alejandro Magno vence a Darío III, a Pidna (168 a.C.), cuando Roma acaba con la monarquía macedónica.'],
  fuente:BOHR+', p. 57; Smith, <i>Las profecías de Daniel</i>, p. 21.'},
 {id:'hierro',nombre:'Piernas de hierro',reino:'Roma imperial',fechas:'168 a.C. – 476 d.C.',de:-168,a:476,c:'#3E4651',
  texto:'sus piernas, de hierro',ref:'2:33',texto2:'el cuarto reino será fuerte como el hierro',ref2:'2:40',
  corto:'Primera fase de Roma: el reino que «desmenuza y rompe».',
  interp:['La primera de las tres fases de Roma. «Desmenuza y rompe» (2:40): el reino más fuerte y el que más duró. La historia la recuerda como la monarquía de hierro.','Roma no cayó ante otro imperio: se fue deshaciendo. Desde 330 d.C., cuando Constantino I muda la capital a Constantinopla, el occidente declina. En 476 d.C. es depuesto Rómulo Augústulo, el último emperador de occidente.','Daniel no habla de división en las piernas: la división aparece en los pies (2:41).'],
  fuente:BOHR+', p. 57-58, 133; Smith, <i>Las profecías de Daniel</i>, p. 22-25.'},
 {id:'dedos',nombre:'Los diez dedos',reino:'Roma dividida',fechas:'476 d.C. – hasta la venida',de:476,a:2026,hasta:'venida',c:'#4E6A8F',
  texto:'Lo que viste de los pies y los dedos… será un reino dividido',ref:'2:41',texto2:'este reino será en parte fuerte y en parte frágil',ref2:'2:42',
  corto:'Segunda fase: las tribus bárbaras se reparten el imperio.',
  interp:['La segunda fase: el imperio de occidente se lo repartieron las tribus bárbaras entre 351 y 476 d.C. Diez, como los diez cuernos de Daniel 7 (7:24). Los dedos también son de hierro y de barro: «por ser los dedos de los pies en parte de hierro y en parte de barro cocido» (2:42).','Anglosajones, francos, alamanes, lombardos, suevos, visigodos, burgundios, ostrogodos, hérulos y vándalos. Los tres últimos fueron «arrancados» (7:8): hérulos en 493, vándalos en 534 y ostrogodos en 538 d.C. Otra lista pone a los hunos en lugar de los alamanes.','Llegan hasta la segunda venida: la piedra cae «en los días de estos reyes» (2:44). Hoy estamos en los dedos: el mundo sigue dividido (1T 361).'],
  fuente:'Smith, <i>Las profecías de Daniel</i>, p. 23-25; '+BOHR+', p. 58, 62; Maxwell, <i>El porvenir del mundo revelado</i>, p. 39-40; 1T 361.'},
 {id:'barro',nombre:'Hierro mezclado con barro',reino:'Roma papal',fechas:'desde 538 d.C. · supremacía 538 – 1798 d.C.',de:538,a:1798,c:'#A0694A',
  texto:'sus pies, en parte de hierro y en parte de barro cocido',ref:'2:33',texto2:'se mezclarán por medio de alianzas humanas; pero no se unirán el uno con el otro',ref2:'2:43',
  corto:'Tercera fase: el poder político unido al religioso.',
  interp:['La tercera fase: el poder político unido al religioso. El hierro es el poder civil de Roma; el barro «de alfarero» representa en la Biblia al pueblo de Dios (Jeremías 18:6). Mezclados, es la iglesia que dejó a Cristo para unirse al Estado, la ramera de Apocalipsis 17:2. La piedra desmenuza también «el barro cocido» (2:35).','Domina 1.260 años, de 538 a 1798 d.C. (Daniel 7:25): es el cuerno pequeño. En 538 los ostrogodos son expulsados de Roma; en 1798 el general Louis-Alexandre Berthier entra en Roma y toma prisionero al papa. En 1798 recibe la herida; la herida sana y, al final, la mezcla vuelve en todo el mundo (Apocalipsis 13:3; 17:12-14). La piedra hiere la imagen «en sus pies de hierro y de barro cocido» (2:34).','Los reyes de la tierra fornican con la ramera (Apocalipsis 17:2) y entregan «su poder y autoridad a la bestia» (17:13), pero la unión no dura: «no se unirán el uno con el otro, como el hierro no se mezcla con el barro» (2:43), y «aborrecerán a la ramera» (17:16).','«La mezcla de los asuntos de la iglesia con los del Estado se representa con el hierro y el barro» (Ms 63, 1899).'],
  fuente:'Bohr, <i>¿Cuán cerca al fin?</i>, p. 42-46 y 64-65; '+BOHR+', p. 58-62; CBA 4:1168.'},
 {id:'piedra',nombre:'La piedra',reino:'La segunda venida de Cristo',fechas:'futuro',de:null,fin:'venida',c:'#6B7B5A',
  texto:'una piedra se desprendió sin que la cortara mano alguna, e hirió a la imagen en sus pies',ref:'2:34',texto2:'el Dios del cielo levantará un reino que no será jamás destruido',ref2:'2:44',
  corto:'Cristo en su segunda venida. «Sin que la cortara mano alguna»: no lo hace el hombre.',
  interp:['La piedra es Cristo en su segunda venida. Golpea los pies, no la cabeza: llega «en los días de estos reyes» (2:44), con Europa ya dividida.','«Sin que la cortara mano alguna» (2:34, 45): es Dios quien interviene al final, no una iglesia que conquista el mundo poco a poco.','La piedra y el monte no pasan al mismo tiempo. La piedra deshace los reinos cuando Cristo vuelve; el monte llena la tierra después de los mil años (Apocalipsis 20:4; 21:1).'],
  fuente:BOHR+', p. 63-64; CS 698-703 y 732.'},
 {id:'monte',nombre:'El gran monte',reino:'El reino eterno',fechas:'después de los mil años, para siempre',de:null,fin:'reino',c:'#0E7490',
  texto:'la piedra que hirió a la imagen se hizo un gran monte que llenó toda la tierra',ref:'2:35',texto2:'él permanecerá para siempre',ref2:'2:44',
  corto:'Después de los mil años. Todo lo demás se lo lleva el viento; solo queda el reino de Dios.',
  interp:['La piedra sale del monte Sion (2:45; 1 Pedro 2:6) y se convierte en el gran monte: el reino eterno. En la Biblia un monte es un reino (Isaías 2:2). Todo lo demás se lo lleva el viento «como tamo» (2:35).','No es la venida: es lo que viene después. Cristo vuelve (la piedra), pasan los mil años, baja la Nueva Jerusalén, el fuego consume a los impíos y la tierra es hecha nueva (Apocalipsis 20-21). Ahí el reino llena toda la tierra.','Daniel 7 termina igual: el reino se da «al pueblo de los santos del Altísimo, cuyo reino es reino eterno» (7:27).'],
  fuente:BOHR+', p. 63-64; CS 720-737.'}
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
  /* v211 (Camilo: «¿no vale la pena una imagen con todas las bestias?»): la portada
     son las cuatro bestias que suben del mar (bestias.webp, armada con
     tools/lamina-bestias.py de las capas leon/oso/leopardo-solo.png, mar.webp y un
     recorte difuminado de cuarta.webp). */
  cartel: { f: 'bestias', lugar: 'Babilonia', cuando: 'En el primer año de Belsasar, hacia 553 a.C.', ref: 'Daniel 7:1', lado: 'i',
    cita: { ref: 'Daniel 7:2', texto: 'Miraba yo en mi visión de noche, y vi que los cuatro vientos del cielo combatían en el gran mar.' } },
  /* La imagen de la tarjeta del capítulo y la de Explorar antes de elegir. */
  miniF: 'bestias', inicioF: 'bestias',
  verTodo: 'Las bestias',
  invita: 'Elige cada bestia, los cuernos y el juicio: lo que dice el texto, lo que significa, sus fechas y su fuente.',
  intro: { titulo: 'Cuatro bestias suben del mar', ref: 'Daniel 7:2-3', texto: 'vi que los cuatro vientos del cielo combatían en el gran mar. … cuatro bestias grandes, diferentes la una de la otra, subían del mar.',
    nota: 'La misma historia de Daniel 2, con más detalle: cuatro reinos, diez cuernos, un cuerno pequeño y el juicio en el cielo.',
    datos: [['4', 'bestias'], ['10', 'cuernos'], ['1844', 'el juicio']] },
  /* En la línea de tiempo: lo que se pinta encima de otro reino no va en la pista,
     y desde 1798 el cuerno herido se ve a media luz sobre los diez cuernos. */
  solapa: ['cuerno', 'juicio'],
  herida: ['cuernos', 'cuerno'],
  tiempo: ['leon', 'oso', 'leopardo', 'bestia', 'cuernos', 'cuerno', 'juicio'],
  /* v218: la venida, los mil años y el reino eterno, como en Daniel 2. */
  futuro: [{ id: 'santos', de: 2026, a: 2226, t: 'La segunda venida', s: 'los santos reciben el reino', f: 'd2/e-piedra', ult: 'venida' },
    { id: '', de: 2226, a: 2426, t: 'Los mil años', s: 'desde la venida y la primera resurrección: los santos juzgan con Cristo (CS 718)', f: 'd2/e-piedra', ult: 'juzgan' },
    { id: 'reino', de: 2426, a: 2626, t: 'El reino eterno', s: 'después de los mil años', f: 'd2/e-monte', ult: 'reino' }],
  historia: [
    { f: 'd2/babilonia', titulo: 'En el primer año de Belsasar', ref: 'Daniel 7:1', texto: 'En el primer año de Belsasar, rey de Babilonia, tuvo Daniel un sueño y visiones de su cabeza mientras estaba en su lecho',
      nota: 'Hacia el 553 a.C., unos cincuenta años después del sueño de la estatua. Daniel tiene unos setenta años (Maxwell, <i>El porvenir del mundo revelado</i>, p. 109), y Babilonia caerá catorce años después (Daniel 5). Daniel «escribió el sueño» (7:1).' },
    { f: 'mar', titulo: 'Cuatro vientos sobre el gran mar', ref: 'Daniel 7:2-3', texto: 'vi que los cuatro vientos del cielo combatían en el gran mar. … cuatro bestias grandes, diferentes la una de la otra, subían del mar.',
      nota: 'La Biblia explica sus símbolos. Los vientos son guerras entre naciones (Jeremías 25:32-33); el mar, «pueblos, muchedumbres, naciones y lenguas» (Apocalipsis 17:15); las bestias, reyes o reinos (7:17, 23).' },
  ],
  /* v217 (Camilo, 14-oct: «¿esto está bien?»): este paso mostraba el mar en tormenta, que es
     la escena de 7:2 y ya está en el paso 2. 7:28 es Daniel después de la visión: la visión
     entera como un recuerdo (recuerdo.webp, tools/lamina-recuerdo.py). Ningún paso de la
     historia repite la escena de otro (prueba en tests/test.js). */
  despues: { f: 'recuerdo', titulo: 'Daniel guardó el asunto en su corazón', ref: 'Daniel 7:28', texto: 'mis pensamientos me turbaron y mi rostro se demudó; pero guardé el asunto en mi corazón.',
    nota: 'Daniel no lo entiende todo todavía. Daniel 8 vuelve sobre el cuerno y da la fecha del juicio: «Hasta dos mil trescientas tardes y mañanas» (8:14).' },
  cierre: { f: 'juicio', ref: 'Daniel 7:22', texto: 'se hizo justicia a los santos del Altísimo; y llegó el tiempo, y los santos recibieron el reino.',
    titulo: 'El juicio es a favor de los santos', nota: 'Hoy vivimos en el tiempo del juicio. Al cerrarse la gracia el Hijo recibe el reino; después Cristo vuelve y los santos lo reciben. Pasados los mil años, el reino eterno llena la tierra.' },
  aplica: { pregunta: 'El juicio es a favor de los santos: ¿ya le confiaste tu caso a Cristo?', ref: 'Daniel 7:22', texto: 'se hizo justicia a los santos del Altísimo',
    nota: 'En el juicio, “Jesús aparecerá como el abogado de ellos, para interceder en su favor ante Dios” (CS 536).' },
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
    /* v211 (Camilo, 14-oct): el Hijo del hombre NO es la piedra. La piedra es la
       segunda venida; el Hijo del hombre «vino hasta el Anciano de días» (7:13) en
       1844, cuando empieza el juicio en el cielo (CS 477). Va en la época del juicio,
       y Daniel 2 no lo trae. El reino de Dios: la piedra y el monte de Daniel 2 con
       el reino dado a los santos (7:18, 22, 27). La cuarta columna puede ser una
       lista: se encienden las dos.
       v218 (Camilo, 14-oct 16:01): la piedra y el monte no van lado a lado. La piedra
       es la venida (los santos reciben el reino, 7:22b, 26); el monte, el reino eterno
       después de los mil años (7:27). */
    ['juicio', 'No aparece: lo agrega Daniel 7', 'El juicio en el cielo, desde 1844', null], ['hijo', 'No aparece: lo agrega Daniel 7', 'Cristo llega al Anciano de días, en el juicio (1844)', null],
    ['santos', 'La piedra que hiere los pies', 'La segunda venida', ['piedra']],
    ['reino', 'La piedra que se hace un gran monte', 'El reino eterno, después de los mil años', ['monte']]],
  paraleloFuente: BOHR + ', p. 20, 83, 119-121; CS 492 y 636.',
  retoSin: [],
  reto: [
    { q: '¿Qué bestia tenía tres costillas en la boca?', ok: 'oso', e: '7:5 · Medo-Persia y sus tres conquistas: Lidia, Babilonia y Egipto.' },
    { q: '¿Qué bestia tenía cuatro cabezas?', ok: 'leopardo', e: '7:6 · Grecia, que se repartieron los cuatro generales de Alejandro Magno.' },
    { q: '¿Qué parte representa a Roma dividida?', ok: 'cuernos', e: '7:24 · «diez reyes»: los reinos que salieron de Roma desde 476 d.C.' },
    { q: '¿Quién domina «tiempo, tiempos y medio tiempo»?', ok: 'cuerno', e: '7:25 · 1.260 años, de 538 a 1798 d.C.: Roma papal.' },
    { q: '¿Qué empieza en 1844?', ok: 'juicio', e: '7:9-10 y 8:14 · Se sienta el Anciano de días y se abren los libros.' },
    { q: '«Lo hicieron acercarse delante de él». ¿A quién?', ok: 'hijo', e: '7:13 · Cristo llega al Anciano de días, en el cielo, no a la tierra.' },
    { q: '¿Qué parte es la segunda venida, la piedra de Daniel 2?', ok: 'santos', e: '7:22 · «llegó el tiempo, y los santos recibieron el reino»; al cuerno le quitan el dominio (7:26).' }],
  /* Las escenas de la historia son las de Daniel 2, cada una en su bestia. */
  escenas: LAMINAS.d2.escenas.filter(e => e.y <= 2026 && e.y !== 1844).map(e => Object.assign({}, e, { f: 'd2/' + e.f }, e.parte ? { parte: D2_A_D7[e.parte] } : {}))
    /* v205: al pasar de 1798 a 1844 la línea de tiempo llega al juicio. */
    .concat([{ y: 1844, f: 'juicio', c: '1844 d.C. · Empieza el juicio en el cielo (8:14)', t: '1844 d.C. · Terminan las 2.300 tardes y mañanas y empieza el juicio en el cielo (7:9-10; 8:14)' },
      { y: 2027, f: 'd2/e-piedra', t: 'Futuro · Cristo vuelve por los suyos (Juan 14:3)' }]),
  /* v205: la línea de tiempo con 1844 (va arriba de la pista: abajo choca con 1798),
     y los años donde el recorrido se detiene un momento. */
  /* v230 (Camilo: «faltan fechas»): una marca por cada reino que empieza (605, 539, 331, 168, 476,
     538), 1798 y 1844; «1 d.C.» es menor. La venida va en 2226: ahí empiezan los mil años. */
  /* v233 (Camilo: «que abarque todo pero no se vea apeñuscado»): la línea de tiempo como un mapa de
     metro, sin escala. `est`: las estaciones [año, nombre, clase, nombre más corto], con las palabras de
     la lámina (cada estación es el comienzo de su parte);
     el futuro no tiene año: la venida y el reino van en el año de su tramo (2226, 2526) y los mil años
     son el tramo entre las dos. `l2`: la segunda línea, paralela [de, a, nombre, color]. */
  metro: { est: [[-605, 'Babilonia'], [-539, 'Medo-Persia'], [-331, 'Grecia'], [-168, 'Roma imperial', '', 'Roma'], [476, 'Roma dividida'], [538, 'Roma papal'], [1798, 'La herida'], [1844, 'El juicio', 'juicio'], [2026, 'Hoy', 'hoy'], [2226, 'La venida', 'fut'], [2526, 'El reino', 'fut']],
    l2: [[476, 2226, 'Roma dividida', '#4E6A8F']] },
  marcas: [[-605, '605 a.C.'], [-539, '539<i> a.C.</i>'], [-331, '331<i> a.C.</i>'], [-168, '168<i> a.C.</i>'], [1, '1<i> d.C.</i>', 'menor'], [476, '476<i> d.C.</i>'], [538, '538<i> d.C.</i>'],
    [1798, '1798'], [1844, '1844<i> · juicio</i>'], [2026, 'hoy'], [2226, 'la venida', 'fut'], [2326, 'mil años', 'fut'], [2526, 'el reino', 'fut'], [2476, 'futuro', 'tel']],
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
     caen, y el pequeño crece entre los demás. Medidas en píxeles de 1200 × 675.
     v214: los tres caen recortados de la misma imagen (ver `capas`). */
  cuernos: {
    diezEn: 'cuernos', caenEn: 'cuerno',
    /* Los diez, de izquierda a derecha sobre cuarta.webp (un punto arriba y otro
       abajo, para que no se toquen): los tres últimos son los que caen. */
    nombres: ['Alamanes', 'Francos', 'Burgundios', 'Suevos', 'Visigodos', 'Sajones', 'Lombardos', 'Hérulos', 'Vándalos', 'Ostrogodos'],
    diez: [[587, 67], [623, 97], [665, 63], [707, 100], [742, 70], [778, 110], [808, 87], [833, 133], [868, 120], [883, 167]],
    /* `a`: adónde van al caer; en cuerno.webp, donde están los tres arrancados. */
    tres: [{ t: 'Hérulos', y: 493, a: [960, 150] }, { t: 'Vándalos', y: 534, a: [1040, 270] }, { t: 'Ostrogodos', y: 538, a: [990, 400] }],
    pequeno: { t: 'El cuerno pequeño', s: 'Roma papal · desde 538', en: [655, 130] },
    /* v214: LAS CAPAS SALEN DE LA MISMA IMAGEN (tools/lamina-cuernos.py). `sin`: el
       parche de cuarta.webp sin los tres de la derecha (cielo rellenado); `tres`: esos
       tres cuernos recortados tal cual, cada uno con su caja (x, y, ancho, alto), así
       que el que se desprende es el que estaba pintado, en su píxel. `delante`: el
       cuerno 7, que se vuelve a poner encima para que el pequeño salga DETRÁS de él.
       Camilo (14-oct): «el lugar donde está el cuerno pequeño no está chévere, está
       como sobre los ojos». Ahora sube de la cresta, en el hueco que dejan los tres
       (7:8 «salió entre ellos»), y termina más alto que los demás (7:20 «parecía más
       grande que sus compañeros»). `pq`: el centro de su base, el alto final, el giro
       (grados, hacia la derecha), si va en espejo (la cara mira al hueco), `corte`:
       la raya de la cabeza (debajo no se ve: ahí está su raíz) y `de`: el tamaño con
       que sale antes de crecer. Medidas en píxeles de 1200 × 675. */
    capas: { pequeno: 'cuerno-pequeno.png',
      sin: { f: 'cuarta-sin-tres.png', en: [811, 59, 104, 166] },
      tres: [{ f: 'cuerno-8.png', en: [819, 70, 35, 136] }, { f: 'cuerno-9.png', en: [839, 93, 41, 121] }, { f: 'cuerno-10.png', en: [861, 114, 43, 96] }],
      delante: { f: 'cuerno-7.png', en: [794, 61, 30, 101] },
      pq: { base: [838.6, 156], alto: 150, giro: 10, espejo: true, corte: 160, de: 0.72 }, pqEn: [862, 70] },
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
    { t: '«Una boca que hablaba con gran insolencia»', ref: '7:8, 20, 25', c: '«Hablará palabras contra el Altísimo»: toma títulos y poderes de Dios: ocupar su lugar en la tierra y perdonar pecados (Marcos 2:7; Apocalipsis 13:5-6).' },
    { t: '«Hacía guerra contra los santos»', ref: '7:21, 25', c: 'La persecución de valdenses, albigenses y hugonotes, y la Inquisición.' },
    { t: '«Pensará en cambiar los tiempos y la Ley»', ref: '7:25', c: 'El sábado: el día de reposo se pasó al domingo y se quitó el mandamiento sobre las imágenes (CS 55-56 y 499). También quiso cambiar el calendario profético de Dios (Bohr, <i>Daniel 1-10</i>, p. 125).' },
    { t: 'Domina «tiempo, tiempos y medio tiempo»', ref: '7:25', c: '1.260 años: de 538 a 1798 d.C.' }],
  senasFuente: BOHR + ', p. 119, 124-127; CS 55-56 y 499.',
  /* v227 (Camilo): al presentar, las once señas en tres pasos. Son índices de `senas`. */
  senasGrupos: [{ t: 'De dónde sale', s: [0, 1, 2] }, { t: 'Qué es', s: [3, 5, 6] }, { t: 'Qué hace', s: [4, 7, 8, 9, 10] }],
  /* v208: TIEMPO, TIEMPOS Y MEDIO TIEMPO (7:25), después de las once señas: cuatro
     pasos que se arman sobre la imagen (la suma, un día por un año, el mismo
     tiempo en Apocalipsis y el cumplimiento de 538 a 1798 en la línea de tiempo).
     `citas`: lo que la hoja cita literal en RV1995 (Daniel 7 y Apocalipsis). */
  periodo: {
    tras: 'cuerno', t: 'Tiempo, tiempos y medio tiempo', s: '1.260 años · 538 – 1798 d.C.', de: 538, a: 1798,
    fotos: [['d2/e538', '538 d.C.', 'Los ostrogodos dejan Roma'], ['d2/e1798', '1798 d.C.', 'Louis-Alexandre Berthier toma preso a Pío VI']],
    pasos: [
      { t: 'Tiempo, tiempos y medio tiempo', v: 'suma', citas: [['Daniel 7:25', 'y serán entregados en sus manos hasta tiempo, tiempos y medio tiempo.']],
        nota: 'Un «tiempo» es un año, «tiempos» son dos años y «medio tiempo», medio año. El año profético tiene 360 días (doce meses de 30): 360 + 720 + 180 = 1.260 días.' },
      { t: 'Un día por un año', v: 'dia', citas: [],
        nota: 'En la profecía simbólica cada día vale un año. Dios mismo usa esa medida en Números 14:34 y en Ezequiel 4:6. Por eso los 1.260 días son 1.260 años.' },
      { t: 'El mismo tiempo en Apocalipsis', v: 'mismo', citas: [['Apocalipsis 12:14', 'un tiempo, tiempos y la mitad de un tiempo'], ['Apocalipsis 12:6', 'mil doscientos sesenta días'], ['Apocalipsis 11:3', 'mil doscientos sesenta días'], ['Apocalipsis 13:5', 'cuarenta y dos meses'], ['Apocalipsis 11:2', 'cuarenta y dos meses']],
        nota: 'Tres maneras de decir el mismo periodo: tres tiempos y medio, 42 meses (42 × 30) y 1.260 días.' },
      { t: 'De 538 a 1798', v: 'cumple', citas: [['Apocalipsis 13:3', 'Vi una de sus cabezas como herida de muerte, pero su herida mortal fue sanada.']],
        nota: 'En 538 los ostrogodos dejan Roma y empieza la supremacía papal. 1.260 años después, en 1798, el general Louis-Alexandre Berthier toma preso al papa Pío VI: es la herida de muerte. Herido en 1798, sana (Apocalipsis 13:3) y sigue haciendo guerra contra los santos hasta que el juicio le quita el dominio y Cristo vuelve (7:21-22, 26).' }],
    fuente: BOHR + ', p. 198-199; Bohr, <i>15 principios</i> 1:226-231; CS 309, 492 y 636.',
  },
  /* v210: LAS TRES FASES DEL JUICIO (Camilo, 14-oct: «y el asunto de las tres fases
     del juicio»). Después de los pasos del juicio, una mini línea de tiempo y tres
     paneles que se encienden en orden. `citas`: RV1995 literal (tests/test.js).
     v213 (Camilo, 14-oct 13:24): en el orden de Daniel 7, no el de Apocalipsis 20.
     La sentencia se da cuando el Hijo va al Padre y recibe el reino (7:13-14, 22);
     la ejecución, cuando los santos reciben el reino (7:22, 27). Apocalipsis 20
     (cap20.js) sigue con su esquema: la nota los une.
     v218 (Camilo, 14-oct 16:06: «según todo el material, ¿cuándo recibe el reino?»): al
     cierre de la gracia. En 1844 va al Padre «para recibir» el reino (7:13; PE 55), pero
     se le da «a la conclusión de su obra de mediador» (CS 533; CS 468, 481): cuando
     termina el juicio investigador, se levanta Miguel (12:1), «Hecho es» (Ap 22:11) y el
     número de sus súbditos está completo (CS 671). Antes de las plagas y de la venida
     (Bohr, Daniel 1-10, p. 288). Lucas 19:12, 15: va a recibir el reino y después vuelve. */
  /* v225 (revisión de Camilo, B6): al presentar, las fases van DESPUÉS del Hijo del hombre
     (la sentencia es el reino que se le da, 7:13-14): `tras: 'hijo'`. `ve`: la parte cuya
     imagen y color usan (el juicio). */
  fases: {
    tras: 'hijo', ve: 'juicio', t: 'Las tres fases del juicio', s: 'De 1844 a la segunda venida', de: 'Daniel 7',
    hitos: [['1844', 'Se abren los libros'], ['Al cierre de la gracia', 'El Hijo recibe el reino'], ['La venida', 'Los santos reciben el reino']],
    pasos: [
      { t: 'Investigación', n: 'Se abren los libros', ref: '7:9-10', cuando: 'Desde 1844 hasta el cierre de la gracia', donde: 'En el cielo', quien: 'El Padre juzga; Cristo es el abogado; los ángeles, testigos',
        que: 'Se abren los libros de los que profesaron ser hijos de Dios, primero los muertos y después los vivos. Se ve quién pertenece al reino.', para: 'Para que el universo vea que Dios es justo',
        citas: [['Daniel 7:10', 'El Juez se sentó y los libros fueron abiertos.'], ['Apocalipsis 14:7', 'la hora de su juicio ha llegado']], de: 0, a: 1 },
      { t: 'Sentencia', n: 'El Hijo recibe el reino', ref: '7:13-14, 22a', cuando: 'Al cierre de la gracia: termina su mediación y el Hijo del hombre recibe el reino, antes de las plagas y de la venida', donde: 'En el cielo', quien: 'El Padre le da el reino al Hijo, que está ante él desde 1844 (7:13-14)',
        que: 'El fallo es a favor de los santos y contra el cuerno. El reino son sus súbditos: cuando el último caso está decidido, el número está completo y el Padre le da el reino al Hijo. Termina su obra de mediador y se cierra la gracia: «se levantará Miguel» (12:1). Como el noble de Lucas 19:12 y 15, recibe el reino y después vuelve.', para: 'Para que el reino quede completo',
        /* v225: al presentar, solo la cita principal (7:14); las otras, en Explorar. */
        citasPres: 1, citas: [['Daniel 7:14', 'Y le fue dado dominio, gloria y reino'], ['Daniel 12:1', 'En aquel tiempo se levantará Miguel'], ['Apocalipsis 22:11', 'El que es injusto, sea injusto todavía'], ['Apocalipsis 11:15', 'Los reinos del mundo han venido a ser de nuestro Señor y de su Cristo']], de: 1, a: 1 },
      { t: 'Ejecución', n: 'Los santos reciben el reino', ref: '7:22b, 26-27', cuando: 'Cuando los santos reciben el reino, en la segunda venida', donde: 'Del cielo a la tierra', quien: 'Cristo vuelve como Rey de reyes',
        que: 'Cristo vuelve por los suyos y los santos reciben el reino. Al cuerno le quitan el dominio para que sea destruido y arruinado hasta el fin (7:26).', para: 'Para que los santos posean el reino para siempre',
        citas: [['Daniel 7:22', 'llegó el tiempo, y los santos recibieron el reino.'], ['Daniel 7:27', 'sean dados al pueblo de los santos del Altísimo']], de: 1, a: 2 }],
    nota: 'Es el orden de Daniel 7: se abren los libros (7:10), el Hijo recibe el reino (7:14) y después los santos lo reciben (7:22, 27). Apocalipsis 20 sigue el juicio más allá de la venida: los santos juzgan durante los mil años y el gran trono blanco cumple la sentencia de los perdidos. No se contradicen: la ejecución empieza en la venida y termina después del milenio.',
    fuente: 'CS 480-481, 533 y 671; PE 55 y 280; Bohr, <i>Daniel 1-10</i>, p. 121 y 288; Bohr, <i>15 principios</i> 2:306-307.',
  },
  cmpExtra: [{ id: 'sanado', img: 'cuerno', nombre: 'El cuerno, sanado de su herida', reino: 'Roma papal sanada', fechas: 'desde 1798 d.C. hasta la venida', de: 1798, a: 2026, c: '#8A5A3C',
    texto: 'este cuerno hacía guerra contra los santos y los vencía', ref: '7:21',
    corto: 'Herido en 1798, sana (Apocalipsis 13:3) y sigue haciendo guerra contra los santos hasta que el juicio le quita el dominio y Cristo vuelve (7:21-22, 26).' }],
  partes: [
 {id:'leon',img:'leon',nombre:'León con alas de águila',reino:'Babilonia',fechas:'605 – 539 a.C.',de:-605,a:-539,c:'#C9971C',
  texto:'La primera era como un león, y tenía alas de águila.',ref:'7:4',texto2:'Estas cuatro grandes bestias son cuatro reyes que se levantarán en la tierra.',ref2:'7:17',
  corto:'Babilonia, la cabeza de oro de Daniel 2. Las alas son la rapidez de sus conquistas.',
  interp:['El león es Babilonia (Jeremías 50:17), la misma cabeza de oro de Daniel 2: lo mejor de cada especie, como el oro entre los metales. Las alas de águila son la rapidez de sus conquistas (Habacuc 1:6-8).','Le arrancan las alas: Babilonia ya no conquista. Y recibe «corazón de hombre», un león sin valor. Así se vio Belsasar la noche en que cayó el reino, en 539 a.C. (5:6, 30).','Mira los verbos: sus alas «le fueron arrancadas», «fue levantada», «se le dio». Otro guía la historia.'],
  fuente:BOHR+', p. 17 y 122.'},
 {id:'oso',img:'oso',nombre:'Oso',reino:'Medo-Persia',fechas:'539 – 331 a.C.',de:-539,a:-331,c:'#8C98A6',
  texto:'semejante a un oso, la cual se alzaba de un costado más que del otro. En su boca, entre los dientes, tenía tres costillas',ref:'7:5',texto2:'Levántate y devora mucha carne.',ref2:'7:5',
  corto:'Medo-Persia, la plata de Daniel 2. Las tres costillas: Lidia, Babilonia y Egipto.',
  interp:['El oso es Medo-Persia (8:20), el pecho y los brazos de plata de Daniel 2. Se alza de un costado: de los dos pueblos, los persas llegaron a mandar más que los medos (8:3).','Las tres costillas son sus tres grandes conquistas: Lidia (546 a.C.), Babilonia (539 a.C.) y Egipto (525 a.C.).','«Levántate», se le dijo: alguien le da permiso para conquistar.'],
  fuente:BOHR+', p. 17 y 123; Smith, <i>Las profecías de Daniel</i>, p. 56.'},
 {id:'leopardo',img:'leopardo',nombre:'Leopardo de cuatro cabezas',reino:'Grecia',fechas:'331 – 168 a.C.',de:-331,a:-168,c:'#A85A2A',
  texto:'semejante a un leopardo, con cuatro alas de ave en sus espaldas',ref:'7:6',texto2:'Esta bestia tenía cuatro cabezas; y le fue dado dominio.',ref2:'7:6',
  corto:'Grecia, el bronce de Daniel 2. Cuatro alas: Alejandro Magno conquistó más rápido que nadie.',
  interp:['El leopardo es Grecia (8:21), el vientre y los muslos de bronce de Daniel 2. Un leopardo ya es veloz, y este tiene cuatro alas: Alejandro Magno conquistó de Egipto a la India en pocos años.','Las cuatro cabezas salieron después. Alejandro murió joven y, tras la batalla de Ipso (301 a.C.), sus generales se repartieron el imperio: Casandro, Lisímaco, Tolomeo y Seleuco. Daniel 8:8 lo muestra como cuatro cuernos.','«Le fue dado dominio»: no lo tomó, se lo dieron.'],
  fuente:BOHR+', p. 17 y 123; Smith, <i>Las profecías de Daniel</i>, p. 57.'},
 {id:'bestia',img:'cuarta',nombre:'La bestia espantosa',reino:'Roma imperial',fechas:'168 a.C. – 476 d.C.',de:-168,a:476,c:'#3E4651',
  texto:'la cuarta bestia, espantosa, terrible y en gran manera fuerte, la cual tenía unos grandes dientes de hierro',ref:'7:7',texto2:'La cuarta bestia será un cuarto reino en la tierra, el cual será diferente de todos los otros reinos',ref2:'7:23',
  corto:'Roma imperial. Sus dientes de hierro son las piernas de hierro de Daniel 2.',
  interp:['La primera etapa de Roma. No se parece a ningún animal: era «muy diferente de todas las bestias» (7:7). Sus dientes de hierro son las piernas de hierro de Daniel 2, y en 7:19 tiene además «uñas de bronce».','Devora, desmenuza y pisotea: el reino más fuerte y el que más duró, la monarquía de hierro. De Pidna (168 a.C.), cuando acaba con la monarquía macedónica, a 476 d.C., cuando cae Rómulo Augústulo, el último emperador de occidente.','Daniel no le da nombre.'],
  fuente:BOHR+', p. 124; Smith, <i>Las profecías de Daniel</i>, p. 57-58.'},
 {id:'cuernos',img:'cuarta',nombre:'Los diez cuernos',reino:'Roma dividida',fechas:'476 d.C. – hasta la venida',de:476,a:2026,hasta:'venida',c:'#4E6A8F',
  texto:'y tenía diez cuernos',ref:'7:7',texto2:'Los diez cuernos significan que de aquel reino se levantarán diez reyes',ref2:'7:24',
  corto:'Roma dividida: los reinos que salieron de Roma, como los diez dedos de Daniel 2.',
  interp:['La segunda etapa de Roma. Las tribus del norte se repartieron el imperio de occidente, y en 476 d.C. cayó el último emperador. Son los diez dedos de Daniel 2.','Alamanes, francos, burgundios, vándalos, suevos, visigodos, sajones, ostrogodos, lombardos y hérulos. De ellos salieron las naciones de Europa occidental, que nunca se volvieron a unir: Carlomagno, Carlos V y Napoleón lo intentaron.','Se unen solo «por una hora»: los diez reyes «recibirán autoridad como reyes por una hora, juntamente con la bestia» y «entregarán su poder y autoridad a la bestia» (Apocalipsis 17:12-13). Pero la unión no dura: «no se unirán el uno con el otro, como el hierro no se mezcla con el barro» (2:43).'],
  fuente:BOHR+', p. 124; Smith, <i>Las profecías de Daniel</i>, p. 24; Maxwell, <i>El porvenir del mundo revelado</i>, p. 39-40.'},
 {id:'cuerno',img:'cuerno',nombre:'El cuerno pequeño',reino:'Roma papal',fechas:'supremacía 538 – 1798 d.C.',de:538,a:1798,c:'#A0694A',
  texto:'otro cuerno pequeño salió entre ellos, y delante de él fueron arrancados tres cuernos de los primeros',ref:'7:8',texto2:'serán entregados en sus manos hasta tiempo, tiempos y medio tiempo.',ref2:'7:25',
  corto:'Roma papal: 1.260 años, de 538 a 1798. Herido en 1798, sana (Apocalipsis 13:3) y sigue haciendo guerra contra los santos hasta que el juicio le quita el dominio y Cristo vuelve (7:21-22, 26).',
  interp:['La tercera etapa de Roma: el poder religioso unido al político. Sale entre los diez cuernos, después de ellos (7:24), y arranca a tres: hérulos (493), vándalos (534) y ostrogodos (538).','Tiene ojos de hombre y una boca que habla «con gran insolencia» (7:8). Habla contra el Altísimo, persigue a los santos y piensa en cambiar los tiempos y la Ley (7:25).','Domina «tiempo, tiempos y medio tiempo»: 1.260 años, de 538 a 1798 d.C. En 1798 el general Louis-Alexandre Berthier entra en Roma y toma preso al papa Pío VI.','Hay una cuarta etapa: el papado sanado de su herida, «su herida mortal fue sanada» (Apocalipsis 13:3). Herido en 1798, sana y sigue haciendo guerra contra los santos hasta que el juicio le quita el dominio y Cristo vuelve (7:21-22, 26). Elena de White lo dice así: el hombre de pecado subsiste hasta la segunda venida (CS 636; 2 Tesalonicenses 2:8).'],
  fuente:BOHR+', p. 120-121, 124-127, 133-134; Smith, <i>Las profecías de Daniel</i>, p. 58; CS 492 y 636.'},
 {id:'juicio',img:'juicio',nombre:'El juicio',reino:'El juicio en el cielo',fechas:'desde 1844 d.C.',de:1844,a:2026,c:'#B45309',
  texto:'fueron puestos unos tronos y se sentó un Anciano de días',ref:'7:9',texto2:'El Juez se sentó y los libros fueron abiertos.',ref2:'7:10',
  corto:'Desde 1844 el Padre juzga en el cielo, y el fallo es a favor de los santos (7:22).',
  interp:['El juicio empieza después de los 1.260 años del cuerno (7:25-26), que terminan en 1798, y antes de la segunda venida. La fecha exacta la da Daniel 8:14: las 2.300 tardes y mañanas terminan en 1844.','El Anciano de días es Dios el Padre. Su trono tiene ruedas de fuego: es un trono que se mueve, al lugar santísimo del santuario celestial. Los millones que están delante de él son ángeles, testigos del tribunal.','Los libros se abren (7:10) y «se hizo justicia a los santos» (7:22). Al cuerno «le quitarán su dominio, para que sea destruido» (7:26).'],
  fuente:'CS 477 y 533-536; PE 55; '+BOHR+', p. 120-121, 276-280.',
  /* v205: la escena del juicio por pasos: la imagen se acerca a cada parte
     (`caja`: x, y, ancho y alto en píxeles de juicio.webp, 1200 × 675, en 16:9). */
  pasos:[
   {t:'Fueron puestos unos tronos',ref:'7:9',texto:'Estuve mirando hasta que fueron puestos unos tronos',caja:[150,40,880,495],
    nota:'Los tronos se colocan porque antes no estaban: en el cielo empieza algo nuevo. Es 1844, cuando terminan las 2.300 tardes y mañanas (8:14).'},
   {t:'Se sentó un Anciano de días',ref:'7:9',texto:'y se sentó un Anciano de días. Su vestido era blanco como la nieve; el pelo de su cabeza, como lana limpia',caja:[400,20,400,225],
    nota:'Dios el Padre preside el juicio. Blanco y lana limpia: pureza y eternidad. En visión, el Padre se levanta y en un carro de llamas entra en el lugar santísimo, y se sienta (PE 55).'},
   {t:'Un río de fuego',ref:'7:9-10',texto:'su trono, llama de fuego, y fuego ardiente las ruedas del mismo. Un río de fuego procedía y salía de delante de él',caja:[250,200,680,383],
    nota:'Un trono con ruedas es un trono que se mueve, como el carro de Ezequiel 1: el Padre pasa al lugar santísimo. Los millones que están delante de él son ángeles, testigos del tribunal (CS 533).'},
   {t:'Los libros fueron abiertos',ref:'7:10',texto:'El Juez se sentó y los libros fueron abiertos.',caja:[380,290,680,383],ms:8200,
    nota:'El Juez se sienta y empieza la sesión. Los libros guardan cada vida: el libro de la vida, el de memoria y el registro de los pecados (Apocalipsis 20:12; Malaquías 3:16; Eclesiastés 12:14). El fallo es a favor de los santos: «se hizo justicia a los santos del Altísimo» (7:22).'}],
  /* v210: LA ANIMACIÓN DEL JUICIO (Camilo, 14-oct: «se puede agregar una animación
     para cuando dice: el Juez se sentó y los libros fueron abiertos»). Sobre
     juicio.webp, en píxeles de 1200 × 675: la luz del trono (el rostro nunca se
     dibuja: queda dentro de la luz), los tronos que se colocan, el río de fuego,
     los «millares de millares» como chispas de luz y los libros de la escena.
     El libro grande que se abre va encima, en HTML; si existe `libro` (un libro
     abierto con fondo transparente), se usa esa imagen en vez del dibujo. */
  anim:{trono:[600,62],sentado:[600,175],
    tronos:[[64,262],[150,262],[236,270],[964,270],[1050,262],[1136,262],[470,226],[730,226]],
    rio:[[600,318],[545,348],[480,382],[548,408],[640,436],[692,470],[690,520],[680,580]],
    libros:[[215,468],[532,484],[915,468]],
    camara:[[150,0,900,506],[330,0,540,304],[250,225,800,450]],
    libro:'libro.png'}},
 /* v211: `era` lo pone en la época del juicio al comparar (no tiene tramo propio en la línea de tiempo). */
 {id:'hijo',img:'hijo',nombre:'El Hijo del hombre',reino:'Cristo llega al Anciano de días',fechas:'desde 1844 d.C., en el juicio',de:null,era:1844,c:'#0E7490',
  texto:'con las nubes del cielo venía uno como un hijo de hombre; vino hasta el Anciano de días',ref:'7:13',texto2:'su dominio es dominio eterno, que nunca pasará',ref2:'7:14',
  corto:'1844: Cristo va al Padre, no a la tierra. Va al juicio a recibir el reino, que se le da al cierre de la gracia. No es la piedra de Daniel 2: esa es la segunda venida, después.',
  interp:['Uno «como un hijo de hombre» es Cristo. Las nubes son ángeles (Salmo 68:17) que lo llevan ante el Padre, al juicio, no a la tierra (CS 477).','Pasa en 1844, cuando empieza el juicio (8:14). No es la segunda venida: la piedra de Daniel 2 cae después, cuando el juicio termina y Cristo vuelve por los suyos.','Va a recibir dominio, gloria y reino, que se le dan al terminar su obra de mediador, al cierre de la gracia (7:14; CS 533). Después vuelve por los suyos: el reino se da también «al pueblo de los santos del Altísimo» (7:27), herederos con Cristo (Romanos 8:17).'],
  fuente:'CS 477 y 533; '+BOHR+', p. 280 y 288.',
  pasos:[
   {t:'Con las nubes del cielo',ref:'7:13',texto:'con las nubes del cielo venía uno como un hijo de hombre; vino hasta el Anciano de días, y lo hicieron acercarse delante de él.',caja:[0,60,780,439],
    nota:'Cristo va al Padre, no a la tierra: llega al juicio en el cielo (CS 477).'},
   {t:'Le fue dado dominio',ref:'7:14',texto:'Y le fue dado dominio, gloria y reino, para que todos los pueblos, naciones y lenguas lo sirvieran',caja:[540,0,660,371],
    nota:'Recibe el reino al terminar el juicio, cuando se cierra la gracia. Después vuelve por los suyos: el reino se da también «al pueblo de los santos del Altísimo» (7:27).'}]},
 /* v218: la segunda venida en Daniel 7 (Camilo, 14-oct 16:01): los santos reciben el reino y al
    cuerno le quitan el dominio. Es la piedra de Daniel 2. El reino eterno (7:27), después. */
 {id:'santos',img:'d2/e-piedra',nombre:'Los santos reciben el reino',reino:'La segunda venida',fechas:'futuro',de:null,fin:'venida',c:'#6B7B5A',
  texto:'y llegó el tiempo, y los santos recibieron el reino.',ref:'7:22',texto2:'Pero se sentará el Juez, y le quitarán su dominio, para que sea destruido y arruinado hasta el fin,',ref2:'7:26',
  corto:'Cristo vuelve: los santos reciben el reino y al cuerno le quitan el dominio. Es la piedra de Daniel 2.',
  interp:['Es la ejecución del juicio. El Hijo ya recibió el reino en el cielo; ahora vuelve como «Rey de reyes y Señor de señores» (Apocalipsis 19:16) y los santos lo reciben (7:22).','Al cuerno le quitan el dominio (7:26), como la piedra deshace la imagen en sus pies (2:34). Los santos van con Cristo; el reino eterno llena la tierra después de los mil años (Apocalipsis 20:4; 21:1).'],
  fuente:'CS 480 y 698-703; '+BOHR+', p. 288.'},
 {id:'reino',img:'d2/e-monte',nombre:'El reino eterno',reino:'Dado a los santos',fechas:'después de los mil años, para siempre',de:null,fin:'reino',c:'#0E7490',
  texto:'Después recibirán el reino los santos del Altísimo, y poseerán el reino hasta el siglo, eternamente y para siempre.',ref:'7:18',texto2:'cuyo reino es reino eterno, y todos los dominios lo servirán y obedecerán.',ref2:'7:27',
  corto:'Las bestias pasan. El reino de Dios queda para siempre, y es de los santos.',
  interp:['Cuatro veces el capítulo termina en el reino: lo recibe el Hijo del hombre (7:14) y lo reciben los santos (7:18, 22, 27). El reino eterno es el gran monte de Daniel 2 (2:35, 44): llena la tierra después de los mil años, cuando la tierra es hecha nueva (Apocalipsis 21:1).','El juicio no es contra el pueblo de Dios: es a favor de él (7:22).'],
  fuente:BOHR+', p. 121; CS 732-737.'},
  ],
};
/* v222: DANIEL 8 (Camilo, 14-oct: «lo mismo de Daniel 2 y 7: premium, cinematográfico,
   interactivo»). Lámina de escenas como Daniel 7, con sus propios movimientos (`mov` de
   cada parte, ver lamMov en app.js) sobre las imágenes de Camilo (laminas/d8/) y las
   piezas que arma tools/lamina-d8.py de esas mismas imágenes:
   - el carnero sube con un cuerno y el más alto «creció después» (8:3);
   - el macho cabrío viene del poniente sin tocar tierra, hiere al carnero y le quiebra
     los dos cuernos (8:5-7);
   - el gran cuerno se quiebra y salen cuatro hacia los cuatro vientos (8:8);
   - el cuerno pequeño crece al sur, al oriente y a la tierra gloriosa (Roma imperial,
     8:9) y después hacia arriba, hasta el ejército del cielo (Roma papal, 8:10-12);
   - el santuario pisoteado: se apaga lo que el continuo representa (8:11-13);
   - las 2.300 tardes y mañanas se arman sobre una línea: 457 a.C., las setenta semanas
     (27, 31 y 34 d.C.) y 1844, el juicio de Daniel 7 (periodo, como los 1.260 años).
   Lectura de Camilo: el cuerno pequeño de Daniel 8 es Roma en sus fases, imperial y
   papal (las mismas de Daniel 2 y 7); 550 a.C.; 2.300 años de 457 a.C. a 1844, con las
   setenta semanas cortadas de ellos; la purificación es el Día de la Expiación, el
   juicio investigador. Textos literales RV1995 (tests/test.js). */
const D2_A_D8 = { plata: 'carnero', bronce: 'macho', hierro: 'cuerno', barro: 'cielo' };
/* v227 (Camilo: «los generales de Alejandro, interactivo; reutilizable para Daniel 11»): EL
   REPARTO DE UN REINO. Un mapa de los cuatro vientos que se toca, armado solo con estos datos
   (lamReparto en app.js): no depende de ninguna lámina. Una parte lo usa con `reparto: '<id>'`;
   su paso 1 es la parte y desde el 2, un paso por cada uno de `gen` y uno final (`fin`).
   `rosa`: el centro y el largo de cada brazo, en las coordenadas de la imagen (1200 × 675), la
   misma rosa del cuerno pequeño para que las dos escenas se lean juntas. Cada uno de `gen`:
   nombre, tierra, viento (`v`), dónde cae en el mapa (`en`) y su final (`roma`). Las fuentes van
   en la nota de cada paso. */
const ROSA_VIENTOS = { c: [620, 350], dx: 380, dy: 210, vientos: [['norte', 'n'], ['oriente', 'e'], ['sur', 's'], ['poniente', 'o']] };
const REPARTOS = {
  /* Daniel 8:8, 22; 11:4. Después de Ipso (301 a.C.): «Casandro tenía las regiones occidentales,
     Lisímaco, las del norte, Seleuco los países orientales, y Tolomeo la porción meridional»
     (Smith, p. 88; Maxwell, p. 113). */
  alejandro: { fondo: 'noche', rosa: ROSA_VIENTOS,
    fin: ['No será para sus descendientes', 'Alejandro IV († 311 a.C.) y Heracles († 309 a.C.) no heredaron: el reino quedó para cuatro generales (11:4)'],
    gen: [{ t: 'Casandro', s: 'Macedonia y Grecia', v: 'o', viento: 'el oeste', en: [450, 230], roma: 'Roma: Macedonia, 168 a.C.' },
      { t: 'Lisímaco', s: 'Tracia y Asia Menor', v: 'n', viento: 'el norte', en: [830, 176], roma: 'Seleuco lo vence: 281 a.C.' },
      { t: 'Seleuco', s: 'Siria y Babilonia', v: 'e', viento: 'el oriente', en: [930, 250], roma: 'Roma: Siria, 65 a.C.' },
      { t: 'Tolomeo', s: 'Egipto', v: 's', viento: 'el sur', en: [520, 565], roma: 'Roma: Egipto, 30 a.C.' }] },
};

LAMINAS.d8 = {
  tipo: 'escenas',
  libro: 'Daniel 8',
  titulo: 'El carnero, el macho cabrío y el santuario',
  dir: 'd8/',
  cartel: { f: 'ulai', lugar: 'Susa, junto al río Ulai', cuando: 'En el tercer año de Belsasar, hacia 550 a.C.', ref: 'Daniel 8:1-2', lado: 'i',
    cita: { ref: 'Daniel 8:3', texto: 'Alcé los ojos y miré, y había un carnero que estaba delante del río, y tenía dos cuernos' } },
  miniF: 'portada', inicioF: 'ulai', portada: 'portada',
  verTodo: 'La visión',
  invita: 'El carnero, el macho cabrío, los cuernos y las 2.300 tardes y mañanas: cada parte se mueve como en el texto, con su significado, sus fechas y su fuente.',
  intro: { titulo: 'Un carnero y un macho cabrío', ref: 'Daniel 8:3, 5', texto: 'había un carnero que estaba delante del río, y tenía dos cuernos … un macho cabrío venía del lado del poniente sobre la faz de toda la tierra, sin tocar tierra',
    nota: 'La historia de Daniel 2 y 7 contada otra vez, ahora con animales del santuario. Empieza en Medo-Persia, sigue con Grecia y con Roma en dos fases, y termina en el santuario purificado: 1844.',
    datos: [['2', 'animales del santuario'], ['2.300', 'tardes y mañanas'], ['1844', 'el santuario purificado']] },
  /* Las piezas que se mueven: se piden con la lámina (lamPrecarga). */
  precarga: ['llanura', 'noche', 'carnero-cuerpo.webp', 'carnero-cuerno-a.webp', 'carnero-cuerno-b.webp', 'macho-cuerpo.webp', 'macho-cuerno.webp',
    'cabeza.webp', 'cuerno-1.webp', 'cuerno-2.webp', 'cuerno-3.webp', 'cuerno-4.webp', 'd7/cuerno-pequeno.png', 'santuario', 'purificado'],
  solapa: [],
  tiempo: ['carnero', 'macho', 'cuatro', 'cuerno', 'cielo', 'purificado'],
  /* Los años que Daniel 8 no cubre: lo dice la línea de tiempo en vez de «antes de Nabucodonosor». */
  vacios: [[-620, -539, 'Babilonia: Daniel 8 empieza en Medo-Persia; Babilonia está por caer (539 a.C.)'], [476, 538, 'Roma dividida: Daniel 8 pasa de Roma imperial a Roma papal', 'pequeno'],
    /* v232: de 1798 a 1844 decía «Antes de Nabucodonosor». Corren todavía las 2.300 tardes y mañanas (8:14). */
    [1798, 1844, 'Las 2.300 tardes y mañanas: siguen corriendo hasta 1844 (8:14)', 'santuario']],
  futuro: [{ id: 'quebrantado', de: 2026, a: 2226, t: 'La segunda venida', s: 'el cuerno es quebrantado, no por mano humana', f: 'd2/e-piedra', ult: 'venida' },
    { id: '', de: 2226, a: 2426, t: 'Los mil años', s: 'desde la venida y la primera resurrección: la tierra desolada (CS 718)', f: 'd2/e-piedra', ult: 'desolada' },
    { id: '', de: 2426, a: 2626, t: 'El reino eterno', s: 'Daniel 8 no lo muestra: llega en Daniel 12:1-3', f: 'd2/e-monte', ult: 'reino' }],
  historia: [
    { f: 'ulai', titulo: 'En el tercer año de Belsasar', ref: 'Daniel 8:1-2', texto: 'En el año tercero del reinado del rey Belsasar, yo, Daniel, tuve una visión, después de aquella que había tenido antes. … En la visión, pues, me veía junto al río Ulai.',
      nota: 'Hacia el 550 a.C., unos tres años después de Daniel 7. Babilonia caerá once años después (Daniel 5). En visión, Daniel está en Susa, que será capital de Persia (Smith, <i>Las profecías de Daniel</i>, p. 19): la visión empieza donde empiezan las 2.300 tardes y mañanas, en tiempos de Persia.' },
  ],
  despues: { f: 'gabriel', titulo: 'Gabriel, enseña a éste la visión', ref: 'Daniel 8:16-18', texto: 'Gabriel, enseña a éste la visión. … Él me tocó y me hizo estar en pie.',
    nota: 'Gabriel explica los animales y los cuernos (8:19-26) y dice que «la visión es para el tiempo del fin» (8:17). Lo del tiempo queda sin explicar: Daniel queda «quebrantado» y no la entiende (8:27). Gabriel vuelve en Daniel 9 a explicar desde cuándo se cuentan las 2.300 tardes y mañanas (9:22-25).' },
  cierre: { f: 'purificado', ref: 'Daniel 8:17', texto: 'Entiende, hijo de hombre, que la visión es para el tiempo del fin.',
    titulo: 'La visión es para el tiempo del fin', nota: 'Desde 1844 el santuario se purifica: es el juicio de Daniel 7. Hoy vivimos en ese tiempo. Después el cuerno será quebrantado, «aunque no por mano humana» (8:25).' },
  aplica: { pregunta: '¿Qué parte de la obra diaria de Cristo dejaste en manos de otro?', ref: 'Daniel 8:11', texto: 'por él fue quitado el sacrificio continuo',
    nota: 'El continuo es el ministerio continuo de Cristo en el santuario del cielo, que el papado quitó en la tierra (Bohr, <i>Daniel 1-10</i>, p. 307).' },
  paraleloCols: ['Daniel 8', 'Daniel 2', 'Daniel 7', 'Reino'],
  paraleloTit: 'Daniel 2, 7 y 8 dicen lo mismo',
  paraleloNota: 'Daniel 8 empieza en Medo-Persia: Babilonia está por caer (539 a.C.). Los dos animales son del santuario, y Roma, en sus dos fases, es un solo cuerno.',
  /* Con Daniel 2 y Daniel 7: la cuarta columna es el metal que se enciende en la estatua
     chica; la sexta, la parte de Daniel 7 cuya imagen va debajo. */
  comparar: 'd2', comparar2: 'd7', conTxt: 'Con Daniel 2 y 7',
  /* v226: en el santuario la comparación va debajo de la imagen (la columna tapaba la mesa); v227: también en el santuario purificado, el mismo cuarto. */
  d2Abajo: ['santuario', 'purificado'],
  agrega: 'Daniel 2 no lo muestra: lo agrega Daniel 8',
  noTrae: { '-605': 'Empieza en Medo-Persia: Babilonia está por caer (539 a.C.)', '476': 'Pasa de Roma imperial a Roma papal' },
  paralelo: [['carnero', 'Pecho y brazos de plata', 'Medo-Persia', 'plata', 'Oso', 'oso'],
    ['macho', 'Vientre y muslos de bronce', 'Grecia', 'bronce', 'Leopardo', 'leopardo'],
    ['cuatro', 'Vientre y muslos de bronce', 'Grecia dividida en cuatro', 'bronce', 'Las cuatro cabezas del leopardo', 'leopardo'],
    ['cuerno', 'Piernas de hierro', 'Roma imperial', 'hierro', 'La bestia espantosa', 'bestia'],
    ['cielo', 'Hierro mezclado con barro', 'Roma papal', 'barro', 'El cuerno pequeño', 'cuerno'],
    ['santuario', 'Hierro mezclado con barro', 'Roma papal', 'barro', 'El cuerno pequeño', 'cuerno'],
    ['purificado', 'No aparece: lo agrega Daniel 7 y 8', 'El juicio en el cielo, desde 1844', null, 'El juicio', 'juicio'],
    ['quebrantado', 'La piedra que hiere los pies', 'La segunda venida', ['piedra'], 'Los santos reciben el reino', 'santos']],
  paraleloFuente: BOHR + ', p. 20, 83, 119-121; CS 492 y 636.',
  retoSin: [],
  reto: [
    { q: '¿Qué símbolo es «los reyes de Media y de Persia»?', ok: 'carnero', e: '8:20 · El carnero de dos cuernos; el más alto, que creció después, es Persia.' },
    { q: '¿Qué símbolo es «el rey de Grecia»?', ok: 'macho', e: '8:21 · El macho cabrío; su cuerno grande, el primer rey: Alejandro Magno.' },
    { q: '¿Qué parte muestra el reino repartido hacia los cuatro vientos?', ok: 'cuatro', e: '8:8, 22 · Cuatro reinos: Casandro, Lisímaco, Seleuco y Tolomeo.' },
    { q: '¿Qué creció «mucho hacia el sur y el oriente, y hacia la tierra gloriosa»?', ok: 'cuerno', e: '8:9 · Roma imperial: Macedonia (168 a.C.), Siria (65), Judea (63) y Egipto (30).' },
    { q: '¿Qué parte creció «hasta llegar al ejército del cielo»?', ok: 'cielo', e: '8:10 · La fase papal de Roma: pelea contra Dios y su pueblo.' },
    { q: '¿Qué pasa al terminar las 2.300 tardes y mañanas?', ok: 'purificado', e: '8:14 · En 1844 el santuario es purificado: empieza el juicio.' },
    { q: '«Será quebrantado, aunque no por mano humana». ¿Cuándo?', ok: 'quebrantado', e: '8:25 · En la segunda venida, como la piedra de Daniel 2.' }],
  escenas: LAMINAS.d2.escenas.filter(e => e.y >= -539 && e.y <= 2026 && e.y !== 1844).map(e => {
    const x = Object.assign({}, e, { f: 'd2/' + e.f });
    if (e.parte) { if (D2_A_D8[e.parte]) x.parte = D2_A_D8[e.parte]; else delete x.parte; }
    return x; }),
  /* v230: también 331 (Grecia), 301 (los cuatro reinos) y 476 (Roma dividida). */
  /* v233 (Camilo: «que abarque todo pero no se vea apeñuscado»): la línea de tiempo como un mapa de
     metro, sin escala. `est`: las estaciones [año, nombre, clase, nombre más corto], con las palabras de
     la lámina (cada estación es el comienzo de su parte);
     el futuro no tiene año: la venida y el reino van en el año de su tramo (2226, 2526) y los mil años
     son el tramo entre las dos. `l2`: la segunda línea, paralela [de, a, nombre, color]. */
  metro: { est: [[-539, 'Medo-Persia'], [-457, 'La orden de Artajerjes', '', 'Artajerjes'], [-331, 'Grecia'], [-301, 'Cuatro reinos (Ipso)', '', 'Cuatro reinos'], [-168, 'Roma imperial', '', 'Roma'], [476, 'Roma dividida'], [538, 'Roma papal'], [1798, 'La herida'], [1844, 'El juicio', 'juicio'], [2026, 'Hoy', 'hoy'], [2226, 'La venida', 'fut'], [2526, 'El reino', 'fut']],
    l2: [[-457, 1844, 'Las 2.300 tardes y mañanas', '#B45309']] },
  marcas: [[-539, '539 a.C.'], [-331, '331<i> a.C.</i>'], [-301, '301<i> a.C.</i>'], [-168, '168<i> a.C.</i>'], [1, '1<i> d.C.</i>', 'menor'], [476, '476<i> d.C.</i>'], [538, '538<i> d.C.</i>'],
    [1798, '1798'], [1844, '1844'], [2026, 'hoy'], [2226, 'la venida', 'fut'], [2326, 'mil años', 'fut'], [2526, 'el reino', 'fut'], [2476, 'futuro', 'tel']],
  hitos: [-539, -457, -331, -301, -168, 34, 538, 1798, 1844],
  /* LO QUE SE MUEVE, en píxeles de la escena (1200 × 675). Las piezas, en píxeles de su
     imagen (carnero-solo.png 751 × 800, macho-cabrio-solo.png 800 × 763,
     cuernos-cuatro.png 758 × 800): `caja` es [x0, y0, x1, y1] y `base`, el punto de donde
     sale el cuerno (crece y se quiebra desde ahí). `en`: [x, y, alto] en la escena. */
  mov: {
    carnero: { f: 'carnero-cuerpo.webp', w: 751, h: 800, en: [150, 200, 420],
      a: { f: 'carnero-cuerno-a.webp', caja: [514, 97, 676, 211], base: [612, 168] },
      b: { f: 'carnero-cuerno-b.webp', caja: [608, 0, 730, 181], base: [690, 172] },
      dirs: [{ t: 'al poniente', s: 'Babilonia 539 a.C.', a: [560, 330], b: [930, 330] }, { t: 'al norte', s: 'Lidia 546 a.C.', a: [470, 210], b: [600, 50] },
        { t: 'al sur', s: 'Egipto 525 a.C.', a: [540, 470], b: [860, 540] }] },
    macho: { f: 'macho-cuerpo.webp', w: 800, h: 763, cuerno: { f: 'macho-cuerno.webp', caja: [0, 0, 133, 241], base: [86, 228] },
      choque: { de: [1260, 70], a: [500, 145], fin: [455, 150], alto: 360, golpe: [530, 300] },
      quiebra: { en: [355, 92, 470] },
      batallas: 'Gránico 334 · Iso 333 · Arbela 331 a.C.' },
    /* v223: la cabeza rubia de Camilo (758 × 800), la misma del macho cabrío que salta, con el
       gran cuerno quebrado en el centro. `et`: dónde va el nombre (`a`: cómo se ancla). */
    cabeza: { f: 'cabeza.webp', w: 758, h: 800, en: [316, 50, 600],
      cuernos: [{ f: 'cuerno-1.webp', caja: [0, 132, 318, 253], base: [300, 226], t: 'Casandro', s: 'Macedonia y Grecia · oeste', et: [300, 262], a: 'd' },
        { f: 'cuerno-2.webp', caja: [91, 0, 361, 188], base: [330, 176], t: 'Lisímaco', s: 'Tracia y Asia Menor · norte', et: [440, 34], a: 'd' },
        { f: 'cuerno-3.webp', caja: [400, 0, 656, 193], base: [428, 176], t: 'Seleuco', s: 'Siria y Babilonia · oriente', et: [760, 34], a: 'i' },
        { f: 'cuerno-4.webp', caja: [449, 131, 758, 249], base: [472, 224], t: 'Tolomeo', s: 'Egipto · sur', et: [900, 262], a: 'i' }] },
    /* v223: el cuerno pequeño sobre el mapa, en el orden del texto (Camilo, 14-oct: la
       interacción no se entendía). 8:8: los cuatro vientos del cielo, la rosa de los vientos
       sobre el mundo griego. 8:9: «de uno de ellos»: en hebreo «ellos» (mehem) es masculino y
       «cuernos» (qeranot) femenino, así que «ellos» no son los cuernos: sale de uno de los
       vientos. El texto no dice de cuál. v225 (Camilo, 15-oct: «nunca saques deducciones tú»):
       el oeste no es deducción de la app; lo concluye Hasel en el Simposio sobre Daniel (SIMP),
       p. 396-397 (la gramática: de un viento, no de un cuerno) y p. 399 («el punto cardinal del
       que salió el "cuerno pequeño" solo puede ser el oeste»; «Roma salió del oeste (desde el
       punto de vista de Israel)»). La lectura «de uno de los cuernos» quedó fuera (decisión de Camilo). Después crece, en el
       orden de la historia: al oriente (Macedonia, Siria), a la tierra gloriosa (Judea) y al sur
       (Egipto). Desde Roma, Macedonia y Siria quedan al oriente y Egipto al sur (Smith, Maxwell).
       `rosa`: el centro y el largo de cada brazo; `pasos`: el rótulo de arriba en cada tiempo. */
    mapa: { pq: 'd7/cuerno-pequeno.png', roma: [190, 330],
      rosa: ROSA_VIENTOS,
      reinos: [{ t: 'Macedonia', s: 'Casandro', en: [450, 230] }, { t: 'Tracia y Asia Menor', s: 'Lisímaco', en: [830, 176] }, { t: 'Siria', s: 'Seleuco', en: [930, 250] },
        { t: 'Judea', s: 'la tierra gloriosa', en: [800, 440], g: true }, { t: 'Egipto', s: 'Tolomeo', en: [520, 565] }],
      /* `r`: el reino que toma, en el orden en que lo toma. */
      va: [{ r: 0, t: 'al oriente', s: '168 a.C.' }, { r: 2, t: 'al oriente', s: '65 a.C.' }, { r: 3, t: 'hacia la tierra gloriosa', s: '63 a.C.' }, { r: 4, t: 'hacia el sur', s: '30 a.C.' }],
      pasos: [['1 · Los cuatro vientos del cielo', 'el reino de Alejandro, repartido hacia los cuatro puntos cardinales (8:8)'],
        ['2 · «De uno de ellos»: de uno de los cuatro vientos (8:8-9)', 'el texto no dice cuál; el Simposio sobre Daniel concluye que el oeste: “Roma salió del oeste” (p. 399)'],
        ['3 · Crece al oriente, a la tierra gloriosa y al sur', 'Roma imperial, de 168 a 30 a.C. (8:9)'],
        ['4 · Después crece hacia arriba', 'hasta el ejército del cielo: Roma papal (8:10)']] },
    cielo: { pq: 'd7/cuerno-pequeno.png', base: [600, 655], alto: 470, principe: [600, 40] },
    /* v224: «EL CONTINUO» Y «LA VERDAD» (8:11-12). El continuo (hatamid) es el servicio de cada
       día en el atrio y el lugar santo, nunca en el santísimo (Bohr, Daniel 1-10, p. 308); en la
       Edad Media Cristo todavía no había entrado al santísimo (p. 309). Cuatro piezas, cada una
       con lo que el cuerno puso en su lugar en la tierra (p. 309-313): el altar del holocausto (en
       el atrio), la mesa de los panes y el candelabro (en el lugar santo) y el altar del incienso,
       delante del velo: la intercesión de Cristo (Hebreos 7:25), cambiada por el confesionario,
       María y los santos. «La verdad» (8:12) es aparte: la Ley y el sábado (7:25), no un mueble
       del cuarto. El arca no va: está detrás del velo, en el santísimo.
       LAS COORDENADAS SON DE LA IMAGEN: `en` es [x, y] del punto en la escena (1200 × 675).
       Sin `en`, la seña va sin punto. v225: la imagen nueva de Camilo (santuario.webp, 1600 × 900
       de su original de 1672 × 941): el lugar santo visto desde la entrada, el velo con querubines,
       el altar del incienso al centro con el humo, el candelabro de siete brazos a la izquierda,
       la mesa con dos pilas de seis panes a la derecha y el cuerno que sube de una nube negra
       abajo al centro. v226 (revisión: cinco rótulos tapaban la imagen): sobre la imagen solo un
       punto numerado por objeto (1 mesa, en los panes; 2 candelabro; 3 altar del incienso, arriba
       de la punta del cuerno) y las cinco señas en una lista debajo de la imagen. */
    santuario: { cosas: [
      { id: 'altar', t: 'El altar del holocausto', s: 'en el atrio: Cristo, sacrificado una vez', c: 'la misa' },
      { id: 'mesa', t: 'La mesa de los panes', s: 'la Palabra de Dios', c: 'la tradición', en: [1000, 300] },
      { id: 'candelabro', t: 'El candelabro', s: 'la luz: Cristo y su Espíritu', c: 'la iglesia a oscuras', en: [166, 330] },
      { id: 'incienso', t: 'El altar del incienso', s: 'la intercesión de Cristo (Hebreos 7:25)', c: 'el confesionario, María y los santos', en: [585, 292] }],
      verdad: { t: 'La verdad', s: 'la Ley de Dios y el sábado (8:12)', c: 'pensó cambiar los tiempos y la Ley (7:25)' } },
  },
  /* v223: la primera frase de la línea de tiempo (antes decía «De 605 a.C.» en todas). */
  tq0: 'De Medo-Persia (539 a.C.) hasta hoy, y lo que viene',
  /* v223: LAS 2.300 TARDES Y MAÑANAS EN LA LÍNEA DE TIEMPO (Camilo, 14-oct: «¿para la línea de
     tiempo de Daniel 8 deberías agregar las 2.300 tardes y mañanas en detalle?»). Debajo de la
     pista: los 2.300 años de 457 a.C. a 1844 a escala, con las 70 semanas (490 años) cortadas al
     principio y los 1.810 que quedan; debajo, los reinos que cruzan; y las 70 semanas ampliadas
     (7, 62 y 1, sin escala, como el diagrama de CS 374). Cada hito se toca. La cuenta: otoño de
     457 a.C. + 2.300 años = otoño de 1844 (sin año cero: 2.300 − 457 + 1); 457 − 49 = 408 a.C.;
     483 − 457 + 1 = 27 d.C.; 27 + 3½ = primavera de 31; 27 + 7 = 34; 34 + 1.810 = 1844.
     Fuente: CS 372-376 y 451; Bohr, Daniel 1-10, p. 325-336; apuntes «2300 tardes y mañanas». */
  linea2300: {
    de: -470, a: 1900,
    reinos: [[-457, -331, 'Persia', '#8C98A6'], [-331, -168, 'Grecia', '#A85A2A'], [-168, 476, 'Roma imperial', '#3E4651'], [538, 1798, 'Roma papal', '#A0694A'], [1844, 1900, 'El juicio', '#B45309']],
    hitos: [
      { y: -457, t: '457 a.C.', s: 'La orden de Artajerjes I', n: 'En su séptimo año, contado de otoño a otoño (Esdras 7:7-26). Desde aquí se cuentan juntas las 2.300 tardes y mañanas y las 70 semanas: «desde la salida de la orden para restaurar y edificar a Jerusalén» (Daniel 9:25).', z: 0, b: 'abajo' },
      { y: -408, t: '408 a.C.', s: 'Jerusalén reedificada', n: 'Siete semanas, 49 años: «se volverán a edificar la plaza y el muro en tiempos angustiosos» (Daniel 9:25).', z: 22, zr: 'abajo' },
      { y: 27, t: '27 d.C.', s: 'El Mesías Príncipe', n: 'Sesenta y dos semanas más: 483 años desde 457 a.C. (483 − 457 + 1, sin año cero). En el otoño de 27, Jesús es ungido en su bautismo (Lucas 3:1, 21-22; Hechos 10:38).', z: 70 },
      { y: 31, t: '31 d.C.', s: 'La cruz', n: '«A la mitad de la semana hará cesar el sacrificio y la ofrenda» (Daniel 9:27): en la primavera de 31, tres años y medio después de su bautismo, Cristo muere en la cruz.', z: 85, zr: 'abajo' },
      { y: 34, t: '34 d.C.', s: 'Esteban; el evangelio a los gentiles', n: 'Terminan las 70 semanas, los 490 años cortados para el pueblo judío. Esteban muere apedreado y el evangelio sale a los gentiles (Hechos 7:54-60; 8:1-4).', z: 100, b: 'arriba' },
      { y: 1844, t: '1844', s: 'El santuario purificado', n: 'Quedan 2.300 − 490 = 1.810 años, y 34 + 1.810 = 1844. El 22 de octubre, el Día de la Expiación, Cristo empieza en el cielo el juicio de Daniel 7:9-10.', b: 'abajo' }],
  },
  /* LAS 2.300 TARDES Y MAÑANAS (8:13-14), después del santuario purificado: la cuenta se
     arma sobre una línea, como los 1.260 años de Daniel 7. */
  periodo: {
    tras: 'purificado', t: 'Las 2.300 tardes y mañanas', s: '2.300 años · 457 a.C. – 1844 d.C.', de: -457, a: 1844,
    rot: 'Daniel 8:14', n: '2.300 años', rango: '457 a.C. – 1844 d.C.', tq: 'Las 2.300 tardes y mañanas',
    pasos: [
      { t: 'Tardes y mañanas', v: 'tm', citas: [['Daniel 8:14', 'Hasta dos mil trescientas tardes y mañanas']],
        nota: 'Una tarde y una mañana son un día, como en la creación (Génesis 1:5). Son 2.300 días proféticos, y en la profecía simbólica cada día vale un año (Números 14:34; Ezequiel 4:6). Seis años y medio no alcanzan para una visión que va de Persia hasta «el tiempo del fin» (8:17): son 2.300 años.' },
      { t: 'Desde la orden de restaurar Jerusalén', v: 'decreto', citas: [['Daniel 9:25', 'desde la salida de la orden para restaurar y edificar a Jerusalén']],
        nota: 'Daniel 8 no dice desde cuándo se cuentan; Gabriel vuelve en Daniel 9 a explicarlo. La orden completa la dio Artajerjes I en su séptimo año (Esdras 7:7-26). Los judíos contaban el año de otoño a otoño: entró en vigencia en el otoño de 457 a.C. Y empieza en tiempos de Persia: por eso la visión empieza con el carnero y no con Babilonia.' },
      { t: 'Setenta semanas cortadas', v: 'semanas', citas: [['Daniel 9:24', 'Setenta semanas están determinadas sobre tu pueblo'], ['Daniel 9:27', 'a la mitad de la semana hará cesar el sacrificio y la ofrenda']],
        nota: '«Determinadas» quiere decir cortadas: 70 semanas, 490 años, se cortan de los 2.300 para el pueblo judío y empiezan juntas. Siete semanas (49 años) hasta 408 a.C., Jerusalén reedificada. Sesenta y dos más llegan al Mesías Príncipe: Jesús es ungido en su bautismo, en el otoño de 27 d.C. A la mitad de la última semana, en 31 d.C., muere en la cruz. En 34 d.C. matan a Esteban y el evangelio va a los gentiles.' },
      { t: 'Hasta 1844', v: 'resta', citas: [],
        nota: 'Quedan 2.300 − 490 = 1.810 años. Contados desde 34 d.C. llegan a 1844. O de una vez: 2.300 − 457 = 1843, y como no hay año cero, 1844.' },
      { t: 'Luego el santuario será purificado', v: 'purif', citas: [['Daniel 8:14', 'luego el santuario será purificado'], ['Daniel 7:10', 'El Juez se sentó y los libros fueron abiertos.']],
        nota: 'La purificación del santuario era el Día de la Expiación, el día diez del mes séptimo (Levítico 16:29-30), un día de juicio para Israel. En 1844 cayó el 22 de octubre. Ese día Cristo pasó al lugar santísimo del santuario celestial y empezó el juicio investigador: es el mismo juicio de Daniel 7:9-10.' }],
    fuente: 'CS 372-376, 451 y 470-477; ' + BOHR + ', p. 293, 313-316 y 325-336.',
    ir: [['d7', 'juicio', 'El juicio de Daniel 7']],
  },
  cmpExtra: [{ id: 'sanado', img: 'cielo', nombre: 'Hasta ser quebrantado', reino: 'Roma papal sanada', fechas: 'desde 1798 d.C. hasta la venida', de: 1798, a: 2026, c: '#8A5A3C',
    texto: 'Se levantará contra el Príncipe de los príncipes', ref: '8:25',
    corto: 'Herido en 1798, el papado sana de su herida (Apocalipsis 13:3) y sigue hasta el fin (CS 636): se levanta contra el Príncipe de los príncipes hasta ser quebrantado (8:25).' }],
  partes: [
 {id:'carnero',img:'carnero',nombre:'El carnero de dos cuernos',reino:'Medo-Persia',fechas:'539 – 331 a.C.',de:-539,a:-331,c:'#8C98A6',mov:'carnero',ms:6400,
  texto:'había un carnero que estaba delante del río, y tenía dos cuernos; y aunque los cuernos eran altos, uno era más alto que el otro, y el más alto creció después.',ref:'8:3',texto2:'En cuanto al carnero que viste, que tenía dos cuernos: éstos son los reyes de Media y de Persia.',ref2:'8:20',
  corto:'Media y Persia (8:20). El cuerno más alto creció después: Persia, que llegó a mandar más que los medos.',
  interp:['Gabriel lo dice: el carnero son «los reyes de Media y de Persia» (8:20). Es el oso de Daniel 7 y la plata de Daniel 2.','Dos cuernos, dos pueblos. El más alto salió después: Persia empezó como la menor, y con Ciro el Grande llegó a mandar más que los medos. Es el oso que «se alzaba de un costado más que del otro» (7:5).','Hería «al poniente, al norte y al sur» (8:4): al poniente, Babilonia (539 a.C.); al norte, Lidia (546); al sur, Egipto (525). «Se engrandecía»: cada reino crece más que el anterior.','El carnero era un animal del santuario. Daniel 8 trata del santuario de principio a fin.'],
  fuente:BOHR+', p. 293-295; Smith, <i>Las profecías de Daniel</i>, p. 86.'},
 {id:'macho',img:'macho',nombre:'El macho cabrío',reino:'Grecia',fechas:'331 – 301 a.C.',de:-331,a:-301,c:'#A85A2A',mov:'choque',ms:6800,
  texto:'un macho cabrío venía del lado del poniente sobre la faz de toda la tierra, sin tocar tierra; y aquel macho cabrío tenía un cuerno notable entre sus ojos.',ref:'8:5',texto2:'El macho cabrío es el rey de Grecia, y el cuerno grande que tenía entre sus ojos es el rey primero.',ref2:'8:21',
  corto:'Grecia (8:21). El cuerno notable es Alejandro Magno, que venció a Persia en tres batallas.',
  interp:['Gabriel lo nombra: «el rey de Grecia» (8:21). Es el leopardo de Daniel 7 y el bronce de Daniel 2.','Viene «del lado del poniente»: Grecia estaba al oeste de Persia. «Sin tocar tierra»: la rapidez de Alejandro Magno, como las cuatro alas del leopardo (7:6).','«Le quebró sus dos cuernos» (8:7): Alejandro venció a los persas en el Gránico (334 a.C.) y a Darío III en Iso (333) y en Arbela (331). Medo-Persia no pudo levantarse más.','El cuerno grande «es el rey primero» (8:21): Alejandro Magno.'],
  fuente:BOHR+', p. 296; Smith, <i>Las profecías de Daniel</i>, p. 86-87.'},
 {id:'cuatro',img:'cuatro',nombre:'El cuerno quebrado y los cuatro cuernos',reino:'Grecia dividida en cuatro',fechas:'301 – 168 a.C.',de:-301,a:-168,cmp:-331,c:'#B97A45',mov:'cuatro',ms:7600,reparto:'alejandro',
  texto:'cuando estaba en su mayor fuerza, aquel gran cuerno fue quebrado, y en su lugar salieron otros cuatro cuernos notables hacia los cuatro vientos del cielo.',ref:'8:8',texto2:'cuatro reinos se levantarán de esa nación, aunque no con la fuerza de él.',ref2:'8:22',
  corto:'Alejandro muere en su mayor fuerza; su reino se reparte entre cuatro generales.',
  interp:['«Cuando estaba en su mayor fuerza» (8:8): Alejandro Magno murió en 323 a.C., a los 32 años, en la cumbre de su poder.','Después de la batalla de Ipso (301 a.C.), sus generales se repartieron el imperio hacia los cuatro vientos: Casandro al oeste (Macedonia y Grecia), Lisímaco al norte (Tracia y Asia Menor), Seleuco I Nicátor al oriente (Siria y Babilonia) y Tolomeo I Sóter al sur (Egipto). Tócalos en el mapa, paso a paso.','Son las cuatro cabezas del leopardo de Daniel 7 (7:6). Gabriel lo dice: «cuatro reinos se levantarán de esa nación» (8:22).','Otra lista, de las dinastías que siguieron, no la de Ipso: antigónidas en Macedonia y Grecia, al oeste (283-168 a.C.); seléucidas en Siria y Mesopotamia, al oriente (312-63 a.C.); tolomeos en Egipto, al sur (323-30 a.C.); y atálidas en Pérgamo, al norte (263-133 a.C.) (Bohr, <i>Daniel 1-10</i>, p. 297).'],
  fuente:'Smith, <i>Las profecías de Daniel</i>, p. 88, 90-91 y 136-137; Maxwell, <i>El porvenir del mundo revelado</i>, p. 113 y 164; Treiyer, <i>Enigmas descifrados</i>, p. 56; '+BOHR+', p. 296-297.',
  /* v227 (Camilo: «los generales de Alejandro, interactivo»): el primer paso es el movimiento de
     los cuatro cuernos; los demás, el mapa del reparto (mov.reparto), un general por paso, y al
     final 11:4, «no será para sus descendientes». Textos literales RV1995. */
  pasos:[
   {t:'Cuatro cuernos hacia los cuatro vientos',ref:'8:8',texto:'en su lugar salieron otros cuatro cuernos notables hacia los cuatro vientos del cielo',
    nota:'Alejandro Magno muere «en su mayor fuerza» (8:8), en 323 a.C., a los 32 años. Gabriel lo explica: «cuatro reinos se levantarán de esa nación, aunque no con la fuerza de él» (8:22).'},
   {t:'Casandro · el oeste',ref:'8:22',texto:'cuatro reinos se levantarán de esa nación, aunque no con la fuerza de él',
    nota:'Después de la batalla de Ipso (301 a.C.), Casandro tomó Macedonia y Grecia, las regiones del oeste (Smith, p. 88; Maxwell, p. 113). Roma conquistó Macedonia en 168 a.C. (Smith, p. 90; Maxwell, p. 164).'},
   {t:'Lisímaco · el norte',ref:'11:4',texto:'su reino será quebrantado y repartido hacia los cuatro vientos del cielo',
    nota:'Lisímaco tomó Tracia y buena parte de Asia Menor, el norte (Smith, p. 88; Maxwell, p. 113). La división en cuatro duró hasta su muerte, en 281 a.C. (Maxwell, p. 113): Seleuco lo venció y se quedó con su reino (Smith, p. 137).'},
   {t:'Seleuco · el oriente',ref:'8:8',texto:'hacia los cuatro vientos del cielo',
    nota:'Seleuco I Nicátor tomó Siria, Babilonia y las tierras del oriente; de él descienden los reyes seléucidas (Smith, p. 88; Maxwell, p. 113). Roma conquistó Siria en 65 a.C. (Smith, p. 91; Maxwell, p. 164).'},
   {t:'Tolomeo · el sur',ref:'8:22',texto:'aunque no con la fuerza de él',
    nota:'Tolomeo I Sóter tomó Egipto, el sur; de él descienden los lágidas (Smith, p. 88; Maxwell, p. 113). Egipto pasó a ser provincia de Roma en 30 a.C. (Smith, p. 91; Maxwell, p. 164).'},
   {t:'No para sus descendientes',ref:'11:4',texto:'pero no será para sus descendientes, ni según el dominio con que él dominó',
    nota:'Los hijos de Alejandro no heredaron el reino: Alejandro IV fue asesinado en 311 a.C. y Heracles en 309 a.C. (Treiyer, <i>Enigmas descifrados</i>, p. 56); “se extinguió la familia de Alejandro” (Smith, p. 88). El reino quedó para cuatro de sus generales.'}]},
 {id:'cuerno',img:'pequeno',nombre:'El cuerno pequeño crece',reino:'Roma imperial',fechas:'168 a.C. – 476 d.C.',de:-168,a:476,c:'#3E4651',mov:'crece',ms:10600,
  texto:'De uno de ellos salió un cuerno pequeño, que creció mucho hacia el sur y el oriente, y hacia la tierra gloriosa.',ref:'8:9',texto2:'Al fin del reinado de estos, cuando los transgresores lleguen al colmo, se levantará un rey altivo de rostro y entendido en enigmas.',ref2:'8:23',
  corto:'La primera fase de Roma: pequeña al principio, crece sobre los reinos griegos. Es la bestia espantosa de Daniel 7.',
  interp:['El cuerno sale al final de los cuatro reinos, «al fin del reinado de estos» (8:23), y crece más que el carnero y el macho cabrío. Es Roma, la misma de Daniel 2 y 7: primero imperial y después papal, en un solo símbolo.','Crece primero a lo ancho, sobre la tierra: al oriente (Macedonia, 168 a.C.; Siria, 65 a.C.), a la tierra gloriosa (Judea, 63 a.C.) y al sur (Egipto, 30 a.C.).','«De uno de ellos» (8:9): en hebreo «ellos» (<i>mehem</i>) es masculino y «cuernos» (<i>qeranot</i>) es femenino, así que «ellos» no son los cuernos. El cuerno sale de uno de los cuatro vientos del cielo (8:8), un punto cardinal, y no de uno de los cuatro cuernos (Simposio, p. 396-397). El texto no nombra el viento: dice que creció «hacia el sur y el oriente, y hacia la tierra gloriosa» (8:9). La Septuaginta pone “el norte” donde dice «la tierra gloriosa», y el Simposio concluye: “el punto cardinal del que salió el ‘cuerno pequeño’ solo puede ser el oeste”, y “Roma salió del oeste (desde el punto de vista de Israel)” (p. 399).','En la fase pagana, un gobernador romano, Poncio Pilato, crucificó a Cristo, y Roma destruyó el templo de la tierra en 70 d.C.: «El pueblo de un príncipe que ha de venir destruirá la ciudad y el santuario» (9:26). El continuo lo quita después la fase papal (8:10-11).'],
  fuente:SIMP+', p. 394-399; '+BOHR+', p. 297-306; Maxwell, <i>El porvenir del mundo revelado</i>, p. 161-164; Smith, <i>Las profecías de Daniel</i>, p. 89-91.'},
 {id:'cielo',img:'cielo',nombre:'Hasta el ejército del cielo',reino:'Roma papal',fechas:'538 – 1798 d.C.',de:538,a:1798,c:'#A0694A',mov:'cielo',ms:7200,
  texto:'Creció hasta llegar al ejército del cielo; y parte del ejército y de las estrellas echó por tierra, y las pisoteó.',ref:'8:10',texto2:'destruirá a los fuertes y al pueblo de los santos.',ref2:'8:24',
  corto:'La fase papal: el cuerno ya no pelea solo con reinos de la tierra; se levanta contra Dios y persigue a su pueblo. Es el cuerno pequeño de Daniel 7.',
  interp:['Ahora crece hacia arriba. Los animales pelean contra otros reinos; el cuerno además pelea contra Dios. Es el cuerno pequeño de Daniel 7, con sus 1.260 años, de 538 a 1798.','El ejército y las estrellas son el pueblo de Dios: Gabriel habla del «pueblo de los santos» (8:24), y Daniel 12:3 compara a los fieles con estrellas.','«Aun se engrandeció frente al príncipe de los ejércitos» (8:11). El Príncipe del ejército es Cristo, el mismo que Josué adoró (Josué 5:13-15). El cuerno se pone en su lugar en la tierra.'],
  fuente:BOHR+', p. 305-307.'},
 {id:'santuario',img:'santuario',nombre:'El santuario pisoteado',reino:'Roma papal',fechas:'el continuo quitado: desde 508 (12:11); supremacía 538 – 1798 d.C.',de:null,era:538,c:'#7C4A2E',mov:'santuario',ms:8200,
  texto:'por él fue quitado el sacrificio continuo, y el lugar de su santuario fue echado por tierra.',ref:'8:11',texto2:'echó por tierra la verdad e hizo cuanto quiso, y prosperó.',ref2:'8:12',
  corto:'El cuerno quita el continuo: pone en la tierra lo que Cristo hace cada día por nosotros en el santuario del cielo. Y echa por tierra la verdad.',
  interp:['En hebreo dice solo «continuo» (<i>hatamid</i>), con artículo: «sacrificio» lo agregaron los traductores. La palabra nombra el servicio de cada día en el atrio y en el lugar santo, nunca en el santísimo: el holocausto de la mañana y de la tarde, el pan, la luz y el incienso. En el cielo es la obra de Cristo, que vive siempre para interceder por nosotros (Hebreos 7:25).',
    'El cuerno no puede subir al cielo: pone en la tierra un sustituto de cada pieza. En lugar del sacrificio de una vez para siempre, la misa; en lugar de la Palabra, la tradición; en lugar de la luz, una iglesia a oscuras; en lugar de la intercesión de Cristo, el único mediador (1 Timoteo 2:5), el confesionario y las oraciones a María y a los santos. Así «el lugar de su santuario fue echado por tierra».',
    'El continuo es del atrio y del lugar santo; el santísimo queda fuera, porque Cristo entra allí al terminar las 2.300 tardes y mañanas, en 1844 (8:14). El arca no está entre lo que el cuerno quita: queda detrás del velo.',
    '«Echó por tierra la verdad» (8:12) va aparte: no es un mueble del santuario. Es la Ley de Dios, que el Salmo 119:142 llama la verdad, y con ella el sábado: el cuerno de Daniel 7 «pensará en cambiar los tiempos y la ley» (7:25).',
    'Hay dos lecturas del continuo (Bohr, p. 307): el paganismo, quitado para dar paso al papado, y el ministerio continuo de Cristo en el santuario celestial, que el papado quitó. Esta lámina sigue la segunda (Bohr, p. 307-312; apuntes “Cómo quitó el continuo el papado”), que fecha la quita en 508: 1798 menos los 1.290 días de 12:11 (apuntes).',
    'La de los pioneros: “el asolamiento continuo era el paganismo, y la ‘abominación espantosa,’ el papado” (Smith, <i>Las profecías de Daniel</i>, p. 157), y “el continuo fué quitado hacia 508. Esto sucedió como preparativo para el establecimiento del papado” (p. 159).'],
  fuente:BOHR+', p. 307-313; Smith, <i>Las profecías de Daniel</i>, p. 94 y 157-159; Maxwell, <i>El porvenir del mundo revelado</i>, p. 164; apuntes «Cómo quitó el continuo el papado».'},
 {id:'purificado',img:'purificado',nombre:'El santuario será purificado',reino:'El juicio en el cielo',fechas:'desde 1844 d.C.',de:1844,a:2026,c:'#B45309',mov:'purifica',ms:5600,
  texto:'¿Hasta cuándo durará la visión del sacrificio continuo, la prevaricación asoladora y la entrega del santuario y el ejército para ser pisoteados?',ref:'8:13',texto2:'Hasta dos mil trescientas tardes y mañanas; luego el santuario será purificado.',ref2:'8:14',
  corto:'En 1844 terminan las 2.300 tardes y mañanas: empieza la purificación del santuario, el juicio de Daniel 7.',
  interp:['Un santo pregunta «¿Hasta cuándo?»: no cuánto dura, sino cuándo termina. La respuesta da el final: «luego el santuario será purificado» (8:14). Aquí también la palabra «sacrificio» la agregaron los traductores: el hebreo dice solo el continuo.','Son 2.300 años: de 457 a.C. a 1844. Daniel 9 da el punto de partida.','La purificación del santuario era el Día de la Expiación (Levítico 16), un día de juicio. La palabra hebrea (<i>nitsdaq</i>) quiere decir también justificado, vindicado: Dios hace justicia. Es el mismo suceso de Daniel 7:9-10: el Juez se sienta y se abren los libros, en 1844.'],
  fuente:'CS 374-376 y 470-477; '+BOHR+', p. 313-320.'},
 {id:'quebrantado',img:'d2/e-piedra',nombre:'Quebrantado, no por mano humana',reino:'La segunda venida',fechas:'futuro',de:null,fin:'venida',c:'#6B7B5A',
  texto:'Se levantará contra el Príncipe de los príncipes, pero será quebrantado, aunque no por mano humana.',ref:'8:25',texto2:'la visión es para el tiempo del fin.',ref2:'8:17',
  corto:'El cuerno llega hasta el fin y lo quebranta Dios, no un hombre: es la piedra de Daniel 2.',
  interp:['Ningún reino le sigue al cuerno: llega hasta «el tiempo del fin» (8:17, 19). Lo quebranta Dios, «no por mano humana», como la piedra que se desprendió «sin que la cortara mano alguna» (2:34).','Antes de eso está la cuarta etapa de Roma: herido en 1798, el papado sana de su herida (Apocalipsis 13:3) y sigue hasta el fin (CS 636). Es la segunda venida, cuando al cuerno de Daniel 7 «le quitarán su dominio» (7:26).'],
  fuente:BOHR+', p. 63; CS 636 y 698-703.'},
  ],
};
/* v219: LOS ÚLTIMOS ACONTECIMIENTOS (Camilo, 14-oct 18:12-18:17): «En la comparación
   debes agregar Mateo 24 […] Revisa bien si los eventos sí están en ciertos capítulos
   […] no me hagas caso a lo que te digo sin corroborar en todos los apuntes […] En vez
   de "Apocalipsis", separa por los capítulos 12, 13, 17» y «Usa El conflicto de los
   siglos: hay eventos como el tiempo de angustia de Jacob, el tiempo de angustia previo
   […] mira cuáles más faltan».
   La secuencia sigue el orden en que cada acontecimiento EMPIEZA según El conflicto de
   los siglos (caps. 37-43, CS 639-737, ed. APIA 1954), Primeros escritos (PE) y Eventos
   de los últimos días (EUD, 2009). «Preparación para la crisis final» (Chaij) no está en
   la Biblioteca de iCloud ni en las notas: no se cita.
   Cada celda de un libro es [referencia, explícito, una línea, fuente, citas]:
   explícito = 1 cuando el texto mismo lo dice; 0 cuando el acontecimiento está ahí
   según la interpretación de la fuente que se nombra. Sin fuente, no hay celda.
   Las citas son RV1995 literal (tests/test.js); Mateo 24 va sin citas: la RV1995 de
   Mateo no está en el repositorio. */
const B11 = 'Bohr, <i>Daniel 11</i>', B110 = 'Bohr, <i>Daniel 1-10</i>', B17 = 'Bohr, <i>Apocalipsis 17</i>', PIP = 'Pippenger, <i>El tiempo del fin</i>';
/* v227: el sexto, `e`: lo que Elena de White dice de esa celda, literal: [[referencia, cita, una línea]]. */
const X = (r, n, f, q, e) => [r, 1, n, f, q || [], e || []];
const I = (r, n, f, q, e) => [r, 0, n, f, q || [], e || []];
const ULTIMOS = {
  titulo: 'Los últimos acontecimientos',
  /* Las columnas: [clave, nombre corto, nombre largo]. 'egw' es la fuente de la secuencia. */
  libros: [['d2', 'Dn 2', 'Daniel 2'], ['d7', 'Dn 7', 'Daniel 7'], ['d8', 'Dn 8', 'Daniel 8'], ['d11', 'Dn 11', 'Daniel 11'], ['d12', 'Dn 12', 'Daniel 12'],
    ['mt24', 'Mt 24', 'Mateo 24'],
    ['ap12', 'Ap 12', 'Apocalipsis 12'], ['ap13', 'Ap 13', 'Apocalipsis 13'], ['ap14', 'Ap 14', 'Apocalipsis 14'], ['ap16', 'Ap 16', 'Apocalipsis 16'],
    ['ap17', 'Ap 17', 'Apocalipsis 17'], ['ap18', 'Ap 18', 'Apocalipsis 18'], ['ap19', 'Ap 19', 'Apocalipsis 19'], ['ap20', 'Ap 20', 'Apocalipsis 20'],
    ['ap21', 'Ap 21-22', 'Apocalipsis 21-22'], ['apo', 'Ap otros', 'Apocalipsis, otros capítulos'], ['egw', 'EGW', 'Elena de White']],
  nota: 'Daniel 2, 7 y 8 pasan del juicio a la venida y al reino. Daniel 11 y 12, Mateo 24 y el Apocalipsis llenan lo de en medio. Un punto lleno: el texto lo dice. Un aro: está ahí según la interpretación que se nombra. Toca una celda para ver el texto y su fuente.',
  /* v221 (Camilo, 14-oct: «corrobora el orden»): lo que pasa a la vez va junto, sin una
     fila falsa. La imagen se forma cuando las iglesias usan al Estado para imponer sus
     dogmas (CS 498) y, al imponer el domingo, la levantan (CS 502): imagen y ley van a la
     vez. Con la ley empieza la crisis: salida de las ciudades (EUD 104), pequeño tiempo de
     angustia con lluvia tardía y fuerte pregón (PE 33 y 85-86), el zarandeo decisivo
     «conforme vaya acercándose la tempestad» (CS 666) y el sellamiento hasta el cierre
     (CS 663 y 671). */
  veces: { ley: 'A la vez: al imponer el domingo, las iglesias levantan la imagen de la bestia (CS 498 y 502)',
    crisis: 'A la vez, desde la ley dominical hasta el cierre de la gracia (PE 33 y 85-86; CS 661-671)',
    /* v229: la liberación, sus señales y la resurrección especial pasan juntas, a medianoche, en la séptima plaga (CS 693-695).
       v231: con la séptima copa en su propia fila: CS 694-695 cita Apocalipsis 16:17, 18, 19 y 21 en esa noche. */
    medianoche: 'A la vez, a medianoche, en la séptima plaga: Elena de White cita Apocalipsis 16:17, 18, 19 y 21 en la liberación (CS 694-695)' },
  /* v231: filas que van juntas sin ser a la vez (no dicen «a la vez con»). */
  grupos: { copas: 'Las copas, una tras otra, en el orden de Apocalipsis 16. «Estas plagas no serán universales» (CS 687)',
    sin: 'Después del cierre de la gracia; ni la Biblia ni Elena de White los ponen en una plaga' },
  fases: [['antes', 'Hasta el cierre de la gracia'], ['angustia', 'El tiempo de angustia'], ['venida', 'La liberación y la venida'], ['mil', 'Los mil años'], ['fin', 'Después de los mil años']],
  eventos: [
    { id: 'juicio', fase: 'antes', t: 'El juicio investigador', c: 'Juicio', cuando: 'Desde 1844, en el cielo, mientras sigue abierta la gracia', img: 'd7/juicio',
      nota: 'Se abren los libros de los que profesaron ser hijos de Dios. Mientras dura, se predica el evangelio eterno a toda nación.',
      egwC: [["CS 374", "El período completo de los 2.300 días se extendía de 457 ant. de J. C. hasta 1844 de nuestra era, cuando se inició en el cielo el juicio investigador.", "Pone el comienzo del juicio en 1844, al terminar los 2.300 años de Daniel 8:14."]],
      egw: 'CS 374 y 533-545', partes: ['juicio', 'hijo', 'x-fases', 'purificado'],
      l: { d7: X('7:9-10, 13', 'El Juez se sienta, se abren los libros y el Hijo del hombre llega ante el Anciano de días.', 'CS 533', [['Daniel 7:10', 'El Juez se sentó y los libros fueron abiertos.']]),
        d8: I('8:14', 'La purificación del santuario es la hora del juicio, desde 1844.', 'CS 374', [['Daniel 8:14', 'luego el santuario será purificado']]),
        ap14: X('14:6-7', 'El primer ángel anuncia que la hora del juicio ha llegado.', 'CS 374', [['Apocalipsis 14:7', 'la hora de su juicio ha llegado']]) } },
    { id: 'imagen', fase: 'antes', t: 'La imagen de la bestia', c: 'Imagen de la bestia', vez: 'ley', cuando: 'Se forma cuando las iglesias usan el poder del Estado para imponer sus dogmas; la ley dominical es su primera obra',
      nota: 'Los Estados Unidos, la bestia con cuernos de cordero, hablan como dragón: las iglesias usan el poder civil para imponer sus dogmas, como hizo el papado. Así se sana la herida mortal.',
      egwC: [["CS 502", "por el mismo hecho de imponer un deber religioso con ayuda del poder secular, las mismas iglesias estarían elevando una imagen a la bestia", "La imagen de la bestia se forma cuando las iglesias usan el poder civil para imponer su religión."]],
      egw: 'CS 496-502 y 636',
      l: { d11: I('11:41', 'El poder del norte entra en la tierra gloriosa: los Estados Unidos, baluarte del protestantismo, caen bajo su mano.', B11 + ', p. 125-126', [['Daniel 11:41', 'Entrará en la tierra gloriosa']]),
        ap13: X('13:3, 11-14', 'La bestia que sube de la tierra manda hacer una imagen a la bestia cuya herida fue sanada.', 'CS 496', [['Apocalipsis 13:11', 'Tenía dos cuernos semejantes a los de un cordero, pero hablaba como un dragón.'], ['Apocalipsis 13:14', 'que le hagan una imagen a la bestia que fue herida de espada y revivió']]),
        ap17: I('17:8', 'La bestia «que era y no es, y será»: el papado vuelve al poder.', B17 + ', p. 22', [['Apocalipsis 17:8', 'la bestia que era y no es, y será']]) } },
    { id: 'ley', fase: 'antes', t: 'La ley dominical', c: 'Ley dominical', vez: 'ley', cuando: 'Se impone el domingo por ley: la gran prueba. Al imponerlo, las iglesias levantan la imagen de la bestia',
      nota: 'El sábado es la piedra de toque de la lealtad. Quien pisotea la ley de Dios para obedecer una ley humana recibe la marca de la bestia; nadie la recibe a ciegas.',
      egwC: [["CS 663", "El sábado será la gran piedra de toque de la lealtad; pues es el punto especialmente controvertido.", "La ley dominical pone a prueba a quién se obedece: a Dios o a un poder humano."]],
      egw: 'CS 502-503 y 662-663; EUD 107-122',
      l: { d7: I('7:25', 'El cuerno pensó «cambiar los tiempos y la Ley»: el cambio del sábado que la ley dominical impone.', 'CS 499', [['Daniel 7:25', 'pensará en cambiar los tiempos y la Ley']]),
        d11: I('11:41', 'Cuando el poder del norte toma la tierra gloriosa por su «mano», se impone la ley dominical. Es también la abominación desoladora del tiempo del fin (11:31).', PIP + ', p. 53; ' + B11 + ', p. 49', [['Daniel 11:41', 'Entrará en la tierra gloriosa']]),
        mt24: I('24:15', 'La abominación desoladora en el lugar santo: la ley dominical nacional.', B11 + ', p. 49 y 128'),
        ap13: I('13:16-17', 'La marca impuesta a todos es la observancia obligatoria del domingo.', 'CS 502-503', [['Apocalipsis 13:16', 'se les pusiera una marca en la mano derecha o en la frente']]),
        ap14: I('14:9-11', 'El tercer ángel advierte contra la marca que impone la ley.', 'CS 662', [['Apocalipsis 14:9', 'Si alguno adora a la bestia y a su imagen y recibe la marca en su frente o en su mano']]),
        ap17: I('17:12-13', 'Los reyes entregan su poder a la bestia: el mundo se une bajo el papado para oponerse a Dios.', B17 + ', p. 22', [['Apocalipsis 17:13', 'entregarán su poder y autoridad a la bestia']]) } },
    { id: 'ciudades', fase: 'antes', vez: 'crisis', t: 'La salida de las ciudades', c: 'Salida de las ciudades', cuando: 'Cuando se promulga la ley dominical',
      nota: 'Así como el sitio de Jerusalén fue la señal para que los cristianos huyeran, el decreto que impone el domingo es la señal para dejar las grandes ciudades.',
      egw: 'EUD 104',
      l: { mt24: I('24:15-20', '«Los que estén en Judea, huyan a los montes»: la señal de entonces es la de ahora.', 'EUD 104') } },
    { id: 'pequena', fase: 'antes', vez: 'crisis', t: 'El pequeño tiempo de angustia', c: 'Pequeño tiempo de angustia', cuando: 'Con la ley dominical, antes del cierre de la gracia',
      nota: 'Un corto tiempo de angustia mientras Cristo sigue en el santuario. Los que no honran el domingo son llevados a los tribunales, encarcelados o desterrados; algunos mueren. Hay mártires porque la gracia sigue abierta.',
      egwC: [["CS 666", "Cuando los defensores de la verdad se nieguen a honrar el domingo, unos serán echados en la cárcel, otros serán desterrados y otros aún tratados como esclavos.", "Antes del cierre de la gracia hay cárcel y destierro por no honrar el domingo."]],
      egw: 'PE 33 y 85-86; CS 665-667; EUD 123-132',
      l: { d11: I('11:44', '«Saldrá con gran ira para destruir y matar a muchos»: la ira del poder del norte trae el pequeño tiempo de angustia.', B11 + ', p. 172', [['Daniel 11:44', 'saldrá con gran ira para destruir y matar a muchos']]),
        mt24: I('24:9', '«Os entregarán a tribulación, y os matarán»: hay mártires en este tiempo corto.', B11 + ', p. 172'),
        ap12: I('12:17', 'El dragón hace la guerra contra el resto que guarda los mandamientos.', 'CS 650', [['Apocalipsis 12:17', 'se fue a hacer la guerra contra el resto de la descendencia de ella']]),
        ap13: I('13:17', 'Nadie puede comprar ni vender sin la marca.', 'EUD 127', [['Apocalipsis 13:17', 'que ninguno pudiera comprar ni vender']]) } },
    { id: 'zarandeo', fase: 'antes', t: 'El zarandeo', c: 'Zarandeo', vez: 'crisis', cuando: 'Empieza con el mensaje a Laodicea; llega a su punto decisivo con la ley dominical y la persecución',
      nota: 'El testimonio directo del Testigo fiel sacude a la iglesia: unos lo aceptan y se purifican; otros se levantan contra él. Cuando llega la prueba, los que no fueron santificados por la verdad dejan la fe.',
      egwC: [["CS 666", "Conforme vaya acercándose la tempestad, muchos que profesaron creer en el mensaje del tercer ángel, pero que no fueron santificados por la obediencia a la verdad, abandonarán su fe, e irán a engrosar las filas de la oposición.", "El zarandeo: muchos que conocían el mensaje lo dejan cuando llega la prueba."]],
      egw: 'PE 269-271; CS 666; EUD 147-156',
      l: { d11: I('11:41', '«Muchas provincias caerán»: al entrar el poder del norte en la tierra gloriosa, el ámbito de la iglesia protestante y adventista, muchos tropiezan y caen.', B11 + ', p. 128', [['Daniel 11:41', 'Entrará en la tierra gloriosa, y muchas provincias caerán']]),
        mt24: I('24:10-12', 'Muchos tropiezan, se entregan unos a otros y el amor de muchos se enfría.', B11 + ', p. 128'),
        apo: I('3:15-19', 'El consejo del Testigo fiel a Laodicea causa el zarandeo.', 'PE 270', [['Apocalipsis 3:16', 'por cuanto eres tibio y no frío ni caliente, te vomitaré de mi boca'], ['Apocalipsis 3:19', 'sé, pues, celoso y arrepiéntete']]) } },
    { id: 'lluvia', fase: 'antes', vez: 'crisis', t: 'La lluvia tardía', c: 'Lluvia tardía', cuando: 'Al empezar el pequeño tiempo de angustia; da poder al fuerte pregón',
      nota: 'El Espíritu se derrama como en Pentecostés, la lluvia temprana (Joel 2:23; Hechos 3:19). Madura la cosecha y prepara al pueblo de Dios para la hora de prueba.',
      egwC: [["CS 669", "así la ‘lluvia tardía’ será dada al final de dicho ministerio para hacer madurar la cosecha.", "Como la lluvia temprana de Pentecostés, el Espíritu se derrama otra vez al final para la cosecha."]],
      egw: 'PE 33 y 85-86; CS 669-671; EUD 157-168',
      l: { d11: I('11:44', 'Las «noticias» llegan en el pequeño tiempo de angustia, cuando los fieles reciben la lluvia tardía.', B11 + ', p. 172; ' + PIP + ', p. 21', [['Daniel 11:44', 'Pero noticias del oriente y del norte lo atemorizarán']]),
        ap18: I('18:1', 'El ángel que alumbra la tierra con su gloria: la obra de la lluvia tardía.', 'CS 669', [['Apocalipsis 18:1', 'la tierra fue alumbrada con su gloria']]) } },
    { id: 'pregon', fase: 'antes', vez: 'crisis', t: 'El fuerte pregón', c: 'Fuerte pregón', cuando: 'Mientras se impone la ley dominical',
      nota: 'El ángel de Apocalipsis 18 se une al tercer ángel. Muchos que estaban en Babilonia salen y se unen al pueblo de Dios.',
      egwC: [["CS 669", "El ángel que une su voz a la proclamación del tercer mensaje, alumbrará toda la tierra con su gloria.", "El fuerte pregón es el mensaje del tercer ángel dado con poder a todo el mundo (Apocalipsis 18:1)."]],
      egw: 'CS 661-664 y 669-670; PE 277-279; EUD 169-182',
      l: { d11: I('11:41, 44', 'Las «noticias del oriente y del norte» son el fuerte pregón. Edom, Moab y Amón, que escapan, son los que salen de Babilonia.', B11 + ', p. 150-153 y 166', [['Daniel 11:44', 'Pero noticias del oriente y del norte lo atemorizarán'], ['Daniel 11:41', 'pero escaparán de sus manos Edom, Moab y la mayoría de los hijos de Amón']]),
        mt24: I('24:14', 'El evangelio predicado en todo el mundo, y entonces el fin.', 'EUD 17; apuntes «Visión panorámica de los sucesos finales»'),
        ap14: I('14:6-12', 'El mensaje de los tres ángeles se convierte en la amonestación final.', 'CS 662', [['Apocalipsis 14:8', 'Ha caído, ha caído Babilonia']]),
        ap18: X('18:1-4', 'Otro ángel anuncia la caída de Babilonia y una voz llama a salir de ella.', 'CS 661-662', [['Apocalipsis 18:2', 'Ha caído, ha caído la gran Babilonia'], ['Apocalipsis 18:4', 'Salid de ella, pueblo mío']]) } },
    { id: 'sello', fase: 'antes', vez: 'crisis', t: 'El sellamiento', c: 'Sellamiento', cuando: 'Durante el fuerte pregón; termina al cerrarse la gracia',
      nota: 'Los vientos se detienen hasta que los siervos de Dios estén sellados. Los que muestran su lealtad guardando la ley de Dios reciben el sello; los que aceptan el falso día de reposo, la marca.',
      egwC: [["CS 671", "todos los que han resultado fieles a los preceptos divinos han recibido ‘el sello del Dios vivo.’", "El sellamiento termina cuando todos los fieles lo han recibido, antes de que Jesús deje de interceder."]],
      egw: 'CS 663 y 671; PE 38-39',
      l: { d11: I('11:44', 'Las «noticias» llevan también el mensaje del sello, que turba al poder del norte.', B11 + ', p. 240', [['Daniel 11:44', 'Pero noticias del oriente y del norte lo atemorizarán']]),
        apo: X('7:1-4', 'Los vientos se detienen hasta que los siervos de Dios estén sellados en la frente.', 'PE 38-39', [['Apocalipsis 7:3', 'hasta que hayamos sellado en sus frentes a los siervos de nuestro Dios'], ['Apocalipsis 7:2', 'que tenía el sello del Dios vivo']]) } },
    { id: 'gracia', fase: 'antes', t: 'Se cierra la gracia', c: 'Fin de la gracia', cuando: 'Al terminar el juicio investigador, antes de las plagas',
      nota: 'Cada caso quedó decidido para vida o para muerte y Cristo deja de interceder. Termina su obra de mediador y el Hijo recibe el reino: «se levantará Miguel».',
      egwC: [["CS 671", "Entonces Jesús dejará de interceder en el santuario celestial.", "Al cerrarse la gracia termina la intercesión de Cristo."], ["CS 671", "Cada caso ha sido fallado para vida o para muerte.", "Cada caso queda decidido: ya no hay cambio de bando."]],
      egw: 'CS 671; PE 279-280; EUD 193-202', partes: ['x-fases', 'hijo'],
      l: { d7: I('7:14', 'El Hijo recibe el reino cuando termina el juicio: es la sentencia.', B110 + ', p. 288; CS 671', [['Daniel 7:14', 'Y le fue dado dominio, gloria y reino']]),
        d12: I('12:1', '«Se levantará Miguel»: el juicio termina y Cristo deja el santuario.', 'CS 671; ' + B11 + ', p. 18', [['Daniel 12:1', 'En aquel tiempo se levantará Miguel']]),
        ap21: I('22:11', 'La sentencia que fija el caso de cada uno.', 'CS 671', [['Apocalipsis 22:11', 'El que es injusto, sea injusto todavía']]) } },
    /* v220 (Camilo 14-oct): tres momentos distintos: el pequeño tiempo de angustia
       (antes del cierre), el gran tiempo de angustia (después) y, dentro de este,
       la angustia de Jacob, la experiencia del pueblo de Dios. */
    { id: 'gran', fase: 'angustia', t: 'El gran tiempo de angustia', c: 'Gran tiempo de angustia', cuando: 'Empieza con el cierre de la gracia y dura hasta la liberación',
      nota: 'Cuando se levanta Miguel y Cristo deja el santuario, empieza la angustia «cual nunca fue». Dios retira su Espíritu de los impíos y Satanás los domina; caen las plagas. No es el pequeño tiempo de angustia, que viene antes, con la ley dominical.',
      egwC: [["CS 672", "Desamparados ya de la gracia divina, están a merced de Satanás, el cual sumirá entonces a los habitantes de la tierra en una gran tribulación final.", "El gran tiempo de angustia viene después del cierre de la gracia."]],
      egw: 'CS 671-673; PE 33 y 85-86',
      l: { d12: X('12:1', 'El tiempo de angustia cual nunca fue llega después que se levanta Miguel.', 'CS 671', [['Daniel 12:1', 'Será tiempo de angustia, cual nunca fue desde que hubo gente hasta entonces']]),
        /* v227 (Camilo): Mateo 24:21-22 se cumple dos veces: los 1260 años de persecución y la tribulación final. */
        mt24: I('24:21-22', 'La gran tribulación (Mateo 24:21-22) se cumple dos veces: primero en los 1260 años de persecución, que Dios acortó, y después en la tribulación final, después del cierre de la gracia. Es también el tiempo de angustia de Daniel 12:1.', 'CS 28, 309-310 y 672; ' + B11 + ', p. 128', [], [["CS 309", "Al predecir la ‘gran tribulación’ que había de venir sobre la iglesia, el Salvador había dicho: ‘Si aquellos días no fuesen acortados, ninguna carne sería salva; mas por causa de los escogidos, aquellos días serán acortados.’ (S. Mateo 24: 22.)", "Primer cumplimiento: los 1260 años de persecución papal (538-1798)."], ["CS 309", "La persecución contra la iglesia no continuó durante todos los 1260 años. Dios, usando de misericordia con su pueblo, acortó el tiempo de tan horribles pruebas.", "Los días acortados: por la Reforma, la persecución cesó antes de 1798 (CS 310)."], ["CS 28", "La profecía del Señor entrañaba un doble significado: al par que anunciaba la ruina de Jerusalén presagiaba también los horrores del gran día final.", "Mateo 24 mira también al fin del mundo."], ["CS 672", "Satanás, el cual sumirá entonces a los habitantes de la tierra en una gran tribulación final.", "Segundo cumplimiento: la tribulación final, después del cierre de la gracia."]]),
        apo: I('3:10', '«Yo también te guardaré de la hora de la prueba»: la promesa que sostiene a los justos.', 'CS 677', [['Apocalipsis 3:10', 'yo también te guardaré de la hora de la prueba']]) } },
    { id: 'jacob', fase: 'angustia', t: 'La angustia de Jacob', c: 'Angustia de Jacob', cuando: 'Dentro del gran tiempo de angustia, sobre todo con el decreto de muerte',
      nota: 'Es la experiencia del pueblo de Dios en el gran tiempo de angustia. Viven sin intercesor y, como Jacob en la noche de lucha (Jeremías 30:7; Génesis 32), oran por liberación; no tienen pecados escondidos que confesar. Ya no hay mártires.',
      egwC: [["CS 674", "La noche de la aflicción de Jacob, cuando luchó en oración para ser librado de manos de Esaú (Génesis 32: 24-30), representa la prueba por la que pasará el pueblo de Dios en el tiempo de angustia.", "La lucha de Jacob en oración es figura de lo que vive el pueblo de Dios en el tiempo de angustia."]],
      egw: 'CS 674-679 y 692; PE 36-37 y 283',
      l: { apo: I('3:10', '«Yo también te guardaré de la hora de la prueba».', 'CS 677', [['Apocalipsis 3:10', 'yo también te guardaré de la hora de la prueba']]) } },
    { id: 'plagas', fase: 'angustia', t: 'Las siete últimas plagas', c: 'Plagas', cuando: 'Cuando Cristo deja de interceder, antes de la venida',
      nota: 'La ira de Dios sin mezcla cae sobre los que tienen la marca de la bestia y adoran su imagen. No son universales; Dios guarda a su pueblo en medio de ellas.',
      egwC: [["CS 685-686", "Cuando Cristo deje de interceder en el santuario, se derramará sin mezcla la ira de Dios de la que son amenazados los que adoran a la bestia y a su imagen y reciben su marca.", "Las plagas caen después del cierre de la gracia, sobre los que reciben la marca."],
        ["CS 686", "Las plagas que cayeron sobre Egipto cuando Dios estaba por libertar a Israel fueron de índole análoga a los juicios más terribles y extensos que caerán sobre el mundo inmediatamente antes de la liberación final del pueblo de Dios.", "Como en Egipto: las plagas vienen justo antes de que Dios libre a su pueblo."],
        ["CS 687", "Estas plagas no serán universales, pues de lo contrario los habitantes de la tierra serían enteramente destruídos.", "No caen en toda la tierra a la vez; aun así, son los azotes más terribles."]],
      egw: 'CS 685-688; PE 36 y 280-282; EUD 203-214',
      l: { ap16: X('16', 'Siete copas de la ira de Dios sobre los que tienen la marca.', 'CS 686', [['Apocalipsis 16:1', 'Id y derramad sobre la tierra las siete copas de la ira de Dios'], ['Apocalipsis 16:2', 'sobre los hombres que tenían la marca de la bestia']]),
        apo: X('15:1', 'Siete ángeles con las siete plagas postreras.', 'CS 686', [['Apocalipsis 15:1', 'siete ángeles con las siete plagas postreras']]) } },
    /* v231 (Camilo: «las siete últimas plagas, cada una con su texto»): una fila por copa, en el
       orden de Apocalipsis 16, con el texto RV1995 literal. Elena de White cita las cuatro primeras
       (CS 686) y la séptima en la liberación (CS 694-695). No se pone en una plaga nada que la
       Biblia o Elena de White no pongan ahí. */
    { id: 'plaga1', fase: 'angustia', grupo: 'copas', t: 'La primera plaga: la úlcera', c: '1.ª plaga', cuando: 'La primera copa, después del cierre de la gracia (CS 685-686)',
      nota: '«Fue el primero y derramó su copa sobre la tierra, y vino una úlcera maligna y pestilente sobre los hombres que tenían la marca de la bestia y que adoraban su imagen» (Apocalipsis 16:2).',
      egwC: [["CS 686", "En el Apocalipsis se lee lo siguiente con referencia a esas mismas plagas tan temibles: \"Vino una plaga mala y dañosa sobre los hombres que tenían la señal de la bestia, y sobre los que adoraban su imagen.\"", "Cita la primera copa: cae sobre los que tienen la marca de la bestia."]],
      egw: 'CS 686',
      l: { ap16: X('16:2', 'La primera copa: una úlcera sobre los que tienen la marca de la bestia.', 'CS 686', [['Apocalipsis 16:2', 'vino una úlcera maligna y pestilente sobre los hombres que tenían la marca de la bestia y que adoraban su imagen']]) } },
    { id: 'plaga2', fase: 'angustia', grupo: 'copas', t: 'La segunda plaga: el mar en sangre', c: '2.ª plaga', cuando: 'La segunda copa',
      nota: '«El segundo ángel derramó su copa sobre el mar, y éste se convirtió en sangre como de muerto, y murió todo ser viviente que había en el mar» (Apocalipsis 16:3).',
      egwC: [["CS 686", "El mar \"se convirtió en sangre como de un muerto; y toda alma viviente fue muerta en el mar.\"", "Cita la segunda copa."]],
      egw: 'CS 686',
      l: { ap16: X('16:3', 'La segunda copa: el mar se vuelve sangre.', 'CS 686', [['Apocalipsis 16:3', 'éste se convirtió en sangre como de muerto, y murió todo ser viviente que había en el mar']]) } },
    { id: 'plaga3', fase: 'angustia', grupo: 'copas', t: 'La tercera plaga: los ríos en sangre', c: '3.ª plaga', cuando: 'La tercera copa',
      nota: '«El tercer ángel derramó su copa sobre los ríos y sobre las fuentes de las aguas, y se convirtieron en sangre» (Apocalipsis 16:4). El ángel de las aguas dice: «Por cuanto derramaron la sangre de los santos y de los profetas, también tú les has dado a beber sangre, pues se lo merecen» (16:6).',
      egwC: [["CS 686", "También \"los ríos; y . . ., las fuentes de las aguas, . . . se convirtieron en sangre.\"", "Cita la tercera copa."],
        ["CS 686", "Al condenar a muerte al pueblo de Dios, los que lo hicieron son tan culpables de su sangre como si la hubiesen derramado con sus propias manos.", "Explica 16:6: los que condenan a muerte al pueblo de Dios son culpables de su sangre."]],
      egw: 'CS 686',
      l: { ap16: X('16:4-7', 'La tercera copa: los ríos y las fuentes se vuelven sangre; Dios es justo.', 'CS 686', [['Apocalipsis 16:4', 'derramó su copa sobre los ríos y sobre las fuentes de las aguas, y se convirtieron en sangre'], ['Apocalipsis 16:6', 'Por cuanto derramaron la sangre de los santos y de los profetas, también tú les has dado a beber sangre']]) } },
    { id: 'plaga4', fase: 'angustia', grupo: 'copas', t: 'La cuarta plaga: el sol quema', c: '4.ª plaga', cuando: 'La cuarta copa; «la plaga que sigue» (CS 686)',
      nota: '«El cuarto ángel derramó su copa sobre el sol, al cual le fue permitido quemar a los hombres con fuego. Los hombres fueron quemados con el gran calor y blasfemaron el nombre de Dios, que tiene poder sobre estas plagas, y no se arrepintieron para darle gloria» (Apocalipsis 16:8-9).',
      egwC: [["CS 686", "En la plaga que sigue, se le da poder al sol para \"quemar a los hombres con fuego. Y los hombres se quemaron con el grande calor.\"", "Cita la cuarta copa (Apocalipsis 16:8-9; CS imprime «14: 8, 9»)."]],
      egw: 'CS 686',
      l: { ap16: X('16:8-9', 'La cuarta copa: el sol quema a los hombres, y no se arrepienten.', 'CS 686', [['Apocalipsis 16:8', 'derramó su copa sobre el sol, al cual le fue permitido quemar a los hombres con fuego'], ['Apocalipsis 16:9', 'no se arrepintieron para darle gloria']]) } },
    { id: 'plaga5', fase: 'angustia', grupo: 'copas', t: 'La quinta plaga: tinieblas sobre el trono de la bestia', c: '5.ª plaga', cuando: 'La quinta copa',
      nota: '«El quinto ángel derramó su copa sobre el trono de la bestia, y su reino se cubrió de tinieblas. La gente se mordía la lengua por causa del dolor y blasfemaron contra el Dios del cielo por sus dolores y por sus úlceras, y no se arrepintieron de sus obras» (Apocalipsis 16:10-11).',
      egw: 'CS 685-687 habla de las plagas juntas; no cita la quinta',
      l: { ap16: X('16:10-11', 'La quinta copa: tinieblas sobre el reino de la bestia.', 'Apocalipsis 16:10-11', [['Apocalipsis 16:10', 'derramó su copa sobre el trono de la bestia, y su reino se cubrió de tinieblas'], ['Apocalipsis 16:11', 'no se arrepintieron de sus obras']]) } },
    { id: 'plaga6', fase: 'angustia', grupo: 'copas', t: 'La sexta plaga: el Éufrates se seca', c: '6.ª plaga', cuando: 'La sexta copa',
      nota: '«El sexto ángel derramó su copa sobre el gran río Éufrates, y el agua de éste se secó para preparar el camino a los reyes del oriente» (Apocalipsis 16:12). En la misma copa, tres espíritus de demonios van a los reyes de la tierra «para reunirlos para la batalla de aquel gran día del Dios Todopoderoso» (16:14), «en el lugar que en hebreo se llama Armagedón» (16:16).',
      egwC: [["CS 618", "El profeta dice: \"Y vi ... tres espíritus inmundos, como ranas: . . . son espíritus de demonios, que obran prodigios; los cuales salen a los reyes de todo el mundo habitado, a juntarlos para la guerra del gran, día del Dios Todopoderoso.\"", "Elena de White cita 16:13-14 para el espiritismo «en el poco tiempo que nos separa del fin»; no dice que sea en la sexta plaga."]],
      egw: 'CS 685-687 habla de las plagas juntas; CS 618 cita 16:13-14',
      l: { ap16: X('16:12-16', 'La sexta copa: se seca el Éufrates y los espíritus de demonios reúnen a los reyes en Armagedón.', 'Apocalipsis 16:12-16', [['Apocalipsis 16:12', 'derramó su copa sobre el gran río Éufrates, y el agua de éste se secó para preparar el camino a los reyes del oriente'], ['Apocalipsis 16:14', 'van a los reyes de la tierra en todo el mundo para reunirlos para la batalla de aquel gran día del Dios Todopoderoso'], ['Apocalipsis 16:16', 'Y los reunió en el lugar que en hebreo se llama Armagedón']]) } },
    { id: 'falso', fase: 'angustia', grupo: 'sin', t: 'Satanás se hace pasar por Cristo', c: 'Falso Cristo', cuando: 'Después del cierre de la gracia, en el gran tiempo de angustia',
      nota: '«El acto capital que coronará el gran drama del engaño será que el mismo Satanás se dará por el Cristo» (CS 682). Dice que mudó el sábado al domingo. No puede imitar la manera en que viene Jesús. Los engaños empiezan antes (EUD 138), pero este acto capital va después del cierre de la gracia.',
      egwC: [["CS 682", "El acto capital que coronará el gran drama del engaño será que el mismo Satanás se dará por el Cristo.", "El engaño final: Satanás se presenta como si fuera Cristo."]],
      egw: 'CS 681-683; EUD 138',
      l: { mt24: X('24:23-27', 'Falsos cristos con grandes señales; pero la venida será como el relámpago.', 'CS 683'),
        ap12: I('12:12', 'El diablo desciende con gran ira, sabiendo que tiene poco tiempo.', 'CS 681', [['Apocalipsis 12:12', 'el diablo ha descendido a vosotros con gran ira, sabiendo que tiene poco tiempo']]),
        ap13: I('13:13-14', 'Engaña con señales, hasta hacer descender fuego del cielo.', 'CS 609 y 682', [['Apocalipsis 13:14', 'Engaña a los habitantes de la tierra con las señales']]),
        ap16: I('16:13-14', 'Espíritus de demonios que hacen señales van a los reyes de la tierra. El texto está en la sexta copa; Elena de White lo cita para el espiritismo del fin, sin ponerlo en una plaga.', 'CS 618', [['Apocalipsis 16:14', 'Son espíritus de demonios, que hacen señales y van a los reyes de la tierra']]) } },
    { id: 'huida', fase: 'angustia', grupo: 'sin', t: 'La huida a los lugares solitarios', c: 'Huida', cuando: 'Cuando el decreto les quita la protección de las leyes',
      nota: 'El pueblo de Dios huye de las ciudades y los pueblos y vive en grupos en los lugares más desiertos y solitarios. Muchos son encarcelados; Dios no los olvida.',
      egwC: [["CS 684", "el pueblo de Dios huirá de las ciudades y de los pueblos y se unirá en grupos para vivir en los lugares más desiertos y solitarios.", "Sin la protección del gobierno, el pueblo de Dios huye a lugares solitarios."]],
      egw: 'CS 683-685; PE 34 y 282', l: {} },
    { id: 'decreto', fase: 'angustia', grupo: 'sin', t: 'El decreto de muerte', c: 'Decreto de muerte', cuando: 'Durante las plagas; fija una noche',
      nota: 'Acusan a los que guardan el sábado de traer los juicios de Dios. Un decreto general fija una noche para darles muerte.',
      egwC: [["CS 693", "Conforme vaya acercándose el tiempo señalado en el decreto, el pueblo conspirará para extirpar la secta aborrecida.", "El decreto fija una fecha para matar a los que guardan el sábado."]],
      egw: 'CS 673 y 692-693; PE 36-37 y 282-284',
      l: { d11: I('11:45', 'Planta sus tiendas junto al monte glorioso: el decreto contra el pueblo de Dios.', B11 + ', p. 240', [['Daniel 11:45', 'Plantará las tiendas de su palacio entre los mares y el monte glorioso y santo']]),
        ap13: X('13:15', 'La imagen hace matar a todo el que no la adora.', 'CS 692-693', [['Apocalipsis 13:15', 'hiciera matar a todo el que no la adorara']]) } },
    /* v231: la séptima copa. Elena de White cita sus versículos (16:17, 18, 19 y 21) en la noche de
       la liberación (CS 694-695): va a la vez que la liberación, sus señales y la resurrección especial. */
    { id: 'plaga7', fase: 'venida', vez: 'medianoche', t: 'La séptima plaga: «¡Ya está hecho!»', c: '7.ª plaga', cuando: 'A medianoche, cuando Dios libra a su pueblo (CS 694-695)',
      nota: '«El séptimo ángel derramó su copa por el aire. Y salió una gran voz del santuario del cielo, desde el trono, que decía: «¡Ya está hecho!»» (Apocalipsis 16:17). «Entonces hubo relámpagos, voces, truenos y un gran temblor de tierra, un terremoto tan grande cual no lo hubo jamás desde que los hombres existen sobre la tierra» (16:18). «Toda isla huyó y los montes ya no fueron hallados» (16:20). «Del cielo cayó sobre los hombres un enorme granizo, como del peso de un talento» (16:21).',
      egwC: [["CS 694", "En medio de los cielos conmovidos hay un claro de gloria indescriptible, de donde baja la voz de Dios semejante al ruido de muchas aguas, diciendo: \"Hecho es.\" (Apocalipsis 16: 17.)", "La voz de la séptima copa, en la noche de la liberación."],
        ["CS 694", "Esa misma voz sacude los cielos y la tierra. Síguese un gran terremoto, \"cual no fue jamás desde que los hombres han estado sobre la tierra.\" (Vers. 18.)", "El terremoto de la séptima copa."],
        ["CS 695", "\"La grande Babilonia vino en memoria delante de Dios, para darle el cáliz del vino del furor de su ira.\" (Vers. 19.)", "Babilonia en la séptima copa."],
        ["CS 695", "Pedrisco grande, cada piedra, \"como del peso de un talento\" (vers. 21), hace su obra de destrucción.", "El granizo de la séptima copa."]],
      egw: 'CS 694-695',
      l: { ap16: X('16:17-21', 'La séptima copa: la voz desde el trono, el terremoto, Babilonia, las islas y el granizo.', 'CS 694-695', [['Apocalipsis 16:17', 'El séptimo ángel derramó su copa por el aire'], ['Apocalipsis 16:18', 'un terremoto tan grande cual no lo hubo jamás desde que los hombres existen sobre la tierra'], ['Apocalipsis 16:19', 'La gran Babilonia vino en memoria delante de Dios'], ['Apocalipsis 16:20', 'Toda isla huyó y los montes ya no fueron hallados'], ['Apocalipsis 16:21', 'Del cielo cayó sobre los hombres un enorme granizo, como del peso de un talento']]) } },
    { id: 'liberacion', fase: 'venida', vez: 'medianoche', t: 'La liberación del pueblo de Dios', c: 'Liberación', cuando: 'A medianoche, en la séptima plaga',
      nota: 'Cuando van a matarlos, densas tinieblas caen y un arco iris envuelve a los que oran. A medianoche, la voz de Dios dice «Hecho es» y viene un terremoto como nunca hubo. El poder perseguidor llega a su fin sin que nadie lo ayude.',
      egwC: [["CS 693", "Entonces, en la hora de supremo apuro, es cuando el Dios de Israel intervendrá para librar a sus escogidos.", "Dios libra a su pueblo en el momento de mayor peligro."]],
      egw: 'CS 693-694; PE 285',
      l: { d11: I('11:45', '«Llegará a su fin, y no tendrá quien lo ayude.»', B11 + ', p. 240', [['Daniel 11:45', 'llegará a su fin, y no tendrá quien lo ayude']]),
        d12: X('12:1', 'Es libertado el pueblo inscrito en el libro.', 'CS 693', [['Daniel 12:1', 'en aquel tiempo será libertado tu pueblo, todos los que se hallen inscritos en el libro']]),
        ap16: I('16:17-18', 'La voz desde el trono: «¡Ya está hecho!», y el gran terremoto.', 'CS 694', [['Apocalipsis 16:17', 'salió una gran voz del santuario del cielo, desde el trono, que decía: «¡Ya está hecho!»']]),
        ap17: I('17:16', 'Los reyes aborrecen a la ramera: las multitudes se vuelven contra Babilonia.', B17 + ', p. 23', [['Apocalipsis 17:16', 'aborrecerán a la ramera']]) } },
    /* v229 (Camilo: «las señales de la liberación en El conflicto de los siglos»): CS 693-697, en su
       orden, cada una literal con su página. v231 (Camilo aceptó catorce): numeradas del 1 al 14. */
    { id: 'senales', fase: 'venida', vez: 'medianoche', egwNum: true, t: 'Las señales de la liberación', c: 'Señales de la liberación', cuando: 'A medianoche, en la séptima plaga, mientras Dios libra a su pueblo',
      nota: 'Una tras otra, en la noche de la liberación: “Sucédense señales y prodigios con rapidez. Los malos miran la escena con terror y asombro, mientras los justos contemplan con gozo las señales de su liberación” (CS 694).',
      egwC: [["CS 693", "de pronto densas tinieblas, más sombrías que la obscuridad de la noche caen sobre la tierra.", "Las tinieblas caen cuando los impíos van a atacar."], ["CS 693", "Luego un arco iris, que refleja la gloria del trono de Dios, se extiende de un lado a otro del cielo, y parece envolver a todos los grupos en oración.", "El arco iris de la promesa rodea a los que oran."], ["CS 694", "Los hijos de Dios oyen una voz clara y melodiosa que dice: \"Enderezaos,\" y, al levantar la vista al cielo, contemplan el arco de la promesa.", "Una voz a los hijos de Dios; ven la gloria de Dios y al Hijo del hombre en su trono."], ["CS 694", "Es a medianoche cuando Dios manifiesta su poder para librar a su pueblo. Sale el sol en todo su esplendor.", "El sol sale a medianoche."], ["CS 694", "La naturaleza entera parece trastornada. Los ríos dejan de correr.", "Los ríos se detienen."], ["CS 694", "Nubes negras y pesadas se levantan y chocan unas con otras.", "Las nubes chocan unas con otras."], ["CS 694", "En medio de los cielos conmovidos hay un claro de gloria indescriptible, de donde baja la voz de Dios semejante al ruido de muchas aguas, diciendo: \"Hecho es.\" (Apocalipsis 16: 17.)", "La voz de Dios de la séptima copa (Apocalipsis 16:17)."], ["CS 694", "Esa misma voz sacude los cielos y la tierra. Síguese un gran terremoto, \"cual no fue jamás desde que los hombres han estado sobre la tierra.\" (Vers. 18.)", "El gran terremoto (Apocalipsis 16:18)."], ["CS 695", "Pedrisco grande, cada piedra, \"como del peso de un talento\" (vers. 21), hace su obra de destrucción.", "El granizo (Apocalipsis 16:21)."], ["CS 695", "Los muros de las cárceles se parten de arriba abajo, y son libertados los hijos de Dios que habían sido apresados por su fe.", "Se abren las cárceles: quedan libres los presos por su fe."], ["CS 695", "Los sepulcros se abren y \"muchos de los que duermen en el polvo de la tierra serán despertados, unos para vida eterna, y otros para vergüenza y confusión perpetua.\" (Daniel 12: 2.)", "La resurrección especial (Daniel 12:2); tiene su propia fila."], ["CS 695", "Fieros relámpagos rasgan el cielo con fragor, envolviendo a la tierra en claridad de llamaradas. Por encima del ruido aterrador de los truenos, se oyen voces misteriosas y terribles que anuncian la condenación de los impíos.", "Relámpagos y voces que anuncian la condenación de los impíos."], ["CS 696", "Por un desgarrón de las nubes una estrella arroja rayos de luz cuyo brillo queda cuadruplicado por el contraste con la obscuridad.", "Una estrella: esperanza para los fieles, severidad para los transgresores."], ["CS 697", "Entonces aparece en el cielo una mano que sostiene dos tablas de piedra puestas una sobre otra.", "La ley de Dios en el cielo, norma del juicio (Salmo 50:6)."]],
      egw: 'CS 693-697',
      l: { ap16: X('16:17-21', 'La séptima copa: la gran voz desde el trono, el terremoto y el granizo.', 'CS 694-695', [['Apocalipsis 16:17', 'salió una gran voz del santuario del cielo, desde el trono, que decía: «¡Ya está hecho!»'], ['Apocalipsis 16:18', 'un terremoto tan grande cual no lo hubo jamás desde que los hombres existen sobre la tierra'], ['Apocalipsis 16:21', 'Del cielo cayó sobre los hombres un enorme granizo, como del peso de un talento.']]) } },
    { id: 'especial', fase: 'venida', vez: 'medianoche', t: 'La resurrección especial', c: 'Resurrección especial', cuando: 'En el terremoto de la séptima plaga, antes de que aparezca Cristo',
      nota: 'Se abren los sepulcros. Resucitan dos grupos: los que murieron en la fe del mensaje del tercer ángel, para ver la venida, y «los que lo traspasaron» (Apocalipsis 1:7) con los que se burlaron de Cristo y los enemigos más acérrimos de su verdad, para verlo en su gloria. Es la resurrección parcial de Daniel 12:2, «unos para vida eterna, otros para vergüenza y confusión perpetua». Jesús se lo dijo al sumo sacerdote (Mateo 26:64).',
      /* v229 (Camilo): también «los que le traspasaron»; cada aplicación de Elena de White, literal. */
      egwC: [["CS 695", "Los sepulcros se abren y \"muchos de los que duermen en el polvo de la tierra serán despertados, unos para vida eterna, y otros para vergüenza y confusión perpetua.\" (Daniel 12: 2.)", "Aplica Daniel 12:2 a esta resurrección: resucitan de las dos clases."], ["CS 695", "Todos los que murieron en la fe del mensaje del tercer ángel, salen glorificados de la tumba, para oír el pacto de paz que Dios hace con los que guardaron su ley.", "El primer grupo: los fieles del mensaje del tercer ángel."], ["CS 695", "\"Los que le traspasaron\" (Apocalipsis 1: 7), los que se mofaron y se rieron de la agonía de Cristo y los enemigos más acérrimos de su verdad y de su pueblo, son resucitados para mirarle en su gloria y para ver el honor con que serán recompensados los fieles y obedientes.", "El segundo grupo: los que lo crucificaron, los que se burlaron y los peores enemigos de su verdad (Apocalipsis 1:7)."], ["CS 700", "Allí están los que se mofaron de Cristo en su humillación. Con fuerza penetrante acuden a su mente las palabras del Varón de dolores, cuando, conjurado por el sumo sacerdote, declaró solemnemente: \"Desde ahora habéis de ver al Hijo del hombre sentado a la diestra de la potencia de Dios, y que viene en las nubes del cielo.\" (S. Mateo 26: 64.)", "Se cumple lo que Jesús dijo al sumo sacerdote (Mateo 26:64)."], ["CS 701", "Los que atravesaron con clavos sus manos y sus pies, los soldados que le abrieron el costado, consideran esas señales con terror y remordimiento.", "Los que lo clavaron en la cruz lo ven venir."]],
      egw: 'CS 695 y 700-701; PE 285',
      l: { d12: X('12:2', 'Muchos despiertan, unos para vida eterna y otros para vergüenza: una resurrección parcial, de las dos clases.', 'CS 695; ' + B11 + ', p. 18', [['Daniel 12:2', 'Muchos de los que duermen en el polvo de la tierra serán despertados: unos para vida eterna, otros para vergüenza y confusión perpetua']]),
        ap16: I('16:18', 'El gran terremoto abre los sepulcros.', 'CS 695; PE 285', [['Apocalipsis 16:18', 'un terremoto tan grande cual no lo hubo jamás']]),
        apo: I('1:7', '«Los que lo traspasaron» lo verán venir.', 'CS 695', [['Apocalipsis 1:7', 'Todo ojo lo verá, y los que lo traspasaron']]) } },
    { id: 'voz', fase: 'venida', t: 'La voz de Dios anuncia el día y la hora', c: 'El día y la hora', cuando: 'Después de la liberación, antes de que aparezca la nube',
      nota: 'Desde el cielo, la voz de Dios proclama el día y la hora de la venida de Jesús y da a su pueblo el pacto eterno. Frase por frase, resuena como truenos.',
      egwC: [["CS 698", "Desde el cielo se oye la voz de Dios que proclama el día y la hora de la venida de Jesús, y promulga a su pueblo el pacto eterno.", "Dios mismo anuncia el día y la hora de la venida."]],
      egw: 'CS 698; PE 15, 34 y 285', l: {} },
    { id: 'venida', fase: 'venida', t: 'La segunda venida', c: 'Venida', cuando: 'Al final de las plagas', img: 'd2/e-piedra',
      nota: 'Aparece una pequeña nube negra que se hace gran nube blanca. Cristo viene como Rey de reyes. Es la piedra de Daniel 2 y la ejecución del juicio de Daniel 7.',
      egwC: [["CS 699", "A medida que va acercándose la nube viviente, todos los ojos ven al Príncipe de la vida.", "La segunda venida es visible para todos."]],
      egw: 'CS 698-701; PE 286-287', partes: ['piedra', 'santos', 'x-fases', 'quebrantado'],
      l: { d2: I('2:34, 44-45', 'La piedra cortada sin mano hiere a la imagen en los pies: la venida, sin intervención humana.', B110 + ', p. 63-64', [['Daniel 2:34', 'una piedra se desprendió sin que la cortara mano alguna']]),
        d7: I('7:22, 26', 'Se ejecuta el juicio: los santos reciben el reino y al cuerno le quitan el dominio.', B110 + ', p. 121', [['Daniel 7:22', 'llegó el tiempo, y los santos recibieron el reino'], ['Daniel 7:26', 'le quitarán su dominio']]),
        d8: I('8:25', 'Será quebrantado «no por mano humana», como la piedra de Daniel 2.', B110 + ', p. 63', [['Daniel 8:25', 'será quebrantado, aunque no por mano humana']]),
        mt24: X('24:27, 30', 'Como el relámpago, sobre las nubes del cielo, con poder y gran gloria.', 'CS 683'),
        ap14: X('14:14-16', 'Uno semejante al Hijo del hombre, sobre una nube blanca, siega la mies.', 'CS 698', [['Apocalipsis 14:14', 'Sentado sobre la nube, uno semejante al Hijo del hombre']]),
        ap17: I('17:14', 'El Cordero vence a los reyes, porque es Señor de señores y Rey de reyes.', B17 + ', p. 23', [['Apocalipsis 17:14', 'el Cordero los vencerá, porque es Señor de señores y Rey de reyes']]),
        ap19: X('19:11-16', 'El jinete del caballo blanco: Rey de reyes y Señor de señores.', 'CS 699', [['Apocalipsis 19:16', 'Rey de reyes y Señor de señores']]),
        ap21: X('22:12', '«¡Vengo pronto!, y mi galardón conmigo.»', 'CS 545', [['Apocalipsis 22:12', 'Vengo pronto!, y mi galardón conmigo']]),
        apo: X('1:7; 6:14-17', 'Viene con las nubes y todo ojo lo verá; los impíos piden a los montes que caigan sobre ellos.', 'CS 683 y 700', [['Apocalipsis 1:7', 'He aquí que viene con las nubes: Todo ojo lo verá'], ['Apocalipsis 6:17', 'el gran día de su ira ha llegado']]) } },
    { id: 'justos', fase: 'venida', t: 'La resurrección de los justos', c: 'Resurrección de los justos', cuando: 'En la venida',
      nota: 'Cristo mira las tumbas de los justos y exclama: «¡Despertaos!». Los muertos en Cristo salen con gloria inmortal. Es la primera resurrección.',
      egwC: [["CS 702", "el Hijo de Dios llama a la vida a los santos dormidos.", "En la venida resucitan los justos."]],
      egw: 'CS 702; PE 16 y 287',
      l: { d12: X('12:13', 'A Daniel se le promete levantarse para recibir su heredad al fin de los días.', 'CS 702', [['Daniel 12:13', 'te levantarás para recibir tu heredad al fin de los días']]),
        mt24: I('24:31', 'Los ángeles juntan a los escogidos con gran voz de trompeta: la resurrección de los justos.', B11 + ', p. 220'),
        ap20: X('20:5-6', '«Ésta es la primera resurrección.»', 'CS 702', [['Apocalipsis 20:5', 'Ésta es la primera resurrección'], ['Apocalipsis 20:6', 'Bienaventurado y santo el que tiene parte en la primera resurrección']]) } },
    { id: 'traslacion', fase: 'venida', t: 'La traslación de los vivos', c: 'Traslación', cuando: 'En la venida, junto con los resucitados',
      nota: 'Los justos vivos son mudados en un momento y, con los resucitados, suben a recibir a Cristo en el aire (1 Tesalonicenses 4:16-17).',
      egwC: [["CS 703", "ahora son hechos inmortales, y juntamente con los santos resucitados son arrebatados para recibir a Cristo su Señor en los aires.", "Los justos vivos son transformados y suben con los resucitados."]],
      egw: 'CS 703 y 707; PE 16 y 287',
      l: { mt24: I('24:31', '«Juntarán a sus escogidos de los cuatro vientos.»', 'CS 703'),
        ap14: I('14:1-5', 'Los 144.000, trasladados de entre los vivos, primicias para Dios.', 'CS 707', [['Apocalipsis 14:4', 'Éstos fueron redimidos de entre los hombres como primicias para Dios y para el Cordero']]),
        apo: I('15:2-3', 'Los que vencieron a la bestia, de pie sobre el mar de vidrio.', 'CS 707', [['Apocalipsis 15:2', 'a los que habían alcanzado la victoria sobre la bestia y su imagen']]) } },
    { id: 'desolada', fase: 'mil', t: 'La tierra desolada; Satanás atado', c: 'Tierra desolada', cuando: 'Desde la venida, mil años',
      nota: 'Los impíos vivos mueren en la venida. La tierra queda desolada, y en ella Satanás vaga mil años sin nadie a quien engañar: así está atado.',
      egwC: [["CS 718", "Durante los mil años que transcurrirán entre la primera resurrección y la segunda, se verificará el juicio de los impíos.", "Los mil años empiezan con la primera resurrección, en la venida, y terminan con la segunda."], ["CS 718", "Durante mil años, Satanás andará errante de un lado para otro en la tierra desolada, considerando los resultados de su rebelión contra la ley de Dios.", "En los mil años la tierra queda desolada y Satanás, atado a ella."]],
      egw: 'CS 711-718; PE 289-290',
      l: { ap18: I('18:8', 'Babilonia es quemada con fuego en un solo día.', 'CS 711', [['Apocalipsis 18:8', 'será quemada con fuego']]),
        ap19: X('19:20-21', 'La bestia y el falso profeta son lanzados al lago de fuego; los demás mueren con la espada de su boca.', 'CS 711-715', [['Apocalipsis 19:21', 'Los demás fueron muertos con la espada que salía de la boca del que montaba el caballo']]),
        ap20: X('20:1-3', 'Satanás es atado y encerrado en el abismo mil años.', 'CS 716-717', [['Apocalipsis 20:2', 'lo ató por mil años']]) } },
    { id: 'juzgan', fase: 'mil', t: 'El juicio de los santos', c: 'Juicio de los santos', cuando: 'Durante los mil años, en el cielo',
      nota: 'Con Cristo, los santos juzgan a los impíos y a los ángeles caídos (1 Corintios 6:2-3). Comparan sus actos con los libros y fijan el castigo de cada uno según sus obras.',
      egwC: [["CS 719", "Junto con Cristo juzgan a los impíos, comparando sus actos con el libro de la ley, la Biblia, y fallando cada caso en conformidad con los actos que cometieron por medio de su cuerpo.", "En los mil años los santos juzgan con Cristo a los impíos."]],
      egw: 'CS 718-719; PE 52 y 290-291',
      /* v227 (Camilo): la celda del milenio se queda con 7:22, con la nota de Elena de White. */
      l: { d7: I('7:22', 'El Anciano de días hace justicia a los santos (7:22). Elena de White aplica también esta frase al juicio de los mil años.', 'CS 719', [['Daniel 7:22', 'se hizo justicia a los santos del Altísimo']], [["CS 719", "Daniel declara que cuando vino el Anciano de días, ‘se dio el juicio a los santos del Altísimo.’ (Daniel 7: 22.) En ese entonces reinarán los justos como reyes y sacerdotes de Dios.", "Aplica 7:22 también al juicio que los santos hacen con Cristo durante los mil años."]]),
        ap20: X('20:4', 'Tronos para los que recibieron facultad de juzgar.', 'CS 719', [['Apocalipsis 20:4', 'se sentaron sobre ellos los que recibieron facultad de juzgar']]) } },
    { id: 'segunda', fase: 'fin', t: 'La segunda resurrección', c: 'Segunda resurrección', cuando: 'Al fin de los mil años',
      nota: 'Cristo vuelve a la tierra con los santos y manda a los impíos muertos que resuciten para recibir su condenación.',
      egwC: [["CS 720", "Al descender en majestad aterradora, manda a los muertos impíos que resuciten para recibir su condenación.", "Al fin de los mil años resucitan los impíos."]],
      egw: 'CS 719-720; PE 291-292',
      l: { ap20: X('20:5, 13', 'Los otros muertos no vuelven a vivir hasta que se cumplen los mil años.', 'CS 720', [['Apocalipsis 20:5', 'los otros muertos no volvieron a vivir hasta que se cumplieron mil años']]) } },
    { id: 'jerusalen', fase: 'fin', t: 'Desciende la Nueva Jerusalén', c: 'Nueva Jerusalén', cuando: 'Al fin de los mil años',
      nota: 'Cristo baja sobre el monte de los Olivos (Zacarías 14:4). La ciudad desciende y se asienta en el lugar preparado; Cristo, su pueblo y los ángeles entran en ella.',
      egwC: [["CS 721", "La nueva Jerusalén, descendiendo del cielo en su deslumbrante esplendor, se asienta en el lugar purificado y preparado para recibirla", "La Nueva Jerusalén baja del cielo a la tierra."]],
      egw: 'CS 720-721; PE 51 y 291-292',
      l: { ap20: I('20:9', '«La ciudad amada» ya está en la tierra cuando la rodean.', 'CS 721-722', [['Apocalipsis 20:9', 'rodearon el campamento de los santos y la ciudad amada']]),
        ap21: X('21:2', 'La santa ciudad desciende del cielo.', 'CS 721', [['Apocalipsis 21:2', 'vi la santa ciudad, la nueva Jerusalén, descender del cielo']]) } },
    { id: 'asedio', fase: 'fin', t: 'El asedio a la ciudad', c: 'Asedio', cuando: 'Cuando resucitan los impíos',
      nota: 'Satanás, suelto otra vez, reúne a la multitud de los impíos y la lleva contra la ciudad. Por orden de Jesús se cierran las puertas.',
      egwC: [["CS 722", "los ejércitos de Satanás circundan la ciudad y se preparan para el asalto.", "Satanás reúne a los impíos resucitados contra la ciudad."]],
      egw: 'CS 721-723; PE 292-293',
      l: { ap20: X('20:7-9', 'Satanás es suelto, engaña a las naciones y rodean la ciudad.', 'CS 722', [['Apocalipsis 20:7', 'Satanás será suelto de su prisión'], ['Apocalipsis 20:9', 'rodearon el campamento de los santos y la ciudad amada']]) } },
    { id: 'trono', fase: 'fin', t: 'El juicio ante el gran trono blanco', c: 'Gran trono blanco', cuando: 'Con los impíos ante la ciudad',
      nota: 'Se corona a Cristo ante todos. En una vista panorámica pasa la historia del conflicto; impíos y Satanás reconocen que Dios es justo.',
      egwC: [["CS 724", "el Rey de reyes falla el juicio de aquellos que se rebelaron contra su gobierno, y ejecuta justicia contra los que transgredieron su ley y oprimieron a su pueblo.", "Ante el gran trono blanco se da la sentencia de los perdidos."]],
      egw: 'CS 722-730; PE 293-294',
      l: { ap20: X('20:11-13', 'Los muertos son juzgados según sus obras, por lo escrito en los libros.', 'CS 724', [['Apocalipsis 20:11', 'Vi un gran trono blanco'], ['Apocalipsis 20:12', 'fueron juzgados los muertos por las cosas que estaban escritas en los libros, según sus obras']]) } },
    { id: 'final', fase: 'fin', t: 'La destrucción final', c: 'Destrucción final', cuando: 'Después del juicio ante el trono',
      nota: 'Desciende fuego de Dios. Los impíos y Satanás son consumidos, raíz y rama: es la muerte segunda, de la que no se vuelve.',
      egwC: [["CS 731", "Dios hace descender fuego del cielo.", "El fuego de Dios destruye a los impíos."]],
      egw: 'CS 730-731; PE 294-295',
      l: { ap20: X('20:9-10, 14-15', 'Fuego del cielo los consume: la muerte segunda.', 'CS 731', [['Apocalipsis 20:9', 'de Dios descendió fuego del cielo y los consumió'], ['Apocalipsis 20:14', 'Ésta es la muerte segunda']]) } },
    { id: 'reino', fase: 'fin', t: 'La tierra nueva', c: 'Tierra nueva', cuando: 'Para siempre', img: 'd2/e-monte',
      nota: 'El fuego que consume a los impíos purifica la tierra. Es el gran monte de Daniel 2: el reino llena toda la tierra después de los mil años. Dios vive con su pueblo para siempre.',
      egwC: [["CS 732", "El fuego que consume a los impíos purifica la tierra. Desaparece todo rastro de la maldición.", "La tierra purificada es la tierra nueva."]],
      egw: 'CS 732-737; PE 295', partes: ['monte', 'reino'],
      l: { d2: X('2:35, 44', 'La piedra se hace un gran monte; el reino de Dios no será jamás destruido.', B110 + ', p. 121', [['Daniel 2:35', 'la piedra que hirió a la imagen se hizo un gran monte que llenó toda la tierra'], ['Daniel 2:44', 'el Dios del cielo levantará un reino que no será jamás destruido']]),
        d7: X('7:18, 27', 'Los santos reciben el reino para siempre.', B110 + ', p. 121', [['Daniel 7:27', 'cuyo reino es reino eterno'], ['Daniel 7:18', 'Después recibirán el reino los santos del Altísimo']]),
        d12: I('12:3', 'Los entendidos resplandecen a perpetua eternidad: el reino eterno.', B11 + ', p. 18 y 220-221', [['Daniel 12:3', 'Los entendidos resplandecerán como el resplandor del firmamento']]),
        ap21: X('21:1-5; 22:3-5', 'Un cielo nuevo y una tierra nueva; ya no habrá más muerte.', 'CS 732', [['Apocalipsis 21:1', 'vi un cielo nuevo y una tierra nueva'], ['Apocalipsis 21:4', 'ya no habrá más muerte']]) } },
  ],
  fuente: 'CS (<i>El conflicto de los siglos</i>, ed. 1954) 374, 496-503 y 533-737; PE (<i>Primeros escritos</i>) 15-52 y 269-295; EUD (<i>Eventos de los últimos días</i>, 2009) 17, 104-214; ' + B11 + ', p. 18-240; ' + B110 + ', p. 63-64, 121 y 288; ' + B17 + ', p. 22-23; ' + PIP + ', p. 21 y 53.',
};
/* Compatibilidad: `en` (qué libro lo muestra; '~' = por interpretación), `citas` y `fuente`
   salen de las celdas, para las láminas y las pruebas. */
ULTIMOS.eventos.forEach(e => {
  e.en = {}; e.citas = [];
  ULTIMOS.libros.forEach(([k]) => { const x = e.l[k]; if (x) { e.en[k] = (x[1] ? '' : '~') + x[0]; x[4].forEach(q => e.citas.push(q)); } });
  e.partes = e.partes || []; e.fuente = e.egw;
});

module.exports = { LAMINAS, ULTIMOS, REPARTOS };
