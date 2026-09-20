# -*- coding: utf-8 -*-
"""Mas preguntas para la matutina, derivadas de sus propios modulos.

EL HUECO
La matutina tenia 159 preguntas para 31 dias: cinco por dia, contra 46 por
capitulo en Daniel. Era la actividad mas floja del banco, y el examen no la
califica mas suave por ser corta.

DE DONDE SALEN
De los dos modulos que ya estan publicados en la app:
  - «Los 31 versiculos con su referencia» -> dia, referencia y texto
  - «Heroes y villanos, quien es quien» -> dia, titulo y quien es
No se inventa contenido: se cruzan los datos que ya estaban en tablas y se
convierten en las preguntas que el examen de la matutina hace de verdad
(que dia es tal versiculo, de quien es tal dia, cual es la referencia).
"""
import os, re, sys, json, subprocess, unicodedata

# La ruta sale del propio archivo. Estaba quemada a `~/mnt/Iglesia/...`, que
# era donde el puente montaba la carpeta en su momento: el dia que el montaje
# cambio, el generador dejo de escribir y fallo con un FileNotFoundError que
# no dice nada de lo que de verdad pasa. Tampoco corria en el Mac, donde la
# carpeta vive en otro sitio.
RAIZ = os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..'))
SALIDA = os.path.join(RAIZ, 'fuente', 'matutina-extra.js')

def nodo(expr):
    return json.loads(subprocess.run(
        ['node', '-e', 'console.log(JSON.stringify(%s))' % expr],
        cwd=RAIZ, capture_output=True, text=True).stdout)

def limpia(h):
    return re.sub(r'<[^>]+>', '', h).replace('&nbsp;', ' ').strip()

def tabla(mods, clave):
    filas = []
    for s in mods.get(clave, []):
        for tr in re.findall(r'<tr>(.*?)</tr>', s['h'], re.S):
            cel = [limpia(c) for c in re.findall(r'<t[dh][^>]*>(.*?)</t[dh]>', tr, re.S)]
            if len(cel) >= 3 and re.match(r'^\d', cel[0]):
                filas.append(cel)
    return filas

def main():
    mods = nodo("require('./fuente/matutina.js').MAT_CONT_MODULOS")
    caps = nodo("require('./fuente/matutina.js').MAT_CAPS")
    porDia = {}
    for c in caps:
        m = re.match(r'^(\d+)', str(c.get('label', '')))
        if m: porDia[int(m.group(1))] = c

    vers = {}
    for d, ref, txt in [(int(re.match(r'^(\d+)', f[0]).group(1)), f[1], f[2])
                        for f in tabla(mods, 'mm-versiculos')]:
        vers[d] = (ref, txt)
    quien = {}
    for f in tabla(mods, 'mm-quien'):
        d = int(re.match(r'^(\d+)', f[0]).group(1))
        quien[d] = (f[1], f[2])

    Q = []
    dias = sorted(set(vers) | set(quien))

    def otros(valor, pool, n=3):
        out = []
        for v in pool:
            if v != valor and v not in out:
                out.append(v)
            if len(out) == n: break
        return out

    for d in dias:
        cap = porDia.get(d)
        if not cap: continue
        cid = cap['id']
        # 1. referencia del versiculo del dia
        if d in vers:
            ref, txt = vers[d]
            pool = [vers[x][0] for x in dias if x in vers and vers[x][0] != ref]
            o = otros(ref, pool)
            if len(o) == 3:
                Q.append(dict(cap=cid, t='mc', nv=1,
                              q='¿Cuál es la referencia del versículo del día %d de octubre?' % d,
                              o=[ref] + o, a=0))
            # 2. de que dia es este versiculo
            pool2 = [str(x) + ' de octubre' for x in dias if x != d]
            o2 = otros('', pool2)
            if len(o2) == 3 and len(txt) > 30:
                Q.append(dict(cap=cid, t='mc', nv=2,
                              q='¿De qué día es este versículo? «%s»' % txt[:150].rstrip(' .,'),
                              o=[('1.º' if d == 1 else str(d)) + ' de octubre'] + o2, a=0))
        # 3. quien es el del dia
        if d in quien:
            titulo, qui = quien[d]
            pool3 = [quien[x][1] for x in dias if x in quien and quien[x][1] != qui]
            o3 = otros(qui, pool3)
            if len(o3) == 3:
                Q.append(dict(cap=cid, t='mc', nv=1,
                              q='En «%s» (día %d), ¿quién es?' % (titulo, d),
                              o=[qui] + o3, a=0))
            # 4. verdadero o falso sobre heroe/villano, solo donde la tabla lo dice
            m = re.match(r'^(Héroe|Heroína|Villano|Villana)s?:', qui)
            if m:
                esVillano = m.group(1).startswith('Villan')
                Q.append(dict(cap=cid, t='tf',
                              q='El día %d de octubre, «%s», presenta a un VILLANO.' % (d, titulo),
                              a=esVillano,
                              e=('Correcto. ' if esVillano else 'Falso. ') + qui + '.'))

    J = lambda o: json.dumps(o, ensure_ascii=False)
    cuerpo = []
    for q in Q:
        c = ['cap:%s' % J(q['cap']), 't:%s' % J(q['t'])]
        if 'nv' in q: c.append('nv:%d' % q['nv'])
        c.append('q:%s' % J(q['q']))
        if q['t'] == 'mc':
            c.append('\n   o:%s' % J(q['o'])); c.append('a:0')
        else:
            c.append('a:%s' % ('true' if q['a'] else 'false'))
            c.append('\n   e:%s' % J(q['e']))
        cuerpo.append('  {' + ','.join(c) + '},')

    js = ('''/* matutina-extra.js — NO EDITAR A MANO.
   Lo escribe tools/creencias/gen_matutina2.py.

   POR QUE EXISTE
   La matutina tenia cinco preguntas por dia, contra cuarenta y seis por
   capitulo en Daniel. Era la actividad mas floja del banco y el examen no la
   califica mas suave por ser corta.

   Las preguntas se CRUZAN de dos tablas que ya estaban publicadas en la app
   (los 31 versiculos con su referencia, y quien es quien dia por dia). No se
   inventa contenido: se convierte en pregunta lo que ya estaba escrito. */

const MAT_EXTRA = [
''' + '\n'.join(cuerpo) + '''
];

if (typeof module !== "undefined") module.exports = { MAT_EXTRA };
''')
    open(SALIDA, 'w', encoding='utf-8').write(js)
    porTipo = {}
    for q in Q: porTipo[q['t']] = porTipo.get(q['t'], 0) + 1
    print('preguntas nuevas:', len(Q), porTipo, '| dias:', len({q['cap'] for q in Q}))
    largas = [i+1 for i, l in enumerate(js.split('\n')) if len(l) > 2000]
    print('lineas >2000:', largas[:3] or 'ninguna')

if __name__ == '__main__':
    main()
