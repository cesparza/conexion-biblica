/* Daniel 11: interpretación con fuentes (capa 'contexto', preguntas f:'c').
   Ya están en fuente/contenido.js: reyes persas (con Jerjes como cuarto),
   reyes tolomeos y seléucidas, Berenice, guerras sirias, Roma, el pacto de
   Constantino a Justiniano, Canossa, Carlomagno, 1798, el «pequeño socorro»,
   36-39 y 40-45 según Treiyer y Maxwell. Aquí va la lectura de Bohr: cómo se
   leyó el rey del norte en la historia adventista, su esquema del capítulo,
   el paso de lo literal a lo espiritual, 11:31 y el 508, y 11:40-45 como
   postura suya, con otras lecturas al lado. */
const { tbl, hi, wa, li } = require('../../apocalipsis/ayudas.js');

module.exports = {
  cap: 'd11',
  secciones: [
    { t: '🧭 Cómo se ha leído al rey del norte en la historia adventista', capa: 'contexto', h:
      `<p>Bohr hace este recorrido:</p>` +
      tbl(['Quién', 'Cuándo', 'El rey del norte es'], [
        ['Guillermo Miller', '1836', 'El papado: el mismo cuerno pequeño'],
        ['Jaime y Elena de White', '1847', 'El último poder que pisotea a la iglesia'],
        ['Urías Smith', '1871', 'Turquía (cambio de postura)'],
        ['Jaime White', '1877-1878', 'Protesta: si es Turquía, también lo serían los pies de Daniel 2 y el cuerno de Daniel 8'],
        ['Louis F. Were', 'Años 1930', 'Vuelve a la postura de los pioneros; luego lo siguen Cottrell y LaRondelle'],
      ]) +
      `<p>Bohr dice que hoy la iglesia ha vuelto en gran parte a la postura de los pioneros.</p>` +
      hi('Elena de White citó versículos de Daniel 11 <b>una sola vez</b> (carta 103, 1904). Allí dijo que «mucho de la historia» de los versículos 30 a 36 «se repetirá». Para Bohr, en <i>El conflicto de los siglos</i> ella sigue el mismo orden de 11:40-12:3 con sus propias palabras: herida sanada, fuerte pregón, tiempo de angustia, liberación.') +
      `<p>Fuente: Stephen Bohr, Studies on Daniel 11, pág. PDF 5-12.</p>` },

    { t: '🧭 El esquema de Daniel 11 según Bohr', capa: 'contexto', h:
      `<p>Daniel 11:1 lleva la misma fecha que Daniel 9:1, el primer año de Darío. Para Bohr eso une el capítulo 11 con las setenta semanas. Por eso lee al <b>cuarto rey</b> de 11:2 como <b>Artajerjes</b>, el del decreto de 457 a.C., y no como Jerjes, como lo hace el estudio de arriba. Gabriel nombra a los tres anteriores solo para ubicar al cuarto.</p>` +
      tbl(['Versículos', 'Qué describe', 'En Daniel 8'], [
        ['11:2', 'Persia hasta Artajerjes', '8:3-4'],
        ['11:3-4', 'Alejandro y su reino partido en cuatro', '8:5-8'],
        ['11:5-15', 'Siria (norte) contra Egipto (sur)', '—'],
        ['11:16-28', 'Roma imperial', '8:9-10'],
        ['11:29-39', 'Roma papal, los 1.260 años', '8:11-12'],
        ['11:40-45', 'El tiempo del fin, desde 1798', '8:17, 19, 25'],
        ['12:1-3', 'Se levanta Miguel, angustia, liberación', '—'],
      ]) +
      `<p>Fuente: Stephen Bohr, Studies on Daniel 11, pág. PDF 15-18.</p>` },

    { t: '🧭 Norte y sur: de lo literal a lo espiritual', capa: 'contexto', h:
      `<p>Bohr sigue un principio de Louis Were: hasta el año 34 d.C. (el fin de las setenta semanas), Israel, Jerusalén, Egipto y Babilonia son lugares literales. Después, el pueblo de Dios es la iglesia en todo el mundo, y sus enemigos también son sistemas mundiales. Por eso en 11:5-15 el norte es Siria y el sur es Egipto, pero en 11:40 ya no.</p>` +
      li([
        '<b>El norte es religión falsa.</b> El verdadero Rey del norte es Dios, en el monte de Sion, «a los lados del norte» (Salmo 48:2; Isaías 14:13). Babilonia siempre invadía a Israel desde el norte. El norte no niega a Dios: lo imita.',
        '<b>El sur es negar a Dios.</b> El faraón dijo: «¿Quién es Jehová...? Yo no conozco a Jehová» (Éxodo 5:2). Elena de White: de todas las naciones de la historia bíblica, Egipto fue la que con más osadía negó al Dios vivo, y eso es ateísmo.',
      ]) +
      wa('Edom, Moab y Amón ya no existen como naciones. Bohr lo usa como prueba de que en 11:40-45 no se puede leer un mapa literal.') +
      `<p>Fuentes: Stephen Bohr, Studies on Daniel 11, pág. PDF 19-24 y 98-99; Elena de White, El conflicto de los siglos, pág. PDF 228 (p. 269 en inglés).</p>` },

    { t: '🧭 Daniel 11:31: las tropas de 508', capa: 'contexto', h:
      `<p>«Se levantarán sus tropas, que profanarán el santuario... quitarán el sacrificio continuo y pondrán la abominación desoladora» (11:31). Según Bohr, «tropas» en plural son fuerzas militares o políticas: el rey del norte ya existía, pero ahora recibe el apoyo del estado.</p>` +
      hi('En el año <b>508</b>, Clodoveo, rey de los francos, fue el primero en dar poder civil al papado. Francia fue la primera nación de Europa en dejar el paganismo por la religión católica. Es la unión de iglesia y estado, como el hierro y el barro de los pies de Daniel 2.') +
      `<p>Desde ese año Bohr cuenta los 1.290 y los 1.335 días de Daniel 12:11-12 (ver Daniel 12).</p>` +
      `<p>Fuentes: Stephen Bohr, Studies on Daniel 11, pág. PDF 25-26; Stephen Bohr, Studies in Daniel 1-10, pág. PDF 5.</p>` },

    { t: '🧭 Daniel 11:40-45, según Bohr', capa: 'contexto', h:
      `<p><b>Esta es la postura de Bohr; hay otras</b> (ver la sección siguiente y la de arriba).</p>` +
      tbl(['Versículo', 'Lectura de Bohr'], [
        ['40a', 'En 1798 el rey del sur (la Francia revolucionaria y atea) hiere al rey del norte (el papado). Después, el comunismo hereda ese ateísmo.'],
        ['40b', 'El norte se recupera y vence al sur «como una tempestad», como el Éufrates desbordado: la caída del comunismo, con ayuda de Estados Unidos.'],
        ['41', 'Entra en la tierra gloriosa: Estados Unidos como baluarte de los principios protestantes. «Muchos caerán». Edom, Moab y Amón, parientes de Israel, escapan: el pueblo de Dios que estaba disperso, también en otras iglesias, y se reúne con el remanente.'],
        ['42-43', 'Egipto, Libia y Etiopía: el resto del mundo y sus riquezas quedan bajo su influencia.'],
        ['44', 'Las «noticias del oriente y del norte» son el fuerte pregón y el mensaje del sellamiento, que lo enfurecen.'],
        ['45', 'Pone sus tiendas para dar el golpe final contra el pueblo de Dios, y ahí «llegará a su fin, y no tendrá quien lo ayude».'],
      ]) +
      `<p>Para Bohr, Daniel 3 y 6 son la base: la crisis final será por la adoración y la obediencia a Dios.</p>` +
      `<p>Fuentes: Stephen Bohr, Studies on Daniel 11, pág. PDF 17-19, 98-117, 126, 134-136, 157-158 y 175; Stephen Bohr, Studies in Daniel 1-10, pág. PDF 43.</p>` },

    { t: '🧭 Otras lecturas de 11:40-45', capa: 'contexto', h:
      li([
        '<b>Jeff Pippenger</b> lo lee igual que Bohr y lo ordena en tres pasos: primero cae el rey del sur del siglo XX, la <b>Unión Soviética</b>, por una alianza del Vaticano con Estados Unidos (Bohr dice lo mismo); segundo, Estados Unidos (la tierra gloriosa) queda bajo la influencia de Roma; tercero, el mundo (Egipto) y su economía.',
        '<b>Urías Smith</b> (desde 1871) leía al rey del norte como Turquía. Por años se predicó así, con una batalla final en el Medio Oriente.',
        '<b>Maxwell</b> y otros comentaristas prefieren no cerrar el cumplimiento de cada detalle (ver arriba).',
      ]) +
      wa('Bohr insiste en que la profecía habla de sistemas, no de personas: en ese sistema «se hallan muchas personas sinceras que aman de corazón a Dios».') +
      `<p>Fuentes: Jeff Pippenger, El tiempo del fin: estudio profético de Daniel 11:40-45, pág. PDF 21; Stephen Bohr, Studies on Daniel 11, pág. PDF 6-12 y 114-117; Esteban Bohr, La Gran Cadena Profética, pág. PDF 7.</p>` },

    { t: '🧭 La Biblia explica sus símbolos (1): norte, sur y ejércitos', capa: 'contexto', h:
      `<p>Hasta el año 34 el norte y el sur son Siria y Egipto. Después, la Biblia misma da su sentido:</p>` +
      tbl(['Símbolo', 'Qué representa', 'Dónde lo explica la Biblia'], [
        ['El norte', 'El trono de Dios; el rey del norte falso es Babilonia: religión falsa que imita a Dios', 'Salmo 48:2; Isaías 14:13; Jeremías 1:14 (el mal venía del norte: Babilonia)'],
        ['El sur, Egipto', 'Negar a Dios: el ateísmo', 'Éxodo 5:2; Apocalipsis 11:8: la ciudad que «en sentido espiritual se llama Sodoma y Egipto»'],
        ['Inundación, tempestad (11:22, 40)', 'Ejércitos que invaden', 'Daniel 11:22: «barridas delante de él como por inundación de aguas»; Isaías 8:7-8'],
        ['Tropas (11:31)', 'El poder del Estado al servicio del rey del norte', 'Daniel 8:24: «su poder se fortalecerá, mas no con fuerza propia»; Apocalipsis 17:2'],
        ['Mares, aguas (11:45)', 'Pueblos y naciones', 'Apocalipsis 17:15: las aguas «son pueblos, muchedumbres, naciones y lenguas»'],
      ]) +
      `<p>Fuentes: Stephen Bohr, Studies on Daniel 11, pág. PDF 18-25 y 98-99; Esteban Bohr, 15 principios de interpretación profética, vol. 2, pág. PDF 102 y 105-106; Stephen Bohr, Studies in Daniel 1-10, pág. PDF 345; notas de Camilo en Evernote, "8. Daniel 11 - El Rey del Norte y el Rey del Sur (clave)".</p>` },

    { t: '🧭 La Biblia explica sus símbolos (2): el tiempo del fin', capa: 'contexto', h:
      tbl(['Símbolo', 'Qué representa', 'Dónde lo explica la Biblia'], [
        ['Tierra gloriosa (11:41)', 'La tierra del pueblo de Dios. Antes, Israel; después de la cruz, el Israel espiritual. Para Bohr, hoy Estados Unidos como baluarte protestante', 'Daniel 8:9; Gálatas 3:29; Romanos 2:28-29; Apocalipsis 13:11'],
        ['Edom, Moab y Amón', 'Parientes de Israel: el pueblo de Dios disperso que escapa', 'Génesis 19:36-38; 36:1; «escaparán» es la palabra de «será libertado» (12:1)'],
        ['Egipto, Libia y Etiopía (11:42-43)', 'El resto del mundo y sus riquezas', 'Apocalipsis 11:8 (Egipto en sentido espiritual)'],
        ['Noticias del oriente (11:44)', 'El mensaje del sellamiento', 'Apocalipsis 7:2: un ángel «que subía desde donde sale el sol y que tenía el sello del Dios vivo»'],
        ['Noticias del norte (11:44)', 'El fuerte pregón, que viene de Dios', 'Apocalipsis 18:1: «la tierra fue alumbrada con su gloria»; Salmo 48:2'],
        ['Monte glorioso y santo (11:45)', 'Sion: el pueblo de Dios reunido', 'Hebreos 12:22; Joel 2:32'],
      ]) +
      `<p>Fuentes: Stephen Bohr, Studies on Daniel 11, pág. PDF 18-21, 126, 134-136 y 175; Esteban Bohr, 15 principios de interpretación profética, vol. 2, pág. PDF 106; notas de Camilo en Evernote, "8. Daniel 11 - El Rey del Norte y el Rey del Sur (clave)".</p>` },
  ],
  preguntas: [
    { t: 'mc', v: '11:2', f: 'c', q: 'Según Bohr, que sigue a Jacques Doukhan, ¿quién es el cuarto rey persa de Daniel 11:2?', o: ['Artajerjes I', 'Jerjes I', 'Darío I', 'Cambises II'], a: 0, e: 'Bohr une 11:2 con Daniel 9: el cuarto rey es el que dio el decreto de 457 a.C. Otros autores, como el estudio de este capítulo, lo identifican con Jerjes. Fuente: Stephen Bohr, Studies on Daniel 11, pág. PDF 16.' },
    { t: 'mc', v: '11:40', f: 'c', q: 'Según Bohr, ¿qué representa el «rey del sur» en el tiempo del fin?', o: ['El ateísmo y el secularismo', 'El mundo islámico', 'El Imperio otomano', 'El protestantismo'], a: 0, e: 'Egipto fue la nación que negó al Dios vivo (Éxodo 5:2). En el tiempo del fin representa todo sistema que deja a Dios fuera. Fuente: Stephen Bohr, Studies on Daniel 11, pág. PDF 98-99.' },
    { t: 'mc', v: '11:40', f: 'c', q: 'Según Bohr, ¿qué hecho de 1798 cumple que «el rey del sur contenderá con él»?', o: ['Francia tomó preso al papa', 'Napoleón invadió Egipto', 'Rusia derrotó a Turquía', 'Inglaterra rompió con Roma'], a: 0, e: 'La Francia revolucionaria y atea hirió al papado: llevó cautivo a Pío VI. Así comenzó el tiempo del fin. Fuente: Stephen Bohr, Studies on Daniel 11, pág. PDF 105.' },
    { t: 'mc', v: '11:41', f: 'c', q: 'Según Bohr, ¿qué representa la «tierra gloriosa» de 11:41?', o: ['Estados Unidos como baluarte protestante', 'El actual Estado de Israel', 'La ciudad de Roma y el Vaticano', 'Palestina bajo los turcos'], a: 0, e: 'No es Estados Unidos solo como país, sino como el lugar fuerte de los principios protestantes, que los llevó al mundo. Fuente: Stephen Bohr, Studies on Daniel 11, pág. PDF 126.' },
    { t: 'mc', v: '11:41', f: 'c', q: 'Según Bohr, ¿qué representan Edom, Moab y Amón, que «escaparán de sus manos»?', o: ['Parientes de Israel que se unen al pueblo fiel', 'Naciones paganas que apoyan al rey del norte', 'Los países árabes del Medio Oriente', 'Los aliados del rey del sur'], a: 0, e: 'Eran parientes de Israel (Esaú y los hijos de Lot). Al final representan al pueblo de Dios disperso que escapa del rey del norte y se reúne con el remanente. Fuente: Stephen Bohr, Studies on Daniel 11, pág. PDF 134-136 y 157-158.' },
    { t: 'tf', v: '11:41', f: 'c', q: 'Según Bohr, la palabra hebrea traducida «escaparán» en 11:41 es la misma que «será libertado» en 12:1.', a: true, e: 'Verdadero. Por eso Bohr cree que los que escapan en 11:41 son los mismos que serán librados en el tiempo de angustia. Fuente: Stephen Bohr, Studies on Daniel 11, pág. PDF 136.' },
    { t: 'tf', v: '11:40', f: 'c', q: 'Según Bohr, Urías Smith cambió en 1871 la identificación del rey del norte: del papado pasó a Turquía.', a: true, e: 'Verdadero. Jaime White se opuso, y en los años 1930 Louis Were volvió a la postura de los pioneros. Fuente: Stephen Bohr, Studies on Daniel 11, pág. PDF 6-7 y 12.' },
    { t: 'mc', v: '11:40', f: 'c', q: 'Según Bohr, ¿qué evangelista australiano retomó en los años 1930 la postura de los pioneros sobre el rey del norte?', o: ['Louis F. Were', 'Urías Smith', 'Raymond Cottrell', 'Jaime White'], a: 0, e: 'Were lo hizo con oposición y aun perdió sus credenciales; después Cottrell y LaRondelle siguieron su trabajo. Fuente: Stephen Bohr, Studies on Daniel 11, pág. PDF 12-13.' },
    { t: 'tf', v: '11:30', f: 'c', q: 'Según Bohr, Elena de White citó versículos de Daniel 11 una sola vez, para decir que mucha historia de los versículos 30 a 36 se repetiría.', a: true, e: 'Verdadero (carta 103, 1904). No dijo que la profecía se cumpliría dos veces, sino que esa historia se repetiría. Fuente: Stephen Bohr, Studies on Daniel 11, pág. PDF 8-9.' },
    { t: 'mc', v: '11:31', f: 'c', q: 'Según Bohr, ¿qué rey dio en 508 poder civil al papado, cumpliendo «se levantarán sus tropas»?', o: ['Clodoveo, rey de los francos', 'Justiniano, emperador de Oriente', 'Carlomagno, emperador de Occidente', 'Teodorico, rey de los ostrogodos'], a: 0, e: 'Clodoveo fue el primero en dar poder temporal al papado. Desde 508 Bohr cuenta los 1.290 y 1.335 días. Fuente: Stephen Bohr, Studies on Daniel 11, pág. PDF 26.' },
    { t: 'mc', v: '11:44', f: 'c', q: 'Según Bohr, ¿qué son las «noticias del oriente y del norte» que atemorizan al rey del norte?', o: ['El fuerte pregón y el sellamiento', 'Guerras de Rusia y de China', 'Rebeliones en el Imperio turco', 'Nuevas cruzadas en Oriente'], a: 0, e: 'El remanente, con la lluvia tardía, proclama el fuerte pregón y el mensaje del sellamiento; eso lo enfurece y lo lleva a perseguirlo. Fuente: Stephen Bohr, Studies on Daniel 11, pág. PDF 175.' },
    { t: 'mc', v: '11:40', f: 'c', q: 'Según Jeff Pippenger, ¿qué potencia del siglo XX fue el rey del sur vencido por el rey del norte?', o: ['La Unión Soviética', 'La Francia de Napoleón', 'El Imperio otomano', 'La Alemania nazi'], a: 0, e: 'Para Pippenger cayó por una alianza del Vaticano con Estados Unidos. Bohr también ve en el comunismo al heredero del ateísmo de 1798. Fuentes: Jeff Pippenger, El tiempo del fin, pág. PDF 21; Stephen Bohr, Studies on Daniel 11, pág. PDF 107-108.' },

    { t: 'mc', v: '11:40', f: 'c', q: 'Según Bohr, ¿qué texto muestra que en la profecía un río que inunda representa la invasión de un ejército?', o: ['Isaías 8:7-8', 'Génesis 7:11-12', 'Salmo 23:1-2', 'Juan 7:37-38'], a: 0, e: 'Isaías compara la invasión asiria con el Éufrates desbordado; así avanza el rey del norte en 11:40. Fuente: Stephen Bohr, Studies on Daniel 11, pág. PDF 18.' },
    { t: 'mc', v: '11:40', f: 'c', q: 'Según Bohr, ¿por qué el «norte» de Daniel 11 representa una religión que imita a Dios?', o: ['El trono de Dios está a los lados del norte', 'Roma queda al norte de Jerusalén', 'Los papas vinieron del norte de Europa', 'En el norte se adoraba al sol'], a: 0, e: 'Sion está a los lados del norte (Salmo 48:2) y Lucifer quiso sentarse allí (Isaías 14:13). El rey del norte falso no niega a Dios: usurpa su lugar. Fuente: Stephen Bohr, Studies on Daniel 11, pág. PDF 23.' },
    { t: 'tf', v: '11:41', f: 'c', q: 'Según Bohr, como Edom, Moab y Amón ya no existen como naciones, Daniel 11:40-45 no se puede leer como un mapa literal.', a: true, e: 'Verdadero. Después de la cruz, Israel es espiritual y mundial, y sus enemigos también. Fuente: Stephen Bohr, Studies on Daniel 11, pág. PDF 19-21.' },
    { t: 'mc', v: '11:44', f: 'c', q: 'Según las notas de Camilo, ¿con qué texto se explican las «noticias del oriente» de 11:44?', o: ['Apocalipsis 7:2, el ángel con el sello', 'Apocalipsis 13:11, la bestia de la tierra', 'Apocalipsis 12:3, el dragón escarlata', 'Apocalipsis 9:14, los cuatro ángeles'], a: 0, e: 'El ángel sube «desde donde sale el sol» con el sello del Dios vivo: es el mensaje del sellamiento. Fuentes: notas de Camilo en Evernote, "8. Daniel 11 - El Rey del Norte y el Rey del Sur (clave)"; Stephen Bohr, Studies on Daniel 11, pág. PDF 175.' },
  ],
};
