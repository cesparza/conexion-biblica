# -*- coding: utf-8 -*-
"""Genera fuente/creencias.js completo: 28 creencias con cinco pestañas,
banco real, tarjetas y modulos. NO EDITAR creencias.js A MANO."""
import os, re, sys, json, unicodedata, collections
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import datos, editorial, refs

RAIZ = os.path.expanduser('~/mnt/Iglesia/projects/conexion-biblica')
SALIDA = os.path.join(RAIZ, 'fuente', 'creencias.js')

COLORES = ['#1F3864','#2E8BC0','#1A7A1A','#B8860B','#C0392B','#7C3AED','#0E7490']
D_ID  = {n: 'dt%d' % n for n in range(1, 7)}
def doc_de(num):
    for n, nom, a, b, _ in datos.DOCTRINAS:
        if a <= num <= b: return n
def doc_nom(num): return dict((n, nom) for n, nom, a, b, _ in datos.DOCTRINAS)[doc_de(num)]

J = lambda o: json.dumps(o, ensure_ascii=False)
hi = lambda t: '<div class="highlight-box">%s</div>' % t
wa = lambda t: '<div class="warn-box">%s</div>' % t
vs = lambda t: '<div class="verse-box">%s</div>' % t
li = lambda a: '<ul class="tight">%s</ul>' % ''.join('<li>%s</li>' % x for x in a)

def rev(preg, resp):
    """Bloque que se revela al tocar: primero la pregunta, la respuesta tapada.
       Leer no fija; tratar de responder si."""
    return ('<div class="rev"><button type="button" class="rev-q" onclick="revela(this)">'
            '<span class="rev-t">%s</span><span class="rev-p">tocar para ver</span></button>'
            '<div class="rev-a" hidden>%s</div></div>' % (preg, resp))

# ── pestañas ────────────────────────────────────────────────────────────────
def pestanas(num):
    d, e = datos.CREENCIAS[num], editorial.ED[num]
    t = []
    # 1. la declaracion
    if d['decl']:
        h = hi('<strong>Creencia %d — %s</strong><br>«%s»<br>'
               '<small>Cartilla <i>En esto creemos</i>, Unión Colombiana del Sur, 2026. '
               'Es la redacción que se evalúa: se transcribe tal cual.</small>' % (num, d['nombre'], d['decl']))
    else:
        h = wa('<strong>Creencia %d — %s</strong><br>La cartilla 2026 imprime aquí, por error, '
               'el texto de la creencia 13. No se transcribe una declaración equivocada: '
               'quedaría memorizando lo que no es. Pendiente de confirmar contra el impreso.' % (num, d['nombre']))
    t.append(('📜 La declaración', h))
    # 2. textos clave — ahora con el versiculo detras de cada referencia
    tramos = refs.parsea(d['textos'])
    partes = [x.strip() for x in d['textos'].rstrip('.').split(';') if x.strip()]
    h = vs('<strong>Los textos que trae la cartilla, en su orden</strong>'
           + li(['<b>%d.</b> %s%s' % (i+1, p, ' &nbsp;<small>← el primero</small>' if i == 0 else '')
                 for i, p in enumerate(partes)]))
    h += hi('<strong>Están tocables</strong><br>Toca cualquier referencia de esta pantalla y sale '
            'el versículo. Son %d capítulos de %d libros, en Reina Valera Antigua.'
            % (len({(s,c) for s,c,_ in tramos}), len({s for s,_,_ in tramos})))
    h += rev('¿Cuál es el PRIMER texto clave de esta creencia?', partes[0])
    h += rev('¿Cuántas referencias trae la cartilla aquí?', '<b>%d</b>' % len(partes))
    t.append(('📖 Textos clave', h))
    # 3. que significa — todo en bloques que se revelan
    h = hi('<strong>Cómo lo desarrolla el libro de las 28 creencias</strong>' + li(e['desarrollo']))
    h += ''.join(rev(p, r) for p, r in e['clave'])
    t.append(('🔍 Qué significa', h))
    # 4. no confundir
    h = ''.join(rev('¿En qué se diferencia de la creencia <b>%d</b>, «%s»?' % (o, datos.CREENCIAS[o]['nombre']), txt)
                for o, txt in e['confunde'])
    t.append(('⚠️ No confundir', h))
    # 5. donde encaja
    dn = doc_de(num); nom = doc_nom(num)
    rango = [(a, b) for n2, _, a, b, _ in datos.DOCTRINAS if n2 == dn][0]
    hermanas = ['<b>%d.</b> %s' % (k, datos.CREENCIAS[k]['nombre']) for k in range(rango[0], rango[1] + 1)]
    h = hi('<strong>Doctrina %d de 6: %s</strong><br>Son %d creencias, de la %d a la %d.%s'
           % (dn, nom, rango[1]-rango[0]+1, rango[0], rango[1], li(hermanas)))
    h += rev('¿A qué doctrina pertenece esta creencia?', '%s, la número <b>%d</b> de seis' % (nom, dn))
    h += rev('¿Cuántas creencias tiene esa doctrina?', '<b>%d</b> (de la %d a la %d)' % (rango[1]-rango[0]+1, rango[0], rango[1]))
    h += wa('<strong>El conteo de siempre</strong><br>28 creencias repartidas en 6 doctrinas: '
            '<b>5 · 2 · 3 · 8 · 5 · 5</b>.')
    t.append(('🧭 Dónde encaja', h))
    return t

