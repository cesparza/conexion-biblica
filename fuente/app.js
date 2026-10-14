/* ───────── estado ───────── */
/* ───────── categorías ─────────
   Salen del reglamento del campamento: cada club presenta dos integrantes de
   4 a 6 años (examen solo del libro de Daniel), dos de 7 a 9 (Daniel más
   Profetas y Reyes) y dos padres o consejeros con el mismo alcance de 7 a 9.
   «gm» no está en ese reglamento: es el alcance ampliado de Guías Mayores,
   que es otro evento.
     n      preguntas del examen de práctica
     techo  nivel máximo de dificultad que se le ofrece
     sinCompletar  el examen no trae sección de completar
     sinVF         el examen no trae verdadero o falso */
/* ── EL MODELO: ACTIVIDAD × CATEGORIA ───────────────────────────────────
   Hay TRES actividades distintas, con fechas, jurados y reglamentos propios,
   y categorias por edad o rol DENTRO de cada una. Son dos dimensiones, no
   una.

   POR QUE ESTABA MAL Y COMO SE ARREGLO
   Antes cada actividad se resolvia distinto: Conexion Biblica con un campo
   `ev` de texto libre, la Devocion Matutina con claves propias (dm1, dm2), y
   las 28 creencias con un `S.evento` aparte y un conmutador. Tres mecanismos
   para el mismo concepto. Y `gm` declaraba a la vez ev:'Conexion Biblica' y
   edad:'Otro evento': el dato se contradecia solo.

   Ahora ACTIVIDADES es el dato de primer nivel y CATS declara a que actividad
   pertenece cada categoria. La clave de categoria NO cambio (av sigue siendo
   av), asi que el progreso guardado en los celulares y las 7 participantes de
   la base siguen valiendo tal cual: este rediseno no migra nada.

   UNA FICHA POR ACTIVIDAD, que es el patron que la app ya tenia
   La bienvenida ya creaba dos fichas para quien hacia Conexion Biblica y
   Matutina, con el comentario «el progreso de Daniel y el de la matutina son
   cuentas separadas y no se deben mezclar». Eso era lo correcto y ahora
   aplica a las tres: cada ficha tiene su prog, su racha y sus insignias, asi
   que el progreso queda separado POR CONSTRUCCION y no hace falta ninguna
   funcion que lo desmezcle. */
/* v163: ACTIVIDADES y CATS ya no se escriben aquí. Salen de las fichas del
   campamento, que son el reglamento como datos.

   v167: EL REGLAMENTO SE ARMA AL ABRIR
   MECANISMO
   Una ficha puede venir de dos sitios: escrita en el código (FICHAS_BASE, las
   de fábrica) o guardada en la base por quien dirige. Las guardadas llegan con
   /estado, que es lo que todo aparato ya consulta, y se dejan en el aparato
   (FICHAS_CACHE). Aquí, antes de que corra nada más, se juntan las dos y de
   ahí salen ACTIVIDADES, CATS y para quién es cada capítulo y cada repaso.

   POR QUÉ AL ABRIR Y NO CUANDO LLEGAN
   Todo lo que sigue da por hecho que el reglamento no cambia mientras la app
   está abierta: hay exámenes a medias, fichas escogidas y listas ya pintadas.
   Una ficha que llega nueva se guarda y se aplica en la próxima apertura; si
   es distinta de la que está corriendo, sale el mismo aviso de «Hay material
   nuevo» (fichasLlegan, más abajo).

   SIN BASE, SIN SEÑAL O CON DATOS DAÑADOS abre con las de fábrica: junta()
   deja por fuera la ficha que no pasa la revisión y nunca lanza un error. */
const FICHAS_CACHE='cb-fichas';
function fichasLee(){
  try{const x=JSON.parse(localStorage.getItem(FICHAS_CACHE)||'null');return x&&Array.isArray(x.fichas)?x.fichas:[];}
  catch(e){return [];}
}
const FICHAS_GUARDADAS=fichasLee();
const FICHAS_JUNTAS=REGLAS.junta(FICHAS_BASE,FICHAS_GUARDADAS,IDS_DE_TEMA);
const REGLAMENTO=REGLAS.deriva(FICHAS_JUNTAS.fichas);
const ACTIVIDADES=REGLAMENTO.ACTIVIDADES, CATS=REGLAMENTO.CATS;
const CAPS=REGLAMENTO.conCats(CAPS_BASE), MODULOS=REGLAMENTO.conCats(MODULOS_BASE);

/* v180: LA INTERPRETACIÓN, TODA EN UN SOLO LUGAR. Camilo, 12-oct: «una
   sección de solo interpretación con todo el material». Cada capítulo ya trae
   sus secciones 🧭 (capa 'contexto', con su fuente) mezcladas con las del
   examen; aquí se juntan, en orden, en un repaso por libro: «Daniel: la
   interpretación» y «Apocalipsis: la interpretación».
   Se arma al cargar, de CONTENIDO, y no en build.js: así no se repiten en el
   archivo los ~280 KB de texto, y lo que se corrija en un capítulo sale igual
   aquí. Lo ve quien estudia al menos un capítulo de ese libro. Cada sección
   lleva `cap`, para que sus citas sueltas (8:7) se toquen en su capítulo. */
/* v182: LA INTERPRETACIÓN VA DENTRO DE CADA CAPÍTULO, AL FINAL (Camilo,
   16:44: «por capítulo la interpretación no por aparte sino todo en uno, una
   sección abajo del estudio de cada capítulo»). Las secciones 🧭 (capa
   'contexto') se sacan de su lugar y se pintan juntas bajo el título «La
   interpretación», después del estudio. Las de contexto sin 🧭 (historia,
   curiosidades) se quedan donde estaban. v180 y v181 las ponían en repasos
   aparte; eso se quitó. */
const esSecInterp=s=>s&&s.capa==='contexto'&&/^🧭/.test(String(s.t||''));

/* ═══════════ LÁMINAS: ESTUDIO INTERACTIVO CON IMAGEN (v185) ═══════════
   MECANISMO
   Una lámina (fuente/laminas.js) es una imagen partida en capas del mismo
   tamaño, una por símbolo, más los textos de cada parte. Se pinta como un SVG
   con una <image> por capa y un rectángulo invisible encima para tocarla (una
   imagen recibe el toque en toda su caja, también donde es transparente).
   Sobre el SVG van, en HTML, las etiquetas de cada parte (para que la letra no
   se encoja con la escena) y la tarjeta que se abre DENTRO de la imagen: la
   explicación se lee sin quitar los ojos de la estatua (Camilo, 18:22).
   Abajo, una línea de tiempo que se arrastra: el año enciende la parte que
   gobernaba. Acercar es mover el viewBox; romper, partículas.
   Dos modos sobre la misma escena: Explorar y Presentar (oscuro, un paso por
   toque o por flecha, letra grande, para una clase).
   Las imágenes son archivos aparte (laminas/), no van dentro de index.html:
   se piden solo al abrir la lámina. En Jóvenes, traer.mjs cambia LAMINAS_DIR. */
const LAMINAS_DIR='/laminas/';
let lamSinTexto=false, lamId='', lamModo='', lamSel='', lamPaso=0, lamReto=0, lamBien=0, lamListo=false, lamAnio=null, lamCorre=0;
const lamQuieto=()=>{try{return matchMedia('(prefers-reduced-motion: reduce)').matches;}catch(e){return false;}};
const LAM=()=>LAMINAS[lamId];
const lamParte=id=>LAM().partes.find(p=>p.id===id);
/* v204: una imagen de otra lámina se nombra con su carpeta («d2/e605»). */
/* v205: las capas con fondo transparente se nombran con su extensión («cuerno-suelto.png»). */
const lamRuta=(L,f)=>LAMINAS_DIR+(f.includes('/')?'':L.dir)+f+(/\.\w+$/.test(f)?'':'.webp');
const lamSrc=f=>lamRuta(LAM(),f);
/* v204: Daniel 7 no es una estatua: una imagen entera por parte (ver lamEscenaE). */
const lamEsE=()=>LAM().tipo==='escenas';
const lamAnioTx=y=>y<0?(-y)+' a.C.':y+' d.C.';
const PIEDRA0=[960,330];

/* v188: las imágenes se piden todas y se decodifican antes de mostrar la
   escena: mientras llegaban, la estatua se armaba a pedazos sobre un fondo
   vacío. lamPrecarga() sin escena solo las deja en caché (se llama al abrir
   el capítulo); con escena, quita el velo cuando están listas. */
const lamPrecargadas={};
function lamPrecarga(cid,esc){
  const L=LAMINAS[cid];if(!L||typeof Image==='undefined')return;
  const C=L.comparar&&LAMINAS[L.comparar];
  const fs=(L.tipo==='escenas'?[L.inicioF,...L.partes.map(p=>p.img),...L.historia.map(h=>h.f)]:[...L.capas,'babilonia','monte','piedra']).map(f=>lamRuta(L,f))
    .concat(C?[...C.capas,'piedra','monte'].map(f=>lamRuta(C,f)):[]);
  const p=lamPrecargadas[cid]||(lamPrecargadas[cid]=Promise.all(fs.map(src=>new Promise(ok=>{
    const im=new Image();im.onload=()=>{(im.decode?im.decode():Promise.resolve()).then(ok,ok);};im.onerror=ok;im.src=src;}))));
  if(esc){const listo=()=>esc.classList.remove('cargando');p.then(listo);setTimeout(listo,8000);}
}
/* La tarjeta que invita, dentro del estudio del capítulo. */
function lamTarjeta(cid){
  const L=LAMINAS[cid];
  if(!L)return '';
  const src=f=>lamRuta(L,f);
  return '<div class="lam-invita"><div class="lam-mini">'+(L.tipo==='escenas'?'<img src="'+src(L.miniF)+'" alt="" loading="lazy">':'<img src="'+src('babilonia')+'" alt="" loading="lazy">'+
    L.capas.map(k=>'<img src="'+src(k)+'" alt="" loading="lazy">').join(''))+'</div>'+
    '<div class="lam-itx"><div class="lam-ant">Estudio interactivo</div><div class="lam-itit">'+esc(L.titulo)+'</div>'+
    '<p>'+esc(L.invita||'Toca cada parte de la estatua: lo que dice el texto, lo que significa, sus fechas y su fuente.')+'</p>'+
    '<div class="lam-bots"><button type="button" class="btn ver" onclick="lamAbre(\''+cid+'\',\'explorar\')">'+IC('lupa')+' Explorar</button>'+
    '<button type="button" class="btn tono" onclick="lamAbre(\''+cid+'\',\'presentar\')">'+IC('play')+' Presentar</button></div></div></div>';
}

/* ── La escena: SVG + etiquetas + tarjeta ── */
function lamEscena(){
  if(lamEsE())return lamEscenaE();
  const L=LAM(),C=L.cajas,E=L.etiquetas;
  const capa=id=>'<g class="lam-parte" data-p="'+id+'"><image href="'+lamSrc(id)+'" x="'+L.ox+'" y="0" width="768" height="1152"/>'+
    '<rect class="lam-hit" x="'+C[id][0]+'" y="'+C[id][1]+'" width="'+C[id][2]+'" height="'+C[id][3]+'" fill="transparent" pointer-events="all" onclick="lamToca(\''+id+'\')"/></g>';
  /* La línea va del punto de la estatua al borde de su etiqueta. */
  const lineas=Object.keys(E).filter(id=>E[id].ax).map(id=>{const e=E[id],x2=e.lado==='i'?330:770;
    return '<g class="lam-guia" data-p="'+id+'"><circle cx="'+e.ax+'" cy="'+e.ay+'" r="7"/><path d="M'+e.ax+' '+e.ay+' L'+(e.lado==='i'?x2+30:x2-30)+' '+(e.ly+32)+' L'+x2+' '+(e.ly+32)+'"/></g>';}).join('');
  const etiquetas=Object.keys(E).map(id=>{const e=E[id],p=lamParte(id);
    return '<button type="button" class="lam-et '+e.lado+'" data-p="'+id+'" style="--c:'+p.c+';top:'+(e.ly/L.h*100)+'%" onclick="lamToca(\''+id+'\')">'+
      '<b>'+esc(e.t||p.reino)+'</b><span>'+esc(e.f||p.fechas).replace(/ ([ad])\.C\./g,'&nbsp;$1.C.')+'</span></button>';}).join('');
  return '<div class="lam-marco"><div class="lam-esc cargando" id="lamEsc"><div class="lam-carga" aria-hidden="true"><i></i>Preparando la imagen…</div>'+
    '<svg class="lam-svg" id="lamSvg" viewBox="'+lamTodo().join(' ')+'" role="img" aria-label="'+esc(L.titulo)+'">'+
    /* v190: sin url(#…) (degradados ni clipPath por id): dentro del árbol aparte
       de Jóvenes, Safari en el iPhone no siempre los encuentra y el monte no
       aparecía. El monte se recorta con clip-path de CSS y la luz son círculos. */
    '<image class="lam-fondo" href="'+lamSrc('babilonia')+'" x="-150" y="0" width="2050" height="1152" preserveAspectRatio="xMidYMid slice"/>'+
    '<image class="lam-monte" href="'+lamSrc('monte')+'" x="-150" y="0" width="2050" height="1152" preserveAspectRatio="xMidYMid slice"/>'+
    /* v201: al presentar en pantalla ancha la escena va a la izquierda, entera,
       sobre una copia oscurecida de sí misma; el texto queda a la derecha sin taparla. */
    /* v209: lam-hist-bg guarda la escena anterior mientras la nueva entra encima (fundido). */
    '<rect class="lam-hist-osc" x="-150" y="0" width="2050" height="1152" fill="#0E0D0B"/>'+
    '<image class="lam-hist-bg" href="" x="-150" y="0" width="2050" height="1152" preserveAspectRatio="xMidYMid slice"/>'+
    '<image class="lam-hist" href="" x="-150" y="0" width="2050" height="1152" preserveAspectRatio="xMidYMid slice"/>'+
    '<ellipse cx="'+(L.ox+384)+'" cy="1138" rx="230" ry="26" fill="#000" fill-opacity=".28"/>'+
    '<g class="lam-estatua">'+L.capas.map(capa).join('')+'</g><g class="lam-guias">'+lineas+'</g><g class="lam-polvo"></g>'+
    '<g class="lam-luz">'+[1,.72,.48,.26].map(k=>'<circle cx="'+L.golpe[0]+'" cy="'+L.golpe[1]+'" r="0" data-f="'+k+'" fill="'+(k<.3?'#FFF8E2':'#F6D57A')+'" fill-opacity="'+(k<.3?.9:.22)+'"/>').join('')+'</g>'+
    '<g class="lam-parte lam-piedra" data-p="piedra" transform="translate('+PIEDRA0.join(' ')+')"><image href="'+lamSrc('piedra')+'" x="-110" y="-110" width="220" height="220"/>'+
    '<rect class="lam-hit" x="-110" y="-110" width="220" height="220" fill="transparent" pointer-events="all" onclick="lamToca(\'piedra\')"/></g></svg>'+
    '<div class="lam-ets" id="lamEts">'+etiquetas+'</div><div class="lam-chip" id="lamChip" hidden></div>'+lamCartelHTML()+
    (lamModo==='presentar'?'':'<div class="lam-aviso" id="lamAviso">Toca una parte de la estatua</div>')+'</div>'+
    /* v187: la explicación va DEBAJO de la imagen (al lado en pantalla ancha),
       nunca encima: en el celular tapaba la animación. Solo en Presentar con
       pantalla ancha va sobre la parte vacía de la escena apaisada. */
    '<div class="lam-hoja" id="lamHoja" aria-live="polite"></div></div>';
}
/* Mueve el viewBox con suavidad. */
let lamCam=0;
function lamAcerca(dest,ms){
  const svg=document.getElementById('lamSvg');if(!svg)return;
  const ini=svg.getAttribute('viewBox').split(/\s+/).map(Number),yo=++lamCam;
  if(lamQuieto()||!ms){svg.setAttribute('viewBox',dest.join(' '));lamDeriva(dest,yo);return;}
  const t0=performance.now();
  const paso=t=>{if(yo!==lamCam)return;const k=Math.min(1,(t-t0)/ms),e=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2;
    svg.setAttribute('viewBox',ini.map((v,i)=>v+(dest[i]-v)*e).join(' '));if(k<1)requestAnimationFrame(paso);else lamDeriva(dest,yo);};
  requestAnimationFrame(paso);
}
/* v209: LA CÁMARA NO SE QUEDA QUIETA. Al presentar, cuando la escena llega a su
   sitio sigue acercándose muy despacio (un 6 % en 22 s), como en un documental.
   Se mueve el viewBox, cuadro por cuadro (nada de el.animate ni transform de CSS
   sobre el SVG, que Safari no siempre corre). Lo que va pegado a un punto de la
   imagen (los cuernos contados, las tablas) no se movería con ella: ahí la
   cámara se queda quieta y vuelve a su sitio. Con «reducir movimiento», nada. */
const lamDerivaPuede=()=>{const m=document.getElementById('lamMarcasImg'),tb=document.getElementById('lamTabla');return !(m&&m.innerHTML)&&!(tb&&!tb.hidden);};
function lamDeriva(d,yo){
  if(lamModo!=='presentar'||lamQuieto())return;
  const svg=document.getElementById('lamSvg');if(!svg)return;
  const s=.06,fin=[d[0]+d[2]*s/2,d[1]+d[3]*s*.4,d[2]*(1-s),d[3]*(1-s)],t0=performance.now(),ms=22000;
  const f=t=>{if(yo!==lamCam)return;
    if(!lamDerivaPuede()){svg.setAttribute('viewBox',d.join(' '));return;}
    const k=Math.min(1,(t-t0)/ms),e=(1-Math.cos(Math.PI*k))/2;
    svg.setAttribute('viewBox',d.map((v,i)=>(v+(fin[i]-v)*e).toFixed(2)).join(' '));if(k<1)requestAnimationFrame(f);};
  requestAnimationFrame(f);
}
/* En Presentar, con pantalla ancha, la escena es apaisada: la estatua a la izquierda y
   la explicación a la derecha, sin taparla. */
const lamAncho=()=>lamModo==='presentar'&&innerWidth>=900&&innerWidth>innerHeight*1.1;
const lamTodo=()=>lamAncho()||lamEsE()?[-150,0,2050,1152]:[0,0,LAM().w,LAM().h];
/* Acercarse a una parte, centrada (la explicación ya no la tapa). */
function lamCaja(id){
  const L=LAM(),[x,y,w,h]=L.cajas[id];
  if(lamAncho()){const H=Math.min(L.h,Math.max(h*2,440)),W=H*2050/L.h,cx=x+w/2,cy=y+h/2;
    return [Math.max(-150,Math.min(1900-W,cx-W*0.3)),Math.max(0,Math.min(L.h-H,cy-H/2)),W,H];}
  const R=L.w/L.h;
  let W=Math.min(L.w,Math.max(w*1.6,h*R*1.4,380)),H=W/R;if(H>L.h){H=L.h;W=H*R;}
  return [Math.max(0,Math.min(L.w-W,x+w/2-W/2)),Math.max(0,Math.min(L.h-H,y+h/2-H/2)),W,H];
}
/* Encender: las partes de `ids` se ven, las demás se apagan (vacío: todas normales). */
function lamEnciende(ids,suaves,vecinas){
  const svg=document.getElementById('lamSvg');if(!svg)return;
  const hay=ids&&ids.length;
  svg.querySelectorAll('.lam-estatua .lam-parte').forEach(x=>x.classList.toggle('vecina',!!hay&&(vecinas||[]).includes(x.getAttribute('data-p'))));
  svg.querySelectorAll('.lam-estatua .lam-parte').forEach(x=>{const id=x.getAttribute('data-p');
    x.classList.toggle('on',!!hay&&ids.includes(id));
    x.classList.toggle('apagada',!!hay&&!ids.includes(id)&&!(suaves||[]).includes(id));
    x.classList.toggle('tenue',!!hay&&(suaves||[]).includes(id));});
  document.querySelectorAll('#lamEts .lam-et, #lamTira .lam-tb').forEach(b=>b.classList.toggle('on',!!hay&&ids.includes(b.getAttribute('data-p'))));
}
function lamEtiquetas(ver){const e=document.getElementById('lamEts');if(e)e.classList.toggle('fuera',!ver);
  const g=document.querySelector('#lamSvg .lam-guias');if(g)g.style.opacity=ver?'1':'0';}

/* ── Abrir y cerrar ── */
function lamAbre(cid,modo){
  if(!LAMINAS[cid])return;
  lamSinTexto=false;lamId=cid;lamModo=modo;lamSel='';lamPaso=0;lamReto=0;lamBien=0;lamListo=false;lamAnio=null;lamPara();
  const el=document.getElementById('lam'),L=LAM();
  el.hidden=false;el.className='lam'+(modo==='presentar'?' pres':'')+(lamAncho()?' ancho':'')+(lamEsE()?' escenas':'');
  document.body.classList.add('leyendo');
  const hist=[...L.historia.map((h,i)=>'<button type="button" class="lam-paso" data-h="'+i+'" onclick="lamHistoria('+i+')"><i>'+(i+1)+'</i>'+esc(h.titulo)+'</button>'),
    '<button type="button" class="lam-paso" data-h="est" onclick="lamInicio()"><i>'+(L.historia.length+1)+'</i>'+esc(L.verTodo||'La estatua')+'</button>',
    '<button type="button" class="lam-paso" data-h="desp" onclick="lamHistoria(\'desp\')"><i>'+(L.historia.length+2)+'</i>'+esc(L.despues.titulo)+'</button>'].join('');
  el.innerHTML='<div class="lam-cab"><div class="lam-cabtx"><div class="lam-ant">'+esc(L.libro||'Daniel 2')+' · '+(modo==='presentar'?'presentación':'estudio interactivo')+'</div>'+
    '<div class="lam-tit">'+esc(L.titulo)+'</div></div><div class="lam-bots">'+
    (modo==='presentar'?'':'<button type="button" class="btn tono" onclick="lamAbre(\''+cid+'\',\'presentar\')">'+IC('play')+' Presentar</button>')+
    /* v191: pantalla completa donde el navegador la deja (el iPhone no). */
    (modo==='presentar'&&lamPuedeTodo()?'<button type="button" class="btn txt lam-full" onclick="lamPantalla()">'+IC('expandir')+' Pantalla completa</button>':'')+
    (modo==='presentar'?'<button type="button" class="btn txt lam-txt" id="lamTxt" aria-pressed="false" onclick="lamTexto()">'+IC('ojo')+' Ocultar texto</button>':'')+
    (modo==='presentar'&&L.comparar?'<button type="button" class="btn txt lam-cond2" aria-pressed="'+lamConD2+'" onclick="lamConD2Cambia()">'+IC('estatua')+' Con Daniel 2</button>':'')+
    '<button type="button" class="btn txt lam-cerrar" onclick="lamCierra()">'+IC('x')+' Cerrar</button></div></div>'+
    (modo==='presentar'?'':'<div class="lam-pasos">'+hist+'</div>')+
    lamEscena()+
    '<div class="lam-tiempo"><div class="lam-tcab"><button type="button" class="lam-play" id="lamPlay" onclick="lamRecorre()" aria-label="Recorrer la historia">'+IC('play')+'</button>'+
    '<div><div class="lam-tano" id="lamTano">Arrastra para recorrer la historia</div><div class="lam-tq" id="lamTq">De 605 a.C. hasta hoy, a escala</div></div></div>'+
    '<div class="lam-rango"><input type="range" id="lamRango" min="-620" max="2026" step="1" value="-620" aria-label="Año" style="--pista:'+lamPista()+'"></div>'+
    '<div class="lam-marcas">'+(L.marcas||[[-605,'605 a.C.'],[-331,'331<i> a.C.</i>',1],[-168,'168<i> a.C.</i>',1],[1,'1<i> d.C.</i>',1],[476,'476 d.C.'],[1798,'1798 d.C.'],[2026,'hoy',1]]).map(([y,t,ch])=>'<span'+(ch?' class="'+(ch===1?'chico':ch)+'"':'')+' style="left:'+lamPos(y)+'%">'+t+'</span>').join('')+'</div></div>'+
    (modo==='presentar'?'<div class="lam-ctl"><button type="button" id="lamAnt" onclick="lamAtras()">‹ Anterior</button><span id="lamCuenta"></span><button type="button" id="lamSig" class="pri" onclick="lamAdelante()">Siguiente ›</button></div>':
     '<div class="lam-carta"><h3>Daniel 2 y Daniel 7 dicen lo mismo</h3><div class="lam-desliza"><table class="lam-par"><tr>'+(L.paraleloCols||['Daniel 2','Daniel 7','Reino']).map(c=>'<th>'+c+'</th>').join('')+'</tr>'+
     L.paralelo.map(r=>'<tr><td><span class="lam-sw" style="--c:'+lamParte(r[0]).c+'"></span>'+esc(lamParte(r[0]).nombre)+'</td><td>'+r[1]+'</td><td>'+r[2]+'</td></tr>').join('')+
     '</table></div><p class="lam-fu">Fuente: '+L.paraleloFuente+'</p></div><div class="lam-carta"><h3>Pruébate</h3><div id="lamReto"></div></div>');
  document.getElementById('lamRango').addEventListener('input',e=>{lamPara();lamVeAnio(Number(e.target.value));});
  lamPrecarga(cid,document.getElementById('lamEsc'));
  if(modo==='presentar')lamPres(0);else{lamInicio();lamPintaReto();
    /* v209: al abrir, el título de la lámina un momento, como al empezar una película. */
    lamCartel(true,true);lamCartelT=setTimeout(()=>lamCartel(false),2600);}
  if(!el.__ocio){el.__ocio=true;['pointermove','pointerdown','focusin'].forEach(t=>el.addEventListener(t,lamDespierta,{passive:true}));}
  lamDespierta();
  const f=el.querySelector('.lam-cerrar');if(f)f.focus();
}
const lamPuedeTodo=()=>{const e=document.getElementById('lam');return !!(e&&(e.requestFullscreen||e.webkitRequestFullscreen));};
function lamPantalla(){
  const e=document.getElementById('lam');if(!e)return;
  const p=e.requestFullscreen?e.requestFullscreen():e.webkitRequestFullscreen&&e.webkitRequestFullscreen();
  if(p&&p.catch)p.catch(()=>{});
  const b=e.querySelector('.lam-full');if(b)b.hidden=true;
  if(e.__fs)return;e.__fs=true;
  e.addEventListener('fullscreenchange',()=>{const f=e.matches(':fullscreen');const bb=e.querySelector('.lam-full');if(bb)bb.hidden=f;
    e.classList.toggle('ancho',lamAncho()||f);lamAcerca(lamTodo(),0);},{once:false});
}
function lamCierra(){
  const el=document.getElementById('lam');
  if(!el||el.hidden)return;
  lamPara();lamCartel(false);clearTimeout(lamOcioT);lamCam++;if(lamEsE())lamLimpia();el.hidden=true;el.innerHTML='';lamModo='';
  document.body.classList.remove('leyendo');
}

/* ── La tarjeta dentro de la imagen ── */
function lamHoja(html){
  const h=document.getElementById('lamHoja');if(!h)return;
  h.classList.toggle('vacia',!html);
  h.innerHTML=html||'<p class="lam-pista">'+IC('lupa')+' '+esc(LAM().pista||'Toca una parte de la estatua, la piedra, el monte o una etiqueta. Arriba están los pasos del capítulo; abajo, la historia año por año.')+'</p>';
  h.scrollTop=0;
}
/* ── v209: EL CARTEL, LA FRANJA DE ORO Y LOS CONTROLES QUE SE APARTAN ──
   Camilo (14-oct): «como Hollywood, unas escenas que se diga que es algo muy
   profesional». El cartel de apertura es el título de una película: el capítulo,
   el nombre, el lugar y cuándo, y el versículo que abre la visión. Al presentar
   es el primer paso (la escena entera, sin texto al lado); al explorar se ve un
   momento y se va solo. Sus piezas entran en orden con transiciones de CSS. */
function lamCartelHTML(){
  const L=LAM(),c=L.cartel;if(!c)return '';
  const ci=c.cita||(L.inicio?{ref:L.inicio.ref,texto:L.inicio.texto}:null);
  return '<div class="lam-cartel '+(c.lado==='d'?'d':'i')+'" id="lamCartel"><div class="lam-cartel-in">'+
    '<div class="lam-cartel-ant" data-o="0">'+esc(L.libro||'Daniel 2')+'</div>'+
    '<div class="lam-cartel-tit" data-o="1">'+esc(L.titulo)+'</div><i class="lam-cartel-reg" data-o="2"></i>'+
    '<div class="lam-cartel-meta" data-o="2">'+esc(c.lugar)+' · '+esc(c.cuando)+'</div>'+
    (ci?'<p class="lam-cartel-cita" data-o="3"><q>'+esc(ci.texto)+'</q> <cite>'+esc(ci.ref)+'</cite></p>':'')+'</div></div>';
}
let lamCartelT=0;
const lamEnCartel=()=>{const l=document.getElementById('lam');return !!(l&&l.classList.contains('en-cartel'));};
function lamCartel(on,anima){
  clearTimeout(lamCartelT);
  const c=document.getElementById('lamCartel'),l=document.getElementById('lam'),e=document.getElementById('lamEsc');
  if(l)l.classList.toggle('en-cartel',!!(on&&c&&lamModo==='presentar'));
  if(e)e.classList.toggle('cartel',!!(on&&c));
  if(!c)return;
  if(!on){c.classList.remove('ve');return;}
  c.classList.toggle('quieto',!anima||lamQuieto());
  if(anima){c.classList.remove('ve');void c.offsetWidth;}
  c.classList.add('ve');
}
/* La franja de oro sobre la línea de tiempo: el periodo de la parte que se ve. */
function lamTramo(de,a){
  const w=document.querySelector('#lam .lam-rango');if(!w)return;
  let b=document.getElementById('lamTramo');
  if(de==null){if(b)b.classList.remove('ve');return;}
  if(!b){b=document.createElement('i');b.id='lamTramo';b.className='lam-tramo';w.appendChild(b);}
  const x0=lamPos(de)/100,x1=lamPos(Math.min(a==null?2026:a,2026))/100;
  b.style.left='calc(8px + (100% - 16px) * '+x0.toFixed(4)+')';b.style.width='max(6px, calc((100% - 16px) * '+(x1-x0).toFixed(4)+'))';
  b.classList.add('ve');
}
/* Al presentar, los botones se apartan si nadie mueve el mouse ni toca la pantalla
   (el control remoto no los despierta: pasa de paso sin que aparezcan). */
let lamOcioT=0;
function lamDespierta(){
  const e=document.getElementById('lam');if(!e)return;
  clearTimeout(lamOcioT);e.classList.remove('ocio');
  if(lamModo!=='presentar')return;
  lamOcioT=setTimeout(()=>{if(lamModo==='presentar')e.classList.add('ocio');},2800);
}
/* En el celular la imagen queda pegada arriba y la explicación debajo: si la
   explicación quedó fuera de la vista, sube lo justo para que empiece donde
   termina la imagen. */
function lamVeHoja(){
  if(lamAncho())return;
  const l=document.getElementById('lam'),h=document.getElementById('lamHoja'),e=document.getElementById('lamEsc');
  if(!l||!h||!e||!l.scrollBy)return;
  const pega=getComputedStyle(e).position==='sticky',eb=pega?e.getBoundingClientRect().bottom:0,t=h.getBoundingClientRect().top;
  if(t>innerHeight-160||t<eb-2)l.scrollBy({top:t-eb-10,behavior:lamQuieto()?'auto':'smooth'});
}
/* La piedra vuelve a su sitio (y se corta una caída a medias). */
let lamVuelo=0;
function lamPiedraArriba(){
  lamVuelo++;
  const pi=document.querySelector('#lamSvg .lam-piedra');
  if(pi){pi.style.opacity='1';pi.setAttribute('transform','translate('+PIEDRA0.join(' ')+')');}
}
/* v190: la escena de la historia, si la parte o el año tienen una. */
function lamEscenaHTML(e){
  if(!e)return '';
  /* v209: el pie de foto como el de un documental: el año aparte, en oro. */
  const m=/^([^·]{2,28}?) · (.+)$/.exec(e.t||''),cap=m?'<b>'+esc(m[1])+'</b><span>'+esc(m[2])+'</span>':'<span>'+esc(e.t)+'</span>';
  return '<figure class="lam-fig" data-f="'+e.f+'"><img src="'+lamSrc(e.f)+'" alt="'+esc(e.t)+'" loading="lazy"><figcaption>'+cap+'</figcaption></figure>';
}
/* v191: la escena de un paso de la historia, si su imagen existe (se prueba
   una vez); si no, la estatua se ve entera. */
const lamHayImg={};
let lamHistN=0;
/* v201: la escena de la historia a la izquierda (texto al lado) o a toda la
   escena (texto oculto, o fuera de Presentar en pantalla ancha). */
function lamHistGeo(){
  const svg=document.getElementById('lamSvg');if(!svg)return;
  const h=svg.querySelector('.lam-hist'),bg=svg.querySelector('.lam-hist-bg'),osc=svg.querySelector('.lam-hist-osc');
  /* v209: con el cartel de apertura la escena va entera, sin texto al lado. */
  const lado=lamAncho()&&!lamSinTexto&&!lamEnCartel(),ve=h.style.opacity==='1';
  [h,bg].forEach(im=>{im.setAttribute('x',lado?-135:-150);im.setAttribute('width',lado?1110:2050);/* v204: 1110 para que no quede bajo el texto */
    im.setAttribute('preserveAspectRatio',lado?'xMidYMid meet':'xMidYMid slice');});
  /* v203: fondo liso y oscuro, como una diapositiva. v209: lam-hist-bg ya no es una
     copia oscurecida: guarda la escena de antes durante el fundido (lamHist). */
  osc.style.opacity=ve&&lado?'1':'0';
  const e=document.getElementById('lamEsc');if(e)e.classList.toggle('lado',ve&&lado);
  /* v205: el svg del zoom y las marcas de encima, sobre el mismo rectángulo que la imagen. */
  const z=svg.querySelector('.lam-zoom'),so=document.getElementById('lamSobre');
  if(z){const r=lado?[-135,(1152-1110*675/1200)/2,1110,1110*675/1200]:[-150,0,2050,1152];
    ['x','y','width','height'].forEach((a,i)=>z.setAttribute(a,r[i].toFixed(1)));
    if(so){so.style.left=((r[0]+150)/20.5).toFixed(3)+'%';so.style.top=(r[1]/11.52).toFixed(3)+'%';so.style.width=(r[2]/20.5).toFixed(3)+'%';so.style.height=(r[3]/11.52).toFixed(3)+'%';}}
  if(typeof lamD2Pos==='function')lamD2Pos();
}
function lamHist(t){
  const svg=document.getElementById('lamSvg');if(!svg)return;
  const h=svg.querySelector('.lam-hist'),bg=svg.querySelector('.lam-hist-bg'),est=svg.querySelector('.lam-estatua');
  const yo=++lamHistN;
  if(!t||!t.f){h.style.opacity='0';bg.style.opacity='0';lamHistGeo();return;}
  /* v204: con el clicker los pasos van rápido; una imagen que llega tarde no pisa la del paso actual. */
  const src=lamSrc(t.f),pon=ok=>{lamHayImg[src]=ok;if(yo!==lamHistN)return;if(!ok){h.style.opacity='0';lamHistGeo();if(est)est.style.opacity='1';lamEnciende([]);return;}
    /* v209: FUNDIDO, nunca un salto. La escena de antes se queda abajo (lam-hist-bg)
       y la nueva entra encima con una animación de CSS (Safari-seguro). */
    const antes=h.getAttribute('href'),vista=h.style.opacity==='1';
    if(antes!==src){
      if(vista&&antes&&!lamQuieto()){bg.setAttribute('href',antes);bg.style.transition='none';bg.style.opacity='1';
        h.classList.remove('entra');h.setAttribute('href',src);void h.getBoundingClientRect();h.classList.add('entra');
        setTimeout(()=>{if(yo===lamHistN){bg.style.transition='';bg.style.opacity='0';}},900);}
      else h.setAttribute('href',src);}
    h.style.opacity='1';lamHistGeo();if(est)est.style.opacity='0';};
  if(src in lamHayImg){pon(lamHayImg[src]);return;}
  if(typeof Image==='undefined'){pon(false);return;}
  const im=new Image();im.onload=()=>pon(true);im.onerror=()=>pon(false);im.src=src;
}
const lamEscenaDe=id=>(LAM().escenas||[]).find(e=>e.parte===id);
/* v200: las escenas sin parte que caen en las fechas de una parte (597 y 586 en
   Babilonia, 1798 en Roma papal) salen también en su hoja, más chicas. */
const lamEnRango=(p,y)=>p.de!=null&&y>=p.de&&y<=p.a;
/* Cada escena sin parte va solo a la parte de rango más corto que la contiene (1798: Roma papal, no los dedos). */
const lamEscenasDe=p=>(LAM().escenas||[]).filter(e=>!e.parte&&lamEnRango(p,e.y)&&
  LAM().partes.filter(q=>lamEnRango(q,e.y)).sort((x,z)=>(x.a-x.de)-(z.a-z.de))[0]===p);
function lamEscenasHTML(p){
  const m=lamEscenasDe(p);
  return lamEscenaHTML(lamEscenaDe(p.id))+(m.length?'<div class="lam-mas">'+m.map(e=>lamEscenaHTML(Object.assign({},e,{t:e.c||e.t}))).join('')+'</div>':'');
}
const lamEscenaAnio=y=>(LAM().escenas||[]).filter(e=>e.y<=y).pop();
function lamHojaParte(p,i,n){
  /* v204: en Daniel 7 la imagen grande ya es la bestia: las escenas de la historia van al final, en fila. */
  if(lamEsE()){const es=[lamEscenaDe(p.id),...lamEscenasDe(p)].filter(e=>e&&e.f!==p.img);
    return lamHojaParteTx(p,i,n,lamExtraE(p)+(es.length?'<div class="lam-mas lam-figs">'+es.map(e=>lamEscenaHTML(Object.assign({},e,{t:e.c||e.t}))).join('')+'</div>':''));}
  return lamEscenasHTML(p)+lamHojaParteTx(p,i,n,'');
}
function lamHojaParteTx(p,i,n,figs){
  return '<div class="lam-hcab"><span class="lam-metal" style="--c:'+p.c+'"></span><div><div class="lam-p1">'+esc(p.nombre)+'</div>'+
    '<div class="lam-p2">'+esc(p.reino)+'</div><div class="lam-fechas">'+esc(p.fechas)+'</div></div>'+
    (lamModo==='presentar'?'':'<button type="button" class="lam-x" aria-label="Cerrar la explicación" onclick="lamInicio()">'+IC('x')+'</button>')+'</div>'+
    '<div class="lam-capa t"><div class="lam-rot">Lo que dice el texto · RV1995</div><p><q>'+esc(p.texto)+'</q> <span class="lam-ref">'+p.ref+'</span></p><p><q>'+esc(p.texto2)+'</q> <span class="lam-ref">'+p.ref2+'</span></p></div>'+
    '<div class="lam-capa i"><div class="lam-rot">Lo que significa · interpretación</div>'+(lamModo==='presentar'?'<p>'+esc(p.corto)+'</p>':p.interp.map(x=>'<p>'+x+'</p>').join(''))+'<div class="lam-fu">Fuente: '+p.fuente+'</div></div>'+figs+
    (lamModo==='presentar'?'':'<div class="lam-nav"><button type="button" class="btn tono" '+(i>0?'':'disabled ')+'onclick="lamElige('+(i-1)+')">‹ Anterior</button><span>'+(i+1)+' de '+n+'</span>'+
    '<button type="button" class="btn ver" '+(i<n-1?'':'disabled ')+'onclick="lamElige('+(i+1)+')">Siguiente ›</button></div>');
}
function lamHojaTexto(t){
  return '<div class="lam-hcab"><div><div class="lam-p1">'+esc(t.ref)+'</div><div class="lam-p2">'+esc(t.titulo)+'</div></div>'+
    (lamModo==='presentar'?'':'<button type="button" class="lam-x" aria-label="Cerrar" onclick="lamInicio()">'+IC('x')+'</button>')+'</div>'+
    '<div class="lam-capa t"><div class="lam-rot">Lo que dice el texto · RV1995</div><p><q>'+esc(t.texto)+'</q></p></div><p class="lam-nota">'+t.nota+'</p>';
}
function lamMarcaPaso(k){document.querySelectorAll('.lam-pasos .lam-paso').forEach(b=>b.classList.toggle('on',b.getAttribute('data-h')===String(k)));}

/* ── Explorar ── */
function lamInicio(){
  if(lamEsE())return lamInicioE();
  lamHist(null);lamSel='';lamEnciende([]);lamEtiquetas(true);lamHoja('');lamMarcaPaso('est');lamChip(null);lamTramo(null);
  const svg=document.getElementById('lamSvg');
  if(svg){lamMonte('no');svg.querySelector('.lam-estatua').style.opacity='1';lamPiedraArriba();}
  lamAcerca(lamTodo(),650);
}
function lamToca(id){
  /* En Presentar, tocar una parte lleva a SU paso (antes avanzaba uno). */
  if(lamEsE()&&lamModo!=='presentar'){lamElige(LAM().partes.findIndex(p=>p.id===id));return;}
  if(lamModo==='presentar'){const k=lamPasos().findIndex(x=>x.tipo==='parte'&&x.id===id);lamPres(k>=0&&k!==lamPaso?k:lamPaso+1);return;}
  if(lamSel===id){lamInicio();return;}
  lamElige(LAM().partes.findIndex(p=>p.id===id));
}
function lamElige(i){
  if(lamEsE())return lamEligeE(i);
  const L=LAM(),p=L.partes[i];if(!p)return;
  const av=document.getElementById('lamAviso');if(av)av.classList.add('fuera');
  lamPara();lamHist(null);lamSel=p.id;lamMarcaPaso('est');
  const svg=document.getElementById('lamSvg');
  const esMonte=p.id==='monte',esPiedra=p.id==='piedra';
  if(!esMonte)lamMonte('no');
  svg.querySelector('.lam-estatua').style.opacity=esMonte?'0':'1';
  /* v189: el reino de antes y el de después se ven en otro tono, a media luz:
     se lee de dónde viene y a dónde va (Camilo, 13-oct). */
  const T=L.tiempo,k=T.indexOf(p.id),vec=k<0?[]:[T[k-1],T[k+1]].filter(Boolean);
  lamEnciende(esMonte||esPiedra?[]:[p.id],[],vec);lamEtiquetas(false);
  lamAcerca(esMonte||esPiedra?lamTodo():lamCaja(p.id),650);
  /* v187: también en Explorar la piedra cae y golpea los pies (2:34), y el
     monte nace del polvo que se lleva el viento (2:35). */
  const pi=svg.querySelector('.lam-piedra');
  if(esPiedra){lamPiedraArriba();lamCae(pi);}
  else if(esMonte){lamVuelo++;pi.style.opacity='1';pi.setAttribute('transform','translate('+L.golpe[0]+' '+L.golpe[1]+') rotate(40)');lamPolvo(svg);setTimeout(()=>{if(lamSel==='monte')lamMonte('crece');},500);}
  else lamPiedraArriba();
  lamHoja(lamHojaParte(p,i,L.partes.length));lamVeHoja();
  /* v209: el nombre como un rótulo de documental, y su periodo en oro sobre la línea de tiempo. */
  lamChip(p);lamTramo(p.de,p.a);
}
function lamHistoria(k){
  const L=LAM(),t=k==='desp'?L.despues:L.historia[k];if(!t)return;
  lamTramo(null);
  if(lamEsE()){lamPara();lamLimpia();lamSel='';lamMarcaPaso(k);lamEnciende([]);lamChip(null);lamD2(null);lamHist(t);lamHoja(lamHojaTexto(t));lamVeHoja();return;}
  lamPara();lamChip(null);lamSel='';lamMarcaPaso(k);lamEnciende(['__ninguna']);lamEtiquetas(false);lamAcerca(lamTodo(),650);
  const svg=document.getElementById('lamSvg');
  if(svg){lamMonte('no');svg.querySelector('.lam-estatua').style.opacity='1';lamPiedraArriba();}
  lamHist(t);
  lamHoja(lamHojaTexto(t));lamVeHoja();
}

/* ── La línea de tiempo ── */
const lamPos=y=>(y+620)/(2026+620)*100;
function lamPista(){
  const L=LAM();
  const seg=L.tiempo.filter(id=>!(L.solapa||['barro']).includes(id)).map(id=>{const p=lamParte(id);return p.c+' '+lamPos(p.de)+'% '+lamPos(Math.min(p.a,2026))+'%';});
  return 'linear-gradient(90deg,#4a4032 0% '+lamPos(-605)+'%,'+seg.join(',')+')';
}
/* Qué gobernaba en el año y: las partes encendidas y la frase. */
function lamQuien(y){
  const on=[],suave=[];
  for(const id of LAM().tiempo){const p=lamParte(id);if(y>=p.de&&y<p.a)on.push(id);}
  const [hd,hs]=LAM().herida||['dedos','barro'];
  if(y>=1798&&on.includes(hd))suave.push(hs);
  const n=on.map((id,i)=>{const r=lamParte(id).reino;return i&&/^El /.test(r)?'e'+r.slice(1):r;});
  let tx=!on.length?'Antes de Nabucodonosor':n.join(' y ');
  if(suave.length)tx+='; el papado, herido en 1798, se va sanando (Ap 13:3)';
  return {on,suave,tx};
}
function lamVeAnio(y){
  lamAnio=y;lamSel='';lamMarcaPaso('est');lamTramo(null);
  const q=lamQuien(y);
  if(lamEsE()){
    /* La imagen es la del reino más preciso de ese año (en 1520, el cuerno y no los diez cuernos). */
    const p=q.on.map(lamParte).sort((x,z)=>(x.a-x.de)-(z.a-z.de))[0];
    lamLimpia();lamHist({f:p?p.img:LAM().inicioF});lamChip(p||null);lamD2(p?p.id:null);lamEnciende(q.on);
    const av=document.getElementById('lamAviso');if(av)av.classList.add('fuera');
  }else{
  lamHist(null);lamEtiquetas(false);lamChip(null);
  const svg=document.getElementById('lamSvg');
  lamMonte('no');svg.querySelector('.lam-estatua').style.opacity='1';lamPiedraArriba();
  lamEnciende(q.on.length?q.on:['__ninguna'],q.suave);
  lamAcerca(lamTodo(),0);
  }
  document.getElementById('lamTano').textContent=lamAnioTx(y);
  document.getElementById('lamTq').textContent=q.tx;
  /* El año va en la explicación, no sobre la imagen. */
  /* Al recorrer solo, el año cambia veinte veces por segundo: la escena se
     vuelve a pintar solo cuando cambia, si no parpadea. */
  const esA=lamEscenaAnio(y),hj=document.getElementById('lamHoja'),txt='<div class="lam-hcab"><div><div class="lam-p1">La historia, año por año</div><div class="lam-p2 lam-fechas">'+lamAnioTx(y)+'</div></div></div><p class="lam-nota">'+esc(q.tx)+'</p>';
  const fig=hj&&hj.querySelector('.lam-fig'),igual=fig?(esA&&fig.getAttribute('data-f')===esA.f):!esA;
  if(hj&&igual&&hj.querySelector('.lam-anio-tx')){hj.querySelector('.lam-anio-tx').innerHTML=txt;hj.classList.remove('vacia');}
  else lamHoja(lamEscenaHTML(esA)+'<div class="lam-anio-tx">'+txt+'</div>');
  const r=document.getElementById('lamRango');if(r&&Number(r.value)!==y)r.value=y;
}
/* El botón recorre la historia sola, de 605 a.C. a hoy, en unos 14 segundos. */
function lamRecorre(){
  if(lamCorre){lamPara();return;}
  lamParaVision();
  const r=document.getElementById('lamRango'),H=LAM().hitos||[];let y=Number(r.value),espera=0;if(y>=2026)y=-620;
  const b=document.getElementById('lamPlay');if(b)b.classList.add('on');
  /* v205: en los años clave (476, 538, 1798, 1844…) se detiene un segundo. */
  lamCorre=setInterval(()=>{if(espera>0){espera--;return;}const y0=y;y+=Math.max(4,Math.round((2026+620)/280));
    const h=H.find(v=>v>y0&&v<=y);if(h!=null){y=h;espera=lamQuieto()?0:22;}
    if(y>=2026){y=2026;lamVeAnio(y);lamPara();return;}lamVeAnio(y);},50);
}
function lamPara(){if(lamModo!=='presentar')lamCartel(false);lamSenasN++;if(lamCorre){clearInterval(lamCorre);lamCorre=0;}const b=document.getElementById('lamPlay');if(b)b.classList.remove('on');if(typeof lamParaVision==='function')lamParaVision();}

/* ── Pruébate ── */
function lamPintaReto(){
  const L=LAM(),el=document.getElementById('lamReto');if(!el)return;
  if(lamReto>=L.reto.length){el.innerHTML='<div class="lam-q">Terminaste: '+lamBien+' de '+L.reto.length+'.</div><button type="button" class="btn tono" onclick="lamOtraVez()">Otra vez</button>';return;}
  const x=L.reto[lamReto];lamListo=false;
  el.innerHTML='<div class="lam-nota">Pregunta '+(lamReto+1)+' de '+L.reto.length+'</div><div class="lam-q">'+esc(x.q)+'</div><div class="lam-ops">'+
    L.partes.filter(p=>!(L.retoSin||['monte']).includes(p.id)).map(p=>'<button type="button" data-id="'+p.id+'" onclick="lamResponde(\''+p.id+'\')"><span class="lam-sw" style="--c:'+p.c+'"></span>'+esc(p.nombre)+'</button>').join('')+
    '</div><div class="lam-fb" id="lamFb" aria-live="polite"></div>';
}
function lamOtraVez(){lamReto=0;lamBien=0;lamPintaReto();}
function lamResponde(id){
  if(lamListo)return;lamListo=true;
  const x=LAM().reto[lamReto],ok=id===x.ok,el=document.getElementById('lamReto');if(ok)lamBien++;
  el.querySelectorAll('.lam-ops button').forEach(b=>{const k=b.getAttribute('data-id');if(k===x.ok)b.classList.add('ok');else if(k===id)b.classList.add('mal');});
  document.getElementById('lamFb').innerHTML=(ok?'<strong>Bien.</strong> ':'<strong>Era otra.</strong> ')+esc(x.e);
  setTimeout(()=>{lamReto++;lamPintaReto();},2200);
}

/* ── Presentar ── */
const lamPasos=()=>{const L=LAM();if(L.tipo==='escenas')return lamPasosE();return [{tipo:'portada'},...L.historia.map((h,i)=>({tipo:'hist',i})),...L.tiempo.map(id=>({tipo:'parte',id})),
  {tipo:'parte',id:'piedra',anim:'cae'},{tipo:'parte',id:'monte',anim:'monte'},{tipo:'desp'},{tipo:'cierre'}];};
function lamPres(k){
  if(lamEsE())return lamPresE(k);
  const pasos=lamPasos();if(k<0||k>=pasos.length)return;
  const dir=k>lamPaso?1:-1;lamPaso=k;lamPara();lamVuelo++;const s=pasos[k],L=LAM(),svg=document.getElementById('lamSvg');
  lamCartel(k===0,true);
  const vistos=pasos.slice(1,k+1).filter(x=>x.tipo==='parte').map(x=>x.id),rotos=vistos.includes('monte');
  const est=svg.querySelector('.lam-estatua');est.style.opacity=rotos?'0':'1';
  if(s.tipo==='parte'&&L.tiempo.includes(s.id))lamEnciende([s.id],vistos.filter(v=>v!==s.id));
  /* La portada muestra la estatua entera; la historia, a media luz. */
  else if(s.tipo==='hist')lamEnciende(['__ninguna']);
  else lamEnciende([]);
  lamEtiquetas(false);
  const piedra=svg.querySelector('.lam-piedra');
  piedra.style.opacity=(s.id==='piedra')?'1':'0';
  const verMonte=rotos||s.tipo==='desp'||s.tipo==='cierre';
  piedra.setAttribute('transform','translate('+PIEDRA0.join(' ')+')');
  if(s.anim==='cae'&&dir>0)lamCae(piedra);
  else if(s.id==='piedra')piedra.setAttribute('transform','translate('+L.golpe[0]+' '+L.golpe[1]+') rotate(40)');
  if(s.anim==='monte'&&dir>0){lamMonte('no');lamPolvo(svg);setTimeout(()=>{if(lamPasos()[lamPaso]&&lamPasos()[lamPaso].anim==='monte')lamMonte('crece');},500);}
  else lamMonte(verMonte?'ya':'no');
  lamAcerca(s.tipo==='parte'&&L.tiempo.includes(s.id)?lamCaja(s.id):lamTodo(),900);
  const ult=vistos.filter(id=>L.tiempo.includes(id)).pop();
  if(ult){const p=lamParte(ult);const r=document.getElementById('lamRango');r.value=Math.min(p.a,2026);
    document.getElementById('lamTano').textContent=lamAnioTx(p.de)+' – '+(p.a>=2026?'hoy':lamAnioTx(p.a));document.getElementById('lamTq').textContent=p.reino;}
  lamHist(s.tipo==='hist'?L.historia[s.i]:s.tipo==='desp'?L.despues:null);
  const pp=s.tipo==='parte'?lamParte(s.id):null;lamChip(pp);lamTramo(pp?pp.de:null,pp?pp.a:null);
  if(s.tipo==='portada')lamHoja('<div class="lam-hcab"><div><div class="lam-p1">Daniel 2</div><div class="lam-p2">'+esc(L.titulo)+'</div></div></div>'+
    '<div class="lam-capa t"><div class="lam-rot">'+L.inicio.ref+' · RV1995</div><p><q>'+esc(L.inicio.texto)+'</q></p></div><p class="lam-nota">Cuatro reinos, Roma en tres fases (y una cuarta: el papado sanado de su herida) y un reino que no será jamás destruido.</p>');
  else if(s.tipo==='hist')lamHoja(lamHojaTexto(L.historia[s.i]));
  else if(s.tipo==='desp')lamHoja(lamHojaTexto(L.despues));
  else if(s.tipo==='cierre')lamHoja(lamHojaTexto({ref:L.cierre.ref,titulo:L.cierre.titulo,texto:L.cierre.texto,nota:esc(L.cierre.nota)}));
  else lamHoja(lamHojaParte(lamParte(s.id),0,1));
  document.getElementById('lamCuenta').textContent=(k+1)+' / '+pasos.length;
  document.getElementById('lamAnt').disabled=k===0;document.getElementById('lamSig').disabled=k===pasos.length-1;
}
function lamAtras(){lamPres(lamPaso-1);}
function lamAdelante(){lamPres(lamPaso+1);}
function lamCae(piedra){
  const [gx,gy]=LAM().golpe;
  if(lamQuieto()){piedra.setAttribute('transform','translate('+gx+' '+gy+') rotate(40)');return;}
  const t0=performance.now(),ms=1100,[x0,y0]=PIEDRA0,yo=++lamVuelo;
  const f=t=>{if(yo!==lamVuelo)return;const k=Math.min(1,(t-t0)/ms),e=k*k;
    piedra.setAttribute('transform','translate('+(x0+(gx-x0)*e)+' '+(y0+(gy-y0)*e)+') rotate('+(k*300)+')');
    if(k<1)requestAnimationFrame(f);else{const est=piedra.parentNode.querySelector('.lam-estatua');
      /* La estatua tiembla al golpe (atributo transform, ver lamPolvo). */
      if(est){const s0=performance.now(),sh=tt=>{const k=Math.min(1,(tt-s0)/380),a=Math.sin(k*Math.PI*4)*12*(1-k);
        est.setAttribute('transform','translate('+a.toFixed(1)+' '+(a/4).toFixed(1)+')');if(k<1)requestAnimationFrame(sh);else est.removeAttribute('transform');};requestAnimationFrame(sh);}}};
  requestAnimationFrame(f);
}
/* v189: EL MONTE (Camilo, 13-oct: «es el reino de Dios establecido, la
   animación no es suficiente»). La piedra «se hizo un gran monte que llenó
   toda la tierra» (2:35): el monte nace DESDE el punto donde golpeó la
   piedra, en un círculo de luz que crece hasta cubrir toda la escena, y la
   piedra se funde en esa luz. modo: 'no' (escondido), 'ya' (completo, sin
   animar) o 'crece'. */
function lamMonte(modo){
  const svg=document.getElementById('lamSvg');if(!svg)return;
  const L=LAM(),m=svg.querySelector('.lam-monte'),luz=svg.querySelector('.lam-luz'),yo=++lamCrece;
  /* El centro del círculo, en % de la imagen del monte (x -150..1900, y 0..1152). */
  const cx=((L.golpe[0]+150)/2050*100).toFixed(1)+'%',cy=(L.golpe[1]/1152*100).toFixed(1)+'%';
  const recorta=r=>{const v='circle('+r.toFixed(1)+'% at '+cx+' '+cy+')';m.style.clipPath=v;m.style.webkitClipPath=v;};
  const pinta=r=>luz.querySelectorAll('circle').forEach(c=>c.setAttribute('r',(r*+c.getAttribute('data-f')).toFixed(1)));
  if(modo==='no'||modo==='ya'||lamQuieto()){
    m.style.opacity=modo==='no'?'0':'1';recorta(modo==='no'?0:150);pinta(0);luz.style.opacity='0';return;}
  m.style.opacity='1';recorta(0);
  const t0=performance.now(),ms=4200,pi=svg.querySelector('.lam-piedra');
  const f=t=>{if(yo!==lamCrece)return;
    /* Primero la piedra brilla (un sexto del tiempo); después el monte crece
       despacio al principio, rápido en medio y se asienta al final. */
    const k=Math.min(1,(t-t0)/ms),q=Math.max(0,(k-.16)/.84),e=(1-Math.cos(Math.PI*q))/2;
    recorta(150*e);
    /* La luz va delante del monte y se apaga al final. */
    pinta(k<.16?60+k/.16*200:260+950*e);luz.style.opacity=String(k<.75?Math.min(1,k*5):Math.max(0,(1-k)/.25));
    if(pi)pi.style.opacity=String(Math.max(0,1-q*2.5));
    if(k<1)requestAnimationFrame(f);};
  requestAnimationFrame(f);
}
let lamCrece=0;
/* La estatua se hace «tamo» y se lo lleva el viento (2:35). */
function lamPolvo(svg){
  const capa=svg.querySelector('.lam-polvo');
  if(lamQuieto()){capa.innerHTML='';return;}
  const L=LAM(),col={oro:'#E9C255',plata:'#C9D1DA',bronce:'#C27A42',hierro:'#56606C',barro:'#B9805E',dedos:'#B9805E'};let h='';
  L.capas.forEach(id=>{const [x,y,w,hh]=L.cajas[id],n=id==='dedos'?20:70;
    for(let i=0;i<n;i++){const px=x+Math.random()*w,py=y+Math.random()*hh,r=5+Math.random()*13;
      h+='<path d="M'+px.toFixed(1)+' '+(py-r).toFixed(1)+'l'+r.toFixed(1)+' '+(r*1.6).toFixed(1)+'h'+(-r*2).toFixed(1)+'z" fill="'+col[id]+'"/>';}});
  capa.innerHTML=h;
  /* v190: se mueve con el atributo transform en cada cuadro, no con
     el.animate(): en Safari las animaciones de transform sobre SVG no siempre
     corren y el polvo se quedaba quieto. */
  const ps=[...capa.querySelectorAll('path')].map(el=>({el,dx:450+Math.random()*900,dy:-160+Math.random()*220,gi:Math.random()*540,
    d:1400+Math.random()*900,t:Math.random()*350}));
  const t0=performance.now();
  const f=t=>{let vivos=0;
    ps.forEach(p=>{const k=Math.max(0,Math.min(1,(t-t0-p.t)/p.d)),e=1-Math.pow(1-k,2.2);if(k<1)vivos++;
      p.el.setAttribute('transform','translate('+(p.dx*e).toFixed(1)+' '+(p.dy*e).toFixed(1)+')');p.el.setAttribute('fill-opacity',(1-k).toFixed(2));});
    if(vivos)requestAnimationFrame(f);else capa.innerHTML='';};
  requestAnimationFrame(f);
}
/* v191: si la ventana cambia (girar la tableta, achicar el navegador), la
   presentación se reacomoda sin cerrarla. */
if(typeof addEventListener==='function')addEventListener('resize',()=>{
  if(lamModo!=='presentar')return;
  const e=document.getElementById('lam');if(!e)return;
  const a=lamAncho()||(e.matches&&e.matches(':fullscreen'));
  if(e.classList.contains('ancho')!==a){e.classList.toggle('ancho',a);lamPres(lamPaso);}
});
/* v201: «Ocultar texto» (o la tecla T) deja la imagen sola mientras se explica de palabra. */
function lamTexto(){
  lamSinTexto=!lamSinTexto;
  const e=document.getElementById('lam');if(e)e.classList.toggle('sin-texto',lamSinTexto);
  const b=document.getElementById('lamTxt');
  if(b){b.setAttribute('aria-pressed',String(lamSinTexto));b.innerHTML=IC('ojo')+(lamSinTexto?' Mostrar texto':' Ocultar texto');}
  lamHistGeo();
}
document.addEventListener('keydown',e=>{
  if(!lamModo)return;
  if(e.key==='Escape'){lamCierra();return;}
  if(lamModo!=='presentar')return;
  if(e.key==='t'||e.key==='T'){lamTexto();return;}
  if(['ArrowRight','ArrowDown','PageDown',' ','Enter'].includes(e.key)){e.preventDefault();lamPres(lamPaso+1);}
  else if(['ArrowLeft','ArrowUp','PageUp','Backspace'].includes(e.key)){e.preventDefault();lamPres(lamPaso-1);}
});

/* ── v204: láminas de escenas (Daniel 7) ──
   Una imagen entera por parte, en la misma capa que las escenas de la historia
   de Daniel 2 (lamHist): ocupa toda la escena y, al presentar en pantalla
   ancha, va a la izquierda con el texto a la derecha; «Ocultar texto» la deja
   sola. Las partes se eligen en una tira de botones con su miniatura bajo la
   imagen. La línea de tiempo, la hoja de cada parte, Pruébate y el paralelo
   son los mismos de Daniel 2.
   v205 (Camilo: «lo más interactivo posible», para estudiar y para sus clases):
   - Con Daniel 2: al lado de la imagen, la estatua chica enciende el metal de
     cada parte (sale de `paralelo`, cuarta columna; Daniel 8 puede reusarlo).
   - Las bestias suben del mar una por paso (`sube`).
   - Los diez cuernos se cuentan y tres caen ante el cuerno pequeño (`cuernos`).
   - El juicio y el Hijo del hombre por pasos: la imagen se acerca a cada parte
     del texto (`pasos` de la parte, como lamAcerca pero dentro de la imagen).
   - Las once señas del cuerno se encienden una por una (`senas`).
   Encima de la imagen hay un <svg> anidado con las mismas medidas que ella
   (lamZoom, en píxeles de la imagen, 1200 × 675): ahí se acerca, sube y se
   arma lo que se mueve. Las marcas y la estatua van en HTML (lamSobre), sobre
   el mismo rectángulo, para que la letra no se encoja en el celular. Sin url(#)
   ni el.animate(): todo con requestAnimationFrame y transiciones de CSS. */
let lamAnim=0,lamConD2=true,lamD2Id=null,lamVis=0,lamSenasN=0,lamVisto='';
const lamZ=()=>document.getElementById('lamZoom');
const lamZi=()=>{const z=lamZ();return z&&z.querySelector('.lam-zoom-img');};
const lamPx=x=>(x/12).toFixed(2)+'%',lamPy=y=>(y/6.75).toFixed(2)+'%';
const lamSuave=k=>k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2;
const lamSale=k=>1-Math.pow(1-k,3);
/* Una animación que se corta sola si la vista cambia; sin movimiento, el final de una vez. */
function lamTween(ms,fn,fin){
  const yo=lamAnim;if(lamQuieto()||!ms){fn(1);if(fin)fin();return;}
  const t0=performance.now(),f=t=>{if(yo!==lamAnim)return;const k=Math.min(1,(t-t0)/ms);fn(k);if(k<1)requestAnimationFrame(f);else if(fin)fin();};
  requestAnimationFrame(f);
}
const lamT=(fn,ms)=>{const yo=lamAnim;setTimeout(()=>{if(yo===lamAnim)fn();},lamQuieto()?0:ms);};
/* ¿Existe la imagen? Se prueba una vez, como en lamHist: las capas que todavía no
   llegaron (cuerno-suelto.png, leon-solo.png…) dan 404 y se usa la foto entera. */
const lamHayP={};
function lamExiste(src){
  if(src in lamHayImg)return Promise.resolve(lamHayImg[src]);
  return lamHayP[src]||(lamHayP[src]=new Promise(ok=>{if(typeof Image==='undefined'){ok(false);return;}
    const im=new Image();im.onload=()=>{lamHayImg[src]=true;ok(true);};im.onerror=()=>{lamHayImg[src]=false;ok(false);};im.src=src;}));
}

function lamEscenaE(){
  const L=LAM(),f=lamSrc(L.inicioF),pres=lamModo==='presentar';
  const bots='<div class="lam-tira-bots"><button type="button" class="btn tono lam-vision" id="lamVision" aria-pressed="false" onclick="lamVision()">'+IC('play')+' Ver la visión</button>'+
    (L.comparar?'<button type="button" class="btn txt lam-cond2" aria-pressed="'+lamConD2+'" onclick="lamConD2Cambia()">'+IC('estatua')+' Con Daniel 2</button>':'')+'</div>';
  const tira=pres?'':'<div class="lam-tira-c"><div class="lam-tira-cab"><div class="lam-tira-t">Las partes de la visión · elige una</div>'+bots+'</div><div class="lam-tira" id="lamTira">'+
    L.partes.map((p,i)=>'<button type="button" class="lam-tb" data-p="'+p.id+'" style="--c:'+p.c+'" onclick="lamElige('+i+')"><img src="'+lamSrc(p.img)+'" alt="" loading="lazy">'+
      '<span><b>'+esc(p.nombre)+'</b><small>'+esc(p.reino)+'</small><small class="f">'+esc(p.fechas).replace(/ ([ad])\.C\./g,'&nbsp;$1.C.')+'</small></span></button>').join('')+'</div></div>';
  return '<div class="lam-marco"><div class="lam-esc cargando" id="lamEsc"><div class="lam-carga" aria-hidden="true"><i></i>Preparando la imagen…</div>'+
    '<svg class="lam-svg" id="lamSvg" viewBox="'+lamTodo().join(' ')+'" role="img" aria-label="'+esc(L.titulo)+'">'+
    '<rect class="lam-hist-osc" x="-150" y="0" width="2050" height="1152" fill="#0E0D0B"/>'+
    '<image class="lam-hist-bg" href="" x="-150" y="0" width="2050" height="1152" preserveAspectRatio="xMidYMid slice"/>'+
    '<image class="lam-hist" href="'+f+'" x="-150" y="0" width="2050" height="1152" preserveAspectRatio="xMidYMid slice"/>'+
    '<svg class="lam-zoom" id="lamZoom" x="-150" y="0" width="2050" height="1152" viewBox="0 0 1200 675" preserveAspectRatio="xMidYMid slice">'+
    '<image class="lam-zoom-img" href="" x="0" y="0" width="1200" height="675" preserveAspectRatio="xMidYMid slice"/><g class="lam-capa-g"></g></svg></svg>'+
    '<div class="lam-sobre" id="lamSobre"><div class="lam-marcas-img" id="lamMarcasImg"></div>'+lamD2HTML()+'<div class="lam-tabla" id="lamTabla" hidden></div></div>'+
    '<div class="lam-chip" id="lamChip" hidden></div>'+lamCartelHTML()+
    (pres?'':'<div class="lam-aviso" id="lamAviso">Elige una parte abajo</div>')+'</div>'+
    tira+'<div class="lam-hoja" id="lamHoja" aria-live="polite"></div></div>';
}
/* El nombre y las fechas de la parte, sobre la imagen (se lee aun con el texto
   oculto); `extra`: el paso del juicio o la seña. Con Daniel 2, también su par. */
function lamChip(p,extra){
  const c=document.getElementById('lamChip');if(!c)return;
  c.hidden=!p;if(!p)return;
  c.style.setProperty('--c',p.c);
  const L=LAM(),r=L.comparar&&lamConD2&&(L.paralelo||[]).find(x=>x[0]===p.id);
  c.innerHTML='<b>'+esc(p.nombre)+'</b><span>'+esc(p.reino)+' · '+esc(p.fechas)+'</span>'+
    (extra?'<span class="sub">'+(Array.isArray(extra)?esc(extra[0])+'<em> · '+esc(extra[1])+'</em>':esc(extra))+'</span>':'')+
    (r?'<span class="d2">'+(r[3]?'En Daniel 2: '+esc(r[1]):esc(L.agrega||r[1]))+'</span>':'');
  lamD2Pos();
}

/* ── Con Daniel 2: la estatua chica ── */
function lamD2HTML(){
  const L=LAM(),C=LAMINAS[L.comparar];if(!C||!C.marcoEstatua)return '';
  const [vx,vy,vw,vh]=C.marcoEstatua,pc=(v,t)=>(v/t*100).toFixed(2)+'%';
  const nom=k=>{const q=C.partes.find(p=>p.id===k);return q?q.nombre:k;},de=k=>(L.paralelo||[]).some(r=>r[3]===k);
  const capas=C.capas.map(k=>'<img src="'+lamRuta(C,k)+'" alt="" data-p="'+k+'" style="left:'+pc(C.ox-vx,vw)+';top:'+pc(-vy,vh)+';width:'+pc(768,vw)+';height:'+pc(1152,vh)+'">').join('');
  /* Para tocar: las partes chicas encima de las grandes. */
  const hits=C.capas.filter(de).sort((a,b)=>C.cajas[b][2]*C.cajas[b][3]-C.cajas[a][2]*C.cajas[a][3]).map(k=>{const [x,y,w,h]=C.cajas[k];
    return '<button type="button" class="lam-d2-hit" data-p="'+k+'" aria-label="'+esc(nom(k))+'" style="left:'+pc(x-vx,vw)+';top:'+pc(y-vy,vh)+';width:'+pc(w,vw)+';height:'+pc(h,vh)+'" onclick="lamTocaD2(\''+k+'\')"></button>';}).join('');
  const pie=['piedra','monte'].filter(de).map(k=>'<button type="button" class="lam-d2-'+k+'" data-p="'+k+'" aria-label="'+esc(nom(k))+'" onclick="lamTocaD2(\''+k+'\')"><img src="'+lamRuta(C,k)+'" alt=""></button>').join('');
  return '<div class="lam-d2" id="lamD2" hidden><div class="lam-d2-t">'+esc(C.libro||'Daniel 2')+'</div>'+
    '<div class="lam-d2-est" role="group" aria-label="La estatua de '+esc(C.libro||'Daniel 2')+'">'+capas+hits+'</div><div class="lam-d2-pie">'+pie+'</div><div class="lam-d2-ag" id="lamD2Ag"></div></div>';
}
/* Enciende en la estatua lo que corresponde a la parte `id` (null: se esconde). */
function lamD2(id){
  lamD2Id=id;
  const el=document.getElementById('lamD2');if(!el)return;
  const L=LAM(),r=id&&(L.paralelo||[]).find(x=>x[0]===id);
  el.hidden=!lamConD2||!r;
  /* Donde la acción está a la derecha (los cuernos que vuelan), la estatua va a la izquierda. */
  const so=document.getElementById('lamSobre'),izq=!!r&&(L.d2Izq||[]).includes(id),e=document.getElementById('lamEsc');
  if(so){so.classList.toggle('con-d2',!el.hidden);so.classList.toggle('d2-izq',izq);}if(e)e.classList.toggle('d2-izq',!el.hidden&&izq);
  if(!r)return;
  const k=r[3];el.classList.toggle('agrega',!k);el.setAttribute('data-on',k||'');
  el.querySelectorAll('[data-p]').forEach(x=>x.classList.toggle('on',x.getAttribute('data-p')===k));
  const ag=document.getElementById('lamD2Ag');if(ag)ag.textContent=k?'':'+ '+(lamParte(id).nombre);
  lamD2Pos();
}
/* Con la estatua a la izquierda, empieza debajo de la etiqueta de la parte (que cambia de alto). */
function lamD2Pos(){
  const el=document.getElementById('lamD2'),so=document.getElementById('lamSobre');if(!el||!so)return;
  el.style.top='';el.style.height='';
  if(!so.classList.contains('d2-izq')||el.hidden)return;
  const c=document.getElementById('lamChip'),r=so.getBoundingClientRect();
  if(!c||c.hidden||!r.height||getComputedStyle(c).display==='none')return;
  const b=c.getBoundingClientRect();if(b.left-r.left>r.width*.2)return;
  const t=Math.min(40,Math.max(4,(b.bottom-r.top+8)/r.height*100));
  el.style.top=t.toFixed(2)+'%';el.style.height=(96-t).toFixed(2)+'%';
}
function lamTocaD2(k){const r=(LAM().paralelo||[]).find(x=>x[3]===k);if(r)lamToca(r[0]);}
function lamConD2Cambia(){
  lamConD2=!lamConD2;
  document.querySelectorAll('.lam-cond2').forEach(b=>b.setAttribute('aria-pressed',String(lamConD2)));
  lamD2(lamD2Id);
  const p=lamD2Id&&lamParte(lamD2Id),c=document.getElementById('lamChip');
  if(p&&c&&!c.hidden){const sub=c.querySelector('.sub'),em=sub&&sub.querySelector('em');lamChip(p,sub?(em?[sub.firstChild.textContent,em.textContent.replace(/^ · /,'')]:sub.textContent):'');}
}

/* ── Lo que se mueve sobre la imagen ── */
function lamLimpia(conserva){
  lamAnim++;lamVisto='';
  const s=document.getElementById('lamMarcasImg');if(s){s.innerHTML='';s.className='lam-marcas-img';}
  const e=document.getElementById('lamEsc');if(e)e.classList.remove('con-ley','en-senas','con-tabla','con-libro');
  const tb=document.getElementById('lamTabla');if(tb){tb.hidden=true;tb.innerHTML='';tb.className='lam-tabla';}
  lamBanda(false);
  const z=lamZ();if(!z)return;
  z.querySelector('.lam-capa-g').innerHTML='';
  if(!conserva){const i=lamZi();i.style.transition='none';i.style.opacity='0';i.removeAttribute('transform');z.setAttribute('viewBox','0 0 1200 675');}
}
/* La vista de una parte. `sub`: el paso del juicio o del Hijo del hombre;
   `anima`: llegar con movimiento (al avanzar), o quedar en el estado final. */
function lamVista(id,sub,anima){
  const L=LAM(),p=lamParte(id);if(!p)return;
  const pa=p.pasos&&sub!=null?p.pasos[sub]:null,zi=lamZi();
  const sigue=!!(pa&&zi&&zi.style.opacity==='1'&&zi.getAttribute('href')===lamSrc(p.img));
  lamLimpia(sigue);lamVisto=id+(sub!=null?':'+sub:'');
  lamChip(p,pa?['Paso '+(sub+1)+' de '+p.pasos.length,pa.t]:'');lamD2(id);lamEnciende([id]);
  const C=L.cuernos;
  if(L.sube&&L.sube.ids.includes(id))lamSube(p,anima);
  else if(C&&id===C.diezEn)lamDiez(anima);
  else if(C&&id===C.caenEn)lamMomento(anima);
  else if(pa&&pa.caja){
    /* v210: en «Los libros fueron abiertos» la cámara sube primero al trono (el Juez se sienta) y después baja a los libros. */
    const J=p.anim,ult=sub===p.pasos.length-1;
    if(J&&ult&&anima&&!lamQuieto()){lamAcercaImg(p.img,J.camara[1],true,1500);lamT(()=>lamAcercaImg(p.img,pa.caja,true,1900),2300);}
    else lamAcercaImg(p.img,pa.caja,true);
    if(J)lamJuicio(sub,anima);}
  else lamHist({f:p.img});
}

/* Las bestias suben del mar (7:3). */
function lamSube(p,anima){
  const S=LAM().sube,yo=lamAnim;
  /* Cada bestia con su capa sube recortada; la que no la tiene (hoy la cuarta) sube con su foto entera. */
  Promise.all(S.solo.map(f=>lamExiste(lamSrc(f)))).then(r=>{if(yo!==lamAnim)return;if(r[S.ids.indexOf(p.id)])lamSubeCapas(p,anima,r);else lamSubeFoto(p,anima);});
}
function lamSubeFoto(p,anima){
  const zi=lamZi(),src=lamSrc(p.img),h=document.querySelector('#lamSvg .lam-hist');
  if(!anima||lamQuieto()||(h&&h.getAttribute('href')===src)){lamHist({f:p.img});return;}
  zi.setAttribute('href',src);zi.style.transition='none';zi.style.opacity='0';
  lamTween(1700,k=>{const e=lamSale(k);zi.setAttribute('transform','translate(0 '+(260*(1-e)).toFixed(1)+')');zi.style.opacity=String(Math.min(1,k*2.4).toFixed(3));},
    ()=>{lamHist({f:p.img});lamT(()=>{zi.style.opacity='0';zi.removeAttribute('transform');},220);});
}
/* Con las bestias recortadas: suben sobre el mar, la anterior se achica y queda atrás. */
function lamSubeCapas(p,anima,hay){
  const S=LAM().sube,i=S.ids.indexOf(p.id),g=lamZ().querySelector('.lam-capa-g'),[x,y,w,h]=S.sitio;
  lamHist({f:S.fondo});
  /* Atrás quedan las anteriores que tienen capa, cada una en su lugar del horizonte. */
  const ant=S.solo.slice(0,i).map((f,j)=>j).filter(j=>!hay||hay[j]),pos=j=>S.atras[ant.indexOf(j)%S.atras.length];
  const img=(cl,f,r,j)=>'<image class="'+cl+'"'+(j!=null?' data-j="'+j+'"':'')+' href="'+lamSrc(f)+'" x="'+r[0]+'" y="'+r[1]+'" width="'+r[2]+'" height="'+r[3]+'" preserveAspectRatio="xMidYMax meet"/>';
  g.innerHTML=ant.map(j=>img('lam-atras',S.solo[j],pos(j),j)).join('')+img('lam-sube-img',S.solo[i],S.sitio)+
    '<svg x="0" y="'+S.olas+'" width="1200" height="'+(675-S.olas)+'" viewBox="0 '+S.olas+' 1200 '+(675-S.olas)+'"><image class="lam-olas" href="'+lamSrc(S.fondo)+'" x="0" y="0" width="1200" height="675"/></svg>';
  if(!anima)return;
  const cur=g.querySelector('.lam-sube-img'),pj=ant[ant.length-1],prev=pj===i-1&&g.querySelector('.lam-atras[data-j="'+pj+'"]'),a=prev&&pos(pj);
  lamTween(1600,k=>{const e=lamSale(k);
    cur.setAttribute('transform','translate(0 '+(h*.8*(1-e)).toFixed(1)+')');cur.style.opacity=String(Math.min(1,k*2.5).toFixed(3));
    if(prev)[x,y,w,h].forEach((v,n)=>prev.setAttribute(['x','y','width','height'][n],(v+(a[n]-v)*e).toFixed(1)));});
}

/* Los diez cuernos se cuentan: un punto por cuerno y la leyenda con los diez reinos. */
function lamLey(items){
  return '<div class="lam-ley" id="lamLey">'+items.map((t,i)=>'<span data-i="'+i+'"'+(t.c?' class="'+t.c+'"':'')+'>'+(t.n?'<i>'+t.n+'</i>':'')+t.t+'</span>').join('')+'</div>';
}
function lamPuntos(C,pos){
  const n=C.diez.length-C.tres.length;
  return pos.map(([x,y],i)=>'<span class="lam-pt'+(i>=n?' tres':'')+'" data-i="'+i+'" style="left:'+lamPx(x)+';top:'+lamPy(y)+'">'+(i+1)+'</span>').join('');
}
function lamDiez(anima){
  const C=LAM().cuernos,s=document.getElementById('lamMarcasImg');
  lamHist({f:lamParte(C.diezEn).img});
  s.innerHTML=lamPuntos(C,C.diez)+lamLey(C.nombres.map((t,i)=>({n:i+1,t:esc(t)}))).replace('class="lam-ley"','class="lam-ley diez"');
  document.getElementById('lamEsc').classList.add('con-ley');
  const ver=()=>s.querySelectorAll('.lam-pt,.lam-ley span').forEach(e=>e.classList.add('ve'));
  if(!anima||lamQuieto()){s.classList.add('quieto');ver();return;}
  s.querySelectorAll('.lam-pt,.lam-ley span').forEach(e=>e.style.transitionDelay=(Number(e.getAttribute('data-i'))*170+80)+'ms');
  lamT(ver,40);
}
/* Delante del cuerno pequeño caen tres (7:8): hérulos, vándalos y ostrogodos. */
function lamMomento(anima){
  const C=LAM().cuernos,K=C.capas,yo=lamAnim;
  Promise.all([lamSrc(K.suelto),lamSrc(K.pequeno)].map(lamExiste)).then(r=>{if(yo===lamAnim)(r.every(Boolean)?lamMomentoCapas:lamMomentoFotos)(anima);});
}
function lamMomentoHTML(pos,pq){
  const C=LAM().cuernos,s=document.getElementById('lamMarcasImg'),n=C.diez.length-C.tres.length;pq=pq||C.pequeno.en;
  s.innerHTML=lamPuntos(C,pos)+'<span class="lam-pt pq" style="left:'+lamPx(pq[0])+';top:'+lamPy(pq[1])+'"></span>'+
    lamLey([...C.tres.map((t,i)=>({n:n+i+1,t:'<b>'+esc(t.t)+'</b> '+t.y,c:'tres'})),{t:'<b>'+esc(C.pequeno.t)+'</b><small> '+esc(C.pequeno.s)+'</small>',c:'pq'}]);
  document.getElementById('lamEsc').classList.add('con-ley');
  return s;
}
/* El estado final: los tres cuernos ya cayeron y está el pequeño. */
function lamMomentoFin(s){
  const C=LAM().cuernos,n=C.diez.length-C.tres.length;
  s.classList.add('quieto','cayo');
  s.querySelectorAll('.lam-pt').forEach(e=>{const i=Number(e.getAttribute('data-i'));
    if(e.classList.contains('pq'))e.classList.add('ve');
    else if(i>=n){const a=C.tres[i-n].a;e.style.left=lamPx(a[0]);e.style.top=lamPy(a[1]);e.classList.add('ve','vuela');}});
  s.querySelectorAll('.lam-ley span').forEach(e=>e.classList.add('ve'));
  s.querySelectorAll('.lam-ley .tres').forEach(e=>e.classList.add('cae'));
}
function lamMomentoFotos(anima){
  const C=LAM().cuernos,zi=lamZi(),a=lamParte(C.caenEn).img,n=C.diez.length-C.tres.length;
  const s=lamMomentoHTML(C.diez);
  if(!anima||lamQuieto()){lamHist({f:a});lamMomentoFin(s);return;}
  lamHist({f:lamParte(C.diezEn).img});
  zi.setAttribute('href',lamSrc(a));zi.style.transition='none';zi.style.opacity='0';
  const pts=[...s.querySelectorAll('.lam-pt:not(.pq)')],ley=[...s.querySelectorAll('.lam-ley span')];
  /* 1. Los diez cuernos; se marcan los tres, uno por uno, con su nombre. */
  lamT(()=>pts.forEach(e=>e.classList.add('ve')),40);
  C.tres.forEach((t,i)=>lamT(()=>{pts[n+i].classList.add('senal');ley[i].classList.add('ve');},700+i*520));
  /* 2. Caen: la imagen pasa a la del cuerno pequeño y los tres se van con los cuernos arrancados. */
  lamT(()=>{zi.style.transition='opacity 1.1s ease';zi.style.opacity='1';s.classList.add('cayo');
    pts.forEach((e,i)=>{if(i<n)e.classList.remove('ve');else{const q=C.tres[i-n].a;e.classList.add('vuela');e.style.left=lamPx(q[0]);e.style.top=lamPy(q[1]);}});
    ley.slice(0,C.tres.length).forEach(e=>e.classList.add('cae'));},2600);
  /* 3. Sube el cuerno pequeño. */
  lamT(()=>{s.querySelector('.lam-pt.pq').classList.add('ve');ley[C.tres.length].classList.add('ve');},3900);
  lamT(()=>{lamHist({f:a});lamT(()=>{zi.style.transition='none';zi.style.opacity='0';},260);},4100);
}
/* Con las capas, sobre cuarta.webp: los tres cuernos pintados se tapan con cielo de
   la misma imagen y en su lugar cuerno-suelto.png se desprende y cae; el pequeño
   (cuerno-pequeno.png) crece desde la cabeza entre los demás; los puntos los siguen.
   Las tapas son <svg> anidados (recortan sin url(#), que Safari no siempre aplica). */
function lamMomentoCapas(anima){
  const C=LAM().cuernos,K=C.capas,g=lamZ().querySelector('.lam-capa-g'),n=C.diez.length-C.tres.length,base=lamParte(C.diezEn).img;
  lamHist({f:base});
  const ctr=r=>[r[0]+r[2]/2,r[1]+r[3]/2],[px,py,pw,ph]=K.pq,voltea=(x,w)=>K.espejo?' translate('+(2*x+w)+' 0) scale(-1 1)':'';
  /* Cada tapa en cuatro capas, cada una más adentro y más opaca: el borde se difumina sin máscaras. */
  g.innerHTML='<g class="lam-tapa" style="opacity:0">'+K.tapa.map(([x,y,w,h,r,sx,sy])=>{const ex=x+w/2,ey=y+h;
      return '<g transform="rotate('+r+' '+ex+' '+ey+')">'+[[0,.3],[4,.45],[8,.7],[12,1]].map(([d,o])=>{const X=x+d,Y=y+d,W=w-2*d,H=h-2*d;
        return '<svg x="'+X+'" y="'+Y+'" width="'+W+'" height="'+H+'" viewBox="'+X+' '+Y+' '+W+' '+H+'" opacity="'+o+'">'+
          '<image href="'+lamSrc(base)+'" x="'+(-sx)+'" y="'+(-sy)+'" width="1200" height="675" transform="rotate('+(-r)+' '+ex+' '+ey+')"/></svg>';}).join('')+'</g>';}).join('')+'</g>'+
    K.tres.map(([x,y,w,h,r],i)=>'<image class="lam-suelto" data-i="'+i+'" style="opacity:0" href="'+lamSrc(K.suelto)+'" x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" preserveAspectRatio="xMidYMax meet" transform="rotate('+r+' '+(x+w/2)+' '+(y+h)+')'+voltea(x,w)+'"/>').join('')+
    '<svg x="'+px+'" y="'+py+'" width="'+pw+'" height="'+ph+'" viewBox="0 0 '+pw+' '+ph+'"><image class="lam-pq-img" href="'+lamSrc(K.pequeno)+'" x="0" y="'+ph+'" width="'+pw+'" height="'+ph+'" preserveAspectRatio="xMidYMax meet"/></svg>';
  /* Con la capa, el pequeño se ve solo (con su cara): sin el aro encima. */
  const s=lamMomentoHTML(C.diez,K.pqEn);s.classList.add('capas');const tapa=g.querySelector('.lam-tapa'),hs=[...g.querySelectorAll('.lam-suelto')],pq=g.querySelector('.lam-pq-img');
  const pts=[...s.querySelectorAll('.lam-pt:not(.pq)')],ley=[...s.querySelectorAll('.lam-ley span')];
  /* Cada cuerno va de su sitio al punto `a` en arco, girando; el punto va con él. */
  const pon=(i,k)=>{const [x,y,w,h,r]=K.tres[i],[cx,cy]=ctr(K.tres[i]),[ox,oy]=C.diez[n+i],a=C.tres[i].a,e=k*k,
      dx=(a[0]-cx)*k,dy=(a[1]-cy)*e-70*Math.sin(Math.PI*k)*(1-k);
    hs[i].setAttribute('transform','translate('+dx.toFixed(1)+' '+dy.toFixed(1)+') rotate('+(r+150*k).toFixed(1)+' '+(x+w/2)+' '+(y+h)+')'+voltea(x,w));
    hs[i].style.opacity=String((1-.2*k).toFixed(3));
    pts[n+i].style.left=lamPx(ox+dx+(cx-ox)*k);pts[n+i].style.top=lamPy(oy+dy+(cy-oy)*k);};
  const suelta=()=>{tapa.style.opacity='1';hs.forEach(h=>{h.style.opacity='1';});};
  if(!anima||lamQuieto()){suelta();C.tres.forEach((t,i)=>pon(i,1));pq.setAttribute('y','0');lamMomentoFin(s);return;}
  lamT(()=>pts.forEach(e=>e.classList.add('ve')),40);
  C.tres.forEach((t,i)=>lamT(()=>{pts[n+i].classList.add('senal');ley[i].classList.add('ve');},700+i*520));
  lamT(()=>{suelta();s.classList.add('cayo','sigue');pts.slice(0,n).forEach(e=>e.classList.remove('ve'));pts.slice(n).forEach(e=>e.classList.add('vuela'));
    ley.slice(0,C.tres.length).forEach(e=>e.classList.add('cae'));
    lamTween(1900,k=>C.tres.forEach((t,i)=>pon(i,Math.max(0,Math.min(1,(k*1900-i*230)/1440)))));},2600);
  lamT(()=>{s.querySelector('.lam-pt.pq').classList.add('ve');ley[C.tres.length].classList.add('ve');
    lamTween(1300,k=>pq.setAttribute('y',(ph*(1-lamSale(k))).toFixed(1)));},4300);
}

/* El juicio por pasos: la imagen se acerca a la caja de cada paso, y después
   sigue acercándose muy despacio (como una cámara), hasta el paso siguiente. */
let lamCamN=0;
function lamAcercaImg(f,caja,anima,ms){
  const z=lamZ(),zi=lamZi(),src=lamSrc(f),cam=++lamCamN;
  lamHist({f});
  if(zi.getAttribute('href')!==src||zi.style.opacity!=='1'){zi.setAttribute('href',src);zi.removeAttribute('transform');zi.style.transition='none';zi.style.opacity='1';z.setAttribute('viewBox','0 0 1200 675');}
  /* v210: cada movimiento de cámara deja quieto al anterior (el juicio encadena dos). */
  const ini=z.getAttribute('viewBox').split(/\s+/).map(Number),ve=v=>{if(cam===lamCamN)z.setAttribute('viewBox',v.map(n=>n.toFixed(1)).join(' '));};
  lamTween(anima?(ms||1700):0,k=>{const e=lamSuave(k);ve(ini.map((v,i)=>v+(caja[i]-v)*e));},()=>{
    if(lamQuieto()||cam!==lamCamN)return;const [x,y,w,h]=caja,d=.07,fin=[x+w*d/2,y+h*d/2,w*(1-d),h*(1-d)];
    lamTween(9000,k=>ve(caja.map((v,i)=>v+(fin[i]-v)*k)));});
}

/* ── v210: EL JUEZ SE SENTÓ Y LOS LIBROS FUERON ABIERTOS (Daniel 7:9-10) ──
   Camilo (14-oct): «toda la experiencia debe ser de otro nivel, pero la
   interactiva debe ser increíble»; «se puede agregar una animación para cuando
   dice: el Juez se sentó y los libros fueron abiertos».
   Cuatro momentos que se suman, uno por paso del juicio:
   0. Fueron puestos unos tronos: la escena sale de la penumbra y se encienden
      los tronos, uno por uno, como si se colocaran.
   1. Se sentó un Anciano de días: la luz del trono crece y se abren rayos. El
      rostro no se dibuja nunca: queda dentro de la luz.
   2. Un río de fuego: el fuego baja del trono por el río y los «miles de miles»
      se encienden como chispas de luz.
   3. El Juez se sentó y los libros fueron abiertos: la cámara sube al trono, la
      luz late una vez (el Juez se sienta), baja a los libros y un libro grande se
      abre en primer plano con una luz de oro que sube de sus páginas.
   Todo en el <svg> del zoom (sigue a la cámara) salvo el libro grande, que va en
   HTML encima. Sin url(#), sin filtros, sin el.animate(): las luces son una
   imagen redonda dibujada una vez en un canvas, y todo se mueve con
   requestAnimationFrame y transiciones de CSS. Con «reducir movimiento», el
   cuadro final de cada paso, quieto. */
const lamLuzC={};
function lamLuz(c){
  if(c in lamLuzC)return lamLuzC[c];
  let u='';
  try{const k=document.createElement('canvas');k.width=k.height=128;const g=k.getContext('2d'),r=g.createRadialGradient(64,64,0,64,64,64);
    [[0,1],[.22,.62],[.5,.22],[.75,.06],[1,0]].forEach(([o,a])=>r.addColorStop(o,'rgba('+c+','+a+')'));g.fillStyle=r;g.fillRect(0,0,128,128);u=k.toDataURL('image/png');}catch(e){}
  return lamLuzC[c]=u;
}
/* Un bucle mientras la vista no cambie: la luz que respira, el fuego, las chispas. */
function lamBucle(fn){const yo=lamAnim;if(lamQuieto()){fn(0);return;}const t0=performance.now(),f=t=>{if(yo!==lamAnim)return;fn((t-t0)/1000);requestAnimationFrame(f);};requestAnimationFrame(f);}
const lamJFin=[{velo:.52,ray:0,tr:.3,trR:150,se:0,rio:0,ch:0,lib:0},{velo:.18,ray:1,tr:.78,trR:200,se:.6,rio:0,ch:0,lib:0},
  {velo:.1,ray:.85,tr:.7,trR:200,se:.55,rio:.62,ch:1,lib:0},{velo:.46,ray:.7,tr:.75,trR:210,se:.6,rio:.5,ch:.75,lib:.9}];
function lamJuicio(j,anima){
  const p=lamParte('juicio'),A=p&&p.anim,z=lamZ(),g=z&&z.querySelector('.lam-capa-g');if(!A||!g||j==null)return;
  const q=!anima||lamQuieto(),oro=lamLuz('255,212,128'),blanca=lamLuz('255,249,228'),fuego=lamLuz('255,128,36');
  const luz=(cl,u,[x,y],r)=>'<image class="'+cl+'" href="'+u+'" x="'+(x-r)+'" y="'+(y-r)+'" width="'+2*r+'" height="'+2*r+'" style="opacity:0"/>';
  const [tx,ty]=A.trono,R=820;
  /* Las chispas de los «miles de miles»: siempre las mismas (semilla fija), sobre la multitud. */
  let sm=11;const az=()=>(sm=(sm*9301+49297)%233280)/233280,ch=[];
  for(let i=0;i<84;i++){const x=az()*1200,y=30+az()*330;if(Math.abs(x-tx)<120&&y<300)continue;ch.push([x,y,.7+az()*1.9,az()*6.283]);}
  g.innerHTML='<rect class="lam-j-velo" x="-40" y="-40" width="1280" height="755" fill="#07050B" style="opacity:0"/>'+
    '<g class="lam-j-rayos" style="opacity:0">'+Array.from({length:16},(_,i)=>{const a=i/16*6.2832,w=i%2?.035:.06;
      return '<polygon points="'+tx+','+ty+' '+(tx+R*Math.cos(a-w)).toFixed(0)+','+(ty+R*Math.sin(a-w)).toFixed(0)+' '+(tx+R*Math.cos(a+w)).toFixed(0)+','+(ty+R*Math.sin(a+w)).toFixed(0)+'" fill="#FFF1C6" opacity="'+(i%2?.06:.1)+'"/>';}).join('')+'</g>'+
    A.rio.map(t=>luz('lam-j-rio',fuego,t,74)).join('')+A.tronos.map(t=>luz('lam-j-tr',blanca,t,62)).join('')+
    luz('lam-j-trono',blanca,A.trono,300)+luz('lam-j-sienta',oro,A.sentado,150)+A.libros.map(t=>luz('lam-j-lib',oro,t,118)).join('')+
    '<g class="lam-j-ch" style="opacity:0">'+ch.map(([x,y,r])=>'<circle cx="'+x.toFixed(0)+'" cy="'+y.toFixed(0)+'" r="'+r.toFixed(1)+'" fill="#FFF6DC"/>').join('')+'</g>';
  const $=s=>[...g.querySelectorAll(s)],velo=g.querySelector('.lam-j-velo'),ray=g.querySelector('.lam-j-rayos'),tro=g.querySelector('.lam-j-trono'),
    sie=g.querySelector('.lam-j-sienta'),rios=$('.lam-j-rio'),trs=$('.lam-j-tr'),libs=$('.lam-j-lib'),chg=g.querySelector('.lam-j-ch'),chs=[...chg.children];
  /* El estado: de dónde sale este paso (el final del anterior) y a dónde llega. */
  const fin=lamJFin[j],st=Object.assign({},q||j===0?(q?fin:{velo:.78,ray:0,tr:0,trR:200,se:0,rio:0,ch:0,lib:0}):lamJFin[j-1]),
    gp=trs.map(()=>q||j>0?1:0);let riop=q||j>2?1:0,late=0;
  const pinta=t=>{
    velo.style.opacity=st.velo.toFixed(3);
    ray.style.opacity=st.ray.toFixed(3);ray.setAttribute('transform','rotate('+(t*1.6).toFixed(2)+' '+tx+' '+ty+')');
    const r=st.trR*(1+.025*Math.sin(t*1.3))+late*110;
    tro.setAttribute('x',(tx-r).toFixed(1));tro.setAttribute('y',(ty-r).toFixed(1));tro.setAttribute('width',(2*r).toFixed(1));tro.setAttribute('height',(2*r).toFixed(1));
    tro.style.opacity=Math.min(1,st.tr+late*.25).toFixed(3);
    sie.style.opacity=Math.min(1,st.se*(.88+.12*Math.sin(t*1.1+1))+late*.4).toFixed(3);
    trs.forEach((e,i)=>{const k=gp[i],[x,y]=A.tronos[i];e.setAttribute('y',(y-62-46*(1-k)).toFixed(1));e.style.opacity=(k*(.85+.15*Math.sin(t*1.7+i))).toFixed(3);});
    rios.forEach((e,i)=>{const k=Math.max(0,Math.min(1,riop*rios.length-i));e.style.opacity=(st.rio*k*(.68+.32*Math.sin(t*4.2+i*1.9))).toFixed(3);});
    chg.style.opacity=st.ch.toFixed(3);
    if(st.ch>0)chs.forEach((e,i)=>{const f=ch[i][3];e.style.opacity=(.18+.82*Math.abs(Math.sin(t*.8+f))).toFixed(2);});
    libs.forEach((e,i)=>{e.style.opacity=(st.lib*(.78+.22*Math.sin(t*2.1+i))).toFixed(3);});
  };
  lamBucle(pinta);
  const hacia=(ms,a,b,fn)=>lamTween(ms,k=>{const e=lamSuave(k);Object.keys(b).forEach(n=>{st[n]=a[n]+(b[n]-a[n])*e;});if(fn)fn(k);});
  if(!q){
    const a=Object.assign({},st);
    if(j===0){hacia(2600,a,fin);trs.forEach((e,i)=>lamT(()=>lamTween(900,k=>{gp[i]=lamSale(k);}),500+i*230));}
    else if(j===1)hacia(2400,a,fin);
    else if(j===2){hacia(2200,a,fin);lamTween(3200,k=>{riop=k;});}
    else{
      /* «El Juez se sentó»: la luz late una vez; después la cámara baja a los libros. */
      hacia(1200,a,{velo:.2,ray:.9,tr:.8,trR:200,se:.6,rio:.5,ch:.75,lib:0});riop=1;
      lamT(()=>lamTween(1500,k=>{late=Math.sin(Math.PI*k)*(k<.5?1:.9);}),950);
      lamT(()=>hacia(1800,Object.assign({},st),fin),2300);
    }
  }
  if(j===3)lamLibro(q);
}
/* El libro grande que se abre (HTML, encima de la imagen). Con `libro` (un libro
   abierto con fondo transparente en laminas/d7/) aparece esa imagen; si no
   existe, se arma con CSS: tapas, cuatro hojas que pasan y la luz de oro. */
function lamLibro(q){
  const A=lamParte('juicio').anim,s=document.getElementById('lamMarcasImg'),yo=lamAnim,src=A.libro?lamSrc(A.libro):'';
  if(!s)return;
  const pon=img=>{if(yo!==lamAnim)return;
    const hoja=k=>'<div class="lb-h" style="--k:'+k+'"><i class="f"></i><i class="b"></i></div>';
    const chispas=Array.from({length:18},(_,i)=>'<span style="left:'+(22+((i*37)%56))+'%;animation-delay:'+(-(i*.53)%3.4).toFixed(2)+'s;--d:'+(2.6+(i%5)*.35).toFixed(2)+'s"></span>').join('');
    s.classList.add('con-libro');if(q){const e=document.getElementById('lamEsc');if(e)e.classList.add('con-libro');}
    s.innerHTML='<div class="lam-libro'+(img?' foto':'')+(q?' quieto ve abre luz':'')+'" id="lamLibro" aria-hidden="true"><div class="lb-luz"></div>'+
      (img?'<img class="lb-img" src="'+src+'" alt="">':'<div class="lb-3d"><div class="lb-tapa-i"></div><div class="lb-tapa-d"></div><div class="lb-pila-i"></div><div class="lb-pila-d"></div>'+
        [0,1,2,3].map(hoja).join('')+'<div class="lb-portada"><i class="f"></i><i class="b"></i></div></div>')+
      '<div class="lb-chispas">'+chispas+'</div></div>'+
      '<div class="lam-libro-cita'+(q?' ve':'')+'"><q>El Juez se sentó y los libros fueron abiertos.</q><small>Daniel 7:10</small></div>';
    if(q)return;
    const l=document.getElementById('lamLibro'),c=s.querySelector('.lam-libro-cita');
    lamT(()=>{l.classList.add('ve');const e=document.getElementById('lamEsc');if(e)e.classList.add('con-libro');},2700);lamT(()=>l.classList.add('abre'),3500);lamT(()=>l.classList.add('luz'),4300);lamT(()=>c.classList.add('ve'),5200);};
  if(!src){pon(false);return;}
  /* Ya se sabe si la imagen existe: de una vez (el clicker no espera). */
  if(src in lamHayImg){pon(lamHayImg[src]);return;}
  lamExiste(src).then(ok=>pon(ok));
}

/* ── Explorar ── */
function lamInicioE(){
  lamPara();lamLimpia();lamSel='';lamEnciende([]);lamChip(null);lamD2(null);lamMarcaPaso('est');lamTramo(null);
  lamHist({f:LAM().inicioF});lamHoja('');
}
function lamEligeE(i,vis){
  const L=LAM(),p=L.partes[i];if(!p)return;
  const av=document.getElementById('lamAviso');if(av)av.classList.add('fuera');
  if(!vis)lamPara();
  lamSel=p.id;lamMarcaPaso('est');lamVista(p.id,null,true);
  /* La tira se corre sola para que la parte elegida se vea (sin mover la página). */
  const t=document.getElementById('lamTira'),b=t&&t.querySelector('[data-p="'+p.id+'"]');
  if(b&&t.scrollTo)t.scrollTo({left:b.offsetLeft-t.clientWidth/2+b.offsetWidth/2,behavior:lamQuieto()?'auto':'smooth'});
  lamHoja(lamHojaParte(p,i,L.partes.length));if(!vis)lamVeHoja();
  /* La línea de tiempo va al año de la parte. */
  const r=document.getElementById('lamRango');
  if(r&&p.de!=null){r.value=p.de;document.getElementById('lamTano').textContent=p.fechas;document.getElementById('lamTq').textContent=p.reino;}
  lamTramo(p.de,p.a);
}
/* Lo que la hoja de una parte agrega en Explorar: los pasos, los cuernos, las señas. */
function lamExtraE(p){
  if(lamModo==='presentar')return '';
  const L=LAM(),C=L.cuernos;let h='';
  if(p.pasos)h+='<div class="lam-subs-c"><div class="lam-rot">La escena, paso a paso</div><div class="lam-subs">'+
    p.pasos.map((x,j)=>'<button type="button" data-j="'+j+'" onclick="lamSubE('+j+')"><i>'+(j+1)+'</i><span>'+esc(x.t)+'</span><small>'+x.ref+'</small></button>').join('')+
    '</div><button type="button" class="btn tono lam-recorre" onclick="lamSubsTodos()">'+IC('play')+' Recorrer la escena</button><div class="lam-sub-tx" id="lamSubTx"></div></div>';
  if(C&&p.id===C.diezEn)h+='<div class="lam-bots lam-hbots"><button type="button" class="btn tono" onclick="lamVista(\''+p.id+'\',null,true)">'+IC('repetir')+' Contarlos otra vez</button>'+
    '<button type="button" class="btn ver" onclick="lamToca(\''+C.caenEn+'\')">'+IC('play')+' Sale el cuerno pequeño</button></div>';
  if(C&&p.id===C.caenEn)h+='<div class="lam-bots lam-hbots"><button type="button" class="btn tono" onclick="lamVista(\''+p.id+'\',null,true)">'+IC('repetir')+' Ver otra vez cómo caen los tres</button></div>';
  if(L.senas&&p.id===L.senasTras)h+='<div class="lam-senas"><div class="lam-rot">Las '+(L.senas.length===11?'once':L.senas.length)+' señas del cuerno pequeño</div>'+
    '<button type="button" class="btn tono" onclick="lamSenasPlay()">'+IC('play')+' Encenderlas una por una</button>'+
    '<ol class="lam-sl" id="lamSenas">'+L.senas.map((x,j)=>'<li data-j="'+j+'"><button type="button" aria-expanded="false" onclick="lamSena('+j+')"><i>'+(j+1)+'</i><b>'+x.t+'</b><span class="lam-ref">'+x.ref+'</span></button><p>'+x.c+'</p></li>').join('')+
    '</ol><div class="lam-fu">Fuente: '+L.senasFuente+'</div></div>';
  const P=L.periodo;
  if(P&&p.id===P.tras)h+='<div class="lam-subs-c lam-per-c"><div class="lam-rot">'+esc(P.t)+' · 1.260 años</div><div class="lam-subs">'+
    P.pasos.map((x,j)=>'<button type="button" data-per="'+j+'" onclick="lamPerE('+j+')"><i>'+(j+1)+'</i><span>'+esc(x.t)+'</span></button>').join('')+
    '</div><button type="button" class="btn tono lam-recorre" onclick="lamPerTodos()">'+IC('play')+' Armar la cuenta</button><div class="lam-sub-tx" id="lamPerTx"></div></div>';
  const F=L.fases;
  if(F&&p.id===F.tras)h+='<div class="lam-subs-c lam-fas-c"><div class="lam-rot">'+esc(F.t)+' · '+esc(F.s)+'</div><div class="lam-subs">'+
    F.pasos.map((x,j)=>'<button type="button" data-fa="'+j+'" onclick="lamFasE('+j+')"><i>'+(j+1)+'</i><span>'+esc(x.t)+'</span><small>'+esc(x.cuando)+'</small></button>').join('')+
    '</div><button type="button" class="btn tono lam-recorre" onclick="lamFasTodas()">'+IC('play')+' Encender las tres</button><div class="lam-sub-tx" id="lamFasTx"></div></div>';
  return h;
}
function lamSubE(j,vis){
  const p=lamParte(lamSel);if(!p||!p.pasos||!p.pasos[j])return;
  if(!vis)lamPara();
  lamVista(p.id,j,true);
  document.querySelectorAll('.lam-subs button').forEach(b=>b.classList.toggle('on',b.getAttribute('data-j')===String(j)));
  const x=p.pasos[j],t=document.getElementById('lamSubTx');
  if(t)t.innerHTML='<div class="lam-capa t"><div class="lam-rot">Paso '+(j+1)+' de '+p.pasos.length+' · RV1995</div><p><q>'+esc(x.texto)+'</q> <span class="lam-ref">'+x.ref+'</span></p></div><p class="lam-nota">'+x.nota+'</p>';
}
function lamSubsTodos(){
  const p=lamParte(lamSel);if(!p||!p.pasos)return;
  lamPara();let j=0;
  const b=document.getElementById('lamVision');
  const sig=()=>{if(j>=p.pasos.length||lamSel!==p.id){lamVis=0;return;}const ms=p.pasos[j].ms;lamSubE(j++,true);lamVis=setTimeout(sig,lamQuieto()?2000:ms||4200);};
  sig();if(b)b.setAttribute('aria-pressed','false');
}
function lamSena(j,ver){
  const li=document.querySelector('#lamSenas li[data-j="'+j+'"]');if(!li)return;
  const on=ver!=null?ver:!li.classList.contains('on');li.classList.toggle('on',on);li.querySelector('button').setAttribute('aria-expanded',String(on));
  /* v208: la seña que se enciende también va sobre la imagen del cuerno. */
  if(on&&lamSel===LAM().senasTras)lamSenasVis(j,true);
}
function lamSenasPlay(){
  const n=LAM().senas.length,yo=++lamSenasN;
  for(let j=0;j<n;j++)lamSena(j,false);
  lamSenasVis(-1,true);
  for(let j=0;j<n;j++)setTimeout(()=>{if(yo===lamSenasN)lamSena(j,true);},lamQuieto()?0:1600+j*1300);
}
/* ── v208: las señas y «tiempo, tiempos y medio tiempo» sobre la imagen ──
   Camilo: «en la presentación se debe agregar el tiempo, tiempos y la mitad de
   un tiempo, o 1.260 años, y las características del cuerno pequeño». Sobre la
   imagen del cuerno (lamTabla, en el mismo rectángulo): la portada de las señas,
   cada seña al pie, y la cuenta de los 1.260 años que se arma pieza por pieza
   (cada [data-o] aparece en orden; con «reducir movimiento», todo de una vez). */
function lamTablaPon(html,cl){
  const t=document.getElementById('lamTabla');if(!t)return null;
  t.className='lam-tabla'+(cl?' '+cl:'');t.innerHTML=html;t.hidden=false;
  /* La tabla trae su propio título: la etiqueta de la parte se esconde mientras la tapa. */
  const e=document.getElementById('lamEsc');if(e)e.classList.toggle('con-tabla',/titulo|per/.test(cl||''));return t;
}
function lamArma(t,anima,ms){
  const els=[...t.querySelectorAll('[data-o]')];
  if(!anima||lamQuieto()){t.classList.add('quieto');els.forEach(e=>e.classList.add('ve'));return;}
  els.forEach(e=>lamT(()=>e.classList.add('ve'),120+Number(e.getAttribute('data-o'))*(ms||700)));
}
/* El cuerno ya armado (los tres caídos), sin la leyenda: la imagen de fondo de las señas. */
function lamCuernoFondo(){
  const L=LAM(),p=lamParte(L.senasTras);
  if(lamVisto!==p.id)lamVista(p.id,null,false);
  else{const tb=document.getElementById('lamTabla');if(tb){tb.hidden=true;tb.innerHTML='';}lamBanda(false);}
  lamD2(null);const e=document.getElementById('lamEsc');if(e)e.classList.add('en-senas');
  return p;
}
/* j = -1: la portada de las señas; j ≥ 0: la seña al pie de la imagen. */
function lamSenasVis(j,anima){
  const L=LAM(),p=lamCuernoFondo(),n=L.senas.length,N=n===11?'Once':n;
  if(j<0){lamChip(p,[N+' señas','Las características del cuerno pequeño']);
    lamArma(lamTablaPon('<div class="lam-sen-tit"><small data-o="0">Daniel 7:8, 20-25</small><b data-o="1">Las características del cuerno pequeño</b>'+
      '<span data-o="2">'+N+' señas que se cumplen en un mismo poder</span></div>','titulo'),anima,500);return;}
  const x=L.senas[j];lamChip(p,['Seña '+(j+1)+' de '+n,x.t.replace(/<[^>]+>/g,'')]);
  lamArma(lamTablaPon('<div class="lam-sen-cap" data-o="0"><i>'+(j+1)+'</i><div><b>'+x.t+'</b> <span class="lam-ref">'+x.ref+'</span><p>'+x.c+'</p></div></div>','pie'),anima);
}
/* La franja de 538 a 1798 sobre la línea de tiempo. */
function lamBanda(on){
  const tm=document.querySelector('#lam .lam-rango');
  let b=document.getElementById('lamBanda');
  if(!on){if(b)b.classList.remove('ve');return;}
  const P=LAM().periodo;if(!tm||!P)return;
  if(!b){b=document.createElement('div');b.id='lamBanda';b.className='lam-banda';b.innerHTML='<span>1.260 años</span>';tm.appendChild(b);}
  /* v209: en porcentaje del ancho de la pista (el pulgar mide 16 px): sigue en su sitio aunque la ventana cambie. */
  b.style.left='calc(8px + (100% - 16px) * '+(lamPos(P.de)/100).toFixed(4)+')';b.style.width='calc((100% - 16px) * '+((lamPos(P.a)-lamPos(P.de))/100).toFixed(4)+')';
  if(lamQuieto())b.classList.add('ve');else requestAnimationFrame(()=>b.classList.add('ve'));
}
function lamPeriodoVis(j,anima){
  const L=LAM(),P=L.periodo,x=P&&P.pasos[j];if(!x)return;
  const p=lamCuernoFondo();lamVisto=p.id;
  lamChip(p,['Paso '+(j+1)+' de '+P.pasos.length,x.t]);
  const cab='<div class="lam-per-cab" data-o="0"><span>'+esc(P.t)+'</span> · Daniel 7:25</div>';
  const fila=(k,et,sub,w,n)=>'<div class="lam-fila" data-o="'+k+'"><span class="et">'+et+'<small>'+sub+'</small></span><span class="barra"><i style="--w:'+w+'%"></i></span><b>'+n+'</b></div>';
  let h='';
  if(x.v==='suma')h=cab+'<div class="lam-per-h" data-o="0">'+esc(x.t)+'</div>'+fila(1,'tiempo','1 año',50,'360')+fila(2,'tiempos','2 años',100,'720')+fila(3,'medio tiempo','½ año',25,'180')+
    '<div class="lam-per-total" data-o="4"><span>3½ años</span><b>1.260 días</b></div><div class="lam-per-nota" data-o="5">1 año profético = 12 meses de 30 días = 360 días</div>';
  else if(x.v==='dia')h=cab+'<div class="lam-per-h" data-o="0">'+esc(x.t)+'</div><div class="lam-eq" data-o="1"><span>1 día</span><i>=</i><span>1 año</span></div>'+
    '<div class="lam-per-nota" data-o="2">Números 14:34 · Ezequiel 4:6</div><div class="lam-eq grande" data-o="3"><span>1.260 días</span><i>→</i><span class="oro">1.260 años</span></div>';
  else if(x.v==='mismo')h=cab+'<div class="lam-per-h" data-o="0">'+esc(x.t)+'</div>'+
    [['3½ tiempos','Daniel 7:25 · Apocalipsis 12:14','3½ × 360'],['42 meses','Apocalipsis 11:2 · 13:5','42 × 30'],['1.260 días','Apocalipsis 11:3 · 12:6','']].map(([a,b,c],i)=>
      '<div class="lam-igual" data-o="'+(i+1)+'"><b>'+a+'</b><small>'+b+'</small><span>'+(c?c+' = ':'')+'1.260</span></div>').join('')+
    '<div class="lam-per-total" data-o="4"><span>el mismo periodo</span><b>1.260 años</b></div>';
  else h=cab+'<div class="lam-per-h" data-o="0">'+esc(x.t)+'</div><div class="lam-cum">'+
    P.fotos.map(([f,y,t],i)=>'<figure data-o="'+(i*2+1)+'"><img src="'+lamSrc(f)+'" alt=""><figcaption><b>'+y+'</b><small>'+esc(t)+'</small></figcaption></figure>').join('<div class="lam-cum-barra" data-o="2"><i></i><span>1.260 años</span></div>')+
    '</div><div class="lam-per-nota" data-o="4">538 + 1.260 = 1798</div>';
  const t=lamTablaPon(h,'per per-'+x.v);lamArma(t,anima);
  /* La línea de tiempo: el año y, en el cumplimiento, la franja de 538 a 1798. */
  const r=document.getElementById('lamRango');
  if(r){r.value=P.a;document.getElementById('lamTano').textContent=P.de+' – '+P.a+' d.C.';document.getElementById('lamTq').textContent='1.260 años del cuerno pequeño';}
  if(x.v==='cumple'){if(!anima||lamQuieto())lamBanda(true);else lamT(()=>lamBanda(true),1500);}
}
function lamPerTx(j){
  const P=LAM().periodo,x=P.pasos[j];
  return (x.citas.length?'<div class="lam-capa t"><div class="lam-rot">Lo que dice el texto · RV1995</div>'+x.citas.map(([r,c])=>'<p><q>'+esc(c)+'</q> <span class="lam-ref">'+esc(r)+'</span></p>').join('')+'</div>':'')+
    '<div class="lam-capa i"><div class="lam-rot">Lo que significa</div><p>'+x.nota+'</p><div class="lam-fu">Fuente: '+P.fuente+'</div></div>';
}
function lamPerE(j,vis){
  const P=LAM().periodo;if(!P||!P.pasos[j])return;
  if(!vis)lamPara();
  lamPeriodoVis(j,true);
  document.querySelectorAll('.lam-per-c .lam-subs button').forEach(b=>b.classList.toggle('on',b.getAttribute('data-per')===String(j)));
  const t=document.getElementById('lamPerTx');if(t)t.innerHTML='<div class="lam-rot">Paso '+(j+1)+' de '+P.pasos.length+'</div>'+lamPerTx(j);
}
function lamPerTodos(){
  const P=LAM().periodo;if(!P)return;
  lamPara();let j=0;const sel=lamSel;
  const sig=()=>{if(j>=P.pasos.length||lamSel!==sel){lamVis=0;return;}lamPerE(j++,true);lamVis=setTimeout(sig,lamQuieto()?2000:6500);};
  sig();
}
/* ── v210: LAS TRES FASES DEL JUICIO, sobre la imagen del juicio ──
   Una mini línea de tiempo (1844 → la venida → mil años → el fin) y tres
   paneles que se encienden en orden: el de la fase actual brilla, los
   anteriores quedan encendidos y los siguientes, a media luz. */
function lamFasesHTML(j){
  const F=LAM().fases,cl=k=>k<j?' on':k===j?' on ahora':'',o=(k,n)=>k===j?' data-o="'+n+'"':'';
  const pos=[5,44,95],hito=(h,i)=>'<span class="lam-fh'+(F.pasos.some((x,k)=>k<=j&&(x.de===i||x.a===i))?' on':'')+'" style="left:'+pos[i]+'%"><i></i><b>'+esc(h[0])+'</b><small>'+esc(h[1])+'</small></span>';
  const tramo=(x,k)=>'<span class="lam-ft f'+k+cl(k)+'"'+o(k,1)+' style="left:'+pos[x.de]+'%;width:'+Math.max(2.5,pos[x.a]-pos[x.de])+'%"></span>';
  return '<div class="lam-per-cab"'+(j===0?' data-o="0"':'')+'><span>'+esc(F.t)+'</span> · Daniel 7 y Apocalipsis 20</div>'+
    '<div class="lam-fl"><span class="lam-fl-l"></span><span class="lam-fl-mil" style="left:'+pos[1]+'%;width:'+(pos[2]-pos[1])+'%">1.000 años</span>'+F.pasos.map(tramo).join('')+F.hitos.map(hito).join('')+'</div>'+
    '<div class="lam-fps">'+F.pasos.map((x,k)=>'<div class="lam-fp f'+k+cl(k)+'"'+o(k,2)+'><i>'+(k+1)+'</i><b>'+esc(x.t)+'</b><small class="n">'+esc(x.n)+'</small>'+
      '<small class="c">'+esc(x.cuando)+'</small><span class="det"><span>'+esc(x.donde)+' · '+esc(x.quien)+'</span></span></div>').join('')+'</div>'+
    '<div class="lam-per-nota"'+o(j,3)+'>'+esc(F.pasos[j].para)+'</div>';
}
function lamFasesVis(j,anima){
  const L=LAM(),F=L.fases,x=F&&F.pasos[j];if(!x)return;
  const p=lamParte(F.tras),seguia=lamVisto==='fases';
  if(!seguia){lamLimpia();lamHist({f:p.img});}
  lamVisto='fases';lamD2(null);lamEnciende([p.id]);
  lamChip(p,['Fase '+(j+1)+' de '+F.pasos.length,x.t]);
  const t=lamTablaPon(lamFasesHTML(j),'per fases');
  if(seguia&&t)t.querySelectorAll('.lam-fp.on:not(.ahora),.lam-ft.on:not([data-o])').forEach(e=>e.classList.add('ya'));
  lamArma(t,anima,520);
}
function lamFasesTx(j){
  const F=LAM().fases,x=F.pasos[j];
  return '<div class="lam-capa t"><div class="lam-rot">Lo que dice el texto · RV1995</div>'+x.citas.map(([r,c])=>'<p><q>'+esc(c)+'</q> <span class="lam-ref">'+esc(r)+'</span></p>').join('')+'</div>'+
    '<div class="lam-capa i"><div class="lam-rot">'+esc(x.n)+' · '+esc(x.cuando)+'</div><p><b>Dónde:</b> '+esc(x.donde)+'. <b>Quién:</b> '+esc(x.quien)+'.</p><p>'+esc(x.que)+'</p>'+
    /* Al presentar, «para quién» ya va sobre la imagen. */
    (lamModo==='presentar'?'':'<p><b>'+esc(x.para)+'.</b></p>'+(j===F.pasos.length-1?'<p>'+esc(F.nota)+'</p>':''))+'<div class="lam-fu">Fuente: '+F.fuente+'</div></div>';
}
function lamFasE(j,vis){
  const F=LAM().fases;if(!F||!F.pasos[j])return;
  if(!vis)lamPara();
  lamFasesVis(j,true);
  document.querySelectorAll('.lam-fas-c .lam-subs button').forEach(b=>b.classList.toggle('on',b.getAttribute('data-fa')===String(j)));
  const t=document.getElementById('lamFasTx');if(t)t.innerHTML='<div class="lam-rot">Fase '+(j+1)+' de '+F.pasos.length+'</div>'+lamFasesTx(j);
}
function lamFasTodas(){
  const F=LAM().fases;if(!F)return;
  lamPara();let j=0;const sel=lamSel;
  const sig=()=>{if(j>=F.pasos.length||lamSel!==sel){lamVis=0;return;}lamFasE(j++,true);lamVis=setTimeout(sig,lamQuieto()?2000:5200);};
  sig();
}
function lamHojaFases(j){
  const F=LAM().fases,p=lamParte(F.tras),x=F.pasos[j];
  return '<div class="lam-hcab"><span class="lam-metal" style="--c:'+p.c+'"></span><div><div class="lam-p1">'+esc(F.t)+' · fase '+(j+1)+' de '+F.pasos.length+'</div>'+
    '<div class="lam-p2">'+esc(x.t)+'</div><div class="lam-fechas">'+esc(x.cuando)+'</div></div></div>'+
    '<div class="lam-puntos" aria-hidden="true">'+F.pasos.map((y,k)=>'<i'+(k<=j?' class="on"':'')+'></i>').join('')+'</div>'+lamFasesTx(j);
}
/* «Ver la visión»: del mar al reino, cada parte con su movimiento, sola. */
function lamVision(){
  if(lamVis){lamParaVision();return;}
  lamPara();
  const L=LAM(),seq=lamPasosE().filter(s=>s.tipo==='parte'),C=L.cuernos;
  const b=document.getElementById('lamVision');if(b){b.classList.add('on');b.setAttribute('aria-pressed','true');b.innerHTML=IC('pausa')+' Pausar';}
  const av=document.getElementById('lamAviso');if(av)av.classList.add('fuera');
  let k=0;
  const sig=()=>{if(k>=seq.length){lamParaVision();return;}
    const s=seq[k++];
    if(s.sub==null||s.sub===0)lamEligeE(L.partes.findIndex(p=>p.id===s.id),true);
    if(s.sub!=null)lamSubE(s.sub,true);
    lamVis=setTimeout(sig,lamQuieto()?2600:C&&s.id===C.caenEn?6200:s.sub!=null?(lamParte(s.id).pasos[s.sub].ms||4200):3800);};
  const mar=L.historia.find(h=>h.f===L.inicioF)||L.historia[0];
  lamLimpia();lamSel='';lamChip(null);lamD2(null);lamEnciende([]);lamMarcaPaso('est');lamHist({f:L.inicioF});lamHoja(lamHojaTexto(mar));
  lamVis=setTimeout(sig,lamQuieto()?1500:2800);
}
function lamParaVision(){
  if(lamVis){clearTimeout(lamVis);lamVis=0;}
  const b=document.getElementById('lamVision');if(b&&b.classList.contains('on')){b.classList.remove('on');b.setAttribute('aria-pressed','false');b.innerHTML=IC('play')+' Ver la visión';}
}

/* ── Presentar ──
   La historia (el primer paso es la portada), cada parte en orden y después y
   cierre. El juicio y el Hijo del hombre van por pasos, y tras el cuerno
   pequeño, una seña por paso. El contador cuenta las partes; los pasos de
   dentro se ven en la hoja y en la etiqueta de la imagen. */
const lamPasosE=()=>{
  const L=LAM(),r=L.historia.map((h,i)=>({tipo:'hist',i}));
  L.partes.forEach(p=>{
    if(p.pasos)p.pasos.forEach((x,j)=>r.push({tipo:'parte',id:p.id,sub:j,n:p.pasos.length}));else r.push({tipo:'parte',id:p.id});
    /* v208: tras el cuerno pequeño, la portada de sus señas, una seña por paso y la cuenta de los 1.260 años. */
    if(L.senas&&p.id===L.senasTras){r.push({tipo:'senasT',id:p.id});L.senas.forEach((x,j)=>r.push({tipo:'senas',id:p.id,sub:j,n:L.senas.length}));}
    if(L.periodo&&p.id===L.periodo.tras)L.periodo.pasos.forEach((x,j)=>r.push({tipo:'periodo',id:p.id,sub:j,n:L.periodo.pasos.length}));
    /* v210: después de los pasos del juicio, sus tres fases (una por paso). */
    if(L.fases&&p.id===L.fases.tras)L.fases.pasos.forEach((x,j)=>r.push({tipo:'fases',id:p.id,sub:j,n:L.fases.pasos.length}));
  });
  return [...r,{tipo:'desp'},{tipo:'cierre'}];
};
function lamHojaSub(p,j){
  const x=p.pasos[j];
  return '<div class="lam-hcab"><span class="lam-metal" style="--c:'+p.c+'"></span><div><div class="lam-p1">'+esc(p.nombre)+' · paso '+(j+1)+' de '+p.pasos.length+'</div>'+
    '<div class="lam-p2">'+esc(x.t)+'</div><div class="lam-fechas">'+esc(p.fechas)+'</div></div></div>'+
    '<div class="lam-puntos" aria-hidden="true">'+p.pasos.map((y,k)=>'<i'+(k<=j?' class="on"':'')+'></i>').join('')+'</div>'+
    '<div class="lam-capa t"><div class="lam-rot">Lo que dice el texto · RV1995</div><p><q>'+esc(x.texto)+'</q> <span class="lam-ref">'+x.ref+'</span></p></div>'+
    '<div class="lam-capa i"><div class="lam-rot">Lo que significa</div><p>'+x.nota+'</p><div class="lam-fu">Fuente: '+p.fuente+'</div></div>';
}
function lamHojaSenasT(){
  const L=LAM(),p=lamParte(L.senasTras),N=L.senas.length===11?'Once':L.senas.length;
  return '<div class="lam-hcab"><span class="lam-metal" style="--c:'+p.c+'"></span><div><div class="lam-p1">'+esc(p.nombre)+' · '+esc(p.reino)+'</div>'+
    '<div class="lam-p2">Las características del cuerno pequeño</div><div class="lam-fechas">'+N+' señas en Daniel 7</div></div></div>'+
    '<p class="lam-nota">Daniel 7 da '+N.toString().toLowerCase()+' señas del cuerno, y las '+N.toString().toLowerCase()+' se cumplen en un mismo poder. Una por una:</p>'+
    '<ol class="lam-sl pres">'+L.senas.map((x,k)=>'<li><span class="lam-slb"><i>'+(k+1)+'</i><b>'+x.t+'</b><span class="lam-ref">'+x.ref+'</span></span></li>').join('')+'</ol>'+
    '<div class="lam-fu">Fuente: '+L.senasFuente+'</div>';
}
function lamHojaPer(j){
  const P=LAM().periodo,p=lamParte(P.tras),x=P.pasos[j];
  return '<div class="lam-hcab"><span class="lam-metal" style="--c:'+p.c+'"></span><div><div class="lam-p1">'+esc(P.t)+' · paso '+(j+1)+' de '+P.pasos.length+'</div>'+
    '<div class="lam-p2">'+esc(x.t)+'</div><div class="lam-fechas">'+esc(P.s)+'</div></div></div>'+
    '<div class="lam-puntos" aria-hidden="true">'+P.pasos.map((y,k)=>'<i'+(k<=j?' class="on"':'')+'></i>').join('')+'</div>'+lamPerTx(j);
}
function lamHojaSenas(j){
  const L=LAM(),p=lamParte(L.senasTras);
  return '<div class="lam-hcab"><span class="lam-metal" style="--c:'+p.c+'"></span><div><div class="lam-p1">'+esc(p.nombre)+' · seña '+(j+1)+' de '+L.senas.length+'</div>'+
    '<div class="lam-p2">Las '+(L.senas.length===11?'once':L.senas.length)+' señas del cuerno</div><div class="lam-fechas">'+esc(p.reino)+'</div></div></div>'+
    '<ol class="lam-sl pres">'+L.senas.map((x,k)=>'<li class="'+(k<j?'on':k===j?'on ahora':'')+'"><span class="lam-slb"><i>'+(k+1)+'</i><b>'+x.t+'</b><span class="lam-ref">'+x.ref+'</span></span>'+(k===j?'<p>'+x.c+'</p>':'')+'</li>').join('')+'</ol>'+
    '<div class="lam-fu">Fuente: '+L.senasFuente+'</div>';
}
function lamPresE(k){
  const pasos=lamPasosE();if(k<0||k>=pasos.length)return;
  const dir=k>lamPaso?1:k<lamPaso?-1:0;lamPaso=k;lamPara();const s=pasos[k],L=LAM();
  const p=s.id?lamParte(s.id):null;
  lamCartel(k===0,true);
  const t=s.tipo==='hist'?L.historia[s.i]:s.tipo==='desp'?L.despues:s.tipo==='cierre'?{f:L.cierre.f,ref:L.cierre.ref,titulo:L.cierre.titulo,texto:L.cierre.texto,nota:esc(L.cierre.nota)}:null;
  if(s.tipo==='senasT'){lamSenasVis(-1,dir>0);lamHoja(lamHojaSenasT());}
  else if(s.tipo==='senas'){
    /* Las señas van sobre el cuerno ya armado: la imagen no se vuelve a armar en cada una. */
    lamSenasVis(s.sub,dir!==0);lamHoja(lamHojaSenas(s.sub));
  }else if(s.tipo==='periodo'){lamPeriodoVis(s.sub,dir>=0);lamHoja(lamHojaPer(s.sub));}
  else if(s.tipo==='fases'){lamFasesVis(s.sub,dir!==0);lamHoja(lamHojaFases(s.sub));}else if(p){lamVista(p.id,s.sub,dir>0);lamHoja(s.sub!=null?lamHojaSub(p,s.sub):lamHojaParte(p,0,1));}
  else{lamLimpia();lamHist(t);lamChip(null);lamD2(null);lamEnciende([]);
    lamHoja((k===0?'<div class="lam-portada">'+esc(L.libro)+' · '+esc(L.titulo)+'</div>':'')+lamHojaTexto(t));}
  /* La línea de tiempo marca hasta dónde va la historia, como en Daniel 2. */
  const ult=pasos.slice(0,k+1).filter(x=>x.tipo==='parte'&&L.tiempo.includes(x.id)).map(x=>x.id).pop();
  if(ult){const q=lamParte(ult),r=document.getElementById('lamRango');r.value=q.id==='juicio'?q.de:Math.min(q.a,2026);
    document.getElementById('lamTano').textContent=lamAnioTx(q.de)+' – '+(q.a>=2026?'hoy':lamAnioTx(q.a));document.getElementById('lamTq').textContent=q.reino;}
  if(s.tipo==='periodo'){const P=L.periodo,r=document.getElementById('lamRango');r.value=P.a;document.getElementById('lamTano').textContent=P.de+' – '+P.a+' d.C.';document.getElementById('lamTq').textContent='1.260 años del cuerno pequeño';}
  /* v209: el periodo de la parte en oro, y la cámara que se acerca despacio (no en los pasos que ya se acercan solos). */
  lamTramo(p&&s.tipo!=='periodo'?p.de:null,p?p.a:null);
  if(!(p&&p.pasos))lamAcerca(lamTodo(),0);
  /* El contador: cada parte, la portada de las señas y la cuenta de los 1.260 años (las señas van dentro de su portada). */
  const prim=pasos.map(x=>x.tipo==='senas'?false:x.sub==null||x.sub===0);
  document.getElementById('lamCuenta').textContent=prim.slice(0,k+1).filter(Boolean).length+' / '+prim.filter(Boolean).length;
  document.getElementById('lamAnt').disabled=k===0;document.getElementById('lamSig').disabled=k===pasos.length-1;
}


/** La actividad de una categoria, y su ficha completa. */
const ACT_DE=c=>(CATS[c]||CATS.av).act;
const ACT=()=>ACTIVIDADES[ACT_DE(S.cat)]||ACTIVIDADES.cb;
/* v164: EL TIPO DE MATERIAL MANDA, no la actividad. Lo que antes preguntaba
   «¿es Conexión Bíblica?» preguntaba en realidad «¿es un libro por
   capítulos?». Con el tipo, un segundo campamento del mismo libro (o un libro
   nuevo) se porta igual sin tocar nada aquí. */
const TIPO_ACT=a=>(ACTIVIDADES[a]||{}).tipo||'';
const TIPO=()=>TIPO_ACT(ACT_DE(S.cat));
const PRIMERA_ACT=Object.keys(ACTIVIDADES)[0];
/** La primera actividad de un tipo, o '' si no hay ninguna. */
const actDeTipo=t=>Object.keys(ACTIVIDADES).find(k=>TIPO_ACT(k)===t)||'';
/** Las categorias de una actividad, en el orden en que se ofrecen. */
const CATS_DE_ACT=a=>(ACTIVIDADES[a]||ACTIVIDADES.cb).cats.filter(c=>CATS[c]);

/* El nombre de una categoria NO la identifica: «Menores» y «Aventureros»
   existen en Conexion Biblica y en Devocion Matutina, con la misma edad. En
   cualquier lista donde puedan aparecer las dos hay que decir de que actividad
   es, o son dos filas identicas que nombran cosas distintas. El icono va
   delante porque la columna de una tabla en un celular no da para mas. */
const catConActividad=k=>CATS[k]
  ? ((ACTIVIDADES[CATS[k].act]||{}).icono||'')+' '+CATS[k].nombre
  : String(k);

/* ───────── y en un desplegable, dentro del TEXTO de la opcion ─────────
   MECANISMO
   Agrupar con <optgroup> es lo correcto y en escritorio se ve bien, pero el
   selector nativo de iOS pinta la lista de opciones SIN las etiquetas de
   grupo. Visto en un iPhone: las ocho categorias seguidas, con «Menores · 4 a
   6 años» dos veces, exactamente igual que antes de agrupar.

   REGLA: lo que distingue dos opciones va en el TEXTO de la opcion, nunca solo
   en la estructura que las rodea. La estructura la pinta cada navegador como
   quiera; el texto se ve en todos.

   Y va de PRIMERO, no al final: en una pantalla angosta el texto se corta o se
   envuelve, y si la parte que distingue queda al final, las dos opciones
   empiezan igual y se leen igual. */
/* v164: ACTIVIDAD Y CATEGORIA JUNTAS, sin repetir. Cuando el nombre de la
   actividad ya nombra a la categoria (antes «Conexion Biblica de Guias Mayores»),
   se dice una sola vez. `modo` es el orden: actividad primero (por defecto),
   'cat' la categoria primero, 'de' en frase y 'par' entre parentesis. */
const actYCat=(k,modo)=>{
  const c=CATS[k];
  if(!c)return String(k);
  const a=(ACTIVIDADES[c.act]||{}).nombre||'';
  if(a.indexOf(c.nombre)>=0)return a;
  return modo==='de'?c.nombre+' de '+a:modo==='cat'?c.nombre+' · '+a:
    modo==='par'?c.nombre+' ('+a+')':a+' · '+c.nombre;
};
const catLarga=k=>CATS[k]
  ? actYCat(k)+' '+CATS[k].edad
  : String(k);


const CAT=()=>CATS[S.cat]||CATS.av;

const CLAVE='conexion-biblica-v4';
/* `ft` es la caja de cada tarjeta (0, 1 o 2) y ya venía de antes. `fv` es
   NUEVO: el día en que se acertó por última vez. Se agrega como mapa aparte, y
   no cambiando la forma de `ft`, para que el progreso que ya está guardado en
   los celulares siga valiendo sin migración. */
/* `qv` cuenta CUANTAS VECES le ha salido cada pregunta a esta ficha. Campo
   nuevo, no renombrado: una ficha vieja llega sin el y `normalizar` lo deja
   en cero, que es exactamente «nunca le ha salido nada». */
/* ── ÍCONOS (v146) ──
   IC('check') pinta un ícono del sprite de cuerpo.html en línea con el texto.
   icoDe('📖') traduce el emoji que guardan los datos (actividades, fichas de
   repaso, doctrinas) al ícono de la app. Los datos no cambian: la hoja impresa
   y la marca de «es una ficha» (c.icono) siguen leyendo el emoji. Un emoji sin
   traducción no se pinta: mejor sin ícono que con uno de otro idioma. */
const IC=(n,c)=>'<svg class="ico-t'+(c?' '+c:'')+'" aria-hidden="true"><use href="#i-'+n+'"/></svg>';
const ICO_DE={'📘':'libro','📖':'libro','📕':'comparar','📗':'libro','🌅':'sol','✝️':'cruz','🕰️':'reloj','👥':'grupo',
  '🔢':'numeros','⚠️':'alerta','👑':'corona','🗿':'estatua','🗺️':'mapa','🎯':'diana','💬':'bocadillo',
  '🧍':'persona','⛪':'iglesia','🕊️':'paloma','🦸':'escudo','⚙️':'ajustes','✳️':'lista','🔎':'lupa','🃏':'tarjetas',
  '✏️':'lapiz','❓':'ayuda','🧭':'brujula'};
const icoDe=(e,c)=>ICO_DE[e]?IC(ICO_DE[e],c):'';

/* Protectores de racha que se pueden guardar (ver sumaRacha). Va aquí arriba,
   junto a BASE, porque normalizar() la usa al cargar: más abajo daría TDZ. */
const PROTECTOR_MAX=2;
const BASE={v:4,pid:'',nombre:'',cat:'av',aCargo:false,tutor:'',prog:{},examenes:[],racha:0,ultimo:null,protector:0,protegio:'',insignias:[],fq:{},ft:{},fv:{},qv:{},acc:{},act:{},links:{},ultPantalla:'',ultItem:''};

/* Clave estable por pregunta/tarjeta: hash del texto, sobrevive a
   reordenar el banco en fuente/. */
function hashTxt(s){let h=5381;s=String(s);for(let i=0;i<s.length;i++)h=((h<<5)+h+s.charCodeAt(i))|0;return (h>>>0).toString(36);}
const claveQ=q=>q.cap+'.'+hashTxt((q.q||q.ins||'')+(q.p?q.p.map(p=>p.b||p.x).join('¦'):''));
const claveT=t=>t.cap+'.'+hashTxt(t.f||'');

/* Día local, no UTC ni horas. Va ACÁ ARRIBA a propósito: normalizar() la usa
   para acotar fechas del futuro, y normalizar() corre al leer el estado
   guardado, mucho antes de la sección de tarjetas. Definirla allá abajo dejaba
   la app sin arrancar. */
/* Van aca arriba, no junto a habla(): ir() llama paraVoz() y esta declarado
   antes que la seccion de voz. Un `let` usado antes de su declaracion lanza
   por TDZ y la app no arranca, y el chequeo de sintaxis no lo detecta. Ya
   paso una vez en este archivo con diaHoy. */
let vozBtn=null, vozReloj=null;
/* El estado de la cola de voz y la velocidad del modo lectura: aquí arriba
   por la misma razón (paraVoz los usa). VELS: 0,9 es la de siempre para
   memorizar; los botones sueltos siguen en .85. */
const VZ={partes:[],i:0,sonando:false,turno:0,modo:'',rate:.85};
const VELS=[.9,1,1.25];
let lecVel=.9;
try{const v=Number(localStorage.getItem('cb-vel'));if(VELS.includes(v))lecVel=v;}catch(e){}

/* ── APARIENCIA (v207): automático, claro u oscuro ──
   Es del aparato, como la velocidad de lectura: va en su propia llave y viaja
   con la mudanza (LLAVES_MUDANZA). «Automático» no escribe nada en el <html>
   y deja que el CSS siga al teléfono (prefers-color-scheme); «Claro» y
   «Oscuro» lo fijan con data-apariencia, el mismo nombre que usa Jóvenes.
   DENTRO DE JÓVENES NO SE TOCA: allá el <html> es el de Jóvenes (no lleva
   data-cb-solo) y el modo lo decide esa app. */
const APAR_K='cb-apariencia', APARIENCIAS=[['auto','Automático'],['claro','Claro'],['oscuro','Oscuro']];
let apariencia=(()=>{try{const v=localStorage.getItem(APAR_K);return v==='claro'||v==='oscuro'?v:'auto';}catch(e){return 'auto';}})();
const appSola=()=>{const h=document.documentElement;return !!(h&&h.hasAttribute&&h.hasAttribute('data-cb-solo'));};
function aplicaApariencia(){
  if(!appSola())return;
  const h=document.documentElement;
  if(apariencia==='auto')h.removeAttribute('data-apariencia');else h.setAttribute('data-apariencia',apariencia);
}
aplicaApariencia();
function ponApariencia(v){
  if(!APARIENCIAS.some(a=>a[0]===v))return;
  apariencia=v;
  try{if(v==='auto')localStorage.removeItem(APAR_K);else localStorage.setItem(APAR_K,v);}catch(e){}
  aplicaApariencia();pintaApariencia();
}
function pintaApariencia(){
  const c=document.getElementById('apar-card');if(!c)return;
  c.hidden=!appSola();if(c.hidden)return;
  document.getElementById('apar-ops').innerHTML=APARIENCIAS.map(([k,t])=>
    '<button type="button" role="radio" class="apar-b" aria-checked="'+(apariencia===k)+'" onclick="ponApariencia(\''+k+'\')">'+t+'</button>').join('');
}

const diaHoy=()=>Math.floor((Date.now()-new Date().getTimezoneOffset()*60000)/864e5);

function normalizar(x){
  const s=JSON.parse(JSON.stringify(BASE));
  CAPS.forEach(c=>s.prog[c.id]=0);
  if(!x||typeof x!=='object')return s;
  /* `pid` ata esta ficha a una persona del servidor. Es lo unico que
     sobrevive a que le cambien el nombre. */
  if(typeof x.pid==='string')s.pid=x.pid.slice(0,64);
  if(typeof x.nombre==='string')s.nombre=x.nombre.slice(0,60);
  /* v191: una ficha «a cargo» es de un niño que estudia en el teléfono de un
     adulto (Aventureros, o un conquistador sin cuenta); `tutor` es ese adulto. */
  if(x.aCargo===true)s.aCargo=true;
  if(typeof x.tutor==='string')s.tutor=x.tutor.slice(0,60);
  if(Object.keys(CATS).includes(x.cat))s.cat=x.cat;
  /* DONDE SE QUEDO, para que un refresco no la mande siempre a Inicio (ver
     el arranque, mas abajo). Son solo una pestaña y un id de material: nunca
     HTML, nunca algo que se pinte tal cual. */
  if(typeof x.ultPantalla==='string')s.ultPantalla=x.ultPantalla.slice(0,20);
  if(typeof x.ultItem==='string')s.ultItem=x.ultItem.slice(0,20);

  if(x.prog&&typeof x.prog==='object')
    CAPS.forEach(c=>{const v=Number(x.prog[c.id]);s.prog[c.id]=Number.isFinite(v)?Math.min(100,Math.max(0,v)):0;});
  if(Array.isArray(x.examenes))
    s.examenes=x.examenes.filter(e=>e&&Number.isFinite(Number(e.pts)))
      .map(e=>({pts:Number(e.pts),total:Number(e.total)||0,
        cat:Object.keys(CATS).includes(e.cat)?e.cat:'av',fecha:String(e.fecha||''),
        modo:['simulacro','errores','evaluacion','compartido','real'].includes(e.modo)?e.modo:'normal',
        nv:[1,2,3].includes(Number(e.nv))?Number(e.nv):1,
        /* v176: segundos que tardó, y de qué hoja era si fue un examen real. */
        ...(Number.isInteger(e.dur)&&e.dur>0&&e.dur<36000?{dur:e.dur}:{}),
        ...(typeof e.ex==='string'&&EXAMENES_REALES[e.ex]?{ex:e.ex}:{})})).slice(-40);
  const r=Number(x.racha);s.racha=Number.isFinite(r)?Math.max(0,Math.min(999,r)):0;
  if(typeof x.ultimo==='string')s.ultimo=x.ultimo;
  const pr=Number(x.protector);s.protector=Number.isFinite(pr)?Math.max(0,Math.min(PROTECTOR_MAX,Math.round(pr))):0;
  if(typeof x.protegio==='string')s.protegio=x.protegio.slice(0,20);
  if(Array.isArray(x.insignias))s.insignias=x.insignias.filter(i=>typeof i==='string').slice(0,20);
  if(x.fq&&typeof x.fq==='object')
    for(const k of Object.keys(x.fq).slice(0,600)){
      const m=Number(x.fq[k]&&x.fq[k].m);
      if(Number.isFinite(m)&&m>0)s.fq[k]={m:Math.min(99,Math.round(m))};
    }
  if(x.qv&&typeof x.qv==='object')
    for(const k of Object.keys(x.qv).slice(0,3000)){
      const v=Number(x.qv[k]);
      if(Number.isFinite(v)&&v>0)s.qv[k]=Math.min(99,Math.round(v));
    }
  /* `act` es NUEVO: acierto por TIPO de pregunta (múltiple, V/F, completar).
     `acc` ya guardaba por capítulo, y eso dice DÓNDE falla pero no EN QUÉ. La
     sección III del examen real es completar el versículo: ir al 90% en
     múltiple y al 40% en completar da el mismo promedio por capítulo que ir
     al 65% en las dos, y son dos situaciones muy distintas. */
  if(x.act&&typeof x.act==='object')
    for(const t of ['mc','tf','fill']){
      const v=x.act[t];
      if(v&&typeof v==='object'){
        const b=Math.max(0,Math.round(Number(v.b)||0)),m=Math.max(0,Math.round(Number(v.m)||0));
        if(b+m>0)s.act[t]={b:Math.min(9999,b),m:Math.min(9999,m)};
      }
    }
  if(x.fv&&typeof x.fv==='object')
    for(const k of Object.keys(x.fv).slice(0,600)){
      const d=Number(x.fv[k]);
      /* Una fecha del futuro sería un reloj mal puesto: se acota a hoy, o la
         tarjeta no volvería a salir nunca. */
      if(Number.isFinite(d)&&d>0)s.fv[k]=Math.min(diaHoy(),Math.round(d));
    }
  if(x.ft&&typeof x.ft==='object')
    for(const k of Object.keys(x.ft).slice(0,600)){
      const c=Number(x.ft[k]);
      if(Number.isFinite(c))s.ft[k]=Math.min(2,Math.max(0,Math.round(c)));
    }
  if(x.acc&&typeof x.acc==='object')
    CAPS.forEach(c=>{
      const v=x.acc[c.id];
      if(v&&typeof v==='object'){
        const b=Number(v.b),m=Number(v.m);
        s.acc[c.id]={b:Number.isFinite(b)?Math.min(9999,Math.max(0,Math.round(b))):0,
                     m:Number.isFinite(m)?Math.min(9999,Math.max(0,Math.round(m))):0};
      }
    });
  /* Compatibilidad: fichas guardadas antes de v24 traen `links`. Ya no se usan
     (la evaluación vive en el servidor), pero se conservan para no borrarle el
     historial a nadie al actualizar. */
  if(x.links&&typeof x.links==='object')
    for(const k of Object.keys(x.links).slice(0,200)){
      const v=x.links[k];
      if(!v||typeof v!=='object')continue;
      /* pts null significa «abierto y sin terminar», y hay que distinguirlo de
         cero de verdad: Number(null) es 0, así que leerlo con Number a secas
         convertía un examen abandonado en un examen sacado en cero. */
      const p=(v.pts===null||v.pts===undefined)?NaN:Number(v.pts);
      const t=Number(v.total);
      s.links[String(k).slice(0,12)]={
        pts:Number.isFinite(p)?Math.max(0,Math.round(p)):null,
        total:Number.isFinite(t)?Math.max(0,Math.round(t)):0,
        fecha:String(v.fecha||'').slice(0,40)};
    }
  return s;
}
/* ───────── varios participantes en un mismo aparato ─────────
   Los dos eventos llevan niños distintos: dos de 4 a 6 y dos de 7 a 9 en
   Conexión Bíblica, otros dos y otros dos en la Devoción Matutina, más los
   padres. Antes la app guardaba un solo progreso, así que si dos niños la
   usaban en el mismo celular se pisaban los errores y las tarjetas.

   Ahora se guarda { activo, alumnos:{id:datos} } y `S` apunta al alumno
   activo. Todo lo demás del código sigue leyendo `S` y no se enteró del
   cambio. La clave subió a v4 y se migra lo que hubiera en v3. */
const CLAVE_VIEJA='conexion-biblica-v3';
const MAX_ALUMNOS=12;

function nuevoId(){
  /* Id corto y estable, sin depender de la hora del sistema. */
  let n=1;
  while(DB&&DB.alumnos&&DB.alumnos['a'+n])n++;
  return 'a'+n;
}

function normalizarDB(x){
  const db={v:4,activo:'',alumnos:{},evento:false};
  if(x&&typeof x==='object'&&x.alumnos&&typeof x.alumnos==='object'){
    for(const id of Object.keys(x.alumnos).slice(0,MAX_ALUMNOS))
      db.alumnos[String(id).slice(0,8)]=normalizar(x.alumnos[id]);
    if(typeof x.activo==='string'&&db.alumnos[x.activo])db.activo=x.activo;
  }else if(x&&typeof x==='object'){
    /* Formato viejo: un solo alumno suelto. Se convierte en el primero. */
    db.alumnos.a1=normalizar(x);
  }
  if(!Object.keys(db.alumnos).length)db.alumnos.a1=normalizar(null);
  if(!db.activo)db.activo=Object.keys(db.alumnos)[0];
  return db;
}

let DB, S;
try{
  const guardado=JSON.parse(localStorage.getItem(CLAVE)||'null');
  const legado=guardado?null:JSON.parse(localStorage.getItem(CLAVE_VIEJA)||'null');
  DB=normalizarDB(guardado||legado);
}catch(e){DB=normalizarDB(null);}
S=DB.alumnos[DB.activo];

function guardar(){try{localStorage.setItem(CLAVE,JSON.stringify(DB));}catch(e){}programaSubida();}

/* ── EL PROGRESO VIAJA CON LA PERSONA, NO CON EL NAVEGADOR ──────────────
   MECANISMO
   Una sola llamada sube y baja: el aparato manda SU ficha, el servidor la
   funde con la guardada y devuelve el resultado, y el aparato adopta lo
   devuelto. La fusión vive SOLO en el servidor (functions/api): escribirla
   también aquí serían dos versiones de la misma regla, y el día que una
   cambie la otra deja de coincidir sin avisar.

   CUÁNDO SE DISPARA
   Al arrancar con sesión, al entrar con el código, y 4 segundos después del
   último guardado. Los 4 segundos no son un adorno: sin ellos, contestar un
   examen de 15 preguntas mandaría quince fichas.

   SI NO HAY SEÑAL NO PASA NADA, y no hace falta cola: como la fusión es
   monótona (lo que crece nunca decrece), lo que no subió hoy sube en la
   próxima llamada con el mismo resultado. Esto NO reemplaza la cola de las
   notas de evaluación, que sí tienen que llegar una por una.

   SIN SESIÓN, TODO SIGUE EXACTAMENTE IGUAL QUE ANTES: quien nunca entró con
   un código estudia contra su localStorage y no habla con el servidor. */
let progTimer=null, adoptandoProg=false;

function programaSubida(){
  if(adoptandoProg)return;
  if(!srvYo||srvYo.rol!=='participante')return;
  if(typeof setTimeout!=='function')return;
  clearTimeout(progTimer);
  progTimer=setTimeout(function(){sincronizaProgreso();},4000);
}

/** ¿La ficha que esta abierta en el aparato es la de la sesion del servidor?
 *  Si la ficha ya sabe de quien es (`pid`), esa es la comparacion buena: no
 *  depende del nombre, que el director puede cambiar desde v110. Una ficha
 *  vieja todavia no tiene pid, y ahi se cae al nombre y a la ACTIVIDAD, que es
 *  como se comparaba antes. Por actividad y no por categoria a proposito: una
 *  nina puede pasar de Menores a Aventureros y sigue siendo su progreso. */
/** ¿La ficha abierta es de la persona de la sesion, pero de su OTRA actividad?
 *  Mismo nombre y actividad distinta, que es como pasaAActividad() empareja
 *  las fichas de una persona. Otra persona en el mismo celular no entra aqui:
 *  ahi el arranque si debe pasar a la ficha de quien tiene la sesion. */
function esMiOtraActividad(){
  if(!srvYo||!S||!srvYo.nombre||!CATS[srvYo.categoria])return false;
  if(S.pid&&srvYo.id&&S.pid===srvYo.id)return false;
  return (S.nombre||'').trim().toLowerCase()===String(srvYo.nombre).trim().toLowerCase()&&
    ACT_DE(S.cat)!==ACT_DE(srvYo.categoria);
}
function fichaEsDeLaSesion(){
  if(!srvYo||!S)return false;
  if(S.pid&&srvYo.id)return S.pid===srvYo.id;
  if(srvYo.nombre&&(S.nombre||'').trim().toLowerCase()!==String(srvYo.nombre).trim().toLowerCase())
    return false;
  if(srvYo.categoria&&CATS[srvYo.categoria]&&ACT_DE(S.cat)!==ACT_DE(srvYo.categoria))
    return false;
  return true;
}

async function sincronizaProgreso(){
  if(!srvYo||srvYo.rol!=='participante'||!S)return false;
  /* LA GUARDA, a proposito. Quien llame a esto sin haber alineado la ficha no
     sube nada, en vez de mezclar dos progresos. */
  if(!fichaEsDeLaSesion())return false;
  let cuerpo;
  try{cuerpo=JSON.stringify(S);}catch(e){return false;}
  try{
    const d=await srvFetch('/progreso',{method:'POST',body:cuerpo});
    if(!d||!d.ficha)return false;
    adoptandoProg=true;
    DB.alumnos[DB.activo]=normalizar(d.ficha);
    S=DB.alumnos[DB.activo];
    guardar();
    adoptandoProg=false;
    if(typeof pintaInicio==='function')pintaInicio();
    if(typeof pintaSesion==='function')pintaSesion();
    return true;
  }catch(e){adoptandoProg=false;return false;}
}

/* ───────── perfil director ─────────
   MECANISMO
   La app es un solo archivo estático: todo lo que sabe está en el HTML que el
   navegador ya descargó, respuestas correctas incluidas. Así que el perfil
   director no esconde datos, esconde la pantalla que los muestra. Lo que sí es
   real: en el HTML no va la clave, va su SHA-256, y de un SHA-256 no se saca la
   clave. Quien mire el código encuentra 64 caracteres inútiles.

   POR QUÉ NO UN PARÁMETRO EN LA DIRECCIÓN
   ?director se copia una vez y se pasa entre primas. La clave hay que saberla,
   y queda en el aparato del director.

   POR QUÉ sessionStorage Y NO localStorage
   El director entra su clave en el celular de la niña para revisar. Con
   localStorage ese celular quedaría en modo director para siempre;
   sessionStorage se borra al cerrar la pestaña.

   POR QUÉ NO DISTINGUE MAYÚSCULAS
   La clave se escribe en el celular de una niña, de pie, en medio del club, y el
   teclado de iOS pone mayúscula en la primera letra por su cuenta. Un SHA-256
   distinto por una D distinta se lee como «me equivoqué» cuando la clave estaba
   bien. Se normaliza a minúsculas y sin espacios de sobra antes de comparar.
   Lo que se pierde: nada que importe. La clave no aguanta un ataque de fuerza
   bruta por ser larga, sino porque nadie la va a probar veinte veces a mano.

   LÍMITE
   crypto.subtle solo existe en contexto seguro (https). Abriendo el archivo con
   doble clic (file://) el perfil no se puede activar, y la app lo dice en vez
   de fallar en silencio. */
const CLAVE_DIR='8b43cbf2d3c9c8b365bf28e8309c7af81298d592fddc61bdd8e77a827d46f904';

/* La clave tal como se compara: sin espacios de sobra y en minúsculas. */
const normClave=c=>String(c||'').trim().toLowerCase();

let director=false;
try{director=sessionStorage.getItem('cb-dir')==='1';}catch(e){}

async function sha256(t){
  const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(t));
  return [...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('');
}

/* Devuelve el texto del error, o cadena vacía si entró. */
async function activaDirector(clave){
  if(!(typeof crypto!=='undefined'&&crypto.subtle))
    return 'El perfil director necesita la app abierta desde su dirección de internet, no el archivo abierto a mano.';
  let h='';
  try{h=await sha256(normClave(clave));}
  catch(e){return 'Este navegador no pudo verificar la clave.';}
  if(h!==CLAVE_DIR)return 'Esa clave no es la del director.';
  director=true;
  try{sessionStorage.setItem('cb-dir','1');}catch(e){}
  return '';
}

function salirDirector(){
  director=false;
  try{sessionStorage.removeItem('cb-dir');}catch(e){}
  if(ultimoRes)pintaResultado();
}

/* En el simulacro y en la evaluación del día, quien contesta ve la nota y no la
   revisión: ni cuál falló ni cuál era la correcta. El director sí, con su
   clave, en el mismo aparato y al terminar. */
const revelaRespuestas=()=>director||!(modo==='simulacro'||modo==='evaluacion');

/* ───────── el servidor (v20) ─────────
   MECANISMO, Y ES EL CAMBIO DE FONDO DE ESTA VERSIÓN
   Hasta v19 el cierre vivía en el localStorage de cada celular. localStorage es
   por origen y por navegador: ningún aparato puede preguntarle nada a otro, así
   que cerrar había que repetirlo celular por celular y borrar los datos del
   navegador lo abría. Ahora hay una fila en D1 que todos los aparatos leen. La
   app dejó de decidir si puede arrancar un examen: lo PREGUNTA.

   CÓMO SE COMPORTA SIN SEÑAL, QUE ES EL CASO QUE IMPORTA
   El campamento puede no tener red. Por eso:
     · La respuesta del servidor se guarda en el aparato con su hora.
     · Si el servidor no contesta, manda lo último que dijo. Si dijo «cerrado»,
       sigue cerrado: se falla CERRADO, nunca abierto por accidente.
     · Si nunca contestó, manda el interruptor local de v19, que sigue vivo como
       respaldo.
   Estudiar, las tarjetas y el manual no le preguntan nada a nadie: la app sigue
   funcionando completa sin señal. */
const SRV_CACHE='cb-srv';
const SRV_TIMEOUT=2500;
let srvYo=null;

function srvLee(){
  try{
    const x=JSON.parse(localStorage.getItem(SRV_CACHE)||'null');
    return x&&typeof x==='object'&&typeof x.practica==='boolean'?x:null;
  }catch(e){return null;}
}

/* evalId/evalTitulo siguen siendo UNA evaluación (la que le toca a ESTE
   aparato: la de la participante que entró con código, o ninguna). Eso no
   cambió, porque a un aparato nunca le pueden tocar dos a la vez.
   `evaluaciones` es nuevo y es la lista COMPLETA de lo que /estado ve abierto
   en el servidor ahora mismo (puede haber varias, una por categoría); solo la
   usa el panel del director para saber que hay algo corriendo antes de que
   termine de cargar el detalle. Si no se pasa (como en las llamadas viejas,
   con 3 argumentos), se conserva lo último que había, para no borrarle al
   director esa lista cada vez que un aparato de participante escribe en esta
   misma llave de localStorage. */
function srvGuarda(practica,evalId,evalTitulo,evaluaciones){
  try{
    const prev=srvLee();
    localStorage.setItem(SRV_CACHE,JSON.stringify(
      {practica:!!practica,evalId:evalId||null,evalTitulo:evalTitulo||null,
       evaluaciones:evaluaciones!==undefined?evaluaciones:((prev&&prev.evaluaciones)||[]),
       visto:Date.now()}));
  }catch(e){}
}

/* ───────── LAS PREGUNTAS RETIRADAS ─────────
   QUE ES UNA PREGUNTA RETIRADA
   Una que el director leyo y decidio sacar: esta repetida, mal redactada, o
   pregunta algo que el reglamento no pide. No se borra, se retira: sigue en el
   HTML y se puede devolver.

   POR QUE NO SE BORRA DEL BANCO
   El banco son 1.378 preguntas dentro de index.html, que es un archivo
   GENERADO: quitar una obliga a editar el generador, correr build.js y
   desplegar. Eso no se hace desde un celular. Asi que el retiro vive en el
   servidor, la app se lo trae y lo aplica al armar el examen. El artefacto no
   se toca y el generador tampoco.

   SE CACHEA IGUAL QUE LO DEMAS DEL SERVIDOR
   Viaja dentro de /estado, que es lo que la app ya consulta al arrancar y
   antes de cada examen. Sin señal se usa lo ultimo que se supo, que es lo
   mismo que hace el interruptor de la practica. Si nunca contesto, el conjunto
   esta vacio: el banco completo, que es lo que el artefacto trae escrito. */
const RET_CACHE='cb-ret';
let retiradas=new Set();
function retLee(){
  try{const x=JSON.parse(localStorage.getItem(RET_CACHE)||'[]');return Array.isArray(x)?x:[];}
  catch(e){return [];}
}
function retGuarda(lista){
  try{localStorage.setItem(RET_CACHE,JSON.stringify(lista.slice(0,3000)));}catch(e){}
}
function ponRetiradas(lista){retiradas=new Set(lista||[]);}
ponRetiradas(retLee());
const estaRetirada=q=>retiradas.has(claveQ(q));

/* LAS FICHAS QUE LLEGAN DE LA BASE. Se guardan para la próxima apertura (ver
   «el reglamento se arma al abrir», al principio). Si son distintas de las que
   se usaron para abrir, hay reglamento nuevo y se avisa con el mismo aviso de
   material nuevo; si alguien las devuelve a como estaban, el aviso se quita. */
let fichasNuevas=false;
function fichasLlegan(lista){
  const llegan=JSON.stringify(lista), corren=JSON.stringify(FICHAS_GUARDADAS);
  try{
    if(lista.length)localStorage.setItem(FICHAS_CACHE,JSON.stringify({fichas:lista}));
    else localStorage.removeItem(FICHAS_CACHE);
  }catch(e){}
  fichasNuevas=llegan!==corren;
  if(typeof pintaAvisoVer==='function')pintaAvisoVer();
  /* v169: el enlace pedía un concurso que este aparato no conocía y acaba de
     llegar. Se vuelve a abrir en él, una sola vez. */
  if(concursoEspera&&lista.some(f=>f&&f.id===concursoEspera)){
    const a=concursoEspera;concursoEspera='';
    let ya='';try{ya=sessionStorage.getItem(CONCURSO_REC)||'';}catch(e){}
    if(ya!==a&&!(typeof examenEnCurso==='function'&&examenEnCurso())){
      try{sessionStorage.setItem(CONCURSO_REC,a);}catch(e){}
      try{location.replace(location.pathname+'?concurso='+a);}catch(e){}
    }
  }
}

/* fetch con límite de tiempo: sin esto, un celular con una barra de señal deja
   la niña mirando un botón que no responde. */
async function srvFetch(ruta,opciones){
  const ctrl=typeof AbortController!=='undefined'?new AbortController():null;
  const t=ctrl?setTimeout(()=>ctrl.abort(),SRV_TIMEOUT):0;
  try{
    const o=Object.assign({credentials:'same-origin'},opciones||{});
    if(ctrl)o.signal=ctrl.signal;
    if(o.body)o.headers=Object.assign({'content-type':'application/json'},o.headers||{});
    const r=await fetch('/api'+ruta,o);
    let d=null;try{d=await r.json();}catch(e){}
    if(!r.ok){const err=new Error((d&&d.error)||'No se pudo conectar');err.datos=d;err.status=r.status;throw err;}
    return d;
  }finally{if(t)clearTimeout(t);}
}

/* Refresca el interruptor global. Devuelve true si el servidor contestó. */
async function srvRefresca(){
  try{
    const d=await srvFetch('/estado');
    const evaluaciones=d.evaluaciones||[];
    /* evalId/evalTitulo (el aviso genérico de "hay una evaluación abierta",
       que usa pintaCierre() para cualquier aparato sin código) toman la que
       de verdad cierra la práctica para todos, si hay una así. Con varias
       abiertas dirigidas cada una a su categoría, ninguna es "la" de este
       aviso general: ese aparato sigue practicando y no hay nada que avisar
       aquí (a la participante invitada se lo dice /evaluacion, que sí sabe
       quién es ella). */
    const paraTodas=evaluaciones.find(function(e){return e.paraTodas;});
    srvGuarda(d.practica, paraTodas&&paraTodas.id, paraTodas&&paraTodas.titulo, evaluaciones);
    /* Solo si vino el campo. Un servidor viejo (o una respuesta recortada) no
       puede DEVOLVER al banco preguntas que el director retiro: se queda con
       lo ultimo que se supo, igual que el interruptor de la practica. */
    if(Array.isArray(d.retiradas)){ponRetiradas(d.retiradas);retGuarda(d.retiradas);}
    /* Igual con las fichas guardadas: solo si vino el campo. Si la base no
       contesta por ellas, el aparato se queda con las que ya tenía. */
    if(Array.isArray(d.fichas))fichasLlegan(d.fichas);
    return true;
  }catch(e){return false;}
}

async function srvQuienSoy(){
  try{const d=await srvFetch('/yo');srvYo=d&&d.rol?d:null;}
  catch(e){srvYo=null;}
  return srvYo;
}

/* La nota se manda al servidor pero NO se espera: si no hay señal, la nota ya
   quedó guardada en el aparato y la pantalla no se puede quedar esperando. */
/* La nota se manda sin esperar, pero NO se puede perder.
   Antes esto era un `.catch(function(){})`: si el celular se quedaba sin señal
   justo al entregar, la nota quedaba en el aparato y el director no la veía
   nunca. Ahora el intento se guarda en una cola y se reintenta al abrir la app.
   La clave de idempotencia se genera UNA vez y viaja con el intento, así que
   reintentar no puede duplicar la nota. */
const COLA='cb-cola';

function colaLee(){
  try{const x=JSON.parse(localStorage.getItem(COLA)||'[]');return Array.isArray(x)?x.slice(0,20):[];}
  catch(e){return [];}
}
function colaGuarda(a){try{localStorage.setItem(COLA,JSON.stringify(a.slice(0,20)));}catch(e){}}

/* ───────── lo que respondio, no solo cuanto saco ─────────
   MECANISMO
   El examen corre entero en el navegador, asi que el servidor recibia nota y
   total y nada mas. El director veia «13/20» y para saber EN QUE se equivoco
   tenia que ir al celular de ella y abrir la revision ahi mismo, apenas
   terminaba. Despues del campamento eso ya no se puede.

   QUE SE MANDA: una entrada por pregunta con la CLAVE de la pregunta, el tipo,
   lo que respondio y si acerto. No se manda el texto de la pregunta: ese vive
   en el HTML y el panel lo busca por la clave al pintar.

   POR QUE LA CLAVE Y NO LA SEMILLA
   Con la semilla se puede reconstruir el examen, pero solo mientras el banco no
   cambie: una pregunta nueva corre el sorteo y la reconstruccion deja de
   coincidir. La clave no depende del banco, asi que la revision sigue siendo
   correcta cuando el banco crezca. */
function respuestasDe(sel){
  return sel.map(q=>{
    const e={k:claveQ(q),t:q.t,b:bien(q)?1:0};
    /* En mc se guarda el TEXTO, no el indice. Las opciones se barajan por
       examen, asi que el indice solo significa algo dentro de ESE sorteo, y el
       sorteo no se guarda. El panel resuelve contra el banco sin barajar, asi
       que con el indice mostraba otra opcion. Aqui `q` todavia es la copia
       barajada: el indice vale y se cambia por su texto, que no depende del
       orden. Un `r` numerico en la base es de antes de este cambio. */
    if(q.t==='mc'){
      const i=resp[q.id];
      e.r=(i===undefined||i===null||!q.o?null:q.o[i]);
    }
    else if(q.t==='tf')e.r=(resp[q.id]===undefined?null:!!resp[q.id]);
    else e.r=q.p.map((x,i)=>x.b?String(resp[q.id+'_'+i]||''):null);
    return e;
  });
}

function srvIntento(modo,evalId,nota,total,respuestas){
  if(!srvYo||srvYo.rol!=='participante')return;
  let idem='';
  try{idem=crypto.randomUUID();}catch(e){idem=String(Date.now())+Math.random();}
  const cuerpo={modo:modo,evaluacion_id:evalId||null,nota:nota,total:total,idempotency_key:idem,
    respuestas:respuestas?JSON.stringify(respuestas):''};
  const cola=colaLee();cola.push(cuerpo);colaGuarda(cola);
  enviaCola();
}

/* Vacía la cola. Un 409 («ya la hiciste») también saca el intento: reintentarlo
   para siempre no lo va a arreglar. Un fallo de red lo deja para la próxima. */
async function enviaCola(){
  let cola=colaLee();
  if(!cola.length||!srvYo||srvYo.rol!=='participante')return;
  const quedan=[];
  for(const it of cola){
    try{await srvFetch('/intento',{method:'POST',body:JSON.stringify(it)});}
    catch(e){
      if(!(e&&e.status>=400&&e.status<500))quedan.push(it);
    }
  }
  colaGuarda(quedan);
}

/* ───────── el cierre de la práctica ─────────
   UNA SOLA PERILLA.
   La práctica está cerrada exactamente cuando hay una evaluación abierta. No
   hay interruptor por aparato ni segundo estado que sincronizar: el servidor
   dice «hay evaluación» y con eso ya está dicho todo.
   Sin señal manda lo último que se supo, y si eso era «cerrado», sigue cerrado:
   se falla CERRADO, nunca abierto por accidente. El director se lo salta.

   HOY LA PERILLA ESTA EN «NO CERRAR», por decisión de Camilo del 19 de
   septiembre: el examen final no se presenta en esta app por ahora, así que
   todo lo que se abre aquí es un ensayo, y un ensayo que le apaga la práctica
   a las participantes hace más daño que bien. La evaluación se sigue viendo y
   se sigue pudiendo hacer; lo único que ya no pasa es que se cierre lo demás.

   ESTO ES UNA LINEA, A PROPOSITO. Cuando el examen de verdad se presente aquí,
   se pone `CIERRA_PRACTICA=true` y vuelve el comportamiento completo, que
   sigue escrito y probado abajo. Se deja como interruptor y no se borra el
   mecanismo porque «por ahora» fueron las palabras de Camilo. */
let CIERRA_PRACTICA=false;
const examenesCerrados=()=>{
  if(!CIERRA_PRACTICA)return false;
  if(director)return false;
  const c=srvLee();
  return !!(c&&c.practica===false);
};


const alumnos=()=>Object.entries(DB.alumnos);

function cambiaAlumno(id){
  if(!DB.alumnos[id])return;
  DB.activo=id;S=DB.alumnos[id];guardar();
  /* Al cambiar de persona se reinicia lo que está en pantalla: el mazo de
     tarjetas y el examen en curso son de quien estaba antes. */
  /* El filtro de estudio es de quien lo puso: la siguiente persona en este
     celular no hereda la mitad del material escondida. */
  filtroEst='todo';filtroAbierto=false;filtroMenu=false;try{localStorage.setItem(FILTRO_K,'todo');}catch(e){}
  reiniciaPractica();alcance='todo';cuantas=0;nivel=0;reiniciaFuente();
  prueba=[];resp={};entregado=false;clearInterval(reloj);
  marcaCat();pintaInicio();pintaCaps();pintaYo();
  try{document.getElementById('detalle').style.display='none';}catch(e){}
  cierraHoja();
  /* Se aterriza en Inicio a propósito: al cambiar de persona o de actividad el
     mazo y el examen se reiniciaron, y quedarse en Tarjetas con un mazo vacío
     no se entiende. Inicio dice qué estudiar hoy con el material nuevo. */
  ir('inicio');
}

function agregaAlumno(){
  if(alumnos().length>=MAX_ALUMNOS)return;
  const id=nuevoId();
  DB.alumnos[id]=normalizar(null);
  cambiaAlumno(id);
  try{document.getElementById('nombre').focus();}catch(e){}
}

async function borraAlumno(){
  if(alumnos().length<=1){
    borrarTodo();return;
  }
  if(!await preguntaApp('¿Borrar a '+(S.nombre||'este participante')+'?',
    'Se borra su progreso en este aparato.','Borrar',true))return;
  delete DB.alumnos[DB.activo];
  cambiaAlumno(Object.keys(DB.alumnos)[0]);
}

const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

/* El frente y el reverso de una tarjeta traen negritas del generador. En el
   mazo se pintan; en la lista del revisor no, porque esc() las mostraria como
   texto ("Nombre babilonico de <b>Daniel</b>"). Se quitan antes de escapar,
   y el buscador filtra sobre lo mismo que se ve, o "de Daniel" no encontraria
   una tarjeta partida por una etiqueta en la mitad. */
const sinEtiquetas=s=>String(s??'').replace(/<[^>]*>/g,'').replace(/\s+/g,' ').trim();

/* Lleva el ojo adonde pasó algo. Abrir un examen o entrar con el código
   repinta la pantalla, pero un repintado silencioso en un punto que ya no
   coincide con el scroll de quien lo pidió SE VE como que no pasó nada: la
   confirmación queda arriba o abajo del marco visible. Se usa después de esas
   acciones para que la persona vea de una el resultado, no para navegar. */
/* `deUna`: se pone ahí sin animar y sin el destello. Es para cuando la persona
   ya estaba mirando ese sitio y solo cambió su contenido (Siguiente). */
function llevaA(id,deUna){
  const el=document.getElementById(id);
  if(!el)return;
  if(deUna){el.scrollIntoView({behavior:'auto',block:'start'});return;}
  el.scrollIntoView({behavior:'smooth',block:'start'});
  el.classList.remove('destaca');
  void el.offsetWidth;             // reinicia la animación si ya se usó antes
  el.classList.add('destaca');
}
/* La categoria ya identifica la actividad (av es Conexion Biblica de 7 a 9,
   dm2 es Matutina de 7 a 9, ec1 son los dos adultos de las creencias), asi
   que filtrar por categoria filtra por actividad. Esto era un enredo de tres
   funciones (capsCat, dosActividades y un conmutador) mientras las creencias
   vivian colgadas de las categorias de Conexion Biblica. */
const capsDe=()=>CAPS.filter(c=>c.cats.includes(S.cat));
/* Un capitulo puede ser material de estudio y NO salir en el examen. `extra`
   lista las categorias para las que es solo lectura: el reglamento dejo
   Daniel 2 fuera del examen de Menores, Aventureros y Padres, pero se sigue
   estudiando, y para Guias Mayores si cuenta. */
const soloEstudio=(c,cat)=>Array.isArray(c.extra)?c.extra.includes(cat):!!c.extra;

/* EL FILTRO DE RETIRADAS VA AQUI Y EN NINGUN OTRO LADO.
   bancoDe() es el unico origen de preguntas de examen: de el salen el pool de
   practicar, el de la evaluacion, los errores por repasar, los impresos y las
   cuentas del manual. Filtrar aqui las retira de los seis a la vez, y no hay
   forma de agregar un camino nuevo que se las salte.
   Lo que NO pasa por aqui sigue intacto a proposito: las tarjetas, la pestaña
   «Compruebalo» y la revision de un intento viejo, que busca el enunciado por
   clave en BANCO. Una pregunta retirada hoy no puede borrar lo que una niña
   respondio la semana pasada. */
const bancoDe=()=>{
  const ids=capsDe().filter(c=>!soloEstudio(c,S.cat)).map(c=>c.id);
  return BANCO.filter(q=>ids.includes(q.cap)&&!estaRetirada(q));
};
const modsDe=()=>MODULOS.filter(m=>(m.cats||[]).includes(S.cat)||(m.prof&&m.tema===ACT().tema));
/* v188: los repasos de «Para profundizar» no cuentan para el avance ni para
   las insignias: no son material del examen. */
const modsAvance=()=>modsDe().filter(m=>!m.prof);
/* Las tarjetas pasan por el MISMO registro de retiradas que las preguntas: su
   clave tiene la misma forma (capitulo + hash del frente), asi que la tabla y
   el endpoint sirven igual. Y este es su unico embudo, como bancoDe() es el de
   las preguntas: filtrar aqui las saca del mazo, de la sesion de hoy, de los
   juegos, de los impresos y de las cuentas del manual, todo a la vez. */
const estaRetiradaT=t=>retiradas.has(claveT(t));
const tarjetasDe=()=>{const ids=capsDe().map(c=>c.id);
  return TARJETAS.filter(t=>ids.includes(t.cap)&&!estaRetiradaT(t));};

/* ───────── EL FILTRO DE ESTUDIO: «esta semana estudio Daniel» ─────────
   MECANISMO
   Un valor guardado en el aparato, con la MISMA forma que el alcance del
   examen: 'todo', 'biblia', 'pr', un capitulo o una lista «d1,d3,d6». Se
   escoge una vez, en la franja de arriba, y lo leen Estudiar, Practicar (las
   tarjetas y los juegos), el repaso de errores, Inicio y Logros. El examen de
   practica arranca con el mismo recorte y ahi se puede cambiar.

   POR QUE NO VA EN capsDe() NI EN bancoDe()
   Esos dos son los embudos de lo que la categoria TIENE: de ellos salen la
   evaluacion del director, los impresos y las cuentas del manual. La
   evaluacion manda lo que el director abrio, no lo que la niña tenga filtrado
   en su celular. Por eso el filtro es una capa encima: capsVista(),
   tarjetasVista() y falladasDe().

   Solo aplica en Conexion Biblica, que es donde hay dos libros. Un valor que
   no deja ningun capitulo en esta categoria (P&R en Menores) cuenta como
   «todo», asi que nunca deja una pantalla vacia. */
const FILTRO_K='cb-filtro';
let filtroEst=(()=>{try{return String(localStorage.getItem(FILTRO_K)||'todo').slice(0,200);}catch(e){return 'todo';}})();
let filtroAbierto=false, filtroMenu=false;
const conFiltro=()=>TIPO()==='libro';
function idsFiltro(){
  if(!conFiltro()||filtroEst==='todo')return null;
  const ids=idsDeAlcance(filtroEst,capsDe());
  return ids.length&&ids.length<capsDe().length?ids:null;
}
const pasaFiltro=cap=>{const f=idsFiltro();return !f||f.includes(cap);};
const capsVista=()=>capsDe().filter(c=>pasaFiltro(c.id));
const tarjetasVista=()=>tarjetasDe().filter(t=>pasaFiltro(t.cap));
const buscaItem=id=>CAPS.find(c=>c.id===id)||MODULOS.find(m=>m.id===id);

/* CUÁNTAS PREGUNTAS TRAE EL EXAMEN REAL: NO SE SABE.
   Lo único confirmado del examen del campamento es el formato de tres
   secciones (múltiple, verdadero/falso, completar), visto en un examen que
   Camilo fotografió. La cantidad y el reparto por sección están sin
   confirmar. Estos números son un tamaño de práctica razonable, no un dato:
   cuando se confirme, se cambia aquí y todo lo demás se ajusta. */
const NPREG=()=>CAT().n;

/* ───────── cuenta hacia el campamento ───────── */
/* v165: LA FECHA SALE DE LA FICHA del campamento. Antes había aquí una tabla
   con una fecha por categoría, todas el 9 de octubre: Guías Mayores, que es
   otro evento y no tiene fecha, veía «¡Hoy es el día!». Una ficha sin fecha
   no tiene cuenta de días, ni semana del plan, ni freno por calendario. */
const SEMANAS_PLAN=7;
const fechaMeta=()=>ACT().fecha||'';
/** Días que faltan (0 hoy, negativo si ya pasó), o null si no hay fecha. */
function diasParaMeta(){
  const f=fechaMeta();
  if(!f)return null;
  const hoy=new Date(); hoy.setHours(0,0,0,0);
  const meta=new Date(f+'T00:00:00');
  return Math.round((meta-hoy)/864e5);
}
const MES_LARGO=['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
const fechaLarga=iso=>{const m=/^\d{4}-(\d\d)-(\d\d)$/.exec(iso||'');return m?Number(m[2])+' de '+MES_LARGO[Number(m[1])-1]:'';};
/* Semana del plan en la que vamos: 1 la más lejana, SEMANAS_PLAN la última. */
function semanaPlan(){
  const d=diasParaMeta();
  if(d<=0)return SEMANAS_PLAN;
  return Math.max(1,Math.min(SEMANAS_PLAN,SEMANAS_PLAN-Math.floor((d-1)/7)));
}

/* ───────── niveles de dificultad ───────── */
const ETIQ_NIVEL={1:'Básico',2:'Intermedio',3:'Avanzado'};

/* Promedio de los últimos tres exámenes de la categoría (0 a 1).
   Se ignoran los de «solo mis errores»: ahí el puntaje no es comparable. */
function promedioReciente(){
  const mios=S.examenes.filter(e=>e.cat===S.cat&&e.modo!=='errores').slice(-3);
  if(!mios.length)return null;
  return mios.reduce((a,e)=>a+(e.total?e.pts/e.total:0),0)/mios.length;
}

/* Nivel recomendado. Dos frenos, y manda el más bajo:
   · el calendario — en las primeras semanas no tiene sentido lo avanzado;
   · el desempeño — no se sube de nivel sin dominar el anterior.
   Así la dificultad crece de verdad y no de golpe. */
function nivelRecomendado(){
  const techoCat=CAT().techo;
  /* Quien no lleva rampa (los adultos) entra directo a lo exigente. Lo dice
     la ficha del campamento, no el nombre de la categoria. */
  if(!CAT().rampa)return techoCat;
  const sem=semanaPlan();
  const techoSemana=sem<=2?1:sem<=4?2:3;
  const prom=promedioReciente();
  const hechos=S.examenes.filter(e=>e.cat===S.cat&&e.modo!=='errores').length;
  let porDesempeno=1;
  if(prom!==null&&hechos>=2&&prom>=0.85)porDesempeno=3;
  else if(prom!==null&&hechos>=1&&prom>=0.70)porDesempeno=2;
  return Math.max(1,Math.min(techoCat,Math.min(techoSemana,porDesempeno)));
}

/* ───────── navegación ───────── */
const TABS={inicio:0,estudio:1,tarjetas:2,examen:3,logros:4};
/* 'bienvenida' y 'ayuda' no están en TABS: son pantallas sin pestaña. */

/* `quedarse`: no sube la página al principio. Lo pide verCap(), que después
   pone la página donde va el capítulo: subir primero y bajar después era el
   «sube y baja» que se veía al tocar Siguiente (v161). */
/* v188 (Camilo, 13-oct): «cuando cambio de menú y estaba estudiando y vuelvo
   no me lleva a donde estaba antes». Cada pestaña recuerda su altura al
   salir; al volver a ella se regresa ahí (y a Estudiar con el capítulo que
   estaba abierto). Ir a otra pestaña empieza arriba; tocar la pestaña en la
   que ya se está, también sube. */
const lugarDe={};
let pantallaAct='', capAbierto='';
function ir(id,quedarse){
  paraVoz();
  const antes=pantallaAct;
  if(antes&&antes!==id&&TABS[antes]!==undefined)lugarDe[antes]=Math.round(window.scrollY||0);
  pantallaAct=id;
  document.querySelectorAll('.pantalla').forEach(p=>p.classList.remove('on'));
  document.querySelectorAll('.nav-t button').forEach(b=>b.classList.remove('on'));
  document.getElementById('p-'+id).classList.add('on');
  document.querySelector('.nav').style.display=id==='bienvenida'?'none':'flex';
  if(TABS[id]!==undefined)
    document.querySelectorAll('.nav-t button')[TABS[id]].classList.add('on');
  /* RECORDAR DONDE ESTABA, PARA QUE UN REFRESCO NO LO MANDE A INICIO.
     Solo las 5 pestanas: bienvenida/ayuda/revisor/historial son pantallas de
     paso (piden una sesion, o son un paso de otra), no un sitio donde
     "quedarse" al recargar. verCap() pisa ultItem justo despues de llamar
     ir('estudio'), asi que un detalle abierto sobrevive; ir('estudio') solo
     (la pestaña, sin abrir nada) lo limpia y el refresco vuelve a la rejilla. */
  if(TABS[id]!==undefined){
    S.ultPantalla=id;
    /* Se limpia SIEMPRE, incluso yendo a 'estudio': verCap() lo vuelve a
       poner justo despues, en la misma llamada sincronica. Si aqui se
       dejaba en pie solo por ser 'estudio', ir('estudio') SOLO (la pestaña,
       para ver la rejilla) no lo borraba, y un refresco reabria el ultimo
       detalle en vez de mostrar la rejilla que la persona pidio ver. */
    S.ultItem='';
    guardar();
  }
  if(id==='inicio')pintaInicio();
  if(id==='estudio')pintaCaps();
  if(id==='tarjetas')pintaTarjetas();
  if(id==='examen')pintaExInicio();
  if(id==='logros')pintaLogros();
  if(id==='ayuda')pintaAyuda();
  if(id==='revisor')pintaRevisor();
  if(id==='historial')pintaHistorial();
  /* Las fichas del filtro se cierran al cambiar de pantalla: abiertas ocupan
     media pantalla del celular, y lo escogido ya queda dicho en la franja. */
  filtroAbierto=false;filtroMenu=false;
  pintaFiltro(id);
  pintaSenales();
  if(!quedarse){
    const det=document.getElementById('detalle');
    const vuelve=antes!==id&&TABS[id]!==undefined&&lugarDe[id]>0;
    if(vuelve&&id==='estudio'&&capAbierto&&det&&det.style.display==='block'){S.ultItem=capAbierto;guardar();}
    const y=vuelve?lugarDe[id]:0;
    window.scrollTo(0,y);
    /* Otra vez cuando la pantalla terminó de pintarse: la primera medida
       puede llegar con la altura a medias. */
    if(y&&typeof requestAnimationFrame==='function')requestAnimationFrame(()=>requestAnimationFrame(()=>{if(pantallaAct===id)window.scrollTo(0,y);}));
  }
}

function ponNombre(v){S.nombre=String(v).slice(0,60);guardar();pintaAlumnos();pintaYo();}
/* ───────── UNA FICHA, UNA ACTIVIDAD: invariante, no recomendación ─────────
   MECANISMO
   `racha`, `insignias` y `examenes` son campos de la FICHA. Eso da el
   comportamiento correcto mientras cada ficha pertenezca a una sola actividad,
   que es como la app se usa. Pero `ponCat` permitía saltar de `av` a `ec1`
   DENTRO de la misma ficha, y entonces esos tres campos se arrastraban.

   MEDIDO, no supuesto: con racha 7, dos insignias y tres exámenes de Conexión
   Bíblica, al pasar a las creencias la ficha llegaba con la racha, las
   insignias y los tres exámenes puestos, y `revisaInsignias` le daba
   «Persistente» en creencias por exámenes que había hecho en Daniel.

   El manual lo tapaba pidiéndole al usuario que agregara otro participante a
   mano. **Una nota que le pide al usuario mantener un invariante no es un
   invariante.**

   DECISIÓN
   Cambiar a una categoría de OTRA actividad ya no muta la ficha: busca la ficha
   de esa actividad con el mismo nombre y se pasa a ella, o la crea. Es
   exactamente lo que decía la nota, hecho por la app. El selector sigue
   mostrando las tres actividades, que es lo que las hace descubribles.

   Sin migración: usa `DB.alumnos`, que ya existía. */
/** Una ficha SIN NADA que proteger: ni progreso, ni exámenes, ni racha, ni
 *  insignias, ni errores. El nombre no cuenta, porque escribirlo no es haber
 *  estudiado. Solo cuando hay algo guardado vale la pena partir la ficha. */
const sinProgreso=al=>!al||(
  !Object.values(al.prog||{}).some(v=>v>0) &&
  !(al.examenes||[]).length &&
  !(al.insignias||[]).length &&
  !(al.racha>0) &&
  !Object.keys(al.fq||{}).length);

function ponCat(c){
  if(!CATS[c])return;
  if(ACT_DE(c)!==ACT_DE(S.cat)&&pasaAActividad(c))return;
  S.cat=c;guardar();
  marcaCat();
  pintaInicio();pintaCaps();pintaYo();
  try{document.getElementById('detalle').style.display='none';}catch(e){}
  /* Cambiar de categoría cambia el material entero, así que el mazo y el examen
     armado eran de la categoría anterior. Igual que al cambiar de persona. */
  /* v168: y el número de preguntas escogido era el de la otra categoría: de
     Menores (10) a Aventureros el examen seguía ofreciendo 10 en vez de 15. */
  reiniciaPractica();prueba=[];resp={};entregado=false;alcance=alcanceDeFiltro();cuantas=0;reiniciaFuente();
  try{clearInterval(reloj);}catch(e){}
  cierraHoja();
  ir('inicio');
}

/**
 * Lleva a la ficha que le corresponde a la categoría `c`, que es de otra
 * actividad. Devuelve `true` si se encargó del cambio, y `false` si `ponCat`
 * debe seguir y escribir la categoría en la ficha actual.
 *
 * El orden de los tres casos importa:
 * 1. Si ya existe una ficha de esa actividad con el mismo nombre, se pasa a
 *    ella. Va PRIMERO, incluso si la ficha actual está vacía: si no, la ficha
 *    vacía se queda con la actividad y la que tiene el progreso queda huérfana.
 * 2. Si la ficha actual no tiene nada que proteger, se le escribe la categoría
 *    encima. Es el caso de «+ Agregar», que crea la ficha en `av` por defecto;
 *    sin esto quedaban dos fichas, una vacía en Conexión Bíblica y la buena.
 * 3. Si hay progreso y no hay ficha destino, se crea. En el tope de fichas no
 *    se crea ni se muta: se avisa y no se pierde nada.
 */
function pasaAActividad(c){
  const nom=(S.nombre||'').trim().toLowerCase();
  const act=ACT_DE(c);
  const mia=alumnos().find(([,al])=>ACT_DE(al.cat)===act&&(al.nombre||'').trim().toLowerCase()===nom);
  if(mia){
    /* Se respeta SU categoría, no la que se acabó de tocar: su progreso es de
       esa. Quien quiera cambiarla, ya estando ahí, la cambia dentro. */
    cambiaAlumno(mia[0]);
    return true;
  }
  /* v156: una ficha con `pid` es de una persona del servidor y su categoria
     la manda el servidor: escribirle encima otra actividad duraba hasta la
     siguiente sincronizacion, que la devolvia. Esa nunca se reusa. */
  if(sinProgreso(S)&&!S.pid)return false;
  if(alumnos().length>=MAX_ALUMNOS){
    avisaApp('Este aparato ya tiene '+MAX_ALUMNOS+' fichas','Borra una antes de agregar otra.');
    return true;
  }
  const id=nuevoId();
  DB.alumnos[id]=normalizar({nombre:S.nombre,cat:c});
  guardar();
  cambiaAlumno(id);
  return true;
}

/* v191 (Camilo, 13-oct): QUIÉN ESTUDIA, POR PERSONA. Antes salía un botón por
   ficha, y quien estudia dos actividades aparecía dos o tres veces («Camilo»,
   «Camilo», «Camilo»). Ahora cada persona sale una vez, con sus actividades
   debajo; tocar una actividad es pasar a esa ficha. La persona se reconoce por
   el nombre, que es como `pasaAActividad` ya empareja las fichas.
   OPC_APP lo llena la app que monta el módulo (Jóvenes): `aCargo` son las
   personas que esa app tiene a cargo de quien entró. */
let OPC_APP={};
const enApp=()=>!!(OPC_APP&&OPC_APP.app);
function personasDB(){
  const g=new Map();
  alumnos().forEach(([id,al])=>{
    const k=(al.nombre||'').trim().toLowerCase()||('#'+id);
    if(!g.has(k))g.set(k,{nombre:(al.nombre||'').trim()||'Sin nombre',fichas:[]});
    g.get(k).fichas.push([id,al]);
  });
  return [...g.values()];
}
/* v205: UNA FILA POR PERSONA, CON SU MENÚ. La fila entera elige a la persona;
   el «⋯» abre Renombrar, Agregar actividad y Quitar. Quien estudia dos
   actividades las ve como pastillas debajo de su nombre. */
function pintaAlumnos(){
  const cont=document.getElementById('alu-sel');
  if(!cont)return;
  cont.innerHTML=personasDB().map((p,i)=>{
    const aC=p.fichas.find(([,a])=>a.aCargo), activa=p.fichas.some(([id])=>id===DB.activo);
    const suya=p.fichas.find(([id])=>id===DB.activo)||p.fichas[0];
    const sub=(aC?'A cargo de '+(aC[1].tutor||'un adulto')+' · ':'')+(p.fichas.length>1?p.fichas.length+' actividades':catConActividad(suya[1].cat));
    const ini=esc(p.nombre.charAt(0).toUpperCase()||'?');
    return '<div class="alu-per'+(activa?' on':'')+'">'+
      '<div class="alu-fila">'+
        '<button type="button" class="alu-elige" aria-pressed="'+activa+'" onclick="'+(activa?'cierraHoja()':'cambiaAlumno(\''+suya[0]+'\')')+'">'+
          '<span class="alu-av" aria-hidden="true">'+ini+'</span>'+
          '<span class="alu-nom"><span class="an">'+esc(p.nombre)+'</span><span class="ac">'+esc(sub)+'</span></span>'+
          (activa?'<span class="alu-ok">'+IC('check')+'<span class="sr">Estudiando ahora</span></span>':'')+'</button>'+
        '<button type="button" class="alu-mas" aria-label="Opciones de '+esc(p.nombre)+'" aria-expanded="'+(yoMenu===i)+'" onclick="yoAbreMenu('+i+')">'+IC('puntos')+'</button>'+
      '</div>'+
      (yoMenu===i?'<div class="alu-menu" role="group" aria-label="Opciones de '+esc(p.nombre)+'">'+
        '<button type="button" class="alu-mi" onclick="yoRenombra('+i+')">'+IC('lapiz')+' Renombrar</button>'+
        '<button type="button" class="alu-mi" onclick="yoActividad('+i+')">'+IC('mas')+' Agregar actividad</button>'+
        '<button type="button" class="alu-mi peligro" onclick="yoQuita('+i+')">'+IC('basura')+' Quitar</button></div>':'')+
      (yoRen===i?'<div class="alu-ren"><label class="sr" for="alu-ren">Nuevo nombre</label>'+
        '<input id="alu-ren" class="txti" type="text" maxlength="60" autocomplete="off" value="'+esc(p.nombre==='Sin nombre'?'':p.nombre)+'" onkeydown="if(event.key===\'Enter\')yoGuardaNombre('+i+')">'+
        '<button type="button" class="btn ver peq" onclick="yoGuardaNombre('+i+')">Guardar</button>'+
        '<button type="button" class="btn txt peq" onclick="yoCancela()">Cancelar</button></div>':'')+
      (p.fichas.length>1?'<div class="alu-acts">'+p.fichas.map(([id,al])=>
        '<button type="button" class="alu-act'+(id===DB.activo?' on':'')+'" aria-pressed="'+(id===DB.activo)+'" onclick="cambiaAlumno(\''+id+'\')">'+
        esc(catConActividad(al.cat))+'</button>').join('')+'</div>':'')+
      (aC&&activa?'<button type="button" class="btn txt alu-pasa" onclick="pasaASuCuenta()">'+IC('compartir')+' Pasar su avance a su propia cuenta</button>':'')+
      '</div>';
  }).join('')+
  (alumnos().length<MAX_ALUMNOS
    ?'<button type="button" class="alu-btn nuevo" onclick="agregaPersona()"><span class="an">'+IC('mas')+' Agregar persona</span>'+
     '<span class="ac">Un niño a tu cargo, o alguien con su propia cuenta</span></button>':'')+
  '<div id="alu-nueva"></div>';
}
/* «+ Agregar» pregunta primero para quién es: cada club entra distinto. */
function agregaPersona(){
  const z=document.getElementById('alu-nueva');if(!z)return;
  const hijos=(OPC_APP.aCargo||[]).filter(n=>!personasDB().some(p=>p.nombre.toLowerCase()===String(n).trim().toLowerCase()));
  z.innerHTML='<div class="alu-nueva"><p class="alu-q">¿Para quién es?</p>'+
    (hijos.length?'<div class="alu-hijos">'+hijos.map((n,i)=>'<button type="button" class="alu-op" onclick="nuevaDeCargo('+i+')"><b>'+esc(n)+'</b><span>A tu cargo en la app</span></button>').join('')+'</div>':'')+
    '<button type="button" class="alu-op" onclick="nuevaFicha(\'cargo\')"><b>Un niño a mi cargo</b><span>Aventureros, o un conquistador que no tiene cuenta. Lo manejas tú desde este teléfono.</span></button>'+
    '<button type="button" class="alu-op" onclick="nuevaFicha(\'otra\')"><b>Otra persona en este teléfono</b><span>Un adulto, o alguien que no tiene cuenta propia.</span></button>'+
    '<div class="alu-op info"><b>Alguien con su propia cuenta</b><span>'+
      (enApp()?'Que entre a la app con su cuenta, desde su teléfono: su avance queda guardado en ella.':'Que abra la app en su propio teléfono.')+
      ' Los Guías Mayores estudian siempre así, y los Conquistadores que tienen cuenta también.</span></div></div>';
}
/* Las categorías que puede tener un niño a cargo: las de su actividad que no
   son de adultos ni de Guías Mayores. */
const catsDeNino=act=>Object.keys(CATS).filter(k=>CATS[k].act===act&&CATS[k].club!=='guias'&&!/adulto/i.test(CATS[k].edad||''));
function nuevaFicha(tipo,nombre){
  if(tipo!=='cargo'){agregaAlumno();abreYo();try{document.getElementById('nombre').focus();}catch(e){}return;}
  if(alumnos().length>=MAX_ALUMNOS)return;
  const tutor=(S.aCargo?S.tutor:S.nombre)||'';
  const cats=catsDeNino(ACT_DE(S.cat));
  const id=nuevoId();
  DB.alumnos[id]=normalizar({nombre:nombre||'',cat:cats[0]||S.cat,aCargo:true,tutor});
  cambiaAlumno(id);
  abreYo();
  if(!nombre)try{document.getElementById('nombre').focus();}catch(e){}
}
function nuevaDeCargo(i){const n=(OPC_APP.aCargo||[])[i];if(n)nuevaFicha('cargo',String(n).trim().slice(0,60));}
/* Cuando el niño ya tiene cuenta: su ficha se pasa con el código de la ficha
   completa (el mismo de «Pasar o compartir mi progreso»). */
function pasaASuCuenta(){
  const z=document.getElementById('alu-nueva');if(!z)return;
  const cod=codigoCompleto();
  z.innerHTML='<div class="alu-nueva"><p class="alu-q">Pasar el avance de '+esc(S.nombre||'esta ficha')+'</p>'+
    '<ol class="alu-pasos"><li>Copia este código y mándaselo.</li>'+
    '<li>En su teléfono, que entre '+(enApp()?'a la app con su cuenta':'a la app')+' y vaya a <b>Logros → Pasar o compartir mi progreso → Pegar un código</b>.</li>'+
    '<li>Que toque <b>Agregarla como ficha nueva</b>. Su avance queda en su cuenta.</li></ol>'+
    '<textarea id="alu-cod" class="cod" readonly></textarea>'+
    '<button type="button" class="btn ver" onclick="copiaAluCod()">'+IC('copiar')+' Copiar</button></div>';
  const t=document.getElementById('alu-cod');if(t)t.value=cod;
}
function copiaAluCod(){
  const t=document.getElementById('alu-cod');if(!t)return;
  try{t.select();document.execCommand('copy');}catch(e){}
  if(navigator.clipboard)navigator.clipboard.writeText(t.value).catch(()=>{});
}

/* Selector de categoría, pintado desde los datos de CATS. */
const CLUB_NOMBRE={aventureros:'Club de Aventureros',conquistadores:'Club de Conquistadores',guias:'Guías Mayores'};
function pintaSelectorCat(){
  const cont=document.getElementById('cat-sel');
  if(!cont)return;
  /* Agrupado por actividad y con su nombre completo, no con la clave: este
     selector es tambien donde alguien que estudia dos actividades cambia de
     una a otra, asi que tiene que leerse como «Conexion Biblica», no «cb». */
  const eventos=Object.keys(ACTIVIDADES);
  cont.innerHTML=eventos.map(ev=>
    '<div class="cat-grupo">'+icoDe(ACTIVIDADES[ev].icono)+' '+esc(ACTIVIDADES[ev].nombre)+
    ' <small>· '+esc(ACTIVIDADES[ev].cuando)+'</small></div>'+
    '<div class="cat-fila">'+Object.entries(CATS).filter(([,c])=>c.act===ev).map(([k,c])=>{
      /* v191: un niño a cargo no puede quedar en una categoría de adultos ni de
         Guías Mayores (ellos estudian con su propia cuenta). */
      const no=S.aCargo&&!catsDeNino(ev).includes(k);
      return '<button class="cat-btn'+(S.cat===k?' on':'')+'"'+(no?' disabled title="Es para quien estudia con su propia cuenta"':' onclick="ponCat(\''+k+'\')"')+'>'+
      (c.club?'<div class="cc">'+esc(CLUB_NOMBRE[c.club]||'')+'</div>':'')+
      '<div class="cn">'+esc(c.nombre)+'</div>'+
      '<div class="cd">'+esc(c.edad)+'<br>'+c.alcance+'</div></button>';}).join('')+'</div>').join('')+
    (S.aCargo?'<p class="nota">'+esc(S.nombre||'Esta ficha')+' está a tu cargo: puede estar en Aventureros o en Conquistadores. Guías Mayores y adultos estudian con su propia cuenta.</p>':'');
}

/* ───────── qué estudiar hoy ─────────
   El panel existe porque la app tenía todas las herramientas pero ninguna
   decía por dónde empezar. Cada tarea sale de un dato real del progreso,
   no de un plan genérico, y se ordena por lo que más rinde: primero cerrar
   errores, después memorizar lo pendiente, después leer lo que falta. */
const PLAN_SEMANAS=[
  {t:'Conocer el material',d:'Leer capítulo por capítulo sin apuro. Exámenes de nivel básico para fijar nombres, números y lugares.'},
  {t:'Fijar los datos',d:'Terminar de leer todos los capítulos y los repasos. Tarjetas todos los días.'},
  {t:'Entrar a lo literal',d:'Empiezan las citas exactas y las diferencias entre RV1995 y RV1960. Nivel intermedio.'},
  {t:'Dominar las trampas',d:'Los módulos de Trampas y de RV1995 vs RV1960. Repasar errores hasta vaciarlos.'},
  {t:'Precisión palabra por palabra',d:'Completar el versículo, nivel avanzado. Aquí se decide el concurso.'},
  {t:'Simulacros',d:'Exámenes completos cronometrados, con el formato del campamento.'},
  {t:'Afinar y descansar',d:'Solo errores pendientes y el módulo «Lo que más preguntan». Dormir bien.'},
];

function tareasDeHoy(){
  const tareas=[];
  const err=falladasDe().length;
  if(err>=3)tareas.push({ic:'repetir',t:'Repasar '+err+' errores',k:'err',n:err,c:'Lo que más puntos recupera',
    d:'Preguntas que fallaste y todavía no dominas. Es lo que más puntos recupera.',
    b:'Repasar ahora',f:"arrancaExamen('errores')"});

  /* La tarea del día es la SESIÓN, no el total pendiente. «102 tarjetas por
     dominar» no le dice a nadie qué hacer hoy; «15 tarjetas hoy» sí. */
  const nHoy=Math.min(tocanHoy().length,topeSesion());
  const porDominar=tarjetasVista().filter(t=>cajaT(t)<2).length;
  if(nHoy)tareas.push({ic:'tarjetas',t:nHoy+' tarjetas para hoy',k:'tj',n:nHoy,
    c:'Unos '+Math.max(1,Math.round(nHoy*20/60))+' minutos · primero las que fallaste',
    d:(recta()?'Repaso final antes del examen: también vuelven las que ya dominas. ':
      'La sesión del día: primero lo que fallaste, y las dominadas vuelven a salir '+
      (plazoDominada()===1?'cada día':'a los '+plazoDominada()+' días')+
      (diasParaMeta()>0&&plazoDominada()<PLAZO[2]?', más seguido porque se acerca el examen':'')+'. ')+
      'Quedan '+porDominar+' por dominar en total.',
    b:'Abrir la sesión',f:"irTarjetasHoy()"});
  else if(tarjetasVista().length)tareas.push({ic:'tarjetas',t:'Tarjetas al día',
    d:'Ya repasaste lo que tocaba hoy. Las dominadas vuelven a salir en unos días.',
    b:'Repasar igual',f:"irTarjetasTodas()",k:'tj',c:'Ya repasaste las de hoy'});

  const sinLeer=[...capsVista(),...modsAvance()].filter(x=>(S.prog[x.id]||0)<100);
  if(sinLeer.length)tareas.push({ic:'libro',t:'Leer '+esc(sinLeer[0].label),
    d:'Te faltan '+sinLeer.length+' secciones por marcar como estudiadas.',
    b:'Estudiar',f:"verCap('"+sinLeer[0].id+"')"});

  /* Capítulo más flojo según los exámenes: dirige el estudio a donde duele. */
  const flojo=capsVista().map(c=>({c,a:S.acc[c.id]||{b:0,m:0}}))
    .filter(x=>x.a.b+x.a.m>=3)
    .map(x=>({...x,pct:x.a.b/(x.a.b+x.a.m)}))
    .sort((p,q)=>p.pct-q.pct)[0];
  if(flojo&&flojo.pct<0.8)tareas.push({ic:'diana',t:'Reforzar '+esc(flojo.c.label),
    d:'Vas en '+Math.round(flojo.pct*100)+'% en ese capítulo, tu punto más flojo.',
    b:'Examen de ese capítulo',f:"examenDeCapitulo('"+flojo.c.id+"')",k:'flojo',c:'Vas en '+Math.round(flojo.pct*100)+'%: tu punto más flojo'});

  const n=nivelEfectivo();
  tareas.push({ic:'examen',t:'Examen de nivel '+n+' · '+ETIQ_NIVEL[n],
    d:'Un examen de práctica de '+NPREG()+' preguntas, con el formato del concurso.',
    b:'Comenzar',f:"arrancaExamen('normal')",k:'ex',n:n,c:'Nivel '+n+' · '+NPREG()+' preguntas'});

  /* Con los exámenes cerrados, las tareas que arrancan uno no se ofrecen: leer y
     las tarjetas siguen igual, y en su lugar entra una que explica por qué, para
     que la pantalla no quede muda. */
  if(examenesCerrados()){
    const quedan=tareas.filter(t=>!/arrancaExamen\(|examenDeCapitulo\(/.test(t.f));
    quedan.push({ic:'candado',t:'Los exámenes están cerrados',
      d:'Hay una evaluación abierta. Si tienes tu código, te sale arriba en Examen.',
      b:'Ver',f:"ir('examen')",k:'cerrado',c:'Hay una evaluación abierta'});
    return quedan.slice(0,4);
  }

  return tareas.slice(0,4);
}

function pintaHoy(){
  const d=diasParaMeta(), sem=semanaPlan(), p=PLAN_SEMANAS[sem-1];
  /* Cuatro momentos, y cada uno dice lo que es. Sin fecha no se inventa una
     cuenta; pasado el evento el material sigue ahi para repasar. */
  let cab;
  if(d===null)cab='<div class="sem"><div class="st">'+esc(ACT().cuando)+'</div>'+
    '<div class="sd">Todavía no hay cuenta de días. Estudia a tu ritmo: lo de abajo sale de tu avance.</div></div>';
  else if(d<0)cab='<div class="sem"><div class="st">Fue el '+esc(fechaLarga(fechaMeta()))+'</div>'+
    '<div class="sd">El material sigue aquí: puedes repasar y practicar cuando quieras.</div></div>';
  else cab=(d>0
    ?'<div class="cuenta"><div class="cd">'+d+'</div><div class="cl">día'+(d===1?'':'s')+
     '<br>para el campamento</div></div>'
    :'<div class="cuenta"><div class="cd">¡Hoy!</div><div class="cl">es el día</div></div>')+
    '<div class="sem"><div class="st">Semana '+sem+' de '+SEMANAS_PLAN+' · '+esc(p.t)+'</div>'+
    '<div class="sd">'+esc(p.d)+'</div></div>';

  /* v205: «Para hoy» son fichas cortas, una por tarea, y TODA la ficha se
     toca. Leer ya no va aquí: lo dice el «Continuar» de arriba, que sabe en
     qué sección se quedó. Entra la pregunta del día del capítulo en el que va. */
  const tareas=tareasDeHoy().filter(t=>!/^verCap\(/.test(t.f));
  const pd=preguntaDelDia();
  if(pd)tareas.splice(Math.min(1,tareas.length),0,{ic:'bocadillo',k:'pdd',t:'Pregunta del día',c:pd.q,f:'abrePreguntaDia()',d:''});
  const num=t=>t.k==='pdd'?'?':t.n!=null?String(t.n):'';
  const lista='<div class="hoy-g">'+tareas.map(t=>
    '<button type="button" class="hoy-t hoy-'+(t.k||'x')+'" onclick="'+t.f+'">'+
    '<span class="hoy-ic" aria-hidden="true">'+(num(t)?'<b>'+esc(num(t))+'</b>':IC(t.ic))+'</span>'+
    '<span class="hoy-tx"><span class="tt">'+t.t+'</span><span class="td">'+esc(t.c||sinEtiquetas(t.d))+'</span></span>'+
    IC('der','hoy-fl')+'</button>').join('')+'</div>';

  document.getElementById('hoy').innerHTML='<div class="hoy-cab">'+cab+'</div>'+lista;
}

/* Atajos que usa el panel. */
function irTarjetasDificiles(){tjFiltro='dificiles';ir('tarjetas');tjBaraja();}
function irTarjetasHoy(){tjFiltro='hoy';ir('tarjetas');tjBaraja();}
/* Del punto débil al examen de ese capítulo en un toque. Antes el panel decía
   dónde estaba flojo y dejaba al usuario armando el examen a mano. */
function examenDelCapitulo(id){
  if(!capsDe().some(c=>c.id===id&&!soloEstudio(c,S.cat)))return;
  alcance=id;nivel=0;cuantas=0;
  arrancaExamen('normal');
}
function irTarjetasTodas(){tjFiltro='todas';ir('tarjetas');tjBaraja();}
async function examenDeCapitulo(id){alcance=id;cuantas=0;ir('examen');pintaMenuEx();await arrancaExamen('normal');}

/* ───────── inicio ───────── */
/* ───────── quién estudia: la ficha de la barra y la hoja ─────────
   MECANISMO
   Las pantallas se conmutan con `ir()`, que solo prende una `.pantalla`. El
   panel de identidad vivía DENTRO de la pantalla de Inicio, así que solo
   existía ahí: para cambiar de persona o de actividad desde Estudiar había que
   volver a Inicio, abrirlo, cambiar, y navegar otra vez.

   POR QUÉ ESO IMPORTA MÁS DE LO QUE PARECE
   No es solo comodidad. El problema real es que en Estudiar, Tarjetas, Examen
   y Logros NADA en pantalla decía de quién era el progreso ni de qué actividad.
   Las dos hijas de Camilo comparten teléfono: María Camila podía hacer una
   sesión entera de tarjetas dentro de la ficha de Isabella y ninguna de las dos
   se daba cuenta hasta ver la racha rara. La identidad es ESTADO, y el estado
   que decide todo lo que se ve tiene que estar siempre a la vista, no a tres
   toques.

   DECISIÓN
   La ficha va en la barra, visible en las cinco pantallas, y al tocarla sube la
   MISMA hoja inferior que ya se usa para los versículos. Dos cosas de un golpe:
   se lee siempre quién estudia y qué estudia, y se cambia desde donde uno esté.
   No se estrenó ningún mecanismo: la hoja, su fondo, su asa y su Escape ya
   estaban probados. */
function pintaYo(){
  const b=document.getElementById('nav-yo');
  if(!b)return;
  const nom=S.nombre||'Sin nombre';
  /* v205: la ficha es compacta: inicial, nombre y ▾ (la categoría va en el
     globo y en el panel). Con una sola persona en el aparato no hay a quién
     cambiar: queda la inicial sola, y el panel sigue abriendo igual. No dice
     «Estudiando:» como el prototipo, porque el filtro de al lado ya se llama
     así («Estudiando: Todo») y serían dos rótulos iguales para dos cosas. */
  const varias=personasDB().length>1;
  if(b.classList)b.classList.toggle('solo',!varias);
  b.innerHTML='<span class="yo-ini" aria-hidden="true">'+esc(nom.trim().charAt(0).toUpperCase()||'?')+'</span>'+
    '<span class="yo-tx"><span class="yo-n">'+esc(nom)+'</span>'+
    '<span class="yo-c">'+icoDe(ACT().icono)+' '+esc(CAT().nombre)+'</span></span>'+IC('abajo','yo-fl')+
    /* El globo es un nodo propio, no el `title` del navegador, por dos razones:
       el title tarda un segundo largo en salir y no admite dos renglones. En
       escritorio la ficha se reduce a la inicial, así que sin esto queda un
       botón mudo y hay que abrir el panel para saber quién estudia. */
    '<span class="yo-tip" aria-hidden="true"><b>'+esc(nom)+'</b>'+
    icoDe(ACT().icono)+' '+esc(actYCat(S.cat))+'</span>';
  b.setAttribute('aria-label','Estudia '+nom+', '+actYCat(S.cat,'de')+'. Toca para cambiar.');
}

/** Sube la hoja de identidad. El esqueleto trae los mismos ids que ya usan
 *  pintaAlumnos() y pintaSelectorCat(), así que esas dos siguen sirviendo sin
 *  cambios: pintan si su contenedor existe, y existe solo con la hoja abierta. */
function abreYo(cats){
  if(!cats){yoMenu=-1;yoRen=-1;}
  abreHojaHtml(
    '<div class="hoja-fondo" onclick="cierraHoja()"></div>'+
    '<div class="hoja-caja" role="dialog" aria-modal="true" aria-label="Quién estudia y qué estudia">'+
    '<div class="hoja-asa" onclick="cierraHoja()"></div>'+
    '<div class="hoja-cab">'+
      /* El subtítulo dice solo la actividad: el nombre y la categoría ya están
         dos centímetros más abajo, y repetirlos aquí solo lograba que se
         cortaran con puntos suspensivos. */
      '<div><div class="hoja-ref">Quién estudia</div>'+
      '<div class="hoja-sub">'+icoDe(ACT().icono)+' '+esc(ACT().nombre)+'</div></div>'+
      '<button type="button" class="hoja-x" onclick="cierraHoja()" aria-label="Cerrar">'+IC('x')+'</button>'+
    '</div>'+
    '<div class="hoja-txt ident-cuerpo">'+
      '<div class="alu-sel" id="alu-sel"></div>'+
      /* El nombre se escribe aquí solo cuando falta (una persona recién
         agregada); para cambiarlo después está «⋯ › Renombrar». */
      '<div class="yo-nom"'+(S.nombre?' hidden':'')+'><label class="yo-lb" for="nombre">¿Cómo se llama?</label>'+
      '<input id="nombre" class="txti" type="text" placeholder="Escribe el nombre..." oninput="ponNombre(this.value)"></div>'+
      '<details class="yo-cats"'+(cats?' open':'')+'><summary>'+IC('diana')+'<span>Actividad y categoría</span><b>'+esc(CAT().nombre)+'</b></summary>'+
      '<div class="cat-sel" id="cat-sel"></div>'+
      '<p class="nota">Cada categoría pertenece a <strong>una actividad</strong>, y '+
      'define qué capítulos ves, de dónde salen las preguntas y hasta qué '+
      'dificultad llegan. Si tocas una categoría de <strong>otra actividad</strong>, '+
      'la app te lleva a tu ficha de esa actividad, o te la crea con tu mismo '+
      'nombre: así cada actividad guarda su progreso, su racha y sus insignias '+
      'aparte, y nada se revuelve.</p>'+
      '<p class="nota">En Conexión Bíblica el campamento va en '+
      '<strong>Daniel 1, 2, 3 y 6</strong> y los capítulos 39, 41 y 44 de Profetas y '+
      'Reyes; <strong>Guías Mayores</strong> es el alcance ampliado de otro '+
      'evento.</p></details>'+
    '</div></div>','yo');
  pintaAlumnos();pintaSelectorCat();
  const ni=document.getElementById('nombre');
  if(ni)ni.value=S.nombre||'';
  ancla();
}

/* En escritorio el panel no es una hoja: es un popover al lado del riel, a la
   altura de la ficha. La posición exacta no se puede escribir en el CSS porque
   depende de dónde quedó la ficha dentro del riel, así que se mide al abrir y
   se pasa en dos variables. El CSS decide si las usa o no; en celular las
   ignora y la hoja sigue subiendo desde abajo. */
/* Debajo de esto el popover no vale la pena: no alcanza para el selector de
   participantes y el primer grupo de categorías. */
const MIN_POPOVER=380;

function ancla(){
  try{
    if(!window.matchMedia||!window.matchMedia('(min-width:900px)').matches)return;
    const b=document.getElementById('nav-yo'), h=document.getElementById('hoja');
    if(!b||!h||!b.getBoundingClientRect)return;
    const r=b.getBoundingClientRect();
    /* La X se mide contra el borde del RIEL, no de la ficha: la ficha es un
       cuadro de 42 px centrado dentro de un riel de 92, así que anclar a su
       borde derecho dejaba el popover metido debajo del riel. */
    const nav=document.querySelector('.nav');
    const borde=nav&&nav.getBoundingClientRect?nav.getBoundingClientRect().right:r.right;
    /* v203: dentro de la app de Jóvenes la ficha no está en un riel sino arriba,
       en una barra a lo ancho: anclar al borde de esa barra dejaba el panel fuera
       de la pantalla y el toque «no hacía nada». Ahí el panel sale debajo de la ficha. */
    /* v205: en el computador la ficha ya no va en el riel sino arriba a la
       derecha (ver estilos): ahí el panel cae debajo, alineado por su borde
       derecho. */
    if(Math.abs(borde-r.right)>200){
      const W=window.innerWidth||1200, der=r.left>W/2, ancho=Math.min(der?380:420,W-32);
      h.classList.remove('hoja-arriba');
      h.style.setProperty('--yo-x',Math.round(Math.max(16,Math.min(der?r.right-ancho:r.left,W-ancho-16)))+'px');
      h.style.setProperty('--yo-y',Math.round(r.bottom+8)+'px');
      return;
    }
    h.style.setProperty('--yo-x',Math.round(Math.max(r.right,borde)+12)+'px');

    /* HACIA ARRIBA O HACIA ABAJO, medido y no supuesto.
       El popover crecía siempre hacia abajo desde el borde superior de la
       ficha. Con la ficha al pie del riel eso dejó el panel en 91 px de alto:
       `max-height` se calcula contra lo que queda de pantalla, y abajo no
       quedaba nada. Si el espacio de abajo no alcanza, se ancla por el borde
       INFERIOR y crece hacia arriba, que es lo que hace cualquier menú de
       sistema cuando el botón está al pie. */
    const alto=window.innerHeight||800;
    const abajo=alto-r.top-24;
    if(abajo>=MIN_POPOVER){
      h.classList.remove('hoja-arriba');
      h.style.setProperty('--yo-y',Math.round(r.top)+'px');
    }else{
      h.classList.add('hoja-arriba');
      h.style.setProperty('--yo-b',Math.round(Math.max(16,alto-r.bottom))+'px');
    }
  }catch(e){}
}

/* ───────── las senales de la barra ─────────
   MECANISMO
   Los cuatro datos ya los calcula la app: el promedio de `S.prog`, `tocanHoy()`,
   `falladasDe()` y `evalPend`. Lo que faltaba no era el dato, era que se viera
   sin entrar a la pantalla: hasta v51 había que abrir Tarjetas para saber si
   tocaban tarjetas, y abrir Logros para saber cuántos errores quedaban.

   POR QUÉ ES UN TABLERO Y NO ADORNO
   La app ya tiene «Qué estudiar hoy», pero solo en Inicio. Estando en Estudiar,
   nada decía que había 25 tarjetas esperando. La barra está en las cinco
   pantallas, así que es el único sitio donde el pendiente cabe siempre.

   Se llama desde `ir()`, o sea en cada navegación, y desde `pintaInicio()`. Los
   nodos ya existen en el HTML: aquí solo se llenan o se esconden. */
function senal(id,valor){
  const e=document.getElementById(id);
  if(!e)return;
  const n=Number(valor)||0;
  e.hidden=n<=0;
  if(n>0)e.textContent=n>99?'99+':String(n);
}

function pintaSenales(){
  try{
    /* El anillo de Estudiar promedia capítulos Y repasos, que es lo que la
       insignia «Lector completo» exige: promediar solo capítulos daría 100%
       con los repasos sin leer. */
    const items=[...capsDe(),...modsAvance()];
    const pct=items.length
      ?Math.round(items.reduce((a,c)=>a+Math.min(100,S.prog[c.id]||0),0)/items.length):0;
    const est=document.getElementById('nv-est');
    /* En 0 no se muestra: un cero ocupa lugar y no dice nada que la pantalla de
       Inicio no diga mejor. En 100 sí se muestra, porque «100%» es justo lo que
       uno quiere ver de reojo. */
    /* v147: la barra solo lleva números de «tienes algo pendiente», y en un
       solo lugar. El % de Estudiar es progreso, no pendiente (ya lo dicen los
       anillos del Inicio), y los errores de Logros ya entran primero en la
       sesión de Practicar: con los dos se veía el mismo 15 en dos pestañas. */
    if(est){est.hidden=true; est.textContent=pct+'%';}
    senal('nv-tj',Math.min(tocanHoy().length,topeSesion()));
    const lg=document.getElementById('nv-lg'); if(lg)lg.hidden=true;
    /* El punto verde del examen es lo único que NO sale del progreso propio:
       sale del servidor, y solo si la evaluación está abierta y sin hacer. */
    const ex=document.getElementById('nv-ex');
    if(ex)ex.hidden=!(evalPend&&!evalHecha);
  }catch(e){}
}

function pintaInicio(){
  pintaAlumnos();
  pintaYo();
  pintaSenales();
  pintaHoy();
  pintaSelectorCat();
  /* El campo del nombre vive en la hoja, que casi siempre está cerrada. Sin la
     guarda, pintaInicio() revienta al leer `.value` de null. */
  const ni=document.getElementById('nombre');
  if(ni&&ni.value!==S.nombre)ni.value=S.nombre;

  const cs=capsVista();
  const listos=cs.filter(c=>S.prog[c.id]>=100).length;
  const mios=S.examenes.filter(e=>e.cat===S.cat);
  const mejor=mios.length?Math.max(...mios.map(e=>Math.round(e.pts/e.total*100))):0;

  /* El primer día todo va en cero. Cinco tarjetas con un cero no enseñan
     nada y empujan hacia abajo lo único que sí sirve, que es «Qué estudiar
     hoy»; la tarjeta aparece cuando ya hay algo que contar. */
  const hayNumeros=listos>0||mios.length>0||S.racha>0||falladasDe().length>0;
  const cardStats=document.getElementById('card-stats');
  if(cardStats)cardStats.style.display=hayNumeros?'block':'none';

  const pn=document.getElementById('prog-nota');
  if(pn)pn.textContent=listos>=cs.length
    ?'Terminaste de leer los '+cs.length+'. Ahora toca repasar.'
    :'Vas '+listos+' de '+cs.length+'. Las tres rayitas son leído, practicado y dominado.';

  document.getElementById('stats').innerHTML=
    '<div class="stat"><div class="v">'+listos+'<small style="font-size:.875rem">/'+cs.length+'</small></div><div class="l">Capítulos<br>estudiados</div></div>'+
    '<div class="stat"><div class="v">'+mejor+'<small style="font-size:.875rem">%</small></div><div class="l">Mejor<br>puntaje</div></div>'+
    '<div class="stat"><div class="v">'+mios.length+'</div><div class="l">Exámenes<br>hechos</div></div>'+
    '<div class="stat"><div class="v">'+S.racha+IC('fuego','racha')+'</div><div class="l">Días de<br>racha'+
      (S.protegio===new Date().toDateString()?'<br><strong>'+IC('escudo')+' Un protector la cuidó</strong>'
        :S.protector?'<br>'+IC('escudo')+' '+S.protector+(S.protector===1?' protector':' protectores'):'')+'</div></div>'+
    '<div class="stat" style="cursor:pointer" onclick="ir(\'examen\')" title="Preguntas que has fallado y aún no dominas">'+
    '<div class="v" style="color:'+(falladasDe().length?'var(--rojo)':'var(--verde)')+'">'+falladasDe().length+'</div>'+
    '<div class="l">Errores por<br>repasar</div></div>';

  /* v205: la rejilla lleva la imagen de cada capítulo y sus tres niveles. */
  pintaRejillaIni();
  pintaHero();
  const ct=document.getElementById('ini-caps-t');
  if(ct)ct.textContent=TIPO()==='creencias'?'Las 28 creencias':(conFiltro()?'Capítulo por capítulo':'Lo que vas a estudiar');

}

/* ───────── LA FRANJA DEL FILTRO DE ESTUDIO ─────────
   Va arriba de las cinco pestañas porque es ESTADO: decide que se ve en todas.
   Cuando esta puesto se pinta en naranja y dice que esta escondido. Sin eso,
   un filtro olvidado deja a alguien estudiando la mitad del material sin
   saberlo, que es el riesgo de tener un solo filtro para toda la app. */
const textoFiltro=v=>v==='biblia'?nombreBiblia():v==='pr'?'Profetas y Reyes':
  (listaDe(v)?textoLista(listaDe(v)):((CAPS.find(c=>c.id===v)||{}).label||v));
function pintaFiltro(pant){
  const z=document.getElementById('filtro-est');
  if(!z)return;
  const caps=capsDe();
  const ver=conFiltro()&&TABS[pant]!==undefined&&caps.length>1;
  z.hidden=!ver;
  if(!ver)return;
  const f=idsFiltro();
  const dos=caps.some(c=>esDaniel(c.id))&&caps.some(c=>esPR(c.id));
  const val=f?alcanceDeFichas(f,caps):'todo';
  const modo=!f?'todo':(dos&&(val==='biblia'||val==='pr'))?val:'mis';
  const b=(k,t)=>'<button type="button" class="fe-b" aria-pressed="'+(modo===k||(k==='mis'&&filtroAbierto))+'" '+
    'onclick="ponFiltro(\''+k+'\')">'+t+'</button>';
  /* v147: una sola pastilla que dice el estado y abre las opciones. Cuatro
     botones sueltos y pegados leían como pestañas, y en celular ocupaban dos
     renglones para algo que se cambia poco. */
  const abierto=filtroMenu||filtroAbierto;
  const dice=modo==='todo'?'Todo':textoFiltro(val);
  z.className='fe'+(f?' on':'');
  z.innerHTML='<div class="fe-fila"><button type="button" class="fe-pill" aria-haspopup="true" '+
    'aria-expanded="'+abierto+'" onclick="abreFiltroMenu()"><span class="fe-k">Estudiando:</span> '+
    '<b>'+esc(dice)+'</b>'+IC('abajo','fe-fl')+'</button></div>'+
    (abierto?'<div class="fe-menu" role="group" aria-label="Qué estudiar">'+
      b('todo','Todo')+(dos?b('biblia',nombreBiblia())+b('pr','Profetas y Reyes'):'')+
      b('mis','Escoger capítulos')+'</div>':'')+
    (f?'<p class="fe-aviso">Viendo solo '+esc(textoFiltro(val))+'. Lo demás está escondido '+
      'hasta que toques «Todo».</p>':'')+
    (filtroAbierto?'<div class="ex-fichas fe-fichas">'+htmlFichas(caps,f||caps.map(c=>c.id),'fichaFiltro')+'</div>':'');
}
function abreFiltroMenu(){
  const abierto=filtroMenu||filtroAbierto;
  filtroMenu=!abierto;filtroAbierto=false;
  pintaFiltro(S.ultPantalla||'inicio');
}
/* Tocar fuera o Escape cierra el menú, como cualquier menú. */
try{
  document.addEventListener('click',e=>{
    if(!(filtroMenu||filtroAbierto))return;
    const z=document.getElementById('filtro-est');
    if(z&&e.target&&z.contains&&!z.contains(e.target)&&document.contains(e.target)){filtroMenu=false;filtroAbierto=false;pintaFiltro(S.ultPantalla||'inicio');}
  });
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'&&(filtroMenu||filtroAbierto)){filtroMenu=false;filtroAbierto=false;pintaFiltro(S.ultPantalla||'inicio');}
  });
}catch(e){}
function ponFiltro(v){
  if(v==='mis'){filtroAbierto=!filtroAbierto;filtroMenu=true;pintaFiltro(S.ultPantalla||'inicio');return;}
  filtroAbierto=false;filtroMenu=false;
  guardaFiltro(v);
}
function fichaFiltro(tipo,v){
  const caps=capsDe();
  const n=tocaFicha(idsFiltro()||caps.map(c=>c.id),caps,tipo,v);
  guardaFiltro(alcanceDeFichas(n,caps)||'todo');
}
/* El examen de practica arranca con los capitulos del filtro que SI tienen
   examen. Daniel 7 a 12 de Guias Mayores son solo para estudiar. */
function alcanceDeFiltro(){
  const f=idsFiltro();
  if(!f)return 'todo';
  const caps=capsDe().filter(c=>!soloEstudio(c,S.cat));
  return alcanceDeFichas(f.filter(id=>caps.some(c=>c.id===id)),caps)||'todo';
}
/* Guardar y repintar lo que esta a la vista, sin navegar: ir() sube la
   pantalla y cierra el capitulo abierto, y eso no se espera de tocar una ficha. */
function guardaFiltro(v){
  filtroEst=v||'todo';
  try{localStorage.setItem(FILTRO_K,filtroEst);}catch(e){}
  alcance=alcanceDeFiltro();
  reiniciaPractica();
  const p=S.ultPantalla||'inicio';
  pintaFiltro(p);
  if(p==='inicio')pintaInicio();
  if(p==='estudio')pintaCaps();
  if(p==='tarjetas')pintaTarjetas();
  if(p==='examen')pintaExInicio();
  if(p==='logros')pintaLogros();
  pintaSenales();
}
/* Logros separa los dos libros SIEMPRE, con o sin filtro: es la cifra que
   dice si conviene estudiar solo uno. Sale de S.acc, lo mismo que los
   puntos debiles. */
function htmlPorLibro(){
  if(!conFiltro())return '';
  const caps=capsDe();
  const libros=[[nombreBiblia(),esDaniel,'var(--naranja)'],['Profetas y Reyes',esPR,'#7B2D8B']]
    .map(l=>{const a=caps.filter(c=>l[1](c.id)).reduce((s,c)=>{const x=S.acc[c.id]||{b:0,m:0};
      return {b:s.b+x.b,m:s.m+x.m};},{b:0,m:0});return {n:l[0],c:l[2],a};})
    .filter(x=>x.a.b+x.a.m>0);
  if(libros.length<2)return '';
  return '<div class="lg-libros">'+libros.map(x=>{const p=Math.round(x.a.b/(x.a.b+x.a.m)*100);
    return '<div class="lg-libro"><span>'+esc(x.n)+'</span><div class="prog-lin" style="flex:1;margin:0">'+
      '<div style="width:'+p+'%;background:'+x.c+'"></div></div><b>'+p+'%</b></div>';}).join('')+
    '<p class="nota">Acierto por libro, con todas tus respuestas de examen.</p></div>';
}

/* ───────── estudio ───────── */
/* De dónde es un capítulo, en una línea: su grupo si la actividad los tiene
   (la doctrina de una creencia), o su fuente. La usan la tarjeta de la
   rejilla y la cabecera del capítulo, para que digan lo mismo. */
/* LA LÍNEA DICE LO QUE DISTINGUE A LA TARJETA. Si todo el material de la
   actividad viene de la misma fuente («En esto creemos» en las 28) y está
   repartido en varios grupos, lo que distingue es el grupo: la doctrina. Si
   las fuentes cambian (Biblia y Elena de White en Conexión Bíblica), sigue
   diciendo la fuente, que ahí es el dato. */
function origenDe(c){
  const cs=capsDe(), g=grupoDe(c);
  const unaFuente=new Set(cs.map(x=>x.src)).size<=1;
  const variosGrupos=new Set(cs.map(x=>x.doc).filter(Boolean)).size>1;
  return g&&unaFuente&&variosGrupos?g.nombre.replace(/^La doctrina /,'Doctrina '):(c.src||'');
}
function pintaCaps(){
  /* v160 (Camilo): «remarcar a qué doctrina pertenece cada creencia». Las 28
     tarjetas decían todas «En esto creemos», que no distingue nada. Ahora la
     rejilla va por grupos: un rótulo por doctrina, con su tramo, antes de su
     primera creencia, y cada tarjeta dice su doctrina. Sale de GRUPOS, así
     que otra actividad que declare grupos lo hereda sin tocar esto. */
  let grupoAbierto=null;
  const vista=capsVista();
  /* Con un solo grupo a la vista el rótulo repetiría el título de arriba. */
  const conRotulos=new Set(vista.map(c=>c.doc).filter(Boolean)).size>1;
  const caps=vista.map(c=>{
    const g=conRotulos?grupoDe(c):null;
    const rotulo=g&&g.id!==grupoAbierto?'<div class="grupo grupo-de" style="grid-column:1/-1">'+
      icoDe(g.icono)+' '+esc(g.nombre)+(g.desde?' <small>'+g.desde+' a '+g.hasta+'</small>':'')+'</div>':'';
    if(g)grupoAbierto=g.id;
    return rotulo+
    '<button class="cap c-'+c.id+'" onclick="verCap(\''+c.id+'\')">'+
    /* v147: el número va en el color de la categoría, igual en todos. Siete
       colores sin significado competían con el título. */
    '<div class="n">'+esc(c.label.replace(/^(Daniel |P&R )/,''))+'</div>'+
    '<div class="t">'+esc(c.sub)+'</div>'+
    /* Cuantos versiculos trae, para poder repartir la lectura antes de abrirlo:
       Daniel 2 son 49 y Daniel 1 son 21, y eso cambia como se planea la semana.
       Solo los capitulos de la Biblia lo tienen; los de P&R no son versiculos. */
    '<div class="f">'+esc(origenDe(c))+(c.vs?' · '+c.vs+' vers.':'')+'</div>'+
    /* Sin este aviso, un capítulo que se estudia y nunca sale en el examen
       parece un error de la app. Se dice donde se toma la decisión de leerlo. */
    (soloEstudio(c,S.cat)?'<div class="solo-est">Solo para estudiar</div>':'')+
    '<div class="p">'+(S.prog[c.id]||0)+'% leído</div></button>';}).join('');
  const botonMod=m=>
    '<button class="mod c-'+m.id+'" onclick="verCap(\''+m.id+'\')">'+
    '<div class="ic-f" style="color:'+(m.color||'var(--azul)')+'">'+icoDe(m.icono,'ico-f')+'</div><div><div class="t">'+esc(m.label)+'</div>'+
    '<div class="s">'+esc(m.sub)+'</div>'+
    '<div class="p" style="font-size:.75rem;color:var(--verde-txt);font-weight:700;margin-top:4px">'+(S.prog[m.id]||0)+'%</div>'+
    '</div></button>';
  const mods=modsDe().filter(m=>!m.prof).map(botonMod).join('');
  const prof=modsDe().filter(m=>m.prof).map(botonMod).join('');
  document.getElementById('lista-caps').innerHTML=
    /* El rotulo dice en que se esta: «Capitulos» dentro de las 28 creencias
       se lee como si fueran capitulos de la Biblia. */
    '<div class="grupo" style="grid-column:1/-1">'+
    icoDe(ACT().icono)+' '+(TIPO()==='creencias'?'Las 28 creencias':'Capítulos')+
    '</div>'+caps+
    (mods?'<div class="grupo" style="grid-column:1/-1">'+IC('lupa')+' Repaso general</div>'+mods:'')+
    (prof?'<div class="grupo grupo-prof" style="grid-column:1/-1">'+IC('brujula')+' Para profundizar <small>no entra al examen</small></div>'+prof:'');
}

/* ═══════════ LOS VERSICULOS DENTRO DEL ESTUDIO ═══════════
   Dos formas de llegar al texto, y usan el mismo VERS de fuente/biblia.js:
   una referencia tocable al lado de cada dato, y el capitulo completo
   desplegable arriba. La idea es no tener que salir de la seccion para
   comprobar de donde sale un dato. */

/* MECANISMO DEL REEMPLAZO, Y POR QUE VA EN DOS PASADAS
   El material ya trae 163 referencias escritas como «(2:41)», «(Daniel 2:38)»
   o «(3:2-3)». En vez de reescribir los doce archivos de contenido, se
   convierten al pintar.

   Un regex suelto de \d+:\d+ NO sirve, y esto se probo: en las 28 creencias
   y en P&R hay doce citas de otros libros con ese mismo formato, y «Jn 3:16»
   habria abierto Daniel 3:16. Un versiculo equivocado presentado con la
   etiqueta «RV1995» es peor que no ofrecer el versiculo.

   Por eso: se acepta «Daniel N:M» en cualquier parte, y «N:M» a secas SOLO
   dentro de un parentesis y SOLO en un capitulo de Daniel, donde «(2:41)» no
   puede querer decir otra cosa. Si el parentesis trae una palabra con
   mayuscula que no sea Daniel ni RV1995, se deja quieto: ahi puede haber un
   nombre de libro.

   El texto se parte por etiquetas y solo se toca lo que esta FUERA de una: si
   el regex entrara en un atributo (un onclick, una clase) romperia el HTML
   sin avisar. */
const BIBLIA_CAPS=['d1','d2','d3','d4','d5','d6','d7','d8','d9','d10','d11','d12'];
/* v178: DOS LIBROS DE LA BIBLIA EN RV1995. Daniel es 'd'+N y Apocalipsis es
   'ap'+N; de ahí sale el nombre que se rotula en referencias, lectura y
   filtros. Un libro nuevo es una línea aquí, su texto en VERS y su tema. */
const LIBRO_PRE={d:'Daniel',ap:'Apocalipsis'};
const PRE_LIBRO={Daniel:'d',Apocalipsis:'ap'};
const libroCid=cid=>{const m=/^(ap|d)(\d{1,2})$/.exec(String(cid||''));return m?{pre:m[1],n:m[2],nombre:LIBRO_PRE[m[1]]}:null;};
const OTRO_LIBRO=/\b(?!Daniel\b|RV1995\b)(?:[123]\s?)?[A-ZÁÉÍÓÚÑ][a-záéíóúñ]{1,}\b/;

/* CITAS A OTROS LIBROS (fuente/biblia-otros.js, RV1909, dominio publico).
   Mismo boton, misma hoja: solo cambia de que tabla sale el texto y que
   version se rotula. Un cid de Daniel es 'd'+numero; uno de otro libro es
   'slug-capitulo' (por ejemplo 'apocalipsis-1'), y los dos formatos nunca se
   confunden porque Daniel no lleva guion. */
function tablaDeCid(cid){
  if(typeof VERS!=='undefined'&&VERS[cid]){
    const l=libroCid(cid)||{nombre:'Daniel',n:String(cid).replace('d','')};
    return {mapa:VERS[cid], ref:l.nombre+' '+l.n, version:'RV1995'};
  }
  if(typeof OTRAS_VERS!=='undefined'&&OTRAS_VERS[cid]){
    const meta=(typeof OTRAS_META!=='undefined'&&OTRAS_META[cid])||{};
    return {mapa:OTRAS_VERS[cid], ref:(meta.libro||'')+' '+(meta.cap||''), version:meta.version||'RV1909'};
  }
  return null;
}

/* Regex de citas a otro libro, armado desde NOMBRES_OTROS: «Apocalipsis
   1:13-16», «2 Reyes 24:1», etc. Si biblia-otros.js no esta cargado (por
   ejemplo en una prueba que solo mira un fragmento del archivo) esto queda
   en null y esa pasada simplemente no corre. */
const KEY_POR_NOMBRE=(typeof NOMBRES_OTROS!=='undefined')
  ?Object.keys(NOMBRES_OTROS).reduce((m,k)=>{m[NOMBRES_OTROS[k]]=k;return m;},{})
  :{};
/* SIN \b AL PRINCIPIO, A PROPOSITO.
   `\b` en JavaScript se define sobre [A-Za-z0-9_], asi que entre un espacio y
   una «E» no hay frontera de palabra: las dos son no-palabra. Con `\b` delante,
   «Exodo 31:13-17» NO enganchaba y era el unico de los 42 libros que jamas se
   volvia tocable, sin error ni aviso. Se quita el `\b` y el borde izquierdo se
   comprueba a mano en el reemplazo, mirando el caracter anterior: hace lo mismo
   y ademas funciona con acentos. Sin lookbehind, que no esta en los iPhone
   viejos. */
const LETRA_ANTES=/[0-9A-Za-zÁÉÍÓÚÜÑáéíóúüñ]/;
/* ── UNA CITA PUEDE TRAER UNA LISTA DE VERSICULOS ────────────────────
   MECANISMO
   La cartilla no cita siempre un versiculo suelto ni siempre un rango: cita
   listas — «2 Pedro 1:20,21», «Proverbios 30:5, 6», «Juan 1:1-3,14». El
   patron paraba en el primer tramo, asi que de «2 Pedro 1:20,21» solo
   «2 Pedro 1:20» se volvia boton y el «,21» se quedaba afuera: texto plano
   pegado a un enlace subrayado. Eso es lo que se veia roto en creencias.

   CADA TRAMO ES SU PROPIO BOTON y los separadores se quedan como texto.
   No se juntan todos en un solo rango a proposito: «1 Corintios 15:3,4,20-22»
   NO es «15:3-22», y el encabezado de la hoja anunciaria un rango que la
   cartilla nunca cito. Un boton por tramo dice la verdad y de paso deja
   tocable cada versiculo que la cartilla si cita.

   MEDIDO en tools/creencias/datos.py: de 261 referencias de las 28 creencias,
   60 traen coma — 50 consecutivas y 10 mezcladas con guion. */
const COLA_CITA='((?:\\s*,\\s*\\d{1,3}(?:\\s*[-–]\\s*\\d{1,3})?)*)';
const COLA_TRAMO=/(\s*,\s*)(\d{1,3})(?:(\s*[-–]\s*)(\d{1,3}))?/g;

const OTRO_LIBRO_CITA=(typeof NOMBRES_OTROS!=='undefined')
  ?new RegExp('('+Object.values(NOMBRES_OTROS).map(n=>n.replace(/\s+/g,'\\s+'))
      .sort((a,b)=>b.length-a.length).join('|')+')\\s+(\\d{1,3}):(\\d{1,3})(?:\\s*[-–]\\s*(\\d{1,3}))?'+COLA_CITA,'g')
  :null;

/** El unico sitio donde se arma un boton de versiculo. Si el capitulo no
 *  esta sourced o el versiculo no existe, devuelve el texto tal cual: un
 *  boton mudo es peor que texto sin boton. */
function botonVers(cid,texto,de,hasta){
  const t=tablaDeCid(cid);
  if(!t||!t.mapa[de])return texto;
  const h=(hasta&&hasta>de&&t.mapa[hasta])?hasta:de;
  return '<button type="button" class="vref" title="Ver el versículo"'+
    ' onclick="verVers(this,\''+cid+'\','+de+','+h+')">'+texto+'</button>';
}

/** Los tramos que vienen detras de la primera cita («,21», «, 20-22»): uno
 *  por boton, con su separador intacto entre ellos. */
function colaVers(cid,cola){
  if(!cola)return '';
  return cola.replace(COLA_TRAMO,(t,sep,a,g,b)=>
    sep+botonVers(cid,a+(b?g+b:''),+a,b?+b:0));
}

function botonRef(todo,c,v,v2,cola,pre){
  cola=cola||'';
  const cid=(pre||'d')+c, cabeza=cola?todo.slice(0,todo.length-cola.length):todo;
  const t=tablaDeCid(cid);
  if(!t||!t.mapa[+v])return todo;
  return botonVers(cid,cabeza,+v,v2?+v2:0)+colaVers(cid,cola);
}

/* v153: «Génesis 1», «Salmos 104», «Mateo 24»: la cartilla cita capítulos
   enteros sin versículo, y el patrón de arriba pide «N:M», así que esas
   fichas no se podían tocar aunque la nota dice «toca cualquier referencia».
   El texto de los once capítulos ya estaba en biblia-otros.js, completo.
   Y en un libro de UN solo capítulo (3 Juan, Judas) el número es el
   versículo: «Judas 3» es Judas 1:3. */
const OTRO_LIBRO_CAP=(typeof NOMBRES_OTROS!=='undefined')
  ?new RegExp('('+Object.values(NOMBRES_OTROS).map(n=>n.replace(/\s+/g,'\\s+'))
      .sort((a,b)=>b.length-a.length).join('|')+')\\s+(\\d{1,3})(?![\\d:])','g')
  :null;
const UN_CAPITULO=new Set(['abdias','filemon','2juan','3juan','judas']);
function botonCapOtro(todo,nombre,n){
  const key=KEY_POR_NOMBRE[nombre];
  if(!key)return todo;
  if(UN_CAPITULO.has(key)){
    const cid=key+'-1';
    return tablaDeCid(cid)&&tablaDeCid(cid).mapa[n]?botonVers(cid,todo,n,0):todo;
  }
  const cid=key+'-'+n, t=tablaDeCid(cid);
  if(!t)return todo;
  const nums=Object.keys(t.mapa).map(Number), max=Math.max(...nums);
  /* Solo si el capítulo está ENTERO: un botón que dice «Génesis 1» y abre
     tres versículos sueltos diría algo que no es. */
  if(nums.length!==max||!t.mapa[1])return todo;
  return '<button type="button" class="vref" title="Ver el capítulo"'+
    ' onclick="verVers(this,\''+cid+'\',1,'+max+')">'+todo+'</button>';
}

function botonRefOtro(todo,nombre,c,v,v2,cola){
  cola=cola||'';
  const key=KEY_POR_NOMBRE[nombre];
  if(!key)return todo;
  const cid=key+'-'+c, cabeza=cola?todo.slice(0,todo.length-cola.length):todo;
  const t=tablaDeCid(cid);
  if(!t||!t.mapa[+v])return todo;
  return botonVers(cid,cabeza,+v,v2?+v2:0)+colaVers(cid,cola);
}

/* ─────────────────── BLOQUES QUE SE REVELAN AL TOCAR ───────────────────
   MECANISMO
   Leer una respuesta y reconocerla se siente igual de facil que saberla, y
   no es lo mismo: al reconocer, la respuesta ya esta en la pantalla. Lo que
   fija es PRODUCIRLA. Por eso el material de estudio no muestra la respuesta:
   muestra la pregunta, y la respuesta sale cuando la persona ya intento.

   Es el mismo principio de las tarjetas, metido dentro del texto de estudio
   en vez de en una pantalla aparte.

   Se alterna, no es de un solo sentido: volver a tocar la tapa otra vez, para
   poder repasar la misma pregunta sin recargar. */
function revela(b){
  const a=b.nextElementSibling;
  if(!a)return;
  a.hidden=!a.hidden;
  b.classList.toggle('abierto',!a.hidden);
  const p=b.querySelector('.rev-p');
  if(p)p.textContent=a.hidden?'tocar para ver':'tocar para tapar';
}

function refsTocables(html,capId){
  if(typeof VERS==='undefined')return html;
  const lib=libroCid(capId), enDaniel=!!lib&&!!VERS[capId];
  return html.split(/(<[^>]+>)/).map(tr=>{
    if(tr.charAt(0)==='<')return tr;
    /* Pasada 1: «Daniel N:M» dice el libro, asi que vale en cualquier lado.
       Se marca el trozo ya convertido con \u0000 para que las pasadas
       siguientes no vuelvan a entrar en el, que anidaria un boton dentro de
       otro. */
    let out=tr.replace(/(Daniel|Apocalipsis)\s+(\d{1,2}):(\d{1,2})(?:\s*[-–]\s*(\d{1,2}))?((?:\s*,\s*\d{1,3}(?:\s*[-–]\s*\d{1,3})?)*)/g,
      (todo,lb,c,v,v2,cola)=>{const b=botonRef(todo,c,v,v2,cola,PRE_LIBRO[lb]);return b===todo?todo:'\u0000'+b+'\u0000';});
    /* Pasada 2: «Libro N:M» para un libro distinto de Daniel, en cualquier
       parte (fuera o dentro de parentesis). El nombre completo del libro ya
       distingue la cita: no hace falta el candado de la pasada 3. */
    if(OTRO_LIBRO_CITA){
      out=out.replace(OTRO_LIBRO_CITA,(todo,nombre,c,v,v2,cola,pos,cadena)=>{
        if(todo.indexOf('\u0000')>=0)return todo;
        /* El borde izquierdo, que antes hacia el \b: que no venga pegado a otra
           letra o numero, o «1 Juan» se tomaria de dentro de «21 Juan». */
        if(pos>0&&LETRA_ANTES.test(cadena.charAt(pos-1)))return todo;
        return '\u0000'+botonRefOtro(todo,nombre,c,v,v2,cola)+'\u0000';
      });
    }
    /* Pasada 2b: «Libro N» sin versículo (ver botonCapOtro). Después de la 2,
       y el (?![\d:]) deja fuera lo que ya era «N:M». */
    if(OTRO_LIBRO_CAP){
      out=out.replace(OTRO_LIBRO_CAP,(todo,nombre,n,pos,cadena)=>{
        if(pos>0&&LETRA_ANTES.test(cadena.charAt(pos-1)))return todo;
        const b=botonCapOtro(todo,nombre,+n);
        return b===todo?todo:'\u0000'+b+'\u0000';
      });
    }
    if(enDaniel){
      /* Pasada 3: (N:M) suelto dentro de parentesis, solo en un capitulo de
         Daniel, y solo si el parentesis no nombra ya otro libro. */
      out=out.replace(/\(([^)]*)\)/g,(todo,dentro)=>{
        if(dentro.indexOf('\u0000')>=0||OTRO_LIBRO.test(dentro))return todo;
        return '('+dentro.replace(/(\d{1,2}):(\d{1,2})(?:\s*[-–]\s*(\d{1,2}))?((?:\s*,\s*\d{1,3}(?:\s*[-–]\s*\d{1,3})?)*)/g,
          (t2,c,v,v2,cola)=>botonRef(t2,c,v,v2,cola,lib.pre))+')';
      });
    }
    return out.split('\u0000').join('');
  }).join('');
}

/* ── LA HOJA DEL VERSICULO ───────────────────────────────────────────────
   POR QUE UNA HOJA Y NO UN PANEL EN LINEA
   El panel en linea empujaba el contenido: el versiculo aparecia y todo lo de
   abajo bajaba, asi que en una lista de seis puntos se perdia el renglon que
   se estaba leyendo. Un modal centrado no empuja, pero tapa el dato, que era
   justo lo que se queria ver al lado.
   La hoja sube desde abajo, cubre la mitad inferior y deja a la vista la
   parte de arriba, donde esta el dato. Y como no toca el flujo, se puede
   abrir y cerrar diez veces sin mover el texto ni un pixel.

   Ademas permite algo que el panel no: pasar al versiculo de al lado sin
   cerrar, que es como se lee una Biblia de verdad. */
let hojaCid=null, hojaDe=0, hojaHasta=0;

/* La hoja es UNA sola pieza reutilizable, no dos. `hojaTipo` dice qué está
   mostrando ('vers' o 'yo'); `hojaCid` sigue siendo estado exclusivo del
   versículo. Tener dos hojas con su propio abrir, cerrar, fondo, asa y Escape
   habría sido el mismo error que v47 arrancó: dos mecanismos para un concepto. */
let hojaTipo=null;

function verVers(btn,cid,de,hasta){
  if(saltaAlTexto(btn,cid,de,hasta))return;
  abreHoja(cid,de,hasta);
}

/* v155: en escritorio, con el capítulo de Daniel en dos columnas, el
   versículo que cita el estudio YA está en pantalla, en la columna del texto.
   Abrir el panel repetía lo mismo encima. Si la cita es de ese capítulo y la
   columna se ve, se va al versículo en la columna, se resalta un momento y no
   se abre nada. En cualquier otro caso (celular, otro capítulo, otro libro)
   sigue el panel. */
function saltaAlTexto(btn,cid,de,hasta){
  try{
    if(!btn||!btn.closest||!btn.closest('#detalle')||btn.closest('.vd-izq'))return false;
    const vd=document.querySelector('#detalle .vd'), iz=document.querySelector('#detalle .vd-izq');
    if(!vd||!iz||!/^(flex|grid)$/.test(getComputedStyle(vd).display)||!iz.getClientRects().length)return false;
    const lect=iz.querySelector('details.lect[data-cid="'+cid+'"]');
    if(!lect)return false;
    const h=hasta&&hasta>de?hasta:de;
    const ps=[...lect.querySelectorAll('.biblia p')].filter(p=>{
      const n=+((p.querySelector('.vn')||{}).textContent||0);return n>=de&&n<=h;});
    if(!ps.length)return false;
    lect.open=true;
    const quieto=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    /* v205: el texto va con el scroll de la página (el estudio es el que se
       queda pegado); si la columna tuviera su propio scroll, se usa el suyo. */
    if(iz.scrollHeight>iz.clientHeight+4&&getComputedStyle(iz).overflowY!=='visible'){
      const top=ps[0].getBoundingClientRect().top-iz.getBoundingClientRect().top+iz.scrollTop-iz.clientHeight/3;
      iz.scrollTo({top:Math.max(0,top),behavior:quieto?'auto':'smooth'});
    }else window.scrollTo({top:Math.max(0,ps[0].getBoundingClientRect().top+(window.scrollY||0)-(window.innerHeight||800)/3),behavior:quieto?'auto':'smooth'});
    lect.querySelectorAll('.biblia p.salto').forEach(p=>p.classList.remove('salto'));
    ps.forEach(p=>p.classList.add('salto'));
    ps[0].setAttribute('tabindex','-1');ps[0].focus({preventScroll:true});
    clearTimeout(saltaAlTexto.t);
    saltaAlTexto.t=setTimeout(()=>ps.forEach(p=>p.classList.remove('salto')),2600);
    return true;
  }catch(e){return false;}
}

/** Sube la hoja con el HTML que se le pase. `tipo` solo sirve para saber qué
 *  hay abierto y para teñir la caja con una clase. */
function abreHojaHtml(html,tipo){
  const h=document.getElementById('hoja');
  if(!h)return;
  hojaTipo=tipo||'vers';
  h.className='hoja hoja-'+hojaTipo;
  h.innerHTML=html;
  h.hidden=false;
  /* El translate arranca abajo y la clase lo sube. Hay que dejar pasar un
     cuadro entre quitar [hidden] y poner la clase, o el navegador aplica los
     dos cambios juntos y la hoja aparece de golpe, sin subir. */
  if(typeof requestAnimationFrame==='function')requestAnimationFrame(()=>h.classList.add('abierta'));
  else h.classList.add('abierta');
}

function abreHoja(cid,de,hasta){
  if(!tablaDeCid(cid))return;
  hojaCid=cid; hojaDe=de; hojaHasta=hasta||de;
  abreHojaHtml(htmlHoja(),'vers');
}

/* ─────────── PREGUNTAR Y AVISAR DENTRO DE LA APP ───────────
   POR QUE NO `confirm()` NI `alert()`
   No son de la app: en un iPhone instalado salen con el dominio encima, en la
   letra del sistema y con los botones del sistema, así que en la mitad de un
   examen la niña ve de golpe algo que parece del navegador y no de su app. Y
   son BLOQUEANTES: congelan todo el hilo, incluido el reloj del examen.

   NO ES UN MODAL NUEVO: es la MISMA hoja del versículo (`abreHojaHtml`), con
   otro contenido. Un segundo sistema de ventanas con su propio abrir, cerrar,
   fondo y Escape sería el error que v47 ya arregló una vez.

   Devuelve una promesa para poder escribir `if(await preguntaApp(...))`, que
   se lee igual que el `confirm()` de antes. Cerrar por el fondo o con Escape
   resuelve `false`: descartar una pregunta es decir que no. */
let hojaResuelve=null;

function htmlPregunta(titulo,texto,okTxt,peligro,soloAviso){
  return '<div class="hoja-fondo" onclick="cierraPregunta(false)"></div>'+
    '<div class="hoja-caja preg" role="alertdialog" aria-modal="true" aria-label="'+esc(titulo)+'">'+
    '<div class="hoja-asa" onclick="cierraPregunta(false)"></div>'+
    '<div class="preg-cuerpo">'+
      '<div class="preg-t">'+esc(titulo)+'</div>'+
      (texto?'<p class="preg-p">'+esc(texto)+'</p>':'')+
    '</div>'+
    '<div class="preg-pie">'+
      (soloAviso?'':'<button type="button" class="btn gho" onclick="cierraPregunta(false)">Cancelar</button>')+
      '<button type="button" class="btn '+(peligro?'rojo':'azul')+'" onclick="cierraPregunta(true)">'+
        esc(okTxt||'Entendido')+'</button>'+
    '</div></div>';
}

function preguntaApp(titulo,texto,okTxt,peligro){
  /* Sin la hoja en el HTML (las pruebas cargan el JS con un DOM de mentiras)
     se cae al confirm de siempre en vez de quedarse esperando para siempre. */
  if(typeof document==='undefined'||!document.getElementById('hoja'))
    return Promise.resolve(typeof confirm==='function'?confirm(titulo+(texto?'\n\n'+texto:'')):true);
  return new Promise(function(res){
    hojaResuelve=res;
    abreHojaHtml(htmlPregunta(titulo,texto,okTxt,peligro,false),'preg');
  });
}

function avisaApp(titulo,texto){
  if(typeof document==='undefined'||!document.getElementById('hoja')){
    try{if(typeof alert==='function')alert(titulo+(texto?'\n\n'+texto:''));}catch(e){}
    return Promise.resolve(true);
  }
  return new Promise(function(res){
    hojaResuelve=res;
    abreHojaHtml(htmlPregunta(titulo,texto,'Entendido',false,true),'preg');
  });
}

function cierraPregunta(v){
  const r=hojaResuelve;hojaResuelve=null;
  cierraHoja();
  if(r)r(!!v);
}

function cierraHoja(){
  paraVoz();
  /* Si había una pregunta abierta y se cierra por el fondo, por el asa o con
     Escape, eso es un «no». Sin esto, quien descarta la hoja deja la promesa
     colgada y la acción nunca termina. */
  if(hojaResuelve){const r=hojaResuelve;hojaResuelve=null;r(false);}
  const h=document.getElementById('hoja');
  if(!h)return;
  h.classList.remove('abierta');
  hojaCid=null; hojaTipo=null;
  /* Se espera a que termine de bajar antes de esconderla: con [hidden] de
     una, desaparece de golpe y no se ve el gesto de cierre. */
  setTimeout(()=>{if(!hojaTipo){h.hidden=true;h.innerHTML='';}},220);
}

/** Pasa al versiculo anterior o siguiente sin cerrar la hoja. Se mueve de a
 *  uno y se queda en los topes del capitulo. */
function hojaMueve(d){
  if(!hojaCid)return;
  const t=tablaDeCid(hojaCid);
  if(!t)return;
  const nums=Object.keys(t.mapa).map(Number).sort((a,b)=>a-b);
  const min=nums[0], max=nums[nums.length-1];
  const rango=hojaHasta-hojaDe;
  let de=hojaDe+d;
  if(de<min||de+rango>max)return;
  paraVoz();
  hojaDe=de; hojaHasta=de+rango;
  const h=document.getElementById('hoja');
  if(h)h.innerHTML=htmlHoja();
}

function htmlHoja(cid,de,hasta){
  cid=cid||hojaCid; de=de||hojaDe; hasta=hasta||hojaHasta;
  const t=cid?tablaDeCid(cid):null;
  if(!cid||!t)return '';
  const nums=Object.keys(t.mapa).map(Number).sort((a,b)=>a-b);
  const min=nums[0], max=nums[nums.length-1];
  const cap=buscaItem(cid);
  const partes=[];
  for(let i=de;i<=hasta;i++)
    if(t.mapa[i])partes.push('<p><span class="vn">'+i+'</span>'+esc(t.mapa[i])+'</p>');
  /* El capítulo entero se anuncia como capítulo: «Génesis 1», no «Génesis 1:1-31». */
  const entero=de===min&&min===1&&hasta===max&&nums.length===max&&hasta>de;
  const ref=entero?t.ref:t.ref+':'+de+(hasta>de?'-'+hasta:'');
  return '<div class="hoja-fondo" onclick="cierraHoja()"></div>'+
    '<div class="hoja-caja" role="dialog" aria-modal="true" aria-label="'+ref+'">'+
    '<div class="hoja-asa" onclick="cierraHoja()"></div>'+
    '<div class="hoja-cab">'+
      '<div><div class="hoja-ref">'+ref+' · '+t.version+'</div>'+
      '<div class="hoja-sub">'+esc(cap?cap.sub:'')+'</div></div>'+
      (puedeHablar()?grupoVoz('btn-voz','Escuchar','Escuchar el versículo'):'')+
      '<button type="button" class="hoja-x" onclick="cierraHoja()" aria-label="Cerrar">'+IC('x')+'</button>'+
    '</div>'+
    '<div class="hoja-txt biblia" data-leer>'+partes.join('')+'</div>'+
    '<div class="hoja-pie">'+
      filaNav(de<=min?null:{clic:'hojaMueve(-1)',aria:'Versículo anterior'},
        entero?max+' versículos':de+(hasta>de?'-'+hasta:'')+' de '+max,
        hasta>=max?null:{clic:'hojaMueve(1)',aria:'Versículo siguiente'})+
    '</div></div>';
}

/* Escape cierra, como cualquier hoja o modal del sistema. */
if(typeof document!=='undefined'&&document.addEventListener)
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&hojaTipo)cierraHoja();});

/* El capitulo completo, en bloques de cinco versiculos con su propio boton
   de voz: uno solo leeria los 49 de corrido, que no sirve para memorizar, y
   de paso el bloque queda de un tamano que se alcanza a seguir con el dedo.
   El boton va en su propia fila, no al lado del texto: al lado le quitaba
   unos 50px de ancho a las cinco lineas. */
function seccionLectura(cid){
  if(typeof VERS==='undefined'||!VERS[cid])return '';
  const nums=Object.keys(VERS[cid]).map(Number).sort((a,b)=>a-b);
  const bloques=[];
  /* v205: cada bloque es una SECCIÓN («Sección 3 de 10»), y cierra con
     «Antes de seguir»: dos preguntas de ese capítulo (ver adsReparto). */
  const nb=Math.ceil(nums.length/POR_BLOQUE);
  let rep=[];
  try{rep=adsReparto(cid);}catch(e){rep=[];}
  for(let i=0;i<nums.length;i+=POR_BLOQUE){
    const grupo=nums.slice(i,i+POR_BLOQUE), k=i/POR_BLOQUE;
    const rot='Vers. '+grupo[0]+(grupo.length>1?'-'+grupo[grupo.length-1]:'');
    const txt=grupo.map(v=>'<p><span class="vn">'+v+'</span>'+esc(VERS[cid][v])+'</p>').join('');
    bloques.push('<div class="lect-bl" data-sec="'+k+'">'+
      '<div class="lect-cab"><span class="lect-sec">Sección '+(k+1)+' de '+nb+'</span><span class="lect-rot">'+rot+'</span>'+
      (puedeHablar()?grupoVoz('btn-voz','Escuchar estos versículos','Escuchar '+rot):'')+
      '</div><div class="biblia" data-leer>'+txt+'</div>'+
      adsHTML(rep[k]||[],'Antes de seguir')+'</div>');
  }
  /* v131: EL REPRODUCTOR TAMBIEN VIVE AQUI, arriba del texto. Antes solo
     estaba en el modo lectura, y en dos columnas (1200 px o mas) el boton que
     lleva ahi estaba escondido: en el computador no habia como escuchar el
     capitulo seguido. Es el mismo componente del modo lectura (htmlLecVoz), en
     modo 'texto', y va pegado arriba de la columna. */
  return '<details class="lect" data-cid="'+cid+'"><summary>'+IC('libro')+' Leer el capítulo completo ('+
    nums.length+' versículos, RV1995)</summary><div class="lect-cuerpo'+(puedeHablar()?' lec-toca':'')+
    '" onclick="txtToca(event)">'+
    /* v146: «Pantalla completa» va DENTRO del reproductor, como en Apple
       Books: es una forma de leer y escuchar, no una caja aparte (tenía casi
       el peso del reproductor y el texto se partía en tres renglones). Sin voz
       en el aparato no hay reproductor, y el botón va solo. */
    /* v205: va AL FINAL y pegado abajo (CSS): una barra delgada que no tapa
       el texto mientras se lee, con los mismos controles. */
    bloques.join('')+
    '<div class="lect-top">'+(puedeHablar()?htmlLecVoz(nums.length,'texto',cid)
      :'<button type="button" class="btn tono lect-full" onclick="abreLectura(\''+cid+'\')">'+IC('expandir')+' Pantalla completa</button>')+'</div>'+
    '</div></details>';
}

/* ───────── MODO LECTURA ─────────
   MECANISMO
   El capítulo se lee hoy dentro de la tarjeta de estudio: con el riel al lado,
   las pestañas abajo, los botones de voz de cada bloque y las secciones de
   estudio esperando debajo. Eso está bien para repasar un dato y mal para leer
   treinta versículos seguidos, que es lo que hay que hacer primero.

   Aquí no hay nada nuevo que aprender ni ningún dato que la app no tenga: es el
   MISMO texto de `VERS` (los 196 versículos que `tools/citas.js` verifica byte
   a byte contra la RV1995) en una capa que tapa todo lo demás. Se abre, se lee,
   se cierra. No reemplaza la pantalla de estudio.

   LA MEDIDA QUE MANDA es el ancho de línea: 62 caracteres. Más largo y el ojo
   pierde el renglón al volver; en la tarjeta de estudio a 1440 px una línea de
   la Biblia llega a 110 caracteres.

   Al cerrar ofrece marcar el capítulo como leído, que es el gesto que la app ya
   necesitaba y que hoy hay que ir a buscar abajo de las secciones. */
let lectCid=null;

function abreLectura(cid){
  if(typeof VERS==='undefined'||!VERS[cid])return;
  paraVoz();
  const c=buscaItem(cid), nums=Object.keys(VERS[cid]).map(Number).sort((a,b)=>a-b);
  const lb=libroCid(cid)||{nombre:'Daniel',n:String(cid).replace('d','')}, n=lb.n, LB=lb.nombre;
  const cap=document.getElementById('lectura');
  if(!cap)return;
  lectCid=cid;
  cap.innerHTML=
    '<div class="lec-barra">'+
      '<div class="lec-prog"><i id="lec-i" style="width:0%"></i></div>'+
      '<span class="lec-pct" id="lec-pct">'+LB+' '+n+'</span>'+
      '<button type="button" class="lec-x" onclick="cierraLectura()" aria-label="Cerrar">'+IC('x')+'</button>'+
    '</div>'+
    /* v127: el 🔊 de la barra pasó a ser una franja de reproductor. */
    htmlLecVoz(nums.length)+
    '<div class="lec-caja" id="lec-caja"><h1>'+esc(c?c.sub:LB+' '+n)+'</h1>'+
    '<p class="lec-sub">'+LB+' '+n+' · Reina-Valera 1995 · '+nums.length+' versículos</p>'+
    '<div class="lec-txt biblia'+(puedeHablar()?' lec-toca':'')+'" data-leer onclick="lecToca(event)">'+
    nums.map(v=>'<p><span class="vn">'+v+'</span>'+esc(VERS[cid][v])+'</p>').join('')+
    '</div>'+
    '<div class="lec-fin">'+
      '<p>Terminaste de leer <strong>Daniel '+n+'</strong>.</p>'+
      ((S.prog[cid]||0)>=100
        ?'<p class="lec-ok">✓ Ya lo tenías marcado como estudiado.</p>'
        :'<button type="button" class="btn nar" onclick="listoDesdeLectura()">Ya lo estudié</button>')+
      '<button type="button" class="btn gho" onclick="cierraLectura()">Volver al estudio</button>'+
    '</div></div>';
  cap.hidden=false;
  document.body.classList.add('leyendo');
  const caja=document.getElementById('lec-caja');
  if(caja){caja.scrollTop=0;caja.onscroll=lectAvance;}
  lectAvance();
  pintaLecVoz();
}

/* Tocar un versículo: escuchar desde ahí. Si estaba seleccionando texto para
   copiarlo, no. */
function lecToca(e){
  if(!puedeHablar()||!e||!e.target||!e.target.closest)return;
  try{if(window.getSelection&&String(window.getSelection()))return;}catch(x){}
  const p=e.target.closest('.lec-txt p');
  if(p)lecVozDesde(p);
}

/** La barra de arriba dice cuánto del capítulo se ha recorrido, no cuánto se ha
 *  entendido: es la posición del scroll, y se dice así en el manual. */
function lectAvance(){
  const caja=document.getElementById('lec-caja'), i=document.getElementById('lec-i'),
        t=document.getElementById('lec-pct');
  if(!caja||!i)return;
  const max=caja.scrollHeight-caja.clientHeight;
  const pct=max>8?Math.min(100,Math.round(caja.scrollTop/max*100)):100;
  i.style.width=pct+'%';
  const lb=libroCid(lectCid);
  if(t&&lectCid)t.textContent=(lb?lb.nombre+' '+lb.n:'Daniel '+String(lectCid).replace('d',''))+' · '+pct+'%';
}

function cierraLectura(){
  paraVoz();
  const cap=document.getElementById('lectura');
  if(!cap)return;
  cap.hidden=true;cap.innerHTML='';
  lectCid=null;
  document.body.classList.remove('leyendo');
}

function listoDesdeLectura(){
  if(lectCid)listo(lectCid);
  cierraLectura();
}

/* Escape cierra, igual que la hoja del versículo. */
if(typeof document!=='undefined'&&document.addEventListener)
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&lectCid)cierraLectura();});

/* ───────── CAPA POR SECCIÓN (núcleo / apoyo / contexto) ─────────
   MECANISMO
   fuente/contenido.js le pone `capa` a cada sección que ya la tiene
   clasificada (hoy solo Daniel 3) y build.js le agrega `preg` a las de capa
   núcleo cuando encuentra una pregunta del banco que cae en su rango de
   versículo. Aquí solo se pinta lo que ya llega armado: la franja de color
   en `.sec h3` la pone el CSS con `data-capa`, y estas funciones agregan la
   píldora, el filtro y la tarjeta de recordar.

   El filtro es de VISTA, no de estado: no se guarda en ningún lado, así que
   cambiar de capítulo o recargar la página siempre arranca en «Todo». */
const CAPA_ETQ={nucleo:'Entra al examen',apoyo:'Ayuda a entender',contexto:'No entra'};

/* ── LA CABECERA DE UNA SECCION ─────────────────────────────────
   ANTES: emoji + titulo azul en negrita + barra naranja a la izquierda +
   pildora de color. Cuatro señales para decir dos cosas, y encima la caja de
   adentro traía SU barra de color, así que quedaban dos rayas verticales
   seguidas. Eso es lo que se veía cargado.

   AHORA: el rótulo en versalitas, una línea que cruza hasta el borde, y la
   capa al final con un punto. Los tres puntos son una escala que se lee sin
   leer la palabra: relleno entra al examen, contorno ayuda a entender, gris
   no entra. El emoji del título se quita aquí y no en los datos, porque los
   mismos títulos los usan el buscador, la impresión y el revisor. */
const SIN_EMOJI=/^[^\p{L}\p{N}]+/u;
function tituloSec(t){
  try{return String(t||'').replace(SIN_EMOJI,'').trim();}
  catch(e){return String(t||'').replace(/^[^A-Za-z0-9\u00c0-\u024f]+/,'').trim();}
}
function cabezaSec(s){
  const cap=s.capa||'';
  return '<h3 class="sec-cab"><span class="sec-rot">'+tituloSec(s.t)+'</span>'+
    '<span class="sec-linea"></span>'+
    (cap?'<span class="sec-capa c-'+cap+'"><i></i>'+CAPA_ETQ[cap]+'</span>':'')+'</h3>';
}

/* ───────── UNA PIEZA, UN SOLO ARMADO (regla de Camilo, 10-oct-2026) ─────────
   «Un mismo componente se utiliza con su misma implantación en todos los
   lugares donde aparezca.» Una pieza que se ve igual en dos sitios y se arma
   en dos sitios deja de ser igual el día que se toca una sola: es como
   quedaron tres reproductores parecidos. Por eso cada pieza tiene UNA función
   que la arma y todos los lugares la llaman; tests/test.js cuenta que su
   HTML no se escriba en ningún otro lado.
     segmentado()  el control de dos o tres opciones (Todo / Solo lo central;
                   Ver / Con pistas / Tapadas)
     filaNav()     Anterior · por cuál va · Siguiente (la hoja del versículo y
                   cada capítulo)
     htmlRp()      el reproductor (lectura, texto y estudio)
     grupoVoz()    el botón de escuchar de un bloque */
function segmentado(aria,ops,clase){
  return '<div class="capa-filtro'+(clase?' '+clase:'')+'" role="group" aria-label="'+aria+'">'+
    ops.map(o=>'<button type="button" class="cf'+(o.on?' on':'')+'" aria-pressed="'+(!!o.on)+'" onclick="'+o.clic+'">'+o.t+'</button>').join('')+'</div>';
}
/* `ant` y `sig`: {clic, aria}, o null si no hay a dónde ir (el botón sale apagado). */
function filaNav(ant,centro,sig){
  const b=(x,txt,lado)=>'<button type="button" class="hoja-nav"'+
    (x?' onclick="'+x.clic+'" aria-label="'+esc(x.aria||lado)+'"':' disabled aria-label="'+lado+'"')+'>'+txt+'</button>';
  return b(ant,'‹ Anterior','Anterior')+'<span class="hoja-cta">'+esc(centro)+'</span>'+b(sig,'Siguiente ›','Siguiente');
}
function filtroCapas(){
  return segmentado('Qué secciones ver',[
    {t:'Todo',on:true,clic:"filtraCapa(this,'')"},
    {t:'Solo lo central',clic:"filtraCapa(this,'nucleo')"}]);
}
/* Una sección del estudio, igual en las dos pestañas. `p` dice en cuál vive. */
/* ───────── LOS PERSONAJES (v189) ─────────
   Camilo (13-oct): «cuando aparezca el nombre, al dar clic aparece la
   información, así con todos los nombres históricos y bíblicos».
   MECANISMO: PERSONAJES trae cada persona con sus alias, tal como se escriben
   en el material. Se arma UNA expresión con todos los alias, del más largo
   al más corto (así «Juan Wiclef» gana sobre «Juan»), con bordes de palabra.
   personasTocables() recorre el HTML ya armado y solo toca texto suelto: no
   entra en botones (las citas bíblicas ya son botones), ni en títulos, ni en
   la línea de la fuente. Un alias con `caps` solo vale en esos capítulos
   (p. ej. «Darío» es Darío de Media en Daniel 6 y Darío III en Daniel 8).
   v190 (Camilo, 13-oct: «personajes todas las veces»): se marca cada vez que
   sale el nombre, no solo la primera. */
let perRe=null, perDe=null;
function perPrepara(){
  if(perRe||typeof PERSONAJES==='undefined')return;
  perDe={};
  const todos=[];
  PERSONAJES.forEach(p=>p.alias.forEach(a=>{
    const t=typeof a==='string'?a:a.t, caps=typeof a==='string'?null:a.caps;
    (perDe[t]=perDe[t]||[]).push({id:p.id,caps});todos.push(t);}));
  const esc2=t=>t.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  const lista=[...new Set(todos)].sort((a,b)=>b.length-a.length).map(esc2).join('|');
  try{perRe=new RegExp('(?<![\\p{L}\\p{N}])('+lista+')(?![\\p{L}\\p{N}])','gu');}catch(e){perRe=null;}
}
const perPorId=id=>(typeof PERSONAJES!=='undefined'?PERSONAJES:[]).find(p=>p.id===id);
function personasTocables(html,capId){
  perPrepara();
  if(!perRe)return html;
  /* La línea de la fuente no se toca: ahí van autores, no personajes. Dentro
     de una cita bíblica SÍ (Camilo, 13-oct 10:12), pero no en la referencia:
     en «Daniel 11:2» o «1 Juan 3» el nombre es el libro, no la persona. */
  return html.split(/(<p class="sec-fuente">[\s\S]*?<\/p>)/).map(parte=>{
    if(/^<p class="sec-fuente">/.test(parte))return parte;
    let dentro=0;
    return parte.split(/(<[^>]+>)/).map(tr=>{
      if(tr.charAt(0)==='<'){
        if(/^<(button|a|h\d|blockquote)[\s>]/.test(tr))dentro++;
        else if(/^<\/(button|a|h\d|blockquote)>/.test(tr)&&dentro>0)dentro--;
        return tr;
      }
      if(dentro>0||!tr.trim())return tr;
      return tr.replace(perRe,(n,_g,pos,todo)=>{
        if(/^\s*\d/.test(todo.slice(pos+n.length))||/\d\s*$/.test(todo.slice(Math.max(0,pos-3),pos)))return n;
        const c=(perDe[n]||[]).find(x=>!x.caps||x.caps.includes(capId));
        if(!c)return n;
        return '<button type="button" class="per" onclick="verPersona(\''+c.id+'\')">'+n+'</button>';
      });
    }).join('');
  }).join('');
}
/* La ficha sube en la MISMA hoja del versículo (una pieza, un armado). */
function verPersona(id){
  const p=perPorId(id);
  if(!p)return;
  const tipo=p.tipo==='biblico'?'Personaje bíblico':'Personaje histórico';
  const cid=S.ultItem||'';
  abreHojaHtml('<div class="hoja-fondo" onclick="cierraHoja()"></div>'+
    '<div class="hoja-caja per-caja" role="dialog" aria-modal="true" aria-label="'+esc(p.nombre)+'">'+
    '<div class="hoja-asa" onclick="cierraHoja()"></div>'+
    '<div class="hoja-cab"><div><div class="hoja-ref">'+tipo+(p.fechas?' · '+esc(p.fechas):'')+'</div>'+
      '<div class="per-nom">'+esc(p.nombre)+'</div></div>'+
      '<button type="button" class="hoja-x" onclick="cierraHoja()" aria-label="Cerrar">'+IC('x')+'</button></div>'+
    '<div class="per-txt"><p class="per-quien">'+p.quien+'</p>'+
      '<ul class="per-hizo">'+p.hizo.map(x=>'<li>'+x+'</li>').join('')+'</ul>'+
      (p.textos?'<p class="per-textos"><b>Textos:</b> '+refsTocables(esc(p.textos),cid)+'</p>':'')+
      '<p class="sec-fuente">Fuente: '+p.fuente+'</p></div></div>','per');
}

/* ───────── EL CANDELABRO DE DANIEL 1-7 (v190) ─────────
   Camilo (13-oct) quiere explicar el quiasmo con un candelabro, como en su
   presentación: Daniel 1 en el centro y las parejas 2-7, 3-6 y 4-5 en los
   brazos, cada pareja de su color. Tocar una lámpara la enciende y su pareja
   se ve a media luz, en el mismo color; las demás se apagan. La explicación va
   debajo de la imagen, nunca encima. Las x salen de las llamas de la imagen
   (laminas/quiasmo/candelabro.webp, 900 x 900). */
const QM={
  orden:[2,3,4,1,5,6,7], x:[66,190,316,443,575,702,827],
  color:{1:'#F4EEE2',2:'#F08A4B',7:'#F08A4B',3:'#F2C94C',6:'#F2C94C',4:'#A78BFA',5:'#A78BFA'},
  par:{2:7,7:2,3:6,6:3,4:5,5:4},
  txt:{
    1:['Daniel 1: el centro','Escrito en hebreo, abre el libro y lo sostiene: «el Señor entregó» a Joacim en manos de Nabucodonosor (1:2) y cuatro jóvenes fieles se mantienen firmes en Babilonia (1:8). Lo que viene después muestra lo mismo en grande: Dios gobierna la historia y cuida a los suyos.'],
    2:['Daniel 2 y Daniel 7','Cuatro reinos (cuatro metales, cuatro bestias) y después el reino eterno de Dios (2:44; 7:27).'],
    3:['Daniel 3 y Daniel 6','Un decreto sobre la adoración, un remanente fiel, una condena a muerte y la palabra «librar» (3:17; 6:16).'],
    4:['Daniel 4 y Daniel 5','Dos reyes de Babilonia soberbios: uno es humillado y restaurado (4:34); el otro, juzgado para siempre (5:30).']}
};
function quiasmoHTML(){
  const src=LAMINAS_DIR+'quiasmo/candelabro.webp';
  return '<div class="qm" data-sel=""><div class="qm-esc"><img class="qm-img" src="'+src+'" alt="Candelabro de siete brazos: Daniel 1 en el centro y sus parejas" loading="lazy">'+
    QM.orden.map((n,i)=>'<button type="button" class="qm-l" data-n="'+n+'" style="--c:'+QM.color[n]+';left:'+(QM.x[i]/9)+'%" onclick="qmToca('+n+')" aria-label="Daniel '+n+'">'+
      '<span class="qm-g" aria-hidden="true"></span><b>'+(n===1?'Cap. 1':'Cap. '+n)+'</b></button>').join('')+
    '</div><div class="qm-txt" aria-live="polite"><p class="qm-pista">Toca una lámpara para ver su pareja.</p></div></div>';
}
function qmToca(n){
  const q=document.querySelector('#detalle .qm');if(!q)return;
  const par=QM.par[n]||0, misma=q.getAttribute('data-sel')===String(n);
  q.setAttribute('data-sel',misma?'':String(n));
  q.querySelectorAll('.qm-l').forEach(b=>{const k=+b.getAttribute('data-n');
    b.classList.toggle('on',!misma&&k===n);b.classList.toggle('par',!misma&&k===par);
    b.classList.toggle('off',!misma&&k!==n&&k!==par);b.setAttribute('aria-pressed',String(!misma&&k===n));});
  const t=QM.txt[Math.min(n,par||n)]||QM.txt[n];
  q.querySelector('.qm-txt').innerHTML=misma?'<p class="qm-pista">Toca una lámpara para ver su pareja.</p>':
    '<div class="qm-t" style="--c:'+QM.color[n]+'">'+esc(t[0])+'</div><p>'+refsTocables(esc(t[1]),'d2')+'</p>';
}

/* v188: la fuente de cada sección va en una sola línea corta y discreta. */
const conFuente=h=>h.replace(/<p class="fuente"><small>(Fuentes?:[\s\S]*?)<\/small><\/p>/g,'<p>$1</p>').replace(/<p>(Fuentes?:)/g,'<p class="sec-fuente">$1');
/* v205: EL MISMO ORDEN EN CADA SECCIÓN. Lo que dice (el versículo) → lo que
   significa → cómo vivirlo → la fuente, en una línea al final. «Lo que dice»
   solo sale en las de interpretación, y solo con un versículo que la sección
   cita y no copia ya entre comillas; «Cómo vivirlo» es el rótulo de las
   secciones de aplicación que el material ya trae (no se escribe ninguna). */
function diceDe(s,cid){
  if(typeof VERS==='undefined'||!VERS[cid])return '';
  const vs=refsCap(s.h,cid).filter((v,i,a)=>a.indexOf(v)===i&&VERS[cid][v]);
  if(!vs.length)return '';
  const norm=t=>String(t).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9ñ ]/g,' ').replace(/\s+/g,' ').trim();
  const citas=[];String(s.h).replace(/«([^»]{12,})»/g,(_,q)=>{citas.push(norm(sinEtiquetas(q)));return '';});
  const libre=vs.filter(v=>{const t=norm(VERS[cid][v]);return !citas.some(q=>t.includes(q)||q.includes(t.slice(0,40)));});
  if(!libre.length)return '';
  const v0=libre[0], v1=libre.includes(v0+1)&&(VERS[cid][v0]+VERS[cid][v0+1]).length<260?v0+1:v0;
  const lb=libroCid(cid);
  return '<div class="lq-dice"><div class="lq-eti">Lo que dice</div><p class="biblia-t">«'+esc(VERS[cid][v0]+(v1>v0?' '+VERS[cid][v1]:''))+'»'+
    ' <cite>'+esc(lb.nombre+' '+lb.n+':'+v0+(v1>v0?'-'+v1:''))+'</cite></p></div>';
}
const htmlSec=(id,p)=>s=>{
  const todas=CONTENIDO[id]||CONT_MODULOS[id]||[], i=todas.indexOf(s);
  const sk=(typeof VERS==='undefined'||!VERS[id])?secsEstudioDe(id).indexOf(s):-1;
  const interp=esSecInterp(s), vivir=!interp&&ES_VIVIR.test(String(s.t||''));
  let h=personasTocables(conFuente(refsTocables(s.h,s.cap||id)),s.cap||id).replace('<div class="qm-aqui"></div>',()=>quiasmoHTML());
  let fu='';
  const m=/<p class="sec-fuente">[\s\S]*?<\/p>\s*$/.exec(h);
  if(m&&(interp||vivir)){fu=m[0];h=h.slice(0,m.index);}
  const cuerpo=interp?diceDe(s,s.cap||id)+'<div class="lq-sig"><div class="lq-eti">Lo que significa</div>'+h+'</div>'
    :vivir?'<div class="lq-viv"><div class="lq-eti">Cómo vivirlo</div>'+h+'</div>':h;
  return '<div class="sec" data-capa="'+(s.capa||'')+'"'+(p?' data-pest="'+p+'"':'')+(i>=0?' data-i="'+i+'"':'')+(sk>=0?' data-sk="'+sk+'"':'')+'>'+cabezaSec(s)+
    cuerpo+fu+(s.preg?recordarHTML(s.preg):'')+'</div>';
};

/* v187: «Para el examen» y «Para profundizar». Antes la interpretación iba al
   final del mismo estudio y solo un filtro la separaba: se leía todo seguido y
   no quedaba claro qué entraba al examen. Ahora cada capítulo que tiene
   interpretación muestra dos pestañas. Cada sección lleva data-pest con la
   suya y #detalle lleva data-pest con la abierta; el CSS esconde la otra. Así
   funciona igual en una y en dos columnas (divideVista mueve las secciones,
   el atributo viaja con ellas). La pestaña elegida se mantiene al pasar de
   capítulo. */
let capPest='examen';
function pestanasCap(){
  const b=(k,ic,t,sub)=>'<button type="button" role="tab" class="pest pest-'+k+(capPest===k?' on':'')+
    '" aria-selected="'+(capPest===k)+'" onclick="ponPest(\''+k+'\')">'+IC(ic)+'<span class="pest-tx"><b>'+t+'</b><small>'+sub+'</small></span></button>';
  return '<div class="cap-pest" role="tablist" aria-label="Qué estudiar">'+
    b('examen','examen','Para el examen','Lo que se pregunta')+b('prof','brujula','Para profundizar','No entra al examen')+'</div>';
}
function ponPest(k){
  capPest=k==='prof'?'prof':'examen';
  const d=document.getElementById('detalle');
  if(!d)return;
  d.setAttribute('data-pest',capPest);
  d.querySelectorAll('.cap-pest .pest').forEach(b=>{const on=b.classList.contains('pest-'+capPest);
    b.classList.toggle('on',on);b.setAttribute('aria-selected',String(on));});
}
/* El aviso al final del examen: cambia de pestaña y sube a ella. */
function irProf(){
  ponPest('prof');
  const t=document.querySelector('#detalle .cap-pest');
  if(t&&t.scrollIntoView)t.scrollIntoView({behavior:'smooth',block:'start'});
}

function filtraCapa(btn,modo){
  const d=document.getElementById('detalle');
  if(!d)return;
  d.querySelectorAll('.capa-filtro .cf').forEach(b=>{b.classList.remove('on');b.setAttribute('aria-pressed','false');});
  btn.classList.add('on');btn.setAttribute('aria-pressed','true');
  d.querySelectorAll('.sec:not([data-pest="prof"]):not(.prof-cta)').forEach(function(s){
    const c=s.getAttribute('data-capa')||'';
    s.style.display=(!modo||c===modo)?'':'none';
  });
}

/* La tarjeta de recordar no toca el examen ni las estadísticas: es su propio
   botón con su propio comprobador, aislado de jgBien/jgMal y de S.hist. Sin
   puntaje y sin castigo — el mismo criterio que ya usa «Compruébalo». */
function recordarHTML(preg){
  const rid='rec_'+Math.random().toString(36).slice(2,8);
  /* Un completar no se puede ofrecer con botones: la respuesta estaria en la
     pantalla y elegir no es producir. Va con campos, y se comprueba con el
     MISMO comparador del examen (`igual`), que ya ignora mayusculas, tildes y
     espacios de sobra. Aqui tampoco hay puntaje ni registro: es el mismo
     aislamiento que las de seleccion. */
  if(preg.t==='fill')return recordarFillHTML(rid,preg);
  const esTF=preg.t==='tf';
  const ops=esTF
    ?['Verdadero','Falso'].map((txt,i)=>
      '<button type="button" class="btn peq" onclick="compruebaRec(\''+rid+'\','+(i===0)+','+preg.a+')">'+txt+'</button>').join('')
    :(preg.o||[]).map((o,i)=>
      '<button type="button" class="btn peq" onclick="compruebaRec(\''+rid+'\','+i+','+preg.a+')">'+esc(o)+'</button>').join('');
  return '<div class="recordar" id="'+rid+'">'+
    '<div class="rec-tit">Antes de pasar — recuerda</div>'+
    '<div class="rec-preg">'+esc(preg.q)+'</div>'+
    '<div class="rec-ops">'+ops+'</div>'+
    '<div class="rec-comp" hidden></div></div>';
}

function recordarFillHTML(rid,preg){
  const campos=(preg.p||[]).map(p=>p.b
    ?'<input class="rec-in" type="text" autocomplete="off" autocapitalize="off"'+
      ' spellcheck="false" placeholder="'+esc(p.h||'\u00bf?')+'" data-b="'+esc(p.b)+'">'
    :'<span>'+esc(p.x)+'</span>').join('');
  return '<div class="recordar" id="'+rid+'">'+
    '<div class="rec-tit">Antes de pasar \u2014 recuerda</div>'+
    '<div class="rec-preg">'+esc(preg.ins||'Completa la declaraci\u00f3n')+'</div>'+
    '<div class="rec-rell">'+campos+'</div>'+
    '<div class="rec-ops"><button type="button" class="btn peq"'+
      ' onclick="compruebaRecFill(\''+rid+'\')">Comprobar</button></div>'+
    '<div class="rec-comp" hidden></div></div>';
}

function compruebaRecFill(rid){
  const c=document.getElementById(rid);
  if(!c)return;
  const campos=[].slice.call(c.querySelectorAll('.rec-in'));
  if(!campos.length)return;
  let todas=true;
  const faltaron=[];
  campos.forEach(function(i){
    const ok=igual(i.value,i.getAttribute('data-b'));
    i.className='rec-in '+(ok?'ok':'ko');
    /* Solo se dicen las que FALTARON. Listarlas todas devolvia tambien la que
       ya estaba bien, y la nina tiene que volver a leer para saber cual
       fallo. */
    if(!ok){todas=false;faltaron.push(i.getAttribute('data-b'));}
  });
  const comp=c.querySelector('.rec-comp');
  if(!comp)return;
  comp.hidden=false;
  comp.className='rec-comp '+(todas?'ok':'ko');
  comp.textContent=todas
    ?'\u2705 Correcto, palabra por palabra.'
    :'\u274c Falt\u00f3: '+faltaron.join(' \u00b7 ');
}

function compruebaRec(rid,elegido,correcta){
  const c=document.getElementById(rid);
  if(!c)return;
  const bien=elegido===correcta;
  c.querySelectorAll('.rec-ops button').forEach(b=>b.disabled=true);
  const comp=c.querySelector('.rec-comp');
  if(!comp)return;
  comp.hidden=false;
  comp.className='rec-comp '+(bien?'ok':'ko');
  comp.innerHTML=bien?IC('check')+' Correcto.':IC('x')+' No era esa — sigue leyendo con calma.';
}

/* ───────── ANTERIOR Y SIGUIENTE, EN EL ORDEN DE ESTUDIO (v158) ─────────
   Camilo: «¿cuál es la manera fácil para ir a la siguiente en orden?». No la
   había: para pasar de la creencia 1 a la 2 tocaba subir hasta la rejilla y
   buscarla, o bajar hasta «Ya lo estudié». Ahora cada capítulo trae, arriba y
   al final, la misma fila de la hoja del versículo: Anterior, por cuál va y
   Siguiente. El orden es el de la pantalla Estudiar, que es el que ya sigue
   «Ya lo estudié»: los capítulos que el filtro deja ver y después los repasos. */
function navCap(id){
  const caps=capsVista(), mods=modsDe(), lista=[...caps,...mods];
  const i=lista.findIndex(x=>x.id===id);
  if(i<0||lista.length<2)return '';
  const a=lista[i-1], b=lista[i+1], k=caps.findIndex(x=>x.id===id);
  const donde=k>=0?(k+1)+' de '+caps.length:'Repaso '+(mods.findIndex(x=>x.id===id)+1)+' de '+mods.length;
  const a_=x=>x?{clic:"verCap('"+x.id+"')",aria:null}:null;
  const ant=a_(a), sig=a_(b);
  if(ant)ant.aria='Anterior: '+a.label+', '+a.sub;
  if(sig)sig.aria='Siguiente: '+b.label+', '+b.sub;
  return '<div class="cap-nav">'+filaNav(ant,donde,sig)+'</div>';
}

function verCap(id,quieto){
  paraVoz();
  /* v161: ¿desde dónde se llega? Si ya había un capítulo abierto en esta
     pantalla (Siguiente, Anterior, «Ya lo estudié», otra tarjeta), la página
     se pone de una en el capítulo nuevo. Si se viene de la rejilla sin nada
     abierto, baja suave desde donde está, para que se vea a dónde fue. Nunca
     sube primero al principio. */
  let enEstudio=false, abierto=false;
  try{
    const pe=document.getElementById('p-estudio'), d0=document.getElementById('detalle');
    enEstudio=!!(pe&&pe.classList&&pe.classList.contains&&pe.classList.contains('on'));
    abierto=enEstudio&&!!(d0&&d0.style&&d0.style.display==='block');
  }catch(e){}
  ir('estudio',true);
  S.ultItem=id;capAbierto=id;guardar();
  document.querySelectorAll('.cap,.mod').forEach(b=>b.classList.remove('on'));
  document.querySelector('.c-'+id)?.classList.add('on');
  const c=buscaItem(id);
  if(!c)return;
  const secs=CONTENIDO[id]||CONT_MODULOS[id]||[];
  const d=document.getElementById('detalle');
  /* Un repaso de «Para profundizar» es todo interpretación: sin pestañas. */
  const soloI=secs.length>0&&secs.every(esSecInterp);
  const hayI=!soloI&&secs.some(esSecInterp);
  if(hayI)d.setAttribute?.('data-pest',capPest);else if(soloI)d.setAttribute?.('data-pest','prof');else d.removeAttribute?.('data-pest');
  if(typeof LAMINAS!=='undefined'&&LAMINAS[id])setTimeout(()=>lamPrecarga(id),1200);
  /* v156: «Volver a …» solo si se llegó desde una lista (ver verCreencia). */
  if(crVuelve&&crVuelve.a!==id)crVuelve=null;
  const deDonde=crVuelve?buscaItem(crVuelve.de):null;
  d.innerHTML=
    '<div class="cap-cab">'+
    (deDonde?'<button type="button" class="btn txt cap-vuelve" onclick="crRegresa()">'+IC('izq')+
      ' Volver a '+esc(deDonde.label)+'</button>':'')+
    navCap(id)+
    '<div class="cap-ante">'+esc(c.label)+'</div>'+
    '<h2 class="cap-tit">'+esc(c.sub)+'</h2>'+
    '<div class="cap-meta">'+(origenDe(c)?esc(origenDe(c))+' · ':'')+
    /* v150: lo que dice aquí tiene que ser lo que se muestra abajo. Las
       creencias traen sus textos de la Reina-Valera 1909 (Biblia Libre, ver
       fuente/biblia-otros.js), no de la RV1960; y los repasos de creencias
       (mc-*) no traen texto bíblico, así que no dicen versión. */
    (esCreencia(id)?'textos en Reina-Valera 1909':/^mc-/.test(id)?'En esto creemos':esMatutina()?'Devoción matutina':'texto RV1995')+
    (c.vs?' · '+c.vs+' versículo'+(c.vs===1?'':'s'):'')+'</div></div>'+
    /* v129: Profetas y Reyes se escucha por su estudio (ver htmlEstVoz). */
    (conEstudioEnVoz(c)?htmlEstVoz(c):'')+
    /* El capitulo completo va ARRIBA de las secciones y cerrado: quien quiera
       leer primero lo abre, y a quien viene a repasar un dato no le estorba. */
    seccionLectura(id)+
    /* v187: con interpretación, dos pestañas (ver pestanasCap). */
    (hayI?pestanasCap():'')+
    /* El filtro solo cuando hay qué filtrar: secciones centrales y de apoyo. */
    (secs.some(s=>s.capa==='nucleo')&&secs.some(s=>!esSecInterp(s)&&s.capa!=='nucleo')?filtroCapas():'')+
    secs.filter(s=>!esSecInterp(s)).map(htmlSec(id,hayI?'examen':'')).join('')+
    (hayI?
      '<div class="sec prof-cta" data-pest="examen"><button type="button" class="prof-ir" onclick="irProf()">'+IC('brujula')+
      '<span><b>¿Quieres ir más hondo?</b> Para profundizar: '+(LAMINAS[id]?'el estudio interactivo, ':'')+
      'qué significa el capítulo y cómo la Biblia explica sus símbolos.</span></button></div>'+
      '<div class="sec interp-cab" data-capa="contexto" data-pest="prof" id="interp-de-cap"><h3 class="interp-tit">'+IC('brujula')+' Para profundizar</h3>'+
      '<p class="interp-nota"><b>Esto no entra al examen.</b> Es lo que significa el capítulo y cómo la Biblia explica sus símbolos. Cada sección cierra con su fuente.</p>'+
      /* v185: el estudio interactivo con imagen, si el capítulo lo tiene. */
      lamTarjeta(id)+cmpBoton(id)+'</div>'+
      secs.filter(esSecInterp).map(htmlSec(id,'prof')).join(''):
      soloI?'<div class="sec interp-cab" data-capa="contexto" data-pest="prof"><h3 class="interp-tit">'+IC('brujula')+' Para profundizar</h3>'+
        '<p class="interp-nota"><b>Esto no entra al examen.</b> Cada sección cierra con su fuente.</p></div>'+
        /* v205: el repaso de comparar abre con la tabla que se toca. */
        (ES_COMPARAR.test(id)?'<div class="sec cmp-sec" data-capa="contexto" data-pest="prof">'+comparaHTML()+'</div>':'')+
        secs.map(htmlSec(id,'prof')).join(''):
      lamTarjeta(id))+
    (esLibroPR(c)?secFrasesLibro(id):'')+
    /* v146: UN botón principal. Al terminar de leer lo que se espera es
       marcarlo; Tarjetas y Examen quedan a mano en tono suave e Imprimir como
       enlace. Antes eran cuatro colores del mismo peso y ninguno mandaba. */
    navCap(id)+
    '<div class="acc-fin">'+
    '<button class="btn ver" onclick="listo(\''+id+'\')">'+IC('check')+' Ya lo estudié</button>'+
    '<button class="btn tono" onclick="ir(\'tarjetas\')">'+IC('tarjetas')+' Tarjetas</button>'+
    '<button class="btn tono" onclick="ir(\'examen\')">'+IC('examen')+' Examen</button>'+
    '<button class="btn txt" onclick="imprimeCapitulo(\''+id+'\')">'+IC('imprimir')+' Imprimir</button></div>';
  d.style.display='block';
  d.classList.remove('l28-tapado','l28-pistas');
  limpiaRetiradasDe(d);
  hidrataVoz(d);
  numeraDecl(d);
  enlazaCreencias(d);
  divideVista(d,id);
  avanza(id,60);
  /* verCap() pinta el detalle pero no movía el foco hasta él: con 28
     creencias en una rejilla de cuatro columnas, el detalle nace siete filas
     más abajo, fuera de lo que se ve, y tocar una tarjeta parecía no hacer
     nada. Mismo defecto que tuvo «abrir evaluación» (v99), mismo arreglo:
     llevaA() hace scroll y marca dónde aterrizar. */
  /* v156: al reabrir tras un refresco no se lleva al inicio del detalle: el
     arranque pone la página donde iba leyendo (vuelveADonde). */
  if(!quieto){
    /* v161: mientras la página va bajando sola hacia el capítulo no se anota
       dónde va: un refresco en ese medio segundo dejaba guardada una altura a
       mitad de camino. Sin anotación, el arranque muestra el capítulo desde
       su título, que es lo que se acababa de pedir. */
    if(abierto||!enEstudio)llevaA('detalle',true);
    else{dondeEspera(1200);llevaA('detalle');}
  }
}

/* ───────── DÓNDE IBA LEYENDO (v156) ─────────
   MECANISMO
   Un refresco ya reabría la pantalla y el capítulo (ultPantalla, ultItem),
   pero siempre arriba: quien iba por la mitad de «Las 6 doctrinas» volvía al
   título. Mientras se baja por la página se anota en el aparato en qué
   sección va y cuánto ha bajado dentro de ella; el arranque vuelve ahí.

   POR QUÉ LA SECCIÓN Y NO SOLO LOS PÍXELES
   La altura de lo que hay encima cambia entre una visita y otra (la rejilla
   de capítulos, el reproductor, un bloque abierto), y los mismos píxeles
   caerían en otro párrafo. La sección es la misma siempre.

   POR QUÉ NO VA EN LA FICHA
   La ficha sube al servidor y baja a otros celulares; la altura de una página
   solo vale en esta pantalla. Va aparte, como el filtro y la velocidad. */
const DONDE_K='cb-donde';
const DONDE_TOPE=84;
let dondeT=0, dondeQuieto=false;
const dondeLlave=()=>[DB.activo,S.ultPantalla||'inicio',S.ultItem||''].join('|');
function secsDeDonde(){
  const d=document.getElementById('detalle');
  if(!d||!S.ultItem||S.ultPantalla!=='estudio'||!d.getClientRects().length)return [];
  return [...d.querySelectorAll('.sec')].filter(x=>x.getClientRects().length);
}
let dondeHasta=0;
function dondeEspera(ms){dondeHasta=Date.now()+ms;try{localStorage.removeItem(DONDE_K);}catch(e){}}
function anotaDonde(){
  if(dondeQuieto||Date.now()<dondeHasta)return;
  try{
    const o={k:dondeLlave(),y:Math.round(window.scrollY||0)};
    const secs=secsDeDonde();
    const i=secs.findIndex(x=>x.getBoundingClientRect().bottom>DONDE_TOPE);
    if(i>=0){const r=secs[i].getBoundingClientRect();
      /* Solo si ya entró en la sección: arriba de la primera mandan los píxeles. */
      if(r.top<=DONDE_TOPE){o.s=i;o.dy=Math.round(DONDE_TOPE-r.top);}}
    localStorage.setItem(DONDE_K,JSON.stringify(o));
  }catch(e){}
}
function vuelveADonde(){
  let o=null;
  try{o=JSON.parse(localStorage.getItem(DONDE_K)||'null');}catch(e){}
  if(!o||o.k!==dondeLlave())return false;
  const pon=()=>{
    let y=Number(o.y)||0;
    const sec=Number.isInteger(o.s)?secsDeDonde()[o.s]:null;
    if(sec)y=sec.getBoundingClientRect().top+(window.scrollY||0)-DONDE_TOPE+(Number(o.dy)||0);
    window.scrollTo(0,Math.max(0,Math.round(y)));
  };
  dondeQuieto=true;
  try{pon();}catch(e){}
  /* Otra vez cuando el navegador termina de acomodar la página (letra,
     imágenes): la primera medida puede haber sido con la altura a medias. */
  const fin=()=>{try{pon();}catch(e){}dondeQuieto=false;};
  if(typeof requestAnimationFrame==='function')requestAnimationFrame(()=>requestAnimationFrame(fin));
  else fin();
  return true;
}
if(typeof window!=='undefined'&&window.addEventListener){
  window.addEventListener('scroll',()=>{clearTimeout(dondeT);dondeT=setTimeout(anotaDonde,200);},{passive:true});
  window.addEventListener('pagehide',anotaDonde);
}

/* ───────── LO RETIRADO TAMPOCO SALE EN «COMPRUEBALO» ─────────
   MECANISMO
   Esa pestaña no se arma al pintar: la escribe fuente/build.js al generar el
   HTML, a partir de las tarjetas y las preguntas del capitulo. Cuando el
   director retira una, el HTML ya esta escrito y la seguiria mostrando.

   POR QUE SE COMPARA EL TEXTO Y NO LA CLAVE
   Marcar cada bloque con su clave obligaria a que build.js calculara el mismo
   hash que la app, y seria la misma funcion escrita en dos archivos: el dia que
   una cambie, la otra deja de coincidir sin avisar. El frente de la tarjeta ya
   esta en los dos lados y es exacto, asi que sirve de enlace sin duplicar nada.

   Si se retira algo que la pestaña no trae, no pasa nada: no hay bloque que
   quitar. */
function textosRetirados(){
  const fuera=new Set();
  for(const t of TARJETAS)if(retiradas.has(claveT(t)))fuera.add(t.f);
  for(const q of BANCO)if(retiradas.has(claveQ(q)))fuera.add(q.q||q.ins||'');
  return fuera;
}

function limpiaRetiradasDe(d){
  if(!d||!retiradas.size||!d.querySelectorAll)return;
  const fuera=textosRetirados();
  [].slice.call(d.querySelectorAll('.rev')).forEach(function(b){
    const t=b.querySelector&&b.querySelector('.rev-t');
    if(t&&fuera.has(t.textContent))b.remove&&b.remove();
  });
}

/* ───────── PALETA DE COMANDOS (⌘K) ─────────
   MECANISMO
   Para abrir un capítulo hay que ir a Estudiar, encontrar su tarjeta entre las
   siete y las nueve de repaso, y tocarla. Con teclado eso son cuatro gestos
   para algo que se puede escribir en tres letras.

   HONESTO, Y VA EN EL MANUAL: esto sirve a quien tiene teclado. Las niñas
   estudian en el teléfono y no lo van a ver nunca. Se construye porque el
   mantenedor arma exámenes y revisa capítulos todos los días, no porque haga
   la app mejor para quien la usa en el celular.

   La lista sale de los MISMOS datos: `capsDe()`, `modsDe()` y `CATS`. No hay un
   catálogo aparte que se pueda desincronizar del material.

   El filtro normaliza sin tildes y sin mayúsculas, igual que la comparación de
   respuestas del examen: quien escribe «babilonia» no debería quedarse sin
   resultados por escribir «Babilonia». */
let pcAbierta=false, pcSel=0, pcItems=[];

/** Todo lo que la paleta puede abrir, en el orden en que sirve. */
function pcCatalogo(){
  const it=[];
  capsDe().forEach(c=>it.push({g:'Capítulos',ic:'📖',t:c.label,
    s:c.sub+' · '+(S.prog[c.id]||0)+'% leído',f:()=>verCap(c.id)}));
  modsDe().forEach(m=>it.push({g:'Repasos',ic:'🔎',t:m.label,
    s:(m.sub||'')+' · '+(S.prog[m.id]||0)+'%',f:()=>verCap(m.id)}));
  it.push({g:'Acciones',ic:'🃏',t:'Tarjetas de hoy',
    s:Math.min(tocanHoy().length,topeSesion())+' para hacer',f:()=>ir('tarjetas')});
  const err=falladasDe().length;
  if(err>0)it.push({g:'Acciones',ic:'↺',t:'Repasar mis '+err+' errores',
    s:'Lo que más puntos recupera',f:()=>arrancaExamen('errores')});
  it.push({g:'Acciones',ic:'✏️',t:'Examen de práctica',
    s:CAT().n+' preguntas',f:()=>ir('examen')});
  it.push({g:'Acciones',ic:'📘',t:'Leer en pantalla completa',
    s:'El capítulo completo, sin nada alrededor',f:()=>{
      const c=capsDe().find(x=>typeof VERS!=='undefined'&&VERS[x.id]);
      if(c)abreLectura(c.id);else ir('estudio');}});
  it.push({g:'Acciones',ic:'❓',t:'Cómo se usa esta app',s:'El manual completo',f:()=>ir('ayuda')});
  /* Cambiar de categoría entra aquí con el nombre de su actividad delante,
     porque «Aventureros» solo no dice de cuál de las tres es. */
  Object.keys(CATS).forEach(k=>{
    if(k===S.cat)return;
    const a=ACTIVIDADES[CATS[k].act];
    it.push({g:'Cambiar de material',ic:a?a.icono:'✳️',
      t:(a?a.nombre+' · ':'')+CATS[k].nombre,s:CATS[k].alcance,f:()=>ponCat(k)});
  });
  return it;
}

const pcLimpia=t=>String(t).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');

function pcFiltra(q){
  const todo=pcCatalogo();
  const n=pcLimpia(q).trim();
  /* SIN escribir nada, las ACCIONES van primero. Con el catálogo en su orden
     natural el tope de doce se lo comían los capítulos y los repasos, y la
     paleta abría mostrando justo lo que uno puede encontrar solo en Estudiar.
     Se vio en el render: doce filas y ni una acción.
     Escribiendo algo se respeta el orden natural, porque ahí uno ya sabe qué
     está buscando. */
  if(!n){
    const acc=todo.filter(i=>i.g==='Acciones');
    const resto=todo.filter(i=>i.g!=='Acciones');
    return acc.concat(resto).slice(0,12);
  }
  return todo.filter(i=>pcLimpia(i.t+' '+i.s+' '+i.g).includes(n)).slice(0,12);
}

function abrePaleta(){
  const c=document.getElementById('paleta');
  if(!c)return;
  pcAbierta=true;pcSel=0;
  c.innerHTML='<div class="pc-fondo" onclick="cierraPaleta()"></div>'+
    '<div class="pc" role="dialog" aria-modal="true" aria-label="Buscar y abrir">'+
    '<div class="pc-in"><span aria-hidden="true">⌘K</span>'+
    '<input id="pc-q" type="text" autocomplete="off" placeholder="Escribe un capítulo, un repaso o una acción..." '+
    'oninput="pcPinta()" aria-label="Buscar"></div>'+
    '<div class="pc-l" id="pc-l"></div>'+
    '<div class="pc-pie"><span><kbd>↑↓</kbd> mueve</span><span><kbd>↵</kbd> abre</span>'+
    '<span><kbd>esc</kbd> cierra</span></div></div>';
  c.hidden=false;
  pcPinta();
  try{document.getElementById('pc-q').focus();}catch(e){}
}

function cierraPaleta(){
  const c=document.getElementById('paleta');
  if(!c)return;
  pcAbierta=false;c.hidden=true;c.innerHTML='';
}

function pcPinta(){
  const l=document.getElementById('pc-l'), q=document.getElementById('pc-q');
  if(!l)return;
  pcItems=pcFiltra(q?q.value:'');
  if(pcSel>=pcItems.length)pcSel=Math.max(0,pcItems.length-1);
  if(!pcItems.length){
    l.innerHTML='<p class="pc-nada">Nada con eso. Prueba con «daniel», «trampas» o «errores».</p>';
    return;
  }
  let g='',h='';
  pcItems.forEach((i,n)=>{
    if(i.g!==g){g=i.g;h+='<div class="pc-g">'+esc(g)+'</div>';}
    h+='<button type="button" class="pc-r'+(n===pcSel?' on':'')+'" onclick="pcAbre('+n+')">'+
      '<span class="ic" aria-hidden="true">'+(icoDe(i.ic)||esc(i.ic))+'</span>'+
      '<b>'+esc(i.t)+'</b><small>'+esc(i.s||'')+'</small></button>';
  });
  l.innerHTML=h;
}

function pcAbre(n){
  const i=pcItems[n];
  if(!i)return;
  cierraPaleta();
  try{i.f();}catch(e){}
}

function pcTecla(e){
  /* Se abre con ⌘K o Ctrl+K, que es lo que ya esperan los dedos de cualquiera
     que use un editor. */
  const k=(e.key||'').toLowerCase();
  if(k==='k'&&(e.metaKey||e.ctrlKey)){
    e.preventDefault();
    if(pcAbierta)cierraPaleta();else abrePaleta();
    return;
  }
  if(!pcAbierta)return;
  if(e.key==='Escape'){e.preventDefault();cierraPaleta();return;}
  if(e.key==='ArrowDown'||e.key==='ArrowUp'){
    e.preventDefault();
    if(!pcItems.length)return;
    pcSel=(pcSel+(e.key==='ArrowDown'?1:-1)+pcItems.length)%pcItems.length;
    pcPinta();
    return;
  }
  if(e.key==='Enter'){e.preventDefault();pcAbre(pcSel);}
}

if(typeof document!=='undefined'&&document.addEventListener)
  document.addEventListener('keydown',pcTecla);

/* ───────── VISTA DIVIDIDA ─────────
   MECANISMO
   El dato y el versículo están en la misma pantalla pero uno debajo del otro,
   así que compararlos es abrir la hoja del versículo, leerla, cerrarla y volver
   a buscar el renglón. En un celular no hay alternativa: no hay ancho. En
   escritorio sí, y a 1440 px sobran 412 px de margen sin usar.

   Aquí el texto queda a la izquierda, PEGADO con `position:sticky`, y el
   estudio se desplaza solo a la derecha. Es lo único que el escritorio puede
   hacer y el celular no.

   DECISIÓN DE IMPLEMENTACIÓN: el DOM se reestructura SIEMPRE y el CSS decide si
   lo pinta en dos columnas. Poner el ancho en un `matchMedia` de JS obligaría a
   escuchar el `resize` y a rearmar el DOM en cada cambio de tamaño; con la media
   query, por debajo de 1200 px el flex simplemente no aplica y todo se apila
   igual que antes.

   Solo en capítulos con texto en `VERS`: Profetas y Reyes y las creencias no
   tienen el capítulo palabra por palabra, así que no hay nada que poner a la
   izquierda. */
function divideVista(d,id){
  try{
    if(typeof VERS==='undefined'||!VERS[id])return;
    const det=d.querySelector(':scope>details.lect');
    const secs=[...d.querySelectorAll(':scope>.sec')];
    if(!det||!secs.length)return;
    /* Abierto de entrada SOLO en dos columnas: ahí un acordeón cerrado deja
       media pantalla en blanco. En una sola columna sigue cerrado, que es lo
       que v43 decidió para no estorbarle a quien viene a repasar un dato, y se
       vio en el render que sin esta guarda quedaba abierto también a 390 px.
       Es el único sitio donde el JS mira el ancho, y no necesita `resize`: el
       acordeón lo abre y lo cierra quien quiera con un toque. */
    det.open=enColumnas(d);
    const fila=document.createElement('div');fila.className='vd';
    /* v205: tres columnas. A la izquierda el índice (capítulos y secciones),
       en medio el texto y a la derecha el estudio, que empieza por «Esta
       sección» (ver estaSeccionHTML). */
    const ind=document.createElement('nav');ind.className='vd-ind';
    if(ind.setAttribute)ind.setAttribute('aria-label','Índice del capítulo');
    ind.innerHTML=indiceHTML(id);
    const iz=document.createElement('div');iz.className='vd-izq';
    const de=document.createElement('div');de.className='vd-der';
    iz.innerHTML='<p class="vd-rot">El texto · RV1995</p>';
    /* v147: «Todo / Solo lo central» filtra las secciones de estudio, así
       que va en la cabecera de SU columna. Se quedaba suelto en `d`, debajo de
       las dos columnas, y en celular salía al final, después de todo lo que
       filtra. */
    de.innerHTML='<div class="vd-cab"><p class="vd-rot">El estudio</p></div>';
    const cf=d.querySelector(':scope>.capa-filtro');
    if(cf)de.firstChild.appendChild(cf);
    const cp=d.querySelector(':scope>.cap-pest');
    if(cp)de.firstChild.insertBefore(cp,de.firstChild.firstChild.nextSibling);
    const ea=document.createElement('div');ea.className='est-ahora';ea.id='est-ahora';ea.hidden=true;
    if(ea.setAttribute)ea.setAttribute('aria-live','polite');
    iz.appendChild(det);
    de.appendChild(ea);
    secs.forEach(x=>de.appendChild(x));
    fila.appendChild(ind);fila.appendChild(iz);fila.appendChild(de);
    d.insertBefore(fila,d.children[1]);
    eaK=-1;
    const sg=sigueDe();
    pintaEstaSeccion(sg&&sg.c===id?sg.s:0);
  }catch(e){}
}
/* LAS COLUMNAS LAS DECIDE EL ANCHO DEL CAPÍTULO, no el de la ventana (v205).
   Dentro de la app de Jóvenes el módulo vive en una columna de 46rem aunque
   la ventana mida 1900 px: con una media query las tres columnas salían
   apretadas en 736 px. El CSS usa una consulta de contenedor sobre #detalle
   (VD_ANCHO px, el mismo número), y el JS mide la misma caja. */
const VD_ANCHO=920;
function enColumnas(d){
  try{return !!d&&d.getBoundingClientRect().width>=VD_ANCHO;}catch(e){return false;}
}

function avanza(id,p){S.prog[id]=Math.max(S.prog[id]||0,p);guardar();pintaCaps();}

function listo(id){
  avanza(id,100);sumaRacha();festejaRacha(0);
  const lista=[...capsVista(),...modsDe()];
  const i=lista.findIndex(x=>x.id===id)+1;
  /* v161: verCap ya deja la página en el capítulo que sigue. Antes, encima,
     se mandaba al principio de la pantalla: quedaba en la rejilla y tocaba
     bajar otra vez hasta el capítulo. */
  if(i>0&&i<lista.length)verCap(lista[i].id);
  else ir('inicio');
}

/* ───────── LA RACHA Y SU PROTECTOR (v139, como el de Duolingo) ─────────
   MECANISMO
   La racha cuenta días seguidos con estudio. Un día sin estudiar la devolvía a
   1, y para una niña de 7 años perder una racha de 12 días por un domingo de
   paseo es razón para dejar la app. Duolingo resolvió eso con el protector:
   cubre un día sin práctica. Aquí se GANA uno cada 7 días de racha, y se
   guardan hasta 2 (el tope que Duolingo midió que funciona mejor). Si faltan
   días y hay protectores para cubrirlos, se gastan y la racha sigue; los días
   cubiertos no suman, solo no la rompen. */
function sumaRacha(){
  const hoy=new Date().toDateString();
  if(S.ultimo===hoy)return;
  const dias=S.ultimo?Math.round((new Date(hoy)-new Date(S.ultimo))/864e5):0;
  const faltaron=dias-1;
  if(dias===1)S.racha++;
  else if(dias>1&&S.racha>0&&faltaron<=(S.protector||0)){S.protector-=faltaron;S.racha++;S.protegio=hoy;}
  else S.racha=1;
  if(S.racha%7===0)S.protector=Math.min(PROTECTOR_MAX,(S.protector||0)+1);
  S.ultimo=hoy;guardar();
  /* v148: la racha que sube se celebra al CERRAR lo que se estaba haciendo
     (examen, sesión, capítulo, ronda), no a mitad de una tarjeta: sumaRacha()
     corre con la primera respuesta del día. El día uno no: 1 no es racha. */
  if(S.racha>=2)festRachaPend=S.racha;
}
let festRachaPend=0;
function festejaRacha(espera){
  if(!festRachaPend)return;
  const n=festRachaPend;festRachaPend=0;
  const f=()=>festeja('racha','Racha de '+n+' días');
  if(espera&&typeof setTimeout==='function')setTimeout(f,espera);else f();
}

/* ───────── LAS 28 PARA RECITAR (v150, v156) ─────────
   «Las 28 de corrido» no es para leerla: es para decirla en orden.

   MECANISMO (v156)
   Recordar algo sin verlo lo fija más que releerlo, pero tapar todo de una
   es pedir lo que todavía no se sabe. Por eso son tres niveles y la ayuda se
   va quitando: «Ver» muestra el nombre y la ayuda de la doctrina; «Con
   pistas» deja solo las iniciales («La P… de D…»); «Tapadas» deja solo el
   número y esconde también la ayuda. El nivel va como clase en #detalle, así
   que vale para todas las secciones a la vez, y cada fila se destapa con un
   toque. La pista se calcula del nombre al pintar (enlazaCreencias). */
const L28_MODOS=['pistas','tapado'];
function l28Modo(b,modo){
  const d=document.getElementById('detalle');if(!d)return;
  L28_MODOS.forEach(m=>d.classList.toggle('l28-'+m,m===modo));
  d.querySelectorAll('.l28 li.ver').forEach(li=>li.classList.remove('ver'));
  d.querySelectorAll('.l28-modo .cf').forEach(x=>{const on=x===b;
    x.classList.toggle('on',on);x.setAttribute('aria-pressed',String(on));});
}
try{document.addEventListener('click',e=>{
  if(!e.target||!e.target.closest||e.target.closest('.cr-ir'))return;
  const li=e.target.closest('#detalle.l28-pistas .l28 li,#detalle.l28-tapado .l28 li');
  if(li)li.classList.toggle('ver');
});}catch(e){}

/* ───────── DE LA LISTA A LA CREENCIA, Y DE VUELTA (v156) ─────────
   MECANISMO
   Las listas de creencias de los repasos son contenido ya escrito
   (CR_CONT_MODULOS): número y nombre. Al pintar, cada fila recibe un botón
   que abre el estudio de esa creencia y la pista de sus iniciales. Es UNA
   función para todas las listas, así que «Las 6 doctrinas» y «Las 28 de
   corrido» se comportan igual sin repetir el enlace 56 veces en el contenido,
   y lo impreso sigue saliendo limpio.

   Viendo los nombres, toda la fila lleva a la creencia. Recitando (pistas o
   tapadas) el toque en la fila destapa, y a la creencia lleva la flecha.

   LA VUELTA
   Quien salta de la lista a una creencia quiere volver a la fila donde iba,
   no al principio: la creencia abierta desde una lista trae arriba «Volver a
   …», que reabre el repaso a la misma altura. */
const PISTA_ENTERA=/^(el|la|los|las|de|del|en|y|su|a|al)$/i;
function pistaDe(nombre){
  return String(nombre||'').split(' ').map(w=>{
    const m=w.match(/^([^\p{L}]*)(\p{L})(\p{L}*)([^\p{L}]*)$/u);
    if(!m||PISTA_ENTERA.test(m[2]+m[3]))return w;
    return m[1]+m[2]+'…'+m[4];
  }).join(' ');
}
function enlazaCreencias(d){
  /* El control de los tres niveles: el contenido deja la marca y aquí se arma
     con la pieza de siempre (segmentado), como hidrataVoz con los botones de voz. */
  try{
    (d&&d.querySelectorAll?[...d.querySelectorAll('.l28-modo[data-seg]')]:[]).forEach(m=>{
      m.outerHTML=segmentado('Cómo practicar',[
        {t:'Ver',on:true,clic:"l28Modo(this,'')"},
        {t:'Con pistas',clic:"l28Modo(this,'pistas')"},
        {t:'Tapadas',clic:"l28Modo(this,'tapado')"}],'l28-modo');
    });
  }catch(e){}
  try{
    (d&&d.querySelectorAll?[...d.querySelectorAll('.l28 li')]:[]).forEach(li=>{
      const b=li.children[0],sp=li.children[1];
      if(!b||!sp||li.querySelector('.cr-ir'))return;
      const n=parseInt(b.textContent,10),id='cr'+String(n).padStart(2,'0');
      const nom=sp.textContent.trim();
      const p=document.createElement('span');
      p.className='l28-p';p.setAttribute('aria-hidden','true');p.textContent=pistaDe(nom);
      li.appendChild(p);
      if(!buscaItem(id))return;
      const a=document.createElement('button');
      a.type='button';a.className='cr-ir';
      a.setAttribute('aria-label','Estudiar la creencia '+n+': '+nom);
      a.setAttribute('onclick',"verCreencia('"+id+"')");
      a.innerHTML=IC('der');
      li.appendChild(a);
    });
  }catch(e){}
}
let crVuelve=null;
const filaDeCreencia=id=>{
  const a=document.querySelector('#detalle .cr-ir[onclick*="'+id+'"]');
  return a&&a.closest?a.closest('li'):null;
};
function verCreencia(id){
  /* Se anota a qué altura de la pantalla estaba la fila, no los píxeles de la
     página: lo de arriba cambia de alto al volver (el avance de la rejilla). */
  let top=null;
  try{top=filaDeCreencia(id).getBoundingClientRect().top;}catch(e){}
  crVuelve={de:S.ultItem,a:id,top};
  verCap(id);
}
function crRegresa(){
  const v=crVuelve;crVuelve=null;
  if(!v||!buscaItem(v.de)){ir('estudio');return;}
  verCap(v.de,true);
  try{
    const li=filaDeCreencia(v.a);
    if(li&&v.top!==null)window.scrollTo(0,(window.scrollY||0)+li.getBoundingClientRect().top-v.top);
    else llevaA('detalle');
  }catch(e){}
}

/* ───────── LA CELEBRACIÓN (v148) ─────────
   MECANISMO
   Un lienzo (canvas) fijo encima de todo, transparente y sin recibir toques,
   dibuja partículas unos 1,8 segundos y se borra solo. Confeti: papelitos que
   salen de abajo y caen girando. Fuegos: dos o tres estallidos en círculo que
   se apagan. El teléfono vibra un instante si puede. Sin sonido (Camilo,
   30-sep): se estudia en la iglesia y en clase.

   POR QUÉ
   El premio tiene que llegar cuando pasa la cosa, no después en una lista de
   insignias: es lo que Kahoot y Duolingo hacen y lo que engancha a volver.

   CUÁNDO NO
   Con «reducir movimiento» del sistema no hay partículas: queda solo la
   frase, quieta. Y si el navegador no tiene canvas (o es el entorno de
   pruebas), no hace nada: la celebración nunca puede romper el flujo. */
let festCv=null, festP=[], festRaf=0;
function festeja(tipo,frase){
  try{
    if(typeof document==='undefined'||!document.body)return;
    try{navigator.vibrate&&navigator.vibrate(tipo==='racha'?[25]:[30,50,30]);}catch(e){}
    if(frase)festMsg(tipo,frase);
    const quieto=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(quieto||typeof requestAnimationFrame!=='function')return;
    if(!festCv){
      festCv=document.createElement('canvas');
      if(!festCv.getContext){festCv=null;return;}
      festCv.className='fest-cv';festCv.setAttribute('aria-hidden','true');
      document.body.appendChild(festCv);
    }
    const W=innerWidth,H=innerHeight,dpr=Math.min(2,window.devicePixelRatio||1);
    festCv.width=W*dpr;festCv.height=H*dpr;
    const cs=getComputedStyle(document.documentElement);
    const col=['--azul','--naranja','--verde','--v-cat','--cielo'].map(v=>cs.getPropertyValue(v).trim()).filter(Boolean)
      .concat(['#F2C230','#E4577B']);
    const r=(a,b)=>a+Math.random()*(b-a);
    if(tipo==='fuegos'||tipo==='racha'){
      const n=tipo==='racha'?2:3;
      for(let k=0;k<n;k++){
        const cx=r(W*.2,W*.8),cy=r(H*.18,H*.42),c=col[k%col.length],t0=k*14;
        for(let i=0;i<46;i++){const a=i/46*Math.PI*2,v=r(2.2,4.4);
          festP.push({x:cx,y:cy,vx:Math.cos(a)*v,vy:Math.sin(a)*v,g:.05,c,s:r(2,3.2),vida:r(55,75),t:-t0,f:'p'});}
      }
    }
    if(tipo!=='racha'){
      for(let i=0;i<120;i++)festP.push({x:r(W*.1,W*.9),y:H+10,vx:r(-3,3),vy:r(-15,-9),g:.32,
        c:col[i%col.length],s:r(5,9),rot:r(0,6),vr:r(-.25,.25),vida:r(90,120),t:-r(0,12),f:'c'});
    }
    if(!festRaf)festRaf=requestAnimationFrame(festPaso);
  }catch(e){}
}
function festPaso(){
  festRaf=0;
  if(!festCv)return;
  const x=festCv.getContext('2d'),dpr=festCv.width/innerWidth;
  x.setTransform(dpr,0,0,dpr,0,0);x.clearRect(0,0,innerWidth,innerHeight);
  festP=festP.filter(p=>{
    p.t++;if(p.t<0)return true;
    p.x+=p.vx;p.y+=p.vy;p.vy+=p.g;p.vx*=.985;
    const a=Math.max(0,1-p.t/p.vida);x.globalAlpha=a;x.fillStyle=p.c;
    if(p.f==='c'){p.rot+=p.vr;x.save();x.translate(p.x,p.y);x.rotate(p.rot);
      x.fillRect(-p.s/2,-p.s/4,p.s,p.s/2*Math.abs(Math.cos(p.rot*2))+1);x.restore();}
    else{x.beginPath();x.arc(p.x,p.y,p.s,0,Math.PI*2);x.fill();}
    return p.t<p.vida;
  });
  x.globalAlpha=1;
  if(festP.length)festRaf=requestAnimationFrame(festPaso);
  else{festCv.remove();festCv=null;}
}
/* La frase va en una región viva (role=status): el lector de pantalla la dice
   y se va sola a los 2,6 s. */
function festMsg(tipo,frase){
  let m=document.getElementById('fest-msg');
  if(!m){m=document.createElement('div');m.id='fest-msg';m.className='fest-msg';
    m.setAttribute('role','status');document.body.appendChild(m);}
  m.innerHTML=IC(tipo==='racha'?'fuego':tipo==='fuegos'?'trofeo':'check')+'<span>'+esc(frase)+'</span>';
  m.classList.remove('on');void m.offsetWidth;m.classList.add('on');
  clearTimeout(festMsg.t);festMsg.t=setTimeout(()=>m.classList.remove('on'),2600);
}

/* ───────── leer en voz alta ─────────
   MECANISMO
   El navegador trae un sintetizador de voz (speechSynthesis). Se le pasa un
   texto y él lo dice con una voz instalada en el aparato: sin archivos de
   audio, sin servidor y sin señal.

   PARA QUÉ, EN ESTE PROYECTO
   La sección III del examen es completar el versículo palabra por palabra, y
   memorizar escuchando rinde distinto que leyendo: se repasa caminando o con
   los ojos cerrados.

   POR PARTES, NO EL TEXTO ENTERO (v127)
   Antes se le pasaba un solo texto recortado a 600 caracteres, porque Chrome
   corta los textos largos a los ~15 s. Con eso 62 de los 77 bloques de cinco
   versículos, y casi todo «Escuchar el capítulo», se quedaban sin leer. Ahora
   el texto se parte en una cola: un versículo por parte (cada <p>), y el que
   pasa de TROZO caracteres se parte en sus frases. Se dice una parte, y su
   onend dispara la siguiente. Es el mismo patrón de la lección en la app de
   Jóvenes (assets/escuchar.js).

   PAUSA SIN pause()
   Pausar es cancelar y recordar en qué parte iba; reanudar vuelve a decir esa
   parte desde su inicio. pause()/resume() del navegador no se usan: en
   Android y en iOS viejos se portan distinto y dejaban el botón en ▶ sin voz.

   CADA speak LLEVA SU TURNO
   cancel() dispara el onend de lo que sonaba. Sin el turno, ese onend viejo
   avanzaría la cola nueva. Un onend que llega con otro turno se ignora.

   RELOJ DE SEGURIDAD
   En iOS onend no siempre llega. Si pasa el tiempo estimado de una parte y
   speechSynthesis ya no está hablando, se sigue con la próxima; si todavía
   habla, se espera otro poco. Así una voz lenta no se corta.

   SI EL APARATO NO PUEDE, EL BOTÓN NO APARECE. Un botón de audio que no suena
   es peor que no tenerlo. */
const puedeHablar=()=>typeof speechSynthesis!=='undefined'&&
  typeof SpeechSynthesisUtterance!=='undefined';


/* La voz en español: una local primero (suena mejor y no pide red). Las voces
   llegan tarde en Chrome: la primera lista puede venir vacía. */
let vozEs=null;
function eligeVoz(){
  try{
    const vs=speechSynthesis.getVoices().filter(v=>/^es\b/i.test(v.lang));
    vozEs=vs.find(v=>v.localService&&/-(CO|MX|US|419)/i.test(v.lang))||
      vs.find(v=>v.localService)||vs[0]||null;
  }catch(e){vozEs=null;}
}
if(puedeHablar()){
  eligeVoz();
  try{speechSynthesis.addEventListener('voiceschanged',eligeVoz);}catch(e){}
}

/* Parte un texto en trozos de hasta TROZO caracteres, cortando en finales de
   frase y, si una frase sola no cabe, en comas y luego en espacios. Nunca
   pierde palabras: unir los trozos devuelve el texto. */
const TROZO=220;
function trozos(t){
  t=String(t||'').replace(/\s+/g,' ').trim();
  if(!t)return [];
  if(t.length<=TROZO)return [t];
  const corta=(s,re)=>{const p=s.split(re),o=[];
    for(let k=0;k<p.length;k+=2)o.push(p[k]+(p[k+1]||''));return o.filter(x=>x.trim());};
  let piezas=corta(t,/([.;:!?»]+\s+)/);
  piezas=[].concat(...piezas.map(p=>p.length<=TROZO?[p]:corta(p,/(,\s+)/)));
  piezas=[].concat(...piezas.map(p=>{
    if(p.length<=TROZO)return [p];
    const o=[];let a='';
    for(const w of p.split(/(\s+)/)){if((a+w).length>TROZO&&a.trim()){o.push(a);a='';}a+=w;}
    if(a.trim())o.push(a);return o;
  }));
  const out=[];let a='';
  for(const p of piezas){if(a&&(a+p).length>TROZO){out.push(a.trim());a='';}a+=p;}
  if(a.trim())out.push(a.trim());
  return out;
}

/* Las partes de un bloque: una por <p> (un versículo), sin el número del
   versículo ni los botones, que el sintetizador pronunciaría. Si el bloque no
   tiene <p>, es un solo texto y se le quita la referencia del principio
   («1:8»): se memoriza el texto, no el número. */
/* v139: LEER LA PREGUNTA (Duolingo ABC y Bible App for Kids narran todo:
   entre 4 y 6 años casi no se lee). Se lee el enunciado y después cada
   opción con su letra, y la marca de voz va pasando por cada una, así la niña
   sabe cuál está oyendo. Las opciones ya elegidas no cambian nada: leer no
   responde. */
function partesPregunta(base){
  const out=[];
  const sinBotones=el=>{try{const c=el.cloneNode(true);
    (c.querySelectorAll?[...c.querySelectorAll('.qn,.ol,.grupo-voz,.btn-voz,.btn-reinicia')]:[]).forEach(b=>b.remove());
    return (c.textContent||'').trim();}catch(e){return '';}};
  const q=base.querySelector&&base.querySelector('.qt,.jg-preg');
  if(q)trozos(sinBotones(q)).forEach(x=>out.push({txt:x,el:q}));
  const ops=base.querySelectorAll?[...base.querySelectorAll('.ops .op,.jg-gr.col .jg-g')]:[];
  /* La letra solo se dice donde se ve (el examen). En Practicar las opciones
     no llevan letra, y oír «opción A» sin verla confunde. */
  ops.forEach((o,i)=>{const t=sinBotones(o);if(!t)return;
    const conLetra=!!(o.querySelector&&o.querySelector('.ol'));
    out.push({txt:(conLetra?'Opción '+'ABCDEF'[i]+': ':'')+t+'.',el:o});});
  if(!ops.length&&base.querySelector&&base.querySelector('.vf,.jg-gr'))
    out.push({txt:'¿Verdadero o falso?',el:base.querySelector('.vf,.jg-gr')});
  const r=base.querySelector&&base.querySelector('.rell');
  if(r){try{const c=r.cloneNode(true);(c.querySelectorAll?[...c.querySelectorAll('input')]:[]).forEach(i=>i.replaceWith('espacio en blanco'));
    trozos((c.textContent||'').trim()).forEach(x=>out.push({txt:x,el:r}));}catch(e){}}
  return out;
}

function partesDe(base){
  const ps=base.querySelectorAll?[...base.querySelectorAll('p')]:[];
  const out=[];
  (ps.length?ps:[base]).forEach(el=>{
    let t='';
    try{
      const c=el.cloneNode(true);
      (c.querySelectorAll?[...c.querySelectorAll('.vn,.grupo-voz,.btn-voz,.btn-reinicia')]:[])
        .forEach(b=>b.remove());
      t=c.textContent||'';
    }catch(e){t=(el.textContent||'').replace(/🔊|↺|Escuchar|Pausar|Seguir/g,'');}
    if(!ps.length)t=t.replace(/^\s*[\d:]+\s*/,'');
    trozos(t).forEach(x=>out.push({txt:x,el}));
  });
  return out;
}

/* ── EL BOTÓN DE SILENCIO DEL IPHONE (v128) ──────────────────────────────
   MECANISMO
   iOS le pone a cada app una sesión de audio, y con eso decide qué calla el
   botón lateral de silencio. «ambient» es sonido de fondo y el botón lo calla;
   «playback» es lo que el usuario pidió oír (música, video) y suena igual.
   YouTube e Instagram son apps nativas y piden «playback». Una página de
   Safari arranca en «ambient», y la voz del sintetizador quedaba muda con el
   botón en silencio.

   DOS PEDIDOS, PORQUE NINGUNO ESTÁ PROBADO PARA LA VOZ
   1. navigator.audioSession.type='playback': la forma directa. Solo existe en
      Safari y es un borrador, así que se revisa que exista.
   2. Un <audio> mudo en bucle mientras la voz suena: un elemento <audio> sí
      suena con el botón en silencio, y al sonar pasa la página a «playback».
      Tiene que arrancar dentro del toque del usuario, por eso se llama desde
      los manejadores de clic y no desde la cola.
   Si ninguno funciona en un iPhone, la franja del modo lectura trae un aviso
   para quitar el silencio (solo en iPhone y iPad). */
const AUDIO_MUDO='data:audio/wav;base64,'+
  'UklGRmQGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YUAGAACAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA'+
  'gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA'+
  'gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA'+
  'gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA'+
  'gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA'+
  'gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA'+
  'gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA'+
  'gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA'+
  'gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA'+
  'gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA'+
  'gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA'+
  'gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA'+
  'gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA'+
  'gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA'+
  'gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA'+
  'gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA'+
  'gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA'+
  'gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA'+
  'gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA'+
  'gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA'+
  'gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA'+
  'gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA';
let audioMudo=null;
const esIOS=()=>{
  try{return /iPad|iPhone|iPod/.test(navigator.userAgent)||
    (navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);}catch(e){return false;}
};
/* Se llama dentro del toque del usuario, antes de hablar. */
function pideSonido(){
  try{if(navigator.audioSession)navigator.audioSession.type='playback';}catch(e){}
  try{
    if(typeof Audio==='undefined')return;
    if(!audioMudo){audioMudo=new Audio(AUDIO_MUDO);audioMudo.loop=true;audioMudo.setAttribute('playsinline','');}
    const p=audioMudo.play();
    if(p&&p.catch)p.catch(()=>{});
  }catch(e){}
}
function sueltaSonido(){
  try{if(audioMudo)audioMudo.pause();}catch(e){}
}

const msRestantes = txt => Math.max(4000, String(txt).length*95);

function dice(i){
  const p=VZ.partes[i];
  if(!p){terminaVoz();return;}
  VZ.i=i;
  const t=++VZ.turno;
  try{
    const u=new SpeechSynthesisUtterance(p.txt);
    if(vozEs){u.voice=vozEs;u.lang=vozEs.lang;}else u.lang='es-ES';
    u.rate=VZ.rate;u.pitch=1;
    u.onend=()=>{if(t===VZ.turno&&VZ.sonando)siguePart();};
    u.onerror=()=>{if(t===VZ.turno)pausaVoz();};
    /* v158: la palabra que va sonando, donde el aparato lo avisa. */
    sueltaPalabra();
    if(p.nodo)u.onboundary=ev=>{if(t===VZ.turno&&VZ.sonando)marcaPalabra(p,ev);};
    armaReloj(t,p.txt);
    speechSynthesis.speak(u);
  }catch(e){paraVoz();return;}
  pintaVoz(true);
}
function siguePart(){
  if(VZ.i<VZ.partes.length-1)dice(VZ.i+1);else terminaVoz();
}
function armaReloj(t,txt){
  if(vozReloj)clearTimeout(vozReloj);
  const mira=()=>{
    if(t!==VZ.turno||!VZ.sonando)return;
    let habla=false;try{habla=speechSynthesis.speaking;}catch(e){}
    if(habla){vozReloj=setTimeout(mira,1500);return;}
    siguePart();
  };
  vozReloj=setTimeout(mira,msRestantes(txt)/VZ.rate);
}
/* Corta y olvida: cambiar de pantalla o de capítulo. */
function paraVoz(){
  VZ.turno++;VZ.sonando=false;
  sueltaSonido();sueltaPalabra();
  if(vozReloj){clearTimeout(vozReloj);vozReloj=null;}
  try{if(puedeHablar())speechSynthesis.cancel();}catch(e){}
  VZ.partes.forEach(p=>{try{p.el.classList.remove('suena','ya');}catch(e){}});
  if(vozBtn){
    try{vozBtn.innerHTML=IC('voz')+'<span>Escuchar</span>';vozBtn.setAttribute('title','Escuchar');
        vozBtn.classList.remove('sonando');}catch(e){}
    vozBtn=null;
  }
  VZ.partes=[];VZ.i=0;VZ.modo='';
  pintaVoz();
}
/* Calla pero recuerda la parte: tocar otra vez sigue desde ahí. */
function pausaVoz(){
  VZ.turno++;VZ.sonando=false;
  sueltaSonido();sueltaPalabra();
  if(vozReloj){clearTimeout(vozReloj);vozReloj=null;}
  try{if(puedeHablar())speechSynthesis.cancel();}catch(e){}
  pintaVoz();
}
/* Llegó al final: queda listo para empezar otra vez desde el principio. */
function terminaVoz(){
  pausaVoz();
  VZ.partes.forEach(p=>{try{p.el.classList.remove('suena','ya');}catch(e){}});
  VZ.i=0;
  if(vozBtn){
    try{vozBtn.innerHTML=IC('voz')+'<span>Escuchar</span>';vozBtn.setAttribute('title','Escuchar');
        vozBtn.classList.remove('sonando');}catch(e){}
    vozBtn=null;VZ.partes=[];VZ.modo='';
  }
  pintaVoz();
}
/* En iOS cancelar y hablar en seguida sale mudo: si algo sonaba, se cancela
   y se habla un instante después. Si no sonaba nada, se habla ya, dentro del
   toque, que es lo que iOS pide la primera vez. */
function desdeVoz(i){
  if(!puedeHablar()||!VZ.partes.length)return;
  const k=Math.max(0,Math.min(i,VZ.partes.length-1));
  const t=++VZ.turno;
  let sonaba=false;
  try{sonaba=speechSynthesis.speaking||speechSynthesis.pending;}catch(e){}
  try{if(sonaba)speechSynthesis.cancel();}catch(e){}
  VZ.sonando=true;
  if(!sonaba){dice(k);return;}
  VZ.i=k;pintaVoz();
  setTimeout(()=>{if(t===VZ.turno&&VZ.sonando)dice(k);},VOZ_RESPIRO);
}
const VOZ_RESPIRO=150;

/* Pinta el estado en el botón suelto que suena, o en el modo lectura. */
function pintaVoz(llevar){
  if(vozBtn){
    try{
      vozBtn.classList.add('sonando');
      vozBtn.innerHTML=VZ.sonando?IC('pausa')+'<span>Pausar</span>':IC('play')+'<span>Seguir</span>';
      vozBtn.setAttribute('title',VZ.sonando?'Pausar':'Reanudar');
    }catch(e){}
  }
  /* Pintar nunca debe tumbar a quien llama: paraVoz() corre en cada ir(). */
  try{pintaLecVoz(llevar);}catch(e){}
  try{pintaTxtVoz(llevar);}catch(e){}
  try{pintaEstVoz(llevar);}catch(e){}
}

/* Lee el texto del bloque al que pertenece el botón. Así el HTML generado no
   tiene que repetir el versículo dentro de un atributo. */
function leeCerca(btn){
  if(!btn||!puedeHablar())return;
  /* Tocar el MISMO botón que ya está leyendo pausa o sigue, según toque. */
  if(btn===vozBtn&&VZ.partes.length){
    if(VZ.sonando)pausaVoz();else{pideSonido();desdeVoz(VZ.i);}
    return;
  }
  /* De dónde se saca el texto. El botón puede estar DENTRO del bloque
     [data-leer], como en las secciones de versículos clave, o FUERA, en una
     cabecera hermana, como en la hoja de un versículo y en los bloques de
     lectura. Cuando está fuera, closest('[data-leer]') da null y antes se caía
     a btn.parentNode, y la voz leía «Daniel 3:5 · RV1995» en vez del versículo. */
  let base=btn.closest?btn.closest('[data-leer]'):null;
  if(!base&&btn.closest){
    const caja=btn.closest('.hoja-caja,.lect-bl,.sec');
    if(caja&&caja.querySelector)base=caja.querySelector('[data-leer]');
  }
  if(!base)base=btn.parentNode;
  if(!base)return;
  const partes=base.getAttribute&&base.getAttribute('data-leer')==='preg'?partesPregunta(base):partesDe(base);
  paraVoz();
  if(!partes.length)return;
  VZ.partes=partes;VZ.modo='boton';VZ.rate=.85;vozBtn=btn;
  pideSonido();
  desdeVoz(0);
}

/* Reinicia desde el principio, sin esperar a que termine ni a pausar primero.
   El botón ↺ solo se ve mientras el de al lado está activo (CSS, :has()). */
function reiniciaVoz(btn){
  const grupo=btn.closest?btn.closest('.grupo-voz'):null;
  const voz=grupo?grupo.querySelector('.btn-voz'):null;
  if(!voz)return;
  if(voz===vozBtn&&VZ.partes.length){pideSonido();desdeVoz(0);}else leeCerca(voz);
}

/* ── EL REPRODUCTOR DEL MODO LECTURA (v127) ──────────────────────────────
   Una franja bajo la barra: play/pausa, en qué versículo va y la velocidad.
   Tocar un versículo empieza desde ahí; el que suena se marca y la caja lo
   trae a la vista solo si quedó fuera, para no quitarle el sitio a quien va
   leyendo adelantado. */
/* DOS LUGARES, UN REPRODUCTOR (v131).
   'lectura' es el modo lectura; 'texto' es la columna del texto dentro del
   capitulo, que en el computador va al lado del estudio. Cambia de donde se
   sacan los versiculos y que caja se desplaza; los botones, la velocidad, la
   tira y el pintado son los mismos. */
/* TRES LUGARES, EL MISMO REPRODUCTOR (v158).
   Camilo: «pensé que había un reproductor bien establecido ya, ¿que sea
   general?». No lo era: el del estudio (creencias, repasos, matutina, P&R)
   tenía su propio HTML y su propio pintado, sin tira y sin volver a empezar.
   Ahora 'estudio' es un tercer lugar del MISMO reproductor: un solo armado
   (htmlRp), un solo pintado (pintaRpVoz) y los mismos controles en todos:
   escuchar o pausar, empezar de nuevo, velocidad y la tira para saltar.
   Lo que cambia por lugar es la UNIDAD que se cuenta y se salta: el
   versículo en la lectura, la sección en un estudio, la frase en una creencia. */
const RP={
  lectura:{pref:'lec',txt:()=>document.querySelector('#lectura .lec-txt'),
    caja:()=>document.getElementById('lec-caja')},
  texto:{pref:'txt',txt:()=>document.querySelector('#detalle .lect-cuerpo'),
    caja:()=>document.querySelector('#detalle .vd-izq')},
  estudio:{pref:'est',txt:()=>document.getElementById('detalle'),caja:()=>null}
};
/* Lo que dice el reproductor en cada lugar. */
function rpTextos(modo,id){
  if(modo!=='estudio')return {rot:'Escuchar el capítulo',ir:'Ir a un versículo',uni:'Versículo'};
  return esCreencia(id)?{rot:'Escuchar la creencia',reposo:'Solo la declaración',ir:'Ir a una frase',uni:'Frase'}
    :{rot:'Escuchar el estudio',reposo:'Todo el estudio, sin las preguntas',ir:'Ir a una sección',uni:'Sección'};
}
/* Las unidades de lo que está cargado, en orden: el elemento que cada parte
   marca, o el que ella diga (`ue`: la sección entera en un estudio). */
const uniDe=p=>p?(p.ue||p.el):null;
function unisDe(partes){
  const o=[];
  (partes||[]).forEach(p=>{const u=uniDe(p);if(u&&o.indexOf(u)<0)o.push(u);});
  return o;
}
/* Los versiculos de un lugar, en orden. La tira tiene uno por cada uno. */
const versosDe=modo=>{
  try{const t=RP[modo].txt();return t?Array.from(t.querySelectorAll('.lec-txt p,.biblia p')||[]):[];}
  catch(e){return [];}
};
function vozCargar(modo){
  const txt=RP[modo]&&RP[modo].txt();
  if(!txt)return false;
  paraVoz();
  if(modo==='estudio'){
    const p=partesEstudio(txt);
    VZ.partes=p;VZ.secs=p.secs||0;VZ.modo=modo;VZ.rate=lecVel;
    /* La tira del estudio se arma al cargar: cuántas secciones hay depende de
       lo que el filtro deje a la vista en ese momento. */
    armaTira(modo,unisDe(p).length);
    return p.length>0;
  }
  VZ.partes=partesDe({querySelectorAll:()=>versosDe(modo)});VZ.modo=modo;VZ.rate=lecVel;
  return VZ.partes.length>0;
}
const htmlTira=(modo,total)=>{
  let t='';
  const que=modo==='estudio'?'Parte':'Versículo';
  for(let k=0;k<total;k++)t+='<button type="button" data-k="'+k+'" aria-label="'+que+' '+(k+1)+'"'+
    ' onclick="vozTira(\''+modo+'\','+k+')"><i></i></button>';
  return t;
};
function armaTira(modo,total){
  try{const t=document.getElementById(RP[modo].pref+'-tira');if(t)t.innerHTML=htmlTira(modo,total);}catch(e){}
}
/* Empezar de nuevo, sonando o en pausa, sin esperar a que termine. */
function vozReinicia(modo){
  if(!puedeHablar())return;
  if(!(VZ.modo===modo&&VZ.partes.length)&&!vozCargar(modo))return;
  pideSonido();desdeVoz(0);
}
function vozAlterna(modo){
  if(VZ.modo===modo&&VZ.partes.length){
    if(VZ.sonando)pausaVoz();else{pideSonido();desdeVoz(VZ.i);}
    return;
  }
  if(vozCargar(modo)){pideSonido();desdeVoz(0);}
}
function vozDesde(modo,p){
  if(!puedeHablar()||!p)return;
  if(!(VZ.modo===modo&&VZ.partes.length)&&!vozCargar(modo))return;
  const k=VZ.partes.findIndex(x=>x.el===p);
  if(k>=0){pideSonido();desdeVoz(k);}
}
/* Tocar un segmento de la tira: escuchar desde ese versiculo (o esa sección,
   o esa frase). */
function vozTira(modo,k){
  if(modo!=='estudio'){vozDesde(modo,versosDe(modo)[k]);return;}
  if(!puedeHablar())return;
  if(!(VZ.modo===modo&&VZ.partes.length)&&!vozCargar(modo))return;
  const u=unisDe(VZ.partes)[k], i=VZ.partes.findIndex(p=>uniDe(p)===u);
  if(i>=0){pideSonido();desdeVoz(i);}
}
/* Anterior y siguiente (v162): una unidad atrás o adelante de la que suena,
   la misma unidad que cuenta la tira. Sirve para repetir la frase que no
   quedó sin tener que apuntarle a una rayita. */
function vozPaso(modo,d){
  if(!(VZ.modo===modo&&VZ.partes.length))return;
  const unis=modo==='estudio'?unisDe(VZ.partes):versosDe(modo);
  const k=unis.indexOf(uniDe(VZ.partes[VZ.i]))+d;
  if(k>=0&&k<unis.length)vozTira(modo,k);
}
const lecVozCargar=()=>vozCargar('lectura');
const lecVozAlterna=()=>vozAlterna('lectura');
const lecVozDesde=p=>vozDesde('lectura',p);
/* En la columna del texto, tocar un versiculo empieza ahi, igual que en el
   modo lectura. Los botones de cada bloque siguen haciendo lo suyo. */
function txtToca(e){
  if(!puedeHablar()||!e||!e.target||!e.target.closest)return;
  if(e.target.closest('button,a,summary,.lect-top'))return;
  try{if(window.getSelection&&String(window.getSelection()))return;}catch(x){}
  const p=e.target.closest('.biblia p');
  if(p)vozDesde('texto',p);
}
function lecVozVel(v){
  if(!VELS.includes(v))return;
  lecVel=v;
  try{localStorage.setItem('cb-vel',String(v));}catch(e){}
  if(VZ.modo==='lectura'||VZ.modo==='texto'||VZ.modo==='estudio'){VZ.rate=v;if(VZ.sonando)desdeVoz(VZ.i);else pintaVoz();}
  else{pintaLecVoz();pintaEstVoz();}
}
/* El número del versículo de la parte actual, leído de su .vn. */
function lecVersoDe(p){
  try{const n=p.el.querySelector('.vn');return n?n.textContent.trim():'';}catch(e){return '';}
}
function pintaRpVoz(modo,llevar){
  const cfg=RP[modo],pf=cfg.pref,est_=modo==='estudio';
  const play=document.getElementById(pf+'-play');
  if(!play)return;
  const mio=VZ.modo===modo&&VZ.partes.length>0;
  const i=VZ.i;
  const T=rpTextos(modo,S.ultItem);
  /* Las unidades de la tira: los versículos del lugar, o las secciones (o
     frases) de lo que está cargado en el estudio. */
  const unis=est_?(mio?unisDe(VZ.partes):[]):versosDe(modo);
  /* Se compara el ELEMENTO, no el numero de parte. Un versiculo largo se parte
     en dos trozos que comparten el mismo <p>: comparando k===i, el segundo
     trozo le quitaba la marca al primero y el versiculo 4 de Daniel 1 sonaba
     sin marcarse. Estaba asi desde v127 en el modo lectura. */
  const cur=mio&&VZ.partes[i]?VZ.partes[i].el:null;
  if(mio)VZ.partes.forEach((p,k)=>{
    try{p.el.classList.toggle('suena',VZ.sonando&&p.el===cur);
        /* «Ya leído» apaga el versículo; en un estudio no: ahí se relee. */
        if(!est_)p.el.classList.toggle('ya',VZ.sonando&&k<i&&p.el!==cur);}catch(e){}
  });
  const est=document.getElementById(pf+'-est'),n=document.getElementById(pf+'-n');
  play.innerHTML=IC(VZ.sonando&&mio?'pausa':'play');
  play.setAttribute('aria-label',VZ.sonando&&mio?'Pausa':'Escuchar');
  const total=unis.length;
  const activo=mio&&(VZ.sonando||i>0);
  if(est)est.textContent=VZ.sonando&&mio?'Escuchando':(mio&&i>0?'En pausa':T.rot);
  if(n){
    const p=mio?VZ.partes[i]:null;
    n.textContent=est_
      ?(activo&&p?(VZ.secs>1?'Sección '+p.sec+' de '+VZ.secs+' · ':'')+p.tit:T.reposo)
      :(activo?'Versículo '+lecVersoDe(VZ.partes[i])+' de '+total:total+' versículos');
  }
  /* La tira: los ya dichos, el que suena, y los que faltan. */
  const vk=activo?unis.indexOf(uniDe(VZ.partes[i])):-1;
  try{document.querySelectorAll('#'+pf+'-tira [data-k]').forEach(b=>{
    const k=Number(b.dataset.k);
    b.classList.toggle('ya',vk>=0&&k<vk);b.classList.toggle('ahora',k===vk);
  });}catch(e){}
  try{
    const ant=document.getElementById(pf+'-ant'),sig=document.getElementById(pf+'-sig');
    if(ant)ant.disabled=!(vk>0);
    if(sig)sig.disabled=!(vk>=0&&vk<total-1);
  }catch(e){}
  /* .activo: ya se está escuchando (o va en pausa). El del estudio solo se
     pega arriba en ese estado, para no quitarle pantalla a quien solo lee. */
  try{const caja=play.closest?play.closest('.lec-rp'):null;if(caja&&caja.classList)caja.classList.toggle('activo',activo);}catch(e){}
  try{document.querySelectorAll('#'+pf+'-vel [data-vel]').forEach(b=>
    b.setAttribute('aria-pressed',String(Number(b.dataset.vel)===lecVel)));}catch(e){}
  if(llevar&&mio&&VZ.sonando){
    try{
      const el=VZ.partes[i].el,r=el.getBoundingClientRect();
      const caja=cfg.caja();
      /* Si la caja tiene su propio scroll (modo lectura, o la columna pegada
         del computador), se mueve la caja; si no, la ventana. */
      if(caja&&caja.scrollHeight>caja.clientHeight+4){
        const rc=caja.getBoundingClientRect(),top=document.querySelector('#'+pf+'-play');
        const tope=modo==='texto'&&top?top.getBoundingClientRect().bottom+30:rc.top+10;
        if(r.top<tope||r.bottom>rc.bottom-20)caja.scrollTop+=r.top-tope-rc.height/4;
      } else {
        /* La franja entera, no solo el botón: con la tira mide dos renglones. */
        const franja=(play.closest&&play.closest('.lec-rp'))||play;
        const tope=franja?Math.max(60,franja.getBoundingClientRect().bottom+8):60;
        if(r.top<tope||r.bottom>window.innerHeight-100)window.scrollBy(0,r.top-tope-window.innerHeight/4);
      }
    }catch(e){}
  }
}
const pintaLecVoz=llevar=>pintaRpVoz('lectura',llevar);
const pintaTxtVoz=llevar=>pintaRpVoz('texto',llevar);
const pintaEstVoz=llevar=>pintaRpVoz('estudio',llevar);
/* La franja del reproductor. Si el aparato no tiene voz, no se pinta.
   `modo` dice en cual de los dos lugares va; los ids llevan su prefijo para
   que los dos puedan existir a la vez (el modo lectura tapa el capitulo, pero
   no lo borra). */
function htmlRp(modo,o){
  if(!puedeHablar())return '';
  o=o||{};
  const pf=RP[modo].pref, T=rpTextos(modo,o.id);
  const sub=modo==='estudio'?T.reposo:(o.total||0)+' versículos';
  /* v162, la tarjeta que eligió Camilo: arriba el estado y la velocidad, en
     medio la tira a todo el ancho, abajo el transporte con el botón grande al
     centro. «Empezar de nuevo» a la izquierda y, donde la hay, «Pantalla
     completa» a la derecha: nada queda suelto. */
  const paso=(d,ic)=>'<button type="button" class="lec-paso" id="'+pf+(d<0?'-ant':'-sig')+'" onclick="vozPaso(\''+modo+'\','+d+')"'+
    ' aria-label="'+T.uni+(d<0?' anterior':' siguiente')+'" disabled>'+IC(ic)+'</button>';
  return '<div class="lec-rp'+(modo==='texto'?' txt-rp':modo==='estudio'?' est-rp':'')+'">'+
    '<div class="lec-rp-tx"><b id="'+pf+'-est">'+T.rot+'</b><span id="'+pf+'-n">'+sub+'</span></div>'+
    '<div class="lec-vel" id="'+pf+'-vel" role="group" aria-label="Velocidad">'+
    VELS.map(v=>'<button type="button" data-vel="'+v+'" aria-pressed="'+(v===lecVel)+'"'+
      ' onclick="lecVozVel('+v+')">'+String(v).replace('.',',')+(v===1?'×':'')+'</button>').join('')+
    '</div>'+
    /* El aviso del iPhone va en su propio renglón, a todo el ancho: junto a
       la velocidad se partía en dos en un iPhone SE. */
    (esIOS()?'<span class="lec-ios">¿No oyes nada? Quita el modo silencio.</span>':'')+
    '<div class="lec-tira" id="'+pf+'-tira" role="group" aria-label="'+T.ir+'">'+htmlTira(modo,modo==='estudio'?0:(o.total||0))+'</div>'+
    '<div class="lec-rp-bot">'+
    '<button type="button" class="lec-otra" id="'+pf+'-otra" onclick="vozReinicia(\''+modo+'\')" aria-label="Empezar de nuevo" title="Empezar de nuevo">'+IC('repetir')+'</button>'+
    '<div class="lec-trans">'+paso(-1,'pista-ant')+
    '<button type="button" class="lec-play" id="'+pf+'-play" onclick="vozAlterna(\''+modo+'\')" aria-label="Escuchar">'+IC('play')+'</button>'+
    paso(1,'pista-sig')+'</div>'+
    (o.cid?'<button type="button" class="lect-full" aria-label="Pantalla completa" onclick="abreLectura(\''+o.cid+'\')">'+IC('expandir')+'<span>Pantalla completa</span></button>':'')+
    '</div></div>';
}
function htmlLecVoz(total,modo,cid){
  return htmlRp(modo==='texto'?'texto':'lectura',{total:total,cid:cid});
}

/* ── ESCUCHAR EL ESTUDIO DE PROFETAS Y REYES (v129) ──────────────────────
   POR QUÉ EL ESTUDIO Y NO EL LIBRO
   La licencia del libro (Ellen G. White Estate) es «para su uso personal» y
   «no permite la republicación, distribución…». La app es pública, así que el
   texto completo no entra: se escucha el estudio que escribimos, y el libro se
   abre en EGW Writings, el lector oficial y gratuito.

   MECANISMO
   Es el mismo reproductor del modo lectura, con otra forma de partir el texto.
   Cada sección da su título y sus bloques: un <li>, una fila de tabla («A los
   diez días: el resultado fue…») o una caja. «Compruébalo» no se lee: decir las
   respuestas en voz alta le quitaría el sentido. Una sección escondida por el
   filtro de capas tampoco.
   Tocar un bloque empieza ahí, pero solo después de haber tocado ▶: en el
   estudio un toque sobre el texto no hacía nada, y que de pronto hable
   sorprendería a quien solo quería leer. */
/* v153: el reproductor del estudio sirve en TODA página que no trae su propio
   texto bíblico: creencias, repasos y matutina, además de P&R. Solo los
   capítulos de Daniel quedan fuera, porque ya tienen el reproductor del texto.
   Antes era solo P&R, y en las creencias no había forma de escuchar nada. */
const esLibroPR=c=>!!c&&c.src==='Elena de White';
const conEstudioEnVoz=c=>!!c&&(esLibroPR(c)||typeof VERS==='undefined'||!VERS[c.id]);
/* ── FRASES DEL LIBRO QUE SE PREGUNTAN (v150) ──────────────────────────
   Regla de Camilo (30-sep): lo que se pregunta tiene que estar en lo que se
   muestra para estudiar. De P&R la app no trae el libro (licencia), y el
   examen pide completar frases de él palabra por palabra. Esta sección las
   muestra, y sale del MISMO banco de preguntas de la categoría: no entra
   ninguna frase del libro que no estuviera ya en una pregunta, y si mañana se
   agrega una pregunta, aparece aquí sola. */
function secFrasesLibro(id){
  let qs=[];
  try{qs=bancoDe().filter(q=>q.cap===id&&q.t==='fill');}catch(e){return '';}
  const vistas=new Set(), fr=[];
  qs.forEach(q=>{
    const t=(q.p||[]).map(x=>x.b!=null?x.b:(x.x||'')).join('').trim();
    if(!t||vistas.has(t))return;vistas.add(t);
    /* El pie dice de dónde es: «Profetas y Reyes, cap. 41». Si la frase es un
       versículo que el capítulo cita (Isaías 43:2), el pie lo dice primero. */
    const ins=String(q.ins||''), cita=(ins.match(/\(([^()]*\d+:\d+)\)/)||[])[1];
    const base=ins.replace(/\s*(—|\.)\s*Completa[\s\S]*$/,'').replace(/[.:]\s*$/,'');
    const de=cita?cita+', citado en '+base:base;
    fr.push('<blockquote class="decl frase-libro">'+esc(t)+(de?'<p class="decl-src">'+esc(de)+'</p>':'')+'</blockquote>');
  });
  if(!fr.length)return '';
  return '<div class="sec" data-capa="nucleo">'+cabezaSec({t:'Frases del libro que se preguntan',capa:'nucleo'})+
    '<p class="nota">El examen pide completarlas palabra por palabra. Son frases cortas del libro; '+
    'el capítulo entero se lee en EGW Writings.</p>'+fr.join('')+'</div>';
}
const EGW_PYR='https://m.egwwritings.org/es/book/217/toc';

function textoLimpio(el){
  try{
    const c=el.cloneNode(true);
    c.querySelectorAll('.grupo-voz,.btn-voz,.btn-reinicia,input,.rec,.rev,.fn,.decl-src,.l28-p,.cr-ir,script,style').forEach(x=>x.remove());
    c.querySelectorAll('br').forEach(b=>b.replaceWith(' '));
    c.querySelectorAll('td,th,li,p,div').forEach(x=>x.append(' '));
    /* v133: la referencia «(PR 379.1)» sirve para leer, no para oir: la voz
       la decia numero por numero en medio de la frase. */
    return (c.textContent||'').replace(/\p{Extended_Pictographic}|️/gu,'')
      .replace(/\(PR [\d.,;\s\-–]+\)/g,'').replace(/\s+/g,' ').replace(/\s+([.,;:])/g,'$1').trim();
  }catch(e){return '';}
}
const conPunto=t=>/[.!?:;»”)]$/.test(t)?t:t+'.';

/* Los bloques de una sección, en orden de lectura. */
/* «1La Palabra de Dios» se oía pegado: en las 28, el número y el nombre son
   dos piezas y van con pausa entre ellas. */
function textoDeFila(li){
  const hijos=li.children?[...li.children]:[];
  if(hijos.length>=2&&hijos[0].matches('b')&&hijos[1].matches('span'))
    return textoLimpio(hijos[0])+'. '+textoLimpio(hijos[1]);
  return textoLimpio(li);
}
function bloquesDeSec(sec){
  const out=[];
  [...sec.children].forEach(h=>{
    if(h.matches('h3,.rev,.rec,.recordar,.capa-filtro,.l28-bar,.sec-cab'))return;
    /* La cita (declaración o frase del libro) es UN bloque: su hijo <p> es el
       pie «Cartilla…», y leer solo eso era leer el pie y saltar la cita. */
    if(h.matches('blockquote')){out.push({el:h,txt:textoLimpio(h)});return;}
    /* Las fichas de textos clave, separadas: pegadas se oían «Génesis 1Génesis 2». */
    if(h.matches('.refs')){const t=[...h.children].map(textoLimpio).filter(Boolean).join('; ');if(t)out.push({el:h,txt:t});return;}
    if(h.matches('ul,ol')){[...h.children].forEach(li=>out.push({el:li,txt:textoDeFila(li)}));return;}
    /* La tabla puede venir envuelta en .tabla-scroll (v135): se lee igual, fila por fila. */
    if(h.matches('table,.tabla-scroll')){
      h.querySelectorAll('tr').forEach(tr=>{
        if(tr.querySelector('th'))return;
        const cel=[...tr.children].map(textoLimpio).filter(Boolean);
        if(cel.length)out.push({el:tr,txt:cel.join(': ')});
      });
      return;
    }
    const dentro=h.querySelectorAll(':scope>ul>li,:scope>ol>li,:scope>p');
    if(dentro.length){dentro.forEach(x=>out.push({el:x,txt:x.matches('li')?textoDeFila(x):textoLimpio(x)}));return;}
    out.push({el:h,txt:textoLimpio(h)});
  });
  return out.filter(b=>b.txt);
}

/* v156 (Camilo): en una creencia la voz dice el número, el nombre y la
   declaración, que es lo que el examen pide palabra por palabra. Lo demás de
   la página se lee con los ojos: los textos clave son listas de citas y «En el
   libro» son subtítulos que no entran al examen; oídos de corrido tapaban la
   declaración (era el 45 % de lo que sonaba). */
function partesCreencia(d,c){
  const out=[];
  const bq=d.querySelector('.sec blockquote.decl:not(.frase-libro)');
  if(!bq)return out;
  const tit='La declaración';
  out.push({txt:conPunto(c.label)+' '+conPunto(c.sub),el:d.querySelector('.cap-cab')||bq,sec:1,tit:c.label});
  /* v158 (Camilo): que se vea por dónde va. La declaración ya está partida
     en frases numeradas (numeraDecl); cada frase es una parte, así que se
     marca la frase que suena y no la declaración entera, y tocar una frase
     empieza ahí. `nodo` y `off` dicen dónde está ese texto en la página, para
     marcar además la palabra (marcaPalabra). */
  const frs=[...bq.querySelectorAll('.decl-txt .dfr')];
  if(!frs.length){
    trozos(conPunto(textoLimpio(bq))).forEach(x=>out.push({txt:x,el:bq,sec:1,tit}));
  }else frs.forEach((fr,f)=>{
    const tit='Frase '+(f+1)+' de '+frs.length;
    const nodo=fr.lastChild&&fr.lastChild.nodeType===3?fr.lastChild:null;
    const crudo=nodo?nodo.textContent:'';
    let desde=0;
    trozos(textoLimpio(fr)).forEach(x=>{
      /* El trozo se busca en el texto de la página. Si no aparece tal cual
         (espacios distintos), se marca la frase pero no la palabra. */
      const en=nodo?crudo.indexOf(x,desde):-1;
      if(en>=0)desde=en+x.length;
      out.push({txt:x,el:fr,sec:1,tit,nodo:en>=0?nodo:null,off:en});
    });
  });
  out.secs=1;
  return out;
}

/* ───────── LA PALABRA QUE SUENA (v158) ─────────
   MECANISMO
   Mientras habla, el sintetizador del aparato avisa cada vez que empieza una
   palabra y dice en qué letra del texto va (evento «boundary»). Con eso se
   arma un rango sobre el texto de la página y se pinta con un resaltado del
   navegador (CSS Highlight API), sin tocar el HTML: no se parte la frase en
   pedazos ni se mueve nada de sitio.

   CUÁNDO NO PASA NADA
   No todos los aparatos avisan (varias voces de Android no lo hacen) ni todos
   los navegadores tienen ese resaltado. Ahí queda marcada la frase, que no
   depende de ninguna de las dos cosas. Por eso la frase es la marca de base y
   la palabra es un extra. */
const VOZ_PALABRA='voz-palabra';
const puedeResaltar=()=>typeof CSS!=='undefined'&&CSS.highlights&&typeof Highlight==='function'&&typeof Range==='function';
function sueltaPalabra(){try{if(puedeResaltar())CSS.highlights.delete(VOZ_PALABRA);}catch(e){}}
function marcaPalabra(p,ev){
  if(!p||!p.nodo||!(p.off>=0)||!puedeResaltar())return;
  try{
    const t=p.nodo.textContent, ci=Number(ev&&ev.charIndex);
    if(!(ci>=0)||(ev.name&&ev.name!=='word'))return;
    const a=p.off+ci;
    if(a>=t.length)return;
    /* Safari no dice cuánto mide la palabra: llega hasta el siguiente espacio. */
    const largo=Number(ev.charLength)>0?Number(ev.charLength):(t.slice(a).match(/^\S+/)||[''])[0].length;
    if(!largo)return;
    const r=new Range();
    r.setStart(p.nodo,a);r.setEnd(p.nodo,Math.min(t.length,a+largo));
    CSS.highlights.set(VOZ_PALABRA,new Highlight(r));
  }catch(e){}
}
function partesEstudio(d){
  const out=[];let k=0;
  const cr=esCreencia(S.ultItem)?buscaItem(S.ultItem):null;
  if(cr){const p=partesCreencia(d,cr);if(p.length)return p;}
  [...d.querySelectorAll('.sec')].forEach(sec=>{
    /* Una sección de preguntas para comprobar (dos o más tapas) no se lee.
       Una sola tapa dentro de una sección de contenido («¿Cuántas referencias
       trae?» en Textos clave) se salta ella sola, no la sección entera. */
    if(sec.querySelectorAll('.rev').length>=2)return;
    if(!sec.getClientRects().length)return;
    k++;
    const cab=sec.querySelector('h3'),rot=sec.querySelector('.sec-rot');
    const tit=rot?textoLimpio(rot):'';
    /* `ue`: la unidad de la tira es la sección entera, no cada bloque. */
    if(tit)trozos(conPunto(tit)).forEach(x=>out.push({txt:x,el:cab||sec,ue:sec,sec:k,tit}));
    bloquesDeSec(sec).forEach(b=>trozos(conPunto(b.txt)).forEach(x=>out.push({txt:x,el:b.el,ue:sec,sec:k,tit})));
  });
  out.secs=k;
  return out;
}

const estVozCargar=()=>vozCargar('estudio');
const estVozAlterna=()=>vozAlterna('estudio');
function estToca(e){
  if(VZ.modo!=='estudio'||!VZ.partes.length||!e||!e.target||!e.target.closest)return;
  if(e.target.closest('a,button,input,label,summary,select,.rev,.rec,.est-rp'))return;
  try{if(window.getSelection&&String(window.getSelection()))return;}catch(x){}
  const k=VZ.partes.findIndex(p=>p.el===e.target||(p.el.contains&&p.el.contains(e.target)));
  if(k>=0){pideSonido();desdeVoz(k);}
}
if(typeof document!=='undefined'&&document.addEventListener)
  document.addEventListener('click',e=>{
    if(e.target&&e.target.closest&&e.target.closest('#detalle'))estToca(e);
  });

/* La franja del estudio, pegada arriba mientras se baja, y el enlace al libro. */
function htmlEstVoz(c){
  const n=String(c.id).replace(/^pr/,'');
  const egw=esLibroPR(c)?'<a class="est-egw" href="'+EGW_PYR+'" target="_blank" rel="noopener">'+
    '<span>Leer el capítulo completo</span><small>Abre el índice del libro en EGW Writings, '+
    'el sitio oficial. Ahí busca el capítulo '+esc(n)+'.</small></a>':'';
  /* v158: el mismo reproductor de la lectura (htmlRp), en su lugar 'estudio'. */
  return htmlRp('estudio',{id:c.id})+egw;
}

/* Al salir de la app o cambiar de pestaña, la voz se pausa: el teléfono lo
   haría a medias y el botón quedaría diciendo que suena. */
if(typeof document!=='undefined'&&document.addEventListener)
  document.addEventListener('visibilitychange',()=>{if(document.hidden&&VZ.sonando)pausaVoz();});

/* Envuelve un boton de audio con su compañero de reinicio, en un solo grupo
   para que el CSS (:has()) decida cuando mostrar el segundo. Un solo punto
   de armado evita que las ocho ubicaciones que reproducen audio se
   desincronicen entre si. */
const grupoVoz=(claseVoz,title,aria)=>
  '<span class="grupo-voz"><button type="button" class="btn-reinicia" title="Reiniciar"'+
  ' aria-label="Reiniciar" onclick="reiniciaVoz(this)">'+IC('repetir')+'</button>'+
  '<button type="button" class="'+claseVoz+'" title="'+title+'" aria-label="'+aria+'"'+
  ' onclick="leeCerca(this)">'+IC('voz')+'<span>Escuchar</span></button></span>';

const BTN_VOZ=grupoVoz('btn-voz','Escuchar','Escuchar');
/* v152: la declaración de cada creencia numera sus frases, como los
   versículos. La pregunta dice «segunda frase de la declaración»; con el
   número a la vista se encuentra de un vistazo. Se parte igual que en el
   generador (tools/creencias/gen_creencias.py): después de «.» o «»». El
   texto no cambia; solo se envuelve cada frase. */
function numeraDecl(d){
  try{
    (d&&d.querySelectorAll?[...d.querySelectorAll('blockquote.decl:not(.frase-libro)')]:[]).forEach(bq=>{
      const t=bq.firstChild;
      if(!t||t.nodeType!==3)return;
      const frs=t.textContent.trim().split(/(?<=\.)»?\s+(?=[«A-ZÁÉÍÓÚÑ¿¡])|(?<=\.»)\s+(?=[«A-ZÁÉÍÓÚÑ¿¡])/).filter(Boolean);
      if(frs.length<2)return;
      const h=frs.map((f,i)=>'<span class="dfr"><sup class="fn" aria-hidden="true">'+(i+1)+'</sup>'+esc(f)+'</span>').join(' ');
      const w=document.createElement('div');w.className='decl-txt';w.innerHTML=h;
      bq.replaceChild(w,t);
    });
  }catch(e){}
}
/* Las marcas de voz que deja el contenido (vozPar en contenido.js) se vuelven
   el botón de siempre. Sin voz en el aparato se quitan. */
function hidrataVoz(d){
  try{
    const ms=d&&d.querySelectorAll?[...d.querySelectorAll('.grupo-voz[data-voz]')]:[];
    const hay=puedeHablar();
    ms.forEach(m=>{
      if(!hay){m.remove();return;}
      const a=m.getAttribute('data-voz')||'Escuchar';
      m.outerHTML=grupoVoz('btn-voz','Escuchar',a.replace(/"/g,'&quot;'));
    });
  }catch(e){}
}

/* ───────── tarjetas ─────────
   REPETICIÓN ESPACIADA, EL MECANISMO
   Cada tarjeta vive en una caja: 0 recién vista o fallada, 1 en repaso, 2
   dominada. Al acertar sube de caja y se guarda EL DÍA. Al fallar vuelve a la
   caja 0. Una tarjeta solo vuelve a salir cuando se le cumple el plazo de su
   caja: la 0 siempre, la 1 al día siguiente, la 2 a los cuatro días (menos
   cuando se acerca el examen: ver plazoDominada).

   DÓNDE NACÍA EL PROBLEMA
   Antes el mazo traía SIEMPRE las 126 tarjetas, ordenadas por caja. Las
   dominadas seguían apareciendo todos los días, así que el tiempo de estudio se
   gastaba en lo que ya sabía, y un mazo de 126 cartas desanima a los diez
   minutos. Lo que rinde es una sesión corta con lo que toca hoy.

   EL PLAZO ES EN DÍAS LOCALES, no en horas: repasar a las 8 de la noche y
   volver a las 7 de la mañana cuenta como dos días distintos, que es lo que la
   niña espera. */
const PLAZO={0:0,1:1,2:4};
/* v139: EL PLAZO DE LA DOMINADA SE ACORTA AL ACERCARSE EL EXAMEN.
   Con 4 días fijos y el examen a 9, una tarjeta dominada salía una o dos veces
   más antes del evento. El estudio de Cepeda y otros (2008) midió que el
   repaso rinde más cuando el espacio entre repasos es cerca del 20% del
   tiempo que falta para la prueba. Así que: 20% de los días que faltan,
   redondeado, entre 1 y 4. A 9 días da 2; a 5 o menos, 1 (todos los días).
   Después del evento, o sin fecha, vuelven los 4. */
function plazoDominada(){
  const d=diasParaMeta();
  return d>0?Math.max(1,Math.min(4,Math.round(d*.2))):PLAZO[2];
}
/* Los dos últimos días son de repaso final: la sesión admite el doble. */
const recta=()=>{const d=diasParaMeta();return d>0&&d<=2;};
const plazoDe=c=>c===2?plazoDominada():PLAZO[c];
const cajaT=t=>S.ft[claveT(t)]||0;
const vistoT=t=>S.fv[claveT(t)]||0;
const vencidaT=t=>diaHoy()-vistoT(t)>=plazoDe(cajaT(t));
const tocanHoy=()=>tarjetasVista().filter(vencidaT);
/* Tope de la sesión: el tamaño del examen de la categoría, con un piso de 12.
   Sale de un dato que ya existe en vez de inventar otra tabla. */
const topeSesion=()=>Math.max(12,CAT().tarjetas||CAT().n)*(recta()?2:1);

let mazo=[],tjI=0,tjVolteada=false,tjFiltro='hoy',tjSabidas=new Set();

/* El texto de cada opcion se recorta a proposito. El ancho intrinseco de un
   <select> es el de su opcion mas larga, y con el subtitulo completo la mas
   larga llegaba a 63 caracteres («26 de octubre — La heroina que ayudo a un
   nino con sus palabras»): unos 470px, que en un telefono no caben de
   ninguna manera. Recortar el subtitulo baja el maximo a unos 37 caracteres,
   que sí entran en los 358px de una fila completa a 390px.
   Esto NO reemplaza el min-width:0 del CSS, lo complementa: aquel deja que el
   select ceda, y esto hace que no tenga que ceder tanto. Son dos capas porque
   Safari de iOS y Chrome de escritorio no tratan igual el ancho intrinseco de
   un select, y el bug se vio en un iPhone. */
const TOPE_OP=22;
const opTj=c=>{
  const sub=String(c.sub||'');
  if(!sub)return c.label;
  /* Al cortar se limpia el guion o la coma que quede colgando al final, o sale
     «El heroe se enamora —…», que se lee como un error. */
  const corto=sub.length>TOPE_OP
    ? sub.slice(0,TOPE_OP-1).replace(/[\s—–\-,;:]+$/,'')+'…'
    : sub;
  return c.label+' — '+corto;
};

function pintaTarjetas(){
  const sel=document.getElementById('tj-filtro');
  const cs=capsVista();
  /* Un capitulo escogido en el desplegable que el filtro de arriba ya no
     muestra dejaria el mazo vacio: se vuelve a la sesion de hoy. */
  if(!['hoy','todas','dificiles'].includes(tjFiltro)&&!cs.some(c=>c.id===tjFiltro))tjFiltro='hoy';
  const nDif=tarjetasVista().filter(t=>(S.ft[claveT(t)]||0)<2).length;
  const nHoy=Math.min(tocanHoy().length,topeSesion());
  sel.innerHTML='<option value="hoy">La sesión de hoy ('+nHoy+')</option>'+
    '<option value="todas">Todos los capítulos ('+tarjetasVista().length+')</option>'+
    '<option value="dificiles">Solo por dominar ('+nDif+')</option>'+
    cs.map(c=>'<option value="'+c.id+'">'+esc(opTj(c))+'</option>').join('');
  sel.value=tjFiltro;
  /* Los modos se repintan en cada entrada porque dependen de la categoria:
     al cambiar de actividad puede aparecer o desaparecer «Clasificar». */
  pintaModosJuego();
  if(jgModo!=='tarjetas'){ if(!jgR)nuevaRonda(); else pintaJuego(); return; }
  if(!mazo.length)tjBaraja();
  else muestraTj();
}

function filtraTj(v){tjFiltro=v;tjBaraja();}

function tjBaraja(){
  let base=tarjetasVista();
  if(tjFiltro==='hoy')base=base.filter(vencidaT);
  else if(tjFiltro==='dificiles')base=base.filter(t=>cajaT(t)<2);
  else if(tjFiltro!=='todas')base=base.filter(t=>t.cap===tjFiltro);
  /* Orden Leitner: lo fallado o nuevo primero, lo dominado al final. */
  mazo=[0,1,2].flatMap(n=>mezcla(base.filter(t=>cajaT(t)===n)));
  /* La sesión del día se corta en el tope. Los otros filtros no se cortan:
     si alguien pide un capítulo o el mazo completo, es porque lo quiere
     completo. */
  if(tjFiltro==='hoy')mazo=mazo.slice(0,topeSesion());
  tjI=0;tjVolteada=false;tjSabidas=new Set();
  muestraTj();
}

/* Los botones de la tarjeta se apagan cuando no hay nada que contestar. Un
   botón encendido que no hace nada al tocarlo es el mismo defecto que
   arreglamos en el panel: parece que la app se trabó. */
function botonesTj(hayCarta){
  const on=(id,v)=>{const e=document.getElementById(id);if(e)e.disabled=!v;};
  on('tj-si',hayCarta);on('tj-no',hayCarta);on('tj-sig',hayCarta);
  on('tj-ant',hayCarta&&tjI>0);
}

function muestraTj(){
  const c=document.getElementById('tj-carta');
  if(!c)return;
  if(!mazo.length){
    c.className='tj';
    /* Un mazo vacío con el filtro del día NO es un error: es que ya repasó lo
       que tocaba. Decirlo así, y ofrecer el mazo completo, evita que parezca
       que la app se dañó. */
    c.innerHTML=tjFiltro==='hoy'
      ?'<div class="cara">'+IC('check')+' Ya repasaste lo de hoy</div>'+
       '<div class="rev" style="margin-top:.7rem">Las que dominaste vuelven a salir en unos días. '+
       'Si quieres seguir, escoge <strong>Todos los capítulos</strong> arriba.</div>'
      :'<div class="cara">No hay tarjetas para este filtro.</div>';
    document.getElementById('tj-pos').textContent='';
    document.getElementById('tj-prog').style.width='0%';
    document.getElementById('tj-resumen').textContent='';
    botonesTj(false);
    return;
  }
  if(tjI>=mazo.length){
    c.className='tj volteada';
    const s=tjSabidas.size,t=mazo.length;
    /* Al terminar una sesión corta hay que decir CUÁNTO QUEDA, porque es el
       momento en que la niña decide si sigue o cierra. «Terminaste el mazo» con
       87 tarjetas pendientes detrás era una media verdad. */
    const quedan=tjFiltro==='hoy'?tocanHoy().length:0;
    /* v148: terminar las del día se celebra UNA vez por mazo: muestraTj() se
       vuelve a llamar al regresar a la pantalla. */
    if(tjFiltro==='hoy'&&!quedan&&!mazo.festejado){mazo.festejado=true;festeja('confeti','Terminaste las tarjetas de hoy');festejaRacha(2800);}
    else festejaRacha(0);
    c.innerHTML='<div class="cara">'+IC('check')+' '+(tjFiltro==='hoy'?'Terminaste la sesión':'Terminaste el mazo')+'</div>'+
      '<div class="rev" style="margin-top:.7rem">Sabías '+s+' de '+t+' ('+Math.round(s/t*100)+'%)'+
      (quedan?'<br>Todavía te toca repasar <strong>'+quedan+'</strong> hoy.'
             :(tjFiltro==='hoy'?'<br>Ya no te toca nada más hoy.':''))+'</div>';
    document.getElementById('tj-pos').textContent='Completado';
    document.getElementById('tj-prog').style.width='100%';
    document.getElementById('tj-resumen').textContent=quedan
      ?'Toca «Barajar de nuevo» y te salen las siguientes.'
      :'Toca «Barajar de nuevo» para repetir.';
    botonesTj(false);
    return;
  }
  const t=mazo[tjI];
  const cj=S.ft[claveT(t)]||0;
  const est=cj===2?'<span class="pil az">'+IC('check')+' dominada</span>':cj===1?'<span class="pil na">'+IC('repetir')+' en repaso</span>':'<span class="pil na">'+IC('mas')+' por aprender</span>';
  c.className='tj'+(tjVolteada?' volteada':'');
  c.innerHTML=(tjVolteada
    ? '<div class="rev" data-leer>'+t.r+(puedeHablar()?' '+BTN_VOZ:'')+'</div>'+
      '<div class="pista">toca para volver</div>'
    : '<div class="cara">'+t.f+'</div><div class="pista">toca para ver la respuesta</div>')+
    '<div style="position:absolute;top:.6rem;right:.6rem">'+est+'</div>';
  document.getElementById('tj-pos').textContent='Tarjeta '+(tjI+1)+' de '+mazo.length;
  document.getElementById('tj-prog').style.width=Math.round(tjI/mazo.length*100)+'%';
  document.getElementById('tj-resumen').textContent=tjSabidas.size+' marcadas como sabidas · «La sabía» dos veces seguidas = dominada';
  botonesTj(true);
}

/* ══════════════════════════ EJERCICIOS INTERACTIVOS ══════════════════════════
   POR QUE EXISTEN
   El examen simula el examen: multiple, verdadero/falso y completar, en la
   proporcion real. Eso NO se toca, porque su trabajo es parecerse al de
   verdad. Pero repasar 28 declaraciones leyendo y volteando tarjetas es lo
   mas parecido que hay a no repasar: se pasa la vista y la cabeza no hace
   nada. Un ejercicio obliga a producir la respuesta, y producir es lo que
   fija.

   Por eso los cuatro juegos viven en «Tarjetas», del lado de la practica, y
   ninguno entra al examen.

   POR QUE SON GENERICOS
   Ninguno sabe que existen las creencias. Leen tres cosas de cada capitulo:
   `label` (la clave), `sub` (el valor) y `doc` (el grupo, opcional). Daniel y
   la matutina ya tienen label y sub, asi que emparejar, ordenar y completar
   les funcionan tal cual. Clasificar aparece SOLO donde hay grupos
   declarados, que hoy es «En esto creemos» con sus seis doctrinas: la funcion
   no pregunta por la actividad, pregunta si hay grupos.

   Y NO HAY VIDAS NI CORAZONES
   A proposito. Castigar el error con un recurso que se acaba empuja a dejar
   de practicar, que es justo lo contrario de lo que se necesita. Lo que se
   refuerza es la racha, que ya existe, y el error manda la ficha al repaso. */

const JUEGOS = [
  { id:'tarjetas', ic:'tarjetas', et:'Tarjetas',   ayuda:'Lee el frente y comprueba.' },
  { id:'hoy',      ic:'diana', et:'Práctica de hoy', ayuda:'Un poco de todo: primero reconocer, después recordar. Lo que fallaste en un examen sale primero.' },
  { id:'quiz',     ic:'rayo', et:'Quiz',        ayuda:'Una pregunta a la vez, y te dice al instante si acertaste.' },
  { id:'vf',       ic:'vf', et:'¿V o F?',     ayuda:'Decide si la frase es verdadera o falsa.' },
  { id:'parear',   ic:'unir', et:'Emparejar',  ayuda:'Toca a la izquierda y después su pareja a la derecha.' },
  { id:'clasif',   ic:'clasif', et:'Clasificar', ayuda:'¿A qué grupo pertenece?' },
  { id:'ordenar',  ic:'ordenar', et:'Ordenar',    ayuda:'Tócalos en el orden correcto.' },
  { id:'banco',    ic:'lapiz', et:'Completar',  ayuda:'Toca las palabras en orden para llenar los espacios.' },
  { id:'error',    ic:'lupa', et:'Caza el error', ayuda:'Una palabra fue cambiada. Tócala.' },
  { id:'cita',     ic:'bocadillo', et:'¿De dónde es?', ayuda:'Lee el texto y di de dónde sale.' },
];

let jgModo='tarjetas', jgR=null, jgSel=null, jgN=0, jgBien=0, jgMal=0;

/* ───────── el estado de «Practicar» es de la CATEGORIA, no de la ficha ─────────
   MECANISMO
   El mazo, el filtro y la ronda del juego se arman con el material de la
   categoria activa, pero viven en variables sueltas de pantalla. `pintaTarjetas`
   repinta la ronda que YA existe (`if(!jgR)nuevaRonda(); else pintaJuego()`),
   asi que si la categoria cambia y nadie borra `jgR`, al volver a Practicar
   sale la ronda de la categoria anterior. Con el filtro pasa lo mismo y se ve
   peor: queda apuntando a un capitulo que en la categoria nueva no existe
   (`d1` en las creencias) y el mazo sale en cero, que parece la app dañada.

   MEDIDO: entrar a Practicar en Aventureros, escoger Quiz, cambiar a
   creencias y volver: la misma pregunta de Daniel. Y con el filtro en «Daniel
   1», mazo de 27 antes y 0 despues.

   DECISION
   Un solo punto de reinicio, y lo llaman TODOS los caminos que cambian el
   material: cambiar de categoria, cambiar de persona, terminar la bienvenida
   y adoptar la ficha del servidor. Cuatro reinicios distintos, cada uno con
   su propio subconjunto de variables, es como nacio el defecto. */
function reiniciaPractica(){
  mazo=[];tjI=0;tjVolteada=false;tjFiltro='hoy';tjSabidas=new Set();
  jgR=null;jgSel=null;jgN=0;jgBien=0;jgMal=0;
}

/* Repinta Practicar solo si es la pantalla que esta a la vista. Los caminos
   que aterrizan en Inicio no la necesitan; el que sincroniza contra el
   servidor si, porque no navega. */
function refrescaPracticaSiVisible(){
  try{
    const p=document.getElementById('p-tarjetas');
    if(p&&p.classList.contains('on'))pintaTarjetas();
  }catch(e){}
}

/* Los grupos disponibles en la actividad actual. Si ningun capitulo declara
   `doc`, no hay grupos y el juego de clasificar ni se ofrece. */
function gruposDe(){
  const cs=capsDe();
  if(!cs.some(c=>c.doc))return [];
  return (typeof GRUPOS!=='undefined'?GRUPOS:[]).filter(g=>cs.some(c=>c.doc===g.id));
}
const grupoDe=c=>(typeof GRUPOS!=='undefined'?GRUPOS:[]).find(g=>g.id===c.doc)||null;

/* Las preguntas de completar de la actividad actual sirven de insumo al juego
   del banco de palabras: la misma pregunta del examen, sin teclado. */
const fillsDe=()=>poolDe().filter(q=>q.t==='fill'&&(q.p||[]).some(x=>x.b));
/* Los modos nuevos no traen material propio: salen del banco que ya existe.
   Asi cualquier actividad los hereda, y crecen cuando crece el banco. */
const mcsDe=()=>poolDe().filter(q=>q.t==='mc'&&(q.o||[]).length>=3);
const tfsDe=()=>poolDe().filter(q=>q.t==='tf');
/* Para «¿de donde es?» sirve la pregunta de completar cuyo rotulo nombra la
   fuente («Daniel 1:20 (RV1995) — Completa:»): el texto es la frase armada y
   la respuesta es ese rotulo, limpio. */
const REF_INS=/^([^—]+?)\s*(?:\([^)]*\))?\s*—/;
const citasDe=()=>fillsDe().filter(q=>REF_INS.test(q.ins||''));
const refDe=q=>((q.ins||'').match(REF_INS)||[])[1].trim();
const fraseDe=q=>q.p.map(x=>x.b||x.x).join('');

/* Un modo se ofrece solo si tiene con que. Un boton que abre una ronda vacia
   es el mismo defecto del panel: parece que la app se trabo. */
function juegosDisponibles(){
  return JUEGOS.filter(j=>{
    if(j.id==='tarjetas')return true;
    if(j.id==='clasif')return gruposDe().length>1;
    if(j.id==='banco')return fillsDe().length>0;
    if(j.id==='error')return fillsDe().filter(q=>q.p.filter(x=>x.b).length>=2).length>0;
    if(j.id==='quiz'||j.id==='hoy')return mcsDe().length>=4;
    if(j.id==='vf')return tfsDe().length>=4;
    if(j.id==='cita')return citasDe().length>=4;
    return capsVista().length>=4;   // parear y ordenar
  });
}

function pintaModosJuego(){
  const z=document.getElementById('jg-modos');
  if(!z)return;
  const disp=juegosDisponibles();
  if(!disp.some(j=>j.id===jgModo))jgModo='tarjetas';
  z.innerHTML=disp.map(j=>'<button class="jg-m'+(j.id===jgModo?' on':'')+
    '" onclick="ponJuego(\''+j.id+'\')">'+IC(j.ic)+' '+esc(j.et)+'</button>').join('');
  const esTj=jgModo==='tarjetas';
  document.querySelector('.tj-zona').hidden=!esTj;
  const jz=document.getElementById('jg-zona');
  jz.hidden=esTj;
  const ay=document.getElementById('jg-ayuda');
  if(ay)ay.textContent=(disp.find(j=>j.id===jgModo)||{}).ayuda||'';
}

function ponJuego(id){
  jgModo=id;
  if(id!=='tarjetas')nuevaRonda();
  pintaModosJuego();
  /* Volver a Tarjetas con el mazo vacio mostraba «No hay tarjetas para este
     filtro», que es mentira: el mazo estaba vacio porque se reinicio al
     cambiar de material, no porque no haya tarjetas. Se baraja, igual que
     hace `pintaTarjetas`. */
  if(id==='tarjetas'){ if(!mazo.length)tjBaraja(); else muestraTj(); }
}

/* Cada ronda es corta a proposito: seis pasos se terminan en un minuto y
   medio, que es el tiempo que alguien de verdad le dedica en el bus. */
const PASOS_RONDA=6;

/* Un paso de «Caza el error» y uno de «¿De dónde es?». Salieron de
   nuevaRonda() a funciones propias porque la práctica de hoy los mezcla: si
   se copiaran, serían dos versiones de la misma regla. */
const fillsError=()=>fillsDe().filter(q=>q.p.filter(x=>x.b).length>=2);
function pasoError(q){
  const huecos=q.p.map((x,i)=>({i:i,b:x.b})).filter(x=>x.b);
  const cual=huecos[Math.floor(Math.random()*huecos.length)];
  const otras=mezcla(fillsDe().flatMap(f=>f.p).filter(x=>x.b&&x.b!==cual.b).map(x=>x.b));
  return {q:q,malo:cual.i,puesto:otras[0]||cual.b,correcta:cual.b};
}
function pasoCita(q){
  const otras=mezcla(citasDe().filter(x=>refDe(x)!==refDe(q)).map(refDe))
    .filter((v,i,a)=>a.indexOf(v)===i).slice(0,3);
  return {texto:fraseDe(q),ops:mezcla([refDe(q)].concat(otras)),bien:refDe(q)};
}

/* ───────── LA PRÁCTICA DE HOY (v139, como «Aprender» de Quizlet) ─────────
   MECANISMO
   Nueve modos en una tira le dejan a una niña de 7 años una decisión que no
   sabe tomar. Quizlet y Duolingo la toman por ella: arman la sesión. Aquí la
   ronda mezcla los modos en un orden que va de RECONOCER a RECORDAR: primero
   verdadero o falso, luego selección múltiple, después cazar la palabra
   cambiada y decir de dónde es un texto. Y lo que falló en un examen sale
   primero, porque eso es lo que Quizlet repite hasta dominarlo. Mezclar tipos
   y capítulos en una misma ronda es además práctica intercalada, que en un
   ensayo con 787 alumnos rindió más que practicar por bloques. */
const RONDA_HOY={vf:2,quiz:3,error:2,cita:1};
function rondaDeHoy(){
  const fall=new Set(falladasDe().map(claveQ));
  const primero=l=>mezcla(l.filter(q=>fall.has(claveQ(q)))).concat(mezcla(l.filter(q=>!fall.has(claveQ(q)))));
  const qz=primero(mcsDe());
  /* Entre 4 y 6 años solo reconocer: cazar una palabra o decir de dónde es un
     texto pide leer una frase entera, y a esa edad casi no se lee. */
  const leer=!esMenor();
  const pasos=[
    ...primero(tfsDe()).slice(0,RONDA_HOY.vf).map(q=>({t:'vf',q:q})),
    ...qz.slice(0,RONDA_HOY.quiz).map(q=>({t:'quiz',q:barajaOpciones({...q})})),
    ...(leer?mezcla(fillsError().slice()).slice(0,RONDA_HOY.error):[]).map(pasoError)
      .filter(x=>x.puesto!==x.correcta).map(p=>({t:'error',p:p})),
    ...(leer?mezcla(citasDe().slice()).slice(0,RONDA_HOY.cita):[]).map(pasoCita)
      .filter(p=>p.ops.length>=2).map(p=>({t:'cita',p:p})),
  ];
  /* Si la categoría no tiene de algún tipo (Menores no completa), el hueco lo
     llena la selección múltiple, para que la ronda no se acorte. */
  const meta=Object.values(RONDA_HOY).reduce((a,b)=>a+b,0);
  const usadas=new Set(pasos.filter(x=>x.t==='quiz').map(x=>claveQ(x.q)));
  const extra=qz.filter(q=>!usadas.has(claveQ(q))).slice(0,Math.max(0,meta-pasos.length))
    .map(q=>({t:'quiz',q:barajaOpciones({...q})}));
  const i=pasos.findIndex(x=>x.t==='error'||x.t==='cita');
  if(i<0)pasos.push(...extra);else pasos.splice(i,0,...extra);
  return {tipo:'hoy',pasos:pasos,i:0,elegida:null,total:pasos.length};
}
/* El tipo y el contenido del paso que toca, en cualquier ronda paso a paso. */
const tipoPaso=()=>jgR&&jgR.tipo==='hoy'?((jgR.pasos[jgR.i]||{}).t):jgR&&jgR.tipo;
const qPaso=()=>jgR.tipo==='hoy'?jgR.pasos[jgR.i].q:jgR.qs[jgR.i];
const pPaso=()=>jgR.tipo==='hoy'?jgR.pasos[jgR.i].p:jgR.pasos[jgR.i];

function nuevaRonda(){
  jgSel=null;jgN=0;jgBien=0;jgMal=0;
  const cs=mezcla(capsVista().slice());
  if(jgModo==='parear'){
    const sel=cs.slice(0,5);
    jgR={tipo:'parear',izq:sel,der:mezcla(sel.slice()),listos:[],total:sel.length};
  } else if(jgModo==='clasif'){
    jgR={tipo:'clasif',items:cs.slice(0,PASOS_RONDA),grupos:gruposDe(),i:0,total:Math.min(PASOS_RONDA,cs.length)};
  } else if(jgModo==='ordenar'){
    const sel=cs.slice(0,5);
    const bien=sel.slice().sort((a,b)=>ordenCap(a)-ordenCap(b));
    jgR={tipo:'ordenar',bien:bien,pool:mezcla(sel.slice()),puestos:[],total:bien.length};
  } else if(jgModo==='quiz'){
    const qs=mezcla(mcsDe().slice()).slice(0,PASOS_RONDA).map(q=>barajaOpciones({...q}));
    jgR={tipo:'quiz',qs:qs,i:0,elegida:null,total:qs.length};
  } else if(jgModo==='vf'){
    const qs=mezcla(tfsDe().slice()).slice(0,PASOS_RONDA);
    jgR={tipo:'vf',qs:qs,i:0,elegida:null,total:qs.length};
  } else if(jgModo==='error'){
    /* Se arma una frase con TODAS sus palabras puestas menos una, que se
       cambia por un señuelo sacado de otra pregunta. Es el ejercicio que mas
       se parece a lo que pide un examen de texto literal: no completar, sino
       notar que una palabra no es la que va. */
    /* Solo frases con DOS o mas palabras tapadas. Con una sola, la palabra
       cambiada es la unica que se puede tocar: no hay nada que cazar, y
       acertar no prueba nada. Medido en la matutina, donde varios versiculos
       son de una linea. */
    const pasos=mezcla(fillsError().slice()).slice(0,PASOS_RONDA).map(pasoError)
      .filter(x=>x.puesto!==x.correcta);
    jgR={tipo:'error',pasos:pasos,i:0,elegida:null,total:pasos.length};
  } else if(jgModo==='cita'){
    const pasos=mezcla(citasDe().slice()).slice(0,PASOS_RONDA).map(pasoCita).filter(p=>p.ops.length>=2);
    jgR={tipo:'cita',pasos:pasos,i:0,elegida:null,total:pasos.length};
  } else if(jgModo==='hoy'){
    jgR=rondaDeHoy();
  } else if(jgModo==='banco'){
    /* Varias frases por ronda, no una. Con una sola la ronda se acababa en
       tres toques y no alcanzaba a ser practica: era una pregunta suelta.
       Se toman hasta cuatro y se encadenan, y la bolsa de palabras es comun a
       todas, asi que los señuelos de una frase son las respuestas de otra. */
    const disp=mezcla(fillsDe().slice()).slice(0,4);
    const frases=disp.map(q=>({q:q,huecos:q.p.map((x,i)=>({i:i,b:x.b})).filter(x=>x.b),puestas:{}}))
      .filter(f=>f.huecos.length);
    const todas=frases.flatMap(f=>f.huecos.map(h=>h.b));
    const señuelos=mezcla(fillsDe().flatMap(f=>f.p).filter(x=>x.b&&todas.indexOf(x.b)<0)
      .map(x=>x.b)).slice(0,3);
    jgR={tipo:'banco',frases:frases,i:0,
         bolsa:mezcla(todas.concat(señuelos)),
         total:frases.reduce((n,f)=>n+f.huecos.length,0)};
  }
  pintaJuego();
  leeSolaSiMenor();
}

/* El orden natural de un capitulo. Se saca del id (cr07 -> 7, d12 -> 12): no
   hace falta un campo nuevo ni mantener una lista aparte. */
function ordenCap(c){
  const m=String(c.id).match(/(\d+)/);
  return m?Number(m[1]):0;
}

function pintaJuego(){
  const z=document.getElementById('jg-zona');
  if(!z||!jgR)return;
  const PASO_A_PASO=['quiz','vf','error','cita','hoy'];
  const hechos=jgR.tipo==='parear'?jgR.listos.length
    :jgR.tipo==='clasif'?jgR.i
    :jgR.tipo==='ordenar'?jgR.puestos.length
    :PASO_A_PASO.indexOf(jgR.tipo)>=0?jgR.i
    :jgR.frases.reduce((n,f)=>n+Object.keys(f.puestas).length,0);
  const pct=Math.round(hechos/jgR.total*100);
  let h='<div class="prog-lin"><div style="width:'+pct+'%"></div></div>';

  if(hechos>=jgR.total){
    const nota=jgMal===0?IC('check')+' Perfecto':jgBien>=jgMal?IC('check')+' Bien':IC('repetir')+' A repasar';
    h+='<div class="jg-fin"><div class="jg-fin-t">'+nota+'</div>'+
       '<div class="jg-fin-s">'+jgBien+' a la primera · '+jgMal+' con error</div>'+
       '<button class="btn azul" onclick="nuevaRonda()">'+IC('barajar')+' Otra ronda</button></div>';
    z.innerHTML=h;return;
  }

  const T=tipoPaso();
  /* En la ronda mezclada la ayuda de arriba es la del modo «hoy», que no dice
     qué hacer en ESTE paso. Cada paso trae la suya, la misma de su modo. */
  if(jgR.tipo==='hoy')h+='<div class="jg-que">'+esc((JUEGOS.find(j=>j.id===T)||{}).ayuda||'')+'</div>';
  if(T==='quiz'||T==='vf'){
    const q=qPaso();
    const resuelto=jgR.elegida!==null;
    h+='<div data-leer="preg"><div class="jg-preg">'+esc(q.q)+(puedeHablar()?' '+BTN_VOZ:'')+'</div>';
    if(T==='quiz'){
      h+='<div class="jg-gr col">'+q.o.map((o,i)=>{
        let c='jg-g';
        if(resuelto){ if(i===q.a)c+=' ok'; else if(i===jgR.elegida)c+=' ko'; }
        return '<button class="'+c+'"'+(resuelto?' disabled':'')+
          ' onclick="jgPaso('+i+')">'+esc(o)+'</button>';
      }).join('')+'</div>';
    } else {
      const bt=(v,et)=>{
        let c='jg-g';
        if(resuelto){ if(v===q.a)c+=' ok'; else if(v===jgR.elegida)c+=' ko'; }
        return '<button class="'+c+'"'+(resuelto?' disabled':'')+
          ' onclick="jgPaso('+v+')">'+et+'</button>';
      };
      h+='<div class="jg-gr">'+bt(true,IC('check')+' Verdadero')+bt(false,IC('x')+' Falso')+'</div>';
    }
    h+='</div>';
    if(resuelto)h+=avisoPaso(jgR.elegida===q.a, q.e||'');
  } else if(T==='error'){
    const p=pPaso(), resuelto=jgR.elegida!==null;
    h+='<div class="jg-ins">'+esc(p.q.ins||'')+'</div><div class="jg-frase">'+
      p.q.p.map((x,i)=>{
        if(!x.b)return '<span>'+esc(x.x)+'</span>';
        const txt=i===p.malo?p.puesto:x.b;
        let c='jg-w';
        if(resuelto){ if(i===p.malo)c+=' ok'; else if(i===jgR.elegida)c+=' ko'; }
        return '<button class="'+c+'"'+(resuelto?' disabled':'')+
          ' onclick="jgPaso('+i+')">'+esc(txt)+'</button>';
      }).join('')+'</div>';
    if(resuelto)h+=avisoPaso(jgR.elegida===p.malo,
      'La palabra cambiada era «'+p.puesto+'». Va «'+p.correcta+'».');
  } else if(T==='cita'){
    const p=pPaso(), resuelto=jgR.elegida!==null;
    h+='<div class="jg-frase">'+esc(p.texto)+'</div>'+
      '<div class="jg-gr col">'+p.ops.map((o,i)=>{
        let c='jg-g';
        if(resuelto){ if(o===p.bien)c+=' ok'; else if(i===jgR.elegida)c+=' ko'; }
        return '<button class="'+c+'"'+(resuelto?' disabled':'')+
          ' onclick="jgPaso('+i+')">'+esc(o)+'</button>';
      }).join('')+'</div>';
    if(resuelto)h+=avisoPaso(p.ops[jgR.elegida]===p.bien,'Es '+p.bien+'.');
  } else if(jgR.tipo==='parear'){
    h+='<div class="jg-par">'+
      '<div class="jg-col">'+jgR.izq.map((c,i)=>btnPar('i',i,c.label,c)).join('')+'</div>'+
      '<div class="jg-col">'+jgR.der.map((c,i)=>btnPar('d',i,c.sub,c)).join('')+'</div></div>';
  } else if(jgR.tipo==='clasif'){
    const c=jgR.items[jgR.i];
    h+='<div class="jg-carta">'+esc(c.label)+'<b>'+esc(c.sub)+'</b></div>'+
       '<div class="jg-gr col">'+jgR.grupos.map(g=>
         '<button class="jg-g" style="--c:'+g.color+'" onclick="jgClasif(\''+g.id+'\')">'+
         icoDe(g.icono||'')+' '+esc(g.nombre)+'</button>').join('')+'</div>';
  } else if(jgR.tipo==='ordenar'){
    h+='<div class="jg-fila">'+jgR.puestos.map((c,i)=>
        '<span class="jg-p ok">'+(i+1)+'. '+esc(c.sub)+'</span>').join('')+'</div>'+
       '<div class="jg-gr col">'+jgR.pool.map((c,i)=>
        jgR.puestos.includes(c)?'':'<button class="jg-g" onclick="jgOrden('+i+')">'+
        esc(c.label)+' — '+esc(c.sub)+'</button>').join('')+'</div>';
  } else {
    const usadas=jgR.frases.flatMap(f=>Object.values(f.puestas));
    h+=jgR.frases.map((f,n)=>{
      const lista=n===jgR.i?' activa':(Object.keys(f.puestas).length>=f.huecos.length?' lista':'');
      return '<div class="jg-ins">'+esc(f.q.ins||'')+'</div>'+
        '<div class="jg-frase'+lista+'">'+f.q.p.map((x,i)=>x.b
          ? '<span class="jg-h'+(f.puestas[i]?' ok':'')+'">'+esc(f.puestas[i]||'______')+'</span>'
          : '<span>'+esc(x.x)+'</span>').join('')+'</div>';
    }).join('')+
      '<div class="jg-gr banco">'+jgR.bolsa.map((w,i)=>{
        let quedan=jgR.bolsa.filter(x=>x===w).length-usadas.filter(x=>x===w).length;
        if(quedan<=0)return '';
        if(jgR.bolsa.indexOf(w)!==i)return '';
        return '<button class="jg-g" onclick="jgBanco('+i+')">'+esc(w)+
          (quedan>1?' <small>×'+quedan+'</small>':'')+'</button>';
      }).join('')+'</div>';
  }
  h+='<p class="nota" style="text-align:center">'+jgBien+' bien · '+jgMal+' con error</p>';
  z.innerHTML=h;
}

/* El aviso sale DESPUES de responder, nunca antes: si la explicacion esta en
   pantalla mientras se decide, se lee en vez de pensarse. Y el boton de seguir
   va aqui abajo, donde quedo el dedo. */
function avisoPaso(bien,texto){
  return '<div class="jg-fb '+(bien?'ok':'ko')+'">'+
    '<b>'+(bien?IC('check')+' Correcto':IC('x')+' No era')+'</b>'+(texto?'<br>'+esc(texto):'')+'</div>'+
    '<div class="jg-gr"><button class="btn azul" onclick="jgSigue()">Siguiente →</button></div>';
}

/* Los cuatro modos paso a paso comparten el mismo mecanismo: se elige, se
   marca bien o mal UNA sola vez, y se avanza a mano. Una sola funcion para
   los cuatro; si cada uno trajera la suya, en el tercero ya habria tres
   maneras distintas de contar un acierto. */
function jgPaso(v){
  if(!jgR||jgR.elegida!==null)return;
  jgR.elegida=v;
  let bien=false;
  const T=tipoPaso();
  if(T==='quiz'||T==='vf')bien=(v===qPaso().a);
  else if(T==='error')    bien=(v===pPaso().malo);
  else if(T==='cita')     bien=(pPaso().ops[v]===pPaso().bien);
  if(bien)jgBien++;else jgMal++;
  pintaJuego();
}

function jgSigue(){
  if(!jgR)return;
  jgR.i++;jgR.elegida=null;
  pintaJuego();
  if(jgR.i>=jgR.total)cierraRonda();
  else leeSolaSiMenor();
}

/* Entre 4 y 6 años la pregunta nueva se lee sola, como en Duolingo ABC. Solo
   después de un toque (Siguiente, Otra ronda): iOS no deja hablar sin un
   gesto de la persona, y fuera de eso sonaría sin que nadie lo pidiera. */
const esMenor=()=>(CAT().edad||'')==='4 a 6 años';
function leeSolaSiMenor(){
  if(!esMenor()||!puedeHablar()||!jgR||!['quiz','vf'].includes(tipoPaso()))return;
  const b=document.querySelector('#jg-zona [data-leer="preg"] .btn-voz');
  if(b)leeCerca(b);
}

function btnPar(lado,i,txt,c){
  const hecho=jgR.listos.includes(c.id);
  const sel=jgSel&&jgSel.lado===lado&&jgSel.i===i;
  return '<button class="jg-g'+(hecho?' ok':'')+(sel?' sel':'')+'"'+(hecho?' disabled':'')+
    ' onclick="jgPar(\''+lado+'\','+i+')">'+esc(txt)+'</button>';
}

function jgPar(lado,i){
  if(!jgR)return;
  if(!jgSel||jgSel.lado===lado){jgSel={lado:lado,i:i};pintaJuego();return;}
  const a=jgSel.lado==='i'?jgR.izq[jgSel.i]:jgR.der[jgSel.i];
  const b=lado==='i'?jgR.izq[i]:jgR.der[i];
  if(a.id===b.id){jgR.listos.push(a.id);jgBien++;}else{jgMal++;}
  jgSel=null;pintaJuego();
  if(jgR.listos.length>=jgR.total)cierraRonda();
}

function jgClasif(gid){
  if(!jgR)return;
  const c=jgR.items[jgR.i];
  if(c.doc===gid)jgBien++;else jgMal++;
  jgR.i++;pintaJuego();
  if(jgR.i>=jgR.total)cierraRonda();
}

function jgOrden(i){
  if(!jgR)return;
  const c=jgR.pool[i];
  const toca=jgR.bien[jgR.puestos.length];
  if(toca&&toca.id===c.id){jgR.puestos.push(c);jgBien++;}else{jgMal++;}
  pintaJuego();
  if(jgR.puestos.length>=jgR.total)cierraRonda();
}

function jgBanco(i){
  if(!jgR)return;
  const w=jgR.bolsa[i];
  /* Se llena la frase en curso; cuando queda completa se pasa a la siguiente.
     Asi el orden de las palabras dentro de cada frase sigue importando. */
  let f=jgR.frases[jgR.i];
  while(f&&Object.keys(f.puestas).length>=f.huecos.length){jgR.i++;f=jgR.frases[jgR.i];}
  if(!f)return;
  const hueco=f.huecos.find(h=>!f.puestas[h.i]);
  if(!hueco)return;
  if(igual(w,hueco.b)){f.puestas[hueco.i]=w;jgBien++;}else{jgMal++;}
  if(Object.keys(f.puestas).length>=f.huecos.length&&jgR.i<jgR.frases.length-1)jgR.i++;
  pintaJuego();
  const hechos=jgR.frases.reduce((n,x)=>n+Object.keys(x.puestas).length,0);
  if(hechos>=jgR.total)cierraRonda();
}

/* Terminar una ronda cuenta como haber estudiado hoy: es la misma racha de
   las tarjetas y del examen, no un contador nuevo. Un solo concepto, un solo
   mecanismo. */
function cierraRonda(){ sumaRacha(); festejaRacha(0); }

function voltea(){if(mazo.length&&tjI<mazo.length){tjVolteada=!tjVolteada;muestraTj();}}
function tjSig(){if(tjI<mazo.length){tjI++;tjVolteada=false;muestraTj();}}
function tjAnt(){if(tjI>0){tjI--;tjVolteada=false;muestraTj();}}
function tjSabia(si){
  if(tjI>=mazo.length)return;
  if(si)tjSabidas.add(tjI);else tjSabidas.delete(tjI);
  const k=claveT(mazo[tjI]);
  S.ft[k]=si?Math.min(2,(S.ft[k]||0)+1):0;
  /* El día solo se guarda al acertar. Al fallar se borra, para que vuelva a
     salir hoy mismo y no dentro de unos días. */
  if(si)S.fv[k]=diaHoy();else delete S.fv[k];
  sumaRacha();
  tjI++;tjVolteada=false;
  if(tjI>=mazo.length&&mazo.length>=10&&tjSabidas.size===mazo.length){
    if(!S.insignias.includes('Memoria de acero')){S.insignias.push('Memoria de acero');}
  }
  guardar();muestraTj();
}

/* ───────── examen ───────── */
let reloj=null,seg=1200,entregado=false,resp={},prueba=[],modo='normal';
/* alcance: 'todo' | 'biblia' | 'pr' | id de capítulo.
   nivel: 0 = progresivo (lo decide la app), o 1, 2, 3 fijo. */
let alcance='todo',cuantas=0,nivel=0;

/* Los errores por repasar, del MISMO evento que se está practicando. Sin este
   filtro, un examen de errores de Padres mezclaba Daniel con doctrina, que es
   justo lo que el reglamento separa. */
/* Los errores que se repasan son los de la ACTIVIDAD activa. Antes esto
   colgaba del alcance del examen; ahora cuelga del conmutador, que es donde
   de verdad se decide en que se esta trabajando. bancoDe() ya viene filtrado,
   asi que basta con mirar los fallados. */
const falladasDe=()=>bancoDe().filter(q=>pasaFiltro(q.cap)&&(S.fq[claveQ(q)]||{}).m>0);

/* ───────── la fuente que el reglamento nombra ─────────
   MECANISMO
   El reglamento le pone a cada actividad UNA fuente: Conexion Biblica se
   examina del libro de Daniel, la matutina del cuadernillo de octubre, y las
   creencias de la cartilla «En esto creemos». El material de estudio va mas
   alla de eso a proposito, porque es lo que hace entender: Profetas y Reyes
   comenta el relato, y el libro de 434 paginas explica cada creencia. Pero el
   examen tiene que medir lo que les pidieron aprender.

   DE DONDE SALE EL DATO, sin clasificar 1.378 preguntas a mano
   - Profetas y Reyes ya se distingue por el id del capitulo: `pr`. Es un
     hecho de la estructura, no una etiqueta que alguien pueda olvidar poner.
   - En las creencias solo el generador sabe de donde vino cada pregunta, asi
     que las escribe con `f:'c'`: son las 56 de verdadero y falso, que salen
     de editorial.py (el libro), contra las 215 que salen de datos.py (la
     cartilla).
   - La matutina no tiene material complementario: sus 269 preguntas salen de
     las dos tablas del cuadernillo publicado.

   SIN MARCA = OFICIAL, y es la falla segura. Una pregunta nueva de Daniel que
   nadie marque cuenta como oficial, que es lo que es. Al reves, una pregunta
   nueva desapareceria del examen sin que nadie lo note. */
/* COMPLEMENTARIA = la que NO sale de la fuente que el reglamento nombra.
   Profetas y Reyes estuvo aqui por el id del capitulo y estaba mal: el
   reglamento de la Asociacion manda leer P&R 39, 41 y 44 junto con Daniel,
   asi que es material del reglamento y entra al examen. Camilo lo confirmo
   contra las reglas del campamento (2026-09-21). Queda solo la marca del
   generador, `f:'c'`, que distingue la cartilla de las creencias del libro:
   ahi la separacion si existe, y con ella el interruptor sigue teniendo
   sentido en «En esto creemos» y desaparece solo en Conexion Biblica, porque
   pintaMenuEx() ya solo lo ofrece donde cambia algo. */
const esComplementaria=q=>q.f==='c';
/* Lo escoge el usuario y vive en el aparato, como `alcance` y `nivel`.
   v132: en Conexion Biblica arranca PRENDIDO. Camilo abrio un examen de
   capitulos para el campamento y le salieron preguntas de historia y de otros
   profetas: el examen del campamento es del libro de Daniel y de Profetas y
   Reyes. Se apaga a mano para practicar con todo. Cambiar de categoria lo
   vuelve al valor de su actividad. */
const fuenteInicial=()=>TIPO()==='libro';
let soloFuente=false;
/* De que actividad es el valor de arriba. La categoria cambia por varios
   caminos (la bienvenida, cambiar de persona, pasar de actividad) y no todos
   pasan por ponCat(): poolDe() compara y, si el valor es de otra actividad,
   vuelve al de esta. Asi ningun camino hereda el interruptor de otra. */
let soloFuenteAct='';
let soloInterp=false;
function reiniciaFuente(){soloFuente=fuenteInicial();soloInterp=false;soloFuenteAct=ACT_DE(S.cat);}
function sincFuente(){if(soloFuenteAct!==ACT_DE(S.cat))reiniciaFuente();}

/* Preguntas disponibles según categoría + alcance elegido. */
function poolDe(){
  /* El filtro de fuente va AQUI y no en poolNivel(): los juegos y la cuenta
     del panel (cuantasPara) leen poolDe(), y con el filtro abajo contaban y
     jugaban con preguntas que el examen luego no traia. */
  sincFuente();
  /* v180: «Solo la interpretación» es lo contrario del interruptor de fuente:
     deja solo las complementarias. Los dos no van prendidos a la vez. */
  const b=soloInterp?bancoDe().filter(esComplementaria):soloFuente?bancoDe().filter(q=>!esComplementaria(q)):bancoDe();
  /* «todo» es todo lo de la ACTIVIDAD activa, no todo lo cargado. El filtro
     de creencias ya lo hizo capsDe(); dejarlo aqui tambien vaciaria el examen
     de las 28 creencias. La garantia sigue en pie por otro camino: con la
     actividad en Daniel, el banco no tiene ni una creencia. */
  if(alcance==='todo')return b;
  const K=clavesDe(alcance);
  if(K)return b.filter(q=>K.has(claveQ(q)));
  if(alcance==='creencias')return b.filter(q=>esCreencia(q.cap));
  if(alcance==='biblia')return b.filter(q=>esDaniel(q.cap));
  if(alcance==='pr')return b.filter(q=>q.cap.slice(0,2)==='pr');
  if(alcance==='q1')return b.filter(q=>diaMat(q.cap)>0&&diaMat(q.cap)<=15);
  if(alcance==='q2')return b.filter(q=>diaMat(q.cap)>15);
  const L=listaDe(alcance);
  if(L)return b.filter(q=>L.includes(q.cap));
  const r=rangoDe(alcance);
  if(r)return b.filter(q=>enRango(q.cap,r));
  return b.filter(q=>q.cap===alcance);
}

/* ───────── un rango de material: «del dia 5 al 12» ─────────
   POR QUE EXISTE
   A veces se reparten el material: una estudia del 1 al 10 y otra del 11 al
   20, y cada una presenta lo suyo. Con «primera quincena» y «segunda
   quincena», que eran los dos unicos tramos posibles, eso no se podia pedir.

   UN SOLO MECANISMO PARA LAS TRES ACTIVIDADES
   El rango no sabe que existe la matutina: se escribe `desde..hasta` con dos
   ids del MISMO tipo, y compara el numero que ya traen los ids. Asi `m05..m12`
   son los dias 5 al 12, `d1..d3` es Daniel 1 al 3 y `cr10..cr20` son las
   creencias 10 a la 20, sin una linea por actividad. Un rango que mezcle tipos
   (`m05..d3`) no es un rango y no filtra nada.

   La forma tiene que caber en 20 caracteres, que es lo que el servidor guarda
   en la columna `alcance`: `cr10..cr20` son 10. */
const PARTE_ID=/^([a-z]+)(\d+)$/;
function rangoDe(alc){
  const p=String(alc||'').split('..');
  if(p.length!==2)return null;
  const a=PARTE_ID.exec(p[0]),b=PARTE_ID.exec(p[1]);
  if(!a||!b||a[1]!==b[1])return null;
  const n1=Number(a[2]),n2=Number(b[2]);
  if(n1>n2)return null;
  return {pre:a[1],a:n1,b:n2};
}
function enRango(cap,r){
  const m=PARTE_ID.exec(String(cap||''));
  return !!m&&m[1]===r.pre&&Number(m[2])>=r.a&&Number(m[2])<=r.b;
}
/* El rango en palabras, con los nombres que la persona ve en pantalla. */
function textoRango(r){
  const de=CAPS.find(c=>enRango(c.id,{pre:r.pre,a:r.a,b:r.a}));
  const a=CAPS.find(c=>enRango(c.id,{pre:r.pre,a:r.b,b:r.b}));
  if(!de||!a)return 'Un rango del material';
  return de.id===a.id?('Solo '+de.label):('De '+de.label+' a '+a.label);
}

/* ───────── VARIOS CAPITULOS SUELTOS: «d1,d3,d6» ─────────
   POR QUE EXISTE
   El tramo solo sirve para capitulos seguidos. «Daniel 1, 3 y 6», que es lo
   que de verdad se reparte en el club, no se podia pedir.
   La forma es ids separados por coma, en el orden del material. Dos o mas: uno
   solo sigue siendo el id del capitulo, como siempre, para que un alcance
   viejo guardado en un celular o en una evaluacion abierta siga abriendo. */
/* v139: una evaluación puede ser una LISTA DE PREGUNTAS («q:d1.abc,pr41.x9»):
   la práctica de las más difíciles que arma el análisis del director. */
function clavesDe(alc){
  const m=/^q:(.+)$/.exec(String(alc||''));
  if(!m)return null;
  const k=m[1].split(',').filter(x=>/^[a-z0-9-]{1,20}\.[0-9a-z]{1,7}$/.test(x));
  return k.length?new Set(k):null;
}
function listaDe(alc){
  const p=String(alc||'').split(',');
  if(p.length<2)return null;
  return p.every(x=>PARTE_ID.test(x))?p:null;
}
/* «El libro de la Biblia» de la actividad: Daniel en Conexión Bíblica 2026,
   Apocalipsis en la de Apocalipsis. El nombre se conserva: lo usan muchas
   partes y en cada actividad hay un solo libro bíblico. */
const esDaniel=id=>/^(d|ap)\d/.test(id);
function nombreBiblia(){
  const c=(typeof capsDe==='function'?capsDe():CAPS).find(x=>esDaniel(x.id));
  return c?libroCid(c.id).nombre:'Daniel';
}
const esPR=id=>/^pr\d/.test(id);
/* Los ids que un alcance deja pasar dentro de un universo de capitulos. Es la
   misma regla de poolDe(), pero sobre capitulos y no sobre preguntas: la usan
   las fichas y el filtro de estudio. */
function idsDeAlcance(alc,caps){
  const L=listaDe(alc),r=rangoDe(alc);
  return caps.filter(c=>{
    const id=c.id;
    if(alc==='todo')return true;
    if(alc==='biblia')return esDaniel(id);
    if(alc==='pr')return id.slice(0,2)==='pr';
    if(alc==='creencias')return esCreencia(id);
    if(alc==='q1')return diaMat(id)>0&&diaMat(id)<=15;
    if(alc==='q2')return diaMat(id)>15;
    if(L)return L.includes(id);
    if(r)return enRango(id,r);
    return id===alc;
  }).map(c=>c.id);
}
/* Lo escogido en las fichas, escrito en la forma MAS CORTA que ya existia:
   todo, biblia, pr o un capitulo. La lista solo aparece cuando hace falta, asi
   que casi todo lo que viaja al servidor sigue siendo lo de antes. */
function alcanceDeFichas(sel,caps){
  const ids=caps.map(c=>c.id).filter(id=>sel.includes(id));
  if(!ids.length)return '';
  if(ids.length===caps.length)return 'todo';
  const igual=(a,b)=>a.length===b.length&&a.every(x=>b.includes(x));
  const d=caps.map(c=>c.id).filter(esDaniel),p=caps.map(c=>c.id).filter(esPR);
  if(d.length&&igual(ids,d))return 'biblia';
  if(p.length&&igual(ids,p))return 'pr';
  return ids.length===1?ids[0]:ids.join(',');
}
/* La lista en palabras: «Daniel 1, 3 y 6 + Profetas y Reyes 41». */
function textoLista(ids){
  const y=a=>a.length>1?a.slice(0,-1).join(', ')+' y '+a[a.length-1]:a[0];
  const d=ids.filter(esDaniel).map(i=>i.replace(/^\D+/,'')),p=ids.filter(esPR).map(i=>i.slice(2));
  const nb=ids.filter(esDaniel).map(i=>libroCid(i)).filter(Boolean)[0];
  const otros=ids.filter(i=>!esDaniel(i)&&!esPR(i)).map(i=>(CAPS.find(c=>c.id===i)||{label:i}).label);
  const partes=[];
  if(d.length)partes.push((nb?nb.nombre:'Daniel')+' '+y(d));
  if(p.length)partes.push('Profetas y Reyes '+y(p));
  return partes.concat(otros).join(' + ');
}
/* Tocar una ficha. Nunca deja la seleccion vacia: un examen o un filtro sin
   capitulos es una pantalla en blanco. */
function tocaFicha(sel,caps,tipo,v){
  let s=sel.slice();
  if(tipo==='todo')s=caps.map(c=>c.id);
  else if(tipo==='libro')s=caps.map(c=>c.id).filter(v==='d'?esDaniel:esPR);
  else s=s.includes(v)?s.filter(x=>x!==v):s.concat(v);
  return s.length?s:sel;
}
/* LAS FICHAS POR LIBRO. Un solo dibujo para los tres lugares que escogen
   capitulos: el examen de practica, el panel del director y el filtro de
   estudio. `fn` es el nombre de la funcion que recibe (tipo, valor). */
function htmlFichas(caps,sel,fn){
  const nb=(caps.map(c=>libroCid(c.id)).find(Boolean)||{nombre:'Daniel'}).nombre;
  const libros=[['d',nb,'todo '+nb,'da',esDaniel],['pr','Profetas y Reyes','todo P&R','pr',esPR]];
  const hay=libros.filter(l=>caps.some(c=>l[4](c.id)));
  return '<div class="fch-cab"><button type="button" class="fch-todo" onclick="'+fn+'(\'todo\',\'\')">Todo</button>'+
    (hay.length>1?hay.map(l=>'<button type="button" class="fch-todo" onclick="'+fn+'(\'libro\',\''+l[0]+'\')">'+esc(l[2])+'</button>').join(''):'')+
    '</div>'+hay.map(l=>{
      const cs=caps.filter(c=>l[4](c.id));
      return '<div class="fch-g"><div class="fch-t">'+esc(l[1])+'</div><div class="fch">'+
        cs.map(c=>'<button type="button" class="fch-b '+l[3]+'" aria-pressed="'+sel.includes(c.id)+'" '+
          'aria-label="'+esc(c.label+' — '+c.sub)+'" title="'+esc(c.label+' — '+c.sub)+'" '+
          'onclick="'+fn+'(\'cap\',\''+c.id+'\')">'+esc(c.id.replace(/^(d|pr)/,''))+'</button>').join('')+
        '</div></div>';
    }).join('');
}

/* Día del mes de un capítulo de matutina (m01..m31), o 0 si no lo es. */
const diaMat=id=>/^m\d\d$/.test(id)?Number(id.slice(1)):0;
const esMatutina=()=>TIPO()==='dias';
/* Un id de creencia. Ya no se usa para filtrar (la actividad lo hace), pero
   sigue sirviendo para reconocerlas en el material impreso y en las cuentas
   del reglamento, que reparte el club en dos. */
const esCreencia=id=>/^cr\d\d$/.test(id);

/* Los grupos de alcance que de verdad tienen preguntas en esta categoría. Se
   calcula probando cada uno contra poolDe(), no con una lista fija: la lista
   fija fue la que ofrecía «Solo Profetas y Reyes» a Menores, que no lo tiene. */
function gruposEx(){
  const cand=esMatutina()
    ?[['q1','Solo la primera quincena (1 al 15)'],['q2','Solo la segunda quincena (16 en adelante)']]
    :[['biblia','Solo el libro de '+nombreBiblia()],['pr','Solo Profetas y Reyes']];
  const prev=alcance,out=[];
  try{
    for(const g of cand){alcance=g[0];if(poolDe().length)out.push(g);}
  }finally{alcance=prev;}
  return out;
}

/* Nivel efectivo del examen que se va a armar. */
const nivelEfectivo=()=>nivel||nivelRecomendado();

/* Pool filtrado por nivel. Un nivel incluye todo lo de abajo: al llegar al
   avanzado no se dejan de practicar los datos básicos, solo se agrega lo
   difícil. Si con el filtro no alcanzan preguntas, se usa el pool completo
   para no dejarla sin examen. */
function poolNivel(){
  let b=poolDe();
  /* El filtro de fuente va ANTES del de nivel: si fuera al reves, el rescate
     de «si el nivel deja muy pocas, usa todas» devolveria preguntas
     complementarias en un examen que pidio solo la fuente oficial. */
  /* El de fuente ya viene aplicado desde poolDe(). */
  /* A los 4 a 6 años no se les pide escribir la palabra exacta. */
  if(CAT().sinCompletar)b=b.filter(q=>q.t!=='fill');
  /* v177: el examen real de 7 a 9 años no trajo verdadero o falso. */
  if(CAT().sinVF)b=b.filter(q=>q.t!=='tf');
  const n=nivelEfectivo();
  const f=b.filter(q=>(q.nv||1)<=n);
  return f.length>=Math.min(8,b.length)?f:b;
}

/* Opciones de cantidad que caben en el pool, más el máximo real. */
function opcionesCuantas(){
  const t=poolNivel().length;
  /* v168: el número del reglamento siempre está entre las opciones. Antes la
     lista era fija, y una categoría de 20 preguntas abría su examen en 10. */
  const base=[...new Set([10,15,25,40,60,100,NPREG()])].filter(n=>n<=t).sort((x,y)=>x-y);
  if(!base.length||base[base.length-1]!==t)base.push(t);
  return base;
}

function pintaMenuEx(){
  const sa=document.getElementById('ex-alcance');
  const prev=alcance;
  /* Se ofrecen SOLO los grupos que tienen preguntas en esta categoría.
     Menores no tiene Profetas y Reyes, y la matutina de menores no llega al 16
     de octubre: ofrecerlos dejaba el examen en CERO preguntas y el botón
     «Comenzar» sin hacer nada, que es una puerta con letrero y sin cerradura. */
  const disp=gruposEx();
  const grupos=disp.map(g=>'<option value="'+g[0]+'">'+g[1]+'</option>').join('');
  /* Y de los capítulos, solo los que SE EXAMINAN. Un capítulo marcado «solo
     para estudiar» no tiene preguntas en el sorteo: escogerlo dejaba el examen
     en cero. Pasaba con Daniel 2 desde que salió del reglamento, y con el día
     31 de la matutina desde antes. */
  const capsEx=capsDe().filter(c=>!soloEstudio(c,S.cat));
  /* UN TRAMO DEL MATERIAL, tambien aqui. Si el club se reparte el estudio («tu
     del 1 al 10, yo del 11 al 20»), practicar todo el material es gastar
     turnos en dias que no le tocan. Los extremos son los capitulos de SU
     categoria: un rango que salga de ahi no existe para ella. */
  const hayRango=capsEx.length>=3;
  sa.innerHTML='<option value="todo">Todo mi material</option>'+grupos+
    capsEx.map(c=>'<option value="'+c.id+'">'+esc(c.label)+' — '+esc(c.sub)+'</option>').join('')+
    (hayRango?'<option value="rango">Un tramo: de un capítulo a otro</option>':'');
    /* El alcance vive en el aparato y sobrevive al cambio de categoría. «q1» de
     la matutina, o «creencias» de padres, no existen en Aventureros: si no se
     revalida, el examen queda en CERO preguntas y el desplegable muestra un
     valor que no está en la lista. Se valida contra los grupos que esta
     categoría tiene de verdad, no contra una lista fija. */
  const rPrev=rangoDe(prev);
  if(!rPrev&&!listaDe(prev)&&!capsEx.some(c=>c.id===prev)&&!['todo'].concat(disp.map(g=>g[0])).includes(prev))alcance='todo';
  /* Un rango guardado de OTRA categoría no sirve aquí: «del día 5 al 12» no
     existe en Aventureros. Se valida contra los capítulos que esta categoría
     tiene de verdad, igual que los grupos. */
  if(rPrev&&!capsEx.some(c=>enRango(c.id,rPrev)))alcance='todo';
  /* Una lista sirve si al menos uno de sus capitulos se examina aqui; se
     queda con esos. Si ninguno, vuelve a todo. */
  if(listaDe(alcance))alcance=alcanceDeFichas(idsDeAlcance(alcance,capsEx),capsEx)||'todo';
  /* EN CONEXION BIBLICA SE ESCOGE CON FICHAS. Reemplazan al desplegable, al
     capitulo suelto y al tramo: todo eso es «que capitulos», y con las fichas
     se dice de un toque, incluido lo que antes no se podia (1, 3 y 6). Un
     tramo que venga de antes se traduce a sus capitulos. */
  const conF=TIPO()==='libro'&&capsEx.length>1;
  if(conF&&rangoDe(alcance))alcance=alcanceDeFichas(idsDeAlcance(alcance,capsEx),capsEx)||'todo';
  pintaRangoEx(capsEx,hayRango&&!conF);
  sa.value=rangoDe(alcance)?'rango':(listaDe(alcance)?'todo':alcance);
  const fz=document.getElementById('ex-fichas'),sl=document.getElementById('ex-alcance-lb');
  if(sl)sl.hidden=conF;
  if(fz){fz.hidden=!conF;
    fz.innerHTML=conF?'<span class="ex-fichas-t">Sobre qué</span>'+
      htmlFichas(capsEx,idsDeAlcance(alcance,capsEx),'fichaEx'):'';}

  const ops=opcionesCuantas();
  if(!ops.includes(cuantas))cuantas=ops.includes(NPREG())?NPREG():ops[0];
  const sc=document.getElementById('ex-cuantas');
  sc.innerHTML=ops.map(n=>'<option value="'+n+'">'+n+' pregunta'+(n===1?'':'s')+
    (n===NPREG()?' (tamaño de práctica)':'')+'</option>').join('');
  sc.value=cuantas;

  const rec=nivelRecomendado();
  const sn=document.getElementById('ex-nivel');
  sn.innerHTML='<option value="0">Progresivo — hoy nivel '+rec+', '+ETIQ_NIVEL[rec]+'</option>'+
    [1,2,3].map(n=>'<option value="'+n+'">Nivel '+n+' — '+ETIQ_NIVEL[n]+
      ' ('+poolDe().filter(q=>(q.nv||1)<=n).length+' preguntas)</option>').join('');
  sn.value=nivel;

  const pool=poolNivel();
  const t=pool.length;
  const porTipo=['mc','tf','fill'].map(x=>{
    const L={mc:'múltiple',tf:'V/F',fill:'completar'}[x];
    return pool.filter(q=>q.t===x).length+' de '+L;
  }).join(' · ');
  /* Cuantas no ha visto nunca. Sin este renglon el «no se repiten» es una
     promesa invisible: se ve igual que antes y toca creerlo. */
  /* El interruptor de fuente solo se ofrece donde CAMBIA algo: en la matutina
     todo el material es el cuadernillo, asi que prenderlo no quitaria ni una
     pregunta y seria un control que no hace nada. */
  const zf=document.getElementById('ex-fuente-lb');
  const ch=document.getElementById('ex-fuente');
  if(zf&&ch){
    const hayComp=bancoDe().some(esComplementaria);
    zf.hidden=!hayComp;
    if(!hayComp&&soloFuente)soloFuente=false;
    ch.checked=soloFuente;
    const t=document.getElementById('ex-fuente-t');
    if(t)t.textContent=(TIPO()==='libro'&&nombreBiblia()!=='Daniel'?'Solo el libro de '+nombreBiblia()+'. Deja fuera la interpretación.':FUENTE_TXT[TIPO()])||'';
    const zi=document.getElementById('ex-interp-lb'), ci=document.getElementById('ex-interp');
    if(zi&&ci){zi.hidden=!hayComp||TIPO()!=='libro';if(zi.hidden)soloInterp=false;ci.checked=soloInterp;}
  }
  const nv2=nuevasDe();
  const frescura=nv2>0
    ? 'De esas, <strong>'+nv2+'</strong> nunca te han salido, y son las que entran primero.'
    : 'Ya te salieron todas alguna vez: ahora entran primero las que fallaste.';
  document.getElementById('ex-disponible').innerHTML=
    'Disponibles con esta selección: <strong>'+t+'</strong> preguntas ('+porTipo+').'+
    (t<cuantas?' <span style="color:var(--rojo-txt)">Se usarán todas.</span>':'')+
    '<br>'+frescura+
    '<br>'+textoNivel();
}

/* Explica en una línea por qué está en ese nivel: sin el motivo, subir de
   nivel se siente arbitrario. */
function textoNivel(){
  const n=nivelEfectivo();
  const prom=promedioReciente();
  const d=diasParaMeta();
  let por;
  if(nivel)por='Nivel fijado a mano.';
  else if(prom===null)por='Primera sesión: se empieza por los datos directos.';
  else if(n===3)por='Vas en '+Math.round(prom*100)+'%: ya entra lo de precisión literal.';
  else por='Promedio reciente '+Math.round(prom*100)+'%: se sube de nivel al llegar a '+
    (n===1?'70':'85')+'%.';
  return '<strong>Nivel '+n+' · '+ETIQ_NIVEL[n]+'.</strong> '+por+
    (d>0?' Faltan '+d+' días para el campamento.':'');
}

/* ───────── los dos extremos del tramo, en practicar ─────────
   MECANISMO
   Un rango solo existe entre capítulos del MISMO tipo: «de Daniel 1 a P&R 44»
   no es un tramo de nada y dejaría el examen en cero. En vez de dejar armar el
   disparate y después avisar, el desplegable «Hasta» solo ofrece lo que sí
   forma un tramo con lo que diga «Desde»: mismo tipo y de ahí en adelante.
   Así no hay estado inválido que validar, porque no se puede escoger. */
const familiaDe=id=>((PARTE_ID.exec(String(id||''))||[])[1])||'';
const numDe=id=>Number((PARTE_ID.exec(String(id||''))||[])[2]||0);

function pintaRangoEx(capsEx,hayRango){
  const l1=document.getElementById('ex-r1-lb'),l2=document.getElementById('ex-r2-lb');
  const s1=document.getElementById('ex-r1'),s2=document.getElementById('ex-r2');
  if(!s1||!s2||!l1||!l2)return;
  const r=rangoDe(alcance);
  const abierto=hayRango&&!!r;
  l1.hidden=!abierto;l2.hidden=!abierto;
  if(!abierto)return;
  const de=capsEx.find(c=>enRango(c.id,{pre:r.pre,a:r.a,b:r.a}));
  const a=capsEx.find(c=>enRango(c.id,{pre:r.pre,a:r.b,b:r.b}));
  s1.innerHTML=capsEx.map(c=>'<option value="'+c.id+'">'+esc(c.label)+'</option>').join('');
  s1.value=de?de.id:capsEx[0].id;
  const desde=s1.value;
  s2.innerHTML=capsEx.filter(c=>familiaDe(c.id)===familiaDe(desde)&&numDe(c.id)>=numDe(desde))
    .map(c=>'<option value="'+c.id+'">'+esc(c.label)+'</option>').join('');
  s2.value=a?a.id:s2.value;
}

/* Al escoger «Un tramo» todavía no hay extremos: se arranca con el material
   completo de la PRIMERA familia (todo Daniel, o todos los días, o todas las
   creencias), que siempre es un rango válido, y desde ahí se ajusta. Arrancar
   con «del primero al último» a secas daba «d1..pr44», que no es un rango. */
function cambiaAlcance(){
  const v=document.getElementById('ex-alcance').value;
  if(v==='rango'){
    const cs=capsDe().filter(c=>!soloEstudio(c,S.cat));
    const fam=cs.length?familiaDe(cs[0].id):'';
    const mismos=cs.filter(c=>familiaDe(c.id)===fam);
    alcance=mismos.length?(mismos[0].id+'..'+mismos[mismos.length-1].id):'todo';
  } else alcance=v;
  refrescaEx();
}

/* Cambiar «Desde» puede dejar «Hasta» atrás o en otra familia; se corrige
   solo con el primero que sí sirve, y pintaRangoEx vuelve a armar la lista. */
function cambiaRango(){
  const cs=capsDe().filter(c=>!soloEstudio(c,S.cat));
  const a=(document.getElementById('ex-r1')||{}).value||'';
  let b=(document.getElementById('ex-r2')||{}).value||'';
  if(!rangoDe(a+'..'+b)){
    const ult=cs.filter(c=>familiaDe(c.id)===familiaDe(a)&&numDe(c.id)>=numDe(a));
    b=ult.length?ult[ult.length-1].id:a;
  }
  if(rangoDe(a+'..'+b))alcance=a+'..'+b;
  refrescaEx();
}

/* Tocar una ficha del examen de practica. Cambia solo ESTE examen: el filtro
   de estudio de arriba sigue como estaba. */
function fichaEx(tipo,v){
  const capsEx=capsDe().filter(c=>!soloEstudio(c,S.cat));
  const n=tocaFicha(idsDeAlcance(alcance,capsEx),capsEx,tipo,v);
  alcance=alcanceDeFichas(n,capsEx)||'todo';
  refrescaEx();
}

function cambiaFuente(){
  soloFuente=!!document.getElementById('ex-fuente').checked;soloFuenteAct=ACT_DE(S.cat);
  if(soloFuente)soloInterp=false;
  refrescaEx();
}
function cambiaInterp(){
  sincFuente();
  soloInterp=!!document.getElementById('ex-interp').checked;
  if(soloInterp)soloFuente=false;
  refrescaEx();
}

function cambiaCuantas(){cuantas=Number(document.getElementById('ex-cuantas').value)||NPREG();refrescaEx();}
function cambiaNivel(){nivel=Number(document.getElementById('ex-nivel').value)||0;refrescaEx();}

/* La pantalla abre diciendo en palabras qué examen va a salir si toca
   «Comenzar». Antes abría con tres listas desplegables y el usuario tenía
   que armar el examen para poder empezarlo. */
const refrescaEx=()=>{pintaExInicio();};

function pintaExInicio(){
  pintaMenuEx();
  const b=bancoDe().length,f=falladasDe().length;
  const nv=nivelEfectivo();
  const n=Math.min(cuantas||NPREG(),poolNivel().length);
  document.getElementById('ex-resumen').textContent=n+' preguntas · nivel '+nv+' '+ETIQ_NIVEL[nv];
  document.getElementById('ex-desc').innerHTML=esc(textoAlcanceImpr())+
    '<br>'+esc(actYCat(S.cat,'cat'));
  /* Este renglon decia «nunca sale el mismo dos veces», y era falso: el sorteo
     no tenia memoria y repetia. Ahora si hay memoria, y el texto dice lo que
     de verdad hace, con la cifra de esta ficha. */
  const nuevas=nuevasDe();
  document.getElementById('ex-nota').textContent=
    'Tu categoría tiene '+b+' preguntas en total. '+
    (nuevas>0
      ? 'Te quedan '+nuevas+' que nunca te han salido, y el examen las escoge primero.'
      : 'Ya te salieron todas alguna vez; ahora el examen escoge primero las que fallaste.')+
    ' Reparto: '+textoReparto()+'.';
  document.getElementById('ex-err').innerHTML=f>=3
    ?'<button class="btn gho" onclick="arrancaExamen(\'errores\')">'+IC('repetir')+' Repasar mis '+f+' errores</button>':'';
  pintaReal();
  pintaCierre();
}

/* El aviso de cerrado y el interruptor van los dos en la pantalla de Examen: es
   donde el cierre tiene efecto y donde el director lo va a buscar. */
function pintaCierre(){
  const cerrado=examenesCerrados();
  const tarjeta=document.querySelector('#ex-inicio .card.ex-hoy');
  const cambiar=document.querySelector('#ex-inicio details');
  if(tarjeta)tarjeta.style.display=cerrado?'none':'';
  if(cambiar)cambiar.style.display=cerrado?'none':'';
  const av=document.getElementById('ex-cerrado');
  const c=srvLee();
  if(av)av.innerHTML=cerrado
    ?'<div class="card"><h2><svg class="ico" aria-hidden="true"><use href="#i-candado"/></svg>'+
     '<span>Los exámenes de práctica están cerrados</span></h2>'+
     '<p class="nota">Hay una <strong>evaluación abierta</strong>'+
     (c&&c.evalTitulo?': '+esc(c.evalTitulo):'')+'. Mientras tanto puedes '+
     '<strong>estudiar los capítulos</strong> y practicar con las '+
     '<strong>tarjetas</strong>, que es donde de verdad se aprende.</p>'+
     '<p class="nota">Si tienes tu código, la evaluación te sale arriba.</p></div>'
    :'';
}

/* Mezcla con fuente de azar explícita. mezcla() usa Math.random y es la de
   siempre; mezclaR() acepta un generador con semilla, y eso es lo que hace
   reproducible la evaluación del día. */
function mezclaR(a,r){const x=a.slice();for(let i=x.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[x[i],x[j]]=[x[j],x[i]];}return x;}
function mezcla(a){return mezclaR(a,Math.random);}

/* Generador con semilla (congruencial lineal). La misma semilla da la misma
   secuencia en cualquier aparato, que es lo que permite que una evaluación
   reconstruya el examen idéntico sin llevar las preguntas dentro. */
function prng(semilla){let s=semilla>>>0;return()=>(s=(s*1664525+1013904223)>>>0)/4294967296;}

/* Azar que usa el armado del examen. Es Math.random salvo cuando se está
   reconstruyendo un examen compartido. */
let rndEx=Math.random;

/* ───────── que no salgan las mismas preguntas la proxima vez ─────────
   MECANISMO
   `armar` sorteaba con Math.random sobre todo el pool, sin memoria. Con 86
   preguntas disponibles y examenes de 15, dos examenes seguidos repetian tres,
   y para ver el banco entero habia que hacer unas 29 corridas, porque el
   sorteo volvia a meter lo ya visto. MEDIDO, no estimado.

   `qv` arregla eso: cuenta cuantas veces le salio cada pregunta a ESTA ficha.
   El sorteo sigue siendo al azar, pero por tandas:
     0. las que nunca le han salido
     1. las vistas que ademas fallo (`fq`)
     2. las vistas que acerto
   Dentro de cada tanda se baraja, y entre vistas sale primero la que menos
   veces ha salido. Se acaban las nuevas, empieza por lo fallado: el repaso
   entra solo, sin que nadie escoja nada.

   POR QUE NO APLICA EN LA EVALUACION
   La evaluacion del director tiene que ser IDENTICA para todas: se arma con
   una semilla del servidor. Si el orden dependiera del historial de cada
   aparato, dos participantes de la misma categoria recibirian examenes
   distintos con la misma semilla, y el director estaria comparando notas de
   examenes que no son el mismo. Por eso esto se activa solo cuando el azar es
   `Math.random`, que es justo el caso de practicar. */
const vecesVista=q=>(S.qv||{})[claveQ(q)]||0;
const tandaDe=q=>{
  if(!vecesVista(q))return 0;
  return ((S.fq[claveQ(q)]||{}).m>0)?1:2;
};
/* Baraja primero y despues ordena por tanda: asi el orden dentro de la tanda
   sigue siendo azar, y no el orden en que estan escritas en el banco. */
const porFrescura=lista=>mezclaR(lista,rndEx)
  .map((q,i)=>({q,i}))
  .sort((a,b)=>(tandaDe(a.q)-tandaDe(b.q))||(vecesVista(a.q)-vecesVista(b.q))||
    (enUltimo(a.q)-enUltimo(b.q))||(a.i-b.i))
  .map(x=>x.q);
/* LO DEL EXAMEN ANTERIOR VA AL FINAL DE SU TANDA. Cuando ya salieron todas
   las de un tipo, el relleno sale de las vistas, y entre dos vistas una vez no
   habia como preferir la que NO acaba de salir: repetia del examen anterior.
   Se noto en v132, al sacar las complementarias el pool de Aventureros cambio
   de tamaño. Vive en memoria: es «el examen de hace un rato», no un historial. */
let ultimoExamen=new Set();
const enUltimo=q=>ultimoExamen.has(claveQ(q))?1:0;

/* Cuantas preguntas de la seleccion actual no le han salido nunca. Es lo que
   el menu del examen muestra, para que se vea que el banco no se esta
   repitiendo solo. */
const nuevasDe=()=>poolNivel().filter(q=>!vecesVista(q)).length;

/* Se marca cuando el examen SE PONE EN PANTALLA, no cuando se arma: armar()
   tambien corre para generar los impresos de todas las categorias, y eso no
   es una pregunta que a nadie le haya salido. */
function marcaVistas(sel){
  if(!S.qv)S.qv={};
  ultimoExamen=new Set(sel.map(claveQ));
  for(const q of sel){
    const k=claveQ(q);
    S.qv[k]=Math.min(99,(S.qv[k]||0)+1);
  }
  guardar();
}

function armar(m){
  if(m==='errores'){
    const sel=mezcla(falladasDe()).slice(0,NPREG());
    return sel.map((q,i)=>barajaOpciones({...q,id:'q'+i}));
  }
  const b=poolNivel();
  const n=Math.min(cuantas||NPREG(),b.length);
  /* Practicar prefiere lo que no ha visto; la evaluacion con semilla, no. */
  const orden=rndEx===Math.random?porFrescura:(l=>mezclaR(l,rndEx));
  const mc=orden(b.filter(q=>q.t==='mc'));
  const tf=orden(b.filter(q=>q.t==='tf'));
  const fl=orden(b.filter(q=>q.t==='fill'));
  /* Proporción del examen real: 60% múltiple, 25% V/F, 15% completar.
     Si un tipo no alcanza en el alcance elegido, el faltante lo cubren
     los otros tipos para que siempre salgan n preguntas. */
  let nf=Math.min(fl.length,Math.max(1,Math.round(n*REPARTO.fill)));
  let nt=Math.min(tf.length,Math.max(1,Math.round(n*REPARTO.tf)));
  let nm=Math.min(mc.length,n-nf-nt);
  let falta=n-(nm+nt+nf);
  while(falta>0){
    const antes=falta;
    if(nf<fl.length){nf++;falta--;}
    if(falta>0&&nt<tf.length){nt++;falta--;}
    if(falta>0&&nm<mc.length){nm++;falta--;}
    if(falta===antes)break;
  }
  const sel=[...mc.slice(0,nm),...tf.slice(0,nt),...fl.slice(0,nf)];
  return sel.map((q,i)=>barajaOpciones({...q,id:'q'+i}));
}

/* REPARTO DE LAS TRES SECCIONES DEL EXAMEN.
   Está aquí, en un solo lugar y con nombre, porque es el número que hay que
   cambiar el día que se sepa el reparto real del campamento. Hoy no se conoce:
   del examen que Camilo fotografió se sabe que tiene tres secciones, no cuántas
   preguntas trae cada una. 60/25/15 es una estimación, no un dato.
   El resto de la sección I sale de lo que quede: mc = n - fill - tf. */
const REPARTO={fill:.15,tf:.25};
const textoReparto=()=>'Sección I '+Math.round((1-REPARTO.fill-REPARTO.tf)*100)+'% · '+
  'Sección II '+Math.round(REPARTO.tf*100)+'% · Sección III '+Math.round(REPARTO.fill*100)+'%';

/* Baraja las opciones de una pregunta múltiple y reubica la respuesta.
   Sin esto, la correcta cae casi siempre en la misma letra y se puede
   aprobar por patrón en vez de por contenido. */
function barajaOpciones(q){
  if(q.t!=='mc'||!q.o)return q;
  /* «Todas las anteriores» solo tiene sentido de última: se queda ahí y se
     barajan las demás. Llegó con los exámenes reales de Daniel (v176). */
  const fija=q.o.findIndex(o=>/^(todas|ninguna) las anteriores\.?$/i.test(o));
  const sueltas=q.o.map((_,i)=>i).filter(i=>i!==fija);
  const idx=fija<0?mezclaR(sueltas,rndEx):[...mezclaR(sueltas,rndEx),fija];
  return {...q,o:idx.map(i=>q.o[i]),a:idx.indexOf(q.a)};
}

/* Tiempo proporcional a la cantidad. El ritmo del examen real tampoco está
   confirmado; se usa algo más de un minuto por pregunta, que es lo cómodo
   para practicar sin acostumbrarse a ir lento. */
const segundosPara=n=>Math.max(300,Math.round(n*(CAT().seg||72)));

/* ───────── el examen real y el tiempo (v176) ─────────
   POR QUÉ
   En el campamento del 10-oct-2026 el club de 7 a 9 años sacó 30 de 30 y quedó
   de tercero: con nota igual, desempata quien entrega primero. Hasta aquí la
   app medía aciertos y nunca cuánto se tardaba.

   QUÉ HACE
   · Cada examen guarda `dur`, los segundos entre el arranque y la entrega,
     medidos con el reloj del aparato y no con el contador de pantalla (ese se
     frena si el teléfono suspende la pestaña).
   · Con todo bien, la app recuerda el mejor tiempo: por hoja en el examen
     real, y por cantidad de preguntas en los demás, porque 15 y 30 preguntas
     no se comparan.
   · La categoría que tiene hoja real (EXAMEN_DE) la presenta igual que en el
     campamento: las mismas preguntas en el mismo orden. Las opciones sí se
     barajan, para que se aprenda la respuesta y no la letra. */
let t0Ex=0;
const hojaReal=()=>EXAMEN_DE[S.cat]&&EXAMENES_REALES[EXAMEN_DE[S.cat]]?EXAMEN_DE[S.cat]:'';
function armarReal(){
  const ex=EXAMENES_REALES[hojaReal()];
  return ex?ex.preguntas.map((q,i)=>barajaOpciones({...q,id:'q'+i})):[];
}
const reloj2=s=>Math.floor(s/60)+':'+String(s%60).padStart(2,'0');
/* El mejor tiempo con todo bien, sin contar el examen que se está guardando. */
function mejorTiempo(cat,ex,total){
  const ts=S.examenes.filter(e=>e.cat===cat&&e.dur&&e.pts===e.total&&
    (ex?e.ex===ex:(e.modo!=='real'&&e.modo!=='errores'&&e.total===total))).map(e=>e.dur);
  return ts.length?Math.min(...ts):0;
}
function htmlTiempo(perfecto,dur,antes,real){
  if(!dur)return '';
  const marca=!perfecto?'Cuando las aciertes todas, la app guarda tu mejor tiempo.'
    :!antes?'Es tu primera vez con todo bien: esa es tu marca.'
    :dur<antes?'<strong>¡Nueva marca!</strong> La anterior era '+reloj2(antes)+'.'
    :'Tu mejor tiempo con todo bien es '+reloj2(antes)+'.';
  return '<div class="card"><h2>'+IC('reloj')+' Terminaste en '+reloj2(dur)+'</h2>'+
    '<p class="nota">'+marca+'</p>'+
    (real?'<p class="nota">En el concurso, con la misma nota gana quien entrega primero. '+
      'Contesta de una vez lo que sabes, vuelve solo a las dudosas y entrega.</p>':'')+'</div>';
}
function pintaReal(){
  const caja=document.getElementById('ex-real');
  if(!caja)return;
  const id=hojaReal(),ex=EXAMENES_REALES[id];
  if(!ex||examenesCerrados()){caja.innerHTML='';return;}
  const m=mejorTiempo(S.cat,id);
  caja.innerHTML='<div class="card"><h2>'+IC('trofeo')+' El examen real de 2026</h2>'+
    '<p>Las '+ex.preguntas.length+' preguntas del examen de Daniel de '+esc(ex.nombre)+' del 10 de octubre, en el mismo orden. '+
    'El club sacó '+esc(ex.club)+'.</p>'+
    '<p class="nota">Con la misma nota gana quien entrega primero, así que aquí cuenta el reloj.'+
    (m?' Tu mejor tiempo con todo bien: <strong>'+reloj2(m)+'</strong>.':'')+'</p>'+
    '<button class="btn azul" onclick="arrancaExamen(\'real\')">'+IC('reloj')+' Hacer el examen real</button></div>';
}

/* iniciar() sigue siendo la GUARDA y sigue siendo síncrona: decide con lo que
   ya sabe. Quien le da frescura es arrancaExamen(), que es lo que llaman los
   botones: pregunta al servidor y después llama aquí. Separarlos deja la
   cerradura en un solo lugar y mantiene la app probable sin red. */
function iniciar(m){
  /* Guarda de verdad, no cosmética. Aunque un botón quede pintado de antes o
     alguien llame iniciar() por otro camino, aquí se detiene: esconder el botón
     sin esto sería una puerta con letrero y sin cerradura. La evaluación no
     pasa por aquí, y por eso el cierre no la toca. */
  if(examenesCerrados()){ir('examen');pintaExInicio();return;}
  modo=m||'normal';
  /* Se limpia el resultado anterior para que el director no vea la revisión del
     examen pasado, y la evaluación en curso porque este examen no es ella. */
  evalActual=null;ultimoRes=null;
  ir('examen');
  prueba=modo==='real'?armarReal():armar(modo);resp={};entregado=false;
  if(!prueba.length){reinicia();return;}
  marcaVistas(prueba);
  seg=segundosPara(prueba.length);
  t0Ex=Date.now();
  document.getElementById('ex-inicio').style.display='none';
  exCurso(true);
  document.getElementById('ex-result').style.display='none';
  pintaPreguntas();corre();
}

/* Lo que llaman todos los botones. Le pregunta al servidor y luego arranca.
   Si el servidor no contesta, iniciar() decide con lo último conocido. */
async function arrancaExamen(m){
  await srvRefresca();
  iniciar(m);
}

function corre(){
  clearInterval(reloj);
  reloj=setInterval(()=>{
    seg--;
    const e=document.getElementById('reloj');
    if(e){e.textContent=String(Math.floor(seg/60)).padStart(2,'0')+':'+String(seg%60).padStart(2,'0');
      e.className='timer'+(seg<120?' urg':'');}
    if(seg<=0){clearInterval(reloj);entregar();}
  },1000);
}

const ETQ={mc:'Sección I — Selección Múltiple',tf:'Sección II — Verdadero o Falso',fill:'Sección III — Completar el Versículo'};

function pintaPreguntas(){
  let h='',n=1;
  for(const t of ['mc','tf','fill']){
    const qs=prueba.filter(q=>q.t===t);
    if(!qs.length)continue;
    h+='<div class="divisor">'+ETQ[t]+'</div>';
    qs.forEach(q=>{h+=htmlQ(q,n++,false);});
  }
  document.getElementById('preguntas').innerHTML=h;
  const ET={normal:'',simulacro:' · Simulacro',errores:' · Repaso de errores',real:' · Examen real'};
  const NA={todo:'todo el material',biblia:'solo Daniel',pr:'solo Profetas y Reyes'};
  const rangoAct=rangoDe(alcance);
  const alc=modo==='errores'?'mis errores'
    :modo==='real'?'examen de '+((EXAMENES_REALES[hojaReal()]||{}).nombre||'')
    :rangoAct?textoRango(rangoAct)
    :(NA[alcance]||(buscaItem(alcance)||{}).label||'');
  document.getElementById('ex-meta').textContent=prueba.length+' preguntas · '+alc+
    ' · '+(S.nombre||'Estudiante')+(ET[modo]||'');
  cuenta();
}

function htmlQ(q,n,ver){
  let cuerpo='';
  if(q.t==='mc'){
    cuerpo='<div class="ops">'+q.o.map((o,i)=>{
      const L='ABCD'[i];let c='op';
      if(ver){if(i===q.a)c+=' ok';else if(resp[q.id]===i)c+=' ko';}
      else if(resp[q.id]===i)c+=' sel';
      return '<button class="'+c+'"'+(ver?' disabled':'')+' onclick="marca(\''+q.id+'\','+i+')">'+
        '<span class="ol">'+L+'</span>'+esc(o)+'</button>';
    }).join('')+'</div>';
  } else if(q.t==='tf'){
    const r=resp[q.id];let cv='',cf='';
    if(ver){cv=q.a?'ok':(r===true?'ko':'');cf=!q.a?'ok':(r===false?'ko':'');}
    else{cv=r===true?'sel':'';cf=r===false?'sel':'';}
    cuerpo='<div class="vf">'+
      '<button class="'+cv+'"'+(ver?' disabled':'')+' onclick="marca(\''+q.id+'\',true)">'+IC('check')+' Verdadero</button>'+
      '<button class="'+cf+'"'+(ver?' disabled':'')+' onclick="marca(\''+q.id+'\',false)">'+IC('x')+' Falso</button></div>'+
      (ver?'<div class="fb '+(bien(q)?'ok':'ko')+'">'+esc(q.e)+'</div>':'');
  } else {
    const partes=q.p.map((p,i)=>{
      if(!p.b)return '<span>'+esc(p.x)+'</span>';
      const v=resp[q.id+'_'+i]||'';let c='';
      if(ver)c=igual(v,p.b)?'ok':'ko';
      const pista=modo==='simulacro'?'...':esc(p.h||'...');
      return '<input class="'+c+'" type="text" placeholder="'+pista+'" value="'+esc(v)+'"'+
        (ver?' disabled':'')+' oninput="rellena(\''+q.id+'\','+i+',this.value)">';
    }).join('');
    cuerpo='<div style="font-size:.75rem;color:var(--gris);font-style:italic;margin-bottom:.5rem">'+esc(q.ins)+'</div>'+
      '<div class="rell">'+partes+'</div>'+
      (ver?'<div class="fb '+(bien(q)?'ok':'ko')+'">'+(bien(q)?IC('check')+' ¡Correcto!':IC('x')+' Respuesta: '+esc(q.p.filter(p=>p.b).map(p=>p.b).join(' / ')))+'</div>':'');
  }
  const cls=ver?(bien(q)?' hecha':' mal'):(hecha(q)?' hecha':'');
  const voz=!ver&&puedeHablar()?' '+BTN_VOZ:'';
  return '<div class="q'+cls+'" id="c-'+q.id+'"'+(voz?' data-leer="preg"':'')+'><div class="qt"><span class="qn">'+n+'.</span> '+esc(q.q||'')+voz+'</div>'+cuerpo+'</div>';
}

const limpia=s=>String(s).trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/\s+/g,' ');
const igual=(a,b)=>limpia(a)===limpia(b);

function bien(q){
  if(q.t==='mc')return resp[q.id]===q.a;
  if(q.t==='tf')return resp[q.id]===q.a;
  return q.p.every((p,i)=>!p.b||igual(resp[q.id+'_'+i]||'',p.b));
}
function hecha(q){
  if(q.t==='fill')return q.p.some((p,i)=>p.b&&(resp[q.id+'_'+i]||'').trim());
  return resp[q.id]!==undefined;
}

function marca(id,v){
  if(entregado)return;
  resp[id]=v;
  const q=prueba.find(x=>x.id===id),n=prueba.indexOf(q)+1;
  const el=document.getElementById('c-'+id);
  if(el)el.outerHTML=htmlQ(q,posicion(q),false);
  cuenta();
}
function rellena(id,i,v){if(entregado)return;resp[id+'_'+i]=v;cuenta();}

function posicion(q){
  let n=1;
  for(const t of ['mc','tf','fill'])
    for(const x of prueba.filter(y=>y.t===t)){if(x.id===q.id)return n;n++;}
  return n;
}

function cuenta(){
  const a=prueba.filter(hecha).length,n=prueba.length;
  const e=document.getElementById('contador');
  if(e)e.textContent=a+' de '+n+' respondidas';
  /* La barra pegada arriba lleva el mismo avance: quien va en la 9 sabe
     cuántas le faltan sin bajar hasta el botón de entregar. */
  const r=document.getElementById('ex-resp'),pb=document.getElementById('ex-prog'),pi=document.getElementById('ex-prog-i');
  if(r)r.textContent=a+' de '+n;
  if(pb){pb.setAttribute('aria-valuemax',n);pb.setAttribute('aria-valuenow',a);}
  if(pi)pi.style.width=(n?Math.round(a/n*100):0)+'%';
}

/* Modo concentración: mientras hay un examen en curso no se ve nada más que
   el examen. Antes, el filtro de estudio y el bloque del director quedaban
   arriba y la primera opción arrancaba en la mitad baja de la pantalla. */
function exCurso(on){
  document.getElementById('ex-curso').style.display=on?'block':'none';
  document.body.classList.toggle('ex-activo',!!on);
}

function entregar(){
  /* v146: sin preguntas no hay examen que guardar. Se guardaba un 0/0 que el
     historial mostraba como «NaN%» si algo llamaba entregar() antes de que el
     examen terminara de armarse (arrancaExamen espera al servidor). */
  if(entregado||!prueba.length)return;
  entregado=true;clearInterval(reloj);
  const pts=prueba.filter(bien).length,tot=prueba.length,pct=Math.round(pts/tot*100);
  const catReg=S.cat;
  const nvReg=modo==='evaluacion'&&evalActual&&evalActual.nivel?evalActual.nivel:nivelEfectivo();
  const dur=Math.max(1,Math.round((Date.now()-(t0Ex||Date.now()))/1000));
  const exReg=modo==='real'?hojaReal():'';
  /* La marca se calcula ANTES de guardar este examen: si es el mejor, se
     compara contra los anteriores, no contra sí mismo. */
  const antes=mejorTiempo(catReg,exReg,tot);
  S.examenes.push({pts,total:tot,cat:catReg,fecha:new Date().toISOString(),modo,nv:nvReg,dur,...(exReg?{ex:exReg}:{})});
  /* Registro por pregunta y por capítulo: alimenta «mis errores»,
     el panel de puntos débiles y la repetición espaciada. */
  for(const q of prueba){
    const k=claveQ(q);
    if(bien(q)){delete S.fq[k];}
    else S.fq[k]={m:Math.min(99,((S.fq[k]||{}).m||0)+1)};
    const a=S.acc[q.cap]||{b:0,m:0};
    if(bien(q))a.b++;else a.m++;
    S.acc[q.cap]=a;
    const at=S.act[q.t]||{b:0,m:0};
    if(bien(q))at.b++;else at.m++;
    S.act[q.t]=at;
  }
  revisaInsignias(pct);sumaRacha();guardar();
  /* v148: aprobar (75 % o más, medalla de plata u oro) se celebra. Oro, con
     fuegos; plata, con confeti. Por debajo no: 60 % es «buen intento». */
  if(pct>=75)festeja(pct>=93?'fuegos':'confeti',pct>=93?'¡Excelente! '+pct+' %':'¡Aprobado! '+pct+' %');
  festejaRacha(pct>=75?2800:0);

  const s3=['mc','tf','fill'].map(t=>{
    const qs=prueba.filter(q=>q.t===t);
    if(!qs.length)return '';
    const L={mc:'Múltiple',tf:'V o F',fill:'Completar'}[t];
    return '<div><div class="sv">'+qs.filter(bien).length+'/'+qs.length+'</div><div class="sl">'+L+'</div></div>';
  }).join('');

  const med=pct>=60?IC('medalla','med '+(pct>=93?'oro':pct>=75?'plata':'bronce')):IC('libro','med');
  const msg=pct>=93?'¡Excelente! Dominas el material.':pct>=75?'¡Muy bien! Repasa lo que falló.':pct>=60?'Buen intento. Vuelve al material.':'Estudia la guía y vuelve a intentarlo.';

  /* La nota al servidor. Con la evaluación va su id, y el índice único de la
     base garantiza que cada participante la haga una sola vez, en el aparato
     que sea. Eso es lo que la versión con links no podía cumplir. */
  srvIntento(modo,modo==='evaluacion'&&evalActual?evalActual.id:null,pts,tot,respuestasDe(prueba));
  if(modo==='evaluacion'){evalHecha=true;evalNota={pts,total:tot};try{pintaEvaluacion();}catch(e){}}
  try{pintaSenales();}catch(e){}

  ultimoRes={pts,tot,pct,med,msg,s3,dur,antes,real:!!exReg};
  exCurso(false);
  pintaResultado();
}

/* Resultado del examen que acabó, guardado para poder re-pintar la pantalla
   cuando el director entra su clave, sin volver a calificar. */
let ultimoRes=null;

function htmlRevision(){
  let rev='',n=1;
  for(const t of ['mc','tf','fill']){
    const qs=prueba.filter(q=>q.t===t);
    if(!qs.length)continue;
    rev+='<div class="divisor" style="font-size:.75rem;margin:.8rem 0 .5rem">'+ETQ[t]+'</div>';
    qs.forEach(q=>{rev+=htmlQ(q,n++,true);});
  }
  return rev;
}

function pintaResultado(){
  if(!ultimoRes)return;
  const {pts,tot,pct,med,msg,s3,dur,antes,real}=ultimoRes;
  const ver=revelaRespuestas();
  const r=document.getElementById('ex-result');
  r.style.display='block';
  r.innerHTML=
    '<div class="res"><div style="font-size:2.25rem">'+med+'</div>'+
    '<div class="pt">'+pts+'<span style="font-size:1.75rem;opacity:.7">/'+tot+'</span></div>'+
    '<div style="opacity:.9;margin-top:.3rem">'+pct+'% · '+msg+'</div>'+
    '<div class="sec3">'+s3+'</div></div>'+
    htmlTiempo(pts===tot,dur,antes,real)+
    (ver
      ?'<div class="card"><h2>'+IC('lista')+' Revisión</h2>'+htmlRevision()+
       (director?'<p class="nota">Estás viendo esto como <strong>director</strong>. '+
        '<button class="btn gho" onclick="salirDirector()">Salir del modo director</button></p>':'')+
       '</div>'
      :'<div class="card"><h2>'+IC('candado')+' La revisión está cerrada</h2>'+
       '<p class="nota">Esto fue un <strong>simulacro</strong>: queda la nota, no '+
       'las respuestas. El examen del campamento funciona igual. Para ver qué '+
       'falló, el director entra su clave en este mismo aparato.</p>'+
       '<div id="dir-caja"></div>'+
       '<button class="btn gho" style="margin-top:.7rem" onclick="pideClaveDir(\'res\')">'+IC('llave')+' Soy el director</button>'+
       '</div>')+
    '<div style="display:flex;gap:.7rem;flex-wrap:wrap">'+
    (ver&&falladasDe().length>=3?'<button class="btn azul" onclick="arrancaExamen(\'errores\')">'+IC('repetir')+' Repasar mis errores ('+falladasDe().length+')</button>':'')+
    '<button class="btn nar" onclick="reinicia()">'+IC('repetir')+' Otro examen</button>'+
    '<button class="btn tono" onclick="ir(\'estudio\')">'+IC('libro')+' Estudiar</button>'+
    '<button class="btn txt" onclick="ir(\'logros\')">'+IC('trofeo')+' Logros</button></div>';
  window.scrollTo({top:0,behavior:'smooth'});
}

/* Qué se hace después de entrar la clave: 'res' vuelve a pintar el resultado
   con la revisión abierta. */
let trasDir='res';

/* Caja de clave dentro de la pantalla, no prompt() del navegador: en iPhone el
   teclado tapa el prompt y no se ve lo que se escribe. */
const CAJAS_DIR=['dir-caja','dir-caja-ex'];

function pideClaveDir(que,caja){
  trasDir=que||'res';
  /* Hay dos cajas de clave en el documento (la del resultado y la de la pantalla
     de Examen) y el input siempre se llama igual. Se limpian las dos antes de
     abrir una, o getElementById encuentra el input de la otra y la clave se
     escribe en un campo que nadie está viendo. */
  for(const id of CAJAS_DIR){const e=document.getElementById(id);if(e)e.innerHTML='';}
  const c=document.getElementById(caja||'dir-caja');
  if(!c)return;
  c.innerHTML='<input id="dir-clave" type="password" class="clave-dir" '+
    'placeholder="Clave del director" autocomplete="off" '+
    'onkeydown="if(event.key===\'Enter\')entraDirector()">'+
    '<div id="dir-msg" class="nota"></div>'+
    '<button class="btn nar" style="margin-top:.5rem" onclick="entraDirector()">Entrar</button>';
  const i=document.getElementById('dir-clave');
  if(i)i.focus();
}

function entraDirector(){
  const i=document.getElementById('dir-clave');
  if(!i)return;
  activaDirector(i.value).then(err=>{
    const m=document.getElementById('dir-msg');
    if(err){if(m)m.innerHTML='<span style="color:var(--rojo-txt)">'+esc(err)+'</span>';return;}
    if(trasDir==='evento'){
      /* La clave se usó para el interruptor, no para ver respuestas: se apaga el
         perfil director de una, para no dejar abierto el celular de la niña. El
         orden importa, porque examenesCerrados() mira `director`. */
      alternaEvento();
      director=false;
      try{sessionStorage.removeItem('cb-dir');}catch(e){}
      ir('examen');
      pintaExInicio();
      return;
    }
    pintaResultado();
  });
}

/* Salir de un examen en curso sin entregarlo. No hace falta avisarle al
   servidor: nada queda guardado hasta «Entregar», así que cancelar es tan
   simple como volver al inicio. Antes la única forma de salir de una
   evaluación de prueba era refrescar la página entera. */
function cancelaExamen(){
  clearInterval(reloj);
  reinicia();
}

function reinicia(){
  clearInterval(reloj);
  entregado=false;resp={};prueba=[];evalActual=null;
  document.getElementById('ex-inicio').style.display='block';
  exCurso(false);
  document.getElementById('ex-result').style.display='none';
  pintaExInicio();
}

const TODAS=[
  {k:'Perfecto',i:'trofeo',d:'100% en un examen'},
  {k:'Casi perfecto',i:'medalla',d:'93% o más'},
  {k:'Estudioso',i:'birrete',d:'75% o más'},
  {k:'Persistente',i:'repetir',d:'3 exámenes hechos'},
  {k:'Racha de fuego',i:'fuego',d:'3 días seguidos'},
  {k:'Lector completo',i:'libro',d:'Todos los capítulos y repasos estudiados'},
  {k:'Memoria de acero',i:'tarjetas',d:'Un mazo de tarjetas completo'},
];
function revisaInsignias(pct){
  const a=k=>{if(!S.insignias.includes(k))S.insignias.push(k);};
  if(pct===100)a('Perfecto');
  if(pct>=93)a('Casi perfecto');
  if(pct>=75)a('Estudioso');
  /* Filtrado por categoría: «tres exámenes» quiere decir tres de ESTE material.
     Sin el filtro, una ficha que hubiera cambiado de actividad estrenaba la
     insignia con exámenes de la otra. */
  if(S.examenes.filter(e=>e.cat===S.cat).length>=3)a('Persistente');
  if(S.racha>=3)a('Racha de fuego');
  if([...capsDe(),...modsAvance()].every(x=>S.prog[x.id]>=100))a('Lector completo');
}

function pintaLogros(){
  pintaApariencia();
  /* Puntos débiles: % de acierto por capítulo con lo respondido en
     exámenes. Ordena del más flojo al más fuerte para dirigir el
     estudio a donde duele. */
  const filas=capsVista()
    .map(c=>({c,a:S.acc[c.id]||{b:0,m:0}}))
    .filter(x=>x.a.b+x.a.m>0)
    .map(x=>({...x,pct:Math.round(x.a.b/(x.a.b+x.a.m)*100)}))
    .sort((p,q)=>p.pct-q.pct);
  document.getElementById('debiles').innerHTML=htmlPorLibro()+(filas.length
    ?filas.map(x=>
      '<div style="display:flex;align-items:center;gap:.7rem;margin:.45rem 0">'+
      '<button class="btn gho" style="min-height:34px;padding:.2rem .7rem;font-size:.75rem" onclick="verCap(\''+x.c.id+'\')">'+esc(x.c.label)+'</button>'+
      '<div class="prog-lin" style="flex:1;margin:0"><div style="width:'+x.pct+'%;background:'+(x.pct<60?'var(--rojo)':x.pct<85?'var(--naranja)':'var(--verde)')+'"></div></div>'+
      '<span style="font-size:.75rem;font-weight:700;width:44px;text-align:right;color:'+(x.pct<60?'var(--rojo)':'var(--azul)')+'">'+x.pct+'%</span></div>').join('')+
      '<p class="nota">Con base en '+filas.reduce((s,x)=>s+x.a.b+x.a.m,0)+' respuestas de examen. '+
      'Toca un capítulo para estudiarlo, o <button class="btn gho" style="min-height:30px;padding:.1rem .6rem;font-size:.75rem" '+
      'onclick="examenDelCapitulo(\''+filas[0].c.id+'\')">examina el más flojo</button>.</p>'
    :'<p class="nota">Haz un examen y aquí verás en qué capítulos estás fallando.</p>');

  /* Por TIPO de pregunta. Es el dato que dice qué hay que practicar, no solo
     qué hay que leer: si completar va en rojo, el problema es memorización
     literal y las tarjetas de versículo clave son la respuesta. */
  const TIPOS=[['mc','Selección múltiple','Sección I'],['tf','Verdadero o falso','Sección II'],
               ['fill','Completar el versículo','Sección III']];
  const porTipo=TIPOS.map(([t,nom,sec])=>({t,nom,sec,a:S.act[t]||{b:0,m:0}}))
    .filter(x=>x.a.b+x.a.m>0)
    .map(x=>({...x,pct:Math.round(x.a.b/(x.a.b+x.a.m)*100)}));
  const dt=document.getElementById('debiles-tipo');
  if(dt)dt.innerHTML=porTipo.length
    ?porTipo.map(x=>
      '<div style="display:flex;align-items:center;gap:.7rem;margin:.45rem 0">'+
      '<span style="font-size:.75rem;font-weight:700;width:96px;color:var(--azul)">'+esc(x.sec)+'</span>'+
      '<div class="prog-lin" style="flex:1;margin:0"><div style="width:'+x.pct+'%;background:'+
        (x.pct<60?'var(--rojo)':x.pct<85?'var(--naranja)':'var(--verde)')+'"></div></div>'+
      '<span style="font-size:.75rem;font-weight:700;width:44px;text-align:right;color:'+
        (x.pct<60?'var(--rojo)':'var(--azul)')+'">'+x.pct+'%</span></div>'+
      '<p class="nota" style="margin:0 0 .5rem">'+esc(x.nom)+' · '+(x.a.b+x.a.m)+' respondidas</p>').join('')+
      (porTipo.some(x=>x.t==='fill'&&x.pct<70)
        ?'<div class="warn-box">Completar el versículo es la sección que decide el examen. '+
         'Repasa las <strong>tarjetas de versículo clave</strong> y vuelve a intentar.</div>':'')
    :'<p class="nota">Aquí verás si fallas más en múltiple, en verdadero o falso, o en completar.</p>';

  document.getElementById('insignias').innerHTML=TODAS.map(b=>{
    const t=S.insignias.includes(b.k);
    return '<span class="ins '+(t?'oro':'gris')+'" title="'+esc(b.d)+'">'+IC(b.i)+' '+esc(b.k)+'</span>';
  }).join('')+'<p class="nota">'+S.insignias.length+' de '+TODAS.length+' conseguidas.</p>';

  const h=S.examenes.slice().reverse();
  document.getElementById('historial').innerHTML=h.length
    ?'<div class="tabla-scroll"><table class="info-table"><thead><tr><th>Fecha</th><th>Categoría</th><th>Puntaje</th></tr></thead><tbody>'+
     h.map(e=>{
       const f=new Date(e.fecha);
       const fs=isNaN(f)?'—':f.toLocaleDateString('es-CO',{day:'2-digit',month:'short'})+' '+f.toLocaleTimeString('es-CO',{hour:'2-digit',minute:'2-digit'});
       /* La evaluación se marca aparte. El director necesita distinguirla de un
          examen que la participante armó sola, porque solo la evaluación es
          comparable entre dos niñas: es el mismo examen el mismo día.
          Van como texto y no como emoji: un emoji lo dibuja el sistema y se ve
          distinto en cada aparato. */
       const mt={simulacro:' · simulacro',errores:' · repaso',evaluacion:' · evaluación',compartido:' · evaluación',real:' · examen real'}[e.modo]||'';
       /* v176: cuánto tardó, que con nota igual es lo que desempata. */
       const dt=e.dur?' · '+reloj2(e.dur):'';
       return '<tr><td class="key">'+fs+'</td><td>'+((CATS[e.cat]||CATS.av).nombre)+mt+dt+'</td><td><strong>'+e.pts+'/'+e.total+'</strong> ('+Math.round(e.pts/e.total*100)+'%)</td></tr>';
     }).join('')+'</tbody></table></div>'
    :'<p class="nota">Todavía no has hecho ningún examen.</p>';
}

async function borrarTodo(){
  if(!await preguntaApp('¿Borrar todo lo de este navegador?',
    'Se borra el progreso de TODOS los participantes de este aparato.','Borrar todo',true))return;
  try{localStorage.removeItem(CLAVE);localStorage.removeItem(CLAVE_VIEJA);}catch(e){}
  DB=normalizarDB(null);S=DB.alumnos[DB.activo];guardar();
  marcaCat();ir('inicio');
}

/* ───────── imprimir y guardar en PDF ───────── */
/* MECANISMO
   No se genera el PDF con una librería. Se arma un documento HTML completo
   (fuente/imprimible.js, el mismo render que usa tools/imprimir.js), se
   mete en un iframe oculto y se llama a print() sobre ese iframe. El motor
   de impresión del navegador es el que pagina: @page pone tamaño carta y
   márgenes, y page-break-inside evita que una pregunta quede partida entre
   dos hojas. El diálogo de impresión de cualquier sistema trae «Guardar
   como PDF», así que el PDF sale del mismo camino que el papel.

   POR QUÉ EN UN IFRAME Y NO EN LA MISMA PÁGINA
   La app tiene sus propios estilos de pantalla. Imprimiéndola directo
   habría que apagarlos uno por uno con @media print y cada estilo nuevo
   podría dañar el impreso. El iframe es un documento aparte: solo tiene el
   CSS del examen, así que lo que se ve en el papel no depende de la app.

   POR QUÉ NO UNA LIBRERÍA DE PDF
   Sumaría cientos de kilobytes al archivo único, tocaría reimplementar la
   paginación a mano, y el resultado tipográfico es peor en un documento de
   puro texto. Lo que se pierde: no se puede fijar el nombre del archivo ni
   generar el PDF sin que el usuario pase por el diálogo. */

let ifrImpr=null;

function imprimeDoc(html,titulo){
  try{
    if(ifrImpr&&ifrImpr.parentNode)ifrImpr.parentNode.removeChild(ifrImpr);
    ifrImpr=document.createElement('iframe');
    ifrImpr.setAttribute('title',titulo||'Examen para imprimir');
    ifrImpr.style.cssText='position:fixed;right:0;bottom:0;width:0;height:0;border:0;opacity:0';
    /* El iframe dispara onload dos veces: primero por el about:blank con que
       nace y después por el srcdoc. Sin esta bandera saldrían dos diálogos de
       impresión, y el primero sobre un documento en blanco. */
    let yaImprimio=false;
    ifrImpr.onload=()=>{
      if(yaImprimio)return;
      const w=ifrImpr.contentWindow;
      if(!w||!w.document||!w.document.body||!w.document.body.innerHTML)return;
      yaImprimio=true;
      try{w.focus();w.print();}catch(e){avisoImpr(html);}
    };
    ifrImpr.srcdoc=html;
    document.body.appendChild(ifrImpr);
    return true;
  }catch(e){avisoImpr(html);return false;}
}

/* Salida de emergencia. En iPhone y iPad el print() sobre un iframe no
   siempre abre el diálogo; con el documento en una pestaña aparte se
   imprime desde Compartir → Imprimir. */
function avisoImpr(html){
  try{
    const b=new Blob([html],{type:'text/html'});
    const u=URL.createObjectURL(b);
    const c=document.getElementById('impr-alt');
    if(c)c.innerHTML='<p class="nota">Si no se abrió el cuadro de impresión, '+
      '<a href="'+u+'" target="_blank" rel="noopener"><strong>abre el examen en otra pestaña</strong></a> '+
      'y usa Compartir → Imprimir.</p>';
  }catch(e){}
}

/* Los datos que el render necesita de la categoría actual. */
const etiqImpr=c=>CATS[c].nombre+' · '+CATS[c].edad;

/* Una hoja con la selección que esté armada en el menú de arriba: mismo
   alcance, misma cantidad, mismo nivel que el examen que haría en pantalla. */
function hojaActual(conR){
  const sel=armar('normal');
  if(!sel.length)return null;
  return hojaExamen({sel,cat:S.cat,conR,logo:LOGO_TL,caps:CAPS,
    etiqueta:etiqImpr(S.cat),alcance:textoAlcanceImpr()});
}

/* Alcance en palabras, para el encabezado del impreso. */
function textoAlcanceImpr(){
  if(alcance==='todo')return CAT().alcance;
  if(alcance==='biblia')return 'Solo el libro de '+nombreBiblia();
  if(alcance==='pr')return 'Solo Profetas y Reyes';
  if(alcance==='creencias')return 'En esto creemos — las 28 creencias';
  if(alcance==='q1')return 'Del 1 al 15 de octubre';
  if(alcance==='q2')return 'Del 16 en adelante';
  if(clavesDe(alcance))return 'Las preguntas que más costaron en la evaluación';
  const L=listaDe(alcance);
  if(L)return textoLista(L);
  const r=rangoDe(alcance);
  if(r)return textoRango(r);
  const c=CAPS.find(x=>x.id===alcance);
  return c?c.label+' — '+c.sub:CAT().alcance;
}

function imprimeExamen(conR){
  const h=hojaActual(!!conR);
  if(!h){alertaImpr('No hay preguntas con esta selección.');return;}
  const t=(conR?'Clave — ':'Examen — ')+etiqImpr(S.cat);
  imprimeDoc(docExamen([h],t,conR
    ?'Clave de respuestas. En el cuadro de impresión escoge «Guardar como PDF» si lo quieres en archivo.'
    :'Examen para imprimir. En el cuadro de impresión escoge «Guardar como PDF» si lo quieres en archivo.'),t);
}

/* TODAS las categorías en un solo documento, cada una en su hoja. Cambia la
   categoría activa, arma, y la devuelve como estaba: el progreso guardado no
   se toca porque armar() solo lee.
   Decía «las seis» en el botón y en el título: son ocho desde que «En esto
   creemos» trajo ec1 y ec2. El bucle siempre recorrió Object.keys(CATS), así
   que el número estaba solo en el texto, que es donde envejece sin avisar. */
function imprimeTodos(conR){
  const prevCat=S.cat,prevAl=alcance,prevN=nivel,prevC=cuantas;
  const hojas=[];
  try{
    for(const c of Object.keys(CATS)){
      S.cat=c;alcance='todo';nivel=CATS[c].techo;cuantas=CATS[c].n;
      const sel=armar('normal');
      if(!sel.length)continue;
      hojas.push(hojaExamen({sel,cat:c,conR:!!conR,logo:LOGO_TL,caps:CAPS,
        etiqueta:etiqImpr(c),alcance:CATS[c].alcance}));
    }
  }finally{S.cat=prevCat;alcance=prevAl;nivel=prevN;cuantas=prevC;}
  if(!hojas.length){alertaImpr('No se pudo armar ningún examen.');return;}
  const t=conR?'Claves de todas las categorías':'Exámenes de todas las categorías';
  imprimeDoc(docExamen(hojas,t,hojas.length+' exámenes, uno por categoría, cada uno en su hoja.'+
    (conR?' Contiene las respuestas: solo para líderes.':'')),t);
  pintaMenuEx();
}

function alertaImpr(msj){
  const c=document.getElementById('impr-alt');
  if(c)c.innerHTML='<p class="nota" style="color:var(--rojo-txt)">'+esc(msj)+'</p>';
}

/* ───────── logo de la iglesia ───────── */
/* El data URI vive en una constante y se asigna aquí, no en el HTML: así
   ninguna línea del archivo generado pasa de 2.000 caracteres. */
/* La clase en el body permite que los estilos suban un punto el tamaño de
   letra en Aventureros, sin duplicar pantallas. */
function marcaCat(){
  try{document.body.className=S.cat+' '+(CAT().edad==='4 a 6 años'?'me':CAT().edad==='7 a 9 años'?'av':'gm');}catch(e){}
}

function pintaLogo(){
  try{document.querySelectorAll('.logo-tl').forEach(i=>{i.src=LOGO_TL;});}catch(e){}
}

/* ───────── la evaluación del día ─────────
   QUÉ ES ESTA APP, PORQUE DE AHÍ SALE TODO EL DISEÑO
   Esta no es la app del campamento. Es la de preparación: cada sábado, o el
   día que el director escoja, se mide el avance con un simulacro que solo está
   disponible ESE día. El resto de la semana se practica libremente y con las
   respuestas a la vista, que es como se aprende.

   MECANISMO
   El director abre la evaluación desde su panel. El servidor genera la semilla
   y guarda la receta: alcance, cuántas preguntas, nivel. Cada participante que
   entró con su código pide esa receta y su aparato arma el examen. Como el
   banco está ordenado igual en todas partes y la mezcla usa un generador con
   semilla (prng), la misma receta produce las mismas preguntas en el mismo
   orden. La categoría NO viaja en la receta a propósito: cada niña contesta
   sobre el material de su categoría, y aun así es "el mismo examen" para las
   de su grupo.

   POR QUÉ SE FUE EL LINK
   Hasta v22 esto se hacía con un link que llevaba la receta adentro y se
   mandaba por WhatsApp a la hora exacta. Ese link era una muleta para no tener
   servidor: sin reloj confiable, el control de acceso tenía que ser «cuándo lo
   mando». Con base de datos el control es «está abierta o no», que es lo que
   el director ya tenía en la cabeza. Se fueron con el link: copiar y pegar,
   liberar un link gastado, el interruptor por aparato, y que agregar preguntas
   invalidara los links viejos.

   UNA VEZ POR PERSONA, DE VERDAD
   El índice único (participante, evaluación) vive en la base. No es una
   promesa del navegador: una segunda ficha en otro celular tampoco la repite. */

/* Huella del banco: si cambia el contenido, cambia la huella. Sirve para saber
   si una evaluación se armó con otra versión del material. */
const huellaBanco=()=>hashTxt(BANCO.length+'|'+BANCO.map(q=>q.cap).join(''));

/* La evaluación que el servidor tiene abierta, o null. La semilla la genera el
   SERVIDOR, nunca este aparato: así el examen es idéntico para todas y nadie
   puede adivinarlo antes de que se abra. */
let evalPend=null;   // la que se puede hacer ahora
let evalActual=null; // la que se está contestando
let evalHecha=false; // ya la hizo esta participante

async function cargaEvaluacion(){
  if(!srvYo||srvYo.rol!=='participante'){evalPend=null;pintaEvaluacion();return;}
  try{
    const d=await srvFetch('/evaluacion');
    evalPend=d&&d.evaluacion?d.evaluacion:null;
    evalHecha=!!(d&&d.hecha);
    evalNota=d&&d.hecha?{pts:d.nota,total:d.total}:null;
    /* Este endpoint sí sabe quién soy, así que es el que decide si a MÍ me
       cierra la práctica. /estado no puede: es público y no sabe mi categoría. */
    if(evalPend)srvGuarda(false,evalPend.id,evalPend.titulo);
    else if(d&&d.noMeToca)srvGuarda(true,null,null);
  }catch(e){evalPend=null;}
  pintaEvaluacion();
}

let evalNota=null;

function pintaEvaluacion(){
  const d=document.getElementById('cb-eval');
  if(!d)return;
  if(!evalPend){d.innerHTML='';return;}
  if(evalHecha){
    d.innerHTML='<div class="card eval hecha"><div class="ev-t">'+esc(evalPend.titulo)+'</div>'+
      '<p class="nota">Ya la hiciste'+(evalNota&&evalNota.total?': <strong>'+evalNota.pts+'/'+evalNota.total+'</strong>':'')+
      '. Para ver qué fallaste, el director entra su clave.</p></div>';
    return;
  }
  d.innerHTML='<div class="card eval"><div class="ev-t">'+esc(evalPend.titulo)+'</div>'+
    '<p class="nota">'+evalPend.cuantas+' preguntas. Se hace <strong>una sola vez</strong> '+
    'y al final sale la nota, no las respuestas.</p>'+
    '<button class="btn nar ex-go" onclick="haceEvaluacion()">Hacer la evaluación</button></div>';
}

/* Arma la evaluación con la receta del servidor. El alcance, el nivel y la
   cantidad se aplican solo para armar y se devuelven como estaban: la
   evaluación no toca la configuración del participante. */
function haceEvaluacion(){
  if(!evalPend||evalHecha)return;
  /* v156: la evaluacion es de la persona de la sesion y se arma con SU
     categoria. Si esta en su otra actividad (ver esMiOtraActividad), primero
     se pasa a su ficha; el arranque ya no lo hace por ella. */
  if(srvYo&&srvYo.rol==='participante'&&!fichaEsDeLaSesion())adoptaFicha(srvYo);
  const r=evalPend;
  const prev={a:alcance,n:nivel,q:cuantas,f:soloFuente,fa:soloFuenteAct,r:retiradas};
  let sel=[];
  try{
    /* EL NIVEL TIENE QUE SER DETERMINISTA.
       nivelEfectivo() es `nivel || nivelRecomendado()`, y nivelRecomendado()
       mira el historial LOCAL. Con nivel 0 en la receta, dos niñas de la misma
       categoría y distinto desempeño recibían pools distintos: el director
       comparaba notas de exámenes que no eran el mismo. Cuando el director no
       fija nivel, se usa el techo de la categoría, que es igual para todas. */
    alcance=r.alcance||'todo';nivel=r.nivel||CAT().techo;cuantas=r.cuantas;
    soloFuente=!!r.solo_fuente;soloFuenteAct=ACT_DE(S.cat);
    /* LAS RETIRADAS DE LA RECETA, NO LAS DE AHORA. La receta trae la lista tal
       como estaba cuando el director abrio la evaluacion. Si se usara la de
       ahora, retirar una pregunta a media mañana le cambiaria el examen a la
       que todavia no lo ha hecho, y dos notas de la misma semilla dejarian de
       ser comparables. */
    if(Array.isArray(r.retiradas))retiradas=new Set(r.retiradas);
    rndEx=prng(Number(r.semilla)>>>0);
    sel=armar('normal');
  }finally{
    rndEx=Math.random;alcance=prev.a;nivel=prev.n;cuantas=prev.q;soloFuente=prev.f;soloFuenteAct=prev.fa;
    retiradas=prev.r;
  }
  /* Antes, si la receta no daba preguntas para esta participante, el botón no
     hacía nada y parecía que la app estuviera trabada. Pasa cuando el director
     abre una evaluación de un material que esta categoría no tiene cargado. */
  if(!sel.length){
    const d=document.getElementById('cb-eval');
    if(d)d.innerHTML='<div class="card eval"><div class="ev-t">'+esc(r.titulo)+'</div>'+
      '<p class="nota">Esta evaluación es de un material que <strong>tu categoría no '+
      'tiene</strong>, así que no se puede armar. Avísale al director.</p></div>';
    return;
  }
  evalActual=r;
  modo='evaluacion';prueba=sel;resp={};entregado=false;ultimoRes=null;
  marcaVistas(prueba);
  seg=segundosPara(prueba.length);
  ir('examen');
  document.getElementById('ex-result').style.display='none';
  document.getElementById('ex-inicio').style.display='none';
  exCurso(true);
  pintaPreguntas();corre();
  window.scrollTo({top:0});
}

/* ───────── manual dentro de la app ─────────
   MECANISMO
   El texto vive en fuente/manual.js y llega al HTML como datos, igual que los
   capítulos. Las cifras no están escritas en el texto: van como marcas
   {ENTRE_LLAVES} que se reemplazan al pintar con los datos del participante
   activo. Así el manual dice «tienes 57 tarjetas» y no «hay muchas tarjetas»,
   y si el banco crece el manual crece con él.

   POR QUÉ REEMPLAZO Y NO TEXTO FIJO
   Un manual con cifras escritas a mano se desactualiza en el primer cambio de
   contenido, y nadie se acuerda de corregirlo. Estas marcas fallan de forma
   visible si alguien escribe una que no existe, en vez de mentir en silencio. */

let ayGrupoAct='estudia';

function marcasManual(){
  return {
    CAPS_CAT:String(capsDe().length),
    MODS_CAT:String(modsDe().length),
    TJ_CAT:String(tarjetasDe().length),
    BANCO_CAT:String(bancoDe().length),
    BANCO_TOTAL:String(BANCO.length),
    TJ_TOTAL:String(TARJETAS.length),
    CAT_NOMBRE:esc(CAT().nombre),
    CAT_EV:esc(ACT().nombre),
    TABLA_CATS:tablaCats(),
    /* La CUENTA de categorías también es una cifra, así que va como marca.
       Estaba escrita a mano en dos sitios del manual, decía «seis» y son ocho
       desde que entró «En esto creemos». Escrita a mano se desactualiza en el
       primer cambio y nadie se acuerda. */
    N_CATS:String(Object.keys(CATS).length),
    N_ACTS:String(Object.keys(ACTIVIDADES).length),
  };
}

/* Tabla de las categorías, con el conteo real de cada una. Se calcula
   cambiando S.cat temporalmente porque bancoDe() lee la categoría activa. */
function tablaCats(){
  const prev=S.cat;
  let filas='';
  try{
    for(const k of Object.keys(CATS)){
      S.cat=k;
      const c=CATS[k];
      filas+='<tr><td class="key">'+esc(c.nombre)+'</td><td>'+esc(c.edad)+
        '</td><td>'+esc((ACTIVIDADES[c.act]||{}).nombre||'')+'</td><td>'+esc(c.alcance)+'</td>'+
        '<td style="text-align:center">'+bancoDe().length+'</td></tr>';
    }
  }finally{S.cat=prev;}
  /* Cinco columnas no caben en un celular: va envuelta para que scrollee ella
     sola en vez de empujar la pantalla. */
  return '<div class="tabla-scroll"><table class="info-table">'+
    '<thead><tr><th>Categoría</th><th>Edad</th>'+
    '<th>Evento</th><th>Alcance</th><th>Preg.</th></tr></thead><tbody>'+
    filas+'</tbody></table></div>';
}

const aplicaMarcas=(txt,m)=>String(txt).replace(/\{([A-Z_]+)\}/g,
  (todo,k)=>m[k]!==undefined?m[k]:todo);
/* LAS MARCAS TAMBIEN VALEN EN EL TITULO Y EN EL SUBTITULO de cada seccion.
   Antes solo se reemplazaban en el cuerpo, asi que una cifra puesta en el
   titulo se pintaba literal, «Las {N_CATS} categorias», y eso es peor que la
   cifra escrita a mano: se ve roto. Se descubrio justo al mover «seis» a una
   marca. */
const tituloManual=(x,m)=>aplicaMarcas(x.t,m);
const subManual=(x,m)=>aplicaMarcas(x.d,m);

function pintaAyuda(){
  const m=marcasManual();
  const lista=MANUAL.filter(x=>x.para===ayGrupoAct);
  document.getElementById('ay-lista').innerHTML=lista.map(x=>
    '<details class="card ay-item"><summary>'+
    '<span class="ay-ic">'+x.icono+'</span>'+
    '<span class="ay-tx"><b>'+esc(tituloManual(x,m))+'</b><small>'+esc(subManual(x,m))+'</small></span>'+
    '</summary><div class="det-cuerpo">'+
    x.secs.map(s=>'<h4 class="ay-h">'+esc(s.t)+'</h4>'+aplicaMarcas(s.h,m)).join('')+
    '</div></details>').join('');
  document.getElementById('ay-t1').className=ayGrupoAct==='estudia'?'on':'';
  document.getElementById('ay-t2').className=ayGrupoAct==='director'?'on':'';
}

function ayGrupo(g){ayGrupoAct=g;pintaAyuda();window.scrollTo({top:0});}

/* El manual también en papel, generado desde la app: no hay un PDF aparte que
   pueda quedar describiendo una versión vieja. */
function imprimeManual(){
  const m=marcasManual();
  const grupos=[['estudia','PARA QUIEN ESTUDIA'],['director','PARA EL DIRECTOR']];
  const hojas=grupos.map(([g,tit])=>hojaGuia({
    caps:MANUAL.filter(x=>x.para===g).map(x=>({
      id:x.id, label:x.icono+' '+tituloManual(x,m), sub:subManual(x,m), src:'',
    })),
    contenido:Object.fromEntries(MANUAL.filter(x=>x.para===g)
      .map(x=>[x.id,x.secs.map(s=>({t:s.t,h:aplicaMarcas(s.h,m)}))])),
    modulos:[], contModulos:{}, logo:LOGO_TL,
    titulo:'CÓMO SE USA LA APP',
    sub:tit,
    meta:'Conexión Bíblica y Devoción Matutina · Club de Aventureros',
    pie:'Impreso desde la app, con los datos de hoy',
  }));
  imprimeDoc(docExamen(hojas,'Manual de la app',
    'El manual completo. En el cuadro de impresión escoge «Guardar como PDF» si lo quieres en archivo.'),
    'Manual de la app');
}

/* ───────── imprimir el material de estudio ─────────
   Mismo render que la herramienta de Node (fuente/imprimible.js), pero
   filtrado a lo que le toca al participante activo. Antes la guía en papel
   solo existía si un adulto corría un script; ahora sale de la app, que es
   donde está el niño. */

function imprimeGuia(){
  const html=docExamen([hojaGuia({
    caps:capsDe(), contenido:CONTENIDO, modulos:modsDe(), contModulos:CONT_MODULOS,
    logo:LOGO_TL,
    titulo:'GUÍA DE ESTUDIO',
    sub:esc(CAT().nombre)+' · '+esc(CAT().edad),
    meta:ACT().nombre+' · '+CAT().alcance,
    pie:'Mismo material que la app · '+esc(S.nombre||'sin nombre'),
  })],'Guía de estudio — '+CAT().nombre,
  'Tu guía completa. En el cuadro de impresión escoge «Guardar como PDF» si la quieres en archivo.');
  imprimeDoc(html,'Guía de estudio');
}

function imprimeCapitulo(id){
  const c=[...capsDe(),...modsDe()].find(x=>x.id===id);
  if(!c)return;
  const esMod=!!c.icono;
  const html=docExamen([hojaGuia({
    caps:esMod?[]:[c], contenido:CONTENIDO,
    modulos:esMod?[c]:[], contModulos:CONT_MODULOS,
    logo:LOGO_TL,
    titulo:esc(c.label).toUpperCase(),
    sub:esc(c.sub),
    meta:esc(actYCat(S.cat)),
  })],esc(c.label),'Un solo capítulo para imprimir.');
  imprimeDoc(html,c.label);
}

function imprimeTarjetas(){
  const t=tarjetasDe();
  if(!t.length){alertaImpr('No hay tarjetas en esta categoría.');return;}
  const html=docExamen([hojaTarjetas({
    tarjetas:t, caps:CAPS, logo:LOGO_TL,
    titulo:'TARJETAS DE MEMORIA',
    sub:esc(actYCat(S.cat,'cat')),
  })],'Tarjetas — '+CAT().nombre,
  'Tarjetas para recortar. Tapa la respuesta con la mano antes de leerla.');
  imprimeDoc(html,'Tarjetas');
}

/* Las dos guías completas de los dos eventos, para el director. */
function imprimeGuiasTodo(){
  const hojas=[];
  for(const ev of ['Conexión Bíblica','Devoción Matutina']){
    const cats=Object.keys(CATS).filter(k=>CATS[k].act===ev);
    const ids=new Set();
    /* Las 28 creencias son otro evento y no van en la guía del campamento: la
       guía impresa se usa para estudiar lo que el examen pide. */
    const caps=CAPS.filter(c=>c.cats.some(x=>cats.includes(x))
      &&!ids.has(c.id)&&ids.add(c.id));
    const mods=MODULOS.filter(m=>m.cats.some(x=>cats.includes(x)));
    if(!caps.length)continue;
    hojas.push(hojaGuia({
      caps, contenido:CONTENIDO, modulos:mods, contModulos:CONT_MODULOS,
      logo:LOGO_TL,
      titulo:'GUÍA DE ESTUDIO — '+ev.toUpperCase(),
      sub:'Material completo del evento',
      meta:'Los capítulos marcados con ★ también aplican para la categoría de 7 a 9 años',
      marca:c=>c.cats.includes('av')||c.cats.includes('dm2'),
    }));
  }
  imprimeDoc(docExamen(hojas,'Guías de los dos eventos',
    'Las guías completas de los dos eventos, cada una desde su propia hoja.'),
    'Guías completas');
}

/* ───────── pasar y compartir el progreso ─────────
   MECANISMO
   Todo el progreso vive en el localStorage del navegador donde se estudió.
   Eso no se puede consultar desde otro aparato, así que la única forma de
   moverlo es sacarlo como texto. El estado se convierte a JSON, se pasa a
   base64 (para que sobreviva a WhatsApp, que rompe los saltos de línea y las
   comillas) y se le pone un prefijo que dice qué trae.

   DOS CÓDIGOS DISTINTOS, A PROPÓSITO
   · CB1R = resumen. Corto, para mandar por chat. Trae cómo va: capítulos
     leídos, exámenes, racha, insignias, cuántos errores le faltan. Al
     importarlo NO se toca nada: se muestra en pantalla como un boletín.
   · CB1F = ficha completa. Trae todo, incluidos los errores y las tarjetas
     pregunta por pregunta, para restaurarla en otro aparato. Es largo, así
     que además se ofrece como archivo.

   Se separan porque son dos necesidades distintas: el director quiere VER, y
   quien cambia de teléfono quiere RECUPERAR. Un solo código haría que el
   director pegue por chat 4.000 caracteres para ver un porcentaje. */

const aB64=s=>btoa(unescape(encodeURIComponent(s)));
const deB64=s=>decodeURIComponent(escape(atob(s)));

function resumenDe(al){
  const c=CATS[al.cat]||CATS.av;
  const caps=CAPS.filter(x=>x.cats.includes(al.cat));
  return {
    n:al.nombre, c:al.cat, r:al.racha, i:al.insignias||[],
    p:caps.map(x=>x.id+'='+(al.prog[x.id]||0)),
    e:(al.examenes||[]).filter(x=>x.cat===al.cat).slice(-12)
      .map(x=>[x.fecha,x.pts,x.total,x.nv,x.modo].join('/')),
    f:Object.keys(al.fq||{}).length,
    d:Object.values(al.ft||{}).filter(v=>v>=2).length,
    tt:tarjetasDe().length, cn:c.nombre, ce:(ACTIVIDADES[c.act]||{}).nombre||'',
  };
}

const codigoResumen=()=>'CB1R'+aB64(JSON.stringify(resumenDe(S)));
const codigoCompleto=()=>'CB1F'+aB64(JSON.stringify({n:S.nombre,a:S}));

function leeCodigo(txt){
  const s=String(txt||'').replace(/\s+/g,'');
  const m=/^CB1([RF])([A-Za-z0-9+/=]+)$/.exec(s);
  if(!m)return null;
  try{const o=JSON.parse(deB64(m[2]));o.tipo=m[1];return o;}catch(e){return null;}
}

function ponCodigo(cual){
  const t=document.getElementById('exp-txt');
  if(!t)return;
  const cod=cual==='full'?codigoCompleto():codigoResumen();
  t.value=cod;
  document.getElementById('exp-info').innerHTML=cual==='full'
    ?'<strong>Ficha completa</strong> de '+esc(S.nombre||'este participante')+
     ', '+cod.length+' caracteres. Sirve para recuperar todo en otro aparato. '+
     'Si es muy largo para el chat, usa el botón de guardar como archivo.'
    :'<strong>Resumen</strong> de '+esc(S.nombre||'este participante')+', '+
     cod.length+' caracteres. Se puede pegar en un chat. Muestra cómo va, '+
     'pero no restaura el progreso.';
  const g=document.getElementById('exp-guardar');
  if(g){
    try{
      const b=new Blob([cod],{type:'text/plain'});
      g.href=URL.createObjectURL(b);
      g.download='progreso-'+(S.nombre||'participante').replace(/[^\w-]+/g,'-')+'.txt';
      g.style.display=cual==='full'?'inline-block':'none';
    }catch(e){g.style.display='none';}
  }
}

function copiaCodigo(){
  const t=document.getElementById('exp-txt');
  if(!t||!t.value){ponCodigo('res');return;}
  try{t.select();document.execCommand('copy');}catch(e){}
  if(navigator.clipboard)navigator.clipboard.writeText(t.value).catch(()=>{});
  document.getElementById('exp-info').innerHTML='<strong>Copiado.</strong> Pégalo en el chat.';
}

/* Boletín de solo lectura: lo que ve el director al pegar un resumen. */
function pintaBoletin(o){
  const caps=o.p.map(s=>s.split('='));
  const listos=caps.filter(([,v])=>Number(v)>=100).length;
  const ex=o.e.map(s=>s.split('/'));
  const mejor=ex.length?Math.max(...ex.map(x=>Math.round(x[1]/x[2]*100))):0;
  const ult=ex.slice(-5).map(x=>'<tr><td>'+esc(x[0])+'</td><td>'+esc(x[1])+'/'+esc(x[2])+
    '</td><td>'+Math.round(x[1]/x[2]*100)+'%</td><td>nivel '+esc(x[3])+'</td></tr>').join('');
  return '<div class="bol"><h3>'+esc(o.n||'Sin nombre')+'</h3>'+
    '<p class="nota">'+esc(o.cn||'')+' · '+esc(o.ce||'')+'</p>'+
    '<div class="bol-g">'+
    '<div><b>'+listos+'/'+caps.length+'</b><span>capítulos leídos</span></div>'+
    '<div><b>'+mejor+'%</b><span>mejor puntaje</span></div>'+
    '<div><b>'+ex.length+'</b><span>exámenes</span></div>'+
    '<div><b>'+o.r+IC('fuego','racha')+'</b><span>días de racha</span></div>'+
    '<div><b>'+o.d+'/'+(o.tt||'?')+'</b><span>tarjetas dominadas</span></div>'+
    '<div><b>'+o.f+'</b><span>errores por repasar</span></div>'+
    '</div>'+
    (ult?'<table class="bol-t"><thead><tr><th>Fecha</th><th>Puntaje</th><th>%</th>'+
      '<th>Nivel</th></tr></thead><tbody>'+ult+'</tbody></table>':
      '<p class="nota">Todavía no ha hecho exámenes.</p>')+
    '<p class="nota">Esto es solo una foto de cómo va. No cambió nada de tus datos.</p></div>';
}

function importaCodigo(){
  const t=document.getElementById('imp-txt');
  const out=document.getElementById('imp-out');
  if(!t||!out)return;
  const o=leeCodigo(t.value);
  if(!o){out.innerHTML='<p class="nota" style="color:var(--rojo-txt)">Ese código no se '+
    'entiende. Tiene que empezar en <strong>CB1R</strong> o <strong>CB1F</strong> y '+
    'venir completo, sin cortar.</p>';return;}
  if(o.tipo==='R'){out.innerHTML=pintaBoletin(o);return;}
  impPendiente=o;
  out.innerHTML='<p class="nota"><strong>Ficha completa de '+esc(o.n||'sin nombre')+
    '.</strong> ¿Qué quieres hacer?</p>'+
    '<div style="display:flex;gap:.6rem;flex-wrap:wrap;margin-top:.5rem">'+
    '<button class="btn azul" onclick="aplicaImport(\'nueva\')">'+IC('mas')+' Agregarla como ficha nueva</button>'+
    '<button class="btn gho" onclick="aplicaImport(\'reemplaza\')">'+IC('repetir')+' Reemplazar la ficha actual</button>'+
    '</div>';
}

let impPendiente=null;

async function aplicaImport(como){
  if(!impPendiente)return;
  const al=normalizar(impPendiente.a);
  if(como==='nueva'){
    if(alumnos().length>=MAX_ALUMNOS){
      document.getElementById('imp-out').innerHTML='<p class="nota" style="color:var(--rojo-txt)">'+
        'Ya hay '+MAX_ALUMNOS+' fichas en este aparato. Borra una antes de agregar otra.</p>';
      return;
    }
    const id=nuevoId();
    DB.alumnos[id]=al;guardar();
    impPendiente=null;
    cambiaAlumno(id);
    return;
  }
  if(!await preguntaApp('¿Reemplazar el progreso de '+(S.nombre||'esta ficha')+'?',
    'Queda el de '+(al.nombre||'la ficha importada')+'. Lo que hay ahora se pierde.',
    'Reemplazar',true))return;
  DB.alumnos[DB.activo]=al;S=al;guardar();
  impPendiente=null;
  marcaCat();pintaInicio();pintaCaps();ir('inicio');
}

/* ───────── bienvenida ─────────
   MECANISMO
   La categoría (me / av / pa / gm / dm1 / dm2) es el dato del que dependen
   los capítulos que se ven, las preguntas que salen y el techo de
   dificultad. Antes se escogía tocando una de seis tarjetas en el Inicio,
   con «Aventureros» puesto por defecto: un niño de cinco años que no
   tocaba nada estudiaba durante semanas el material de siete a nueve.
   Aquí la categoría ya no se escoge: se deduce de dos preguntas que un
   niño sí sabe contestar, su edad y su evento.

   CUÁNDO SE MUESTRA
   Solo la primera vez: cuando hay un único participante, sin nombre y sin
   nada de progreso. Cualquier dato guardado significa que ya pasó por aquí.

   Si compite en los dos eventos se crean dos fichas, porque el progreso de
   Daniel y el de la matutina no se mezclan. */


const esNuevo=()=>alumnos().length===1&&!S.nombre&&!S.examenes.length&&
  !Object.values(S.prog).some(v=>v>0);

/* ── LA BIENVENIDA: NOMBRE → ACTIVIDAD → CATEGORIA ──────────────────────
   El orden importa. Antes preguntaba la EDAD primero y el evento despues, y
   eso obligaba a mapear una edad a cada evento a mano: «si eligio 4 a 6 y
   matutina, entonces dm1». Con tres actividades ese mapeo se vuelve una tabla
   de casos, y las creencias no tienen 4-6 ni 7-9 sino «los dos del examen» y
   «el resto del club».

   Preguntando la ACTIVIDAD primero, el paso 3 solo ofrece las categorias de
   esa actividad y no hay mapeo que mantener. Las dos pantallas se generan
   desde ACTIVIDADES y CATS, asi que agregar una actividad es agregar una
   entrada al modelo.

   UNA SOLA ACTIVIDAD AQUI, a proposito. La mayoria participa en una. Quien
   este en dos la agrega despues desde el selector de fichas, que ya existe:
   cobrarle a todos una pantalla mas en el primer minuto, para algo que hace
   una minoria, es mal negocio. */
let bvActSel='cb';

/* ── ABRIR EN UN CONCURSO: /?concurso=<id> (v169) ────────────────────────
   MECANISMO
   La app de la iglesia lista los concursos y cada uno lleva a esta app con su
   id en la dirección. Aquí se lee una vez, al arrancar, y se quita de la
   dirección para que recargar no lo repita.

   QUÉ HACE SEGÚN EL APARATO
   · Aparato nuevo: la bienvenida pregunta el nombre y pasa directo a las
     categorías de ese concurso.
   · Ya está en ese concurso: nada.
   · Tiene una ficha de ese concurso: pasa a ella (primero la del mismo nombre).
   · No tiene ninguna: si el concurso tiene una sola categoría, entra; si tiene
     varias, pregunta cuál. ponCat() ya sabe crear la ficha sin tocar el
     progreso de la que estaba.

   UN CONCURSO QUE ESTE APARATO TODAVÍA NO CONOCE
   Uno guardado en la base llega con /estado y se aplica en la siguiente
   apertura. Si el enlace pide uno así, se espera a que llegue y se recarga
   UNA vez (sessionStorage lo recuerda); si tampoco aparece, la app queda
   donde estaba. */
const CONCURSO_REC='cb-concurso-rec';
let concursoPedido='', concursoEspera='';
function leeConcursoPedido(){
  try{
    const u=new URL(location.href), c=(u.searchParams.get('concurso')||'').trim();
    if(!c)return '';
    u.searchParams.delete('concurso');
    history.replaceState(null,'',u.pathname+(u.search||'')+(u.hash||''));
    return /^[a-z][a-z0-9]{1,11}$/.test(c)?c:'';
  }catch(e){return '';}
}
function hojaCategorias(a){
  const A=ACTIVIDADES[a];
  abreHojaHtml(hojaConCierre(A.nombre,'¿En qué categoría vas a estudiar?',
    '<div class="cat-sel"><div class="cat-fila">'+CATS_DE_ACT(a).map(k=>
      '<button type="button" class="cat-btn" onclick="cierraHoja();ponCat(\''+k+'\')">'+
      '<div class="cn">'+esc(CATS[k].nombre)+'</div><div class="cd">'+esc(CATS[k].edad)+'<br>'+esc(CATS[k].alcance)+'</div></button>').join('')+
    '</div></div><p class="nota">Esto decide qué vas a estudiar. Se puede cambiar después.</p>'),'yo');
}
function abreConcurso(a){
  if(!ACTIVIDADES[a])return false;
  if(esNuevo()){concursoPedido=a;return true;}
  if(ACT_DE(S.cat)===a)return true;
  const nom=(S.nombre||'').trim().toLowerCase();
  const suyas=alumnos().filter(([,al])=>ACT_DE(al.cat)===a);
  /* v191: solo la ficha de ESTA persona. Antes, sin una suya, tomaba la
     primera de la actividad, que podía ser la de otra persona del aparato. */
  const mia=suyas.find(([,al])=>(al.nombre||'').trim().toLowerCase()===nom);
  if(mia){cambiaAlumno(mia[0]);return true;}
  const cats=CATS_DE_ACT(a);
  if(cats.length===1)ponCat(cats[0]);else hojaCategorias(a);
  return true;
}

function bvPaso(n){
  ['bv-1','bv-2','bv-3'].forEach((id,i)=>{
    const e=document.getElementById(id);
    if(e)e.classList.toggle('on',i===n-1);
  });
  window.scrollTo({top:0});
}

function bvSigue(){
  const v=document.getElementById('bv-nombre').value.trim();
  const err=document.getElementById('bv-err');
  if(v.length<2){err.textContent='Escribe tu nombre para seguir.';return;}
  err.textContent='';
  S.nombre=v.slice(0,60);guardar();
  /* v169: quien llegó por un enlace a un concurso ya dijo cuál; preguntárselo
     otra vez sería un toque de más. Pasa directo a la categoría. */
  if(concursoPedido&&ACTIVIDADES[concursoPedido]){
    const n3=document.getElementById('bv-n3');if(n3)n3.textContent='Paso 2 de 2';
    const a=concursoPedido;concursoPedido='';bvActividad(a);return;
  }
  const el=document.getElementById('bv-saludo');
  if(el)el.textContent='Hola, '+v.split(' ')[0]+'. ¿En qué actividad participas?';
  pintaBvActs();
  bvPaso(2);
}

function bvAtras(n){bvPaso(n);}

/** Paso 2: las actividades, con lo que se estudia y cuándo. */
function pintaBvActs(){
  const c=document.getElementById('bv-acts');
  if(!c)return;
  c.innerHTML=Object.keys(ACTIVIDADES).map(k=>{
    const a=ACTIVIDADES[k];
    return '<button type="button" class="bv-op" onclick="bvActividad(\''+k+'\')">'+
      '<b>'+a.icono+' '+esc(a.nombre)+'</b>'+
      '<small>'+esc(a.que)+' · '+esc(a.cuando)+'</small></button>';
  }).join('');
}

function bvActividad(a){
  if(!ACTIVIDADES[a])return;
  bvActSel=a;
  const cats=CATS_DE_ACT(a);
  /* Si la actividad tuviera una sola categoria, preguntar seria un toque de
     mas sin informacion: se elige sola. Hoy las tres tienen varias, pero la
     guarda evita una pantalla tonta si manana se agrega una que no. */
  if(cats.length===1){ponCatBV(cats[0]);bvTermina();return;}
  const t3=document.getElementById('bv-t3'), p3=document.getElementById('bv-p3');
  if(t3)t3.textContent=ACTIVIDADES[a].icono+' '+ACTIVIDADES[a].nombre;
  if(p3)p3.textContent='¿Cuál es tu categoría? Esto decide qué vas a estudiar.';
  const c=document.getElementById('bv-cats');
  if(c)c.innerHTML=cats.map(k=>
    '<button type="button" class="bv-op" onclick="bvCategoria(\''+k+'\')">'+
    '<b>'+esc(CATS[k].edad)+'</b><small>'+esc(CATS[k].nombre)+' · '+
    esc(CATS[k].alcance)+'</small></button>').join('');
  bvPaso(3);
}

function bvCategoria(c){
  if(!CATS[c])return;
  ponCatBV(c);
  bvTermina();
}

function ponCatBV(c){S.cat=c;guardar();}

function bvTermina(){
  marcaCat();
  reiniciaPractica();
  /* Hay que repintar, no solo navegar: `ir()` prende la pantalla pero no vuelve
     a dibujar su contenido, y al terminar la bienvenida cambiaron el nombre Y la
     categoria, o sea todo. Antes esto no se veia porque el panel de identidad
     vivia dentro del Inicio y nadie lo miraba de primeras; con la ficha en la
     barra, salia vacia en las cinco pantallas. */
  pintaInicio();pintaCaps();
  ir('inicio');
  try{cargaEvaluacion();}catch(e){}
}

/* MUDANZA:INICIO ─ LA APP SE MUDÓ A LA DE JÓVENES (v175, 12-oct) ──────────
   QUÉ PASA. Conexión Bíblica ahora vive dentro de la app de Jóvenes Tierralinda
   (https://jovenestierralinda.org/estudiar/, y /app/ para quien tiene cuenta),
   con la misma base. Esta dirección queda para el panel del director y la API
   que usa esa app; quien la abre para estudiar se va para allá.

   EL AVANCE VIAJA CON ÉL. Lo estudiado está en el localStorage de ESTE sitio, y
   el otro sitio no lo puede leer. Así que aquí se empaca (las llaves de la app,
   no las cachés del servidor), se comprime y va en la dirección, después del
   `#`: esa parte no se le manda a ningún servidor, va de este teléfono al mismo
   teléfono. Allá se desempaca sin pisar lo que ya hubiera (assets/cb-mudanza.js
   en el repo de Jóvenes).

   QUIÉN NO SE MUDA, y sigue aquí como siempre:
   · sin señal (no se puede preguntar nada ni llegar allá: la app sigue abriendo);
   · el director (su panel sigue aquí; se pregunta a /api/yo);
   · quien está en medio de un examen;
   · quien abre con ?quedarse=1 (por si hace falta, esa pestaña no se muda).

   ESTA PARTE NO VIAJA AL MÓDULO: tools/cb-traer (en el repo de Jóvenes) quita
   todo lo que hay entre MUDANZA:INICIO y MUDANZA:FIN. */
const CASA_NUEVA='https://jovenestierralinda.org/estudiar/';
const PEDIDO_AL_ABRIR=(()=>{try{return new URL(location.href).searchParams.get('concurso')||'';}catch(e){return '';}})();
const LLAVES_MUDANZA=['conexion-biblica-v4','conexion-biblica-v3','cb-vel','cb-apariencia','cb-filtro','cb-donde','cb-cola'];
async function mudanza(){
  try{
    if(typeof location==='undefined'||location.hostname!=='conexion-biblica.pages.dev')return;
    if(new URL(location.href).searchParams.get('quedarse')==='1')sessionStorage.setItem('cb-quedarse','1');
    if(sessionStorage.getItem('cb-quedarse')==='1'||sessionStorage.getItem('cb-dir')==='1')return;
    if(typeof examenEnCurso==='function'&&examenEnCurso())return;
    const r=await fetch('/api/yo',{credentials:'same-origin',cache:'no-store'});
    if(!r.ok)return;
    const y=await r.json();
    if(y&&y.rol==='director')return;
    const k={};
    for(const n of LLAVES_MUDANZA){const v=localStorage.getItem(n);if(v!=null)k[n]=v;}
    let bytes=new TextEncoder().encode(JSON.stringify({k})),tipo='j';
    if(typeof CompressionStream==='function'){
      bytes=new Uint8Array(await new Response(new Blob([bytes]).stream().pipeThrough(new CompressionStream('gzip'))).arrayBuffer());
      tipo='g';
    }
    let b='';for(let i=0;i<bytes.length;i+=0x8000)b+=String.fromCharCode.apply(null,bytes.subarray(i,i+0x8000));
    const p=btoa(b).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
    location.replace(CASA_NUEVA+(PEDIDO_AL_ABRIR?'?concurso='+encodeURIComponent(PEDIDO_AL_ABRIR):'')+
      (Object.keys(k).length?'#traer='+tipo+'.'+p:''));
  }catch(e){ /* sin red o sin permiso: se queda aquí, que sigue funcionando */ }
}
if(typeof setTimeout==='function')setTimeout(mudanza,0);
/* MUDANZA:FIN */

/* ═══════════════════ v205: EL REDISEÑO DEL ESTUDIO ═══════════════════
   Camilo (13-oct): «que el diseño quede como las mejores aplicaciones… lo más
   interactivo posible». Cinco piezas, todas armadas con datos que la app ya
   tenía; ninguna inventa contenido:
   1. Inicio: UN paso siguiente («Continuar»), con el capítulo y la sección
      donde se quedó, y el avance en tres niveles: Leído, Practicado, Dominado.
   2. El capítulo en tres columnas cuando hay ancho: índice, texto y estudio.
   3. «Antes de seguir»: dos preguntas al final de cada sección del texto.
   4. Quién estudia: un control compacto, con un menú por persona.
   5. Comparar: las profecías paralelas, armadas de LAMINAS.

   LOS TRES NIVELES, Y DE DÓNDE SALE CADA UNO
   Leído      S.prog: lo mismo que ya decían los anillos (60 al abrir, 100 con
              «Ya lo estudié»).
   Practicado de las tarjetas y preguntas del capítulo, las que ya se
              respondieron alguna vez (una tarjeta con caja en S.ft, una pregunta
              vista en S.qv o con error en S.fq).
   Dominado   de las tarjetas del capítulo, las que llegaron a la caja 2: las
              que se acertaron dos veces seguidas (ver tjSabia). */
const tjDeCap=id=>tarjetasDe().filter(t=>t.cap===id);
const qDeCap=id=>bancoDe().filter(q=>q.cap===id);
function nivelesDe(id){
  const leido=Math.max(0,Math.min(100,Math.round(S.prog[id]||0)));
  const tj=tjDeCap(id), qs=qDeCap(id), tot=tj.length+qs.length;
  const pr=tj.filter(t=>claveT(t) in S.ft).length+
    qs.filter(q=>{const k=claveQ(q);return (S.qv[k]||0)>0||k in S.fq;}).length;
  const dom=tj.filter(t=>cajaT(t)>=2).length;
  return {leido,practicado:tot?Math.round(pr/tot*100):0,dominado:tj.length?Math.round(dom/tj.length*100):0,
    tot,pr,tj:tj.length,dom};
}
/* Las tres barras, en una pieza (una pieza, un armado). `fino`: la de la
   rejilla, sin rótulos. */
function barrasNivel(n,fino){
  const b=(k,t,v)=>'<div class="nv3-b nv3-'+k+'"'+(fino?'':' role="img" aria-label="'+t+': '+v+'%"')+'>'+
    (fino?'':'<span class="nv3-t">'+t+'</span>')+
    '<span class="nv3-pista"><i style="width:'+v+'%"></i></span>'+(fino?'':'<b class="nv3-v">'+v+'%</b>')+'</div>';
  return '<div class="nv3'+(fino?' fino':'')+'"'+(fino?' aria-label="Leído '+n.leido+'%, practicado '+n.practicado+'%, dominado '+n.dominado+'%"':'')+'>'+
    b('l','Leído',n.leido)+b('p','Practicado',n.practicado)+b('d','Dominado',n.dominado)+'</div>';
}

/* ───────── LAS SECCIONES DE UN CAPÍTULO ─────────
   Con texto bíblico, una sección es un bloque de cinco versículos: el mismo
   corte que ya tenía «Leer el capítulo» (seccionLectura), con su botón de voz.
   Sin texto (Profetas y Reyes, creencias, matutina), son las secciones del
   estudio. */
const POR_BLOQUE=5;
function bloquesDe(cid){
  if(typeof VERS==='undefined'||!VERS[cid])return [];
  const nums=Object.keys(VERS[cid]).map(Number).sort((a,b)=>a-b), o=[];
  for(let i=0;i<nums.length;i+=POR_BLOQUE){const g=nums.slice(i,i+POR_BLOQUE);o.push({de:g[0],a:g[g.length-1],vs:g});}
  return o;
}
const secsEstudioDe=cid=>(CONTENIDO[cid]||CONT_MODULOS[cid]||[]).filter(s=>!esSecInterp(s));
const nSeccionesDe=cid=>bloquesDe(cid).length||secsEstudioDe(cid).length||1;
/* Lo que dice cada versículo en palabras sencillas: el recorrido «📜 Versículos
   N a M» que build.js arma de mapa-versiculos.js y ya viaja en CONTENIDO. Se lee
   de ahí para no mandar el mismo dato dos veces. */
const mapaCache={};
function mapaDe(cid){
  if(mapaCache[cid])return mapaCache[cid];
  const m={};
  (CONTENIDO[cid]||[]).filter(s=>/^📜 Versículos/.test(String(s.t||''))).forEach(s=>{
    String(s.h||'').replace(/<tr><td class="key">(\d+)<\/td><td>([\s\S]*?)<\/td><\/tr>/g,(_,v,t)=>{m[+v]=sinEtiquetas(t);return '';});
  });
  return (mapaCache[cid]=m);
}
/* El tiempo que falta, por palabras: 160 por minuto es leer con calma para
   estudiar, no leer de corrido. Se redondea hacia arriba y nunca dice cero. */
const PALABRAS_MIN=160;
function minutosDesde(cid,k){
  const bl=bloquesDe(cid);
  let txt='';
  if(bl.length)bl.slice(k).forEach(b=>b.vs.forEach(v=>{txt+=' '+VERS[cid][v];}));
  else secsEstudioDe(cid).slice(k).forEach(s=>{txt+=' '+sinEtiquetas(s.h);});
  const p=txt.split(/\s+/).filter(Boolean).length;
  return Math.max(1,Math.ceil(p/PALABRAS_MIN));
}

/* ───────── DÓNDE SE QUEDÓ CADA PERSONA ─────────
   MECANISMO
   Mientras se lee, se anota el capítulo y la sección que está a la altura de
   los ojos. Va en el aparato y no en la ficha, por la misma razón que «dónde
   iba leyendo» (DONDE_K): la ficha sube al servidor y se funde con la de otros
   aparatos, y la sección es de esta pantalla. Una llave por ficha, para que dos
   hermanas en el mismo teléfono no se pisen el «Continuar».
   `m` guarda hasta qué sección llegó en cada capítulo (para el índice). */
const SIGUE_K='cb-sigue';
function sigueLee(){try{const o=JSON.parse(localStorage.getItem(SIGUE_K)||'{}');return o&&typeof o==='object'?o:{};}catch(e){return {};}}
function sigueDe(aid){const o=sigueLee()[aid||DB.activo];return o&&typeof o.c==='string'?o:null;}
function sigueAnota(cid,k){
  try{
    const o=sigueLee(), a=o[DB.activo]||{}, m=Object.assign({},a.m||{});
    m[cid]=Math.max(m[cid]||0,k+1);
    o[DB.activo]={c:cid,s:Math.max(0,k|0),m};
    localStorage.setItem(SIGUE_K,JSON.stringify(o));
  }catch(e){}
}
/* La sección que está a la altura de los ojos: la última cuyo borde de
   arriba ya pasó el primer tercio de su caja (la columna del texto, si tiene
   su propio scroll; si no, la ventana). */
function seccionALaVista(){
  const d=document.getElementById('detalle');
  if(!d||!capAbierto||d.style.display!=='block'||!d.getClientRects().length)return -1;
  const lect=d.querySelector('details.lect');
  let els=lect&&lect.open?[...lect.querySelectorAll('.lect-bl')]:[];
  if(!els.length)els=[...d.querySelectorAll('.sec[data-sk]')].filter(x=>x.getClientRects().length);
  if(!els.length)return -1;
  const iz=d.querySelector('.vd-izq');
  const enCol=iz&&els[0].closest&&els[0].closest('.vd-izq')&&iz.scrollHeight>iz.clientHeight+4;
  const linea=enCol?iz.getBoundingClientRect().top+iz.clientHeight/3:(window.innerHeight||800)/3;
  let k=0;
  els.forEach((e,i)=>{if(e.getBoundingClientRect().top<=linea)k=i;});
  const sk=els[k].getAttribute&&els[k].getAttribute('data-sk');
  return sk!=null?Number(sk):k;
}
let sigueT=0;
function sigueMide(){
  if(pantallaAct!=='estudio'||!capAbierto)return;
  const k=seccionALaVista();
  if(k<0)return;
  sigueAnota(capAbierto,k);
  pintaEstaSeccion(k);
  marcaIndice(k);
}
const sigueProg=()=>{clearTimeout(sigueT);sigueT=setTimeout(sigueMide,160);};
if(typeof window!=='undefined'&&window.addEventListener)window.addEventListener('scroll',sigueProg,{passive:true});

/* ───────── «CONTINUAR» ─────────
   El capítulo es el último que se estuvo leyendo, si sigue a la vista con el
   filtro y la categoría de ahora; si ya quedó estudiado entero, el siguiente
   que falte. Sin nada anotado, el primero que falte, desde su comienzo. */
function heroDatos(){
  const items=[...capsVista(),...modsAvance()];
  if(!items.length)return null;
  const sg=sigueDe();
  let c=sg?items.find(x=>x.id===sg.c):null, k=c?sg.s:0;
  const n0=c?nSeccionesDe(c.id):0;
  if(c&&(S.prog[c.id]||0)>=100&&k>=n0-1){
    const sig=items.find(x=>(S.prog[x.id]||0)<100);
    if(sig&&sig.id!==c.id){c=sig;k=0;}
  }
  if(!c){c=items.find(x=>(S.prog[x.id]||0)<100)||items[0];k=0;}
  const n=nSeccionesDe(c.id);
  k=Math.max(0,Math.min(n-1,k));
  const bl=bloquesDe(c.id);
  let tema='';
  if(bl.length){const m=mapaDe(c.id)[bl[k].de];if(m)tema=corta(m,90);}
  else{const s=secsEstudioDe(c.id)[k];if(s)tema=tituloSec(s.t);}
  return {c,k,n,tema,bl:bl[k]||null,min:minutosDesde(c.id,k),empezado:!!sg&&sg.c===c.id,niv:nivelesDe(c.id)};
}
const corta=(t,n)=>{t=String(t||'').replace(/\s+/g,' ').trim();if(t.length<=n)return t;
  const c=t.slice(0,n);return c.slice(0,Math.max(c.lastIndexOf(' '),n-12)).replace(/[\s,;:.—–-]+$/,'')+'…';};
/* La imagen del capítulo: la escena de su lámina si la tiene. `portada` en
   fuente/laminas.js manda; si no, la escena del principio (Daniel 7) o la de la
   oración (Daniel 2). Sin lámina, el número del capítulo. */
const PORTADA_CAP={d2:'h2'};
function portadaDe(cid){
  const L=typeof LAMINAS!=='undefined'?LAMINAS[cid]:null;
  if(!L)return escenaDeOtra(cid);
  const f=L.portada||PORTADA_CAP[cid]||(L.tipo==='escenas'?L.inicioF:((L.historia||[]).find(h=>/^h\d/.test(h.f))||{}).f);
  return f?LAMINAS_DIR+(f.includes('/')?'':L.dir)+f+'.webp':'';
}
/* Un capítulo sin lámina propia puede salir en la historia de otra: Daniel 1
   es la primera escena de la lámina de Daniel 2 («Cautivos en Babilonia»,
   Daniel 1:2). Se busca por la cita de la escena, no por una lista a mano. */
function escenaDeOtra(cid){
  const lb=libroCid(cid);
  if(!lb||typeof LAMINAS==='undefined')return '';
  const pre=lb.nombre+' '+lb.n+':';
  for(const k of Object.keys(LAMINAS)){const L=LAMINAS[k];
    const h=(L.historia||[]).find(x=>String(x.ref||'').startsWith(pre)&&x.f);
    if(h)return LAMINAS_DIR+(h.f.includes('/')?'':L.dir)+h.f+'.webp';}
  return '';
}
const numCap=c=>String(c.label||'').replace(/^(Daniel|Apocalipsis|P&R|Creencia|Día)\s*/i,'')||'·';
function portadaHTML(c,clase){
  const src=portadaDe(c.id);
  return src?'<img class="'+clase+'" src="'+src+'" alt="" loading="lazy" decoding="async">'
    :'<div class="'+clase+' sin-img" aria-hidden="true"><span>'+esc(numCap(c))+'</span></div>';
}
function pintaHero(){
  const z=document.getElementById('ini-hero');
  if(!z)return;
  const h=heroDatos();
  if(!h){z.innerHTML='';z.hidden=true;return;}
  z.hidden=false;
  const c=h.c, lam=typeof LAMINAS!=='undefined'&&LAMINAS[c.id];
  const donde=h.bl?'Versículos '+h.bl.de+(h.bl.a>h.bl.de?'–'+h.bl.a:''):'';
  z.innerHTML=portadaHTML(c,'hero-img')+
    '<div class="hero-tx">'+
      '<div class="hero-ant">'+(h.empezado?'Sigue donde quedaste':(S.prog[c.id]||0)>0?'Sigue con':'Empieza aquí')+'</div>'+
      '<h1 class="hero-tit"><span class="hero-lab">'+esc(c.label)+'</span> '+esc(c.sub||'')+'</h1>'+
      '<p class="hero-donde">Sección '+(h.k+1)+' de '+h.n+(donde?' · '+donde:'')+
        (h.tema?'<span class="hero-tema">'+esc(h.tema)+'</span>':'')+
        '<span class="hero-min">'+IC('reloj')+' Unos '+h.min+' minuto'+(h.min===1?'':'s')+' para terminar</span></p>'+
      barrasNivel(h.niv)+
      '<div class="hero-bots"><button type="button" class="btn nar hero-go" onclick="continuar()">Continuar</button>'+
      (lam?'<button type="button" class="btn tono" onclick="lamAbre(\''+c.id+'\',\'explorar\')">'+IC('lupa')+' Ver la lámina</button>':'')+
      '</div></div>';
}
/* Lo que queda pegado arriba y tapa: la barra de arriba (celular, Jóvenes) o
   la ficha flotante del computador (--pega-arriba). Medido, no supuesto. */
function altoPegado(){
  let n=0;
  try{n=parseFloat(getComputedStyle(document.body).getPropertyValue('--pega-arriba'))||0;}catch(e){}
  try{const r=document.querySelector('.nav').getBoundingClientRect();
    if(r.width>r.height&&r.top<=1&&r.bottom<(window.innerHeight||800)/2)n=Math.max(n,r.bottom);}catch(e){}
  return n;
}
function continuar(){
  const h=heroDatos();
  if(!h)return;
  verCap(h.c.id);
  irSeccion(h.k);
}
/* Pone la sección `k` del capítulo abierto a la vista. Con texto, abre la
   lectura y lleva su bloque arriba (dentro de la columna, si la columna tiene
   su propio scroll). */
function irSeccion(k){
  const d=document.getElementById('detalle');
  if(!d)return;
  k=Number(k)||0;
  const lect=d.querySelector('details.lect');
  const bls=lect?[...lect.querySelectorAll('.lect-bl')]:[];
  let el=null;
  if(bls.length){lect.open=true;el=bls[Math.min(k,bls.length-1)];}
  else el=[...d.querySelectorAll('.sec[data-sk]')].find(x=>Number(x.getAttribute('data-sk'))===k)||null;
  if(!el)return;
  dondeEspera(900);
  try{
    const iz=el.closest?el.closest('.vd-izq'):null;
    if(iz&&iz.scrollHeight>iz.clientHeight+4&&getComputedStyle(iz).position==='sticky'){
      const top=d.getBoundingClientRect().top+(window.scrollY||0)-8;
      window.scrollTo(0,Math.max(0,top));
      iz.scrollTop+=el.getBoundingClientRect().top-iz.getBoundingClientRect().top-8;
    }else{
      window.scrollTo(0,Math.max(0,el.getBoundingClientRect().top+(window.scrollY||0)-altoPegado()-12));
    }
  }catch(e){}
  sigueAnota(capAbierto||'',k);
  pintaEstaSeccion(k);marcaIndice(k);
}

/* ───────── LA REJILLA DE CAPÍTULOS DEL INICIO ───────── */
function pintaRejillaIni(){
  const z=document.getElementById('anillos');
  if(!z)return;
  const sg=sigueDe();
  z.innerHTML=capsVista().map(c=>{
    const n=nivelesDe(c.id);
    return '<button type="button" class="cap-t'+(sg&&sg.c===c.id?' aqui':'')+(n.leido>=100?' full':'')+'" onclick="verCap(\''+c.id+'\')">'+
      portadaHTML(c,'cap-t-img')+
      '<span class="cap-t-tx"><span class="cap-t-lab">'+esc(c.label)+'</span>'+
      '<span class="cap-t-sub">'+esc(c.sub||'')+'</span>'+barrasNivel(n,true)+'</span></button>';
  }).join('');
}

/* ───────── «ANTES DE SEGUIR» ─────────
   Recordar es lo que fija, no releer (la práctica de recuperación). Al final de
   cada sección del texto salen dos preguntas del banco de ESE capítulo:
   primero las que citan un versículo de la sección, después las demás, sin
   repetir ninguna en el capítulo. El reparto es fijo (por la huella de cada
   pregunta), así que al volver a la sección salen las mismas.
   LO QUE GUARDA: lo mismo que una respuesta de examen en S.qv (vista) y S.fq
   (error por repasar; acertarla lo quita). No toca S.acc ni S.act: esos son el
   acierto DE EXAMEN, y una pregunta con el texto a la vista no es un examen. */
const ADS_N=2;
const refsQ=(q,cid)=>{
  const lb=libroCid(cid);if(!lb)return [];
  const n=lb.n, out=[];
  String((q.q||'')+' '+(q.e||'')).replace(/(?:\b([A-ZÁÉÍÓÚ][a-záéíóúñ]+)\s+)?\b(\d{1,2}):(\d{1,3})(?:\s*[-–]\s*(\d{1,3}))?/g,(m,libro,c,v,h)=>{
    if(libro&&libro!==lb.nombre)return m;
    if(c!==n)return m;
    for(let i=+v;i<=(h?+h:+v)&&i<+v+8;i++)out.push(i);
    return m;
  });
  return out;
};
const adsCache={};
function adsReparto(cid){
  const llave=cid+'|'+retiradas.size;
  if(adsCache[llave])return adsCache[llave];
  const bl=bloquesDe(cid);
  const n=bl.length||1;
  const qs=qDeCap(cid).filter(q=>(q.t==='mc'&&(q.o||[]).length>1)||q.t==='tf')
    .map(q=>({q,vs:refsQ(q,cid),h:hashTxt(claveQ(q))})).sort((a,b)=>a.h<b.h?-1:a.h>b.h?1:0);
  const usadas=new Set(), rep=[];
  for(let i=0;i<n;i++){
    const b=bl[i], lista=[];
    if(b)for(const x of qs){if(lista.length>=ADS_N)break;if(!usadas.has(x)&&x.vs.some(v=>v>=b.de&&v<=b.a)){lista.push(x);usadas.add(x);}}
    rep.push(lista);
  }
  /* Las secciones que se quedaron cortas se completan con las que no citan
     versículo (las de interpretación, las de un dato del capítulo entero). */
  rep.forEach(lista=>{for(const x of qs){if(lista.length>=ADS_N)break;if(!usadas.has(x)&&!x.vs.length){lista.push(x);usadas.add(x);}}});
  const out=rep.map(l=>l.map(x=>x.q));
  return (adsCache[llave]=out);
}
let adsQ={}, adsN=0;
function adsHTML(qs,titulo){
  if(!qs||!qs.length)return '';
  const id='ads'+(++adsN);
  return '<div class="ads" id="'+id+'" role="group" aria-label="'+esc(titulo)+'">'+
    '<div class="ads-cab">'+IC('rayo')+'<b>'+esc(titulo)+'</b><span>'+qs.length+' pregunta'+(qs.length===1?'':'s')+'</span></div>'+
    qs.map((q,i)=>{const k=id+'-'+i;adsQ[k]=q;
      const ops=q.t==='tf'?['Verdadero','Falso']:q.o;
      return '<div class="ads-q" id="'+k+'"'+(i>0?' hidden':'')+'>'+
        '<p class="ads-t">'+(qs.length>1?'<span class="ads-k">'+(i+1)+' de '+qs.length+'</span>':'')+esc(q.q)+'</p>'+
        '<div class="ads-ops'+(q.t==='tf'?' vf':'')+'">'+ops.map((o,j)=>'<button type="button" class="ads-op" onclick="adsResponde(\''+k+'\','+j+')">'+esc(o)+'</button>').join('')+'</div>'+
        '<div class="ads-fb" aria-live="polite"></div></div>';}).join('')+'</div>';
}
const adsCorrecta=(q,j)=>q.t==='tf'?((j===0)===!!q.a):j===q.a;
function versoDeQ(q){
  const cid=q.cap, vs=refsQ(q,cid);
  if(!vs.length||typeof VERS==='undefined'||!VERS[cid])return null;
  const lb=libroCid(cid), v=vs.filter(x=>VERS[cid][x]).slice(0,2);
  if(!v.length)return null;
  return {txt:v.map(x=>VERS[cid][x]).join(' '),ref:lb.nombre+' '+lb.n+':'+v[0]+(v.length>1?'-'+v[v.length-1]:'')};
}
function adsResponde(k,j){
  const q=adsQ[k], box=document.getElementById(k);
  if(!q||!box||box.classList.contains('hecha'))return;
  const ok=adsCorrecta(q,j);
  box.classList.add('hecha',ok?'ok':'ko');
  box.querySelectorAll('.ads-op').forEach((b,i)=>{b.disabled=true;
    if(adsCorrecta(q,i))b.classList.add('bien');else if(i===j)b.classList.add('mal');
    b.setAttribute('aria-pressed',String(i===j));});
  try{
    const c=claveQ(q);
    S.qv[c]=Math.min(99,(S.qv[c]||0)+1);
    if(ok)delete S.fq[c];else S.fq[c]={m:Math.min(99,((S.fq[c]||{}).m||0)+1)};
    sumaRacha();guardar();
  }catch(e){}
  const resp=q.t==='tf'?(q.a?'Verdadero':'Falso'):(q.o||[])[q.a];
  const v=versoDeQ(q);
  const sig=box.nextElementSibling&&box.nextElementSibling.classList&&box.nextElementSibling.classList.contains('ads-q');
  const fb=box.querySelector('.ads-fb');
  if(fb)fb.innerHTML='<p class="ads-res">'+(ok?IC('check')+' <b>Así es.</b>':IC('x')+' <b>Era «'+esc(resp)+'».</b>')+
    (q.e?' '+esc(q.e):'')+'</p>'+
    (v?'<blockquote class="ads-v"><span class="biblia-t">«'+esc(v.txt)+'»</span> <cite>'+esc(v.ref)+'</cite></blockquote>':'')+
    (sig?'<button type="button" class="btn tono peq ads-sig" onclick="adsSigue(\''+k+'\')">Siguiente pregunta</button>':'');
  try{pintaSenales();}catch(e){}
}
function adsSigue(k){
  const box=document.getElementById(k);if(!box)return;
  const s=box.nextElementSibling;if(!s)return;
  s.hidden=false;
  const b=box.querySelector('.ads-sig');if(b)b.remove();
  const p=s.querySelector('.ads-op');if(p&&p.focus)p.focus({preventScroll:true});
}

/* ───────── LA PREGUNTA DEL DÍA ─────────
   Una sola, del capítulo en el que va. Primero las de «¿por qué?», después
   las de interpretación (f:'c'), después cualquiera con explicación. Cambia
   cada día y es la misma todo el día. */
function preguntaDelDia(){
  const h=heroDatos();if(!h)return null;
  const qs=qDeCap(h.c.id).filter(q=>(q.t==='mc'&&(q.o||[]).length>1)||q.t==='tf');
  const pool=[qs.filter(q=>/^¿\s*Por qué/i.test(q.q||'')),qs.filter(q=>q.f==='c'),qs.filter(q=>q.e),qs].find(l=>l.length);
  if(!pool)return null;
  return pool[(diaHoy()+h.c.id.length)%pool.length];
}
function abrePreguntaDia(){
  const q=preguntaDelDia();if(!q)return;
  const c=buscaItem(q.cap);
  abreHojaHtml('<div class="hoja-fondo" onclick="cierraHoja()"></div>'+
    '<div class="hoja-caja" role="dialog" aria-modal="true" aria-label="Pregunta del día">'+
    '<div class="hoja-asa" onclick="cierraHoja()"></div>'+
    '<div class="hoja-cab"><div><div class="hoja-ref">Pregunta del día</div>'+
      '<div class="hoja-sub">'+esc(c?c.label+' · '+(c.sub||''):'')+'</div></div>'+
      '<button type="button" class="hoja-x" onclick="cierraHoja()" aria-label="Cerrar">'+IC('x')+'</button></div>'+
    '<div class="hoja-txt pdd">'+adsHTML([q],'Pregunta del día')+'</div></div>','pdd');
}

/* ───────── EL ÍNDICE DE LA IZQUIERDA ───────── */
function indiceHTML(id){
  const caps=capsVista(), sg=sigueDe(), lleg=(sg&&sg.m)||{};
  const bl=bloquesDe(id);
  return '<div class="ind-cab"><span>'+esc(TIPO()==='creencias'?'Las creencias':'Capítulos')+'</span></div>'+
    '<ol class="ind-l">'+caps.map(c=>{
      const on=c.id===id, n=nivelesDe(c.id);
      return '<li><button type="button" class="ind-c'+(on?' on':'')+'"'+(on?' aria-current="page"':'')+' onclick="verCap(\''+c.id+'\')">'+
        '<span class="ind-n">'+esc(numCap(c))+'</span><span class="ind-t">'+esc(c.sub||c.label)+'</span>'+
        '<span class="ind-p" aria-hidden="true"><i style="width:'+n.leido+'%"></i></span></button>'+
        (on&&bl.length>1?'<ol class="ind-s">'+bl.map((b,k)=>'<li><button type="button" class="ind-b'+(k<(lleg[id]||0)?' ya':'')+'" data-sec="'+k+'" onclick="irSeccion('+k+')">'+
          '<span>'+(k+1)+'</span>Vers. '+b.de+(b.a>b.de?'–'+b.a:'')+'</button></li>').join('')+'</ol>':'')+
        '</li>';}).join('')+'</ol>';
}
function marcaIndice(k){
  try{document.querySelectorAll('#detalle .ind-b').forEach(b=>{const i=Number(b.getAttribute('data-sec'));
    b.classList.toggle('ahora',i===k);if(i<=k)b.classList.add('ya');});}catch(e){}
}

/* ───────── «ESTA SECCIÓN», AL LADO DEL TEXTO ─────────
   En tres columnas, arriba del estudio va lo de la sección que se está leyendo,
   siempre en el mismo orden:
     Lo que dice       los versículos en palabras sencillas (mapa-versiculos)
     Lo que significa  las secciones de «Para profundizar» que citan versículos
                       de esta sección, con su primera frase y el botón a ella
     Cómo vivirlo      solo si el capítulo trae una sección de aplicación que
                       cite estos versículos (hoy, ninguna de Daniel: no se
                       inventa)
     Fuente            la de lo que se cita arriba, una línea. */
const ES_VIVIR=/^\S*\s*(Aplicaci|La lecci|C[oó]mo vivir)/i;
const refsCap=(h,cid)=>refsQ({q:sinEtiquetas(h)},cid);
const ligaCache={};
function ligasDe(cid){
  if(ligaCache[cid])return ligaCache[cid];
  const todas=(CONTENIDO[cid]||[]).map((s,i)=>({s,i,vs:refsCap(s.h,cid)}));
  return (ligaCache[cid]={
    sig:todas.filter(x=>esSecInterp(x.s)),
    viv:todas.filter(x=>!esSecInterp(x.s)&&ES_VIVIR.test(String(x.s.t||'')))});
}
const fuenteDe=h=>{const m=/<p>(?:Fuentes?:)\s*([\s\S]*?)<\/p>/.exec(h||'');return m?m[1]:'';};
const primeraFrase=h=>{const p=/<p>([\s\S]*?)<\/p>/.exec(String(h||'').replace(/<p>Fuentes?:[\s\S]*?<\/p>/g,''));
  return corta(sinEtiquetas(p?p[1]:h),170);};
function estaSeccionHTML(cid,k){
  const bl=bloquesDe(cid)[k];
  if(!bl)return '';
  const m=mapaDe(cid), L=ligasDe(cid);
  const dentro=x=>x.vs.some(v=>v>=bl.de&&v<=bl.a);
  /* Primero las que EMPIEZAN aquí, después las más puntuales (menos versículos). */
  const orden=(a,b)=>((a.vs[0]>=bl.de&&a.vs[0]<=bl.a)?0:1)-((b.vs[0]>=bl.de&&b.vs[0]<=bl.a)?0:1)||a.vs.length-b.vs.length;
  const sig=L.sig.filter(dentro).sort(orden).slice(0,3), viv=L.viv.filter(dentro).slice(0,2);
  const dice=bl.vs.filter(v=>m[v]);
  if(!dice.length&&!sig.length&&!viv.length)return '';
  const fu=[...new Set([...sig,...viv].map(x=>fuenteDe(x.s.h)).filter(Boolean))].slice(0,1);
  const lb=libroCid(cid);
  return '<div class="ea-cab"><span>Esta sección</span><b>'+esc(lb?lb.nombre+' '+lb.n+':'+bl.de+(bl.a>bl.de?'–'+bl.a:''):'')+'</b></div>'+
    (dice.length?'<div class="ea-p ea-dice"><div class="ea-rot">Lo que dice</div><ul>'+
      dice.slice(0,5).map(v=>'<li><span class="vn">'+v+'</span>'+esc(m[v])+'</li>').join('')+'</ul></div>':'')+
    (sig.length?'<div class="ea-p ea-sig"><div class="ea-rot">Lo que significa</div>'+
      sig.map(x=>'<button type="button" class="ea-ir" onclick="irASec('+x.i+')"><b>'+esc(tituloSec(x.s.t))+'</b><span>'+esc(primeraFrase(x.s.h))+'</span></button>').join('')+'</div>':'')+
    (viv.length?'<div class="ea-p ea-viv"><div class="ea-rot">Cómo vivirlo</div>'+
      viv.map(x=>'<button type="button" class="ea-ir" onclick="irASec('+x.i+')"><b>'+esc(tituloSec(x.s.t))+'</b><span>'+esc(primeraFrase(x.s.h))+'</span></button>').join('')+'</div>':'')+
    (fu.length?'<p class="ea-fu">Fuente: '+fu[0]+'</p>':'');
}
let eaK=-1;
function pintaEstaSeccion(k){
  const z=document.getElementById('est-ahora');
  if(!z||!capAbierto)return;
  if(k===eaK&&z.innerHTML)return;
  eaK=k;
  const h=estaSeccionHTML(capAbierto,k);
  z.hidden=!h;
  if(h)z.innerHTML=h;
}
/* Lleva a una sección del estudio por su lugar en CONTENIDO: cambia de pestaña
   si hace falta y la resalta un momento. */
function irASec(i){
  const d=document.getElementById('detalle');if(!d)return;
  const s=d.querySelector('.sec[data-i="'+i+'"]');if(!s)return;
  const p=s.getAttribute('data-pest');if(p&&p!==capPest)ponPest(p);
  if(s.style.display==='none')s.style.display='';
  /* En tres columnas la sección vive en la columna del estudio, que tiene su
     propio scroll; si no, se mueve la página. */
  const col=s.closest?s.closest('.vd-der'):null;
  if(col&&col.scrollHeight>col.clientHeight+4&&getComputedStyle(col).overflowY!=='visible')
    col.scrollTo({top:Math.max(0,s.getBoundingClientRect().top-col.getBoundingClientRect().top+col.scrollTop-60),behavior:lamQuieto()?'auto':'smooth'});
  else window.scrollTo({top:Math.max(0,s.getBoundingClientRect().top+(window.scrollY||0)-altoPegado()-16),behavior:lamQuieto()?'auto':'smooth'});
  s.classList.remove('destaca');void s.offsetWidth;s.classList.add('destaca');
}

/* ───────── QUIÉN ESTUDIA: EL MENÚ DE CADA PERSONA ─────────
   Antes, quitar a alguien estaba en Logros › Datos guardados y solo servía
   para la ficha activa. Ahora cada persona trae su «⋯» con Renombrar, Agregar
   actividad y Quitar. Los índices son los de personasDB() al pintar: la lista
   no cambia mientras el panel está abierto sin repintarse. */
let yoMenu=-1, yoRen=-1;
function yoAbreMenu(i){yoMenu=yoMenu===i?-1:i;yoRen=-1;pintaAlumnos();}
function yoRenombra(i){yoRen=i;yoMenu=-1;pintaAlumnos();
  try{const t=document.getElementById('alu-ren');if(t){t.focus();t.select&&t.select();}}catch(e){}}
function yoGuardaNombre(i){
  const p=personasDB()[i], t=document.getElementById('alu-ren');
  if(!p||!t)return;
  const v=String(t.value||'').trim().slice(0,60);
  if(!v){t.focus();return;}
  p.fichas.forEach(([,al])=>{al.nombre=v;});
  yoRen=-1;guardar();pintaAlumnos();pintaYo();pintaInicio();
}
function yoCancela(){yoRen=-1;yoMenu=-1;pintaAlumnos();}
/* «Agregar actividad»: pasa a esa persona y abre el selector de categorías,
   que es donde ya vive la regla de una ficha por actividad (ponCat). */
function yoActividad(i){
  const p=personasDB()[i];if(!p)return;
  yoMenu=-1;
  if(!p.fichas.some(([id])=>id===DB.activo))cambiaAlumno(p.fichas[0][0]);
  abreYo(true);
}
async function yoQuita(i){
  const p=personasDB()[i];if(!p)return;
  const n=p.fichas.length;
  if(!await preguntaApp('¿Quitar a '+p.nombre+'?',
    'Se borra su avance en este aparato'+(n>1?' en sus '+n+' actividades':'')+'. No se puede deshacer.','Quitar',true)){abreYo();return;}
  quitaPersona(i,p);
}
function quitaPersona(i,p){
  p=p||personasDB()[i];if(!p)return;
  const ids=p.fichas.map(([id])=>id);
  if(ids.length>=alumnos().length){
    try{localStorage.removeItem(CLAVE);localStorage.removeItem(CLAVE_VIEJA);}catch(e){}
    DB=normalizarDB(null);S=DB.alumnos[DB.activo];guardar();marcaCat();
    try{const o=sigueLee();ids.forEach(id=>delete o[id]);localStorage.setItem(SIGUE_K,JSON.stringify(o));}catch(e){}
    yoMenu=-1;ir('bienvenida');bvPaso(1);return;
  }
  const eraActiva=ids.includes(DB.activo);
  ids.forEach(id=>delete DB.alumnos[id]);
  try{const o=sigueLee();ids.forEach(id=>delete o[id]);localStorage.setItem(SIGUE_K,JSON.stringify(o));}catch(e){}
  yoMenu=-1;
  if(eraActiva)cambiaAlumno(Object.keys(DB.alumnos)[0]);
  else{guardar();pintaYo();pintaInicio();}
}

/* ───────── COMPARAR: LAS PROFECÍAS PARALELAS ─────────
   MECANISMO
   Las columnas son los capítulos que tienen lámina con partes (hoy Daniel 2 y
   7). Las filas son los poderes, y se juntan por FECHA de comienzo (`de`): el
   año en que empieza un reino es el mismo en cualquier visión, y así Daniel 8
   (el carnero, -539) cae solo en la fila de Medo-Persia sin escribir ninguna
   tabla. Lo que no tiene fecha (la piedra, el Hijo del hombre, el reino) va
   en la última fila: el reino de Dios.
   Agregar una lámina con `partes` agrega una columna. Nada más. */
const CMP_FIN='fin';
function cmpModelo(Ls){
  Ls=Ls||(typeof LAMINAS!=='undefined'?LAMINAS:{});
  const cols=Object.keys(Ls).filter(k=>Array.isArray(Ls[k].partes)&&Ls[k].partes.length&&libroCid(k))
    /* Daniel antes que Apocalipsis, y cada libro por capítulo. */
    .sort((a,b)=>{const x=libroCid(a),y=libroCid(b),o={d:0,ap:1};return x.pre===y.pre?x.n-y.n:(o[x.pre]||0)-(o[y.pre]||0);});
  const filas=new Map();
  cols.forEach(k=>{
    const L=Ls[k];
    L.partes.forEach(p=>{
      const key=Number.isFinite(p.de)?String(p.de):CMP_FIN;
      if(!filas.has(key))filas.set(key,{key,de:Number.isFinite(p.de)?p.de:Infinity,reino:'',fechas:'',c:p.c||'',celdas:{}});
      const f=filas.get(key);
      if(!f.reino)f.reino=key===CMP_FIN?'El reino de Dios':(p.reino||'');
      if(!f.fechas)f.fechas=key===CMP_FIN?'Lo que no pasa':(p.fechas||'');
      (f.celdas[k]=f.celdas[k]||[]).push(p);
    });
  });
  return {cols,filas:[...filas.values()].sort((a,b)=>a.de-b.de)};
}
/* LA IMAGEN DE UNA PARTE, a cualquier tamaño (v209).
   En una lámina de escenas (Daniel 7) es su imagen entera, recortada al marco.
   En la de capas (Daniel 2) es un RETRATO DE LA ESTATUA: el pedazo de la estatua
   donde está la parte, con su metal encendido, las demás capas en sombra y la
   escena de Babilonia atrás. Todo va en porcentajes del marco (`asp`: ancho/alto),
   así sirve igual a 120 px que a pantalla completa.
   v209 (Camilo, 14-oct: «No aparece Daniel 2 Grecia ni todo Roma»): antes cada
   capa era una <img loading="lazy"> sin alto, corrida hacia arriba fuera de su
   marco. En Safari una imagen perezosa que todavía no cargó mide 0 de alto, y
   ahí quedaba fuera del recorte: nunca «entraba en pantalla» y nunca se pedía.
   El bronce, el hierro, los dedos y el barro se quedaban en el color de fondo.
   Ahora cada capa tiene su alto desde el principio y se pide de una vez. */
function cmpMini(L,p,asp,alt){
  const pc=n=>(Math.round(n*100)/100)+'%';
  if(L.tipo==='escenas'||!(L.capas||[]).includes(p.id)||!(L.cajas||{})[p.id]){
    let f=p.img;
    if(!f){const e=(L.escenas||[]).find(x=>x.parte===p.id);f=e?e.f:p.id;}
    return '<span class="cmp-img"><img class="cmp-cubre" src="'+lamRuta(L,f)+'" alt="'+esc(alt||'')+'" loading="lazy" decoding="async"></span>';
  }
  const [x,y,w,h]=L.cajas[p.id],ox=L.ox||0,H=L.h||1152;
  /* Lo angosto y ancho (los diez dedos) se mira más de cerca. */
  let rw=w*(w/h>2.5?1.2:1.7),rh=h*1.45;
  if(rw/rh<asp)rw=rh*asp;else rh=rw/asp;
  if(rh>H){rh=H;rw=rh*asp;}
  /* La parte un poco arriba del centro: abajo va su nombre. Hacia abajo no se
     ajusta al borde (los dedos quedarían bajo el nombre); arriba sí (la cabeza). */
  const rx=x+w/2-rw/2,ry=Math.max(0,y+h/2-rh*.42);
  const pon=(X,Y,W,Hh)=>'left:'+pc((X-rx)/rw*100)+';top:'+pc((Y-ry)/rh*100)+';width:'+pc(W/rw*100)+';height:'+pc(Hh/rh*100);
  return '<span class="cmp-img cmp-capa" role="img" aria-label="'+esc(alt||p.nombre)+'">'+
    '<img class="cmp-fondo" src="'+lamRuta(L,'babilonia')+'" alt="" decoding="async" style="'+pon(-150,-1,2050,1154)+'">'+
    L.capas.map(k=>'<img'+(k===p.id?' class="on"':'')+' src="'+lamRuta(L,k)+'" alt="" decoding="async" style="'+pon(ox,0,768,1152)+'">').join('')+'</span>';
}

/* ───────── COMPARAR, v209: LA HISTORIA EN UN SOLO RÍO ─────────
   Camilo (14-oct): «quiero el mejor diseño… no una presentación de niños sino
   como Hollywood». Tres piezas, todas armadas de cmpModelo():
   1. EL RÍO: la historia a escala, de 605 a.C. a hoy, y un carril por visión.
      Babilonia dura 66 años y Roma dividida, más de mil quinientos: se ve.
   2. LAS ÉPOCAS: una por fila, con su número, su nombre y sus fechas, y una
      tarjeta por visión (la que no la trae se ve vacía, para que las columnas
      se lean igual en todas las filas). En el teléfono las tarjetas se deslizan.
   3. LA SALA: tocar una época la abre a pantalla completa, con las imágenes
      lado a lado, su texto y sus fechas; ‹ › (o las flechas) pasan de época.
   Con seis visiones no cambia nada: el río suma carriles, las filas ruedan de
   lado y la sala acomoda las imágenes en la rejilla. */
const CMP_ROM=['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII'];
/* La escala del río: de 620 a.C. a hoy en el 92 % del ancho; el resto es «para siempre». */
const cmpX=y=>y==null?96:Math.max(0,Math.min(92,(y+620)/2646*92));
const cmpNom=k=>{const l=libroCid(k);return l?l.nombre+' '+l.n:k;};
function cmpRio(M){
  const pc=n=>(Math.round(n*100)/100)+'%';
  const carril=k=>{
    /* Lo que se pisa en fechas (los diez cuernos y el cuerno pequeño) va en otra pista. */
    const fin=[],pistas=[];
    const t=(LAMINAS[k].partes||[]).map(p=>{const key=Number.isFinite(p.de)?String(p.de):CMP_FIN;
      if(key===CMP_FIN){fin.push(p);return '';}
      const a=Math.min(Number.isFinite(p.a)?p.a:2026,2026);
      let n=pistas.findIndex(f=>f<=p.de);if(n<0){n=pistas.length;pistas.push(a);}else pistas[n]=a;
      return '<button type="button" class="cmp-tr" data-k="'+esc(key)+'" style="--c:'+esc(p.c||'')+';left:'+pc(cmpX(p.de))+';width:'+pc(Math.max(.9,cmpX(a)-cmpX(p.de)))+';--n:'+n+'" '+
        'aria-label="'+esc(cmpNom(k)+': '+p.nombre+', '+p.fechas)+'" onclick="cmpToca(\''+key+'\')"></button>';}).join('');
    const f=fin.length?'<button type="button" class="cmp-tr fin" data-k="'+CMP_FIN+'" style="--n:0" aria-label="'+esc(cmpNom(k)+': '+fin.map(p=>p.nombre).join(', '))+'" onclick="cmpToca(\''+CMP_FIN+'\')"></button>':'';
    return '<div class="cmp-carril" style="--pistas:'+Math.max(1,pistas.length)+'"><span class="cmp-carril-n">'+esc(cmpNom(k))+'</span><div class="cmp-carril-t">'+t+f+'</div></div>';
  };
  /* En el teléfono quedan las tres que caben: 605 a.C., 476 y hoy. */
  const marcas=[[-605,'605 a.C.'],[-331,'331','chico'],[1,'1 d.C.','ancho'],[476,'476 d.C.','tel'],[1798,'1798','ancho'],[2026,'hoy']];
  return '<div class="cmp-rio" role="group" aria-label="La historia a escala, de 605 a.C. hasta hoy">'+
    M.cols.map(carril).join('')+
    '<div class="cmp-eje" aria-hidden="true"><span class="cmp-eje-n"></span><div class="cmp-eje-t">'+
    marcas.map(([y,t,ch])=>'<span'+(ch?' class="'+ch+'"':'')+' style="left:'+pc(cmpX(y))+'">'+t+'</span>').join('')+
    '<span class="siempre" style="left:'+pc(96)+'">siempre</span></div></div></div>';
}
/* La época que se lee queda pegada arriba, justo debajo de las barras que ya
   están pegadas (la de la marca en el teléfono; dentro de Jóvenes, la de la app y
   las pestañas, que cambian de alto con el ancho): se mide, no se adivina. */
function cmpPega(){
  try{
    let y=0;
    document.querySelectorAll('.nav,.nav-b').forEach(n=>{if(!n.getClientRects().length)return;const cs=getComputedStyle(n),r=n.getBoundingClientRect();
      if(cs.position==='fixed'&&r.top<=1&&r.height<240)y=Math.max(y,r.bottom);
      else if(cs.position==='sticky')y=Math.max(y,(parseFloat(cs.top)||0)+r.height);});
    document.querySelectorAll('.cmp').forEach(c=>c.style.setProperty('--cmp-pega',Math.round(y)+'px'));
  }catch(e){}
}
if(typeof addEventListener==='function')addEventListener('resize',()=>{if(document.querySelector('.cmp'))cmpPega();});
function comparaHTML(){
  const M=cmpModelo();
  if(M.cols.length<1)return '';
  if(typeof setTimeout==='function')setTimeout(cmpPega,0);
  const fu=[...new Set(M.cols.map(k=>LAMINAS[k].paraleloFuente).filter(Boolean))];
  return '<div class="cmp" style="--cols:'+M.cols.length+'">'+
    '<div class="cmp-cab"><div class="cmp-ant">'+IC('comparar')+' Comparar · las profecías paralelas</div>'+
    '<h3 class="cmp-tit">Las mismas épocas en '+(M.cols.length===1?'una visión':M.cols.length+' visiones')+'</h3>'+
    '<p class="cmp-p">Una sola historia, de Babilonia al reino de Dios, contada '+(M.cols.length===1?'en una visión':'en '+M.cols.length+' visiones')+'. Toca una época para verlas lado a lado.</p></div>'+
    cmpRio(M)+
    '<div class="cmp-epocas">'+M.filas.map((f,i)=>
      '<section class="cmp-epoca" data-k="'+esc(f.key)+'" style="--c:'+esc(f.c)+'">'+
      '<button type="button" class="cmp-ecab" onclick="cmpToca(\''+f.key+'\')"><span class="cmp-num">'+(CMP_ROM[i]||i+1)+'</span>'+
        '<span class="cmp-et"><b>'+esc(f.reino)+'</b>'+(f.fechas?'<small>'+esc(f.fechas)+'</small>':'')+'</span><span class="cmp-abre">Lado a lado'+IC('der')+'</span></button>'+
      '<div class="cmp-cartas">'+M.cols.map(k=>{const ps=f.celdas[k]||[],p=ps[0];
        if(!p)return '<div class="cmp-carta vacia"><span class="cmp-img"></span><span class="cmp-lt"><small>'+esc(cmpNom(k))+'</small><b>No la trae</b></span></div>';
        return '<button type="button" class="cmp-carta" onclick="cmpToca(\''+f.key+'\')">'+cmpMini(LAMINAS[k],p,16/10,p.nombre)+
          '<span class="cmp-lt"><small>'+esc(cmpNom(k))+'</small><b>'+esc(ps.map(q=>q.nombre).join(' · '))+'</b></span></button>';}).join('')+'</div>'+
      /* En una caja angosta las vacías no se dibujan: se dice en una línea. */
      (()=>{const no=M.cols.filter(k=>!(f.celdas[k]||[]).length);return no.length?'<p class="cmp-faltan">No aparece en '+esc(no.map(cmpNom).join(', '))+'.</p>':'';})()+'</section>').join('')+
    '</div>'+(fu.length?'<p class="sec-fuente">Fuente: '+fu.join('; ')+'</p>':'')+'</div>';
}
/* La sala: una época a pantalla completa, cada visión lado a lado. */
let cmpSel='';
function cmpSalaHTML(M){
  const i=M.filas.findIndex(x=>x.key===cmpSel),f=M.filas[i];if(!f)return '';
  const con=M.cols.filter(k=>(f.celdas[k]||[]).length),sin=M.cols.filter(k=>!(f.celdas[k]||[]).length);
  const pc=n=>(Math.round(n*100)/100)+'%',fin=f.key===CMP_FIN,ant=M.filas[i-1],sig=M.filas[i+1];
  /* La época en la línea de la historia, en oro: hasta donde llega la que más dura. */
  const as=con.flatMap(k=>f.celdas[k].map(p=>p.a)).filter(Number.isFinite),a=as.length?Math.min(2026,Math.max(...as)):2026;
  const linea='<div class="cmp-sl" aria-hidden="true"><i style="left:'+pc(fin?92:cmpX(f.de))+';width:'+pc(fin?8:Math.max(.9,cmpX(a)-cmpX(f.de)))+'"></i>'+
    '<span style="left:0">605 a.C.</span><span style="left:'+pc(cmpX(1))+'">1 d.C.</span><span style="left:'+pc(92)+'">hoy</span></div>';
  const vis=k=>{const ps=f.celdas[k],L=LAMINAS[k],l=libroCid(k);
    return '<article class="cmp-vis">'+ps.map(p=>'<div class="cmp-vis-p">'+cmpMini(L,p,16/10,p.nombre)+
      '<div class="cmp-vis-tx"><small>'+esc(cmpNom(k))+'</small><b>'+esc(p.nombre)+'</b>'+
      (p.texto?'<p class="cmp-cita"><q>'+esc(p.texto)+'</q> <cite>'+esc(l.n+':'+String(p.ref||'').replace(/^\d+:/,''))+'</cite></p>':'')+
      (p.corto?'<p>'+esc(p.corto)+'</p>':'')+'</div></div>').join('')+
      '<button type="button" class="cmp-lam" onclick="cmpALamina(\''+k+'\')">'+IC('lupa')+' Ver en la lámina de '+esc(cmpNom(k))+'</button></article>';};
  return '<div class="cmp-sala-in" style="--c:'+esc(f.c)+';--n:'+con.length+'">'+
    '<div class="cmp-sala-bar"><span class="cmp-sala-cu">Época '+(CMP_ROM[i]||i+1)+' de '+M.filas.length+'</span>'+
      '<button type="button" class="cmp-x" onclick="cmpCierra()">'+IC('x')+' Cerrar</button></div>'+
    '<header class="cmp-sala-cab"><span class="cmp-num">'+(CMP_ROM[i]||i+1)+'</span><div><h2 id="cmpSalaT">'+esc(f.reino)+'</h2>'+
      (f.fechas?'<p class="cmp-sala-f">'+esc(f.fechas)+'</p>':'')+'</div></header>'+linea+
    '<div class="cmp-sala-g">'+con.map(vis).join('')+'</div>'+
    (sin.length?'<p class="cmp-sala-sin">No aparece en '+esc(sin.map(cmpNom).join(' ni en '))+'.</p>':'')+
    '<nav class="cmp-sala-nav" aria-label="Épocas">'+
      '<button type="button" class="cmp-nv"'+(ant?' onclick="cmpMueve(-1)"':' disabled')+'><small>Anterior</small><b>'+(ant?esc(ant.reino):'')+'</b></button>'+
      '<button type="button" class="cmp-nv sig"'+(sig?' onclick="cmpMueve(1)"':' disabled')+'><small>Siguiente</small><b>'+(sig?esc(sig.reino):'')+'</b></button></nav></div>';
}
let cmpVuelve='';
function cmpToca(key){
  const M=cmpModelo();if(!M.filas.some(f=>f.key===key))return;
  const s=document.getElementById('cmpSala');if(!s)return;
  const nueva=s.hidden;cmpSel=key;if(nueva)cmpVuelve=key;
  s.innerHTML=cmpSalaHTML(M);s.setAttribute('aria-labelledby','cmpSalaT');
  if(nueva){s.hidden=false;document.body.classList.add('leyendo');
    s.classList.remove('ve');void s.offsetWidth;s.classList.add('ve');}
  else{const g=s.querySelector('.cmp-sala-in');if(g){g.classList.add('cambia');}}
  s.scrollTop=0;
  const x=s.querySelector('.cmp-x');if(x&&nueva)x.focus();
}
function cmpMueve(d){
  const M=cmpModelo(),i=M.filas.findIndex(f=>f.key===cmpSel),f=M.filas[i+d];
  if(f)cmpToca(f.key);
}
function cmpCierra(){
  const s=document.getElementById('cmpSala');if(!s||s.hidden)return;
  s.hidden=true;s.classList.remove('ve');s.innerHTML='';
  if(!lamModo)document.body.classList.remove('leyendo');
  /* El foco vuelve a la época que se abrió. */
  const b=document.querySelector('.cmp-epoca[data-k="'+cmpVuelve+'"] .cmp-ecab');if(b&&b.focus)b.focus();
  cmpSel='';
}
function cmpALamina(k){cmpCierra();lamAbre(k,'explorar');}
document.addEventListener('keydown',e=>{
  const s=document.getElementById('cmpSala');if(!s||s.hidden||lamModo)return;
  if(e.key==='Escape'){e.preventDefault();cmpCierra();}
  else if(e.key==='ArrowRight'||e.key==='PageDown'){e.preventDefault();cmpMueve(1);}
  else if(e.key==='ArrowLeft'||e.key==='PageUp'){e.preventDefault();cmpMueve(-1);}
});
/* Se abre como un repaso más (el de «Daniel 2, 7, 8, 11 y 12»), con la tabla
   interactiva arriba y las tablas escritas debajo para lo que todavía no tiene
   lámina. */
const ES_COMPARAR=/-comparar$/;
/* En «Para profundizar» de un capítulo que ya es columna de la comparación. */
function cmpBoton(id){
  let M;try{M=cmpModelo();}catch(e){return '';}
  if(!M.cols.includes(id)||M.cols.length<2||!modsDe().some(x=>ES_COMPARAR.test(x.id)))return '';
  const otros=M.cols.filter(k=>k!==id).map(k=>{const l=libroCid(k);return l.nombre+' '+l.n;});
  return '<button type="button" class="cmp-ir" onclick="verComparar()">'+IC('comparar')+
    '<span><b>Compararlo con '+esc(otros.join(' y '))+'</b><small>Las mismas épocas, lado a lado: toca un poder y se enciende en cada visión.</small></span>'+IC('der','cmp-ir-fl')+'</button>';
}
function verComparar(){
  const m=modsDe().find(x=>ES_COMPARAR.test(x.id));
  if(m)verCap(m.id);
}

/* ───────── arranque ───────── */
try{
  pintaLogo();marcaCat();alcance=alcanceDeFiltro();reiniciaFuente();pintaInicio();
  { const pedido=leeConcursoPedido();
    if(pedido&&!ACTIVIDADES[pedido])concursoEspera=pedido;
    else if(pedido){try{sessionStorage.removeItem(CONCURSO_REC);}catch(e){}
      /* Se deja para cuando el archivo termine de cargar: cambiar de ficha
         usa piezas que se declaran más abajo. */
      if(!esNuevo()){S.ultPantalla='inicio';setTimeout(()=>abreConcurso(pedido),0);}else concursoPedido=pedido;} }
  if(esNuevo()){ir('bienvenida');bvPaso(1);}
  else if(S.ultPantalla && S.ultPantalla!=='inicio' && TABS[S.ultPantalla]!==undefined){
    if(S.ultPantalla==='estudio' && S.ultItem && buscaItem(S.ultItem))verCap(S.ultItem,true);
    else ir(S.ultPantalla);
    /* v156: y a la altura en que iba (ver «DÓNDE IBA LEYENDO»). Si no hay
       nada anotado, un capítulo reabierto se muestra desde su título. */
    if(!vuelveADonde()&&S.ultItem)llevaA('detalle');
  }else vuelveADonde();
}catch(e){console.error(e);}

/* ───────── entrar con el código (v20) ─────────
   POR QUÉ UN CÓDIGO Y NO UN USUARIO CON CONTRASEÑA
   Quien usa esto tiene entre 4 y 9 años. Un correo y una contraseña son dos
   cosas que olvidar y una que se escribe mal en un teclado de celular. El
   director entrega un código de 6 caracteres, se escribe UNA vez, y el aparato
   guarda una cookie de 60 días: las siete semanas de estudio caben enteras. */
function pintaSesion(){
  const d=document.getElementById('cb-sesion');
  if(!d)return;
  if(srvYo&&srvYo.rol==='participante'){
    d.innerHTML='<div class="card sesion"><div class="ses-h">Hola, '+esc(srvYo.nombre)+'</div>'+
      '<p class="nota">Categoría '+esc(srvYo.categoria)+'. Tus notas le llegan al director del club.</p>'+
      '<button class="btn gho" onclick="salirCodigo()">Salir de mi ficha</button></div>';
    return;
  }
  d.innerHTML='<div class="card sesion"><div class="ses-h">Entra con tu código</div>'+
    '<p class="nota">El director del club te da un código de 6 letras y números. '+
    'Se escribe una sola vez en este celular.</p>'+
    '<div class="ses-fila"><input id="cb-cod" maxlength="9" autocomplete="off" '+
    'spellcheck="false" placeholder="ABC234" oninput="this.value=this.value.toUpperCase()">'+
    '<button class="btn nar" onclick="entraCodigo()">Entrar</button></div>'+
    '<p class="nota" id="cb-cod-msg"></p>'+
    '<p class="nota">Sin código también puedes estudiar y practicar. El código sirve '+
    'para que tus notas queden con tu nombre y para el examen del día del evento.</p></div>';
}

async function entraCodigo(){
  const i=document.getElementById('cb-cod'),m=document.getElementById('cb-cod-msg');
  if(!i)return;
  if(m)m.textContent='Un momento...';
  try{
    const d=await srvFetch('/entrar',{method:'POST',body:JSON.stringify({codigo:i.value})});
    srvYo={rol:'participante',nombre:d.nombre,categoria:d.categoria};
    /* El código es la identidad: el nombre y la categoría los manda el
       servidor, y la ficha local se alinea con ellos. Antes había dos verdades
       sobre quién era la niña y cuál era su material; ahora hay una. */
    adoptaFicha(d);
    /* El momento exacto en que el progreso deja de ser de este navegador: se
       manda lo que haya en el aparato y baja lo que ella ya tenía. */
    try{await sincronizaProgreso();}catch(e){}
    pintaSesion();await cargaEvaluacion();pintaExInicio();pintaInicio();
    if(document.getElementById('cb-panel'))await pintaPanel();
    llevaA(evalPend?'cb-eval':'cb-sesion');
  }catch(e){
    if(m)m.innerHTML='<span style="color:var(--rojo-txt)">'+esc(e.message||'No se pudo conectar')+'</span>';
  }
}

/* ───────── entrar con un código NO renombra a quien estuviera ─────────
   MECANISMO DEL DEFECTO
   Esta función alineaba la ficha ACTIVA con lo que decía el servidor: le
   escribía encima el nombre y la categoría. Con una sola persona por aparato
   eso está bien. Con varias no: el celular de la casa tiene la ficha de Camila
   con su progreso, alguien entra con el código de Daniel, y la ficha de Camila
   pasa a llamarse Daniel CON EL PROGRESO DE CAMILA ADENTRO. Camila desaparece
   de la lista y Daniel arranca con 80% leído que no leyó.

   MEDIDO, no supuesto: ficha «Camila» con Daniel 1 al 80%, se adopta la ficha
   de Daniel, y queda una sola ficha, «Daniel», con d1=80.

   Es el MISMO defecto que ya se arregló al cambiar de actividad, y se arregla
   igual: el código identifica a una persona, así que se busca SU ficha y se
   pasa a ella, o se crea. Escribirle encima a la que estuviera solo se hace
   cuando esa no tiene nada que proteger, que es el caso de «+ Agregar». */
function adoptaFicha(d){
  if(!d)return;
  const nom=String(d.nombre||'').trim();
  const cat=(d.categoria&&CATS[d.categoria])?d.categoria:null;
  if(!nom&&!cat)return;

  /* PRIMERO POR `pid`, QUE ES LA IDENTIDAD DE VERDAD.
     Buscar por nombre funciona hasta que el nombre cambia, y desde v110 el
     director lo corrige cuando quiere. Sin esta pasada, corregir «Camila» a
     «Camila R.» dejaba la ficha vieja huerfana en el aparato y creaba una
     nueva en blanco: dos fichas de la misma nina, con caras casi iguales en
     la hoja de «¿quien estudia?».
     El `pid` no se adivina: lo manda el servidor en /yo y en /entrar, y lo
     estampa la sincronizacion. Una ficha vieja no lo tiene todavia, y por eso
     la busqueda por nombre sigue existiendo abajo como respaldo. */
  if(d.id){
    const porId=alumnos().find(([,al])=>al.pid===d.id);
    if(porId){
      if(porId[0]!==DB.activo)cambiaAlumno(porId[0]);
      let toco=false;
      if(nom&&S.nombre!==nom){S.nombre=nom;toco=true;}
      if(cat&&S.cat!==cat){S.cat=cat;toco=true;marcaCat();pintaCaps();}
      if(toco){guardar();pintaInicio();}
      return;
    }
  }

  /* ¿Ya existe la ficha de esa persona en esta actividad? Se compara por
     nombre y actividad, igual que pasaAActividad: dos fichas con el mismo
     nombre en la misma actividad es justo lo que se quiere evitar. */
  if(nom){
    const act=ACT_DE(cat||S.cat);
    const esMia=(S.nombre||'').trim().toLowerCase()===nom.toLowerCase()&&
                ACT_DE(S.cat)===act;
    if(!esMia){
      const suya=alumnos().find(([,al])=>ACT_DE(al.cat)===act&&
        (al.nombre||'').trim().toLowerCase()===nom.toLowerCase());
      if(suya){
        cambiaAlumno(suya[0]);
        /* Se le estampa el pid: la proxima vez se encuentra por id y ya no
           depende de que el nombre siga igual. */
        if(d.id&&S.pid!==d.id){S.pid=d.id;guardar();}
        if(cat&&S.cat!==cat){S.cat=cat;guardar();marcaCat();pintaCaps();pintaInicio();}
        return;
      }
      /* No existe y la de aquí tiene progreso: se crea la suya en vez de
         robarle la ficha a la otra persona. */
      if(!sinProgreso(S)){
        if(alumnos().length>=MAX_ALUMNOS){
          try{avisaApp('Este aparato ya tiene '+MAX_ALUMNOS+' fichas','Borra una para poder '+
            'entrar con otro código.');}catch(e){}
          return;
        }
        const id=nuevoId();
        DB.alumnos[id]=normalizar({pid:d.id||'',nombre:nom,cat:cat||S.cat});
        guardar();
        cambiaAlumno(id);
        return;
      }
    }
  }

  /* Queda el caso sano: es su propia ficha, o una ficha vacía que todavía no
     es de nadie. Ahí sí se escribe encima. */
  let cambio=false;
  if(d.id&&S.pid!==d.id){S.pid=d.id;cambio=true;}
  if(nom&&S.nombre!==nom){S.nombre=nom;cambio=true;}
  if(cat&&S.cat!==cat){S.cat=cat;cambio=true;}
  if(cambio){
    guardar();reiniciaPractica();
    marcaCat();pintaYo();pintaCaps();pintaInicio();refrescaPracticaSiVisible();
  }
}

async function salirCodigo(){
  try{await srvFetch('/salir',{method:'POST'});}catch(e){}
  srvYo=null;evalPend=null;evalHecha=false;pintaSesion();pintaEvaluacion();
  pintaExInicio();pintaInicio();
  if(document.getElementById('cb-panel'))await pintaPanel();
}

/* ───────── el panel del director (v20) ─────────
   La clave es la MISMA que la de v18. Aquí viaja al servidor para abrir una
   sesión de director; la de v18 sigue viviendo en el aparato y sirve para ver
   la revisión sin señal. Dos caminos, una sola clave que recordar. */
async function entraPanel(){
  const i=document.getElementById('pan-clave'),m=document.getElementById('pan-msg');
  if(!i)return;
  if(m)m.textContent='Un momento...';
  try{
    await srvFetch('/panel/entrar',{method:'POST',body:JSON.stringify({clave:i.value})});
    srvYo={rol:'director'};
    await pintaPanel();
  }catch(e){
    if(m)m.innerHTML='<span style="color:var(--rojo-txt)">'+esc(e.message||'No se pudo conectar')+'</span>';
  }
}

/* ───────── el panel del director ─────────
   TRES PASOS, EN EL ORDEN EN QUE HAY QUE HACERLOS
   Antes el botón «Abrir una evaluación» se pintaba ARRIBA del formulario: se
   veía el botón antes de saber que había campos, y abrir sin llenar nada era lo
   natural. Ahora el botón va al final y arranca deshabilitado.
   Los participantes se piden ANTES de pintar, no después: el paso 3 no puede
   decidir si el botón va habilitado sin saber cuántas hay. Pedirlos después
   obligaría a pintar el botón y corregirlo, que es cómo se ven los parpadeos. */
async function pintaPanel(){
  const d=document.getElementById('cb-panel');
  if(!d)return;
  if(!srvYo||srvYo.rol!=='director'){
    d.innerHTML='<div class="det-cuerpo"><p class="nota">Entra con la clave del director para '+
      'abrir y cerrar la evaluación del día y para manejar los códigos.</p>'+
      '<div class="ses-fila"><input id="pan-clave" type="password" autocomplete="off" placeholder="Clave">'+
      '<button class="btn azul" onclick="entraPanel()">Entrar</button></div>'+
      '<p class="nota" id="pan-msg"></p></div>';
    return;
  }
  /* null = no se pudo preguntar. No es lo mismo que «no hay»: con la red caída
     no se puede afirmar que falten participantes, así que el paso 3 no bloquea
     y lo dice. */
  let parts=null;
  try{parts=(await srvFetch('/panel/participantes')).participantes||[];}catch(e){parts=null;}
  const cuantasP=parts?parts.length:null;

  /* ANTES: con una evaluación abierta, este panel SOLO ofrecía cerrarla —
     "una sola forma de cerrar" — y escondía el asistente de abrir por
     completo, para que abrir y cerrar nunca se confundieran.
     CASO REAL DE CAMILO: eso le impedía tener a Guías Mayores, Aventureros y
     Devoción Matutina cada uno con SU evaluación corriendo el mismo rato,
     porque abrir la segunda escondía el control de la primera. Ahora el
     asistente (el registro y los dos pasos) SIEMPRE está a la vista, y lo que esté en curso se
     pinta aparte, en #pan-eval-en-curso (una tarjeta por evaluación abierta,
     cada una con su propio botón «Cerrar»). El servidor es quien de verdad
     evita la ambigüedad: nunca deja dos evaluaciones abiertas compartiendo
     categoría, así que abrir una nueva solo reemplaza la que se le cruce. */
  d.innerHTML='<div class="det-cuerpo">'+

    /* ESTO NO ES UN PASO, Y LLAMARLO «Paso 1 · ¿Quiénes participan?» era el
       origen de la confusión: prometía decidir quién participa en ESTA
       evaluación, y no lo hace. Es el registro del club, permanente. A quién
       le toca cada evaluación se decide abajo, en «A quiénes les toca». La
       misma pregunta contestada en dos sitios, y la primera mentía. */
    '<div class="pan-paso"><div class="pan-paso-t">Los del club, y su código</div>'+
    '<p class="nota">La lista del club, no la de esta evaluación: a quién le toca se escoge '+
    'más abajo. Cada una necesita su código de 6 caracteres, se lo das y ella lo escribe una '+
    'sola vez en su celular. El código no cambia nunca, ni al corregir el nombre.</p>'+
    '<div class="ses-fila"><input id="pan-nom" placeholder="Nombre" maxlength="40">'+
    /* AGRUPADO POR ACTIVIDAD, y no es cosmético.
       «Menores · 4 a 6 años» era la etiqueta EXACTA de dos categorías: la de
       Conexión Bíblica y la de Devoción Matutina. En el desplegable salían dos
       opciones idénticas y no había forma de saber cuál era cuál, así que
       crear una participante en la actividad equivocada era cuestión de suerte,
       y el error solo se notaba cuando la evaluación «no le llegaba». Lo mismo
       con las dos «Aventureros · 7 a 9 años». */
    '<select id="pan-cat">'+Object.keys(ACTIVIDADES).map(function(a){
      return '<optgroup label="'+esc(ACTIVIDADES[a].nombre)+'">'+
        CATS_DE_ACT(a).map(function(k){
          return '<option value="'+k+'">'+esc(catLarga(k))+'</option>';
        }).join('')+'</optgroup>';
    }).join('')+'</select>'+
    '<button class="btn azul" onclick="creaParticipante()">Agregar</button></div>'+
    '<div id="pan-lista"><p class="nota">Cargando...</p></div></div>'+

    /* El apagado del paso 2 lo maneja revisaAbrir(), no este armado: antes se
       calculaba UNA vez al pintar, así que crear la primera participante dejaba
       el paso 2 gris y con el letrero puesto hasta recargar. */
    '<div class="pan-paso" id="pan-paso2"><div class="pan-paso-t">Paso 1 · ¿Qué examen, y a quiénes?</div>'+
    '<p class="nota pan-razon" id="pan-paso2-razon"></p>'+
    '<div class="ses-fila"><label class="pan-lb">Nombre de la evaluación'+
    '<input id="pan-eval-t" placeholder="p. ej. Sábado 6 de septiembre" '+
    'maxlength="60" oninput="revisaAbrir()"></label></div>'+

    /* ───────── LAS RECETAS, Y POR QUE REEMPLAZAN AL DESPLEGABLE ─────────
       El desplegable de «Qué material» llego a 85 opciones: los grupos de las
       tres actividades, mas los 77 capitulos, mas los tramos. Se agrupo con
       <optgroup>, que es lo correcto, y en el iPhone del director se siguen
       viendo las 85 seguidas: el selector nativo de iOS no pinta las etiquetas
       de grupo. Un desplegable de 85 opciones en un celular no se lee, se
       recorre.

       Lo que de verdad hace falta no son 85 opciones: son cuatro exámenes que
       se abren siempre, y la posibilidad de armar cualquier otro. Eso es lo que
       hay aqui: una lista corta de recetas, y «Armarlo yo» para el resto. La
       receta no es un atajo a otro mecanismo: escribe en los MISMOS controles
       que abren la evaluacion, asi que no hay dos caminos que mantener. */
    '<p class="nota">Lo que más abres, de un toque. Después se puede ajustar.</p>'+
    '<div class="pan-recetas" id="pan-recetas"></div>'+

    /* LA FRASE. Es el estado completo dicho en una linea, y cada parte
       subrayada abre el control que la cambia. Antes el estado estaba repartido
       en seis campos y habia que leerlos todos para saber que se iba a abrir. */
    /* «AJUSTAR LO ESCOGIDO», tal como el maquetado C.
       Lo que de verdad se cambia despues de escoger una receta —el tramo o el
       capitulo, y cuantas preguntas— esta A LA VISTA, sin un toque de por
       medio. Lo demas (material, a quienes, dificultad y fuente) queda detras
       de un boton que dice lo que hay puesto, que es lo que hoy falta: para
       saber que dice una lista hay que abrirla.

       Los dos desplegables del tramo y el del capitulo viven AQUI y no dentro
       de un cajon que se repinta: llenaRangoPanel() les escribe las opciones,
       y volver a armar el HTML del contenedor se las borraria junto con lo que
       el director acaba de escoger. */
    '<div class="pan-grupo" id="pan-ajuste">'+
      '<div class="pan-grupo-t">Ajustar lo escogido</div>'+
      '<div id="pan-zona-fichas" hidden><div class="ex-fichas" id="pan-fichas"></div></div>'+
      '<div class="ses-fila" id="pan-zona-cap" hidden><label class="pan-lb">Cuál'+
      '<select id="pan-cap" onchange="pintaNotaAlcance()"></select></label></div>'+
      '<div class="ses-fila" id="pan-rango" hidden>'+
        '<label class="pan-lb">Desde<select id="pan-r1" onchange="cambiaDesdePanel()"></select></label>'+
        '<label class="pan-lb">Hasta<select id="pan-r2" onchange="pintaNotaAlcance()"></select></label>'+
      '</div>'+
      /* Los tamaños los pinta pintaChips(), porque dependen de cuantas
         preguntas hay de verdad con el material escogido. */
      '<div class="pan-chips" id="pan-chips"></div>'+
      '<div class="pan-acc" id="pan-acc"></div>'+
    '</div>'+
    /* Los dos avisos viven FUERA de los grupos plegables: el de «ninguna
       categoría recibe preguntas» es justo lo que impide abrir una evaluación
       vacía, y esconderlo detrás de un pliegue lo volvería inútil. */
    '<p class="nota" id="pan-nota-al">'+NOTA_ALCANCE.todo+'</p>'+
    '<p class="nota" id="pan-aviso-cats"></p>'+

    /* ───────── QUE MATERIAL: DOS PASOS, NO 85 OPCIONES ─────────
       Primero la actividad, que es la dimension de arriba del modelo, y
       despues lo suyo. Ningun desplegable pasa de los 31 dias de octubre, y el
       tramo imposible («de la Creencia 24 a Daniel 1») no se puede ni escoger,
       porque los dos extremos se llenan con los capitulos de UNA actividad. */
    '<div class="pan-grupo" id="g-material" hidden>'+
      '<div class="pan-grupo-t">Qué material entra'+
      '<button type="button" class="pan-listo" onclick="panAbre(\'\')">Listo</button></div>'+
      '<div class="ses-fila"><label class="pan-lb">Actividad'+
      '<select id="pan-act" onchange="cambiaActPanel()">'+
        '<option value="">Todas · cada categoría recibe la suya</option>'+
        Object.keys(ACTIVIDADES).map(function(a){
          return '<option value="'+a+'">'+esc(ACTIVIDADES[a].icono+' '+ACTIVIDADES[a].nombre)+'</option>';
        }).join('')+
      '</select></label>'+
      '<label class="pan-lb">Material'+
      '<select id="pan-mat" onchange="cambiaMaterialPanel()"></select></label></div>'+
    '</div>'+

    /* ───────── CUANTAS, QUE TAN DIFICIL, Y DE QUE FUENTE ───────── */
    '<div class="pan-grupo" id="g-cuantas" hidden>'+
      '<div class="pan-grupo-t">Cuántas preguntas y qué tan difícil'+
      '<button type="button" class="pan-listo" onclick="panAbre(\'\')">Listo</button></div>'+
      /* Los tamaños de un toque estan arriba, en «Ajustar lo escogido». Aqui
         queda el campo para cualquier otro numero, que el servidor acota entre
         5 y 60. */
      '<div class="ses-fila"><label class="pan-lb" style="flex:0 0 9rem">Otro número'+
      '<input id="pan-eval-n" type="number" min="5" value="15" '+
      'oninput="pintaFrase()"></label></div>'+
      /* Confusión real: al probar con «Comenzar» (practicar), este número no
         cambiaba nada, porque practicar usa su PROPIO selector de cantidad en
         la ficha del capítulo. Este campo solo rige la evaluación con código. */
      '<p class="nota">Esta cantidad es solo para la evaluación con código (botón <strong>Hacer la evaluación</strong>). Practicar con «Comenzar» tiene su propio número, en la ficha del capítulo.</p>'+
      '<div class="ses-fila"><label class="pan-lb">Dificultad'+
      '<select id="pan-eval-nv" onchange="pintaNotaNivel()">'+
        '<option value="0">La de cada categoría (recomendado)</option>'+
        '<option value="1">1 · básica</option>'+
        '<option value="2">2 · intermedia</option>'+
        '<option value="3">3 · avanzada</option>'+
      '</select></label></div>'+
      /* El texto describe LA OPCIÓN SELECCIONADA. Antes era fijo y describía
         siempre la opción 0: con «1 · básica» escogido, el panel afirmaba algo
         que no era cierto de lo que estaba puesto. */
      '<p class="nota" id="pan-nota-nv">'+NOTA_NIVEL[0]+'</p>'+
      /* Solo «En esto creemos» tiene dos fuentes de verdad: la cartilla y el
         libro de las 28. En Conexion Biblica, P&R es del reglamento. */
      '<label class="ex-sw" style="margin:.2rem 0 .1rem">'+
        '<input type="checkbox" id="pan-fuente" checked onchange="pintaAvisoCats();pintaFrase()">'+
        '<span>Solo el material del reglamento<br>'+
        '<small>Conexión Bíblica: solo Daniel y Profetas y Reyes, sin historia, otros '+
        'profetas ni intérpretes. En esto creemos: solo la cartilla, sin el libro de las 28.</small></span>'+
      '</label>'+
    '</div>'+

    /* ───────── A QUIENES LES TOCA ───────── */
    '<div class="pan-grupo" id="g-quienes" hidden>'+
      '<div class="pan-grupo-t">A quiénes les toca'+
      '<button type="button" class="pan-listo" onclick="panAbre(\'\')">Listo</button></div>'+
      '<p class="nota">Si no marcas ninguna, les toca a todas.</p>'+
      '<div class="pan-cats">'+Object.keys(CATS).map(function(k){
        return '<label class="pan-cat"><input type="checkbox" class="pan-cat-ch" value="'+k+'" '+
          'onchange="pintaAvisoCats();pintaFrase()"> '+
          '<span><strong>'+esc(CATS[k].nombre)+'</strong><br><small>'+esc((ACTIVIDADES[CATS[k].act]||{}).nombre||'')+' · '+esc(CATS[k].edad)+'</small></span></label>';
      }).join('')+'</div>'+
      /* POR PERSONA, que es el segundo nivel.
         Existe por un caso real: se reparten el material y una estudia del 1 al
         10 y otra del 11 al 20, las dos de la misma categoría y presentando el
         mismo rato. Con solo categorías eso no se podía, porque el servidor no
         deja dos abiertas que compartan categoría. Una dirigida a personas le
         gana a la de su categoría, así que se pueden tener las dos. */
      '<details class="pan-personas"><summary>O escoger personas, una por una</summary>'+
      '<p class="nota">Para cuando se reparten el material y cada una presenta su tramo. '+
      'Si marcas personas, <strong>mandan ellas</strong> y las categorías de arriba no cuentan. '+
      'A cada una le gana esta evaluación sobre la de su categoría, así que la del grupo '+
      'puede seguir abierta para las demás.</p>'+
      '<div class="pan-cats" id="pan-personas"><p class="nota">Cargando...</p></div>'+
      '</details>'+
    '</div></div>'+

    '<div class="pan-paso"><div class="pan-paso-t">Paso 2 · Abrir</div>'+
    /* LA BARRA, pegada al boton como en el maquetado: es lo ultimo que se lee
       antes de tocarlo. Dice lo escogido y CUANTAS PREGUNTAS RECIBE de verdad
       quien lo va a presentar. Esa cifra faltaba: el panel avisaba cuando una
       categoria recibia CERO, pero nunca cuantas recibe, asi que pedir 25 de un
       tramo que solo tiene 10 se descubria el dia del examen. */
    '<p class="pan-resumen" id="pan-resumen"></p>'+
    '<div class="pan-sw"><button class="btn azul" id="pan-abrir" disabled '+
    'onclick="abreEvaluacion()">Abrir una evaluación</button>'+
    '<span class="nota pan-razon" id="pan-abrir-razon"></span></div>'+
    /* Ya no dice "todos los aparatos": con categorías marcadas, solo se les
       les llega a esas — a las demás no les cambia nada. Si de
       verdad se marcan todas (o ninguna), pintaAvisoCats() ya lo advierte
       con más detalle (incluida cuál evaluación en curso se reemplazaría). */
    '<p class="nota">Cada participante de esas categorías que ya entró con su código ve la '+
    'evaluación en su pantalla. Los exámenes de práctica <strong>siguen abiertos</strong>: '+
    'abrir una evaluación ya no los cierra.</p></div>'+

    /* LA ENTRADA AL REVISOR VA AQUI Y NO EN LOS PASOS.
       Revisar el banco no es un paso de abrir una evaluacion: es el trabajo de
       otro dia, el de decidir que preguntas se quedan. Ponerlo como «paso 4»
       lo haria ver obligatorio antes de abrir. */
    '<div class="pan-paso"><div class="pan-paso-t">El banco de preguntas</div>'+
    '<p class="nota">Leer las preguntas una por una y retirar las que no deban '+
    'salir. Retirar no borra nada: la pregunta se puede devolver, y lo retirado '+
    'deja de entrar en cualquier examen.</p>'+
    '<button class="btn azul" onclick="abreRevisor()">Revisar las preguntas</button></div>'+

    /* EL HISTORIAL VA AQUI POR LA MISMA RAZON QUE EL REVISOR: no es un paso de
       abrir una evaluacion, es lo que se mira despues. */
    '<div class="pan-paso"><div class="pan-paso-t">Evaluaciones y notas</div>'+
    '<p class="nota">Todas las evaluaciones, abiertas y cerradas, con quién la hizo y '+
    'qué sacó. Cerrar una ya no la esconde.</p>'+
    '<button class="btn azul" onclick="abreHistorial()">Ver el historial</button></div>'+

    '<div id="pan-eval-en-curso"></div></div>';
  cargaParticipantes(parts);
  /* El orden importa: primero las listas del material (que dependen de la
     actividad), despues la frase, que las lee. */
  pintaRecetas();
  cambiaActPanel();
  revisaAbrir(cuantasP);
  pintaAvisoCats();
  pintaFrase();
  panLatido();
  await cargaResultados();
}

/* ───────── un capitulo suelto como alcance de la evaluacion ─────────
   La columna `alcance` de la tabla siempre acepto un id de capitulo, y la
   practica ya sabia armar «solo Daniel 1». Lo que faltaba era el desplegable:
   el panel solo ofrecia grupos, asi que abrir la evaluacion de un capitulo
   suelto no se podia pedir. Se listan agrupados por actividad, que es la
   dimension de arriba, y se marca el que es solo material de estudio: abrirle
   una evaluacion a ese capitulo deja a las participantes sin preguntas.
   Los capitulos que NINGUNA categoria examina no se ofrecen. */
/* Los extremos del rango: TODOS los capitulos, agrupados por actividad. Se
   ofrecen completos, incluidos los que son solo material de estudio, porque un
   rango es un tramo del material y cortarlo por la mitad seria mas raro que
   incluirlo; lo que no tenga preguntas simplemente no aporta ninguna. */
/* El alcance de una evaluación en palabras, para la tarjeta de «en curso». Sin
   esto la tarjeta decía el título y a quién, pero no QUÉ material, que es justo
   lo que cambia entre dos evaluaciones abiertas del mismo grupo. */
function textoAlcancePanel(alc){
  const K=clavesDe(alc);
  if(K)return 'Las '+K.size+' preguntas que más costaron';
  const L=listaDe(alc);
  if(L)return textoLista(L);
  const r=rangoDe(alc);
  if(r)return textoRango(r);
  const c=CAPS.find(x=>x.id===alc);
  if(c)return 'Solo '+c.label+' — '+c.sub;
  return {todo:'Todo el material de cada categoría',creencias:'Las 28 creencias',
    biblia:'Solo el libro de Daniel',pr:'Solo Profetas y Reyes',
    q1:'Del 1 al 15 de octubre',q2:'Del 16 de octubre en adelante'}[alc]||alc;
}

/* Los capitulos de UNA actividad, en orden. */
function capsDeActividad(a){
  const cats=CATS_DE_ACT(a);
  return CAPS.filter(c=>c.cats.some(k=>cats.includes(k)));
}

/* Los dos extremos del tramo, llenados para la actividad escogida.
   «Hasta» solo ofrece lo que SI forma tramo con «Desde»: mismo tipo de
   capitulo y de ahi en adelante. Dentro de Conexion Biblica todavia hay dos
   tipos, Daniel y Profetas y Reyes, y un tramo de uno al otro no existe; con
   la lista filtrada no hay como escogerlo. */
function llenaRangoPanel(act,mantener){
  const s1=document.getElementById('pan-r1'),s2=document.getElementById('pan-r2');
  if(!s1||!s2)return;
  const caps=capsDeActividad(act||PRIMERA_ACT);
  if(!caps.length)return;
  const prev1=mantener&&caps.some(c=>c.id===s1.value)?s1.value:caps[0].id;
  s1.innerHTML=caps.map(c=>'<option value="'+c.id+'">'+esc(c.label)+'</option>').join('');
  s1.value=prev1;
  const fam=caps.filter(c=>familiaDe(c.id)===familiaDe(prev1)&&numDe(c.id)>=numDe(prev1));
  const prev2=mantener&&fam.some(c=>c.id===s2.value)?s2.value:fam[fam.length-1].id;
  s2.innerHTML=fam.map(c=>'<option value="'+c.id+'">'+esc(c.label)+'</option>').join('');
  s2.value=prev2;
}

/* Un capitulo suelto como alcance. La columna `alcance` de la tabla siempre lo
   acepto y la practica siempre supo armar «solo Daniel 1»; lo que faltaba era
   poder pedirlo. Se listan los de LA ACTIVIDAD escogida, y solo los que alguna
   categoria de verdad examina: abrirle una evaluacion a un capitulo que es solo
   material de estudio deja a las participantes sin una sola pregunta. */
/* Los capitulos que ALGUNA categoria de la actividad examina de verdad. Se
   usa en dos sitios —el desplegable y la cifra de la receta— y por eso es una
   funcion: con la cuenta escrita aparte, la receta diria «18 capitulos» y el
   desplegable ofreceria otra cantidad. */
const capsExaminables=act=>{
  const cats=CATS_DE_ACT(act||PRIMERA_ACT);
  return capsDeActividad(act||PRIMERA_ACT)
    .filter(c=>cats.some(k=>c.cats.includes(k)&&!soloEstudio(c,k)));
};

function llenaCapPanel(act,mantener){
  const s=document.getElementById('pan-cap');
  if(!s)return;
  const caps=capsExaminables(act);
  if(!caps.length){s.innerHTML='';return;}
  const prev=mantener&&caps.some(c=>c.id===s.value)?s.value:caps[0].id;
  s.innerHTML=caps.map(c=>'<option value="'+c.id+'">'+
    esc(c.label+' — '+c.sub)+'</option>').join('');
  s.value=prev;
}

/* EL MATERIAL QUE OFRECE CADA ACTIVIDAD. Sale de la actividad y no de una
   lista fija: la lista fija fue la que le ofrecia «Solo Profetas y Reyes» a
   quien no lo tiene. Sin actividad escogida solo cabe «todo», porque cualquier
   otro recorte pertenece a una actividad en particular. */
/* Cada opcion trae dos etiquetas: la larga explica en el desplegable, donde
   hay renglon entero, y la corta es la que cabe en el acceso de «Material»,
   que vive en una tarjeta angosta. Dos textos para lo mismo se separarian, asi
   que van juntos en la misma linea y salen de aqui los dos. */
function opcionesMatPanel(act){
  const tipo=TIPO_ACT(act);
  if(tipo==='libro'){
    /* v178: Apocalipsis es un solo libro: sin «solo el libro» ni P&R. */
    const suyos=CAPS.filter(c=>(c.cats||[]).some(k=>CATS[k]&&CATS[k].act===act));
    const lb=(suyos.map(c=>libroCid(c.id)).find(Boolean)||{nombre:'Daniel'}).nombre;
    const conPR=suyos.some(c=>esPR(c.id));
    return [['todo','Todo el material de '+ACTIVIDADES[act].nombre,'todo'],
      ...(conPR?[['biblia','Solo el libro de '+lb,'solo '+lb],['pr','Solo Profetas y Reyes','solo Profetas y Reyes']]:[]),
      ['fichas','Los capítulos que escojas','los que escojas']];
  }
  if(tipo==='dias')return [['todo','Todo el cuadernillo de octubre','todo octubre'],
    ['q1','Solo la primera quincena (1 al 15)','primera quincena'],
    ['q2','Solo la segunda quincena (16 en adelante)','segunda quincena'],
    ['cap','Un día, el que escojas','un día'],
    ['tramo','Un tramo de días: desde… hasta…','un tramo']];
  if(tipo==='creencias')return [['creencias','Las 28 creencias','las 28'],
    ['cap','Una creencia, la que escojas','una creencia'],
    ['tramo','Un tramo de creencias: desde… hasta…','un tramo']];
  return [['todo','Todo el material de cada categoría','todo']];
}

/* Cambiar de actividad rehace las tres listas de abajo y MARCA las categorías
   de esa actividad. Eso ultimo no es cosmetico: abrir «la primera quincena»
   sin marcar a nadie se la abre tambien a Conexion Biblica y a las creencias,
   que no tienen ese material, y esas se quedan sin una sola pregunta. Queda
   marcado, no fijo: el grupo «A quiénes les toca» sigue estando para cambiarlo. */
/* Lo escogido en las fichas del panel. Arranca con todo marcado: el director
   quita o toca «todo Daniel», que es mas rapido que marcar uno por uno. */
let panFichas=[];
/* Quien no examina alguno de los capitulos ofrecidos, dicho con el dato y no
   a mano: la frase escrita nombraba a Guias Mayores cuando ya era otra ficha. */
function loQueNoTienen(act,caps){
  const frases=CATS_DE_ACT(act).map(k=>{
    const falta=caps.filter(c=>!c.cats.includes(k)||soloEstudio(c,k)).map(c=>c.label);
    return falta.length?CATS[k].nombre+' no tiene '+falta.join(', '):'';
  }).filter(Boolean);
  return frases.length?' Cada categoría recibe solo los que tiene: '+frases.join('; ')+'.':'';
}
/* Las fichas son de un libro. Si la actividad escogida lo es, son las suyas;
   si no hay ninguna escogida (o es de otro tipo), las del primer libro. */
const actLibroPanel=()=>{
  const a=(document.getElementById('pan-act')||{}).value||'';
  return TIPO_ACT(a)==='libro'?a:(actDeTipo('libro')||PRIMERA_ACT);
};
function fichaPan(tipo,v){
  const caps=capsExaminables(actLibroPanel());
  panFichas=tocaFicha(panFichas.length?panFichas:caps.map(c=>c.id),caps,tipo,v);
  pintaNotaAlcance();
}

function cambiaActPanel(){
  const act=(document.getElementById('pan-act')||{}).value||'';
  panFichas=capsExaminables(actLibroPanel()).map(c=>c.id);
  const m=document.getElementById('pan-mat');
  if(m){
    const ops=opcionesMatPanel(act);
    m.innerHTML=ops.map(o=>'<option value="'+o[0]+'">'+esc(o[1])+'</option>').join('');
    m.value=ops[0][0];
  }
  llenaRangoPanel(act,false);
  llenaCapPanel(act,false);
  const suyas=act?CATS_DE_ACT(act):[];
  [].slice.call(document.querySelectorAll('.pan-cat-ch')).forEach(function(c){
    c.checked=suyas.indexOf(c.value)>=0;
  });
  pintaNotaAlcance();
}

/* Cambiar de material solo cambia que sub-control se ve; el tramo y el
   capitulo ya estan llenos con los de esta actividad. */
function cambiaMaterialPanel(){
  pintaNotaAlcance();
}

/* Cambiar «Desde» puede dejar «Hasta» atras o en otro tipo: se vuelve a armar
   la lista, que es lo que impide el estado invalido. */
function cambiaDesdePanel(){
  llenaRangoPanel((document.getElementById('pan-act')||{}).value||'',true);
  pintaNotaAlcance();
}

/* El alcance que de verdad se manda. Es la UNICA traduccion de lo que hay en
   pantalla a lo que el servidor guarda, y por eso las recetas escriben en los
   controles y no aqui: un segundo camino a `alcance` seria un segundo formato
   que mantener. */
function alcancePanel(){
  const m=(document.getElementById('pan-mat')||{}).value||'todo';
  if(m==='cap')return (document.getElementById('pan-cap')||{}).value||'todo';
  if(m==='fichas')return alcanceDeFichas(panFichas,capsExaminables(actLibroPanel()))||'todo';
  if(m==='tramo'){
    const a=(document.getElementById('pan-r1')||{}).value||'';
    const b=(document.getElementById('pan-r2')||{}).value||'';
    return a&&b?(a+'..'+b):'todo';
  }
  return m;
}

/* Un texto por opción de dificultad. Los niveles los calcula fuente/niveles.js:
   1 es dato directo, 2 agrega verdadero/falso y redacciones, 3 agrega completar
   el versículo y las diferencias entre versiones. Un nivel incluye los de
   abajo, así que subir agrega preguntas, no las reemplaza. */
/* Un texto por material. El de las creencias avisa a quién le toca: el
   reglamento las pide a padres, consejeros y acompañantes, y solo esas dos
   categorías tienen ese material cargado. */
const NOTA_ALCANCE={
  todo:'Cada categoría recibe el material de SU actividad: las de Conexión Bíblica reciben '+
    'Daniel y Profetas y Reyes, las de Devoción Matutina reciben las lecturas de octubre y las '+
    'de En esto creemos reciben las 28 creencias. Es la opción del examen del campamento.',
  creencias:'Las 28 creencias fundamentales. Solo las dos categorías de «En esto creemos» '+
    'tienen este material: si se la abres a una de Conexión Bíblica o de la matutina, a ellas '+
    'no les va a salir nada.',
  biblia:'Solo el libro de Daniel, sin Profetas y Reyes. Es material de Conexión Bíblica.',
  pr:'Solo los capítulos de Profetas y Reyes que le tocan a la categoría. Es material de '+
    'Conexión Bíblica.',
  q1:'Las lecturas de la Devoción Matutina del 1 al 15 de octubre. Es material de Devoción '+
    'Matutina: las categorías de Conexión Bíblica y de las creencias no lo tienen.',
  q2:'Las lecturas de la Devoción Matutina del 16 de octubre en adelante. «Menores» de la '+
    'matutina solo estudia hasta el 15, así que a esa categoría no le sale nada.'
};

/* CUÁNTAS PREGUNTAS LE SALDRÍAN A UNA CATEGORÍA CON ESTE MATERIAL.
   El pool cuelga de dos globales, S.cat y alcance, así que no hay forma de
   preguntarlo sin pararse un momento en esa categoría y devolver las dos como
   estaban. Es el mismo truco de gruposEx(), que ya hace esto en la práctica. */
function cuantasPara(cat,alc){
  const pc=S.cat,pa=alcance,pf=soloFuente,pfa=soloFuenteAct;
  /* Con el interruptor puesto, el aviso tiene que contar lo que de verdad va a
     recibir esa categoria. Sin esto decia «274 preguntas» y el examen salia
     con otra cifra. */
  try{S.cat=cat;alcance=alc;
    soloFuente=!!(document.getElementById('pan-fuente')||{}).checked;soloFuenteAct=ACT_DE(cat);
    return poolDe().length;}
  finally{S.cat=pc;alcance=pa;soloFuente=pf;soloFuenteAct=pfa;}
}

/* AVISO DE COMBINACIÓN VACÍA.
   El material y las categorías son dos listas independientes y una
   combinación imposible no falla en ninguna parte: abre una evaluación que al
   participante le sale con CERO preguntas, y eso solo se descubre el día del
   examen. Se advertía en prosa, y solo para las creencias. Ahora se cuenta de
   verdad, contra el mismo banco que arma el examen. */
function pintaAvisoCats(){
  const p=document.getElementById('pan-aviso-cats');
  if(!p)return;
  const al=alcancePanel();
  /* CON PERSONAS MARCADAS MANDAN ELLAS, y lo que hay que revisar es si el
     material le sirve a SU categoría, no a las categorías marcadas arriba.
     Calcularlo sobre las de arriba diría que todo está bien mientras la
     persona escogida se queda sin una sola pregunta. */
  const personas=personasEval();
  const catsDePersonas=[...new Set(personas.map(function(id){
    const x=panParts.find(function(y){return y.id===id;});
    return x?x.categoria:'';
  }).filter(Boolean))];
  const marcadas=personas.length?catsDePersonas
    :[].slice.call(document.querySelectorAll('.pan-cat-ch'))
      .filter(function(c){return c.checked;}).map(function(c){return c.value;});
  /* Sin marcar ninguna les toca a todas, y ahí el dato útil es al revés: no
     la lista de las siete que se quedan sin nada, sino la de las que sí
     reciben. Nombrarlas todas era un párrafo que nadie lee. */
  const todas=!marcadas.length;
  const cats=todas?Object.keys(CATS):marcadas;
  const nom=function(c){
    return '<strong>'+esc(actYCat(c))+'</strong>';
  };
  const con=cats.filter(function(c){return cuantasPara(c,al)>0;});
  const sin=cats.filter(function(c){return cuantasPara(c,al)===0;});
  let t='';
  if(!con.length)t=IC('alerta')+' Con este material <strong>ninguna categoría recibe preguntas</strong>. '+
    'Escoge otro material.';
  else if(!sin.length)t='';
  else if(todas)t=IC('alerta')+' Con este material solo reciben preguntas '+con.map(nom).join(' y ')+
    '. A las demás no les sale nada, así que marca abajo a quiénes les toca.';
  else t=IC('alerta')+' '+sin.map(nom).join(', ')+(sin.length===1?' no recibe':' no reciben')+
    ' ninguna pregunta con este material.';
  /* Aviso de solape: si lo que se va a abrir se cruza en categoría con algo
     que YA está en curso (panAbiertas, cargado por cargaResultados()), abrir
     lo reemplaza. Se avisa ANTES de que el director le dé al botón, no
     después: sin esto, cerrar una evaluación en curso por accidente se veía
     igual que abrir una nueva sin más. */
  /* El solape se mide EN EL MISMO NIVEL en que se va a abrir, igual que lo
     hace el servidor: una dirigida a personas solo choca con otra dirigida a
     personas que comparta alguna, y la del grupo se queda abierta. */
  const catsPend=todas?Object.keys(CATS):marcadas;
  const solapa=panAbiertas.filter(function(ev){
    if(personas.length)return (ev.ids||[]).some(function(x){return personas.indexOf(x)>=0;});
    if((ev.dirigida||[]).length)return false;
    const catsEv=(!ev.categorias||ev.categorias==='*')?Object.keys(CATS):ev.categorias.split(',');
    return catsPend.some(function(c){return catsEv.indexOf(c)>=0;});
  });
  if(solapa.length)t+=(t?'<br>':'')+IC('repetir')+' Si la abres, se cierra: '+
    solapa.map(function(ev){return '<strong>'+esc(ev.titulo)+'</strong>';}).join(', ')+'.';
  if(personas.length)t+=(t?'<br>':'')+IC('persona')+' Va dirigida a '+personas.length+
    (personas.length===1?' persona':' personas')+', no a las categorías de arriba.';
  p.innerHTML=t?'<span style="color:var(--rojo-txt)">'+t+'</span>':'';
}

/* Que fuente nombra el reglamento para cada actividad, en palabras. Se dice
   cual es, no «la oficial»: el punto del interruptor es saber que entra. */
const FUENTE_TXT={
  libro:'Solo el libro de Daniel y Profetas y Reyes. Deja fuera historia, otros profetas e intérpretes.',

  dias:'Solo el cuadernillo de octubre.',
  creencias:'Solo la cartilla «En esto creemos». Deja fuera lo que sale del libro de las 28 creencias.'
};

/* Por qué un rango escogido no sirve, en palabras, o cadena vacía si sirve.
   Devuelve el motivo y no un booleano porque el botón de abrir se apaga CON LA
   RAZÓN A LA VISTA: un botón gris sin explicación es el defecto que ya se
   arregló en el paso 3. */
/* GUARDA DE ULTIMO RECURSO, no la forma de avisar.
   Desde que «Hasta» se arma a partir de «Desde» y los dos salen de UNA
   actividad, un tramo invalido no se puede escoger, asi que esto no deberia
   disparar nunca. Se queda porque apaga el boton de abrir si alguien cambia
   los desplegables por otro camino: una evaluacion abierta con un tramo que no
   existe no le da preguntas a nadie, y el director se entera el dia del examen. */
function motivoRangoMalo(){
  const m=(document.getElementById('pan-mat')||{}).value||'';
  if(m!=='tramo')return '';
  const a=(document.getElementById('pan-r1')||{}).value||'';
  const b=(document.getElementById('pan-r2')||{}).value||'';
  if(!a||!b)return 'Falta escoger los dos extremos del tramo.';
  if(!rangoDe(a+'..'+b))return 'Ese tramo no existe: los dos extremos tienen que ser '+
    'del mismo material y en orden.';
  return '';
}

function pintaNotaAlcance(){
  const m=document.getElementById('pan-mat'),p=document.getElementById('pan-nota-al');
  if(!m||!p)return;
  const zc=document.getElementById('pan-zona-cap'),zr=document.getElementById('pan-rango');
  if(zc)zc.hidden=m.value!=='cap';
  if(zr)zr.hidden=m.value!=='tramo';
  const zf=document.getElementById('pan-zona-fichas');
  if(zf)zf.hidden=m.value!=='fichas';
  if(m.value==='fichas'){
    const caps=capsExaminables(actLibroPanel());
    if(!panFichas.length)panFichas=caps.map(c=>c.id);
    const pf=document.getElementById('pan-fichas');
    if(pf)pf.innerHTML=htmlFichas(caps,panFichas,'fichaPan');
    p.textContent='Entra: '+textoAlcancePanel(alcancePanel())+'.'+loQueNoTienen(actLibroPanel(),caps);
    pintaAvisoCats();revisaAbrir();pintaFrase();return;
  }

  if(m.value==='tramo'){
    const mal=motivoRangoMalo();
    if(mal){
      p.innerHTML='<span style="color:var(--rojo-txt)">'+esc(mal)+'</span>';
      pintaAvisoCats();revisaAbrir();pintaFrase();return;
    }
    p.textContent=textoRango(rangoDe(alcancePanel()))+'. A una categoría que no tenga '+
      'ese material no le sale ninguna pregunta.';
    pintaAvisoCats();revisaAbrir();pintaFrase();return;
  }
  /* Con un capitulo suelto no hay texto escrito a mano: se arma con el dato,
     y se dice QUE CATEGORIAS lo examinan, que es lo que el director necesita
     saber antes de marcar a quien le toca. */
  const c=m.value==='cap'?CAPS.find(x=>x.id===alcancePanel()):null;
  if(c){
    const cats=Object.keys(CATS).filter(k=>c.cats.includes(k)&&!soloEstudio(c,k));
    p.textContent='Solo '+c.label+' — '+c.sub+'. Lo examinan: '+
      (cats.length?cats.map(k=>actYCat(k,'par')).join(', ')
                  :'ninguna categoría')+
      '. A una categoría que no lo tenga no le sale ninguna pregunta.';
  } else p.textContent=NOTA_ALCANCE[m.value]||'';
  pintaAvisoCats();revisaAbrir();pintaFrase();
}

/* ───────── LAS RECETAS Y LA FRASE ─────────
   Una receta es un punto de partida, no un modo aparte: escribe en los mismos
   controles y desde ahi se puede cambiar todo. Por eso no hay estado «estoy en
   la receta X» que pueda quedar desincronizado del formulario; lo unico que se
   guarda es cual quedo resaltada. */
const RECETAS=[
  {id:'campamento',i:'📘',t:'El examen del campamento',act:'',mat:'todo',
   d:()=>'Todo el material de cada categoría · a las '+Object.keys(CATS).length+' categorías'},
  /* Una por cada actividad que sea un libro: la de Guias Mayores tiene sus
     propios capitulos y no cabia en la de Conexion Biblica. */
  ...Object.keys(ACTIVIDADES).filter(a=>TIPO_ACT(a)==='libro').map(a=>(
    {id:'libro-'+a,i:'📖',t:'Capítulos de '+ACTIVIDADES[a].nombre,act:a,mat:'fichas',
     d:()=>'Solo Daniel, solo P&R o los que escojas · '+capsExaminables(a).length+' con examen'})),
  {id:'matutina',i:'🌅',t:'Un tramo de la matutina',act:actDeTipo('dias'),mat:'tramo',
   d:()=>'Desde y hasta, dentro de los '+capsDeActividad(actDeTipo('dias')).length+' días'},
  {id:'creencias',i:'✝️',t:'Las 28 creencias',act:actDeTipo('creencias'),mat:'creencias',
   d:()=>'A las '+CATS_DE_ACT(actDeTipo('creencias')).length+' categorías de En esto creemos'},
  {id:'yo',i:'⚙️',t:'Armarlo yo',act:null,mat:null,
   d:()=>'Material, cantidad, dificultad y a quiénes'},
];
let panReceta='';
/* Que grupo de controles esta abierto: '', 'material', 'cuantas', 'quienes' o
   'todo'. Uno a la vez, salvo «Armarlo yo», que los abre los tres. */
let panEdita='';

function pintaRecetas(){
  const d=document.getElementById('pan-recetas');
  if(!d)return;
  d.innerHTML=RECETAS.map(function(r){
    /* LA ESCOGIDA DICE LO QUE HAY PUESTO, no su descripcion generica: es lo
       que el maquetado marcaba en naranja. «Un tramo de la matutina» sin mas
       no distingue el tramo del 2 al 18 del tramo de todo octubre, y esa es
       justo la diferencia que hay que ver antes de abrir. */
    const sub=(panReceta===r.id&&r.act!==null)
      ? textoAlcancePanel(alcancePanel())+' · '+
        ((document.getElementById('pan-eval-n')||{}).value||'15')+' preguntas'
      : r.d();
    return '<button type="button" class="pan-receta'+(panReceta===r.id?' on':'')+
      (r.id==='yo'?' otra':'')+'" onclick="ponReceta(\''+r.id+'\')">'+
      '<span class="pan-receta-i">'+(icoDe(r.i)||esc(r.i))+'</span>'+
      '<span class="pan-receta-x"><strong>'+esc(r.t)+'</strong>'+
      '<small>'+esc(sub)+'</small></span></button>';
  }).join('');
}

function ponReceta(id){
  const r=RECETAS.find(x=>x.id===id);
  if(!r)return;
  panReceta=id;
  if(r.act===null){pintaRecetas();panAbre('todo');return;}
  const a=document.getElementById('pan-act');
  if(a){a.value=r.act;cambiaActPanel();}
  const m=document.getElementById('pan-mat');
  if(m){m.value=r.mat;}
  pintaNotaAlcance();
  pintaRecetas();
  /* NINGUNA receta abre un cajon: lo que cada una deja por escoger —el tramo o
     el capitulo— ya esta a la vista en «Ajustar lo escogido». Abrir ademas el
     cajon del material mostraba los mismos dos desplegables de actividad y
     material que la receta acaba de poner, que es pedirle al director que
     confirme algo que no tiene que decidir. */
  panAbre('');
}

function panAbre(g){
  panEdita=(panEdita===g&&g!=='todo')?'':g;
  ['material','cuantas','quienes'].forEach(function(x){
    const e=document.getElementById('g-'+x);
    if(e)e.hidden=!(panEdita===x||panEdita==='todo');
  });
  pintaFrase();
}

function ponCuantasPanel(n){
  const e=document.getElementById('pan-eval-n');
  if(e)e.value=n;
  pintaFrase();
}

/* A quiénes, en palabras. Las personas mandan sobre las categorías, igual que
   en el servidor: decirlo al revés aquí haría que la frase mintiera. */
function textoQuienes(){
  const personas=personasEval();
  if(personas.length){
    const nn=personas.map(function(id){
      const x=panParts.find(function(y){return y.id===id;});
      return x?x.nombre:'';
    }).filter(Boolean);
    return nn.length<=3?nn.join(', '):(nn.length+' personas escogidas');
  }
  const cats=[].slice.call(document.querySelectorAll('.pan-cat-ch'))
    .filter(function(c){return c.checked;}).map(function(c){return c.value;});
  if(!cats.length||cats.length===Object.keys(CATS).length)return 'todas las categorías';
  /* La actividad se nombra UNA vez cuando todas las marcadas son de la misma.
     La regla sigue siendo la de siempre —«Menores» solo no identifica nada,
     porque existe en dos actividades—, pero repetir el icono en cada nombre
     alargaba la frase hasta partirla en tres renglones en un celular. */
  const acts=[...new Set(cats.map(function(c){return CATS[c].act;}))];
  if(acts.length===1){
    const nom=(ACTIVIDADES[acts[0]]||{}).nombre;
    /* Si estan TODAS las de esa actividad, se dice asi y no se listan: «Padres
       y consejeros» ya lleva una «y» adentro, y cuatro nombres pegados con
       comas se vuelven un renglon que nadie lee. */
    if(cats.length===CATS_DE_ACT(acts[0]).length)
      return cats.length===1?nom:nom+': las '+cats.length+' categorías';
    return nom+': '+cats.map(function(c){return CATS[c].nombre;}).join(', ');
  }
  return cats.map(catConActividad).join(', ');
}

/* ───────── LO ESCOGIDO, EN PALABRAS ─────────
   POR QUE NO ES UN PARRAFO CON PALABRAS TOCABLES
   El maquetado B lo dibujaba asi y asi se construyo primero. Medido en 390 px,
   no funciona: un <button> no fluye como texto —aunque se le pida
   `display:inline`, el navegador lo calcula `inline-block`—, asi que un valor
   largo («De 2 de octubre a 18 de octubre», «Devoción Matutina: Menores y
   Aventureros») no se parte por donde se parte la frase: se va entero al
   renglon siguiente y deja colgando el separador y el punto final.

   Queda un boton por parte, con la etiqueta encima y el valor debajo: dice lo
   mismo —que hay puesto, y se toca para cambiarlo— y aguanta cualquier largo.

   LOS VALORES SALEN DE LAS MISMAS FUNCIONES que usa el resto del panel
   (textoAlcancePanel, el propio campo, textoQuienes): un segundo texto para lo
   mismo se separa del primero en el primer cambio. */
/* El acceso de material nombra la ACTIVIDAD y la opcion escogida, no el
   alcance en palabras: eso ya lo dicen la receta y la barra de abajo, y
   repetirlo tres veces no agrega nada. Lo que no se ve en ninguna otra parte
   es de que actividad es. */
const textoMaterialPanel=()=>{
  const a=(document.getElementById('pan-act')||{}).value||'';
  const m=(document.getElementById('pan-mat')||{}).value||'todo';
  const op=opcionesMatPanel(a).find(x=>x[0]===m);
  return (a?(ACTIVIDADES[a]||{}).nombre:'Todas las actividades')+
    (op?' · '+(op[2]||op[1]):'');
};

const FILAS_EVAL=[
  ['material','Material',textoMaterialPanel],
  ['cuantas','Preguntas',()=>((document.getElementById('pan-eval-n')||{}).value||'15')],
  ['quienes','A quiénes',()=>textoQuienes()],
];

function pintaFrase(){
  const d=document.getElementById('pan-acc');
  if(!d)return;
  d.innerHTML=FILAS_EVAL.map(function(f){
    return '<button type="button" class="pan-fila'+(panEdita===f[0]?' on':'')+
      '" onclick="panAbre(\''+f[0]+'\')">'+
      '<span class="pan-fila-k">'+esc(f[1])+'</span>'+
      '<span class="pan-fila-v">'+esc(f[2]())+'</span>'+
      '<span class="pan-fila-x" aria-hidden="true">'+IC('lapiz')+'</span></button>';
  }).join('');
  pintaChips();
  pintaRecetas();
  pintaResumen();
}

/* ───────── CUANTAS PREGUNTAS RECIBE DE VERDAD ─────────
   MECANISMO
   La cantidad que el director pide es un tope, no una promesa: el examen se
   arma con lo que haya en el pool de ESA categoria con ESE material. Pedir 25
   de un tramo que solo tiene 10 no falla en ninguna parte, simplemente salen
   10, y eso se descubria el dia del examen.
   Se cuenta con cuantasPara(), que es la misma funcion que ya usa el aviso de
   combinacion vacia, asi que la cifra de la barra y la del aviso no se pueden
   separar. */
function catsDestino(){
  const personas=personasEval();
  if(personas.length)return [...new Set(personas.map(function(id){
    const x=panParts.find(function(y){return y.id===id;});
    return x?x.categoria:'';
  }).filter(Boolean))];
  const m=[].slice.call(document.querySelectorAll('.pan-cat-ch'))
    .filter(function(c){return c.checked;}).map(function(c){return c.value;});
  return m.length?m:Object.keys(CATS);
}

/* ───────── HASTA CUANTAS SE PUEDE PEDIR ─────────
   El tope real es cuantas preguntas hay con el material escogido, y no un
   numero escrito a mano. Se toma el MAYOR de las categorias a las que va
   dirigida: asi la que mas tiene puede llevarselas todas, y a la que tiene
   menos le salen las suyas, que es lo que armar() ya hace y lo que la barra de
   abajo advierte.
   Con 60 fijo, «Guias Mayores, todo el material» se recortaba a 60 de 523 sin
   decir por que. */
function topePanel(){
  const al=alcancePanel();
  const n=catsDestino().map(function(c){return cuantasPara(c,al);});
  return n.length?Math.max.apply(null,n):0;
}

/* Los tamaños de un toque. NO son numeros escogidos de gusto: son los que cada
   categoria usa de verdad (CATS[].n, hoy 10, 15 y 25), mas el maximo real al
   final. Sin ese ultimo, «todas» solo se puede pedir escribiendo el numero, y
   hay que saberlo de antemano.
   Practicar ofrece ademas 40, 60 y 100, que ahi tienen sentido como sesion
   larga; en una evaluacion del director no significan nada, y seis chips
   arbitrarios encima del campo que igual los edita son ruido. */
function pintaChips(){
  const d=document.getElementById('pan-chips');
  if(!d)return;
  const e=document.getElementById('pan-eval-n');
  const tope=topePanel();
  if(e)e.max=tope||60;
  /* Escondidos mientras «Preguntas» esta abierto: ahi debajo esta el campo, y
     dos controles para lo mismo en la misma pantalla se leen como un error. */
  if(!tope||panEdita==='cuantas'||panEdita==='todo'){d.innerHTML='';return;}
  const puesto=String((e||{}).value||'');
  const chip=function(n,txt){
    return '<button type="button" class="pan-chip'+(puesto===String(n)?' on':'')+'" '+
      'onclick="ponCuantasPanel('+n+')">'+esc(txt)+'</button>';
  };
  const suyos=[...new Set(Object.keys(CATS).map(function(k){return CATS[k].n;}))]
    .sort(function(a,b){return a-b;}).filter(function(n){return n<tope;});
  d.innerHTML=suyos.map(function(n){return chip(n,n);}).join('')+
    chip(tope,'Todas ('+tope+')');
}

const RESUMEN_EVAL='{QUIENES} · {MATERIAL} · {CUANTAS} preguntas. {DISPONIBLES}';

function pintaResumen(){
  const p=document.getElementById('pan-resumen');
  if(!p)return;
  const al=alcancePanel();
  const cats=catsDestino();
  const n=cats.map(function(c){return cuantasPara(c,al);}).filter(function(x){return x>0;});
  const min=n.length?Math.min.apply(null,n):0;
  const max=n.length?Math.max.apply(null,n):0;
  const disp=!n.length?'Con este material no hay preguntas para nadie.'
    :min===max?('Reciben <strong>'+min+'</strong> preguntas disponibles.')
    :('Reciben entre <strong>'+min+'</strong> y <strong>'+max+'</strong> preguntas disponibles.');
  const pide=Number((document.getElementById('pan-eval-n')||{}).value||15);
  /* PEDIR MAS DE LO QUE HAY NO FALLA: salen las que haya. Por eso se avisa
     aqui, con la cifra al lado de la que lo causa, y no se bloquea: un examen
     de 10 cuando se pidieron 25 puede ser exactamente lo que el director
     quiere. */
  const corto=n.length&&min<pide
    ? ' <span style="color:var(--rojo-txt)">Pediste '+pide+
      ', así que a quien menos tenga le saldrán '+min+'.</span>'
    : '';
  p.innerHTML=aplicaMarcas(RESUMEN_EVAL,{
    QUIENES:esc(textoQuienes()),
    MATERIAL:esc(textoAlcancePanel(al)),
    CUANTAS:esc(String(pide)),
    DISPONIBLES:disp+corto});
}

const NOTA_NIVEL={
  0:'Cada grupo recibe la dificultad máxima de su categoría. Todas las de un mismo grupo hacen '+
    'exactamente el mismo examen y no depende del desempeño de cada una. Es la opción que hace '+
    'comparables las notas.',
  1:'Solo datos directos: nombres, números, lugares, materiales. Sin completar el versículo.',
  2:'Datos directos más verdadero o falso y preguntas que piden reconocer la redacción exacta.',
  3:'Todo lo anterior más completar el versículo y las diferencias entre RV1995 y RV1960. Es lo '+
    'más exigente del banco; en las categorías de 4 a 6 años no aplica.'
};

/* El texto describe LA OPCION SELECCIONADA. Antes era fijo y describia siempre
   la opcion 0: con «1 · basica» escogido, el panel afirmaba algo que no era
   cierto de lo que estaba puesto. */
function pintaNotaNivel(){
  const s=document.getElementById('pan-eval-nv'),p=document.getElementById('pan-nota-nv');
  if(!s||!p)return;
  p.textContent=NOTA_NIVEL[Number(s.value)||0]||'';
}

/* Guarda del paso 3. Sin nombre no hay cómo llamar a la evaluación después, y
   sin participantes no hay a quién abrírsela: en los dos casos el botón queda
   apagado CON LA RAZÓN A LA VISTA, que es lo que faltaba. */
let panHayPart=null;
function revisaAbrir(cuantasP){
  if(cuantasP!==undefined)panHayPart=cuantasP;
  /* El paso 2 se apaga y se prende AQUÍ, que es el único punto que sabe
     cuántas participantes hay en este momento. */
  const p2=document.getElementById('pan-paso2'),p2r=document.getElementById('pan-paso2-razon');
  if(p2)p2.classList.toggle('pan-off',panHayPart===0);
  if(p2r)p2r.textContent=panHayPart===0?'Primero crea al menos una participante en el paso 1.':'';
  const b=document.getElementById('pan-abrir'),r=document.getElementById('pan-abrir-razon');
  if(!b)return;
  const t=(document.getElementById('pan-eval-t')||{}).value||'';
  const faltaNom=!t.trim();
  const faltaPart=panHayPart===0;
  /* Un tramo mal armado no puede llegar al servidor: allá se cae al alcance
     «todo» en silencio, y el director abriría una evaluación de todo el
     material creyendo que abrió la del 1 al 10. */
  const malRango=motivoRangoMalo();
  b.disabled=faltaNom||faltaPart||!!malRango;
  if(r)r.textContent=faltaPart?'Falta crear participantes en el paso 1.'
    :faltaNom?'Falta ponerle nombre a la evaluación.'
    :malRango?malRango
    :panHayPart===null?'No se pudo confirmar cuántas participantes hay: revisa la señal.':'';
}

async function abreEvaluacion(){
  const t=document.getElementById('pan-eval-t'),n=document.getElementById('pan-eval-n');
  try{
    const cats=[].slice.call(document.querySelectorAll('.pan-cat-ch'))
      .filter(function(c){return c.checked;}).map(function(c){return c.value;});
    const titulo=t?t.value:'';
    const d=await srvFetch('/panel/evaluacion',{method:'POST',body:JSON.stringify({
      titulo,cuantas:n?Number(n.value):15,
      alcance:alcancePanel(),
      nivel:Number((document.getElementById('pan-eval-nv')||{}).value||0),
      solo_fuente:!!(document.getElementById('pan-fuente')||{}).checked,
      categorias:cats,participantes:personasEval(),huella:huellaBanco()})});
    /* pintaPanel() ya NO decide qué mostrar leyendo una caché local: la
       tarjeta de "en curso" sale de preguntarle a /panel/evaluacion cada vez
       (cargaResultados()), así que no hace falta adivinar aquí si el POST de
       arriba funcionó — el repintado de abajo lo confirma solo, sin depender
       de que un segundo viaje de red (srvRefresca()) llegue a tiempo. */
    panReciente=(d&&d.id)||'';
    if(d&&d.cerradas&&d.cerradas.length){
      /* Avisar CUÁL se reemplazó: con varias evaluaciones corriendo a la vez,
         un clic sin darse cuenta del solape podría cerrar la de otro grupo
         sin que el director lo note hasta que alguien reclame. */
      avisaApp('Se cerró otra evaluación','Se cruzaba con esta: '+
        d.cerradas.map(function(x){return x.titulo;}).join(', '));
    }
    await srvRefresca();await pintaPanel();pintaExInicio();pintaInicio();
    /* En la evaluacion recien abierta, no en el contenedor: cb-panel empieza
       varias pantallas arriba, asi que llevar ahi el scroll se siente como
       volver al principio, y el pulso de .destaca queda fuera de la vista. */
    llevaA(d&&d.id?'ev-'+d.id:'cb-panel');
  }catch(e){avisaApp('No se pudo',e.message||'Revisa la señal e intenta otra vez.');}
}

async function cierraEvaluacion(id){
  if(!id)return;
  if(panReciente===id)panReciente='';
  try{
    await srvFetch('/panel/evaluacion/cerrar',{method:'POST',body:JSON.stringify({id:id})});
    await srvRefresca();await cargaResultados();pintaExInicio();pintaInicio();
  }catch(e){avisaApp('No se pudo',e.message||'Revisa la señal e intenta otra vez.');}
}

/* Nombres legibles de un conjunto de categorías ('*' o 'gm,av'), para las
   tarjetas de "en curso" y el aviso de solape. */
function nombresCats(cats){
  const claves=(!cats||cats==='*')?Object.keys(CATS):cats.split(',');
  return claves.map(function(c){
    return (CATS[c]?actYCat(c):c);
  }).join(', ');
}

/* El cuerpo que comparten la tarjeta "en curso" y la de "última evaluación":
   cuántas la hicieron, quién falta, y la suma del club si aplica. */
function cuerpoResultado(ev){
  const h=ev.hechas||[],f=ev.faltan||[];
  return '<p class="nota"><strong>'+h.length+'</strong> la hicieron · <strong>'+f.length+'</strong> faltan</p>'+
    (h.length?'<div class="tabla-scroll"><table class="info-table"><tr><th>Nombre</th><th>Cat.</th><th>Nota</th><th></th></tr>'+
      h.map(function(x){
        /* «Ver en qué falló» solo cuando el intento trae respuestas: los
           entregados antes de esta versión no las tienen, y un botón que abre
           una pantalla vacía parece que la app se trabó. */
        const rev=x.hay_revision
          ?'<button class="btn gho" onclick="verRevision(\''+esc(x.id)+'\')">Ver en qué falló</button>'
          :'<small class="nota">sin revisión</small>';
        return '<tr><td>'+esc(x.nombre)+'</td><td>'+esc(catConActividad(x.categoria))+'</td><td><strong>'+
        x.nota+'/'+x.total+'</strong></td><td>'+rev+'</td></tr>';}).join('')+'</table></div>':'')+
    (f.length?'<p class="nota">Faltan: '+f.map(function(x){return esc(x.nombre);}).join(', ')+'</p>':'')+
    (h.filter(function(x){return x.hay_revision;}).length>=2
      ?'<div class="pan-sw"><button class="btn azul" onclick="verAnalisis(\''+esc(ev.id)+'\')">'+IC('grafico')+' Qué preguntas costaron</button></div>':'')+
    sumaClub(h);
}

/* ───────── QUÉ PREGUNTAS COSTARON (v139, como el reporte de Kahoot) ─────────
   MECANISMO
   Cada intento guarda, por pregunta, su clave y si acertó. Se juntan los de
   UNA evaluación y se cuenta el acierto de cada pregunta. Kahoot llama
   «difícil» a la que acertó menos del 35%, y «necesita ayuda» a quien acertó
   menos del 35% del examen; se usa el mismo corte. Una pregunta que respondió
   una sola persona no dice nada del grupo, así que se piden al menos dos.
   Con eso el director puede abrir una práctica solo con las difíciles. */
const DIFICIL=.35, MAX_DIFICILES=14;
function analisisDe(intentos){
  const porQ={},ayuda=[];
  (intentos||[]).forEach(function(it){
    let l=[];try{l=JSON.parse(it.respuestas||'[]');}catch(e){l=[];}
    l.forEach(function(e){if(!e||!e.k)return;const x=porQ[e.k]=porQ[e.k]||{k:e.k,n:0,b:0};x.n++;if(e.b)x.b++;});
    if(it.total&&it.nota/it.total<DIFICIL)ayuda.push(it);
  });
  const dificiles=Object.values(porQ).filter(function(x){return x.n>=2&&x.b/x.n<DIFICIL;})
    .sort(function(a,b){return a.b/a.n-b.b/b.n||b.n-a.n;});
  return {dificiles:dificiles,ayuda:ayuda,total:(intentos||[]).length};
}
let panAnalisis=null;
async function verAnalisis(id){
  if(!id)return;
  abreHojaHtml(hojaConCierre('Qué preguntas costaron','Un momento...','<p class="nota">Juntando las respuestas...</p>'),'yo');
  try{
    const [a,d]=await Promise.all([srvFetch('/panel/evaluacion/analisis?id='+encodeURIComponent(id)),
      srvFetch('/panel/evaluacion?id='+encodeURIComponent(id))]);
    const r=analisisDe(a.intentos),ev=(d&&d.evaluacion)||{};
    const conTexto=r.dificiles.filter(function(x){return PREG_POR_CLAVE(x.k);}).slice(0,MAX_DIFICILES);
    panAnalisis={ev:ev,claves:conTexto.map(function(x){return x.k;})};
    const filas=conTexto.map(function(x){
      const q=PREG_POR_CLAVE(x.k),cap=(buscaItem(q.cap)||{}).label||'';
      return '<div class="q mal"><div class="qt">'+esc(q.q||q.ins||'')+'</div>'+
        '<p class="nota"><strong>'+Math.round(100*x.b/x.n)+'%</strong> acertó ('+x.b+' de '+x.n+')'+
        (cap?' · '+esc(cap):'')+'</p></div>';}).join('');
    abreHojaHtml(hojaConCierre('Qué preguntas costaron',(ev.titulo||'')+' · '+r.total+' la hicieron',
      '<p class="nota">Difícil es la que acertó menos del 35% del grupo. Solo cuentan las que '+
      'respondieron al menos dos.</p>'+
      (r.ayuda.length?'<div class="warn-box"><strong>Necesitan ayuda</strong> (acertaron menos del 35%): '+
        r.ayuda.map(function(x){return esc(x.nombre)+' ('+x.nota+'/'+x.total+')';}).join(', ')+'</div>'
        :'<p class="nota">Nadie quedó por debajo del 35%.</p>')+
      (conTexto.length?'<h3 class="sec-cab"><span class="sec-rot">Las '+conTexto.length+' más difíciles</span><span class="sec-linea"></span></h3>'+filas+
        '<div id="pan-dif-abrir"><button class="btn nar" onclick="pideAbrirDificiles()">Practicar estas '+conTexto.length+' con el grupo</button></div>'
        :'<p class="nota">Ninguna pregunta quedó por debajo del 35%.</p>')),'yo');
  }catch(e){
    abreHojaHtml(hojaConCierre('Qué preguntas costaron','No se pudo',
      '<p class="nota" style="color:var(--rojo-txt)">'+esc(e.message||'No se pudo cargar')+'</p>'),'yo');
  }
}
/* Abrir cierra las evaluaciones abiertas del mismo grupo (así funciona el
   servidor: nunca dos abiertas para la misma persona). Por eso pide un
   segundo toque que lo diga, en vez de cerrar la original sin avisar. */
function pideAbrirDificiles(){
  const z=document.getElementById('pan-dif-abrir');
  if(!z||!panAnalisis)return;
  z.innerHTML='<p class="nota">Se abre una evaluación nueva, para el mismo grupo, con solo estas '+
    panAnalisis.claves.length+' preguntas. <strong>Si la original sigue abierta, se cierra</strong>: '+
    'quien no la haya hecho ya no podrá hacerla.</p>'+
    '<div class="pan-sw"><button class="btn nar" onclick="abreDificiles()">Sí, abrirla</button>'+
    '<button class="btn gho" onclick="cierraHoja()">No, dejarlo</button></div>';
}
async function abreDificiles(){
  if(!panAnalisis||!panAnalisis.claves.length)return;
  const ev=panAnalisis.ev;
  try{
    const d=await srvFetch('/panel/evaluacion',{method:'POST',body:JSON.stringify({
      titulo:('Repaso: '+(ev.titulo||'las difíciles')).slice(0,60),
      cuantas:Math.max(5,panAnalisis.claves.length),
      alcance:'q:'+panAnalisis.claves.join(','),nivel:0,solo_fuente:!!ev.solo_fuente,
      categorias:ev.categorias&&ev.categorias!=='*'?ev.categorias.split(','):[],
      participantes:ev.ids||[],huella:huellaBanco()})});
    cierraHoja();
    panReciente=(d&&d.id)||'';
    if(d&&d.cerradas&&d.cerradas.length)avisaApp('Se cerró otra evaluación','Se cruzaba con esta: '+
      d.cerradas.map(function(x){return x.titulo;}).join(', '));
    await srvRefresca();await pintaPanel();pintaExInicio();pintaInicio();
    llevaA(d&&d.id?'ev-'+d.id:'cb-panel');
  }catch(e){avisaApp('No se pudo',e.message||'Revisa la señal e intenta otra vez.');}
}

/* ───────── la revision de un intento, desde el panel ─────────
   El servidor guarda lo que respondio y la CLAVE de cada pregunta, no su
   texto: el texto vive en el HTML y se busca aqui. Si una pregunta ya no esta
   en el banco (porque el banco crecio o se corrigio), se dice asi en vez de
   inventar: la respuesta de ella y si acerto siguen siendo ciertas, lo unico
   que se perdio es el enunciado. */
const PREG_POR_CLAVE=(()=>{
  let mapa=null;
  return k=>{
    if(!mapa){mapa={};for(const q of BANCO)mapa[claveQ(q)]=q;}
    return mapa[k];
  };
})();

function htmlRevisionQ(e,n){
  const q=PREG_POR_CLAVE(e.k);
  const ok=!!e.b;
  const cab='<div class="qt"><span class="qn">'+n+'.</span> '+
    (q?esc(q.q||q.ins||''):'<em>Esta pregunta ya no está en el banco</em>')+'</div>';
  let cuerpo='';
  if(e.t==='mc'){
    const buena=q&&q.o?q.o[q.a]:null;
    /* Un `r` numerico es un intento viejo: guardaba el indice del sorteo de
       aquel examen, y el sorteo no se guardo, asi que ya no se puede resolver
       a un texto. Si acerto, la que marco ES la buena y eso si es cierto; si
       fallo, se dice que no quedo guardada. Pintar q.o[r] era mostrarle al
       director una opcion que ella nunca toco. */
    let suya;
    if(typeof e.r==='number')suya=ok?(buena==null?null:esc(buena)):'<em>no quedó guardada</em>';
    else if(e.r===null||e.r===undefined)suya='nada';
    else suya=esc(e.r);
    cuerpo='<div class="fb '+(ok?'ok':'ko')+'">Respondió: <strong>'+
      (suya==null?'?':suya)+'</strong>'+
      (ok?'':'<br>Era: <strong>'+(buena==null?'?':esc(buena))+'</strong>')+'</div>';
  } else if(e.t==='tf'){
    const di=v=>v===null||v===undefined?'nada':(v?'Verdadero':'Falso');
    cuerpo='<div class="fb '+(ok?'ok':'ko')+'">Respondió: <strong>'+di(e.r)+'</strong>'+
      (ok?'':'<br>Era: <strong>'+(q?di(!!q.a):'?')+'</strong>')+'</div>';
  } else {
    const suyas=(e.r||[]).filter(x=>x!==null);
    const buenas=q?q.p.filter(x=>x.b).map(x=>x.b):[];
    cuerpo='<div class="fb '+(ok?'ok':'ko')+'">Escribió: <strong>'+
      (suyas.length?esc(suyas.map(x=>x||'(vacío)').join(' · ')):'nada')+'</strong>'+
      (ok?'':'<br>Era: <strong>'+esc(buenas.join(' · '))+'</strong>')+'</div>';
  }
  const cap=q?(buscaItem(q.cap)||{}).label:'';
  return '<div class="q'+(ok?' hecha':' mal')+'">'+cab+cuerpo+
    (cap?'<p class="nota">'+esc(cap)+'</p>':'')+'</div>';
}

/* El esqueleto de una hoja: fondo que cierra, asa, cabecera con la X y el
   cuerpo. Estaba escrito a mano solo en abreYo(); una hoja sin ese esqueleto
   se abre y NO SE PUEDE CERRAR, que es como me quedo la primera version de la
   revision. */
const hojaConCierre=(ref,sub,cuerpo)=>
  '<div class="hoja-fondo" onclick="cierraHoja()"></div>'+
  '<div class="hoja-caja" role="dialog" aria-modal="true" aria-label="'+esc(ref)+'">'+
  '<div class="hoja-asa" onclick="cierraHoja()"></div>'+
  '<div class="hoja-cab">'+
    '<div><div class="hoja-ref">'+esc(ref)+'</div>'+
    '<div class="hoja-sub">'+esc(sub)+'</div></div>'+
    '<button type="button" class="hoja-x" onclick="cierraHoja()" aria-label="Cerrar">'+IC('x')+'</button>'+
  '</div>'+
  '<div class="hoja-txt">'+cuerpo+'</div></div>';

async function verRevision(id){
  if(!id)return;
  const d=document.getElementById('pan-eval-en-curso');
  abreHojaHtml(hojaConCierre('Revisión','Un momento...',
    '<p class="nota">Cargando la revisión...</p>'),'yo');
  try{
    const r=await srvFetch('/panel/intento?id='+encodeURIComponent(id));
    const it=r.intento||{};
    let lista=[];
    try{lista=JSON.parse(it.respuestas||'[]');}catch(e){lista=[];}
    const mal=lista.filter(x=>!x.b).length;
    abreHojaHtml(hojaConCierre('Revisión',(it.nombre||'')+' · '+it.nota+'/'+it.total,
      '<p class="nota">'+(mal?'Falló <strong>'+mal+'</strong> de '+lista.length+'. Lo que falló va en rojo.'
                             :'No falló ninguna.')+'</p>'+
      (lista.length?lista.map((e,i)=>htmlRevisionQ(e,i+1)).join('')
                   :'<p class="nota">Este intento no guardó las respuestas. Se entregó antes de que '+
                    'la app empezara a mandarlas al servidor.</p>')),'yo');
  }catch(e){
    abreHojaHtml(hojaConCierre('Revisión','No se pudo',
      '<p class="nota" style="color:var(--rojo-txt)">'+esc(e.message||'No se pudo cargar')+'</p>'),'yo');
  }
}

/* Lo que hay corriendo AHORA MISMO, según el último /panel/evaluacion. La usa
   pintaAvisoCats() para avisar, ANTES de que el director confirme abrir, cuál
   evaluación en curso se cerraría por compartir categoría con la nueva. */
let panAbiertas=[];
/* La que se acaba de abrir desde ESTE celular. Solo sirve para señalarla al
   aterrizar: abrir una evaluacion repintaba el panel entero y subia al tope,
   asi que la unica prueba de que habia funcionado era ponerse a buscarla. */
let panReciente='';

/* Lo que el director mira mientras corre cada evaluación. Quién FALTA es el
   dato que sirve: con eso va y la busca, en vez de adivinar si ya terminaron.
   Puede haber varias a la vez, así que esto pinta una tarjeta por cada una —
   o, si no hay ninguna abierta, el resultado de la última que hubo. */
async function cargaResultados(){
  const d=document.getElementById('pan-eval-en-curso');
  if(!d)return;
  try{
    const r=await srvFetch('/panel/evaluacion');
    panAbiertas=r.evaluaciones||[];
    if(panAbiertas.length){
      d.innerHTML=panAbiertas.map(function(ev){
        /* Dirigida a personas: se nombran ELLAS, no su categoría. Decir
           «Aventureros» en una que solo le toca a Camila haría creer que el
           grupo entero tiene que presentar. */
        const para=(ev.dirigida&&ev.dirigida.length)
          ? ev.dirigida.map(esc).join(', ')+' <small>(solo estas personas)</small>'
          : esc(nombresCats(ev.categorias));
        const nueva=ev.id===panReciente;
        return '<div class="pan-paso" id="ev-'+esc(ev.id)+'">'+
          (nueva?'<div class="pan-nueva">Abierta ahora</div>':'')+
          '<div class="pan-paso-t">Evaluación en curso: '+esc(ev.titulo)+'</div>'+
          '<p class="nota">Para: <strong>'+para+'</strong></p>'+
          '<p class="nota">Material: '+esc(textoAlcancePanel(ev.alcance))+'</p>'+
          cuerpoResultado(ev)+
          '<div class="pan-sw"><button class="btn nar" onclick="cierraEvaluacion(\''+esc(ev.id)+'\')">'+
          'Cerrar esta evaluación</button></div>'+
          '<p class="nota">Se hace una sola vez por participante. Al cerrarla, las notas quedan '+
          'guardadas. Practicar, estudiar y las tarjetas no se cierran en ningún momento.</p></div>';
      }).join('');
    }else{
      panAbiertas=[];
      d.innerHTML=r.ultima?
        '<div class="pan-paso"><div class="pan-paso-t">Última evaluación (cerrada): '+esc(r.ultima.titulo)+'</div>'+
        cuerpoResultado(r.ultima)+'</div>':'';
    }
    pintaAvisoCats();
  }catch(e){d.innerHTML='';panAbiertas=[];}
}

/* Acepta la lista que pintaPanel() ya pidió. Sin el parámetro la pide ella,
   que es lo que hacen creaParticipante() y borraParticipante(). */
/* SUMA DEL CLUB.
   El reglamento de «En esto creemos» dice: dos personas presentan un examen
   escrito, los demás miembros desarrollan otro cuestionario, y «el puntaje de
   los dos exámenes se sumará y el resultado de este será el resultado final».
   La app guardaba una nota por participante y dejaba la suma a mano.
   Se reparte en los dos grupos que el reglamento distingue: los adultos que
   presentan el escrito (padres, consejeros y Guías Mayores) y el resto del
   club. Y se muestra la suma, que es el numero que se reporta. */
/* El reglamento de «En esto creemos» suma dos notas: la de los dos adultos
   que presentan el examen escrito y la del resto del club. Con las creencias
   como actividad propia, esos dos grupos son sus dos categorias, y ya no hay
   que adivinarlos a partir de las categorias de Conexion Biblica. */
const ADULTOS=['ec1','pa','gm'];
function sumaClub(hechas){
  if(!hechas||hechas.length<2)return '';
  const tot=g=>g.reduce(function(a,x){return {n:a.n+(x.nota||0),t:a.t+(x.total||0),c:a.c+1};},{n:0,t:0,c:0});
  const ad=tot(hechas.filter(function(x){return ADULTOS.indexOf(x.categoria)>=0;}));
  const cl=tot(hechas.filter(function(x){return ADULTOS.indexOf(x.categoria)<0;}));
  const to=tot(hechas);
  const fila=function(tit,g){
    return g.c?'<tr><td>'+tit+'</td><td>'+g.c+'</td><td><strong>'+g.n+'/'+g.t+'</strong></td>'+
      '<td>'+(g.t?Math.round(g.n/g.t*100):0)+'%</td></tr>':'';
  };
  return '<div class="divisor">Resultado del club</div>'+
    '<div class="tabla-scroll"><table class="info-table">'+
    '<tr><th>Grupo</th><th>Cuántos</th><th>Puntaje</th><th>%</th></tr>'+
    fila('Adultos (escrito)',ad)+fila('Resto del club',cl)+
    '<tr><td><strong>Suma</strong></td><td><strong>'+to.c+'</strong></td>'+
    '<td><strong>'+to.n+'/'+to.t+'</strong></td><td><strong>'+
    (to.t?Math.round(to.n/to.t*100):0)+'%</strong></td></tr>'+
    '</table></div>'+
    '<p class="nota">El reglamento suma el examen escrito de los adultos con el cuestionario '+
    'del resto del club. <strong>La suma es el número que se reporta.</strong></p>';
}

/* ───────── REFRESCO VIVO DEL PANEL ─────────
   MECANISMO DEL PROBLEMA
   El panel se armaba UNA vez, al abrirlo, y después nadie le volvía a
   preguntar nada al servidor. Pero los participantes no viven en este aparato:
   viven en D1 y los crea cualquier director desde cualquier celular. Una
   participante creada en otro teléfono simplemente no existía para esta
   pantalla hasta rehacer el HTML, y eso solo pasaba recargando la página.
   En la app instalada es peor todavía: iOS no recarga al volver, restaura la
   pantalla congelada tal como quedó. Por eso tocaba cerrarla y abrirla.

   POR QUÉ NO SE REPINTA EL PANEL ENTERO
   pintaPanel() rehace el innerHTML, y con él se va el nombre de la evaluación
   a medio escribir y las categorías marcadas. Un refresco que borra lo que el
   director está escribiendo es peor que no refrescar. Así que el latido toca
   solo los dos pedazos que son del servidor —la lista y los resultados— y deja
   el formulario quieto.
   Antes había además un repintado COMPLETO reservado para cuando cambiaba el
   MODO (evaluación abierta o cerrada), porque el panel entero era otro en cada
   modo. Ya no: el asistente de abrir y las tarjetas de "en curso" conviven
   siempre en la misma pantalla, así que ese caso especial no hace falta —
   cargaResultados() (parte del refresco de siempre) ya trae y pinta las
   tarjetas que correspondan. */
const PAN_MS=8000;
let panReloj=null;

/* Visible de verdad: el panel vive dentro de un <details> dentro de una
   pantalla, y con cualquiera de los dos cerrado no hay nada que refrescar.
   getClientRects() vacío cubre los dos casos sin preguntar por cada uno. */
function panelALaVista(){
  const d=document.getElementById('cb-panel');
  if(!d||!srvYo||srvYo.rol!=='director')return false;
  /* El DOM de mentiras de las pruebas no trae getClientRects. Sin la guarda,
     cargar este archivo en las suites lanza. */
  return typeof d.getClientRects!=='function'||d.getClientRects().length>0;
}

async function refrescaPanel(){
  if(!panelALaVista())return;
  if(!await srvRefresca())return;   // sin señal no se toca nada de lo que hay
  await cargaParticipantes();
  await cargaResultados();
}

/* Un solo reloj, siempre. Arrancarlo dos veces dejaba dos latidos pidiendo lo
   mismo, que es como se duplican las peticiones sin que se note. */
function panLatido(){
  if(panReloj||typeof setInterval!=='function')return;
  panReloj=setInterval(function(){refrescaPanel().catch(function(){});},PAN_MS);
  /* unref solo existe en node: evita que un latido deje colgada una suite de
     pruebas. En el navegador la propiedad no está y la línea no hace nada. */
  if(panReloj&&typeof panReloj.unref==='function')panReloj.unref();
}

async function cargaParticipantes(pre){
  const d=document.getElementById('pan-lista');
  if(!d)return;
  try{
    const p=pre||((await srvFetch('/panel/participantes')).participantes||[]);
    revisaAbrir(p.length);
    pintaPersonasEval(p);
    if(!p.length){d.innerHTML='<p class="nota">Todavía no hay participantes.</p>';return;}
    partsCache=p;
    const filas=p.map(filaParticipante);
    d.innerHTML='<div class="tabla-scroll"><table class="info-table"><tr><th>Nombre</th><th>Cat.</th><th>Código</th>'+
      '<th>Enviados</th><th></th></tr>'+filas.join('')+'</table></div>'+leyendaParts(filas);
  }catch(e){d.innerHTML='<p class="nota">No se pudo cargar: '+esc(e.message||'')+'</p>';}
}

/* ─────────── UNA FILA DE LA LISTA DE PARTICIPANTES ───────────
   TRES COSAS QUE LA FILA TENÍA QUE DECIR Y NO DECÍA:

   1. CUÁL DE LAS DOS «ALAIA» ES. Medido en producción: 27 participantes para
      15 nombres distintos, o sea 12 filas son un nombre repetido con otro
      código, y en pantalla se veían idénticas. Ahora la repetida se marca, y
      se dice cuál es la que no se ha usado nunca: esa es la que se puede
      quitar sin pensarlo.
   2. QUE EL NOMBRE SE PUEDE CORREGIR. Antes, arreglar una tilde era quitar y
      volver a crear, lo que le cambiaba el código a la niña y dejaba la fila
      muerta en la lista. De ahí salen los duplicados.
   3. QUE QUITAR BORRA. Era el botón más grande de cada fila, doce veces
      seguidas: la acción destructiva era lo primero que veía el ojo. Ahora es
      texto, y pregunta cuántos exámenes se lleva por delante.

   El CÓDIGO nunca cambia al editar, y por eso no hay que avisarle a nadie: el
   nombre corregido le llega sola a la niña en la próxima sincronización,
   porque su ficha toma nombre y categoría del servidor. */
let partsCache=[];

const normNom=n=>String(n||'').trim().toLowerCase()
  .normalize('NFD').replace(/[\u0300-\u036f]/g,'');

/* LA COLUMNA CONTABA UNA COSA Y SE LEIA COMO OTRA.
   El numero son TODOS los examenes enviados con ese codigo: practica, «mis
   errores» y evaluaciones. La app manda al servidor todo lo que se entrega
   estando con sesion, no solo las evaluaciones del director. Medido en
   produccion: de 15 intentos, 6 de evaluacion, 5 de errores y 4 de practica.
   Un «3» pelado se leia como tres evaluaciones.

   El desglose va DENTRO de la celda y no en un `title`: en un celular no hay
   con que pasar el mouse por encima, y esta lista se mira desde el celular. */
function cuentaEnviados(x){
  const t=x.intentos||0, e=x.evaluaciones||0;
  if(!t)return '<span class="pf-cero">0</span>';
  return '<strong>'+t+'</strong>'+
    '<span class="pf-sub">'+(e?e+' de evaluación':'ninguno de evaluación')+'</span>';
}

/* La leyenda sale SOLO si hay algo marcado: una explicación permanente de
   dos etiquetas que hoy no aparecen es ruido en todas las pantallas. */
function leyendaParts(filas){
  const hayS=filas.some(function(h){return h.indexOf('>sin usar<')>=0;});
  const hayM=filas.some(function(h){return h.indexOf('>mismo nombre<')>=0;});
  if(!hayS&&!hayM)return '';
  return '<p class="nota">'+
    (hayS?'<strong>sin usar</strong>: ese código nunca presentó un examen, '+
          'quedó de cuando corregir un nombre era quitar y volver a crear. Se puede quitar. ':'')+
    (hayM?'<strong>mismo nombre</strong>: dos fichas se llaman igual y las dos se usaron, '+
          'así que la app no sabe si son dos niñas o una con dos códigos. Toca <em>Editar</em> '+
          'y cámbiale el nombre a una.':'')+'</p>';
}

/* LA ETIQUETA TIENE QUE DECIR QUÉ HACER, NO DESCRIBIR EL DATO.
   La primera versión decía «otro código» en las DOS filas del mismo nombre.
   Eso describe la situación y no ayuda: marca también la fila buena, no dice
   cuál quitar, y en un celular se parte en cuatro renglones encima de la
   columna del nombre. Se probó con el autor de la app y no la entendió.

   Ahora se marca UNA sola fila de cada par, y la marca es la acción:
   · «sin usar»      el código nunca presentó un examen. Es el sobrante de
                     cuando corregir un nombre era quitar y volver a crear:
                     ese se quita sin pensarlo.
   · «mismo nombre»  las dos fichas se usaron, así que la app NO puede saber
                     si son dos niñas o una con dos códigos. Eso lo sabe el
                     director, y ahora puede arreglarlo cambiándole el nombre
                     a una para distinguirlas.
   · sin marca       nombre único, o la fila viva de un par donde la otra ya
                     quedó marcada como sobrante. */
function filaParticipante(x){
  const cn=catConActividad(x.categoria);
  const mismos=partsCache.filter(function(y){return normNom(y.nombre)===normNom(x.nombre);});
  const repetido=mismos.length>1;
  const sinUsar=!(x.intentos||0);
  const todosUsados=repetido&&mismos.every(function(y){return (y.intentos||0)>0;});
  const etq=repetido&&sinUsar
    ?'<span class="pil na" title="Ese código nunca presentó un examen: se puede quitar">sin usar</span>'
    :todosUsados
      ?'<span class="pil az" title="Hay otra ficha con este mismo nombre y las dos se han usado: cámbiale el nombre a una para distinguirlas">mismo nombre</span>'
      :'';
  return '<tr id="pf-'+esc(x.id)+'"><td>'+esc(x.nombre)+' '+etq+'</td><td>'+esc(cn)+'</td>'+
    '<td><code>'+esc(x.codigo)+'</code></td><td>'+cuentaEnviados(x)+'</td>'+
    '<td class="pf-acc"><button type="button" class="pf-b" onclick="editaParticipante(\''+esc(x.id)+'\')">Editar</button>'+
    '<button type="button" class="pf-b pf-x" onclick="borraParticipante(\''+esc(x.id)+'\')">Quitar</button></td></tr>';
}

/* La fila se vuelve un formulario EN SU SITIO. Un modal para cambiar una
   palabra saca de la lista, y volver cuesta otro gesto. */
function editaParticipante(id){
  const x=partsCache.find(function(y){return y.id===id;});
  const fila=document.getElementById('pf-'+id);
  if(!x||!fila)return;
  fila.innerHTML='<td><input id="pe-n" class="txti" maxlength="40" value="'+esc(x.nombre)+'"></td>'+
    '<td colspan="2"><select id="pe-c">'+opcionesCatPanel(x.categoria)+'</select></td>'+
    '<td>'+(x.intentos||0)+'</td>'+
    '<td class="pf-acc"><button type="button" class="pf-b pf-ok" onclick="guardaParticipante(\''+esc(id)+'\')">Guardar</button>'+
    '<button type="button" class="pf-b" onclick="cargaParticipantes()">Cancelar</button></td>';
  const n=document.getElementById('pe-n');
  if(n&&n.focus)n.focus();
}

/* Las mismas opciones del desplegable de crear, agrupadas por actividad: dos
   categorías se llaman «Menores · 4 a 6 años» y sin la actividad no se
   distinguen. */
function opcionesCatPanel(sel){
  return Object.keys(CATS).map(function(k){
    return '<option value="'+k+'"'+(k===sel?' selected':'')+'>'+
      esc(catConActividad(k))+'</option>';
  }).join('');
}

async function guardaParticipante(id){
  const n=document.getElementById('pe-n'),c=document.getElementById('pe-c');
  if(!n||!c)return;
  const nombre=n.value.trim();
  if(!nombre){n.focus();return;}
  try{
    await srvFetch('/panel/participantes/'+encodeURIComponent(id)+'/editar',
      {method:'POST',body:JSON.stringify({nombre:nombre,categoria:c.value})});
    await cargaParticipantes();
  }catch(e){avisaApp('No se pudo',e.message||'Revisa la señal e intenta otra vez.');}
}

/* Las casillas de «escoger personas». Se pintan de la MISMA lista que la tabla
   de arriba, no de un segundo viaje al servidor: dos listas de participantes
   que se piden por aparte se desincronizan en cuanto se crea uno nuevo. */
let panParts=[];
function pintaPersonasEval(p){
  const z=document.getElementById('pan-personas');
  panParts=p||[];
  if(!z)return;
  if(!p||!p.length){z.innerHTML='<p class="nota">Todavía no hay participantes.</p>';return;}
  z.innerHTML=p.map(function(x){
    const cn=catConActividad(x.categoria);
    return '<label class="pan-cat"><input type="checkbox" class="pan-per-ch" value="'+esc(x.id)+'" '+
      'onchange="pintaAvisoCats()"> <span><strong>'+esc(x.nombre)+'</strong><br>'+
      '<small>'+esc(cn)+'</small></span></label>';
  }).join('');
}
const personasEval=()=>[].slice.call(document.querySelectorAll('.pan-per-ch'))
  .filter(function(c){return c.checked;}).map(function(c){return c.value;});

async function creaParticipante(){
  const n=document.getElementById('pan-nom'),c=document.getElementById('pan-cat');
  if(!n||!n.value.trim())return;
  try{
    await srvFetch('/panel/participantes',{method:'POST',
      body:JSON.stringify({nombre:n.value,categoria:c.value})});
    n.value='';
    await cargaParticipantes();
  }catch(e){avisaApp('No se pudo',e.message||'Revisa la señal e intenta otra vez.');}
}

async function borraParticipante(id){
  /* Se pregunta con el nombre y con lo que se lleva por delante. Un «¿Seguro?»
     pelado no dice si esta fila es la de la niña que ya presentó tres
     exámenes o el código de sobra que nadie usó. */
  const x=partsCache.find(function(y){return y.id===id;});
  if(x){
    const n=x.intentos||0;
    const detalle=n
      ?'Envió '+n+' examen'+(n===1?'':'es')+'. Las notas NO se borran, pero deja de '+
       'entrar a la app con ese código.'
      :'Nunca usó ese código, así que no se pierde nada.';
    if(!await preguntaApp('¿Quitar a '+x.nombre+'?',detalle+' · Código '+x.codigo,'Quitar',true))return;
  }
  try{
    await srvFetch('/panel/participantes/'+encodeURIComponent(id)+'/borrar',{method:'POST'});
    await cargaParticipantes();
  }catch(e){avisaApp('No se pudo',e.message||'Revisa la señal e intenta otra vez.');}
}


/* ═══════════ EL REVISOR DEL BANCO ═══════════
   QUE ES
   La pantalla donde el director LEE las preguntas y decide cuales se quedan.
   Hasta aqui el banco solo se podia ver de a quince y al azar, dentro de un
   examen: ver las 1.378 completas costaba decenas de corridas y no habia forma
   de sacar una mala.

   QUE ES RETIRAR
   Escribir en el servidor «esta no entra mas». No borra nada: la pregunta
   sigue en el HTML, se puede devolver, y queda el registro de quien, cuando y
   por que. El generador no se toca.

   DE DONDE SALE CADA COLUMNA, para que ninguna cifra este escrita a mano:
   el capitulo y su nombre de CAPS, el tipo de q.t, el nivel de q.nv (lo
   calcula fuente/niveles.js al generar), y la fuente de esComplementaria(),
   que es la misma regla que aplica el interruptor del reglamento. */

/* El filtro es UN objeto y no seis variables sueltas: asi «limpiar» es una
   linea y agregar un criterio no obliga a tocar tres funciones. */
const REV_F0={cat:'',cap:'',t:'',nv:'',fu:'',est:'',q:''};
let revF=Object.assign({},REV_F0);
let revTope=40;
let revRet=[];        // lo que dice el servidor: clave, quien, motivo, cuando
let revMapa={};       // clave -> esa fila, para pintar el porque sin recorrer
/* El revisor mira dos cosas con el mismo mecanismo: las preguntas del examen y
   las tarjetas del mazo. Las dos se retiran con la misma tabla, porque su clave
   tiene la misma forma. Se separan en la pantalla porque son dos trabajos
   distintos: «esta pregunta esta mal» y «esta tarjeta no es de este capitulo».
   El caso que lo pidio: una tarjeta de Desmond Doss en Daniel 3, puesta como
   ejemplo moderno de los tres hebreos. */
let revQue='preguntas';  // 'preguntas' | 'tarjetas'
let revCaja='';       // la clave cuya caja de motivo esta abierta, o ''
let revMotivo='';     // lo escrito en esa caja

const REV_TIPO={mc:'Selección múltiple',tf:'Verdadero o falso',fill:'Completar'};
const REV_NIVEL={1:'1 · básica',2:'2 · intermedia',3:'3 · avanzada'};
/* Las razones de un toque salen de las que de verdad se usan al revisar. Que
   sean fijas es el punto: escribir el motivo en el celular es lo que hace
   abandonar la revision a la tercera pregunta. */
const REV_RAZONES=['Repetida','Mal redactada','Fuera del reglamento','Respuesta dudosa'];

/* La respuesta correcta, para poder juzgar la pregunta sin abrirla. Sin esto
   el director leeria el enunciado y tendria que adivinar que se espera. */
function revRespuesta(q){
  if(q.t==='mc')return q.o?q.o[q.a]:'';
  if(q.t==='tf')return (q.a?'Verdadero':'Falso')+(q.e?' — '+q.e:'');
  return (q.p||[]).filter(x=>x.b).map(x=>x.b).join(' · ');
}
const revTexto=q=>q.q||q.ins||'';

/* Los capitulos que examina una categoria. Es la MISMA regla de bancoDe()
   —las suyas, sin las que son solo material de estudio—, pero sin el filtro de
   retiradas: aqui hay que poder ver justamente las que ya se retiraron. */
function revCapsDe(cat){
  return CAPS.filter(c=>c.cats.includes(cat)&&!soloEstudio(c,cat));
}

/* Las preguntas que pasan el filtro. Se recorre BANCO entero, que es el banco
   crudo del artefacto: el revisor tiene que ver lo retirado tanto como lo
   vivo. */
function revFilas(){
  let b=BANCO;
  if(revF.cat){
    const ids=revCapsDe(revF.cat).map(c=>c.id);
    b=b.filter(q=>ids.includes(q.cap));
  }
  if(revF.cap)b=b.filter(q=>q.cap===revF.cap);
  if(revF.t)b=b.filter(q=>q.t===revF.t);
  if(revF.nv)b=b.filter(q=>String(q.nv||1)===revF.nv);
  if(revF.fu)b=b.filter(q=>(esComplementaria(q)?'c':'o')===revF.fu);
  if(revF.est)b=b.filter(q=>(retiradas.has(claveQ(q))?'r':'v')===revF.est);
  if(revF.q){
    const t=revF.q.toLowerCase();
    b=b.filter(q=>(revTexto(q)+' '+revRespuesta(q)).toLowerCase().indexOf(t)>=0);
  }
  return b;
}

/* Los capitulos de una categoria PARA TARJETAS. No es revCapsDe(): un capitulo
   que es solo material de estudio no entra al examen pero si tiene tarjetas, y
   son justo las que hay que poder revisar. */
const revCapsT=cat=>CAPS.filter(c=>c.cats.includes(cat));

function revFilasT(){
  let b=TARJETAS;
  if(revF.cat){
    const ids=revCapsT(revF.cat).map(c=>c.id);
    b=b.filter(t=>ids.includes(t.cap));
  }
  if(revF.cap)b=b.filter(t=>t.cap===revF.cap);
  if(revF.est)b=b.filter(t=>(retiradas.has(claveT(t))?'r':'v')===revF.est);
  if(revF.q){
    const x=revF.q.toLowerCase();
    b=b.filter(t=>sinEtiquetas(t.f+' '+t.r).toLowerCase().indexOf(x)>=0);
  }
  return b;
}

/* LAS CIFRAS SALEN DEL DATO. El texto lleva marcas y se rellena con lo que se
   acaba de contar, igual que el manual: una cifra escrita a mano en esta
   pantalla mentiria en el primer retiro. */
const REV_CUENTA='El banco tiene {TOTAL} {QUE} y hay {RET} cosas retiradas en total. '+
  'Con este filtro se ven {VISTA}, de las cuales {VISTA_RET} están retiradas.';

function pintaRevisor(){
  const d=document.getElementById('cb-revisor');
  if(!d)return;
  if(!srvYo||srvYo.rol!=='director'){
    d.innerHTML='<div class="card"><p class="nota">Esta pantalla es del director. '+
      'Entra con la clave en <strong>Examen · La evaluación del día</strong>.</p>'+
      '<button class="btn gho" onclick="ir(\'examen\')">Volver al examen</button></div>';
    return;
  }
  const esT=revQue==='tarjetas';
  const filas=esT?revFilasT():revFilas();
  const clave=esT?claveT:claveQ;
  const vistaRet=filas.filter(x=>retiradas.has(clave(x))).length;
  const cuenta=aplicaMarcas(REV_CUENTA,{
    QUE:esT?'tarjetas':'preguntas',
    TOTAL:String(esT?TARJETAS.length:BANCO.length),RET:String(retiradas.size),
    VISTA:String(filas.length),VISTA_RET:String(vistaRet)});

  /* Los capitulos que se ofrecen dependen de la categoria escogida: ofrecer
     los 77 con una categoria puesta deja escoger un capitulo que esa categoria
     no examina, y la lista sale vacia sin decir por que. Es la misma regla del
     tramo en el panel: lo invalido no se ofrece. */
  const caps=revF.cat?(esT?revCapsT(revF.cat):revCapsDe(revF.cat)):CAPS;
  const sel=(id,campo,opciones)=>'<select id="'+id+'" onchange="revPon(\''+campo+'\',this.value)">'+
    opciones.map(o=>'<option value="'+esc(o[0])+'"'+(revF[campo]===o[0]?' selected':'')+'>'+
      esc(o[1])+'</option>').join('')+'</select>';

  const cats=[['','Todas las categorías']].concat(
    Object.keys(CATS).map(k=>[k,catLarga(k)]));

  const tab=function(id,txt){
    return '<button type="button" class="rb-raz'+(revQue===id?' on':'')+'" '+
      'onclick="revQuePon(\''+id+'\')">'+esc(txt)+'</button>';
  };
  d.innerHTML='<div class="card">'+
    '<h2>Revisar el material</h2>'+
    '<div class="rb-razones">'+tab('preguntas','Preguntas del examen')+
      tab('tarjetas','Tarjetas del mazo')+'</div>'+
    '<p class="nota">'+cuenta+'</p>'+
    '<div class="rb-filtros">'+
      /* «El examen de» es la vista POR EXAMEN: pone en pantalla exactamente
         las preguntas que esa categoria puede recibir, con la misma regla con
         la que se arma su examen. */
      '<label class="pan-lb">El examen de'+sel('rb-cat','cat',cats)+'</label>'+
      '<label class="pan-lb">Capítulo'+sel('rb-cap','cap',
        [['','Todos']].concat(caps.map(c=>[c.id,c.label+' — '+c.sub])))+'</label>'+
      /* Tipo, nivel y fuente son de una pregunta: una tarjeta no tiene
         ninguno de los tres, y un filtro que no filtra nada es ruido. */
      (esT?'':'<label class="pan-lb">Tipo'+sel('rb-t','t',
        [['','Todos'],['mc',REV_TIPO.mc],['tf',REV_TIPO.tf],['fill',REV_TIPO.fill]])+'</label>'+
      '<label class="pan-lb">Nivel'+sel('rb-nv','nv',
        [['','Todos'],['1',REV_NIVEL[1]],['2',REV_NIVEL[2]],['3',REV_NIVEL[3]]])+'</label>'+
      '<label class="pan-lb">Fuente'+sel('rb-fu','fu',
        [['','Todas'],['o','Del reglamento'],['c','Complementaria']])+'</label>')+
      '<label class="pan-lb">Estado'+sel('rb-est','est',
        [['','Todas'],['v','A la vista'],['r','Retiradas']])+'</label>'+
    '</div>'+
    '<div class="ses-fila"><input id="rb-q" placeholder="Buscar en el enunciado" '+
      'value="'+esc(revF.q)+'" oninput="revBusca(this.value)">'+
      '<button class="btn gho" onclick="revLimpia()">Limpiar</button></div>'+
    '</div>'+
    '<div class="rb-lista">'+
      (filas.length?filas.slice(0,revTope).map(esT?revFilaT:revFila).join('')
        :'<p class="nota">Nada cumple este filtro.</p>')+
    '</div>'+
    (filas.length>revTope
      ?'<button class="btn gho rb-mas" onclick="revMas()">Ver '+
        Math.min(40,filas.length-revTope)+' más — faltan '+(filas.length-revTope)+'</button>'
      :'');
}

/* Una fila. Lo retirado NO se esconde: se ve tachado y con el motivo, porque
   la decision de devolverlo se toma leyendo por que se saco. */
function revFila(q){
  const k=claveQ(q);
  const ret=retiradas.has(k);
  const r=revMapa[k];
  const cap=(buscaItem(q.cap)||{}).label||q.cap;
  const etq=[cap,REV_TIPO[q.t]||q.t,REV_NIVEL[q.nv||1]||'',
    esComplementaria(q)?'Complementaria':'Del reglamento'];
  return '<div class="rb-it'+(ret?' fuera':'')+'">'+
    '<div class="rb-etq">'+etq.map(x=>'<span>'+esc(x)+'</span>').join('')+'</div>'+
    rbCuerpo(k,ret,revTexto(q),revRespuesta(q),r,'banco')+
    '</div>';
}

/* Una tarjeta. Se muestra el frente y el reverso, que es todo lo que tiene:
   la decision es si esa tarjeta pertenece a ese capitulo. */
function revFilaT(t){
  const k=claveT(t);
  const ret=retiradas.has(k);
  const r=revMapa[k];
  const cap=(buscaItem(t.cap)||{}).label||t.cap;
  return '<div class="rb-it'+(ret?' fuera':'')+'">'+
    '<div class="rb-etq"><span>'+esc(cap)+'</span></div>'+
    rbCuerpo(k,ret,sinEtiquetas(t.f),sinEtiquetas(t.r),r,'mazo')+
    '</div>';
}

/* EL CUERPO DE UNA FILA, compartido por preguntas y tarjetas.
   MECANISMO: antes la accion vivia en su propio renglon debajo del texto, asi
   que cada fila gastaba 44 px mas su margen en un boton que se usa en una de
   cada cien. Aqui va AL LADO del texto, que ya mide dos renglones o mas, y no
   suma altura. Esta pantalla se usa para escanear cientos de filas, no para
   leer una: lo que se gana en filas por pantalla es lo que se gana en revision.
   La caja del motivo sigue yendo debajo y a lo ancho, porque ahi si se escribe. */
function rbCuerpo(k,ret,txt,resp,r,donde){
  const porque=ret
    ?'<div class="rb-porque">Retirada'+
      (r&&r.cuando?' el '+esc(String(r.cuando).slice(0,10)):'')+
      (r&&r.motivo?' — '+esc(r.motivo):'')+'</div>'
    :'';
  /* Retirada, el boton dice solo «Devolver»: al lado de la linea roja que ya
     dice de donde se saco, repetirlo le roba ancho al texto. */
  const acc=ret
    ?'<button type="button" class="rb-x" onclick="revDevuelve(\''+k+'\')">Devolver</button>'
    :'<button type="button" class="rb-x" onclick="revAbreCaja(\''+k+'\')">Retirar</button>';
  return '<div class="rb-cuerpo">'+
      '<div class="rb-txt">'+
        '<div class="rb-q">'+esc(txt)+'</div>'+
        '<div class="rb-a">'+esc(resp)+'</div>'+
        porque+
      '</div>'+
      (revCaja===k?'':acc)+
    '</div>'+
    (revCaja===k?revCajaMotivo(k):'');
}

/* La caja del motivo se abre EN LA FILA, no en un cuadro del navegador: un
   prompt() tapa la pregunta que se esta juzgando, que es justo lo que hay que
   estar leyendo al escribir el motivo. */
function revCajaMotivo(k){
  return '<div class="rb-caja">'+
    '<div class="rb-razones">'+REV_RAZONES.map(x=>
      '<button type="button" class="rb-raz'+(revMotivo===x?' on':'')+'" '+
      'onclick="revRazon(\''+esc(x)+'\')">'+esc(x)+'</button>').join('')+'</div>'+
    '<input id="rb-motivo" maxlength="120" placeholder="Por qué (opcional)" '+
      'value="'+esc(revMotivo)+'" oninput="revEscribe(this.value)">'+
    '<div class="rb-acc">'+
      '<button class="btn nar" onclick="revRetira(\''+k+'\')">Retirar</button>'+
      '<button class="btn gho" onclick="revCierraCaja()">Cancelar</button>'+
    '</div></div>';
}

/* Al pasar a tarjetas se limpian los filtros que no existen ahi, o quedarian
   puestos y sin control a la vista para quitarlos: el resultado seria una
   pantalla vacia sin explicacion. */
function revQuePon(v){
  revQue=v;
  if(v==='tarjetas'){revF.t='';revF.nv='';revF.fu='';}
  revTope=40;revCaja='';
  pintaRevisor();
}

function revPon(campo,valor){
  revF[campo]=valor;
  /* Cambiar de categoria puede dejar puesto un capitulo que esa categoria no
     examina. Se limpia en vez de dejarlo: un filtro que no puede dar resultados
     no es un filtro, es una pantalla vacia sin explicacion. */
  if(campo==='cat'&&revF.cap&&!revCapsDe(valor||'').some(c=>c.id===revF.cap)&&valor)revF.cap='';
  revTope=40;pintaRevisor();
}
function revBusca(v){revF.q=String(v||'');revTope=40;pintaRevisor();}
function revLimpia(){revF=Object.assign({},REV_F0);revTope=40;pintaRevisor();}
function revMas(){revTope+=40;pintaRevisor();}
function revAbreCaja(k){revCaja=k;revMotivo='';pintaRevisor();}
function revCierraCaja(){revCaja='';revMotivo='';pintaRevisor();}
function revRazon(x){revMotivo=revMotivo===x?'':x;pintaRevisor();}
/* Escribir NO repinta: repintar en cada tecla vuelve a armar el input y el
   cursor salta al principio. Se guarda y ya; la pantalla se repinta al
   retirar. */
function revEscribe(v){revMotivo=String(v||'');}

/* El servidor devuelve la lista completa ya actualizada, asi que la pantalla
   no adivina como quedo: la copia. */
function revAplica(lista){
  revRet=lista||[];
  revMapa={};for(const r of revRet)revMapa[r.clave]=r;
  const claves=revRet.map(r=>r.clave);
  ponRetiradas(claves);retGuarda(claves);
}

async function revCarga(){
  try{revAplica((await srvFetch('/panel/retiradas')).retiradas);}catch(e){}
}

async function revRetira(k){
  try{
    const d=await srvFetch('/panel/retiradas',{method:'POST',
      body:JSON.stringify({clave:k,motivo:revMotivo})});
    revAplica(d.retiradas);
  }catch(e){avisaApp('No se pudo',e.message||'Revisa la señal e intenta otra vez.');}
  revCaja='';revMotivo='';
  pintaRevisor();
  /* Las pantallas que muestran cuentas del material se quedan con la cifra
     vieja si no se les avisa: el menu del examen dice cuantas preguntas hay y
     el mazo cuantas tarjetas. */
  refrescaCuentas();
}

async function revDevuelve(k){
  try{
    const d=await srvFetch('/panel/retiradas',{method:'POST',
      body:JSON.stringify({clave:k,accion:'restaurar'})});
    revAplica(d.retiradas);
  }catch(e){avisaApp('No se pudo',e.message||'Revisa la señal e intenta otra vez.');}
  pintaRevisor();
  refrescaCuentas();
}

/* Lo que hay que repintar cuando el material cambia de tamaño. */
function refrescaCuentas(){
  if(typeof pintaExInicio==='function')pintaExInicio();
  if(typeof pintaTarjetas==='function')pintaTarjetas();
  if(typeof pintaInicio==='function')pintaInicio();
}

/* La puerta del revisor. Se carga el detalle ANTES de pintar: sin el, las
   retiradas se verian sin el motivo ni la fecha, que es la mitad del dato. */
async function abreRevisor(){
  ir('revisor');
  await revCarga();
  pintaRevisor();
}


/* ═══════════ EL HISTORIAL DE EVALUACIONES ═══════════
   QUE ES
   La pantalla donde el director ve TODAS las evaluaciones, abiertas y
   cerradas, y las notas de cada participante a lo largo del tiempo.

   QUE PROBLEMA RESUELVE
   El panel solo habla de lo que esta abierto, y de la ultima cuando no hay
   ninguna: cerrar una evaluacion la sacaba de la vista para siempre. Las notas
   seguian guardadas en el servidor y no habia pantalla que las mostrara. Con
   nueve evaluaciones ya hechas, eso es justo lo que se mira despues del
   campamento.

   DOS VISTAS, PORQUE SON DOS PREGUNTAS DISTINTAS
   «¿Como le fue a ese examen?» se responde por evaluacion; «¿como va esta
   niña?» se responde por participante, y esa segunda no existia en ninguna
   parte. Las dos salen del mismo dato. */
let hisVista='evals';     // 'evals' | 'personas'
let hisEvals=null;        // lo que devolvio /panel/evaluaciones, o null si no se pudo
let hisIntentos=null;     // lo que devolvio /panel/intentos
let hisAbierta='';        // la evaluacion desplegada, si hay alguna
let hisDetalle={};        // id -> detalle ya pedido, para no volver a pedirlo
let hisVacias=false;      // mostrar tambien las que no tienen ni una nota

const HIS_CUENTA='{TOTAL} evaluaciones · {CON} con notas · {NOTAS} notas guardadas.';

/* Las que se ven. Las de cero notas se esconden por defecto: en esta base son
   siete pruebas de septiembre, y abrir la pantalla con eso arriba entierra lo
   que de verdad se quiere mirar. */
const hisFiltradas=()=>(hisEvals||[]).filter(e=>hisVacias||e.notas>0);

function pintaHistorial(){
  const d=document.getElementById('cb-historial');
  if(!d)return;
  if(!srvYo||srvYo.rol!=='director'){
    d.innerHTML='<div class="card"><p class="nota">Esta pantalla es del director. '+
      'Entra con la clave en <strong>Examen · La evaluación del día</strong>.</p>'+
      '<button class="btn gho" onclick="ir(\'examen\')">Volver al examen</button></div>';
    return;
  }
  if(hisEvals===null){
    d.innerHTML='<div class="card"><p class="nota">Cargando el historial...</p></div>';
    return;
  }
  const tab=(id,txt)=>'<button type="button" class="rb-raz'+(hisVista===id?' on':'')+
    '" onclick="hisPon(\''+id+'\')">'+esc(txt)+'</button>';
  d.innerHTML='<div class="card">'+
    '<h2>Evaluaciones y notas</h2>'+
    '<p class="nota">'+hisResumen()+'</p>'+
    '<div class="rb-razones">'+tab('evals','Por evaluación')+tab('personas','Por participante')+'</div>'+
    (hisVista==='evals'
      ?'<label class="ex-sw" style="margin:.4rem 0 0"><input type="checkbox"'+
       (hisVacias?' checked':'')+' onchange="hisVerVacias(this.checked)">'+
       '<span>Mostrar también las que no tienen ni una nota</span></label>':'')+
    '</div>'+
    (hisVista==='evals'?hisListaEvals():hisListaPersonas());
}

/* Las cifras salen del dato, con marcas, igual que en el revisor. */
function hisResumen(){
  const e=hisEvals||[];
  return aplicaMarcas(HIS_CUENTA,{
    TOTAL:String(e.length),
    CON:String(e.filter(x=>x.notas>0).length),
    NOTAS:String(e.reduce((a,x)=>a+(x.notas||0),0))});
}

function hisListaEvals(){
  const l=hisFiltradas();
  if(!l.length)return '<p class="nota">Todavía no hay evaluaciones con notas.</p>';
  return '<div class="rb-lista">'+l.map(function(ev){
    const abierta=!!ev.abierta;
    const cuando=String(ev.creada_en||'').slice(0,10);
    /* A quienes: las personas mandan sobre las categorias, igual que en el
       servidor. Aqui solo hay ids, asi que se dice cuantas son. */
    const ids=(ev.participantes||'').split(',').filter(Boolean);
    const para=ids.length
      ? ids.length+(ids.length===1?' persona':' personas')
      : nombresCats(ev.categorias);
    return '<div class="rb-it'+(abierta?' his-viva':'')+'">'+
      '<div class="rb-etq"><span>'+esc(cuando)+'</span>'+
      '<span>'+(abierta?'Abierta':'Cerrada')+'</span>'+
      '<span>'+ev.notas+(ev.notas===1?' nota':' notas')+'</span>'+
      (ev.solo_fuente?'<span>Solo el reglamento</span>':'')+'</div>'+
      '<div class="rb-q">'+esc(ev.titulo)+'</div>'+
      '<div class="rb-a">'+esc(textoAlcancePanel(ev.alcance))+' · '+esc(para)+
      ' · '+ev.cuantas+' preguntas</div>'+
      '<div class="rb-acc"><button class="btn gho" onclick="hisAbre(\''+esc(ev.id)+'\')">'+
      (hisAbierta===ev.id?'Ocultar el detalle':'Ver quién la hizo')+'</button></div>'+
      (hisAbierta===ev.id?'<div class="his-det">'+
        (hisDetalle[ev.id]?cuerpoResultado(hisDetalle[ev.id])
                          :'<p class="nota">Cargando...</p>')+'</div>':'')+
    '</div>';
  }).join('')+'</div>';
}

/* Por participante: la linea de cada una, de la mas reciente a la mas vieja.
   Se arma desde /panel/intentos, que ya existia en el servidor y que ninguna
   pantalla llamaba. */
function hisListaPersonas(){
  const it=(hisIntentos||[]).filter(x=>x.evaluacion_id);
  if(!it.length)return '<p class="nota">Todavía no hay notas de ninguna evaluación.</p>';
  const por={};
  for(const x of it){(por[x.nombre]=por[x.nombre]||[]).push(x);}
  return '<div class="rb-lista">'+Object.keys(por).sort().map(function(nom){
    const suyos=por[nom];
    const prom=Math.round(suyos.reduce((a,x)=>a+(x.total?x.nota/x.total:0),0)/suyos.length*100);
    return '<div class="rb-it">'+
      '<div class="rb-etq"><span>'+esc(catConActividad(suyos[0].categoria))+'</span>'+
      '<span>'+suyos.length+(suyos.length===1?' evaluación':' evaluaciones')+'</span>'+
      '<span>promedio '+prom+'%</span></div>'+
      '<div class="rb-q">'+esc(nom)+'</div>'+
      '<div class="tabla-scroll"><table class="info-table">'+
      '<tr><th>Cuándo</th><th>Evaluación</th><th>Nota</th><th></th></tr>'+
      suyos.map(function(x){
        return '<tr><td>'+esc(String(x.creado_en||'').slice(0,10))+'</td>'+
          '<td>'+esc(x.evaluacion||'—')+'</td>'+
          '<td><strong>'+x.nota+'/'+x.total+'</strong></td><td>'+
          (x.hay_revision?'<button class="btn gho" onclick="verRevision(\''+esc(x.id)+'\')">Ver en qué falló</button>'
                         :'<small class="nota">sin revisión</small>')+'</td></tr>';
      }).join('')+'</table></div></div>';
  }).join('')+'</div>';
}

function hisPon(v){hisVista=v;pintaHistorial();}
function hisVerVacias(v){hisVacias=!!v;pintaHistorial();}

/* El detalle se pide de a UNA y se guarda: con veinte participantes por
   evaluacion, traerlas todas de entrada serian cientos de filas para escoger
   una. */
async function hisAbre(id){
  if(hisAbierta===id){hisAbierta='';pintaHistorial();return;}
  hisAbierta=id;
  pintaHistorial();
  if(!hisDetalle[id]){
    try{
      const r=await srvFetch('/panel/evaluacion?id='+encodeURIComponent(id));
      if(r&&r.evaluacion)hisDetalle[id]=r.evaluacion;
    }catch(e){}
  }
  pintaHistorial();
}

async function abreHistorial(){
  ir('historial');
  hisEvals=null;pintaHistorial();
  try{hisEvals=(await srvFetch('/panel/evaluaciones')).evaluaciones||[];}
  catch(e){hisEvals=[];}
  try{hisIntentos=(await srvFetch('/panel/intentos')).intentos||[];}
  catch(e){hisIntentos=[];}
  pintaHistorial();
}

/* Arranque: se le pregunta al servidor sin bloquear la pantalla. Si no hay
   señal, la app abre igual con lo último que supo. */
(async function(){
  try{
    await srvRefresca();
    await srvQuienSoy();
    pintaSesion();
    /* LA FICHA ACTIVA PUEDE NO SER LA DE LA SESION, y eso importa.
       Un aparato puede tener varias fichas (la misma persona en dos
       actividades, o dos personas compartiendo celular) y la app abre en la
       ultima que se uso, no en la de la sesion del servidor. Sin alinear
       primero, el arranque subiria el progreso de OTRA ficha a esta cuenta y
       las fundiria: como la fusion toma el mayor campo por campo, lo de una
       persona se le colaria a la otra sin que nada avise.
       adoptaFicha() hace exactamente esa alineacion (busca la ficha de ese
       nombre en esa actividad, o la crea) y ya se usa al entrar con codigo. */
    /* v156: SALVO QUE SEA LA MISMA PERSONA EN SU OTRA ACTIVIDAD. Quien entro
       con su codigo de Conexion Biblica y esta estudiando las 28 creencias
       tiene dos fichas con su nombre; alinear aqui la devolvia a la de la
       sesion y a Inicio en CADA refresco. No hace falta: sincronizaProgreso()
       ya se niega a subir una ficha que no es la de la sesion, y la
       evaluacion alinea ella misma antes de armarse (haceEvaluacion). */
    if(srvYo&&srvYo.rol==='participante'&&!esMiOtraActividad())adoptaFicha(srvYo);
    /* Y con la ficha correcta activa: si esta niña ya entro con su codigo
       alguna vez, su progreso baja aqui, asi que abrir en otro celular
       muestra lo que estudio y no una ficha en blanco. */
    try{await sincronizaProgreso();}catch(e){}
    await cargaEvaluacion();
    try{await enviaCola();}catch(e){}
    await pintaPanel();
    if(typeof pintaExInicio==='function')pintaExInicio();
    if(typeof pintaInicio==='function')pintaInicio();
  }catch(e){}
})();

/* ── MATERIAL NUEVO: COMO SE ENTERA LA APP ───────────────────────────────
   MECANISMO, Y POR QUE NO BASTABA CON LO QUE YA HABIA
   El service worker pide el index a la red primero, asi que cada vez que la
   app ARRANCA con internet ya trae lo ultimo. El problema es otro: iOS no
   recarga una app instalada al volver a ella, restaura la pantalla donde
   quedo. Se puede pasar dias con la app abierta viendo material viejo sin
   que nada avise, y eso es justo lo que paso.

   Asi que se pregunta por /version.json, que son unos 60 bytes, y se compara
   con VERSION_APP, la huella que va incrustada en el HTML que esta corriendo
   ahora. Preguntar por el index completo serian 772 KB cada vez, y con datos
   del celular eso no se puede hacer en cada apertura.

   NO SE RECARGA SOLA, A PROPOSITO. Si la nina esta a mitad de un examen,
   recargar le borra las respuestas sin entregar. Se avisa y ella decide
   cuando. La unica excepcion es que nunca aplica durante un examen aunque lo
   pida: primero hay que entregar. */
let verNueva=null, verUltimo=0;

/** Un examen empezado y sin entregar. Recargar aqui pierde las respuestas. */
const examenEnCurso=()=>prueba&&prueba.length>0&&!entregado;

async function buscaVersion(manual){
  if(typeof VERSION_APP==='undefined')return null;
  if(typeof location==='undefined'||location.protocol.indexOf('http')!==0)return null;
  const ahora=Date.now();
  /* Sin este freno, cambiar de app y volver diez veces son diez peticiones.
     Un minuto es de sobra: el material no cambia cada minuto. */
  if(!manual&&ahora-verUltimo<60000)return verNueva;
  verUltimo=ahora;
  try{
    const r=await fetch('/version.json?t='+ahora,{cache:'no-store'});
    if(!r.ok)return null;
    const j=await r.json();
    verNueva=(j&&j.v&&j.v!==VERSION_APP)?j.v:null;
  }catch(e){ /* sin internet no hay novedad que reportar */ }
  pintaAvisoVer();
  return verNueva;
}

function pintaAvisoVer(){
  const el=document.getElementById('aviso-nuevo');
  if(!el)return;
  el.hidden=!(verNueva||fichasNuevas);
}

/** «Después»: se esconde hasta la proxima apertura, no se descarta para
 *  siempre. Si alguien no quiere actualizar ahora, mañana se le vuelve a
 *  ofrecer, porque el material del campamento si importa que este al dia. */
function cierraAvisoVer(){
  const el=document.getElementById('aviso-nuevo');
  if(el)el.hidden=true;
}

async function aplicaVersion(){
  if(examenEnCurso()){
    const el=document.getElementById('aviso-nuevo');
    if(el)el.innerHTML='<span>'+IC('alerta')+' Primero entrega el examen y vuelve a tocar Actualizar.</span>'+
      '<button type="button" class="av-x" onclick="cierraAvisoVer()" title="Cerrar">'+IC('x')+'</button>';
    return;
  }
  /* Si lo nuevo es solo el reglamento, las fichas ya están guardadas en el
     aparato: basta volver a abrir. Borrar las caches seria bajar otra vez los
     2 MB de la app sin que haya cambiado. */
  if(!verNueva&&fichasNuevas){location.reload();return;}
  /* Se borran las caches y se le pide al service worker que se revise. Sin
     borrar la cache, la app podria volver a abrir con el mismo HTML: el
     nombre de la cache lleva la huella, asi que la vieja quedaria huerfana
     igual, pero borrarla evita que la caida a cache sirva lo viejo mientras
     llega lo nuevo. */
  try{
    if(typeof caches!=='undefined')
      for(const k of await caches.keys())await caches.delete(k);
  }catch(e){}
  try{
    if(navigator.serviceWorker){
      const rs=await navigator.serviceWorker.getRegistrations();
      for(const r of rs)await r.update();
    }
  }catch(e){}
  location.reload();
}

/** El boton del manual. Dice siempre algo: «ya estas al dia» tambien es una
 *  respuesta, y sin ella el boton parece no hacer nada. */
async function revisaAhora(btn){
  const res=document.getElementById('ver-res');
  if(btn)btn.disabled=true;
  if(res)res.textContent='Revisando…';
  const nueva=await buscaVersion(true);
  if(btn)btn.disabled=false;
  if(!res)return;
  if(nueva)res.innerHTML=IC('libro')+' <strong>Hay material nuevo.</strong> Toca '+
    '<strong>Actualizar</strong> en la franja naranja de arriba.';
  else if(typeof VERSION_APP==='undefined')res.textContent=
    'Esta copia se abrió como archivo, no desde internet, así que no hay nada que revisar.';
  else res.innerHTML=IC('check')+' Ya tienes la versión más reciente.';
}

if(typeof document!=='undefined'&&document.addEventListener){
  /* Volver a la app es el momento que importa: es cuando iOS restaura la
     pantalla vieja sin recargar. */
  document.addEventListener('visibilitychange',()=>{
    if(document.visibilityState!=='visible')return;
    buscaVersion(false);
    /* Y el estado del servidor, no solo la versión del material. Esto es lo
       que faltaba en la app instalada: iOS restaura la pantalla como estaba y
       sin esta línea la lista de participantes, la evaluación abierta y la
       nota siguen siendo las de la última vez que se abrió la app. */
    refrescaPanel().catch(()=>{});
    cargaEvaluacion().catch(()=>{});
  });
}
if(typeof addEventListener==='function')
  addEventListener('load',()=>{setTimeout(()=>buscaVersion(false),1500);});

/* ── REGISTRO DEL SERVICE WORKER ─────────────────────────────────────────
   Va al final y con tres guardas. typeof navigator, porque las pruebas cargan
   este archivo con un DOM de mentiras que no lo tiene. El protocolo, porque en
   file:// la llamada lanza y el index.html tiene que seguir abriendo con doble
   clic. Y el catch, porque un registro fallido no puede tumbar la app: sin
   service worker sigue funcionando, solo deja de abrir sin senal. */
if(typeof navigator!=='undefined'&&navigator.serviceWorker&&
   typeof location!=='undefined'&&location.protocol.indexOf('http')===0&&
   typeof addEventListener==='function'){
  addEventListener('load',()=>navigator.serviceWorker.register('/sw.js').catch(()=>{}));
}

/* La pantalla de arranque se quita cuando todo lo de arriba ya corrió: en ese
   punto la app ya pintó su primera pantalla. */
if(typeof document!=='undefined'&&document.getElementById){
  const arr=document.getElementById('arranque');
  if(arr&&arr.remove)arr.remove();
}
