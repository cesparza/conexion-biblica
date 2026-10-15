# Arma, de las imágenes de Camilo en laminas/d8/, las piezas de la lámina de Daniel 8 (v222):
#   llanura.webp       el río Ulai (ulai.webp) al atardecer, oscurecido: el escenario del carnero
#                      y del macho cabrío («un carnero que estaba delante del río», 8:3)
#   noche.webp         el mismo lugar de noche, con estrellas: donde crece el cuerno pequeño
#                      («creció hasta llegar al ejército del cielo», 8:10)
#   carnero-cuerpo.webp / carnero-cuerno-a.webp / carnero-cuerno-b.webp (con transparencia)
#                      el carnero sin cuernos y sus dos cuernos recortados de la misma imagen:
#                      a, el curvo (Media); b, el más alto, que «creció después» (Persia, 8:3)
#   macho-cuerpo.webp / macho-cuerno.webp
#                      el macho cabrío sin su cuerno notable y el cuerno solo, para quebrarlo (8:8)
#   cabeza.webp / cuerno-1..4.webp
#                      la cabeza de cuernos-cuatro.png sin sus cuatro cuernos y cada cuerno
#                      recortado en su sitio: crecen uno por uno hacia los cuatro vientos (8:8)
#   portada.webp, carnero.webp, macho.webp, cuatro.webp, pequeno.webp, cielo.webp, purificado.webp
#                      las escenas quietas de cada parte (riel, Comparar, «reducir movimiento»)
# Las piezas se recortan de la misma imagen: puestas en su sitio, se ve igual que el original.
# Uso: python3 tools/lamina-d8.py   (imprime las cajas para fuente/laminas.js)
import sys, json, random
from PIL import Image, ImageDraw, ImageFilter, ImageEnhance, ImageChops
R = (sys.argv[1] if len(sys.argv) > 1 else '/home/claude/conexion-biblica') + '/laminas/d8/'
W, H = 1200, 675
cajas = {}

def guarda(im, f, q=84):
    if f.endswith('.png'): im.save(R + f, optimize=True)
    elif im.mode == 'RGBA': im.save(R + f, quality=88, alpha_quality=90, method=6)
    else: im.convert('RGB').save(R + f, quality=q, method=6)

def poli(size, pts):
    m = Image.new('L', size, 0); ImageDraw.Draw(m).polygon(pts, fill=255); return m

def parte(src, pts, nombre, sin=None):
    """Recorta de `src` (RGBA) lo que cae en el polígono: la pieza va a `nombre` con su caja; lo demás queda en `sin`."""
    m = poli(src.size, pts).filter(ImageFilter.GaussianBlur(1.2))
    a = src.getchannel('A')
    pa = ImageChops.multiply(a, m)
    pieza = src.copy(); pieza.putalpha(pa)
    bb = pieza.getbbox(); pieza = pieza.crop(bb); guarda(pieza, nombre)
    cajas[nombre] = list(bb)
    if sin is not None:
        resto = ImageChops.multiply(sin.getchannel('A'), ImageChops.invert(m)); sin.putalpha(resto)
    return bb

# 1. Los escenarios, del río Ulai de Camilo.
ulai = Image.open(R + 'ulai.webp').convert('RGB').resize((W, H), Image.LANCZOS)
ll = ImageEnhance.Brightness(ImageEnhance.Color(ulai).enhance(.72)).enhance(.48)
vel = Image.new('L', (W, H), 0); d = ImageDraw.Draw(vel)
for i in range(60):   # viñeta: los bordes más oscuros
    d.rectangle([i * 6, i * 4, W - i * 6, H - i * 4], outline=int(255 * (1 - i / 60) ** 2))
