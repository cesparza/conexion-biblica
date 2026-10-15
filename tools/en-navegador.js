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
    r.writeHead(200, { 'content-type': f.endsWith('.html') ? 'text/html; charset=utf-8' : f.endsWith('.webp') ? 'image/webp' : f.endsWith('.png') ? 'image/png' : 'application/json' });
    r.end(b);
  });
});
await new Promise(s => srv.listen(0, '127.0.0.1', s));
const base = 'http://127.0.0.1:' + srv.address().port + '/';
const nav = await chromium.launch();
/* v209: mide una foto (PNG) en una página en blanco: cuánto varía y, si hay otra, cuánto difieren. */
const lienzo = await (await nav.newContext()).newPage();
const mide = (a, b) => lienzo.evaluate(async ([a, b]) => {
  const lee = async b64 => { const t = atob(b64), u = new Uint8Array(t.length); for (let i = 0; i < t.length; i++) u[i] = t.charCodeAt(i);
    const bm = await createImageBitmap(new Blob([u], { type: 'image/png' })), c = new OffscreenCanvas(bm.width, bm.height), x = c.getContext('2d');
    x.drawImage(bm, 0, 0); return x.getImageData(0, 0, bm.width, bm.height).data; };
  const A = await lee(a), B = b ? await lee(b) : null;
  let n = 0, s = 0, s2 = 0, d = 0;
  for (let i = 0; i < A.length; i += 16) { const l = A[i] * .3 + A[i + 1] * .59 + A[i + 2] * .11; s += l; s2 += l * l; n++;
    if (B) d += (Math.abs(A[i] - B[i]) + Math.abs(A[i + 1] - B[i + 1]) + Math.abs(A[i + 2] - B[i + 2])) / 3; }
  const m = s / n; return { std: Math.sqrt(Math.max(0, s2 / n - m * m)), dif: B ? d / n : null };
}, [a.toString('base64'), b ? b.toString('base64') : null]);
/* Cada miniatura bajo `sel`: su imagen varía y, si es de la estatua, su metal se ve. */
async function thumbsBien(p, sel) {
  const ts = p.locator(sel + ' .cmp-img'), n = await ts.count(), mal = [];
  for (let i = 0; i < n; i++) {
    const t = ts.nth(i); await t.scrollIntoViewIfNeeded(); await p.waitForTimeout(250);
    await t.evaluate(e => Promise.all([...e.querySelectorAll('img')].map(im => im.decode ? im.decode().catch(() => {}) : 0)));
    const nom = await t.evaluate(e => (e.closest('.cmp-carta,.cmp-vis-p').textContent || '').trim().slice(0, 30));
    const a = await t.screenshot(), capa = await t.evaluate(e => !!e.querySelector('img.on'));
    let b = null;
    if (capa) { await t.evaluate(e => { e.querySelector('img.on').style.visibility = 'hidden'; }); b = await t.screenshot(); await t.evaluate(e => { e.querySelector('img.on').style.visibility = ''; }); }
    const r = await mide(a, b);
    if (r.std < 14 || (capa && r.dif < 4)) mal.push(nom + ' (' + Math.round(r.std) + (capa ? '/' + r.dif.toFixed(1) : '') + ')');
  }
  return { n, mal };
}

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
      speak(u) { window.__u = u; }, cancel() {}, pause() {}, resume() {}, addEventListener() {}, removeEventListener() {} };
    try { Object.defineProperty(window, 'speechSynthesis', { value: voz, configurable: true }); } catch (e) {}
    /* Y la frase también de mentiras: la de verdad no acepta una voz que no sea del sistema. */
    window.SpeechSynthesisUtterance = function (t) { this.text = t; };
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
    /* 1,5 s: lo que tarda en asentarse la bajada suave y en anotarse la altura. */
    await prepara(); await p.waitForTimeout(1500);
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
  /* Refrescar ANTES de que la página termine de bajar sola: tiene que abrir el
     capítulo desde su título, no a mitad de camino (v161). */
  await p.evaluate(() => verCap('cr09')); await p.waitForTimeout(120);
  await p.reload(); await p.waitForTimeout(2200);
  const pronto = await p.evaluate(() => ({ item: S.ultItem, top: Math.round(document.getElementById('detalle').getBoundingClientRect().top), vh: innerHeight }));
  ok(pronto.item === 'cr09' && pronto.top >= -4 && pronto.top < pronto.vh * 0.5, W + ' · refresco · refrescar mientras la página aún baja abre el capítulo desde su título (a ' + pronto.top + ' px)');
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
      const frases = bq.querySelectorAll('.dfr').length;
      out.push({ n, primera: VZ.partes[0].txt, espera: c.label + '. ' + c.sub + '.', frases,
        enFrase: VZ.partes.slice(1).every(x => x.el.classList.contains('dfr')),
        conLugar: VZ.partes.slice(1).filter(x => x.nodo && x.off >= 0 && x.nodo.textContent.substr(x.off, x.txt.length) === x.txt).length,
        partes: VZ.partes.length - 1,
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
  /* v158: cada parte es una frase de la página, y se sabe dónde está su texto. */
  const sinFrase = voz.out.filter(x => x.frases && (!x.enFrase || x.conLugar !== x.partes));
  ok(sinFrase.length === 0, W + ' · voz · en las 28, cada trozo que suena es una frase de la página y se sabe dónde está su texto' +
    (sinFrase.length ? ' — fallan ' + sinFrase.map(x => x.n + ' (' + x.conLugar + '/' + x.partes + ')').join(', ') : ''));
  /* Se hace sonar la creencia 4 y se simula lo que avisa el aparato. */
  await p.evaluate(() => { verCap('cr04'); estVozAlterna(); });
  const marca = () => p.evaluate(() => {
    const m = [...document.querySelectorAll('#detalle .suena')];
    const h = CSS.highlights.get('voz-palabra');
    return { frase: m.length === 1 && m[0].classList.contains('dfr') ? [...m[0].parentNode.children].indexOf(m[0]) + 1 : (m.length === 1 ? 'cabecera' : m.length + ' marcas'),
      palabra: h ? [...h].map(r => r.toString()).join('|') : '' };
  });
  let m = await marca();
  ok(m.frase === 'cabecera' && !m.palabra, W + ' · voz · primero suena «Creencia 4. Dios el Hijo.» y se marca el encabezado');
  await p.evaluate(() => window.__u.onend()); m = await marca();
  ok(m.frase === 1, W + ' · voz · después se marca solo la frase 1 de la declaración (marcada: ' + m.frase + ')');
  /* «boundary» de la palabra que empieza en la letra 13, como lo manda Safari (sin largo). */
  const dicha = await p.evaluate(() => { const t = window.__u.text, i = t.indexOf('Eterno'); window.__u.onboundary({ name: 'word', charIndex: i }); return t; });
  m = await marca();
  ok(m.palabra === 'Eterno', W + ' · voz · y dentro de la frase, la palabra que suena: «' + m.palabra + '» (frase dicha: ' + dicha.slice(0, 30) + '…)');
  await p.evaluate(() => window.__u.onend()); m = await marca();
  ok(m.frase === 2 && !m.palabra, W + ' · voz · al pasar a la frase 2 la marca se mueve y la palabra anterior se suelta');
  await p.evaluate(() => { const t = window.__u.text, i = t.indexOf('creadas'); window.__u.onboundary({ name: 'word', charIndex: i, charLength: 7 }); });
  m = await marca();
  ok(m.palabra === 'creadas', W + ' · voz · con largo de palabra (Chrome) también: «' + m.palabra + '»');
  await p.evaluate(() => estVozAlterna()); m = await marca();
  ok(!m.palabra, W + ' · voz · al pausar no queda ninguna palabra marcada');
  /* Tocar una frase empieza ahí. */
  await p.locator('#detalle .decl-txt .dfr').nth(4).click(); await p.waitForTimeout(400); m = await marca();
  ok(m.frase === 5, W + ' · voz · tocar la frase 5 empieza a leer desde ahí (marcada: ' + m.frase + ')');
  /* ── el reproductor general (v158): pausar, empezar de nuevo y la tira ── */
  const rp = () => p.evaluate(() => {
    const c = document.querySelector('#detalle .est-rp'), bot = c.querySelector('.lec-rp-bot');
    const ahora = c.querySelector('.lec-tira .ahora');
    return { activo: c.classList.contains('activo'), bot: getComputedStyle(bot).display !== 'none', seg: c.querySelectorAll('.lec-tira [data-k]').length,
      ahora: ahora ? Number(ahora.dataset.k) : -1, est: document.getElementById('est-est').textContent, n: document.getElementById('est-n').textContent,
      otra: Math.round(c.querySelector('.lec-otra').getBoundingClientRect().height), sonando: VZ.sonando, i: VZ.i,
      alto: Math.round(c.getBoundingClientRect().height), ancho: Math.round(c.scrollWidth - c.clientWidth),
      pos: getComputedStyle(c).position, ant: document.getElementById('est-ant').disabled, sig: document.getElementById('est-sig').disabled,
      play: Math.round(document.getElementById('est-play').getBoundingClientRect().width),
      paso: Math.round(document.getElementById('est-sig').getBoundingClientRect().width),
      ios: (() => { const x = c.querySelector('.lec-ios'); return x ? getComputedStyle(x).display : ''; })() };
  });
  let r = await rp();
  const altoSonando = r.alto;
  ok(r.activo && r.bot && r.seg === 8 && r.ahora === 5 && r.n === 'Frase 5 de 7' && r.otra >= 44 && r.ancho <= 0,
    W + ' · reproductor · sonando muestra «' + r.n + '», la tira de ' + r.seg + ' partes en la quinta frase y «empezar de nuevo» de ' + r.otra + ' px');
  await p.locator('#est-play').click(); r = await rp();
  ok(!r.sonando && r.est === 'En pausa' && r.bot, W + ' · reproductor · el botón pausa («' + r.est + '») y los controles siguen ahí');
  await p.locator('#est-otra').click(); await p.waitForTimeout(350); r = await rp();
  ok(r.sonando && r.i === 0 && r.ahora === 0 && r.n === 'Creencia 4', W + ' · reproductor · «empezar de nuevo» desde la pausa vuelve al principio («' + r.n + '»)');
  await p.locator('#est-tira [data-k]').nth(3).click(); await p.waitForTimeout(350); r = await rp(); m = await marca();
  ok(r.ahora === 3 && m.frase === 3 && r.n === 'Frase 3 de 7', W + ' · reproductor · tocar la tira salta a esa parte («' + r.n + '») y la marca en la página');
  /* v162, la tarjeta: anterior y siguiente pasan de parte en parte. */
  ok(r.play >= 56 && r.paso >= 44 && !r.ant && !r.sig && r.pos === 'sticky', W + ' · tarjeta · botón grande de ' + r.play + ' px, pasos de ' + r.paso + ' px encendidos y pegada arriba mientras suena');
  await p.locator('#est-sig').click(); await p.waitForTimeout(350); r = await rp(); m = await marca();
  ok(r.ahora === 4 && m.frase === 4 && r.n === 'Frase 4 de 7', W + ' · tarjeta · «siguiente» pasa a la frase que sigue («' + r.n + '»)');
  await p.locator('#est-ant').click(); await p.waitForTimeout(350); await p.locator('#est-ant').click(); await p.waitForTimeout(350); r = await rp();
  ok(r.ahora === 2 && r.n === 'Frase 2 de 7', W + ' · tarjeta · «anterior» dos veces vuelve dos frases («' + r.n + '»)');
  await p.locator('#est-tira [data-k]').nth(7).click(); await p.waitForTimeout(350); r = await rp();
  ok(r.ahora === 7 && r.sig && !r.ant, W + ' · tarjeta · en la última parte «siguiente» se apaga');
  await p.locator('#est-otra').click(); await p.waitForTimeout(350); r = await rp();
  ok(r.ahora === 0 && r.ant && !r.sig, W + ' · tarjeta · en la primera parte «anterior» se apaga');
  await p.evaluate(() => paraVoz()); r = await rp();
  /* Antes de escuchar la tarjeta mide lo mismo (no salta al empezar), tiene
     los pasos apagados y no va pegada: no le quita pantalla a quien solo lee. */
  await p.evaluate(() => verCap('cr05')); await p.waitForTimeout(300); r = await rp();
  ok(!r.activo && r.bot && Math.abs(r.alto - altoSonando) <= 2 && r.pos === 'static' && r.ant && r.sig,
    W + ' · tarjeta · en reposo mide ' + r.alto + ' px (sonando ' + altoSonando + '), con los pasos apagados y sin pegarse arriba');
  /* Un repaso: la unidad es la sección. */
  await p.evaluate(() => { verCap('mc-lista'); vozAlterna('estudio'); }); await p.waitForTimeout(200); r = await rp();
  ok(r.activo && r.seg === 5 && /^Sección 1 de 5 · /.test(r.n), W + ' · reproductor · en un repaso es el mismo, por secciones: ' + r.seg + ' partes, «' + r.n + '»');
  await p.evaluate(() => paraVoz());
  ok(voz.mod.includes('1. La Palabra de Dios.') && voz.mod.some(t => /^Para recordarlas\. Uno, uno y tres/.test(t)) && !voz.mod.some(t => /…/.test(t)),
    W + ' · voz · en los repasos se sigue oyendo todo: fila «1. La Palabra de Dios.», la ayuda, y ninguna pista');

  /* ── 3a. anterior y siguiente en el capítulo (v158) ── */
  await p.evaluate(() => verCap('cr01')); await p.waitForTimeout(900);
  /* ¿Se puede tocar de verdad? Lo que hay en el centro del botón tiene que ser el botón, no la barra de arriba. */
  const tapado = () => p.evaluate(() => { const b = document.querySelectorAll('#detalle .cap-nav .hoja-nav')[1], r = b.getBoundingClientRect();
    const e = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2); return e === b || b.contains(e) ? '' : (e ? e.tagName + '.' + String(e.className).split(' ')[0] : 'nada'); });
  const tap1 = await tapado();
  ok(tap1 === '', W + ' · siguiente · al abrir el capítulo, «Siguiente» queda a la vista y no detrás de la barra de arriba' + (tap1 ? ' — lo tapa ' + tap1 : ''));
  const nav1 = await p.evaluate(() => ({ filas: document.querySelectorAll('#detalle .cap-nav').length,
    alto: Math.min(...[...document.querySelectorAll('#detalle .cap-nav .hoja-nav')].map(x => Math.round(x.getBoundingClientRect().height))),
    arriba: Math.round(document.querySelector('#detalle .cap-nav').getBoundingClientRect().top), vh: innerHeight }));
  ok(nav1.filas === 2 && nav1.alto >= 44 && nav1.arriba > 0 && nav1.arriba < nav1.vh * 0.6,
    W + ' · siguiente · la fila está arriba y al final, a la vista al abrir (a ' + nav1.arriba + ' px) y con botones de ' + nav1.alto + ' px');
  await p.locator('#detalle .cap-nav .hoja-nav').nth(1).click(); await p.waitForTimeout(900);
  let it = await p.evaluate(() => ({ item: S.ultItem, t: document.querySelector('#detalle .cap-tit').textContent, cta: document.querySelector('#detalle .cap-nav .hoja-cta').textContent,
    arriba: Math.round(document.querySelector('#detalle .cap-nav').getBoundingClientRect().top), vh: innerHeight }));
  ok(it.item === 'cr02' && it.cta === '2 de 28' && it.arriba > 0 && it.arriba < it.vh * 0.6, W + ' · siguiente · un toque lleva a «' + it.t + '» (' + it.cta + ') y la fila queda a la mano para seguir');
  await p.locator('#detalle .cap-nav .hoja-nav').nth(1).click(); await p.waitForTimeout(700);
  await p.locator('#detalle .cap-nav').last().locator('.hoja-nav').first().click(); await p.waitForTimeout(700);
  it = await p.evaluate(() => S.ultItem);
  ok(it === 'cr02', W + ' · siguiente · dos adelante y uno atrás (con la fila del final) deja en la creencia 2');

  /* ── 3a2. al tocar Siguiente la página no sube y baja (v161) ──
     Se anotan TODAS las alturas por las que pasa la página durante un segundo. */
  const recorre = async (nombre, toca, destino) => {
    await p.evaluate(() => { window.__ys = []; window.__on = () => window.__ys.push(Math.round(scrollY)); addEventListener('scroll', window.__on, { passive: true }); });
    const y0 = await p.evaluate(() => Math.round(scrollY));
    await toca(); await p.waitForTimeout(1000);
    const r = await p.evaluate(() => { removeEventListener('scroll', window.__on);
      const d = document.getElementById('detalle'); return { ys: window.__ys, y: Math.round(scrollY), item: S.ultItem, top: Math.round(d.getBoundingClientRect().top), vh: innerHeight }; });
    const min = Math.min(y0, r.y), max = Math.max(y0, r.y);
    const fuera = r.ys.filter(y => y < min - 4 || y > max + 4);
    const tap = await tapado();
    ok(tap === '', W + ' · siguiente · ' + nombre + ': al llegar, «Siguiente» se puede tocar' + (tap ? ' — lo tapa ' + tap : ''));
    ok(r.item === destino && fuera.length === 0 && r.top >= -4 && r.top < r.vh * 0.5,
      W + ' · siguiente · ' + nombre + ': la página va de ' + y0 + ' a ' + r.y + ' sin pasar por otro lado (' + r.ys.length + ' movimientos' + (fuera.length ? ', se salió a ' + [...new Set(fuera)].slice(0, 4).join(', ') : '') + ') y el capítulo queda arriba (a ' + r.top + ' px)');
    return r;
  };
  await p.evaluate(() => verCap('cr05')); await p.waitForTimeout(1200);
  let rr = await recorre('Siguiente de arriba', () => p.locator('#detalle .cap-nav .hoja-nav').nth(1).click(), 'cr06');
  ok(rr.ys.length <= 2, W + ' · siguiente · y lo hace de una, sin animación (' + rr.ys.length + ' movimientos)');
  await p.evaluate(() => { const n = document.querySelectorAll('#detalle .cap-nav'); n[n.length - 1].scrollIntoView({ block: 'center' }); }); await p.waitForTimeout(300);
  await recorre('Siguiente del final', () => p.locator('#detalle .cap-nav').last().locator('.hoja-nav').nth(1).click(), 'cr07');
  await p.evaluate(() => { document.querySelector('#detalle .acc-fin .btn.ver').scrollIntoView({ block: 'center' }); }); await p.waitForTimeout(300);
  await recorre('«Ya lo estudié»', () => p.locator('#detalle .acc-fin .btn.ver').click(), 'cr08');
  /* Desde la rejilla, sin nada abierto: baja suave, pero nunca sube primero. */
  await p.evaluate(() => { ir('estudio'); document.getElementById('detalle').style.display = 'none'; document.querySelector('.cap.c-cr03').scrollIntoView({ block: 'center' }); }); await p.waitForTimeout(400);
  await recorre('una tarjeta de la rejilla', () => p.locator('.cap.c-cr03').click(), 'cr03');

  /* ── 3b. la hoja del versículo: el pie no va pegado al borde (v158) ── */
  await p.evaluate(() => {
    verCap('cr01');
    const b = [...document.querySelectorAll('#detalle .vref, #detalle .refs button')].find(x => /Tesalonicenses/.test(x.textContent));
    b.scrollIntoView({ block: 'center' }); b.click();
  });
  await p.waitForTimeout(500);
  const pie = await p.evaluate(() => {
    const ns = [...document.querySelectorAll('.hoja .hoja-nav')].map(x => x.getBoundingClientRect());
    return { aire: Math.round(innerHeight - Math.max(...ns.map(r => r.bottom))), alto: Math.round(Math.min(...ns.map(r => r.height))), n: ns.length };
  });
  ok(pie.n === 2 && pie.aire >= 24 && pie.alto >= 44, W + ' · hoja del versículo · Anterior y Siguiente a ' + pie.aire + ' px del borde y de ' + pie.alto + ' px de alto');
  await p.evaluate(() => cierraHoja());

  /* ── 3c. la lámina de Daniel 2 (v185): se abre desde el capítulo, cada
     etiqueta abre su explicación dentro de la imagen, la línea de tiempo
     enciende lo que gobernaba, y Presentar recorre los 16 pasos (v203: empieza por el cautiverio). ── */
  {
    await p.evaluate(() => { ponCat('pa'); ponPest('examen'); verCap('d2', true); });
    await p.waitForTimeout(300);
    /* v187: dos pestañas; en la del examen no se ve nada de la interpretación. */
    const vis = sel => p.evaluate(s => [...document.querySelectorAll(s)].filter(x => x.getClientRects().length).length, sel);
    const enEx = [await vis('#detalle [data-pest="prof"]'), await vis('#detalle .sec[data-pest="examen"]'), await vis('#detalle .cap-pest .pest')];
    ok(enEx[0] === 0 && enEx[1] > 5 && enEx[2] === 2, W + ' · «Para el examen» muestra solo el examen (' + enEx.join(', ') + ')');
    await p.locator('#detalle .pest-prof').click();
    await p.waitForTimeout(200);
    const enPr = [await vis('#detalle .sec[data-pest="examen"]'), await vis('#detalle .sec[data-pest="prof"]')];
    ok(enPr[0] === 0 && enPr[1] > 3, W + ' · «Para profundizar» muestra solo la interpretación (' + enPr.join(', ') + ')');
    ok(await p.locator('#detalle .lam-invita').count() === 1, W + ' · Daniel 2 ofrece el estudio interactivo');
    await p.locator('#detalle .lam-invita .btn.ver').click();
    await p.waitForTimeout(700);
    /* v215: Explorar abre en «Cautivos en Babilonia» (una imagen más: su escena) y la luz de
       cada parte es una copia de su capa detrás de la estatua (lam-brillo, no se cuenta). */
    const capas = await p.evaluate(() => document.querySelectorAll('#lamSvg .lam-estatua .lam-parte image').length);
    const imgs = await p.evaluate(async () => { const hs = [...document.querySelectorAll('#lamSvg image:not(.lam-brillo)')].map(i => i.getAttribute('href')).filter(Boolean);
      const r = await Promise.all(hs.map(h => fetch(h).then(x => x.ok && x.headers.get('content-type') === 'image/webp').catch(() => false))); return r.every(Boolean) && r.length; });
    ok(capas === 6 && imgs === 10, W + ' · la lámina trae las 6 capas de la estatua y sus 10 imágenes (' + capas + ', ' + imgs + ')');
    ok(await p.evaluate(() => !document.getElementById('lamEsc').classList.contains('cargando')), W + ' · v188: las imágenes cargan antes de mostrar la escena');
    /* v188: tocar la parte en la imagen hace lo mismo que su etiqueta. */
    const bronce = await p.evaluate(() => { const r = document.querySelector('#lamSvg .lam-parte[data-p="bronce"] .lam-hit').getBoundingClientRect(); return [r.x + r.width / 2, r.y + r.height * 0.6]; });
    await p.mouse.click(bronce[0], bronce[1]);
    await p.waitForTimeout(700);
    ok(/Grecia/.test(await p.evaluate(() => document.getElementById('lamHoja').textContent)), W + ' · v188: tocar el bronce en la imagen abre Grecia');
    await p.evaluate(() => lamInicio()); await p.waitForTimeout(500);
    await p.locator('#lamEts .lam-et[data-p="plata"]').click();
    await p.waitForTimeout(800);
    const hoja = await p.evaluate(() => { const h = document.getElementById('lamHoja'); const r = h.getBoundingClientRect(), e = document.getElementById('lamEsc').getBoundingClientRect();
      const cruza = r.left < e.right - 1 && r.right > e.left + 1 && r.top < e.bottom - 1 && r.bottom > e.top + 1;
      return { ver: !h.hidden, tx: h.textContent, libre: !cruza }; });
    ok(hoja.ver && /Medo-Persia/.test(hoja.tx) && /5:28/.test(hoja.tx) && hoja.libre, W + ' · tocar la etiqueta abre la explicación sin tapar la imagen');
    for (const [id, re] of [['piedra', /segunda venida/], ['monte', /reino eterno/i]]) {
      await p.evaluate(() => lamInicio()); await p.waitForTimeout(400);
      /* v212: el monte ya no tiene rótulo sobre la estatua: se elige en el riel. */
      /* v215: la piedra ya no tiene rótulo sobre la estatua (no está hasta su paso): las dos, por el riel. */
      await p.locator('#lamTira .lam-ri[data-p="' + id + '"]').click(); await p.waitForTimeout(1300);
      const r = await p.evaluate(() => [document.getElementById('lamHoja').textContent, document.querySelector('#lamSvg .lam-piedra').getAttribute('transform'), document.querySelector('#lamSvg .lam-monte').style.opacity]);
      ok(re.test(r[0]) && /translate\(550 1085\)/.test(r[1]) && (id !== 'monte' || r[2] === '1'), W + ' · «' + id + '» (rótulo o riel) explica y anima (' + r[1] + ')');
    }
    await p.evaluate(() => { const r = document.getElementById('lamRango'); r.value = 1520; r.dispatchEvent(new Event('input')); });
    const anio = await p.evaluate(() => [document.getElementById('lamTq').textContent, [...document.querySelectorAll('#lamSvg .lam-parte.on')].map(x => x.getAttribute('data-p')).sort().join()]);
    ok(/^Roma papal; a la vez, Roma dividida/.test(anio[0]) && anio[1] === 'barro,dedos', W + ' · en 1520 se encienden los dedos y el barro (v231: primero Roma papal; Roma dividida sigue a la vez): ' + anio.join(' / '));
    const ancho = await p.evaluate(() => { const l = document.getElementById('lam'); return l.scrollWidth - l.clientWidth; });
    ok(ancho <= 0, W + ' · la lámina no se desborda a lo ancho (' + ancho + ')');
    await p.keyboard.press('Escape');
    ok(await p.evaluate(() => document.getElementById('lam').hidden), W + ' · Escape cierra la lámina');
    await p.evaluate(() => { lamAbre('d2', 'presentar'); lamToca('hierro'); });
    const k = await p.evaluate(() => [lamPaso, lamPasos()[lamPaso].id]);
    if (W >= 1000) {
      const cabe = await p.evaluate(() => { const l = document.getElementById('lam'), b = document.getElementById('lamSig').getBoundingClientRect();
        return [l.scrollHeight - l.clientHeight, Math.round(b.bottom), innerHeight]; });
      ok(cabe[0] <= 1 && cabe[1] <= cabe[2], W + ' · v191: Presentar cabe en la pantalla, con Siguiente a la vista (' + cabe.join(', ') + ')');
    }
    ok(k[1] === 'hierro', W + ' · en Presentar, tocar el hierro lleva a su paso (' + (k[0] + 1) + ')');
    for (let i = 0; i < 18; i++) await p.keyboard.press('ArrowRight');
    await p.waitForTimeout(300);
    const fin = await p.evaluate(() => [document.getElementById('lamCuenta').textContent, document.getElementById('lamHoja').textContent]);
    ok(fin[0] === '17 / 17' && /¿Caes hoy sobre la piedra/.test(fin[1]) && /Daniel 2:34/.test(fin[1]), W + ' · Presentar recorre los 17 pasos: después de 2:45, la pregunta para la vida (' + fin[0] + ')');
    await p.evaluate(() => lamCierra());
  }
  /* ── 3c-bis. v211, la ronda de Camilo (14-oct) sobre v209/v210 ── */
  {
    /* Capas: al presentar, cada paso muestra solo su escena. Se pasa uno por uno, como
       con el control remoto; en los pasos de la estatua no queda ninguna escena encima. */
    await p.evaluate(() => lamAbre('d2', 'presentar')); await p.waitForTimeout(600);
    const malos = [];
    for (let k = 1; k <= 15; k++) {
      await p.evaluate(k => lamPres(k), k); await p.waitForTimeout(1800);
      const r = await p.evaluate(() => { const s = lamPasos()[lamPaso], op = sel => Number(getComputedStyle(document.querySelector('#lamSvg ' + sel)).opacity);
        return { tipo: s.tipo, id: s.id || '', hist: op('.lam-hist'), bg: op('.lam-hist-bg'), est: op('.lam-estatua') }; });
      const escena = r.tipo === 'hist' || r.tipo === 'desp';
      if (r.bg > .05 || (escena ? r.hist < .95 : r.hist > .05) || (r.tipo === 'parte' && r.id !== 'monte' && r.est < .95)) malos.push(k + ':' + r.tipo + r.id + ' h' + r.hist.toFixed(2) + ' bg' + r.bg.toFixed(2));
    }
    ok(!malos.length, W + ' · v211: al presentar Daniel 2 paso a paso, cada paso muestra solo su escena' + (malos.length ? ' (' + malos.join(', ') + ')' : ''));
    if (W >= 1000) {
      const llena = await p.evaluate(() => { lamPres(0); const e = document.getElementById('lamEsc').getBoundingClientRect(), m = document.getElementById('lam').getBoundingClientRect();
        return [Math.round(m.width - e.width), document.getElementById('lamSvg').getAttribute('preserveAspectRatio')]; });
      ok(llena[0] <= 60 && llena[1] === 'xMidYMid slice', W + ' · v211: al presentar, la escena llena el ancho del escenario, sin franjas (' + llena.join(', ') + ')');
    }
    await p.evaluate(() => lamCierra());
    /* La piedra y el monte, a la mano desde cualquier parte. */
    await p.evaluate(() => lamAbre('d2', 'explorar')); await p.waitForTimeout(700);
    await p.evaluate(() => lamElige(4)); await p.waitForTimeout(400);
    const sig = await p.evaluate(() => { const b = document.querySelector('#lam .lam-nav .lam-rd.sig'), r = b.getBoundingClientRect(); return [b.getAttribute('aria-label') + ' ' + document.querySelector('#lam .lam-nav-p').textContent, r.bottom <= innerHeight + 1 && r.top >= 0]; });
    const vistas = [];
    for (let i = 0; i < 3; i++) { await p.locator('#lam .lam-nav .lam-rd.sig').click(); await p.waitForTimeout(350); vistas.push(await p.evaluate(() => lamSel)); }
    const tira = await p.evaluate(() => [...document.querySelectorAll('#lamTira .lam-ri')].map(b => b.dataset.p).join());
    ok(/Hierro mezclado/.test(sig[0]) && sig[1] && vistas.join() === 'barro,piedra,monte' && /piedra,monte$/.test(tira),
      W + ' · v211: desde los dedos, Siguiente (a la vista) lleva al barro, la piedra y el monte; la tira los trae (' + vistas.join(' → ') + ')');
    /* La línea de tiempo: una pista, el tramo dentro; el año sobre la imagen; el futuro. */
    await p.evaluate(() => lamElige(1)); await p.waitForTimeout(300);
    const pista = await p.evaluate(() => { const a = document.getElementById('lamPista').getBoundingClientRect(), t = document.getElementById('lamTramo').getBoundingClientRect(); return [Math.round(t.top - a.top), Math.round(a.bottom - t.bottom), Math.round(t.width)]; });
    ok(pista[0] >= -1 && pista[1] >= -1 && pista[2] > 4, W + ' · v211: el periodo de la parte va dentro de la pista, no encima (' + pista.join(', ') + ')');
    const ve = async y => { await p.evaluate(y => { const r = document.getElementById('lamRango'); r.value = y; r.dispatchEvent(new Event('input')); }, y); await p.waitForTimeout(700);
      return p.evaluate(() => ({ tq: document.getElementById('lamTq').textContent, anio: !document.getElementById('lamAnioV').hidden && document.getElementById('lamAnioV').textContent,
        piedra: document.querySelector('#lamSvg .lam-piedra').style.opacity, monte: document.querySelector('#lamSvg .lam-monte').style.opacity,
        fant: [...document.querySelectorAll('#lamSvg .lam-parte.apagada')].map(x => Number(getComputedStyle(x).opacity)).filter(o => o < .99).length })); };
    const a1520 = await ve(1520), a1900 = await ve(1900), aP = await ve(2100), aM = await ve(2500);
    ok(/1520/.test(a1520.anio) && a1520.piedra === '0' && a1520.fant === 0, W + ' · v211: al recorrer, el año va sobre la imagen, la estatua no se ve fantasma y la piedra no flota (' + a1520.anio + ')');
    ok(/juicio/.test(a1900.tq) && /La piedra/.test(aP.tq) && aP.piedra === '1' && /monte/i.test(aM.tq) && aM.monte === '1',
      W + ' · v211: la línea de tiempo llega al futuro: 1844 el juicio, la piedra y el monte (' + [a1900.tq, aP.tq, aM.tq].join(' / ') + ')');
    await p.evaluate(() => lamCierra());
    /* Las señas: una <i> dentro del texto (Pontifex Maximus) no se vuelve el círculo del número. */
    await p.evaluate(() => { lamAbre('d7', 'explorar'); lamEligeX('senas'); }); await p.waitForTimeout(600);
    await p.evaluate(() => lamSena(0, true)); await p.waitForTimeout(1200);
    const sen = await p.evaluate(() => { const c = document.querySelector('#lamTabla .lam-sen-cap'), n = c.querySelector(':scope>i').getBoundingClientRect(), it = c.querySelector('p i'), r = it.getBoundingClientRect();
      return [getComputedStyle(it).display, !(r.left < n.right && r.right > n.left && r.top < n.bottom && r.bottom > n.top), it.textContent]; });
    ok(sen[0] === 'inline' && sen[1] && /Pontifex/.test(sen[2]), W + ' · v211: el número de la seña no tapa «Pontifex Maximus» (' + sen[0] + ')');
    await p.evaluate(() => lamCierra());
    /* Quién estudia: cada pastilla dice su actividad y abre esa ficha. */
    const cat = await p.evaluate(() => { const id = k => 'v211' + k; window.__dbAntes = JSON.stringify(DB);
      DB.alumnos = {}; ['appa', 'gm', 'me'].forEach(k => { DB.alumnos[id(k)] = Object.assign(normalizar(null), { nombre: 'Camilo', cat: k }); });
      DB.activo = id('gm'); S = DB.alumnos[DB.activo]; guardar(); abreYo();
      const ps = [...document.querySelectorAll('.alu-act')].map(x => x.textContent.replace(/\s+/g, ' ').trim());
      const pa = [...document.querySelectorAll('.alu-act')].find(x => /Padres/.test(x.textContent)); pa.click();
      return [ps.join(' | '), S.cat]; });
    ok(/Apocalipsis ?Padres y consejeros/.test(cat[0]) && /Daniel ?Guías Mayores/.test(cat[0]) && cat[1] === 'appa',
      W + ' · v211: «Quién estudia» dice la actividad de cada pastilla y abre la suya (' + cat.join(' → ') + ')');
    await p.evaluate(() => { cierraHoja(); DB = JSON.parse(window.__dbAntes); S = DB.alumnos[DB.activo]; guardar(); marcaCat(); });
  }
  /* ── 3c-ter. v212, la ronda de Camilo (14-oct, 13:00): la hoja nunca vacía, el riel
     de las partes con el teclado, nada cortado, y el monte y el cierre distintos. ── */
  {
    for (const id of ['d2', 'd7', 'd8']) {
      /* v215: Explorar abre en el primer paso de la historia; la portada es el paso «La estatua». */
      await p.evaluate(id => { lamAbre(id, 'explorar'); lamInicio(); }, id); await p.waitForTimeout(900);
      /* La portada es una hoja llena, no una barra: alto, título, pasaje y Siguiente. */
      const h = await p.evaluate(() => { const h = document.getElementById('lamHoja'), r = h.getBoundingClientRect();
        return { alto: Math.round(r.height), tx: h.textContent, intro: !!(h.querySelector('.lam-intro .lam-nav .lam-rd.sig')||document.querySelector('#lamPie .lam-nav .lam-rd.sig')), pista: h.querySelectorAll('.lam-pista').length,
          tit: h.querySelector('.lam-intro-tit') && h.querySelector('.lam-intro-tit').getBoundingClientRect().height }; });
      const I = await p.evaluate(id => LAMINAS[id].intro, id);
      ok(h.alto >= 220 && h.intro && h.pista === 0 && h.tit > 20 && h.tx.includes(I.titulo) && h.tx.includes(I.ref), W + ' · v212: ' + id + ' abre con la hoja llena (portada de ' + h.alto + ' px), no una barra vacía');
      /* El riel: todas las partes, con su miniatura, y las flechas pasan de parte llevando el foco. */
      /* v214: el riel va por las entradas (en Daniel 7 también las señas, los 1.260 años y las tres fases). */
      const n = await p.evaluate(() => lamEntradas().length);
      await p.locator('#lamTira .lam-ri').first().focus();
      await p.keyboard.press('ArrowDown'); await p.waitForTimeout(250); await p.keyboard.press('ArrowDown'); await p.waitForTimeout(250);
      const k1 = await p.evaluate(() => [lamSel, lamEntradas()[1].k, document.activeElement.dataset.p, document.querySelector('#lamTira .lam-ri[aria-current="true"]').dataset.p]);
      await p.keyboard.press('End'); await p.waitForTimeout(250);
      const k2 = await p.evaluate(() => [lamSel, lamEntradas()[lamEntradas().length - 1].k, document.activeElement.dataset.p]);
      await p.keyboard.press('ArrowUp'); await p.waitForTimeout(250);
      const k3 = await p.evaluate(() => [lamSel, lamEntradas()[lamEntradas().length - 2].k]);
      await p.keyboard.press('Home'); await p.waitForTimeout(250);
      const k4 = await p.evaluate(() => [lamSel, lamEntradas()[0].k, document.querySelectorAll('#lamTira .lam-ri .lam-ri-m > img,#lamTira .lam-ri .lam-ri-m > svg').length]);
      ok(k1[0] === k1[1] && k1[2] === k1[0] && k1[3] === k1[0] && k2[0] === k2[1] && k2[2] === k2[0] && k3[0] === k3[1] && k4[0] === k4[1] && k4[2] === n,
        W + ' · v212: ' + id + ', el riel elige con ↓ ↓ Fin ↑ Inicio y el foco lo sigue (' + [k1[0], k2[0], k3[0], k4[0]].join(' → ') + ')');
      /* Nada cortado: ni en el riel ni en Anterior/Siguiente, en ninguna parte. */
      const corta = await p.evaluate(async () => { const malos = [];
        const mira = (sel, d) => document.querySelectorAll(sel).forEach(e => { const cs = getComputedStyle(e);
          if (e.getClientRects().length && (e.scrollWidth > e.clientWidth + 1 || cs.textOverflow === 'ellipsis')) malos.push(d + ':' + e.textContent.trim().slice(0, 24)); });
        for (let i = 0; i < LAM().partes.length; i++) { lamElige(i); await new Promise(r => setTimeout(r, 60)); mira('#lam .lam-nav-p, #lam .lam-nav-n', 'nav' + i); }
        mira('#lamTira .lam-ri-t b, #lamTira .lam-ri-t small', 'riel'); return malos; });
      ok(!corta.length, W + ' · v212: ' + id + ', ningún nombre se corta en el riel ni en Anterior/Siguiente' + (corta.length ? ' (' + corta.slice(0, 4).join(', ') + ')' : ''));
      const rd = await p.evaluate(() => [...document.querySelectorAll('#lam .lam-nav .lam-rd')].map(b => { const r = b.getBoundingClientRect(); return Math.round(r.width) + 'x' + Math.round(r.height) + ':' + getComputedStyle(b).borderRadius; }));
      ok(rd.length === 2 && rd.every(x => /^4\dx4\d:50%$/.test(x) || /^4\dx4\d:\d+px$/.test(x)), W + ' · v212: Anterior y Siguiente son dos botones redondos (' + rd.join(', ') + ')');
      await p.evaluate(() => lamCierra());
    }
    /* Presentar Daniel 2: el monte sin la foto repetida; el cierre, otra imagen (la placa con toda la historia). */
    await p.evaluate(() => lamAbre('d2', 'presentar')); await p.waitForTimeout(600);
    const ver = async tipo => { await p.evaluate(t => lamPres(lamPasos().findIndex(s => s.tipo === t || s.id === t)), tipo); await p.waitForTimeout(1200);
      return p.evaluate(() => { const op = sel => Number(getComputedStyle(document.querySelector(sel)).opacity), f = document.getElementById('lamFin');
        return { monte: op('#lamSvg .lam-monte'), est: op('#lamSvg .lam-estatua'), figs: [...document.querySelectorAll('#lamHoja .lam-fig')].map(x => x.dataset.f).join(),
          fin: !!f && f.classList.contains('ve') && op('#lamFin') > .5, reel: f ? f.querySelectorAll('.lam-fin-reel li').length : 0, cuenta: document.getElementById('lamCuenta').textContent }; }); };
    const mo = await ver('monte'), ci = await ver('cierre'), mo2 = await ver('monte');
    ok(mo.monte > .95 && mo.figs === '' && !mo.fin, W + ' · v212: el paso del monte muestra el monte una sola vez (fotos en la hoja: «' + mo.figs + '»)');
    ok(ci.fin && ci.reel === 8 && ci.monte < .05 && ci.est > .95 && ci.cuenta === '16 / 17', W + ' · v212: el cierre es otra imagen: la placa con los 8 tiempos sobre la estatua en sombra, sin el monte (' + ci.cuenta + ')');
    ok(!mo2.fin && mo2.monte > .95, W + ' · v212: al volver del cierre al monte, la placa se va');
    await p.evaluate(() => lamCierra());
  }
  /* ── 3d. la lámina de Daniel 7 (v204): escenas, no estatua. Se ofrece en su
     capítulo; la tira de partes cambia la imagen y abre la hoja; la línea de
     tiempo muestra la escena del año (1798: Berthier); Presentar recorre los
     13 pasos con la imagen al lado del texto, y T oculta el texto. ── */
  {
    await p.evaluate(() => { ponCat('pa'); ponPest('prof'); verCap('d7', true); });
    await p.waitForTimeout(400);
    ok(await p.locator('#detalle .lam-invita').count() === 1, W + ' · Daniel 7 ofrece el estudio interactivo');
    await p.locator('#detalle .lam-invita .btn.ver').click();
    await p.waitForTimeout(900);
    const tira = await p.evaluate(async () => { const hs = [...document.querySelectorAll('#lamTira .lam-ri img'), document.querySelector('#lamSvg .lam-hist')].map(i => i.getAttribute('src') || i.getAttribute('href'));
      const r = await Promise.all(hs.map(h => fetch(h).then(x => x.ok && x.headers.get('content-type') === 'image/webp').catch(() => false)));
      return [document.querySelectorAll('#lamTira .lam-ri').length, r.every(Boolean) && r.length, !document.getElementById('lamEsc').classList.contains('cargando')]; });
    ok(tira[0] === 13 && tira[1] === 14 && tira[2], W + ' · Daniel 7: la tira trae las 10 partes, las señas, los 1.260 años y las tres fases, y sus imágenes cargan (' + tira.join(', ') + ')');
    const lado = await p.evaluate(() => { const r = document.getElementById('lamEsc').getBoundingClientRect(); return Math.round(r.width / r.height * 100) / 100; });
    ok(Math.abs(lado - 2050 / 1152) < 0.02, W + ' · la imagen de Daniel 7 es apaisada (' + lado + ')');
    /* v205: aquí se prueba la foto entera del oso; con oso-solo.png sube recortado sobre el mar (ver 3e). */
    await p.evaluate(() => { for (const k in lamHayP) delete lamHayP[k]; LAMINAS.d7.sube.solo.forEach(f => { lamHayImg[lamSrc(f)] = false; }); });
    await p.locator('#lamTira .lam-ri[data-p="oso"]').click();
    await p.waitForTimeout(2300); /* v205: el oso sube del mar (1,7 s) antes de quedar como imagen */
    const oso = await p.evaluate(() => { const h = document.getElementById('lamHoja'), r = h.getBoundingClientRect(), e = document.getElementById('lamEsc').getBoundingClientRect();
      return [h.textContent, document.querySelector('#lamSvg .lam-hist').getAttribute('href'), document.getElementById('lamChip').textContent,
        document.querySelector('#lamTira .lam-ri.on').dataset.p, !(r.left < e.right - 1 && r.right > e.left + 1 && r.top < e.bottom - 1 && r.bottom > e.top + 1)]; });
    await p.evaluate(() => LAMINAS.d7.sube.solo.forEach(f => { delete lamHayImg[lamSrc(f)]; }));
    ok(/Medo-Persia/.test(oso[0]) && /Lidia/.test(oso[0]) && /d7\/oso\.webp$/.test(oso[1]) && /^Oso/.test(oso[2]) && oso[3] === 'oso' && oso[4],
      W + ' · tocar el oso en la tira cambia la imagen y abre su explicación sin taparla');
    await p.locator('#lamTira .lam-ri[data-p="cuerno"]').click();
    await p.waitForTimeout(700);
    const cu = await p.evaluate(() => [document.getElementById('lamHoja').textContent, [...document.querySelectorAll('#lamHoja .lam-fig')].map(f => f.dataset.f).join()]);
    ok(/Roma papal/.test(cu[0]) && /13:3/.test(cu[0]) && /d2\/e538/.test(cu[1]) && /d2\/e1798/.test(cu[1]), W + ' · el cuerno pequeño trae 538 y 1798 de Daniel 2 (' + cu[1] + ')');
    for (const [y, re, img] of [[1798, /Roma dividida/, 'cuarta'], [1520, /^Roma papal; a la vez, Roma dividida/, 'cuerno'], [1900, /el juicio en el cielo/i, 'juicio']]) {
      await p.evaluate(y => { const r = document.getElementById('lamRango'); r.value = y; r.dispatchEvent(new Event('input')); }, y);
      await p.waitForTimeout(300);
      const a = await p.evaluate(() => [document.getElementById('lamTq').textContent, document.querySelector('#lamSvg .lam-hist').getAttribute('href'), [...document.querySelectorAll('#lamHoja .lam-fig')].map(f => f.dataset.f).join()]);
      ok(re.test(a[0]) && a[1].endsWith('d7/' + img + '.webp') && (y !== 1798 || a[2] === 'd2/e1798'), W + ' · Daniel 7 en ' + y + ': ' + a[0] + ' · ' + a[1].split('/').pop() + ' · ' + a[2]);
    }
    const ancho = await p.evaluate(() => { const l = document.getElementById('lam'); return l.scrollWidth - l.clientWidth; });
    ok(ancho <= 0, W + ' · la lámina de Daniel 7 no se desborda a lo ancho (' + ancho + ')');
    await p.keyboard.press('Escape');
    ok(await p.evaluate(() => document.getElementById('lam').hidden), W + ' · Escape cierra la lámina de Daniel 7');
    await p.evaluate(() => { lamAbre('d7', 'presentar'); lamToca('juicio'); });
    await p.waitForTimeout(600);
    const k = await p.evaluate(() => [lamPasos()[lamPaso].id, document.querySelector('#lamSvg .lam-hist').getAttribute('href'), document.getElementById('lamHoja').textContent]);
    ok(k[0] === 'juicio' && k[1].endsWith('d7/juicio.webp') && /1844/.test(k[2]), W + ' · en Presentar, la parte del juicio lleva a su paso y su imagen');
    if (W >= 1000) {
      const cabe = await p.evaluate(() => { const l = document.getElementById('lam'), b = document.getElementById('lamSig').getBoundingClientRect(), h = document.getElementById('lamHoja').getBoundingClientRect(),
        i = document.querySelector('#lamSvg .lam-hist').getBoundingClientRect();
        return [l.scrollHeight - l.clientHeight, Math.round(b.bottom), innerHeight, Math.round(i.right - h.left)]; });
      ok(cabe[0] <= 1 && cabe[1] <= cabe[2] && cabe[3] <= 4, W + ' · Daniel 7 al presentar cabe en la pantalla, con la imagen a la izquierda del texto (' + cabe.join(', ') + ')');
    }
    await p.keyboard.press('t'); await p.waitForTimeout(300);
    const sin = await p.evaluate(() => [document.getElementById('lam').classList.contains('sin-texto'), getComputedStyle(document.getElementById('lamHoja')).display, document.querySelector('#lamSvg .lam-hist').getAttribute('preserveAspectRatio')]);
    /* v211: en pantalla ancha la escena va a todo el alto, entera, y lo que sobra es la misma imagen a media luz. */
    const amb = await p.evaluate(() => Number(document.querySelector('#lamSvg .lam-hist-amb').style.opacity || 0));
    ok(sin[0] && sin[1] === 'none' && (W >= 1000 ? sin[2] === 'xMidYMid meet' && amb > .2 : sin[2] === 'xMidYMid slice'), W + ' · la tecla T oculta el texto y la imagen toma toda la escena');
    await p.keyboard.press('t');
    await p.evaluate(() => lamPres(0));
    /* v205: 28 pasos con el clicker (los 4 del juicio, los 2 del Hijo del hombre y
       las 11 señas van dentro de su parte); el contador cuenta 14. */
    const nPasos = await p.evaluate(() => lamPasos().length);
    for (let i = 0; i < nPasos; i++) await p.keyboard.press(i % 2 ? 'PageDown' : 'ArrowRight');
    await p.waitForTimeout(700);
    const fin = await p.evaluate(() => [document.getElementById('lamCuenta').textContent, document.getElementById('lamHoja').textContent, document.querySelector('#lamSvg .lam-hist').getAttribute('href'), document.getElementById('lamSig').disabled]);
    ok(nPasos === 30 && fin[0] === '19 / 19' && fin[3] && /se hizo justicia a los santos/.test(fin[1]) && fin[2].endsWith('d7/juicio.webp'), W + ' · Presentar recorre los ' + nPasos + ' pasos de Daniel 7 (contador ' + fin[0] + ') y termina en 7:22');
    await p.evaluate(() => lamCierra());
  }
  /* ── 3e. Daniel 7 interactivo (v205): con Daniel 2 se enciende el metal de cada
     parte; los diez cuernos y los tres que caen (con y sin las capas
     cuerno-suelto.png y cuerno-pequeno.png); el juicio por pasos; 1844 en la
     línea de tiempo; las once señas; las bestias suben del mar. Con «reducir
     movimiento» cada vista queda en su estado final de una vez. ── */
  {
    await p.emulateMedia({ reducedMotion: 'reduce' });
    await p.evaluate(() => lamAbre('d7', 'explorar'));
    await p.waitForTimeout(600);
    const metales = await p.evaluate(() => LAMINAS.d7.paralelo.map(r => { lamEligeE(LAMINAS.d7.partes.findIndex(q => q.id === r[0]));
      const d = document.getElementById('lamD2'), on = [...d.querySelectorAll('img[data-p].on,.lam-d2-pie button.on')].map(x => x.dataset.p);
      return r[0] + ':' + (d.hidden ? 'oculta' : d.classList.contains('agrega') ? 'agrega' : on.join('+')); }).join(' '));
    ok(metales === 'leon:oro oso:plata leopardo:bronce bestia:hierro cuernos:dedos cuerno:barro juicio:agrega hijo:agrega santos:piedra reino:monte',
      W + ' · con Daniel 2 cada parte enciende su metal y el juicio dice que lo agrega Daniel 7 (' + metales + ')');
    const ag = await p.evaluate(() => { lamEligeE(LAMINAS.d7.partes.findIndex(q => q.id === 'juicio')); return [document.getElementById('lamD2Ag').textContent, document.getElementById('lamChip').textContent]; });
    ok(/El juicio/.test(ag[0]) && /lo agrega Daniel 7/.test(ag[1]), W + ' · el juicio: «lo que Daniel 7 agrega» (' + ag[1].slice(-40) + ')');
    await p.evaluate(() => { lamEligeE(0); document.querySelector('#lamD2 .lam-d2-hit[data-p="plata"]').click(); });
    ok(await p.evaluate(() => lamSel === 'oso'), W + ' · tocar la plata en la estatua chica abre el oso');
    await p.locator('.lam-tira-bots .lam-cond2').click();
    ok(await p.evaluate(() => document.getElementById('lamD2').hidden && !/Daniel 2/.test(document.getElementById('lamChip').textContent)), W + ' · «Con Daniel 2» se apaga');
    await p.locator('.lam-tira-bots .lam-cond2').click();
    /* Las capas (cuerno-8.png, cuarta-sin-tres.png, leon-solo.png…) ya existen; el camino sin ellas se
       fuerza sembrando «no existe» en lo que la app ya averiguó (lamHayImg), y se
       vuelve a probar con los archivos reales. */
    const capas = (hay) => p.evaluate(hay => { const L = LAMINAS.d7, K = L.cuernos.capas, fs = [K.sin.f, K.pequeno, ...K.tres.map(t => t.f), ...L.sube.solo];
      for (const k in lamHayP) delete lamHayP[k];
      fs.forEach(f => { const s = lamSrc(f); if (hay) delete lamHayImg[s]; else lamHayImg[s] = false; }); }, hay);
    await capas(false);
    /* Sin capas: de cuarta.webp a cuerno.webp. */
    const diez = await p.evaluate(() => { lamEligeE(4); return [document.querySelectorAll('#lamMarcasImg .lam-pt.ve').length, document.querySelectorAll('#lamMarcasImg .lam-ley span').length, document.querySelector('#lamSvg .lam-hist').getAttribute('href')]; });
    ok(diez[0] === 10 && diez[1] === 10 && diez[2].endsWith('d7/cuarta.webp'), W + ' · los diez cuernos se cuentan sobre cuarta.webp (' + diez.join(', ') + ')');
    await p.evaluate(() => lamEligeE(5)); await p.waitForTimeout(500);
    const fot = await p.evaluate(() => [document.querySelector('#lamSvg .lam-hist').getAttribute('href'), document.querySelectorAll('#lamMarcasImg .lam-ley .cae').length,
      [...document.querySelectorAll('#lamMarcasImg .lam-ley .cae b')].map(b => b.textContent).join(), document.querySelectorAll('#lamZoom .lam-suelto').length, !!document.querySelector('#lamMarcasImg .lam-pt.pq.ve')]);
    ok(fot[0].endsWith('d7/cuerno.webp') && fot[1] === 3 && fot[2] === 'Hérulos,Vándalos,Ostrogodos' && fot[3] === 0 && fot[4],
      W + ' · sin capas: caen hérulos, vándalos y ostrogodos y queda cuerno.webp con el pequeño (' + fot.join(', ') + ')');
    await p.evaluate(() => lamEligeE(2)); await p.waitForTimeout(300);
    const subeSin = await p.evaluate(() => { return [document.querySelectorAll('#lamZoom .lam-atras,#lamZoom .lam-sube-img').length, document.querySelector('#lamSvg .lam-hist').getAttribute('href')]; });
    ok(subeSin[0] === 0 && subeSin[1].endsWith('d7/leopardo.webp'), W + ' · sin capas: el leopardo es su foto entera (' + subeSin.join(', ') + ')');
    /* Con las capas reales. */
    await capas(true);
    await p.evaluate(() => { lamEligeE(4); lamEligeE(5); });
    await p.waitForTimeout(800);
    const cap = await p.evaluate(() => { const g = document.querySelector('#lamZoom .lam-capa-g'), h = [...g.querySelectorAll('.lam-suelto')];
      return [document.querySelector('#lamSvg .lam-hist').getAttribute('href'), h.length, h.every((x, i) => /translate\((?!0 0)/.test(x.getAttribute('transform')) && x.style.opacity !== '0' && x.getAttribute('href').endsWith('cuerno-' + (8 + i) + '.png')),
        g.querySelector('.lam-sin').style.opacity, g.querySelector('.lam-pq-g').getAttribute('transform'), document.querySelectorAll('#lamMarcasImg .lam-ley .cae').length,
        /* v214: el pequeño queda en la cresta, en el hueco de los tres, detrás del cuerno 7 y nunca sobre los ojos (y ≥ 160 es la cara). */
        (() => { const b = g.querySelector('.lam-pq-img').getBBox(), d = g.querySelector('.lam-delante'); return [Math.round(b.x), Math.round(b.y + b.height), !!d && d.compareDocumentPosition(g.querySelector('.lam-pq-img')) === Node.DOCUMENT_POSITION_PRECEDING].join('/'); })()]; });
    ok(cap[0].endsWith('d7/cuarta.webp') && cap[1] === 3 && cap[2] && cap[3] === '1' && /translate\(0 0\.0\).*scale\(1\.000\)/.test(cap[4]) && cap[5] === 3 && /\/true$/.test(cap[6]) && Number(cap[6].split('/')[1]) <= 160,
      W + ' · con las capas: los tres recortados se desprenden de su sitio, el pequeño sube detrás del 7 y queda más grande (' + cap.join(', ') + ')');
    await p.evaluate(() => lamEligeE(2)); await p.waitForTimeout(800);
    const subeCon = await p.evaluate(() => [[...document.querySelectorAll('#lamZoom .lam-atras')].map(i => i.getAttribute('href').split('/').pop()).join(), (document.querySelector('#lamZoom .lam-sube-img') || { getAttribute: () => '' }).getAttribute('href').split('/').pop(), document.querySelector('#lamSvg .lam-hist').getAttribute('href').split('/').pop()]);
    ok(subeCon.join(' | ') === 'leon-solo.png,oso-solo.png | leopardo-solo.png | mar.webp', W + ' · con capas: el leopardo sube del mar y el león y el oso quedan atrás (' + subeCon.join(' | ') + ')');
    await p.evaluate(() => lamEligeE(3)); await p.waitForTimeout(800);
    const bes = await p.evaluate(() => [document.querySelectorAll('#lamZoom .lam-atras,#lamZoom .lam-sube-img').length, document.querySelector('#lamSvg .lam-hist').getAttribute('href').split('/').pop()]);
    ok(bes[0] === 0 && bes[1] === 'cuarta.webp', W + ' · la cuarta bestia, sin capa propia, sube con su foto entera (' + bes.join(', ') + ')');
    await capas(false);
    await p.evaluate(() => lamEligeE(5)); await p.waitForTimeout(300);
    /* Las once señas: v214, una entrada propia del riel, después del cuerno pequeño. */
    const rielX = await p.evaluate(() => [...document.querySelectorAll('#lamTira .lam-ri')].map(b => b.getAttribute('data-p')).join(' '));
    ok(/cuerno x-senas x-periodo juicio hijo x-fases santos/.test(rielX), W + ' · v214: en Explorar, las señas, los 1.260 años y las tres fases son entradas del riel (' + rielX + ')');
    await p.evaluate(() => lamEligeX('senas')); await p.waitForTimeout(200);
    const hx = await p.evaluate(() => [document.querySelector('#lamTira .lam-ri.on').getAttribute('data-p'), /Las once señas/.test(document.getElementById('lamHoja').textContent), document.querySelector('#lam .lam-nav-p').textContent]);
    ok(hx[0] === 'x-senas' && hx[1] && /Tiempo, tiempos y medio tiempo/.test(hx[2]), W + ' · v214: la entrada de las señas tiene su hoja y Siguiente lleva a los 1.260 años (' + hx[2] + ')');
    await p.evaluate(() => lamSenasPlay()); await p.waitForTimeout(300);
    const se = await p.evaluate(() => [document.querySelectorAll('#lamSenas li').length, document.querySelectorAll('#lamSenas li.on').length]);
    ok(se[0] === 11 && se[1] === 11, W + ' · las once señas del cuerno se encienden (' + se.join(', ') + ')');
    const pe = await p.evaluate(() => { lamEligeX('periodo'); lamPerE(1); return [document.querySelector('#lamTabla .lam-eq.grande').textContent, document.getElementById('lamPerTx').textContent, document.querySelector('.lam-per-c .lam-subs button.on').dataset.per]; });
    ok(/1.260 días→1.260 años/.test(pe[0]) && /Números 14:34/.test(pe[1]) && pe[2] === '1', W + ' · en Explorar, la cuenta de los 1.260 años va por pasos (un día por un año)');
    /* El juicio por pasos: la imagen se acerca a la parte del texto de cada paso. */
    await p.evaluate(() => lamEligeE(6));
    const ju = [];
    for (let j = 0; j < 4; j++) ju.push(await p.evaluate(j => { lamSubE(j); const P = lamParte('juicio').pasos[j];
      return document.getElementById('lamZoom').getAttribute('viewBox') === P.caja.map(n => n.toFixed(1)).join(' ') && document.getElementById('lamSubTx').textContent.includes(P.texto) &&
        document.getElementById('lamChip').textContent.includes(P.t); }, j));
    ok(ju.every(Boolean), W + ' · el juicio en 4 pasos: tronos, Anciano de días, río de fuego, libros (' + ju.join() + ')');
    const fe = await p.evaluate(() => { lamEligeX('fases'); lamFasE(2); return [document.getElementById('lamFasTx').textContent, document.querySelectorAll('#lamTabla .lam-fp.on').length, document.querySelector('.lam-fas-c .lam-subs button.on').dataset.fa]; });
    ok(/Daniel 7:27/.test(fe[0]) && /en la segunda venida/i.test(fe[0]) && fe[1] === 3 && fe[2] === '2', W + ' · en Explorar, las tres fases del juicio se encienden una por una (' + fe.slice(1).join(', ') + ')');
    /* v214: los personajes en la lámina: el nombre se toca, sube su tarjeta y Escape la cierra sin cerrar la lámina. */
    await p.evaluate(() => lamEligeE(5)); await p.waitForTimeout(200);
    const per = await p.evaluate(() => { const bs = [...document.querySelectorAll('#lamHoja button.per')].map(b => b.textContent);
      const fu = document.querySelector('#lamHoja .lam-fu'); return [bs.join('|'), fu ? fu.querySelectorAll('button.per').length : -1]; });
    ok(/Louis-Alexandre Berthier/.test(per[0]) && /hérulos|Hérulos/.test(per[0]) && /Pío VI/.test(per[0]) && per[1] === 0, W + ' · v214: en la hoja del cuerno los nombres se tocan, nunca en la fuente (' + per[0] + ')');
    await p.locator('#lamHoja button.per', { hasText: 'Louis-Alexandre Berthier' }).first().click();
    const tj = await p.evaluate(() => { const c = document.getElementById('lamPerC'); return [!!c && !c.hidden, c ? c.querySelector('.lam-perc-n').textContent : '', c ? /1798/.test(c.textContent) : false]; });
    await p.keyboard.press('Escape'); await p.waitForTimeout(100);
    const tras = await p.evaluate(() => [document.getElementById('lamPerC').hidden, !document.getElementById('lam').hidden, lamSel]);
    ok(tj[0] && tj[1] === 'Louis-Alexandre Berthier' && tj[2] && tras[0] && tras[1] && tras[2] === 'cuerno', W + ' · v214: su tarjeta sube encima y Escape la cierra sin salir de la lámina (' + tj[1] + ')');
    /* 1844 en la línea de tiempo. */
    const t44 = await p.evaluate(() => { const r = document.getElementById('lamRango'); r.value = 1844; r.dispatchEvent(new Event('input'));
      return [[...document.querySelectorAll('.lam-marcas span')].filter(x => /1844/.test(x.textContent)).map(x => x.textContent).join(), document.querySelector('#lamSvg .lam-hist').getAttribute('href'), document.getElementById('lamTq').textContent]; });
    ok(/1844/.test(t44[0]) && t44[1].endsWith('d7/juicio.webp'), W + ' · la línea de tiempo marca 1844 y ahí empieza el juicio (' + t44.join(' · ') + ')');
    const r43 = await p.evaluate(() => { const r = document.getElementById('lamRango'); r.value = 1843; r.dispatchEvent(new Event('input')); return document.querySelector('#lamSvg .lam-hist').getAttribute('href'); });
    ok(!r43.endsWith('juicio.webp'), W + ' · antes de 1844 todavía no está el juicio (' + r43.split('/').pop() + ')');
    /* «Ver la visión»: empieza en el mar y la pausa la detiene. */
    await p.locator('#lamVision').click(); await p.waitForTimeout(1700);
    const vis = await p.evaluate(() => [document.getElementById('lamVision').getAttribute('aria-pressed'), lamSel, document.querySelector('#lamSvg .lam-hist').getAttribute('href')]);
    await p.locator('#lamVision').click();
    ok(vis[0] === 'true' && vis[1] === 'leon' && await p.evaluate(() => !lamVis), W + ' · «Ver la visión» sale del mar con el león y se pausa (' + vis.slice(1).join(', ') + ')');
    const ancho = await p.evaluate(() => { lamEligeE(5); const l = document.getElementById('lam'); return l.scrollWidth - l.clientWidth; });
    ok(ancho <= 0, W + ' · Daniel 7 interactivo no se desborda a lo ancho (' + ancho + ')');
    await p.evaluate(() => lamCierra());
    /* Presentar: las bestias suben del mar, los tres cuernos caen, el juicio por pasos y una seña por paso. */
    await p.evaluate(() => lamAbre('d7', 'presentar'));
    const pres = await p.evaluate(() => lamPasos().map(x => x.tipo === 'parte' ? x.id + (x.sub != null ? x.sub : '') : x.tipo === 'senas' ? 's' + x.sub : x.tipo === 'senasT' ? 'S' : x.tipo === 'senasG' ? 'G' + x.sub : x.tipo === 'periodo' ? 't' + x.sub : x.tipo === 'fases' ? 'f' + x.sub : x.tipo[0]).join(' '));
    ok(pres === 'p h h leon oso leopardo bestia cuernos cuerno G0 G1 G2 t0 t1 t2 t3 juicio0 juicio1 juicio2 juicio3 hijo0 hijo1 f0 f1 f2 santos reino d c a',
      W + ' · Presentar: ' + pres);
    /* v214: en Presentar también: el nombre sobre la imagen (la seña) se toca y la presentación no se mueve. */
    {
      const k3 = await p.evaluate(() => lamPasos().findIndex(x => x.tipo === 'senasG' && x.sub === 0));
      await p.evaluate(k => lamPres(k), k3); await p.waitForTimeout(200);
      /* Sobre la imagen en pantalla ancha; en el teléfono el texto de la seña va en la hoja. */
      const b = p.locator('#lamTabla button.per:visible, #lamHoja button.per:visible').first();
      const hay = await b.count();
      if (hay) await b.click();
      const pc = await p.evaluate(() => { const c = document.getElementById('lamPerC'); return [!!c && !c.hidden, c ? c.querySelector('.lam-perc-n').textContent : '', lamPaso]; });
      await p.keyboard.press('Escape'); await p.waitForTimeout(100);
      const pd = await p.evaluate(() => [document.getElementById('lamPerC').hidden, lamModo, lamPaso]);
      ok(hay && pc[0] && /Rómulo Augústulo/.test(pc[1]) && pd[0] && pd[1] === 'presentar' && pd[2] === pc[2], W + ' · v214: en Presentar, Rómulo Augústulo se toca y Escape vuelve al mismo paso (' + pc[1] + ')');
    }
    /* v227: las once señas en tres pasos: de dónde sale, qué es, qué hace. */
    const gs = [];
    for (let g = 0; g < 3; g++) {
      await p.evaluate(g => lamPres(lamPasos().findIndex(x => x.tipo === 'senasG' && x.sub === g)), g); await p.waitForTimeout(250);
      gs.push(await p.evaluate(() => [document.querySelector('#lamTabla:not([hidden]) .lam-sen-tit b').textContent, document.querySelectorAll('#lamTabla .lam-sen-g li').length, document.querySelectorAll('#lamHoja .lam-sl li').length, document.getElementById('lamCuenta').textContent,
        (() => { const t = document.getElementById('lamTabla'); return t.scrollHeight - t.clientHeight <= 2; })()]));
    }
    ok(gs.map(x => x[0]).join('|') === 'De dónde sale|Qué es|Qué hace' && gs.reduce((a, x) => a + x[1], 0) === 11 && gs.every(x => x[1] === x[2] && x[4]),
      W + ' · v227: Presentar, las once señas en tres pasos que caben en la imagen (' + gs.map(x => x[0] + ' ' + x[1] + ' · ' + x[3]).join(', ') + ')');
    /* v208: tiempo, tiempos y medio tiempo: la cuenta, día por año, Apocalipsis y 538 → 1798. */
    const t0 = await p.evaluate(() => { lamPres(lamPasos().findIndex(x => x.tipo === 'periodo' && x.sub === 0));
      return [document.querySelectorAll('#lamTabla .lam-fila.ve').length, document.querySelector('#lamTabla .lam-per-total b').textContent, document.getElementById('lamHoja').textContent, document.getElementById('lamCuenta').textContent]; });
    ok(t0[0] === 3 && t0[1] === '1.260 días' && /hasta tiempo, tiempos y medio tiempo/.test(t0[2]) && t0[3] === '11 / 19', W + ' · tiempo, tiempos y medio tiempo: 360 + 720 + 180 = 1.260 días (' + t0[1] + ', ' + t0[3] + ')');
    const t2 = await p.evaluate(() => { lamPres(lamPasos().findIndex(x => x.tipo === 'periodo' && x.sub === 2)); return [document.querySelectorAll('#lamTabla .lam-igual').length, document.getElementById('lamHoja').textContent]; });
    ok(t2[0] === 3 && /cuarenta y dos meses/.test(t2[1]) && /mil doscientos sesenta días/.test(t2[1]) && /Apocalipsis 12:14/.test(t2[1]), W + ' · el mismo tiempo en Apocalipsis: 3½ tiempos, 42 meses, 1.260 días');
    const t3 = await p.evaluate(() => { lamPres(lamPasos().findIndex(x => x.tipo === 'periodo' && x.sub === 3)); const b = document.getElementById('lamTramo');
      return [[...document.querySelectorAll('#lamTabla .lam-cum img')].map(i => i.getAttribute('src').split('/').pop()).join(), b && b.classList.contains('ve') && b.classList.contains('banda') && b.getBoundingClientRect().width > 50, document.getElementById('lamRango').value, document.getElementById('lamTano').textContent]; });
    ok(t3[0] === 'e538.webp,e1798.webp' && t3[1] && t3[2] === '538' && /538 – 1798/.test(t3[3]), W + ' · de 538 a 1798: las dos escenas y la franja en la línea de tiempo; v231: el pulgar al inicio, 538 (' + t3.join(', ') + ')');
    const anchoT = await p.evaluate(() => { const l = document.getElementById('lam'), t = document.getElementById('lamTabla'); return [l.scrollWidth - l.clientWidth, t.scrollHeight - t.clientHeight]; });
    ok(anchoT[0] <= 0 && anchoT[1] <= 2, W + ' · la cuenta de los 1.260 años cabe en la imagen (' + anchoT.join(', ') + ')');
    const ij = await p.evaluate(() => lamPasos().findIndex(x => x.id === 'juicio' && x.sub === 2));
    await p.evaluate(k => lamPres(k), ij);
    const JUICIO2 = await p.evaluate(() => lamParte('juicio').pasos[2].caja.map(n => n.toFixed(1)).join(' '));
    const pj = await p.evaluate(() => [document.getElementById('lamHoja').textContent, document.getElementById('lamZoom').getAttribute('viewBox'), document.getElementById('lamCuenta').textContent]);
    ok(/paso 3 de 4/.test(pj[0]) && /Un río de fuego procedía/.test(pj[0]) && pj[1] === JUICIO2 && pj[2] === '12 / 19', W + ' · el juicio, paso 3 de 4 en Presentar (' + pj[1] + ', ' + pj[2] + ')');
    /* v210: «El Juez se sentó y los libros fueron abiertos»: con «reducir movimiento», el cuadro final (libro abierto, luces, cita). */
    const lb = await p.evaluate(() => { lamPres(lamPasos().findIndex(x => x.id === 'juicio' && x.sub === 3)); const l = document.getElementById('lamLibro'), c = document.querySelector('.lam-libro-cita');
      return [!!l && l.classList.contains('abre') && l.classList.contains('luz'), !!c && /El Juez se sentó y los libros fueron abiertos/.test(c.textContent) && getComputedStyle(c).opacity === '1',
        document.querySelectorAll('#lamZoom .lam-j-trono,#lamZoom .lam-j-lib').length, getComputedStyle(document.getElementById('lamChip')).opacity, document.getElementById('lamCuenta').textContent]; });
    ok(lb[0] && lb[1] && lb[2] === 4 && lb[3] === '0' && lb[4] === '12 / 19', W + ' · los libros fueron abiertos: el libro abierto, la luz del trono y de los libros, y la cita (' + lb.slice(2).join(', ') + ')');
    const fa = await p.evaluate(() => { lamPres(lamPasos().findIndex(x => x.tipo === 'fases' && x.sub === 1)); const t = document.getElementById('lamTabla');
      return [t.querySelectorAll('.lam-fp').length, t.querySelectorAll('.lam-fp.on').length, [...t.querySelectorAll('.lam-fp')].findIndex(e => e.classList.contains('ahora')), document.getElementById('lamHoja').textContent, document.getElementById('lamCuenta').textContent, t.scrollHeight - t.clientHeight, document.querySelector('#lamSvg .lam-hist').getAttribute('href')]; });
    ok(fa[0] === 3 && fa[1] === 2 && fa[2] === 1 && /Daniel 7:14/.test(fa[3]) && /Sentencia/.test(fa[3]) && fa[4] === '14 / 19' && fa[5] <= 2 && fa[6].endsWith('d7/juicio.webp') && !/Daniel 12:1/.test(fa[3].split('Lo que significa')[0].split('RV1995')[1] || ''),
      W + ' · las tres fases del juicio: la segunda encendida sobre la imagen del juicio (' + [fa[1], fa[2], fa[4], fa[5]].join(', ') + ')');
    await p.keyboard.press('ArrowRight'); await p.waitForTimeout(200);
    ok(await p.evaluate(() => document.querySelectorAll('#lamTabla .lam-fp.on').length === 3 && /Daniel 7:27/.test(document.getElementById('lamHoja').textContent)), W + ' · con el clicker, la tercera fase (Ejecución)');
    await p.evaluate(k => lamPres(k), ij);
    await p.keyboard.press('t'); await p.waitForTimeout(300);
    const sinT = await p.evaluate(() => [document.getElementById('lam').classList.contains('sin-texto'), getComputedStyle(document.getElementById('lamHoja')).display, document.getElementById('lamChip').hidden]);
    ok(sinT[0] && sinT[1] === 'none' && !sinT[2], W + ' · T oculta el texto en el juicio por pasos y queda la etiqueta sobre la imagen');
    await p.keyboard.press('t');
    if (W >= 1000) {
      const cabe = await p.evaluate(() => { const l = document.getElementById('lam'), b = document.getElementById('lamSig').getBoundingClientRect(); return [l.scrollHeight - l.clientHeight, Math.round(b.bottom), innerHeight]; });
      ok(cabe[0] <= 1 && cabe[1] <= cabe[2], W + ' · el juicio por pasos cabe en la pantalla al presentar (' + cabe.join(', ') + ')');
    }
    const anchoP = await p.evaluate(() => { const l = document.getElementById('lam'); return l.scrollWidth - l.clientWidth; });
    ok(anchoP <= 0, W + ' · Presentar Daniel 7 no se desborda a lo ancho (' + anchoP + ')');
    await p.evaluate(() => lamCierra());
    await capas(true);
    await p.emulateMedia({ reducedMotion: 'no-preference' });
  }
  /* v189: tocar el nombre de un personaje abre su ficha en la hoja. */
  {
    await p.evaluate(() => { ponCat('pa'); ponPest('prof'); verCap('d2', true); });
    await p.waitForTimeout(400);
    await p.locator('#detalle button.per', { hasText: 'Berthier' }).first().click();
    await p.waitForTimeout(500);
    const f = await p.evaluate(() => { const h = document.getElementById('hoja'); return [!h.hidden, h.textContent]; });
    ok(f[0] && /Louis-Alexandre Berthier/.test(f[1]) && /1798/.test(f[1]), W + ' · v189: tocar «Berthier» abre su ficha');
    await p.evaluate(() => cierraHoja()); await p.waitForTimeout(300);
  }
  /* v190: el candelabro de Daniel 1-7: tocar una lámpara enciende su pareja. */
  {
    await p.evaluate(() => { ponCat('pa'); ponPest('prof'); verCap('d2', true); });
    await p.waitForTimeout(400);
    await p.locator('#detalle .qm-l[data-n="4"]').click();
    await p.waitForTimeout(300);
    const q = await p.evaluate(() => { const q = document.querySelector('#detalle .qm'); return [q.querySelector('.qm-l.on').dataset.n, q.querySelector('.qm-l.par').dataset.n, q.querySelector('.qm-txt').textContent, q.querySelector('.qm-img').complete && q.querySelector('.qm-img').naturalWidth]; });
    ok(q[0] === '4' && q[1] === '5' && /Daniel 4 y Daniel 5/.test(q[2]) && q[3] === 900, W + ' · v190: el candelabro enciende Daniel 4 y su pareja, Daniel 5');
  }
  /* v188: volver a una pestaña regresa a donde se iba; otra pestaña empieza arriba. */
  {
    await p.evaluate(() => { ponCat('pa'); verCap('d2'); });
    await p.waitForTimeout(900);
    await p.evaluate(() => scrollTo(0, 2500)); await p.waitForTimeout(300);
    const antes = await p.evaluate(() => Math.round(scrollY));
    await p.evaluate(() => ir('tarjetas')); await p.waitForTimeout(300);
    const otra = await p.evaluate(() => Math.round(scrollY));
    await p.evaluate(() => ir('estudio')); await p.waitForTimeout(400);
    const vuelta = await p.evaluate(() => [Math.round(scrollY), document.getElementById('detalle').style.display]);
    ok(otra === 0 && Math.abs(vuelta[0] - antes) < 5 && vuelta[1] === 'block', W + ' · v188: otra pestaña arriba (' + otra + '), y Estudiar vuelve al capítulo donde iba (' + vuelta[0] + ' de ' + antes + ')');
  }

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
/* ── 6. v205: el rediseño del estudio, en 1440 y 390 ── */
for (const W of [1440, 390]) {
  const ctx = await nav.newContext({ viewport: { width: W, height: 900 }, serviceWorkers: 'block' });
  const p = await ctx.newPage(); const errores = [];
  p.on('pageerror', e => errores.push(e.message));
  await p.route('**/api/**', r => r.fulfill({ json: {} }));
  await p.goto(base); await p.waitForTimeout(500);
  await p.evaluate(() => {
    localStorage.setItem('conexion-biblica-v4', JSON.stringify({ v: 4, activo: 'a1', alumnos: {
      a1: { nombre: 'Camilo', cat: 'gm', prog: { d2: 60 }, ultPantalla: 'inicio' },
      a2: { nombre: 'Alejo', cat: 'av', aCargo: true, tutor: 'Camilo', prog: {} } } }));
    localStorage.setItem('cb-sigue', JSON.stringify({ a1: { c: 'd2', s: 3 } }));
  });
  await p.reload(); await p.waitForTimeout(1500);
  // «Continuar» abre Daniel 2 en la sección 4 (vers. 16-20), a la vista.
  await p.evaluate(() => ir('inicio'));
  await p.locator('#ini-hero .hero-go').click(); await p.waitForTimeout(1300);
  const sig = await p.evaluate(() => { const b = document.querySelector('#detalle .lect-bl[data-sec="3"]'), r = b && b.getBoundingClientRect();
    return [capAbierto, seccionALaVista(), !!b && r.top >= 0 && r.top < innerHeight / 2]; });
  ok(sig[0] === 'd2' && sig[1] === 3 && sig[2], W + ' · v205: Continuar abre Daniel 2 en la sección 4, a la vista (' + sig.join(', ') + ')');
  // Tres columnas en el computador, una en el teléfono; sin desborde.
  const col = await p.evaluate(() => { const v = document.querySelector('#detalle .vd'), cs = getComputedStyle(v);
    return [cs.display, cs.gridTemplateColumns.split(' ').length, document.documentElement.scrollWidth - innerWidth,
      getComputedStyle(document.querySelector('#detalle .vd-ind')).display]; });
  ok(W >= 1100 ? col[0] === 'grid' && col[1] === 3 && col[3] !== 'none' : col[0] !== 'grid' && col[3] === 'none', W + ' · v205: el capítulo va en ' + (W >= 1100 ? 'tres columnas' : 'una columna') + ' (' + col.slice(0, 2).join(' ') + ')');
  ok(col[2] <= 0, W + ' · v205: el capítulo no se desborda a lo ancho (' + col[2] + ')');
  // «Antes de seguir»: responder cuenta como practicado.
  const pr = await p.evaluate(() => { const antes = nivelesDe('d2').pr; const b = document.querySelector('#detalle .lect-bl[data-sec="3"] .ads-op');
    b.click(); const q = b.closest('.ads-q'); return [antes, nivelesDe('d2').pr, q.classList.contains('hecha'), !!q.querySelector('.ads-res')]; });
  ok(pr[1] === pr[0] + 1 && pr[2] && pr[3], W + ' · v205: responder «Antes de seguir» da la respuesta al instante y suma a Practicado (' + pr[0] + ' → ' + pr[1] + ')');
  // Comparar (v209): tocar una época abre la sala con cada visión lado a lado.
  await p.evaluate(() => verComparar()); await p.waitForTimeout(500);
  await p.locator('.cmp-epoca[data-k="-539"] .cmp-ecab').click(); await p.waitForTimeout(700);
  const cm = await p.evaluate(() => { const s = document.getElementById('cmpSala'); return [!s.hidden, s.textContent, document.documentElement.scrollWidth - innerWidth, document.activeElement && document.activeElement.className]; });
  ok(cm[0] && /Medo-Persia/.test(cm[1]) && /Pecho y brazos de plata/.test(cm[1]) && /Oso/.test(cm[1]) && cm[2] <= 0, W + ' · v209: en Comparar, Medo-Persia abre su sala con Daniel 2 y Daniel 7 (desborde ' + cm[2] + ')');
  ok(cm[3] === 'cmp-x', W + ' · v209: al abrir la sala el foco va a Cerrar');
  await p.keyboard.press('ArrowRight'); await p.waitForTimeout(400);
  ok(/Grecia/.test(await p.evaluate(() => document.querySelector('#cmpSala h2').textContent)), W + ' · v209: la flecha pasa a la época siguiente');
  await p.keyboard.press('Escape'); await p.waitForTimeout(300);
  ok(await p.evaluate(() => document.getElementById('cmpSala').hidden && !document.body.classList.contains('leyendo')), W + ' · v209: Escape cierra la sala y suelta la página');
  /* v209 (Camilo, 14-oct: «No aparece Daniel 2 Grecia ni todo Roma»): cada miniatura
     se ve de verdad. Se fotografía cada tarjeta y se mide: la imagen tiene que
     variar (no un cuadro de un color), y en las de la estatua, quitar la capa de
     su metal tiene que cambiar la foto (el metal está dentro del recorte). */
  const fotos = await thumbsBien(p, '.cmp-carta:not(.vacia)');
  ok(fotos.n >= 14 && !fotos.mal.length, W + ' · v209: las ' + fotos.n + ' miniaturas de Comparar se ven (planas o sin su metal: ' + (fotos.mal.join(', ') || 'ninguna') + ')');
  await p.evaluate(() => cmpToca('538')); await p.waitForTimeout(900);
  const sala = await thumbsBien(p, '#cmpSala .cmp-vis-p');
  ok(sala.n === 4 && !sala.mal.length, W + ' · v209/v222: en la sala de Roma papal se ven el barro, el cuerno y los dos pasos papales de Daniel 8 (' + (sala.mal.join(', ') || 'bien') + ')');
  await p.evaluate(() => cmpCierra());
  /* v209: con seis visiones (Daniel 8, 11, 12 y Apocalipsis 13 de mentira) no se rompe:
     seis carriles en el río, Daniel antes que Apocalipsis, seis tarjetas por época
     (en el teléfono, las vacías pasan a una línea) y la página no se ensancha. */
  const seis = await p.evaluate(async () => {
    const guarda = Object.assign({}, LAMINAS);
    const mk = ps => ({ dir: 'd7/', tipo: 'escenas', paraleloFuente: 'Prueba', partes: ps });
    LAMINAS.d8 = mk([{ id: 'carnero', img: 'oso', nombre: 'Carnero', reino: 'Medo-Persia', fechas: '539 – 331 a.C.', de: -539, a: -331, c: '#8C98A6' }, { id: 'macho', img: 'leopardo', nombre: 'Macho cabrío', reino: 'Grecia', fechas: '', de: -331, a: -168, c: '#A85A2A' }]);
    LAMINAS.d11 = mk([{ id: 'rn', img: 'cuarta', nombre: 'Rey del norte', reino: 'Roma', fechas: '', de: -168, a: 476, c: '#3E4651' }]);
    LAMINAS.d12 = mk([{ id: 'mig', img: 'hijo', nombre: 'Miguel', reino: '', fechas: '', de: null, c: '#0E7490' }]);
    LAMINAS.ap13 = mk([{ id: 'bm', img: 'cuerno', nombre: 'La bestia del mar', reino: 'Roma papal', fechas: '', de: 538, a: 1798, c: '#A0694A' }]);
    verComparar(); await new Promise(r => setTimeout(r, 400));
    const c = document.querySelector('.cmp'), cartas = [...document.querySelectorAll('.cmp-epoca[data-k="-539"] .cmp-carta')].filter(x => x.getClientRects().length);
    const r = [[...c.querySelectorAll('.cmp-carril-n')].map(x => x.textContent).join(), cartas.length, document.querySelector('.cmp-epoca[data-k="-539"] .cmp-faltan').getClientRects().length > 0,
      document.documentElement.scrollWidth - innerWidth];
    cmpToca('-539'); await new Promise(r => setTimeout(r, 300));
    r.push(document.querySelectorAll('#cmpSala .cmp-vis').length, document.getElementById('cmpSala').scrollWidth - document.getElementById('cmpSala').clientWidth);
    cmpCierra(); for (const k of ['d8', 'd11', 'd12', 'ap13']) delete LAMINAS[k]; Object.assign(LAMINAS, guarda); verComparar();
    return r; });
  ok(seis[0] === 'Daniel 2,Daniel 7,Daniel 8,Daniel 11,Daniel 12,Apocalipsis 13' && seis[1] === (W < 600 ? 3 : 6) && seis[2] === (W < 600) && seis[3] <= 0 && seis[4] === 3 && seis[5] <= 0,
    W + ' · v209: con seis visiones Comparar no se rompe (' + JSON.stringify(seis) + ')');
  // Quitar a una persona, con la pregunta de la app (no el confirm del navegador).
  await p.evaluate(() => { ir('inicio'); abreYo(); });
  await p.locator('.alu-mas').nth(1).click();
  await p.locator('.alu-mi.peligro').click(); await p.waitForTimeout(300);
  const pre = await p.evaluate(() => [document.querySelector('#hoja .preg-t') && document.querySelector('#hoja .preg-t').textContent, personasDB().length]);
  await p.locator('#hoja .preg-pie .btn.gho').click(); await p.waitForTimeout(300);
  const cancela = await p.evaluate(() => personasDB().length);
  await p.locator('.alu-mas').nth(1).click();
  await p.locator('.alu-mi.peligro').click(); await p.waitForTimeout(300);
  await p.locator('#hoja .preg-pie .btn.rojo').click(); await p.waitForTimeout(400);
  const fin = await p.evaluate(() => [personasDB().map(x => x.nombre).join(), JSON.parse(localStorage.getItem('conexion-biblica-v4')).alumnos.a2 === undefined]);
  ok(/Quitar a Alejo/.test(pre[0]) && pre[1] === 2 && cancela === 2 && fin[0] === 'Camilo' && fin[1], W + ' · v205: «Quitar» pregunta en la app; Cancelar no borra y Quitar borra la ficha (' + fin[0] + ')');
  const yo = await p.evaluate(() => [document.getElementById('nav-yo').classList.contains('solo'), getComputedStyle(document.querySelector('#nav-yo .yo-tx')).display]);
  ok(yo[0] && yo[1] === 'none', W + ' · v205: con una sola persona la ficha queda en la inicial');
  ok(errores.length === 0, W + ' · v205: cero errores' + (errores.length ? ': ' + errores.slice(0, 3).join(' | ') : ''));
  await ctx.close();
}
/* ── 5. en un teléfono, ningún campo hace que la página se amplíe sola (v159) ── */
{
  const ctx = await nav.newContext({ viewport: { width: 375, height: 667 }, isMobile: true, hasTouch: true, serviceWorkers: 'block' });
  const p = await ctx.newPage();
  await p.goto(base); await p.waitForTimeout(500);
  await p.evaluate(() => { S.nombre = 'Camila'; S.cat = 'ec1'; guardar(); ponCat('ec1'); });
  const campos = () => p.evaluate(() => [...document.querySelectorAll('input:not([type=checkbox]):not([type=radio]),select,textarea')]
    .filter(x => x.getClientRects().length).map(x => Math.round(parseFloat(getComputedStyle(x).fontSize))));
  let chicos = [], vistos = 0;
  for (const paso of [() => verCap('cr03'), () => abreYo(), () => { cierraHoja(); ponCat('av'); verCap('d1'); }, () => { ir('examen'); arrancaExamen('normal'); }]) {
    await p.evaluate(paso); await p.waitForTimeout(400);
    const c = await campos(); vistos += c.length; chicos = chicos.concat(c.filter(x => x < 16));
  }
  const tocar = await p.evaluate(() => matchMedia('(pointer:coarse)').matches + ' ' + getComputedStyle(document.documentElement).touchAction);
  ok(vistos >= 4 && chicos.length === 0 && tocar === 'true manipulation',
    'teléfono · los ' + vistos + ' campos de escribir que se ven miden 16 px o más, y el doble toque no amplía (' + tocar + ')' + (chicos.length ? ' — chicos: ' + chicos.join(',') : ''));
  await ctx.close();
}
/* ── 7. v207: el modo oscuro de la app sola ──
   Con el teléfono en oscuro, las fichas cambian solas; «Claro» en Logros lo
   apaga y «Oscuro» lo prende aunque el teléfono esté en claro; la elección
   sobrevive a recargar. Y en las pantallas principales no queda ninguna caja
   clara (luminancia > 0,8): la lámina en modo presentar se deja como está. */
for (const W of [390, 1440]) {
  const ctx = await nav.newContext({ viewport: { width: W, height: 900 }, serviceWorkers: 'block', colorScheme: 'dark' });
  const p = await ctx.newPage(); const errores = [];
  p.on('pageerror', e => errores.push(e.message)); p.on('dialog', d => d.dismiss());
  await p.route('**/api/**', r => r.fulfill({ json: {} }));
  await p.goto(base); await p.waitForTimeout(400);
  await p.evaluate(() => {
    localStorage.setItem('conexion-biblica-v4', JSON.stringify({ v: 4, activo: 'a1', alumnos: {
      a1: { nombre: 'Camilo', cat: 'gm', prog: { d2: 60 }, ultPantalla: 'inicio', acc: { d2: { b: 3, m: 4 } }, act: { mc: { b: 5, m: 2 } }, insignias: ['Racha de fuego'] },
      a2: { nombre: 'Alejo', cat: 'av', aCargo: true, tutor: 'Camilo', prog: {} } } }));
    localStorage.removeItem('cb-apariencia');
  });
  await p.reload(); await p.waitForTimeout(1300);
  const fichas = () => p.evaluate(() => { const c = getComputedStyle(document.documentElement), b = getComputedStyle(document.body);
    return [c.getPropertyValue('--v-lienzo').trim(), c.getPropertyValue('--v-tinta').trim(), b.backgroundColor, document.documentElement.getAttribute('data-apariencia')]; });
  const a = await fichas();
  ok(a[0] === '#141110' && a[1] === '#f1ece6' && a[2] === 'rgb(20, 17, 16)' && a[3] === null, W + ' · v207: con el teléfono en oscuro, la app sola se pone oscura sola (' + a.slice(0, 3).join(' ') + ')');
  const claras = await p.evaluate(async () => {
    const lum = s => { const m = s.match(/rgba?\(([^)]+)\)/); if (!m) return null; const v = m[1].split(/[ ,\/]+/).filter(Boolean).map(Number);
      if (v.length > 3 && v[3] < .5) return null; const [r, g, b] = v.slice(0, 3).map(x => { x /= 255; return x <= .03928 ? x / 12.92 : ((x + .055) / 1.055) ** 2.4; }); return .2126 * r + .7152 * g + .0722 * b; };
    const espera = ms => new Promise(r => setTimeout(r, ms));
    const pasos = [['Inicio', () => ir('inicio')], ['Daniel 2', () => verCap('d2')], ['tarjetas', () => ir('tarjetas')], ['tarjeta volteada', () => voltea()],
      ['Examen', () => ir('examen')], ['examen en curso', () => { arrancaExamen('normal'); const o = document.querySelector('#p-examen .op'); o && o.click(); }],
      ['examen entregado', () => entregar()], ['Comparar', () => verComparar()], ['Logros', () => ir('logros')], ['selector', () => { ir('inicio'); abreYo(); }],
      ['lámina explorar', () => { cierraHoja(); lamAbre('d7', 'explorar'); }]];
    const malas = [];
    for (const [n, f] of pasos) {
      try { f(); } catch (e) { malas.push(n + ': ' + e.message); continue; }
      await espera(450);
      for (const e of document.querySelectorAll('body *')) {
        if (e.closest('svg,img,.lam-presentar')) continue;
        const r = e.getBoundingClientRect(); if (r.width < 6 || r.height < 6 || !e.getClientRects().length) continue;
        const cs = getComputedStyle(e); if (cs.visibility === 'hidden' || +cs.opacity < .1) continue;
        const l = lum(cs.backgroundColor);
        const g = [...cs.backgroundImage.matchAll(/rgba?\([^)]+\)/g)].map(m => lum(m[0])).filter(x => x != null && x > .8);
        if ((l != null && l > .8) || g.length) malas.push(n + ': ' + e.tagName.toLowerCase() + '.' + String(e.className).split(' ')[0] + ' ' + cs.backgroundColor);
      }
    }
    return malas;
  });
  ok(claras.length === 0, W + ' · v207: en oscuro no queda ninguna caja clara en Inicio, Daniel 2, tarjetas, examen, Comparar, Logros, selector y lámina' + (claras.length ? ' — ' + claras.slice(0, 5).join(' | ') : ''));
  // «Claro» en Logros gana al teléfono, y sobrevive a recargar.
  await p.evaluate(() => { try { lamCierra(); } catch (e) {} ir('logros'); });
  await p.locator('#apar-ops .apar-b', { hasText: 'Claro' }).click(); await p.waitForTimeout(200);
  const c = await fichas();
  ok(c[0] === '#FFF9EF' && c[3] === 'claro', W + ' · v207: «Claro» en Logros apaga el oscuro del teléfono (' + c[0] + ')');
  await p.reload(); await p.waitForTimeout(1000);
  const c2 = await fichas();
  ok(c2[0] === '#FFF9EF' && c2[3] === 'claro', W + ' · v207: la elección se guarda y sobrevive a recargar');
  // «Oscuro» con el teléfono en claro.
  await p.emulateMedia({ colorScheme: 'light' });
  await p.evaluate(() => ponApariencia('oscuro')); await p.waitForTimeout(150);
  const o = await fichas();
  ok(o[0] === '#141110' && o[3] === 'oscuro', W + ' · v207: «Oscuro» elegido gana aunque el teléfono esté en claro');
  await p.evaluate(() => ponApariencia('auto')); await p.waitForTimeout(150);
  const au = await fichas();
  ok(au[0] === '#FFF9EF' && au[3] === null && await p.evaluate(() => localStorage.getItem('cb-apariencia')) === null, W + ' · v207: «Automático» vuelve a seguir al teléfono');
  const sel = await p.evaluate(() => [...document.querySelectorAll('#apar-ops .apar-b')].map(b => b.textContent + ':' + b.getAttribute('aria-checked')).join(' '));
  ok(sel === 'Automático:true Claro:false Oscuro:false', W + ' · v207: el selector marca la opción elegida (' + sel + ')');
  ok(errores.length === 0, W + ' · v207: cero errores' + (errores.length ? ': ' + errores.slice(0, 3).join(' | ') : ''));
  await ctx.close();
}
/* ── v215: la ronda de Camilo (14-oct, 13:44-13:58) ──
   Explorar abre en «Cautivos en Babilonia» y Siguiente recorre el capítulo en orden;
   la piedra no se ve antes de su paso; la luz de la parte elegida va detrás de la
   estatua; cada visión es un carril limpio en el río de Comparar; y el lugar (pantalla,
   capítulo, pestaña, lámina, paso, Comparar) vuelve igual al recargar. */
