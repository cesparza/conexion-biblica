/**
 * Bloquea los archivos del repositorio que no deben quedar públicos.
 *
 * MECANISMO
 * El directorio de salida de Pages es la raíz del repositorio, así que TODO lo
 * que esté ahí se sirve por HTTP. Sin esto, cualquiera podría bajar
 * /migraciones/002_dominio.sql con el esquema completo y /wrangler.toml con el
 * id de la base. No son credenciales, pero es información que no tiene que
 * estar afuera. La /api la deja pasar intacta.
 *
 * Ojo: el repositorio de este proyecto además es PÚBLICO en GitHub, así que
 * esto no esconde nada de quien mire el repo. Lo que sí evita es que el sitio
 * publicado sirva esos archivos a quien solo tiene la dirección.
 */
const PRIVADO = [
  /^\/migraciones\//,
  /^\/tools\//,
  /^\/tests\//,
  /^\/fuente\//,
  /^\/wrangler\.(toml|jsonc?)$/,
  /^\/package(-lock)?\.json$/,
  /^\/\.git/,
  /^\/\.wrangler/,
  /^\/\.dev\.vars/,
  /^\/\.gitignore$/,
  /* v139: notas del repo y un resto de cuando la app usaba Supabase. Sin
     secretos, pero no son de la app. */
  /^\/(CLAUDE|README)\.md$/i,
  /^\/supabase-setup\.sql$/,
];

/**
 * ETAG DEL HTML (v139).
 * MECANISMO: Pages le pone ETag a todo archivo menos al HTML, así que cada
 * apertura con señal bajaba el index completo (unos 519 KB comprimidos)
 * aunque no hubiera cambiado nada. El service worker va «red primero», y sin
 * ETag el navegador no puede preguntar «¿cambió?»: tiene que traerlo entero.
 * La huella de version.json es el SHA-1 del HTML entero (build.js), así que es
 * un ETag exacto: si el celular ya tiene esa versión, se responde 304 sin
 * cuerpo. version.json y el HTML salen del mismo despliegue, no se desfasan.
 */
async function conEtag(context, ruta) {
  const res = await context.next();
  if (!res.ok || !(res.headers.get('content-type') || '').includes('text/html')) return res;
  let v = '';
  try {
    const vr = await context.env.ASSETS.fetch(new URL('/version.json', context.request.url));
    v = String(((await vr.json()) || {}).v || '');
  } catch (e) { v = ''; }
  if (!/^[0-9a-f]{12}$/.test(v)) return res;
  const etag = '"' + v + '"';
  const pide = (context.request.headers.get('if-none-match') || '')
    .split(',').map(s => s.trim().replace(/^W\//, ''));
  if (pide.includes(etag)) {
    return new Response(null, { status: 304, headers: { etag, 'cache-control': 'no-cache' } });
  }
  const h = new Headers(res.headers);
  h.set('etag', etag);
  h.set('cache-control', 'no-cache');
  return new Response(res.body, { status: res.status, statusText: res.statusText, headers: h });
}

export async function onRequest(context) {
  const ruta = new URL(context.request.url).pathname;
  if (PRIVADO.some(re => re.test(ruta))) {
    return new Response('No encontrado', {
      status: 404,
      headers: { 'content-type': 'text/plain; charset=utf-8', 'x-robots-tag': 'noindex, nofollow' },
    });
  }
  if (context.request.method === 'GET' && (ruta === '/' || ruta === '/index.html')) {
    return conEtag(context, ruta);
  }
  return context.next();
}
