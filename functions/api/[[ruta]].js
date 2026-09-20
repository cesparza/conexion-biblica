/**
 * Conexión Bíblica — API.
 *
 * MECANISMO, Y ES EL PUNTO DE TODO ESTE ARCHIVO
 * Hasta v19 el cierre de los exámenes vivía en el localStorage de cada celular.
 * localStorage es por origen y por navegador: ningún aparato puede preguntarle
 * nada a otro, así que cerrar era un acto que había que repetir celular por
 * celular, y borrar los datos del navegador lo abría. Aquí el estado se mueve a
 * un lugar que todos los aparatos comparten: una fila en D1. La app ya no
 * decide si puede arrancar un examen, lo PREGUNTA.
 *
 * Cloudflare Pages Functions. Un binding: env.DB (D1).
 * Secretos: CLAVE_PANEL (clave del director), SAL_IP (sal para hashear IP).
 */

const COOKIE = 'cb-sesion';
const DIAS_PARTICIPANTE = 60;  // el estudio son siete semanas: no puede vencerse en medio
const DIAS_DIRECTOR = 30;

/* Alfabeto del código: sin 0/O, sin 1/I/L. Una niña de siete años lo copia de un
   papel y el director lo dicta en voz alta; un cero que se lee como o cuesta más
   que los tres bits de entropía que se pierden. */
const ALFABETO = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';

const json = (data, status = 200, headers = {}) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'private, no-store', ...headers },
  });

const error = (msg, status = 400, extra = {}) => json({ error: msg, ...extra }, status);
const id = () => crypto.randomUUID();

async function hashIp(ip, sal) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode((sal || 'sal') + ':' + (ip || '')));
  return [...new Uint8Array(buf)].slice(0, 12).map(b => b.toString(16).padStart(2, '0')).join('');
}

/** El código se compara sin guiones, sin espacios y en mayúsculas. */
const normCodigo = c => String(c || '').toUpperCase().replace(/[^A-Z0-9]/g, '');

function codigoNuevo() {
  const b = new Uint8Array(6);
  crypto.getRandomValues(b);
  return [...b].map(x => ALFABETO[x % ALFABETO.length]).join('');
}

/** Quita caracteres de control y recorta. El escapado de HTML se hace al pintar. */
const CTRL = new RegExp('[\\u0000-\\u001F\\u007F]', 'g');
const limpiar = (s, max = 40) =>
  s == null ? null : (String(s).replace(CTRL, '').trim().slice(0, max) || null);

async function auditar(env, cuentaId, accion, tabla, registroId, ipHash) {
  try {
    await env.DB.prepare(
      'INSERT INTO auditoria (cuenta_id, accion, tabla, registro_id, ip_hash) VALUES (?,?,?,?,?)'
    ).bind(cuentaId, accion, tabla, registroId, ipHash).run();
  } catch (_) { /* la auditoría nunca debe tumbar la operación */ }
}

function leerCookie(req, nombre) {
  const c = req.headers.get('cookie') || '';
  const m = c.match(new RegExp('(?:^|;\\s*)' + nombre + '=([^;]+)'));
  return m ? decodeURIComponent(m[1]) : null;
}

function cookieSesion(token, dias, borrar = false) {
  const base = COOKIE + '=' + (borrar ? '' : encodeURIComponent(token)) + '; Path=/; HttpOnly; Secure; SameSite=Lax';
  return borrar ? base + '; Max-Age=0' : base + '; Max-Age=' + dias * 86400;
}

async function sesionActual(request, env) {
  const token = leerCookie(request, COOKIE);
  if (!token) return null;
  const row = await env.DB.prepare(
    'SELECT s.token, s.cuenta_id, c.rol, c.persona_id FROM sesion s JOIN cuenta c ON c.id = s.cuenta_id ' +
    "WHERE s.token = ? AND s.expira_en > datetime('now')"
  ).bind(token).first();
  return row || null;
}

async function crearSesion(env, cuentaId, dias, ipHash) {
  await env.DB.prepare("DELETE FROM sesion WHERE expira_en < datetime('now')").run();
  /* Higiene: la auditoría existe para revisar lo reciente, no para acumular
     años. Se purga al entrar, que es cuando ya se está escribiendo igual. */
  await env.DB.prepare("DELETE FROM auditoria WHERE cuando < datetime('now', '-180 days')").run();
  const token = crypto.randomUUID() + crypto.randomUUID().replace(/-/g, '');
  await env.DB.prepare(
    "INSERT INTO sesion (token, cuenta_id, expira_en, ip_hash) VALUES (?,?, datetime('now', ?), ?)"
  ).bind(token, cuentaId, '+' + dias + ' days', ipHash).run();
  await env.DB.prepare("UPDATE cuenta SET ultimo_acceso = datetime('now') WHERE id = ?").bind(cuentaId).run();
  return token;
}

/* Las categorias que el servidor acepta. Las seis primeras son las que ya
   estan en la base: hay 7 participantes creadas con `me`, `av` y `pa`, asi
   que NINGUNA se quita nunca de esta lista o esas filas quedarian
   invalidas. `ec1` y `ec2` son las de «En esto creemos», que paso a ser una
   actividad con sus propias categorias en vez de colgarse de `pa` y `gm`. */
const CATS_VALIDAS = ['me','av','pa','gm','dm1','dm2','ec1','ec2'];

