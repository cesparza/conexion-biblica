/**
 * Manifest y service worker de la app instalable.
 *
 * MECANISMO
 * El sistema operativo no distingue "app" de "pagina" por la tecnologia, sino
 * por un manifest.webmanifest que el HTML declara. Cuando existe y los iconos
 * cumplen tamano, Chrome en Android ofrece "Instalar app" y iOS habilita
 * compartir -> "Anadir a pantalla de inicio". Al abrirse desde ese icono la
 * app corre sin barra de direcciones: es el mismo navegador sin cromo.
 *
 * Que abra sin senal es una pieza aparte: el service worker se registra una
 * vez y despues se para en medio de cada peticion (evento fetch). Si responde
 * desde su cache, la app abre en modo avion.
 *
 * POR QUE LA CACHE LLEVA LA HUELLA DEL HTML
 * El nombre de la cache se calcula del index.html generado, no de un numero
 * que haya que acordarse de subir. Un olvido con numero manual deja un celular
 * contestando con un banco de preguntas viejo, y el dia del examen la huella
 * del banco no coincidiria con la del servidor. Con la huella, cada version
 * del material estrena cache y la anterior se borra al activarse.
 */

const NOMBRE = 'Conexión Bíblica — Daniel';

/** Manifest de la app instalable. background_color es --bg de estilos.css, para
 *  que la pantalla de arranque de Android no destelle en blanco. */
const manifest = () => JSON.stringify({
  name: NOMBRE,
  short_name: 'Conexión',
  description: 'Estudio y evaluación de Daniel, la Devoción Matutina y las 28 creencias.',
  lang: 'es-CO',
  dir: 'ltr',
  start_url: '/',
  scope: '/',
  display: 'standalone',
  background_color: '#F0F4F8',
  theme_color: '#1F3864',
  icons: [
    { src: '/icono-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
    { src: '/icono-mask-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    { src: '/icono-180.png', sizes: '180x180', type: 'image/png' },
  ],
}, null, 2);

/** Los archivos que se guardan al instalar. index.html NO se lista aparte: es
 *  el mismo contenido que '/' y duplicarlo son 700 KB de cache al doble. */
const ACTIVOS = ['/', '/manifest.webmanifest', '/icono-512.png', '/icono-mask-512.png', '/icono-180.png'];

const sw = huella => `/* Generado por fuente/build.js. No editar a mano: se sobrescribe. */
const CACHE='cb-${huella}';
const ACTIVOS=${JSON.stringify(ACTIVOS)};
const RED_MS=4000;

self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ACTIVOS)).then(()=>self.skipWaiting()));
});

/* Al activarse borra toda cache que no sea la de esta version. Es lo que evita
   que quede material de dos versiones conviviendo. */
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys()
    .then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
    .then(()=>self.clients.claim()));
});

/* Red primero, con caida a la cache y reloj de cuatro segundos.
   Al contrario (cache primero) abriria mas rapido pero serviria siempre la
   version anterior, y el dia del examen eso es un banco que no coincide con el
   del servidor. El reloj evita que una red mala se sienta como app colgada. */
function redPrimero(req){
  return new Promise(resolve=>{
    let listo=false;
    const deCache=()=>caches.match(req,{ignoreSearch:true}).then(r=>r||Response.error());
    const reloj=setTimeout(()=>{if(!listo){listo=true;resolve(deCache());}},RED_MS);
    fetch(req).then(res=>{
      if(res&&res.ok)caches.open(CACHE).then(c=>c.put(req,res.clone()));
      clearTimeout(reloj);
      if(!listo){listo=true;resolve(res);}
    }).catch(()=>{
      clearTimeout(reloj);
      if(!listo){listo=true;resolve(deCache());}
    });
  });
}

self.addEventListener('fetch',e=>{
  const req=e.request;
  if(req.method!=='GET')return;
  const url=new URL(req.url);
  if(url.origin!==location.origin)return;
  /* La evaluacion NUNCA se cachea: participantes, codigos y notas viven en D1,
     y una respuesta guardada aqui seria una nota vieja o el examen de otra. */
  if(url.pathname.startsWith('/api/'))return;
  e.respondWith(redPrimero(req));
});
`;

/** Etiquetas del head. El registro del service worker NO va aqui sino al final
 *  de app.js: las tres suites de prueba extraen el JS de la app con un
 *  /<script>...<\/script>/ codicioso, y un segundo bloque en el head les hace
 *  capturar el CSS y el cuerpo tambien. */
const head = `<link rel="manifest" href="/manifest.webmanifest">
<link rel="apple-touch-icon" href="/icono-180.png">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="Conexión">`;

module.exports = { NOMBRE, ACTIVOS, manifest, sw, head };
