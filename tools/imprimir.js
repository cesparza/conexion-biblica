/* Genera material impreso desde fuente/: exámenes con clave y guías de
   estudio. Escribe HTML listo para imprimir (Archivo → Imprimir → PDF)
   FUERA del repo, en Iglesia/material-daniel/generado/, porque los
   archivos con respuestas no deben llegar a la URL pública.

   El render del examen ya no vive aquí: está en fuente/imprimible.js, que
   también usa la app. Este script solo escoge las preguntas y escribe a
   disco.
   Uso:  node tools/imprimir.js [carpetaDestino]                      */
const fs = require('fs');
const path = require('path');
const { CAPS, CONTENIDO } = require('../fuente/contenido.js');
const { BANCO } = require('../fuente/preguntas.js');
const { MODULOS, CONT_MODULOS } = require('../fuente/modulos.js');
const { LOGO_TL } = require('../fuente/logo.js');
const MAT = require('../fuente/matutina.js');
const IMPR = require('../fuente/imprimible.js');

const DESTINO = process.argv[2] ||
  path.join(__dirname, '..', '..', '..', 'material-daniel', 'generado');
fs.mkdirSync(DESTINO, { recursive: true });

/* PRNG con semilla fija: el mismo examen se regenera idéntico. */
function prng(seed) {
  let s = seed >>> 0;
  return () => (s = (s * 1664525 + 1013904223) >>> 0) / 4294967296;
}

const TODOS_CAPS = [...CAPS, ...MAT.MAT_CAPS];

/* Baraja las opciones de una múltiple y reubica la respuesta correcta.
   Sin esto la clave queda sesgada (en el examen original: C=47, B=44,
   A=6, D=3) y se puede aprobar adivinando la letra más frecuente. */
function barajaOpciones(q, rnd) {
  if (q.t !== 'mc' || !q.o) return q;
  const idx = q.o.map((_, i) => i);
  for (let i = idx.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [idx[i], idx[j]] = [idx[j], idx[i]];
  }
  return { ...q, o: idx.map(i => q.o[i]), a: idx.indexOf(q.a) };
}

/* Reparte n preguntas entre capítulos de forma pareja (round-robin). */
function elegir(pool, n, rnd) {
  if (!n || !pool.length) return [];
  const porCap = {};
  for (const q of pool) (porCap[q.cap] = porCap[q.cap] || []).push(q);
  for (const c of Object.values(porCap)) c.sort(() => rnd() - 0.5);
  /* El orden sale del catálogo completo, que incluye los días de la matutina;
     con solo CAPS, un examen de matutina se quedaba sin capítulos y fallaba. */
  const orden = TODOS_CAPS.map(c => c.id).filter(id => porCap[id]);
  if (!orden.length) return [];
  const sel = [];
  let i = 0;
  while (sel.length < n && sel.length < pool.length) {
    const cap = porCap[orden[i % orden.length]];
    if (cap && cap.length) sel.push(cap.shift());
    i++;
  }
  const idx = Object.fromEntries(TODOS_CAPS.map((c, j) => [c.id, j]));
  return sel.sort((a, b) => idx[a.cap] - idx[b.cap]);
}

const pagina = IMPR.paginaImpr;

function generaExamen(cat, nmc, ntf, nfill, semilla, etiqueta, alcance) {
  /* Se excluyen los capítulos marcados `extra`: se estudian, pero el
     reglamento no los pide (hoy, el 31 de octubre). */
  const ids = TODOS_CAPS.filter(c => c.cats.includes(cat) && !c.extra).map(c => c.id);
  const pool = [...BANCO, ...MAT.MAT_BANCO].filter(q => ids.includes(q.cap));
  const rnd = prng(semilla);
  const sel = [
    ...elegir(pool.filter(q => q.t === 'mc'), nmc, rnd),
    ...elegir(pool.filter(q => q.t === 'tf'), ntf, rnd),
    ...elegir(pool.filter(q => q.t === 'fill'), nfill, rnd),
  ].map(q => barajaOpciones(q, rnd));
  const base = { sel, cat, etiqueta, alcance, logo: LOGO_TL, caps: TODOS_CAPS };
  return {
    examen: IMPR.docExamen([IMPR.hojaExamen({ ...base, conR: false })], 'Examen ' + etiqueta),
    clave: IMPR.docExamen([IMPR.hojaExamen({ ...base, conR: true })], 'Clave ' + etiqueta),
  };
}

