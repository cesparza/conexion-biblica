/* Genera material impreso desde fuente/: exámenes con clave y guía de
   estudio. Escribe HTML listo para imprimir (Archivo → Imprimir → PDF)
   FUERA del repo, en Iglesia/material-daniel/generado/, porque los
   archivos con respuestas no deben llegar a la URL pública.
   Uso:  node tools/imprimir.js [carpetaDestino]                      */
const fs = require('fs');
const path = require('path');
const { CAPS, CONTENIDO } = require('../fuente/contenido.js');
const { BANCO } = require('../fuente/preguntas.js');
const { MODULOS, CONT_MODULOS } = require('../fuente/modulos.js');
const { LOGO_TL } = require('../fuente/logo.js');
const MAT = require('../fuente/matutina.js');

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

const CSS = `
@page { size: letter; margin: 18mm 16mm; }
* { box-sizing: border-box; }
body { font-family: Arial, Helvetica, sans-serif; color: #1a1a2e;
       font-size: 10.5pt; line-height: 1.45; margin: 0; }
h1 { color: #1F3864; text-align: center; font-size: 17pt; margin: 0 0 2pt; }
.sub { text-align: center; color: #2E8BC0; font-weight: bold; margin: 0 0 2pt; }
.meta { text-align: center; color: #555; font-size: 9pt; margin: 0 0 10pt; }
.linea { display: flex; gap: 14pt; margin: 8pt 0 12pt; font-size: 10pt; }
.linea span { flex: 1; border-bottom: 1px solid #999; padding-bottom: 2pt; }
h2 { color: #1F3864; font-size: 12.5pt; border-bottom: 2.5px solid #E8720C;
     padding-bottom: 3pt; margin: 16pt 0 8pt; page-break-after: avoid; }
.q { margin: 0 0 9pt; page-break-inside: avoid; }
.q b { display: block; margin-bottom: 2pt; }
.ops { margin: 0 0 0 14pt; padding: 0; list-style: none; }
.ops li { margin: 1.5pt 0; }
.vf { margin-left: 14pt; color: #333; }
.fill { margin-left: 14pt; font-style: italic; }
.fill u { text-decoration: none; border-bottom: 1.2px solid #333;
          display: inline-block; min-width: 70pt; }
.clave td, .clave th { border: 1px solid #bbb; padding: 3pt 6pt;
  font-size: 9.5pt; text-align: left; }
.clave { border-collapse: collapse; width: 100%; }
.clave th { background: #1F3864; color: #fff; }
.capref { color: #7B2D8B; font-size: 8.5pt; font-weight: normal; }
/* guía */
.gcap { page-break-before: always; }
.gcap:first-of-type { page-break-before: auto; }
.gtit { background: #1F3864; color: #fff; padding: 6pt 10pt;
        border-radius: 4pt; font-size: 13pt; font-weight: bold; }
.gsub { color: #555; font-size: 9.5pt; margin: 3pt 0 8pt; }
h3 { color: #1F3864; font-size: 11pt; border-left: 4px solid #E8720C;
     padding-left: 6pt; margin: 12pt 0 5pt; page-break-after: avoid; }
table { border-collapse: collapse; width: 100%; margin: 4pt 0; }
.info-table td, .info-table th { border: 1px solid #ccc; padding: 3.5pt 6pt;
  font-size: 9.5pt; vertical-align: top; text-align: left; }
.info-table th { background: #1F3864; color: #fff; }
.info-table td.key { font-weight: bold; color: #1F3864; }
.highlight-box { background: #eef7ee; border-left: 4px solid #1A7A1A;
  padding: 5pt 8pt; margin: 4pt 0; font-size: 9.8pt; }
.warn-box { background: #fff3e0; border-left: 4px solid #E8720C;
  padding: 5pt 8pt; margin: 4pt 0; font-size: 9.8pt; }
.verse-box { background: #e8f1fb; border-left: 4px solid #2E8BC0;
  padding: 5pt 8pt; margin: 4pt 0; font-style: italic; font-size: 9.8pt; }
ul.tight { margin: 3pt 0 3pt 14pt; padding: 0; }
ul.tight li { margin: 1.5pt 0; font-size: 9.8pt; }
.pie { text-align: center; color: #888; font-size: 8pt; margin-top: 14pt; }
.logo { display: block; margin: 0 auto 6pt; height: 34pt; }
.igl { text-align: center; color: #555; font-size: 8.5pt; margin: 0 0 8pt;
       letter-spacing: .3px; }
`;

const pagina = (titulo, cuerpo) =>
  `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8">
<title>${titulo}</title><style>${CSS}</style></head><body>${cuerpo}</body></html>`;

const capDe = id => TODOS_CAPS.find(c => c.id === id);
const refCap = id => `<span class="capref">[${capDe(id).label}]</span>`;

