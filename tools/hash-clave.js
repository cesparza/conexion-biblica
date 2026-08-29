/**
 * Cambia la clave del director sin que la clave pase por ningún lado.
 *
 * MECANISMO, Y POR QUÉ EXISTE ESTE ARCHIVO
 * La app no guarda la clave, guarda su SHA-256, y de un SHA-256 no se saca la
 * clave. Eso ya estaba bien en v18. Lo que estaba mal era el CAMINO: la clave
 * viajaba escrita a mano hasta app.js y, de paso, quedó copiada diez veces en
 * tests/simulacro.js, que vive en un repositorio PÚBLICO. La huella era segura
 * y el proceso no.
 *
 * Aquí la clave se escribe en tu terminal, sin eco, no se guarda en el
 * historial del shell, no se imprime, y lo único que sale es el hash, que sí
 * puede vivir en el repositorio a la vista de todos.
 *
 * Uso:
 *   node tools/hash-clave.js              solo imprime el hash
 *   node tools/hash-clave.js --escribir   además lo deja puesto en fuente/app.js
 *
 * Después: node fuente/build.js  y  CB_CLAVE='la clave' node tests/simulacro.js
 */
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

/* La misma normalización que aplica la app: sin espacios de sobra y en
   minúsculas. Si aquí no se normaliza igual, el hash no cuadra nunca y el
   error se lee como "mi clave no sirve". */
const normClave = c => String(c || '').trim().toLowerCase();
const sha256 = t => crypto.createHash('sha256').update(t, 'utf8').digest('hex');

function preguntar(texto) {
  return new Promise(resolve => {
    process.stdout.write(texto);
    const stdin = process.stdin;
    /* Sin eco: una clave no se muestra en pantalla ni queda en el scrollback de
       la terminal, que es de donde la sacaría cualquiera que mire el equipo. */
    const crudo = stdin.isTTY;
    if (crudo) stdin.setRawMode(true);
    stdin.resume();
    let buf = '';
    stdin.on('data', function onData(ch) {
      const s = String(ch);
      if (s === '\n' || s === '\r' || s === '') {
        if (crudo) stdin.setRawMode(false);
        stdin.pause();
        stdin.removeListener('data', onData);
        process.stdout.write('\n');
        resolve(buf);
        return;
      }
      if (s === '') { process.stdout.write('\n'); process.exit(1); }
      if (s === '' || s === '\b') { buf = buf.slice(0, -1); return; }
      buf += s;
    });
  });
}

(async () => {
  const c1 = await preguntar('Clave nueva del director: ');
  const c2 = await preguntar('Otra vez, para confirmar: ');
  if (normClave(c1) !== normClave(c2)) {
    console.error('\nNo coinciden. No se cambió nada.');
    process.exit(1);
  }
  if (normClave(c1).length < 8) {
    console.error('\nMuy corta. Mínimo 8 caracteres. No se cambió nada.');
    process.exit(1);
  }
  const h = sha256(normClave(c1));
  console.log('\nSHA-256:', h);

  if (process.argv.includes('--escribir')) {
    const p = path.join(__dirname, '..', 'fuente', 'app.js');
    const src = fs.readFileSync(p, 'utf8');
    const re = /const CLAVE_DIR='[0-9a-f]{64}';/;
    if (!re.test(src)) {
      console.error('No encontré CLAVE_DIR en fuente/app.js. No se cambió nada.');
      process.exit(1);
    }
    fs.writeFileSync(p, src.replace(re, "const CLAVE_DIR='" + h + "';"));
    console.log('Puesto en fuente/app.js.');
    console.log('Falta:  node fuente/build.js');
    console.log('Y las pruebas:  CB_CLAVE=\'tu clave\' node tests/simulacro.js');
    console.log('Y en Cloudflare:  npx wrangler pages secret put CLAVE_PANEL --project-name conexion-biblica');
  }
})();
