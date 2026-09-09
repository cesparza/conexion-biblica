/* Tarjetas de memorización. frente → reverso.
   cap sirve para filtrar por categoría igual que el banco de preguntas. */

const TARJETAS = [
  // Daniel 1
  {cap:'d1', f:'Nombre babilónico de <b>Daniel</b>', r:'Beltsasar'},
  {cap:'d1', f:'Nombre babilónico de <b>Ananías</b>', r:'Sadrac'},
  {cap:'d1', f:'Nombre babilónico de <b>Misael</b>', r:'Mesac'},
  {cap:'d1', f:'Nombre babilónico de <b>Azarías</b>', r:'Abed-nego'},
  {cap:'d1', f:'¿Quién era <b>Aspenaz</b>?', r:'El jefe de los eunucos (1:3)'},
  {cap:'d1', f:'¿Quién era <b>Melsar</b>?', r:'El sirviente puesto sobre Daniel y sus tres compañeros (1:11, 16)'},
  {cap:'d1', f:'Años de educación de los jóvenes', r:'TRES años (1:5)'},
  {cap:'d1', f:'Días que duró la prueba', r:'DIEZ días (1:12)'},
  {cap:'d1', f:'Qué pidieron comer y beber', r:'Legumbres para comer y agua para beber (1:12)'},
  {cap:'d1', f:'Cómo apareció su rostro a los diez días', r:'«Mejor y más robusto» que el de los otros muchachos (1:15)'},
  {cap:'d1', f:'Cuántas veces mejores que los magos', r:'DIEZ veces mejores (1:20)'},
  {cap:'d1', f:'Don que recibió solo Daniel', r:'Entendimiento en toda visión y sueños (1:17)'},
  {cap:'d1', f:'Hasta cuándo continuó Daniel', r:'Hasta el año primero del rey Ciro (1:21)'},
  {cap:'d1', f:'Año del reinado de Joacim en que cae Jerusalén', r:'El TERCER año (1:1)'},

  // Daniel 2
  {cap:'d2', f:'Año del reinado en que Nabucodonosor soñó', r:'El SEGUNDO año (2:1)'},
  {cap:'d2', f:'¿Quién era <b>Arioc</b>?', r:'El capitán de la guardia del rey (2:14)'},
  {cap:'d2', f:'Cómo se le reveló el misterio a Daniel', r:'En visión de noche (2:19)'},
  {cap:'d2', f:'Material de la <b>cabeza</b>', r:'Oro fino → Babilonia'},
  {cap:'d2', f:'Material del <b>pecho y brazos</b>', r:'Plata → Medo-Persia'},
  {cap:'d2', f:'Material del <b>vientre y muslos</b>', r:'Bronce → Grecia'},
  {cap:'d2', f:'Material de las <b>piernas</b>', r:'Hierro → Roma'},
  {cap:'d2', f:'Material de los <b>pies</b>', r:'Hierro y barro cocido → reinos divididos'},
  {cap:'d2', f:'Dónde hirió la piedra a la imagen', r:'En sus pies de hierro y de barro cocido (2:34)'},
  {cap:'d2', f:'En qué se convirtió la piedra', r:'En un gran monte que llenó toda la tierra (2:35)'},
  {cap:'d2', f:'Cargo que recibió Daniel', r:'Gobernador de la provincia de Babilonia y principal de los gobernadores sobre los sabios (2:48)'},

  // Daniel 3
  {cap:'d3', f:'Medidas de la estatua de oro', r:'SESENTA codos de alto por SEIS de ancho (3:1)'},
  {cap:'d3', f:'Dónde se levantó la estatua', r:'En el campo de Dura, provincia de Babilonia (3:1)'},
  {cap:'d3', f:'Los seis instrumentos, en orden (RV1995)', r:'Bocina, flauta, CÍTARA, arpa, salterio y zampoña (3:5). La RV1960 dice «tamboril» en el tercer lugar'},
  {cap:'d3', f:'Instrumento que NO aparece en Daniel 3', r:'La trompeta'},
  {cap:'d3', f:'Cuántas veces más caliente el horno', r:'SIETE veces más de lo acostumbrado (3:19)'},
  {cap:'d3', f:'Con qué ropa entraron al horno', r:'Con sus mantos, sus calzados, sus turbantes y sus vestidos (3:21)'},
  {cap:'d3', f:'Qué les pasó a los que los echaron', r:'La llama del fuego los mató (3:22)'},
  {cap:'d3', f:'Cuántos vio el rey en el horno', r:'CUATRO varones sueltos (3:25)'},
  {cap:'d3', f:'Cómo describió Nabucodonosor al cuarto del horno', r:'«Semejante a un hijo de los dioses» (3:25, RV1995). P&R 41: era el Hijo de Dios mismo'},
  {cap:'d3', f:'Las cuatro cosas que no sufrieron daño (3:27)', r:'El fuego no tuvo poder sobre sus cuerpos, ni aun el cabello se había quemado, sus ropas quedaron intactas, y ni siquiera olor de fuego tenían'},
  {cap:'d3', f:'La frase clave de los tres jóvenes', r:'«Y si no, has de saber, oh rey, que no serviremos a tus dioses ni tampoco adoraremos la estatua que has levantado» (3:18) (3:18)'},

  // Daniel 4
  {cap:'d4', f:'Hasta dónde llegaba el árbol', r:'Hasta el cielo; se veía hasta los confines de la tierra (4:11)'},
  {cap:'d4', f:'Con qué quedó atada la cepa', r:'Con atadura de hierro y de bronce (4:15, 23)'},
  {cap:'d4', f:'Cuántos tiempos pasarían sobre el rey', r:'SIETE tiempos (4:25)'},
  {cap:'d4', f:'Cuánto tiempo de gracia tuvo', r:'DOCE meses, un año completo (4:29)'},
  {cap:'d4', f:'Cómo le creció el cabello', r:'Como plumas de águila (4:33)'},
  {cap:'d4', f:'Cómo quedaron sus uñas', r:'Como las de las aves (4:33)'},
  {cap:'d4', f:'Qué hizo para recuperar la razón', r:'Alzó sus ojos al cielo (4:34)'},
  {cap:'d4', f:'El consejo de Daniel al rey', r:'Redimir sus pecados con justicia y sus iniquidades haciendo misericordias para con los oprimidos (4:27)'},

  // Daniel 5
  {cap:'d5', f:'Cuántos convidados en el banquete', r:'MIL príncipes (5:1)'},
  {cap:'d5', f:'De dónde eran los vasos que usó', r:'Del templo que estaba en Jerusalén (5:2)'},
  {cap:'d5', f:'Frente a qué apareció la escritura', r:'Delante del candelero (5:5)'},
  {cap:'d5', f:'El texto exacto de la pared', r:'MENE, MENE, TEKEL, UPARSIN (5:25)'},
  {cap:'d5', f:'Qué significa <b>MENE</b>', r:'Contó Dios tu reino, y le ha puesto fin (5:26)'},
  {cap:'d5', f:'Qué significa <b>TEKEL</b>', r:'Pesado has sido en balanza, y fuiste hallado falto (5:27)'},
  {cap:'d5', f:'Qué significa <b>PERES</b>', r:'Tu reino ha sido roto, y dado a los medos y a los persas (5:28)'},
  {cap:'d5', f:'Las tres cosas ofrecidas', r:'Vestido de púrpura, collar de oro y ser el TERCER señor del reino (5:7)'},
  {cap:'d5', f:'Quién recordó a Daniel al rey', r:'La reina (5:10-12)'},
  {cap:'d5', f:'Edad de Darío al recibir el reino', r:'SESENTA Y DOS años (5:31)'},

  // Daniel 6
  {cap:'d6', f:'Cuántos sátrapas puso Darío', r:'CIENTO VEINTE (6:1)'},
  {cap:'d6', f:'Cuántos gobernadores sobre ellos', r:'TRES, y Daniel era uno de ellos (6:2)'},
  {cap:'d6', f:'Por qué sobresalía Daniel', r:'Porque había en él un espíritu superior (6:3)'},
  {cap:'d6', f:'Por qué no hallaron falta en él', r:'Porque él era fiel, y ningún error ni falta hallaron en él (6:4)'},
  {cap:'d6', f:'Cuántos días duraba el edicto', r:'TREINTA días (6:7)'},
  {cap:'d6', f:'Cuántas veces al día oraba', r:'TRES veces al día (6:10)'},
  {cap:'d6', f:'Hacia dónde daban sus ventanas', r:'Hacia Jerusalén (6:10)'},
  {cap:'d6', f:'La frase final de Daniel 6:10', r:'«...como solía hacerlo antes»'},
  {cap:'d6', f:'Con qué se selló la piedra del foso', r:'Con el anillo del rey y con el de sus príncipes (6:17)'},
  {cap:'d6', f:'Qué hizo el rey esa noche', r:'Se acostó en ayunas; no trajeron ante él instrumentos musicales, y se le fue el sueño (6:18)'},
  {cap:'d6', f:'Cuándo fue el rey al foso', r:'Se levantó muy de mañana y fue apresuradamente al foso (6:19)'},
  {cap:'d6', f:'Qué respondió Daniel desde el foso', r:'«Mi Dios envió su ángel, el cual cerró la boca de los leones» (6:22)'},

  // P&R
  {cap:'pr39', f:'Título del capítulo <b>39</b> de P&R', r:'«En la corte de Babilonia»'},
  {cap:'pr39', f:'Por qué rechazaron la comida del rey', r:'Había sido ofrecida a los ídolos y violaba las leyes de Dios'},
  {cap:'pr39', f:'Qué relación hay entre cuerpo y mente', r:'Los hábitos físicos temperantes favorecen la claridad mental y espiritual'},
  {cap:'pr40', f:'Título del capítulo <b>40</b> de P&R', r:'«El sueño de Nabucodonosor»'},
  {cap:'pr40', f:'A qué recurrieron ante la sentencia de muerte', r:'A la oración, antes que a cualquier estrategia humana'},
  {cap:'pr41', f:'Título del capítulo <b>41</b> de P&R', r:'«El horno de fuego»'},
  {cap:'pr41', f:'Quién era el cuarto del horno según E. de White', r:'El Hijo de Dios mismo'},
  {cap:'pr41', f:'Qué muestra la frase «y si no»', r:'Que la obediencia no dependía de recibir el milagro'},
  {cap:'pr42', f:'Título del capítulo <b>42</b> de P&R', r:'«La verdadera grandeza»'},
  {cap:'pr42', f:'Pecado principal de Nabucodonosor', r:'El orgullo: se atribuyó la gloria que pertenecía a Dios'},
  {cap:'pr43', f:'Título del capítulo <b>43</b> de P&R', r:'«El vigía invisible»'},
  {cap:'pr43', f:'Por qué Belsasar no tenía excusa', r:'Conocía la experiencia de Nabucodonosor y aun así se rebeló'},
  {cap:'pr44', f:'Título del capítulo <b>44</b> de P&R', r:'«En el foso de los leones»'},
  {cap:'pr44', f:'Qué caracterizaba la oración de Daniel', r:'Era la fuente diaria de su fortaleza, no una emergencia'},
  {cap:'pr44', f:'Qué edad tenía Daniel en el foso', r:'Más de ochenta años'},
];


