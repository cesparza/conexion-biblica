const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// index.html se escribe en la raíz del repo, un nivel arriba de fuente/
const SALIDA = path.join(__dirname, '..', 'index.html');
const { CAPS, CONTENIDO } = require('./contenido.js');
const { BANCO } = require('./preguntas.js');
const { BANCO_COBERTURA } = require('./preguntas-cobertura.js');
const { MODULOS, CONT_MODULOS } = require('./modulos.js');
const { TARJETAS } = require('./tarjetas.js');
const { LOGO_TL } = require('./logo.js');
const { nivelDe } = require('./niveles.js');
const { MANUAL } = require('./manual.js');
const MAT = require('./matutina.js');
const { MAT_COMPLETAR } = require('./matutina-completar.js');
const CR = require('./creencias.js');
const { GRUPOS, grupoDaniel } = require('./grupos.js');
const { VERS } = require('./biblia.js');
const { NOMBRES_OTROS, OTRAS_VERS, OTRAS_META } = require('./biblia-otros.js');
const PWA = require('./pwa.js');

/* Dos eventos, un solo archivo: al material de Daniel se le suma el de la
   Devoción Matutina. Cada capítulo lleva sus categorías, así que el filtrado
   por categoría separa solo lo que corresponde. */
/* Los capitulos de Daniel declaran su grupo aqui y no en contenido.js: el
   grupo se deduce del id (fuente/grupos.js), asi que escribirlo a mano en 18
   lineas seria copiar el dato a un segundo lugar. */
const CAPS_DANIEL = CAPS.map(c => ({ ...c, doc: grupoDaniel(c.id) || undefined }));
const CAPS_ALL = [...CAPS_DANIEL, ...MAT.MAT_CAPS, ...CR.CR_CAPS];
const CONTENIDO_ALL = { ...CONTENIDO, ...MAT.MAT_CONTENIDO, ...CR.CR_CONTENIDO };
/* Las de cobertura van con las demas: son del mismo banco, solo que las
   escribio un generador a partir de los versiculos que no tenian ninguna. */
const BANCO_ALL = [...BANCO, ...BANCO_COBERTURA, ...MAT.MAT_BANCO, ...MAT_COMPLETAR, ...CR.CR_BANCO];
const TARJETAS_ALL = [...TARJETAS, ...MAT.MAT_TARJETAS, ...CR.CR_TARJETAS];
const MODULOS_ALL = [...MODULOS, ...MAT.MAT_MODULOS, ...CR.CR_MODULOS];
const CONT_MODULOS_ALL = { ...CONT_MODULOS, ...MAT.MAT_CONT_MODULOS, ...CR.CR_CONT_MODULOS };

/* ───────────── LA PESTANA «COMPRUEBALO», DERIVADA DE LAS TARJETAS ─────────────
   MECANISMO
   Leer una explicacion y sentir que se entendio es distinto de poder
   responderla. Lo que fija es PRODUCIR la respuesta, no reconocerla. Esta
   pestana cierra cada capitulo con preguntas cuya respuesta esta tapada.

   POR QUE SE DERIVA Y NO SE ESCRIBE
   Una tarjeta ya es exactamente eso: frente = pregunta, reverso = respuesta.
   Hay 360 escritas. Volverlas a escribir a mano seria copiar el dato a un
   segundo lugar, y las dos copias se desincronizarian en la primera
   correccion. Asi, cuando crecen las tarjetas crece el repaso, solo.

   Se toman cinco repartidas a lo largo del capitulo (no las cinco primeras),
   para que el repaso cubra el capitulo entero y no su arranque. */
