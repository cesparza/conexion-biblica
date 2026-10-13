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
    nota: 'Los metales bajan de valor (del oro al hierro) pero suben en dureza: la historia no camina hacia una edad de oro hecha por el hombre. Y Roma aparece en tres fases: imperial, dividida y papal.' },
  cierre: { ref: 'Daniel 2:45', texto: 'El gran Dios ha mostrado al rey lo que ha de acontecer en lo por venir; y el sueño es verdadero, y fiel su interpretación.',
    titulo: 'Un reino que no será jamás destruido', nota: 'Hoy estamos en los pies. Lo que sigue es la piedra.' },
  /* El capítulo en orden: lo que pasa antes del sueño y después. La
     estatua no se entiende sin esto: Dios le muestra al rey el futuro que
     ningún sabio podía decirle (2:10-11, 27-28). Textos literales RV1995. */
  /* v191: `f` es la escena de cada paso de la historia (laminas/d2/hN.webp).
     Mientras no exista la imagen, se ve la estatua entera, no a media luz. */
  historia: [
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
    { y: -539, f: 'e539', parte: 'plata', t: '539 a.C. · Ciro el Grande toma Babilonia la noche del banquete de Belsasar (5:30-31)' },
    { y: -331, f: 'e331', parte: 'bronce', t: '331 a.C. · Alejandro Magno vence a Darío III en Arbela' },
    { y: -168, f: 'e168', parte: 'hierro', t: '168 a.C. · Roma vence a Macedonia en Pidna' },
    { y: 476, f: 'e476', parte: 'dedos', t: '476 d.C. · Es depuesto Rómulo Augústulo, el último emperador de occidente' },
    { y: 538, f: 'e538', parte: 'barro', t: '538 d.C. · Los ostrogodos dejan Roma; empieza la supremacía papal' },
    { y: 1798, f: 'e1798', t: '1798 d.C. · El general Louis-Alexandre Berthier entra en Roma y se lleva preso a Pío VI' },
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
module.exports = { LAMINAS };
