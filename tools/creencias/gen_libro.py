# -*- coding: utf-8 -*-
"""Saca de files/creencias-28.pdf el esqueleto real de cada capitulo:
titulo, paginas y los subtitulos con que el libro desarrolla la creencia.
Escribe tools/creencias/libro.py, que gen_creencias.py lee.

POR QUE ESTO Y NO UN RESUMEN ESCRITO A MANO
El material de las creencias sale de la cartilla (datos.py) y de la guia de
estudio (editorial.py). El libro de 434 paginas nunca entro: se citaba de
oidas. Un resumen escrito a mano seria una lectura mia, no el libro. Los
subtitulos SI son el libro: son lo que el autor escribio para ordenar el
capitulo, se extraen mecanicamente y tools/libro.js los vuelve a comprobar
contra el PDF. Por eso la seccion que salga de aqui va marcada «contexto»:
ayuda a ubicar, y no entra al examen del reglamento.

COMO SE UBICA CADA CAPITULO
El indice del libro (paginas 2 y 3 del PDF) da «Capitulo N  Titulo ... pag».
Y el numero impreso de cada pagina aparece en el encabezado, de dos formas
segun sea par o impar. Medido: el indice de pagina del texto es el numero
impreso + 1 en 229 de las 230 paginas donde el numero se pudo leer, asi que
la correspondencia se toma de ahi y no se adivina.

Uso:  python3 tools/creencias/gen_libro.py
"""
import os, re, io, subprocess, sys, json

AQUI = os.path.dirname(os.path.abspath(__file__))
RAIZ = os.path.normpath(os.path.join(AQUI, '..', '..'))
FILES = os.path.normpath(os.path.join(RAIZ, '..', '..', 'files'))
PDF = os.path.join(FILES, 'creencias-28.pdf')
CACHE = os.path.join(FILES, '_creencias-28-layout.txt')
SALIDA = os.path.join(AQUI, 'libro.py')

# La OCR parte algunas palabras con un espacio detras de la mayuscula
# («las E scrituras»). Se corrige solo con esta lista corta y explicita: una
# regla general («mayuscula + espacio + minusculas → pegar») romperia
# «A quien», «Y despues», y no hay como saberlo sin diccionario.
OCR = [('E scrituras', 'Escrituras'), ('S antuario', 'Santuario'),
       ('S eñor', 'Señor'), ('E spiritu', 'Espiritu'), ('E spíritu', 'Espíritu'),
       ('I glesia', 'Iglesia'), ('C risto', 'Cristo'), ('D ios', 'Dios'),
       ('fam ilia', 'familia'), ('m inisterio', 'ministerio'),
       # La ligadura «fi» sale como «ñ» en varias paginas.
       ('signiñcado', 'significado'), ('salvifico', 'salvífico'),
       ('Signiñcado', 'Significado'), ('sacriñcio', 'sacrificio')]

# La capitular del comienzo de un subtitulo sale a veces partida y en
# minuscula: «l a autoridad de las Escrituras». Solo se toca el arranque de
# la linea, y solo cuando es UNA letra suelta seguida de una palabra: en
# medio del texto «l a» no existe, asi que no hay nada mas que pueda pegar.
# Dos formas de lo mismo: «l a autoridad» (la capitular se separo de su
# propia palabra) y «l os dones» (se separo del resto). En el cuerpo del
# libro una linea nunca empieza con una letra suelta, asi que esto no
# toca texto bueno.
INICIAL2 = re.compile(r'^([a-záéíóúñ])\s([a-záéíóúñ])\s(?=[a-záéíóúñ])')
INICIAL = re.compile(r'^([a-záéíóúñ])\s(?=[a-záéíóúñ]{2,})')

def limpia(l):
    for a, b in OCR: l = l.replace(a, b)
    l = re.sub(r'\s{2,}', ' ', l).strip()
    l = INICIAL2.sub(lambda m: m.group(1).upper() + m.group(2) + ' ', l)
    return INICIAL.sub(lambda m: m.group(1).upper(), l)

def texto():
    if not os.path.exists(CACHE):
        subprocess.run(['pdftotext', '-layout', PDF, CACHE], check=True)
    return io.open(CACHE, encoding='utf-8').read()