# ── banco ───────────────────────────────────────────────────────────────────
VACIAS = set('''el la los las un una unos unas de del al a y o u que se su sus es son ser fue
era con por para en como mas más no ni lo le les nos nuestro nuestra nuestros nuestras este esta
estos estas ese esa eso aquel todo toda todos todas hay ha han he sino pero cuando donde porque
si ya tambien también entre sobre desde hasta segun según e'''.split())

def palabras_clave(frase, cuantas=3):
    """Elige las palabras con mas contenido para tapar en un completar."""
    out = []
    for w in re.findall(r'[A-Za-zÁÉÍÓÚÑáéíóúñü]{5,}', frase):
        base = unicodedata.normalize('NFD', w.lower())
        base = ''.join(c for c in base if unicodedata.category(c) != 'Mn')
        if base in VACIAS or w in out: continue
        out.append(w)
    out.sort(key=len, reverse=True)
    return out[:cuantas]

def primera_frase(txt):
    m = re.match(r'^(.{40,190}?[.»])\s', txt + ' ')
    return m.group(1) if m else txt[:170]

def frases_para_completar(txt):
    """Dos tramos distintos de la declaracion: el arranque y uno de mas
    adelante. Sacar las dos de la misma frase seria preguntar dos veces lo
    mismo con otro hueco."""
    partes = [f.strip() for f in re.split(r'(?<=[.»])\s+', txt) if 45 < len(f.strip()) < 200]
    if not partes:
        return [('primera frase de la declaración', primera_frase(txt))]
    out = [('primera frase de la declaración', partes[0])]
    if len(partes) >= 2:
        # la mas larga de las siguientes: la que mas datos trae
        resto = max(partes[1:], key=len)
        out.append(('otro tramo de la declaración', resto))
    return out

