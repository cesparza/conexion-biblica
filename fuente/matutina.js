/* DEVOCIÓN MATUTINA — «Héroes y villanos», octubre.

   SEGUNDO EVENTO DEL CAMPAMENTO, con su propio reglamento:
   «Los integrantes del club deben estudiar la matutina de menores, Héroes y
   villanos, del mes de octubre, y presentar 2 integrantes por categoría para
   presentar examen escrito de la matutina de ese mes.
     Categoría uno: 4-6 años (1 al 15 de octubre)
     Categoría dos: 7-9 años (1 al 30 de octubre)»

   De ahí salen las dos categorías: la de 4 a 6 años estudia los primeros
   quince días, la de 7 a 9 estudia hasta el día 30. El día 31 queda fuera de
   las dos, pero se incluye marcado como extra porque es la segunda parte de
   la historia del día 30 (Nabal y Abigail) y no se entiende una sin la otra.

   FUENTE Y LÍMITE DE ESTA TRANSCRIPCIÓN
   El material salió del PDF del club («Héroes y villanos - mes octubre»),
   que son páginas escaneadas sin texto. Se pasó por OCR en español y se
   revisó día por día. Los versículos van con la versión que usa la matutina
   (cada día cita una distinta: PDT, RV95, TLA, NBV, NTV, LBLA, NVI).
   Los resúmenes están en nuestras palabras, no son transcripción del libro.

   Vive en su propio archivo porque es otro evento: no se mezcla con el
   material de Daniel. build.js une las dos fuentes al generar el HTML. */

/* Un día = { d: día del mes, t: título, r: referencia del versículo,
              v: versículo citado, q: quién es el héroe o el villano,
              h: qué pasa (resumen), l: la lección con la que cierra } */
