/* Daniel 10: interpretación con fuentes (capa 'contexto', preguntas f:'c').
   Ya están en fuente/contenido.js: fecha y lugar, el ayuno por la oposición
   al templo, el Ser glorioso como en Apocalipsis 1, Miguel es Jesús, la
   guerra invisible, Josué, Eliseo. Aquí va lo que agrega Bohr: que 8 a 12
   es una sola visión que se va explicando, qué buscaba entender Daniel,
   quién lo tocó, y quién es el príncipe de Persia. v188: voz directa, sin
   nombrar autores en el cuerpo; una sola «Fuente:» corta por sección. */
const { tbl, hi, wa, li } = require('../../apocalipsis/ayudas.js');

module.exports = {
  cap: 'd10',
  secciones: [
    { t: '🧭 Daniel 8 a 12: una sola visión que se explica por partes', capa: 'contexto', h:
      `<p><b>Cuándo:</b> el tercer año de Ciro (10:1), hacia el 535 a.C. Daniel seguía en Babilonia, junto al Tigris (10:4), y tenía unos 88 años: llegó cautivo a los 18, en 605 a.C.</p>` +
      `<p>El libro tiene dos mitades: los capítulos 2 a 7 están escritos en arameo y los 8 a 12 en hebreo. La segunda mitad es una sola profecía, y la palabra que la une es <b>«entender»</b>:</p>` +
      tbl(['Texto', 'Qué pasa'], [
        ['8:16-17', 'Gabriel recibe la orden de hacer entender la visión a Daniel.'],
        ['8:27', 'Daniel queda espantado: no la entendió.'],
        ['9:22-23', 'Gabriel vuelve: «Entiende, pues, la orden, y entiende la visión».'],
        ['10:1', 'Daniel «comprendió la palabra y tuvo inteligencia en la visión».'],
        ['10:12-14', 'Aun así pide más luz, y el ángel viene a explicarle «lo que ha de sucederle a tu pueblo en los últimos días».'],
        ['12:8', 'Ni al final lo entendió todo: por eso Dios dio después el Apocalipsis.'],
      ]) +
      hi('En 10:14 la palabra para «visión» es <i>jazón</i>, la visión completa de Daniel 8, porque el capítulo 11 la vuelve a recorrer entera: desde Persia hasta el fin del juicio y la liberación del pueblo de Dios.') +
      `<p>Fuente: Bohr, <i>Daniel 1-10</i>, p. 20, 25, 357 y 359-360.</p>` },

    { t: '🧭 Qué buscaba Daniel con su ayuno', capa: 'contexto', h:
      `<p>Las tres semanas de ayuno tenían dos motivos:</p>` +
      li([
        '<b>Entender lo que faltaba.</b> En el capítulo 9 Gabriel le había dado todo lo que entonces podía recibir, pero Daniel «deseó aprender más de los temas que todavía no se le habían explicado» (SL 49).',
        '<b>El templo detenido.</b> Daniel sabía que el templo y la ciudad tenían que reconstruirse para que se cumplieran las setenta semanas y los 2.300 años. Y la oposición de los samaritanos parecía atrasarlo todo (Esdras 4:4-5).',
      ]) +
      hi('<b>¿21 días o 21 años?</b> Los 21 días de 10:13 son días literales. Pero el decreto de Ciro para el templo fue en 536 a.C. y el templo se terminó en 515 a.C.: 21 años de lucha, en los que el ángel trabajaba en la mente de «los reyes de Persia», en plural.') +
      `<p>Fuente: Bohr, <i>Daniel 1-10</i>, p. 359 y 361-364; SL 49.</p>` },

    { t: '🧭 Quién es quién en Daniel 10', capa: 'contexto', h:
      tbl(['Personaje', 'Quién es'], [
        ['El varón vestido de lino (10:5-6)', 'Cristo, visto como sería al empezar su obra de Sumo Sacerdote tras la ascensión. Por eso se parece tanto a Apocalipsis 1:13-16.'],
        ['La mano que lo toca (10:10)', 'Gabriel. El versículo 10 marca un corte: no dice que sea la mano del que Daniel vio en visión.'],
        ['El príncipe del reino de Persia (10:13)', 'Satanás, «el príncipe de este mundo» (Juan 12:31; 14:30), que influía en los reyes persas para frenar el templo.'],
        ['Miguel (10:13, 21)', 'Cristo, el protector de Israel, el que resucita a los muertos y el «Ángel de Jehová» del Antiguo Testamento.'],
      ]) +
      `<p>Un detalle: en el Antiguo Testamento la palabra «príncipe» aparece unas 420 veces y nunca se usa para un rey; casi siempre es un jefe militar. Por eso el «príncipe» de Persia es distinto de «los reyes de Persia» del mismo versículo.</p>` +
      wa('Otra lectura ve en el que tocó a Daniel al mismo varón de la visión. Aquí se sigue el corte del versículo 10.') +
      `<p>Fuente: Bohr, <i>Daniel 1-10</i>, p. 361-364.</p>` },

    { t: '🧭 La Biblia explica sus símbolos', capa: 'contexto', h:
      tbl(['Símbolo', 'Qué representa', 'Dónde lo explica la Biblia'], [
        ['Varón vestido de lino (10:5-6)', 'Cristo glorificado, como Sumo Sacerdote', 'Apocalipsis 1:13-15: «uno semejante al Hijo del hombre»; sus pies, «semejantes al bronce pulido», como en Daniel 10:6'],
        ['Lino', 'Justicia, pureza', 'Apocalipsis 19:8: «El lino fino representa las acciones justas de los santos»'],
        ['Príncipe del reino de Persia (10:13)', 'Satanás, que obraba sobre los reyes persas', 'Juan 12:31; 14:30 (el príncipe de este mundo); Apocalipsis 12:9'],
        ['Miguel (10:13, 21)', 'Cristo, que defiende y resucita a su pueblo', 'Daniel 12:1: «el gran príncipe que está de parte de los hijos de tu pueblo»; Judas 9 con 1 Tesalonicenses 4:16 y Juan 5:28-29'],
        ['Príncipe', 'Un jefe de ejército, no un rey', 'Josué 5:14; Daniel 10:13 distingue al «príncipe» de «los reyes de Persia»'],
        ['Veintiún días (10:13)', 'Días literales: no todo número es símbolo', 'Daniel 10:2-3: las «tres semanas» de ayuno'],
      ]) +
      `<p>Fuente: Bohr, <i>Daniel 1-10</i>, p. 361-364; Bohr, <i>15 principios</i> 2:105.</p>` },
  ],
  preguntas: [
    { t: 'mc', v: '10:5', f: 'c', q: '¿Cómo vio Daniel a Cristo en 10:5-6?', o: ['Como Sumo Sacerdote tras la ascensión', 'Como un niño recién nacido en Belén', 'Como un soldado del ejército persa', 'Como el Anciano de días en su trono'], a: 0, e: 'Daniel no lo vio como estaba en ese momento, sino como estaría vestido al inaugurar su sacerdocio en el cielo; por eso la descripción coincide con Apocalipsis 1. Fuente: Bohr, <i>Daniel 1-10</i>, p. 361-362.' },
    { t: 'mc', v: '10:10', f: 'c', q: '¿Quién es la mano que tocó a Daniel y lo puso sobre sus rodillas en 10:10?', o: ['Gabriel', 'Miguel', 'El príncipe de Persia', 'Un ángel sin nombre'], a: 0, e: 'El versículo 10 marca un corte entre el personaje de la visión (Cristo) y el que levanta a Daniel (Gabriel). Fuente: Bohr, <i>Daniel 1-10</i>, p. 362.' },
    { t: 'mc', v: '10:13', f: 'c', q: '¿Qué dato sobre la palabra «príncipe» muestra que el príncipe de Persia no es un rey humano?', o: ['En unos 420 usos nunca designa a un rey', 'Solo se usa para los sacerdotes del templo', 'Siempre se refiere a un hijo del rey', 'En hebreo es la palabra para «ángel»'], a: 0, e: 'La palabra se usa casi siempre para jefes militares, nunca para reyes; y 10:13 distingue al príncipe de Persia de «los reyes de Persia». Es Satanás. Fuente: Bohr, <i>Daniel 1-10</i>, p. 362-364.' },
    { t: 'mc', v: '10:13', f: 'c', q: '¿Qué período de la reconstrucción del templo coincide, en años, con los 21 días de resistencia?', o: ['Del 536 al 515 a.C.', 'Del 457 al 408 a.C.', 'Del 605 al 586 a.C.', 'Del 539 al 518 a.C.'], a: 0, e: 'Del decreto de Ciro (536) al templo terminado (515) pasaron 21 años. Es un sentido más amplio, sin dejar de leer 21 días literales. Fuente: Bohr, <i>Daniel 1-10</i>, p. 364.' },
    { t: 'tf', v: '10:13', f: 'c', q: 'Los 21 días de Daniel 10 deben entenderse solo como 21 años y no como días literales.', a: false, e: 'Falso: son días literales, los del ayuno de Daniel. La relación con los 21 años de 536 a 515 a.C. es solo un sentido más amplio. Fuente: Bohr, <i>Daniel 1-10</i>, p. 364.' },
    { t: 'mc', v: '10:14', f: 'c', q: '¿Qué palabra clave une los capítulos 8 a 12 de Daniel?', o: ['Entender', 'Reino', 'Bestia', 'Sueño'], a: 0, e: 'Gabriel debe hacer entender (8:16), Daniel no entiende (8:27), Gabriel vuelve para que entienda (9:23), Daniel entiende (10:1) y pide entender más (10:12). Fuente: Bohr, <i>Daniel 1-10</i>, p. 25 y 359.' },
    { t: 'tf', v: '10:1', f: 'c', q: 'El cambio de idioma del libro (arameo en 2 a 7, hebreo en 8 a 12) muestra que Daniel tiene dos mitades.', a: true, e: 'Verdadero, y la segunda mitad (8 a 12) es el libro que quedó sellado hasta el tiempo del fin. Fuente: Bohr, <i>Daniel 1-10</i>, p. 20.' },
    { t: 'mc', v: '10:2', f: 'c', q: '¿Por qué volvió Daniel a buscar a Dios en el capítulo 10?', o: ['Quería entender lo que aún no se le explicaba', 'Había caído en desgracia ante el rey Ciro', 'Lo amenazaban otra vez con los leones', 'Quería volver a Jerusalén con los exiliados'], a: 0, e: 'Gabriel le había dado en el capítulo 9 todo lo que podía recibir; años después Daniel deseó aprender más de lo que faltaba explicar. Fuente: Bohr, <i>Daniel 1-10</i>, p. 359; SL 49.' },

    { t: 'mc', v: '10:5', f: 'c', q: '¿Qué pasaje del Apocalipsis describe al mismo personaje que el varón vestido de lino de Daniel 10:5-6?', o: ['Apocalipsis 1:13-16', 'Apocalipsis 13:1-2', 'Apocalipsis 17:3-4', 'Apocalipsis 9:1-3'], a: 0, e: 'Los dos tienen pies como bronce bruñido y ojos o rostro de fuego: es Cristo glorificado. Fuente: Bohr, <i>Daniel 1-10</i>, p. 361.' },
    { t: 'mc', v: '10:5', f: 'c', q: 'Según Apocalipsis 19:8, ¿qué representa el lino fino?', o: ['Las acciones justas de los santos', 'La riqueza de los reyes de la tierra', 'El luto por los muertos', 'El poder de los sacerdotes'], a: 0, e: 'En la profecía la vestimenta representa justicia (Isaías 61:10; Apocalipsis 19:8). Fuente: Bohr, <i>15 principios</i> 2:105.' },
    { t: 'mc', v: '10:13', f: 'c', q: '¿Con qué título llama Jesús a Satanás, que ayuda a identificar al «príncipe del reino de Persia»?', o: ['El príncipe de este mundo', 'El rey de los reyes', 'El ángel del abismo', 'El señor de los ejércitos'], a: 0, e: 'Jesús lo llama así en Juan 12:31 y 14:30. Si Miguel, el Príncipe, es Cristo, el príncipe de Persia es Satanás. Fuente: Bohr, <i>Daniel 1-10</i>, p. 364.' },
  ],
};
