/* Revisa TODO el material que se le pregunta a una nina, en todos los bancos,
   y lo contrasta con el texto biblico que la app ya trae.
   MIDE, NO DECIDE. Sale con 1 si hay algo duro.

   POR QUE EXISTE
   Las suites comprueban que el examen funciona, no que las preguntas digan la
   verdad. Una respuesta equivocada pasa las cuatro en verde y solo se
   descubre cuando una nina la estudia mal y la pierde en el campamento.

   QUE SE PUEDE CONTRASTAR Y QUE NO, QUE ES PARTE DEL RESULTADO
   · fuente/biblia.js trae Daniel 1-12 completo en RV1995, 357 versiculos, que
     es la misma version en la que esta escrito todo el material de Daniel.
     Ahi el contraste es de verdad y lo que no calce es DURO.
   · fuente/biblia-otros.js trae 200 capitulos de otros libros, pero en RV1909.
     La matutina cita NTV y las creencias citan la cartilla, asi que una
     diferencia ahi puede ser solo de version: va a REVISAR, nunca a DURO.
   · Profetas y Reyes es un libro, no versiculos: de esas solo estructura.

   POR QUE «REVISAR» NO ES «DURO»
   Una respuesta puede ser correcta sin estar escrita en el verso: «setenta
   semanas» son cuatrocientos noventa anos, y el verso dice lo primero. Meter
   eso en la lista dura convierte el verificador en algo que se ignora, y un
   verificador que miente es peor que no tenerlo. */
const path=require('path');
const F=f=>require(path.join(__dirname,'..','fuente',f));
const {BANCO}=F('preguntas.js');
const {BANCO_PR}=F('preguntas-pr.js');
const {BANCO_COBERTURA}=F('preguntas-cobertura.js');
const {MAT_EXTRA}=F('matutina-extra.js');
const {MAT_COMPLETAR}=F('matutina-completar.js');
const {CR_BANCO}=F('creencias.js');
const {TARJETAS}=F('tarjetas.js');
const {VERS}=F('biblia.js');
const {OTRAS_VERS,NOMBRES_OTROS}=F('biblia-otros.js');

const BANCOS=[
  ['Daniel y P&R',        BANCO],
  ['P&R, completar',      BANCO_PR],
  ['Daniel 7-12, cobertura', BANCO_COBERTURA],
  ['Matutina',            MAT_EXTRA],
  ['Matutina, completar', MAT_COMPLETAR],
  ['28 creencias',        CR_BANCO],
];

