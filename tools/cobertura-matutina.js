/* Cobertura de la matutina contra el PDF original.

   QUÉ HACE Y POR QUÉ
   Nuestro material de la matutina es un resumen: la lectura de cada día del
   PDF trae unos 1.370 caracteres y nuestro resumen unos 390. Un resumen
   pierde datos, y el examen pregunta datos. Este script no compara textos:
   saca del PDF los nombres propios y los números (que es lo que se puede
   preguntar) y revisa que cada uno aparezca en algún lado de nuestro
   material del mismo día: título, versículo, historia, lección, preguntas o
   tarjetas.

   El texto del PDF NO va en el repo (es material con derechos). Se pasa la
   carpeta con el OCR por parámetro; los archivos se llaman p-01.txt … p-31.txt.
   Uso:  node tools/cobertura-matutina.js /ruta/al/ocr                     */
const fs = require('fs');
const path = require('path');
const M = require('../fuente/matutina.js');

const DIR = process.argv[2];
if (!DIR || !fs.existsSync(DIR)) {
  console.log('Falta la carpeta con el OCR del PDF (p-01.txt … p-31.txt).');
  process.exit(0);
}

const norm = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

/* Palabras que no son datos: artículos, verbos que abren un diálogo, y la
   marca de agua del escáner. Sin esta lista el reporte da 80 falsos. */
const COMUNES = new Set(('de la el los las un una y en que con por para su sus al lo le les ' +
  'se no si es era son fue eran ha han habia hay como cuando donde porque pero mas ya todo ' +
  'toda todos todas este esta esto esos esas ese esa muy tan sin sobre entre desde hasta ' +
  'tras ante bajo cada otro otra dios jesus senor senora cristo dijo dice dia dias ano anos ' +
  'noche manana tarde vez veces gente casa vida hombre mujer nino nina padre madre hijo hija ' +
  'amigo amiga cielo tierra corazon palabra biblia iglesia sabado domingo lunes martes ' +
  'miercoles jueves viernes octubre heroe heroina villano villana').split(' '));
const RUIDO = new Set(('scanned camscanner accamsscanner cam nm ha you eso listo ves ahora ' +
  'viste hola permiteme quieres entiendo sera claro alli ven crees sabes bueno supe conoces ' +
  'respondio pensar venga joven pues colaboras estas aceptas tal hacen quiero bang pum sha ' +
  'babes').split(' '));
/* Basura del escáner que el OCR deja como número: el folio de la página
   (281, 283), la letra capital suelta (24) y el «2.ª parte» del título, que
   sale leído como «21». */
const RUIDO_NUM = new Set(['281', '283', '21', '24', '30']);

let total = 0, sinCubrir = 0;
for (const x of M.DIAS) {
  const f = path.join(DIR, 'p-' + String(x.d).padStart(2, '0') + '.txt');
  if (!fs.existsSync(f)) continue;
  const raw = fs.readFileSync(f, 'utf8');
  const mio = norm([x.t, x.q, x.v, x.r, x.h, x.l,
    ...M.MAT_BANCO.filter(q => q.cap === M.idDia(x.d)).map(q => JSON.stringify(q)),
    ...M.MAT_TARJETAS.filter(t => t.cap === M.idDia(x.d)).map(t => t.f + ' ' + t.d)].join(' '));
  const cand = new Set();
  /* Nombre propio: mayúscula inicial que no viene después de un punto. */
  for (const m of raw.matchAll(/(?<![.!?¿¡]\s|^)\b([A-ZÁÉÍÓÚÑ][a-záéíóúñ]{2,})/gm)) cand.add(m[1]);
  for (const m of raw.matchAll(/\b\d{2,4}\b/g)) cand.add(m[0]);
  const falta = [...cand].filter(c => {
    const n = norm(c);
    return !COMUNES.has(n) && !RUIDO.has(n) && !RUIDO_NUM.has(n) && !mio.includes(n);
  });
  total += cand.size;
  sinCubrir += falta.length;
  if (falta.length) console.log('Día ' + x.d + ' — sin cubrir: ' + falta.join(', '));
}
console.log('\nDatos revisados: ' + total);
console.log(sinCubrir === 0
  ? '✅ Todos los nombres y números del PDF están en nuestro material.'
  : '⚠️  ' + sinCubrir + ' dato(s) del PDF no aparecen en nuestro material.');
