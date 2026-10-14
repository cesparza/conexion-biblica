# Arma, de laminas/d7/cuarta.webp, las piezas del momento del cuerno pequeño (v214):
#   cuarta-sin-tres.png  el parche (x 806-919, y 48-222) con los tres cuernos de la
#                        derecha borrados: cielo rellenado, con textura de nube
#   cuerno-8/9/10.png    los tres cuernos tal cual están pintados, recortados con su
#                        caja; puestos en su sitio, la imagen queda igual a la original
#   cuerno-7.png         el cuerno 7, para ponerlo DELANTE del pequeño (sale detrás)
# Por qué así: en v205 los tres se tapaban con cuadros de cielo corrido que no daban
# en el sitio (tapaban medio cuerno 7 y dejaban las bases de los de la derecha) y en
# su lugar caía un cuerno dibujado aparte. Con los recortes de la misma imagen, el
# cuerno que se desprende es el que estaba ahí, en el píxel exacto.
# Uso: python3 tools/lamina-cuernos.py   (imprime las cajas para fuente/laminas.js)
import cv2, numpy as np, json, sys
L = (sys.argv[1] if len(sys.argv) > 1 else '/home/claude/conexion-biblica') + '/laminas/d7/'
im = cv2.imread(L + 'cuarta.webp'); H, W = im.shape[:2]
B, G, R = [im[..., i].astype(int) for i in range(3)]
yy, xx = np.mgrid[0:H, 0:W]
calido = ((R - B) > 18) & (R > 40)          # el dorado de los cuernos; el cielo es azul
corte = np.where(yy < 128, 825, 821)          # la raya entre el cuerno 7 y el 8
def lado(p, q): return (q[0]-p[0])*(yy-p[1]) - (q[1]-p[1])*(xx-p[0])   # > 0: a la derecha de p→q
def relleno(m):
    m = cv2.morphologyEx(m, cv2.MORPH_CLOSE, np.ones((5, 5), np.uint8))
    cnt, _ = cv2.findContours(m, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    o = np.zeros_like(m); cv2.drawContours(o, [c for c in cnt if cv2.contourArea(c) > 40], -1, 255, -1); return o
reg = (xx > corte) & (yy > 55) & (yy < 212) & (xx < 910)
tres = relleno((calido & reg).astype(np.uint8) * 255)
# 1. Borrar los tres: inpaint suave + textura de nube de un trozo limpio (x 880-940, y 0-60).
m = cv2.dilate(tres, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (13, 13)))
m = (((m > 0) & (xx > corte - 2)) * 255).astype(np.uint8)
a = cv2.inpaint(im, m, 12, cv2.INPAINT_TELEA).astype(np.float32)
tex = im[0:60, 880:940].astype(np.float32); det = tex - cv2.GaussianBlur(tex, (0, 0), 6)
t = np.concatenate([det, det[::-1]], 0); t = np.concatenate([t, t[:, ::-1]], 1)
T = np.tile(t, (H // t.shape[0] + 1, W // t.shape[1] + 1, 1))[:H, :W]
fill = np.clip(cv2.GaussianBlur(a, (0, 0), 4) + T * .9, 0, 255)
f = cv2.GaussianBlur(m.astype(np.float32) / 255, (0, 0), 2.5)[..., None]
f = np.maximum(f, (m[..., None] > 0) * .9)
sin = (im * (1 - f) + fill * f).astype(np.uint8)
ys, xs = np.where(f[..., 0] > .003); x0, x1, y0, y1 = xs.min() - 2, xs.max() + 3, ys.min() - 2, ys.max() + 3
cv2.imwrite(L + 'cuarta-sin-tres.png', sin[y0:y1, x0:x1])
cajas = {'sin': [int(x0), int(y0), int(x1 - x0), int(y1 - y0)], 'tres': []}
# 2. Los tres, recortados de la imagen (se parten por dos rayas entre sus bases).
d = cv2.dilate(tres, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5)))
d = ((d > 0) & (xx > corte - 1)).astype(np.float32)
l1 = lado((855, 60), (843, 180)); l2 = lado((884, 100), (864, 198))
def guarda(alfa, nombre):
    alfa = cv2.GaussianBlur(alfa, (0, 0), .8)
    ys, xs = np.where(alfa > .02); a0, a1, b0, b1 = xs.min(), xs.max() + 1, ys.min(), ys.max() + 1
    cv2.imwrite(L + nombre, np.dstack([im[b0:b1, a0:a1], (alfa[b0:b1, a0:a1] * 255).astype(np.uint8)]))
    return [int(a0), int(b0), int(a1 - a0), int(b1 - b0)]
for parte, n in [(l1 > 0, 8), ((l1 <= 0) & (l2 > 0), 9), (l2 <= 0, 10)]:
    cajas['tres'].append(guarda(d * parte, 'cuerno-%d.png' % n))
# 3. El cuerno 7, entero.
reg7 = (lado((786, 150), (800, 40)) > 0) & (xx <= corte) & (yy > 40) & (yy < 160) & (xx > 780)
cajas['delante'] = guarda((relleno((calido & reg7).astype(np.uint8) * 255) > 0).astype(np.float32), 'cuerno-7.png')
print(json.dumps(cajas))
