/* Daniel 5: interpretación (capa contexto, preguntas f:'c').
   Fuentes: Stephen Bohr, «Studies in Daniel 1-10» (en inglés, traducción
   propia; páginas del PDF) y «15 principios de interpretación profética»
   vol. 1. Las citas de Elena de White van como Bohr las cita (páginas de la
   edición en inglés). Lo que ya está en contenido.js (Belsasar corregente,
   Seraías y la piedra en el Éufrates, por qué Belsasar era más culpable) no
   se repite aquí. */
const { tbl, hi, wa, li } = require('../../apocalipsis/ayudas.js');

module.exports = {
  cap: 'd5',
  secciones: [
    {
      t: '🧭 De la Babilonia literal a la Babilonia espiritual',
      capa: 'contexto',
      h: `<p>Los profetas anunciaron que Babilonia nunca sería reedificada (Isaías 13:19-22; Jeremías 50:39-40). Sin embargo, en Apocalipsis Babilonia tiene un papel central en los últimos eventos. ¿Contradicción? Bohr responde que no: <strong>la Babilonia de Apocalipsis es el cumplimiento espiritual</strong> de lo que la ciudad literal representaba.</p>` +
        li([
          'En el Antiguo Testamento, Dios tenía una nación con su capital en Jerusalén, y su adversario tenía otra con capital en Babilonia.',
          'En el Nuevo Testamento el pueblo de Dios ya no es una nación sino una iglesia de todos los pueblos; y su contraparte también es un sistema religioso. Elena de White llama a la Babilonia final una iglesia caída por sus errores (El conflicto de los siglos, págs. 606-607).',
          'Por eso lo que en Daniel 5 es literal —el vino, las copas, los ídolos, el río Éufrates— en Apocalipsis se lee como símbolo.',
        ]) +
        wa(`Babilonia, en la profecía, es un sistema y no las personas: Apocalipsis 18:4 dice que Dios tiene todavía «pueblo mío» dentro de ella, y lo llama a salir.`) +
        `<p>Fuente: Stephen Bohr, Studies in Daniel 1-10, pág. 93.</p>`,
    },
    {
      t: '🧭 Daniel 5, el trasfondo de Apocalipsis 16 y 17',
      capa: 'contexto',
      h: `<p>Para Bohr este capítulo es la base para entender la caída de Babilonia en Apocalipsis:</p>` +
        tbl(['Daniel 5 (literal)', 'Apocalipsis 16-17 (espiritual)'], [
          ['La ciudad está junto al Éufrates, que la protege', 'La ramera se sienta sobre muchas aguas: pueblos y naciones (17:1, 15)'],
          ['El rey da vino y profana los vasos santos', 'Las naciones se embriagan con el vino de Babilonia (17:2)'],
          ['El vino borra la diferencia entre lo santo y lo profano', 'La confusión lleva a la adoración falsa'],
          ['La sentencia llega antes de la caída (5:26-28)', 'Se cierra la gracia antes del fin (22:11)'],
          ['Ciro seca el río y entra a la ciudad', 'Se seca el Éufrates para los reyes del oriente (16:12)'],
          ['El pueblo de Dios vuelve a Jerusalén', 'El pueblo de Dios es librado'],
        ]) +
        hi(`El principio que Bohr repite: en Daniel 5 todo es literal —un rey literal, vino literal, una mano literal, un río literal—, y en Apocalipsis se cumple en forma mundial y espiritual.`) +
        `<p>Fuente: Stephen Bohr, Studies in Daniel 1-10, págs. 41-42 y 105-106.</p>`,
    },
    {
      t: '🧭 Ciro, figura de Cristo, y una ciudad que se creía invencible',
      capa: 'contexto',
      h: `<p>¿Por qué un banquete con el enemigo a las puertas? Porque Belsasar creía la ciudad imposible de tomar. Elena de White la describe con murallas enormes, puertas de bronce, protegida por el Éufrates y con provisiones para veinte años de sitio (Review and Herald, 8-feb-1881, citada por Bohr). Bohr cuenta murallas dobles de más de 25 metros de espesor en total.</p>` +
        li([
          'Ciro desvió el río por los canales que el mismo Nabucodonosor había hecho, y su ejército entró por el cauce seco.',
          'Las puertas interiores habían quedado <strong>abiertas y sin guardia</strong> (Profetas y reyes, pág. 552). No hubo batalla.',
          'Isaías lo había anunciado más de cien años antes, llamando a Ciro por nombre (Isaías 44:28; 45:1). Según Elena de White, Daniel le mostró esas profecías a Ciro, y eso lo movió a dejar volver a los judíos (Profetas y reyes, pág. 557).',
        ]) +
        tbl(['Ciro', 'Cristo'], [
          ['Llamado «su ungido», es decir, su mesías (Isaías 45:1)', 'El Ungido'],
          ['Llamado «mi pastor» (Isaías 44:28)', 'El buen Pastor'],
          ['Viene del oriente, donde sale el sol', 'Los reyes del oriente (Apocalipsis 16:12)'],
          ['Libera al pueblo cautivo y lo devuelve a Jerusalén', 'Libra a su pueblo de la Babilonia final'],
        ]) +
        `<p>Fuente: Stephen Bohr, Studies in Daniel 1-10, págs. 95 y 98-100.</p>`,
    },
    {
      t: '🧭 Mene, mene, tekel, uparsin: lo que no podían entender',
      capa: 'contexto',
      h: `<p>Las palabras estaban en arameo, la lengua de los mismos sabios. Bohr explica que <strong>sí podían leerlas, pero no entenderlas</strong>: cada palabra encerraba una verdad entera y hacía falta interpretación.</p>` +
        tbl(['Palabra', 'Significado literal'], [
          ['MENE', 'Contado'],
          ['MENE', 'Contado'],
          ['TEKEL', 'Pesado'],
          ['U-PARSIN', '«Y divididos»: la «u» es «y»'],
        ]) +
        li([
          'UPARSIN es la única palabra en plural: anuncia que el reino pasaría a dos pueblos, los medos y los persas.',
          'Los antiguos creían que los dioses pesaban en una balanza las obras buenas y malas de cada persona. Dios le habló al rey en un lenguaje que entendía.',
          'En 5:23 Daniel dice «dioses de plata y oro»: invierte el orden de 5:4. Para Bohr no es casual: Babilonia, el oro, ya era historia; lo que seguía era el reino de plata.',
        ]) +
        hi(`Elena de White: cada letra, al formarse, brillaba como un relámpago y quedaba encendida en la pared (Testimonios para los ministros, pág. 436, citada por Bohr).`) +
        `<p>Fuente: Stephen Bohr, Studies in Daniel 1-10, págs. 98-99.</p>`,
    },
    {
      t: '🧭 Pesados en balanza, también hoy',
      capa: 'contexto',
      h: `<p>Bohr aplica el capítulo a nuestro tiempo por tres caminos, con citas de Elena de White:</p>` +
        li([
          '<strong>Lo santo usado como común.</strong> Elena de White compara la profanación de los vasos del templo con tratar el sábado, apartado por Dios como tiempo santo, como un día común de trabajo (Signs of the Times, 27-jul-1891).',
          '<strong>El juicio llega sin aviso.</strong> Mientras unos se ocupan de sus negocios y otros de sus placeres, en esa misma hora puede pronunciarse la sentencia: «pesado has sido en balanza» (El conflicto de los siglos, pág. 491).',
          '<strong>Se juzga según la luz recibida.</strong> La condena no vendrá por haber vivido en error, sino por desperdiciar las oportunidades de conocer la verdad (Signs of the Times, 27-jul-1891).',
        ]) +
        wa(`Elena de White no aplica esto solo a otros: «En la balanza del santuario ha de ser pesada la iglesia adventista del séptimo día», según los privilegios y la luz que ha recibido (Testimonios, tomo 8, pág. 247, citada por Bohr).`) +
        `<p>Fuente: Stephen Bohr, Studies in Daniel 1-10, págs. 96 y 101-102.</p>`,
    },
  ],
  preguntas: [
    { t: 'tf', v: '5:30', f: 'c', q: 'Según Bohr, las profecías de que Babilonia nunca sería reedificada contradicen el papel que Babilonia tiene en Apocalipsis.',
      a: false,
      e: 'Falso: la Babilonia de Apocalipsis es el cumplimiento espiritual de lo que representaba la ciudad literal. Fuente: Stephen Bohr, Studies in Daniel 1-10, pág. 93.' },
    { t: 'mc', v: '5:4', f: 'c', q: 'Según Bohr, el vino que Belsasar bebía en los vasos del templo no le dejó distinguir…',
      o: ['Entre amigos y enemigos', 'Entre lo santo y lo profano', 'Entre el día y la noche', 'Entre medos y persas'], a: 1,
      e: 'El vino borró la diferencia entre lo santo y lo común, como pasó con Nadab y Abiú (Levítico 10), y lo llevó a la idolatría. Fuente: Stephen Bohr, Studies in Daniel 1-10, pág. 96.' },
    { t: 'mc', v: '5:30', f: 'c', q: 'Según Bohr, ¿qué hecho de la caída de Babilonia anticipa la sexta plaga de Apocalipsis 16:12?',
      o: ['El incendio del palacio real', 'La muerte de la reina madre', 'El secamiento del río Éufrates', 'El terremoto que derribó las murallas'], a: 2,
      e: 'Ciro desvió el Éufrates y entró por el cauce seco; en Apocalipsis se seca el Éufrates para los reyes del oriente. Fuente: Stephen Bohr, Studies in Daniel 1-10, págs. 41 y 105.' },
    { t: 'mc', v: '5:31', f: 'c', q: 'Según Bohr, ¿de quién es figura Ciro, el que tomó Babilonia y liberó al pueblo cautivo?',
      o: ['De Cristo', 'De Elías', 'Del rey del norte', 'De Moisés'], a: 0,
      e: 'Isaías lo llama «ungido» y «pastor»; viene del oriente y libera a los cautivos para volver a Jerusalén. Fuente: Stephen Bohr, Studies in Daniel 1-10, pág. 99.' },
    { t: 'tf', v: '5:30', f: 'c', q: 'Según Elena de White, la noche de la caída las puertas interiores de Babilonia habían quedado abiertas y sin protección.',
      a: true,
      e: 'Verdadero: el ejército entró por el cauce del río y por las puertas que, por descuido, quedaron abiertas. Fuente: Elena de White, Profetas y reyes, pág. 552, citada por Stephen Bohr, Studies in Daniel 1-10, pág. 100.' },
    { t: 'mc', v: '5:25', f: 'c', q: 'Según Bohr, ¿qué decían literalmente las palabras escritas en la pared?',
      o: ['«Rey, reino, juicio y fin»', '«Dios, balanza, medos y persas»', '«Oro, plata, bronce y hierro»', '«Contado, contado, pesado y dividido»'], a: 3,
      e: 'Mene (contado), mene (contado), tekel (pesado) y u-parsin (y divididos). Faltaba que alguien explicara qué se contó, qué se pesó y qué se dividiría. Fuente: Stephen Bohr, Studies in Daniel 1-10, pág. 99.' },
    { t: 'mc', v: '5:28', f: 'c', q: 'Según Bohr, ¿por qué UPARSIN es la única palabra en plural?',
      o: ['Porque el reino se dividiría entre medos y persas', 'Porque dos reyes gobernaban Babilonia', 'Porque Dios repitió el juicio dos veces', 'Porque así se escribía siempre en arameo'], a: 0,
      e: 'El plural sugiere los dos pueblos que recibirían el reino: los medos y los persas (5:28). Fuente: Stephen Bohr, Studies in Daniel 1-10, pág. 99.' },
    { t: 'tf', v: '5:8', f: 'c', q: 'Según Bohr, los sabios no pudieron con la escritura porque estaba en un idioma que no conocían.',
      a: false,
      e: 'Falso: estaba en su propia lengua; podían leer las palabras, pero no entender su significado sin una interpretación. Fuente: Stephen Bohr, Studies in Daniel 1-10, págs. 98-99.' },
    { t: 'mc', v: '5:23', f: 'c', q: 'Según Bohr, ¿por qué en Daniel 5:23 la plata se menciona antes que el oro?',
      o: ['Porque la plata era el metal de Marduk', 'Porque así lo exige la gramática aramea', 'Porque Babilonia ya era historia y venía el reino de plata', 'Porque los vasos de plata eran más'], a: 2,
      e: 'El oro (Babilonia) ya había sido juzgado; el siguiente reino era el de plata, los medos y los persas. Fuente: Stephen Bohr, Studies in Daniel 1-10, pág. 99.' },
    { t: 'tf', v: '5:27', f: 'c', q: 'Según Elena de White, también la iglesia adventista será pesada en la balanza del santuario, según la luz y los privilegios que ha recibido.',
      a: true,
      e: 'Verdadero: si su experiencia no corresponde a lo recibido, sobre ella caerá la sentencia «hallado falto». Fuente: Elena de White, Testimonios, tomo 8, pág. 247, citada por Stephen Bohr, Studies in Daniel 1-10, pág. 102.' },
  ],
};
