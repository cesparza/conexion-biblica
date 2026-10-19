/* ───────── v235: DOS ENTRADAS, «BIBLIOTECA» Y «CONCURSOS» (Camilo aprobó la opción A y
   los nombres, 15-oct) ─────────
   QUÉ ES
   Una sola app con dos puertas. La BIBLIOTECA está abierta para cualquiera: todos los
   temas (Daniel, Apocalipsis, la matutina, las creencias), sus capítulos, las láminas,
   Comparar, Paralelos y los últimos acontecimientos, y las fuentes de cada tema juntas.
   CONCURSOS reúne los concursos y campamentos, con sus categorías por edad, y el
   examen de siempre (simulacros y evaluaciones).
   MECANISMO
   - Las pantallas siguen siendo 'estudio' y 'examen' por dentro (TABS, S.ultPantalla,
     pintaCaps, pintaExInicio): nada que ya funciona cambia de nombre. En la barra se
     llaman Biblioteca y Concursos, y en la dirección «biblioteca/…» y «concursos/…»;
     los caminos viejos («estudio/…», «examen») se leen igual y se reescriben con el
     nombre nuevo (lugarActual, lugarParte en app.js).
   - El tema que se ve en la Biblioteca es el del concurso de la ficha, salvo que la
     persona escoja otro (bibTemaSel, en este aparato). Otro tema se ve entero: sin
     filtro de concurso, porque no es el suyo; su examen sigue siendo el de su ficha.
   - El nivel de lectura lo escoge quien lee (no la edad ni la categoría): «Lo central»
     abre cada capítulo con «Solo lo central» (si el capítulo lo tiene), «Todo» como
     siempre y «A fondo» en la pestaña «Para profundizar». Son los mismos controles que
     ya tiene cada capítulo; aquí solo se elige el de entrada.
   - Las fuentes de un tema salen solas de las líneas «Fuente:» de su material (las
     secciones y las láminas): se parten por «;», se junta cada obra con sus páginas y
     los capítulos donde se usa. Nada se escribe a mano: una fuente nueva aparece sola.
   - Cada pregunta del examen, al revisarla, lleva a la Biblioteca: a su capítulo
     siempre (q.cap) y a su sección cuando el título de una sección trae el versículo de
     la pregunta («(2:41-43)»). Si no hay versículo o ninguna sección lo trae, va al
     capítulo. No se adivina la sección por palabras. */

var BIB_K='cb-bib-tema', BIB_NV_K='cb-bib-nivel';
var bibTemaSel=null, bibNivelSel=null;
var bibLee=(k,d)=>{try{const v=localStorage.getItem(k);return v==null?d:v;}catch(e){return d;}};
var bibGuarda=(k,v)=>{try{localStorage.setItem(k,v);}catch(e){}};
/** Los temas de la Biblioteca, en el orden de las actividades. */
var bibTemas=()=>temasLibres().filter(t=>(IDS_DE_TEMA[t]||[]).length);
var bibNombreTema=t=>({daniel:'Daniel',apocalipsis:'Apocalipsis',creencias:'Las 28 creencias',conflicto:'El conflicto de los siglos',matutina:'Héroes y villanos'})[t]||t;
var bibDescripcionTema=t=>({
  daniel:'Relatos, visiones y profecías de Daniel. Lee sus 12 capítulos y el material de apoyo.',
  apocalipsis:'Una visión de Cristo y del desenlace de la historia. Lee sus 22 capítulos con texto y fuentes.',
  creencias:'Las creencias fundamentales adventistas, organizadas para leer una por una.',
  conflicto:'Lee y estudia los capítulos 24 al 43 de El conflicto de los siglos.',
  matutina:'31 lecturas sobre héroes y villanos. Puedes leerlas en el orden que prefieras.'
})[t]||'Lee el material completo a tu ritmo.';
var bibIconoTema=t=>{const A=ACTIVIDADES[libreDe(t)];return A?A.icono:'';};
/** El tema que se ve: el escogido en la Biblioteca o el del concurso de la ficha. */
function bibTema(){
  if(bibTemaSel===null)bibTemaSel=bibLee(BIB_K,'');
  return bibTemaSel&&IDS_DE_TEMA[bibTemaSel]?bibTemaSel:ACT().tema;
}
/** ¿Se ve un tema que no es el del concurso de la ficha? */
var bibAjeno=()=>bibTema()!==ACT().tema;
/** De qué tema es un capítulo o un repaso. */
var bibTemaDe=id=>bibTemas().find(t=>(IDS_DE_TEMA[t]||[]).includes(id))||'';
function bibCerrarDetalle(){
  const d=document.getElementById('detalle');
  if(d)d.style.display='none';
  capAbierto='';
}
function bibPonTema(t){
  if(!IDS_DE_TEMA[t])return;
  bibTemaSel=t===ACT().tema?'':t;bibGuarda(BIB_K,bibTemaSel);
  /* Cambiar de tema es ver otra estantería: se cierra el capítulo abierto. */
  bibCerrarDetalle();
  if(pantallaAct==='estudio'){ir('estudio');}else{pintaCaps();}
}
function bibSerieMatutina(){
  const dias=CAPS.filter(c=>/^m\d{1,2}$/.test(c.id)).sort((a,b)=>Number(a.id.slice(1))-Number(b.id.slice(1)));
  const terminadas=dias.filter(c=>(S.prog[c.id]||0)>=100).length;
  const sigue=dias.find(c=>(S.prog[c.id]||0)<100)||dias[0];
  return '<section class="bib-serie" aria-labelledby="bib-serie-t">'+
    '<div><span class="bib-serie-k">Serie · 31 lecturas</span><h3 id="bib-serie-t">Héroes y villanos</h3>'+
    '<p>Lee en el orden que quieras. Los números corresponden a la edición de octubre; no tienes que leer la entrega que marca la fecha de hoy.</p>'+
    '<p class="bib-serie-av">'+terminadas+' de 31 lecturas terminadas. Tu avance queda en cada lectura.</p></div>'+
    '<button type="button" class="btn tono" onclick="verCap(\''+sigue.id+'\')">'+(terminadas?'Seguir leyendo':'Empezar la serie')+'</button>'+
    '<div class="bib-serie-vinculo"><b>También se usó en el concurso de Aventureros 2026.</b> De 4 a 6 años entraron las lecturas 1 a 15; de 7 a 9, las 1 a 30. La 31 completa la historia y queda para estudio. Estos límites solo rigen el examen; aquí puedes leer las 31.</div></section>';
}
/* Al abrir un capítulo de otro tema (un enlace, una pregunta, la Tertulia), la
   estantería pasa a ese tema; sin repintar: verCap pinta enseguida. */
