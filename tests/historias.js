/* v272 · El modo historias: cada lámina con `historias:true` arma sus pantallas sin
   huecos, con las clases propias (h-) que define historias.css y con imágenes que existen. */
const fs = require('fs'), path = require('path');
const { montar } = require('./entorno.js');
const g = montar('HIST, LAMINAS');
const raiz = path.join(__dirname, '..');
const css = fs.readFileSync(path.join(raiz, 'fuente', 'historias.css'), 'utf8');
const definidas = new Set((css.match(/\.h-[\w-]+/g) || []).map(c => c.slice(1)));
let mal = 0;
const falla = m => { mal++; console.error('❌ ' + m); };
const cids = Object.keys(g.LAMINAS).filter(k => g.LAMINAS[k].historias);
if (cids.sort().join() !== 'd11,d12,p1260') falla('láminas con historias: ' + cids.join());
for (const cid of cids) {
  const L = g.LAMINAS[cid], { S, G } = g.HIST.pantallas(cid);
  if (S.length < 10) falla(cid + ': solo ' + S.length + ' pantallas');
  G.forEach(x => { if (!x.n) falla(cid + ': escena vacía ' + x.t); if (x.id && !['hilo', 'repaso'].includes(x.id) && !L.actos.some(a => a.id === x.id)) falla(cid + ': escena sin acto ' + x.id); });
  L.actos.forEach(a => { if (!G.some(x => x.id === a.id)) falla(cid + ': el acto ' + a.id + ' no tiene pantalla'); });
  S.forEach((s, i) => {
    const h = s.html;
    if (/undefined|NaN|\[object Object\]|«\s*»/.test(h)) falla(cid + ' #' + i + ': texto vacío o roto · ' + (h.match(/.{0,40}(undefined|NaN|\[object Object\]|«\s*»).{0,20}/) || [''])[0]);
    for (const m of h.matchAll(/class="([^"]*)"/g)) for (const c of m[1].split(/\s+/).filter(Boolean)) {
      if (c.includes('${')) continue;
      if (!c.startsWith('h-')) falla(cid + ' #' + i + ': clase sin prefijo ' + c);
      else if (!definidas.has(c) && !['h-a', 'h-otra', 'h-salir', 'h-pts', 'h-fin', 'h-t'].includes(c) && !definidas.has(c)) falla(cid + ' #' + i + ': clase sin estilo ' + c);
    }
    if (s.img) { const f = path.join(raiz, 'laminas', (s.img.includes('/') ? '' : L.dir) + s.img + '.webp'); if (!fs.existsSync(f)) falla(cid + ': falta la imagen ' + s.img); }
  });
  console.log('✔ ' + cid + ': ' + S.length + ' pantallas en ' + (G.length - 1) + ' escenas');
}
/* Daniel 11: los 45 versículos, cada uno en su pantalla. */
{ const { S } = g.HIST.pantallas('d11'); const vs = new Set(); S.forEach(s => { const m = s.html.match(/class="h-nver h-a">(\d+)</); if (m) vs.add(+m[1]); });
  if (vs.size !== 45) falla('Daniel 11 versículo a versículo: ' + vs.size + ' de 45'); }
/* Nada del módulo en la columna cero: Jóvenes la lee como acción global (7-nov, rompió todos los botones). */
{ const src = fs.readFileSync(path.join(raiz, 'fuente', 'historias-app.js'), 'utf8');
  const dentro = src.slice(src.indexOf('const HIST=(()=>{') + 1, src.lastIndexOf('})();'));
  const sueltas = dentro.split('\n').slice(1).filter(l => /^(async\s+)?function\b|^(const|let|var)\s/.test(l));
  if (sueltas.length) falla('historias-app.js tiene ' + sueltas.length + ' declaraciones en la columna cero: ' + sueltas[0].slice(0, 60)); }
{ const html = fs.readFileSync(path.join(raiz, 'index.html'), 'utf8'), i = html.indexOf('const HIST_DIN');
  const bloque = i < 0 ? '' : html.slice(i, html.indexOf('const HIST=(()=>{', i));
  if (i < 0 || /\n(async\s+)?function\b|\n(const|let|var)\s/.test(bloque)) falla('HIST_DIN en index.html con declaraciones en la columna cero'); }
if (mal) { console.error(mal + ' fallas'); process.exit(1); }
console.log('✅ historias: todo en orden');
