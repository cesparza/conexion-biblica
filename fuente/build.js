const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// index.html se escribe en la raíz del repo, un nivel arriba de fuente/
const SALIDA = path.join(__dirname, '..', 'index.html');
const { CAPS, CONTENIDO } = require('./contenido.js');
const { BANCO } = require('./preguntas.js');
const { MODULOS, CONT_MODULOS } = require('./modulos.js');
const { TARJETAS } = require('./tarjetas.js');
const { LOGO_TL } = require('./logo.js');
const { nivelDe } = require('./niveles.js');
const { MANUAL } = require('./manual.js');
const MAT = require('./matutina.js');
const CR = require('./creencias.js');
const { VERS } = require('./biblia.js');
const PWA = require('./pwa.js');

/* Dos eventos, un solo archivo: al material de Daniel se le suma el de la
   Devoción Matutina. Cada capítulo lleva sus categorías, así que el filtrado
   por categoría separa solo lo que corresponde. */
const CAPS_ALL = [...CAPS, ...MAT.MAT_CAPS, ...CR.CR_CAPS];
const CONTENIDO_ALL = { ...CONTENIDO, ...MAT.MAT_CONTENIDO, ...CR.CR_CONTENIDO };
const BANCO_ALL = [...BANCO, ...MAT.MAT_BANCO, ...CR.CR_BANCO];
const TARJETAS_ALL = [...TARJETAS, ...MAT.MAT_TARJETAS, ...CR.CR_TARJETAS];
const MODULOS_ALL = [...MODULOS, ...MAT.MAT_MODULOS];
const CONT_MODULOS_ALL = { ...CONT_MODULOS, ...MAT.MAT_CONT_MODULOS };

/* Cada pregunta sale al HTML con su nivel ya calculado (fuente/niveles.js).
   La app solo lee q.nv: la regla vive en un archivo y no se duplica. */
const BANCO_NV = BANCO_ALL.map(q => ({ ...q, nv: nivelDe(q) }));

/* La app se escribe en archivos reales (estilos.css, cuerpo.html, app.js) y
   este script solo los ensambla con los datos. Antes todo vivía dentro de un
   template string: no había chequeo de sintaxis y cada comilla de un onclick
   había que escaparla dos veces. */
const leer = f => fs.readFileSync(path.join(__dirname, f), 'utf8').replace(/\n+$/, '');
const CSS    = leer('estilos.css');
const CUERPO = leer('cuerpo.html');
const IMPR   = leer('imprimible.js');
const APP    = leer('app.js');

/* Se serializa con indentación para que ninguna línea pase de 2.000
   caracteres: con una sola línea, ningún visor de diff abre el archivo. */
const DATA = `const CAPS = ${JSON.stringify(CAPS_ALL, null, 1)};

const CONTENIDO = ${JSON.stringify(CONTENIDO_ALL, null, 1)};

const BANCO = ${JSON.stringify(BANCO_NV, null, 1)};

const MODULOS = ${JSON.stringify(MODULOS_ALL, null, 1)};

const CONT_MODULOS = ${JSON.stringify(CONT_MODULOS_ALL, null, 1)};

const TARJETAS = ${JSON.stringify(TARJETAS_ALL, null, 1)};

const MANUAL = ${JSON.stringify(MANUAL, null, 1)};

/* Daniel 1-6 en RV1995, para la seccion «Leer el capitulo» y las referencias
   tocables. Va con indentacion 1 para que ninguna linea del index.html pase
   de 2.000 caracteres: en una sola linea, ningun visor de diff abre el
   archivo y el hook del repo bloquea el commit. */
const VERS = ${JSON.stringify(VERS, null, 1)};

/* El logo va partido en trozos: como data URI de una sola línea pasaría de
   2.000 caracteres y el hook del repo bloquearía el commit. */
const LOGO_TL = [
${(LOGO_TL.match(/.{1,1400}/g) || []).map(t => ' ' + JSON.stringify(t)).join(',\n')}
].join('');`;

const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Conexión Bíblica — Daniel</title>
<!-- Favicon en linea: sin archivo aparte, el HTML sigue siendo autonomo y
     abre con doble clic. El azul y el naranja son los de la marca. -->
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' rx='14' fill='%231F3864'/><path d='M11 19c6.5-3.2 13-3.2 19.5 0v27c-6.5-3.2-13-3.2-19.5 0z' fill='%23fff'/><path d='M33.5 19c6.5-3.2 13-3.2 19.5 0v27c-6.5-3.2-13-3.2-19.5 0z' fill='%23fff' opacity='.85'/><path d='M32 17.5v31' stroke='%23E8720C' stroke-width='3.4' stroke-linecap='round'/></svg>">
<meta name="theme-color" content="#1F3864">
${PWA.head}
<style>
${CSS}
</style>
</head>
<body>
${CUERPO}
<script>
${DATA}
${IMPR}
${APP}
</script>
</body>
</html>`;

fs.writeFileSync(SALIDA, html);

/* El manifest y el service worker se escriben junto al index.html porque el
   navegador exige archivos propios del mismo origen: el service worker saca su
   alcance de su ruta, y iOS no acepta el manifest como data URI. El index.html
   sigue abriendo con doble clic: en file:// el registro no se intenta. */
const RAIZ = f => path.join(__dirname, '..', f);
const huella = crypto.createHash('sha1').update(html).digest('hex').slice(0, 12);
fs.writeFileSync(RAIZ('manifest.webmanifest'), PWA.manifest());
fs.writeFileSync(RAIZ('sw.js'), PWA.sw(huella));

console.log('✅ index.html regenerado —', html.length, 'bytes');
console.log('✅ manifest.webmanifest y sw.js — cache cb-' + huella);