function bibSigue(id){
  const t=bibTemaDe(id);if(!t||t===bibTema())return;
  bibTemaSel=t===ACT().tema?'':t;bibGuarda(BIB_K,bibTemaSel);
}
/* Los capítulos y repasos del tema que se ve, cuando no es el del concurso. */
var bibCapsAjeno=()=>{const ids=IDS_DE_TEMA[bibTema()]||[];return CAPS.filter(c=>ids.includes(c.id));};
var bibModsAjeno=()=>{const t=bibTema(),ids=IDS_DE_TEMA[t]||[];return MODULOS.filter(m=>ids.includes(m.id)||(m.prof&&m.tema===t));};
/** Para Anterior y Siguiente de un capítulo que no es del concurso. */
function bibListaDe(id){
  const t=bibTemaDe(id);if(!t)return null;
  const ids=IDS_DE_TEMA[t]||[];
  return {caps:CAPS.filter(c=>ids.includes(c.id)),mods:MODULOS.filter(m=>(ids.includes(m.id)||(m.prof&&m.tema===t))&&!m.prof)};
}

/* ── El nivel de lectura ── */
var BIB_NIVELES=[['central','Lo central','lo principal de cada capítulo'],['','Todo','todo el estudio'],['fondo','A fondo','con «Para profundizar»: lo que significa']];
function bibNivel(){if(bibNivelSel===null)bibNivelSel=bibLee(BIB_NV_K,'');return BIB_NIVELES.some(n=>n[0]===bibNivelSel)?bibNivelSel:'';}
function bibPonNivel(k){
  if(!BIB_NIVELES.some(n=>n[0]===k))return;
  bibNivelSel=k;bibGuarda(BIB_NV_K,k);pintaBib();
  /* Si hay un capítulo abierto, se le aplica ya. */
  if(S.ultItem&&pantallaAct==='estudio')bibAplicaNivel(S.ultItem,true);
}
/* Antes de pintar un capítulo: «A fondo» abre en «Para profundizar». */
function bibNivelAntes(){if(bibNivel()==='fondo')capPest='prof';else if(bibNivel()==='central')capPest='examen';}
/* Después de pintarlo: «Lo central» toca «Solo lo central» si el capítulo lo tiene. */
function bibAplicaNivel(id,ahora){
  const d=document.getElementById('detalle');if(!d||!d.querySelectorAll)return;
  const nv=bibNivel();
  if(ahora&&d.querySelector('.cap-pest'))ponPest(nv==='fondo'?'prof':'examen');
  const bs=[...d.querySelectorAll('.capa-filtro .cf')];
  if(bs.length>1){const b=nv==='central'?bs[1]:bs[0];if(nv==='central'||ahora)filtraCapa(b,nv==='central'?'nucleo':'');}
}

/* ── Las fuentes de un tema, juntas ── */
var bibSinEt=s=>String(s||'').replace(/<(?!\/?i>)[^>]+>/g,'').replace(/&nbsp;/g,' ').replace(/\s+/g,' ').trim();
/* Parte una línea de fuentes por «;» que no esté dentro de un paréntesis. */
function bibPartes(linea){
  const out=[];let h=0,a='';
  for(const c of linea){if(c==='(')h++;if(c===')')h=Math.max(0,h-1);if(c===';'&&!h){out.push(a);a='';continue;}a+=c;}
  out.push(a);return out.map(x=>x.trim().replace(/\.$/,'').trim()).filter(Boolean);
}
/* Las líneas «Fuente:» de un capítulo: sus secciones y, si tiene lámina, la lámina. */
function bibLineasDe(id){
  const out=[];
  (CONTENIDO[id]||CONT_MODULOS[id]||[]).forEach(s=>{
    String(s.h||'').replace(/Fuentes?:\s*([\s\S]*?)(?:<\/p>|<\/small>|<\/div>|$)/g,(m,f)=>{out.push(f);return m;});});
  const recorre=o=>{if(!o||typeof o!=='object')return;
    for(const [k,v] of Object.entries(o)){if((k==='fuente'||k==='paraleloFuente')&&typeof v==='string')out.push(v);else if(typeof v==='object')recorre(v);}};
  if(typeof LAMINAS!=='undefined'&&LAMINAS[id])recorre(LAMINAS[id]);
  return out.map(bibSinEt).filter(Boolean);
}
/* Una pieza: autor, obra y páginas; o una abreviatura de Elena de White con su
   página («CS 374»); o el texto tal cual. */
