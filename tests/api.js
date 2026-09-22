/* Pruebas del API. Es el hueco que tenía el proyecto: las otras 296 pruebas son
   todas del navegador, y desde v20 la lógica que de verdad importa (sesiones,
   roles, una vez por persona, el filtro por categoría) vive en el servidor.

   POR QUÉ ESTRUCTURALES Y NO CON UNA BASE DE MENTIRA
   Levantar un D1 falso para probar el Worker cuesta más de lo que rinde en un
   proyecto de este tamaño, y una prueba con una base simulada no habría
   detectado ninguno de los errores reales que hemos tenido. Lo que sí los
   detecta es verificar las INVARIANTES del archivo: que la guarda esté antes de
   las rutas que protege, que ningún endpoint público entregue la semilla, que
   todo valor viaje por bind(), y que los índices que sostienen las reglas
   existan en las migraciones.

   Con --vivo, además, golpea el sitio publicado y comprueba el contrato
   público: qué responde sin sesión y qué archivos no se sirven.

   Uso:  node tests/api.js
         node tests/api.js --vivo                                            */
const fs = require('fs'), path = require('path');
const RAIZ = path.join(__dirname, '..');
const API = fs.readFileSync(path.join(RAIZ, 'functions/api/[[ruta]].js'), 'utf8');
const MID = fs.readFileSync(path.join(RAIZ, 'functions/_middleware.js'), 'utf8');
const MIGR = fs.readdirSync(path.join(RAIZ, 'migraciones'))
  .map(f => fs.readFileSync(path.join(RAIZ, 'migraciones', f), 'utf8')).join('\n');

let f = 0;
const ok = (c, m) => { console.log((c ? '✅' : '❌') + ' ' + m); if (!c) f++; };

/* ── LA GUARDA ANTES QUE LAS RUTAS QUE PROTEGE ──
   Es el error más fácil de cometer: agregar un endpoint /panel/ nuevo más
   arriba y dejarlo abierto sin darse cuenta. */
const posGuarda = API.indexOf("ruta.startsWith('/panel/')");
ok(posGuarda > 0, 'Existe la guarda de /panel/');

const rutasPanel = [...API.matchAll(/ruta === '(\/panel\/[^']*)'/g)]
  .map(m => ({ ruta: m[1], pos: m.index }));
const sinProteger = rutasPanel.filter(r => r.pos < posGuarda && r.ruta !== '/panel/entrar');
ok(sinProteger.length === 0,
  'Ninguna ruta de /panel/ se atiende antes de la guarda' +
  (sinProteger.length ? ' — quedan abiertas: ' + sinProteger.map(r => r.ruta).join(', ') : ''));
ok(rutasPanel.length >= 5, 'El panel tiene sus rutas (' + rutasPanel.length + ')');

/* ── LA SEMILLA NO SALE POR UNA RUTA PÚBLICA ──
   Si /estado devolviera la semilla, cualquiera con la URL podría precalcular
   las preguntas antes de que se abra la evaluación. */
const bloqueEstado = API.slice(API.indexOf("ruta === '/estado'"), API.indexOf("ruta === '/entrar'"));
ok(!/semilla/.test(bloqueEstado), 'El endpoint público /estado NO entrega la semilla');
const bloqueEval = API.slice(API.indexOf("ruta === '/evaluacion'"), API.indexOf("ruta === '/intento'"));
ok(/sesion\.rol !== 'participante'/.test(bloqueEval),
  'La receta de la evaluación exige sesión de participante');
ok(/semilla: ev\.semilla/.test(bloqueEval), 'Y esa sí entrega la semilla, que es su trabajo');

/* ── TODO VALOR VIAJA POR bind() ──
   Una sola interpolación en un SQL abre inyección. Se buscan literales de
   plantilla dentro de prepare(). */
