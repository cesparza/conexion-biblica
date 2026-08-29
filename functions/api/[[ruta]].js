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
  const token = crypto.randomUUID() + crypto.randomUUID().replace(/-/g, '');
  await env.DB.prepare(
    "INSERT INTO sesion (token, cuenta_id, expira_en, ip_hash) VALUES (?,?, datetime('now', ?), ?)"
  ).bind(token, cuentaId, '+' + dias + ' days', ipHash).run();
  await env.DB.prepare("UPDATE cuenta SET ultimo_acceso = datetime('now') WHERE id = ?").bind(cuentaId).run();
  return token;
}

const leerAjuste = (env, clave) =>
  env.DB.prepare('SELECT valor FROM ajuste WHERE clave = ?').bind(clave).first();

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
    if (metodo === 'GET' && ruta === '/estado') {
      const a = await leerAjuste(env, 'examenes_abiertos');
      return json({ abierto: !a || a.valor !== '0', hora: new Date().toISOString() });
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

    if (metodo === 'POST' && ruta === '/intento') {
      if (!sesion || sesion.rol !== 'participante') return error('Entra con tu código primero.', 401);
      const b = await request.json().catch(() => ({}));
      const modo = limpiar(b.modo, 20) || 'normal';
      const semilla = limpiar(b.semilla, 40);
      const nota = Number.isFinite(+b.nota) ? Math.round(+b.nota) : null;
      const total = Number.isFinite(+b.total) ? Math.round(+b.total) : null;
      const idem = limpiar(b.idempotency_key, 60);
      /* Idempotencia: un reintento de red no guarda la misma nota dos veces. */
      if (idem) {
        const ya = await env.DB.prepare('SELECT id FROM intento WHERE idempotency_key = ?').bind(idem).first();
        if (ya) return json({ ok: true, repetido: true });
      }
      /* El link se gasta por PERSONA, no por aparato: esto es lo que la versión
         sin servidor no podía hacer. Una segunda ficha en otro celular ya no
         rehace el mismo examen. */
      if (semilla) {
        const hecho = await env.DB.prepare(
          'SELECT id FROM intento WHERE participante_id = ? AND semilla = ?'
        ).bind(sesion.persona_id, semilla).first();
        if (hecho) return error('Ese examen ya lo hiciste.', 409, { ya_hecho: true });
      }
      await env.DB.prepare(
        'INSERT INTO intento (id, participante_id, modo, semilla, nota, total, idempotency_key) VALUES (?,?,?,?,?,?,?)'
      ).bind(id(), sesion.persona_id, modo, semilla, nota, total, idem).run();
      return json({ ok: true });
    }

    // ─────────────────────────────────────── panel del director
    if (ruta.startsWith('/panel/') && (!sesion || sesion.rol !== 'director')) {
      return error('Necesitas entrar como director.', 401);
    }

    if (metodo === 'POST' && ruta === '/panel/examenes') {
      const b = await request.json().catch(() => ({}));
      const valor = b.abiertos ? '1' : '0';
      await env.DB.prepare(
        "INSERT INTO ajuste (clave, valor, cambiado_en, cambiado_por) " +
        "VALUES ('examenes_abiertos', ?, datetime('now'), ?) " +
        "ON CONFLICT(clave) DO UPDATE SET valor = excluded.valor, " +
        "cambiado_en = excluded.cambiado_en, cambiado_por = excluded.cambiado_por"
      ).bind(valor, sesion.cuenta_id).run();
      await auditar(env, sesion.cuenta_id, valor === '1' ? 'abrir_examenes' : 'cerrar_examenes',
        'ajuste', 'examenes_abiertos', ipHash);
      return json({ ok: true, abierto: valor === '1' });
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
      const categoria = ['4-6', '7-9', 'padres'].includes(b.categoria) ? b.categoria : null;
      if (!nombre) return error('Falta el nombre.');
      if (!categoria) return error('La categoría es 4-6, 7-9 o padres.');
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
      const { results } = await env.DB.prepare(
        'SELECT i.creado_en, i.modo, i.nota, i.total, p.nombre, p.categoria ' +
        'FROM intento i JOIN participante p ON p.id = i.participante_id ' +
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
