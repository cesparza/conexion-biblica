const fs = require('fs');
const path = require('path');

// index.html se escribe en la raíz del repo, un nivel arriba de fuente/
const SALIDA = path.join(__dirname, '..', 'index.html');
const { CAPS, CONTENIDO } = require('./contenido.js');
const { BANCO } = require('./preguntas.js');
const { MODULOS, CONT_MODULOS } = require('./modulos.js');
const { TARJETAS } = require('./tarjetas.js');
const { LOGO_TL } = require('./logo.js');
const { nivelDe } = require('./niveles.js');

/* Cada pregunta sale al HTML con su nivel ya calculado (fuente/niveles.js).
   La app solo lee q.nv: la regla vive en un archivo y no se duplica. */
const BANCO_NV = BANCO.map(q => ({ ...q, nv: nivelDe(q) }));

/* La app se escribe en archivos reales (estilos.css, cuerpo.html, app.js) y
   este script solo los ensambla con los datos. Antes todo vivía dentro de un
   template string: no había chequeo de sintaxis y cada comilla de un onclick
   había que escaparla dos veces. */
const leer = f => fs.readFileSync(path.join(__dirname, f), 'utf8').replace(/\n+$/, '');
const CSS    = leer('estilos.css');
const CUERPO = leer('cuerpo.html');
const APP    = leer('app.js');

/* Se serializa con indentación para que ninguna línea pase de 2.000
   caracteres: con una sola línea, ningún visor de diff abre el archivo. */
const DATA = `const CAPS = ${JSON.stringify(CAPS, null, 1)};

const CONTENIDO = ${JSON.stringify(CONTENIDO, null, 1)};

const BANCO = ${JSON.stringify(BANCO_NV, null, 1)};

const MODULOS = ${JSON.stringify(MODULOS, null, 1)};

const CONT_MODULOS = ${JSON.stringify(CONT_MODULOS, null, 1)};

const TARJETAS = ${JSON.stringify(TARJETAS, null, 1)};

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
<style>
${CSS}
</style>
</head>
<body>
${CUERPO}
<script>
${DATA}
${APP}
</script>
</body>
</html>`;

fs.writeFileSync(SALIDA, html);
console.log('✅ index.html regenerado —', html.length, 'bytes');
