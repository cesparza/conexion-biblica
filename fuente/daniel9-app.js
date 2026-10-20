/* La cronología conserva el contrato de las otras láminas: abrir, recorrer,
   presentar, compartir el paso y cerrar. No añade almacenamiento ni red. */
let d9Respuesta=-1,d9Referencia=null;
let d9Tab='explica',d9Vista='semanas',d9Verso=24,d9Foco=null,d9Cambio=0;
const lamEsC=()=>!!(LAM()&&LAM().tipo==='cronologia');
const d9Hitos=()=>LAM().hitos;
const d9Refs=t=>refsTocables(esc(t),'d9');
const d9Hito=()=>d9Hitos()[lamPaso];
/* Coordenada histórica sin año cero. */
function d9Anos(de,a){return a-de-(de<0&&a>0?1:0);}
function d9Suma(de,n){const a=de+n;return de<0&&a>=0?a+1:a;}
function d9Escalas(){return {
 semanas:{titulo:'Las 70 semanas',total:490,inicio:0,
  bandas:[[49,'7 sem.','restauracion'],[434,'62 semanas','mesias'],[7,'1 semana','pacto']],
  puntos:[['457 a.C.','El decreto','decreto'],['408 a.C.','49 años','restauracion'],['27 d.C.','El Ungido','mesias'],['34 d.C.','490 años','mision']],
  nota:'Proporción real: 49 + 434 + 7 = 490 años. Toca un tramo para explorarlo.'},
 ultima:{titulo:'La última semana',total:7,inicio:483,
  bandas:[[3.5,'3½ años','cruz'],[3.5,'3½ años','mision']],
  puntos:[['Otoño · 27','Bautismo','mesias'],['Primavera · 31','La cruz','cruz'],['34 d.C.','Testimonio','mision']],
  nota:'Ampliación de los últimos 7 años: la cruz está en el centro, sin un intervalo entre las semanas 69 y 70.'},
 conexion:{titulo:'La conexión con Daniel 8',total:2300,inicio:0,
  bandas:[[490,'490 años','mision'],[1810,'1.810 años','santuario']],
  puntos:[['457 a.C.','Inicio común','decreto'],['34 d.C.','Fin de las 70','mision'],['1844','2.300 años','santuario']],
  nota:'Lectura adventista: las 70 semanas son la primera parte de los 2.300 años. 1844 se refiere al santuario celestial, no a la segunda venida.'}
};}
function d9Abre(cid,modo){
 const el=document.getElementById('lam');if(!el)return;
 if(!lamModo){const r=el.getRootNode?el.getRootNode():document;d9Foco=r.activeElement;}
 lamPara();if(lamModo&&lamEsE())lamLimpia();lamId=cid;lamModo=modo==='presentar'?'presentar':'explorar';lamPaso=0;lamDonde='oracion';
 d9Respuesta=-1;d9Tab='explica';d9Vista='semanas';d9Verso=24;d9Cambio++;
 el.hidden=false;el.className='lam d9'+(lamModo==='presentar'?' d9-pres':'');
 el.setAttribute('role','dialog');el.setAttribute('aria-modal','true');el.setAttribute('aria-label',LAM().titulo);
 document.body.classList.add('leyendo');
 el.innerHTML='<div class="d9-wrap">'+
  '<header class="d9-header"><div><span class="d9-kicker">Daniel 9 · experiencia interactiva</span><b>Las setenta semanas</b></div>'+
  '<div class="d9-tools"><button type="button" onclick="d9Modo()" id="d9Modo">'+(lamModo==='presentar'?'Estudiar':'Presentar')+'</button>'+
  '<button type="button" class="d9-full" onclick="d9Pantalla()" aria-label="Pantalla completa">'+IC('expandir')+'</button>'+
  '<button type="button" onclick="d9Comparte()" aria-label="Copiar enlace de este paso">'+IC('compartir')+'<span class="d9-tool-label"> Compartir</span></button>'+
  '<button type="button" onclick="lamCierra()" class="d9-close" aria-label="Cerrar experiencia">'+IC('x')+'</button></div></header>'+
  '<div class="d9-story" id="d9Story"></div><section class="d9-time" aria-label="Línea de tiempo" id="d9Time"></section>'+
  '<nav class="d9-nav" aria-label="Recorrer la explicación"><button type="button" id="d9Prev" onclick="d9Mueve(-1)" aria-label="Paso anterior">'+IC('izq')+'<span>Anterior</span></button>'+
  '<div><label class="d9-sr" for="d9Rango">Paso de la explicación</label><input id="d9Rango" type="range" min="0" max="'+(d9Hitos().length-1)+'" value="0" oninput="d9IrNumero(this.value)">'+
  '<span id="d9Cuenta" class="d9-sr" aria-live="polite"></span><select id="d9Salta" aria-label="Ir a un paso de la explicación" onchange="d9IrNumero(this.value)">'+d9Hitos().map((h,i)=>'<option value="'+i+'">'+(i+1)+' de '+d9Hitos().length+' · '+esc(h.corto)+'</option>').join('')+'</select></div><button type="button" id="d9Next" class="d9-next" onclick="d9Mueve(1)" aria-label="Paso siguiente"><span>Siguiente</span>'+IC('der')+'</button></nav>'+
  '<div class="d9-status" id="d9Status" role="status"></div></div>';
 d9Pinta();el.scrollTop=0;
 const b=el.querySelector('.d9-close');if(b&&b.focus)b.focus({preventScroll:true});
}
function d9Ir(id){
 const i=d9Hitos().findIndex(h=>h.id===id);if(i<0)return;
 const el=document.getElementById('lam'),r=el&&el.getRootNode?el.getRootNode():document,foco=r.activeElement;
 d9Respuesta=-1;lamPaso=i;lamDonde=id;d9Vista=d9Hito().escala;d9Tab='explica';d9Pinta();
 if(el)el.scrollTop=0;
 if(foco&&!foco.isConnected){const t=document.getElementById('d9Titulo');if(t)t.focus({preventScroll:true});}
}
function d9IrNumero(n){const h=d9Hitos()[Number(n)];if(h)d9Ir(h.id);}
function d9Mueve(d){d9IrNumero(lamPaso+d);}
function d9Modo(){
 lamModo=lamModo==='presentar'?'explorar':'presentar';
 const el=document.getElementById('lam');el.classList.toggle('d9-pres',lamModo==='presentar');
 const b=document.getElementById('d9Modo');if(b)b.textContent=lamModo==='presentar'?'Estudiar':'Presentar';
 lamLugar();
}
function d9Pinta(){
 const h=d9Hito(),z=document.getElementById('d9Story');if(!z)return;
 const foto=lamRuta(LAM(),h.img),cambio=++d9Cambio;
 z.innerHTML='<figure class="d9-art"><img id="d9Imagen" src="'+foto+'" alt="'+esc(h.alt)+'" decoding="async">'+
  '<figcaption><span class="d9-scene-date">'+esc(h.fecha)+'</span><h1 tabindex="-1" id="d9Titulo">'+esc(h.titulo)+'</h1></figcaption>'+
  '<span class="d9-art-note">Ilustración artística</span></figure>'+
  '<section class="d9-notebook" aria-label="Explicación y documentación"><div class="d9-reading-tabs" role="group" aria-label="Qué quieres consultar">'+
  [['explica','Explicación'],['texto','Texto bíblico'],['frases','Frase a frase'],['fuentes','Fuentes']].map(([k,t])=>
   '<button type="button" aria-pressed="'+(d9Tab===k)+'" onclick="d9Consulta(\''+k+'\')">'+t+'</button>').join('')+
  '</div><div class="d9-panel" id="d9Panel"></div></section>';
 const im=document.getElementById('d9Imagen');
 if(im)im.onerror=()=>{if(cambio===d9Cambio){im.hidden=true;const a=z.querySelector('.d9-art-note');if(a)a.textContent='La imagen no pudo cargarse. El texto y la cronología siguen disponibles.';}};
 d9PintaPanel();d9PintaTiempo();
 const salto=document.getElementById('d9Salta');if(salto)salto.value=String(lamPaso);
 const cuenta=document.getElementById('d9Cuenta');if(cuenta)cuenta.textContent=(lamPaso+1)+' de '+d9Hitos().length+' · '+h.corto;
 const r=document.getElementById('d9Rango');if(r){r.value=lamPaso;r.setAttribute('aria-valuetext',h.corto+' · '+h.fecha);}
 const ant=document.getElementById('d9Prev'),sig=document.getElementById('d9Next');
 if(ant)ant.disabled=lamPaso===0;if(sig)sig.disabled=lamPaso===d9Hitos().length-1;
 /* Solo anticipa la escena siguiente, sin descargar todo el catálogo. */
 const siguiente=d9Hitos()[lamPaso+1];if(siguiente&&typeof Image!=='undefined'){const p=new Image();p.src=lamRuta(LAM(),siguiente.img);}
 lamLugar();
}
function d9Consulta(k){
 if(!['explica','texto','frases','fuentes','preguntas'].includes(k))return;
 d9Tab=k;
 document.querySelectorAll('.d9-reading-tabs button').forEach((b,i)=>b.setAttribute('aria-pressed',['explica','texto','frases','fuentes'][i]===k?'true':'false'));
 d9PintaPanel();
}
function d9PintaPanel(){
 const p=document.getElementById('d9Panel');if(!p)return;
 const h=d9Hito();
 if(d9Tab==='referencia'){p.innerHTML=d9ReferenciaHTML();return;}
 if(d9Tab==='preguntas'){p.innerHTML=d9PreguntasHTML();return;}
 if(d9Tab==='texto'){
  p.innerHTML='<span class="d9-kicker">Daniel 9 · Reina-Valera 1995</span><div class="d9-bible">'+h.versos.map(v=>
   '<p><sup>'+v+'</sup> '+esc(VERS.d9[v])+'</p>').join('')+'</div><p class="d9-ref">Leer también: '+d9Refs(h.refs)+'</p>'+
   '<button type="button" class="d9-text-link" onclick="d9Capitulo()">Abrir el capítulo completo '+IC('der')+'</button>';return;
 }
 if(d9Tab==='frases'){p.innerHTML=d9FrasesHTML();return;}
 if(d9Tab==='fuentes'){
  p.innerHTML='<span class="d9-kicker">Documentación de este hito</span><h2>Del texto a la interpretación</h2><p>Primero la Biblia; después Elena G. de White; luego Bohr y los simposios. Los apuntes de estudio se cotejaron con estas fuentes.</p>'+
   '<p class="d9-ref">'+d9Refs(h.refs)+'</p>'+h.fuentes.slice().sort((a,b)=>['dtg','cs','bohr','simd','sima'].indexOf(a)-['dtg','cs','bohr','simd','sima'].indexOf(b)).map(k=>d9FuenteHTML(k)).join('')+
   '<details class="d9-details"><summary>Cómo se presentan las fechas</summary><p>Las cantidades y expresiones se leen de Daniel 9. Los años 457 a.C., 27, 31 y 34 d.C. pertenecen a la cronología historicista adventista. Las notas de cada hito explican qué parte requiere reconstrucción histórica o interpretación.</p></details>';
  return;
 }
 p.innerHTML='<span class="d9-kicker">La idea central</span><h2>'+esc(h.idea)+'</h2>'+h.explica.map(t=>'<p>'+esc(t)+'</p>').join('')+
  '<details class="d9-details"><summary>Una distinción importante</summary><p>'+esc(h.matiz)+'</p></details>'+
  '<p class="d9-ref">'+d9Refs(h.refs)+'</p><div class="d9-actions">'+
  '<button type="button" class="d9-text-link" onclick="d9Consulta(\'texto\')">Ver el texto '+IC('der')+'</button>'+
  '<button type="button" class="d9-text-link" onclick="d9Consulta(\'frases\')">Frase a frase '+IC('der')+'</button>'+
  '<button type="button" class="d9-text-link d9-practicar" onclick="d9Consulta(\'preguntas\')">Comprueba lo aprendido '+IC('der')+'</button></div>';
}
function d9FuenteHTML(k){
 const f=LAM().fuentes[k];return '<div class="d9-source"><b>'+esc(f.nombre)+'</b><p>'+esc(f.lugar)+'</p>'+
  (f.url?'<a href="'+f.url+'" target="_blank" rel="noopener noreferrer">Consultar la obra ↗</a>':'')+'</div>';
}
function d9PintaTiempo(){
 const z=document.getElementById('d9Time');if(!z)return;
 const e=d9Escalas()[d9Vista],h=d9Hito(),a=h.avance;
 const progreso=a===null?null:(a-e.inicio)/e.total*100;
 const posicion=z.querySelector('.d9-position'),anterior=posicion&&z.dataset.escala===d9Vista?posicion.style.left:null;
 z.dataset.escala=d9Vista;
 z.innerHTML='<div class="d9-time-head"><div><span class="d9-kicker">La línea de tiempo</span><b>'+e.titulo+'</b></div>'+
  '<div class="d9-scale" role="group" aria-label="Escala de la línea de tiempo">'+
   [['semanas','70 semanas'],['ultima','Última semana'],['conexion','2.300 años']].map(([k,t])=>
    '<button type="button" onclick="d9Escala(\''+k+'\')" aria-pressed="'+(d9Vista===k)+'">'+t+'</button>').join('')+'</div></div>'+
  '<div class="d9-chronology" aria-label="'+esc(e.titulo)+'"><div class="d9-track">'+
   e.bandas.map(([n,t,id],i)=>'<button type="button" class="d9-band d9-band-'+i+(d9Vista==='semanas'&&i===2?' d9-band-last':'')+'" style="flex:'+n+'" onclick="d9Tramo(\''+id+'\')" aria-label="'+t+' · '+n+' años"><span>'+t+'</span></button>').join('')+
   (progreso!==null&&progreso>=0&&progreso<=100?'<span class="d9-position" aria-hidden="true" style="left:'+progreso+'%"></span>':'')+'</div>'+
  '<div class="d9-axis"><span>'+esc(e.puntos[0][0])+'</span><span>'+esc(e.puntos[e.puntos.length-1][0])+'</span></div><div class="d9-points" aria-label="Explorar hitos">'+e.puntos.map(([t,sub,id])=>'<button type="button" onclick="d9Tramo(\''+id+'\')" aria-pressed="'+(h.id===id)+'"><b>'+t+'</b><span>'+sub+'</span></button>').join('')+'</div></div>'+
  '<p class="d9-time-note">'+esc(e.nota)+'</p>'+
  '<details class="d9-calculation"><summary>Entender el cálculo · sin año cero</summary>'+d9CalculoHTML()+'</details>';
 const nueva=z.querySelector('.d9-position');if(nueva&&anterior&&!lamQuieto()){nueva.style.left=anterior;requestAnimationFrame(()=>{if(nueva.isConnected)nueva.style.left=progreso+'%';});}
}
function d9CalculoHTML(){
 return '<div class="d9-math"><p><b>7 × 7 = 49</b><span>Primer tramo</span></p><p><b>62 × 7 = 434</b><span>Segundo tramo</span></p><p><b>1 × 7 = 7</b><span>Última semana</span></p><p><b>49 + 434 + 7 = 490</b><span>Una secuencia continua</span></p></div>'+
  '<p>Entre 1 a.C. y 1 d.C. transcurre un año: no existe un año cero. Por eso, al cruzar las eras, se resta uno: <b>457 + 27 − 1 = 483</b>; <b>457 + 34 − 1 = 490</b>; <b>457 + 1844 − 1 = 2.300</b>.</p>'+
  '<p>En la última semana importan también las estaciones: del otoño del 27 al otoño del 30 hay tres años; hasta la primavera del 31 hay medio año más. El dibujo sitúa la cruz en el punto medio de los siete años.</p>';
}
function d9Escala(k){
 if(!d9Escalas()[k])return;
 if(k==='ultima'&&(lamPaso<4||lamPaso>7))d9Ir('mesias');
 d9Vista=k;d9PintaTiempo();
 const b=document.querySelector('.d9-scale [aria-pressed="true"]');if(b)b.focus({preventScroll:true});
}
function d9Tramo(id){
 const vista=d9Vista;d9Ir(id);
 d9Vista=id==='pacto'?'ultima':vista;d9PintaTiempo();
 const t=document.getElementById('d9Titulo');if(t)t.focus({preventScroll:true});
}
function d9FrasesHTML(){
 const frases=LAM().frases||{};
 return '<span class="d9-kicker">Daniel 9:24–27 · frase por frase</span><h2>Lee despacio. Une las piezas.</h2>'+
  '<div class="d9-verses" role="group" aria-label="Versículo que quieres explicar">'+[24,25,26,27].map(v=>
   '<button type="button" onclick="d9FraseVerso('+v+')" aria-pressed="'+(d9Verso===v)+'">9:'+v+'</button>').join('')+'</div>'+
  '<p class="d9-verse-whole">'+esc(VERS.d9[d9Verso])+'</p>'+(frases[d9Verso]||[]).map((f,i)=>
   '<details class="d9-phrase" name="d9-frase"'+(i===0?' open':'')+'><summary><span>'+String(i+1).padStart(2,'0')+'</span>'+esc(f.frase)+'</summary>'+
   '<div><p>'+esc(f.sentido)+'</p><p>'+esc(f.desarrollo)+'</p><p class="d9-ref">'+d9Refs(f.refs)+'</p>'+
   '<p class="d9-phrase-source">Apoyo: '+f.fuentes.map(k=>esc(LAM().fuentes[k].nombre)).join(' · ')+'</p></div></details>').join('');
}
function d9FraseVerso(v){if(![24,25,26,27].includes(v))return;d9Verso=v;d9PintaPanel();const b=document.querySelector('.d9-verses [aria-pressed="true"]');if(b)b.focus({preventScroll:true});}
function d9Capitulo(){lamCierra();verCap('d9');}
function d9Pantalla(){
 const el=document.getElementById('lam');if(!el)return;
 const r=el.getRootNode?el.getRootNode():document;
 const p=(r.fullscreenElement||document.fullscreenElement)&&document.exitFullscreen?document.exitFullscreen():el.requestFullscreen?el.requestFullscreen():null;
 if(p&&p.catch)p.catch(()=>d9Aviso('La pantalla completa no está disponible en este navegador. Puedes usar Presentar.'));
}
function d9Aviso(t){const s=document.getElementById('d9Status');if(s)s.textContent=t;}
async function d9Comparte(){
 lugarEscribe(lugarActual());
 try{const url=new URL(location.href);url.search='';if(/^\/app\/?$/.test(url.pathname))url.pathname='/estudiar/';
  await navigator.clipboard.writeText(url.href);d9Aviso('Enlace público de este paso copiado.');}
 catch(e){d9Aviso('Copia la dirección de la barra del navegador: incluye el paso que estás viendo.');}
}
function d9AlCerrar(){
 d9Cambio++;
 const el=document.getElementById('lam'),r=el&&el.getRootNode?el.getRootNode():document;
 if((r.fullscreenElement||document.fullscreenElement)&&document.exitFullscreen){const p=document.exitFullscreen();if(p&&p.catch)p.catch(()=>{});}
 if(el){el.removeAttribute('role');el.removeAttribute('aria-modal');el.removeAttribute('aria-label');}
 const foco=d9Foco;d9Foco=null;return foco;
}
function d9Tecla(e){
 const el=document.getElementById('lam'),t=e.target;
 if(e.key==='Escape'){e.preventDefault();lamCierra();return;}
 if(e.key==='Tab'){
  const bs=[...el.querySelectorAll('button:not(:disabled),a[href],input,summary')].filter(b=>b.getClientRects().length);
  const root=el.getRootNode?el.getRootNode():document,a=root.activeElement;
  if(bs.length&&((e.shiftKey&&a===bs[0])||(!e.shiftKey&&a===bs[bs.length-1]))){e.preventDefault();bs[e.shiftKey?bs.length-1:0].focus();}
  return;
 }
 if(e.altKey||e.metaKey||e.ctrlKey||(t&&/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName||'')))return;
 if(['ArrowRight','PageDown'].includes(e.key)){e.preventDefault();d9Mueve(1);}
 else if(['ArrowLeft','PageUp'].includes(e.key)){e.preventDefault();d9Mueve(-1);}
 else if(e.key==='Home'){e.preventDefault();d9IrNumero(0);}
 else if(e.key==='End'){e.preventDefault();d9IrNumero(d9Hitos().length-1);}
}