vel = vel.filter(ImageFilter.GaussianBlur(40))
llanura = Image.composite(Image.new('RGB', (W, H), (10, 8, 6)), ll, vel)
guarda(llanura, 'llanura.webp')
# De noche: azul, más oscuro, y estrellas en el cielo (arriba de la línea de la ciudad).
n = ImageEnhance.Brightness(ImageEnhance.Color(ulai).enhance(.25)).enhance(.30)
azul = Image.new('RGB', (W, H), (14, 22, 52))
noche = Image.blend(n, azul, .45)
noche = Image.composite(Image.new('RGB', (W, H), (4, 6, 14)), noche, vel)
d = ImageDraw.Draw(noche); random.seed(8)
for i in range(420):
    x, y = random.random() * W, random.random() ** 1.6 * 300
    r = random.choice([.6, .8, 1, 1, 1.3, 1.8]); c = random.randint(150, 255)
    d.ellipse([x - r, y - r, x + r, y + r], fill=(c, c, min(255, c + 20)))
noche = noche.filter(ImageFilter.GaussianBlur(.4))
guarda(noche, 'noche.webp')

# 2. El carnero: el cuerpo y sus dos cuernos (coordenadas de carnero-solo.png, 751 × 800).
car = Image.open(R + 'carnero-solo.png').convert('RGBA')
car_sin = car.copy()
# b: el más alto, detrás (sube en gancho hasta arriba y baja por la derecha de la cabeza).
B = [(600, 0), (751, 0), (751, 120), (728, 175), (700, 178), (682, 150), (668, 122), (660, 100), (650, 78), (628, 52), (602, 32)]
# a: el curvo, delante (el espiral de la izquierda de la cabeza).
A = [(512, 104), (548, 92), (600, 88), (640, 96), (664, 112), (672, 140), (660, 160), (628, 150), (604, 150), (590, 168), (586, 200), (566, 208), (530, 196), (514, 160)]
parte(car, B, 'carnero-cuerno-b.webp', car_sin)
parte(car, A, 'carnero-cuerno-a.webp', car_sin)
guarda(car_sin, 'carnero-cuerpo.webp')

# 3. El macho cabrío: el cuerpo y el cuerno notable (macho-cabrio-solo.png, 800 × 763).
mac = Image.open(R + 'macho-cabrio-solo.png').convert('RGBA')
mac_sin = mac.copy()
M = [(0, 0), (150, 0), (140, 120), (126, 168), (120, 200), (112, 222), (84, 236), (52, 238), (34, 210), (0, 170)]
parte(mac, M, 'macho-cuerno.webp', mac_sin)
guarda(mac_sin, 'macho-cuerpo.webp')

# 4. La cabeza de los cuatro cuernos (cuernos-cuatro.png, 758 × 800, v223: la cabeza rubia del
#    macho cabrío, con el gran cuerno quebrado en el centro): de izquierda a derecha.
cab = Image.open(R + 'cuernos-cuatro.png').convert('RGBA')
cab_sin = cab.copy()
C = [
    [(0, 190), (0, 250), (70, 238), (130, 222), (190, 216), (240, 232), (272, 244), (300, 250), (314, 215), (306, 186), (286, 166), (262, 150), (225, 131), (180, 123), (130, 131), (80, 152), (30, 182)],  # 1: el de afuera, izquierda
    [(65, 96), (110, 12), (190, -6), (285, -2), (338, 55), (358, 118), (352, 150), (342, 184), (300, 184), (278, 172), (255, 156), (232, 128), (212, 96), (190, 72), (150, 72), (100, 98)],              # 2: el de adentro, izquierda
    [(404, 186), (402, 120), (420, 55), (470, 5), (545, -6), (622, 10), (672, 78), (664, 102), (636, 86), (606, 72), (565, 58), (532, 84), (514, 122), (505, 150), (478, 162), (458, 190)],                    # 3: el de adentro, derecha
    [(452, 192), (470, 150), (510, 133), (560, 124), (620, 130), (684, 156), (736, 200), (758, 212), (758, 248), (720, 238), (660, 217), (600, 214), (545, 224), (505, 240), (480, 246), (462, 232)],  # 4: el de afuera, derecha
]
for i, p in enumerate(C): parte(cab, p, 'cuerno-%d.webp' % (i + 1), cab_sin)
guarda(cab_sin, 'cabeza.webp')