var BIB_EGW=/^((?:\d{1,2}[A-Z]{1,3})|(?:[A-Z]{2,4})|(?:[A-Z][A-Z]?[a-z]{1,2}))(?:\s*\(<i>([^<]+)<\/i>[^)]*\))?\s+(\d[\s\S]*)$/;
function bibPieza(p){
  let m=/^([^<,]+?),\s*<i>([^<]+)<\/i>\s*,?\s*([\s\S]*)$/.exec(p);
  if(m)return {autor:m[1].trim(),obra:m[2].trim(),pag:m[3].trim()};
  m=/^<i>([^<]+)<\/i>\s*,?\s*([\s\S]*)$/.exec(p);
  if(m)return {autor:'',obra:m[1].trim(),pag:m[2].trim()};
  m=BIB_EGW.exec(p);
  if(m)return {autor:'',abr:m[1],obra:m[2]?m[2].trim():'',pag:m[3].trim()};
  return {autor:'',obra:'',pag:'',tal:p};
}
var bibPags=t=>String(t||'').replace(/^p\.?\s*/i,'').split(/\s*,\s*|\s+y\s+/).map(x=>x.replace(/^p\.?\s*/i,'').trim()).filter(Boolean);
var bibNum=x=>{const m=/(\d+)(?::(\d+))?/.exec(x);return m?(m[2]?(+m[1])*10000+(+m[2]):+m[1]):1e9;};
/** Las fuentes de un tema: [{autor, obra, abr, pags:[...], caps:[...]}], ya juntas. */
var bibCache={};
function bibFuentes(t){
  if(bibCache[t])return bibCache[t];
  const ids=IDS_DE_TEMA[t]||[],obras={},nombreAbr={};
  ids.forEach(id=>{const it=buscaItem(id);const lab=it?it.label:id;
    bibLineasDe(id).forEach(l=>bibPartes(l).forEach(p=>{
      /* Los versículos sueltos no son una obra: la Biblia va aparte (RV1995). */
      if(/^(\d\s)?([A-ZÁÉÍÓÚ][a-záéíóúñ]+\s+)?\d{1,3}:\d/.test(p))return;
      const x=bibPieza(p);if(x.abr&&x.obra)nombreAbr[x.abr]=x.obra;
      /* Una pieza que no dice obra ni página («Bohr» solo) no es una referencia. */
      if(!x.tal&&!x.obra&&!x.abr)return;
      const k=x.tal?'tal|'+x.tal:x.abr?'egw|'+x.abr:(x.autor+'|'+x.obra).toLowerCase();
      const o=obras[k]||(obras[k]={autor:x.autor,obra:x.obra,abr:x.abr||'',tal:x.tal||'',pags:[],caps:[]});
      bibPags(x.pag).forEach(g=>{if(!o.pags.includes(g))o.pags.push(g);});
      if(!o.caps.includes(lab))o.caps.push(lab);}));});
  const lista=Object.values(obras);
  lista.forEach(o=>{if(o.abr&&!o.obra&&nombreAbr[o.abr])o.obra=nombreAbr[o.abr];o.pags.sort((a,b)=>bibNum(a)-bibNum(b));});
  /* El orden de la jerarquía de fuentes de Camilo: las siglas (Elena de White), Bohr, los demás por autor. */
  const rango=o=>o.abr?0:/^Bohr$/i.test(o.autor)?1:o.tal?3:2;
  lista.sort((a,b)=>rango(a)-rango(b)||(a.autor||'').localeCompare(b.autor||'','es')||(a.obra||a.abr||a.tal).localeCompare(b.obra||b.abr||b.tal,'es'));
  return (bibCache[t]=lista);
}
function bibFuentesHTML(t){
  const L=bibFuentes(t),fila=o=>'<li class="bf-o"><span class="bf-n">'+
    (o.tal?'<span class="bf-t">'+o.tal+'</span>':
      (o.autor?'<b>'+esc(o.autor)+'</b>'+(o.obra||o.abr?', ':''):'')+(o.abr?'<abbr>'+esc(o.abr)+'</abbr>'+(o.obra?' · ':''):'')+(o.obra?'<i>'+esc(o.obra)+'</i>':''))+
    (o.pags.length?' <span class="bf-p">'+(o.abr?'':'p. ')+esc(o.pags.join(', '))+'</span>':'')+'</span>'+
    '<span class="bf-c">'+esc(o.caps.join(' · '))+'</span></li>';
  /* Por sigla van como el material las cita (CS, PE, 4T…; casi todas de Elena G. de White, pero
     la sigla sola no dice el autor, así que no se le pone). */
  const grupos=[['Por sigla',L.filter(o=>o.abr)],['Por autor y obra',L.filter(o=>!o.abr&&!o.tal)],['Otras',L.filter(o=>o.tal)]].filter(g=>g[1].length);
  return '<div class="bf">'+(grupos.length?grupos.map(([g,os])=>'<h4 class="bf-g">'+esc(g)+'</h4><ul class="bf-l">'+os.map(fila).join('')+'</ul>').join(''):
    '<p class="nota">Este tema sale de su propio texto: '+esc([...new Set(CAPS.filter(c=>(IDS_DE_TEMA[t]||[]).includes(c.id)).map(c=>c.src).filter(Boolean))].join(', '))+'. No cita otras obras.</p>')+'</div>';
}
function bibAbreFuentes(t){
  if(!IDS_DE_TEMA[t])return;
  abreHojaHtml('<div class="hoja-fondo" onclick="cierraHoja()"></div>'+
    '<div class="hoja-caja" role="dialog" aria-modal="true" aria-label="Bibliografía de '+esc(bibNombreTema(t))+'">'+
    '<div class="hoja-asa" onclick="cierraHoja()"></div>'+
    '<div class="hoja-cab"><div><div class="hoja-ref">Bibliografía</div><div class="hoja-sub">'+icoDe(bibIconoTema(t))+' '+esc(bibNombreTema(t))+'</div></div>'+
    '<button type="button" class="hoja-x" onclick="cierraHoja()" aria-label="Cerrar">'+IC('x')+'</button></div>'+
    '<div class="hoja-txt"><p class="bf-intro">Las obras que cita el material de este tema, con sus páginas y los capítulos donde se usan. Se arma sola con las líneas «Fuente:» del material: no se escribe a mano. La Biblia va en RV1995.</p>'+
    bibFuentesHTML(t)+'</div></div>','fuentes');
}

/* ── La portada de la Biblioteca ── */
/* Lo que se ve con imagen o lado a lado: las láminas, Comparar (con Paralelos y los
   últimos acontecimientos adentro). Solo lo que existe en el tema que se ve. */
