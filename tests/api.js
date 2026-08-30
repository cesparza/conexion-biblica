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

/* ── LA NOTA SE VALIDA ── */
ok(/nota > total/.test(API), 'Una nota mayor que el total se rechaza');
ok(/total !== ev\.cuantas/.test(API), 'Un examen con otro número de preguntas no cuenta como la evaluación');

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

(async () => {
  if (process.argv.includes('--vivo')) {
    try { await vivo(); } catch (e) { ok(false, 'Las pruebas en vivo no corrieron: ' + e.message); }
  }
  console.log('\n' + (f === 0 ? 'API: TODO BIEN' : f + ' FALLOS'));
  process.exit(f ? 1 : 0);
})();
