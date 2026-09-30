/* Auditoria de contraste sobre el render real (v138).
   Recorre las pantallas de las ocho categorias y los estados que cambian
   colores (tarjeta volteada, examen en curso, respondido y entregado, modo
   lectura, hoja de perfil, manual abierto, panel del director simulado) y
   mide cada texto contra su fondo real: mezcla capas translucidas, toma el
   peor punto de un degradado, aplica opacidad y usa 3:1 para texto grande.
   Necesita Playwright (no es parte de la suite porque la suite no tiene
   navegador; tests/test.js mide los pares de colores desde el CSS).
   Uso:  node tools/contraste.js [ancho]      (CATS=me,av para acotar) */
const path = require('path');
const { chromium } = require('playwright');
const W=+(process.argv[2]||390);
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:W,height:900}});
p.on('pageerror',e=>{});p.on('dialog',d=>d.dismiss());
await p.goto('file://'+path.join(__dirname,'..','index.html'));await p.waitForTimeout(400);
await p.addScriptTag({content:`
window.__A={out:new Map()};
(function(){
const parse=s=>{if(!s)return null;let m=s.match(/^rgba?\\(([^)]+)\\)/);if(m){const v=m[1].split(/[ ,\\/]+/).filter(Boolean).map(Number);return [v[0],v[1],v[2],v.length>3?v[3]:1];}
 m=s.match(/^color\\(srgb ([^)]+)\\)/);if(m){const v=m[1].split(/[ \\/]+/).filter(Boolean).map(Number);return [v[0]*255,v[1]*255,v[2]*255,v.length>3?v[3]:1];}return null;};
const blend=(top,bot)=>{const a=top[3];return [top[0]*a+bot[0]*(1-a),top[1]*a+bot[1]*(1-a),top[2]*a+bot[2]*(1-a),1];};
const L=c=>{const [r,g,b]=c.slice(0,3).map(v=>{v/=255;return v<=.03928?v/12.92:((v+.055)/1.055)**2.4});return .2126*r+.7152*g+.0722*b};
const cr=(a,b)=>{const x=L(a),y=L(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05)};
const colsIn=s=>[...s.matchAll(/(rgba?\\([^)]+\\)|color\\(srgb [^)]+\\))/g)].map(m=>parse(m[0])).filter(Boolean);
function fondos(el){ // returns list of opaque candidate bgs
  const chain=[];for(let e=el;e;e=e.parentElement)chain.push(e);
  let bases=[[255,255,255,1]];
  for(let i=chain.length-1;i>=0;i--){const cs=getComputedStyle(chain[i]);
    const bi=cs.backgroundImage;
    const bc=parse(cs.backgroundColor);
    let layer=[];
    if(bc&&bc[3]>0)layer=[bc];
    if(bi&&bi.includes('gradient')&&!/radial/.test(bi)){const st=colsIn(bi);if(st.length)layer=st.map(s=>bc&&bc[3]>0?s:s);}
    if(layer.length){const nb=[];for(const l of layer)for(const bb of bases)nb.push(blend(l,bb));bases=nb.slice(0,12);}
  }
  return bases;}
function opac(el){let o=1;for(let e=el;e;e=e.parentElement)o*=+getComputedStyle(e).opacity;return o;}
window.__scan=function(donde){
 document.querySelectorAll('body *').forEach(e=>{
  if(e.closest('svg'))return;
  const rs=e.getClientRects();if(!rs.length)return;
  const r=e.getBoundingClientRect();if(r.width<2||r.height<2)return;
  const cs=getComputedStyle(e);if(cs.visibility==='hidden')return;
  if(cs.clip==='rect(0px, 0px, 0px, 0px)'||cs.clipPath==='inset(50%)')return;
  const own=[...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim().replace(/[\\u{1F000}-\\u{1FFFF}\\u2600-\\u27BF\\uFE0F]/gu,'').trim());
  const isInput=/^(INPUT|TEXTAREA)$/.test(e.tagName);
  if(!own&&!isInput)return;
  const o=opac(e);if(o<0.05)return;
  const bgs=fondos(e);
  const fs=parseFloat(cs.fontSize),fw=+cs.fontWeight||400;
  const grande=fs>=24||(fs>=18.66&&fw>=700);
  const min=grande?3:4.5;
  const dis=e.disabled||e.closest('[disabled],[aria-disabled="true"]');
  const test=(colStr,tipo)=>{let fg=parse(colStr);if(!fg)return;
    const worst=Math.min(...bgs.map(bg=>{let f=fg;if(f[3]<1)f=blend(f,bg);if(o<1)f=blend([f[0],f[1],f[2],o],bg);return cr(f,bg);}));
    if(worst<min){const cls=(typeof e.className==='string'?e.className:'')||'';
      const k=e.tagName+'.'+cls.trim().split(/\\s+/).join('.')+'|'+tipo+'|'+colStr;
      if(!__A.out.has(k))__A.out.set(k,{donde,ratio:+worst.toFixed(2),min,fg:colStr,bg:bgs.map(x=>x.slice(0,3).map(Math.round).join(',')).slice(0,2).join(' / '),fs,fw,dis:!!dis,txt:(isInput?(e.placeholder||e.value):e.textContent).trim().slice(0,30),op:+o.toFixed(2)});}};
  if(own||(isInput&&e.value))test(cs.color,'texto');
  if(isInput&&e.placeholder)test(getComputedStyle(e,'::placeholder').color,'placeholder');
 });};
})();`});
const run=async(label,fn,arg)=>{try{await p.evaluate(fn,arg);}catch(e){console.error('ERR',label,e.message.split('\n').slice(0,4).join(' | '), await p.evaluate(()=>[...document.querySelectorAll('.pantalla')].length+' pant, body='+document.body.children.length));}await p.waitForTimeout(700);await p.mouse.move(W-5,5);await p.waitForTimeout(400);await p.evaluate(l=>__scan(l),label);};
await run('bienvenida',()=>{ir('bienvenida')});
await p.evaluate(()=>{S.nombre='P';guardar();});
for(const cat of (process.env.CATS||'me,av,pa,gm,dm1,dm2,ec1,ec2').split(',')){
  await run(cat+'/inicio',c=>{ponCat(c);ir('inicio')},cat);
  await p.evaluate(c=>ponCat(c),cat);
  for(const t of ['estudio','tarjetas','examen','logros','ayuda','historial','revisor'])await run(cat+'/'+t,t=>ir(t),t);
  await run(cat+'/cap',()=>{verCap(capsDe()[0].id)});
  await run(cat+'/cap-lectura',()=>{const b=document.querySelector('#detalle details, #detalle .lec-abre');if(b&&b.tagName==='DETAILS')b.open=true;});
  await run(cat+'/lectura',()=>{abreLectura(capsDe()[0].id)});
  await p.evaluate(()=>{try{cierraLectura&&cierraLectura()}catch(e){}; document.querySelectorAll('.lect-full,.lec-full').forEach(x=>x.remove&&0)});
  await run(cat+'/yo',()=>{abreYo()});
  await p.evaluate(()=>{try{cierraHoja()}catch(e){}});
  await run(cat+'/ayuda-abierta',()=>{ir('ayuda');document.querySelectorAll('#p-ayuda details').forEach(d=>d.open=true)});
  await run(cat+'/tarjeta-volteada',()=>{ir('tarjetas');voltea();});
  await run(cat+'/examen-en-curso',()=>{ir('examen');arrancaExamen('normal');});
  await run(cat+'/examen-respondido',()=>{const ops=[...document.querySelectorAll('#p-examen .op:not(:disabled)')];if(ops[0])ops[0].click();const o2=[...document.querySelectorAll('#p-examen .op:not(:disabled)')];if(o2[1])o2[1].click();});
  await run(cat+'/examen-entregado',()=>{try{entregar()}catch(e){}});
  await p.evaluate(()=>{try{cancelaExamen()}catch(e){}});
}
await run('panel',async()=>{window.srvYo={rol:'director',nombre:'Dir'};window.srvFetch=async()=>({participantes:[],evaluaciones:[],intentos:[],codigos:[]});ir('examen');await pintaPanel();});
const rows=await p.evaluate(()=>[...__A.out.entries()].map(([k,v])=>({k,...v})));
rows.sort((a,b)=>a.ratio-b.ratio);
for(const r of rows)console.log(r.ratio,'<'+r.min,r.dis?'[disabled]':'',r.k.split('|').slice(0,2).join(' '),'fg',r.fg,'bg',r.bg,'fs',r.fs,'op',r.op,'@'+r.donde,'«'+r.txt+'»');
console.log('TOTAL',rows.length);
process.exitCode=rows.length?1:0;
await b.close();})();