function bibVerHTML(t){
  const ids=IDS_DE_TEMA[t]||[];
  const lams=(typeof LAMINAS!=='undefined'?Object.keys(LAMINAS):[]).filter(k=>ids.includes(k)&&LAMINAS[k].titulo&&LAMINAS[k].dir);
  const cmp=MODULOS.find(m=>ES_COMPARAR.test(m.id)&&(ids.includes(m.id)||m.tema===t));
  const tarjetas=lams.map(k=>{const L=LAMINAS[k],c=buscaItem(k);
    return '<button type="button" class="bv-t" onclick="bibLamina(\''+k+'\')"><span class="bv-img">'+lamMiniHTML(k)+'</span>'+
      '<span class="bv-tx"><small>'+esc(c?c.label:'')+' · lámina</small><b>'+esc(L.titulo)+'</b></span></button>';});
  if(cmp){
    tarjetas.push('<button type="button" class="bv-t bv-cmp" onclick="bibComparar(\'\')"><span class="bv-img bv-ico">'+IC('comparar')+'</span>'+
      '<span class="bv-tx"><small>Comparar</small><b>Las visiones lado a lado</b></span></button>');
    if(typeof PARALELOS!=='undefined'&&Array.isArray(PARALELOS)&&PARALELOS.length)
      tarjetas.push('<button type="button" class="bv-t bv-cmp" onclick="bibComparar(\'cmpPar\')"><span class="bv-img bv-ico">'+IC('lista')+'</span>'+
        '<span class="bv-tx"><small>Paralelos</small><b>Un poder o un tema en cada capítulo</b></span></button>');
    if(typeof ULTIMOS!=='undefined'&&ULTIMOS)
      tarjetas.push('<button type="button" class="bv-t bv-cmp" onclick="bibComparar(\'cmpUlt\')"><span class="bv-img bv-ico">'+IC('reloj')+'</span>'+
        '<span class="bv-tx"><small>Los últimos acontecimientos</small><b>Del juicio a la tierra nueva</b></span></button>');
  }
  if(!tarjetas.length)return '';
  return '<section class="bib-ver" aria-labelledby="bib-ver-t"><h3 class="bib-h" id="bib-ver-t">Para ver</h3><div class="bv-fila">'+tarjetas.join('')+'</div></section>';
}
function pintaBib(){
  pintaBibTabs();
  const z=document.getElementById('bib-cab');if(!z)return;
  const t=bibTema(),nv=bibNivel();
  const chip=x=>'<button type="button" class="bib-tema'+(x===t?' on':'')+'" aria-pressed="'+(x===t)+'" onclick="bibPonTema(\''+x+'\')">'+
    icoDe(bibIconoTema(x))+'<span>'+esc(bibNombreTema(x))+'</span></button>';
  const nivel=n=>'<button type="button" class="bib-nv'+(n[0]===nv?' on':'')+'" aria-pressed="'+(n[0]===nv)+'" onclick="bibPonNivel(\''+n[0]+'\')"><b>'+esc(n[1])+'</b><small>'+esc(n[2])+'</small></button>';
  z.innerHTML='<div class="bib-hero"><div class="bib-ant">'+IC('libro')+' Biblioteca / Tema</div>'+
    '<h2 class="bib-tit">'+esc(bibNombreTema(t))+'</h2>'+
    '<p class="bib-p">'+esc(bibDescripcionTema(t))+'</p>'+
    '<details class="bib-elige"><summary>Cambiar de tema</summary><div class="bib-temas" role="group" aria-label="Tema">'+bibTemas().map(chip).join('')+'</div></details>'+
    '<div class="bib-fila"><div class="bib-nvs" role="group" aria-label="Cómo quieres leer"><span class="bib-nvt">Cómo quieres leer</span>'+BIB_NIVELES.map(nivel).join('')+'</div>'+
    '<div class="bib-acc">'+meBoton('tema-'+t)+'<button type="button" class="btn tono peq bib-fu" onclick="bibAbreFuentes(\''+t+'\')">'+IC('lista')+' Bibliografía</button></div></div>'+
    '<p class="bib-nota">'+(t==='matutina'?'La Biblioteca siempre muestra la serie completa. La categoría del concurso solo determina qué se evalúa.':bibAjeno()?'Estás viendo '+esc(bibNombreTema(t))+': no es el tema de tu concurso, así que se ve completo y no entra a tu examen.':
      (BIB_NIVELES.find(n=>n[0]===nv)[1])+': '+BIB_NIVELES.find(n=>n[0]===nv)[2]+'. El nivel lo escoges tú; no depende de tu edad ni de tu categoría.')+'</p></div>'+
    (t==='matutina'?bibSerieMatutina():'')+
    bibVerHTML(t)+
    '<button type="button" class="bib-otra" onclick="ir(\'examen\')">'+IC('examen')+'<span><b>¿Te preparas para un concurso?</b> En Concursos escoges tu categoría por edad y practicas el examen.</span>'+IC('der')+'</button>';
}
/** Al final del tema, en la rejilla: su bibliografía. */
function bibPieHTML(){
  const t=bibTema(),n=bibFuentes(t).length;
  return '<button type="button" class="bib-otra bib-pie" style="grid-column:1/-1" onclick="bibAbreFuentes(\''+t+'\')">'+IC('lista')+
    '<span><b>Bibliografía de '+esc(bibNombreTema(t))+'</b> '+(n?n+' obras citadas, con sus páginas y dónde se usan.':'Este tema sale de su propio texto.')+'</span>'+IC('der')+'</button>';
}
function bibLamina(k){if(!LAMINAS[k])return;verCap(k);lamAbre(k,'explorar');}
/* Comparar vive en el repaso «…-comparar» del tema; `donde`: Paralelos (cmpPar) o
   los últimos acontecimientos (cmpUlt) dentro de él. */
function bibComparar(donde){
  const t=bibTema(),ids=IDS_DE_TEMA[t]||[],m=MODULOS.find(x=>ES_COMPARAR.test(x.id)&&(ids.includes(x.id)||x.tema===t))||MODULOS.find(x=>ES_COMPARAR.test(x.id));
  if(!m)return;verCap(m.id);
  const ve=()=>{const e=document.getElementById(donde||'detalle');if(e&&e.scrollIntoView)e.scrollIntoView({block:'start'});};
  if(typeof requestAnimationFrame==='function')requestAnimationFrame(()=>requestAnimationFrame(ve));else ve();
}