def indice(t):
    """Las 28 filas del indice: numero, titulo y pagina donde arranca."""
    out = {}
    # El «Capitulo» del 19 salio de la OCR como «( ,'apitulo 19»: el patron
    # no puede exigir la palabra entera o ese capitulo se pierde en silencio.
    for m in re.finditer(r'ap[ií]tulo\s+(\d{1,2})\s+(.+?)\.{3,}\s*(\d{1,3})', t):
        n = int(m.group(1))
        if 1 <= n <= 28 and n not in out:
            out[n] = (limpia(m.group(2)), int(m.group(3)))
    return out

def paginas(t):
    """Indice de pagina del texto -> numero impreso, donde se pudo leer."""
    mapa = {}
    for i, p in enumerate(t.split('\f')):
        ls = [l for l in p.split('\n') if l.strip()]
        for l in ls[:2] + ls[-2:]:
            m = re.search(r'[•·]\s*(\d{1,3})\s*$', l) or re.match(r'^\s*(\d{1,3})\s*[.,]\s*[LI1]', l)
            if m:
                mapa[i] = int(m.group(1)); break
    return mapa

def desfase(mapa):
    """El desfase que mas se repite, no el primero que aparezca."""
    cuenta = {}
    for i, n in mapa.items(): cuenta[i - n] = cuenta.get(i - n, 0) + 1
    d = max(cuenta, key=cuenta.get)
    return d, cuenta[d], len(mapa)

# Un subtitulo del libro: empieza en la columna 0, arranca en mayuscula, no
# termina en punto, no es el encabezado en versalitas de la pagina par, y no
# es una linea de texto corrido partida (por eso el tope de largo).
ENCABEZADO = re.compile(r'ADVENTISTAS DEL S|CREEN EN', re.I)
def subtitulos(bloque):
    out = []
    for l in bloque.split('\n'):
        if l[:1] in ('', ' ', '\t'): continue
        s = limpia(l)
        if not (8 <= len(s) <= 62): continue
        if s.endswith(('.', ',', ':', ';', '-', '­')): continue
        if ENCABEZADO.search(s): continue
        if not re.match(r'^[A-ZÁÉÍÓÚÑ¿“«]', s): continue
        if s.isupper(): continue
        if re.search(r'\d{1,3}\s*$', s): continue
        if s.count(' ') > 9: continue
        if s in out: continue
        # «Referencias» son las notas al final del capitulo: ahi se acaba el
        # cuerpo. Sin este corte, al capitulo 28 se le colaban las entradas
        # del indice alfabetico del final del libro.
        if s.lower().startswith('referencia'): break
        out.append(s)
    return out

def main():
    t = texto()
    ind = indice(t)
    if len(ind) != 28:
        print('AVISO: el indice dio %d capitulos, no 28: %s' % (len(ind), sorted(ind)))
    mapa = paginas(t)
    d, cuantas, total = desfase(mapa)
    print('desfase pagina impresa -> pagina del texto: %+d (%d de %d paginas)' % (d, cuantas, total))
    pags = t.split('\f')
    cap = {}
    for n in sorted(ind):
        titulo, p0 = ind[n]
        p1 = ind[n + 1][1] if (n + 1) in ind else p0 + 20
        i0, i1 = p0 + d, min(len(pags), p1 + d)
        bloque = '\n'.join(pags[i0:i1])
        cap[n] = dict(titulo=titulo, pag=p0, hasta=p1 - 1, subtitulos=subtitulos(bloque))
    with io.open(SALIDA, 'w', encoding='utf-8') as f:
        f.write('# -*- coding: utf-8 -*-\n')
        f.write('"""GENERADO por tools/creencias/gen_libro.py desde files/creencias-28.pdf.\n'
                'No editar a mano: se reescribe entero."""\n')
        f.write('LIBRO = ' + json.dumps(cap, ensure_ascii=False, indent=1) + '\n')
    print('libro.py escrito |', len(cap), 'capitulos |',
          sum(len(c['subtitulos']) for c in cap.values()), 'subtitulos')

if __name__ == '__main__':
    main()
