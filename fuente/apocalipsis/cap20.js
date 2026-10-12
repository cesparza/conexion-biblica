/* Apocalipsis 20 — Los mil años y el juicio ante el gran trono blanco.
   Sigue el modelo de cap01.js. */
const { tbl, hi, wa, li } = require('./ayudas.js');

module.exports = {
  cap: 'ap20', label: 'Apocalipsis 20', sub: 'Los mil años y el gran trono blanco', vs: 15,

  estudio: [
    { t: '📚 En pocas palabras', capa: 'apoyo', h:
      hi(`Un ángel baja del cielo con una <strong>llave</strong> y una
      <strong>gran cadena</strong>, agarra al dragón, que es
      <strong>Satanás</strong>, y lo encierra por <strong>mil años</strong>
      (20:1-3).<br><br>
      Mientras tanto, los que fueron fieles a Jesús <strong>viven y reinan con
      Cristo</strong> esos mil años (20:4). Cuando se acaban, Satanás sale otra
      vez a engañar, pero <strong>fuego del cielo</strong> consume a los que
      lo siguieron, y el diablo es lanzado al lago de fuego (20:7-10).<br><br>
      Al final Juan ve un <strong>gran trono blanco</strong> y unos libros
      abiertos, entre ellos <strong>el libro de la vida</strong> (20:11-12).<br><br>
      <em>La idea del capítulo: el mal tiene fin, y Dios juzga con justicia;
      lo que importa es estar escrito en el libro de la vida.</em>`) },

    { t: '⛓️ Satanás atado mil años (20:1-3)', capa: 'nucleo', h:
      tbl(['Qué', 'Detalle'], [
        ['Quién baja', 'Un <strong>ángel</strong> que descendía del cielo (20:1)'],
        ['Qué traía', 'La <strong>llave del abismo</strong> y una <strong>gran cadena</strong> en la mano (20:1)'],
        ['A quién prendió', 'Al <strong>dragón</strong>, la <strong>serpiente antigua</strong>, que es el <strong>Diablo</strong> y <strong>Satanás</strong> (20:2)'],
        ['Por cuánto', '<strong>Mil años</strong> (20:2)'],
        ['Qué le hizo', 'Lo arrojó al abismo, lo encerró y <strong>puso un sello</strong> sobre él (20:3)'],
        ['Para qué', '«para que no engañara más a las naciones» (20:3)'],
        ['Y después', '«debe ser desatado por un poco de tiempo» (20:3)'],
      ]) +
      wa(`Los <strong>cuatro nombres</strong> del enemigo (dragón, serpiente
      antigua, Diablo, Satanás) ya salieron juntos en 12:9. Aquí vuelven para
      que no haya duda de quién es el que queda atado.`) },

    { t: '👑 Tronos y primera resurrección (20:4-6)', capa: 'nucleo', h:
      li([`Juan vio <strong>tronos</strong>, y se sentaron en ellos <strong>«los
           que recibieron facultad de juzgar»</strong> (20:4).`,
          `Vio las almas de los <strong>decapitados</strong> «por causa del
           testimonio de Jesús y por la palabra de Dios» (20:4).`,
          `Eran los que <strong>no habían adorado a la bestia ni a su
           imagen</strong>, ni recibieron la marca en la frente ni en la mano (20:4).`,
          `<strong>«vivieron y reinaron con Cristo mil años»</strong> (20:4).`,
          `<strong>«Pero los otros muertos no volvieron a vivir hasta que se
           cumplieron mil años»</strong> (20:5).`]) +
      hi(`<strong>«Bienaventurado y santo el que tiene parte en la primera
      resurrección»</strong> (20:6). Sobre ellos <strong>la segunda muerte no
      tiene poder</strong>; serán <strong>sacerdotes de Dios y de Cristo</strong>
      y reinarán con él mil años (20:6).`) },

    { t: '🔢 Seis veces «mil años» (20:2-7)', capa: 'nucleo', h:
      tbl(['Versículo', 'Qué pasa con los mil años'], [
        ['20:2', 'Satanás es atado mil años'],
        ['20:3', 'No engaña a las naciones hasta que se cumplan mil años'],
        ['20:4', 'Los fieles viven y reinan con Cristo mil años'],
        ['20:5', 'Los otros muertos no viven hasta que se cumplen mil años'],
        ['20:6', 'Los de la primera resurrección reinan con él mil años'],
        ['20:7', 'Cuando se cumplen, Satanás es suelto'],
      ]) +
      wa(`No se cruzan: la <strong>primera resurrección</strong> es la de los
      bienaventurados (20:5-6); la <strong>segunda muerte</strong> es el lago
      de fuego (20:14). La primera resurrección es buena noticia; la segunda
      muerte, la que no tiene poder sobre ellos.`) },

    { t: '🔥 Satanás suelto: Gog y Magog (20:7-10)', capa: 'nucleo', h:
      li([`Al cumplirse los mil años, <strong>Satanás será suelto de su
           prisión</strong> (20:7).`,
          `Sale a engañar a las naciones de los <strong>cuatro ángulos de la
           tierra</strong>, <strong>«a Gog y a Magog»</strong> (20:8), para la batalla.`,
          `<strong>«Su número es como la arena del mar»</strong> (20:8).`,
          `Rodearon <strong>«el campamento de los santos y la ciudad
           amada»</strong> (20:9).`,
          `Pero <strong>«de Dios descendió fuego del cielo y los
           consumió»</strong> (20:9).`,
          `El diablo fue lanzado al <strong>lago de fuego y azufre</strong>,
           donde estaban <strong>la bestia y el falso profeta</strong> (20:10).`]) +
      wa(`La bestia y el falso profeta ya habían sido lanzados al lago de fuego
      en 19:20. En 20:10 el que llega es <strong>el diablo</strong>.`) },

    { t: '⚪ El gran trono blanco (20:11-15)', capa: 'nucleo', h:
      li([`Juan vio <strong>«un gran trono blanco»</strong> (20:11), y de
           delante del que estaba sentado huyeron la tierra y el cielo (20:11).`,
          `Vio los muertos, <strong>grandes y pequeños</strong>, de pie ante Dios (20:12).`,
          `<strong>Los libros</strong> fueron abiertos, y otro libro, <strong>«el
           cual es el libro de la vida»</strong> (20:12).`,
          `Fueron juzgados <strong>«según sus obras»</strong> (20:12), por lo
           escrito en los libros.`,
          `<strong>El mar</strong>, y <strong>la muerte y el Hades</strong>,
           entregaron los muertos que tenían (20:13).`,
          `La muerte y el Hades fueron lanzados al lago de fuego: <strong>«Ésta
           es la muerte segunda»</strong> (20:14).`]) +
      hi(`<strong>«El que no se halló inscrito en el libro de la vida, fue
      lanzado al lago de fuego»</strong> (20:15).`) },

    { t: '🧭 Cómo se lee en la iglesia adventista', capa: 'contexto', h:
      hi(`Esto es interpretación, no texto del capítulo. Las preguntas que salen
      de aquí van marcadas como complementarias. Otras iglesias leen los mil
      años de otra manera; esta es la lectura del Comentario Bíblico Adventista
      y de «El conflicto de los siglos».<br><br>
      · Los mil años empiezan con la <strong>segunda venida de Jesús</strong>.
      Los justos muertos resucitan (la <strong>primera resurrección</strong>) y,
      con los justos vivos, suben con Jesús <strong>al cielo</strong>.<br>
      · La tierra queda <strong>desolada</strong>, sin nadie vivo: ese es el
      «abismo». Satanás queda <strong>«atado»</strong> porque no tiene a quién
      engañar.<br>
      · En el cielo, los redimidos <strong>juzgan</strong>: revisan los casos de
      los perdidos (1 Corintios 6:2-3).<br>
      · Al terminar los mil años, la santa ciudad baja, los impíos resucitan
      (la segunda resurrección), Satanás los engaña otra vez y rodean la ciudad.
      El fuego de Dios <strong>los consume</strong> y purifica la tierra.<br>
      · El lago de fuego se entiende como una <strong>destrucción
      definitiva</strong>, «la muerte segunda», no como un sufrimiento sin
      fin.`) },
  ],

  preguntas: [
    { t: 'mc', v: '20:1', lit: 'la llave del abismo y una gran cadena',
      q: '¿Qué traía en la mano el ángel que descendía del cielo? (Apocalipsis 20:1)',
      o: ['La llave del abismo y una gran cadena', 'Las llaves de la muerte y del Hades', 'Una hoz aguda y una corona de oro', 'Un librito abierto y una caña de oro'], a: 0,
      e: '«Vi un ángel que descendía del cielo con la llave del abismo y una gran cadena en la mano» (20:1). Las llaves de la muerte y del Hades las tiene Jesús (1:18).' },
    { t: 'mc', v: '20:2', lit: 'la serpiente antigua, que es el Diablo y Satanás',
      q: 'Según Apocalipsis 20:2, ¿a quién prendió y ató el ángel?',
      o: ['Al dragón, la serpiente antigua, que es el Diablo', 'A la bestia que subió del mar con diez cuernos', 'Al falso profeta que hacía grandes señales', 'A la gran ramera sentada sobre muchas aguas'], a: 0,
      e: '«Prendió al dragón, la serpiente antigua, que es el Diablo y Satanás, y lo ató por mil años» (20:2).' },
    { t: 'tf', v: '20:2',
      q: 'El ángel ató al dragón por cien años. (Apocalipsis 20:2)', a: false,
      e: 'Falso: lo ató por MIL años (20:2).' },
    { t: 'mc', v: '20:3', lit: 'para que no engañara más a las naciones',
      q: '¿Para qué encerró el ángel al dragón y puso un sello sobre él? (Apocalipsis 20:3)',
      o: ['Para que no engañara más a las naciones', 'Para que no hiciera guerra contra los santos', 'Para que no destruyera la tierra ni el mar', 'Para que no subiera otra vez hasta el cielo'], a: 0,
      e: '«…puso un sello sobre él, para que no engañara más a las naciones hasta que fueran cumplidos mil años» (20:3).' },
    { t: 'tf', v: '20:3',
      q: 'Después de los mil años, Satanás debe ser desatado por un poco de tiempo. (Apocalipsis 20:3)', a: true,
      e: 'Verdadero: «Después de esto debe ser desatado por un poco de tiempo» (20:3).' },
    { t: 'fill', v: '20:3', ins: 'Apocalipsis 20:3 (RV1995) — Completa:',
      p: [{ x: '«Lo arrojó al ' }, { b: 'abismo', h: '¿a dónde?' }, { x: ', lo encerró y puso un ' }, { b: 'sello', h: '¿qué puso sobre él?' }, { x: ' sobre él…»' }] },
    { t: 'mc', v: '20:4', lit: 'los que recibieron facultad de juzgar',
      q: 'Según Apocalipsis 20:4, ¿quiénes se sentaron sobre los tronos?',
      o: ['Los que recibieron facultad de juzgar', 'Los veinticuatro ancianos vestidos de blanco', 'Los siete ángeles que tenían las copas', 'Los cuatro seres vivientes llenos de ojos'], a: 0,
      e: '«Vi tronos, y se sentaron sobre ellos los que recibieron facultad de juzgar» (20:4). Los veinticuatro ancianos en tronos son de 4:4.' },
    { t: 'mc', v: '20:4', lit: 'no habían adorado a la bestia ni a su imagen',
      q: 'Según Apocalipsis 20:4, ¿qué NO habían hecho las almas que vio Juan?',
      o: ['No habían adorado a la bestia ni a su imagen', 'No habían comido de lo sacrificado a ídolos', 'No habían guardado las palabras del libro', 'No habían oído la voz del ángel de Dios'], a: 0,
      e: '«…los que no habían adorado a la bestia ni a su imagen, ni recibieron la marca en sus frentes ni en sus manos» (20:4).' },
    { t: 'mc', v: '20:4', lit: 'reinaron con Cristo mil años',
      q: '¿Cuánto tiempo vivieron y reinaron con Cristo? (Apocalipsis 20:4)',
      o: ['Mil años', 'Siete años', 'Cuarenta y dos meses', 'Mil doscientos sesenta días'], a: 0,
      e: '«…y vivieron y reinaron con Cristo mil años» (20:4).' },
    { t: 'mc', v: '20:5', lit: 'Ésta es la primera resurrección',
      q: '¿Qué texto dice «Ésta es la primera resurrección»?',
      o: ['Apocalipsis 20:5', 'Apocalipsis 20:14', 'Apocalipsis 20:6', 'Apocalipsis 20:4'], a: 0,
      e: 'Apocalipsis 20:5. «Ésta es la muerte segunda» es 20:14.' },
    { t: 'tf', v: '20:5',
      q: 'Los otros muertos no volvieron a vivir hasta que se cumplieron mil años. (Apocalipsis 20:5)', a: true,
      e: 'Verdadero (Apocalipsis 20:5).' },
    { t: 'mc', v: '20:6', lit: 'la segunda muerte no tiene poder sobre estos',
      q: 'Según Apocalipsis 20:6, ¿qué no tiene poder sobre los que tienen parte en la primera resurrección?',
      o: ['La segunda muerte', 'La marca de la bestia', 'El falso profeta', 'Las siete plagas'], a: 0,
      e: '«…la segunda muerte no tiene poder sobre estos» (20:6).' },
    { t: 'fill', v: '20:6', ins: 'Apocalipsis 20:6 (RV1995) — Completa:',
      p: [{ x: '«Bienaventurado y ' }, { b: 'santo', h: 'bienaventurado y…' }, { x: ' el que tiene parte en la ' }, { b: 'primera', h: '¿cuál resurrección?' }, { x: ' resurrección»' }] },
    { t: 'mc', v: '20:6', lit: 'serán sacerdotes de Dios y de Cristo',
      q: '¿Qué serán los que tienen parte en la primera resurrección? (Apocalipsis 20:6)',
      o: ['Sacerdotes de Dios y de Cristo', 'Jueces de las doce tribus', 'Columnas en el templo de Dios', 'Ángeles delante del trono'], a: 0,
      e: '«…serán sacerdotes de Dios y de Cristo y reinarán con él mil años» (20:6).' },
    { t: 'tf', v: '20:7',
      q: 'Cuando los mil años se cumplan, Satanás será suelto de su prisión. (Apocalipsis 20:7)', a: true,
      e: 'Verdadero (Apocalipsis 20:7).' },
    { t: 'mc', v: '20:8', lit: 'a Gog y a Magog',
      q: '¿Qué nombres da Apocalipsis 20:8 a las naciones que Satanás sale a engañar?',
      o: ['Gog y Magog', 'Sodoma y Egipto', 'Babilonia y Asiria', 'Edom y Moab'], a: 0,
      e: '«…saldrá a engañar a las naciones que están en los cuatro ángulos de la tierra, a Gog y a Magog» (20:8). Sodoma y Egipto se nombran en 11:8.' },
    { t: 'mc', v: '20:8', lit: 'Su número es como la arena del mar',
      q: 'Según Apocalipsis 20:8, ¿cómo es el número de los que Satanás reúne para la batalla?',
      o: ['Como la arena del mar', 'Como las estrellas del cielo', 'Como el polvo de la tierra', 'Como las hojas del bosque'], a: 0,
      e: '«Su número es como la arena del mar» (20:8).' },
    { t: 'mc', v: '20:9', lit: 'el campamento de los santos y la ciudad amada',
      q: '¿Qué rodearon las naciones engañadas? (Apocalipsis 20:9)',
      o: ['El campamento de los santos y la ciudad amada', 'El monte de Sion y el templo de Dios', 'La gran ciudad Babilonia y sus muros', 'El trono blanco y los libros abiertos'], a: 0,
      e: '«…rodearon el campamento de los santos y la ciudad amada» (20:9).' },
    { t: 'tf', v: '20:9',
      q: 'Según Apocalipsis 20:9, de Dios descendió granizo del cielo y los consumió.', a: false,
      e: 'Falso: descendió FUEGO del cielo y los consumió (20:9).' },
    { t: 'mc', v: '20:10', lit: 'lanzado en el lago de fuego y azufre',
      q: '¿Dónde fue lanzado el diablo, según Apocalipsis 20:10?',
      o: ['En el lago de fuego y azufre', 'En el abismo, con un sello', 'En el mar, con la gran ramera', 'En el desierto, con la bestia'], a: 0,
      e: '«Y el diablo… fue lanzado en el lago de fuego y azufre donde estaban la bestia y el falso profeta» (20:10).' },
    { t: 'mc', v: '20:10', lit: 'donde estaban la bestia y el falso profeta',
      q: 'Según Apocalipsis 20:10, ¿quiénes ya estaban en el lago de fuego cuando lanzaron al diablo?',
      o: ['La bestia y el falso profeta', 'Gog y Magog con sus ejércitos', 'La muerte y el Hades', 'Los reyes de la tierra'], a: 0,
      e: '«…donde estaban la bestia y el falso profeta» (20:10). La muerte y el Hades son lanzados después, en 20:14.' },
    { t: 'mc', v: '20:11', lit: 'un gran trono blanco',
      q: '¿De qué color era el gran trono que vio Juan en Apocalipsis 20:11?',
      o: ['Blanco', 'De oro', 'De jaspe', 'De zafiro'], a: 0,
      e: '«Vi un gran trono blanco y al que estaba sentado en él» (20:11).' },
    { t: 'mc', v: '20:12', lit: 'el cual es el libro de la vida',
      q: 'Además de «los libros», ¿qué otro libro fue abierto? (Apocalipsis 20:12)',
      o: ['El libro de la vida', 'El librito dulce como la miel', 'El libro de los siete sellos', 'El libro de la ley de Moisés'], a: 0,
      e: '«Los libros fueron abiertos, y otro libro fue abierto, el cual es el libro de la vida» (20:12).' },
    { t: 'tf', v: '20:12',
      q: 'Juan vio solamente a los muertos grandes de pie ante Dios. (Apocalipsis 20:12)', a: false,
      e: 'Falso: vio los muertos, GRANDES Y PEQUEÑOS, de pie ante Dios (20:12).' },
    { t: 'mc', v: '20:13', lit: 'El mar entregó los muertos que había en él',
      q: 'Según Apocalipsis 20:13, ¿quiénes entregaron los muertos que había en ellos?',
      o: ['El mar, y la muerte y el Hades', 'La tierra, el abismo y el desierto', 'Los ángeles de los cuatro vientos', 'Los ríos y las fuentes de las aguas'], a: 0,
      e: '«El mar entregó los muertos que había en él, y la muerte y el Hades entregaron los muertos que había en ellos» (20:13).' },
    { t: 'mc', v: '20:14', lit: 'Ésta es la muerte segunda',
      q: '¿Qué texto dice «Ésta es la muerte segunda»?',
      o: ['Apocalipsis 20:14', 'Apocalipsis 20:5', 'Apocalipsis 20:10', 'Apocalipsis 20:15'], a: 0,
      e: 'Apocalipsis 20:14, después de lanzar al lago de fuego a la muerte y al Hades.' },
    { t: 'mc', v: '20:14', lit: 'La muerte y el Hades fueron lanzados al lago de fuego',
      q: 'Según Apocalipsis 20:14, ¿qué fue lanzado al lago de fuego?',
      o: ['La muerte y el Hades', 'El mar y la tierra', 'Los libros abiertos', 'Los tronos de juicio'], a: 0,
      e: '«La muerte y el Hades fueron lanzados al lago de fuego» (20:14).' },
    { t: 'fill', v: '20:15', ins: 'Apocalipsis 20:15 (RV1995) — Completa:',
      p: [{ x: '«El que no se halló inscrito en el libro de la ' }, { b: 'vida', h: '¿el libro de qué?' }, { x: ', fue lanzado al lago de ' }, { b: 'fuego', h: '¿lago de qué?' }, { x: '.»' }] },
    { t: 'mc', v: '20:3', f: 'c',
      q: 'En la lectura adventista, ¿por qué se dice que Satanás queda «atado» durante los mil años?',
      o: ['Porque la tierra queda desolada y no tiene a quién engañar', 'Porque queda encerrado en una cárcel debajo del mar', 'Porque los ángeles lo vigilan dentro del templo', 'Porque se arrepiente y deja de hacer el mal'], a: 0,
      e: 'Interpretación: la tierra desolada es el «abismo» y Satanás no tiene a quién engañar. El texto dice que un ángel lo ató con una gran cadena y lo encerró en el abismo (20:1-3).' },
    { t: 'mc', v: '20:4', f: 'c',
      q: 'En la interpretación adventista, ¿dónde viven y reinan con Cristo los redimidos durante los mil años?',
      o: ['En el cielo', 'En la tierra desolada', 'En la Jerusalén terrenal', 'En el lago de fuego'], a: 0,
      e: 'Interpretación: en el cielo, con Jesús, mientras la tierra queda desolada. El texto dice que «vivieron y reinaron con Cristo mil años» (20:4), sin decir el lugar.' },
    { t: 'mc', v: '20:5', f: 'c',
      q: 'En la lectura adventista, ¿cuándo ocurre la primera resurrección?',
      o: ['En la segunda venida de Jesús', 'Al final de los mil años', 'En el momento de morir', 'Cuando Juan escribió el libro'], a: 0,
      e: 'Interpretación: los justos resucitan cuando Jesús vuelve; los impíos, al terminar los mil años. El texto solo dice que los otros muertos no vivieron hasta que se cumplieron mil años (20:5).' },
  ],

  tarjetas: [
    { f: 'Lo que traía el ángel (20:1)', r: 'La llave del abismo y una gran cadena' },
    { f: 'Los cuatro nombres del enemigo (20:2)', r: 'El dragón, la serpiente antigua, el Diablo y Satanás' },
    { f: 'Cuánto tiempo estuvo atado (20:2)', r: 'Mil años' },
    { f: 'Para qué lo encerraron (20:3)', r: 'Para que no engañara más a las naciones' },
    { f: '«Ésta es la primera resurrección»', r: 'Apocalipsis 20:5' },
    { f: 'Sobre quién no tiene poder la segunda muerte (20:6)', r: 'Sobre el que tiene parte en la primera resurrección; serán sacerdotes de Dios y de Cristo' },
    { f: 'Gog y Magog (20:8)', r: 'Las naciones de los cuatro ángulos de la tierra; su número es como la arena del mar' },
    { f: 'Qué rodearon y qué pasó (20:9)', r: 'El campamento de los santos y la ciudad amada; fuego del cielo los consumió' },
    { f: 'Quiénes estaban ya en el lago de fuego (20:10)', r: 'La bestia y el falso profeta' },
    { f: 'El trono del juicio (20:11)', r: 'Un gran trono blanco' },
    { f: 'Cómo fueron juzgados los muertos (20:12)', r: 'Según sus obras, por lo escrito en los libros' },
    { f: '«Ésta es la muerte segunda»', r: 'Apocalipsis 20:14: el lago de fuego' },
  ],
};