/* ── De la pregunta a su sección ── */
/* Los versículos que el título de una sección dice tratar: «(2:41-43)», «(1:4-8, 1:19)». */
function bibRangos(t,n){
  const out=[];String(t||'').replace(/\(([^)]*)\)/g,(m,dentro)=>{
    dentro.replace(/(\d{1,2}):(\d{1,3})(?:\s*[-–]\s*(\d{1,3}))?/g,(x,c,v,h)=>{if(c===n)out.push([+v,h?+h:+v]);return x;});return m;});
  return out;
}
/* Por objeto: el id de una pregunta cambia de examen en examen. */
var bibDondeCache=typeof WeakMap==='function'?new WeakMap():null;
/** Dónde se estudia una pregunta: {cap, i} (i = índice de la sección en CONTENIDO, o -1). */
function bibDondeQ(q){
  if(!q||!q.cap||!buscaItem(q.cap))return null;
  if(bibDondeCache&&bibDondeCache.has(q))return bibDondeCache.get(q);
  const lb=libroCid(q.cap),secs=CONTENIDO[q.cap]||[];let i=-1;
  if(lb){
    /* El versículo de la pregunta (q.v) manda; sin él, los que cita su enunciado o su explicación. */
    const vs=new Set();
    if(q.v){const m=/^(\d{1,2}):(\d{1,3})(?:-(\d{1,3}))?$/.exec(q.v);if(m&&m[1]===lb.n)for(let x=+m[2];x<=(m[3]?+m[3]:+m[2]);x++)vs.add(x);}
    if(!vs.size)refsQ(q,q.cap).forEach(v=>vs.add(v));
    if(vs.size){let mejor=1e9;
      secs.forEach((s,j)=>{bibRangos(s.t,lb.n).forEach(([de,a])=>{if([...vs].some(v=>v>=de&&v<=a)){
        /* La del estudio («Para el examen») antes que la de interpretación; entre ellas, la más precisa. */
        const w=(esSecInterp(s)?1000:0)+(a-de);if(w<mejor){mejor=w;i=j;}}});});}
  }
  const r={cap:q.cap,i};if(bibDondeCache)bibDondeCache.set(q,r);return r;
}
function bibLinkQ(q){
  const d=bibDondeQ(q);if(!d)return '';
  const c=buscaItem(d.cap),s=d.i>=0?(CONTENIDO[d.cap]||[])[d.i]:null;
  return '<button type="button" class="q-bib" onclick="bibIrQ(\''+d.cap+'\','+d.i+')">'+IC('libro')+
    '<span>Estúdialo en la Biblioteca: <b>'+esc(c.label)+(s?' · '+esc(tituloSec(s.t)):'')+'</b></span>'+IC('der')+'</button>';
}
function bibIrQ(cap,i){
  if(!buscaItem(cap))return;
  const s=i>=0?(CONTENIDO[cap]||[])[i]:null;
  if(s&&esSecInterp(s))capPest='prof';
  verCap(cap);
  if(!s)return;
  if(esSecInterp(s))ponPest('prof');
  const ve=()=>{const e=document.querySelector('#detalle .sec[data-i="'+i+'"]');if(!e)return;
    if(e.style.display==='none'){const b=document.querySelector('#detalle .capa-filtro .cf');if(b)filtraCapa(b,'');}
    /* scrollIntoView mueve también la columna del capítulo en pantalla ancha (tiene su propio
       desplazamiento); scroll-margin-top la deja debajo de lo fijo arriba (biblioteca.css). */
    e.scrollIntoView({block:'start'});};
  const marca=()=>{const e=document.querySelector('#detalle .sec[data-i="'+i+'"]');if(e){e.classList.remove('destaca');void e.offsetWidth;e.classList.add('destaca');}};
  /* Otra vez cuando el capítulo terminó de acomodarse (en pantalla ancha se reparte en columnas). */
  dondeEspera(900);
  if(typeof requestAnimationFrame==='function')requestAnimationFrame(()=>requestAnimationFrame(()=>{ve();marca();}));else{ve();marca();}
  setTimeout(()=>{ve();lugarAnota();},450);
}