for (const W of ANCHOS) {
  const ctx = await nav.newContext({ viewport: { width: W, height: 900 }, serviceWorkers: 'block' });
  const p = await ctx.newPage(); const errores = [];
  p.on('pageerror', e => errores.push(e.message)); p.on('dialog', d => d.dismiss());
  await p.route('**/api/**', r => r.fulfill({ json: {} }));
  await p.goto(base + '?quedarse=1'); await p.waitForTimeout(500);
  await p.evaluate(() => { S.nombre = 'Camilo'; S.cat = 'gm'; guardar(); ponCat('gm'); ir('inicio'); });
  /* 1. Explorar en orden. */
  await p.evaluate(() => lamAbre('d2', 'explorar')); await p.waitForTimeout(900);
  const ini = await p.evaluate(() => ({ donde: lamDonde, hoja: document.getElementById('lamHoja').textContent.slice(0, 80), piedra: document.querySelector('#lamSvg .lam-piedra').style.opacity,
    rec: lamRecorrido().map(x => x.k).join(' '), etPiedra: !!document.querySelector('#lamEts .lam-et[data-p="piedra"]') }));
  ok(ini.donde === 'h0' && /Cautivos en Babilonia/.test(ini.hoja) && ini.piedra === '0' && !ini.etPiedra, W + ' · v215: Explorar abre en «Cautivos en Babilonia», sin la piedra ni su rótulo');
  ok(ini.rec === 'h0 h1 h2 h3 h4 est oro plata bronce hierro dedos barro piedra monte desp cierre aplica', W + ' · v215: el recorrido de Daniel 2 va en orden (' + ini.rec + ')');
  const vistos = [], piedras = [];
  for (let i = 0; i < 20; i++) {
    const d = await p.evaluate(() => ({ k: lamDonde, pi: document.querySelector('#lamSvg .lam-piedra').style.opacity }));
    vistos.push(d.k); piedras.push(d.k + ':' + d.pi);
    const b = p.locator('#lam .lam-nav .lam-rd.sig');
    if (!(await b.count()) || await b.isDisabled()) break;
    await b.click(); await p.waitForTimeout(250);
  }
  ok(vistos.join(' ') === ini.rec, W + ' · v215: Siguiente pasa por todo, en orden, hasta el cierre (' + vistos.join(' ') + ')');
  const antes = piedras.slice(0, vistos.indexOf('piedra')).filter(x => !/:0$/.test(x));
  ok(!antes.length, W + ' · v215: la piedra no se ve antes de su paso' + (antes.length ? ' (' + antes.join(', ') + ')' : ''));
  await p.evaluate(() => lamIr('piedra')); await p.waitForTimeout(300);
  ok(await p.evaluate(() => document.querySelector('#lamSvg .lam-piedra').style.opacity) === '1', W + ' · v215: en su paso la piedra cae');
  /* 2. La luz de la parte va detrás de la estatua, en todas las capas. */
  const luz = await p.evaluate(() => LAM().capas.map(id => { lamIr(id); const g = document.querySelector('#lamSvg .lam-estatua'), b = g.querySelector('.lam-brillo[data-p="' + id + '"]'),
    pr = g.querySelector('.lam-parte'), on = [...g.querySelectorAll('.lam-brillo.on')].map(x => x.getAttribute('data-p'));
    return b && on.join() === id && (b.compareDocumentPosition(pr) & 4) ? '' : id; }).filter(Boolean));
  ok(!luz.length, W + ' · v215: la luz de cada parte está detrás de la estatua y solo en la suya' + (luz.length ? ' (mal: ' + luz.join(', ') + ')' : ''));
  await p.evaluate(() => lamCierra());
  /* 3. Daniel 7 también abre en su primer paso y sigue en orden. */
  const d7 = await p.evaluate(() => { lamAbre('d7', 'explorar'); const r = [lamDonde, lamRecorrido().map(x => x.k).join(' ')]; lamCierra(); return r; });
  ok(d7[0] === 'h0' && /^h0 h1 est leon .* cuerno x-senas x-periodo juicio hijo x-fases santos reino desp cierre aplica$/.test(d7[1]), W + ' · v215: Daniel 7 abre en su primer paso y su recorrido sigue el de Presentar (' + d7[1] + ')');
  /* 4. El río: un carril por visión; lo que gobierna a la vez es un hilo con nombre. */
  await p.evaluate(() => verComparar()); await p.waitForTimeout(500);
  const rio = await p.evaluate(() => [...document.querySelectorAll('.cmp-rio .cmp-carril')].map(c => {
    const tops = [...c.querySelectorAll('.cmp-tr')].map(b => Math.round(b.getBoundingClientRect().top));
    return { n: c.querySelector('.cmp-carril-n').textContent, filas: new Set(tops).size, hilos: [...c.querySelectorAll('.cmp-hilo')].map(h => h.textContent.trim()) }; }));
  ok(rio.length === 3 && rio.every(r => r.filas === 1) && rio.slice(0, 2).every(r => r.hilos.some(h => /^Roma papal/.test(h))) && rio[1].hilos.some(h => /^Juicio/.test(h)) && await p.locator('.cmp-ley').count() === 1,
    W + ' · v215: en el río cada visión es una sola fila; Roma papal y el juicio son hilos con su nombre, y hay leyenda (' + JSON.stringify(rio) + ')');
  /* 5. Los últimos acontecimientos. */
  /* v219: veintinueve acontecimientos en filas, diecisiete columnas (capítulos y Elena de
     White); el nombre queda fijo al rodar; tocar una celda abre debajo de su fila el
     texto, si es explícito o interpretación, y su fuente, a lo ancho de lo que se ve. */
  const ult = await p.evaluate(async () => {
    const m = document.getElementById('cmpUlt'), sc = m.querySelector('.cmp-ult-scroll');
    m.scrollIntoView({ block: 'start' }); cmpUlt(ultIdx('ley'), false, 'd11'); await new Promise(r => setTimeout(r, 400));
    const det = document.getElementById('cmpUltDet'), dw = det.querySelector('.cmp-ult-dw').getBoundingClientRect(), scr = sc.getBoundingClientRect();
    const fila = document.querySelector('.cmp-ult-fila.on'), ev = fila.querySelector('.cmp-ult-ev').getBoundingClientRect(), celda = document.querySelector('.cmp-ult-c.on').getBoundingClientRect();
    const r = { n: document.querySelectorAll('#cmpUlt .cmp-ult-ev').length, cols: document.querySelectorAll('#cmpUlt .cmp-ult-fila.cab .cmp-ult-lb').length,
      fases: document.querySelectorAll('#cmpUlt .cmp-ult-fz').length, det: det.textContent, despues: fila.nextElementSibling === det,
      detVe: dw.left >= scr.left - 1 && dw.right <= scr.right + 1, celdaVe: celda.left >= ev.right - 1 && celda.right <= scr.right + 1,
      rueda: sc.scrollWidth > sc.clientWidth + 1, pista: getComputedStyle(m.querySelector('.cmp-ult-pista')).display !== 'none',
      caja: scr.right <= document.documentElement.clientWidth + 1, pag: document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1,
      si: document.querySelectorAll('#cmpUlt .cmp-ult-c.si').length, int: document.querySelectorAll('#cmpUlt .cmp-ult-c.int').length };
    /* Al rodar al final, el nombre del acontecimiento sigue en su sitio. */
    sc.scrollLeft = sc.scrollWidth; await new Promise(r2 => setTimeout(r2, 150));
    r.fijo = Math.abs(document.querySelector('.cmp-ult-fila.on .cmp-ult-ev').getBoundingClientRect().left - scr.left) < 2;
    r.pistaFin = getComputedStyle(m.querySelector('.cmp-ult-pista')).display === 'none';
    sc.scrollLeft = 0; ultPista(sc);
    return r; });
  ok(ult.n === 38 && ult.cols === 17 && ult.fases === 5 && ult.despues && /Daniel 11:41/.test(ult.det) && /Según la interpretación/.test(ult.det) && /Pippenger/.test(ult.det) &&
    ult.detVe && ult.celdaVe && ult.fijo && ult.caja && ult.pag && ult.si >= 30 && ult.int >= 30 && (!ult.rueda || (ult.pista && ult.pistaFin)),
    W + ' · v219: «Los últimos acontecimientos»: 38 filas (v231: con las siete plagas) en 5 fases y 17 columnas; la celda de Daniel 11 en la ley dominical abre debajo su texto, «según la interpretación» y su fuente, a la vista; el nombre queda fijo al rodar y la pista se va al final (' + JSON.stringify(Object.assign({}, ult, { det: '' })) + ')');
  /* Mateo 24 va sin comillas: la referencia y la fuente. */
  const mt = await p.evaluate(() => { cmpUlt(ultIdx('falso'), false, 'mt24'); const d = document.getElementById('cmpUltDet'); return { q: d.querySelectorAll('q').length, t: d.textContent }; });
  ok(mt.q === 0 && /Mateo 24:23-27/.test(mt.t) && /Lo dice el texto/.test(mt.t) && /CS 683/.test(mt.t), W + ' · v219: Mateo 24 en la celda: referencia sin comillas, explícito y su fuente (' + mt.q + ')');
  /* v221 (Camilo, iPhone): tocar un acontecimiento, una celda o «Siguiente» no lleva lejos:
     la fila tocada se queda donde estaba (±80 px) aunque se cierre un detalle de arriba, en
     la página y dentro de una caja que rueda. Sin anclaje del navegador, como Safari. */
  await p.addStyleTag({ content: '*{overflow-anchor:none!important}' });
  for (const enCaja of [false, true]) {
    await p.evaluate(c => { cmpUlt(0, true); const m = document.getElementById('cmpUlt');
      if (c) { const b = document.createElement('div'); b.id = 'cajaPrueba'; b.style.cssText = 'height:700px;overflow:auto'; m.parentNode.insertBefore(b, m); b.appendChild(m); b.scrollIntoView({ block: 'start' }); } }, enCaja);
    const tops = [];
    for (const sel of ['.cmp-ult-ev[data-i="1"]', '.cmp-ult-ev[data-i="2"]', '.cmp-ult-ev[data-i="8"]', '.cmp-ult-c[data-i="2"][data-c="d11"]', '.cmp-ult-ev[data-i="12"]']) {
      const a = await p.evaluate(s => { const e = document.querySelector(s), b = document.getElementById('cajaPrueba');
        if (b) b.scrollTop += e.getBoundingClientRect().top - b.getBoundingClientRect().top - 300; else window.scrollBy(0, e.getBoundingClientRect().top - 400);
        return Math.round(e.getBoundingClientRect().top); }, sel);
      await p.click(sel); await p.waitForTimeout(350);
      tops.push([sel.replace(/\.cmp-ult-|\[data-|"|\]/g, ''), a, await p.evaluate(s => Math.round(document.querySelector(s).getBoundingClientRect().top), sel)]);
    }
    const sig = await p.evaluate(async () => { const d = document.getElementById('cmpUltDet'), b = d.querySelectorAll('.cmp-ult-nav button')[1], y = d.getBoundingClientRect().top;
      b.click(); await new Promise(r => setTimeout(r, 350)); const f = document.querySelector('.cmp-ult-fila.on').getBoundingClientRect().top;
      return [Math.round(y), Math.round(document.getElementById('cmpUltDet').getBoundingClientRect().top), Math.round(f), ultSel]; });
    const malos = tops.filter(([, a, d]) => Math.abs(a - d) > 80);
    ok(!malos.length && Math.abs(sig[0] - sig[1]) <= 80 && sig[2] > 0 && sig[3] === 13,
      W + ' · v221: tocar una fila, una celda o «Siguiente» deja lo tocado donde estaba ' + (enCaja ? 'dentro de una caja que rueda' : 'en la página') + ' (' + JSON.stringify(tops) + ' sig ' + sig + ')');
    await p.evaluate(c => { if (c) { const b = document.getElementById('cajaPrueba'), m = document.getElementById('cmpUlt'); b.parentNode.insertBefore(m, b); b.remove(); } }, enCaja);
  }
  /* 6. El lugar vuelve igual al recargar (y el enlace lo dice). */
  const recarga = async (nombre, prepara, mira) => {
    await p.evaluate(prepara); await p.waitForTimeout(500);
    const h = await p.evaluate(() => location.hash);
    await p.reload(); await p.waitForTimeout(1600);
    const r = await p.evaluate(mira), h2 = await p.evaluate(() => location.hash);
    ok(r === true && h === h2 && /^#\/estudio\//.test(h), W + ' · v215: recargar deja en el mismo lugar · ' + nombre + ' (' + h + (r === true ? '' : ' → ' + JSON.stringify(r)) + ')');
  };
  await recarga('Daniel 7, «Para profundizar», lámina en las tres fases', () => { verCap('d7'); ponPest('prof'); lamAbre('d7', 'explorar'); lamIr('x-fases'); },
    () => lamModo === 'explorar' && lamId === 'd7' && lamDonde === 'x-fases' && capPest === 'prof' && S.ultItem === 'd7' || [lamModo, lamId, lamDonde, capPest, S.ultItem]);
  await recarga('Presentar en el paso 7', () => { lamCierra(); verCap('d2'); lamAbre('d2', 'presentar'); lamPres(7); },
    () => lamModo === 'presentar' && lamId === 'd2' && lamPaso === 7 || [lamModo, lamId, lamPaso]);
  await recarga('la sala de Comparar en Grecia', () => { lamCierra(); verComparar(); cmpToca('-331'); },
    () => cmpSel === '-331' && !document.getElementById('cmpSala').hidden || [cmpSel]);
  await recarga('las plagas en Apocalipsis 16, en «Los últimos acontecimientos»', () => { cmpCierra(); cmpUlt(ultIdx('plagas'), false, 'ap16'); },
    () => ultSel === ultIdx('plagas') && ultCol === 'ap16' && /Apocalipsis 16/.test(document.getElementById('cmpUltDet').textContent) || [ultSel, ultCol]);
  /* Un enlace copiado abre lo mismo en otro aparato (sin nada anotado). */
  await p.evaluate(() => { cmpCierra(); verCap('d7'); lamAbre('d7', 'explorar'); lamIr('cuerno'); });
  await p.waitForTimeout(400);
  const enlace = await p.evaluate(() => location.href);
  const otro = await (await nav.newContext({ viewport: { width: W, height: 900 }, serviceWorkers: 'block' })).newPage();
  await otro.route('**/api/**', r => r.fulfill({ json: {} }));
  await otro.goto(base + '?quedarse=1'); await otro.waitForTimeout(400);
  await otro.evaluate(() => { S.nombre = 'Ana'; S.cat = 'gm'; guardar(); });
  await otro.goto(enlace.replace(/^[^#]*/, base)); await otro.waitForTimeout(400); await otro.reload(); await otro.waitForTimeout(1500);
  const lejos = await otro.evaluate(() => [lamModo, lamId, lamDonde, S.ultItem]);
  ok(lejos.join() === 'explorar,d7,cuerno,d7', W + ' · v215: un enlace copiado abre el mismo capítulo, lámina y paso en otro aparato (' + lejos.join() + ')');
  await otro.context().close();
  ok(errores.length === 0, W + ' · v215: cero errores' + (errores.length ? ': ' + errores.slice(0, 3).join(' | ') : ''));
  await ctx.close();
}
/* ── v217: la lámina en el teléfono (Camilo, 14-oct: «¿Esto está bien?», iPhone a 390 pt) ──
   Cada paso de Explorar muestra SU escena; la barra de Anterior/Siguiente (y la de
   Presentar) va al borde de la pantalla y no tapa la última línea de la hoja; el navegador
   de partes deja ver al menos tres, tocables (≥44 px); ningún nombre se vuelve enlace en un
   título; el paso activo de la fila se ve entero; nada se sale a lo ancho. */
for (const [W, H] of [[390, 844], [430, 932]]) {
  const ctx = await nav.newContext({ viewport: { width: W, height: H }, serviceWorkers: 'block', isMobile: true, hasTouch: true });
  const p = await ctx.newPage(); const errores = [];
  p.on('pageerror', e => errores.push(e.message)); p.on('dialog', d => d.dismiss());
  await p.route('**/api/**', r => r.fulfill({ json: {} }));
  await p.goto(base + '?quedarse=1'); await p.waitForTimeout(500);
  await p.evaluate(() => { S.nombre = 'Camilo'; S.cat = 'gm'; guardar(); ponCat('gm'); ir('inicio'); });
  const TIT = 'h1,h2,h3,h4,.lam-p1,.lam-p2,.lam-intro-tit,.lam-nav-p,.lam-chip-t,.lam-cartel-tit,.lam-fin-tit,.lam-tit';
  for (const id of ['d7', 'd2', 'd8']) {
    await p.evaluate(id => { verCap(id); lamAbre(id, 'explorar'); }, id); await p.waitForTimeout(1500);
    /* 1. La escena de cada paso es la que el paso declara (la parte con capas —las bestias que
       suben, el cuerno pequeño que sale de la cresta— vale con su capa). */
    if (W === 390) {
      const pasos = await p.evaluate(() => lamRecorrido().map(x => x.k));
      const mal = [], enlaces = [];let cuerpo = 0;
      for (const k of pasos) {
        await p.evaluate(k => lamIr(k), k); await p.waitForTimeout(/^x-/.test(k) ? 300 : 900);
        const r = await p.evaluate(([k, TIT]) => {
          const L = LAM(), svg = document.getElementById('lamSvg'), vis = el => el && el.style.opacity !== '0' && getComputedStyle(el).opacity !== '0';
          const ve = [...svg.querySelectorAll('.lam-hist,.lam-zoom-img,.lam-capa-g image')].filter(e => (e.classList.contains('lam-hist') || e.classList.contains('lam-zoom-img')) ? e.style.opacity === '1' : true).map(e => e.getAttribute('href'));
          const hist = svg.querySelector('.lam-hist'), histVe = hist.style.opacity === '1' ? hist.getAttribute('href') : '';
          let quiere = null, ok = true;
          if (/^h\d+$/.test(k)) { quiere = lamSrc(L.historia[+k.slice(1)].f); ok = histVe === quiere; }
          else if (k === 'desp') { quiere = lamSrc(L.despues.f); ok = histVe === quiere; }
          else if (k === 'est') { if (lamEsE()) { quiere = lamSrc(L.inicioF); ok = histVe === quiere; } else { quiere = '(la estatua)'; ok = !histVe; } }
          else if (k === 'aplica') { quiere = '(la pregunta para ti, sobre el cierre)'; ok = /Para ti/.test(document.getElementById('lamHoja').textContent) && (lamEsE() ? histVe === lamSrc(L.cierre.f) : document.getElementById('lamFin').classList.contains('ve')); }
          else if (k === 'cierre') { if (lamEsE()) { quiere = lamSrc(L.cierre.f); ok = histVe === quiere; } else { quiere = '(la placa)'; ok = document.getElementById('lamFin').classList.contains('ve'); } }
          else if (!/^x-/.test(k)) { const pt = lamParte(k);
            /* v222: las partes que se mueven (Daniel 8) arman su escena sobre su propio fondo. */
            if (pt.mov) { quiere = '(su movimiento: ' + pt.mov + ')'; ok = !!histVe && document.querySelectorAll('#lamMarcasImg .d8-et').length > 0; }
            else if (lamEsE()) { const S = L.sube, i = S ? S.ids.indexOf(k) : -1; const C = L.cuernos, ok1 = [lamSrc(pt.img)].concat(i >= 0 ? [lamSrc(S.solo[i])] : [], C && C.capas && k === C.caenEn ? [lamSrc(C.capas.pequeno)] : []); quiere = ok1.join(' o '); ok = ok1.some(x => ve.includes(x)); }
            else { quiere = '(la estatua, ' + k + ')'; ok = !histVe; } }
          const en = [...document.querySelectorAll('#lam .per')].filter(b => b.closest(TIT)).map(b => b.textContent);
          return { ok, quiere, ve: histVe || ve.join(','), en, cuerpo: document.querySelectorAll('#lamHoja .per').length };
        }, [k, TIT]);
        if (!r.ok) mal.push(k + ': quiere ' + r.quiere + ', se ve ' + r.ve);
        if (r.en.length) enlaces.push(k + ': ' + r.en.join(','));
        cuerpo += r.cuerpo;
      }
      ok(!mal.length, W + ' · v217: ' + id + ', cada paso de Explorar muestra su escena (' + pasos.length + ' pasos)' + (mal.length ? ' — ' + mal.slice(0, 3).join(' | ') : ''));
      ok(!enlaces.length && cuerpo > 0, W + ' · v217: ' + id + ', ningún nombre es enlace dentro de un título (y en el texto sí: ' + cuerpo + ')' + (enlaces.length ? ' — ' + enlaces.slice(0, 3).join(' | ') : ''));
    }
    if (id === 'd8') {
      const fuera = [];
      for (const k of await p.evaluate(() => LAM().partes.filter(q => q.mov).map(q => q.id))) {
        await p.evaluate(k => lamIr(k), k); await p.waitForTimeout(await p.evaluate(k => lamParte(k).ms + 700, k));
        const r = await p.evaluate(() => { const e = document.getElementById('lamEsc').getBoundingClientRect(), ets = [...document.querySelectorAll('#lamMarcasImg .d8-et.ve')].filter(x => getComputedStyle(x).display !== 'none');
          return { n: ets.length, mal: ets.filter(x => { const q = x.getBoundingClientRect(); return q.left < e.left - 2 || q.right > e.right + 2; }).map(x => x.textContent.slice(0, 20)) }; });
        if (!r.n || r.mal.length) fuera.push(k + ': ' + r.n + ' rótulos' + (r.mal.length ? ', fuera: ' + r.mal.join(', ') : ''));
      }
      ok(!fuera.length, W + ' · v222: Daniel 8, cada movimiento termina con sus rótulos dentro de la escena' + (fuera.length ? ' — ' + fuera.join(' | ') : ''));
      /* v223: al final del choque solo queda el macho cabrío; el cuerno pequeño termina con el poniente encendido. */
      await p.evaluate(() => lamIr('macho')); await p.waitForTimeout(await p.evaluate(() => lamParte('macho').ms + 700));
      const ch = await p.evaluate(() => { const c = document.querySelector('.d8-car .d8-cuerpo'), m = document.querySelector('.d8-mac'); return { car: +getComputedStyle(c).opacity, mac: +getComputedStyle(m).opacity }; });
      ok(ch.car < .05 && ch.mac > .9, W + ' · v223: Daniel 8, después del choque el carnero queda en tierra y apagado (' + ch.car + ') y el macho cabrío de pie');
      await p.evaluate(() => lamIr('cuerno')); await p.waitForTimeout(await p.evaluate(() => lamParte('cuerno').ms + 700));
      const cr = await p.evaluate(() => ({ on: [...document.querySelectorAll('.d8-traza.viento.on')].map(x => x.getAttribute('data-v')).join(), tenue: document.querySelectorAll('.d8-traza.viento.tenue').length,
        toma: document.querySelectorAll('#lamMarcasImg .reino.toma').length, paso: (document.querySelector('#lamMarcasImg .paso b') || {}).textContent || '' }));
      ok(cr.on === 'o' && cr.tenue === 3 && cr.toma === 4 && /^4 ·/.test(cr.paso), W + ' · v223: Daniel 8, el cuerno pequeño: el viento del poniente encendido, los otros tres apagados, cuatro conquistas y el último paso (' + cr.paso + ')');
      /* v226: sobre la imagen solo tres puntos numerados (candelabro, mesa, altar del incienso), ninguno sobre el cuerno;
         las cinco señas en la lista de debajo, tachadas al final; la comparación no tapa la escena (va debajo, en pastillas). */
      if (!(await p.evaluate(() => lamConD2))) await p.evaluate(() => lamConD2Cambia());
      await p.evaluate(() => lamIr('santuario')); await p.waitForTimeout(await p.evaluate(() => lamParte('santuario').ms + 700));
      /* En el teléfono la imagen se pega arriba al rodar: se mide con la lámina arriba del todo. */
      await p.evaluate(() => { const l = document.getElementById('lam'); l.scrollTop = 0; scrollTo(0, 0); }); await p.waitForTimeout(300);
      const sa = await p.evaluate(() => { const e = document.getElementById('lamMarcasImg').getBoundingClientRect(), nums = [...document.querySelectorAll('#lamMarcasImg .d8-num')];
        const ley = document.getElementById('lamLey8'), lis = ley ? [...ley.querySelectorAll('li')] : [], esc = document.getElementById('lamEsc').getBoundingClientRect();
        const d2 = document.getElementById('lamD2'), fila = document.getElementById('lamD2Fila');
        return { n: nums.map(x => x.textContent).join(), pts: nums.map(x => [+x.dataset.x, +x.dataset.y]), ids: lis.map(x => x.dataset.cosa).join(), apaga: lis.filter(x => x.classList.contains('apaga')).length,
          fuera: nums.filter(x => { const q = x.getBoundingClientRect(); return q.left < e.left - 2 || q.right > e.right + 2 || q.top < e.top - 2 || q.bottom > e.bottom + 2; }).length,
          rotulos: document.querySelectorAll('#lamMarcasImg .d8-et.cosa').length, debajo: !!ley && !ley.hidden && ley.getBoundingClientRect().top >= esc.bottom - 1,
          col: !!d2 && !d2.hidden && getComputedStyle(d2).display !== 'none', fila: !!fila && !fila.hidden && getComputedStyle(fila).display !== 'none' && fila.getBoundingClientRect().top >= esc.bottom - 1 }; });
      ok(sa.n === '1,2,3' && sa.ids === 'mesa,candelabro,incienso,altar,verdad' && sa.apaga === 5 && !sa.pts.some(([x, y]) => x > 500 && x < 720 && y > 335) && !sa.fuera && !sa.rotulos && sa.debajo && !sa.col && sa.fila,
        W + ' · v226: Daniel 8, el continuo: tres puntos numerados (' + sa.n + ') sin rótulos encima ni sobre el cuerno, las cinco señas tachadas en la lista de debajo (' + sa.ids + ') y la comparación debajo de la imagen, no encima');
      /* v226: al presentar, la lista va en la hoja; en la pantalla ancha sin la columna de la comparación. */
      const sp = await p.evaluate(async () => { lamCierra(); lamAbre('d8', 'presentar'); lamPres(lamPasos().findIndex(s => s.id === 'santuario')); await new Promise(r => setTimeout(r, 300));
        const d2 = document.getElementById('lamD2'); return { ley: document.querySelectorAll('#lamHoja .d8-ley li').length, col: !!d2 && !d2.hidden && getComputedStyle(d2).display !== 'none' }; });
      ok(sp.ley === 5 && !sp.col, W + ' · v226: Daniel 8, al presentar el santuario la lista de las cinco señas va en la hoja y la comparación no tapa la imagen');
      await p.evaluate(() => { lamCierra(); lamAbre('d8', 'explorar'); }); await p.waitForTimeout(800);
      /* v223: la comparación con Daniel 2 y 7: al lado de la imagen en la pantalla ancha, debajo en el teléfono. */
      await p.evaluate(() => { lamCierra(); lamAbre('d8', 'presentar'); if (!lamConD2) lamConD2Cambia(); lamPres(lamPasos().findIndex(s => s.id === 'purificado' && s.tipo === 'parte')); }); await p.waitForTimeout(1500);
      const cm = await p.evaluate(() => { const col = document.getElementById('lamD2'), fila = document.getElementById('lamD2Fila'), e = document.getElementById('lamEsc').getBoundingClientRect();
        const vis = x => x && !x.hidden && getComputedStyle(x).display !== 'none';
        const dentro = el => { const r = el.getBoundingClientRect(); return r.left >= -1 && r.right <= innerWidth + 1; };
        return { col: vis(col), fila: vis(fila), filaOk: vis(fila) ? [...fila.querySelectorAll('.lam-d2f')].every(dentro) && fila.scrollWidth <= fila.clientWidth + 1 : true,
          colOk: vis(col) ? (() => { const r = col.getBoundingClientRect(); return r.right <= e.right + 1 && [...col.querySelectorAll('.lam-d2-ag')].every(a => a.scrollWidth <= a.clientWidth + 1); })() : true }; });
      ok((W <= 600 ? !cm.col && cm.fila : cm.col && !cm.fila) && cm.filaOk && cm.colOk, W + ' · v223: Daniel 8, «Con Daniel 2 y 7» en el santuario purificado ' + (W <= 600 ? 'va debajo de la imagen, sin cortarse' : 'va al lado de la imagen, dentro de ella'));
      await p.evaluate(() => { lamCierra(); lamAbre('d8', 'explorar'); }); await p.waitForTimeout(1200);
      /* v223: las fechas de los 2.300 años se tocan y no se pisan. */
      const l23 = await p.evaluate(() => { const bs = [...document.querySelectorAll('#lamL23t .l23t-h')], rs = bs.map(b => b.querySelector('b').getBoundingClientRect());
        let pisa = 0; for (let i = 0; i < rs.length; i++) for (let j = i + 1; j < rs.length; j++) { const a = rs[i], c = rs[j]; if (a.left < c.right - 1 && c.left < a.right - 1 && a.top < c.bottom - 1 && c.top < a.bottom - 1) pisa++; }
        lamL23tToca(2); return { n: bs.length, pisa, alto: Math.min(...bs.map(b => b.getBoundingClientRect().height)), info: document.getElementById('lamL23tInfo').textContent, anio: lamAnio }; });
      ok(l23.n === 8 && !l23.pisa && l23.alto >= 36 && /27 d\.C\./.test(l23.info) && l23.anio === 27, W + ' · v223: Daniel 8, las fechas de los 2.300 años (' + l23.n + ') no se pisan, se tocan (≥36 px) y llevan la línea de tiempo al año');
      /* v225 (pedagogía): al presentar, el panel de los 2.300 años sale solo en los pasos de su cuenta. */
      const p23 = await p.evaluate(async () => { lamCierra(); lamAbre('d8', 'presentar'); const P = lamPasos(), ve = () => { const e = document.getElementById('lamL23t'); return !!e && getComputedStyle(e).display !== 'none' && e.getBoundingClientRect().height > 0; };
        const fuera = [], dentro = [];
        for (let k = 0; k < P.length; k++) { lamPres(k); (P[k].tipo === 'periodo' ? dentro : fuera).push(ve()); }
        lamCierra(); lamAbre('d8', 'explorar'); return { fuera: fuera.filter(Boolean).length, nf: fuera.length, dentro: dentro.filter(Boolean).length, nd: dentro.length, explorar: ve() }; });
      ok(!p23.fuera && p23.nf > 5 && p23.nd === 5 && p23.dentro === 5 && p23.explorar, W + ' · v225: Daniel 8, al presentar el panel de las 2.300 tardes y mañanas sale solo en los ' + p23.nd + ' pasos de su cuenta (fuera: ' + p23.fuera + ' de ' + p23.nf + '); en Explorar, siempre');
    }
    if (id === 'd7') {
      const de = await p.evaluate(() => [LAM().despues.f, LAM().historia.map(h => h.f)]);
      ok(de[0] === 'recuerdo' && !de[1].includes(de[0]), W + ' · v217: «Daniel guardó el asunto en su corazón» (7:28) ya no muestra el mar en tormenta de 7:2');
    }
    /* 2. La barra de Anterior/Siguiente: al pie de la pantalla, sin nada debajo, y la última
       línea de la hoja queda encima de ella al llevar la hoja a la vista. */
    for (const k of ['desp', ({ d7: 'cuerno', d8: 'cielo' })[id] || 'barro']) {
      await p.evaluate(k => { document.getElementById('lam').scrollTo(0, 0); lamIr(k); }, k); await p.waitForTimeout(700);
      const b = await p.evaluate(() => { const l = document.getElementById('lam'), n = document.querySelector('#lamPie .lam-nav'), h = document.getElementById('lamHoja');
        h.scrollIntoView({ block: 'end' }); const nr = n.getBoundingClientRect();
        const w = document.createTreeWalker(h, NodeFilter.SHOW_TEXT); let t, ult = null; while ((t = w.nextNode())) if (t.textContent.trim()) ult = t;
        const rg = document.createRange(); rg.selectNodeContents(ult); const rs = [...rg.getClientRects()], lr = rs[rs.length - 1];
        l.scrollTo(0, l.scrollHeight); const fin = [...l.children].filter(c => c.id !== 'lamPie' && c.getClientRects().length).pop().getBoundingClientRect();
        return { fija: getComputedStyle(n).position, abajo: Math.round(innerHeight - nr.bottom), linea: Math.round(lr.bottom), barra: Math.round(nr.top), fin: Math.round(fin.bottom), barra2: Math.round(n.getBoundingClientRect().top), alto: Math.round(nr.height), ancho: Math.round(document.getElementById('lam').scrollWidth - document.getElementById('lam').clientWidth) }; });
      ok(b.fija === 'fixed' && b.abajo === 0 && b.linea <= b.barra && b.fin <= b.barra2 + 1 && b.alto <= 96 && b.ancho <= 0,
        W + ' · v217: ' + id + ' «' + k + '», la barra va al borde (' + b.abajo + ' px debajo, ' + b.alto + ' px de alto) y la última línea queda encima (' + b.linea + ' ≤ ' + b.barra + '; al final ' + b.fin + ' ≤ ' + b.barra2 + '), sin desborde a lo ancho');
    }
    /* 3. El navegador de partes: tres o más a la vista, tocables, y la siguiente asoma. */
    await p.evaluate(() => { document.getElementById('lam').scrollTo(0, 0); lamIr('est'); }); await p.waitForTimeout(500);
    const rl = await p.evaluate(() => { const t = document.getElementById('lamTira'), r = t.getBoundingClientRect(), bs = [...t.querySelectorAll('.lam-ri')];
      const ent = bs.filter(b => { const q = b.getBoundingClientRect(); return q.left >= r.left - 1 && q.right <= r.right + 1; }).length;
      const asoma = bs.some(b => { const q = b.getBoundingClientRect(); return q.left < r.right - 4 && q.right > r.right + 4; });
      const chico = bs.filter(b => { const q = b.getBoundingClientRect(); return q.width < 44 || q.height < 44; }).length;
      const bt = [...document.querySelectorAll('.lam-riel .lam-tira-bots .btn')].map(b => Math.round(b.getBoundingClientRect().height));
      const tops = new Set([...document.querySelectorAll('.lam-riel .lam-tira-bots .btn')].map(b => Math.round(b.getBoundingClientRect().top)));
      return { n: bs.length, ent, asoma, chico, bt, fila: tops.size, snap: getComputedStyle(t).scrollSnapType }; });
    ok(rl.ent >= 3 && rl.asoma && rl.chico === 0 && /x/.test(rl.snap), W + ' · v217: ' + id + ', el navegador de partes deja ver ' + rl.ent + ' enteras de ' + rl.n + ', asoma la siguiente, todas ≥44 px y con imán (' + rl.snap + ')');
    if (id === 'd7') ok(rl.bt.length === 2 && rl.bt.every(h => h >= 32 && h <= 40) && rl.fila === 1, W + ' · v217: «Ver la visión» y «Con Daniel 2» son dos pastillas chicas en una fila (' + rl.bt.join(', ') + ' px)');
    /* 4. La fila de pasos: el activo, entero a la vista; el borde se desvanece donde hay más. */
    await p.evaluate(() => lamIr('desp')); await p.waitForTimeout(600);
    const ps = await p.evaluate(() => { const f = document.querySelector('.lam-pasos'), a = f.querySelector('.lam-paso.on'), r = f.getBoundingClientRect(), q = a.getBoundingClientRect();
      return { dentro: q.left >= r.left - 1 && q.right <= r.right + 1, cur: a.getAttribute('aria-current'), fade: f.classList.contains('m-i') || f.classList.contains('m-d') || f.scrollWidth <= f.clientWidth }; });
    ok(ps.dentro && ps.cur === 'step' && ps.fade, W + ' · v217: ' + id + ', el paso activo de la fila se ve entero (y se desvanece el borde que sigue)');
    await p.evaluate(() => lamCierra());
    /* 5. Presentar: los botones ‹ › al borde, sin texto debajo. */
    await p.evaluate(id => { lamAbre(id, 'presentar'); lamPres(5); }, id); await p.waitForTimeout(800);
    const pr = await p.evaluate(() => { const l = document.getElementById('lam'); l.scrollTo(0, l.scrollHeight); const c = document.querySelector('.lam-ctl').getBoundingClientRect(), h = document.getElementById('lamHoja').getBoundingClientRect();
      return { abajo: Math.round(innerHeight - c.bottom), hoja: Math.round(h.bottom), barra: Math.round(c.top) }; });
    ok(pr.abajo === 0 && pr.hoja <= pr.barra + 1, W + ' · v217: ' + id + ', al presentar los botones van al borde y la hoja termina encima (' + pr.abajo + ' px debajo; ' + pr.hoja + ' ≤ ' + pr.barra + ')');
    await p.evaluate(() => lamCierra());
  }
  ok(errores.length === 0, W + ' · v217: cero errores' + (errores.length ? ': ' + errores.slice(0, 3).join(' | ') : ''));
  await ctx.close();
}
/* ── v227: «Tracia y Asia Menor» no se encima a «NORTE»; el reparto del reino de Alejandro se toca
   (Explorar y Presentar); cada lámina termina con la pregunta para la vida. ── */
for (const [W, H] of [[1440, 900], [390, 844]]) {
  const ctx = await nav.newContext({ viewport: { width: W, height: H }, serviceWorkers: 'block', isMobile: W < 600, hasTouch: W < 600 });
  const p = await ctx.newPage(); const errores = [];
  p.on('pageerror', e => errores.push(e.message)); p.on('dialog', d => d.dismiss());
  await p.route('**/api/**', r => r.fulfill({ json: {} }));
  await p.goto(base + '?quedarse=1'); await p.waitForTimeout(500);
  await p.evaluate(() => { S.nombre = 'Camilo'; S.cat = 'gm'; guardar(); ponCat('gm'); ir('inicio'); verCap('d8'); lamAbre('d8', 'explorar'); }); await p.waitForTimeout(1200);
  await p.evaluate(() => { document.getElementById('lam').scrollTo(0, 0); lamIr('cuerno'); }); await p.waitForTimeout(await p.evaluate(() => (lamParte('cuerno').ms || 4000) + 900));
  const tn = await p.evaluate(() => { const ets = [...document.querySelectorAll('#lamMarcasImg .d8-et')].filter(e => getComputedStyle(e).display !== 'none');
    const a = ets.find(e => /Tracia/.test(e.textContent)), b = ets.find(e => /^\s*NORTE\s*$/i.test(e.textContent) || /\bnorte\b/i.test(e.textContent) && e.classList.contains('viento'));
    if (!a || !b) return { hay: false, a: !!a, b: !!b };
    const r = a.getBoundingClientRect(), q = b.getBoundingClientRect();
    return { hay: true, cruza: !(r.right <= q.left || q.right <= r.left || r.bottom <= q.top || q.bottom <= r.top), r: [r.top, r.bottom].map(Math.round), q: [q.top, q.bottom].map(Math.round) }; });
  ok((tn.hay && !tn.cruza) || (W < 600 && !tn.a), W + ' · v227: «Tracia y Asia Menor» y «NORTE» no se enciman (en el teléfono ese rótulo no va; ' + JSON.stringify(tn) + ')');
  await p.evaluate(() => { document.getElementById('lam').scrollTo(0, 0); lamIr('cuatro'); lamSubE(1); }); await p.waitForTimeout(900);
  const r1 = await p.evaluate(() => [...document.querySelectorAll('#lamMarcasImg .d8-et.gen')].map(b => b.textContent + (b.classList.contains('on') ? '*' : '')));
  const bt = p.locator('#lamMarcasImg .d8-et.gen[data-g="2"]');
  await bt.click(); await p.waitForTimeout(700);
  const r2 = await p.evaluate(() => { const b = document.querySelector('#lamMarcasImg .d8-et.gen.on'), q = b.getBoundingClientRect(), e = document.getElementById('lamEsc').getBoundingClientRect();
    const h = document.getElementById('lamHoja'), t = document.getElementById('lamSubTx'), ht = h.getBoundingClientRect(), tt = t.getBoundingClientRect();
    return { on: b.textContent, paso: document.querySelector('#lamMarcasImg .d8-et.paso').textContent, hoja: t.textContent, dentro: q.left >= e.left - 1 && q.right <= e.right + 1, alto: Math.round(q.height),
      nota: getComputedStyle(h).overflowY === 'visible' || (tt.top >= ht.top - 2 && tt.top < ht.bottom - 40) }; });
  ok(r1.length === 4 && /Casandro.*\*/.test(r1[0]) && /Seleuco/.test(r2.on) && /Seleuco · el oriente/.test(r2.paso) && /Siria y Babilonia · Roma: Siria, 65 a\.C\./.test(r2.paso) && /Seleuco/.test(r2.hoja) && /Smith, p\. 88/.test(r2.hoja) && r2.dentro && (W < 600 || r2.nota),
    W + ' · v227: Explorar, el reparto: cuatro generales en el mapa; tocar Seleuco muestra su viento, su tierra, cuándo lo absorbió Roma y su nota con la fuente (' + r2.paso + ')');
  const ec = await p.evaluate(() => { lamCierra(); lamAbre('d8', 'presentar'); const P = lamPasos(), i = P.findIndex(s => s.id === 'cuatro' && s.sub === 1); lamPres(i); return i; }); await p.waitForTimeout(900);
  await p.locator('#lamMarcasImg .d8-et.gen[data-g="3"]').click(); await p.waitForTimeout(600);
  const pr = await p.evaluate(() => [lamPasos()[lamPaso].id, lamPasos()[lamPaso].sub, document.querySelector('#lamMarcasImg .d8-et.gen.on').textContent + ' | ' + document.querySelector('#lamMarcasImg .d8-et.paso').textContent]);
  ok(ec >= 0 && pr[0] === 'cuatro' && pr[1] === 4 && /Tolomeo/.test(pr[2]) && /Egipto, 30 a\.C\./.test(pr[2]), W + ' · v227: Presentar, tocar Tolomeo lleva a su paso (' + pr.join(', ') + ')');
  for (const id of ['d2', 'd7', 'd8']) {
    const a = await p.evaluate(async id => { lamCierra(); lamAbre(id, 'presentar'); const P = lamPasos(); lamPres(P.length - 1); await new Promise(r => setTimeout(r, 500));
      const pres = [P[P.length - 1].tipo, document.getElementById('lamHoja').textContent];
      lamCierra(); lamAbre(id, 'explorar'); const R = lamRecorrido(); lamIr(R[R.length - 1].k); await new Promise(r => setTimeout(r, 700));
      return { pres, exp: [R[R.length - 1].k, document.getElementById('lamHoja').textContent] }; }, id);
    const q = await p.evaluate(id => LAMINAS[id].aplica, id);
    ok(a.pres[0] === 'aplica' && a.exp[0] === 'aplica' && [a.pres[1], a.exp[1]].every(t => t.includes(q.pregunta) && t.includes(q.ref)),
      W + ' · v227: ' + id + ' termina, al presentar y al explorar, con «' + q.pregunta + '» (' + q.ref + ')');
  }
  ok(errores.length === 0, W + ' · v227: cero errores' + (errores.length ? ': ' + errores.slice(0, 3).join(' | ') : ''));
  await ctx.close();
}
/* ── v228: el panel «Quién estudia» no se desplaza de lado y muestra las edades; la línea de
   tiempo tiene sus hitos (1844, la venida, hoy, el corte de escala y los mil años). ── */
for (const [W, H] of [[1440, 900], [1024, 768], [390, 844]]) {
  const ctx = await nav.newContext({ viewport: { width: W, height: H }, serviceWorkers: 'block', isMobile: W < 600, hasTouch: W < 600 });
  const p = await ctx.newPage(); const errores = [];
  p.on('pageerror', e => errores.push(e.message)); p.on('dialog', d => d.dismiss());
  await p.route('**/api/**', r => r.fulfill({ json: {} }));
  await p.goto(base + '?quedarse=1'); await p.waitForTimeout(500);
  await p.evaluate(() => { S.nombre = 'Camilo'; S.cat = 'gm'; guardar(); ponCat('gm'); ir('inicio'); document.getElementById('nav-yo').click(); }); await p.waitForTimeout(500);
  await p.evaluate(() => prepAbre()); await p.waitForTimeout(400);
  const mide = () => p.evaluate(() => { const c = document.querySelector('.hoja-yo .hoja-caja'), t = c.querySelector('.hoja-txt'), r = c.getBoundingClientRect();
    return { ancho: Math.round(r.width), lado: t.scrollWidth - t.clientWidth, dentro: r.left >= -1 && r.right <= innerWidth + 1, doc: document.documentElement.scrollWidth - innerWidth,
      chips: document.querySelectorAll('#prep .prep-chip').length, edades: [...document.querySelectorAll('#prep .prep-chip')].every(x => x.textContent.trim().split(' ').length > 1),
      actual: [...document.querySelectorAll('#prep .prep-op.actual')].map(x => /Tu preparación actual/.test(x.textContent)), ya: /Ya la tiene/.test(document.getElementById('prep').textContent),
      secc: [...document.querySelectorAll('#prep .prep-g + .prep-gd')].length, intro: !!document.querySelector('#prep .prep-intro'),
      cols: document.querySelector('#prep .prep-lista') ? getComputedStyle(document.querySelector('#prep .prep-lista')).gridTemplateColumns.split(' ').length : 0 }; });
  const m1 = await mide();
  ok(m1.lado <= 0 && m1.doc <= 0 && m1.dentro && (W < 900 || (m1.ancho >= 560 && m1.cols === 2)) && m1.chips >= 8 && m1.edades && m1.actual.length === 1 && m1.actual[0] && !m1.ya && m1.secc === 2 && m1.intro,
    W + ' · v228: «Quién estudia» sin desplazamiento de lado, con las edades, «Tu preparación actual» y las dos secciones explicadas (' + JSON.stringify(m1) + ')');
  await p.evaluate(() => prepActividad('cb')); await p.waitForTimeout(300);
  const m2 = await mide().catch(() => null), paso = await p.evaluate(() => document.querySelector('#prep .prep-paso') && document.querySelector('#prep .prep-paso').textContent);
  ok(m2 && m2.lado <= 0 && m2.doc <= 0 && /Paso 2 de 2/.test(paso || ''), W + ' · v228: el segundo paso (la categoría) se ve como segundo paso y no se desplaza de lado');
  await p.evaluate(() => cierraHoja());
  for (const id of ['d2', 'd7', 'd8']) {
    const t = await p.evaluate(async id => { verCap(id); lamAbre(id, 'explorar'); await new Promise(r => setTimeout(r, 700));
      const q = s => document.querySelector('#lam .lam-hitos ' + s), x = e => e ? e.getBoundingClientRect().left + e.getBoundingClientRect().width / 2 : NaN;
      /* v230: los años van en dos alturas: se pisan solo si se cruzan de verdad (en x y en y). */
      const ms = [...document.querySelectorAll('#lam .lam-marcas span')].filter(e => getComputedStyle(e).display !== 'none' && getComputedStyle(e).visibility !== 'hidden' && e.getBoundingClientRect().width > 0).map(e => e.getBoundingClientRect());
      const pisan = ms.some((a, i) => ms.some((b, j) => j > i && a.left < b.right - 1 && b.left < a.right - 1 && a.top < b.bottom - 1 && b.top < a.bottom - 1));
      const futVe = [...document.querySelectorAll('#lam .lam-marcas span.fut')].some(e => getComputedStyle(e).display !== 'none');
      const r = { juicio: !!q('.lam-hito.juicio'), venida: !!q('.lam-hito.venida'), hoy: !!q('.lam-hito.hoy'), corte: q('.lam-corte') ? q('.lam-corte').textContent : '', mil: !!q('.lam-mil'),
        orden: x(q('.lam-hito.juicio')) < x(q('.lam-hito.hoy')) && x(q('.lam-hito.hoy')) < x(q('.lam-corte')) && x(q('.lam-corte')) < x(q('.lam-hito.venida')) && x(q('.lam-hito.venida')) < x(q('.lam-mil')),
        pisan, ley: getComputedStyle(document.querySelector('#lam .lam-hley')).display, futVe };
      lamCierra(); return r; }, id);
    ok(t.juicio && t.venida && t.hoy && t.corte === '//' && t.mil && t.orden && !t.pisan && (t.futVe ? t.ley === 'none' : t.ley === 'flex'),
      W + ' · v228: ' + id + ', la línea de tiempo con 1844, hoy, el corte «//», la venida y los mil años, en orden y sin rótulos encimados; la leyenda sale cuando los nombres del futuro no caben (' + JSON.stringify(t) + ')');
  }
  ok(errores.length === 0, W + ' · v228: cero errores' + (errores.length ? ': ' + errores.slice(0, 3).join(' | ') : ''));
  await ctx.close();
}
/* ── v229: al presentar, la escena llena su área en cada paso y la comparación nunca la tapa;
   el libro abierto lleva el nombre de quien estudia. ── */
for (const [W, H] of [[1440, 900], [1900, 745]]) {
  const ctx = await nav.newContext({ viewport: { width: W, height: H }, serviceWorkers: 'block' });
  const p = await ctx.newPage(); const errores = [];
  p.on('pageerror', e => errores.push(e.message)); p.on('dialog', d => { errores.push('diálogo'); d.dismiss(); });
  await p.route('**/api/**', r => r.fulfill({ json: {} }));
  await p.goto(base + '?quedarse=1'); await p.waitForTimeout(500);
  await p.evaluate(() => { S.nombre = 'Camilo Esparza'; S.cat = 'gm'; guardar(); ponCat('gm'); ir('inicio'); });
  const malos = [];
  for (const id of ['d2', 'd7', 'd8']) {
    const n = await p.evaluate(id => { verCap(id); lamAbre(id, 'presentar'); return lamPasos().length; }, id); await p.waitForTimeout(600);
    for (let k = 0; k < n; k++) {
      await p.evaluate(k => lamPres(k), k); await p.waitForTimeout(700);
      const m = await p.evaluate(() => { const R = e => { if (!e || e.hidden || !e.getClientRects().length) return null; const r = e.getBoundingClientRect(); return r.width && r.height ? r : null; };
        const esc = R(document.getElementById('lamEsc')), h = document.querySelector('#lamSvg .lam-hist'), hv = h && h.style.opacity === '1' ? R(h) : null, hj = R(document.getElementById('lamHoja')), fi = R(document.getElementById('lamD2Fila')), d2 = R(document.getElementById('lamD2'));
        const lado = document.getElementById('lamEsc').classList.contains('lado');
        if (!esc || !hv) return null;
        const v = { l: Math.max(hv.left, esc.left), r: Math.min(hv.right, esc.right), t: Math.max(hv.top, esc.top), b: Math.min(hv.bottom, esc.bottom) };
        return { hueco: Math.round((lado && hj ? hj.left : esc.right) - v.r), banda: Math.round((v.t - esc.top) + (esc.bottom - v.b)), columna: !!d2, fila: fi && lado && hj ? Math.round(hj.left - fi.left) : 0 }; });
      if (m && (m.hueco > 12 || m.banda > 24 || m.columna || m.fila > 1)) malos.push(id + ' ' + k + ' ' + JSON.stringify(m));
    }
    await p.evaluate(() => lamCierra());
  }
  /* En 1900 × 745 el panel de las 2.300 tardes y mañanas deja un escenario muy bajo: ahí la escena es fondo y puede quedar más angosta. */
  const toleran = W === 1900 ? malos.filter(x => !/^d8 1[4-8] /.test(x)) : malos;
  ok(toleran.length === 0, W + '×' + H + ' · v229: al presentar, la escena llena su área en cada paso de Daniel 2, 7 y 8 y la comparación no la tapa' + (toleran.length ? ': ' + toleran.slice(0, 4).join(' | ') : ''));
  const nombres = [];
  for (const nom of ['Camilo Esparza', '<b onmouseover=alert(1)>Ana', '']) {
    nombres.push(await p.evaluate(async nom => { S.nombre = nom; lamAbre('d7', 'presentar'); lamPres(lamPasos().findIndex(x => x.id === 'juicio' && x.sub === 3)); await new Promise(r => setTimeout(r, 400));
      const b = document.querySelector('.lb-nombre b'), c = document.querySelector('.lam-libro-cita'); const r = { t: b && b.textContent, hijos: b ? b.children.length : -1, ap: c && /El vencedor será vestido de vestiduras blancas, y no borraré su nombre del libro de la vida/.test(c.textContent) && /Apocalipsis 3:5/.test(c.textContent) };
      lamCierra(); return r; }, nom));
  }
  ok(nombres[0].t === 'Camilo' && nombres[1].t === '<b' && nombres[1].hijos === 0 && nombres[2].t === 'tu nombre' && nombres.every(x => x.ap),
    W + ' · v229: el libro abierto dice el primer nombre de quien estudia (sin HTML; sin nombre, «tu nombre») con Apocalipsis 3:5 (' + JSON.stringify(nombres.map(x => x.t)) + ')');
  ok(errores.length === 0, W + ' · v229: cero errores' + (errores.length ? ': ' + errores.slice(0, 3).join(' | ') : ''));
  await ctx.close();
}
/* ── v230: al arrastrar por cada marca la escena, el rótulo y la parte coinciden; los años no se
   pisan; en Explorar la línea va debajo de la escena y se pega abajo sin tapar el texto ni la
   barra; el libro abierto con los nombres de pila. ── */
for (const [W, H] of [[1440, 900], [1024, 768], [390, 844]]) {
  const ctx = await nav.newContext({ viewport: { width: W, height: H }, serviceWorkers: 'block', isMobile: W < 600, hasTouch: W < 600 });
  const p = await ctx.newPage(); const errores = [];
  p.on('pageerror', e => errores.push(e.message)); p.on('dialog', d => { errores.push('diálogo'); d.dismiss(); });
  await p.route('**/api/**', r => r.fulfill({ json: /\/api\/nombres/.test(r.request().url()) ? { nombres: ['Ana', 'Luis', 'Camilo', '<i>X'] } : {} }));
  await p.goto(base + '?quedarse=1'); await p.waitForTimeout(500);
  await p.evaluate(() => { S.nombre = 'Camilo Esparza'; S.cat = 'gm'; guardar(); ponCat('gm'); ir('inicio'); });
  for (const id of ['d2', 'd7', 'd8']) {
    await p.evaluate(id => { verCap(id); lamAbre(id, 'explorar'); }, id); await p.waitForTimeout(900);
    const r = await p.evaluate(async () => {
      const L = LAM(), R = document.getElementById('lamRango'), ms = L.marcas.map(m => m[0]).filter(y => y !== 2476).sort((a, b) => a - b), ys = [];
      ms.forEach((y, i) => { ys.push(y); if (i < ms.length - 1) ys.push(Math.round((y + ms[i + 1]) / 2)); });
      const mal = [];
      for (const y of ys) { R.value = y; R.dispatchEvent(new Event('input')); await new Promise(r => setTimeout(r, lamEsE() ? 80 : 10));
        const exp = L.tiempo.filter(i => { const q = lamParte(i); return y >= q.de && y < q.a; }), fu = y > LAM_HOY ? L.futuro.find(f => y > f.de && y <= f.a) : null;
        const on = [...document.querySelectorAll('#lamTira .lam-ri.on')].map(e => e.getAttribute('data-p')).filter(Boolean).sort().join(), eon = (fu ? (fu.id ? [fu.id] : []) : exp).slice().sort().join();
        const tano = document.getElementById('lamTano').textContent, tq = document.getElementById('lamTq').textContent;
        const yTx = y > LAM_HOY ? 'Futuro' : y < 0 ? (-y) + ' a.C.' : y + ' d.C.';
        let esc = true;
        if (lamEsE()) { const pp = exp.map(lamParte).sort((x, z) => (x.a - x.de) - (z.a - z.de))[0], vac = !pp && !fu && (L.vacios || []).find(v => y >= v[0] && y < v[1]);
          const quiere = lamSrc(fu ? fu.f : pp ? pp.img : vac && vac[3] ? vac[3] : L.inicioF);
          /* La escena cambia cuando la imagen ya está decodificada: se espera hasta 1,5 s. */
          for (let k = 0; k < 30 && document.querySelector('#lamSvg .lam-hist').getAttribute('href') !== quiere; k++) await new Promise(r => setTimeout(r, 50));
          esc = document.querySelector('#lamSvg .lam-hist').getAttribute('href') === quiere; }
        const txt = fu ? tq.startsWith(fu.t) : exp.every(i => tq.toLowerCase().includes(lamParte(i).reino.toLowerCase().replace(/^el /, '')));
        if (on !== eon || tano !== yTx || !esc || !txt) mal.push(y + ': ' + [on !== eon && 'parte ' + on + '≠' + eon, tano !== yTx && 'año ' + tano, !esc && 'escena', !txt && 'rótulo ' + tq].filter(Boolean).join(', ')); }
      /* Los años de abajo no se pisan. */
      const vis = [...document.querySelectorAll('#lam .lam-marcas span')].filter(e => getComputedStyle(e).display !== 'none' && getComputedStyle(e).visibility !== 'hidden' && e.getBoundingClientRect().width).map(e => e.getBoundingClientRect());
      const pisan = vis.some((a, i) => vis.some((b, j) => j > i && a.left < b.right - 1 && b.left < a.right - 1 && a.top < b.bottom - 1 && b.top < a.bottom - 1));
      const ven = document.querySelector('#lam .lam-hito.venida').getBoundingClientRect(), mil = document.querySelector('#lam .lam-mil').getBoundingClientRect();
      return { n: ys.length, mal, pisan, venMil: Math.abs((ven.left + ven.width / 2) - mil.left) <= 2 }; }, id);
    ok(!r.mal.length && !r.pisan && r.venMil, W + ' · v230: ' + id + ', arrastrando por las ' + r.n + ' marcas y sus medios: la escena, el año, el rótulo y la parte coinciden; los años no se pisan; los mil años empiezan en la venida' + (r.mal.length ? ' — ' + r.mal.slice(0, 3).join(' | ') : '') + (r.pisan ? ' — se pisan' : ''));
    const lay = await p.evaluate(async () => { const m = document.querySelector('#lam .lam-marco'), t = m.querySelector(':scope>.lam-tiempo'), es = document.getElementById('lamEsc'), ri = m.querySelector('.lam-riel');
      const bj = m.querySelector(':scope>.lam-bajo'), rbj = bj && bj.getBoundingClientRect().height ? bj.getBoundingClientRect() : null, rt = t.getBoundingClientRect(), re0 = es.getBoundingClientRect(), re = rbj ? { top: re0.top, bottom: rbj.bottom, left: re0.left, right: re0.right } : re0, rr = ri.getBoundingClientRect();
      const debajo = rt.top >= re.bottom - 1 && rt.top - re.bottom < 60 && rt.left < re.right && rt.right > re.left, antesRiel = !(rr.top > re.bottom - 1) || rr.top >= rt.bottom - 1;
      const l = document.getElementById('lam'); l.scrollTo(0, l.scrollHeight); await new Promise(r => setTimeout(r, 450));
      const f = t.getBoundingClientRect(), hj = document.getElementById('lamHoja').getBoundingClientRect(), hjFija = getComputedStyle(document.getElementById('lamHoja')).position !== 'static';
      const e0 = document.elementsFromPoint(innerWidth / 2, innerHeight - 2).find(e => !t.contains(e)); let barra = 0;
      for (let e = e0; e; e = e.parentElement) { const c = getComputedStyle(e); if ((c.position === 'fixed' || c.position === 'sticky') && e.getBoundingClientRect().top > innerHeight * .45) { barra = innerHeight - e.getBoundingClientRect().top; break; } }
      return { debajo, antesRiel, aparte: !!document.querySelector('#lam .lam-l23-sec #lamL23t') || !LAM().linea2300, fija: t.classList.contains('fija') || (f.top >= 0 && f.bottom <= innerHeight), pegada: t.classList.contains('fija'), sobreBarra: Math.round(innerHeight - f.bottom - barra),
        tapaTexto: hjFija && f.right > hj.left + 1 && f.left < hj.right - 1 && f.top < hj.bottom - 1 && f.bottom > hj.top + 1 }; });
    ok(lay.debajo && lay.antesRiel && lay.aparte && lay.fija && (Math.abs(lay.sobreBarra) <= 2 || !lay.pegada) && !lay.tapaTexto,
      W + ' · v230: ' + id + ', Explorar: la línea va justo debajo de la escena (antes de las partes), las 2.300 tardes y mañanas aparte, y al bajar se pega encima de la barra sin tapar el texto (' + JSON.stringify(lay) + ')');
    await p.evaluate(() => lamCierra());
  }
  const lib = await p.evaluate(async () => { lamOtrosNombres = null; lamAbre('d7', 'presentar'); lamPres(lamPasos().findIndex(x => x.id === 'juicio' && x.sub === 3)); await new Promise(r => setTimeout(r, 600));
    const n = document.querySelector('.lb-nombre'), r = { mio: n.querySelector('b').textContent, otros: [...n.querySelectorAll('.lb-otros span')].map(e => e.textContent), html: n.querySelectorAll('.lb-otros *:not(span)').length, ap: /El vencedor será vestido/.test(document.querySelector('.lam-libro-cita').textContent) };
    lamCierra(); return r; });
  ok(lib.mio === 'Camilo' && lib.otros.length === 2 && lib.otros.every(x => ['Ana', 'Luis', '<i>X'].includes(x)) && !lib.otros.includes('Camilo') && lib.html === 0 && lib.ap,
    W + ' · v230: el libro abierto: primero el nombre de quien estudia, después dos nombres de pila de otros, como texto, con Apocalipsis 3:5 (' + JSON.stringify(lib) + ')');
  ok(errores.length === 0, W + ' · v230: cero errores' + (errores.length ? ': ' + errores.slice(0, 3).join(' | ') : ''));
  await ctx.close();
}

/* ── v231: las eras que se solapan en dos carriles; al elegir o llegar a una parte, el pulgar, la
   escena y el rótulo van a su INICIO (Daniel 2, 7 y 8, en Explorar y en Presentar); al arrastrar
   entre 538 y 1798 se ve Roma papal con Roma dividida debajo; las siete plagas y las catorce señales. ── */
for (const [W, H] of [[1440, 900], [390, 844]]) {
  const ctx = await nav.newContext({ viewport: { width: W, height: H }, serviceWorkers: 'block', isMobile: W < 600, hasTouch: W < 600 });
  const p = await ctx.newPage(); const errores = [];
  p.on('pageerror', e => errores.push(e.message)); p.on('dialog', d => { errores.push('diálogo'); d.dismiss(); });
  await p.route('**/api/**', r => r.fulfill({ json: {} }));
  await p.goto(base + '?quedarse=1'); await p.waitForTimeout(500);
  await p.evaluate(() => { S.nombre = 'Camilo'; S.cat = 'gm'; guardar(); ponCat('gm'); ir('inicio'); });
  for (const id of ['d2', 'd7', 'd8']) {
    await p.evaluate(id => verCap(id), id);
    const r = await p.evaluate(async id => {
      const mal = [], vistos = [], espera = ms => new Promise(r => setTimeout(r, ms));
      const mira = (p, donde) => { const R = document.getElementById('lamRango'), t = document.getElementById('lamTano').textContent, c2 = document.querySelector('#lam .lam-carril2.on');
        vistos.push(donde + ' ' + p.id + ' ' + R.value);
        if (Number(R.value) !== p.de) mal.push(donde + ' ' + p.id + ': pulgar ' + R.value + '≠' + p.de);
        if (t !== lamRangoTx(p)) mal.push(donde + ' ' + p.id + ': rótulo «' + t + '»');
        if (!!p.hasta !== !!(c2 && Number(c2.dataset.de) === p.de)) mal.push(donde + ' ' + p.id + ': carril'); };
      /* Explorar: tocar cada parte con fecha. */
      lamAbre(id, 'explorar'); await espera(500);
      const L = LAM(), ps = L.tiempo.map(lamParte).filter(p => p && p.de != null && p.de < LAM_HOY);
      for (const q of ps) { lamToca(q.id); await espera(lamEsE() ? 250 : 120); mira(q, 'explorar');
        /* La escena es la de la parte (las escenas animadas se arman con varias capas: se mira cuál está elegida). */
        if (lamSel !== q.id || lamDonde !== q.id) mal.push('explorar ' + q.id + ': escena ' + lamSel);
        if (!lamEsE()) lamInicio(); }
      lamCierra(); await espera(200);
      /* Presentar: llegar a cada parte. */
      lamAbre(id, 'presentar'); await espera(400);
      const pasos = lamEsE() ? lamPasosE() : lamPasos();
      for (const q of ps) { const k = pasos.findIndex(s => s.tipo === 'parte' && s.id === q.id && (s.sub == null || s.sub === 0)); if (k < 0) continue;
        lamPres(k); await espera(lamEsE() ? 300 : 150); mira(q, 'presentar'); if (lamPaso !== k) mal.push('presentar ' + q.id + ': paso'); }
      /* Arrastrar a 1000: Roma papal arriba, Roma dividida en su carril, visible. */
      const R = document.getElementById('lamRango'); let drag = null;
      if (ps.some(p => p.hasta)) { R.value = 1000; R.dispatchEvent(new Event('input')); await espera(lamEsE() ? 900 : 100);
        const c = document.querySelector('#lam .lam-carril2'), cr = c.getBoundingClientRect(), pr = document.getElementById('lamPista').getBoundingClientRect(), x = pr.left + pr.width * lamPos(1000) / 100;
        drag = { tq: document.getElementById('lamTq').textContent, ve: cr.width > 20 && cr.height >= 3 && getComputedStyle(c).display !== 'none', debajo: cr.top >= pr.bottom - 1, cruza: cr.left <= x && cr.right >= x,
          esc: lamEsE() ? document.querySelector('#lamSvg .lam-hist').getAttribute('href').split('/').pop() : [...document.querySelectorAll('#lamSvg .lam-parte.on')].map(e => e.getAttribute('data-p')).sort().join() }; }
      lamCierra(); return { mal, n: vistos.length, drag }; }, id);
    const dragOk = !r.drag || (/^Roma papal; a la vez, Roma dividida sigue hasta la venida/.test(r.drag.tq) && r.drag.ve && r.drag.debajo && r.drag.cruza && (id === 'd7' ? r.drag.esc === 'cuerno.webp' : r.drag.esc === 'barro,dedos'));
    ok(!r.mal.length && r.n >= 8 && dragOk, W + ' · v231: ' + id + ', al tocar o llegar a cada parte (' + r.n + ') el pulgar va a su INICIO, el rótulo dice su tramo («476 d.C. – hasta la venida» en Roma dividida) y Roma dividida se marca en su carril' +
      (r.drag ? '; en 1000 se ve Roma papal con Roma dividida debajo (' + JSON.stringify(r.drag) + ')' : '') + (r.mal.length ? ' — ' + r.mal.slice(0, 4).join(' | ') : ''));
  }
  /* Las siete plagas y las catorce señales. */
  await p.evaluate(() => verComparar()); await p.waitForTimeout(500);
  const u = await p.evaluate(async () => {
    const m = document.getElementById('cmpUlt'); m.scrollIntoView({ block: 'start' });
    const filas = [...m.querySelectorAll('.cmp-ult-ev span')].map(e => e.textContent), grupos = [...m.querySelectorAll('.cmp-ult-vz.grupo')].map(e => e.textContent);
    cmpUlt(ultIdx('senales')); await new Promise(r => setTimeout(r, 300));
    const d = document.getElementById('cmpUltDet'), li = [...d.querySelectorAll('.cmp-ult-num > li')], n1 = li[0] && getComputedStyle(li[0], '::before').content;
    cmpUlt(ultIdx('plaga7')); await new Promise(r => setTimeout(r, 300));
    const d7 = document.getElementById('cmpUltDet').textContent;
    return { pl: filas.filter(t => /plaga:/.test(t)).length, grupos, li: li.length, n1, cab: /a la vez con/.test(d7) && /liberación/.test(d7), cs: /CS 694/.test(d7) && /Ya está hecho/.test(d7),
      pag: document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1 }; });
  ok(u.pl === 7 && u.grupos.length === 2 && u.li === 14 && u.n1 && u.n1 !== 'none' && u.cab && u.cs && u.pag,
    W + ' · v231: las siete plagas, cada una en su fila, bajo «Las copas, una tras otra» y lo que no tiene plaga precisa aparte; la séptima a la vez con la liberación; las señales numeradas del 1 al 14 (' + JSON.stringify(u) + ')');
  ok(errores.length === 0, W + ' · v231: cero errores' + (errores.length ? ': ' + errores.slice(0, 3).join(' | ') : ''));
  await ctx.close();
}
await nav.close(); srv.close();
console.log('\n' + (fallas ? fallas + ' FALLOS' : 'EN EL NAVEGADOR: TODO BIEN'));
process.exit(fallas ? 1 : 0);
})();
