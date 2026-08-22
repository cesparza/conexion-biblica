/* Manual de uso, dentro de la app.

   POR QUÉ AQUÍ Y NO EN UN PDF
   Un manual en PDF vive fuera de la app: se manda por WhatsApp, se queda en
   una carpeta, y a la semana describe una app que ya cambió. Además obliga a
   salir de la app para aprender a usar la app. Aquí el manual es una pantalla
   más, sale del mismo repositorio, y las cifras se calculan al pintarlo, así
   que no puede desactualizarse.

   CÓMO SE ESCRIBE
   Cada sección lleva `para`, que dice a quién le sirve: 'estudia' para quien
   se está preparando, 'director' para quien monta el club y califica. El
   contenido admite marcas {ENTRE_LLAVES} que la app reemplaza con los datos
   reales del participante activo (su categoría, su banco de preguntas), para
   que el manual hable de lo que esa persona está viendo y no en general.   */

const MANUAL = [

/* ═══════════ PARA QUIEN ESTUDIA ═══════════ */

{ id:'a-empezar', para:'estudia', icono:'🚀', t:'Los tres pasos del principio',
  d:'Qué te pregunta la app la primera vez',
  secs:[
  { t:'Por qué te pregunta antes de dejarte entrar',
    h:`<p>La app necesita saber dos cosas para mostrarte <strong>tu</strong>
    material y no el de otro: tu edad y tu evento. De esas dos respuestas sale
    tu categoría, y la categoría decide qué capítulos ves y de dónde salen tus
    preguntas.</p>
    <p>Por eso no te pone a escoger entre seis categorías con nombres raros:
    te hace dos preguntas que sí sabes contestar.</p>` },
  { t:'Paso 1 — tu nombre',
    h:`<p>Escríbelo y toca <strong>Siguiente</strong>. Sirve para que tu
    progreso sea tuyo: en un mismo teléfono pueden estudiar varias personas sin
    mezclarse.</p>` },
  { t:'Paso 2 — tu edad',
    h:`<p>Tres botones: <strong>4, 5 o 6 años</strong>, <strong>7, 8 o 9
    años</strong>, o <strong>soy adulto</strong>. Si eres Guía Mayor, hay un
    enlace abajo.</p>
    <p>Si no estás seguro de cuál te toca, pregúntale a tu director antes de
    empezar a estudiar.</p>` },
  { t:'Paso 3 — tu evento',
    h:`<p><strong>Conexión Bíblica</strong> es el libro de Daniel y Profetas y
    Reyes. <strong>Devoción Matutina</strong> es «Héroes y villanos», la
    lectura de octubre. Son dos concursos distintos con material distinto.</p>
    <p>Si vas a los dos, toca <strong>En los dos</strong>: la app te crea dos
    fichas con tu nombre, una por evento, y cambias entre ellas cuando
    quieras.</p>` },
  { t:'Si escogiste mal',
    h:`<p>No hay que empezar de cero. En <strong>Inicio</strong>, en la barra de
    arriba que dice tu nombre, toca <strong>Cambiar</strong> y escoge la
    correcta. Tu progreso no se pierde.</p>` },
  ]},

{ id:'a-hoy', para:'estudia', icono:'📌', t:'Empieza siempre por «Qué estudiar hoy»',
  d:'La única decisión que no tienes que tomar',
  secs:[
  { t:'Qué es',
    h:`<p>Es la tarjeta naranja del <strong>Inicio</strong>. Trae tres o cuatro
    cosas, en orden, escogidas según cómo vas tú: no es un plan general.</p>
    <p>Arriba te dice cuántos días faltan para el campamento y en qué semana
    del plan estás.</p>` },
  { t:'Por qué salen en ese orden',
    h:`<p>De arriba abajo va lo que más puntos recupera:</p>
    <ul><li><strong>Repasar errores</strong> primero, si ya fallaste
    preguntas. Es lo que más rinde: son puntos que ya sabes que estás
    perdiendo.</li>
    <li><strong>Tarjetas</strong> por dominar, para lo que hay que memorizar.</li>
    <li><strong>Leer</strong> el capítulo que sigue.</li>
    <li><strong>Reforzar</strong> el capítulo en el que vas más flojo, si los
    exámenes ya mostraron cuál es.</li>
    <li><strong>Un examen</strong> del nivel que te toca hoy.</li></ul>` },
  { t:'La regla',
    h:`<p>Si algún día no sabes qué hacer, abre «Qué estudiar hoy» y haz la
    primera. No tienes que decidir nada más.</p>` },
  ]},

{ id:'a-estudiar', para:'estudia', icono:'📖', t:'Estudiar: leer y marcar',
  d:'Y por qué el círculo se queda en 0%',
  secs:[
  { t:'Cómo se lee un capítulo',
    h:`<p>Toca la tarjeta del capítulo. Cada uno empieza con
    <strong>«En pocas palabras»</strong>, que es el resumen, y después vienen
    los datos, los versículos y las trampas.</p>
    <p>Tú tienes {CAPS_CAT} capítulos y {MODS_CAT} repasos generales.</p>` },
  { t:'Lo que más se olvida',
    h:`<p>Al final del capítulo hay un botón <strong>«✅ Ya lo estudié»</strong>.
    Ese botón es el que llena el círculo del Inicio.</p>
    <p>Leer sin tocarlo deja el círculo en 0%. No es un castigo: la app no
    puede saber si terminaste de leer, solo sabe lo que le dices.</p>` },
  { t:'Repaso general',
    h:`<p>Abajo de los capítulos están los repasos: la línea de tiempo, los
    personajes, los números, las trampas, los versículos para memorizar, las
    palabras difíciles. No son capítulos del libro, son resúmenes cruzados que
    sirven cuando ya leíste todo.</p>` },
  ]},

{ id:'a-tarjetas', para:'estudia', icono:'🃏', t:'Tarjetas: memorizar',
  d:'Responder en voz alta antes de voltear',
  secs:[
  { t:'El mecanismo, que es lo importante',
    h:`<p>Una tarjeta tiene la pregunta por delante y la respuesta por detrás.
    Lo que hace que se te quede no es leer la respuesta: es
    <strong>intentar recordarla y fallar</strong>. Ese esfuerzo es el que fija
    el dato.</p>
    <p>Por eso el orden importa: lee el frente, <strong>responde en voz
    alta</strong>, y solo entonces toca la tarjeta para comprobar.</p>` },
  { t:'Cómo se usa',
    h:`<ol><li>Lee el frente.</li>
    <li>Di la respuesta en voz alta.</li>
    <li>Toca la tarjeta para ver si acertaste.</li>
    <li>Toca <strong>✅ La sabía</strong> o <strong>🔁 Repasar</strong>.</li></ol>
    <p>Tú tienes {TJ_CAT} tarjetas.</p>` },
  { t:'Cuándo queda dominada',
    h:`<p>Cuando la aciertas <strong>dos veces seguidas</strong>. Las que fallas
    vuelven a salir primero, y las dominadas salen cada vez menos.</p>` },
  { t:'La trampa que se hace uno mismo',
    h:`<p>Si tocas «La sabía» sin haberla sabido, la app deja de mostrártela. Ahí
    no engañaste a la app: te quedaste sin repasar justo lo que no sabes, y eso
    se paga el día del examen. Nadie te está calificando en las tarjetas.</p>` },
  ]},

{ id:'a-examen', para:'estudia', icono:'✏️', t:'Examen: practicar',
  d:'Cómo es, y qué pasa al terminar',
  secs:[
  { t:'Empezar',
    h:`<p>La pantalla abre con <strong>un solo botón</strong>. Arriba dice
    cuántas preguntas trae y de qué nivel; con tocar
    <strong>🚀 Comenzar</strong> arranca.</p>
    <p>Si quieres otro tamaño, otro capítulo u otra dificultad, está en
    <strong>⚙️ Cambiar este examen</strong>.</p>` },
  { t:'Mientras lo haces',
    h:`<ul><li>Arriba corre un reloj. Se pone rojo en los últimos dos minutos.</li>
    <li>Las preguntas <strong>cambian cada vez</strong>: salen al azar de
    {BANCO_CAT} preguntas, así que nunca te sale el mismo examen dos veces.</li>
    <li>Las opciones también se barajan. No se puede aprobar marcando siempre
    la misma letra.</li>
    <li>Al terminar, toca <strong>✅ Entregar</strong>.</li></ul>` },
  { t:'Las tres secciones',
    h:`<p><strong>Sección I</strong> — Selección múltiple.<br>
    <strong>Sección II</strong> — Verdadero o Falso.<br>
    <strong>Sección III</strong> — Completar el versículo.</p>
    <p>Esas son las tres del examen del campamento.
    <strong>Cuántas preguntas trae el real no lo sabemos todavía</strong>, y por
    eso aquí puedes practicar con varios tamaños.</p>` },
  { t:'Al terminar, la parte que sirve',
    h:`<p>Ves tu puntaje y, más abajo, <strong>todas las preguntas con la
    respuesta correcta</strong>. Esa revisión es la mitad del ejercicio: léela,
    sobre todo las que fallaste.</p>
    <p>Las que falles quedan guardadas y puedes hacer un examen
    <strong>solo con tus errores</strong> desde «Qué estudiar hoy».</p>` },
  { t:'El simulacro',
    h:`<p>Es el mismo examen sin las pistas de la sección de completar, para que
    se parezca más al de verdad. Está dentro de «Cambiar este examen».</p>` },
  ]},

{ id:'a-logros', para:'estudia', icono:'🏆', t:'Logros: tus errores y tu historial',
  d:'Donde se ve si estás mejorando',
  secs:[
  { t:'Puntos débiles',
    h:`<p>Dice en qué capítulo vas más flojo, según tus exámenes. Es la pantalla
    que hay que mirar cuando no sabes qué repasar.</p>` },
  { t:'Insignias e historial',
    h:`<p>Las insignias son metas cumplidas. El historial muestra cada examen con
    su puntaje y su fecha: ahí se ve si estás subiendo o estancado.</p>` },
  ]},

{ id:'a-papel', para:'estudia', icono:'🖨️', t:'Estudiar en papel',
  d:'Todo se puede imprimir desde la app',
  secs:[
  { t:'Dónde está',
    h:`<p>En <strong>📖 Estudiar</strong>, al final de la pantalla, hay una
    sección de imprimir. Y dentro de cada capítulo hay un
    <strong>Imprimir este capítulo</strong>.</p>` },
  { t:'Qué puedes sacar',
    h:`<ul><li><strong>Toda mi guía de estudio</strong> — tus capítulos y
    repasos, en orden.</li>
    <li><strong>Mis tarjetas, para recortar</strong> — en papel no se puede
    voltear, así que la respuesta va debajo: la tapas con la mano, contestas en
    voz alta, y destapas.</li>
    </ul>
    <p>Y este manual se imprime desde su propia pantalla, con el botón
    <strong>🖨️ Imprimir este manual</strong> que está al final.</p>` },
  { t:'Si no vas a usar impresora',
    h:`<p>Se abre el cuadro de impresión igual. Ahí escoge
    <strong>Guardar como PDF</strong> y te queda el archivo en el teléfono o el
    computador.</p>` },
  ]},

{ id:'a-link', para:'estudia', icono:'🔗', t:'Si te mandan un examen por link',
  d:'Todos hacen el mismo',
  secs:[
  { t:'Qué es',
    h:`<p>Tu director puede mandar un link con un examen. Todos los que lo abren
    hacen <strong>exactamente el mismo examen</strong>, así que sí se pueden
    comparar los puntajes.</p>` },
  { t:'Qué tienes que hacer',
    h:`<p>Tocar el link. Se abre la app y sale una tarjeta que dice qué examen es;
    toca <strong>Hacer este examen</strong> y ya.</p>
    <p>Si dice que es de otra categoría, lo puedes hacer igual: no te cambia tu
    material ni tu progreso.</p>` },
  { t:'El link se usa una sola vez',
    h:`<p>El link no lleva las respuestas dentro, así que no hay nada que leer
    antes. Lleva solo la receta, y la app arma el examen cuando lo abres.</p>
    <p>Y se gasta al abrirlo. Si lo abres, miras las preguntas y te sales sin
    contestar, <strong>no lo puedes volver a abrir</strong>. Ábrelo cuando ya
    estés listo para hacerlo.</p>` },
  { t:'Al final sale la nota, no las respuestas',
    h:`<p>En el examen por link y en el simulacro no aparece la revisión: ves
    cuántas quedaron bien y en qué sección, pero no cuál era la correcta. El
    examen del campamento funciona igual.</p>
    <p>Si quieres ver qué falló, pídeselo a tu director: él entra su clave en
    ese mismo aparato y la revisión se abre.</p>` },
  ]},

{ id:'a-compartir', para:'estudia', icono:'📤', t:'Mandarle a tu director cómo vas',
  d:'Un código que se copia y se pega',
  secs:[
  { t:'Por qué hace falta un código',
    h:`<p>Tu progreso se guarda <strong>en este aparato</strong>, no en internet.
    Tu director no puede verlo desde el suyo, aunque quiera. La única forma de
    mostrárselo es convertirlo en texto y mandárselo.</p>` },
  { t:'Cómo se hace',
    h:`<ol><li>Entra a <strong>🏆 Logros</strong> y abre
    <strong>📤 Pasar o compartir mi progreso</strong>.</li>
    <li>Toca <strong>«Código para mostrar cómo voy»</strong>. Sale un código
    corto que empieza en <strong>CB1R</strong>.</li>
    <li>Toca <strong>📋 Copiar</strong> y pégalo en el chat.</li></ol>
    <p>Tu director lo pega en su app y ve tus capítulos, tus exámenes y tu
    racha. <strong>No recibe tu progreso</strong>: solo ve una foto de cómo
    vas.</p>` },
  { t:'El otro código, el largo',
    h:`<p><strong>«Código para pasar todo a otro aparato»</strong> sirve para
    cuando cambias de teléfono. Ese sí lleva todo, incluidos tus errores y tus
    tarjetas, y es mucho más largo. Si el chat lo corta, guárdalo como archivo
    con el botón de al lado.</p>` },
  ]},

{ id:'a-reglas', para:'estudia', icono:'✅', t:'Tres reglas y las dudas de todos',
  d:'Lo que hay que recordar',
  secs:[
  { t:'Las tres reglas',
    h:`<div class="highlight-box"><strong>1.</strong> Todos los días un rato
    corto, mejor que un día entero.</div>
    <div class="highlight-box"><strong>2.</strong> Responde en voz alta antes de
    ver la respuesta.</div>
    <div class="highlight-box"><strong>3.</strong> Sé honesto con «La sabía».
    Nadie te está calificando ahí.</div>` },
  { t:'¿Se me borra si cierro la app?',
    h:`<p>No. Se guarda en este teléfono o computador. Pero <strong>solo
    ahí</strong>: si la abres en otro aparato, empiezas de cero. Y si es una
    ventana de incógnito, se borra al cerrarla.</p>` },
  { t:'¿Necesito internet?',
    h:`<p>Solo para abrirla la primera vez. Después funciona sin internet.</p>` },
  { t:'¿Cuántas preguntas trae el examen del campamento?',
    h:`<p>No lo sabemos. Sí sabemos que trae las tres secciones. Por eso aquí
    puedes practicar con varios tamaños.</p>` },
  ]},

/* ═══════════ PARA EL DIRECTOR ═══════════ */

{ id:'d-que-es', para:'director', icono:'🧭', t:'Qué es y qué no es',
  d:'Antes de repartirla en el club',
  secs:[
  { t:'Qué es',
    h:`<p>Una <strong>sola página web</strong>. Se abre en el navegador del
    celular o del computador, no se instala nada, y después de abrirla una vez
    funciona sin internet. El progreso se guarda en ese aparato.</p>
    <p>Cubre los <strong>dos eventos</strong> del campamento con material
    verificado contra la fuente: los capítulos de Conexión Bíblica y los 31 días
    de la matutina de octubre. En total {BANCO_TOTAL} preguntas y {TJ_TOTAL}
    tarjetas.</p>` },
  { t:'Qué no es',
    h:`<p>No es el examen del campamento ni lo reemplaza. Es práctica: las
    preguntas las armamos nosotros a partir del material que pide el
    reglamento.</p>` },
  ]},

{ id:'d-cats', para:'director', icono:'🎯', t:'Las seis categorías',
  d:'El dato del que depende todo',
  secs:[
  { t:'Por qué importa tanto',
    h:`<p>La categoría decide qué capítulos ve el participante, de dónde salen
    sus preguntas y hasta qué dificultad le llega. Una categoría mal puesta son
    semanas estudiando el material equivocado, y no se nota hasta el
    examen.</p>` },
  { t:'La tabla',
    h:`{TABLA_CATS}` },
  { t:'Guías Mayores',
    h:`<div class="warn-box">No está en el reglamento del campamento: es el
    alcance ampliado, Daniel 1 al 6 y P&R 39 al 44, para el otro evento.</div>` },
  ]},

{ id:'d-montar', para:'director', icono:'👥', t:'Montar a los participantes',
  d:'Varias personas en un mismo aparato',
  secs:[
  { t:'La bienvenida hace el trabajo',
    h:`<p>La primera vez la app pregunta nombre, edad y evento, y de ahí deduce
    la categoría. <strong>El participante nunca escoge entre las seis</strong>,
    justamente para que un niño de cinco años no termine con el material de
    nueve.</p>
    <p>Si dice que participa en los dos eventos, se le crean
    <strong>dos fichas</strong> con el mismo nombre. Son cuentas separadas a
    propósito: el progreso de Daniel y el de la matutina no se deben
    mezclar.</p>` },
  { t:'Cambiar de persona',
    h:`<p>En el <strong>Inicio</strong>, la barra de arriba dice quién está
    estudiando. Al tocar <strong>Cambiar</strong> se abre el selector de
    personas y de categoría. Caben <strong>hasta 12 fichas</strong> por aparato,
    cada una con su progreso, sus errores y sus exámenes.</p>` },
  { t:'Lo primero que hay que revisar',
    h:`<div class="warn-box">Cuando un niño lleva días estudiando, revisa que la
    barra de arriba diga la categoría correcta. Si dice otra, toca Cambiar y
    corrige: el progreso no se pierde.</div>` },
  ]},

{ id:'d-progreso', para:'director', icono:'📊', t:'Ver si están estudiando de verdad',
  d:'Tres lugares, en orden de utilidad',
  secs:[
  { t:'Progreso por capítulo',
    h:`<p>Un círculo por capítulo, en el Inicio. Se llena cuando el participante
    toca «Ya lo estudié» al final del capítulo, no por abrirlo.</p>
    <div class="warn-box">Círculos en 0% con exámenes hechos significa que está
    adivinando en vez de leer.</div>` },
  { t:'Tus números',
    h:`<p>Capítulos leídos, mejor puntaje, exámenes hechos, días de racha y
    errores pendientes. La tarjeta aparece cuando ya hay algo que mostrar.</p>` },
  { t:'Logros',
    h:`<p><strong>Puntos débiles</strong> es la más útil: dice en qué capítulo va
    más flojo. <strong>Historial</strong> muestra cada examen con su fecha, así
    que se ve si mejora o se estancó.</p>` },
  ]},

{ id:'d-dificultad', para:'director', icono:'📈', t:'Cómo sube la dificultad',
  d:'Dos frenos, y manda el más bajo',
  secs:[
  { t:'Los tres niveles',
    h:`<p><strong>1 Básico</strong> — nombres, números, lugares.<br>
    <strong>2 Intermedio</strong> — verdadero o falso y matices.<br>
    <strong>3 Avanzado</strong> — citas literales, completar el versículo,
    diferencias entre versiones.</p>` },
  { t:'El mecanismo',
    h:`<p>La app sube de nivel sola, con dos frenos, y aplica el más bajo de los
    dos:</p>
    <ul><li><strong>El calendario:</strong> las dos primeras semanas solo nivel
    1, hasta la cuarta nivel 2, después nivel 3.</li>
    <li><strong>El desempeño:</strong> no sube a nivel 2 hasta promediar 70%, ni
    a nivel 3 hasta promediar 85% en los últimos exámenes.</li></ul>
    <p>Sirve para que la dificultad crezca de verdad y no de golpe: no se llega
    a lo literal sin dominar los datos.</p>` },
  { t:'Las excepciones',
    h:`<p>Los de 4 a 6 años se quedan en nivel 1 y no ven la sección de
    completar: el reglamento no les pide escribir la palabra exacta. Los adultos
    entran directo a nivel 3.</p>
    <p>Se puede fijar el nivel a mano en <strong>Examen → Cambiar este
    examen</strong>, pero lo normal es dejarlo en Progresivo.</p>` },
  ]},

{ id:'d-imprimir', para:'director', icono:'🖨️', t:'Imprimir exámenes y claves',
  d:'Todo sale de la app, no de una carpeta',
  secs:[
  { t:'Dónde está',
    h:`<p>En <strong>✏️ Examen</strong>, debajo del separador que dice
    <em>Para el director del club</em>, en
    <strong>🖨️ Imprimir exámenes y claves</strong>:</p>
    <ul><li><strong>Este examen, sin respuestas</strong> — la hoja del
    concursante, con espacio para nombre, club y puntaje.</li>
    <li><strong>Este examen, con respuestas</strong> — la clave para
    calificar.</li>
    <li><strong>Las 6 categorías, sin respuestas</strong> — un documento con los
    seis exámenes, cada uno en su hoja.</li>
    <li><strong>Las 6 categorías, con respuestas</strong> — las seis claves.</li>
    <li><strong>Las guías de los dos eventos</strong> — todo el material de
    estudio de Conexión Bíblica y de la matutina en un solo documento.</li>
    <li><strong>El manual de la app</strong> — este mismo manual, en papel.</li></ul>
    <p>Los dos primeros usan lo que esté armado en <strong>⚙️ Cambiar este
    examen</strong>: capítulo, cantidad y dificultad.</p>` },
  { t:'Cómo sale el PDF',
    h:`<p>Se abre el cuadro de impresión del aparato. Ahí se manda a la
    impresora o se escoge <strong>Guardar como PDF</strong>. No hay una carpeta
    con archivos viejos: cada hoja se genera en el momento, del material que la
    app tiene hoy.</p>` },
  { t:'La clave',
    h:`<div class="warn-box">La hoja con respuestas dice
    <strong>«SOLO PARA LÍDERES»</strong> en el encabezado. Revísalo antes de
    repartir.</div>
    <p>El examen y su clave salen del mismo armado, así que el número 7 de la
    hoja del niño es el número 7 de la clave.</p>` },
  { t:'En iPhone y iPad',
    h:`<p>El cuadro de impresión no siempre abre solo. Si no abre, aparece un
    enlace debajo de los botones para ver el examen en otra pestaña y usar
    Compartir → Imprimir. Lo cómodo es imprimir desde un computador.</p>` },
  ]},

{ id:'d-link', para:'director', icono:'🔗', t:'Mandar el mismo examen por link',
  d:'Para que todos hagan exactamente el mismo',
  secs:[
  { t:'Para qué sirve',
    h:`<p>Normalmente cada examen sale distinto: las preguntas se sacan al azar.
    Eso es bueno para practicar, pero <strong>no sirve para comparar</strong>: si
    dos niños sacan 12 de 15 en exámenes distintos, no sabes cuál va mejor.</p>
    <p>El link resuelve eso. Todos los que lo abran hacen
    <strong>exactamente el mismo examen</strong>: las mismas preguntas, en el
    mismo orden, con las opciones en el mismo orden.</p>` },
  { t:'Cómo se hace',
    h:`<ol><li>Arma el examen que quieres en
    <strong>Examen → Cambiar este examen</strong>: capítulo, cantidad y
    dificultad.</li>
    <li>Abre <strong>🔗 Mandar este examen por link</strong> y toca
    <strong>Copiar el link de este examen</strong>.</li>
    <li>Pégalo en el grupo del club.</li></ol>
    <p>Son unos 60 caracteres. No lo corta ningún chat.</p>` },
  { t:'Cómo funciona por dentro',
    h:`<p>El link <strong>no lleva las preguntas</strong>: lleva la receta
    —categoría, alcance, nivel, cantidad y un número de semilla— y la app del
    otro lado vuelve a armar el examen con esa semilla.</p>
    <p>Dos razones para hacerlo así. Un examen de 15 preguntas con sus opciones
    dentro de una dirección web son miles de caracteres, y el chat lo corta. Y
    si el link llevara las preguntas, llevaría también
    <strong>las respuestas correctas</strong>, que cualquiera podría leer antes
    de contestar.</p>` },
  { t:'Lo que pasa al abrirlo',
    h:`<p>Sale una tarjeta que dice qué examen es, y hay que aceptarlo. Antes de
    empezar, la app avisa dos cosas si aplican:</p>
    <ul><li><strong>Es de otra categoría que la tuya.</strong> Se puede hacer
    igual; no le cambia la categoría ni el material al participante.</li>
    <li><strong>Se armó con otra versión del material.</strong> Si después de
    mandar el link se publican preguntas nuevas, el examen ya no es el mismo, y
    la app lo dice en vez de fingir que sí.</li></ul>
    <p>El resultado queda en el historial marcado como examen compartido.</p>` },
  { t:'Si es un niño que nunca ha abierto la app',
    h:`<p>Primero le pide su nombre y su edad, como a cualquiera, y después le
    aparece la invitación al examen. No se pierde el link.</p>` },
  { t:'Cómo se cierra el simulacro en el tiempo',
    h:`<p>La app no tiene servidor, así que <strong>no tiene un reloj de
    confianza</strong>: una fecha escrita en el programa se burla cambiándole la
    hora al celular. Lo que sí no se puede adivinar es la semilla del link, y esa
    semilla solo existe cuando tú generas el link.</p>
    <p>O sea que <strong>el control no es el día, es el momento en que lo
    mandas</strong>. Si el simulacro es a las 3:00, manda el link a las 3:00.</p>
    <p>Para que eso sirva de algo, el link se gasta al abrirse: un segundo
    intento se rechaza. Si alguien lo abrió por error antes de la hora, tú lo
    liberas con tu clave.</p>` },
  { t:'La clave del director',
    h:`<div class="warn-box">La clave es <strong>solo tuya</strong>. Quien la
    tenga ve las respuestas.</div>
    <p>Sirve para dos cosas: <strong>abrir la revisión</strong> al final de un
    simulacro o de un examen por link, y <strong>liberar un link</strong> que se
    abrió por error.</p>
    <p>Se entra en el aparato del participante, al terminar, con el botón
    <strong>🔑 Soy el director</strong>. Se borra al cerrar la pestaña, así que
    ese celular no queda abierto en modo director.</p>
    <p>Necesita la app abierta desde su dirección de internet. Si el archivo se
    abrió a mano desde el escritorio, la clave no funciona y la app lo dice en
    vez de quedarse callada.</p>` },
  ]},

{ id:'d-recibir', para:'director', icono:'📥', t:'Ver el progreso de otro aparato',
  d:'Los dos códigos y para qué es cada uno',
  secs:[
  { t:'Cómo se hace',
    h:`<ol><li>El participante entra a <strong>Logros → Pasar o compartir mi
    progreso</strong> y toca <strong>«Código para mostrar cómo voy»</strong>.</li>
    <li>Toca <strong>Copiar</strong> y te lo manda por chat.</li>
    <li>Tú lo pegas en el recuadro de abajo de esa misma pantalla y tocas
    <strong>Ver el código</strong>.</li></ol>
    <p>Sale un boletín con capítulos leídos, mejor puntaje, exámenes, racha,
    tarjetas dominadas, errores pendientes y los últimos cinco exámenes con
    fecha.</p>
    <div class="highlight-box">Ver un resumen no cambia nada de tus propios
    datos.</div>` },
  { t:'Los dos códigos',
    h:`<p><strong>CB1R — resumen.</strong> Unos 300 caracteres, cabe en un
    mensaje. Solo se ve, no se importa.</p>
    <p><strong>CB1F — ficha completa.</strong> Mil caracteres y sube. Trae todo,
    y al pegarlo se puede agregar como ficha nueva o reemplazar la actual.</p>` },
  { t:'Si el código no se entiende',
    h:`<div class="warn-box">Casi siempre llegó cortado. Que lo copie otra vez con
    el botón <strong>Copiar</strong>, no seleccionando a mano. Los saltos de
    línea que mete el chat no importan: la app los ignora.</div>` },
  ]},

{ id:'d-limites', para:'director', icono:'🚫', t:'Lo que la app no hace',
  d:'Mejor saberlo hoy que el 8 de octubre',
  secs:[
  { t:'No sincroniza entre aparatos',
    h:`<p>El progreso vive en el navegador donde se estudió. Si el niño estudia
    en el celular de la mamá y después abre la app en la tablet, la tablet
    empieza en cero. Para ver el progreso de otro aparato hay que pedir el
    código.</p>` },
  { t:'Se puede perder',
    h:`<p>La app no borra nada sola, pero si alguien limpia los datos del
    navegador el progreso se va. <strong>El modo incógnito no sirve</strong> para
    esto: borra todo al cerrar.</p>` },
  { t:'No es el examen oficial',
    h:`<p>No sabemos cuántas preguntas trae el real ni cómo reparte las
    secciones. Sabemos el formato de tres secciones y el alcance.</p>` },
  { t:'No es a prueba de trampa, y hasta dónde llega',
    h:`<div class="warn-box">La app es un solo archivo que el navegador se baja
    completo. Las respuestas correctas están ahí adentro.</div>
    <p>Lo que sí protege, de verdad: <strong>cuáles</strong> preguntas trae un
    examen por link no se puede saber antes, porque hace falta la semilla; y el
    link no se puede repetir.</p>
    <p>Lo que no protege: un adulto que sepa mirar el código de una página web
    encuentra las respuestas mientras contesta. Contra eso no hay nada que
    hacer sin un servidor, y el control ahí es estar presente, no técnico.</p>
    <p>Para niños de 4 a 9 años eso alcanza. Si algún día hace falta que
    tampoco un adulto pueda, toca servidor.</p>` },
  ]},

{ id:'d-version', para:'director', icono:'📛', t:'«Nueva Reina Valera 1995»: qué versión es',
  d:'El nombre del volante confunde',
  secs:[
  { t:'El problema del nombre',
    h:`<p>El volante dice <strong>«Nueva Reina Valera 1995»</strong>. Con ese
    nombre exacto no existe ninguna Biblia publicada, así que vale aclararlo
    antes de que alguien lo pregunte el día del examen.</p>
    <table class="info-table"><thead><tr><th>Nombre real</th><th>Ediciones</th>
    <th>Quién la publica</th></tr></thead><tbody>
    <tr><td class="key">Reina-Valera 1995 (RV95)</td><td>1995</td>
    <td>Sociedades Bíblicas Unidas</td></tr>
    <tr><td class="key">Nueva Reina-Valera (NRV)</td><td>1990 y 2000</td>
    <td>Sociedad Bíblica Emanuel</td></tr>
    </tbody></table>` },
  { t:'El año es el que decide',
    h:`<p>La <em>Nueva</em> Reina-Valera no tiene ninguna edición de 1995: solo
    1990 y 2000. La única Biblia de 1995 es la Reina-Valera 1995. Entonces
    «Nueva Reina Valera 1995» está diciendo
    <strong>Reina-Valera 1995</strong>, con «nueva» usada como adjetivo: era la
    nueva revisión frente a la de 1960.</p>
    <p>Dos datos más apuntan a lo mismo: la <strong>Biblia del Club de
    Aventureros</strong> que vende la Casa Editora es RV95, y la
    <strong>IADPA</strong>, editorial del Profetas y Reyes que usa el club,
    vende Biblias RV95.</p>
    <div class="highlight-box">Todo el material está verificado palabra por
    palabra contra la Reina-Valera 1995.</div>` },
  { t:'Cuánto dependería de esto',
    h:`<p>Por si alguien quiere confirmarlo igual, esto es lo que estaría en
    juego: de las preguntas de Conexión Bíblica, unas <strong>77 tocan la
    palabra exacta</strong> (las 35 de completar y las que citan texto entre
    comillas). El resto son <strong>datos</strong> —nombres, números, lugares,
    hechos— y no cambian con la versión.</p>
    <p>La app además enseña la diferencia: el repaso
    <strong>«RV1995 vs RV1960»</strong> trae la lista de palabras que cambian.</p>` },
  ]},

{ id:'d-fallas', para:'director', icono:'🔧', t:'Si algo no funciona',
  d:'Las cinco de siempre',
  secs:[
  { t:'El progreso apareció en cero',
    h:`<p>Casi siempre es otro navegador, otro aparato, o modo incógnito. Revisa
    también que la barra de arriba tenga seleccionada la ficha correcta.</p>` },
  { t:'Los círculos no se llenan aunque el niño lee',
    h:`<p>Falta tocar <strong>«Ya lo estudié»</strong> al final de cada
    capítulo.</p>` },
  { t:'El examen sale con menos preguntas de las pedidas',
    h:`<p>El alcance escogido no tiene tantas. La app avisa «Se usarán todas» y
    usa las que hay.</p>` },
  { t:'Volvió a salir la pantalla de bienvenida',
    h:`<p>Solo aparece cuando no hay ningún dato guardado, así que se borraron
    los datos del navegador.</p>` },
  { t:'Quiero empezar de cero con un participante',
    h:`<p>Logros → Datos guardados → <strong>Borrar solo a este
    participante</strong>.</p>` },
  ]},

];

if (typeof module !== 'undefined' && module.exports) module.exports = { MANUAL };