/* ── Concursos ── */
function pintaConcursos(){
  const z=document.getElementById('con-cab');if(!z)return;
  const ya=ACT_DE(S.cat),A=ACTIVIDADES[ya],libre=!!(CAT().libre);
  const acts=Object.keys(ACTIVIDADES);
  const conFecha=acts.filter(a=>ACTIVIDADES[a].fecha).sort((a,b)=>ACTIVIDADES[b].fecha.localeCompare(ACTIVIDADES[a].fecha)),
    sinFecha=acts.filter(a=>!ACTIVIDADES[a].fecha);
  const carta=a=>{const X=ACTIVIDADES[a],cs=CATS_DE_ACT(a),mia=a===ya;
    return '<li class="con-c'+(mia?' mia':'')+'"><div class="con-ct"><span class="con-ic">'+icoDe(X.icono)+'</span><div><b>'+esc(X.nombre)+'</b>'+
      '<small>'+esc(X.que)+' · '+esc(X.cuando)+'</small></div></div>'+
      (X.organiza?'<div class="con-org">'+esc(X.organiza)+'</div>':'')+
      /* v236: cada categoría con lo que entra, en pastillas como la imagen de la política 2027. */
      (bibConAlcance(a)?'<div class="con-cbs">'+cs.map(k=>bibCatBloque(k)).join('')+'</div>'+bibObrasLista(a):
      '<div class="con-cats">'+cs.map(k=>{const c=CATS[k];return '<span class="con-cat'+(k===S.cat?' on':'')+'"><b>'+esc(c.nombre)+'</b> '+esc(c.edad)+'</span>';}).join('')+'</div>')+
      '<div class="con-acc">'+(mia?'<span class="con-mia">'+IC('check')+' Te preparas para este</span>':
        '<button type="button" class="btn tono peq" onclick="bibPrepara(\''+a+'\')">Prepararme</button>')+
      '<button type="button" class="btn txt peq" onclick="bibPonTema(\''+X.tema+'\');ir(\'estudio\')">'+IC('libro')+' Su material</button></div></li>';};
  z.innerHTML='<div class="con-hero"><div class="bib-ant">'+IC('examen')+' Concursos</div>'+
    '<h2 class="bib-tit">Prepárate para tu concurso</h2>'+
    '<p class="bib-p">Tu categoría por edad pone la dificultad y las reglas del examen. El material es el mismo para todos, en la Biblioteca.</p>'+
    '<div class="con-tuya">'+(libre?'<span>Ahora estudias <b>'+esc(A.nombre)+'</b> sin concurso.</span>':
      '<span>Tu preparación: <b>'+esc(catCorta(S.cat))+'</b> · '+esc(CAT().edad)+'</span>')+
      '<button type="button" class="btn ver peq" onclick="abreYo()">'+IC('persona')+' Cambiar</button></div></div>'+
    '<h3 class="bib-h con-ex">Tu examen: simulacros y exámenes</h3>';
  /* Quien entra a practicar ve primero su examen; los demás concursos van después. */
  const zl=document.getElementById('con-lista');if(!zl)return;
  zl.innerHTML='<h3 class="bib-h con-ex">Todos los concursos y campamentos</h3>'+
    (conFecha.length?'<h4 class="con-sub">Con fecha</h4><ul class="con-l">'+conFecha.map(carta).join('')+'</ul>':'')+
    (sinFecha.length?'<h4 class="con-sub">Fecha por confirmar</h4><ul class="con-l">'+sinFecha.map(carta).join('')+'</ul>':'')+
    '<button type="button" class="bib-otra" onclick="ir(\'estudio\')">'+IC('libro')+'<span><b>Todo lo que se pregunta está en la Biblioteca.</b> Cada pregunta del examen, al revisarla, te lleva a donde se estudia.</span>'+IC('der')+'</button>';
}
/* «Prepararme»: la hoja de quién estudia, ya en ese concurso (paso de la categoría). */
function bibPrepara(a){
  if(!ACTIVIDADES[a])return;
  if(!(S.nombre||'').trim()){concursoPedido=a;ir('bienvenida');bvPaso(1);return;}
  abreYo();prepActividad(a);
}

/* ── Inicio: las dos puertas ── */
/* El concurso que se anuncia en el Inicio: el próximo con fecha; si ninguno viene, el
   tuyo si aún no tiene fecha; si no, el primero sin fecha; si no, el tuyo. Sin inventar
   fechas: se muestra el «cuando» de la ficha tal cual. */
function bibProximo(){
  const d=new Date(),hoy=d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
  const acts=Object.keys(ACTIVIDADES),ya=ACT_DE(S.cat),libre=!!(CAT().libre);
  const fut=acts.filter(a=>ACTIVIDADES[a].fecha&&ACTIVIDADES[a].fecha>=hoy).sort((a,b)=>ACTIVIDADES[a].fecha.localeCompare(ACTIVIDADES[b].fecha));
  if(fut.length)return {a:fut[0],r:fut[0]===ya&&!libre?'Tu concurso':'Próximo concurso',pasado:false};
  const sin=acts.filter(a=>!ACTIVIDADES[a].fecha);
  if(!libre&&sin.includes(ya))return {a:ya,r:'Tu concurso',pasado:false};
  if(sin.length)return {a:sin[0],r:'Próximo concurso',pasado:false};
  return ACTIVIDADES[ya]?{a:ya,r:'Tu concurso',pasado:true}:null;
}
/* Lo destacado de la Biblioteca: las láminas del tema que se ve, Paralelos y los últimos
   acontecimientos (lo mismo que «Para ver»), como atajos. */
function bibDestacados(){
  const t=bibTema(),ids=IDS_DE_TEMA[t]||[],out=[];
  (typeof LAMINAS!=='undefined'?Object.keys(LAMINAS):[]).filter(k=>ids.includes(k)&&LAMINAS[k].titulo&&LAMINAS[k].dir).forEach(k=>{const c=buscaItem(k);
    out.push('<button type="button" class="ent-d" onclick="bibLamina(\''+k+'\')"><span class="ent-dimg">'+lamMiniHTML(k)+'</span><span>'+esc(c?c.label:k)+'</span></button>');});
  const cmp=MODULOS.find(m=>ES_COMPARAR.test(m.id)&&(ids.includes(m.id)||m.tema===t));
  if(cmp&&typeof PARALELOS!=='undefined'&&Array.isArray(PARALELOS)&&PARALELOS.length)
    out.push('<button type="button" class="ent-d" onclick="bibComparar(\'cmpPar\')"><span class="ent-dimg ent-dico">'+IC('lista')+'</span><span>Paralelos</span></button>');
  if(cmp&&typeof ULTIMOS!=='undefined'&&ULTIMOS)
    out.push('<button type="button" class="ent-d" onclick="bibComparar(\'cmpUlt\')"><span class="ent-dimg ent-dico">'+IC('reloj')+'</span><span>Últimos acontecimientos</span></button>');
  return out.join('');
}
function pintaEntradas(){
  const z=document.getElementById('ini-entradas');if(!z)return;
  const pr=bibProximo(),X=pr&&ACTIVIDADES[pr.a],dest=bibDestacados();
  z.innerHTML='<div class="ent ent-bib"><button type="button" class="ent-cab" onclick="ir(\'estudio\')"><span class="ent-ic">'+IC('libro')+'</span>'+
    '<span class="ent-tx"><b>Biblioteca</b><small>Todos los temas, abiertos: capítulos, láminas, paralelos y su bibliografía.</small></span>'+IC('der','ent-fl')+'</button>'+
    (dest?'<div class="ent-dest" role="group" aria-label="Destacados de '+esc(bibNombreTema(bibTema()))+'">'+dest+'</div>':'')+'</div>'+
    '<div class="ent ent-con"><button type="button" class="ent-cab" onclick="ir(\'examen\')"><span class="ent-ic">'+IC('examen')+'</span>'+
    '<span class="ent-tx"><b>Concursos</b><small>Tu categoría por edad, simulacros y exámenes.</small></span>'+IC('der','ent-fl')+'</button>'+
    (X?'<button type="button" class="ent-prox" onclick="ir(\'examen\')"><span class="ent-pr">'+esc(pr.r)+'</span><b>'+esc(X.nombre)+'</b>'+
      '<span class="ent-cu">'+icoDe(X.icono)+' '+esc(pr.pasado?'Fue el '+X.cuando:X.cuando)+'</span></button>':'')+'</div>';
}


