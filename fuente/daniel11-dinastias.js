/* Selective family links for Daniel 11:5–15. Political succession is separate. */
export const FUENTES_DINASTIAS = {
  biblia:{titulo:'Daniel 11:5–15 · RV1995',url:'https://www.biblegateway.com/passage/?search=Daniel%2011%3A5-15&version=RVR1995'},
  treiyer:{titulo:'Humberto R. Treiyer, Enigmas descifrados, 2006, 3.ª impresión 2007, pp. 57–64'},
  apiano:{titulo:'Apiano, Guerras sirias, 66 · traducción de Horace White',url:'https://www.livius.org/sources/content/appian/appian-the-syrian-wars/appian-the-syrian-wars-14/'},
  apiano65:{titulo:'Apiano, Guerras sirias, 65 · matrimonios y crisis dinástica',url:'https://www.livius.org/sources/content/appian/appian-the-syrian-wars/appian-the-syrian-wars-13/'},
  eusebio:{titulo:'Eusebio, Crónica, libro I, pp. 161–163 · sucesión tolemaica',url:'https://www.attalus.org/translate/eusebius1.html'},
  polibio:{titulo:'Polibio, Historias, 2.71.2; 15.25 · filiación de Tolomeo IV y sucesión de Tolomeo V',url:'https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0234%3Abook%3D15%3Achapter%3D25'},
  bennett:{titulo:'Christopher Bennett, Ptolemy IV, notas 2 y 17 · documentos y testimonios antiguos',url:'https://www.trismegistos.org/calendar/bennett/ptolemies/ptolemy_iv.htm'},
};
const p=(id,nombre,corto,casa,resumen,fuentes)=>({id,nombre,corto,casa,resumen,fuentes});
export const PERSONAS_DINASTIAS = [
  p('tolomeo-i','Tolomeo I Sóter','Tolomeo I','sur','General de Alejandro. Estableció en Egipto la casa de los Tolomeos. Su antigua colaboración con Seleuco dio paso a dos poderes rivales.',['treiyer']),
  p('tolomeo-ii','Tolomeo II Filadelfo','Tolomeo II','sur','Hijo de Tolomeo I y padre de Berenice y Tolomeo III. La unión de su hija con Antíoco II buscó asegurar la paz entre las dos cortes.',['treiyer','eusebio']),
  p('tolomeo-iii','Tolomeo III Evérgetes','Tolomeo III','sur','Hijo de Tolomeo II y hermano de Berenice. Su campaña contra el norte continúa el conflicto después del fracaso de la alianza matrimonial.',['treiyer','apiano65']),
  p('tolomeo-iv','Tolomeo IV Filopátor','Tolomeo IV','sur','Hijo de Tolomeo III. Combatió contra Antíoco III y venció en Rafia, en 217 a. C. Esa victoria no puso fin a la rivalidad.',['polibio','bennett','treiyer']),
  p('tolomeo-v','Tolomeo V Epífanes','Tolomeo V','sur','Hijo de Tolomeo IV. Durante su minoría de edad, Antíoco III volvió a disputar el dominio de la región situada entre Egipto y Siria.',['polibio','bennett','treiyer']),
  p('seleuco-i','Seleuco I Nicátor','Seleuco I','norte','General de Alejandro y fundador de la casa seléucida. Su reino abarcó Siria y extensas regiones orientales. No era hijo de Tolomeo I.',['treiyer']),
  p('antioco-i','Antíoco I Sóter','Antíoco I','norte','Hijo de Seleuco I. Une al fundador de la dinastía con Antíoco II, el rey que se casó con Berenice.',['treiyer','apiano65']),
  p('antioco-ii','Antíoco II Teos','Antíoco II','norte','Hijo de Antíoco I. Tuvo hijos con Laodice y con Berenice. Los dos matrimonios ayudan a entender la disputa por la sucesión.',['treiyer','apiano65']),
  p('laodice','Laodice I','Laodice I','norte','Esposa de Antíoco II y madre de Seleuco II. La alianza con Berenice desplazó su posición y abrió una rivalidad entre las ramas familiares. El árbol no la presenta como hermana de Antíoco: ese vínculo no se establece aquí.',['apiano65','treiyer']),
  p('berenice','Berenice','Berenice','sur','Hija de Tolomeo II, hermana de Tolomeo III y esposa de Antíoco II. Su hijo pertenecía a ambas casas. Ella y el niño murieron en la crisis de 246 a. C.',['treiyer','apiano65']),
  p('hijo-berenice','Hijo de Berenice y Antíoco II','Hijo de Berenice','ambas','Niño de la unión entre las dos casas. Murió en la crisis sucesoria de 246 a. C. No es Seleuco II: este era hijo de Laodice. El esquema evita confundir a los dos hijos.',['treiyer','apiano65']),
  p('seleuco-ii','Seleuco II Calínico','Seleuco II','norte','Hijo de Antíoco II y Laodice I. Accedió al trono en la crisis de 246 a. C. y se enfrentó a Tolomeo III.',['treiyer','apiano65']),
  p('seleuco-iii','Seleuco III Cerauno','Seleuco III','norte','Hijo de Seleuco II y hermano de Antíoco III. Reinó antes que su hermano. La sucesión entre ellos no es una relación de padre e hijo.',['apiano','treiyer']),
  p('antioco-iii','Antíoco III el Grande','Antíoco III','norte','Hijo de Seleuco II y hermano de Seleuco III. Combatió contra Tolomeo IV y después contra el poder egipcio de Tolomeo V.',['apiano','treiyer']),
];
const r=(desde,hasta,tipo,fuentes)=>({desde,hasta,tipo,fuentes});
export const VINCULOS_DINASTIAS = [
  r('tolomeo-i','tolomeo-ii','filiacion',['treiyer','eusebio']),r('tolomeo-ii','tolomeo-iii','filiacion',['treiyer','apiano65']),
  r('tolomeo-ii','berenice','filiacion',['treiyer','apiano65']),r('tolomeo-iii','tolomeo-iv','filiacion',['polibio','bennett']),
  r('tolomeo-iv','tolomeo-v','filiacion',['polibio','bennett']),r('seleuco-i','antioco-i','filiacion',['treiyer','apiano65']),
  r('antioco-i','antioco-ii','filiacion',['treiyer','apiano65']),r('antioco-ii','seleuco-ii','filiacion',['apiano']),
  r('laodice','seleuco-ii','filiacion',['apiano']),r('antioco-ii','hijo-berenice','filiacion',['treiyer','apiano65']),
  r('berenice','hijo-berenice','filiacion',['treiyer','apiano65']),r('seleuco-ii','seleuco-iii','filiacion',['apiano']),
  r('seleuco-ii','antioco-iii','filiacion',['apiano']),r('berenice','antioco-ii','matrimonio',['treiyer','apiano65']),
  r('laodice','antioco-ii','matrimonio',['treiyer','apiano65']),
];
export const ETAPAS_DINASTIAS = [
  {id:'origen',titulo:'Dos casas reales',fecha:'Después de Alejandro',ref:'Daniel 11:5',sur:'tolomeo-i',norte:'seleuco-i',
    texto:'Dos antiguos generales establecen casas distintas. «Norte» y «sur» ubican los poderes respecto de Judea; no son los nombres de dos personas que vivieron durante todo el capítulo.',foco:'tolomeo-i'},
  {id:'alianza',titulo:'La alianza matrimonial',fecha:'Hacia 253–252 a. C.',ref:'Daniel 11:6',sur:'tolomeo-ii',norte:'antioco-ii',
    texto:'Berenice, hija del rey egipcio, se une a Antíoco II. Su hermano Tolomeo III y el hijo de Laodice, Seleuco II, pertenecen a ramas diferentes. El matrimonio intenta resolver una rivalidad política.',foco:'berenice'},
  {id:'ruptura',titulo:'La paz se rompe',fecha:'246 a. C.',ref:'Daniel 11:6–9',sur:'tolomeo-iii',norte:'seleuco-ii',
    texto:'La muerte de Berenice y su hijo destruye la garantía familiar del acuerdo. Su hermano Tolomeo III interviene contra el reino de Seleuco II. Los detalles de las intrigas varían entre testimonios: el árbol no convierte el supuesto envenenamiento en certeza.',foco:'berenice'},
  {id:'rafia',titulo:'Rafia',fecha:'217 a. C.',ref:'Daniel 11:10–12',sur:'tolomeo-iv',norte:'antioco-iii',
    texto:'Los protagonistas han cambiado. Tolomeo IV vence a Antíoco III en Rafia. Antes de Antíoco III reinó su hermano Seleuco III: ambos eran hijos de Seleuco II.',foco:'antioco-iii'},
  {id:'retorno',titulo:'El norte vuelve',fecha:'Comienzos del siglo II a. C.',ref:'Daniel 11:13–15',sur:'tolomeo-v',norte:'antioco-iii',
    texto:'Antíoco III vuelve a combatir cuando Egipto está bajo el joven Tolomeo V. La disputa afecta a las ciudades y tierras situadas entre ambas potencias. El esquema termina en este tramo; no prolonga la genealogía hacia Roma ni hacia acontecimientos futuros.',foco:'tolomeo-v'},
];
export function familiaDinastica(id){
  if(!PERSONAS_DINASTIAS.some(p=>p.id===id))throw new RangeError('Personaje no reconocido.');
  return {padres:VINCULOS_DINASTIAS.filter(v=>v.tipo==='filiacion'&&v.hasta===id).map(v=>v.desde),
    parejas:VINCULOS_DINASTIAS.filter(v=>v.tipo==='matrimonio'&&(v.desde===id||v.hasta===id)).map(v=>v.desde===id?v.hasta:v.desde),
    hijos:VINCULOS_DINASTIAS.filter(v=>v.tipo==='filiacion'&&v.desde===id).map(v=>v.hasta)};
}

/** Returns only the children documented for the selected couple. */
export function hogarDinastico(id,pareja){
  const f=familiaDinastica(id);
  if(pareja&&!f.parejas.includes(pareja))throw new RangeError('Matrimonio no documentado.');
  return {...f,hijos:f.hijos.filter(h=>!pareja||familiaDinastica(h).padres.includes(pareja))};
}
