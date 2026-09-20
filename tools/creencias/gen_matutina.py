# -*- coding: utf-8 -*-
"""Preguntas de completar para la matutina, sacadas de sus 31 versiculos.

EL PROBLEMA
La matutina no tenia NI UNA pregunta de completar: 97 de seleccion y 31 de
verdadero o falso. Consecuencia medida, no supuesta: de los nueve modos de
practicar solo se le ofrecian cinco, porque «Completar», «Caza el error» y
«¿De donde es?» salen todos de preguntas de completar. Y el examen real trae
su seccion de completar igual que los otros.

DE DONDE SALE EL TEXTO
Del modulo «Los 31 versiculos con su referencia», que ya esta publicado en la
app y trae dia, referencia y texto. No se trae texto de ninguna otra parte:
se usa el que la matutina ya muestra.
"""
import os, re, sys, json, unicodedata, subprocess

# La ruta sale del propio archivo. Estaba quemada a `~/mnt/Iglesia/...`, que
# era donde el puente montaba la carpeta en su momento: el dia que el montaje
# cambio, el generador dejo de escribir y fallo con un FileNotFoundError que
# no dice nada de lo que de verdad pasa. Tampoco corria en el Mac, donde la
# carpeta vive en otro sitio.
RAIZ = os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..'))
SALIDA = os.path.join(RAIZ, 'fuente', 'matutina-completar.js')

VACIAS = set('''el la los las un una unos unas de del al a y o u que se su sus es son ser fue
era con por para en como mas no ni lo le les nos este esta estos estas ese esa eso aquel todo
toda todos todas hay ha han he sino pero cuando donde porque si ya tambien entre sobre desde
hasta segun e ustedes nosotros senor dios'''.split())

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
    mods = json.loads(subprocess.run(
        ['node', '-e', "console.log(JSON.stringify(require('./fuente/matutina.js').MAT_CONT_MODULOS))"],
        cwd=RAIZ, capture_output=True, text=True).stdout)
    caps = json.loads(subprocess.run(
        ['node', '-e', "console.log(JSON.stringify(require('./fuente/matutina.js').MAT_CAPS))"],
        cwd=RAIZ, capture_output=True, text=True).stdout)
    porDia = {}
    for c in caps:
        m = re.match(r'^(\d+)', str(c.get('label', '')))
        if m:
            porDia[int(m.group(1))] = c['id']

    html = ''.join(s['h'] for s in mods.get('mm-versiculos', []))
    filas = re.findall(r'<tr>(.*?)</tr>', html, re.S)
    nuevas, sin = [], []
    for f in filas:
        celdas = [re.sub(r'<[^>]+>', '', c).replace('&nbsp;', ' ').strip()
                  for c in re.findall(r'<t[dh][^>]*>(.*?)</t[dh]>', f, re.S)]
        if len(celdas) < 3:
            continue
        dia_txt, ref, texto = celdas[0], celdas[1], celdas[2]
        m = re.match(r'^(\d+)', dia_txt)
        if not m or not texto or len(texto) < 28:
            continue
        dia = int(m.group(1))
        cap = porDia.get(dia)
        if not cap:
            sin.append(dia); continue
        ks = claves(texto, 2 if len(texto) >= 80 else 1)
        if not ks:
            continue
        partes, resto = [], texto
        for w in sorted(ks, key=lambda w: resto.find(w)):
            i = resto.find(w)
            if i < 0: continue
            partes.append({'x': resto[:i]}); partes.append({'b': w, 'h': '¿?'})
            resto = resto[i + len(w):]
        partes.append({'x': resto})
        if not any('b' in p for p in partes):
            continue
        nuevas.append(dict(cap=cap, t='fill',
                           ins='%s — Completa el versículo del día %d:' % (ref, dia),
                           p=partes))

    J = lambda o: json.dumps(o, ensure_ascii=False)
    cuerpo = []
    for q in nuevas:
        pp = ','.join('{' + ','.join('%s:%s' % (k, J(x)) for k, x in p.items()) + '}' for p in q['p'])
        cuerpo.append('  {cap:%s,t:"fill",ins:%s,\n   p:[%s]},' % (J(q['cap']), J(q['ins']), pp))

    js = ('''/* matutina-completar.js — NO EDITAR A MANO.
   Lo escribe tools/creencias/gen_matutina.py.

   POR QUE EXISTE
   La matutina no tenia ni una pregunta de completar, y por eso solo se le
   ofrecian cinco de los nueve modos de practicar: «Completar», «Caza el
   error» y «¿De donde es?» salen todos de ahi. El examen real tambien trae
   su seccion de completar.

   El texto sale del modulo «Los 31 versiculos con su referencia», que ya
   estaba publicado en la app. No se trae texto de ninguna otra parte. */

const MAT_COMPLETAR = [
''' + '\n'.join(cuerpo) + '''
];

if (typeof module !== "undefined") module.exports = { MAT_COMPLETAR };
''')
    open(SALIDA, 'w', encoding='utf-8').write(js)
    print('preguntas de completar para la matutina:', len(nuevas),
          '| dias distintos:', len({q['cap'] for q in nuevas}))
    if sin: print('dias sin capitulo:', sin)
    largas = [i+1 for i, l in enumerate(js.split('\n')) if len(l) > 2000]
    print('lineas >2000:', largas[:3] or 'ninguna')

if __name__ == '__main__':
    main()
