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

    { t: '🧭 Los mil años empiezan con la venida de Jesús (20:4-6)', capa: 'contexto', h:
      hi(`Esto es interpretación, no texto del capítulo. En la lectura adventista,
      los mil años (el <strong>milenio</strong>) empiezan con la segunda venida de
      19:11-21. En ese momento:`) +
      li([`Los justos muertos resucitan: es la <strong>primera
           resurrección</strong> (20:5-6; 1 Tesalonicenses 4:16).`,
          `Los justos vivos son transformados y, con los resucitados, suben a
           recibir a Jesús en el aire (1 Corintios 15:51-52; 1 Tesalonicenses 4:17).`,
          `Jesús los lleva a la casa de su Padre (Juan 14:1-3): pasan los mil años
           <strong>en el cielo</strong>.`,
          `Los impíos vivos mueren en la venida (19:21), y todos los impíos muertos
           siguen en la tumba hasta el final de los mil años.`]) +
      wa(`Bohr reconoce que 20:4-10 no dice «cielo», pero lo muestra el resto: la
      ciudad baja del cielo al terminar los mil años con los santos dentro (20:9;
      21:2). Sus tres razones: 1 Tesalonicenses 4:16-17; los justos están en la
      ciudad cuando los impíos la rodean; y en la tierra desolada nadie podría
      vivir.<br><br>
      Además, la primera frase de 20:5 («Pero los otros muertos…») es un
      <strong>paréntesis</strong> sobre los impíos; «la primera resurrección» se
      refiere a los fieles de 20:4.`) +
      `<p>Fuentes: Stephen Bohr, 15 principios de interpretación profética, vol. 2, págs. 75-76 y 79; Elena de White, El conflicto de los siglos, págs. 517-518; notas de Camilo en Evernote, "Los mil años".</p>` },

    { t: '🧭 El «abismo»: la tierra vacía, como antes de la creación (20:1-3)', capa: 'contexto', h:
      hi(`La palabra <strong>abismo</strong> de 20:1 es la misma que usa la
      Septuaginta (la traducción griega del Antiguo Testamento) en Génesis 1:2: «las
      tinieblas estaban sobre la faz del abismo». Bohr: describe un planeta en
      <strong>caos</strong>, sin vida. Jeremías lo vio así: la tierra «asolada y
      vacía», sin luz, sin hombres, sin aves (Jeremías 4:23-26), aunque Dios dice
      «no la destruiré del todo» (4:27).<br><br>
      Bohr muestra que las plagas y la venida deshacen la creación, día por
      día:`) +
      tbl(['Día de la creación', 'Al final'], [
        ['1 · la luz', 'Tinieblas (Jeremías 4:23)'],
        ['3 · las plantas', 'Quemadas por el sol de la cuarta plaga (16:8-9)'],
        ['4 · sol, luna y estrellas', 'Movidos de su lugar (Mateo 24:29)'],
        ['5 · peces y aves', 'Muere todo en el mar (16:3); las aves se van (Jeremías 4:25)'],
        ['6 · el ser humano', 'No queda nadie vivo (Jeremías 4:25)'],
      ]) +
      wa(`Bohr compara el milenio con el diluvio: la tierra vuelve a quedar
      desordenada, vacía y sin habitantes.`) +
      `<p>Fuentes: Stephen Bohr, 15 principios de interpretación profética, vol. 2, pág. 74; Stephen Bohr, ¿Cuán cerca al fin?, págs. 208-209; Stephen Bohr, Mateo 24 y las señales del fin, pág. 135; Elena de White, El conflicto de los siglos, pág. 528.</p>` },

    { t: '🧭 ¿En qué sentido está «atado» Satanás? (20:1-3, 20:7)', capa: 'contexto', h:
      hi(`Un espíritu no se amarra con una cadena de metal. La cadena es la
      <strong>situación</strong>: Satanás queda en una tierra sin nadie a quien
      engañar. Elena de White: «En este sentido es cómo está atado: no queda nadie
      en quien pueda ejercer su poder». Tampoco puede ir a otros mundos.<br><br>
      Bohr lo dice en una frase: «Cuando los impíos están muertos, Satanás está
      atado; ¡cuando los impíos resucitan, Satanás está desatado!».`) +
      li([`Durante los mil años anda errante por la tierra desolada y ve los
           resultados de su rebelión.`,
          `Al resucitar los impíos (20:5, 20:7), vuelve a tener a quién engañar:
           por eso «debe ser desatado por un poco de tiempo» (20:3).`,
          `Escuela Sabática 2019: «Satanás está atado a las circunstancias».`]) +
      `<p>Fuentes: Elena de White, El conflicto de los siglos, págs. 528-529; Stephen Bohr, 15 principios de interpretación profética, vol. 2, pág. 76; Escuela Sabática 2019-1T, lección 13, pág. 93.</p>` },

    { t: '🧭 El macho cabrío Azazel: el santuario explica 20:1-3', capa: 'contexto', h:
      hi(`En el <strong>Día de la Expiación</strong> (Levítico 16), cuando el santuario
      ya había sido limpiado con la sangre del macho cabrío de Jehová, el sumo
      sacerdote confesaba los pecados sobre el otro macho cabrío, el de
      <strong>Azazel</strong>, y lo mandaba vivo al desierto, a una tierra sin
      habitantes (Levítico 16:21-22).<br><br>
      Elena de White: cuando termine la obra de Cristo en el santuario celestial,
      los pecados del pueblo de Dios serán puestos sobre Satanás, «se le declarará
      culpable de todo el mal que les ha hecho cometer», y será desterrado en la
      tierra desolada por mil años.`) +
      wa(`<strong>Azazel no salva a nadie.</strong> Lo que limpia es la sangre del
      macho cabrío de Jehová, que representa a Cristo. Bohr: sobre Azazel solo
      iban los pecados ya <strong>perdonados</strong>; el que no se arrepentía
      cargaba con los suyos (Levítico 23:29-30). Satanás carga la culpa de haber
      hecho pecar.`) +
      hi(`Isaías 24:22 dice que esos presos serán castigados «después de muchos días».
      Bohr: Apocalipsis 20 aclara que esos muchos días son <strong>mil años</strong>.`) +
      `<p>Fuentes: Elena de White, El conflicto de los siglos, págs. 527-528; Stephen Bohr, El mensaje de los tres ángeles, tomo 2, págs. 93-94; Stephen Bohr, El Santuario en Apocalipsis, pág. 8; Stephen Bohr, El calendario religioso hebreo, pág. 224.</p>` },

    { t: '🧭 El juicio de los mil años (20:4, 20:12)', capa: 'contexto', h:
      hi(`«Vi tronos, y se sentaron sobre ellos los que recibieron facultad de
      juzgar» (20:4). Bohr explica que el juicio de Dios tiene <strong>tres
      etapas</strong>:`) +
      tbl(['Etapa', 'Cuándo', 'Qué se hace'], [
        ['1 · Investigación', 'Antes de la venida, en el cielo (Daniel 7:9-10; Apocalipsis 14:7)', 'Se decide quiénes son de Cristo'],
        ['2 · Sentencia', 'Durante los mil años (20:4; 1 Corintios 6:2-3)', 'Los santos, con Cristo, revisan los casos de los perdidos y de los ángeles caídos'],
        ['3 · Ejecución', 'Después de los mil años (20:9, 20:14-15)', 'Se cumple la sentencia'],
      ]) +
      hi(`Elena de White: los santos comparan los actos de cada uno con «el libro de
      la ley», y queda anotado lo que cada impío ha de sufrir «según sus obras».<br><br>
      ¿Para qué un juicio, si Dios lo sabe todo? Bohr: no es para informar a Dios,
      sino para que los seres que <strong>no</strong> lo saben todo vean que Dios
      fue justo y amoroso con cada persona.`) +
      `<p>Fuentes: Stephen Bohr, Lo que Jesús dijo, págs. 231-232; Elena de White, El conflicto de los siglos, págs. 529-530; Escuela Sabática 2019-1T, lección 13, pág. 93.</p>` },

    { t: '🧭 Cómo está ordenado 20:1 a 21:8: cuatro ciclos', capa: 'contexto', h:
      hi(`Bohr muestra que esta parte <strong>no va en orden de reloj</strong>: cuenta
      los mismos hechos varias veces, cada vez desde otro ángulo, y llega al mismo
      final.`) +
      tbl(['Ciclo', 'Textos', 'En qué se fija'], [
        ['1', '20:1-3', 'Satanás y la tierra desolada'],
        ['2', '20:4-10', 'Los santos que reinan con Cristo'],
        ['3', '20:11 a 21:1', 'El juicio de los impíos'],
        ['4', '21:2-8', 'Dios con su pueblo en la ciudad'],
      ]) +
      li([`Por eso el lago de fuego aparece tres veces (20:10; 20:14-15; 21:8): es
           <strong>un solo lago</strong>, no tres.`,
          `Bohr: 21:1 en realidad cierra el capítulo 20, y 21:2 (la ciudad que baja)
           pasa antes del ataque de 20:9, porque los impíos rodean una ciudad que ya
           está en la tierra.`,
          `Bohr ubica 20:11 en la venida (como 6:14-17) y 20:12 durante los mil años:
           los muertos están «de pie» ante Dios por medio del registro de sus vidas.
           Elena de White describe la escena del gran trono blanco al final de los
           mil años, con los impíos alrededor de la ciudad.`]) +
      `<p>Fuentes: Stephen Bohr, 15 principios de interpretación profética, vol. 2, págs. 74 y 77-79; Elena de White, El conflicto de los siglos, págs. 533-534.</p>` },

    { t: '🧭 La segunda resurrección y el último ataque (20:5, 20:7-9)', capa: 'contexto', h:
      hi(`Según Elena de White, al terminar los mil años Cristo vuelve a la tierra con
      los redimidos y los ángeles; se posa sobre el monte de los Olivos (Zacarías
      14:4) y la nueva Jerusalén baja y se asienta allí.`) +
      li([`Los impíos de todos los tiempos resucitan: es la <strong>segunda
           resurrección</strong>. Salen con el mismo carácter rebelde; no hay un
           segundo tiempo de gracia.`,
          `Satanás se presenta como un príncipe al que le robaron su herencia, y los
           organiza para tomar la ciudad.`,
          `Bohr: antes del milenio Satanás actuaba escondido detrás de los reyes;
           después se deja ver y los dirige en persona.`,
          `<strong>Gog y Magog</strong> son nombres de Ezequiel 38-39. Bohr: Juan los
           vuelve <strong>universales</strong>: vienen de los cuatro ángulos de la
           tierra. Antes del milenio el pueblo de Dios está esparcido por el mundo;
           después está reunido en una ciudad literal.`,
          `Antes del fuego, todos ven la historia de la cruz; los impíos y el mismo
           Satanás reconocen que la sentencia es justa.`]) +
      `<p>Fuentes: Elena de White, El conflicto de los siglos, págs. 531-537; Stephen Bohr, ¿Cuán cerca al fin?, págs. 21-22; Stephen Bohr, Studies on Daniel 11, pág. 184; Stephen Bohr, 15 principios de interpretación profética, vol. 2, pág. 77.</p>` },

    { t: '🧭 El lago de fuego: destrucción final, no tormento sin fin (20:9, 20:14-15)', capa: 'contexto', h:
      hi(`<strong>Dónde:</strong> «de Dios descendió fuego del cielo y los consumió»
      (20:9). El lago de fuego es esta tierra ardiendo: Elena de White describe la
      superficie de la tierra como «un inmenso lago de fuego hirviente» (ver
      2 Pedro 3:10).<br><br>
      <strong>Qué hace:</strong> consume. Malaquías 4:1 y 3: el fuego no les dejará
      «ni raíz ni rama» y serán ceniza. Elena de White: «Satanás la raíz, sus
      secuaces las ramas».`) +
      li([`<strong>La muerte segunda</strong> (20:14) es una muerte de la que no se
           resucita. De los impíos dice Elena de White: «Serán como si no hubieran
           sido» (Abdías 16).`,
          `También la muerte y el Hades (la tumba) van al fuego: la muerte misma se
           acaba (21:4).`,
          `Es justo: cada uno sufre según sus obras; unos mueren pronto y otros
           tardan más. Satanás sufre más tiempo, porque carga también los pecados
           que hizo cometer.`]) +
      wa(`Muchos credos enseñan un tormento consciente sin fin. Elena de White
      responde que esa idea no cuadra con un Dios que dice «no quiero la muerte del
      impío» (Ezequiel 33:11).`) +
      `<p>Fuentes: Elena de White, El conflicto de los siglos, págs. 434, 441 y 539; Stephen Bohr, El mensaje de los tres ángeles, tomo 2, págs. 87 y 94; notas de Camilo en Evernote, "El infierno y el mensaje del tercer ángel" y "La verdad sobre el Infierno".</p>` },

    { t: '🧭 «Por los siglos de los siglos» (20:10)', capa: 'contexto', h:
      hi(`Es el texto más difícil sobre el tema, y Bohr lo enfrenta así:`) +
      li([`«Atormentados» (en griego <em>basanizo</em>) habla de un dolor real.`,
          `Pero «por los siglos de los siglos» traduce <em>aion</em> (en hebreo
           <em>olam</em>): un tiempo <strong>largo, cuyo fin no se ve</strong>, no
           necesariamente sin fin.`,
          `El lenguaje viene de Isaías 34:9-10, sobre Edom: «perpetuamente subirá su
           humo». Bohr: «lo que el fuego consume se apaga
           finalmente».`,
          `Sodoma y Gomorra sufrieron «el castigo del fuego eterno» (Judas 7), pero
           quedaron reducidas «a ceniza» (2 Pedro 2:6).`,
          `20:10 no puede contradecir a Malaquías 4:1-3 ni a Ezequiel 28:18-19, donde
           Satanás queda en ceniza. Y si Dios hace «nuevas todas las cosas» (21:5),
           el fuego tiene que haberse apagado.`]) +
      wa(`Elena de White: después de que mueren los que él engañó, Satanás «tiene
      que seguir viviendo y sufriendo» un tiempo; luego queda destruido, «raíz y
      rama».`) +
      `<p>Fuentes: Stephen Bohr, El mensaje de los tres ángeles, tomo 2, págs. 92, 94 y 97-99; notas de Camilo en Evernote, "El infierno y el mensaje del tercer ángel"; Elena de White, El conflicto de los siglos, pág. 539.</p>` },
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
    // ── Interpretación (f:'c'): no es texto del capítulo; cada una dice su fuente ──
    { t: 'mc', v: '20:4', f: 'c',
      q: 'Según Bohr, ¿dónde están los santos durante los mil años?',
      o: ['En la ciudad de Dios, en el cielo', 'En la tierra desolada con Satanás', 'En la Jerusalén terrenal de hoy', 'Dormidos en la tumba hasta el final'], a: 0,
      e: 'Están en la ciudad en el cielo: Jesús los lleva al venir (1 Tesalonicenses 4:16-17), están dentro de la ciudad cuando los impíos la rodean (20:9) y la tierra desolada no permite vivir. Fuente: Stephen Bohr, 15 principios de interpretación profética, vol. 2, pág. 79.' },
    { t: 'tf', v: '20:4', f: 'c',
      q: 'Según Bohr, Apocalipsis 20:4-10 dice con todas sus letras que los santos pasan los mil años en el cielo.', a: false,
      e: 'Falso: Bohr reconoce que 20:4-10 no lo dice explícitamente; lo muestra 21:2, cuando la ciudad baja del cielo. Fuente: Stephen Bohr, 15 principios de interpretación profética, vol. 2, pág. 76.' },
    { t: 'mc', v: '20:5', f: 'c',
      q: 'En la lectura adventista, ¿cuándo ocurre la primera resurrección?',
      o: ['En la segunda venida de Jesús', 'Al final de los mil años', 'En el momento de morir', 'Cuando Juan escribió el libro'], a: 0,
      e: 'Los justos resucitan cuando Jesús vuelve (1 Tesalonicenses 4:16); los impíos, al terminar los mil años. El texto solo dice que los otros muertos no vivieron hasta que se cumplieron mil años (20:5). Fuentes: Elena de White, El conflicto de los siglos, págs. 517-518; Stephen Bohr, 15 principios de interpretación profética, vol. 2, pág. 75.' },
    { t: 'mc', v: '20:5', f: 'c',
      q: 'Según Bohr, ¿cómo se debe leer la frase «Pero los otros muertos no volvieron a vivir hasta que se cumplieron mil años»?',
      o: ['Como un paréntesis sobre los impíos', 'Como la resurrección de los impíos', 'Como un nuevo nacimiento espiritual', 'Como la resurrección de los mártires'], a: 0,
      e: 'Es una frase entre paréntesis que explica qué pasa con los impíos; «la primera resurrección» se refiere a los fieles de 20:4. Fuente: Stephen Bohr, 15 principios de interpretación profética, vol. 2, pág. 76.' },
    { t: 'mc', v: '20:1', f: 'c',
      q: 'Según Bohr, ¿qué describe la palabra «abismo» de 20:1, la misma que usa Génesis 1:2 en griego?',
      o: ['Un planeta en caos, sin vida', 'Una cárcel debajo del mar', 'Un fuego en el centro de la tierra', 'Un lugar de tormento bajo tierra'], a: 0,
      e: 'En la Septuaginta, «abismo» describe la tierra antes de la creación: desordenada, vacía y en tinieblas. Así queda la tierra durante los mil años (Jeremías 4:23-26). Fuente: Stephen Bohr, 15 principios de interpretación profética, vol. 2, pág. 74.' },
    { t: 'mc', v: '20:3', f: 'c',
      q: 'Según Elena de White, ¿en qué sentido está «atado» Satanás durante los mil años?',
      o: ['No queda nadie en quien ejercer su poder', 'Está encerrado en una cárcel bajo el mar', 'Los ángeles lo vigilan dentro del templo', 'Se arrepiente y deja de hacer el mal'], a: 0,
      e: '«En este sentido es cómo está atado: no queda nadie en quien pueda ejercer su poder». El texto dice que un ángel lo ató con una gran cadena y lo encerró (20:1-3). Fuente: Elena de White, El conflicto de los siglos, pág. 528.' },
    { t: 'tf', v: '20:7', f: 'c',
      q: 'Según Bohr, Satanás queda «desatado» cuando los impíos resucitan, porque otra vez tiene a quién engañar.', a: true,
      e: 'Verdadero: «Cuando los impíos están muertos, Satanás está atado; ¡cuando los impíos resucitan, Satanás está desatado!». Fuente: Stephen Bohr, 15 principios de interpretación profética, vol. 2, pág. 76.' },
    { t: 'mc', v: '20:2', f: 'c',
      q: 'Según Elena de White, ¿qué parte del Día de la Expiación ilustra el destierro de Satanás en la tierra desolada?',
      o: ['El macho cabrío de Azazel', 'El cordero de la Pascua', 'La ofrenda de las primicias', 'El incienso del altar de oro'], a: 0,
      e: 'Como el macho cabrío de Azazel era enviado vivo a un desierto sin habitantes (Levítico 16:21-22), Satanás queda en la tierra desolada mil años. Fuente: Elena de White, El conflicto de los siglos, págs. 527-528.' },
    { t: 'tf', v: '20:2', f: 'c',
      q: 'Según Bohr, en el Día de la Expiación se ponían sobre Azazel también los pecados de los que nunca se arrepintieron.', a: false,
      e: 'Falso: sobre Azazel solo iban los pecados ya perdonados; el que no se afligía ni se arrepentía era cortado del pueblo (Levítico 23:29-30). Azazel no salva: limpia la sangre del macho cabrío de Jehová. Fuente: Stephen Bohr, El mensaje de los tres ángeles, tomo 2, pág. 94.' },
    { t: 'mc', v: '20:3', f: 'c',
      q: 'Según Bohr, ¿a qué equivalen los «muchos días» de Isaías 24:22, después de los cuales son castigados los presos?',
      o: ['A los mil años de Apocalipsis 20', 'A los 1260 días de la profecía', 'A los siete años de la tribulación', 'A las 2300 tardes y mañanas'], a: 0,
      e: 'Los presos de Isaías 24:21-22 (Satanás, sus ángeles y los reyes) son castigados después de «muchos días», que Apocalipsis 20 aclara como mil años. Fuentes: Stephen Bohr, 15 principios de interpretación profética, vol. 2, pág. 65; Stephen Bohr, El calendario religioso hebreo, pág. 224.' },
    { t: 'mc', v: '20:4', f: 'c',
      q: 'Según Elena de White, ¿a quiénes juzgan los santos durante los mil años?',
      o: ['A los impíos y a los ángeles caídos', 'A los justos que resucitaron', 'A los ángeles que no cayeron', 'A los vivos que quedaron en la tierra'], a: 0,
      e: 'Junto con Cristo juzgan a los impíos y también a Satanás y sus ángeles (1 Corintios 6:2-3). El texto dice que recibieron «facultad de juzgar» (20:4). Fuente: Elena de White, El conflicto de los siglos, págs. 529-530.' },
    { t: 'mc', v: '20:12', f: 'c',
      q: 'Según Bohr, ¿cuáles son las tres etapas del juicio de Dios, en su orden?',
      o: ['Investigación, sentencia y ejecución', 'Sentencia, investigación y ejecución', 'Ejecución, investigación y sentencia', 'Investigación, ejecución y sentencia'], a: 0,
      e: 'Primero se investiga (antes de la venida), luego se dicta sentencia (durante los mil años) y al final se ejecuta (después). Fuente: Stephen Bohr, Lo que Jesús dijo, pág. 232.' },
    { t: 'mc', v: '20:12', f: 'c',
      q: 'Según Bohr, si Dios ya lo sabe todo, ¿para quién es necesario el juicio?',
      o: ['Para los seres que no lo saben todo', 'Para que Dios conozca cada caso', 'Para darles otra oportunidad a los impíos', 'Para salvar a los ángeles caídos'], a: 0,
      e: 'El juicio no es para informar a Dios, sino para que el universo vea que Dios fue amoroso y justo con cada persona. Fuente: Stephen Bohr, Lo que Jesús dijo, pág. 231.' },
    { t: 'mc', v: '20:14', f: 'c',
      q: 'Según Bohr, ¿cuántos lagos de fuego hay, si se nombra en 20:10, en 20:14-15 y en 21:8?',
      o: ['Uno solo', 'Tres distintos', 'Dos: antes y después', 'Ninguno real'], a: 0,
      e: 'Apocalipsis 20:1-21:8 cuenta los mismos hechos en ciclos que llegan al mismo final; por eso el lago se nombra varias veces, pero es uno solo. Fuente: Stephen Bohr, 15 principios de interpretación profética, vol. 2, págs. 74 y 78.' },
    { t: 'mc', v: '20:8', f: 'c',
      q: 'Según Bohr, ¿qué hace Apocalipsis 20:8 con Gog y Magog, los nombres de Ezequiel 38-39?',
      o: ['Los vuelve enemigos de toda la tierra', 'Los ubica solo al norte de Israel', 'Los presenta como dos ángeles caídos', 'Los identifica con la antigua Babilonia'], a: 0,
      e: 'Gog y Magog ya no vienen solo del norte, sino «de los cuatro ángulos de la tierra»: son todos los impíos resucitados contra la ciudad. Fuente: Stephen Bohr, Studies on Daniel 11, pág. 184.' },
    { t: 'tf', v: '20:9', f: 'c',
      q: 'Según Elena de White, al terminar los mil años los impíos resucitados reciben un segundo tiempo de gracia.', a: false,
      e: 'Falso: salen de la tumba con la misma rebeldía y no tienen un nuevo tiempo de gracia, porque lo usarían igual que el primero. Fuente: Elena de White, El conflicto de los siglos, pág. 531.' },
    { t: 'mc', v: '20:9', f: 'c',
      q: 'Según Elena de White, ¿qué es el lago de fuego donde terminan los impíos?',
      o: ['La superficie de la tierra en llamas', 'Un lugar bajo tierra que arde siempre', 'Un lago real del Medio Oriente', 'El fuego del sol que no se apaga'], a: 0,
      e: 'Cuando Dios hace descender fuego del cielo (20:9), la superficie de la tierra parece «un inmenso lago de fuego hirviente». Fuente: Elena de White, El conflicto de los siglos, pág. 539.' },
    { t: 'mc', v: '20:14', f: 'c',
      q: 'En la interpretación adventista, ¿qué es «la muerte segunda» de Apocalipsis 20:14?',
      o: ['Una muerte sin resurrección', 'Una vida eterna de tormento', 'La muerte del cuerpo en esta vida', 'Un sueño de mil años en la tumba'], a: 0,
      e: 'Es la muerte final de la cual no se vuelve: los impíos «serán como si no hubieran sido» (Abdías 16). Fuentes: Stephen Bohr, 15 principios de interpretación profética, vol. 2, pág. 76; Elena de White, El conflicto de los siglos, pág. 441.' },
    { t: 'mc', v: '20:10', f: 'c',
      q: 'Según Bohr, ¿qué quiere decir «por los siglos de los siglos» en Apocalipsis 20:10?',
      o: ['Un tiempo largo cuyo fin no se ve', 'Un tiempo que nunca termina', 'Exactamente otros mil años', 'Un solo instante, sin dolor'], a: 0,
      e: 'Traduce aion (en hebreo olam): un período largo e indefinido; «lo que el fuego consume se apaga finalmente». Como Sodoma: «fuego eterno» (Judas 7), pero quedó en ceniza (2 Pedro 2:6). Fuente: Stephen Bohr, El mensaje de los tres ángeles, tomo 2, págs. 92 y 97-99.' },
    { t: 'tf', v: '20:10', f: 'c',
      q: 'Según Elena de White, Satanás sufre más tiempo que los que engañó, porque carga también con los pecados que les hizo cometer.', a: true,
      e: 'Verdadero: «Después de haber perecido todos los que cayeron por sus seducciones, el diablo tiene que seguir viviendo y sufriendo». Al final queda destruido, «raíz y rama». Fuente: Elena de White, El conflicto de los siglos, pág. 539.' },
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