/* ───────── v236: LAS PESTAÑAS DE LA BIBLIOTECA (navegación aprobada por Camilo, 15-oct) ─────────
   Temas (la portada y los capítulos de siempre), Láminas (todas las láminas con imagen, de
   todos los temas), Comparar, Paralelos y Últimos acontecimientos (los tres viven en el
   repaso «…-comparar»: se abre y se baja a su sección, como en «Para ver»). La que se
   enciende sale de lo que se ve: no hay un estado aparte que se pueda desincronizar. */
var bibVista='temas', bibTabSel='';
var BIB_TABS=[['temas','Temas','libro'],['laminas','Láminas','estatua'],['comparar','Comparar','comparar'],['paralelos','Paralelos','lista'],['ultimos','Últimos acontecimientos','reloj']];
function bibTabActual(){
  if(S.ultItem&&ES_COMPARAR.test(S.ultItem))return bibTabSel==='paralelos'||bibTabSel==='ultimos'?bibTabSel:'comparar';
  if(!S.ultItem&&bibVista==='laminas')return 'laminas';
  return 'temas';
}
function pintaBibTabs(){
  const z=document.getElementById('bib-tabs');if(!z)return;
  const hayCmp=(bibTema()==='daniel'||!!(S.ultItem&&ES_COMPARAR.test(S.ultItem)))&&MODULOS.some(x=>ES_COMPARAR.test(x.id)),hayLam=bibLams().length>0,act=bibTabActual();
  const ve=k=>k==='laminas'?hayLam:k==='temas'?true:k==='paralelos'?hayCmp&&typeof PARALELOS!=='undefined'&&Array.isArray(PARALELOS)&&PARALELOS.length:k==='ultimos'?hayCmp&&typeof ULTIMOS!=='undefined'&&!!ULTIMOS:hayCmp;
  z.innerHTML='<div class="bt-fila" role="tablist">'+BIB_TABS.filter(x=>ve(x[0])).map(([k,t,ic])=>
    '<button type="button" role="tab" class="bt'+(k===act?' on':'')+'" aria-selected="'+(k===act)+'" onclick="bibTab(\''+k+'\')">'+IC(ic)+'<span>'+esc(t)+'</span></button>').join('')+'</div>';
}
function bibTab(k){
  if(k==='temas'||k==='laminas'){bibVer(k);return;}
  bibTabSel=k;bibVista='temas';
  bibComparar(k==='paralelos'?'cmpPar':k==='ultimos'?'cmpUlt':'');
  pintaBibTabs();
}
/* Todas las láminas con imagen, de todos los temas, en el orden del material. */
var bibLams=()=>(typeof LAMINAS!=='undefined'?Object.keys(LAMINAS):[]).filter(k=>LAMINAS[k]&&LAMINAS[k].titulo&&LAMINAS[k].dir&&buscaItem(k));
/** Cambia la vista de la Biblioteca. `quieto`: viene de un enlace (no sube la página). */
function bibVer(v,quieto){
  bibVista=v==='laminas'?'laminas':'temas';bibTabSel='';
  /* Ver la portada o las láminas es salir del capítulo abierto. */
  bibCerrarDetalle();
  if(pantallaAct!=='estudio'||S.ultItem)ir('estudio',!!quieto);
  pintaBibVista();
  if(!quieto)window.scrollTo(0,0);
  lugarAnota();
}
function pintaBibVista(){
  const lam=bibVista==='laminas'&&!S.ultItem,z=document.getElementById('bib-lams');
  ['bib-cab','lista-caps'].forEach(id=>{const e=document.getElementById(id);if(e)e.hidden=lam;});
  if(z){z.hidden=!lam;if(lam)z.innerHTML=bibLamsHTML();}
  pintaBibTabs();
}
function bibLamsHTML(){
  const porTema={};bibLams().forEach(k=>{const t=bibTemaDe(k)||'otros';(porTema[t]=porTema[t]||[]).push(k);});
  return '<div class="bib-hero bl-hero"><div class="bib-ant">'+IC('estatua')+' Láminas</div><h2 class="bib-tit">Las visiones, con imagen</h2>'+
    '<p class="bib-p">Explora cada lámina por partes o preséntala en grande. Cada una lleva a su capítulo.</p></div>'+
    Object.entries(porTema).map(([t,ks])=>'<h3 class="bib-h">'+esc(t==='otros'?'Otras':bibNombreTema(t))+'</h3><ul class="bl-l">'+ks.map(k=>{const L=LAMINAS[k],c=buscaItem(k);
      return '<li class="bl-c"><button type="button" class="bl-abre" onclick="bibLamina(\''+k+'\')"><span class="bv-img">'+lamMiniHTML(k)+'</span>'+
        '<span class="bv-tx"><small>'+esc(c.label)+'</small><b>'+esc(L.titulo)+'</b></span></button>'+
        '<div class="bl-acc">'+meBoton('lam-'+k,true)+'<button type="button" class="btn txt peq" onclick="verCap(\''+k+'\')">'+IC('libro')+' El capítulo</button></div></li>';}).join('')+'</ul>').join('');
}

/* ───────── v236: LO QUE ENTRA EN CADA CATEGORÍA, EN PASTILLAS ─────────
   Para la política 2027 (Asociación del Alto Magdalena): por categoría, los capítulos de
   cada libro de la Biblia (RV1995), los de Profetas y Reyes si los hay, y los de otras obras
   que la app todavía no trae (`obras`, hoy «El conflicto de los siglos»). Todo sale de la
   ficha: lo que estudia la categoría (la marca `cats` de cada capítulo) y su `obras`. */
