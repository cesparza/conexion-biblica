/* Los mismos bloques de HTML que usa fuente/contenido.js para Daniel, para que
   el estudio de Apocalipsis se vea igual. */
const tbl = (head, rows) =>
  `<div class="tabla-scroll"><table class="info-table"><thead><tr>${head.map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>` +
  rows.map(r=>`<tr>${r.map((c,i)=>`<td${i===0?' class="key"':''}>${c}</td>`).join('')}</tr>`).join('') +
  `</tbody></table></div>`;
const hi = t => `<div class="highlight-box">${t}</div>`;
const wa = t => `<div class="warn-box">${t}</div>`;
const li = arr => `<ul class="tight">${arr.map(x=>`<li>${x}</li>`).join('')}</ul>`;
module.exports = { tbl, hi, wa, li };