def preguntas(num):
    d, e = datos.CREENCIAS[num], editorial.ED[num]
    nom = d['nombre']
    otras = [datos.CREENCIAS[k]['nombre'] for k in range(1, 29)
             if k != num and doc_de(k) == doc_de(num)][:3]
    while len(otras) < 3:
        for k in range(1, 29):
            if datos.CREENCIAS[k]['nombre'] not in otras + [nom]:
                otras.append(datos.CREENCIAS[k]['nombre'])
                if len(otras) == 3: break
    partes = [x.strip() for x in d['textos'].rstrip('.').split(';') if x.strip()]
    prim_otros = []
    for k in range(1, 29):
        if k == num: continue
        p = [x.strip() for x in datos.CREENCIAS[k]['textos'].rstrip('.').split(';') if x.strip()]
        if p and p[0] not in prim_otros + [partes[0]]: prim_otros.append(p[0])
        if len(prim_otros) == 3: break
    Q = []
    cid = 'cr%02d' % num
    Q.append(dict(cap=cid, t='mc', nv=1, q='¿Cuál es la creencia número %d?' % num,
                  o=[nom] + otras, a=0))
    Q.append(dict(cap=cid, t='mc', nv=2,
                  q='¿Cuál de estos es el primer texto clave de la creencia «%s»?' % nom,
                  o=[partes[0]] + prim_otros, a=0))
    Q.append(dict(cap=cid, t='mc', nv=1,
                  q='¿Cuántas referencias bíblicas trae la cartilla para «%s»?' % nom,
                  o=[str(len(partes))] + [str(x) for x in (len(partes)+2, max(2,len(partes)-2), len(partes)+5)], a=0))
    if d['decl']:
        # reconocer la redaccion, empezando DESPUES del titulo para no delatarla
        # La cita no puede llevar dentro el titulo de la creencia, o la pregunta
        # se contesta sola. Se corta el arranque hasta pasar la ultima aparicion
        # del titulo dentro de los primeros 60 caracteres, que es lo que la
        # prueba mira y lo que el ojo alcanza a leer de un vistazo.
        def _pl(t):
            t = unicodedata.normalize('NFD', t.lower())
            return ''.join(c for c in t if unicodedata.category(c) != 'Mn')
        frag = d['decl']
        titulo = _pl(nom)[:14]
        for _ in range(4):
            i = _pl(frag)[:60].find(titulo)
            if i < 0:
                break
            corte = frag.find(' ', i + len(titulo))
            frag = '...' + frag[corte + 1:] if corte > 0 else frag
        Q.append(dict(cap=cid, t='mc', nv=2,
                      q='¿A qué creencia corresponde esta declaración? «%s...»' % frag[:185].rstrip(' .,'),
                      o=[nom] + otras, a=0))
        # ── completar: DOS por creencia, de dos tramos distintos ──
        # Una sola por creencia dejaba el examen de texto literal con 27
        # preguntas para 28 creencias, y es justo lo que «En esto creemos»
        # pregunta palabra por palabra. La segunda sale de una frase mas
        # adelante, no de la misma, o serian la misma pregunta dos veces.
        for etiqueta, fr in frases_para_completar(d['decl']):
            claves = palabras_clave(fr)
            if len(claves) < 2:
                continue
            p, resto = [], fr
            for w in sorted(claves, key=lambda w: resto.find(w))[:3]:
                i = resto.find(w)
                if i < 0: continue
                p.append({'x': resto[:i]}); p.append({'b': w, 'h': '¿?'}); resto = resto[i+len(w):]
            p.append({'x': resto})
            if sum(1 for x in p if 'b' in x) < 2:
                continue
            Q.append(dict(cap=cid, t='fill',
                          ins='Creencia %d, %s — Completa:' % (num, etiqueta), p=p))
    # ── verdadero/falso: UNA verdadera y UNA falsa ──
    # Si todas fueran verdaderas, contestar siempre «Verdadero» daria el 100%
    # y la pregunta dejaria de medir nada. Paso exactamente eso: las 56 de las
    # creencias salieron todas verdaderas.
    #
    # La falsa NO se fabrica negando la frase (eso produce enunciados raros que
    # se descartan solos): se le pone a esta creencia un dato que es de OTRA.
    # Asi la pregunta mide lo que de verdad cuesta, que es distinguir entre dos
    # creencias vecinas, y la explicacion puede decir de cual era.
    if e['clave']:
        preg, resp = e['clave'][0]
        limpio = re.sub(r'<[^>]+>', '', resp)
        Q.append(dict(cap=cid, t='tf',
                      q='Sobre «%s»: %s' % (nom, limpio[:150].rstrip(' .')) + '.',
                      a=True, e='Correcto. ' + limpio))
    ajena = (num % 28) + 1
    while ajena == num or not editorial.ED[ajena]['clave']:
        ajena = (ajena % 28) + 1
    respAjena = re.sub(r'<[^>]+>', '', editorial.ED[ajena]['clave'][0][1])
    Q.append(dict(cap=cid, t='tf',
                  q='Sobre «%s»: %s' % (nom, respAjena[:150].rstrip(' .')) + '.',
                  a=False,
                  e='Falso. Eso es de la creencia %d, «%s». Ojo con confundirlas.'
                    % (ajena, datos.CREENCIAS[ajena]['nombre'])))
    return Q