/* ─── Ampliación 8-sep: más tarjetas para los tres capítulos del reglamento
   nuevo (Daniel 1, 3 y 6), con dos formas que no existían: el VERSÍCULO CLAVE
   (frente la referencia, reverso el texto exacto) y la CIFRA. Todo el texto
   entre comillas viene verificado del RV1995. ─── */
TARJETAS.push(
  // Daniel 1
  {cap:'d1', f:'¿Quién entregó a Joacim en manos de Nabucodonosor?', r:'<b>El Señor</b> (1:2). No fue el ejército: el texto lo dice así'},
  {cap:'d1', f:'Tierra a donde llevaron los utensilios', r:'Tierra de <b>Sinar</b>, a la casa del tesoro de su dios (1:2)'},
  {cap:'d1', f:'Linaje de los muchachos escogidos', r:'Del <b>linaje real de los príncipes</b> (1:3)'},
  {cap:'d1', f:'Qué debía enseñarles Aspenaz', r:'Las <b>letras y la lengua de los caldeos</b> (1:4)'},
  {cap:'d1', f:'Para qué debían ser idóneos', r:'Para <b>estar en el palacio del rey</b> (1:4)'},
  {cap:'d1', f:'Beltsasar o Belsasar', r:'<b>Beltsasar</b> es Daniel (1:7). <b>Belsasar</b> es el rey del banquete del capítulo 5. Dos personas distintas'},
  {cap:'d1', f:'Cuántos versículos tiene Daniel 1', r:'<b>21</b> versículos'},
  {cap:'d1', f:'Cuántos capítulos tiene el libro de Daniel', r:'<b>12</b> capítulos. El campamento cubre 1, 3 y 6'},
  {cap:'d1', f:'Versículo clave <b>1:8</b>', r:'«Daniel propuso en su corazón no contaminarse con la porción de la comida del rey ni con el vino que él bebía»'},
  {cap:'d1', f:'Versículo clave <b>1:17</b>', r:'«Dios les dio conocimiento e inteligencia en todas las letras y ciencias; y Daniel tuvo entendimiento en toda visión y sueños»'},
  // Daniel 3
  {cap:'d3', f:'De qué material era la estatua', r:'De <b>oro</b> (3:1)'},
  {cap:'d3', f:'Quién hizo levantar la estatua', r:'El rey <b>Nabucodonosor</b> (3:1)'},
  {cap:'d3', f:'Sobre qué estaban puestos los tres jóvenes', r:'Sobre los <b>negocios de la provincia de Babilonia</b> (3:12)'},
  {cap:'d3', f:'De qué dijeron que Dios podía librarlos', r:'Del <b>horno de fuego ardiente</b> y de <b>las manos del rey</b> (3:17)'},
  {cap:'d3', f:'Quién NO aparece en Daniel 3', r:'<b>Daniel</b>. Los tres del horno son Sadrac, Mesac y Abed-nego'},
  {cap:'d3', f:'Cómo llamó el rey a los tres al sacarlos', r:'«Siervos del <b>Dios Altísimo</b>» (3:26)'},
  {cap:'d3', f:'Qué dijo Nabucodonosor que Dios envió', r:'Su <b>ángel</b>, que libró a sus siervos que confiaron en él (3:28)'},
  {cap:'d3', f:'Qué hizo el rey con los tres al final', r:'Los <b>engrandeció</b> en la provincia de Babilonia (3:30)'},
  {cap:'d3', f:'Cuántos versículos tiene Daniel 3', r:'<b>30</b> versículos'},
  {cap:'d3', f:'Versículo clave <b>3:17</b>', r:'«Nuestro Dios, a quien servimos, puede librarnos del horno de fuego ardiente; y de tus manos, rey, nos librará»'},
  // Daniel 6
  {cap:'d6', f:'Para qué puso Darío tres gobernadores', r:'Para que <b>el rey no fuera perjudicado</b> (6:2)'},
  {cap:'d6', f:'Qué pensó el rey hacer con Daniel', r:'<b>Ponerlo sobre todo el reino</b> (6:3)'},
  {cap:'d6', f:'Qué pusieron sobre la puerta del foso', r:'Una <b>piedra</b>, sellada con el anillo del rey y con el de sus príncipes (6:17)'},
  {cap:'d6', f:'Qué les pasó a los acusadores', r:'Fueron echados al foso con sus hijos y sus mujeres; los leones <b>quebraron todos sus huesos</b> (6:24)'},
  {cap:'d6', f:'A quiénes escribió Darío al final', r:'A <b>todos los pueblos, naciones y lenguas</b>: «Paz os sea multiplicada» (6:25)'},
  {cap:'d6', f:'Cuántos versículos tiene Daniel 6', r:'<b>28</b> versículos'},
  {cap:'d6', f:'Versículo clave <b>6:10</b>', r:'«se arrodillaba tres veces al día, oraba y daba gracias delante de su Dios como solía hacerlo antes»'},
  {cap:'d6', f:'Versículo clave <b>6:22</b>', r:'«Mi Dios envió su ángel, el cual cerró la boca de los leones para que no me hicieran daño»'},
  {cap:'d6', f:'Versículo clave <b>6:26</b>', r:'«su reino no será jamás destruido y su dominio perdurará hasta el fin»'},
  {cap:'d6', f:'Reyes en cuyos reinados prosperó Daniel', r:'<b>Darío</b> y <b>Ciro</b>, el persa (6:28)'}
);


