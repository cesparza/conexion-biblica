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
];

export async function onRequest(context) {
  const ruta = new URL(context.request.url).pathname;
  if (PRIVADO.some(re => re.test(ruta))) {
    return new Response('No encontrado', {
      status: 404,
      headers: { 'content-type': 'text/plain; charset=utf-8', 'x-robots-tag': 'noindex, nofollow' },
    });
  }
  return context.next();
}
