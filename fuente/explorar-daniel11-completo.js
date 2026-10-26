import {montarDaniel11} from './explorar-daniel11.js';
import {montarDinastias} from './daniel11-dinastias-vista.js';

/** Reuses the map and reading tools without coupling them to the family data. */
export function montarDaniel11Completo(root, opciones={}){
  return montarDaniel11(root,{
    ...opciones,
    dinastias: host=>montarDinastias(host,{
      biografias:opciones.biografias,
      onBiografia:opciones.onBiografia,
      estilos:opciones.estilos,
    }),
  });
}
