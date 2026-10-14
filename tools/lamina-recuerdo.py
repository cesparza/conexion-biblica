# Arma laminas/d7/recuerdo.webp: la escena de Daniel 7:28 («guardé el asunto en mi corazón»).
# v217 (Camilo, 14-oct: el paso mostraba el mar en tormenta, que es 7:2 y no 7:28): la visión
# entera (bestias.webp) como un recuerdo: desenfocada, a media luz, sin color frío, con la
# luz cálida de una lámpara abajo a la izquierda y viñeta. Es otra imagen, no se repite la del mar.
# Uso: python3 tools/lamina-recuerdo.py
from PIL import Image, ImageEnhance, ImageFilter
import numpy as np
L='/home/claude/conexion-biblica/laminas/d7/'
im=Image.open(L+'bestias.webp').convert('RGB')
W,H=im.size
im=im.filter(ImageFilter.GaussianBlur(2.2))
im=ImageEnhance.Color(im).enhance(.35)
a=np.asarray(im).astype(float)/255
# tono sepia apagado
g=a@np.array([.3,.59,.11])
sep=np.stack([g*1.0,g*.86,g*.66],-1)
a=a*.45+sep*.55
# viñeta y lámpara cálida
yy,xx=np.mgrid[0:H,0:W]
d=np.sqrt(((xx-W*.5)/(W*.62))**2+((yy-H*.48)/(H*.7))**2)
vin=np.clip(1-d**2*.85,0.12,1)
lamp=np.exp(-(((xx-W*.2)/(W*.32))**2+((yy-H*.88)/(H*.42))**2))
a=a*vin[...,None]*.74
a=a+lamp[...,None]*np.array([.30,.18,.06])
a=np.clip(a,0,1)
Image.fromarray((a*255).astype('uint8')).save(L+'recuerdo.webp','WEBP',quality=80,method=6)
print('ok', L+'recuerdo.webp')
