# -*- coding: utf-8 -*-
"""Parser de las listas de textos de la cartilla.

Gramatica real de la cartilla, sacada de mirar las 28 listas:
  - los tramos se separan por ';'
  - un tramo puede empezar con el nombre del libro; si no, sigue con el ultimo
  - despues del libro: 'cap:versiculos' o solo 'cap' (capitulo entero)
  - los versiculos admiten '1:20,21', '30:5, 6', '1:1-3,14', '6:14-7:1'
  - en los libros de un solo capitulo (Judas, 3 Juan, Abdias, Filemon, 2 Juan)
    'Judas 3,14' son VERSICULOS del capitulo 1, no capitulos
"""
import re, unicodedata

ORDEN = ['genesis','exodo','levitico','numeros','deuteronomio','josue','jueces','rut','1samuel','2samuel',
'1reyes','2reyes','1cronicas','2cronicas','esdras','nehemias','ester','job','salmos','proverbios',
'eclesiastes','cantares','isaias','jeremias','lamentaciones','ezequiel','daniel','oseas','joel','amos',
'abdias','jonas','miqueas','nahum','habacuc','sofonias','hageo','zacarias','malaquias',
'mateo','marcos','lucas','juan','hechos','romanos','1corintios','2corintios','galatas','efesios',
'filipenses','colosenses','1tesalonicenses','2tesalonicenses','1timoteo','2timoteo','tito','filemon',
'hebreos','santiago','1pedro','2pedro','1juan','2juan','3juan','judas','apocalipsis']
NUM = {n: i+1 for i, n in enumerate(ORDEN)}

NOMBRE = {
 'genesis':'Génesis','exodo':'Éxodo','levitico':'Levítico','numeros':'Números','deuteronomio':'Deuteronomio',
 'josue':'Josué','jueces':'Jueces','rut':'Rut','1samuel':'1 Samuel','2samuel':'2 Samuel','1reyes':'1 Reyes',
 '2reyes':'2 Reyes','1cronicas':'1 Crónicas','2cronicas':'2 Crónicas','esdras':'Esdras','nehemias':'Nehemías',
 'ester':'Ester','job':'Job','salmos':'Salmos','proverbios':'Proverbios','eclesiastes':'Eclesiastés',
 'cantares':'Cantares','isaias':'Isaías','jeremias':'Jeremías','lamentaciones':'Lamentaciones',
 'ezequiel':'Ezequiel','daniel':'Daniel','oseas':'Oseas','joel':'Joel','amos':'Amós','abdias':'Abdías',
 'jonas':'Jonás','miqueas':'Miqueas','nahum':'Nahúm','habacuc':'Habacuc','sofonias':'Sofonías',
 'hageo':'Hageo','zacarias':'Zacarías','malaquias':'Malaquías','mateo':'Mateo','marcos':'Marcos',
 'lucas':'Lucas','juan':'Juan','hechos':'Hechos','romanos':'Romanos','1corintios':'1 Corintios',
 '2corintios':'2 Corintios','galatas':'Gálatas','efesios':'Efesios','filipenses':'Filipenses',
 'colosenses':'Colosenses','1tesalonicenses':'1 Tesalonicenses','2tesalonicenses':'2 Tesalonicenses',
 '1timoteo':'1 Timoteo','2timoteo':'2 Timoteo','tito':'Tito','filemon':'Filemón','hebreos':'Hebreos',
 'santiago':'Santiago','1pedro':'1 Pedro','2pedro':'2 Pedro','1juan':'1 Juan','2juan':'2 Juan',
 '3juan':'3 Juan','judas':'Judas','apocalipsis':'Apocalipsis'}

UN_CAPITULO = {'abdias','filemon','2juan','3juan','judas'}

def _slug(t):
    t = unicodedata.normalize('NFD', t)
    t = ''.join(c for c in t if unicodedata.category(c) != 'Mn')
    return re.sub(r'[^a-z0-9]', '', t.lower())

ALIAS = {}
for s, n in NOMBRE.items():
    ALIAS[_slug(n)] = s
ALIAS.update({'levitico':'levitico','leviticos':'levitico','salmo':'salmos','cantar':'cantares',
              'apoc':'apocalipsis','hech':'hechos'})

# los nombres mas largos primero, o «Juan» se come «1 Juan»
LIBRO_RE = re.compile(r'^((?:[123]\s*)?[A-Za-zÁÉÍÓÚÑáéíóúñ]+\.?)\s*', re.U)

# La cartilla trae «1 Corintios 10-16,17» donde el libro de las 28 creencias
# dice «1 Cor. 10:16,17». Es una errata de imprenta: leido literal serian los
# capitulos 10 al 16 enteros mas el 17, que no viene a cuento en la Cena del
# Senor. Se corrige aqui, en un solo lugar y dicho.
ERRATAS = {'1 Corintios 10-16,17': '1 Corintios 10:16,17'}

def parsea(lista):
    """Devuelve [(slug, capitulo, [versiculos] o None)]; None = capitulo entero."""
    salida, libro = [], None
    lista = lista.replace('–', '-').replace('—', '-').rstrip('. ')
    for mal, bien in ERRATAS.items():
        lista = lista.replace(mal, bien)
    for tramo in lista.split(';'):
        tramo = tramo.strip()
        if not tramo:
            continue
        m = LIBRO_RE.match(tramo)
        if m:
            cand = _slug(m.group(1))
            if cand in ALIAS:
                libro = ALIAS[cand]
                tramo = tramo[m.end():].strip()
        if libro is None:
            continue
        if not tramo:
            continue
        if libro in UN_CAPITULO and ':' not in tramo:
            vs = _versiculos(tramo)
            if vs:
                salida.append((libro, 1, vs))
            continue
        if ':' in tramo:
            cap_txt, vs_txt = tramo.split(':', 1)
            try:
                cap = int(re.sub(r'\D', '', cap_txt))
            except ValueError:
                continue
            # rango que cruza de capitulo: «6:14-7:1»
            cruce = re.match(r'^\s*(\d+)\s*-\s*(\d+):(\d+)\s*$', vs_txt)
            if cruce:
                salida.append((libro, cap, list(range(int(cruce.group(1)), 200))))
                salida.append((libro, int(cruce.group(2)), list(range(1, int(cruce.group(3)) + 1))))
                continue
            vs = _versiculos(vs_txt)
            salida.append((libro, cap, vs if vs else None))
        else:
            for c in _versiculos(tramo):
                salida.append((libro, c, None))
    return salida

def _versiculos(txt):
    out = []
    for parte in txt.split(','):
        parte = parte.strip().rstrip('.')
        if not parte:
            continue
        r = re.match(r'^(\d+)\s*-\s*(\d+)$', parte)
        if r:
            out.extend(range(int(r.group(1)), int(r.group(2)) + 1))
            continue
        d = re.match(r'^(\d+)$', parte)
        if d:
            out.append(int(d.group(1)))
    return out