const norm=s=>String(s||'').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'')
  .replace(/[«»"“”'’,.;:!¡?¿()\[\]—–-]/g,' ').replace(/\s+/g,' ').trim();

/* El slug del libro tal como lo guarda biblia-otros.js, desde su nombre. */
const SLUG={}; for(const [s,n] of Object.entries(NOMBRES_OTROS)) SLUG[norm(n)]=s;

/* Devuelve el texto citado y de donde salio, o null si no hay contra que
   comparar. `fuerte` dice si la version coincide con la del material. */
function textoCitado(txt,cap){
  txt=String(txt||'');
  const dan=/(?:Daniel\s+)?(\d{1,2}):(\d{1,3})(?:\s*[-–]\s*(\d{1,3}))?/.exec(txt);
  const esDan=/Daniel/i.test(txt)||/^d\d+$/.test(cap||'');
  if(dan&&esDan){
    const c=/Daniel/i.test(txt)?dan[1]:((cap||'').match(/^d(\d+)$/)||[])[1];
    const libro=VERS['d'+c];
    if(libro){
      const ini=+dan[2], fin=dan[3]?+dan[3]:ini;
      const tope=Math.max(...Object.keys(libro).map(Number));
      if(fin>tope) return {imposible:'Daniel '+c+' llega al versiculo '+tope+', y la cita pide el '+fin};
      let t=''; for(let v=ini;v<=fin;v++) if(libro[v]) t+=' '+libro[v];
      if(t.trim()) return {ref:'Daniel '+c+':'+ini+(fin>ini?'-'+fin:''),texto:t.trim(),fuerte:true};
    }
    return null;
  }
  const otro=/([1-3]?\s*[A-Za-zÁÉÍÓÚÑáéíóúñ]+)\s+(\d{1,3}):(\d{1,3})(?:\s*[-–,]\s*(\d{1,3}))?/.exec(txt);
  if(otro){
    const s=SLUG[norm(otro[1])];
    const libro=s&&OTRAS_VERS[s+'-'+otro[2]];
    if(libro){
      const ini=+otro[3], fin=otro[4]?+otro[4]:ini;
      let t=''; for(let v=ini;v<=fin;v++) if(libro[v]) t+=' '+libro[v];
      if(t.trim()) return {ref:NOMBRES_OTROS[s]+' '+otro[2]+':'+ini,texto:t.trim(),fuerte:false};
    }
  }
  return null;
}

const dura=[], blanda=[], ciega=[], porEnunciado=new Map();
let enElVerso=0, contrastadas=0, sinCita=0;

for(const [banco,lista] of BANCOS){
  for(const q of lista||[]){
    const nom='['+banco+'] '+(q.q||q.ins||'').slice(0,64);

    /* ── estructura: vale para todos los bancos y no admite interpretacion ── */
    if(q.t==='mc'){
      if(!Array.isArray(q.o)||q.o.length<2) dura.push(['sin opciones',nom,'']);
      else{
        if(!(q.a>=0&&q.a<q.o.length)) dura.push(['la respuesta apunta fuera de las opciones',nom,'a='+q.a]);
        const vistas=new Set();
        for(const o of q.o){
          if(!String(o||'').trim()) dura.push(['una opcion vacia',nom,'']);
          const k=norm(o);
          if(vistas.has(k)) dura.push(['dos opciones iguales',nom,String(o)]);
          vistas.add(k);
        }
      }
    } else if(q.t==='tf'){
      if(typeof q.a!=='boolean') dura.push(['verdadero o falso sin respuesta booleana',nom,String(q.a)]);
      if(!String(q.q||'').trim()) dura.push(['verdadero o falso sin enunciado',nom,'']);
    } else if(q.t==='fill'){
      if(!Array.isArray(q.p)||!q.p.some(x=>x.b)) dura.push(['completar sin ningun hueco',nom,'']);
      for(const x of (q.p||[])) if(x.b!==undefined&&!String(x.b).trim())
        dura.push(['completar con un hueco vacio',nom,'']);
    } else if(q.t) dura.push(['tipo de pregunta desconocido',nom,String(q.t)]);

    /* ── el mismo enunciado con distinta respuesta, mirando todos los bancos ── */
    const clave=norm(q.q||q.ins);
    const resp=q.t==='mc'?norm(q.o&&q.o[q.a]):q.t==='tf'?String(q.a):
      (q.p||[]).filter(x=>x.b).map(x=>norm(x.b)).join('|');
    if(clave){
      const ant=porEnunciado.get(clave);
      if(ant&&ant.resp!==resp)
        dura.push(['el mismo enunciado con DOS respuestas',nom,ant.banco+': '+ant.resp+'   vs   '+banco+': '+resp]);
      else if(!ant) porEnunciado.set(clave,{resp,banco});
    }

    /* ── contra el texto, donde lo hay ── */
    const c=textoCitado(q.q||q.ins,q.cap);
    if(c&&c.imposible){ dura.push(['cita un versiculo que no existe',nom,c.imposible]); continue; }
    if(!c){ sinCita++; continue; }
    contrastadas++;
    const V=norm(c.texto), donde=c.ref, duro=l=>c.fuerte?dura.push(l):blanda.push(l);

    if(q.t==='fill'){
      const frase=norm(q.p.map(x=>x.b||x.x).join('')).replace(/^\s*\.*\s*/,'');
      if(!V.includes(frase)){
        const faltan=q.p.filter(x=>x.b).map(x=>x.b).filter(b=>!V.includes(norm(b)));
        if(faltan.length&&!c.fuerte) ciega.push(['no coincide con la RV1909, que es lo unico que hay de ese libro',nom,donde+'  ·  '+faltan.join(' · ')]);
        else if(faltan.length) duro(['completar: la respuesta no esta en '+donde,nom,faltan.join(' · ')]);
        else blanda.push(['completar: el verso las trae, pero la frase no calza entera',nom,donde]);
      }
    } else if(q.t==='mc'&&Array.isArray(q.o)&&q.o[q.a]!==undefined){
      const buena=norm(q.o[q.a]);
      const esCantidad=/^.?\s*cuant[oa]s?\b/.test(norm(q.q));
      const esNombre=/como se llamaba|que nombre|cual era el nombre/.test(norm(q.q));
      if(esCantidad||esNombre){
        const nucleo=buena.split(' ').filter(w=>w.length>2)[0]||buena;
        const falsas=q.o.filter((o,i)=>i!==q.a)
          .map(o=>(norm(o).split(' ').filter(w=>w.length>2)[0]||norm(o)))
          .filter(w=>V.includes(w));
        /* Un nombre propio SI tiene que estar escrito: «como se llamaba» no se
           calcula, se lee. Una cantidad puede ser un calculo. */
        if(!V.includes(nucleo)&&esNombre) duro(['el nombre de la correcta no esta en '+donde,nom,'«'+q.o[q.a]+'»']);
        else if(!V.includes(nucleo)) blanda.push(['la correcta no esta escrita en '+donde+'; puede ser un calculo',nom,'«'+q.o[q.a]+'»']);
        else if(falsas.length) enElVerso++;
      }
    }
  }
}

/* ── las tarjetas tambien se estudian ── */
const caras=new Map();
for(const t of TARJETAS||[]){
  const nom='[Tarjetas] '+String(t.f||'').replace(/<[^>]+>/g,'').slice(0,64);
  if(!String(t.f||'').trim()||!String(t.r||'').trim()) dura.push(['una tarjeta sin cara o sin respuesta',nom,'']);
  const k=norm(String(t.f).replace(/<[^>]+>/g,''));
  const ant=caras.get(k);
  if(ant&&ant!==norm(t.r)) dura.push(['la misma tarjeta con DOS respuestas',nom,ant+'   vs   '+norm(t.r)]);
  else if(!ant) caras.set(k,norm(t.r));
}

const total=BANCOS.reduce((a,[,l])=>a+(l?l.length:0),0);
const pinta=(t,l)=>{
  console.log('\n'+t+'  ('+l.length+')');
  if(!l.length){console.log('  nada'); return;}
  for(const [x,n,d] of l.slice(0,60)) console.log('  · '+x+'\n      '+n+(d?'\n      '+d:''));
  if(l.length>60) console.log('  ... y '+(l.length-60)+' mas');
};
console.log('REVISADO');
for(const [b,l] of BANCOS) console.log('  '+String((l||[]).length).padStart(4)+'  '+b);
console.log('  '+String((TARJETAS||[]).length).padStart(4)+'  Tarjetas');
console.log('  ————');
console.log('  '+String(total).padStart(4)+'  preguntas, mas '+(TARJETAS||[]).length+' tarjetas');
pinta('DURO — hay que corregirlo',dura);
pinta('PARA REVISAR — puede ser legitimo',blanda);
console.log('\nNO SE PUEDE VERIFICAR  ('+ciega.length+')');
if(ciega.length){
  console.log('  La matutina cita NTV, PDT, TLA, NBV, LBLA, NVI, RVC y RV95 segun el dia,');
  console.log('  y de esos libros la app solo guarda RV1909. No estan mal: es que no hay');
  console.log('  contra que compararlas. Descansan en quien las transcribio.');
  console.log('  Para cerrarlo habria que meter su texto, como se hizo con Daniel.');
  for(const [x,n2,d] of ciega.slice(0,8)) console.log('   · '+n2+(d?'\n       '+d:''));
  if(ciega.length>8) console.log('   ... y '+(ciega.length-8)+' mas');
}
console.log('\nHASTA DONDE LLEGA ESTE VERIFICADOR, que tambien es un dato:');
console.log('  '+contrastadas+' preguntas se pudieron contrastar contra un verso citado.');
console.log('  '+sinCita+' no citan capitulo y verso, o citan algo que no esta en la app.');
console.log('  '+enElVerso+' tienen la correcta Y alguna falsa dentro del mismo verso:');
console.log('       esas son buenas distractoras, sacadas del texto y no inventadas.');
process.exit(dura.length?1:0);
