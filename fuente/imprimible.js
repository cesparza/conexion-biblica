/* Render del examen imprimible: una sola implementación para los dos
   consumidores.

   POR QUÉ EXISTE ESTE ARCHIVO
   El HTML del examen impreso se armaba solo en tools/imprimir.js, que corre
   en Node al generar la carpeta de material. La app del navegador no podía
   imprimir sin duplicar ese render, y dos copias del mismo layout se
   desincronizan: se arregla el ancho de una raya en una y en la otra no.
   Aquí las funciones son puras (entra datos, sale texto), sin fs y sin DOM,
   así que sirven igual en Node y dentro del navegador.

   CÓMO SE CONSUME
   - Node:      require('./imprimible.js')
   - Navegador: fuente/build.js pega este archivo tal cual dentro del
                <script>, antes de app.js. El module.exports del final va
                protegido porque en el navegador no existe `module`.        */

const CSS_IMPR = `
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
.capref { color: #7B2D8B; font-size: 8.5pt; font-weight: normal;
  white-space: nowrap; }
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
.hoja { page-break-before: always; }
.hoja:first-child { page-break-before: auto; }
@media screen {
  body { max-width: 800px; margin: 0 auto; padding: 24px 20px 60px; }
  .aviso-pant { background: #1F3864; color: #fff; border-radius: 6px;
    padding: 10px 14px; font-size: 10pt; margin: 0 0 18px; text-align: center; }
}
@media print { .aviso-pant { display: none; } }
`;

/* Documento completo, autocontenido: sirve para escribirlo a disco y para
   metérselo a un iframe en el navegador. */
const paginaImpr = (titulo, cuerpo) =>
  '<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8">' +
  '<meta name="viewport" content="width=device-width, initial-scale=1.0">' +
  '<title>' + titulo + '</title><style>' + CSS_IMPR + '</style></head><body>' +
  cuerpo + '</body></html>';

/* Nombre del evento y la línea de fuente, según la categoría. Sin esto, el
   examen de la matutina salía titulado «Conexión Bíblica» y citando la
   RV1995, que no es su fuente. */
const EVENTO_IMPR = {
  me:  { t: 'EXAMEN DE CONEXIÓN BÍBLICA', f: 'Reina Valera 1995 (RV1995)' },
  av:  { t: 'EXAMEN DE CONEXIÓN BÍBLICA', f: 'Reina Valera 1995 (RV1995)' },
  pa:  { t: 'EXAMEN DE CONEXIÓN BÍBLICA', f: 'Reina Valera 1995 (RV1995)' },
  gm:  { t: 'EXAMEN DE CONEXIÓN BÍBLICA', f: 'Reina Valera 1995 (RV1995)' },
  dm1: { t: 'EXAMEN DE DEVOCIÓN MATUTINA', f: 'Matutina de menores «Héroes y villanos»' },
  dm2: { t: 'EXAMEN DE DEVOCIÓN MATUTINA', f: 'Matutina de menores «Héroes y villanos»' },
};

const SEC_IMPR = {
  mc: 'SECCIÓN I — Selección múltiple',
  tf: 'SECCIÓN II — Verdadero o Falso',
  fill: 'SECCIÓN III — Completar el versículo',
};
const INST_IMPR = {
  mc: 'Marca con una X la letra de la respuesta correcta.',
  tf: 'Escribe V si es verdadero o F si es falso.',
  fill: 'Completa con la palabra exacta de la RV1995.',
};

/* Ordena por sección y numera de 1 a n. Los dos consumidores entregan el
   arreglo ya mezclado; la numeración se hace aquí para que el impreso y la
   clave siempre coincidan número por número. */
function ordenaYNumera(sel) {
  const ord = [];
  for (const t of ['mc', 'tf', 'fill'])
    for (const q of sel) if (q.t === t) ord.push({ ...q });
  ord.forEach((q, i) => { q.n = i + 1; });
  return ord;
}

function htmlFillImpr(q, conR, refCap) {
  const cuerpo = q.p.map(p => p.b
    ? (conR ? '<u style="color:#1A7A1A;font-weight:bold">&nbsp;' + p.b + '&nbsp;</u>'
            : '<u>&nbsp;</u>')
    : p.x).join('');
  return '<div class="q"><b>' + q.n + '. ' + q.ins + ' ' + refCap(q.cap) + '</b>' +
    '<div class="fill">' + cuerpo + '</div></div>';
}

