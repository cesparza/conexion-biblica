/* Daniel 7: interpretación con fuentes (capa 'contexto', preguntas f:'c').
   Completa lo que ya está en fuente/contenido.js (bestias, ocho marcas, tres
   cuernos, 1.260 años, orden del juicio, anticristo, Porfirio) sin repetirlo:
   las once señas de Bohr, las fechas exactas 533/538 y 1793/1798, cuándo y
   dónde empieza el juicio, cómo se juzga a los muertos y la acusación de
   cambiar la ley. Lo de Bohr en inglés va traducido. */
const { tbl, hi, wa, li } = require('../../apocalipsis/ayudas.js');

module.exports = {
  cap: 'd7',
  secciones: [
    { t: '🧭 Las once señas del cuerno pequeño, según Bohr', capa: 'contexto', h:
      `<p>Bohr cuenta <b>once</b> señas en Daniel 7, no ocho. Tres de ellas agregan algo a la lista de arriba:</p>` +
      li([
        '<b>«Los tiempos» (7:25)</b>: para Bohr no son solo fechas del calendario, sino el <b>calendario profético de Dios</b>, el que «muda los tiempos y las edades» (2:21). El cuerno inventaría sistemas de interpretación rivales del historicismo (leer la profecía como historia que se cumple en orden, de Daniel hasta el fin).',
        '<b>«Diferente de los primeros» (7:24)</b>: los diez cuernos eran reinos políticos; el cuerno pequeño es una <b>mezcla de iglesia y estado</b>.',
        '<b>«Ojos como de hombre» (7:8)</b>: en la profecía los ojos son sabiduría (Efesios 1:18). Este poder se apoyaría en la <b>sabiduría y la tradición humanas</b>.',
      ]) +
      `<p>Las demás coinciden con las ocho marcas: romano, entre los diez, después del 476, arranca tres, habla contra el Altísimo, persigue, quiere cambiar la ley y dura 1.260 años.</p>` +
      wa('Bohr insiste en que se habla de un <b>sistema</b>, no de personas: «dentro de esta organización se hallan muchas personas sinceras que aman de corazón a Dios».') +
      `<p>Fuentes: Stephen Bohr, Studies in Daniel 1-10, pág. PDF 124-125; Esteban Bohr, La Gran Cadena Profética, pág. PDF 7.</p>` },

    { t: '🧭 De febrero a febrero: 538 y 1798 al mes', capa: 'contexto', h:
      `<p>Bohr arma las fechas así:</p>` +
      tbl(['Año', 'Qué pasó', '1.260 años después'], [
        ['533', 'El emperador Justiniano escribe al papa Juan y lo reconoce como «cabeza de todas las santas iglesias». La carta entra a su código de leyes.', '1793: el 26 de noviembre Francia decreta abolir toda religión.'],
        ['538', 'En febrero el general Belisario derrota a los ostrogodos, el último cuerno arriano. Recién ahí el decreto se puede aplicar.', '1798: el 10 de febrero el general Berthier quita al papa Pío VI de su trono.'],
      ]) +
      `<p>Para Bohr la coincidencia «al mes» es la prueba de que los 1.260 días son años. Elena de White da el mismo período: empezó «con la supremacía del papado, en el año 538» y terminó en 1798, cuando el papa fue hecho prisionero.</p>` +
      hi('<b>«Anti» también es «en lugar de».</b> Bohr, citando a J. A. Wylie, recuerda que en griego <i>anti</i> no solo es «contra»: Herodes <i>Antipas</i> gobernó «en lugar de» su padre. Por eso un poder que se presenta como representante de Cristo en la tierra encaja con «anticristo».') +
      `<p>Fuentes: Stephen Bohr, Studies in Daniel 1-10, pág. PDF 133-134, 198-199 y 201; Elena de White, El conflicto de los siglos, pág. PDF 359.</p>` },

    { t: '🧭 Dónde y cuándo empieza el juicio', capa: 'contexto', h:
      `<p><b>Dónde: en el cielo.</b> Bohr nota que en Daniel 7 lo que pasa en la tierra va en prosa y lo que pasa en el cielo va en poesía:</p>` +
      tbl(['Versículos', 'Escena', 'Estilo'], [
        ['2-8', 'Tierra', 'Prosa'], ['9-10', 'Cielo', 'Poesía'], ['11-12', 'Tierra', 'Prosa'],
        ['13-14', 'Cielo', 'Poesía'], ['15-22', 'Tierra', 'Prosa'], ['23-27', 'Cielo', 'Poesía'],
      ]) +
      `<p><b>Cuándo: después de 1798 y antes de la segunda venida.</b> Tres veces el juicio llega como respuesta a la obra del cuerno (7:8 y 9; 7:21 y 22; 7:25 y 26), así que empieza cuando terminan sus 1.260 años. Y en 7:13 el Hijo del hombre va <i>al Padre</i> para juzgar, y solo después vuelve a dar el reino. Elena de White lo dice así: vino «no a la tierra, sino» al Anciano de días. La fecha exacta, 1844, la da Daniel 8:14.</p>` +
      hi('<b>Tres etapas</b>, como en un juicio humano: investigación (se abren los libros, 7:10), sentencia a favor de los santos (7:22) y ejecución, cuando los santos reciben el reino.') +
      `<p>Fuentes: Stephen Bohr, Studies in Daniel 1-10, pág. PDF 120-121 y 275-276; Esteban Bohr, La hora del juicio divino, pág. PDF 1; Elena de White, El conflicto de los siglos, pág. PDF 349.</p>` },

    { t: '🧭 Cómo se juzga a los que ya murieron', capa: 'contexto', h:
      `<p>Si Adán murió y su cuerpo volvió al polvo, ¿cómo pudo comparecer en el juicio de 1844? Bohr responde con los <b>libros</b> de 7:10:</p>` +
      li([
        'Dios guarda un registro exacto de cada vida: obras, palabras y aun secretos (2 Corintios 5:10; Mateo 12:36-37; Eclesiastés 12:14).',
        'El juicio empieza «con los que vivieron primero en la tierra», sigue generación por generación y «termina con los vivos» (Elena de White).',
        'Los muertos no están presentes en persona: se examina su registro. Bohr lo compara con un video: la persona ya murió, pero en la grabación está viva.',
        'Quien se arrepintió y confesó tiene a Cristo como abogado (1 Juan 2:1), y sus pecados se borran del registro (Levítico 16:16).',
      ]) +
      hi('Por eso el juicio es una buena noticia para el que está en Cristo: lo que se borra en el juicio no se le devuelve en la resurrección.') +
      `<p>Fuente: Esteban Bohr, La hora del juicio divino, pág. PDF 3-13 (cita El conflicto de los siglos, pp. 536-537).</p>` },

    { t: '🧭 «Pensará en cambiar la ley»: la acusación según Bohr', capa: 'contexto', h:
      `<p>Bohr nota que el cuerno pequeño es acusado sobre todo de quebrantar la <b>primera tabla</b> de la ley: se proclama como Dios (1.º), blasfema (3.º), piensa cambiar la ley (4.º) y además mata a los santos (6.º). Apocalipsis 13 agrega la adoración a una imagen (2.º).</p>` +
      `<p>Como ejemplos de ese cambio, Bohr menciona dos cosas que encontró en catecismos católicos:</p>` +
      li([
        'Se omite el mandamiento sobre las imágenes y se divide en dos el último («no codiciarás»), para seguir contando diez.',
        'Se pide descansar y asistir a misa el domingo, en lugar del sábado del cuarto mandamiento.',
      ]) +
      `<p>En la carta <i>Dies Domini</i> (1998), Juan Pablo II explica el cambio por la <b>tradición</b>: los cristianos «sintieron que tenían la autoridad» para pasar el sentido del sábado al día de la resurrección.</p>` +
      wa('Bohr saca otra conclusión: si en 1844 se juzga con la ley, entonces la ley seguía vigente en 1844 y no fue clavada en la cruz.') +
      `<p>Fuente: Stephen Bohr, Studies in Daniel 1-10, pág. PDF 162, 265 y 273-274.</p>` },
  ],
  preguntas: [
    { t: 'mc', v: '7:8', f: 'c', q: 'Según Bohr, ¿qué representan los «ojos como de hombre» del cuerno pequeño?', o: ['Dependencia de la sabiduría humana', 'Vigilancia constante sobre los santos', 'Un conocimiento profético verdadero', 'La fuerza de sus ejércitos'], a: 0, e: 'En la profecía los ojos simbolizan sabiduría (Efesios 1:18). El cuerno se apoyaría en la sabiduría y la tradición de los hombres. Fuente: Stephen Bohr, Studies in Daniel 1-10, pág. PDF 125.' },
    { t: 'mc', v: '7:25', f: 'c', q: 'Según Bohr, ¿qué son «los tiempos» que el cuerno pequeño pensaría cambiar?', o: ['El calendario profético de Dios', 'Las fechas de las fiestas judías', 'El calendario juliano por el gregoriano', 'Los años de reinado de los césares'], a: 0, e: 'Bohr lo relaciona con Daniel 2:21: Dios «muda los tiempos». El cuerno inventaría sistemas de interpretación profética rivales del historicismo. Fuente: Stephen Bohr, Studies in Daniel 1-10, pág. PDF 125.' },
    { t: 'mc', v: '7:24', f: 'c', q: 'Según Bohr, ¿en qué era «diferente» el cuerno pequeño de los diez cuernos?', o: ['Unía la iglesia y el estado', 'Era un reino de Asia', 'Nunca tuvo un rey propio', 'Solo gobernaba en África'], a: 0, e: 'Los diez cuernos eran reinos políticos; el cuerno pequeño sería una mezcla de poder religioso y civil. Fuente: Stephen Bohr, Studies in Daniel 1-10, pág. PDF 125.' },
    { t: 'mc', v: '7:25', f: 'c', q: 'Según Bohr, ¿en qué mes de 538 fueron derrotados los ostrogodos y en qué mes de 1798 Berthier quitó al papa de su trono?', o: ['Febrero en los dos casos', 'Marzo y octubre', 'Junio y febrero', 'Diciembre y agosto'], a: 0, e: 'La derrota decisiva de los ostrogodos fue en febrero de 538 y Berthier actuó el 10 de febrero de 1798: 1.260 años «al mes». Fuente: Stephen Bohr, Studies in Daniel 1-10, pág. PDF 134 y 199.' },
    { t: 'tf', v: '7:25', f: 'c', q: 'Según Bohr, el decreto de Justiniano que reconoció al papa como cabeza de todas las iglesias se dio en 533, pero solo pudo aplicarse del todo en 538.', a: true, e: 'Verdadero. Mientras los ostrogodos arrianos dominaban Italia el decreto no se podía hacer cumplir; su derrota en 538 lo hizo efectivo. Fuente: Stephen Bohr, Studies in Daniel 1-10, pág. PDF 134 y 198.' },
    { t: 'mc', v: '7:25', f: 'c', q: 'Según Bohr, ¿qué pasó en Francia el 26 de noviembre de 1793, 1.260 años después del decreto de Justiniano?', o: ['Se decretó abolir toda religión', 'Napoleón fue coronado emperador', 'Se firmó un concordato con Roma', 'Se proclamó la libertad de cultos'], a: 0, e: 'La Convención francesa decretó la abolición de la religión: iglesias cerradas y Biblias quemadas. Bohr lo cuenta desde 533 como la contraparte de 1798, que se cuenta desde 538. Fuente: Stephen Bohr, Studies in Daniel 1-10, pág. PDF 198-199.' },
    { t: 'mc', v: '7:9', f: 'c', q: 'Según Bohr, ¿qué detalle del texto muestra que el juicio de Daniel 7 ocurre en el cielo?', o: ['Va en poesía, como toda escena celestial del capítulo', 'Se celebra en el valle de Josafat', 'Lo preside un tribunal del Imperio romano', 'Ocurre después de la segunda venida'], a: 0, e: 'En Daniel 7 lo terrenal va en prosa y lo celestial en poesía; las escenas del juicio (7:9-10, 13-14, 23-27) están en poesía. Fuente: Stephen Bohr, Studies in Daniel 1-10, pág. PDF 120 y 275.' },
    { t: 'tf', v: '7:13', f: 'c', q: 'Según Elena de White, en Daniel 7:13 el Hijo del hombre viene a la tierra en su segunda venida.', a: false, e: 'Falso: viene «no a la tierra, sino» al Anciano de días, en el cielo, para el juicio que empezó en 1844. Fuente: Elena de White, El conflicto de los siglos, pág. PDF 349.' },
    { t: 'mc', v: '7:22', f: 'c', q: 'Según Bohr, ¿cuáles son las tres etapas del juicio que muestra Daniel 7?', o: ['Investigación, sentencia y ejecución', 'Acusación, defensa y apelación', 'Arresto, proceso y perdón', 'Registro, sellamiento y castigo'], a: 0, e: 'Se abren los libros (7:10), se da la sentencia a favor de los santos (7:22) y los santos reciben el reino. Fuentes: Stephen Bohr, Studies in Daniel 1-10, pág. PDF 121; Esteban Bohr, La hora del juicio divino, pág. PDF 1.' },
    { t: 'mc', v: '7:10', f: 'c', q: 'Según Elena de White, citada por Bohr, ¿con quiénes comenzó el juicio en 1844?', o: ['Con los que vivieron primero en la tierra', 'Con los creyentes que vivían en 1844', 'Con los mártires de la Edad Media', 'Con los doce apóstoles de Jesús'], a: 0, e: 'El juicio empieza con los primeros que vivieron, sigue generación por generación y termina con los vivos. Por eso Bohr dice que Adán fue el primero en comparecer. Fuente: Esteban Bohr, La hora del juicio divino, pág. PDF 7 (cita El conflicto de los siglos, p. 537).' },
    { t: 'tf', v: '7:25', f: 'c', q: 'Según Bohr, el cuerno pequeño es acusado sobre todo de quebrantar mandamientos de la primera tabla de la ley.', a: true, e: 'Verdadero: se hace Dios (1.º), blasfema (3.º) y piensa cambiar la ley (4.º); además mata a los santos (6.º). Fuente: Stephen Bohr, Studies in Daniel 1-10, pág. PDF 162.' },
    { t: 'mc', v: '7:8', f: 'c', q: 'Según Bohr, que cita a J. A. Wylie, ¿qué otro sentido tiene el prefijo griego «anti» de «anticristo»?', o: ['En lugar de', 'Antes de', 'Después de', 'Junto a'], a: 0, e: '«Anti» puede ser «contra», pero también «en lugar de», como en Herodes Antipas, que gobernó en lugar de su padre. Fuente: Stephen Bohr, Studies in Daniel 1-10, pág. PDF 201.' },
  ],
};
