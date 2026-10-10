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
await nav.close(); srv.close();
console.log('\n' + (fallas ? fallas + ' FALLOS' : 'EN EL NAVEGADOR: TODO BIEN'));
process.exit(fallas ? 1 : 0);
})();
