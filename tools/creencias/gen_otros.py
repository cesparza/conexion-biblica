# -*- coding: utf-8 -*-
"""Regenera fuente/biblia-otros.js desde TODOS los files/rv1909-*.txt.
El .js es un artefacto: la fuente son los .txt, y tools/citas.js los compara
byte a byte."""
import os, re, json, glob, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import refs

# La ruta sale del propio archivo. Estaba quemada a `~/mnt/Iglesia/...`, que
# era donde el puente montaba la carpeta en su momento: el dia que el montaje
# cambio, el generador dejo de escribir y fallo con un FileNotFoundError que
# no dice nada de lo que de verdad pasa. Tampoco corria en el Mac, donde la
# carpeta vive en otro sitio.
RAIZ = os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..'))
FILES = os.path.normpath(os.path.join(RAIZ, '..', '..', 'files'))
SALIDA = os.path.join(RAIZ, 'fuente', 'biblia-otros.js')

vers, meta, nombres = {}, {}, {}
for ruta in sorted(glob.glob(os.path.join(FILES, 'rv1909-*.txt'))):
    m = re.match(r'rv1909-(.+)-(\d+)\.txt$', os.path.basename(ruta))
    slug, cap = m.group(1), m.group(2)
    if slug == 'daniel':      # Daniel va por biblia.js (RV1995), no por aqui
        continue
    cid = f'{slug}-{cap}'
    d = {}
    for linea in open(ruta, encoding='utf-8'):
        mm = re.match(r'^(\d+)\|(.*)$', linea.rstrip('\n'))
        if mm:
            d[int(mm.group(1))] = mm.group(2)
    if not d:
        continue
    vers[cid] = {str(k): d[k] for k in sorted(d)}
    meta[cid] = {'libro': refs.NOMBRE[slug], 'cap': cap, 'version': 'RV1909'}
    nombres[slug] = refs.NOMBRE[slug]

# Sin insumos no se escribe nada. Sin esta guarda el generador dejaba un
# biblia-otros.js vacio y salia con codigo 0: borraba 107 versiculos en
# silencio, que es peor que reventar.
if not vers:
    sys.exit('No encontre ningun rv1909-*.txt en ' + FILES + '. No escribo nada.')

def dump(o):
    # indentacion 1: ninguna linea del index.html puede pasar de 2.000 caracteres
    return json.dumps(o, ensure_ascii=False, indent=1)

cab = '''/* biblia-otros.js — NO EDITAR A MANO.
   Generado desde files/rv1909-{libro}-{capitulo}.txt (dominio publico).
   Citas a libros distintos de Daniel, para refsTocables() en app.js.
   Ver tools/citas.js para la verificacion byte a byte contra la fuente.

   Cubre los textos clave de las 28 creencias de «En esto creemos» ademas de
   los del material de Daniel. El texto viene de la Biblia Libre (Reina Valera
   Antigua, licencia libre), comprobada contra los archivos que ya existian:
   95 de 107 versiculos identicos, y los 12 restantes difieren solo en
   tipografia. Los versiculos que ya estaban NO se reescribieron. */

'''
js = (cab
      + 'const NOMBRES_OTROS = ' + dump(dict(sorted(nombres.items()))) + ';\n\n'
      + 'const OTRAS_VERS = ' + dump(vers) + ';\n\n'
      + 'const OTRAS_META = ' + dump(meta) + ';\n\n'
      + 'if (typeof module !== "undefined") module.exports = { NOMBRES_OTROS, OTRAS_VERS, OTRAS_META };\n')
open(SALIDA, 'w', encoding='utf-8').write(js)
print('capitulos:', len(vers), '| libros:', len(nombres),
      '| versiculos:', sum(len(v) for v in vers.values()))
largas = [i+1 for i, l in enumerate(js.split('\n')) if len(l) > 2000]
print('lineas >2000:', largas[:5] or 'ninguna')
