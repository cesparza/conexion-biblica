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
    r.writeHead(200, { 'content-type': f.endsWith('.html') ? 'text/html; charset=utf-8' : f.endsWith('.webp') ? 'image/webp' : 'application/json' });
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
    const capas = await p.evaluate(() => document.querySelectorAll('#lamSvg .lam-estatua image').length);
    const imgs = await p.evaluate(async () => { const hs = [...document.querySelectorAll('#lamSvg image')].map(i => i.getAttribute('href')).filter(Boolean);
      const r = await Promise.all(hs.map(h => fetch(h).then(x => x.ok && x.headers.get('content-type') === 'image/webp').catch(() => false))); return r.every(Boolean) && r.length; });
    ok(capas === 6 && imgs === 9, W + ' · la lámina trae las 6 capas de la estatua y sus 9 imágenes (' + capas + ', ' + imgs + ')');
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
      await p.locator('#lamEts .lam-et[data-p="' + id + '"]').click(); await p.waitForTimeout(1300);
      const r = await p.evaluate(() => [document.getElementById('lamHoja').textContent, document.querySelector('#lamSvg .lam-piedra').getAttribute('transform'), document.querySelector('#lamSvg .lam-monte').style.opacity]);
      ok(re.test(r[0]) && /translate\(550 1085\)/.test(r[1]) && (id !== 'monte' || r[2] === '1'), W + ' · la etiqueta «' + id + '» explica y anima (' + r[1] + ')');
    }
    await p.evaluate(() => { const r = document.getElementById('lamRango'); r.value = 1520; r.dispatchEvent(new Event('input')); });
    const anio = await p.evaluate(() => [document.getElementById('lamTq').textContent, [...document.querySelectorAll('#lamSvg .lam-parte.on')].map(x => x.getAttribute('data-p')).sort().join()]);
    ok(/Roma dividida y Roma papal/.test(anio[0]) && anio[1] === 'barro,dedos', W + ' · en 1520 se encienden los dedos y el barro: ' + anio.join(' / '));
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
    for (let i = 0; i < 17; i++) await p.keyboard.press('ArrowRight');
    await p.waitForTimeout(300);
    const fin = await p.evaluate(() => [document.getElementById('lamCuenta').textContent, document.getElementById('lamHoja').textContent]);
    ok(fin[0] === '16 / 16' && /fiel su interpretación/.test(fin[1]), W + ' · Presentar recorre los 16 pasos y termina en 2:45 (' + fin[0] + ')');
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
    const tira = await p.evaluate(async () => { const hs = [...document.querySelectorAll('#lamTira .lam-tb img'), document.querySelector('#lamSvg .lam-hist')].map(i => i.getAttribute('src') || i.getAttribute('href'));
      const r = await Promise.all(hs.map(h => fetch(h).then(x => x.ok && x.headers.get('content-type') === 'image/webp').catch(() => false)));
      return [document.querySelectorAll('#lamTira .lam-tb').length, r.every(Boolean) && r.length, !document.getElementById('lamEsc').classList.contains('cargando')]; });
    ok(tira[0] === 9 && tira[1] === 10 && tira[2], W + ' · Daniel 7: la tira trae las 9 partes y sus imágenes cargan (' + tira.join(', ') + ')');
    const lado = await p.evaluate(() => { const r = document.getElementById('lamEsc').getBoundingClientRect(); return Math.round(r.width / r.height * 100) / 100; });
    ok(Math.abs(lado - 2050 / 1152) < 0.02, W + ' · la imagen de Daniel 7 es apaisada (' + lado + ')');
    /* v205: aquí se prueba la foto entera del oso; con oso-solo.png sube recortado sobre el mar (ver 3e). */
    await p.evaluate(() => { for (const k in lamHayP) delete lamHayP[k]; LAMINAS.d7.sube.solo.forEach(f => { lamHayImg[lamSrc(f)] = false; }); });
    await p.locator('#lamTira .lam-tb[data-p="oso"]').click();
    await p.waitForTimeout(2300); /* v205: el oso sube del mar (1,7 s) antes de quedar como imagen */
    const oso = await p.evaluate(() => { const h = document.getElementById('lamHoja'), r = h.getBoundingClientRect(), e = document.getElementById('lamEsc').getBoundingClientRect();
      return [h.textContent, document.querySelector('#lamSvg .lam-hist').getAttribute('href'), document.getElementById('lamChip').textContent,
        document.querySelector('#lamTira .lam-tb.on').dataset.p, !(r.left < e.right - 1 && r.right > e.left + 1 && r.top < e.bottom - 1 && r.bottom > e.top + 1)]; });
    await p.evaluate(() => LAMINAS.d7.sube.solo.forEach(f => { delete lamHayImg[lamSrc(f)]; }));
    ok(/Medo-Persia/.test(oso[0]) && /Lidia/.test(oso[0]) && /d7\/oso\.webp$/.test(oso[1]) && /^Oso/.test(oso[2]) && oso[3] === 'oso' && oso[4],
      W + ' · tocar el oso en la tira cambia la imagen y abre su explicación sin taparla');
    await p.locator('#lamTira .lam-tb[data-p="cuerno"]').click();
    await p.waitForTimeout(700);
    const cu = await p.evaluate(() => [document.getElementById('lamHoja').textContent, [...document.querySelectorAll('#lamHoja .lam-fig')].map(f => f.dataset.f).join()]);
    ok(/Roma papal/.test(cu[0]) && /13:3/.test(cu[0]) && /d2\/e538/.test(cu[1]) && /d2\/e1798/.test(cu[1]), W + ' · el cuerno pequeño trae 538 y 1798 de Daniel 2 (' + cu[1] + ')');
    for (const [y, re, img] of [[1798, /Roma dividida/, 'cuarta'], [1520, /Roma dividida y Roma papal/, 'cuerno'], [1900, /el juicio en el cielo/, 'juicio']]) {
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
    ok(sin[0] && sin[1] === 'none' && sin[2] === 'xMidYMid slice', W + ' · la tecla T oculta el texto y la imagen toma toda la escena');
    await p.keyboard.press('t');
    await p.evaluate(() => lamPres(0));
    /* v205: 28 pasos con el clicker (los 4 del juicio, los 2 del Hijo del hombre y
       las 11 señas van dentro de su parte); el contador cuenta 14. */
    const nPasos = await p.evaluate(() => lamPasos().length);
    for (let i = 0; i < nPasos; i++) await p.keyboard.press(i % 2 ? 'PageDown' : 'ArrowRight');
    await p.waitForTimeout(700);
    const fin = await p.evaluate(() => [document.getElementById('lamCuenta').textContent, document.getElementById('lamHoja').textContent, document.querySelector('#lamSvg .lam-hist').getAttribute('href'), document.getElementById('lamSig').disabled]);
    ok(nPasos === 28 && fin[0] === '14 / 14' && fin[3] && /se hizo justicia a los santos/.test(fin[1]) && fin[2].endsWith('d7/juicio.webp'), W + ' · Presentar recorre los ' + nPasos + ' pasos de Daniel 7 (contador ' + fin[0] + ') y termina en 7:22');
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
    ok(metales === 'leon:oro oso:plata leopardo:bronce bestia:hierro cuernos:dedos cuerno:barro juicio:agrega hijo:piedra reino:monte',
      W + ' · con Daniel 2 cada parte enciende su metal y el juicio dice que lo agrega Daniel 7 (' + metales + ')');
    const ag = await p.evaluate(() => { lamEligeE(LAMINAS.d7.partes.findIndex(q => q.id === 'juicio')); return [document.getElementById('lamD2Ag').textContent, document.getElementById('lamChip').textContent]; });
    ok(/El juicio/.test(ag[0]) && /lo agrega Daniel 7/.test(ag[1]), W + ' · el juicio: «lo que Daniel 7 agrega» (' + ag[1].slice(-40) + ')');
    await p.evaluate(() => { lamEligeE(0); document.querySelector('#lamD2 .lam-d2-hit[data-p="plata"]').click(); });
    ok(await p.evaluate(() => lamSel === 'oso'), W + ' · tocar la plata en la estatua chica abre el oso');
    await p.locator('.lam-tira-bots .lam-cond2').click();
    ok(await p.evaluate(() => document.getElementById('lamD2').hidden && !/Daniel 2/.test(document.getElementById('lamChip').textContent)), W + ' · «Con Daniel 2» se apaga');
    await p.locator('.lam-tira-bots .lam-cond2').click();
    /* Las capas (cuerno-suelto.png, leon-solo.png…) ya existen; el camino sin ellas se
       fuerza sembrando «no existe» en lo que la app ya averiguó (lamHayImg), y se
       vuelve a probar con los archivos reales. */
    const capas = (hay) => p.evaluate(hay => { const L = LAMINAS.d7, fs = [L.cuernos.capas.suelto, L.cuernos.capas.pequeno, ...L.sube.solo];
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
      return [document.querySelector('#lamSvg .lam-hist').getAttribute('href'), h.length, h.every(x => /translate\((?!0 0)/.test(x.getAttribute('transform')) && x.style.opacity !== '0' && /cuerno-suelto\.png$/.test(x.getAttribute('href'))),
        g.querySelector('.lam-tapa').style.opacity, g.querySelector('.lam-pq-img').getAttribute('y'), document.querySelectorAll('#lamMarcasImg .lam-ley .cae').length]; });
    ok(cap[0].endsWith('d7/cuarta.webp') && cap[1] === 3 && cap[2] && cap[3] === '1' && cap[4] === '0' && cap[5] === 3,
      W + ' · con cuerno-suelto.png y cuerno-pequeno.png: los tres se desprenden sobre cuarta.webp y crece el pequeño (' + cap.join(', ') + ')');
    await p.evaluate(() => lamEligeE(2)); await p.waitForTimeout(800);
    const subeCon = await p.evaluate(() => [[...document.querySelectorAll('#lamZoom .lam-atras')].map(i => i.getAttribute('href').split('/').pop()).join(), (document.querySelector('#lamZoom .lam-sube-img') || { getAttribute: () => '' }).getAttribute('href').split('/').pop(), document.querySelector('#lamSvg .lam-hist').getAttribute('href').split('/').pop()]);
    ok(subeCon.join(' | ') === 'leon-solo.png,oso-solo.png | leopardo-solo.png | mar.webp', W + ' · con capas: el leopardo sube del mar y el león y el oso quedan atrás (' + subeCon.join(' | ') + ')');
    await p.evaluate(() => lamEligeE(3)); await p.waitForTimeout(800);
    const bes = await p.evaluate(() => [document.querySelectorAll('#lamZoom .lam-atras,#lamZoom .lam-sube-img').length, document.querySelector('#lamSvg .lam-hist').getAttribute('href').split('/').pop()]);
    ok(bes[0] === 0 && bes[1] === 'cuarta.webp', W + ' · la cuarta bestia, sin capa propia, sube con su foto entera (' + bes.join(', ') + ')');
    await capas(false);
    await p.evaluate(() => lamEligeE(5)); await p.waitForTimeout(300);
    /* Las once señas, en la hoja del cuerno pequeño. */
    await p.evaluate(() => lamSenasPlay()); await p.waitForTimeout(300);
    const se = await p.evaluate(() => [document.querySelectorAll('#lamSenas li').length, document.querySelectorAll('#lamSenas li.on').length]);
    ok(se[0] === 11 && se[1] === 11, W + ' · las once señas del cuerno se encienden (' + se.join(', ') + ')');
    /* El juicio por pasos: la imagen se acerca a la parte del texto de cada paso. */
    await p.evaluate(() => lamEligeE(6));
    const ju = [];
    for (let j = 0; j < 4; j++) ju.push(await p.evaluate(j => { lamSubE(j); const P = lamParte('juicio').pasos[j];
      return document.getElementById('lamZoom').getAttribute('viewBox') === P.caja.map(n => n.toFixed(1)).join(' ') && document.getElementById('lamSubTx').textContent.includes(P.texto) &&
        document.getElementById('lamChip').textContent.includes(P.t); }, j));
    ok(ju.every(Boolean), W + ' · el juicio en 4 pasos: tronos, Anciano de días, río de fuego, libros (' + ju.join() + ')');
    /* 1844 en la línea de tiempo. */
    const t44 = await p.evaluate(() => { const r = document.getElementById('lamRango'); r.value = 1844; r.dispatchEvent(new Event('input'));
      return [[...document.querySelectorAll('.lam-marcas span.arriba')].map(x => x.textContent).join(), document.querySelector('#lamSvg .lam-hist').getAttribute('href'), document.getElementById('lamTq').textContent]; });
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
    const pres = await p.evaluate(() => lamPasos().map(x => x.tipo === 'parte' ? x.id + (x.sub != null ? x.sub : '') : x.tipo === 'senas' ? 's' + x.sub : x.tipo[0]).join(' '));
    ok(pres === 'h h leon oso leopardo bestia cuernos cuerno s0 s1 s2 s3 s4 s5 s6 s7 s8 s9 s10 juicio0 juicio1 juicio2 juicio3 hijo0 hijo1 reino d c',
      W + ' · Presentar: ' + pres);
    const ix = await p.evaluate(() => lamPasos().findIndex(x => x.tipo === 'senas' && x.sub === 3));
    await p.evaluate(k => lamPres(k), ix);
    const sp = await p.evaluate(() => [document.querySelectorAll('#lamHoja .lam-sl li.on').length, document.querySelector('#lamHoja .lam-sl li.ahora b').textContent, document.querySelector('#lamSvg .lam-hist').getAttribute('href'), document.getElementById('lamCuenta').textContent]);
    ok(sp[0] === 4 && /pequeño/.test(sp[1]) && sp[2].endsWith('d7/cuerno.webp') && sp[3] === '9 / 14', W + ' · la seña 4 en Presentar: cuatro encendidas sobre el cuerno pequeño (' + sp.join(', ') + ')');
    const ij = await p.evaluate(() => lamPasos().findIndex(x => x.id === 'juicio' && x.sub === 2));
    await p.evaluate(k => lamPres(k), ij);
    const JUICIO2 = await p.evaluate(() => lamParte('juicio').pasos[2].caja.map(n => n.toFixed(1)).join(' '));
    const pj = await p.evaluate(() => [document.getElementById('lamHoja').textContent, document.getElementById('lamZoom').getAttribute('viewBox'), document.getElementById('lamCuenta').textContent]);
    ok(/paso 3 de 4/.test(pj[0]) && /Un río de fuego procedía/.test(pj[0]) && pj[1] === JUICIO2, W + ' · el juicio, paso 3 de 4 en Presentar (' + pj[1] + ', ' + pj[2] + ')');
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
  // Comparar: tocar una fila la enciende y abre su detalle.
  await p.evaluate(() => verComparar()); await p.waitForTimeout(500);
  await p.locator('button.cmp-fila[data-k="-539"]').click();
  const cm = await p.evaluate(() => [document.querySelector('button.cmp-fila.on').getAttribute('data-k'), document.querySelector('.cmp-dt').textContent, document.documentElement.scrollWidth - innerWidth]);
  ok(cm[0] === '-539' && /Pecho y brazos de plata/.test(cm[1]) && /Oso/.test(cm[1]) && cm[2] <= 0, W + ' · v205: en Comparar, Medo-Persia se enciende en Daniel 2 y Daniel 7 (desborde ' + cm[2] + ')');
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
await nav.close(); srv.close();
console.log('\n' + (fallas ? fallas + ' FALLOS' : 'EN EL NAVEGADOR: TODO BIEN'));
process.exit(fallas ? 1 : 0);
})();