const COMPRUEBA = 5;
function pestanaComprueba(capId) {
  /* Primero las tarjetas, que ya son pregunta y respuesta. Si el capitulo trae
     pocas (la matutina trae dos por dia), se completa con sus propias preguntas
     del banco: una de seleccion se lee como pregunta y su opcion correcta es la
     respuesta; una de verdadero o falso trae ademas su explicacion. Asi ningun
     capitulo se queda sin repaso por tener el mazo corto. */
  const deTarjetas = TARJETAS_ALL.filter(t => t.cap === capId)
    .map(t => ({ f: t.f, r: t.r }));
  const delBanco = BANCO_ALL.filter(q => q.cap === capId)
    .filter(q => q.t === 'mc' || q.t === 'tf')
    .map(q => q.t === 'mc'
      ? { f: q.q, r: q.o[q.a] }
      : { f: q.q, r: (q.a ? 'Verdadero' : 'Falso') + (q.e ? ' — ' + q.e : '') });
  const mias = deTarjetas.length >= 3 ? deTarjetas : deTarjetas.concat(delBanco);
  if (mias.length < 3) return null;
  const paso = Math.max(1, Math.floor(mias.length / COMPRUEBA));
  const sel = [];
  for (let i = 0; i < mias.length && sel.length < COMPRUEBA; i += paso) sel.push(mias[i]);
  const bloques = sel.map(t =>
    '<div class="rev"><button type="button" class="rev-q" onclick="revela(this)">' +
    '<span class="rev-t">' + t.f + '</span><span class="rev-p">tocar para ver</span></button>' +
    '<div class="rev-a" hidden>' + t.r + '</div></div>').join('');
  const cabeza =
    '<div class="highlight-box"><strong>Antes de pasar al siguiente</strong><br>' +
    'Responde en voz alta y después comprueba. Si fallas una, está en ' +
    '<strong>Practicar</strong> para repetirla.</div>';
  /* Si los cinco bloques juntos pasan de 2.000 caracteres, la pestana se parte
     en dos. El hook del repositorio bloquea lineas mas largas, y con razon:
     ningun visor de diff abre el archivo. */
  const TOPE = 1800;
  if ((cabeza + bloques).length <= TOPE) return [{ t: '✅ Compruébalo', h: cabeza + bloques }];
  const mitad = Math.ceil(sel.length / 2);
  const corte = bloques.indexOf('<div class="rev">', bloques.indexOf('<div class="rev">') * 0 + 1);
  const trozo = n => sel.slice(n === 1 ? 0 : mitad, n === 1 ? mitad : sel.length).map(t =>
    '<div class="rev"><button type="button" class="rev-q" onclick="revela(this)">' +
    '<span class="rev-t">' + t.f + '</span><span class="rev-p">tocar para ver</span></button>' +
    '<div class="rev-a" hidden>' + t.r + '</div></div>').join('');
  return [{ t: '✅ Compruébalo', h: cabeza + trozo(1) },
          { t: '✅ Y estas', h: trozo(2) }];
}
for (const c of CAPS_ALL) {
  const extra = pestanaComprueba(c.id);
  if (extra && CONTENIDO_ALL[c.id]) CONTENIDO_ALL[c.id] = [...CONTENIDO_ALL[c.id], ...extra];
}

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
/* La huella se calcula sobre el html, asi que no puede ir dentro del html
   antes de existir. Se deja un marcador del MISMO largo que la huella (12
   caracteres) y se sustituye despues: el hash se calcula con el marcador
   puesto, y reemplazar 12 caracteres por otros 12 no cambia nada mas. */
const MARCA_V = 'HUELLAxxxxxx';

const DATA = `const VERSION_APP = '${MARCA_V}';

const CAPS = ${JSON.stringify(CAPS_ALL, null, 1)};

const CONTENIDO = ${JSON.stringify(CONTENIDO_ALL, null, 1)};

const BANCO = ${JSON.stringify(BANCO_NV, null, 1)};

const MODULOS = ${JSON.stringify(MODULOS_ALL, null, 1)};

/* GRUPOS: la dimension de arriba de cada actividad. Hoy la unica que la
   declara es «En esto creemos», con sus seis doctrinas, y por eso el
   contenido sale de CR.DOCTRINAS. Un capitulo pertenece a un grupo por su
   campo doc.

   Se llama GRUPOS y no DOCTRINAS a proposito: el juego de clasificar no
   sabe nada de doctrinas, sabe agrupar. El dia que Daniel declare los
   suyos (los reyes, por ejemplo) se agregan aqui con otros ids y el juego
   se enciende para Daniel sin tocar una linea de la app. */
const GRUPOS = ${JSON.stringify(GRUPOS, null, 1)};

const CONT_MODULOS = ${JSON.stringify(CONT_MODULOS_ALL, null, 1)};

const TARJETAS = ${JSON.stringify(TARJETAS_ALL, null, 1)};

const MANUAL = ${JSON.stringify(MANUAL, null, 1)};

/* Daniel 1-6 en RV1995, para la seccion «Leer el capitulo» y las referencias
   tocables. Va con indentacion 1 para que ninguna linea del index.html pase
   de 2.000 caracteres: en una sola linea, ningun visor de diff abre el
   archivo y el hook del repo bloquea el commit. */
const VERS = ${JSON.stringify(VERS, null, 1)};

/* Citas a libros distintos de Daniel (RV1909, dominio publico), para las
   mismas referencias tocables. Ver fuente/biblia-otros.js. */
const NOMBRES_OTROS = ${JSON.stringify(NOMBRES_OTROS, null, 1)};
const OTRAS_VERS = ${JSON.stringify(OTRAS_VERS, null, 1)};
const OTRAS_META = ${JSON.stringify(OTRAS_META, null, 1)};

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

const huellaHtml = crypto.createHash('sha1').update(html).digest('hex').slice(0, 12);
const htmlFinal = html.replace(MARCA_V, huellaHtml);
fs.writeFileSync(SALIDA, htmlFinal);

/* El manifest y el service worker se escriben junto al index.html porque el
   navegador exige archivos propios del mismo origen: el service worker saca su
   alcance de su ruta, y iOS no acepta el manifest como data URI. El index.html
   sigue abriendo con doble clic: en file:// el registro no se intenta. */
const RAIZ = f => path.join(__dirname, '..', f);
const huella = huellaHtml;
fs.writeFileSync(RAIZ('manifest.webmanifest'), PWA.manifest());
fs.writeFileSync(RAIZ('sw.js'), PWA.sw(huella));
/* La misma huella que nombra la cache va en version.json y dentro del HTML.
   La app compara las dos: si difieren, lo que esta abierto es viejo. */
fs.writeFileSync(RAIZ('version.json'), PWA.version(huella, new Date().toISOString().slice(0,10)));

console.log('✅ index.html regenerado —', htmlFinal.length, 'bytes');
console.log('✅ manifest.webmanifest, sw.js y version.json — version ' + huella);