/* ─── Ampliación 8-sep: tarjetas de P&R 39, 41 y 44, los tres que entran al
   reglamento. Pasan de 3 a 8 por capítulo, con FRASE CLAVE del libro. ─── */
TARJETAS.push(
  {cap:'pr39', f:'A quién ordenó el rey traer a los jóvenes', r:'A <b>Aspenaz</b>, príncipe de sus eunucos'},
  {cap:'pr39', f:'Por qué les cambiaron los nombres', r:'Por otros que <b>conmemoraban divinidades caldeas</b>: era el primer paso para que renunciaran a su fe'},
  {cap:'pr39', f:'Qué historia sobre la intemperancia conocían', r:'La de <b>Nadab y Abihú</b>, descrita en el Pentateuco'},
  {cap:'pr39', f:'Quién les inculcó la templanza', r:'Sus <b>padres</b>, desde temprano en la vida'},
  {cap:'pr39', f:'Frase clave de P&R 39', r:'«Fué la fidelidad en las <b>cosas pequeñas</b> lo que dió carácter a toda su vida»'},
  {cap:'pr41', f:'En qué se diferenció la imagen de Dura', r:'Era <b>toda de oro</b>. En el sueño había descenso de valores desde la cabeza hasta los pies'},
  {cap:'pr41', f:'Quiénes propusieron hacer la imagen', r:'Los <b>sabios del reino</b>, aprovechando la frase «tú eres aquella cabeza de oro»'},
  {cap:'pr41', f:'Qué fue lo único que se quemó', r:'Solo <b>sus ligaduras</b>'},
  {cap:'pr41', f:'Qué promesa recordaron en la prueba', r:'Isaías 43:2: «Cuando pasares por el fuego, no te quemarás»'},
  {cap:'pr41', f:'Frase clave de P&R 41', r:'«Nunca compele Dios a los hombres a <b>obedecer</b>. Deja a todos libres para elegir a quien quieren servir»'},
  {cap:'pr44', f:'Qué despertaron los honores de Daniel', r:'Los <b>celos</b> de los principales del reino'},
  {cap:'pr44', f:'A qué apelaron para que Darío firmara', r:'A su <b>vanidad</b>: le dijeron que el edicto acrecentaría su honor y autoridad'},
  {cap:'pr44', f:'Quién estaba detrás de la conspiración', r:'<b>Satanás</b>, por medio de los príncipes envidiosos'},
  {cap:'pr44', f:'Cuántas veces lo vieron orar', r:'<b>Tres veces</b> en un solo día: lo vigilaron todo el día'},
  {cap:'pr44', f:'Frase clave de P&R 44', r:'«...ninguna potencia terrenal tiene derecho a interponerse entre el <b>alma</b> y Dios»'}
);


