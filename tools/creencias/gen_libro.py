# -*- coding: utf-8 -*-
"""Saca de files/creencias-28.pdf el esqueleto real de cada capitulo:
titulo, paginas y los subtitulos con que el libro desarrolla la creencia.
Escribe tools/creencias/libro.py, que gen_creencias.py lee.

POR QUE ESTO Y NO UN RESUMEN ESCRITO A MANO
El material de las creencias sale de la cartilla (datos.py) y de la guia de
estudio (editorial.py). El libro de 434 paginas nunca entro: se citaba de
oidas. Un resumen escrito a mano seria una lectura mia, no el libro. Los
subtitulos SI son el libro: son lo que el autor escribio para ordenar el
capitulo, se extraen mecanicamente y despues pasan por la revision contra
las paginas del PDF (ver «LA REVISION», abajo). Por eso la seccion que salga de aqui va marcada «contexto»:
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
# El PDF vive fuera del repositorio. Se busca donde ya lo buscan tools/citas.js
# y el verificador: CB_FILES, la carpeta de documentos, y la ruta de antes.
def carpeta_files():
    cand = [os.environ.get('CB_FILES'),
            os.path.expanduser('~/Documents/Iglesia/files'),
            os.path.normpath(os.path.join(RAIZ, '..', '..', 'files'))]
    for c in cand:
        if c and (os.path.exists(os.path.join(c, 'creencias-28.pdf'))
                  or os.path.exists(os.path.join(c, '_creencias-28-layout.txt'))):
            return c
    sys.exit('No encuentro creencias-28.pdf. Corre con CB_FILES=<carpeta files>.')
FILES = carpeta_files()
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

# ───────────── LA REVISION CONTRA LAS PAGINAS (10-oct-2026) ─────────────
# MECANISMO
# La regla de arriba adivina que es un subtitulo por la forma de la linea, y
# el texto que lee viene de una OCR. Las dos cosas fallan: 22 de los 133
# subtitulos salian mal (palabras partidas, «I as» por «Las», renglones de
# texto corrido, el rotulo de un grafico). Aqui queda escrito, uno por uno,
# lo que se corrigio despues de MIRAR cada subtitulo en la pagina del PDF:
# en el libro un subtitulo es un renglon suelto en negrita.
#
# POR QUE TRES TABLAS Y NO LA LISTA FINAL ESCRITA A MANO
# La lista final a mano dejaria de salir del libro. Asi la regla sigue
# extrayendo y cada excepcion se ve: que se quito, que se corrigio, que se
# agrego. Y si un dia la regla o el PDF cambian, una entrada que ya no
# encuentra su renglon DETIENE el generador en vez de quedar de adorno.
#
# Donde el PDF trae la pagina reescrita por la OCR (no la foto), el error
# esta en el propio PDF («I a autoridad»): ahi se corrigio la palabra, que es
# evidente, y no hay imagen contra la cual comprobarla.

# Renglones que la regla toma por subtitulo y no lo son.
NO_SON = {
    3: ['Yrehusar reconocerle como nuestro Padre?'],          # fin de un parrafo
    4: ['Daniel 9 49 años 62 semanas-434 años 7 años'],        # rotulos del grafico de las 70 semanas
    5: ['I)ios el Padre?'],                                    # fin de un parrafo
    7: ['R eferencias'],                                       # las notas del capitulo
    8: ['¿Cómo pudo el pecado originarse en un ambiente perfecto?',  # pregunta dentro del texto
        '“Y vosotros, ¿quién decís que soy yo?”'],             # cita dentro del texto
    18: ['JOSAFAT, REY DE JUDÁ, SE HALLABA MUY PREOCUPADO. Las tropas'],  # primer renglon del capitulo
    25: ['Jesús. ¿Cuándo va a volver?”'],                      # primer parrafo del capitulo
    26: ['¿con qué o quién se comunican los médiums espiritistas?'],     # pregunta dentro del texto
}
# Lo que la OCR escribio mal, subtitulo entero por subtitulo entero.
CORRIGE = {
    'El conocim iento de Dios': 'El conocimiento de Dios',
    'La dinám ica de la Deidad': 'La dinámica de la Deidad',
    'Dios el Padre en el Nuevo Testam ento': 'Dios el Padre en el Nuevo Testamento',
    'La encarnación: predicciones y cum plim iento': 'La encarnación: predicciones y cumplimiento',
    'I as dos naturalezas de Jesucristo': 'Las dos naturalezas de Jesucristo',
    'La base de nu estra aceptación an te Dios': 'La base de nuestra aceptación ante Dios',
    'La vida com ienza con la m uerte': 'La vida comienza con la muerte',
    'Señales del crecim ien to en Cristo': 'Señales del crecimiento en Cristo',
    'Signiñcad o b íb lico del térm in o “iglesia”': 'Significado bíblico del término “iglesia”',
    'La natu raleza de la iglesia': 'La naturaleza de la iglesia',
    'El rem anente': 'El remanente',
    'La misión del rem anente': 'La misión del remanente',
    'El don profètico en los tiempos bíblicos': 'El don profético en los tiempos bíblicos',
    'El don profètico en los últimos días': 'El don profético en los últimos días',
    'EI Santuario celestial en la profecía': 'El Santuario celestial en la profecía',
}
# Subtitulos del libro que la regla no ve: la linea no arranca en la primera
# columna, pasa del tope de largo o de espacios (la OCR parte las palabras),
# o termina en punto. (despues de cual va, o None si es el primero; el texto)
FALTAN = {
    14: [('La unidad de la Biblia y la iglesia', '¿Cuán importante es la unidad de la iglesia?'),
         ('¿Cuán importante es la unidad de la iglesia?', 'El logro de la unidad')],
    15: [(None, '¿Cuán importante es el bautismo?')],
    18: [('Los profetas postbíblicos y la Biblia',
          'El Espíritu de Profecía en la Iglesia Adventista del Séptimo Día')],
    23: [('Los hijos', 'La familia extendida')],
    28: [('Vida intelectual en la Tierra Nueva', 'No habrá más...')],
}

# Lo que delata una palabra rota por la OCR. Es una primera red y no lo ve
# todo: «cum plim iento» son tres trozos largos y pasa. Por eso la lista
# revisada queda ademas fija por su huella en tests/uso.js: si cambia un solo
# subtitulo, la suite falla hasta que alguien lo mire en el libro.
CORTAS = set('a al de del el en es la las lo los no o por que se su un una y ya e'.split())
def sospechoso(s):
    pal = re.findall(r'[A-Za-zÁÉÍÓÚÜÑáéíóúüñàèìòù]+', s)
    if any(len(w) <= 2 and w.lower() not in CORTAS for w in pal): return 'palabra suelta'
    if re.search(r'[àèìòù]', s): return 'tilde al reves'
    if re.search(r'ñ[bcdfghjklmnpqrstvwxyz]', s): return 'ñ donde va fi'
    if re.search(r'\d', s): return 'trae numeros'
    if not re.match(r'^[A-ZÁÉÍÓÚÑ¿¡“«]', s): return 'no empieza en mayuscula'
    if re.search(r'[a-záéíóúñ][A-ZÁÉÍÓÚÑ]|\)', s): return 'mayuscula o parentesis adentro'
    return ''

def revisa(cap):
    """Aplica las tres tablas. Devuelve la lista de problemas: vacia si todo cuadro."""
    mal = []
    usadas = set()
    for n, c in cap.items():
        subs = c['subtitulos']
        for x in NO_SON.get(n, []):
            if x in subs: subs.remove(x)
            else: mal.append('cap %d: NO_SON ya no encuentra «%s»' % (n, x))
        for i, x in enumerate(subs):
            if x in CORRIGE: subs[i] = CORRIGE[x]; usadas.add(x)
        for tras, nuevo in FALTAN.get(n, []):
            if nuevo in subs: mal.append('cap %d: FALTAN repite «%s», la regla ya lo trae' % (n, nuevo)); continue
            if tras is None: subs.insert(0, nuevo)
            elif tras in subs: subs.insert(subs.index(tras) + 1, nuevo)
            else: mal.append('cap %d: FALTAN no encuentra «%s» para poner despues «%s»' % (n, tras, nuevo))
        for x in subs:
            por = sospechoso(x)
            if por: mal.append('cap %d: «%s» (%s)' % (n, x, por))
    for x in CORRIGE:
        if x not in usadas: mal.append('CORRIGE ya no encuentra «%s»' % x)
    return mal

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
    mal = revisa(cap)
    if mal:
        print('NO SE ESCRIBE libro.py. Hay que mirar la pagina del PDF y ajustar las tablas:')
        for m in mal: print('  -', m)
        sys.exit(1)
    with io.open(SALIDA, 'w', encoding='utf-8') as f:
        f.write('# -*- coding: utf-8 -*-\n')
        f.write('"""GENERADO por tools/creencias/gen_libro.py desde files/creencias-28.pdf.\n'
                'No editar a mano: se reescribe entero."""\n')
        f.write('LIBRO = ' + json.dumps(cap, ensure_ascii=False, indent=1) + '\n')
    print('libro.py escrito |', len(cap), 'capitulos |',
          sum(len(c['subtitulos']) for c in cap.values()), 'subtitulos')

if __name__ == '__main__':
    main()