function d9PreguntasHTML(){
 const q=LAM().preguntas.find(q=>q.hito===d9Hito().id);if(!q)return '';
 const respondido=d9Respuesta>=0;
 return '<button type="button" class="d9-text-link" onclick="d9Consulta(\'explica\')">'+IC('izq')+' Volver a la explicación</button>'+
  '<span class="d9-kicker">Para comprender, no solo recordar</span><h2>'+esc(q.q)+'</h2>'+
  '<div class="d9-options" role="group" aria-label="Escoge una respuesta">'+q.o.map((o,i)=>
   '<button type="button" class="d9-option'+(respondido&&i===q.a?' correcta':'')+(respondido&&i===d9Respuesta&&i!==q.a?' revisar':'')+'" aria-pressed="'+(i===d9Respuesta)+'" onclick="d9Responde('+i+')"><span>'+String.fromCharCode(65+i)+'</span>'+esc(o)+'</button>').join('')+'</div>'+
  (respondido?'<div class="d9-answer" id="d9Respuesta" tabindex="-1" role="status"><b>'+(d9Respuesta===q.a?'La conexión es correcta.':'Revisa esta conexión.')+'</b><p>'+esc(q.e)+'</p></div>':'')+
  '<div class="d9-open-question"><span class="d9-kicker">Explícalo con tus palabras</span><h3>'+esc(q.abierta)+'</h3><details class="d9-details"><summary>Ver una pauta de respuesta</summary><p>'+esc(q.pauta)+'</p></details></div>'+
  '<p class="d9-ref">Práctica de profundización. Estas preguntas se mantienen separadas del examen oficial.</p>';
}
function d9Responde(i){
 const q=LAM().preguntas.find(q=>q.hito===d9Hito().id);if(!q||!Number.isInteger(i)||i<0||i>=q.o.length)return;
 d9Respuesta=i;d9PintaPanel();const r=document.getElementById('d9Respuesta');if(r)r.focus({preventScroll:true});
}