/* Las tres secciones. `conR` decide si se marca la correcta: es el único
   interruptor entre el examen del alumno y la clave del líder. */
function htmlExamenImpr(sel, conR, caps) {
  const capDe = id => caps.find(c => c.id === id);
  const refCap = id => {
    const c = capDe(id);
    return c ? '<span class="capref">[' + c.label + ']</span>' : '';
  };
  let h = '';
  for (const t of ['mc', 'tf', 'fill']) {
    const qs = sel.filter(q => q.t === t);
    if (!qs.length) continue;
    h += '<h2>' + SEC_IMPR[t] + ' (Preguntas ' + qs[0].n + '–' +
      qs[qs.length - 1].n + ')</h2>' +
      '<p style="font-size:9.5pt;color:#555;margin:0 0 8pt">' + INST_IMPR[t] + '</p>';
    for (const q of qs) {
      if (t === 'mc') {
        h += '<div class="q"><b>' + q.n + '. ' + q.q + ' ' + refCap(q.cap) +
          '</b><ul class="ops">' + q.o.map((o, i) => {
            const ok = conR && i === q.a;
            return '<li' + (ok ? ' style="color:#1A7A1A;font-weight:bold"' : '') + '>' +
              'ABCD'[i] + ') ' + o + (ok ? ' ✔' : '') + '</li>';
          }).join('') + '</ul></div>';
      } else if (t === 'tf') {
        const r = conR
          ? '<b style="color:#1A7A1A">' + (q.a ? 'V' : 'F') +
            '</b> — <span style="font-size:9pt">' + (q.e || '') + '</span>'
          : 'V&nbsp;&nbsp;/&nbsp;&nbsp;F&nbsp;&nbsp;______';
        h += '<div class="q"><b>' + q.n + '. ' + q.q + ' ' + refCap(q.cap) +
          '</b><div class="vf">' + r + '</div></div>';
      } else h += htmlFillImpr(q, conR, refCap);
    }
  }
  return h;
}

/* Una hoja de examen: encabezado + secciones. Devuelve solo el cuerpo, para
   poder pegar varias hojas en un mismo documento. */
function hojaExamen(o) {
  const sel = ordenaYNumera(o.sel);
  const total = sel.length;
  const ev = EVENTO_IMPR[o.cat] || EVENTO_IMPR.av;
  const conR = !!o.conR;
  const nota = String(o.cat).slice(0, 2) === 'dm'
    ? 'El reglamento pide examen escrito de la matutina del mes. No se conoce la cantidad de preguntas: este tamaño es de práctica.'
    : 'Del examen del campamento se conoce el formato de tres secciones, no la cantidad de preguntas. Este tamaño es de práctica.';
  return '<div class="hoja">' +
    (o.logo ? '<img class="logo" src="' + o.logo + '" alt="Iglesia Adventista Tierra Linda">' : '') +
    '<div class="igl">Iglesia Adventista del Séptimo Día · Tierra Linda</div>' +
    '<h1>' + ev.t + (conR ? ' — CLAVE DE RESPUESTAS' : '') + '</h1>' +
    '<div class="sub">' + o.etiqueta + ' — examen de práctica de ' + total + ' preguntas</div>' +
    '<div class="meta">' + ev.f + ' · ' + o.alcance + '</div>' +
    '<div class="meta" style="font-size:8pt">' + nota + '</div>' +
    (conR
      ? '<div class="meta" style="color:#C0392B;font-weight:bold">SOLO PARA LÍDERES — no compartir con los concursantes</div>'
      : '<div class="linea"><span>Nombre:</span><span>Club:</span>' +
        '<span style="max-width:90pt">Puntaje: ___ / ' + total + '</span></div>') +
    htmlExamenImpr(sel, conR, o.caps) +
    (conR ? '' : '<div class="pie">Generado desde el banco verificado de la app</div>') +
    '</div>';
}

/* Documento imprimible con una o varias hojas. `aviso` sale solo en
   pantalla: le dice al usuario qué hacer si el diálogo de impresión no
   apareció solo. */
function docExamen(hojas, titulo, aviso) {
  const av = aviso ? '<div class="aviso-pant">' + aviso + '</div>' : '';
  return paginaImpr(titulo, av + hojas.join(''));
}

if (typeof module !== 'undefined' && module.exports) module.exports = {
  CSS_IMPR, paginaImpr, EVENTO_IMPR, ordenaYNumera, htmlExamenImpr,
  hojaExamen, docExamen,
};