/* Antes esto traía UNA sola fila (LIMIT 1): solo podía existir una
   evaluación abierta a la vez en toda la app. Camilo necesita un caso real:
   Guías Mayores, Aventureros y Devoción Matutina corriendo su propia
   evaluación el mismo rato. Ahora puede haber varias abiertas a la vez, y lo
   único que se protege es que dos abiertas NUNCA compartan categoría — así
   una participante nunca queda con dos evaluaciones aplicándole al tiempo,
   que sería ambiguo (¿cuál le corresponde?). */
const evaluacionesAbiertas = async env => {
  const { results } = await env.DB.prepare(
    'SELECT * FROM evaluacion WHERE abierta = 1 ORDER BY creada_en DESC'
  ).all();
  return results || [];
};

/* El conjunto real de categorías de una fila: '*' se expande a las ocho, para
   poder comparar por intersección sin tratar '*' como un caso aparte. */
const catsDeFila = ev => {
  const c = ev && ev.categorias ? ev.categorias : '*';
  return c === '*' ? CATS_VALIDAS : c.split(',');
};

/* A quiénes va dirigida, cuando va dirigida a personas y no a una categoría
   entera. Vacío = va por categoría, que es como funcionaba antes de la 007. */
const partsDeFila = ev => {
  const p = (ev && ev.participantes) ? String(ev.participantes) : '';
  return p ? p.split(',').filter(Boolean) : [];
};

/* LA REGLA QUE QUITA LA AMBIGÜEDAD: una evaluación dirigida a personas le gana
   a una dirigida a su categoría. Así el director puede tener «toda la matutina,
   del 1 al 15» abierta y encima «Camila, del 16 al 20», sin cerrarle la primera
   al resto del grupo. Sin precedencia habría dos aplicándole a Camila y no
   habría forma de saber cuál. */
const evalParaMi = (abiertas, participanteId, categoria) =>
  abiertas.find(ev => partsDeFila(ev).includes(participanteId)) ||
  abiertas.find(ev => !partsDeFila(ev).length && catsDeFila(ev).includes(categoria));

/* Semilla del examen. La genera el SERVIDOR, nunca el aparato del director: así
   el examen es idéntico para todas y nadie puede adivinarlo antes de tiempo. */
const semillaNueva = () => {
  const b = new Uint32Array(2);
  crypto.getRandomValues(b);
  return String(b[0]) + String(b[1] % 100000);
};

/* ───────── LAS PREGUNTAS RETIRADAS DEL BANCO ─────────
   El banco vive en el HTML generado, así que el servidor no sabe qué
   preguntas existen: guarda un REGISTRO DE HECHOS sobre claves. Cada retiro y
   cada devolución es una fila; el estado de una pregunta es su última fila.

   La forma de la clave es un contrato con la app, igual que el de `alcance`:
   capítulo (d1, pr39, m05, cr10) + punto + el hash del enunciado en base 36.
   Se valida la forma, nunca la existencia. */
const FORMA_CLAVE = /^[a-z]{1,3}[0-9]{1,2}\.[0-9a-z]{1,10}$/;

/* La última fila de cada clave, opcionalmente A UNA FECHA.
   `corte` es lo que mantiene idéntica una evaluación ya abierta: se le
   pregunta al registro cómo estaba el banco cuando esa evaluación se creó, así
   que retirar una pregunta a mitad de mañana no le cambia el examen a la que
   todavía no lo ha hecho. Sin corte, el estado de ahora mismo.

   El desempate es `rowid` y no la hora: `cuando` tiene resolución de segundo y
   dos acciones seguidas sobre la misma clave caben en el mismo segundo. El
   rowid siempre crece. */
async function retiradas(env, corte) {
  const sql = corte
    ? 'SELECT r.clave, r.quien, r.motivo, r.cuando FROM pregunta_retirada r ' +
      "WHERE r.accion = 'retirar' AND r.cuando <= ? AND r.rowid = " +
      '(SELECT MAX(r2.rowid) FROM pregunta_retirada r2 WHERE r2.clave = r.clave AND r2.cuando <= ?) ' +
      'ORDER BY r.cuando DESC'
    : 'SELECT r.clave, r.quien, r.motivo, r.cuando FROM pregunta_retirada r ' +
      "WHERE r.accion = 'retirar' AND r.rowid = " +
      '(SELECT MAX(r2.rowid) FROM pregunta_retirada r2 WHERE r2.clave = r.clave) ' +
      'ORDER BY r.cuando DESC';
  const st = env.DB.prepare(sql);
  const { results } = await (corte ? st.bind(corte, corte) : st).all();
  return results || [];
}

/** Solo las claves: es lo que necesita quien arma un examen. */
const clavesRetiradas = async (env, corte) => (await retiradas(env, corte)).map(r => r.clave);

/**
 * Límite de intentos de código por IP.
 * NO bajarlo: el día del evento todos están en el mismo wifi y salen por UNA
 * sola IP. Un límite bajo bloquea a niñas legítimas en plena fila.
 */
async function demasiadosIntentos(env, ipHash) {
  const r = await env.DB.prepare(
    "SELECT COUNT(*) AS n FROM auditoria WHERE ip_hash = ? AND accion = 'codigo_malo' " +
    "AND cuando > datetime('now', '-15 minutes')"
  ).bind(ipHash).first();
  return !!r && r.n >= 40;
}