# 6. Las escenas quietas (1200 × 675).
def pon(fondo, capa, x, y, h, espejo=False):
    c = capa.resize((round(capa.width * h / capa.height), h), Image.LANCZOS)
    if espejo: c = c.transpose(Image.FLIP_LEFT_RIGHT)
    f = fondo.convert('RGBA'); f.alpha_composite(c, (round(x), round(y))); return f
def sombra(fondo, cx, cy, rx, ry, a=.55):
    s = Image.new('L', (W, H), 0); ImageDraw.Draw(s).ellipse([cx - rx, cy - ry, cx + rx, cy + ry], fill=int(255 * a))
    s = s.filter(ImageFilter.GaussianBlur(14)); f = fondo.convert('RGBA'); f.paste((0, 0, 0, 255), (0, 0), s); return f
carS = sombra(llanura, 350, 620, 200, 26)
guarda(pon(carS, car, 160, 196, 430), 'carnero.webp')
guarda(pon(sombra(llanura, 640, 640, 220, 22, .4), mac, 420, 120, 420), 'macho.webp')
port = pon(sombra(ulai, 330, 640, 190, 22, .5), car, 150, 240, 400)
port = pon(sombra(port, 860, 650, 200, 20, .4), mac, 690, 170, 380)
guarda(port, 'portada.webp')
cu = Image.new('RGB', (W, H), (12, 10, 9)); cu = Image.blend(cu, llanura, .55)
guarda(pon(cu, cab, 600 - 610 * cab.width / cab.height / 2, 40, 610), 'cuatro.webp')
cp = Image.open(R + '../d7/cuerno-pequeno.png').convert('RGBA')
guarda(pon(noche, cp, 120, 330, 300), 'pequeno.webp')
guarda(pon(noche, cp, 520, 140, 520), 'cielo.webp')
# El santuario purificado (v223): el santuario de Camilo sin el cuerno ni las nubes oscuras. Lo
# oscuro de abajo (el cuerno y su humo) se rellena desde los bordes y queda como nube de luz;
# el candelabro, el arca y la mesa no se tocan.
# v225: santuario.webp ya es la imagen nueva (lugar santo con el velo cerrado, sin el arca, el
# cuerno grande en el centro): purificado.webp NO se vuelve a sacar de ella (saldría sin el arca
# y con el cuerno a medias). Se deja el de v223 hasta que Camilo traiga la imagen propia del
# santuario purificado. Para sacarlo otra vez de santuario.webp: PURIFICADO=1.
import os
if os.environ.get('PURIFICADO') != '1':
    print(json.dumps(cajas)); sys.exit(0)
import numpy as np, cv2
san = cv2.resize(cv2.imread(R + 'santuario.webp'), (W, H), interpolation=cv2.INTER_AREA)
v = cv2.cvtColor(san, cv2.COLOR_BGR2HSV)[..., 2]
m = np.zeros(v.shape, np.uint8); m[v < 150] = 255; m[:228, :] = 0
m[80:300, 170:390] = 0; m[170:300, 820:1060] = 0
m = cv2.dilate(m, np.ones((19, 19), np.uint8))
r = cv2.inpaint(san, m, 30, cv2.INPAINT_TELEA).astype(np.float32)
mm = cv2.GaussianBlur(m.astype(np.float32) / 255., (0, 0), 12)[..., None]
r = r * (1 - mm) + cv2.GaussianBlur(r, (0, 0), 18) * mm
g = np.clip((np.linspace(0, 1, H)[:, None, None] - .45) / .55, 0, 1)
r = r * (1 - .35 * g) + np.array([150, 215, 255], np.float32) * .35 * g
pu = Image.fromarray(cv2.cvtColor(np.clip(r, 0, 255).astype(np.uint8), cv2.COLOR_BGR2RGB))
guarda(pu, 'purificado.webp')

print(json.dumps(cajas))
