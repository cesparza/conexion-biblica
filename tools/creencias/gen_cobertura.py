# -*- coding: utf-8 -*-
"""Cierra los huecos de cobertura del banco de Daniel.

EL PROBLEMA
tools/cobertura.js encontro 80 versiculos de Daniel sin una sola pregunta,
casi todos en los capitulos profeticos (Daniel 8 al 33%, Daniel 11 con 26
versiculos sin tocar). Un versiculo sin pregunta es un versiculo que se puede
estudiar entero y no notar que no se aprendio.

POR QUE COMPLETAR Y NO SELECCION MULTIPLE
Porque completar sale del texto y no se inventa nada. Para una de seleccion
habria que fabricar tres opciones falsas plausibles, y una opcion falsa mal
hecha o enseña mal o se descarta sola. El texto de RV1995 esta en
fuente/biblia.js y tools/citas.js lo verifica byte a byte contra el .txt.

QUE SE TAPA
Dos palabras con contenido por versiculo: las mas largas que no sean de
relleno, para que completar exija saber el versiculo y no adivinar el
conector. Los versiculos muy cortos se saltan: taparles dos palabras deja
una pregunta que se responde de memoria visual, no de estudio.
"""
import os, re, sys, json, unicodedata, subprocess

# La ruta sale del propio archivo. Estaba quemada a `~/mnt/Iglesia/...`, que
# era donde el puente montaba la carpeta en su momento: el dia que el montaje
# cambio, el generador dejo de escribir y fallo con un FileNotFoundError que
# no dice nada de lo que de verdad pasa. Tampoco corria en el Mac, donde la
# carpeta vive en otro sitio.
RAIZ = os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..'))
SALIDA = os.path.join(RAIZ, 'fuente', 'preguntas-cobertura.js')

VACIAS = set('''el la los las un una unos unas de del al a y o u que se su sus es son ser fue
era con por para en como mas no ni lo le les nos este esta estos estas ese esa eso aquel todo
toda todos todas hay ha han he sino pero cuando donde porque si ya tambien entre sobre desde
hasta segun e dijo dice entonces asi cual cuales quien quienes sera seran habia hubo ante tras
mi tu el ella ellos ellas yo nosotros vosotros'''.split())

def pl(t):
    t = unicodedata.normalize('NFD', t.lower())
    return ''.join(c for c in t if unicodedata.category(c) != 'Mn')

def claves(frase, n=2):
    out = []
    for w in re.findall(r'[A-Za-zÁÉÍÓÚÑÜáéíóúñü]{5,}', frase):
        if pl(w) in VACIAS or w in out:
            continue
        out.append(w)
    out.sort(key=len, reverse=True)
    return out[:n]

def main():
    vers = json.loads(subprocess.run(
        ['node', '-e', "console.log(JSON.stringify(require('./fuente/biblia.js').VERS))"],
        cwd=RAIZ, capture_output=True, text=True).stdout)
    banco = json.loads(subprocess.run(
        ['node', '-e', "console.log(JSON.stringify(require('./fuente/preguntas.js').BANCO))"],
        cwd=RAIZ, capture_output=True, text=True).stdout)

    # que versiculo toca cada pregunta ya existente
    tocados = set()
    for q in banco:
        cap = q.get('cap', '')
        if not re.match(r'^d\d+$', cap):
            continue
        txt = (q.get('q') or '') + ' ' + (q.get('ins') or '') + ' ' + ' '.join(q.get('o') or [])
        n = cap[1:]
        for m in re.finditer(r'(?:Daniel\s+)?' + n + r':(\d{1,2})(?:[-–](\d{1,2}))?', txt):
            a = int(m.group(1)); b = int(m.group(2) or a)
            for v in range(a, b + 1):
                tocados.add((cap, v))

    nuevas, saltados = [], 0
    for cap in sorted(vers, key=lambda c: int(c[1:])):
        for v in sorted(vers[cap], key=int):
            if (cap, int(v)) in tocados:
                continue
            texto = vers[cap][v].strip()
            if len(texto) < 55:          # una linea suelta: no da ni para una
                saltados += 1; continue
            # Dos palabras si el versiculo da; una si es corto. Un versiculo
            # corto con una sola palabra tapada sigue exigiendo saberlo, y es
            # mejor que dejarlo sin ninguna pregunta.
            ks = claves(texto, 2 if len(texto) >= 90 else 1)
            if not ks:
                saltados += 1; continue
            partes, resto = [], texto
            for w in sorted(ks, key=lambda w: resto.find(w)):
                i = resto.find(w)
                if i < 0: continue
                partes.append({'x': resto[:i]}); partes.append({'b': w, 'h': '¿?'})
                resto = resto[i + len(w):]
            partes.append({'x': resto})
            if sum(1 for p in partes if 'b' in p) < 1:
                saltados += 1; continue
            nuevas.append(dict(cap=cap, t='fill',
                               ins='Daniel %s:%s (RV1995) — Completa:' % (cap[1:], v),
                               p=partes))

    J = lambda o: json.dumps(o, ensure_ascii=False)
    cuerpo = []
    for q in nuevas:
        pp = ','.join('{' + ','.join('%s:%s' % (k, J(x)) for k, x in p.items()) + '}' for p in q['p'])
        cuerpo.append('  {cap:%s,t:"fill",ins:%s,\n   p:[%s]},' % (J(q['cap']), J(q['ins']), pp))

    js = ('''/* preguntas-cobertura.js — NO EDITAR A MANO.
   Lo escribe tools/creencias/gen_cobertura.py.

   POR QUE EXISTE
   tools/cobertura.js encontro 80 versiculos de Daniel sin una sola pregunta,
   casi todos en los capitulos profeticos. Un versiculo sin pregunta se puede
   estudiar entero sin notar que no se aprendio.

   Son de COMPLETAR porque salen del texto de RV1995 y no inventan nada: para
   una de seleccion habria que fabricar tres opciones falsas, y una opcion
   falsa mal hecha o enseña mal o se descarta sola. El texto viene de
   fuente/biblia.js, que tools/citas.js verifica contra el .txt. */

const BANCO_COBERTURA = [
''' + '\n'.join(cuerpo) + '''
];

if (typeof module !== "undefined") module.exports = { BANCO_COBERTURA };
''')
    open(SALIDA, 'w', encoding='utf-8').write(js)
    porCap = {}
    for q in nuevas:
        porCap[q['cap']] = porCap.get(q['cap'], 0) + 1
    print('preguntas nuevas:', len(nuevas), '| saltadas por cortas:', saltados)
    print('por capitulo:', ' '.join('%s=%d' % (k, porCap[k]) for k in sorted(porCap, key=lambda c: int(c[1:]))))
    largas = [i+1 for i, l in enumerate(js.split('\n')) if len(l) > 2000]
    print('lineas >2000:', largas[:3] or 'ninguna')

if __name__ == '__main__':
    main()