function generaGuia() {
  let h = `<img class="logo" src="${LOGO_TL}" alt="Iglesia Adventista Tierra Linda">
    <div class="igl">Iglesia Adventista del Séptimo Día · Tierra Linda</div>
    <h1>GUÍA DE ESTUDIO — CONEXIÓN BÍBLICA</h1>
    <div class="sub">Daniel 1–6 · Profetas y Reyes caps. 39–44</div>
    <div class="meta">Texto bíblico: Reina Valera 1995 · Libro complementario: Elena G. de White<br>
    Los capítulos marcados con ★ también aplican para Aventureros (Daniel 1, 2, 3 y 6 · P&amp;R 39, 41 y 44)</div>`;
  for (const c of CAPS) {
    const av = c.cats.includes('av') ? ' ★' : '';
    h += `<div class="gcap"><div class="gtit">${c.label}${av} — ${c.sub}</div>
      <div class="gsub">${c.src}</div>` +
      (CONTENIDO[c.id] || []).map(s => `<h3>${s.t}</h3>${s.h}`).join('') + `</div>`;
  }
  for (const m of MODULOS) {
    const av = m.cats.includes('av') ? ' ★' : '';
    h += `<div class="gcap"><div class="gtit">${m.icono} Repaso general: ${m.label}${av}</div>
      <div class="gsub">${m.sub}</div>` +
      (CONT_MODULOS[m.id] || []).map(s => `<h3>${s.t}</h3>${s.h}`).join('') + `</div>`;
  }
  h += `<div class="pie">Generada desde fuente/contenido.js y fuente/modulos.js — mismo material de la app</div>`;
  return pagina('Guía de estudio — Conexión Bíblica', h);
}

function generaGuiaMatutina() {
  let h = `<img class="logo" src="${LOGO_TL}" alt="Iglesia Adventista Tierra Linda">
    <div class="igl">Iglesia Adventista del Séptimo Día · Tierra Linda</div>
    <h1>DEVOCIÓN MATUTINA — HÉROES Y VILLANOS</h1>
    <div class="sub">Guía de estudio de octubre</div>
    <div class="meta">Matutina de menores · 4 a 6 años: del 1 al 15 · 7 a 9 años: del 1 al 30<br>
    Resúmenes en nuestras palabras; los versículos van con la versión que usa la matutina.</div>`;
  h += `<h2>Tabla de héroes y villanos</h2>` +
    `<table class="info-table"><thead><tr><th>Día</th><th>Título</th><th>Quién es</th><th>Versículo</th></tr></thead><tbody>` +
    MAT.DIAS.map(x => `<tr><td class="key">${MAT.MES[x.d]}</td><td>${x.t}</td><td>${x.q}</td><td>${x.r}</td></tr>`).join('') +
    `</tbody></table>`;
  for (const x of MAT.DIAS) {
    const extra = x.d === 31 ? ' — fuera del examen, complementa el día 30' : '';
    h += `<div class="gcap"><div class="gtit">${MAT.MES[x.d]} de octubre — ${x.t}</div>
      <div class="gsub">${x.q}${extra}</div>
      <h3>📖 El versículo del día</h3><div class="verse-box">${x.v} (${x.r})</div>
      <h3>📚 Qué pasa</h3><p style="font-size:9.8pt;line-height:1.6">${x.h}</p>
      <h3>🎯 La lección</h3><div class="warn-box">${x.l}</div></div>`;
  }
  h += `<div class="pie">Generada desde fuente/matutina.js</div>`;
  return pagina('Guía de la matutina — octubre', h);
}

const gm = generaExamen('gm', 60, 25, 15, 20260822,
  'Guías Mayores', 'Daniel 1–6 · Profetas y Reyes caps. 39–44');
const av = generaExamen('av', 9, 4, 2, 20260823,
  'Aventureros 7 a 9 años', 'Daniel 1, 2, 3 y 6 · Profetas y Reyes caps. 39, 41 y 44');
const me = generaExamen('me', 8, 2, 0, 20260824,
  'Menores 4 a 6 años', 'Daniel 1, 2, 3 y 6');
const pa = generaExamen('pa', 15, 6, 4, 20260825,
  'Padres y consejeros', 'Daniel 1, 2, 3 y 6 · Profetas y Reyes caps. 39, 41 y 44');
/* Devoción Matutina: sin sección de completar, como la practica la app. */
const dm1 = generaExamen('dm1', 8, 4, 0, 20260826,
  'Matutina 4 a 6 años', 'Del 1 al 15 de octubre');
const dm2 = generaExamen('dm2', 14, 6, 0, 20260827,
  'Matutina 7 a 9 años', 'Del 1 al 30 de octubre');

const SALIDAS = {
  'Examen_GuiasMayores_100.html': gm.examen,
  'Examen_GuiasMayores_100_Clave.html': gm.clave,
  'Examen_Aventureros_15.html': av.examen,
  'Examen_Aventureros_15_Clave.html': av.clave,
  'Examen_Menores_10.html': me.examen,
  'Examen_Menores_10_Clave.html': me.clave,
  'Examen_Padres_25.html': pa.examen,
  'Examen_Padres_25_Clave.html': pa.clave,
  'Examen_Matutina_4a6.html': dm1.examen,
  'Examen_Matutina_4a6_Clave.html': dm1.clave,
  'Examen_Matutina_7a9.html': dm2.examen,
  'Examen_Matutina_7a9_Clave.html': dm2.clave,
  'Guia_Estudio_Completa.html': generaGuia(),
  'Guia_Matutina_Octubre.html': generaGuiaMatutina(),
};
for (const [nombre, html] of Object.entries(SALIDAS)) {
  fs.writeFileSync(path.join(DESTINO, nombre), html);
  console.log('✅', path.join(DESTINO, nombre));
}
console.log('Para PDF: abrir el HTML en el navegador → Imprimir → Guardar como PDF.');