const DIAS = [
{ d:1, t:'El villano pirata Dienterroto', r:'Lucas 12:15',
  v:'«Cuídense ustedes de toda avaricia; porque la vida no depende del poseer muchas cosas»',
  q:'Villano: el pirata Dienterroto',
  h:'A Dienterroto le encantaban los tesoros y los llevaba a su isla para sentirse cada vez más rico. Oyó de una cueva con muchísimo oro. Para no dar varios viajes, decidió cargarlo todo de una vez en su barco. A mitad de camino el barco empezó a hundirse, todos se lanzaron al mar y el pirata quedó sin nada.',
  l:'La avaricia rompe el saco; aquí hundió el barco. Querer más de lo que necesitas puede hacerte perder lo que tienes. Disfruta lo que Jesús te da y compártelo.' },
{ d:2, t:'El héroe sabe que Dios lo levanta', r:'Salmo 113:7',
  v:'«El Señor levanta del suelo al pobre, y saca del lugar más bajo al necesitado»',
  q:'Un experimento con dos huevos',
  h:'Se llenan dos vasos con la misma cantidad de agua. A uno se le añaden cuatro cucharadas de sal y se remueve. Al poner un huevo en cada vaso, el del agua con sal no se hunde: se va para arriba. La sal marca la diferencia.',
  l:'Dios se parece a la sal del experimento: con su amor nos levanta. Si tienes fe, podrás levantarte de los errores y de los fracasos.' },
{ d:3, t:'El héroe que dio 5 kinas', r:'1 Juan 5:15',
  v:'«Así como sabemos que Dios oye nuestras oraciones, también sabemos que ya tenemos lo que le hemos pedido»',
  q:'Héroe: el profesor Elisha',
  h:'Gibson, estudiante de Teología en Papúa Nueva Guinea, le debía mucho dinero a la universidad. Le dieron el teléfono de un hombre que quería ayudar a un alumno, pero no tenía saldo: la llamada costaba 5 kinas. Iba a predicar a la iglesia orando por eso, cuando el profesor Elisha lo detuvo, oró por él y le dio un billete de 5 kinas sin saber nada de su necesidad.',
  l:'Así es Dios: responde tus oraciones si confías en él.' },
{ d:4, t:'El héroe que ayudaba a jóvenes estudiantes', r:'2 Timoteo 2:21 (NTV)',
  v:'«Si te mantienes puro, serás un utensilio especial para uso honorable. Tu vida será limpia, y estarás listo para que el Maestro te use en toda buena obra»',
  q:'Héroes: el profesor Elisha y un desconocido',
  h:'Con las 5 kinas Gibson compró una tarjeta telefónica. El hombre no le contestaba, así que le envió un mensaje de texto y ahí sí obtuvo respuesta. Al otro día lo llamó para decirle que ya había hecho arreglos con la universidad: pagó los 17.000 kinas que Gibson debía de su colegiatura.',
  l:'Los héroes son personas que se dejan usar por Dios para ayudar.' },
{ d:5, t:'Estás invitado a la boda', r:'1 Timoteo 2:4',
  v:'«[Dios] quiere que todos se salven»',
  q:'Las bodas de Papúa Nueva Guinea',
  h:'En Occidente hay que recibir una invitación para ir a una boda, y los novios deciden a quién quieren en el banquete. En Papúa Nueva Guinea no es así: asisten todos los que quieren, se embellece un lugar muy grande, y nadie va con las manos vacías: llevan adornos, manteles, platillos y más.',
  l:'En el reino de Dios la invitación está hecha para todas las personas, pero cada uno debe decidir si la acepta.' },
{ d:6, t:'Nunca estás solo', r:'Isaías 41:10',
  v:'«No temas, pues yo soy tu Dios. Yo te doy fuerzas, yo te ayudo, yo te sostengo con mi mano victoriosa»',
  q:'Sophie y su mamá',
  h:'Sophie y su mamá viajaron a otra isla del Pacífico sur a visitar al papá y darle la noticia de la boda. De vuelta, con doce pasajeros más, la propela del motor se salió y se hundió en el mar. Divisaron la isla Lavongai a unos 20 kilómetros, pero las olas eran muy fuertes y no había señal telefónica. Pasaron cuatro noches en el mar.',
  l:'En nuestras luchas nunca estamos solos: Dios ve lo que nos pasa, nos da fuerzas y nos sostiene.' },
{ d:7, t:'Una joven heroína alienta a los tripulantes', r:'1 Tesalonicenses 5:18',
  v:'«Den gracias a Dios por todo, porque esto es lo que él quiere de ustedes como creyentes en Cristo Jesús»',
  q:'Heroína: Sophie',
  h:'Durante los días a la deriva oraban juntos y hacían el culto. El cuarto día, viernes, y el sábado, fue Sophie quien lo dirigió, con este mensaje: «En momentos así, debemos confiar en Dios». Ese sábado divisaron islas y llegaron a una playa tras cinco días a la deriva. La gente de Lorengau los ayudó a volver a casa. Jonah, su novio, dijo: «casi pierdo a mi novia».',
  l:'No debería hacer falta un milagro para estar agradecidos. El héroe vive agradecido porque sabe que Jesús lo cuida.' },
{ d:8, t:'El poder del héroe', r:'Hechos 1:8',
  v:'«Cuando el Espíritu Santo venga sobre ustedes, recibirán poder y saldrán a dar testimonio de mí [...] hasta en las partes más lejanas de la tierra»',
  q:'Héroe: Unia Api',
  h:'Unia Api quería ser pastor y fue a estudiar Teología a la Universidad Adventista del Pacífico, donde entregó su corazón a Jesús. Un misionero entró al dormitorio buscando estudiantes para un proyecto en un lugar remoto y solo encontró a Unia. Le ofreció ir a Kerema por un año. Unia dijo que sí.',
  l:'El héroe no le dice no a una oportunidad de servir a Dios, aunque llegue de manera inesperada. Si no te sientes capaz, el Espíritu Santo te capacita.' },
{ d:9, t:'El héroe narrador de historias', r:'2 Timoteo 4:2',
  v:'«Tú anuncia el mensaje de Dios en todo momento»',
  q:'Héroe: Unia',
  h:'En Kerema, rodeado de agua y selva, Unia quedó a cargo de un grupo de creyentes y de una pequeña escuela donde enseñaba a niños de primaria. Le pidió a Jesús ideas para predicar y se le ocurrió contar historias: los viernes de tarde encendía una fogata, contaba historias de la Biblia y luego organizaba a los jóvenes para representarlas en drama. La congregación creció mucho ese año.',
  l:'Dios es creativo y te da ideas para que seas un héroe de la predicación del evangelio.' },
{ d:10, t:'El héroe se enamora — 1.ª parte', r:'Cantares 2:2',
  v:'«Mi amada es, entre las mujeres, como una rosa entre los espinos»',
  q:'Unia y Julie',
  h:'Al volver del año misionero, Unia llegó al comedor cuando ya no había cena. Una señorita que trabajaba allí se dio cuenta, le preparó comida y se la llevó. Después él le dijo: «Julie, yo quiero una esposa que me acompañe en el ministerio... creo que tú eres la persona que Dios tiene para mí». Ella respondió: «No puedo, tengo novio».',
  l:'Lleva todos tus deseos a Jesús en oración y espera su respuesta. No te aceleres ni tomes decisiones sin darle tiempo a que te muestre el camino.' },
{ d:11, t:'El héroe se enamora — 2.ª parte', r:'Proverbios 16:9',
  v:'«Al hombre le toca hacer planes, y al Señor dirigir sus pasos»',
  q:'Unia y Julie',
  h:'Solo dos horas después de haberle dicho que no, Julie regresó a proponerle que empezaran el noviazgo: había cortado con su novio, que no era adventista. Fueron novios hasta terminar la universidad; ella se graduó de enfermera y él de pastor, y se casaron en el primer año del máster. Fueron grandes misioneros en el Pacífico sur.',
  l:'El héroe ora antes de decidir. Si Jesús dice sí, avanza; si dice no, espera. Es Jesús quien dirige tus pasos.' },
{ d:12, t:'La pequeña gran mujer', r:'Filipenses 3:14 (PDT)',
  v:'«Sigo hacia la meta para ganar el premio que Dios me ofreció cuando me llamó por medio de Jesucristo»',
  q:'Heroína: Gladys Aylward',
  h:'Gladys leyó en una revista que en China millones de personas no sabían quién es Jesús, y decidió ir a predicar. Se inscribió en una escuela de misioneros y el 15 de octubre de 1932 sacó todos sus ahorros y partió desde Londres. El tren fue detenido en Siberia por una guerra, pero ella siguió. Llegó a China veintisiete días después de salir.',
  l:'Era de pequeña estatura y de enorme corazón. Pídele a Jesús una meta elevada, y valentía para alcanzarla.' },
{ d:13, t:'«Mujer virtuosa»', r:'Proverbios 31:10 (RV95)',
  v:'«Mujer virtuosa, ¿quién la hallará? Su valor sobrepasa largamente al de las piedras preciosas»',
  q:'Heroína: Gladys Aylward',
  h:'Llegó a un país sin hablar el idioma y conociendo apenas a una persona. Con otra misionera, Jeannie Lawson, abrió una posada: así tenían dinero para comer y podían hablarles de Jesús a los huéspedes. Después el gobierno chino le dio trabajo ayudando a las mujeres, y lo hizo tan bien que la gente la amó y empezó a llamarla «Ai-weh-deh», que en mandarín significa «Mujer virtuosa». Adoptó más de cien niños huérfanos.',
  l:'Gladys usó la creatividad. El héroe nunca se queda de brazos cruzados: siempre procura hacerse útil donde va.' },
{ d:14, t:'«No me arrepiento»', r:'Gálatas 1:10',
  v:'«Yo no busco la aprobación de los hombres, sino la aprobación de Dios»',
  q:'Heroína: Gladys Aylward',
  h:'La guerra entre chinos y japoneses llegó a la aldea donde Gladys vivía con los niños que había adoptado, y tuvieron que huir a las montañas. La misión fue bombardeada y destruida. Como era muy difícil hallar comida, atravesó el río Amarillo con los niños para buscar ayuda en otra aldea, donde les abrieron las puertas. Cayó enferma y sanó por completo. No se arrepentía de haber ido a China: sentía que cada niño era una bendición.',
  l:'El héroe se goza en hacer aquello que Jesús aprueba.' },
{ d:15, t:'Testigos de Jesús', r:'Marcos 5:19',
  v:'«Vete a tu casa, con tus parientes, y cuéntales todo lo que el Señor te ha hecho, y cómo ha tenido compasión de ti»',
  q:'Tres personajes de la Biblia',
  h:'El paralítico de la camilla, a quien Jesús le dijo «Levántate, toma tu camilla y vete a tu casa» (Mateo 9:6), y la gente se maravilló y glorificó a Dios. Los dos ciegos que pidieron «¡Ten compasión de nosotros!» (Mateo 9:27) y después contaron por toda la región lo que Jesús había hecho. Y el endemoniado sanado, que comenzó a contarlo por los pueblos (Marcos 5:20).',
  l:'Lo que tienen en común es que todos fueron testigos de Jesús, y gracias a su testimonio muchos se hicieron cristianos.' },
{ d:16, t:'Héroes anónimos', r:'Filipenses 4:3',
  v:'«Sus nombres ya están escritos en el libro de la vida»',
  q:'Los cristianos de los primeros siglos',
  h:'Jesús nació en Belén y se crio en Nazaret, en territorio del Imperio Romano. Después de su muerte había muchos cristianos en el imperio, pero las autoridades no estaban contentas, porque se negaban a participar en costumbres paganas y a creer en muchos dioses. Fueron perseguidos durante años. A pesar del riesgo de la cárcel o la muerte, mantenían su fe: usaban discretamente símbolos como un pez o una cruz para reconocerse, y vivían de forma anónima predicando el evangelio.',
  l:'No sabemos sus nombres, pero para Dios no hay anónimos: sabe tu nombre y ama a todos los que viven por fe.' },
{ d:17, t:'El amigo villano', r:'Salmo 120:2',
  v:'«Señor, líbrame de los labios mentirosos y de la lengua embustera»',
  q:'Villano: Axel',
  h:'Axel, de once años, se quedó solo en el aula en el recreo y buscó en la mochila de su amigo David el juego electrónico con el que jugaban. Al ganar la primera partida saltó de la emoción, el juego se le cayó y la pantalla quedó rota. Volvió a guardarlo en la mochila como si nada. Al salir, David descubrió con horror que alguien lo había roto, y Axel nunca le dijo que había sido él.',
  l:'A veces las mentiras no tienen consecuencias inmediatas porque nadie se entera, pero Jesús lo sabe. El héroe dice la verdad.' },
{ d:18, t:'¿Héroes o no?', r:'Josué 1:9',
  v:'«Yo soy quien te manda que tengas valor y firmeza. No tengas miedo ni te desanimes porque yo, tu Señor y Dios, estaré contigo dondequiera que vayas»',
  q:'Marcos, Ana y Lucía, Mónica y Ester',
  h:'Tres situaciones para decidir quién es valiente. A Marcos le falta un dedo y usa lentes; lo llaman «cuatro ojos, cuatro dedos», pero él es igual de amable con todos porque sabe que Jesús lo ama. Lucía no estudió y le pide a Ana que la deje copiar; Ana la deja porque Lucía es popular y no quiere caerle mal. Mónica y Ester se ponen nerviosas al hablar en público: Mónica se queda en casa diciendo que está enferma, y Ester ora y sigue adelante aunque le tiembla la voz.',
  l:'Elegir lo correcto no es fácil, pero si quieres ser valiente de grande, empieza desde ahora.' },
{ d:19, t:'Di siempre dónde estás', r:'Juan 14:3',
  v:'«Después de irme y de prepararles un lugar, vendré otra vez para llevarlos conmigo, para que ustedes estén en el mismo lugar en donde yo voy a estar»',
  q:'El señor McMullen',
  h:'Antes de salir solo al Parque Nacional Death Valley, el señor McMullen le dejó por escrito a su esposa dónde estaría en todo momento y a qué hora regresaría, y prometió llamarla cada tarde al llegar al albergue, porque solo había señal ahí. Esa primera tarde pisó una piedra y se rompió un tobillo. No podía caminar ni tenía señal. Se arrastró hasta una sombra a esperar, seguro de que lo rescatarían: su esposa sabía todo lo que él iba a hacer. Ese conocimiento le salvó la vida.',
  l:'Decirles a tus padres dónde estás es importante. Jesús también nos dijo dónde está: en el cielo, esperando el momento de volver a buscarnos.' },
{ d:20, t:'El villano del baloncesto', r:'Filipenses 4:8',
  v:'«Piensen en todo lo verdadero, en todo lo que es digno de respeto, en todo lo recto, en todo lo puro»',
  q:'Villano: Tim Donaghy',
  h:'Tim Donaghy era árbitro de baloncesto y parecía muy bueno, hasta que la policía descubrió que apostaba sobre quién ganaría los partidos. Se le ocurrió que, como árbitro, podía influir en el resultado pitando a favor o en contra, y entró en una conspiración para amañar partidos y ganar mucho dinero injustamente. Lo descubrieron, lo juzgaron y acabó en la cárcel.',
  l:'Si uno piensa mucho en lo malo, al final le dan ganas de hacerlo, y así se convierte en villano. Por eso la Biblia dice que pensemos siempre en cosas buenas y verdaderas.' },
{ d:21, t:'Tus maestros son héroes', r:'Salmo 71:17',
  v:'«Dios mío, tú me has enseñado desde mi juventud»',
  q:'Los maestros',
  h:'Ser maestro es una profesión, pero los maestros hacen mucho más que un trabajo: se preocupan de que estés bien, te ayudan a tener buenos modales, quieren que tengas éxito y te tratan con respeto. Además fueron ellos quienes te enseñaron a leer y a escribir, los números y las ciencias.',
  l:'Los maestros son héroes. Y hubo un Maestro de los maestros: Jesús, que nos enseñó las cosas más importantes de la vida, las que llevan a la salvación.' },
{ d:22, t:'Jesús: el Maestro de los maestros', r:'Lucas 2:46-47',
  v:'«Sentado [Jesús] entre los maestros de la ley, [...] todos los que lo oían se admiraban de su inteligencia y de sus respuestas»',
  q:'Jesús a los doce años',
  h:'Cuando tenía apenas doce años, Jesús fue con María y José al Templo de Jerusalén, donde había una escuela sagrada con los maestros más brillantes. Jesús se sentó en esa clase, escuchando y haciendo preguntas. Según El Deseado de todas las gentes (cap. 8, p. 62), «hacía ver la verdad desde un nuevo punto de vista», los doctores quedaron asombrados de sus respuestas, y repitió las palabras de la Escritura «dándoles una profundidad de significado que los sabios no habían concebido».',
  l:'Es extraño que un niño enseñe a un adulto, pero puede pasar si ese niño busca a Dios y lee la Biblia todos los días.' },
{ d:23, t:'Héroes de ayer y de hoy', r:'Isaías 52:7 (TLA)',
  v:'«¡Qué hermoso es ver al que llega por las colinas trayendo buenas noticias: noticias de paz, noticias de salvación»',
  q:'Los mensajeros',
  h:'Desde tiempos del Antiguo Testamento han existido personas que llevan mensajes. Hace miles de años alguien tenía que salir de su comodidad y recorrer grandes distancias para llevar un mensaje, y era especialmente peligroso en tiempos de guerra: si el otro bando sabía que llevabas un mensaje, más peligroso todavía. Hoy tenemos celulares, computadoras, correo electrónico e internet.',
  l:'Tenemos medios instantáneos, pero ¿qué mensajes enviamos? Puedes ser un héroe si decides compartir el amor de Jesús con los demás.' },
{ d:24, t:'El villano que maltrató a un animal', r:'Gálatas 5:16-17 (TLA)',
  v:'«Obedezcan al Espíritu de Dios, y así no desearán hacer lo malo. [...] Ustedes no pueden hacer lo que se les antoje»',
  q:'Villano: Balaam',
  h:'Un rey enemigo quería pagarle a Balaam para que maldijera al pueblo de Dios. Dios le hizo saber que no debía obedecer esa orden, pero Balaam decidió ir y hacerlo a cambio de dinero. Por el camino, montado en su asna, el animal se detuvo y no avanzó más. Balaam creyó que estaba siendo testarudo y le pegó fuertemente con la vara. En realidad era el ángel de Dios el que se interponía para que el asna no avanzara.',
  l:'Hay personas que pueden pedirte que hagas cosas malas. Ten claro qué piensa Dios: obedecerlo es el camino del héroe.' },
{ d:25, t:'Fernando, el niño enojado', r:'Proverbios 14:29 (NBV)',
  v:'«El que controla su enojo es muy inteligente»',
  q:'Fernando',
  h:'Fernando, un niño de diez años, jugaba un domingo de mañana cuando su mamá le dijo que se cambiara porque en media hora iban a comer con los Gutiérrez. Él protestó que quería seguir jugando y que no quería ir. Enojado, se levantó, le dio una patada al sofá y dio un portazo al entrar en su habitación. Y no era la primera vez que reaccionaba así.',
  l:'Es normal que algunas cosas te enojen. Lo importante es manejar ese sentimiento: respirar hondo, orar a Jesús y hablar con tus padres.' },
{ d:26, t:'La heroína que ayudó a un niño con sus palabras', r:'Proverbios 12:25 (NBV)',
  v:'«La angustia desalienta el corazón del hombre, pero una palabra alentadora lo anima»',
  q:'Heroína: Emely',
  h:'Ermenegildo andaba siempre solo, llegaba tarde a la escuela con cara triste y no respondía cuando el profesor le preguntaba. El profesor de ciencias puso a Emely a trabajar con él. Emely, a la que le gusta sacar buenas notas, se llevó una gran sorpresa: Ermenegildo era buenísimo en ciencias y nadie lo sabía. Sacaron la mejor nota de la clase, y cuando el profesor dio las notas en voz alta, Emely se levantó y dijo delante de todos que el trabajo lo había hecho él.',
  l:'A partir de ese día Ermenegildo fue menos tímido. El héroe sabe elogiar sin sentirse menos, y usa sus palabras para animar.' },
{ d:27, t:'El niño que se quedó sentado en el banquillo', r:'Santiago 3:15 (NTV)',
  v:'«La envidia y el egoísmo no forman parte de la sabiduría que proviene de Dios»',
  q:'Víctor',
  h:'Víctor le dijo a su mamá que no quería jugar más en el equipo, aunque era el máximo goleador y le encantaba el fútbol. Ella fue al siguiente juego para entender qué pasaba: un niño nuevo, Óscar, salió de titular en la posición de Víctor, que se quedó en el banquillo toda la primera parte, y Óscar marcó tres goles en treinta minutos. Su mamá entendió que Víctor tenía envidia porque ya no era la estrella del equipo.',
  l:'La envidia es querer que otro pierda algo que tiene porque tú lo deseas. Es un sentimiento que roba la paz. El héroe no es envidioso.' },
{ d:28, t:'Un héroe diferente', r:'Hechos 10:34 (NTV)',
  v:'«Veo con claridad que Dios no muestra favoritismo»',
  q:'Héroe: Pablo Pineda',
  h:'Pablo Pineda tiene síndrome de Down. Mucha gente cree que las personas así no pueden llevar una vida normal, pero cuando tenía siete años un maestro le dijo que su condición no significaba que no pudiera estudiar ni tener éxito. Pablo se lo creyó: se convirtió en el primer europeo con síndrome de Down en terminar una carrera universitaria. Además es actor, ha actuado en series y en películas taquilleras, y es una celebridad en España.',
  l:'Si quieres ser un héroe, trata a esa persona igual que a todas las demás. Y si tú eres así, Jesús te ama igual que a todos.' },
{ d:29, t:'Dios provee', r:'Filipenses 4:19 (LBLA)',
  v:'«Mi Dios proveerá a todas vuestras necesidades»',
  q:'Héroe: Charles Tindley',
  h:'De niño Charles Tindley no pudo ir a la escuela, pero en su adolescencia aprendió a leer por sí mismo; con el tiempo se preparó para ser pastor, predicó ante miles y compuso himnos cristianos. Un frío invierno llegó con su familia a su nuevo destino y a la mañana siguiente solo tenían pan duro y leche. Aun así pidió a su esposa que pusiera la mesa, y oraron. Nada más terminar de orar, un miembro de la congregación llamó a la puerta con un saco lleno de provisiones: había supuesto que, con la tormenta de nieve, no tendrían qué comer.',
  l:'Charles lloró y dijo: «Es usted la respuesta a nuestra oración». Dios provee, y proveerá también para ti.' },
{ d:30, t:'Nabal, el villano necio', r:'Proverbios 29:11 (NVI)',
  v:'«El necio da rienda suelta a su ira, pero el sabio sabe dominarla»',
  q:'Villano: Nabal',
  h:'Un necio es una persona que, de manera terca, se comporta sin entender la situación. La Biblia misma dice que Nabal era un necio: se puede leer en 1 Samuel 25:25. Nabal se había beneficiado mucho tiempo de que David y sus hombres cuidaran sus rebaños y sus empleados, y aun sabiendo que David era el elegido por Dios como futuro rey, cuando le mandaron a pedir algo de comer no solo se negó, sino que habló muy groseramente. David se enfureció muchísimo y decidió ir a matarlo.',
  l:'Hablarle groseramente a otra persona es propio de villanos. Y «la respuesta grosera aumenta el enojo» (Proverbios 15:1). Esfuérzate en hablar siempre con calma y bondad.' },
{ d:31, t:'La sabia Abigail', r:'Proverbios 15:1 (RVC)',
  v:'«La respuesta amable calma la ira; la respuesta grosera aumenta el enojo»',
  q:'Heroína: Abigail',
  h:'Nabal estaba casado con una mujer que tenía tanto de sabia y prudente como él tenía de necio y grosero. En cuanto le contaron lo sucedido, Abigail se dio cuenta de la gravedad: su esposo le había negado comida al futuro rey y había respondido mal a los hombres que cuidaban sus rebaños. Dio la orden de llevarle comida rápidamente a David y a sus hombres, y ella misma salió a su encuentro. Le pidió disculpas sin justificar la grosería de su esposo, y le habló de tal manera que le bajó la ira. Su cortesía, prudencia, sabiduría y humildad evitaron muertes aquel día.',
  l:'El héroe es sensible, prudente, sabio y humilde. No porque él sea así, sino porque Dios le ayuda a serlo.' },
];

