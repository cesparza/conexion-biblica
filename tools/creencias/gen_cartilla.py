# -*- coding: utf-8 -*-
"""Escribe fuente/cartilla.txt: la transcripcion literal de la cartilla.
Es la FUENTE. tools/cartilla.js exige que cada declaracion de creencias.js
aparezca aqui palabra por palabra."""
import os, sys, unicodedata
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import datos

SALIDA = os.path.expanduser('~/mnt/Iglesia/projects/conexion-biblica/fuente/cartilla.txt')

def sin_tildes(t):
    t = unicodedata.normalize('NFD', t)
    return ''.join(c for c in t if unicodedata.category(c) != 'Mn')

L = []
L.append('FUENTE LITERAL DE «EN ESTO CREEMOS»')
L.append('Cartilla «En esto creemos», Iglesia Adventista del Septimo Dia,')
L.append('Union Colombiana del Sur, 2026. Lema «Viviendo la Mision 7-70».')
L.append('Material preparado por el pastor Ludwing Morales.')
L.append('')
L.append('QUE ES ESTE ARCHIVO')
L.append('La transcripcion palabra por palabra de la cartilla que se evalua.')
L.append('tools/cartilla.js exige que cada declaracion de fuente/creencias.js')
L.append('aparezca literal aqui. Si cambia la edicion, se cambia este archivo')
L.append('y las declaraciones, y nada mas.')
L.append('')
L.append('SE TRANSCRIBE TAL CUAL, ERRATAS INCLUIDAS')
L.append('La cartilla trae erratas y aqui quedan como estan, porque lo que se')
L.append('evalua es la cartilla y no la version corregida:')
L.append('  - creencia 1: «de la doctrinas», y cierra sin punto final')
L.append('  - creencia 3, 6 y 13: cierran sin punto final')
L.append('  - creencia 16: «1 Corintios 10-16,17» donde el libro dice «10:16,17»')
L.append('  - creencia 26: «Ecleciastes», y abrevia «Col. 3:4»')
L.append('  - creencia 14: la cartilla imprime AQUI el texto de la creencia 13.')
L.append('    Es un error de imprenta, no una variante. Queda sin declaracion')
L.append('    hasta confirmarlo contra el impreso.')
L.append('')

for n, nom, a, b, intro in datos.DOCTRINAS:
    ORD = {1:'PRIMERA',2:'SEGUNDA',3:'TERCERA',4:'CUARTA',5:'QUINTA',6:'SEXTA'}[n]
    L.append('=== %s DOCTRINA — %s ===' % (ORD, sin_tildes(nom).upper()))
    L.append('')
    L.append(intro)
    L.append('')
    for num in range(a, b + 1):
        d = datos.CREENCIAS[num]
        L.append('--- Creencia %02d — %s ---' % (num, d['nombre'].upper()))
        L.append('')
        if d['decl']:
            L.append(d['decl'])
        else:
            L.append('(SIN DECLARACION: %s. Ver la nota de arriba.)' % d['fuente'])
        L.append('')
        L.append('TEXTOS: ' + d['textos'])
        L.append('')

open(SALIDA, 'w', encoding='utf-8').write('\n'.join(L) + '\n')
print('cartilla.txt escrito:', len(L), 'lineas |',
      sum(1 for d in datos.CREENCIAS.values() if d['decl']), 'declaraciones')