def main():
    # ── CR_CAPS ──
    caps = []
    for n in range(1, 29):
        d = datos.CREENCIAS[n]
        caps.append("  { id:'cr%02d', label:'Creencia %d', sub:%s, src:'En esto creemos', "
                    "color:'%s', doc:'%s', cats:['ec1','ec2'] }"
                    % (n, n, J(d['nombre']), COLORES[(n-1) % len(COLORES)], D_ID[doc_de(n)]))
    # ── contenido ──
    cont = []
    for n in range(1, 29):
        tabs = ',\n    '.join('{ t:%s, h:%s }' % (J(a), J(b)) for a, b in pestanas(n))
        cont.append('  cr%02d: [%s],' % (n, tabs))
    # ── banco ──
    banco = []
    for n in range(1, 29):
        for q in preguntas(n):
            c = ['cap:%s' % J(q['cap']), 't:%s' % J(q['t'])]
            if 'nv' in q: c.append('nv:%d' % q['nv'])
            if q['t'] == 'fill':
                c.append('ins:%s' % J(q['ins']))
                c.append('\n   p:[' + ','.join('{' + ','.join('%s:%s' % (k, J(v)) for k, v in x.items()) + '}'
                                               for x in q['p']) + ']')
            else:
                c.append('q:%s' % J(q['q']))
                if q['t'] == 'mc':
                    c.append('\n   o:%s' % J(q['o'])); c.append('a:%d' % q['a'])
                else:
                    # El valor REAL, no un true fijo. Estaba clavado en true y por
                    # eso las 56 de verdadero/falso salian todas verdaderas: quien
                    # contestara siempre «Verdadero» acertaba el 100%.
                    c.append('a:%s' % ('true' if q['a'] else 'false'))
                    c.append('\n   e:%s' % J(q['e']))
        	    
            banco.append('  {' + ','.join(c) + '},')
    # ── tarjetas ──
    tj = []
    for n in range(1, 29):
        d, e = datos.CREENCIAS[n], editorial.ED[n]
        nom = d['nombre']
        partes = [x.strip() for x in d['textos'].rstrip('.').split(';') if x.strip()]
        tj.append((  'cr%02d'%n, 'Creencia <b>%d</b>' % n, nom))
        tj.append((  'cr%02d'%n, '<b>%s</b> — ¿qué número es?' % nom, 'La creencia <b>%d</b>' % n))
        tj.append((  'cr%02d'%n, '<b>%s</b> — ¿a qué doctrina pertenece?' % nom,
                     '%s (doctrina <b>%d</b> de 6)' % (doc_nom(n), doc_de(n))))
        tj.append((  'cr%02d'%n, '<b>%s</b> — primer texto clave' % nom, partes[0]))
        for preg, resp in e['clave'][:2]:
            tj.append(('cr%02d'%n, '<b>%d.</b> %s' % (n, preg), resp))
    tarjetas = ['  {cap:%s, f:%s, r:%s},' % (J(c), J(f), J(r)) for c, f, r in tj]

    cab = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'cabecera.txt'),
               encoding='utf-8').read()
    js = (cab
          + 'const CR_CAPS = [\n' + ',\n'.join(caps) + ',\n];\n\n'
          + 'const CR_CONTENIDO = {\n' + '\n'.join(cont) + '\n};\n\n'
          + 'const CR_BANCO_FIJO = [\n' + '\n'.join(banco) + '\n];\n\n'
          + open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'derivadas.txt'),
                 encoding='utf-8').read()
          + '\nconst CR_TARJETAS = [\n' + '\n'.join(tarjetas) + '\n];\n\n'
          + open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'modulos.txt'),
                 encoding='utf-8').read()
          + '\nmodule.exports = { DOCTRINAS, doctrinaDe, CR_CAPS, CR_CONTENIDO, CR_BANCO,'
          + ' CR_TARJETAS, CR_MODULOS, CR_CONT_MODULOS };\n')
    open(SALIDA, 'w', encoding='utf-8').write(js)
    largas = [(i+1, len(l)) for i, l in enumerate(js.split('\n')) if len(l) > 2000]
    print('creencias.js escrito |', len(banco), 'preguntas fijas |', len(tarjetas), 'tarjetas')
    print('lineas >2000:', largas[:4] or 'ninguna')

if __name__ == '__main__':
    main()