/* ── Categorías del reglamento ──
   dm1: 4 a 6 años, del 1 al 15.   dm2: 7 a 9 años, del 1 al 30.
   El 31 va marcado como extra en las dos, porque cierra la historia del 30. */
const catsDe = d => {
  if (d <= 15) return ['dm1', 'dm2'];
  return ['dm2'];                 // del 16 en adelante, solo la categoría 7 a 9
};

const MES = ['', '1.º', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13',
  '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27',
  '28', '29', '30', '31'];

const id = d => 'm' + String(d).padStart(2, '0');
const COLOR = d => d % 3 === 0 ? '#B45309' : d % 3 === 1 ? '#0F766E' : '#7C3AED';

const MAT_CAPS = DIAS.map(x => ({
  id: id(x.d),
  label: MES[x.d] + ' de octubre',
  sub: x.t,
  src: x.d === 31 ? 'Matutina · complemento del día 30' : 'Matutina Héroes y villanos',
  color: COLOR(x.d),
  cats: catsDe(x.d),
  /* El 31 no lo pide el reglamento (llega hasta el 30). Se puede leer, pero
     sus preguntas no entran en los exámenes: `extra` lo saca del sorteo. */
  extra: x.d === 31 || undefined,
}));

const hi = t => `<div class="highlight-box">${t}</div>`;
const wa = t => `<div class="warn-box">${t}</div>`;
const vs = t => `<div class="verse-box">${t}</div>`;