function d9Ref(cid,de,hasta){
 const t=tablaDeCid(cid);if(!t)return;
 d9Referencia={cid,de,hasta:hasta||de,volver:d9Tab==='referencia'?(d9Referencia?.volver||'explica'):d9Tab};
 d9Tab='referencia';d9PintaPanel();
 const titulo=document.getElementById('d9RefTitulo');if(titulo)titulo.focus({preventScroll:true});
}
function d9ReferenciaHTML(){
 const r=d9Referencia,t=r&&tablaDeCid(r.cid);if(!t)return '';
 const vs=Object.keys(t.mapa).map(Number).filter(v=>v>=r.de&&v<=r.hasta);
 return '<button type="button" class="d9-text-link" onclick="d9RefVolver()">'+IC('izq')+' Volver al estudio</button>'+
  '<span class="d9-kicker">Consulta bíblica · '+esc(t.version)+'</span><h2 id="d9RefTitulo" tabindex="-1">'+esc(t.ref)+':'+r.de+(r.hasta>r.de?'–'+r.hasta:'')+'</h2>'+
  '<div class="d9-bible">'+vs.map(v=>'<p><sup>'+v+'</sup> '+esc(t.mapa[v])+'</p>').join('')+'</div>';
}
function d9RefVolver(){d9Tab=d9Referencia?.volver||'explica';d9PintaPanel();}