/* Daniel 7 (v54): tarjetas basicas de repaso rapido, no exhaustivas. */
TARJETAS.push(
  {cap:'d7', f:'En qué año tuvo Daniel esta visión', r:'El año primero de <b>Belsasar</b> (7:1), unos 553 a.C.'},
  {cap:'d7', f:'Cuántas bestias salen del mar', r:'<b>Cuatro</b>: león, oso, leopardo y una cuarta sin nombre'},
  {cap:'d7', f:'Qué reino es el león con alas', r:'<b>Babilonia</b>'},
  {cap:'d7', f:'Qué reino es el oso alzado de un costado', r:'<b>Medo-Persia</b>'},
  {cap:'d7', f:'Qué reino es el leopardo de cuatro cabezas', r:'<b>Grecia</b>'},
  {cap:'d7', f:'Por qué el leopardo tiene cuatro cabezas', r:'Por los <b>cuatro generales</b> que se repartieron el imperio de Alejandro tras Ipso (301 a.C.)'},
  {cap:'d7', f:'Qué reino es la cuarta bestia, la que no se parece a ningún animal', r:'<b>Roma</b>'},
  {cap:'d7', f:'Cuántos cuernos tiene la cuarta bestia', r:'<b>Diez</b> (7:24)'},
  {cap:'d7', f:'Cuántos cuernos arranca el cuerno pequeño', r:'<b>Tres</b> (7:8, 24)'},
  {cap:'d7', f:'Qué tres tribus arrianas fueron eliminadas', r:'<b>Hérulos (493), vándalos (534) y ostrogodos (538)</b>'},
  {cap:'d7', f:'Cuánto es «tiempo, tiempos y medio tiempo»', r:'<b>3 años y medio</b>, o 1.260 días proféticos (7:25)'},
  {cap:'d7', f:'A cuántos años equivalen esos 1.260 días', r:'<b>1.260 años: del 538 al 1798</b>, con la regla de día por año (Ezequiel 4:6)'},
  {cap:'d7', f:'Qué pasó en 1798 con el papa', r:'El general francés <b>Berthier</b> arrestó a Pío VI y lo llevó al exilio'},
  {cap:'d7', f:'Quién se sienta a juzgar en la visión', r:'El <b>Anciano de días</b> (7:9)'},
  {cap:'d7', f:'A quién se le entrega el reino al final del juicio', r:'A <b>los santos del Altísimo</b>, para siempre (7:18, 27)'},
  {cap:'d7', f:'Cuántas veces se repite la escena del juicio en el capítulo', r:'<b>Cuatro veces</b>: 7:9-14, 7:18, 7:22 y 7:26-27'},
  {cap:'d7', f:'A qué corresponde el cuerno pequeño en la estatua de Daniel 2', r:'A los <b>pies de hierro y barro</b>: Europa dividida, sin volver a unirse'}
);

module.exports = { TARJETAS };