const MAT_CONTENIDO = {};
for (const x of DIAS) {
  MAT_CONTENIDO[id(x.d)] = [
    { t: '📖 El versículo del día', h: vs(`${x.v} (${x.r})`) },
    { t: '👤 Quién es', h: hi(`<strong>${x.q}</strong>`) },
    { t: '📚 Qué pasa', h: `<p style="font-size:.87rem;line-height:1.7;margin:.3rem 0">${x.h}</p>` },
    { t: '🎯 La lección', h: wa(x.l) },
  ];
  if (x.d === 31) MAT_CONTENIDO[id(x.d)].unshift({
    t: '⚠️ Fuera del examen, pero necesario', h:
      wa(`El reglamento pide hasta el <strong>30 de octubre</strong>, así que este día
      no entra en el examen. Se incluye porque es la <strong>segunda parte</strong> de la
      historia del día 30: sin Abigail no se entiende Nabal.`) });
}

/* ── Preguntas ──
   Las de «qué día es» y «qué versículo va con qué día» se generan con
   distractores tomados de otros días: así son correctas por construcción y
   crecen solas si el mes cambia. Las de historia y lección van escritas a
   mano, una por día, porque ahí el matiz importa. */
const MAT_BANCO = [];
const otros = (d, n, campo) => DIAS.filter(x => x.d !== d)
  .sort((a, b) => Math.abs(a.d - d) - Math.abs(b.d - d))
  .slice(1, 1 + n).map(x => x[campo]);

