/* Lo que solo se comprueba con un navegador de verdad (v156).
   La suite corre sobre un DOM de mentiras: no hay altura de página, ni toques,
   ni recarga. Esto abre el index.html en Chromium y recorre:
     1. EL REFRESCO: en cada pantalla, recargar deja la misma pantalla, el mismo
        capítulo y la misma sección a la misma altura; con y sin sesión de
        participante, incluida la persona que estudia en su otra actividad.
     2. LAS LISTAS DE CREENCIAS: cada fila lleva a su creencia y «Volver»
        regresa a la misma altura; los tres niveles (ver, pistas, tapadas).
     3. LA VOZ de una creencia: número, nombre y declaración, nada más.
     4. Sin errores de JavaScript y sin desborde a lo ancho.
   Necesita Playwright (como tools/contraste.js; por eso no va en la suite).
   Uso:  node tools/en-navegador.js [anchos]      (por defecto 390,1280) */
const path = require('path'), http = require('http'), fs = require('fs');
const { chromium } = require('playwright');
const RAIZ = path.join(__dirname, '..');
const ANCHOS = (process.argv[2] || '390,1280').split(',').map(Number);
const TOPE = 84;
let fallas = 0;
const ok = (c, m) => { if (!c) fallas++; console.log((c ? '✅ ' : '❌ ') + m); };