export async function onRequest(context) {
  const { request, env, params } = context;
  const ruta = '/' + (Array.isArray(params.ruta) ? params.ruta.join('/') : params.ruta || '');
  const metodo = request.method;
  const ipHash = await hashIp(request.headers.get('cf-connecting-ip') || '', env.SAL_IP);

  try {
    // ─────────────────────────────────────── público: el interruptor
    /* El endpoint más importante de la app. Sin caché a propósito: si el
       director cierra los exámenes la noche antes, no puede quedar un edge
       sirviendo "abierto" diez minutos más. */
    /* UNA SOLA PERILLA, y es el cambio que quita la confusión.
       Antes había dos interruptores (uno por aparato y uno global) más el link.
       Ahora hay un solo estado: o hay una evaluación abierta, o no la hay.
       Con evaluación abierta la práctica se cierra sola; al cerrarla, vuelve.
       El detalle del examen NO viaja aquí: este endpoint es público. */
    if (metodo === 'GET' && ruta === '/estado') {
      const abiertas = await evaluacionesAbiertas(env);
      /* Si TODAS las evaluaciones abiertas están dirigidas a unas categorías
         nada más, este endpoint público no puede cerrarle la práctica a todo
         el mundo: quien no está invitada en ninguna sigue practicando. Para
         las invitadas, /evaluacion (que sí sabe quién es) cierra la práctica
         en su aparato. Solo se cierra para todos cuando ALGUNA abierta es
         para todas las categorías. */
      const algunaParaTodas = abiertas.some(ev =>
        !partsDeFila(ev).length && (ev.categorias || '*') === '*');
      /* LAS RETIRADAS VIAJAN AQUÍ, y no por una ruta propia, porque este
         endpoint ya es el que todos los aparatos consultan al arrancar y antes
         de cada examen: la app las cachea igual que cachea qué hay abierto, y
         sin señal sigue filtrando con lo último que supo. Son claves — el
         mismo hash del enunciado que ya está en el HTML público —, así que no
         revelan nada que no se pueda leer en el artefacto. */
      return json({
        practica: !algunaParaTodas,
        evaluaciones: abiertas.map(ev => ({
          id: ev.id, titulo: ev.titulo, paraTodas: (ev.categorias || '*') === '*',
        })),
        retiradas: await clavesRetiradas(env),
        hora: new Date().toISOString(),
      });
    }

    // ─────────────────────────────────────── entrar con el código
    if (metodo === 'POST' && ruta === '/entrar') {
      const cuerpo = await request.json().catch(() => ({}));
      const c = normCodigo(cuerpo.codigo);
      if (c.length !== 6) return error('El código son 6 letras y números.', 400);
      if (await demasiadosIntentos(env, ipHash)) {
        return error('Demasiados intentos desde esta conexión. Espera 15 minutos.', 429);
      }
      const p = await env.DB.prepare(
        'SELECT id, nombre, categoria FROM participante WHERE codigo = ? AND borrado_en IS NULL'
      ).bind(c).first();
      if (!p) {
        await new Promise(r => setTimeout(r, 400));
        await auditar(env, null, 'codigo_malo', 'participante', null, ipHash);
        return error('Ese código no existe. Pídeselo al director del club.', 401);
      }
      let cuenta = await env.DB.prepare(
        "SELECT id FROM cuenta WHERE proveedor = 'codigo' AND sub_proveedor = ?"
      ).bind(c).first();
      if (!cuenta) {
        const cid = id();
        await env.DB.prepare(
          "INSERT INTO cuenta (id, persona_id, proveedor, sub_proveedor, rol) VALUES (?,?, 'codigo', ?, 'participante')"
        ).bind(cid, p.id, c).run();
        cuenta = { id: cid };
      }
      const token = await crearSesion(env, cuenta.id, DIAS_PARTICIPANTE, ipHash);
      await auditar(env, cuenta.id, 'entrar', 'participante', p.id, ipHash);
      return json({ nombre: p.nombre, categoria: p.categoria, rol: 'participante' },
        200, { 'set-cookie': cookieSesion(token, DIAS_PARTICIPANTE) });
    }

    if (metodo === 'POST' && ruta === '/panel/entrar') {
      const cuerpo = await request.json().catch(() => ({}));
      if (!env.CLAVE_PANEL || String(cuerpo.clave || '').trim() !== env.CLAVE_PANEL) {
        await new Promise(r => setTimeout(r, 400));
        await auditar(env, null, 'codigo_malo', 'cuenta', null, ipHash);
        return error('Esa clave no es la del director.', 401);
      }
      let cuenta = await env.DB.prepare(
        "SELECT id FROM cuenta WHERE proveedor = 'clave-panel' AND sub_proveedor = 'director'"
      ).first();
      if (!cuenta) {
        const cid = id();
        await env.DB.prepare(
          "INSERT INTO cuenta (id, persona_id, proveedor, sub_proveedor, rol) " +
          "VALUES (?, NULL, 'clave-panel', 'director', 'director')"
        ).bind(cid).run();
        cuenta = { id: cid };
      }
      const token = await crearSesion(env, cuenta.id, DIAS_DIRECTOR, ipHash);
      await auditar(env, cuenta.id, 'entrar_director', 'sesion', token.slice(0, 8), ipHash);
      return json({ rol: 'director' }, 200, { 'set-cookie': cookieSesion(token, DIAS_DIRECTOR) });
    }

    if (metodo === 'POST' && ruta === '/salir') {
      const s = await sesionActual(request, env);
      if (s) await env.DB.prepare('DELETE FROM sesion WHERE token = ?').bind(s.token).run();
      return json({ ok: true }, 200, { 'set-cookie': cookieSesion('', 1, true) });
    }

    // ─────────────────────────────────────── de aquí abajo, con sesión
    const sesion = await sesionActual(request, env);

    if (metodo === 'GET' && ruta === '/yo') {
      if (!sesion) return json({ rol: null });
      if (sesion.rol === 'director') return json({ rol: 'director' });
      const p = await env.DB.prepare(
        'SELECT nombre, categoria FROM participante WHERE id = ? AND borrado_en IS NULL'
      ).bind(sesion.persona_id).first();
      if (!p) return json({ rol: null });
      return json({ rol: 'participante', nombre: p.nombre, categoria: p.categoria });
    }

    /* La receta del examen SOLO se entrega a una participante con sesión. Si
       viajara en /estado, que es público, cualquiera podría precalcular las
       preguntas antes de que se abra. */
    if (metodo === 'GET' && ruta === '/evaluacion') {
      if (!sesion || sesion.rol !== 'participante') return error('Entra con tu código primero.', 401);
      const abiertas = await evaluacionesAbiertas(env);
      const yo = await env.DB.prepare('SELECT categoria FROM participante WHERE id = ?')
        .bind(sesion.persona_id).first();
      /* Puede haber varias evaluaciones abiertas a la vez, pero nunca dos que
         le apliquen a la MISMA persona: /panel/evaluacion lo garantiza al
         abrir, y evalParaMi resuelve el único cruce permitido, que es una
         dirigida a ella encima de una dirigida a su categoría. */
      const ev = evalParaMi(abiertas, sesion.persona_id, yo && yo.categoria);
      if (!ev) {
        /* Si hay evaluaciones abiertas pero ninguna es para su categoría, para
           ella es como si no existiera: no la ve y su práctica sigue abierta. */
        return json({ evaluacion: null, noMeToca: abiertas.length > 0 });
      }
      const hecho = await env.DB.prepare(
        'SELECT nota, total FROM intento WHERE participante_id = ? AND evaluacion_id = ?'
      ).bind(sesion.persona_id, ev.id).first();
      /* LAS RETIRADAS QUE VAN EN LA RECETA SON LAS DE CUANDO SE ABRIÓ, no las
         de ahora. La evaluación tiene que salir IDÉNTICA para todas: el examen
         se arma en el navegador con la semilla del servidor sobre el banco
         menos las retiradas, así que si esa lista cambiara a mitad de mañana,
         la que entra después armaría otro examen con la misma semilla y el
         director estaría comparando notas de exámenes distintos. */
      return json({ evaluacion: {
        id: ev.id, titulo: ev.titulo, alcance: ev.alcance,
        cuantas: ev.cuantas, nivel: ev.nivel, semilla: ev.semilla,
        solo_fuente: ev.solo_fuente ? 1 : 0,
        retiradas: await clavesRetiradas(env, ev.creada_en),
      }, hecha: !!hecho, nota: hecho ? hecho.nota : null, total: hecho ? hecho.total : null });
    }

    if (metodo === 'POST' && ruta === '/intento') {
      if (!sesion || sesion.rol !== 'participante') return error('Entra con tu código primero.', 401);
      const b = await request.json().catch(() => ({}));
      const modo = limpiar(b.modo, 20) || 'normal';
      const semilla = limpiar(b.semilla, 40);
      const evalId = limpiar(b.evaluacion_id, 60);
      const nota = Number.isFinite(+b.nota) ? Math.round(+b.nota) : null;
      const total = Number.isFinite(+b.total) ? Math.round(+b.total) : null;
      const idem = limpiar(b.idempotency_key, 60);
      /* LO QUE RESPONDIÓ. El servidor no lo interpreta: lo guarda como texto y
         lo devuelve tal cual al panel, que es quien sabe leerlo. Se acota el
         tamaño porque es lo único de este endpoint que no tiene forma fija, y
         un campo libre sin tope es una puerta abierta a llenar la base. */
      const respuestas = typeof b.respuestas === 'string'
        ? b.respuestas.slice(0, 8000)
        : (b.respuestas ? JSON.stringify(b.respuestas).slice(0, 8000) : '');
      /* Idempotencia: un reintento de red no guarda la misma nota dos veces. */
      if (idem) {
        const ya = await env.DB.prepare('SELECT id FROM intento WHERE idempotency_key = ?').bind(idem).first();
        if (ya) return json({ ok: true, repetido: true });
      }
      /* La evaluación se hace UNA vez por PERSONA, en el aparato que sea. Eso
         es lo que la versión con links no podía garantizar. */
      if (evalId) {
        const hecho = await env.DB.prepare(
          'SELECT id FROM intento WHERE participante_id = ? AND evaluacion_id = ?'
        ).bind(sesion.persona_id, evalId).first();
        if (hecho) return error('Esa evaluación ya la hiciste.', 409, { ya_hecho: true });
      }
      /* LA NOTA LA CALCULA EL APARATO, ASÍ QUE AL MENOS SE VALIDA SU FORMA.
         El servidor no ve las respuestas (el examen corre en el navegador para
         que se pueda estudiar sin señal), así que no puede recalificar. Lo que
         sí puede es rechazar lo imposible: una nota mayor que el total, un
         total que no es el que la evaluación pidió, o números negativos. Eso
         convierte el caso trivial en uno deliberado, y deja rastro. */
      if (nota == null || total == null || nota < 0 || total <= 0 || nota > total) {
        return error('Nota inválida.', 400);
      }
      if (evalId) {
        const ev = await env.DB.prepare('SELECT cuantas, abierta FROM evaluacion WHERE id = ?')
          .bind(evalId).first();
        if (!ev) return error('Esa evaluación no existe.', 404);
        /* MENOS DE LAS PEDIDAS ES NORMAL, MAS NO.
           La cantidad de la evaluacion es un tope, no una promesa: el examen se
           arma con lo que haya en el pool de ESA categoria. «Menores, solo
           Daniel 1, 60 preguntas» da un examen de 30, porque no hay mas.
           Con la igualdad estricta que habia aqui, esa nota se rechazaba con un
           409 y se perdia: la niña presentaba y el director no la veia nunca.
           Entregar MAS de lo pedido si es imposible, y por eso se rechaza. */
        if (total > ev.cuantas) {
          await auditar(env, sesion.cuenta_id, 'intento_raro', 'intento', evalId, ipHash);
          return error('El examen entregado no coincide con la evaluación.', 409);
        }
      }
      await env.DB.prepare(
        'INSERT INTO intento (id, participante_id, modo, semilla, nota, total, idempotency_key, evaluacion_id, respuestas) ' +
        'VALUES (?,?,?,?,?,?,?,?,?)'
      ).bind(id(), sesion.persona_id, modo, semilla, nota, total, idem, evalId, respuestas).run();
      return json({ ok: true });
    }

    // ─────────────────────────────────────── panel del director
    if (ruta.startsWith('/panel/') && (!sesion || sesion.rol !== 'director')) {
      return error('Necesitas entrar como director.', 401);
    }

    /* Abrir una evaluación: se cierra cualquier otra, se genera la semilla en el
       servidor y con eso la práctica queda cerrada sola. Un solo acto. */
    if (metodo === 'POST' && ruta === '/panel/evaluacion') {
      const b = await request.json().catch(() => ({}));
      const titulo = limpiar(b.titulo, 60) || 'Evaluación del día';
      /* El alcance decide QUÉ material se evalúa, así que tiene que ser uno de
         los que la app sabe armar. Con una cadena libre, una evaluación queda
         abierta y sin preguntas posibles: el director la ve abierta y las
         participantes no reciben nada.
         Además de los grupos, se acepta UN CAPÍTULO suelto (Daniel 2, la
         creencia 14, el día 7 de la matutina). El servidor no conoce el
         catálogo de capítulos, que vive en el HTML, así que valida la FORMA
         del id. Esa forma es un contrato entre los dos lados y hay una prueba
         que exige que todo id de CAPS la cumpla: si alguien inventa un id con
         otra forma, la prueba falla aquí y no en el campamento. */
      const ALCANCES = ['todo', 'creencias', 'biblia', 'pr', 'q1', 'q2'];
      const FORMA_CAP = /^(d[0-9]{1,2}|pr[0-9]{2}|m[0-9]{2}|cr[0-9]{2})$/;
      /* Un RANGO: «desde..hasta» con dos ids del mismo tipo, y el de la
         izquierda no mayor que el de la derecha. El backreference \1 es lo que
         impide `m05..d3`, que no es un rango de nada y dejaría la evaluación
         sin una sola pregunta. */
      const FORMA_RANGO = /^([a-z]{1,2})([0-9]{1,2})\.\.\1([0-9]{1,2})$/;
      const pedido = limpiar(b.alcance, 20);
      const mr = FORMA_RANGO.exec(pedido);
      const rangoOk = !!mr && Number(mr[2]) <= Number(mr[3]);
      const alcance = (ALCANCES.includes(pedido) || FORMA_CAP.test(pedido) || rangoOk) ? pedido : 'todo';
      /* EL TOPE REAL LO SABE LA APP, NO EL SERVIDOR: depende de cuantas
         preguntas tiene el banco con ese material, y el banco vive en el HTML.
         Aqui solo se rechaza lo absurdo. Estaba en 60, que es menos que el
         material de cualquier categoria (Guias Mayores tiene 523 con todo el
         material), asi que «todas» era imposible de pedir y el recorte no se
         veia en ninguna parte.
         Pedir de mas no rompe nada: armar() entrega lo que haya. */
      const cuantas = Math.min(1500, Math.max(5, Math.round(+b.cuantas || 15)));
      const nivel = [0, 1, 2, 3].includes(+b.nivel) ? +b.nivel : 0;
      /* Solo la fuente que el reglamento nombra. Columna propia y no un
         prefijo en `alcance`: son dos conceptos, qué parte del material y de
         qué fuente. */
      const soloFuente = b.solo_fuente ? 1 : 0;
      /* A quién le toca. Una lista de categorías, o '*' para todas. Sin esto el
         director no puede evaluar solo a matutina, o solo a las de 4 a 6. */
      const pedidas = Array.isArray(b.categorias) ? b.categorias
        : String(b.categorias || '').split(',');
      const limpias = pedidas.map(x => String(x).trim()).filter(x => CATS_VALIDAS.includes(x));
      const categorias = (!limpias.length || limpias.length === CATS_VALIDAS.length) ? '*' : limpias.join(',');
      /* A QUIÉNES, EN DOS NIVELES.
         Si vienen participantes, la evaluación va dirigida a esas personas y las
         categorías dejan de decidir. Es lo que permite «Camila del 1 al 10» y
         «Daniel del 11 al 20» abiertas al mismo tiempo, siendo los dos de la
         misma categoría: antes eso era imposible, porque el único nivel era la
         categoría y dos abiertas no podían compartirla. */
      const pedidosP = Array.isArray(b.participantes) ? b.participantes
        : String(b.participantes || '').split(',');
      const idsP = [...new Set(pedidosP.map(x => String(x).trim()).filter(Boolean))].slice(0, 60);
      let participantes = '';
      if (idsP.length) {
        /* Solo ids que existen y no están borrados: una lista con basura dejaría
           una evaluación abierta que no le toca a nadie, y el director la vería
           abierta esperando notas que nunca llegan. */
        const marcas = idsP.map(() => '?').join(',');
        const { results } = await env.DB.prepare(
          'SELECT id FROM participante WHERE borrado_en IS NULL AND id IN (' + marcas + ')'
        ).bind(...idsP).all();
        participantes = (results || []).map(r => r.id).join(',');
        if (!participantes) return error('Ninguno de esos participantes existe.', 400);
      }

      /* QUÉ SE CIERRA AL ABRIR ESTA.
         Nunca pueden quedar dos abiertas que le apliquen a la misma persona, y
         la precedencia (persona le gana a categoría) resuelve el único cruce
         entre niveles. Así que solo se cierra lo que choca EN SU MISMO NIVEL:
         - dirigida a personas: las otras dirigidas a personas que compartan
           alguna. La de la categoría se queda, y sigue valiendo para el resto.
         - dirigida a categorías: las otras dirigidas a categorías que compartan
           alguna, como venía siendo. Las dirigidas a personas no se tocan: esas
           le ganan y ya estaban resueltas. */
      const catsNuevas = categorias === '*' ? CATS_VALIDAS : categorias.split(',');
      const nuevaP = participantes ? participantes.split(',') : [];
      const abiertas = await evaluacionesAbiertas(env);
      const solapadas = abiertas.filter(ev => {
        const suyos = partsDeFila(ev);
        if (nuevaP.length) return suyos.some(x => nuevaP.includes(x));
        return !suyos.length && catsDeFila(ev).some(c => catsNuevas.includes(c));
      });
      for (const ev of solapadas) {
        await env.DB.prepare(
          "UPDATE evaluacion SET abierta = 0, cerrada_en = datetime('now') WHERE id = ?"
        ).bind(ev.id).run();
      }
      const eid = id();
      await env.DB.prepare(
        'INSERT INTO evaluacion (id, titulo, alcance, cuantas, nivel, semilla, huella, categorias, participantes, solo_fuente, abierta) ' +
        'VALUES (?,?,?,?,?,?,?,?,?,?,1)'
      ).bind(eid, titulo, alcance, cuantas, nivel, semillaNueva(), limpiar(b.huella, 40), categorias, participantes, soloFuente).run();
      await auditar(env, sesion.cuenta_id, 'abrir_evaluacion', 'evaluacion', eid, ipHash);
      return json({
        ok: true, id: eid,
        cerradas: solapadas.map(ev => ({ id: ev.id, titulo: ev.titulo })),
      });
    }

    if (metodo === 'POST' && ruta === '/panel/evaluacion/cerrar') {
      /* Ahora puede haber varias abiertas a la vez, así que cerrar SIEMPRE
         necesita saber CUÁL: ya no existe "la" evaluación abierta. Sin id no
         hay ambigüedad que adivinar, se rechaza. */
      const b = await request.json().catch(() => ({}));
      const evalId = limpiar(b.id, 60);
      if (!evalId) return error('Falta indicar cuál evaluación cerrar.', 400);
      const existe = await env.DB.prepare(
        'SELECT id FROM evaluacion WHERE id = ? AND abierta = 1'
      ).bind(evalId).first();
      if (!existe) return error('Esa evaluación ya no estaba abierta.', 404);
      await env.DB.prepare(
        "UPDATE evaluacion SET abierta = 0, cerrada_en = datetime('now') WHERE id = ?"
      ).bind(evalId).run();
      await auditar(env, sesion.cuenta_id, 'cerrar_evaluacion', 'evaluacion', evalId, ipHash);
      return json({ ok: true });
    }

    /* Lo que el director mira mientras corre: quién ya la hizo, con qué nota, y
       sobre todo QUIÉN FALTA, que es el dato que sirve para ir a buscarla. */
    if (metodo === 'GET' && ruta === '/panel/evaluacion') {
      /* Quién la hizo y quién falta, POR evaluación: con varias abiertas a la
         vez, "faltan" solo tiene sentido dentro de las categorías a las que
         CADA UNA convoca (Aventureros no "falta" en la evaluación de Guías). */
      const detalle = async ev => {
        const { results: hechas } = await env.DB.prepare(
          'SELECT i.id, p.nombre, p.categoria, i.nota, i.total, i.creado_en, ' +
          "LENGTH(i.respuestas) > 0 AS hay_revision FROM intento i " +
          'JOIN participante p ON p.id = i.participante_id ' +
          'WHERE i.evaluacion_id = ? AND p.borrado_en IS NULL ORDER BY i.creado_en'
        ).bind(ev.id).all();
        const cats = ev.categorias || '*';
        const suyos = partsDeFila(ev);
        /* «Faltan» se acota a QUIÉNES CONVOCA esta evaluación. Si va dirigida a
           personas, faltan solo esas: sin esta rama el panel mostraría a toda
           la categoría como pendiente de una evaluación que no le tocaba, y el
           director saldría a buscar gente que no debía presentar. */
        let filtro, args;
        if (suyos.length) {
          filtro = ' AND p.id IN (' + suyos.map(() => '?').join(',') + ')';
          args = [ev.id, ...suyos];
        } else if (cats === '*') {
          filtro = ''; args = [ev.id];
        } else {
          filtro = ' AND p.categoria IN (' + cats.split(',').map(() => '?').join(',') + ')';
          args = [ev.id, ...cats.split(',')];
        }
        const { results: faltan } = await env.DB.prepare(
          'SELECT p.nombre, p.categoria FROM participante p WHERE p.borrado_en IS NULL ' +
          'AND p.id NOT IN (SELECT participante_id FROM intento WHERE evaluacion_id = ?)' +
          filtro + ' ORDER BY p.categoria, p.nombre'
        ).bind(...args).all();
        /* Los nombres de a quiénes va dirigida, para que la tarjeta del panel
           pueda decir «Camila, Daniel» en vez de una lista de ids. */
        let dirigida = [];
        if (suyos.length) {
          const { results: nn } = await env.DB.prepare(
            'SELECT nombre FROM participante WHERE borrado_en IS NULL AND id IN (' +
            suyos.map(() => '?').join(',') + ') ORDER BY nombre'
          ).bind(...suyos).all();
          dirigida = (nn || []).map(r => r.nombre);
        }
        return {
          id: ev.id, titulo: ev.titulo, cuantas: ev.cuantas, alcance: ev.alcance,
          nivel: ev.nivel, categorias: cats, dirigida, ids: suyos,
          solo_fuente: ev.solo_fuente ? 1 : 0,
          hechas: hechas || [], faltan: faltan || [],
        };
      };
      /* Con ?id= se pide UNA, este abierta o cerrada: es lo que abre el
         historial al tocar una fila. El mismo detalle, sin duplicar la
         consulta ni el formato. */
      const pedida = limpiar(new URL(request.url).searchParams.get('id') || '', 60);
      if (pedida) {
        const ev = await env.DB.prepare('SELECT * FROM evaluacion WHERE id = ?').bind(pedida).first();
        if (!ev) return error('Esa evaluación no existe.', 404);
        return json({ evaluacion: await detalle(ev) });
      }
      const abiertas = await evaluacionesAbiertas(env);
      const evaluaciones = [];
      for (const ev of abiertas) evaluaciones.push(await detalle(ev));
      /* Sin ninguna abierta, se muestra el resultado de la última que hubo
         (cerrada), para que cerrar no le borre al director lo que acaba de ver. */
      let ultima = null;
      if (!evaluaciones.length) {
        const u = await env.DB.prepare('SELECT * FROM evaluacion ORDER BY creada_en DESC LIMIT 1').first();
        if (u) ultima = await detalle(u);
      }
      return json({ evaluaciones, ultima });
    }

    /* ───────── EL HISTORIAL ─────────
       /panel/evaluacion solo habla de lo que esta abierto, y de la ultima
       cuando no hay ninguna: cerrar una evaluacion la sacaba de la vista para
       siempre. Las notas seguian guardadas y no habia pantalla que las
       mostrara.
       Esto NO trae el detalle de cada una (quien la hizo, quien falto): son
       veinte participantes por evaluacion viajando en una lista que el
       director usa para escoger. El detalle se pide de a una, con ?id=. */
    if (metodo === 'GET' && ruta === '/panel/evaluaciones') {
      const { results } = await env.DB.prepare(
        'SELECT e.id, e.titulo, e.alcance, e.cuantas, e.nivel, e.categorias, e.participantes, ' +
        'e.solo_fuente, e.abierta, e.creada_en, e.cerrada_en, ' +
        '(SELECT COUNT(*) FROM intento i JOIN participante p ON p.id = i.participante_id ' +
        ' WHERE i.evaluacion_id = e.id AND p.borrado_en IS NULL) AS notas ' +
        'FROM evaluacion e ORDER BY e.creada_en DESC LIMIT 200'
      ).all();
      await auditar(env, sesion.cuenta_id, 'ver_historial', 'evaluacion', null, ipHash);
      return json({ evaluaciones: results || [] });
    }

    /* La revisión de UN intento. Va aparte y no dentro de /panel/evaluacion a
       propósito: con veinte participantes serían veinte revisiones viajando en
       cada refresco del panel, y el director abre una a la vez. */
    if (metodo === 'GET' && ruta === '/panel/intento') {
      const iid = limpiar(new URL(request.url).searchParams.get('id') || '', 60);
      if (!iid) return error('Falta el intento.', 400);
      const r = await env.DB.prepare(
        'SELECT i.id, i.nota, i.total, i.creado_en, i.respuestas, p.nombre, p.categoria ' +
        'FROM intento i JOIN participante p ON p.id = i.participante_id WHERE i.id = ?'
      ).bind(iid).first();
      if (!r) return error('Ese intento no existe.', 404);
      await auditar(env, sesion.cuenta_id, 'ver_revision', 'intento', iid, ipHash);
      return json({ intento: r });
    }

    /* ───────── el revisor del banco ─────────
       Retirar una pregunta no edita el artefacto: escribe una fila. Por eso
       es reversible y por eso queda registro. La app se trae la lista y la
       aplica al armar cualquier examen. */
    if (metodo === 'GET' && ruta === '/panel/retiradas') {
      return json({ retiradas: await retiradas(env) });
    }

    if (metodo === 'POST' && ruta === '/panel/retiradas') {
      const b = await request.json().catch(() => ({}));
      /* Devolver al banco es una acción de primera clase, no un borrado: el
         registro de por qué se retiró en su momento se conserva. */
      const accion = b.accion === 'restaurar' ? 'restaurar' : 'retirar';
      /* Una o varias: revisar el banco se hace en tanda, y un viaje de red por
         pregunta con señal de campamento es lo que hace abandonar la revisión. */
      const crudas = Array.isArray(b.claves) ? b.claves : [b.clave];
      const claves = [...new Set(crudas.map(x => String(x || '').trim())
        .filter(x => FORMA_CLAVE.test(x)))].slice(0, 50);
      if (!claves.length) return error('Ninguna clave de pregunta válida.', 400);
      const motivo = accion === 'retirar' ? limpiar(b.motivo, 120) : null;
      for (const c of claves) {
        await env.DB.prepare(
          'INSERT INTO pregunta_retirada (clave, accion, quien, motivo) VALUES (?,?,?,?)'
        ).bind(c, accion, sesion.cuenta_id, motivo).run();
      }
      await auditar(env, sesion.cuenta_id, accion + '_pregunta', 'pregunta_retirada',
        claves.join(',').slice(0, 200), ipHash);
      /* Se devuelve la lista completa ya actualizada: la pantalla del director
         no tiene que adivinar cómo quedó, ni pedir un segundo viaje. */
      return json({ ok: true, n: claves.length, retiradas: await retiradas(env) });
    }

    if (metodo === 'GET' && ruta === '/panel/participantes') {
      const { results } = await env.DB.prepare(
        'SELECT p.id, p.nombre, p.categoria, p.codigo, ' +
        '(SELECT COUNT(*) FROM intento i WHERE i.participante_id = p.id) AS intentos ' +
        'FROM participante p WHERE p.borrado_en IS NULL ORDER BY p.categoria, p.nombre'
      ).all();
      await auditar(env, sesion.cuenta_id, 'ver_participantes', 'participante', null, ipHash);
      return json({ participantes: results || [] });
    }

    if (metodo === 'POST' && ruta === '/panel/participantes') {
      const b = await request.json().catch(() => ({}));
      const nombre = limpiar(b.nombre, 40);
      const categoria = CATS_VALIDAS.includes(b.categoria) ? b.categoria : null;
      if (!nombre) return error('Falta el nombre.');
      if (!categoria) return error('Categoría inválida: ' + CATS_VALIDAS.join(', ') + '.');
      /* Reintentar si el código ya existía: con 31^6 combinaciones el choque es
         improbable, pero improbable no es imposible y el índice es único. */
      let codigo = null;
      for (let i = 0; i < 8 && !codigo; i++) {
        const c = codigoNuevo();
        const ya = await env.DB.prepare('SELECT id FROM participante WHERE codigo = ?').bind(c).first();
        if (!ya) codigo = c;
      }
      if (!codigo) return error('No se pudo generar un código. Intenta otra vez.', 500);
      const pid = id();
      await env.DB.prepare(
        'INSERT INTO participante (id, nombre, categoria, codigo) VALUES (?,?,?,?)'
      ).bind(pid, nombre, categoria, codigo).run();
      await auditar(env, sesion.cuenta_id, 'crear_participante', 'participante', pid, ipHash);
      return json({ id: pid, nombre, categoria, codigo });
    }

    /* Borrado suave, nunca DELETE: una niña que se retira del club no borra las
       notas que ya se contaron. El DELETE físico es una purga aparte, a mano. */
    if (metodo === 'POST' && ruta.startsWith('/panel/participantes/') && ruta.endsWith('/borrar')) {
      const pid = ruta.slice('/panel/participantes/'.length, -'/borrar'.length);
      await env.DB.prepare("UPDATE participante SET borrado_en = datetime('now') WHERE id = ?").bind(pid).run();
      await env.DB.prepare(
        'DELETE FROM sesion WHERE cuenta_id IN (SELECT id FROM cuenta WHERE persona_id = ?)'
      ).bind(pid).run();
      await auditar(env, sesion.cuenta_id, 'borrar_participante', 'participante', pid, ipHash);
      return json({ ok: true });
    }

    if (metodo === 'GET' && ruta === '/panel/intentos') {
      /* Con el id y el titulo de la evaluacion: sin eso, una nota suelta no
         dice de que examen era, y la vista por participante no puede armar la
         linea de cada una. La columna existe desde la migracion 004; solo no
         se estaba devolviendo. */
      const { results } = await env.DB.prepare(
        'SELECT i.id, i.creado_en, i.modo, i.nota, i.total, i.evaluacion_id, ' +
        "LENGTH(i.respuestas) > 0 AS hay_revision, e.titulo AS evaluacion, " +
        'p.nombre, p.categoria ' +
        'FROM intento i JOIN participante p ON p.id = i.participante_id ' +
        'LEFT JOIN evaluacion e ON e.id = i.evaluacion_id ' +
        'WHERE p.borrado_en IS NULL ORDER BY i.creado_en DESC LIMIT 300'
      ).all();
      await auditar(env, sesion.cuenta_id, 'ver_intentos', 'intento', null, ipHash);
      return json({ intentos: results || [] });
    }

    return error('Ruta no encontrada', 404);
  } catch (e) {
    return json({ error: 'Error del servidor', detalle: String((e && e.message) || e) }, 500);
  }
}