const interpolados = [...API.matchAll(/prepare\(\s*`[^`]*\$\{/g)];
ok(interpolados.length === 0,
  'Ningún SQL interpola valores: todo va por bind() (' + interpolados.length + ' hallazgos)');
ok((API.match(/\.bind\(/g) || []).length >= 15, 'Y bind() se usa en todas las consultas');

/* ── LAS REGLAS VIVEN EN LA BASE, NO EN EL NAVEGADOR ── */
ok(/CREATE UNIQUE INDEX[\s\S]*ix_intento_eval[\s\S]*participante_id, evaluacion_id/.test(MIGR),
  'La regla «una evaluación por persona» es un índice único, no una promesa del cliente');
ok(/CREATE UNIQUE INDEX[\s\S]*ix_part_codigo/.test(MIGR), 'Los códigos de participante son únicos');
ok(/ix_intento_idem/.test(MIGR), 'La idempotencia del intento está respaldada por un índice');
ok(/categoria IN \('me','av','pa','gm','dm1','dm2'\)/.test(MIGR),
  'La categoría del participante es una de las seis de la app, con CHECK en la base');

/* ── EL BORRADO ES SUAVE ── */
ok(/UPDATE participante SET borrado_en/.test(API) && !/DELETE FROM participante\b/.test(API),
  'Quitar a una participante es borrado suave: no se pierden las notas ya contadas');

/* ── EL LÍMITE POR IP NO PUEDE SER BAJO ──
   El día de la evaluación todas salen por la misma IP del wifi de la iglesia.
   Un límite bajo bloquea a niñas legítimas en plena fila. */
const lim = /n >= (\d+)/.exec(API);
ok(lim && Number(lim[1]) >= 25,
  'El límite de intentos por IP no baja de 25, por el wifi compartido (' + (lim ? lim[1] : '?') + ')');

/* ── LOS SECRETOS SOLO VIENEN DEL ENTORNO ── */
ok(/env\.CLAVE_PANEL/.test(API) && !/CLAVE_PANEL\s*=\s*['"]/.test(API),
  'La clave del panel se lee del entorno y no está escrita en el código');
ok(/env\.SAL_IP/.test(API) && !/SAL_IP\s*=\s*['"]/.test(API),
  'La sal de las IP se lee del entorno');
ok(!/INSERT INTO auditoria[^)]*ip\b(?!_hash)/.test(API), 'La IP nunca se guarda en claro, solo su hash');

/* ── EL TOPE DE PREGUNTAS NO LO PONE EL SERVIDOR ──
   Cuantas preguntas hay depende del banco, que vive en el HTML. El servidor
   solo rechaza lo absurdo. Con 60 fijo, «Guias Mayores, todo el material» se
   recortaba a 60 de 523 y el recorte no se veia en ninguna parte. */
ok(!/Math\.min\(60, Math\.max\(5/.test(API),
  'El tope de preguntas ya no esta clavado en 60');
ok(/Math\.max\(5, Math\.round\(\+b\.cuantas/.test(API),
  'Pero sigue habiendo un piso y un techo, para no aceptar cualquier cosa');

/* ── LA NOTA SE VALIDA ── */
ok(/nota > total/.test(API), 'Una nota mayor que el total se rechaza');
/* MENOS DE LAS PEDIDAS ES NORMAL: la cantidad de la evaluacion es un tope y el
   examen se arma con lo que haya en el pool de esa categoria. «Menores, solo
   Daniel 1, 60 preguntas» da 30, porque no hay mas. La igualdad estricta que
   habia aqui rechazaba esa nota con un 409 y la perdia. Entregar MAS si es
   imposible, y eso se sigue rechazando. */
ok(/total > ev\.cuantas/.test(API), 'Entregar MAS preguntas que las pedidas se rechaza');
ok(!/total !== ev\.cuantas/.test(API),
  'Y entregar menos NO se rechaza: es lo que pasa cuando el material no da para tantas');

/* ── EL MIDDLEWARE NO PUBLICA LO QUE NO DEBE ── */
for (const ruta of ['migraciones', 'tools', 'tests', 'fuente', 'wrangler']) {
  ok(new RegExp(ruta).test(MID), 'El middleware bloquea /' + ruta);
}

/* ── EN VIVO ── */
async function vivo() {
  const base = 'https://conexion-biblica.pages.dev';
  const pide = async (r, o) => {
    const res = await fetch(base + r, o);
    let d = null; try { d = await res.json(); } catch (_) {}
    return { status: res.status, d };
  };
  console.log('\n── contra el sitio publicado ──');
  const est = await pide('/api/estado');
  ok(est.status === 200 && typeof est.d.practica === 'boolean', '/api/estado responde el estado');
  ok(!('semilla' in (est.d.evaluacion || {})), 'Y no trae la semilla');
  ok((await pide('/api/evaluacion')).status === 401, '/api/evaluacion sin sesión: 401');
  ok((await pide('/api/panel/evaluacion')).status === 401, '/api/panel/evaluacion sin sesión: 401');
  ok((await pide('/api/panel/participantes')).status === 401, '/api/panel/participantes sin sesión: 401');
  const mal = await pide('/api/entrar', { method: 'POST', headers: { 'content-type': 'application/json' }, body: '{"codigo":"ZZZ999"}' });
  ok(mal.status === 401, 'Un código inventado: 401');
  for (const ruta of ['/migraciones/001_base.sql', '/wrangler.toml', '/fuente/app.js', '/tests/api.js']) {
    const r = await fetch(base + ruta);
    ok(r.status === 404, 'No se sirve ' + ruta);
  }
}

/* ───────── el contrato de la forma del id de capitulo ─────────
   El servidor acepta un capitulo suelto como alcance y no conoce el catalogo,
   que vive en el HTML: valida la FORMA del id. Esa forma es un contrato entre
   los dos lados, y sin esta prueba se rompe en silencio el dia que alguien
   agregue un capitulo con otra forma: la evaluacion se abriria con alcance
   'todo' sin avisarle a nadie. */
{
  const forma = (API.match(/const FORMA_CAP = (\/.+?\/);/) || [])[1];
  ok(!!forma, 'El servidor valida la forma del id de capitulo');
  if (forma) {
    const re = eval(forma);
    const HTML = fs.readFileSync(path.join(RAIZ, 'index.html'), 'utf8');
    /* El build serializa CAPS como JSON dentro del HTML, asi que el id se lee
       de ahi y no de la fuente: se prueba lo que se despliega. Se acota al
       arreglo CAPS: los MODULOS de repaso tambien traen id y label, y esos
       nunca son alcance de una evaluacion. */
    const bloque = HTML.slice(HTML.indexOf('const CAPS = ['));
    const capsJson = bloque.slice(bloque.indexOf('['), bloque.indexOf('\n];') + 2);
    const ids = JSON.parse(capsJson).map(c => c.id);
    ok(ids.length > 40, 'Se leyeron los capitulos del index.html (' + ids.length + ')');
    const fuera = ids.filter(i => !re.test(i));
    ok(fuera.length === 0, 'Todo id de capitulo pasa la validacion del servidor' +
      (fuera.length ? ': NO pasan ' + fuera.join(', ') : ''));
    ok(!re.test('todo') && !re.test('') && !re.test('../../etc'),
      'Y la validacion no deja pasar cualquier cadena');
  }
}

/* ───────── el rango y la evaluacion dirigida a personas ─────────
   Dos invariantes que solo se ven leyendo el archivo del servidor, y que si se
   rompen no fallan: dejan una evaluacion abierta con el alcance equivocado, o
   dos aplicandole a la misma persona. */
{
  const forma = (API.match(/const FORMA_RANGO = (\/.+?\/);/) || [])[1];
  ok(!!forma, 'El servidor valida la forma del rango');
  if (forma) {
    const re = eval(forma);
    ok(re.test('m05..m12') && re.test('d1..d3') && re.test('cr10..cr20'),
      'Acepta los rangos bien formados');
    ok(!re.test('m05..d3'), 'Y RECHAZA un rango que mezcla actividades');
    ok(!re.test('m05..') && !re.test('..m12') && !re.test('m05'),
      'Y rechaza lo que no es un rango');
  }
  ok(/Number\(mr\[2\]\) <= Number\(mr\[3\]\)/.test(API),
    'Y exige que el comienzo no vaya despues del final');

  ok(/ALTER TABLE evaluacion ADD COLUMN participantes/.test(MIGR),
    'La migracion agrega la columna de participantes');
  ok(/const evalParaMi/.test(API) && /partsDeFila\(ev\)\.includes\(participanteId\)/.test(API),
    'Una evaluacion dirigida a la persona le gana a la de su categoria');
  ok(/!partsDeFila\(ev\)\.length && catsDeFila\(ev\)\.includes\(categoria\)/.test(API),
    'Y la de la categoria solo aplica si no va dirigida a nadie en particular');
  ok(/if \(nuevaP\.length\) return suyos\.some/.test(API),
    'Al abrir, una dirigida a personas solo cierra las que comparten persona');
  ok(/INSERT INTO evaluacion[\s\S]{0,200}participantes/.test(API),
    'Y la columna se guarda al abrir');
  /* La lista de «faltan» tiene que acotarse a quienes convoca: sin esto el
     panel mandaria al director a buscar a media categoria. */
  ok(/if \(suyos\.length\) \{\s*filtro = ' AND p\.id IN/.test(API),
    'Con personas, «faltan» son solo esas personas');
}

/* ───────── la revision del director ─────────
   El servidor guarda lo que respondio y lo devuelve, pero NO lo interpreta: no
   recalifica con eso, porque viene del navegador de la participante. Si algun
   dia se usa para calificar, es un agujero. */
{
  ok(/ALTER TABLE intento ADD COLUMN respuestas/.test(MIGR),
    'La migracion agrega la columna de respuestas');
  ok(/INSERT INTO intento[\s\S]{0,260}respuestas/.test(API),
    'Y se guarda al recibir el intento');
  ok(/b\.respuestas[\s\S]{0,160}slice\(0, 8000\)/.test(API),
    'Con tope de tamaño: es el unico campo libre del endpoint');
  ok(/ruta === '\/panel\/intento'/.test(API),
    'Hay un endpoint para pedir la revision de UN intento');
  /* Va aparte del listado a proposito: con veinte participantes serian veinte
     revisiones viajando en cada refresco del panel. */
  ok(!/SELECT[^;]*i\.respuestas[^;]*FROM intento i \+?\s*'JOIN participante p ON p\.id = i\.participante_id ' \+\s*'WHERE i\.evaluacion_id/.test(API),
    'Y el listado de la evaluacion NO arrastra las respuestas de todas');
  ok(/LENGTH\(i\.respuestas\) > 0 AS hay_revision/.test(API),
    'El listado solo dice si hay revision, para no ofrecer un boton vacio');
  /* La guarda de rol ya existe para todo /panel/, y esta ruta cuelga de ahi. */
  const iPanel = API.indexOf("ruta.startsWith('/panel/')");
  const iRev = API.indexOf("ruta === '/panel/intento'");
  ok(iPanel > 0 && iRev > iPanel,
    'La revision va DESPUES de la guarda de director: sin clave no se ve');
  ok(/auditar\(env, sesion\.cuenta_id, 'ver_revision'/.test(API),
    'Y queda en la auditoria quien la miro');
}

/* ───────── solo la fuente del reglamento ─────────
   Viaja en su propia columna y no como un prefijo de `alcance`: son dos
   conceptos, que parte del material entra y de que fuente sale. */
{
  ok(/ALTER TABLE evaluacion ADD COLUMN solo_fuente/.test(MIGR),
    'La migracion agrega la columna solo_fuente');
  ok(/const soloFuente = b\.solo_fuente \? 1 : 0;/.test(API),
    'El servidor la lee al abrir la evaluacion');
  ok(/INSERT INTO evaluacion[\s\S]{0,300}solo_fuente/.test(API),
    'Y la guarda');
  ok(/solo_fuente: ev\.solo_fuente \? 1 : 0/.test(API),
    'Y la devuelve en la receta, o la participante armaria otro examen');
}


/* ── LAS PREGUNTAS RETIRADAS ──
   El retiro vive en el servidor porque el banco vive en un HTML generado: sin
   esto, sacar una pregunta mala obliga a correr el generador y desplegar, y
   eso no se hace desde un celular. Lo que estas pruebas cazan es que el
   mecanismo no se salte ninguna de sus tres garantias: registro (no borra),
   reversible, y una evaluacion abierta no cambia de examen a mitad de mañana. */
ok(/CREATE TABLE IF NOT EXISTS pregunta_retirada/.test(MIGR),
  'La migracion crea la tabla de preguntas retiradas');
ok(/accion IN \('retirar','restaurar'\)/.test(MIGR),
  'Y es un registro de hechos: retirar y restaurar son filas, no un borrado');
ok(/ix_retirada_clave/.test(MIGR), 'Con su indice por clave');
ok(!/DELETE FROM pregunta_retirada/.test(API),
  'El servidor nunca borra una fila del registro: devolver es otra fila');

const posRet = API.indexOf("ruta === '/panel/retiradas'");
ok(posRet > posGuarda, 'Las rutas del revisor van DESPUES de la guarda de director');
ok(/FORMA_CLAVE\s*=\s*\//.test(API),
  'La clave de la pregunta se valida por su FORMA: el servidor no conoce el banco');
const bloqueRet = API.slice(API.indexOf('async function retiradas'),
  API.indexOf('const clavesRetiradas'));
ok(/MAX\(r2\.rowid\)/.test(bloqueRet),
  'El estado de una pregunta es su ultima fila, desempatada por rowid y no por la hora');
ok(/r2\.cuando <= \?/.test(bloqueRet),
  'Y se puede preguntar como estaba el banco a una fecha');

/* LA GARANTIA QUE MAS CUESTA VER: la receta de la evaluacion lleva las
   retiradas DE CUANDO SE ABRIO (ev.creada_en). Con las de ahora, retirar una
   pregunta a media mañana le cambia el examen a la que todavia no entra, y dos
   notas de la misma semilla dejan de ser comparables. */
const bloqueEvalRet = API.slice(API.indexOf("ruta === '/evaluacion'"), API.indexOf("ruta === '/intento'"));
ok(/clavesRetiradas\(env, ev\.creada_en\)/.test(bloqueEvalRet),
  'La receta lleva las retiradas de cuando se abrio la evaluacion, no las de ahora');
const bloqueEstadoRet = API.slice(API.indexOf("ruta === '/estado'"), API.indexOf("ruta === '/entrar'"));
ok(/retiradas: await clavesRetiradas\(env\)/.test(bloqueEstadoRet),
  'Y /estado las reparte a todos los aparatos, que es donde la app ya cachea');
ok(!/semilla/.test(bloqueEstadoRet), 'Sin que eso le meta la semilla a un endpoint publico');

/* ── EL HISTORIAL ──
   /panel/evaluacion solo hablaba de lo abierto, y de la ultima cuando no habia
   ninguna: cerrar una evaluacion la sacaba de la vista para siempre aunque sus
   notas siguieran guardadas. */
const posHist = API.indexOf("ruta === '/panel/evaluaciones'");
ok(posHist > posGuarda, 'El historial va DESPUES de la guarda de director');
const bloqueHist = API.slice(posHist, API.indexOf("ruta === '/panel/intento'"));
ok(/FROM evaluacion e ORDER BY e\.creada_en DESC/.test(bloqueHist),
  'Trae todas las evaluaciones, no solo las abiertas');
ok(/COUNT\(\*\) FROM intento/.test(bloqueHist),
  'Con cuantas notas tiene cada una, que es como se escoge cual mirar');
ok(!/i\.respuestas/.test(bloqueHist),
  'Y sin arrastrar las respuestas de todas: el detalle se pide de a una');

/* El detalle de UNA, abierta o cerrada, sale del mismo `detalle()` que ya usa
   el panel. Dos formatos para lo mismo se separan al primer cambio. */
const bloqueEvalGet = API.slice(API.indexOf("metodo === 'GET' && ruta === '/panel/evaluacion'"), posHist);
ok(/searchParams\.get\('id'\)/.test(bloqueEvalGet),
  'Se puede pedir UNA evaluacion por id, este abierta o cerrada');
ok(/await detalle\(ev\)/.test(bloqueEvalGet),
  'Y reusa el mismo detalle, no una consulta paralela');

/* Una nota suelta tiene que decir de que evaluacion era, o la vista por
   participante no puede armar la linea de cada una. */
const bloqueIntentos = API.slice(API.indexOf("ruta === '/panel/intentos'"));
ok(/i\.evaluacion_id/.test(bloqueIntentos) && /e\.titulo AS evaluacion/.test(bloqueIntentos),
  'Cada nota del historial dice a que evaluacion pertenece');


/* ── EL PROGRESO: INVARIANTES Y LA FUSION DE VERDAD ────────────────────
   Esta es la unica regla del servidor que no se ve mirando la forma del
   archivo: si la fusion esta mal, nadie pierde una sesion ni ve lo que no
   debe, pero una nina pierde lo que estudio. Y es una funcion pura, asi que se
   saca del archivo y se corre. No hace falta simular D1. */
ok(API.indexOf("ruta === '/progreso'") > API.indexOf('const sesion = await sesionActual'),
  'El progreso se atiende DESPUES de la guarda de sesion');
ok(/ruta === '\/progreso'[\s\S]{0,300}sesion\.rol !== 'participante'/.test(API),
  'Y exige rol participante: la ficha de una nina no la toca el director');
ok(/INSERT INTO progreso[\s\S]{0,260}\.bind\(/.test(API),
  'La ficha viaja por bind(), nunca concatenada al SQL');
ok(/CREATE TABLE IF NOT EXISTS progreso[\s\S]{0,500}participante_id TEXT PRIMARY KEY/.test(MIGR),
  'La migracion crea progreso con una fila por participante');
ok(/fundida\.nombre = p\.nombre/.test(API) && /fundida\.cat = p\.categoria/.test(API),
  'El nombre y la categoria los manda participante, no la ficha del aparato');

{
  const desde = API.indexOf('const may = (a, b)');
  const hasta = API.indexOf("if (metodo === 'POST' && ruta === '/progreso')");
  ok(desde > 0 && hasta > desde, 'El bloque de fusion se puede aislar del archivo');
  const fusiona = new Function(API.slice(desde, hasta) + '; return fusionaFicha;')();

  const A = { prog:{d1:80,d2:10}, racha:5, ultimo:'2026-09-20', insignias:['a'],
              fq:{q1:{m:3}}, fv:{t1:100}, ft:{t1:2}, acc:{d1:{b:10,m:2}},
              examenes:[{fecha:'2026-09-01',modo:'normal',pts:9,total:15,cat:'av'}],
              links:{L1:{pts:null,total:10}} };
  const B = { prog:{d1:40,d3:60}, racha:2, ultimo:'2026-09-21', insignias:['b'],
              fq:{q1:{m:1},q2:{m:4}}, fv:{t1:104}, ft:{t1:0}, acc:{d1:{b:3,m:9}},
              examenes:[{fecha:'2026-09-05',modo:'evaluacion',pts:12,total:15,cat:'av'}],
              links:{L1:{pts:7,total:10}} };
  const F = fusiona(A, B);

  ok(F.prog.d1 === 80 && F.prog.d3 === 60,
    'Lo leido gana el porcentaje mayor y no se pierde lo que solo tenia un aparato');
  ok(F.racha === 5, 'La racha gana la mayor');
  ok(F.ultimo === '2026-09-21', 'El ultimo dia gana el mas reciente');
  ok(F.fq.q1.m === 3 && F.fq.q2.m === 4, 'Las falladas ganan el conteo mayor');
  ok(F.acc.d1.b === 10 && F.acc.d1.m === 9,
    'Los aciertos por capitulo se toman al mayor, campo por campo');
  ok(F.insignias.length === 2, 'Las insignias son union');
  ok(F.examenes.length === 2, 'Los examenes son union');
  ok(F.ft.t1 === 0 && F.fv.t1 === 104,
    'La caja de repaso viaja con su fecha: gana la del aparato que la vio mas tarde');
  ok(F.links.L1.pts === 7, 'Un examen con nota le gana a uno abierto: null no es cero');

  const G = fusiona(B, A);
  ok(G.prog.d1 === 80 && G.racha === 5 && G.fq.q2.m === 4,
    'Fundir al reves da lo mismo: el orden de los celulares no cambia el resultado');
  const H = fusiona(F, B);
  ok(H.prog.d1 === 80 && H.racha === 5 && H.examenes.length === 2,
    'Volver a fundir no cambia nada: subir dos veces no duplica ni degrada');
  const P = fusiona(null, B);
  ok(P.prog.d3 === 60 && P.examenes.length === 1,
    'La primera sincronizacion, sin ficha guardada, conserva lo del aparato');
}


/* ── EDITAR UN PARTICIPANTE NO PUEDE TOCAR SU CODIGO ─────────────────
   El codigo es la identidad: con el estan hechas la cuenta, la sesion abierta
   en el celular de la nina y su progreso. Si una correccion de tilde se lo
   cambiara, la sacaria de la app y le esconderia lo que estudio. */
{
  const i = API.indexOf("ruta.endsWith('/editar')");
  ok(i > 0, 'Existe la ruta de editar participante');
  ok(i > API.indexOf("ruta.startsWith('/panel/')"),
    'Y va DESPUES de la guarda de director');
  const bloque = API.slice(i, i + 1400);
  ok(/UPDATE participante SET nombre = \?, categoria = \?/.test(bloque),
    'Editar cambia solo el nombre y la categoria');
  ok(!/codigo/.test(bloque.slice(0, bloque.indexOf('auditar'))),
    'El codigo no se menciona siquiera en el bloque de editar');
  ok(/\.bind\(nombre, categoria, pid\)/.test(bloque),
    'Y los tres valores viajan por bind()');
  ok(/CATS_VALIDAS\.includes\(b\.categoria\)/.test(bloque),
    'La categoria se valida contra la lista, no se acepta cualquiera');
}


(async () => {
  if (process.argv.includes('--vivo')) {
    try { await vivo(); } catch (e) { ok(false, 'Las pruebas en vivo no corrieron: ' + e.message); }
  }
  console.log('\n' + (f === 0 ? 'API: TODO BIEN' : f + ' FALLOS'));
  process.exit(f ? 1 : 0);
})();