for (const x of DIAS) {
  /* Qué día corresponde a este título */
  const opDias = [MES[x.d] + ' de octubre', ...otros(x.d, 3, 'd').map(d => MES[d] + ' de octubre')];
  MAT_BANCO.push({ cap: id(x.d), t: 'mc', nv: 1,
    q: `¿Qué día de octubre es la lectura «${x.t}»?`,
    o: opDias, a: 0 });

  /* Qué versículo va con este día */
  MAT_BANCO.push({ cap: id(x.d), t: 'mc', nv: 2,
    q: `¿Cuál es el versículo de la lectura del ${MES[x.d]} de octubre, «${x.t}»?`,
    o: [x.r, ...otros(x.d, 3, 'r')], a: 0 });
}

/* Preguntas de historia y de lección, una y una por día, escritas a mano.
   nv 1 = dato de la historia (lo que pasó). nv 2 = la lección o un matiz. */
const A_MANO = [
[1,'¿Por qué se hundió el barco del pirata Dienterroto?','Porque quiso cargar todo el oro de una vez en lugar de dar varios viajes',['Porque lo atacó otro pirata','Porque había una tormenta','Porque el barco era muy viejo'],
   '¿Qué enseña la historia del pirata Dienterroto?','Que querer más de lo que necesitas puede hacerte perder lo que tienes',['Que hay que esconder bien los tesoros','Que los barcos deben ser grandes','Que el oro trae mala suerte']],
[2,'En el experimento de los dos vasos, ¿qué le pasa al huevo del vaso con sal?','No se hunde: se va para arriba',['Se hunde más rápido','Se rompe','Se queda en el medio'],
   '¿Con qué se compara a Dios en ese experimento?','Con la sal, que con su amor nos levanta',['Con el agua, que limpia','Con el huevo, que es frágil','Con el vaso, que sostiene']],
[3,'¿Cuánto dinero necesitaba Gibson para hacer la llamada?','5 kinas',['17.000 kinas','50 kinas','2 kinas'],
   '¿Quién le dio el dinero a Gibson sin saber de su necesidad?','El profesor Elisha',['Un desconocido por teléfono','El rector de la universidad','Su compañero de cuarto']],
[4,'¿Cuánto debía Gibson de su colegiatura?','17.000 kinas',['5 kinas','1.700 kinas','170.000 kinas'],
   '¿Cómo logró Gibson que el hombre le respondiera?','Le envió un mensaje de texto después de varios intentos de llamada',['Fue a buscarlo a su casa','Le escribió una carta','Le pidió al profesor que lo llamara']],
[5,'¿Cómo son las bodas en Papúa Nueva Guinea, según la lectura?','Asisten todos los que quieren y nadie va con las manos vacías',['Solo asisten los familiares','Hay que pagar la entrada','Se celebran en secreto'],
   '¿Qué enseña la comparación con la boda?','Que la invitación al reino de Dios es para todos, pero cada uno decide si la acepta',['Que hay que casarse en la iglesia','Que las fiestas deben ser grandes','Que solo algunos serán salvos']],
[6,'¿Qué le pasó a la lancha en la que iban Sophie y su mamá?','La propela del motor se salió y se hundió en el mar',['Se le acabó la gasolina','Choco contra una roca','Se le rompió el timón'],
   '¿Por qué no pudieron pedir auxilio?','Porque no había señal de red telefónica',['Porque nadie tenía celular','Porque se les mojaron los teléfonos','Porque no sabían el número']],
[7,'¿Quién dirigió el culto el cuarto día y el sábado en la lancha?','Sophie',['Su mamá','Jonah','El capitán'],
   '¿Cuántos días estuvieron a la deriva antes de llegar a la playa?','Cinco días',['Dos días','Cuatro días','Ocho días']],
[8,'¿Qué quería ser Unia Api y dónde estudió?','Pastor, en la Universidad Adventista del Pacífico',['Médico, en Australia','Maestro, en Estados Unidos','Enfermero, en Papúa'],
   '¿Qué respondió Unia cuando lo invitaron a Kerema por un año?','Dijo que sí, aunque la oportunidad llegó de manera inesperada',['Pidió tiempo para pensarlo','Dijo que no estaba listo','Mandó a otro estudiante']],
[9,'¿Qué idea le dio Jesús a Unia para predicar en Kerema?','Contar historias, y los viernes de tarde encender una fogata',['Repartir folletos','Cantar en la plaza','Escribir cartas'],
   '¿Qué pasó con la congregación ese año?','Creció mucho',['Se mantuvo igual','Se dividió','Cerró la escuela']],
[10,'¿Cómo conoció Unia a Julie?','Ella le preparó comida cuando el comedor ya había cerrado',['Estudiaban la misma carrera','Se conocieron en Kerema','Los presentó un misionero'],
   '¿Qué le respondió Julie la primera vez que Unia le propuso unir sus vidas?','«No puedo, tengo novio»',['«Déjame pensarlo»','«Sí, con gusto»','«Habla con mis padres»']],
[11,'¿Cuánto tiempo después volvió Julie a buscar a Unia?','Solo dos horas después',['Al otro día','Una semana después','Un año después'],
   '¿De qué se graduaron Julie y Unia?','Ella de enfermera y él de pastor',['Ella de maestra y él de médico','Los dos de pastores','Ella de pastora y él de enfermero']],
[12,'¿Qué leyó Gladys Aylward que la decidió a ir a China?','Que en China millones de personas no sabían quién es Jesús',['Que faltaban maestros en China','Que había una escuela de misioneros','Que su familia era de China'],
   '¿En qué fecha partió Gladys desde Londres?','El 15 de octubre de 1932',['El 15 de octubre de 1923','El 5 de octubre de 1932','El 25 de octubre de 1942']],
[13,'¿Qué significa «Ai-weh-deh», el nombre que le dieron a Gladys en China?','«Mujer virtuosa»',['«Madre de muchos»','«La que vino de lejos»','«Mujer valiente»'],
   '¿Cuántos niños huérfanos adoptó Gladys?','Más de cien',['Más de diez','Más de mil','Exactamente cincuenta']],
[14,'¿Qué le pasó a la misión donde vivía Gladys con los niños?','Fue bombardeada y destruida por la guerra',['Se incendió por un descuido','La cerró el gobierno','Se inundó'],
   '¿Se arrepentía Gladys de haber ido a China?','No: sentía que cada uno de sus niños era una bendición',['Sí, por las pruebas que pasó','Sí, quería volver a Inglaterra','No lo dijo nunca']],
[15,'¿Qué tienen en común el paralítico, los dos ciegos y el endemoniado?','Que todos fueron testigos de Jesús y contaron lo que él hizo por ellos',['Que todos eran de Nazaret','Que todos eran discípulos','Que todos eran ciegos']],
[16,'¿Por qué perseguían a los cristianos en el Imperio Romano?','Porque se negaban a participar en costumbres paganas y a creer en muchos dioses',['Porque no pagaban impuestos','Porque hablaban otro idioma','Porque no querían trabajar'],
   '¿Qué símbolos usaban para reconocerse entre ellos?','Un pez o una cruz',['Una estrella','Una espada','Un cordero']],
[17,'¿Qué hizo Axel con el juego electrónico de su amigo David?','Lo tomó sin permiso, lo rompió y lo guardó como si nada',['Lo perdió en el patio','Lo cambió por otro','Lo escondió en su casa'],
   '¿Qué enseña la historia de Axel?','Que aunque nadie se entere, Jesús lo sabe: el héroe dice la verdad',['Que hay que cuidar los juegos','Que no se debe jugar en la escuela','Que David debía perdonarlo']],
[18,'De las tres situaciones, ¿quién actuó con valentía al hablar en público?','Ester, que oró y siguió adelante aunque le temblaba la voz',['Mónica, que se quedó en casa','Ana, que dejó copiar a Lucía','Lucía, que no estudió'],
   '¿Por qué Ana no actuó como héroe?','Porque dejó copiar a Lucía por miedo a caerle mal',['Porque no estudió','Porque no habló en clase','Porque se burló de Marcos']],
[19,'¿Qué le salvó la vida al señor McMullen?','Que su esposa sabía por escrito dónde estaría y cuándo volvería',['Que tenía señal en el celular','Que alguien lo vio caer','Que pudo caminar hasta el albergue'],
   '¿Con qué se compara esa historia?','Con que Jesús nos dijo dónde está: en el cielo, esperando volver a buscarnos',['Con que hay que llevar mapa','Con que no se debe salir solo','Con que hay que confiar en la policía']],
[20,'¿Qué hacía Tim Donaghy siendo árbitro de baloncesto?','Apostaba sobre los partidos y los amañaba pitando a favor o en contra',['Cobraba de más por arbitrar','No conocía las reglas','Faltaba a los partidos'],
   '¿Cómo terminó Tim Donaghy?','Lo descubrieron, lo juzgaron y acabó en la cárcel',['Se retiró tranquilo','Siguió arbitrando','Se fue a otro país']],
[21,'Según la lectura, ¿por qué son héroes los maestros?','Porque hacen mucho más que su trabajo: te cuidan, te enseñan y te tratan con respeto',['Porque ganan poco','Porque estudiaron mucho','Porque trabajan muchas horas'],
   '¿Quién fue el Maestro de los maestros?','Jesús',['Moisés','Salomón','Pablo']],
[22,'¿Cuántos años tenía Jesús cuando se sentó entre los maestros del Templo?','Doce años',['Diez años','Treinta años','Ocho años'],
   'Según la lectura, ¿qué hace posible que un niño enseñe a un adulto?','Que busque a Dios y lea la Biblia todos los días',['Que sea muy inteligente','Que estudie mucho en la escuela','Que hable en público']],
[23,'¿Por qué eran héroes los mensajeros de la antigüedad?','Porque salían de su comodidad y recorrían grandes distancias, sobre todo en tiempos de guerra',['Porque sabían leer','Porque tenían caballos','Porque conocían a los reyes'],
   '¿Qué propone hacer la lectura con los medios de hoy?','Usarlos también para contarle a alguien que Jesús lo ama',['Usarlos menos','Solo para cosas prácticas','Compartir solo con la familia']],
[24,'¿Por qué se detuvo el asna de Balaam?','Porque el ángel de Dios se interponía en el camino',['Porque estaba cansada','Porque era testaruda','Porque tenía hambre'],
   '¿Qué hizo Balaam cuando el asna no avanzó?','Le pegó fuertemente con la vara',['Se bajó y siguió a pie','La dejó descansar','Volvió a su casa']],
[25,'¿Qué hizo Fernando cuando su mamá le dijo que se cambiara?','Le dio una patada al sofá y dio un portazo',['Se puso a llorar','Se escondió','Obedeció de una vez'],
   '¿Qué propone la lectura para cuando sientas enojo?','Respirar hondo, orar a Jesús y hablar con tus padres',['Salir a correr','Quedarte callado','Contarlo en la escuela']],
[26,'¿Qué descubrió Emely al trabajar con Ermenegildo?','Que era buenísimo haciendo trabajos de ciencias y nadie lo sabía',['Que no quería trabajar','Que copiaba de otros','Que estaba enfermo'],
   '¿Qué hizo Emely cuando el profesor dio las notas?','Dijo delante de toda la clase que el trabajo lo había hecho Ermenegildo',['Se quedó callada','Dijo que lo hicieron entre los dos','Pidió otra nota']],
[27,'¿Por qué Víctor no quería jugar más en el equipo?','Porque tenía envidia: un niño nuevo ocupó su posición y marcó tres goles',['Porque estaba lastimado','Porque lo trataron mal','Porque no le gustaba el entrenador'],
   'Según la lectura, ¿qué es sentir envidia?','Querer que otro pierda algo que tiene porque tú deseas ese algo',['Estar triste sin motivo','Enojarse con un amigo','No querer compartir']],
[28,'¿En qué fue el primero Pablo Pineda?','El primer europeo con síndrome de Down en terminar una carrera universitaria',['El primer actor español con síndrome de Down','El primer maestro con síndrome de Down','El primer deportista con síndrome de Down'],
   '¿Qué le dijo un maestro a Pablo cuando tenía siete años?','Que tener síndrome de Down no significaba que no pudiera estudiar ni tener éxito',['Que debía cambiarse de escuela','Que estudiara solo en casa','Que se dedicara al deporte']],
[29,'¿Qué tenían para desayunar Charles Tindley y su familia esa mañana?','Solo pan duro y leche',['Nada en absoluto','Pan y frutas','Huevos y leche'],
   '¿Qué pasó nada más terminar de orar?','Un miembro de la congregación llamó a la puerta con un saco lleno de provisiones',['Llegó el pastor de visita','Encontraron dinero','Paró la tormenta']],
[30,'¿En qué texto dice la Biblia que Nabal era un necio?','1 Samuel 25:25',['1 Samuel 15:22','2 Samuel 25:15','1 Reyes 25:5'],
   '¿Qué hizo Nabal cuando David mandó a pedirle comida?','No solo se negó, sino que habló muy groseramente',['Le mandó poca comida','Le pidió dinero','Le mandó a sus pastores'],],
[31,'¿Qué hizo Abigail al enterarse de la grosería de su esposo?','Mandó comida rápidamente a David y ella misma salió a su encuentro',['Escondió a su familia','Le reclamó a Nabal','Avisó al rey Saúl'],
   '¿Qué evitaron la cortesía y la prudencia de Abigail?','Evitaron muertes aquel día',['Evitaron una guerra entre reinos','Evitaron que Nabal fuera preso','Evitaron perder los rebaños']],
];