/* Tramos seguidos: [1,2,3,5] → [[1,3],[5,5]]. */
function bibTramos(ns){
  const o=[];let a=null,b=null;
  ns.slice().sort((x,y)=>x-y).forEach(n=>{if(a!==null&&n===b+1){b=n;return;}if(a!==null)o.push([a,b]);a=b=n;});
  if(a!==null)o.push([a,b]);
  /* Como la imagen de la política: dos seguidos van sueltos (21, 22); de tres en adelante, en tramo (24 – 26). */
  return o.flatMap(([x,y])=>y===x+1?[[x,x],[y,y]]:[[x,y]]);
}
/** Las filas de alcance de una categoría: [{t: rótulo, tramos: [[a,b]…], obra?}]. */
function bibAlcanceDe(k){
  const c=CATS[k];if(!c||c.libre)return [];
  const ids=[...CAPS,...MODULOS].filter(x=>(x.cats||[]).includes(k)).map(x=>x.id),filas=[];
  const libros={};
  ids.forEach(id=>{const l=libroCid(id);if(l){(libros[l.nombre]=libros[l.nombre]||[]).push(+l.n);return;}
    const m=/^pr(\d+)$/.exec(id);if(m)(libros['Profetas y Reyes']=libros['Profetas y Reyes']||[]).push(+m[1]);});
  Object.entries(libros).forEach(([n,ns])=>filas.push({t:n+(n==='Profetas y Reyes'?'':' · Reina Valera 1995'),tramos:bibTramos(ns)}));
  Object.entries(c.obras||{}).forEach(([o,ns])=>{const O=REGLAS.OBRAS[o];if(O)filas.push({t:O.nombre,tramos:bibTramos(ns),obra:o});});
  return filas;
}
/* Solo los concursos de libro con alguna obra o algún capítulo de la Biblia. */
var bibConAlcance=a=>ACTIVIDADES[a]&&ACTIVIDADES[a].tipo==='libro'&&CATS_DE_ACT(a).some(k=>(CATS[k].obras&&Object.keys(CATS[k].obras).length));
var bibTituloObra=(o,n)=>{const L=(typeof OBRAS_CAPS!=='undefined'&&OBRAS_CAPS[o]&&OBRAS_CAPS[o].caps)||[];const x=L.find(c=>c.n===n);return x?x.t:'';};
function bibChips(f){
  return '<div class="ac-chips">'+f.tramos.map(([a,b])=>{
    const tit=f.obra?(a===b?a+' · '+bibTituloObra(f.obra,a):Array.from({length:b-a+1},(_,i)=>(a+i)+' · '+bibTituloObra(f.obra,a+i)).join('\n')):'';
    return '<span class="ac-chip"'+(tit?' title="'+esc(tit)+'"':'')+'>'+(a===b?a:a+' – '+b)+'</span>';}).join('')+'</div>';
}
/** El alcance de una categoría en filas de pastillas. '' si no hay qué mostrar así. */
function bibAlcanceHTML(k){
  const F=bibAlcanceDe(k);if(!F.length)return '';
  return '<div class="ac">'+F.map(f=>'<div class="ac-f"><div class="ac-t">'+esc(f.t)+' · capítulos'+
    (f.obra&&!bibObraEnApp(f.obra)?' <span class="ac-falta">todavía no está en la app</span>':'')+'</div>'+bibChips(f)+'</div>').join('')+'</div>';
}
/* v237: una obra con su tema en la app (El conflicto de los siglos) ya se estudia aquí. */
var bibObraEnApp=o=>{const O=REGLAS.OBRAS[o];return !!(O&&O.tema&&(IDS_DE_TEMA[O.tema]||[]).length);};
var CLUB_TONO={guias:'ac-guias',conquistadores:'ac-conq',aventureros:'ac-avent'};
function bibCatBloque(k){
  const c=CATS[k];
  return '<div class="con-cb '+(CLUB_TONO[c.club]||'')+(k===S.cat?' on':'')+'"><div class="con-cbh"><b>'+esc(c.nombre)+'</b><span>'+esc(c.edad)+'</span>'+
    (k===S.cat?'<span class="con-cbtu">'+IC('check')+' Tu categoría</span>':'')+'</div>'+bibAlcanceHTML(k)+'</div>';
}
/* Debajo de la carta: los títulos de los capítulos de cada obra que pide el concurso. */
function bibObrasLista(a){
  const por={};CATS_DE_ACT(a).forEach(k=>Object.entries(CATS[k].obras||{}).forEach(([o,ns])=>{por[o]=por[o]||new Set();ns.forEach(n=>por[o].add(n));}));
  return Object.entries(por).map(([o,set])=>{const O=REGLAS.OBRAS[o],ed=typeof OBRAS_CAPS!=='undefined'&&OBRAS_CAPS[o]?OBRAS_CAPS[o].edicion:'';
    return '<details class="con-obra"><summary>'+IC('lista')+' Los capítulos de <i>'+esc(O.nombre)+'</i></summary><ol class="con-ol">'+
      [...set].sort((x,y)=>x-y).map(n=>{const id=(O.pre||'')+n,hay=bibObraEnApp(o)&&!!buscaItem(id);
        return '<li><b>'+n+'</b> '+(hay?'<button type="button" class="btn txt" onclick="verCap(\''+id+'\')">'+esc(bibTituloObra(o,n))+'</button>':esc(bibTituloObra(o,n)))+'</li>';}).join('')+'</ol>'+
      '<p class="nota">'+esc(O.autor)+(ed?', edición '+esc(ed):'')+'. '+(bibObraEnApp(o)
        ?'Estos capítulos están en la app, con su texto completo: tócalos para estudiarlos. Sus preguntas entran al examen de práctica y están pendientes de revisión de Camilo.'
        :'Este libro todavía no está como material de estudio en la app: lee estos capítulos en el libro. No entran al examen de práctica.')+'</p></details>';}).join('');
}
