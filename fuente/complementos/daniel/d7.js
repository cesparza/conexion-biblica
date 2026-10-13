/* Daniel 7: interpretación con fuentes (capa 'contexto', preguntas f:'c').
   Completa lo que ya está en fuente/contenido.js (bestias, ocho marcas, tres
   cuernos, 1.260 años, orden del juicio, anticristo, Porfirio) sin repetirlo:
   las once señas de Bohr, las fechas exactas 533/538 y 1793/1798, cuándo y
   dónde empieza el juicio, cómo se juzga a los muertos y la acusación de
   cambiar la ley. Lo de Bohr en inglés va traducido. v188: voz directa,
   sin nombrar autores en el cuerpo; una sola «Fuente:» corta por sección. */
const { tbl, hi, wa, li } = require('../../apocalipsis/ayudas.js');

module.exports = {
  cap: 'd7',
  secciones: [
    { t: '🧭 Las once señas del cuerno pequeño', capa: 'contexto', h:
      `<p><b>Cuándo:</b> el primer año de Belsasar (7:1), hacia el 553 a.C., catorce años antes de la caída de Babilonia.</p>` +
      `<p>Daniel 7 da <b>once</b> señas del cuerno, no ocho. Tres agregan algo a la lista de arriba:</p>` +
      li([
        '<b>«Los tiempos» (7:25)</b>: no son solo fechas del calendario, sino el <b>calendario profético de Dios</b>, el que «muda los tiempos y las edades» (2:21). El cuerno inventaría formas de leer la profecía rivales del historicismo (leerla como historia que se cumple en orden, de Daniel hasta el fin).',
        '<b>«Diferente de los primeros» (7:24)</b>: los diez cuernos eran reinos políticos; el cuerno pequeño es una <b>mezcla de iglesia y estado</b>.',
        '<b>«Ojos como de hombre» (7:8)</b>: en la profecía los ojos son sabiduría (Efesios 1:18). Este poder se apoyaría en la <b>sabiduría y la tradición humanas</b>.',
      ]) +
      `<p>Las otras ocho: es romano (sale de la cuarta bestia), sube entre los diez, después del 476, arranca a tres, habla contra el Altísimo, persigue a los santos, piensa cambiar la ley y domina 1.260 años. Al sumar Apocalipsis 13 y 17 y 2 Tesalonicenses 2 se llega a <b>dieciocho</b>.</p>` +
      wa('Se habla de un <b>sistema</b>, no de personas: dentro de él hay muchas personas sinceras que aman a Dios de corazón.') +
      `<p>Fuente: Bohr, <i>Daniel 1-10</i>, p. 119 y 124-125; Bohr, <i>La gran cadena</i>, p. 7.</p>` },

    { t: '🧭 De febrero a febrero: 538 y 1798 al mes', capa: 'contexto', h:
      tbl(['Año', 'Qué pasó', '1.260 años después'], [
        ['533', 'El emperador Justiniano I escribe al papa Juan II y lo reconoce como «cabeza de todas las santas iglesias». La carta entra a su código de leyes.', '1793: el 26 de noviembre Francia decreta abolir toda religión.'],
        ['538', 'En febrero el general Flavio Belisario derrota a los ostrogodos, el último cuerno arriano. Recién ahí el decreto se puede aplicar.', '1798: el 10 de febrero el general Louis-Alexandre Berthier quita al papa Pío VI de su trono.'],
      ]) +
      `<p>Que coincida «al mes» confirma que los 1.260 días son años. El período empezó «con la supremacía del papado, en el año 538» y terminó en 1798, cuando el papa fue hecho prisionero (CS 492).</p>` +
      hi('<b>«Anti» también es «en lugar de».</b> En griego <i>anti</i> no solo es «contra»: Herodes <i>Antipas</i> gobernó «en lugar de» su padre. Un poder que se presenta como representante de Cristo en la tierra encaja con «anticristo».') +
      `<p>Fuente: Bohr, <i>Daniel 1-10</i>, p. 133-134, 198-199 y 201; CS 492.</p>` },

    { t: '🧭 Dónde y cuándo empieza el juicio', capa: 'contexto', h:
      `<p><b>Dónde: en el cielo.</b> En Daniel 7 lo que pasa en la tierra va en prosa y lo que pasa en el cielo va en poesía:</p>` +
      tbl(['Versículos', 'Escena', 'Estilo'], [
        ['2-8', 'Tierra', 'Prosa'], ['9-10', 'Cielo', 'Poesía'], ['11-12', 'Tierra', 'Prosa'],
        ['13-14', 'Cielo', 'Poesía'], ['15-22', 'Tierra', 'Prosa'], ['23-27', 'Cielo', 'Poesía'],
      ]) +
      `<p><b>Cuándo: después de 1798 y antes de la segunda venida.</b> Tres veces el juicio llega como respuesta a la obra del cuerno (7:8 y 9; 7:21 y 22; 7:25 y 26): empieza cuando terminan sus 1.260 años. En 7:13 el Hijo del hombre va <i>al Padre</i> para juzgar, «no a la tierra» (CS 477), y solo después vuelve a dar el reino. La fecha exacta, 1844, la da Daniel 8:14.</p>` +
      hi('<b>Tres etapas</b>, como en un juicio humano: investigación (se abren los libros, 7:10), sentencia a favor de los santos (7:22) y ejecución, cuando los santos reciben el reino.') +
      `<p>Fuente: Bohr, <i>Daniel 1-10</i>, p. 120-121 y 275-276; Bohr, <i>La hora del juicio</i>, p. 1 y 6; CS 477.</p>` },

    { t: '🧭 Cómo se juzga a los que ya murieron', capa: 'contexto', h:
      `<p>Si Adán murió y volvió al polvo, ¿cómo pudo comparecer en el juicio de 1844? La respuesta está en los <b>libros</b> de 7:10:</p>` +
      li([
        'Dios guarda un registro exacto de cada vida: obras, palabras y aun secretos (2 Corintios 5:10; Mateo 12:36-37; Eclesiastés 12:14).',
        'El juicio empieza con los que vivieron primero, sigue generación por generación y termina con los vivos (CS 536).',
        'Los muertos no están presentes en persona: se examina su registro. Es como un video: la persona ya murió, pero en la grabación está viva.',
        'Quien se arrepintió y confesó tiene a Cristo como abogado (1 Juan 2:1), y sus pecados se borran del registro (Levítico 16:16).',
      ]) +
      hi('Por eso el juicio es una buena noticia para el que está en Cristo: lo que se borra en el juicio no se le devuelve en la resurrección.') +
      `<p>Fuente: Bohr, <i>La hora del juicio</i>, p. 3-13; CS 536-537.</p>` },

    { t: '🧭 «Pensará en cambiar la ley»', capa: 'contexto', h:
      `<p>El cuerno pequeño es acusado sobre todo de quebrantar la <b>primera tabla</b> de la ley: se proclama como Dios (1.º), blasfema (3.º), piensa cambiar la ley (4.º) y además mata a los santos (6.º). Apocalipsis 13 agrega la adoración a una imagen (2.º).</p>` +
      `<p>Dos ejemplos de ese cambio en los catecismos católicos:</p>` +
      li([
        'Se omite el mandamiento sobre las imágenes y se divide en dos el último («no codiciarás»), para seguir contando diez.',
        'Se pide descansar y asistir a misa el domingo, en lugar del sábado del cuarto mandamiento.',
      ]) +
      `<p>En la carta <i>Dies Domini</i> (1998), Juan Pablo II explica el cambio por la <b>tradición</b>: los cristianos sintieron que tenían autoridad para pasar el sentido del sábado al día de la resurrección.</p>` +
      wa('Si en 1844 se juzga con la ley, la ley seguía vigente en 1844: no fue clavada en la cruz.') +
      `<p>Fuente: Bohr, <i>Daniel 1-10</i>, p. 162, 265 y 273-274.</p>` },

    { t: '🧭 La Biblia explica sus símbolos (1): la visión', capa: 'contexto', h:
      `<p>Daniel 7 no deja los símbolos a la imaginación: la misma Biblia dice qué son.</p>` +
      tbl(['Símbolo', 'Qué representa', 'Dónde lo explica la Biblia'], [
        ['Vientos', 'Guerras y luchas entre naciones', 'Jeremías 25:32-33'],
        ['Mar, aguas', 'Pueblos y naciones', 'Apocalipsis 17:15: las aguas «son pueblos, muchedumbres, naciones y lenguas»; Isaías 17:12'],
        ['Bestia', 'Rey o reino', 'Daniel 7:17 y 23: las bestias «son cuatro reyes»; «la cuarta bestia será un cuarto reino»'],
        ['León', 'Babilonia', 'Jeremías 50:17, 43-44'],
        ['Alas', 'Rapidez para conquistar', 'Habacuc 1:6-8; Deuteronomio 28:49'],
        ['Cuerno', 'Rey o reino', 'Daniel 7:24: «Los diez cuernos significan que de aquel reino se levantarán diez reyes»'],
      ]) +
      `<p>Fuente: Bohr, <i>Daniel 1-10</i>, p. 121; Bohr, <i>15 principios</i> 2:105; Bohr, <i>La gran cadena</i>, p. 4-5; Smith, <i>Las profecías de Daniel</i>, p. 55; CS 493.</p>` },

    { t: '🧭 La Biblia explica sus símbolos (2): el cuerno y el juicio', capa: 'contexto', h:
      tbl(['Símbolo', 'Qué representa', 'Dónde lo explica la Biblia'], [
        ['Ojos', 'Sabiduría, inteligencia', 'Efesios 1:18'],
        ['Tiempo, tiempos y medio tiempo', 'Tres años y medio: 1.260 días', 'Apocalipsis 12:6 y 14 (1.260 días = «un tiempo, tiempos y la mitad de un tiempo»); Daniel 4:16 («siete tiempos»: años)'],
        ['Día', 'Año', 'Números 14:34; Ezequiel 4:6'],
        ['Nubes', 'Los ángeles que acompañan a Cristo', 'Salmo 68:17; Deuteronomio 33:2'],
        ['Libros', 'El registro de cada vida', 'Apocalipsis 20:12: juzgados «por las cosas que estaban escritas en los libros»; Malaquías 3:16; Eclesiastés 12:14'],
      ]) +
      hi('Con esta clave, 7:13 no es la segunda venida: las nubes de ángeles llevan al Hijo del hombre <b>hasta el Anciano de días</b>, al juicio.') +
      `<p>Fuente: Bohr, <i>Daniel 1-10</i>, p. 125 y 280; Bohr, <i>15 principios</i> 2:105; Bohr, <i>La hora del juicio</i>, p. 3-4.</p>` },
  ],
  preguntas: [
    { t: 'mc', v: '7:8', f: 'c', q: '¿Qué representan los «ojos como de hombre» del cuerno pequeño?', o: ['Dependencia de la sabiduría humana', 'Vigilancia constante sobre los santos', 'Un conocimiento profético verdadero', 'La fuerza de sus ejércitos'], a: 0, e: 'En la profecía los ojos simbolizan sabiduría (Efesios 1:18). El cuerno se apoyaría en la sabiduría y la tradición de los hombres. Fuente: Bohr, <i>Daniel 1-10</i>, p. 125.' },
    { t: 'mc', v: '7:25', f: 'c', q: '¿Qué son «los tiempos» que el cuerno pequeño pensaría cambiar?', o: ['El calendario profético de Dios', 'Las fechas de las fiestas judías', 'El calendario juliano por el gregoriano', 'Los años de reinado de los césares'], a: 0, e: 'Daniel 2:21 dice que Dios «muda los tiempos». El cuerno inventaría formas de leer la profecía rivales del historicismo. Fuente: Bohr, <i>Daniel 1-10</i>, p. 125.' },
    { t: 'mc', v: '7:24', f: 'c', q: '¿En qué era «diferente» el cuerno pequeño de los diez cuernos?', o: ['Unía la iglesia y el estado', 'Era un reino de Asia', 'Nunca tuvo un rey propio', 'Solo gobernaba en África'], a: 0, e: 'Los diez cuernos eran reinos políticos; el cuerno pequeño sería una mezcla de poder religioso y civil. Fuente: Bohr, <i>Daniel 1-10</i>, p. 125.' },
    { t: 'mc', v: '7:25', f: 'c', q: '¿En qué mes de 538 fueron derrotados los ostrogodos y en qué mes de 1798 Berthier quitó al papa de su trono?', o: ['Febrero en los dos casos', 'Marzo y octubre', 'Junio y febrero', 'Diciembre y agosto'], a: 0, e: 'La derrota decisiva de los ostrogodos fue en febrero de 538 y Louis-Alexandre Berthier actuó el 10 de febrero de 1798: 1.260 años «al mes». Fuente: Bohr, <i>Daniel 1-10</i>, p. 134 y 199.' },
    { t: 'tf', v: '7:25', f: 'c', q: 'El decreto de Justiniano que reconoció al papa como cabeza de todas las iglesias se dio en 533, pero solo pudo aplicarse del todo en 538.', a: true, e: 'Verdadero. Mientras los ostrogodos arrianos dominaban Italia el decreto no se podía hacer cumplir; su derrota en 538 lo hizo efectivo. Fuente: Bohr, <i>Daniel 1-10</i>, p. 134 y 198.' },
    { t: 'mc', v: '7:25', f: 'c', q: '¿Qué pasó en Francia el 26 de noviembre de 1793, 1.260 años después del decreto de Justiniano?', o: ['Se decretó abolir toda religión', 'Napoleón fue coronado emperador', 'Se firmó un concordato con Roma', 'Se proclamó la libertad de cultos'], a: 0, e: 'La Convención francesa decretó la abolición de la religión: iglesias cerradas y Biblias quemadas. Contado desde 533, es la contraparte de 1798, que se cuenta desde 538. Fuente: Bohr, <i>Daniel 1-10</i>, p. 198-199.' },
    { t: 'mc', v: '7:9', f: 'c', q: '¿Qué detalle del texto muestra que el juicio de Daniel 7 ocurre en el cielo?', o: ['Va en poesía, como toda escena celestial del capítulo', 'Se celebra en el valle de Josafat', 'Lo preside un tribunal del Imperio romano', 'Ocurre después de la segunda venida'], a: 0, e: 'En Daniel 7 lo terrenal va en prosa y lo celestial en poesía; las escenas del juicio (7:9-10, 13-14, 23-27) están en poesía. Fuente: Bohr, <i>Daniel 1-10</i>, p. 120 y 275.' },
    { t: 'tf', v: '7:13', f: 'c', q: 'En Daniel 7:13 el Hijo del hombre viene a la tierra en su segunda venida.', a: false, e: 'Falso: viene «no a la tierra, sino» al Anciano de días, en el cielo, para el juicio que empezó en 1844. Fuente: CS 477.' },
    { t: 'mc', v: '7:22', f: 'c', q: '¿Cuáles son las tres etapas del juicio que muestra Daniel 7?', o: ['Investigación, sentencia y ejecución', 'Acusación, defensa y apelación', 'Arresto, proceso y perdón', 'Registro, sellamiento y castigo'], a: 0, e: 'Se abren los libros (7:10), se da la sentencia a favor de los santos (7:22) y los santos reciben el reino. Fuente: Bohr, <i>Daniel 1-10</i>, p. 121; Bohr, <i>La hora del juicio</i>, p. 1.' },
    { t: 'mc', v: '7:10', f: 'c', q: '¿Con quiénes comenzó el juicio en 1844?', o: ['Con los que vivieron primero en la tierra', 'Con los creyentes que vivían en 1844', 'Con los mártires de la Edad Media', 'Con los doce apóstoles de Jesús'], a: 0, e: 'El juicio empieza con los primeros que vivieron, sigue generación por generación y termina con los vivos. Adán fue el primero en comparecer. Fuente: Bohr, <i>La hora del juicio</i>, p. 7; CS 537.' },
    { t: 'tf', v: '7:25', f: 'c', q: 'El cuerno pequeño es acusado sobre todo de quebrantar mandamientos de la primera tabla de la ley.', a: true, e: 'Verdadero: se hace Dios (1.º), blasfema (3.º) y piensa cambiar la ley (4.º); además mata a los santos (6.º). Fuente: Bohr, <i>Daniel 1-10</i>, p. 162.' },
    { t: 'mc', v: '7:2', f: 'c', q: 'Según la misma Biblia, ¿qué representan los vientos que agitan el mar en Daniel 7:2?', o: ['Guerras y luchas entre naciones', 'El Espíritu Santo obrando', 'Los ángeles de Dios', 'El paso del tiempo'], a: 0, e: 'Jeremías 25:32-33 usa la tempestad para la calamidad que pasa de nación en nación; los vientos simbolizan luchas. Fuente: Bohr, <i>Daniel 1-10</i>, p. 121; CS 493.' },
    { t: 'mc', v: '7:17', f: 'c', q: '¿Qué versículo del mismo capítulo explica que las bestias de Daniel 7 son reyes o reinos?', o: ['Daniel 7:17', 'Daniel 7:2', 'Daniel 7:9', 'Daniel 7:28'], a: 0, e: '«Estas cuatro grandes bestias son cuatro reyes que se levantarán en la tierra» (7:17), y 7:23 lo repite: la cuarta bestia será «un cuarto reino». Fuente: Bohr, <i>La gran cadena</i>, p. 4.' },
    { t: 'tf', v: '7:25', f: 'c', q: 'Apocalipsis 12:6 y 14 muestran que «un tiempo, tiempos y la mitad de un tiempo» es lo mismo que 1.260 días.', a: true, e: 'Verdadero: el tiempo de la mujer en el desierto se da de las dos formas. Con la regla de día por año (Números 14:34; Ezequiel 4:6) son 1.260 años. Fuente: Bohr, <i>15 principios</i> 2:105.' },
    { t: 'mc', v: '7:13', f: 'c', q: '¿Qué representan las nubes con las que el Hijo del hombre llega al Anciano de días?', o: ['Una multitud de ángeles', 'Las oraciones de los santos', 'Las naciones de la tierra', 'El humo del incienso'], a: 0, e: 'Salmo 68:17 y Deuteronomio 33:2 muestran a Dios rodeado de miles de ángeles. En 7:13 esas nubes llevan a Cristo al Padre para comenzar el juicio, no a la tierra. Fuente: Bohr, <i>Daniel 1-10</i>, p. 280.' },
    { t: 'mc', v: '7:8', f: 'c', q: '¿Qué otro sentido tiene el prefijo griego «anti» de «anticristo»?', o: ['En lugar de', 'Antes de', 'Después de', 'Junto a'], a: 0, e: '«Anti» puede ser «contra», pero también «en lugar de», como en Herodes Antipas, que gobernó en lugar de su padre. Fuente: Bohr, <i>Daniel 1-10</i>, p. 201.' },
  ],
};