for (const fila of A_MANO) {
  const d = fila[0];
  MAT_BANCO.push({ cap: id(d), t: 'mc', nv: 1, q: fila[1], o: [fila[2], ...fila[3]], a: 0 });
  if (fila.length > 4)
    MAT_BANCO.push({ cap: id(d), t: 'mc', nv: 2, q: fila[4], o: [fila[5], ...fila[6]], a: 0 });
}

/* Verdadero o falso: una por día, sobre el dato que más se confunde. */
const VF = [
[1,'El pirata Dienterroto perdió todo su oro porque otro pirata lo atacó.',false,'Falso. El barco se hundió porque quiso cargar todo el oro de una vez en lugar de dar varios viajes.'],
[2,'En el experimento, el huevo del vaso con sal se hunde igual que el otro.',false,'Falso. No se hunde: se va para arriba. La sal marca la diferencia.'],
[3,'El profesor Elisha le dio las 5 kinas a Gibson sabiendo de su necesidad.',false,'Falso. Se las dio sin saber nada de su necesidad, después de orar por él.'],
[4,'El hombre desconocido pagó los 17.000 kinas que Gibson debía.',true,'Verdadero. Hizo arreglos con la universidad y pagó todo lo que restaba.'],
[5,'En Papúa Nueva Guinea hay que recibir invitación para ir a una boda.',false,'Falso. Allá asisten todos los que quieren, y nadie va con las manos vacías.'],
[6,'Sophie y su mamá vieron la isla Lavongai a unos 20 kilómetros.',true,'Verdadero. Los varones más jóvenes intentaron remar hacia ella, pero las olas eran muy fuertes.'],
[7,'Sophie dirigió el culto en la lancha el cuarto día y el sábado.',true,'Verdadero. Su mensaje fue: «En momentos así, debemos confiar en Dios».'],
[8,'Unia Api encontró a varios estudiantes de Teología en el dormitorio cuando el misionero los buscó.',false,'Falso. No había ninguno en ese momento excepto él.'],
[9,'Unia contaba historias de la Biblia los viernes de tarde junto a una fogata.',true,'Verdadero. Después organizaba a los jóvenes para representarlas en drama.'],
[10,'Julie aceptó de inmediato la propuesta de Unia.',false,'Falso. Primero le dijo: «No puedo, tengo novio».'],
[11,'Julie y Unia se casaron en el primer año del máster.',true,'Verdadero. Fueron novios hasta terminar la universidad.'],
[12,'Gladys Aylward llegó a China veintisiete días después de salir de Londres.',true,'Verdadero. El tren fue detenido en Siberia por una guerra, pero ella siguió.'],
[13,'Gladys abrió una posada junto a otra misionera llamada Jeannie Lawson.',true,'Verdadero. Les servía para tener dinero y para hablarles de Jesús a los huéspedes.'],
[14,'Gladys atravesó el río Amarillo con los niños para buscar ayuda.',true,'Verdadero. En la otra aldea les abrieron las puertas.'],
[15,'Los dos ciegos guardaron en secreto lo que Jesús hizo por ellos.',false,'Falso. «Contaron por toda aquella región lo que Jesús había hecho» (Mateo 9:31).'],
[16,'Los cristianos de los primeros siglos usaban un pez o una cruz para reconocerse.',true,'Verdadero. Vivían de forma anónima y predicaban sin ser descubiertos.'],
[17,'Axel le confesó a David que él había roto el juego.',false,'Falso. Nunca le dijo que había sido él.'],
[18,'Marcos responde mal a los compañeros que se burlan de él.',false,'Falso. Es igual de amable con todos e ignora lo que le dicen, porque sabe que Jesús lo ama.'],
[19,'El señor McMullen se rompió un tobillo la primera tarde de su excursión.',true,'Verdadero. Pisó una piedra, y no podía seguir caminando ni tenía señal.'],
[20,'Tim Donaghy era jugador de baloncesto.',false,'Falso. Era árbitro, y desde ese puesto influía en los resultados.'],
[21,'Según la lectura, los maestros solo cumplen con su trabajo.',false,'Falso. Hacen mucho más: se preocupan de que estés bien, te ayudan y te tratan con respeto.'],
[22,'Los maestros del Templo quedaron asombrados de las respuestas de Jesús.',true,'Verdadero. Le dirigieron preguntas y quedaron asombrados al oír sus respuestas.'],
[23,'Llevar mensajes en tiempos de guerra era más peligroso todavía.',true,'Verdadero. Si el otro bando sabía que llevabas un mensaje, el riesgo era mayor.'],
[24,'Dios le había dicho a Balaam que sí fuera a maldecir al pueblo.',false,'Falso. Dios le hizo saber que no debía obedecer aquella orden, pero fue por dinero.'],
[25,'Era la primera vez que Fernando reaccionaba con enojo así.',false,'Falso. La lectura dice que no era la primera vez.'],
[26,'Emely y Ermenegildo sacaron la mejor nota de la clase.',true,'Verdadero. Y Emely reconoció delante de todos que el trabajo lo había hecho él.'],
[27,'Óscar marcó tres goles en treinta minutos.',true,'Verdadero. Por eso la mamá de Víctor entendió que era envidia.'],
[28,'Pablo Pineda es actor y ha actuado en series y películas.',true,'Verdadero. Es una celebridad en España.'],
[29,'Charles Tindley aprendió a leer por sí mismo en su adolescencia.',true,'Verdadero. De niño no pudo ir a la escuela.'],
[30,'Nabal nunca se había beneficiado de David.',false,'Falso. David y sus hombres habían cuidado mucho tiempo sus rebaños y sus empleados.'],
[31,'Abigail justificó delante de David la grosería de su esposo.',false,'Falso. Le pidió disculpas sin justificarla, y le habló de tal manera que le bajó la ira.'],
];
for (const [d, q, a, e] of VF)
  MAT_BANCO.push({ cap: id(d), t: 'tf', nv: 2, q, a, e });

