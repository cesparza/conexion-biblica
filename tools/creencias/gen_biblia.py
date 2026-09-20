# -*- coding: utf-8 -*-
"""Genera los archivos fuente rv1909-*.txt que piden las 28 creencias.

DE DONDE SALE EL TEXTO
De files/_biblia-libre-raw.txt (Biblia Libre, Reina Valera Antigua, licencia
libre). Se comprobo contra los 21 archivos que ya existian: 95 de 107
versiculos identicos, y los 12 restantes difieren solo en tipografia (la
versalita con que la Reina Valera Antigua abre capitulo, un espacio antes de
un parentesis).

POR ESO LOS ARCHIVOS QUE YA EXISTEN NO SE TOCAN
Si un versiculo ya estaba, se conserva tal cual. Solo se AGREGAN los que
faltan. Asi tools/citas.js sigue pasando y el material de Daniel no cambia
por un trabajo que era de las creencias.
"""
import os, re, sys, collections
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import datos, refs

# La ruta sale del propio archivo. Estaba quemada a `~/mnt/Iglesia/...`, que
# era donde el puente montaba la carpeta en su momento: el dia que el montaje
# cambio, el generador dejo de escribir y fallo con un FileNotFoundError que
# no dice nada de lo que de verdad pasa. Tampoco corria en el Mac, donde la
# carpeta vive en otro sitio.
RAIZ = os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..'))
FILES = os.path.normpath(os.path.join(RAIZ, '..', 'files'))
RAW = os.path.join(FILES, '_biblia-libre-raw.txt')

def carga_biblia():
    campos = open(RAW, encoding='utf-8', errors='replace').read().split('+')
    B = {}
    i = 0
    while i + 3 < len(campos):
        try:
            l, c, v = int(campos[i]), int(campos[i+1]), int(campos[i+2])
        except ValueError:
            i += 1; continue
        B.setdefault((l, c), {})[v] = campos[i+3]
        i += 4
    return B

def normaliza_inicial(txt, ver):
    """La Reina Valera Antigua abre cada capitulo con la primera palabra en
    versalita («EN su tiempo»). Los archivos que ya estaban en el repo la
    traen normal, asi que se hace lo mismo para que todo se vea igual."""
    if ver != 1:
        return txt
    m = re.match(r'^([A-ZÁÉÍÓÚÑ]{2,})(?=[a-záéíóúñ ])', txt)
    if m:
        p = m.group(1)
        return p[0] + p[1:].lower() + txt[len(p):]
    return txt

def main():
    B = carga_biblia()
    # que versiculos pide cada capitulo
    pide = collections.defaultdict(set)
    for n, d in datos.CREENCIAS.items():
        for slug, cap, vs in refs.parsea(d['textos']):
            # Daniel NO: su texto vive en fuente/biblia.js, en RV1995, que es la
            # version del concurso. Meterlo tambien aqui en RV1909 seria el mismo
            # concepto resuelto por dos mecanismos, y ademas con dos redacciones
            # distintas del mismo versiculo.
            if slug == 'daniel':
                continue
            clave = (slug, cap)
            reales = B.get((refs.NUM[slug], cap))
            if not reales:
                print('  ! capitulo inexistente:', slug, cap); continue
            if vs is None:
                pide[clave] |= set(reales)
            else:
                pide[clave] |= {v for v in vs if v in reales}

    nuevos = cambiados = intactos = 0
    for (slug, cap), vs in sorted(pide.items()):
        ruta = os.path.join(FILES, f'rv1909-{slug}-{cap}.txt')
        previo = {}
        if os.path.exists(ruta):
            for linea in open(ruta, encoding='utf-8'):
                if '|' in linea:
                    k, t = linea.rstrip('\n').split('|', 1)
                    previo[int(k)] = t
        final = dict(previo)
        for v in vs:
            if v not in final:                      # lo que ya estaba NO se toca
                final[v] = normaliza_inicial(B[(refs.NUM[slug], cap)][v], v)
        if final == previo:
            intactos += 1; continue
        if previo: cambiados += 1
        else: nuevos += 1
        with open(ruta, 'w', encoding='utf-8') as f:
            for v in sorted(final):
                f.write(f'{v}|{final[v]}\n')
    print(f'archivos nuevos: {nuevos} | ampliados: {cambiados} | sin cambio: {intactos}')
    print('capitulos totales con fuente:', len(pide))
    print('versiculos pedidos:', sum(len(v) for v in pide.values()))

if __name__ == '__main__':
    main()
