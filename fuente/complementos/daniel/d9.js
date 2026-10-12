/* Daniel 9: interpretación con fuentes (capa 'contexto', preguntas f:'c').
   Ya están en fuente/contenido.js: 70 semanas = 490 años, decreto de 457,
   tres divisiones, bautismo 27, cruz 31, Esteban 34, 2.300 − 490 = 1.810,
   la oración y jatak. Aquí va lo que agrega Bohr: las seis metas de 9:24,
   los cuatro decretos, quién es «el príncipe que ha de venir», qué es
   «confirmar el pacto con muchos» y el calendario de las fiestas. */
const { tbl, hi, wa, li } = require('../../apocalipsis/ayudas.js');

module.exports = {
  cap: 'd9',
  secciones: [
    { t: '🧭 Las seis metas de las setenta semanas, según Bohr', capa: 'contexto', h:
      `<p>Daniel 9:24 dice que en las setenta semanas se cumplirían seis cosas. Bohr las explica una por una:</p>` +
      tbl(['La meta', 'Qué significa'], [
        ['Terminar la prevaricación', 'La palabra es «rebelión». Israel podía terminarla recibiendo al Mesías, o llevarla al extremo rechazándolo. La profecía anuncia lo segundo.'],
        ['Poner fin al pecado', 'No al hecho de pecar, sino a los pecados: Jesús los cargó en la cruz (Hebreos 9:26-28).'],
        ['Expiar la iniquidad', 'La reconciliación del hombre con Dios por su muerte (Romanos 5:10).'],
        ['Traer la justicia perdurable', 'Con su vida sin pecado Jesús tejió un manto de justicia que se acredita al que cree.'],
        ['Sellar la visión y la profecía', 'Al rechazar al Mesías, Israel cerró el tiempo de las visiones para la nación. Esteban fue el último profeta enviado a Israel.'],
        ['Ungir al Santo de los santos', 'Jesús y el santuario celestial, ungidos cuando él empezó su ministerio allá.'],
      ]) +
      `<p>Fuente: Stephen Bohr, Studies in Daniel 1-10, pág. PDF 327-329.</p>` },

    { t: '🧭 Cuatro decretos persas y por qué cuenta el de 457', capa: 'contexto', h:
      `<p>Daniel 9:25 pide una orden para «restaurar y edificar a Jerusalén», la ciudad, no solo el templo. Bohr repasa los cuatro decretos:</p>` +
      tbl(['Año a.C.', 'Rey', 'Qué ordenó'], [
        ['536', 'Ciro', 'Reconstruir el templo (original). Lo suspendió Cambises.'],
        ['520', 'Darío I', 'Confirmó el de Ciro. Solo el templo.'],
        ['457', 'Artajerjes I', 'Restaurar y edificar Jerusalén (original), en el otoño de su séptimo año (Esdras 7).'],
        ['445', 'Artajerjes I', 'No fue un decreto nuevo: permiso a Nehemías que levantó la suspensión del de 457.'],
      ]) +
      `<p>La fecha de 457 está bien firme. Bohr cita a Ángel Manuel Rodríguez: textos astronómicos babilónicos y los papiros de Elefantina (Egipto) muestran que Artajerjes subió al trono en 465 a.C., así que su séptimo año es 457.</p>` +
      wa('Si se contara desde 445, Jesús tendría que haberse bautizado en el año 37 d.C. y muerto en el 41, y ningún historiador lo pone así.') +
      `<p>Fuente: Stephen Bohr, Studies in Daniel 1-10, pág. PDF 330-333.</p>` },

    { t: '🧭 ¿Quién es «el príncipe que ha de venir»?', capa: 'contexto', h:
      `<p>Daniel 9:26 dice: «El pueblo de un príncipe que ha de venir destruirá la ciudad y el santuario». Bohr presenta tres lecturas:</p>` +
      li([
        '<b>Tito y los romanos</b>, que destruyeron Jerusalén en el año 70. Es la lectura adventista tradicional: la siguen Maxwell y Roger Ruiz, y la nota de Camilo «Mateo 24» ve en 9:26 esa destrucción por Tito.',
        '<b>Un anticristo futuro</b> que haría un pacto de siete años con los judíos. Es la lectura futurista.',
        '<b>Jesús, y su pueblo son los judíos.</b> Es la que propone Bohr; William Shea llega a lo mismo.',
      ]) +
      `<p>Sus razones: el «Mesías Príncipe» de 9:25 y el «Mesías» y «príncipe» de 9:26 están en paralelo y son la misma persona; los tres «él» de 9:27 vuelven a ese príncipe; y en Daniel 9 «pueblo» siempre es Israel.</p>` +
      hi('Entonces, ¿por qué se destruyó la ciudad? Al rechazar al Mesías, la nación misma provocó su ruina. Dios permitió que lo hicieran los ejércitos romanos (Mateo 22:7). Elena de White: «los judíos habían forjado sus propias cadenas».') +
      `<p>Fuentes: Stephen Bohr, Studies in Daniel 1-10, pág. PDF 341-345; Elena de White, El conflicto de los siglos, pág. PDF 28 (pp. 35-36 en inglés); William Shea, Daniel, pág. PDF 168; Mervyn Maxwell, El porvenir del mundo revelado, pág. PDF 232; Roger Ruiz, Escuela de laicos: Daniel, pág. PDF 32; notas de Camilo en Evernote, "Mateo 24".</p>` },

    { t: '🧭 «Confirmará el pacto con muchos»', capa: 'contexto', h:
      `<p>Para la lectura futurista, el que «confirmará el pacto» es un anticristo. Bohr responde que no hay razón para meter otro personaje: es el mismo Mesías de 9:26.</p>` +
      li([
        '<b>«El pacto»</b>, con artículo: en Daniel la palabra siempre es el pacto de Dios con su pueblo (9:4; 11:22, 28, 30, 32), nunca un tratado político. Daniel 9 es además el único capítulo del libro que usa el nombre del pacto, Jehová.',
        '<b>«Confirmará»</b> traduce <i>gabar</i>, «hacer fuerte». El pacto antiguo era débil porque la sangre de animales no quita el pecado; la sangre de Cristo lo ratifica.',
        '<b>«Con muchos»</b>: es la palabra del sacrificio que sustituye (Isaías 53:11; Marcos 10:45). Jesús la usó en la última cena: «mi sangre del nuevo pacto, que por muchos es derramada» (Mateo 26:28).',
      ]) +
      `<p>Fuente: Stephen Bohr, Studies in Daniel 1-10, pág. PDF 346-347.</p>` },

    { t: '🧭 El calendario del Mesías: el día y la hora', capa: 'contexto', h:
      `<p>Bohr muestra que las fiestas de Levítico 23 daban el mes, el día y hasta la hora de cada paso de Jesús:</p>` +
      tbl(['Paso', 'Fecha', 'Qué lo anunciaba'], [
        ['Bautismo', 'Otoño del 27 d.C.', 'Fin de la semana 69 (9:25)'],
        ['Muerte', 'Primavera del 31, 14 de nisán, hora novena', 'La Pascua: el cordero se mataba ese día y a esa hora (Éxodo 12:6)'],
        ['Sepultura', '15 de nisán', 'Panes sin levadura: su cuerpo no vio corrupción'],
        ['Resurrección', '16 de nisán', 'Las primicias (Levítico 23:10-11)'],
        ['Intercesión', 'Pentecostés, 50 días después', 'Empieza su ministerio en el santuario celestial'],
      ]) +
      hi('Elena de White cuenta que, cuando Jesús murió, el sacerdote en el templo estaba por matar al cordero de la tarde, el cuchillo se le cayó y «el cordero escapó»: el símbolo se había encontrado con la realidad.') +
      `<p>Fuentes: Esteban Bohr, El calendario del Mesías, pág. PDF 3-7 (cita El Deseado de todas las gentes, pp. 704-705); notas de Camilo en Evernote, "INICIO DEL JUICIO DE LOS MUERTO".</p>` },

    { t: '🧭 La Biblia explica sus símbolos', capa: 'contexto', h:
      `<p>Daniel 9 tiene pocos símbolos, pero son la llave del capítulo. La misma Biblia los explica:</p>` +
      tbl(['Símbolo', 'Qué representa', 'Dónde lo explica la Biblia'], [
        ['Semana (9:24-27)', 'Siete años: 70 semanas son 490 años', 'Números 14:34; Ezequiel 4:6 (un día por cada año)'],
        ['«Tu pueblo» y «tu santa ciudad» (9:24)', 'Israel y Jerusalén literales. Hasta el año 34 no son símbolo; después, el pueblo de Dios es la iglesia', 'Daniel 9:24; Gálatas 3:29'],
        ['Mesías, ungir (9:25-26)', 'El Ungido: Jesús, ungido con el Espíritu Santo en su bautismo', 'Hechos 10:38; Juan 1:41'],
        ['Sacrificio y ofrenda (9:27)', 'Señalaban a Cristo, el Cordero; cesan cuando él muere', 'Juan 1:29; 1 Corintios 5:7; Mateo 27:51'],
        ['Inundación (9:26)', 'La invasión de un ejército', 'Isaías 8:7-8; Daniel 11:22: «barridas delante de él como por inundación de aguas»'],
      ]) +
      `<p>Fuentes: notas de Camilo en Evernote, "Daniel 9" (día por año) y "Daniel 2 al 11"; Esteban Bohr, 15 principios de interpretación profética, vol. 2, pág. PDF 105; Stephen Bohr, Studies in Daniel 1-10, pág. PDF 328 y 345; Stephen Bohr, Studies on Daniel 11, pág. PDF 21; Esteban Bohr, El calendario del Mesías, pág. PDF 3 y 5.</p>` },
  ],
  preguntas: [
    { t: 'mc', v: '9:24', f: 'c', q: 'Según Bohr, ¿qué es «la prevaricación» que terminaría con las setenta semanas?', o: ['La rebelión de la nación judía', 'La idolatría de Babilonia', 'El pecado de Adán en el Edén', 'La apostasía del papado'], a: 0, e: 'La palabra significa «rebelión». Israel podía terminarla aceptando al Mesías o llevarla al extremo rechazándolo, y la profecía anuncia esto último. Fuente: Stephen Bohr, Studies in Daniel 1-10, pág. PDF 327-328.' },
    { t: 'mc', v: '9:24', f: 'c', q: 'Según Bohr, ¿qué significa que las setenta semanas iban a «sellar la visión y la profecía»?', o: ['Que cesaron las visiones dadas a Israel', 'Que el libro de Daniel quedó cerrado', 'Que ya no habría más profetas en el mundo', 'Que terminó la obra de Juan el Bautista'], a: 0, e: 'Al rechazar al Mesías, la nación cerró el tiempo de las visiones para ella; Esteban, que vio a Cristo en visión, fue el último profeta enviado a Israel. Fuente: Stephen Bohr, Studies in Daniel 1-10, pág. PDF 328.' },
    { t: 'mc', v: '9:24', f: 'c', q: 'Según Bohr, ¿a qué se refiere «ungir al Santo de los santos»?', o: ['A Jesús y al santuario celestial', 'Al templo que reconstruyó Zorobabel', 'Al altar que profanó Antíoco', 'A un templo futuro en Jerusalén'], a: 0, e: 'Como en la inauguración del tabernáculo se ungía todo el santuario y al sumo sacerdote, al comenzar Jesús su ministerio en el cielo fueron ungidos él y el santuario celestial. Fuente: Stephen Bohr, Studies in Daniel 1-10, pág. PDF 328-329.' },
    { t: 'mc', v: '9:25', f: 'c', q: 'Según Bohr, ¿cuál de estos decretos fue original y ordenó restaurar y edificar Jerusalén?', o: ['El de Artajerjes I en 457 a.C.', 'El de Ciro en 536 a.C.', 'El de Darío I en 520 a.C.', 'El de Artajerjes I en 445 a.C.'], a: 0, e: 'Los de Ciro y Darío solo hablaban del templo, y el de 445 confirmó el de 457. Fuente: Stephen Bohr, Studies in Daniel 1-10, pág. PDF 330-333.' },
    { t: 'tf', v: '9:25', f: 'c', q: 'Según Bohr, si las setenta semanas se contaran desde el decreto de 445 a.C., Jesús tendría que haberse bautizado en el año 37 d.C.', a: true, e: 'Verdadero, y eso no concuerda con la historia: lo crucificarían en el 41 y Esteban moriría en el 44. Fuente: Stephen Bohr, Studies in Daniel 1-10, pág. PDF 333.' },
    { t: 'mc', v: '9:26', f: 'c', q: 'Según Bohr, ¿quién es «el príncipe que ha de venir» de Daniel 9:26?', o: ['El mismo Mesías Príncipe', 'El general romano Tito', 'Un anticristo todavía futuro', 'El rey Antíoco Epífanes'], a: 0, e: 'Para Bohr es Jesús y su pueblo son los judíos. La lectura adventista tradicional decía Tito y los romanos; la futurista, un anticristo. Fuente: Stephen Bohr, Studies in Daniel 1-10, pág. PDF 341-342.' },
    { t: 'tf', v: '9:26', f: 'c', q: 'Según Bohr, la interpretación adventista tradicional identificaba al «príncipe que ha de venir» con Tito, y él propone otra lectura.', a: true, e: 'Verdadero. Bohr reconoce la lectura tradicional (Tito y los romanos), pero dice que no encaja con la estructura de 9:25-27. Fuente: Stephen Bohr, Studies in Daniel 1-10, pág. PDF 341.' },
    { t: 'mc', v: '9:27', f: 'c', q: 'Según Bohr, ¿qué significa el verbo hebreo (gabar) que se traduce «confirmará» el pacto?', o: ['Hacer fuerte, ratificar', 'Romper o anular', 'Firmar por siete años', 'Renovar cada año'], a: 0, e: 'Cristo puso el pacto sobre una base firme: la sangre de animales no quitaba el pecado, la suya sí. Fuente: Stephen Bohr, Studies in Daniel 1-10, pág. PDF 346.' },
    { t: 'mc', v: '9:27', f: 'c', q: 'Según Bohr, ¿con qué palabras de Jesús se conecta «el pacto con muchos» de 9:27?', o: ['«Mi sangre del nuevo pacto... por muchos»', '«Destruid este templo y en tres días lo levantaré»', '«Consumado es», dicho en la cruz', '«El tiempo se ha cumplido, el reino está cerca»'], a: 0, e: 'En la última cena Jesús unió las palabras «pacto» y «muchos» (Mateo 26:28), como Daniel 9:27. Fuente: Stephen Bohr, Studies in Daniel 1-10, pág. PDF 347.' },
    { t: 'mc', v: '9:27', f: 'c', q: 'Según Bohr, ¿a qué hora murió Jesús, cumpliendo el tipo del cordero pascual?', o: ['A la hora novena', 'A la hora tercera', 'A la hora sexta', 'A la medianoche'], a: 0, e: 'El cordero se mataba el 14 de nisán «entre las dos tardes»; Jesús murió cerca de la hora novena (Mateo 27:46-50). Fuente: Esteban Bohr, El calendario del Mesías, pág. PDF 5.' },
    { t: 'tf', v: '9:27', f: 'c', q: 'Según Elena de White, citada por Bohr, cuando Jesús murió el cordero que iba a ser sacrificado en el templo escapó.', a: true, e: 'Verdadero: al rasgarse el velo, el cuchillo cayó de la mano del sacerdote y el cordero escapó; ahí terminaban los sacrificios (alusión a 9:27). Fuente: Esteban Bohr, El calendario del Mesías, pág. PDF 6 (cita El Deseado de todas las gentes, pp. 704-705).' },
    { t: 'mc', v: '9:24', f: 'c', q: 'Según Bohr, ¿qué fiesta marcó el comienzo del ministerio de intercesión de Cristo en el santuario celestial?', o: ['Pentecostés', 'Las Primicias', 'Los Tabernáculos', 'Las Trompetas'], a: 0, e: 'Cincuenta días después de las primicias, en Pentecostés, Cristo empezó a interceder en el lugar santo del santuario celestial. Fuente: Esteban Bohr, El calendario del Mesías, pág. PDF 7.' },

    { t: 'mc', v: '9:26', f: 'c', q: 'Según Bohr, ¿qué representa en la profecía una «inundación», como la de Daniel 9:26?', o: ['La invasión de un ejército', 'Un diluvio literal sobre Judea', 'El derramamiento del Espíritu', 'El bautismo de los creyentes'], a: 0, e: 'Isaías 8:7-8 compara una invasión con un río desbordado; en 9:26 son los ejércitos romanos del año 70. Fuente: Stephen Bohr, Studies in Daniel 1-10, pág. PDF 345.' },
    { t: 'tf', v: '9:24', f: 'c', q: 'Según Bohr, en Daniel 9:24 «tu pueblo» y «tu santa ciudad» son todavía el Israel literal y la Jerusalén literal.', a: true, e: 'Verdadero. Hasta el año 34 la profecía habla de un pueblo y una ciudad literales; después, el pueblo de Dios es la iglesia en todo el mundo (Gálatas 3:29). Fuente: Stephen Bohr, Studies on Daniel 11, pág. PDF 21.' },
    { t: 'mc', v: '9:25', f: 'c', q: 'Según Hechos 10:38, citado por Bohr, ¿con qué fue ungido Jesús para ser el Mesías?', o: ['Con el Espíritu Santo y poder', 'Con aceite, por el sumo sacerdote', 'Con agua, por Juan el Bautista', 'Con la sangre del cordero'], a: 0, e: 'Mesías significa «ungido». Jesús fue ungido con el Espíritu Santo en su bautismo, en el otoño del 27. Fuente: Esteban Bohr, El calendario del Mesías, pág. PDF 3.' },
  ],
};
