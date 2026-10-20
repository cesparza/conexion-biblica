/* Daniel 9: cronología y explicación separadas del dibujo. Las fechas son la
   lectura historicista adventista; las citas bíblicas se leen de biblia.js. */
const {pares,estructura,perfil}=require('./daniel9-argumentos.js');
module.exports = {
 tipo:'cronologia', libro:'Daniel 9', titulo:'Las setenta semanas: el Mesías en el centro',
 dir:'d9/', miniF:'bautismo', portada:'oracion',
 invita:'Recorre las 70 semanas, amplía la última y descubre su conexión con Daniel 8. Cada hito tiene texto bíblico, explicación y fuentes.',
 frases:require('./daniel9-frases.js'),
 estudio:{pares,estructura,perfil},
 preguntas:require('./daniel9-preguntas.js').map(({f,...q})=>q),
 fuentes:{
  dtg:{nombre:'Elena G. de White · El Deseado de Todas las Gentes',
   lugar:'Cap. 23, «El reino de Dios está cerca»; cronología del bautismo, la cruz y el año 34.',
   url:'https://media4.egwwritings.org/pdf/es_DTG%28DA%29.pdf'},
  cs:{nombre:'Elena G. de White · El conflicto de los siglos',
   lugar:'Cap. 18, «Una profecía significativa»; relación entre las 70 semanas y los 2.300 años.',
   url:'https://media4.egwwritings.org/pdf/es_CS%28GC%29.pdf'},
  hap:{nombre:'Elena G. de White · Los Hechos de los Apóstoles',
   lugar:'Cap. 4, «Pentecostés», pp. 31–32: el derramamiento del Espíritu como señal de la entronización de Cristo.',
   url:'https://m.egwwritings.org/es/book/198.132'},
  bohr:{nombre:'Esteban Bohr · Studies in Daniel 1–10',
   lugar:'Sección de Daniel 9, pp. 323–348. Decreto: 330–340; Mesías y pacto: 341–348.'},
  simd:{nombre:'William H. Shea · Simposio sobre Daniel, Clásicos del Adventismo 5',
   lugar:'«La unidad de Daniel», sección «Aspectos especializados de Daniel 9», pp. PDF 247–268: cronología, ocho afirmaciones mesiánicas y las dos estructuras literarias. Este tomo remite la exégesis más extensa al tomo 3 de la colección CDA.'},
  sima:{nombre:'William H. Shea · Simposio sobre Apocalipsis, Clásicos del Adventismo 6',
   lugar:'Apéndice B, «¿Cuándo comenzaron las setenta semanas de Daniel 9:24?», pp. impresas 443–466.'}
 },
 hitos:[
  {id:'oracion',corto:'La oración',fecha:'El exilio · siglo VI a.C.',titulo:'Antes de contar años, Daniel ora',
   img:'oracion',alt:'Ilustración de Daniel anciano orando junto a los rollos de las Escrituras.',
   versos:[2,18,23],refs:'Daniel 9:1–23 · Jeremías 25:11–12; 29:10',
   idea:'La profecía comienza con una petición de misericordia, no con una operación matemática.',
   explica:[
    'Daniel lee a Jeremías y comprende que la desolación de Jerusalén no durará para siempre. Confiesa su pecado y el de su pueblo, y pide que Dios restaure la ciudad y el santuario.',
    'Mientras ora, Gabriel llega para darle entendimiento. La respuesta amplía su mirada: de la restauración de Jerusalén a la obra del Mesías.'
   ],matiz:'Los setenta años del exilio y las setenta semanas son períodos distintos. Daniel 9 los relaciona en la historia, pero no los hace equivalentes.',
   fuentes:['bohr','simd'],escala:'semanas',avance:null},
  {id:'tiempo',corto:'70 semanas',fecha:'La estructura de la profecía',titulo:'Setenta semanas. Una historia continua.',
   img:'oracion',alt:'Daniel estudia los rollos; la cronología se despliega debajo de la escena.',
   versos:[24,25,27],refs:'Daniel 9:24–27 · Levítico 25:8 · Números 14:34 · Ezequiel 4:6',
   idea:'Las semanas dan el marco; las seis metas explican qué hará el Mesías dentro de él.',
   explica:[
    'Daniel 9:24 anuncia seis propósitos. El centro de su explicación es la relación entre expiar la iniquidad y traer justicia perdurable. Los versículos 25–27 muestran cómo la muerte del Mesías realiza esa obra.',
    'Las siete y las sesenta y dos semanas conducen al Mesías; la semana restante contiene su muerte. Levítico 25:8 ofrece el precedente de semanas de años: 49 + 434 + 7 = 490. Shea relaciona además estas unidades con ciclos sabáticos, no solo con una regla aislada de conversión.',
    'En «Frase a frase» puedes seguir las razones de cada propósito y explorar cómo se corresponden las seis metas. La cronología y el significado teológico se leen juntos.'
   ],matiz:'El principio día por año se aplica aquí dentro de una lectura profética argumentada; no convierte todos los días de la Biblia en años.',
   fuentes:['dtg','simd','sima'],escala:'semanas',avance:0},
  {id:'decreto',corto:'El decreto',fecha:'457 a.C.',titulo:'El punto de partida: restaurar Jerusalén',
   img:'restauracion',alt:'Ilustración de familias y trabajadores restaurando Jerusalén en época persa.',
   versos:[25],refs:'Daniel 9:25 · Esdras 7:7–9, 12–26',
   idea:'La orden de Artajerjes a Esdras da comienzo al recorrido.',
   explica:[
    'La profecía comienza con una orden para restaurar y edificar Jerusalén. Esdras 7 autoriza el regreso, sostiene el culto y permite organizar jueces y aplicar la ley de Dios: incluye restauración de la vida de la comunidad.',
    'La cronología adoptada sitúa el séptimo año de Artajerjes en 457 a.C. Shea examina la evidencia histórica y el calendario civil judío de otoño a otoño. Elena de White sitúa en el otoño de ese año la entrada en vigor de la orden.'
   ],matiz:'Esdras expresa la fecha como un año del reinado de Artajerjes. Su equivalencia con 457 a.C. requiere reconstrucción histórica; ese número no está escrito en el versículo.',
   fuentes:['dtg','bohr','sima'],escala:'semanas',avance:0},
  {id:'restauracion',corto:'7 semanas',fecha:'49 años · hasta 408 a.C.',titulo:'La restauración abre el camino',
   img:'restauracion',alt:'Trabajadores reconstruyen calles y puertas de Jerusalén en una representación histórica.',
   versos:[25],refs:'Daniel 9:25 · Esdras 4:12–23 · Nehemías 4; 6:15',
   idea:'El primer tramo abarca siete semanas: 7 × 7 = 49 años.',
   explica:[
    'La plaza y el muro vuelven a edificarse en tiempos de dificultad. Esdras y Nehemías describen oposición, organización de la comunidad y reconstrucción.',
    'Al contar 49 años desde 457 a.C. se llega a 408 a.C. Desde ese límite, otras 62 semanas, equivalentes a 434 años, conducen al Mesías.'
   ],matiz:'408 a.C. es el límite calculado del primer tramo. La Biblia no fecha en ese año una ceremonia de terminación de todas las obras. Nehemías 6:15 habla de 52 días para el muro, no de 49 años de trabajo continuo.',
   fuentes:['bohr','simd','cs'],escala:'semanas',avance:49},
  {id:'mesias',corto:'El Ungido',fecha:'Otoño del 27 d.C.',titulo:'El Mesías entra en escena',
   img:'bautismo',alt:'Ilustración del bautismo de Jesús por Juan en el Jordán y de una paloma descendiendo.',
   versos:[25],refs:'Daniel 9:25 · Lucas 3:1, 21–22 · Hechos 10:38 · Marcos 1:14–15',
   idea:'69 semanas = 483 años. El punto de llegada es su unción, no su nacimiento.',
   explica:[
    'Mesías significa Ungido. En el bautismo, Jesús recibe la unción del Espíritu Santo para su ministerio. Pedro lo explica al hablar de cómo Dios ungió a Jesús con el Espíritu y con poder.',
    'Desde el otoño de 457 a.C., 483 años llegan al otoño del 27 d.C. Así comienza la última semana. La cronología identifica el inicio de su ministerio público, no la fecha de su nacimiento.'
   ],matiz:'Lucas fecha el contexto por el reinado de Tiberio. La equivalencia con el año 27 pertenece a esta reconstrucción cronológica, expuesta por las fuentes consultadas.',
   fuentes:['dtg','sima','simd'],escala:'semanas',avance:483},
  {id:'pacto',corto:'El pacto',fecha:'27–34 d.C. · la última semana',titulo:'Cristo confirma el pacto',
   img:'bautismo',alt:'Jesús al comenzar su ministerio; el tramo final de siete años se amplía en la cronología.',
   versos:[27],refs:'Daniel 9:27 · Daniel 9:4 · Romanos 15:8 · Marcos 14:24 · Hebreos 9:15',
   idea:'Cristo confirma las promesas; a mitad de la semana ratifica el nuevo pacto con su sangre.',
   explica:[
    'Confirmar significa hacer firme algo que ya existe. Shea entiende la semana del 27 al 34 como la última del período concedido a Israel bajo el antiguo pacto. No son los primeros siete años de un pacto nuevo iniciado en el bautismo.',
    'Romanos 15:8 presenta a Cristo confirmando las promesas hechas a los padres. En Marcos 14:24 su sangre ratifica el nuevo pacto. Primero él y después los apóstoles anuncian el evangelio especialmente a Israel durante los siete años. El pacto ratificado en la cruz no caduca al terminar el año 34.'
   ],matiz:'Aquí se explica la lectura mesiánica historicista. La identidad del «príncipe» de 9:26 tiene discusión exegética; se explica en «Frase a frase», versículo 26, sin convertir el pacto de 9:27 en un tratado político moderno.',
   fuentes:['dtg','bohr','simd'],escala:'ultima',avance:483},
  {id:'cruz',corto:'La cruz',fecha:'Primavera del 31 d.C.',titulo:'En la mitad de la semana, la cruz',
   img:'cruz',alt:'Representación respetuosa de las tres cruces fuera de Jerusalén, sin detalles gráficos.',
   versos:[26,27],refs:'Daniel 9:26–27 · Isaías 53:8 · Mateo 27:50–51 · Hebreos 10:10–14',
   idea:'Tres años y medio después del bautismo, Cristo entrega su vida.',
   explica:[
    'La muerte del Mesías está anunciada después de las 62 semanas que siguen a las primeras siete. El versículo 27 precisa su lugar: la mitad de la última semana.',
    'Del otoño del 27 a la primavera del 31 transcurren tres años y medio. El velo rasgado señala que los sacrificios encuentran su cumplimiento en Cristo. Su entrega es suficiente y no necesita repetirse.'
   ],matiz:'Cesar el sacrificio describe aquí la pérdida de su función como símbolo de una muerte todavía futura. No significa que todos los ritos del templo se detuvieran físicamente ese mismo día.',
   fuentes:['dtg','bohr','simd'],escala:'ultima',avance:486.5},
  {id:'mision',corto:'El testimonio',fecha:'34 d.C. · se completan 490 años',titulo:'El testimonio se extiende a las naciones',
   img:'testigos',alt:'Ilustración de discípulos saliendo de Jerusalén y compartiendo el mensaje con viajeros.',
   versos:[24,27],refs:'Daniel 9:24, 27 · Hechos 7:54–60; 8:1–4 · Romanos 11:1–5',
   idea:'La última semana termina tres años y medio después de la cruz.',
   explica:[
    'Después de la ascensión, los apóstoles continúan el llamado. Elena de White relaciona el término del período en el año 34 con el martirio de Esteban y la dispersión que lleva el mensaje a nuevos lugares.',
    'El relato de Hechos muestra cómo el testimonio sale de Jerusalén. El cambio de etapa de la misión no cierra la salvación a las personas judías: Pablo, los apóstoles y muchos creyentes eran judíos.'
   ],matiz:'Hechos narra el martirio y la dispersión, pero no escribe «año 34». La fecha procede de la cronología de las 70 semanas. Romanos 11:1 impide afirmar que Dios rechazó a toda persona judía.',
   fuentes:['dtg','cs','simd'],escala:'ultima',avance:490},
  {id:'santuario',corto:'Daniel 8',fecha:'1844 · conexión con los 2.300 años',titulo:'Una profecía ilumina la otra',
   img:'d7/juicio',alt:'Ilustración simbólica del juicio celestial, relacionada con el estudio de Daniel 7 y 8.',
   versos:[21,23,24],refs:'Daniel 8:14, 26–27; 9:21–24 · Hebreos 8:1–2; 9:23–24',
   idea:'490 + 1.810 = 2.300 años, con el mismo punto de partida.',
   explica:[
    'Gabriel, que ya había aparecido en Daniel 8, vuelve para dar entendimiento. La lectura adventista relaciona las 70 semanas con la porción temporal que había quedado sin comprender y las considera la primera parte de los 2.300 años.',
    'Desde 457 a.C., 2.300 años llegan a 1844. Esta interpretación lo relaciona con la purificación del santuario celestial y el juicio, no con la segunda venida de Jesús a la tierra.'
   ],matiz:'La relación se argumenta por el contexto, Gabriel, la visión y el término «determinadas». Shea aclara que el significado «cortadas» favorece la relación, pero no la demuestra por sí solo. Daniel 9 no escribe explícitamente «1844».',
   fuentes:['cs','hap','bohr','simd'],escala:'conexion',avance:2300},
  {id:'esperanza',corto:'Lo esencial',fecha:'Para comprender y vivir',titulo:'La certeza conduce a Cristo',
   img:'cruz',alt:'La cruz en un paisaje de Jerusalén; cierre de la experiencia centrado en Cristo.',
   versos:[18,24],refs:'Daniel 9:18, 24 · Hebreos 4:14–16 · Mateo 24:36',
   idea:'La cronología señala una persona y su obra de salvación.',
   explica:[
    'Daniel apela a la misericordia de Dios. La respuesta presenta al Mesías, su muerte, su pacto y su ministerio. Conocer las fechas tiene sentido cuando ayuda a comprender por qué podemos acercarnos a él con confianza.',
    'Repasa la secuencia: restauración, unción, cruz y testimonio. Después vuelve al texto y explica con tus palabras cómo se relacionan los tres tramos.'
   ],matiz:'La línea de tiempo no calcula el día de la segunda venida ni añade fechas proféticas posteriores a 1844. Jesús llama a confiar y permanecer preparados.',
   fuentes:['dtg','cs'],escala:'semanas',avance:490}
 ]
};
