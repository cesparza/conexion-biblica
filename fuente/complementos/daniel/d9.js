/* Daniel 9: interpretación con fuentes (capa 'contexto', preguntas f:'c').
   Ya están en fuente/contenido.js: 70 semanas = 490 años, decreto de 457,
   tres divisiones, bautismo 27, cruz 31, Esteban 34, 2.300 − 490 = 1.810,
   la oración y jatak. Aquí va lo que agrega Bohr: las seis metas de 9:24,
   los cuatro decretos, quién es «el príncipe que ha de venir», qué es
   «confirmar el pacto con muchos» y el calendario de las fiestas. v188: voz
   directa, sin nombrar autores en el cuerpo; una sola «Fuente:» corta por
   sección. */
const { tbl, hi, wa, li } = require('../../apocalipsis/ayudas.js');

module.exports = {
  cap: 'd9',
  secciones: [
    { t: '🧭 Las seis metas de las setenta semanas', capa: 'contexto', verso: 24, h:
      `<p><b>Cuándo:</b> el primer año de Darío el medo (9:1), hacia el 538 a.C., un año después de la caída de Babilonia. Daniel estudiaba los setenta años de Jeremías (9:2) y temía que los 2.300 años de la visión anterior los alargaran.</p>` +
      `<p>Daniel 9:24 dice que en las setenta semanas se cumplirían seis cosas:</p>` +
      tbl(['La meta', 'Qué significa'], [
        ['Terminar la prevaricación', 'La palabra es «rebelión». Israel podía terminarla recibiendo al Mesías, o llevarla al extremo rechazándolo. La profecía anuncia lo segundo.'],
        ['Poner fin al pecado', 'No al hecho de pecar, sino a los pecados: Jesús los cargó en la cruz (Hebreos 9:26-28).'],
        ['Expiar la iniquidad', 'La reconciliación del hombre con Dios por su muerte (Romanos 5:10).'],
        ['Traer la justicia perdurable', 'La expiación hace posible una justicia duradera para el creyente (Romanos 3:21-26). Shea une estos dos propósitos como el centro del versículo.'],
        ['Sellar la visión y la profecía', 'Bohr relaciona el cierre del testimonio a Israel como nación con Esteban. Es un énfasis interpretativo; no una prohibición universal de profetizar ni el rechazo de toda persona judía.'],
        ['Ungir al Santo de los santos', 'Shea aplica la expresión al santuario inaugurado para el ministerio celestial de Cristo. Se distingue de su unción en el bautismo (Hechos 10:38).'],
      ]) +
      `<p>Shea une la expiación y la justicia en el centro de 9:24; la muerte del Mesías de 9:26 explica su cumplimiento.</p><p>Fuente: Bohr, <i>Daniel 1-10</i>, p. 323 y 327-329; Shea, <i>Simposio sobre Daniel</i>, PDF 254-258 y 265-268.</p>` },

    { t: '🧭 Cuatro decretos persas y por qué cuenta el de 457', capa: 'contexto', h:
      `<p>Daniel 9:25 pide una orden para «restaurar y edificar a Jerusalén», la ciudad, no solo el templo. Hubo cuatro decretos:</p>` +
      tbl(['Año a.C.', 'Rey', 'Qué ordenó'], [
        ['536', 'Ciro el Grande', 'Reconstruir el templo (original). Lo suspendió Cambises II.'],
        ['520', 'Darío I', 'Confirmó el de Ciro. Solo el templo.'],
        ['457', 'Artajerjes I', 'Restaurar y edificar Jerusalén (original), en el otoño de su séptimo año (Esdras 7).'],
        ['445', 'Artajerjes I', 'No fue un decreto nuevo: permiso a Nehemías que levantó la suspensión del de 457.'],
      ]) +
      `<p>Identificar el séptimo año con 457 a.C. exige estudiar el inicio del reinado de Artajerjes, cómo se cuentan los años de acceso y el calendario civil judío de otoño a otoño. Shea examina esos datos en el apéndice B del <i>Simposio sobre Apocalipsis</i>. No es solo restar siete al año de acceso.</p>` +
      wa('Con el mismo cómputo de 483 años, comenzar en 445 a.C. lleva a 39 d.C.: 445 + 39 − 1 = 483. No llega al bautismo del año 27 de la cronología adoptada. El ejemplo de Bohr, p. 333, dice 37; esa cifra no coincide con esta operación.') +
      `<p>Fuente: CS, cap. 18; Bohr, <i>Daniel 1-10</i>, p. 330-333; Shea, <i>Simposio sobre Apocalipsis</i>, apéndice B.</p>` },

    { t: '🧭 ¿Quién es «el príncipe que ha de venir»?', capa: 'contexto', verso: 26, h:
      `<p>Daniel 9:26 dice: «El pueblo de un príncipe que ha de venir destruirá la ciudad y el santuario». En la lectura de Bohr que sigue este estudio, el príncipe es <b>Jesús y su pueblo es Israel</b>. Los ejércitos romanos destruyeron físicamente Jerusalén en el año 70 d.C.</p>` +
      `<p>Las razones: el «Mesías Príncipe» de 9:25 y el «Mesías» y «príncipe» de 9:26 están en paralelo y son la misma persona; Shea observa la distribución del doble título: Mesías Príncipe (9:25), Mesías (9:26a) y príncipe (9:26b). Ese patrón es su argumento para un solo personaje, no una identidad expresamente aclarada por la traducción.</p>` +
      hi('Entonces, ¿por qué se destruyó la ciudad? Al rechazar al Mesías, la nación misma provocó su ruina, y Dios permitió que lo hicieran los ejércitos romanos (Mateo 22:7): «los judíos habían forjado sus propias cadenas» (CS 39).') +
      `<p>Otra lectura, la adventista tradicional, ve aquí a Tito y los romanos, que destruyeron Jerusalén en el año 70. La futurista ve un anticristo que haría un pacto de siete años con los judíos.</p>` +
      `<p>Fuente: Bohr, <i>Daniel 1-10</i>, p. 341-345; Shea, <i>Daniel</i>, p. 168; Maxwell, <i>El porvenir del mundo revelado</i>, p. 232; Ruiz, <i>Escuela de laicos: Daniel</i>, p. 32; CS 39.</p>` },

    { t: '🧭 «Confirmará el pacto con muchos»', capa: 'contexto', verso: 27, h:
      `<p>La lectura mesiánica sigue al Mesías de 9:25-26 al explicar quién confirma el pacto. Para evaluar esa identificación hay que leer la estructura del pasaje y las referencias al pacto, no introducir un protagonista sin argumentarlo.</p>` +
      li([
        '<b>«El pacto»</b>: la oración ya presenta a Dios como quien guarda el pacto (9:4). La lectura mesiánica sigue ese hilo y lo une con las promesas a los padres; no introduce un tratado político moderno en 9:27.',
        '<b>«Confirmará»</b> traduce <i>gabar</i>, «hacer firme». Shea entiende que el pacto ya existía: la semana del 27 al 34 es la última del período de oportunidad de Israel, no los primeros siete años de un pacto nuevo fundado en el bautismo. Cristo confirma las promesas hechas a los padres (Romanos 15:8) y ratifica el nuevo pacto con su sangre a mitad de la semana (Marcos 14:24; Hebreos 9:15).',
        '<b>«Con muchos»</b>: es la palabra del sacrificio que sustituye (Isaías 53:11; Marcos 10:45). Jesús la usó en la última cena: «mi sangre del nuevo pacto, que por muchos es derramada» (Mateo 26:28).',
      ]) +
      `<p>El testimonio abarca siete años: primero Cristo y después sus apóstoles (DTG, cap. 23). Terminar ese período no significa que el nuevo pacto expire en el año 34.</p><p>Fuente: DTG, cap. 23; Bohr, <i>Daniel 1-10</i>, p. 346-347; Shea, <i>Simposio sobre Daniel</i>, PDF 255-256.</p>` },

    { t: '🧭 El calendario del Mesías: el día y la hora', capa: 'contexto', h:
      `<p>Las fiestas de Levítico 23 daban el mes, el día y hasta la hora de cada paso de Jesús:</p>` +
      tbl(['Paso', 'Fecha', 'Qué lo anunciaba'], [
        ['Bautismo', 'Otoño del 27 d.C.', 'Fin de la semana 69 (9:25)'],
        ['Muerte', 'Primavera del 31, 14 de nisán, hora novena', 'La Pascua: el cordero se mataba ese día y a esa hora (Éxodo 12:6)'],
        ['Sepultura', '15 de nisán', 'Panes sin levadura: su cuerpo no vio corrupción'],
        ['Resurrección', '16 de nisán', 'Las primicias (Levítico 23:10-11)'],
        ['Intercesión', 'Pentecostés, 50 días después', 'Empieza su ministerio en el santuario celestial'],
      ]) +
      hi('Cuando Jesús murió, el sacerdote en el templo estaba por matar al cordero de la tarde; el cuchillo se le cayó y «el cordero escapó» (DTG 704-705): el símbolo se había encontrado con la realidad.') +
      `<p>Fuente: Bohr, <i>El calendario del Mesías</i>, p. 3-7; DTG 704-705.</p>` },

    { t: '🧭 Unidades, expresiones y referencias bíblicas', verso: 24, capa: 'contexto', h:
      `<p>Distingue unidades, destinatarios e imágenes; no todos son símbolos:</p>` +
      tbl(['Expresión', 'Cómo se entiende en esta lectura', 'Fundamento bíblico'], [
        ['Semana (9:24-27)', 'Semana de años: siete años. Cómputo directo: 70 × 7 años = 490 años, sin otra conversión.', 'Levítico 25:8: precedente explícito; Daniel 9:24-27: divisiones del período.'],
        ['«Tu pueblo» y «tu santa ciudad» (9:24)', 'Israel y Jerusalén, por los que Daniel ora. El cierre del período cambia la etapa de la misión; no convierte retrospectivamente la ciudad en símbolo ni impide la salvación de personas judías (Romanos 11:1-5).', 'Daniel 9:24; Gálatas 3:29'],
        ['Mesías, ungir (9:25-26)', 'El Ungido: Jesús, ungido con el Espíritu Santo en su bautismo', 'Hechos 10:38; Juan 1:41'],
        ['Sacrificio y ofrenda (9:27)', 'Señalaban a Cristo, el Cordero; cesan cuando él muere', 'Juan 1:29; 1 Corintios 5:7; Mateo 27:51'],
        ['Inundación (9:26)', 'La invasión de un ejército', 'Isaías 8:7-8; Daniel 11:22: «barridas delante de él como por inundación de aguas»'],
      ]) +
      `<p>Daniel 9:24 no añade las palabras «de años». Elena de White explica la duración mediante el principio día por año: 490 días proféticos representan 490 años. Shea compara esa explicación con el cómputo directo de semanas de años; ambos llegan al mismo período. No se convierten de nuevo los años ya calculados.</p>` +
      `<p>Fuente: DTG, cap. 23; Shea, <i>Simposio sobre Apocalipsis</i>, p. 444; <i>Simposio sobre Daniel</i>, PDF 249–251; Bohr, <i>15 principios</i> 2:105; Bohr, <i>Daniel 1-10</i>, p. 328 y 345; Bohr, <i>Daniel 11</i>, p. 21; Bohr, <i>El calendario del Mesías</i>, p. 3 y 5.</p>` },
  ],
  preguntas: [
    ...require('../../daniel9-preguntas.js').map(({hito,abierta,pauta,...q})=>q),
    { t: 'mc', v: '9:24', f: 'c', q: '¿Qué es «la prevaricación» que terminaría con las setenta semanas?', o: ['La rebelión de la nación judía', 'La idolatría de Babilonia', 'El pecado de Adán en el Edén', 'La apostasía del papado'], a: 0, e: 'La palabra significa «rebelión». Israel podía terminarla aceptando al Mesías o llevarla al extremo rechazándolo, y la profecía anuncia esto último. Fuente: Bohr, <i>Daniel 1-10</i>, p. 327-328.' },
    { t: 'mc', v: '9:24', f: 'c', q: 'Según el énfasis de Bohr, ¿qué significa «sellar la visión y la profecía» para Israel como nación?', o: ['Que cesaron las visiones dadas a Israel', 'Que el libro de Daniel quedó cerrado', 'Que ya no habría más profetas en el mundo', 'Que terminó la obra de Juan el Bautista'], a: 0, e: 'Bohr relaciona el cierre con Esteban y el testimonio dirigido a Israel como nación. Es su énfasis interpretativo; no significa que Dios dejara de revelar su voluntad a toda persona judía ni que cesaran los profetas en el mundo. Fuente: Bohr, <i>Daniel 1-10</i>, p. 328.' },
    { t: 'mc', v: '9:24', f: 'c', q: '¿A qué se refiere «ungir al Santo de los santos»?', o: ['A Jesús y al santuario celestial', 'Al templo que reconstruyó Zorobabel', 'Al altar que profanó Antíoco', 'A un templo futuro en Jerusalén'], a: 0, e: 'Como en la inauguración del tabernáculo se ungía todo el santuario y al sumo sacerdote, al comenzar Jesús su ministerio en el cielo fueron ungidos él y el santuario celestial. Fuente: Bohr, <i>Daniel 1-10</i>, p. 328-329.' },
    { t: 'mc', v: '9:25', f: 'c', q: '¿Cuál de estos decretos fue original y ordenó restaurar y edificar Jerusalén?', o: ['El de Artajerjes I en 457 a.C.', 'El de Ciro en 536 a.C.', 'El de Darío I en 520 a.C.', 'El de Artajerjes I en 445 a.C.'], a: 0, e: 'Los de Ciro el Grande y Darío I solo hablaban del templo, y el de 445 confirmó el de 457. Fuente: Bohr, <i>Daniel 1-10</i>, p. 330-333.' },
    { t: 'tf', v: '9:25', f: 'c', q: 'Si las setenta semanas se contaran desde el decreto de 445 a.C., Jesús tendría que haberse bautizado en el año 37 d.C.', a: false, e: 'Falso. Sin año cero, 445 + 39 − 1 = 483: el resultado es 39 d.C. El ejemplo de Bohr, p. 333, dice 37, pero esa cifra no coincide con la operación. El inicio adoptado en 457 a.C. conduce al año 27 (DTG, cap. 23). Fuente: Daniel 9:25; DTG, cap. 23; Bohr, p. 333, con el cálculo corregido.' },
    { t: 'mc', v: '9:26', f: 'c', q: 'Según la lectura de Bohr presentada aquí, ¿quién es «el príncipe que ha de venir» de Daniel 9:26?', o: ['El mismo Mesías Príncipe', 'El general romano Tito', 'Un anticristo todavía futuro', 'El rey Antíoco Epífanes'], a: 0, e: 'Bohr lo identifica con Jesús y considera a Israel su pueblo; los ejércitos romanos destruyeron la ciudad. Otra lectura adventista ve a Tito y los romanos; la futurista, un anticristo. Fuente: Bohr, <i>Daniel 1-10</i>, p. 341-342.' },
    { t: 'tf', v: '9:26', f: 'c', q: 'Según Bohr, la estructura de Daniel 9:25-27 identifica al «príncipe que ha de venir» con el Mesías, aunque otra lectura adventista lo identifica con Tito.', a: true, e: 'Verdadero. Son dos lecturas de Daniel 9:26; la pregunta presenta la de Bohr. Fuente: Bohr, <i>Daniel 1-10</i>, p. 341.' },
    { t: 'mc', v: '9:27', f: 'c', q: '¿Qué significa el verbo hebreo (gabar) que se traduce «confirmará» el pacto?', o: ['Hacer fuerte, ratificar', 'Romper o anular', 'Firmar por siete años', 'Renovar cada año'], a: 0, e: 'Cristo puso el pacto sobre una base firme: la sangre de animales no quitaba el pecado, la suya sí. Fuente: Bohr, <i>Daniel 1-10</i>, p. 346.' },
    { t: 'mc', v: '9:27', f: 'c', q: '¿Con qué palabras de Jesús se conecta «el pacto con muchos» de 9:27?', o: ['«Mi sangre del nuevo pacto... por muchos»', '«Destruid este templo y en tres días lo levantaré»', '«Consumado es», dicho en la cruz', '«El tiempo se ha cumplido, el reino está cerca»'], a: 0, e: 'En la última cena Jesús unió las palabras «pacto» y «muchos» (Mateo 26:28), como Daniel 9:27. Fuente: Bohr, <i>Daniel 1-10</i>, p. 347.' },
    { t: 'mc', v: '9:27', f: 'c', q: '¿A qué hora murió Jesús, cumpliendo el tipo del cordero pascual?', o: ['A la hora novena', 'A la hora tercera', 'A la hora sexta', 'A la medianoche'], a: 0, e: 'El cordero se mataba el 14 de nisán «entre las dos tardes»; Jesús murió cerca de la hora novena (Mateo 27:46-50). Fuente: Bohr, <i>El calendario del Mesías</i>, p. 5.' },
    { t: 'tf', v: '9:27', f: 'c', q: 'Cuando Jesús murió, el cordero que iba a ser sacrificado en el templo escapó.', a: true, e: 'Verdadero: al rasgarse el velo, el cuchillo cayó de la mano del sacerdote y el cordero escapó; ahí terminaban los sacrificios (alusión a 9:27). Fuente: Bohr, <i>El calendario del Mesías</i>, p. 6; DTG 704-705.' },
    { t: 'mc', v: '9:24', f: 'c', q: '¿Qué fiesta marcó el comienzo del ministerio de intercesión de Cristo en el santuario celestial?', o: ['Pentecostés', 'Las Primicias', 'Los Tabernáculos', 'Las Trompetas'], a: 0, e: 'Cincuenta días después de las primicias, en Pentecostés, Cristo empezó a interceder en el lugar santo del santuario celestial. Fuente: Bohr, <i>El calendario del Mesías</i>, p. 7.' },

    { t: 'mc', v: '9:26', f: 'c', q: '¿Qué representa en la profecía una «inundación», como la de Daniel 9:26?', o: ['La invasión de un ejército', 'Un diluvio literal sobre Judea', 'El derramamiento del Espíritu', 'El bautismo de los creyentes'], a: 0, e: 'Isaías 8:7-8 compara una invasión con un río desbordado; en 9:26 son los ejércitos romanos del año 70. Fuente: Bohr, <i>Daniel 1-10</i>, p. 345.' },
    { t: 'tf', v: '9:24', f: 'c', q: 'En Daniel 9:24 «tu pueblo» y «tu santa ciudad» son todavía el Israel literal y la Jerusalén literal.', a: true, e: 'Verdadero. La oración de Daniel 9:16-20 identifica a los destinatarios. El cierre del período no cambia retrospectivamente esa referencia ni excluye a las personas judías de la salvación (Romanos 11:1-5). Fuente: Bohr, <i>Daniel 11</i>, p. 21.' },
    { t: 'mc', v: '9:25', f: 'c', q: 'Según Hechos 10:38, ¿con qué fue ungido Jesús para ser el Mesías?', o: ['Con el Espíritu Santo y poder', 'Con aceite, por el sumo sacerdote', 'Con agua, por Juan el Bautista', 'Con la sangre del cordero'], a: 0, e: 'Mesías significa «ungido». Jesús fue ungido con el Espíritu Santo en su bautismo, en el otoño del 27. Fuente: Bohr, <i>El calendario del Mesías</i>, p. 3.' },
  ],
};
