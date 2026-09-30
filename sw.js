/* Generado por fuente/build.js. No editar a mano: se sobrescribe. */
const CACHE='cb-55fa03674bd0';
const HUELLA='55fa03674bd0';
const ACTIVOS=["/","/manifest.webmanifest","/icono-512.png","/icono-mask-512.png","/icono-180.png"];
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

/* v139: ABRIR SIN BAJAR LO QUE YA ESTÁ.
   Red primero bajaba el HTML completo (unos 519 KB) en cada apertura con
   señal, aunque no hubiera cambiado: el HTML no trae ETag en pages.dev, así
   que el navegador no puede preguntar «¿cambió?». Aquí se pregunta de otra
   forma: version.json (unos 50 bytes) dice la huella publicada, y esta cache
   se llama con la huella de SU versión. Si coinciden, lo guardado ES lo
   publicado y se sirve sin bajar nada. Si no, red primero como siempre; y sin
   señal o con red lenta, la cache, igual que antes. Nunca se sirve una
   versión vieja sabiendo que hay una nueva: eso es lo que protegía red
   primero el día del examen. */
function htmlVigente(req){
  return new Promise(resolve=>{
    let listo=false;
    const fin=r=>{if(!listo){listo=true;resolve(r);}};
    const reloj=setTimeout(()=>fin(redPrimero(req)),RED_MS);
    fetch('/version.json',{cache:'no-store'}).then(r=>r.json()).then(j=>{
      if(j&&j.v===HUELLA)return caches.match('/').then(c=>{clearTimeout(reloj);fin(c||redPrimero(req));});
      clearTimeout(reloj);fin(redPrimero(req));
    }).catch(()=>{clearTimeout(reloj);fin(redPrimero(req));});
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
  /* version.json tampoco: es justo el archivo con el que se pregunta si hay
     algo nuevo, y servirlo de la cache haria que la respuesta fuera siempre
     «no hay nada nuevo». */
  if(url.pathname==='/version.json')return;
  if(req.mode==='navigate'||url.pathname==='/'||url.pathname==='/index.html'){
    e.respondWith(htmlVigente(req));return;
  }
  e.respondWith(redPrimero(req));
});