function htmlFill(q, conRespuestas) {
  const cuerpo = q.p.map(p => p.b
    ? (conRespuestas ? `<u style="color:#1A7A1A;font-weight:bold">&nbsp;${p.b}&nbsp;</u>`
                     : `<u>&nbsp;</u>`)
    : p.x).join('');
  return `<div class="q"><b>${q.n}. ${q.ins} ${refCap(q.cap)}</b>
    <div class="fill">${cuerpo}</div></div>`;
}

function htmlExamen(sel, conRespuestas) {
  let h = '', n = 1;
  const S = { mc: 'SECCIÓN I — Selección múltiple', tf: 'SECCIÓN II — Verdadero o Falso',
              fill: 'SECCIÓN III — Completar el versículo' };
  const inst = { mc: 'Marca con una X la letra de la respuesta correcta.',
                 tf: 'Escribe V si es verdadero o F si es falso.',
                 fill: 'Completa con la palabra exacta de la RV1995.' };
  for (const t of ['mc', 'tf', 'fill']) {
    const qs = sel.filter(q => q.t === t);
    if (!qs.length) continue;
    const d = qs[0].n, hArr = qs[qs.length - 1].n;
    h += `<h2>${S[t]} (Preguntas ${d}–${hArr})</h2>
      <p style="font-size:9.5pt;color:#555;margin:0 0 8pt">${inst[t]}</p>`;
    for (const q of qs) {
      if (t === 'mc') {
        h += `<div class="q"><b>${q.n}. ${q.q} ${refCap(q.cap)}</b><ul class="ops">` +
          q.o.map((o, i) => {
            const marca = conRespuestas && i === q.a
              ? ' style="color:#1A7A1A;font-weight:bold"' : '';
            return `<li${marca}>${'ABCD'[i]}) ${o}${conRespuestas && i === q.a ? ' ✔' : ''}</li>`;
          }).join('') + `</ul></div>`;
      } else if (t === 'tf') {
        const r = conRespuestas
          ? `<b style="color:#1A7A1A">${q.a ? 'V' : 'F'}</b> — <span style="font-size:9pt">${q.e}</span>`
          : 'V&nbsp;&nbsp;/&nbsp;&nbsp;F&nbsp;&nbsp;______';
        h += `<div class="q"><b>${q.n}. ${q.q} ${refCap(q.cap)}</b><div class="vf">${r}</div></div>`;
      } else h += htmlFill(q, conRespuestas);
    }
  }
  return h;
}

/* Nombre del evento y la línea de fuente, según la categoría. Sin esto, el
   examen de la matutina salía titulado «Conexión Bíblica» y citando la
   RV1995, que no es su fuente. */
const EVENTO = {
  me:  { t:'EXAMEN DE CONEXIÓN BÍBLICA', f:'Reina Valera 1995 (RV1995)' },
  av:  { t:'EXAMEN DE CONEXIÓN BÍBLICA', f:'Reina Valera 1995 (RV1995)' },
  pa:  { t:'EXAMEN DE CONEXIÓN BÍBLICA', f:'Reina Valera 1995 (RV1995)' },
  gm:  { t:'EXAMEN DE CONEXIÓN BÍBLICA', f:'Reina Valera 1995 (RV1995)' },
  dm1: { t:'EXAMEN DE DEVOCIÓN MATUTINA', f:'Matutina de menores «Héroes y villanos»' },
  dm2: { t:'EXAMEN DE DEVOCIÓN MATUTINA', f:'Matutina de menores «Héroes y villanos»' },
};

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
  sel.forEach((q, i) => q.n = i + 1);
  const total = sel.length;
  const ev = EVENTO[cat] || EVENTO.av;
  const cab = (conR) => `
    <img class="logo" src="${LOGO_TL}" alt="Iglesia Adventista Tierra Linda">
    <div class="igl">Iglesia Adventista del Séptimo Día · Tierra Linda</div>
    <h1>${ev.t}${conR ? ' — CLAVE DE RESPUESTAS' : ''}</h1>
    <div class="sub">${etiqueta} — examen de práctica de ${total} preguntas</div>
    <div class="meta">${ev.f} · ${alcance}</div>
    <div class="meta" style="font-size:8pt">${cat.startsWith('dm')
      ? 'El reglamento pide examen escrito de la matutina del mes. No se conoce la cantidad de preguntas: este tamaño es de práctica.'
      : 'Del examen del campamento se conoce el formato de tres secciones, no la cantidad de preguntas. Este tamaño es de práctica.'}</div>` +
    (conR ? `<div class="meta" style="color:#C0392B;font-weight:bold">
       SOLO PARA LÍDERES — no compartir con los concursantes</div>`
          : `<div class="linea"><span>Nombre:</span><span>Club:</span>
       <span style="max-width:90pt">Puntaje: ___ / ${total}</span></div>`);
  return {
    examen: pagina(`Examen ${etiqueta}`, cab(false) + htmlExamen(sel, false) +
      `<div class="pie">Conexión Bíblica · generado desde el banco verificado (fuente/preguntas.js)</div>`),
    clave: pagina(`Clave ${etiqueta}`, cab(true) + htmlExamen(sel, true)),
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