(async () => {
const srv = http.createServer((q, r) => {
  const u = q.url.split('?')[0], f = path.join(RAIZ, u === '/' ? 'index.html' : u);
  fs.readFile(f, (e, b) => {
    if (e) { r.writeHead(404); r.end(); return; }
    r.writeHead(200, { 'content-type': f.endsWith('.html') ? 'text/html; charset=utf-8' : 'application/json' });
    r.end(b);
  });
});
await new Promise(s => srv.listen(0, '127.0.0.1', s));
const base = 'http://127.0.0.1:' + srv.address().port + '/';
const nav = await chromium.launch();

for (const W of ANCHOS) {
  const ctx = await nav.newContext({ viewport: { width: W, height: 844 }, serviceWorkers: 'block' });
  const p = await ctx.newPage();
  const errores = [];
  p.on('pageerror', e => errores.push(e.message));
  p.on('dialog', d => d.dismiss());
  /* Chromium sin pantalla no trae voces: se pone una de mentiras que anota lo dicho. */
  await p.addInitScript(() => {
    const voz = { speaking: false, pending: false, paused: false,
      getVoices: () => [{ lang: 'es-ES', name: 'x', default: true, localService: true }],
      speak() {}, cancel() {}, pause() {}, resume() {}, addEventListener() {}, removeEventListener() {} };
    try { Object.defineProperty(window, 'speechSynthesis', { value: voz, configurable: true }); } catch (e) {}
  });
  let sesion = null;
  await p.route('**/api/**', route => {
    const u = new URL(route.request().url());
    if (u.pathname === '/api/yo') return route.fulfill({ json: sesion || { rol: null } });
    if (u.pathname === '/api/progreso' && sesion) {
      const f = JSON.parse(route.request().postData() || '{}');
      f.pid = sesion.id; f.nombre = sesion.nombre; f.cat = sesion.categoria;
      return route.fulfill({ json: { ficha: f } });
    }
    return route.fulfill({ json: {} });
  });
  const donde = () => p.evaluate(T => {
    const d = document.getElementById('detalle'), vis = d && d.getClientRects().length;
    let lee = '';
    if (vis) {
      const el = [...d.querySelectorAll('.sec')].filter(x => x.getClientRects().length)
        .find(x => x.getBoundingClientRect().bottom > T);
      if (el) lee = (el.querySelector('.sec-rot,h3') || el).textContent.trim().slice(0, 24) + ' @' + Math.round(T - el.getBoundingClientRect().top);
    }
    return { pant: (document.querySelector('.pantalla.on') || {}).id, cat: S.cat,
      det: vis ? (d.querySelector('.cap-tit') || {}).textContent : '', lee, y: Math.round(scrollY) };
  }, TOPE);
  const bajar = (id, sec, dy) => p.evaluate(([id, sec, dy, T]) => {
    verCap(id);
    const s = [...document.querySelectorAll('#detalle .sec')].filter(x => x.getClientRects().length)[sec];
    scrollTo(0, s.getBoundingClientRect().top + scrollY - T + dy);
  }, [id, sec, dy, TOPE]);
  const refresca = async (nombre, prepara) => {
    await prepara(); await p.waitForTimeout(700);
    const a = await donde();
    await p.reload(); await p.waitForTimeout(2200);
    const d = await donde();
    /* Misma sección y, dentro de ella, a 6 px o menos. */
    const sec = x => x.lee.split(' @')[0], px = x => Number(x.lee.split(' @')[1]) || x.y;
    const igual = a.pant === d.pant && a.cat === d.cat && a.det === d.det && sec(a) === sec(d) && Math.abs(px(a) - px(d)) <= 6;
    ok(igual, W + ' · refresco · ' + nombre + (igual ? '' : '\n      antes   ' + JSON.stringify(a) + '\n      después ' + JSON.stringify(d)));
  };

  await p.goto(base); await p.waitForTimeout(500);
  await p.evaluate(() => { S.nombre = 'Camila'; S.cat = 'ec1'; guardar(); ponCat('ec1'); });

  /* ── 1. el refresco ── */
  await refresca('Las 6 doctrinas, a media sección', () => bajar('mc-doctrinas', 1, 220));
  await refresca('Las 28 de corrido, tercera sección', () => bajar('mc-lista', 2, 60));
  await refresca('una creencia, tercera sección', () => bajar('cr04', 2, 40));
  await refresca('una creencia recién abierta', () => p.evaluate(() => verCap('cr04')));
  await refresca('Logros con la página bajada', () => p.evaluate(() => { ir('logros'); scrollTo(0, 160); }));
  await refresca('la rejilla de Estudiar con la página bajada', () => p.evaluate(() => { ir('estudio'); scrollTo(0, 300); }));
  /* Con sesión de Conexión Bíblica y dos fichas, como queda al usar la app. */
  await p.evaluate(() => ponCat('av')); await p.waitForTimeout(150);
  await p.evaluate(() => { S.pid = 'pid-1'; S.prog.d1 = 80; guardar(); ponCat('ec1'); }); await p.waitForTimeout(150);
  sesion = { rol: 'participante', id: 'pid-1', nombre: 'Camila', categoria: 'av' };
  await refresca('con sesión de Conexión Bíblica, estudiando creencias', () => bajar('mc-doctrinas', 1, 220));
  await refresca('con sesión, en una creencia', () => bajar('cr09', 1, 10));
  await refresca('con sesión, en su ficha de la sesión', async () => {
    await p.evaluate(() => ponCat('av')); await p.waitForTimeout(150); await bajar('d1', 1, 30);
  });
  ok(await p.evaluate(() => Object.keys(DB.alumnos).length) === 2, W + ' · refresco · no se crean fichas de más');
  await p.evaluate(() => ponCat('ec1')); await p.waitForTimeout(150);
  sesion = null;

  /* ── 2. las listas de creencias ── */
  for (const mod of ['mc-doctrinas', 'mc-lista']) {
    /* verCap lleva al detalle con scroll suave: se espera a que termine antes de medir. */
    await p.evaluate(m => verCap(m), mod); await p.waitForTimeout(1000);
    const filas = await p.evaluate(() => [...document.querySelectorAll('#detalle .l28 li')].map(li => ({
      n: li.children[0].textContent, oc: (li.querySelector('.cr-ir') || { getAttribute() {} }).getAttribute('onclick'),
      al: (li.querySelector('.cr-ir') || { getBoundingClientRect: () => ({}) }).getBoundingClientRect().height })));
    ok(filas.length === 28 && filas.every(f => f.oc === "verCreencia('cr" + String(f.n).padStart(2, '0') + "')"),
      W + ' · ' + mod + ' · las 28 filas llevan a su creencia');
    ok(filas.every(f => f.al >= 44), W + ' · ' + mod + ' · la flecha mide 44 px o más');
    /* Toque en el NOMBRE de la fila 17 (no en la flecha): viendo, la fila entera es el enlace. */
    const alto = () => p.evaluate(() => Math.round(document.querySelectorAll('#detalle .l28 li')[16].getBoundingClientRect().top));
    await p.evaluate(() => document.querySelectorAll('#detalle .l28 li')[16].scrollIntoView({ block: 'center' }));
    const y0 = await alto();
    await p.locator('#detalle .l28 li').nth(16).locator('span').first().click({ force: true });
    await p.waitForTimeout(900);
    const en = await p.evaluate(() => ({ t: (document.querySelector('#detalle .cap-tit') || {}).textContent, v: !!document.querySelector('#detalle .cap-vuelve'), item: S.ultItem }));
    ok(en.item === 'cr17' && en.v, W + ' · ' + mod + ' · tocar la fila 17 abre «' + en.t + '» con Volver');
    await p.locator('#detalle .cap-vuelve').click(); await p.waitForTimeout(500);
    const item = await p.evaluate(() => S.ultItem), y1 = item === mod ? await alto() : -1;
    ok(item === mod && Math.abs(y1 - y0) <= 6, W + ' · ' + mod + ' · Volver deja la fila 17 donde estaba en la pantalla (' + y0 + ' → ' + y1 + ' px)');
  }
  /* Los tres niveles, en Las 28 de corrido. */
  await p.evaluate(() => verCap('mc-lista')); await p.waitForTimeout(300);
  const fila = p.locator('#detalle .l28 li').nth(8);
  const ve = () => fila.evaluate(li => ({
    nombre: getComputedStyle(li.children[1]).display !== 'none' && getComputedStyle(li.children[1]).color !== 'rgba(0, 0, 0, 0)',
    pista: getComputedStyle(li.querySelector('.l28-p')).display !== 'none' ? li.querySelector('.l28-p').textContent : '',
    hilo: getComputedStyle(document.querySelector('#detalle .l28-hilo')).display !== 'none' }));
  let v = await ve();
  ok(v.nombre && !v.pista && v.hilo, W + ' · niveles · «Ver»: nombre y ayuda a la vista');
  await p.locator('#detalle .l28-modo .cf').nth(1).click(); v = await ve();
  ok(!v.nombre && v.pista === 'La v…, m… y r… de C…' && v.hilo, W + ' · niveles · «Con pistas»: «' + v.pista + '» y la ayuda sigue');
  await fila.locator('.l28-p').click(); v = await ve();
  ok(v.nombre && !v.pista && await p.evaluate(() => S.ultItem) === 'mc-lista', W + ' · niveles · tocar la fila destapa y no cambia de página');
  await p.locator('#detalle .l28-modo .cf').nth(2).click(); v = await ve();
  ok(!v.nombre && !v.pista && !v.hilo, W + ' · niveles · «Tapadas»: solo el número, sin ayuda');
  await fila.locator('.cr-ir').click(); await p.waitForTimeout(600);
  ok(await p.evaluate(() => S.ultItem) === 'cr09', W + ' · niveles · recitando, la flecha sí lleva a la creencia');

  /* ── 3. la voz ── */
  const voz = await p.evaluate(() => {
    const out = [];
    for (let n = 1; n <= 28; n++) {
      const id = 'cr' + String(n).padStart(2, '0'); verCap(id); estVozCargar();
      const c = buscaItem(id), bq = document.querySelector('#detalle blockquote.decl');
      const decl = bq.cloneNode(true); decl.querySelectorAll('.fn,.decl-src').forEach(x => x.remove());
      const limpia = t => t.replace(/\s+/g, ' ').trim();
      out.push({ n, primera: VZ.partes[0].txt, espera: c.label + '. ' + c.sub + '.',
        resto: limpia(VZ.partes.slice(1).map(x => x.txt).join(' ')), decl: limpia(decl.textContent),
        rot: document.getElementById('est-est').textContent + ' | ' + document.getElementById('est-n').textContent });
    }
    verCap('mc-doctrinas'); estVozCargar();
    return { out, mod: VZ.partes.map(x => x.txt) };
  });
  const malas = voz.out.filter(x => x.primera !== x.espera || x.resto.replace(/\.$/, '') !== x.decl.replace(/\.$/, ''));
  ok(malas.length === 0, W + ' · voz · las 28: «' + voz.out[3].primera + '» y después solo la declaración' +
    (malas.length ? ' — fallan ' + malas.map(x => x.n).join(', ') : ''));
  ok(voz.out[0].rot === 'Escuchar la creencia | Solo la declaración', W + ' · voz · el reproductor lo dice: ' + voz.out[0].rot);
  ok(voz.mod.includes('1. La Palabra de Dios.') && voz.mod.some(t => /^Para recordarlas\. Uno, uno y tres/.test(t)) && !voz.mod.some(t => /…/.test(t)),
    W + ' · voz · en los repasos se sigue oyendo todo: fila «1. La Palabra de Dios.», la ayuda, y ninguna pista');

  /* ── 4. errores y desborde ── */
  const ancho = await p.evaluate(() => {
    const m = {};
    for (const id of ['mc-doctrinas', 'mc-lista', 'cr24']) { verCap(id); m[id] = document.documentElement.scrollWidth - innerWidth; }
    return m;
  });
  ok(Object.values(ancho).every(x => x <= 0), W + ' · sin desborde a lo ancho ' + JSON.stringify(ancho));
  ok(errores.length === 0, W + ' · cero errores de JavaScript' + (errores.length ? ': ' + errores.slice(0, 3).join(' | ') : ''));
  await ctx.close();
}
await nav.close(); srv.close();
console.log('\n' + (fallas ? fallas + ' FALLOS' : 'EN EL NAVEGADOR: TODO BIEN'));
process.exit(fallas ? 1 : 0);
})();