/* Tarjetas: versículo por día y quién es el héroe o el villano. */
const MAT_TARJETAS = [];
for (const x of DIAS) {
  MAT_TARJETAS.push({ cap: id(x.d), f: `Versículo del <b>${MES[x.d]} de octubre</b>`, r: `${x.v} (${x.r})` });
  MAT_TARJETAS.push({ cap: id(x.d), f: `«${x.t}» — ¿qué día y quién es?`, r: `${MES[x.d]} de octubre · ${x.q}` });
}

/* ── Módulos de repaso de la matutina ──
   Se generan de los mismos datos, así que no se pueden desincronizar. */
const tbl = (head, rows) =>
  `<table class="info-table"><thead><tr>${head.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>` +
  rows.map(r => `<tr>${r.map((c, i) => `<td${i === 0 ? ' class="key"' : ''}>${c}</td>`).join('')}</tr>`).join('') +
  `</tbody></table>`;

const MAT_MODULOS = [
  { id:'mm-quien', label:'Héroes y villanos', sub:'Quién es quién, día por día',
    icono:'🦸', color:'#B91C1C', cats:['dm1','dm2'] },
  { id:'mm-versiculos', label:'Versículos de octubre', sub:'Los 31 versículos con su referencia',
    icono:'📖', color:'#1D4ED8', cats:['dm1','dm2'] },
  { id:'mm-plan', label:'Cómo estudiar la matutina', sub:'Qué se pregunta y cómo repasarlo',
    icono:'🎯', color:'#0F766E', cats:['dm1','dm2'] },
];

