# -*- coding: utf-8 -*-
"""Escribe fuente/mapa-versiculos.js: una linea por versiculo de Daniel.

POR QUE EXISTE
El material de estudio esta organizado por TEMAS (el carnero, los cuatro
cuernos, las 2.300 tardes). Esta bien para entender, pero deja al estudiante
sin manera de comprobar que no se salto nada: tools/cobertura.js medía que
Daniel 8 solo citaba 10 de sus 27 versiculos.

El mapa cierra ese hueco por el otro lado: recorre el capitulo versiculo por
versiculo y dice que trae cada uno. No reemplaza la explicacion tematica, la
complementa, y es lo que un examen de dato literal pide.

Cada linea se escribio leyendo el texto RV1995 de fuente/biblia.js.
"""
import os, sys, json
AQUI = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, AQUI)

MAPA = {}
for mod in ['d01_02', 'd03_04', 'd05_06', 'd07_08', 'd09_10_12', 'd11']:
    MAPA.update(__import__(mod).MAPA)

SALIDA = os.path.join(AQUI, '..', '..', 'fuente', 'mapa-versiculos.js')

orden = sorted(MAPA, key=lambda c: int(c[1:]))
partes = []
for cap in orden:
    filas = ',\n  '.join('%d: %s' % (v, json.dumps(MAPA[cap][v], ensure_ascii=False))
                         for v in sorted(MAPA[cap]))
    partes.append(' %s: {\n  %s\n }' % (json.dumps(cap), filas))

js = '''/* mapa-versiculos.js — una linea por versiculo de Daniel.

   POR QUE EXISTE
   El material de estudio esta organizado por TEMAS, que es como se entiende,
   pero asi el estudiante no tiene manera de comprobar que no se salto nada.
   Este mapa recorre el capitulo versiculo por versiculo y dice que trae cada
   uno: no reemplaza la explicacion tematica, la completa por el otro lado, y
   es lo que pide un examen de dato literal.

   Cada linea se escribio leyendo el texto RV1995 de fuente/biblia.js.
   Lo ensambla tools/mapa/gen.py desde los archivos por capitulo. */

const MAPA_VERSICULOS = {
''' + ',\n'.join(partes) + '''
};

if (typeof module !== "undefined") module.exports = { MAPA_VERSICULOS };
'''
open(SALIDA, 'w', encoding='utf-8').write(js)
tot = sum(len(v) for v in MAPA.values())
print('capitulos:', len(MAPA), '| versiculos mapeados:', tot)
largas = [i+1 for i, l in enumerate(js.split('\n')) if len(l) > 2000]
print('lineas >2000:', largas[:3] or 'ninguna')
