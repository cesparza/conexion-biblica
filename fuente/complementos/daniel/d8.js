/* Daniel 8: interpretación con fuentes (capa 'contexto', preguntas f:'c').
   Ya están en fuente/contenido.js: carnero, macho cabrío, cuatro cuernos
   como generales, Roma y no Antíoco, tamid como ministerio de Cristo, regla
   de día por año, nitsdaq, 457-1844 y Policronio. Aquí va lo que agrega Bohr:
   por qué animales del santuario, de dónde sale el cuerno (su lectura de
   Pérgamo, distinta de la de «los vientos»), qué parte del santuario es «el
   continuo», por qué la pregunta de 8:13 obliga a contar años, y el mes y
   el día de 1844. */
const { tbl, hi, wa, li } = require('../../apocalipsis/ayudas.js');

module.exports = {
  cap: 'd8',
  secciones: [
    { t: '🧭 Animales del santuario: lo que Daniel 8 quiere que veamos', capa: 'contexto', h:
      `<p>Bohr compara Daniel 8 con Daniel 7 y encuentra cuatro diferencias que apuntan al santuario:</p>` +
      li([
        '<b>No aparece Babilonia</b>: la visión empieza con Persia porque los 2.300 años empiezan en tiempos de Persia (457 a.C.).',
        '<b>Animales domésticos, no fieras</b>: el carnero se usaba en el servicio diario del santuario y el macho cabrío en el servicio anual, el Día de la Expiación. El cuerno quita «el continuo» (lo diario) y Dios lo juzga en lo anual.',
        '<b>Un solo símbolo para las dos Romas</b>: la pagana y la papal son el mismo cuerno, para no romper la imagen del santuario.',
        '<b>No termina con el reino eterno</b>: Daniel 8 a 12 es un solo libro y el reino llega al final, en 12:1-3.',
      ]) +
      hi('<b>Cada uno crece más.</b> El carnero «se engrandecía» (8:4), el macho cabrío «creció en gran manera» (8:8) y el cuerno «creció mucho» y aun «hasta llegar al ejército del cielo» (8:9-10). Los dos animales pelean contra otros reinos; el cuerno además pelea hacia arriba, contra Dios.') +
      `<p>Fuente: Stephen Bohr, Studies in Daniel 1-10, pág. PDF 293-295 y 305-306.</p>` },

    { t: '🧭 ¿De un viento o de un cuerno? La lectura de Bohr', capa: 'contexto', h:
      `<p>Muchos autores adventistas dicen que el cuerno sale de uno de los cuatro <i>vientos</i> y no de uno de los cuatro cuernos (es lo que se explica arriba). Bohr cree que esa salida «está bien intencionada pero no hace falta». Según él, el hebreo dice que sale de uno de los cuernos, <b>que están hacia</b> los cuatro vientos; así lo leen también la Septuaginta, Josefo y 1 Macabeos.</p>` +
      `<p>Para Bohr los cuatro cuernos son reinos, no generales, y siguiendo al historiador W. W. Tarn los nombra:</p>` +
      tbl(['Punto cardinal', 'Reino'], [
        ['Oeste', 'Antigónidas (Macedonia y Grecia)'], ['Este', 'Seléucidas (Siria y Mesopotamia)'],
        ['Sur', 'Tolomeos (Egipto)'], ['Norte', 'Atálidas (Pérgamo)'],
      ]) +
      `<p>Roma sale de <b>Pérgamo</b>: fue el único de los cuatro que no tuvo que conquistar, porque el rey Atalo III se lo dejó en herencia al Senado romano en 133 a.C. Allí se habían refugiado los sacerdotes de la religión babilónica, y desde allí esa religión pasó a Roma. Así Pérgamo une a Babilonia con la Roma pagana, y más tarde con la papal.</p>` +
      `<p>Fuente: Stephen Bohr, Studies in Daniel 1-10, pág. PDF 296-302.</p>` },

    { t: '🧭 Qué quitó el cuerno: «el continuo» del atrio y del lugar santo', capa: 'contexto', h:
      `<p>Bohr explica que el texto dice «<b>el</b> continuo» (<i>hatamid</i>), sin la palabra «sacrificio», que agregaron los traductores. En el santuario esa palabra describe el ministerio diario del sacerdote en el <b>atrio y el lugar santo</b>, nunca en el santísimo. El cuerno no puede subir al cielo: lo que hace es copiar en la tierra lo que le pertenece al Príncipe en el cielo.</p>` +
      `<p>Las notas de Camilo lo bajan mueble por mueble:</p>` +
      tbl(['Mueble', 'Qué representa', 'Qué se puso en su lugar'], [
        ['Altar del sacrificio', 'La muerte de Cristo', 'La penitencia'],
        ['Lavacro', 'El bautismo', 'El bautismo por aspersión'],
        ['Mesa de los panes', 'La Palabra de Dios', 'Solo el sacerdote la explica'],
        ['Candelabro', 'Cristo, luz del mundo', 'Una iglesia a oscuras'],
        ['Altar del incienso', 'La oración y la intercesión', 'El confesionario'],
      ]) +
      wa('Bohr reconoce que hay otra lectura entre adventistas: que «el continuo» es el paganismo, quitado para dar lugar al papado. Él sostiene la del ministerio de Cristo.') +
      `<p>Fuentes: Stephen Bohr, Studies in Daniel 1-10, pág. PDF 307-309; notas de Camilo en Evernote, "Cómo quitó el continuo el papado".</p>` },

    { t: '🧭 «¿Hasta cuándo durará la visión?»: por qué son años', capa: 'contexto', h:
      `<p>Bohr da tres razones del mismo texto:</p>` +
      li([
        '<b>La pregunta es por toda la visión.</b> En 8:13 el santo pregunta «¿Hasta cuándo durará la visión...?» con la palabra <i>jazón</i>, la misma de 8:1-2, que abarca todo: Persia, Grecia, Roma pagana y Roma papal. 2.300 días literales son unos seis años y medio, muy poco para todo eso.',
        '<b>Pregunta por el final</b>, no por la duración: «hasta cuándo», y la respuesta es «luego el santuario será purificado».',
        '<b>No son sacrificios.</b> El hebreo dice «tarde-mañana» en singular, como en la creación. Los sacrificios siempre se nombran al revés, «mañana y tarde» (Éxodo 29:39), así que no se puede partir en 1.150 de cada uno.',
      ]) +
      hi('Bohr también distingue <i>jazón</i>, la visión completa, de <i>mareh</i>, la parte de la visión sobre el tiempo (8:26). Gabriel explicó la <i>jazón</i>, pero la <i>mareh</i> quedó sin entender (8:27), y por eso vuelve en el capítulo 9.') +
      `<p>Fuente: Stephen Bohr, Studies in Daniel 1-10, pág. PDF 313-316.</p>` },

    { t: '🧭 El año, el mes y el día: 22 de octubre de 1844', capa: 'contexto', h:
      `<p>En «El calendario del Mesías», Bohr muestra que la Biblia da cada fecha del plan de salvación. Para el juicio:</p>` +
      tbl(['Dato', 'De dónde sale'], [
        ['El año: 1844', 'Daniel 8:14, contando 2.300 años desde 457 a.C.'],
        ['El mes y el día', 'Levítico 23:27: el día diez del mes séptimo, el Día de la Expiación'],
        ['En 1844', 'Ese día cayó el 22 de octubre'],
      ]) +
      `<p>La fiesta de las Trompetas, diez días antes, anunciaba el Día de la Expiación; Bohr la ve cumplida en el movimiento millerita, que proclamó Daniel 8:14. Los meses sin fiestas entre Pentecostés y el otoño representan los siglos de dominio papal.</p>` +
      `<p>Elena de White cuenta que Miller pensó primero en la primavera de 1844, pero la profecía señalaba el otoño.</p>` +
      wa('Es la <b>última fecha</b> del calendario que Dios reveló. Bohr advierte, con Elena de White, contra fijar fechas para el cierre de la gracia o la segunda venida.') +
      `<p>Fuentes: Esteban Bohr, El calendario del Mesías, pág. PDF 8; Elena de White, El conflicto de los siglos, pág. PDF 275 y 348.</p>` },
  ],
  preguntas: [
    { t: 'mc', v: '8:3', f: 'c', q: 'Según Bohr, ¿por qué Daniel 8 usa un carnero y un macho cabrío y no fieras como en Daniel 7?', o: ['Son animales del servicio del santuario', 'Eran signos zodiacales de Persia y Grecia', 'Muestran que esos imperios fueron pacíficos', 'Eran animales sagrados en Babilonia'], a: 0, e: 'El carnero se usaba en el servicio diario y el macho cabrío en el del Día de la Expiación: el tema del capítulo es el santuario. Fuente: Stephen Bohr, Studies in Daniel 1-10, pág. PDF 293.' },
    { t: 'mc', v: '8:1', f: 'c', q: 'Según Bohr, ¿por qué la visión de Daniel 8 no incluye a Babilonia?', o: ['Porque los 2.300 años empiezan en tiempos de Persia', 'Porque Babilonia ya había caído cuando Daniel la vio', 'Porque Babilonia no persiguió al pueblo de Dios', 'Porque Daniel 7 ya había explicado todo sobre ella'], a: 0, e: 'Babilonia todavía existía (cayó once años después). Si la visión empezara con Babilonia, parecería que los 2.300 años empiezan allí. Fuente: Stephen Bohr, Studies in Daniel 1-10, pág. PDF 293.' },
    { t: 'tf', v: '8:9', f: 'c', q: 'Según Bohr, el hebreo de Daniel 8:8-9 indica que el cuerno pequeño sale de uno de los cuatro cuernos, que están hacia los cuatro vientos.', a: true, e: 'Verdadero. Bohr discrepa de quienes dicen que sale «de uno de los vientos»: no es una cosa o la otra, sino las dos. Otros autores adventistas sostienen la lectura de los vientos. Fuente: Stephen Bohr, Studies in Daniel 1-10, pág. PDF 297.' },
    { t: 'mc', v: '8:8', f: 'c', q: 'Según Bohr, que sigue al historiador W. W. Tarn, ¿cuál de estos reinos era uno de los cuatro cuernos?', o: ['Los atálidas de Pérgamo', 'Los partos de Persia', 'Los nabateos de Petra', 'Los asmoneos de Judea'], a: 0, e: 'Los cuatro cuernos son antigónidas (oeste), seléucidas (este), tolomeos (sur) y atálidas de Pérgamo (norte). Fuente: Stephen Bohr, Studies in Daniel 1-10, pág. PDF 296-297.' },
    { t: 'mc', v: '8:9', f: 'c', q: 'Según Bohr, ¿cómo llegó el reino de Pérgamo a manos de Roma en 133 a.C.?', o: ['Su rey Atalo III se lo dejó en herencia', 'Lo conquistó el general Pompeyo', 'El Senado romano lo compró', 'Se rindió después de un largo sitio'], a: 0, e: 'Fue el único de los cuatro reinos que Roma no tuvo que pelear: Atalo III se lo dejó al Senado. Por eso Bohr ve al cuerno salir de Pérgamo. Fuente: Stephen Bohr, Studies in Daniel 1-10, pág. PDF 302.' },
    { t: 'mc', v: '8:11', f: 'c', q: 'Según Bohr, ¿en qué partes del santuario se hacía el ministerio llamado «el continuo»?', o: ['En el atrio y el lugar santo', 'Solo en el lugar santísimo', 'Solo en el altar del atrio', 'En el santísimo y el atrio'], a: 0, e: 'La palabra describe el servicio diario del sacerdote en el atrio y el lugar santo; nunca se usa para el santísimo. Fuente: Stephen Bohr, Studies in Daniel 1-10, pág. PDF 308.' },
    { t: 'mc', v: '8:11', f: 'c', q: 'Según las notas de Camilo, ¿qué puso el papado en lugar del altar del incienso, que representa la oración e intercesión?', o: ['El confesionario', 'El rosario', 'La misa en latín', 'Las procesiones'], a: 0, e: 'En vez de llevar la oración a Dios por medio de Cristo, el único mediador (1 Timoteo 2:5), se pidió hacerlo ante un sacerdote. Fuente: notas de Camilo en Evernote, "Cómo quitó el continuo el papado".' },
    { t: 'mc', v: '8:13', f: 'c', q: 'Según Bohr, ¿qué abarca la «visión» (jazón) por la que pregunta el ángel en 8:13?', o: ['Toda la visión, desde Persia', 'Solo la obra del cuerno pequeño', 'Solo la profanación de Antíoco', 'Solo los 1.260 años papales'], a: 0, e: 'Es la misma palabra de 8:1-2. Si la visión va de Persia hasta la purificación del santuario, 2.300 días literales no alcanzan: tienen que ser años. Fuente: Stephen Bohr, Studies in Daniel 1-10, pág. PDF 314.' },
    { t: 'tf', v: '8:14', f: 'c', q: 'Según Bohr, las «tardes y mañanas» de 8:14 son 1.150 sacrificios de la tarde y 1.150 de la mañana.', a: false, e: 'Falso: el hebreo dice «tarde-mañana» en singular, como en la creación, y los sacrificios siempre se nombran «mañana y tarde». Es una lectura para hacer encajar a Antíoco. Fuente: Stephen Bohr, Studies in Daniel 1-10, pág. PDF 315.' },
    { t: 'mc', v: '8:14', f: 'c', q: 'Según Bohr, ¿qué pasaje da el mes y el día en que terminaron los 2.300 años?', o: ['Levítico 23:27', 'Éxodo 12:6', 'Números 29:1', 'Ezequiel 4:6'], a: 0, e: 'Daniel 8:14 da el año (1844) y Levítico 23:27 el día diez del mes séptimo, el Día de la Expiación, que en 1844 cayó el 22 de octubre. Fuente: Esteban Bohr, El calendario del Mesías, pág. PDF 8.' },
    { t: 'mc', v: '8:14', f: 'c', q: 'Según Elena de White, ¿cuándo creyeron primero Miller y sus colaboradores que terminarían los 2.300 días?', o: ['En la primavera de 1844', 'En el otoño de 1843', 'En el invierno de 1844', 'En el verano de 1845'], a: 0, e: 'Primero pensaron en la primavera de 1844, pero la profecía señalaba el otoño de ese año. Fuente: Elena de White, El conflicto de los siglos, pág. PDF 275.' },
    { t: 'tf', v: '8:14', f: 'c', q: 'Según Bohr, el 22 de octubre de 1844 es la última fecha del calendario profético que Dios ha revelado.', a: true, e: 'Verdadero. Dios tiene fecha para el cierre de la gracia y la segunda venida, pero no la ha revelado; por eso no se deben fijar fechas. Fuente: Esteban Bohr, El calendario del Mesías, pág. PDF 8.' },
  ],
};