/* Cada tabla se corta en dos para no pasar de 2.000 caracteres por sección. */
const filasQuien = DIAS.map(x => [MES[x.d], x.t, x.q]);
const filasVers = DIAS.map(x => [MES[x.d], x.r, x.v.replace(/^«|»$/g, '')]);
const mitad = a => [a.slice(0, Math.ceil(a.length / 2)), a.slice(Math.ceil(a.length / 2))];
const [q1, q2] = mitad(filasQuien);
/* Los versículos van en cuatro tandas: con dos, cada sección pasaba de los
   2.000 caracteres que permite el repo. */
const cuartos = a => { const n = Math.ceil(a.length / 4);
  return [a.slice(0, n), a.slice(n, 2 * n), a.slice(2 * n, 3 * n), a.slice(3 * n)]; };
const [v1, v2, v3, v4] = cuartos(filasVers);
const rango = f => f.length ? `${f[0][0]} al ${f[f.length - 1][0]} de octubre` : '';

const MAT_CONT_MODULOS = {
  'mm-quien': [
    { t:'🦸 Del 1 al 16 de octubre', h: tbl(['Día', 'Título', 'Quién es'], q1) },
    { t:'🦸 Del 17 al 31 de octubre', h: tbl(['Día', 'Título', 'Quién es'], q2) },
    { t:'⚠️ Los villanos del mes', h:
      wa(`Son cinco y suelen preguntarse juntos:<br><br>` +
        DIAS.filter(x => /Villano/i.test(x.q))
          .map(x => `<strong>${MES[x.d]} de octubre</strong> — ${x.q.replace(/^Villano:\s*/, '')}`)
          .join('<br>')) },
  ],
  'mm-versiculos': [
    { t:`📖 Del ${rango(v1)}`, h: tbl(['Día', 'Referencia', 'Versículo'], v1) },
    { t:`📖 Del ${rango(v2)}`, h: tbl(['Día', 'Referencia', 'Versículo'], v2) },
    { t:`📖 Del ${rango(v3)}`, h: tbl(['Día', 'Referencia', 'Versículo'], v3) },
    { t:`📖 Del ${rango(v4)}`, h: tbl(['Día', 'Referencia', 'Versículo'], v4) },
    { t:'💡 Truco para las referencias', h:
      hi(`Lo que más se pregunta es <strong>qué versículo va con qué día</strong>.
      No hace falta memorizar el versículo entero: basta reconocer el libro.
      Repasa primero los que están en <strong>Proverbios</strong> (días 11, 25, 26, 30 y 31)
      y los de <strong>Filipenses</strong> (días 12, 16, 20 y 29), que son los que más se repiten.`) },
  ],
  'mm-plan': [
    { t:'🎯 Qué pide el reglamento', h:
      wa(`«Estudiar la matutina de menores, Héroes y villanos, del mes de octubre,
      y presentar 2 integrantes por categoría para presentar examen escrito de la
      matutina de ese mes.»<br><br>
      <strong>4 a 6 años:</strong> del 1 al 15 de octubre.<br>
      <strong>7 a 9 años:</strong> del 1 al 30 de octubre.<br><br>
      El día 31 no entra en el examen, pero está en la app porque cierra la
      historia del día 30.`) },
    { t:'📋 Qué se pregunta de cada día', h:
      hi(`De cada lectura hay tres cosas que se pueden preguntar:<br>
      1. <strong>Qué día es</strong> ese título.<br>
      2. <strong>Cuál es el versículo</strong> de ese día y de qué libro.<br>
      3. <strong>Qué pasó</strong> en la historia y <strong>qué enseña</strong>.<br><br>
      Los nombres propios son los que más se olvidan: Dienterroto, Gibson,
      el profesor Elisha, Sophie, Jonah, Unia Api, Julie, Gladys Aylward,
      Jeannie Lawson, Axel, David, Marcos, Ester, Mónica, el señor McMullen,
      Tim Donaghy, Emely, Ermenegildo, Víctor, Óscar, Pablo Pineda,
      Charles Tindley, Nabal y Abigail.`) },
    { t:'📅 Cómo repasarlo', h:
      tbl(['Cuándo', 'Qué hacer'], [
        ['Cada día', 'Leer la lectura del día en el libro y marcarla como estudiada en la app.'],
        ['Cada semana', 'Tarjetas de esa semana: versículo por día y quién es quién.'],
        ['Cada quincena', 'Un examen del alcance de esa quincena, y después «solo mis errores».'],
        ['La víspera', 'La tabla de héroes y villanos completa, y la de versículos.'],
      ]) },
    { t:'🧠 La confusión más fácil', h:
      hi(`Hay historias que ocupan <strong>varios días seguidos</strong> y se mezclan:<br><br>
      <strong>Gibson y las 5 kinas:</strong> días 3 y 4.<br>
      <strong>Sophie en la lancha:</strong> días 6 y 7.<br>
      <strong>Unia Api:</strong> días 8, 9, 10 y 11.<br>
      <strong>Gladys Aylward:</strong> días 12, 13 y 14.<br>
      <strong>Nabal y Abigail:</strong> días 30 y 31.<br><br>
      Cuando la pregunta diga un día concreto, fíjate en <u>qué parte</u> de la
      historia pasó ese día, no en la historia completa.`) },
  ],
};

module.exports = { DIAS, MAT_CAPS, MAT_CONTENIDO, MAT_BANCO, MAT_TARJETAS,
  MAT_MODULOS, MAT_CONT_MODULOS, MES, idDia: id };
