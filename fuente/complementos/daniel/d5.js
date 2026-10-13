/* Daniel 5: interpretación (capa contexto, preguntas f:'c').
   Fuentes: Stephen Bohr, «Studies in Daniel 1-10» (en inglés, traducción
   propia; páginas del PDF) y «15 principios de interpretación profética»
   vol. 1; Gerhard Pfandl, «Daniel» (libro complementario). Las citas de Elena
   de White van como Bohr las cita (páginas de la edición en inglés). Lo que
   ya está en contenido.js (Belsasar corregente, Seraías y la piedra en el
   Éufrates, por qué Belsasar era más culpable) no se repite aquí.
   v188: voz directa, sin autores en el cuerpo; una sola «Fuente:» corta. */
const { tbl, hi, wa, li } = require('../../apocalipsis/ayudas.js');

module.exports = {
  cap: 'd5',
  secciones: [
    {
      t: '🧭 De la Babilonia literal a la Babilonia espiritual',
      capa: 'contexto',
      h: `<p><strong>Cuándo:</strong> la noche en que cayó Babilonia, en octubre de 539 a.C. (5:30-31). Daniel ya era anciano: llevaba más de 60 años en Babilonia.</p>` +
        `<p>Los profetas anunciaron que Babilonia nunca sería reedificada (Isaías 13:19-22; Jeremías 50:39-40). Sin embargo, en Apocalipsis Babilonia tiene un papel central en los últimos eventos. ¿Contradicción? No: <strong>la Babilonia de Apocalipsis es el cumplimiento espiritual</strong> de lo que la ciudad literal representaba.</p>` +
        li([
          'En el Antiguo Testamento, Dios tenía una nación con su capital en Jerusalén, y su adversario tenía otra con capital en Babilonia.',
          'En el Nuevo Testamento el pueblo de Dios ya no es una nación sino una iglesia de todos los pueblos; y su contraparte también es un sistema religioso: la Babilonia final es una iglesia caída por sus errores.',
          'Por eso lo que en Daniel 5 es literal —el vino, las copas, los ídolos, el río Éufrates— en Apocalipsis se lee como símbolo.',
        ]) +
        wa(`Babilonia, en la profecía, es un sistema y no las personas: Apocalipsis 18:4 dice que Dios tiene todavía «pueblo mío» dentro de ella, y lo llama a salir.`) +
        `<p>Fuente: Bohr, <i>Daniel 1-10</i>, p. 93; CS 606-607; Pfandl, <i>Daniel</i>, p. 27-28.</p>`,
    },
    {
      t: '🧭 Daniel 5, el trasfondo de Apocalipsis 16 y 17',
      capa: 'contexto',
      h: `<p>Este capítulo es la base para entender la caída de Babilonia en Apocalipsis:</p>` +
        tbl(['Daniel 5 (literal)', 'Apocalipsis 16-17 (espiritual)'], [
          ['La ciudad está junto al Éufrates, que la protege', 'La ramera se sienta sobre muchas aguas: pueblos y naciones (17:1, 15)'],
          ['El rey da vino y profana los vasos santos', 'Las naciones se embriagan con el vino de Babilonia (17:2)'],
          ['El vino borra la diferencia entre lo santo y lo profano', 'La confusión lleva a la adoración falsa'],
          ['La sentencia llega antes de la caída (5:26-28)', 'Se cierra la gracia antes del fin (22:11)'],
          ['Ciro el Grande seca el río y entra a la ciudad', 'Se seca el Éufrates para los reyes del oriente (16:12)'],
          ['El pueblo de Dios vuelve a Jerusalén', 'El pueblo de Dios es librado'],
        ]) +
        hi(`El principio: en Daniel 5 todo es literal —un rey literal, vino literal, una mano literal, un río literal—, y en Apocalipsis se cumple en forma mundial y espiritual.`) +
        `<p>Fuente: Bohr, <i>Daniel 1-10</i>, p. 41-42, 105-106.</p>`,
    },
    {
      t: '🧭 Ciro el Grande, figura de Cristo, y una ciudad que se creía invencible',
      capa: 'contexto',
      h: `<p>¿Por qué un banquete con el enemigo a las puertas? Porque Belsasar creía la ciudad imposible de tomar. Tenía murallas dobles de más de 25 metros de espesor en total, puertas de bronce, el Éufrates como defensa y provisiones para veinte años de sitio.</p>` +
        li([
          'Ciro desvió el río por los canales que el mismo Nabucodonosor había hecho, y su ejército entró por el cauce seco.',
          'Las puertas interiores habían quedado <strong>abiertas y sin guardia</strong>. No hubo batalla.',
          'Isaías lo había anunciado más de cien años antes, llamando a Ciro por nombre (Isaías 44:28; 45:1). Daniel le mostró esas profecías a Ciro, y eso lo movió a dejar volver a los judíos.',
        ]) +
        tbl(['Ciro', 'Cristo'], [
          ['Llamado «su ungido», es decir, su mesías (Isaías 45:1)', 'El Ungido'],
          ['Llamado «mi pastor» (Isaías 44:28)', 'El buen Pastor'],
          ['Viene del oriente, donde sale el sol', 'Los reyes del oriente (Apocalipsis 16:12)'],
          ['Libera al pueblo cautivo y lo devuelve a Jerusalén', 'Libra a su pueblo de la Babilonia final'],
        ]) +
        `<p>Fuente: Bohr, <i>Daniel 1-10</i>, p. 95, 98-100; RH 8-feb-1881; PR 552, 557.</p>`,
    },
    {
      t: '🧭 Mene, mene, tekel, uparsin: lo que no podían entender',
      capa: 'contexto',
      h: `<p>Las palabras estaban en arameo, la lengua de los mismos sabios. <strong>Sí podían leerlas, pero no entenderlas</strong>: cada palabra encerraba una verdad entera y hacía falta interpretación.</p>` +
        tbl(['Palabra', 'Significado literal'], [
          ['MENE', 'Contado'],
          ['MENE', 'Contado'],
          ['TEKEL', 'Pesado'],
          ['U-PARSIN', '«Y divididos»: la «u» es «y»'],
        ]) +
        li([
          'UPARSIN es la única palabra en plural: anuncia que el reino pasaría a dos pueblos, los medos y los persas.',
          'Los antiguos creían que los dioses pesaban en una balanza las obras buenas y malas de cada persona. Dios le habló al rey en un lenguaje que entendía.',
          'En 5:23 Daniel dice «dioses de plata y oro»: invierte el orden de 5:4. No es casual: Babilonia, el oro, ya era historia; lo que seguía era el reino de plata.',
        ]) +
        hi(`Cada letra, al formarse, brillaba como un relámpago y quedaba encendida en la pared.`) +
        `<p>Fuente: Bohr, <i>Daniel 1-10</i>, p. 98-99; TM 436.</p>`,
    },
    {
      t: '🧭 Pesados en balanza, también hoy',
      capa: 'contexto',
      h: `<p>El capítulo habla a nuestro tiempo por tres caminos:</p>` +
        li([
          '<strong>Lo santo usado como común.</strong> Profanar los vasos del templo se parece a tratar el sábado, apartado por Dios como tiempo santo, como un día común de trabajo.',
          '<strong>El juicio llega sin aviso.</strong> Mientras unos se ocupan de sus negocios y otros de sus placeres, en esa misma hora puede pronunciarse la sentencia: «pesado has sido en balanza».',
          '<strong>Se juzga según la luz recibida.</strong> La condena no vendrá por haber vivido en error, sino por desperdiciar las oportunidades de conocer la verdad.',
        ]) +
        wa(`Esto no se aplica solo a otros: «En la balanza del santuario ha de ser pesada la iglesia adventista del séptimo día», según los privilegios y la luz que ha recibido (8T 247).`) +
        `<p>Fuente: Bohr, <i>Daniel 1-10</i>, p. 96, 101-102; ST 27-jul-1891; CS 491; 8T 247.</p>`,
    },
    {
      t: '🧭 La Biblia explica sus símbolos',
      capa: 'contexto',
      h: `<p>Lo que en Daniel 5 es literal se lee como símbolo en Apocalipsis 16-18. La misma Biblia da la clave:</p>` +
        tbl(['Símbolo', 'Qué representa', 'Dónde lo explica la Biblia'], [
          ['Babilonia', 'Una iglesia caída: el sistema religioso falso del fin', 'Apocalipsis 14:8; 17:5; 18:2-4: «Salid de ella, pueblo mío»'],
          ['El vino', 'Doctrinas falsas', 'Apocalipsis 17:2: se embriagan «con el vino de su fornicación»; Jeremías 51:7'],
          ['El río Éufrates, las aguas', 'Pueblos y naciones que sostienen a Babilonia', 'Apocalipsis 17:15: las aguas «son pueblos, muchedumbres, naciones y lenguas»; Isaías 8:7'],
          ['El río que se seca', 'Esos pueblos le quitan su apoyo', 'Apocalipsis 16:12; 17:16'],
          ['Ciro el Grande, el rey que viene del oriente', 'Cristo, que libra a su pueblo', 'Isaías 44:28 y 45:1 (pastor y ungido); Apocalipsis 16:12'],
          ['La balanza', 'El juicio de Dios sobre las obras', 'Job 31:6; Proverbios 16:2; 1 Samuel 2:3'],
          ['Los vasos santos usados como comunes', 'Lo santo tratado como profano', 'Levítico 10:10; Ezequiel 22:26'],
        ]) +
        `<p>Fuente: Bohr, <i>Daniel 1-10</i>, p. 41, 93, 96, 98-99, 106, 109; Bohr, <i>15 principios</i> 2:102, 105.</p>`,
    },
  ],
  preguntas: [
    { t: 'tf', v: '5:30', f: 'c', q: 'Las profecías de que Babilonia nunca sería reedificada contradicen el papel que Babilonia tiene en Apocalipsis.',
      a: false,
      e: 'Falso: la Babilonia de Apocalipsis es el cumplimiento espiritual de lo que representaba la ciudad literal. Fuente: Bohr, Daniel 1-10, p. 93.' },
    { t: 'mc', v: '5:4', f: 'c', q: 'El vino que Belsasar bebía en los vasos del templo no le dejó distinguir…',
      o: ['Entre amigos y enemigos', 'Entre lo santo y lo profano', 'Entre el día y la noche', 'Entre medos y persas'], a: 1,
      e: 'El vino borró la diferencia entre lo santo y lo común, como pasó con Nadab y Abiú (Levítico 10), y lo llevó a la idolatría. Fuente: Bohr, Daniel 1-10, p. 96.' },
    { t: 'mc', v: '5:30', f: 'c', q: '¿Qué hecho de la caída de Babilonia anticipa la sexta plaga de Apocalipsis 16:12?',
      o: ['El incendio del palacio real', 'La muerte de la reina madre', 'El secamiento del río Éufrates', 'El terremoto que derribó las murallas'], a: 2,
      e: 'Ciro el Grande desvió el Éufrates y entró por el cauce seco; en Apocalipsis se seca el Éufrates para los reyes del oriente. Fuente: Bohr, Daniel 1-10, p. 41, 105.' },
    { t: 'mc', v: '5:31', f: 'c', q: '¿De quién es figura Ciro, el que tomó Babilonia y liberó al pueblo cautivo?',
      o: ['De Cristo', 'De Elías', 'Del rey del norte', 'De Moisés'], a: 0,
      e: 'Isaías lo llama «ungido» y «pastor»; viene del oriente y libera a los cautivos para volver a Jerusalén. Fuente: Bohr, Daniel 1-10, p. 99.' },
    { t: 'tf', v: '5:30', f: 'c', q: 'La noche de la caída las puertas interiores de Babilonia habían quedado abiertas y sin protección.',
      a: true,
      e: 'Verdadero: el ejército entró por el cauce del río y por las puertas que, por descuido, quedaron abiertas. Fuente: PR 552; Bohr, Daniel 1-10, p. 100.' },
    { t: 'mc', v: '5:25', f: 'c', q: '¿Qué decían literalmente las palabras escritas en la pared?',
      o: ['«Rey, reino, juicio y fin»', '«Dios, balanza, medos y persas»', '«Oro, plata, bronce y hierro»', '«Contado, contado, pesado y dividido»'], a: 3,
      e: 'Mene (contado), mene (contado), tekel (pesado) y u-parsin (y divididos). Faltaba que alguien explicara qué se contó, qué se pesó y qué se dividiría. Fuente: Bohr, Daniel 1-10, p. 99.' },
    { t: 'mc', v: '5:28', f: 'c', q: '¿Por qué UPARSIN es la única palabra en plural?',
      o: ['Porque el reino se dividiría entre medos y persas', 'Porque dos reyes gobernaban Babilonia', 'Porque Dios repitió el juicio dos veces', 'Porque así se escribía siempre en arameo'], a: 0,
      e: 'El plural sugiere los dos pueblos que recibirían el reino: los medos y los persas (5:28). Fuente: Bohr, Daniel 1-10, p. 99.' },
    { t: 'tf', v: '5:8', f: 'c', q: 'Los sabios no pudieron con la escritura porque estaba en un idioma que no conocían.',
      a: false,
      e: 'Falso: estaba en su propia lengua; podían leer las palabras, pero no entender su significado sin una interpretación. Fuente: Bohr, Daniel 1-10, p. 98-99.' },
    { t: 'mc', v: '5:23', f: 'c', q: '¿Por qué en Daniel 5:23 la plata se menciona antes que el oro?',
      o: ['Porque la plata era el metal de Marduk', 'Porque así lo exige la gramática aramea', 'Porque Babilonia ya era historia y venía el reino de plata', 'Porque los vasos de plata eran más'], a: 2,
      e: 'El oro (Babilonia) ya había sido juzgado; el siguiente reino era el de plata, los medos y los persas. Fuente: Bohr, Daniel 1-10, p. 99.' },
    { t: 'tf', v: '5:27', f: 'c', q: 'También la iglesia adventista será pesada en la balanza del santuario, según la luz y los privilegios que ha recibido.',
      a: true,
      e: 'Verdadero: si su experiencia no corresponde a lo recibido, sobre ella caerá la sentencia «hallado falto». Fuente: 8T 247; Bohr, Daniel 1-10, p. 102.' },
    { t: 'mc', v: '5:31', f: 'c', q: 'Según Apocalipsis 17:15, clave para leer la caída de Babilonia, ¿qué representan las aguas del río?',
      o: ['Pueblos, muchedumbres, naciones y lenguas', 'Las lágrimas de los mártires del pasado', 'El bautismo de los creyentes fieles', 'Los ejércitos de los reyes de la tierra'], a: 0,
      e: 'La ramera se sienta sobre esas aguas: los pueblos que la sostienen. Cuando se secan, le quitan su apoyo (Apocalipsis 16:12; 17:16). Fuente: Bohr, Daniel 1-10, p. 104, 106, 109.' },
    { t: 'mc', v: '5:27', f: 'c', q: '¿Qué representaba la balanza para los antiguos, y por qué Dios usó esa imagen con Belsasar?',
      o: ['El juicio de las obras; era un lenguaje que el rey entendía', 'El comercio; Babilonia era una ciudad de mercaderes', 'La justicia del rey; Belsasar era juez supremo', 'El peso del oro; los vasos eran de oro puro'], a: 0,
      e: 'Creían que los dioses pesaban las obras buenas y malas; la Biblia también habla de Dios que pesa las acciones (Job 31:6; Proverbios 16:2). Fuente: Bohr, Daniel 1-10, p. 98.' },
    { t: 'mc', v: '5:30', f: 'c', q: '¿Qué es la Babilonia de Apocalipsis 18?',
      o: ['La iglesia caída por sus errores y pecados', 'La ciudad de Bagdad reconstruida', 'El gobierno de las Naciones Unidas', 'El conjunto de las religiones paganas'], a: 0,
      e: 'Babilonia es «la iglesia, caída por sus errores y pecados», por rechazar la verdad enviada del cielo. Fuente: CS 664-665; Bohr, Daniel 1-10, p. 93.' },
  ],
};
