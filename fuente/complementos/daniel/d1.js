/* Daniel 1: interpretación (capa contexto, preguntas f:'c').
   Fuentes: Stephen Bohr, «Studies in Daniel 1-10» (en inglés, traducción
   propia; páginas del PDF), «15 principios de interpretación profética» vol. 1
   y «Los Secretos del Génesis». Las citas de Elena de White van como Bohr las
   cita (páginas de la edición en inglés). v188: voz directa, sin autores en
   el cuerpo; una sola línea «Fuente:» corta por sección. */
const { tbl, hi, wa, li } = require('../../apocalipsis/ayudas.js');

module.exports = {
  cap: 'd1',
  secciones: [
    {
      t: '🧭 Daniel 1 abre el gran conflicto',
      capa: 'contexto',
      h: `<p><strong>Cuándo:</strong> en el tercer año de Joacim, rey de Judá (1:1), el año 605 a.C.</p>` +
        `<p>El capítulo 1 no es solo la introducción: trae la semilla de todo el libro y de Apocalipsis. Desde el primer versículo se enfrentan dos bandos del <strong>gran conflicto</strong> (la lucha entre Cristo y Satanás que se ve en la historia):</p>` +
        tbl(['Del lado de Dios', 'Del lado de Babilonia'], [
          ['Joacim, rey de Judá', 'Nabucodonosor'],
          ['Jehová', 'Marduk, el dios de Babilonia'],
          ['Jerusalén', 'Babilonia'],
          ['El templo de Dios', 'El templo de Marduk'],
          ['Los hebreos', 'Los babilonios'],
        ]) +
        `<p>A primera vista ganó Babilonia. Pero el texto dice que fue el Señor quien «entregó» a Joacim (1:2). Esa es la pregunta que todo el libro contesta: <strong>¿quién controla la historia del mundo?</strong> La respuesta de Daniel 2:21 se repite en cada capítulo: Dios «quita reyes y pone reyes».</p>` +
        hi(`<strong>Sinar no es un nombre cualquiera.</strong> Los utensilios fueron llevados «a tierra de Sinar» (1:2), la misma llanura donde Nimrod fundó Babel y se levantó la torre de Babel (Génesis 10:10; 11:2). Babilonia aparece desde el principio como la ciudad que se rebela contra Dios.`) +
        `<p>Fuente: Bohr, <i>Daniel 1-10</i>, p. 4, 45-46; Bohr, <i>15 principios</i> 1:16; Bohr, <i>¿Cuán cerca al fin?</i>, p. 171; Bohr, <i>Los secretos del Génesis</i>, p. 120; <i>Daniel</i>, Escuela Sabática 2020-1T, p. 14.</p>`,
    },
    {
      t: '🧭 Cuatro intentos de cambiar a los jóvenes',
      capa: 'contexto',
      h: `<p>El rey quiso cambiar la manera de pensar y la lealtad de Daniel y sus amigos por cuatro caminos. Cada uno anuncia una prueba del pueblo de Dios al final del tiempo:</p>` +
        tbl(['Lo que hizo el rey', 'Lo que buscaba', 'La prueba al final'], [
          ['Los puso en la «universidad» de Babilonia (1:4)', 'Cambiar su forma de ver el mundo', 'No dejarse llevar por las teorías y tradiciones de Babilonia'],
          ['Les recordó que su dios había vencido (1:2)', 'Que se sintieran del lado perdedor', 'No intimidarse por ser una minoría pequeña'],
          ['Les señaló la comida y el vino (1:5)', 'Que dependieran de la mesa del rey', 'No beber el «vino» de Babilonia: sus doctrinas falsas'],
          ['Les cambió los nombres (1:7)', 'Cambiar su identidad y su carácter', 'No recibir el nombre de la bestia, sino el de Dios'],
        ]) +
        `<p>Los cuatro estudiaron en Babilonia, pero nunca usaron sus métodos de adivinación: cuando necesitaron respuestas, oraron (2:17-18). Y cuando ellos hablan de sí mismos o Dios se dirige a ellos, el libro usa sus nombres hebreos (7:28; 8:1); los babilónicos aparecen sobre todo en boca del rey y de su corte.</p>` +
        hi(`El rey no los obligó a renegar de su fe de golpe: esperaba lograrlo <strong>poco a poco</strong>, rodeándolos de costumbres idólatras.`) +
        `<p>Fuente: Bohr, <i>Daniel 1-10</i>, p. 38-39, 49-50, 52-53; Bohr, <i>15 principios</i> 1:16-17; PR 480-481.</p>`,
    },
    {
      t: '🧭 Por qué la comida del rey contaminaba',
      capa: 'contexto',
      h: `<p>Hay una palabra clave: el rey «señaló» la ración (1:5). En Génesis 1:29 fue Dios quien señaló la dieta original del ser humano: frutos y semillas. Al fijar otra dieta, el rey ocupaba el lugar del Creador. Esa mesa tenía seis problemas:</p>` +
        li([
          '<strong>Sangre y grasa:</strong> la carne no se preparaba según las leyes dadas a Moisés (Levítico 17:14-15).',
          '<strong>Carnes inmundas,</strong> como la de cerdo (Deuteronomio 14:8).',
          '<strong>Comida ofrecida a los ídolos:</strong> el rey dedicaba una porción a sus dioses, y eso consagraba toda la mesa a la idolatría.',
          '<strong>Manjares</strong> que la Escritura aconseja no desear (Proverbios 23:1-3).',
          '<strong>El vino:</strong> conocían la historia de Nadab y Abiú, que bebieron y ya no distinguieron lo santo de lo común (Levítico 10).',
          '<strong>Cuerpo y mente van juntos:</strong> lo que debilita el cuerpo debilita la capacidad de distinguir el bien del mal.',
        ]) +
        wa(`La legumbre y el agua no fueron solo una dieta sana: fueron una decisión de lealtad. Por eso Daniel no lo llamó «comer mal» sino «contaminarse» (1:8).`) +
        `<p>Fuente: Bohr, <i>Daniel 1-10</i>, p. 47-49; Ed 54-55.</p>`,
    },
    {
      t: '🧭 «Propuso en su corazón»: fiel en lo poco',
      capa: 'contexto',
      verso: 8,
      h: `<p>«Propuso en su corazón» (1:8) quiere decir que <strong>tomó una decisión de la voluntad</strong> antes de que llegara la presión. Y hay un detalle que se pasa por alto: en la corte había otros jóvenes hebreos (1:6), pero solo estos cuatro decidieron ser fieles, y son los únicos que Dios usa en el resto del libro.</p>` +
        li([
          'Daniel tenía <strong>18 años</strong> cuando fue llevado: «sólo tenía dieciocho años cuando fue llevado a una corte pagana» (4T 570).',
          'Creció durante la reforma del rey Josías, iniciada en 621 a.C.: su formación en casa lo preparó para Babilonia.',
          'Su cautiverio se puede comparar con el de José en Egipto: parecía una desgracia y fue el medio para llevar el conocimiento de Dios al imperio más grande de su tiempo.',
        ]) +
        hi(`«Fue la fidelidad en las cosas pequeñas lo que dio carácter a toda su vida» (PR 487). El carácter no se forma en la crisis, se muestra en ella. Los que pasaron la prueba de la comida pasaron después la del horno y la de los leones.`) +
        `<p>Fuente: Bohr, <i>Daniel 1-10</i>, p. 38, 45, 49, 51, 71; 4T 570.</p>`,
    },
    {
      t: '🧭 Daniel, figura del pueblo de Dios al final',
      capa: 'contexto',
      h: `<p>Daniel y sus amigos ilustran el carácter de la última generación del pueblo de Dios:</p>` +
        tbl(['En Daniel', 'En el tiempo del fin'], [
          ['Sin tacha alguna (1:4; 6:4)', 'Sin mancha delante del trono (Apocalipsis 14:5)'],
          ['Lleno del espíritu de Dios (4:8; 6:3)', 'Lleno del Espíritu en la lluvia tardía'],
          ['Testigo ante reyes', 'Llevados ante reyes y gobernadores (Lucas 21:12)'],
          ['Minoría fiel en medio de la apostasía', 'Un remanente pequeño'],
          ['Sus enemigos cayeron en su propia trampa (3:22; 6:24)', 'Las armas contra el pueblo de Dios se vuelven contra sus enemigos'],
        ]) +
        `<p>Cuatro rasgos que Daniel tenía y tendrá el remanente (Apocalipsis 12:17; 14:12): el <strong>testimonio de Jesús</strong> (el don profético), los <strong>mandamientos de Dios</strong>, la <strong>adoración</strong> solo al Dios verdadero y la <strong>fe de Jesús</strong>, una confianza que no se rompe.</p>` +
        `<p>Fuente: Bohr, <i>Daniel 1-10</i>, p. 51-52, 115.</p>`,
    },
    {
      t: '🧭 La Biblia explica sus símbolos',
      capa: 'contexto',
      h: `<p>Daniel 1 es historia, pero sus elementos se vuelven símbolos en Apocalipsis. La misma Biblia dice qué representan:</p>` +
        tbl(['Símbolo', 'Qué representa', 'Dónde lo explica la Biblia'], [
          ['Babilonia, «tierra de Sinar» (1:2)', 'El sistema religioso que se rebela contra Dios', 'Génesis 11:2-9 (Babel, en Sinar); Apocalipsis 17:5 y 18:2-4'],
          ['El vino de Babilonia', 'Sus doctrinas falsas', 'Apocalipsis 14:8 y 17:2: las naciones se embriagan «con el vino de su fornicación»; Jeremías 51:7'],
          ['La comida', 'La enseñanza que alimenta, verdadera o falsa', 'Juan 4:34; 6:63; Isaías 55:2, 10-11'],
          ['El nombre', 'El carácter y a quién pertenece la persona', 'Génesis 32:27-28; Apocalipsis 14:1: el nombre del Padre «escrito en la frente»'],
          ['Jerusalén', 'El pueblo de Dios', 'Gálatas 4:26; Hebreos 12:22'],
        ]) +
        `<p>Fuente: Bohr, <i>Daniel 1-10</i>, p. 49, 52; Bohr, <i>15 principios</i> 2:102, 104-106; Bohr, <i>¿Cuán cerca al fin?</i>, p. 171.</p>`,
    },
  ],
  preguntas: [
    { t: 'mc', v: '1:2', f: 'c', q: '¿Qué pregunta central responde el libro de Daniel desde el capítulo 1?',
      o: ['¿Cuándo volverían los judíos a Jerusalén?', '¿Quién controla la historia del mundo?', '¿Qué imperio sería el más poderoso?', '¿Cómo se interpreta un sueño profético?'], a: 1,
      e: 'Nabucodonosor tomó Jerusalén solo porque el Señor la «entregó» en su mano (1:2). El libro entero muestra que Dios quita y pone reyes (2:21). Fuente: Bohr, Daniel 1-10, p. 46.' },
    { t: 'mc', v: '1:2', f: 'c', q: 'La «tierra de Sinar» adonde llegaron los utensilios del templo es la misma llanura donde se edificó…',
      o: ['la ciudad de Ur de los caldeos', 'el palacio de Susa', 'la torre de Babel', 'la ciudad de Nínive'], a: 2,
      e: 'Nimrod fundó Babel «en la tierra de Sinar» (Génesis 10:10) y allí se levantó la torre (Génesis 11:2). Fuente: Bohr, ¿Cuán cerca al fin?, p. 171; Bohr, Los secretos del Génesis, p. 120; Daniel, Escuela Sabática 2020-1T, p. 14.' },
    { t: 'mc', v: '1:5', f: 'c', q: 'Al «señalar» la comida de los jóvenes, ¿qué estaba haciendo el rey?',
      o: ['Seguía una costumbre antigua de los reyes persas', 'Tomaba el lugar del Creador, que señaló la dieta original', 'Quería probar la salud y la fuerza de los cautivos', 'Obedecía una orden de los sacerdotes caldeos'], a: 1,
      e: 'Dios había señalado la dieta original del ser humano (Génesis 1:29); el rey fijó otra y así tomó una prerrogativa del Creador. Fuente: Bohr, Daniel 1-10, p. 47.' },
    { t: 'tf', v: '1:8', f: 'c', q: 'Una razón para rechazar la comida del rey era que una porción se ofrecía a los ídolos, y eso dedicaba toda la mesa a dioses falsos.',
      a: true,
      e: 'Verdadero. Comer de esa mesa habría sido unirse al homenaje del rey a sus dioses. Fuente: Bohr, Daniel 1-10, p. 48; Ed 54-55.' },
    { t: 'mc', v: '1:8', f: 'c', q: '¿Qué historia del Pentateuco conocían los jóvenes sobre el efecto del vino?',
      o: ['La de Coré, Datán y Abiram', 'La de Acán en Jericó', 'La de Ofni y Finees', 'La de Nadab y Abiú'], a: 3,
      e: 'Nadab y Abiú bebieron y ya no distinguieron lo santo de lo común (Levítico 10). Fuente: Bohr, Daniel 1-10, p. 48.' },
    { t: 'tf', v: '1:7', f: 'c', q: 'En el resto del libro, Daniel y sus amigos se llaman a sí mismos por sus nombres babilónicos.',
      a: false,
      e: 'Falso: cuando hablan de sí mismos, o Dios se dirige a ellos, se usan sus nombres hebreos (por ejemplo 7:28; 8:1); los babilónicos aparecen sobre todo en boca del rey y de su corte. Fuente: Bohr, Daniel 1-10, p. 38, 50; Bohr, 15 principios 1:16.' },
    { t: 'mc', v: '1:8', f: 'c', q: '¿Qué representa para el tiempo del fin no beber el vino de Babilonia?',
      o: ['Rechazar las doctrinas falsas de la Babilonia espiritual', 'Apartarse de toda escuela o universidad', 'No comer nada preparado por otros', 'No tener trato con ningún gobernante'], a: 0,
      e: 'La comida y el vino de Babilonia representan sus doctrinas y tradiciones falsas (Apocalipsis 18:2-3). Fuente: Bohr, Daniel 1-10, p. 52.' },
    { t: 'tf', v: '1:6', f: 'c', q: 'Daniel tenía 18 años cuando fue llevado cautivo a Babilonia.',
      a: true,
      e: 'Verdadero. Había crecido durante la reforma de Josías. Fuente: Bohr, Daniel 1-10, p. 45; 4T 570.' },
    { t: 'mc', v: '1:8', f: 'c', q: '¿Qué significa que Daniel «propuso en su corazón»?',
      o: ['Que sintió miedo de enfermarse', 'Que tomó una decisión de la voluntad', 'Que consultó a los sacerdotes', 'Que esperó a ver qué hacían los demás'], a: 1,
      e: 'Fue una decisión de la voluntad que llevó a la acción correcta; otros hebreos estaban en la corte, pero solo estos cuatro decidieron ser fieles. Fuente: Bohr, Daniel 1-10, p. 49.' },
    { t: 'mc', v: '1:7', f: 'c', q: 'En la Biblia, el nombre de una persona representa sobre todo…',
      o: ['su carácter', 'su riqueza', 'su tribu', 'su edad'], a: 0,
      e: 'Por eso solo Dios cambia nombres, porque solo él cambia el carácter (Génesis 32:27-28), y el rey quiso cambiar el de los jóvenes. Fuente: Bohr, Daniel 1-10, p. 49; Bohr, 15 principios 2:104.' },
    { t: 'mc', v: '1:7', f: 'c', q: '¿Qué texto de Apocalipsis muestra que el pueblo fiel del fin llevará el nombre de Dios, como los jóvenes llevaban nombres que honraban a Dios?',
      o: ['Apocalipsis 14:1', 'Apocalipsis 6:2', 'Apocalipsis 9:4', 'Apocalipsis 21:1'], a: 0,
      e: 'Los 144.000 tienen «el nombre de él y el de su Padre escrito en la frente» (Apocalipsis 14:1); los fieles rechazan el nombre de la bestia (13:17). Fuente: Bohr, Daniel 1-10, p. 52.' },
    { t: 'mc', v: '1:1', f: 'c', q: 'En la lista de nombres proféticos, ¿qué significa el nombre «Babilonia»?',
      o: ['Confusión', 'Ciudad de oro', 'Ciudad del sol', 'Casa del rey'], a: 0,
      e: 'El nombre recuerda a Babel, donde Dios confundió las lenguas (Génesis 11:9); en Apocalipsis el nombre pasa al sistema religioso caído (17:5). Fuente: Bohr, 15 principios 2:104.' },
  ],
};
