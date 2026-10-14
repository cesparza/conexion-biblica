# Arma laminas/d7/bestias.webp (la portada de Daniel 7): las cuatro bestias suben del mar.
# Uso: python3 tools/lamina-bestias.py  (escribe bestias2.png aquí; luego se pasa a webp).
from PIL import Image, ImageEnhance, ImageDraw, ImageFilter
import numpy as np
L='/home/claude/conexion-biblica/laminas/d7/'
base=Image.open(L+'mar.webp').convert('RGBA'); W,H=base.size
def tinte(im,luz):
    a=im.split()[3]; rgb=ImageEnhance.Brightness(im).enhance(luz); rgb=ImageEnhance.Color(rgb).enhance(.85)
    rgb=Image.blend(rgb,Image.merge('RGBA',(*Image.new('RGB',im.size,(38,55,80)).split(),a)),.16); return rgb
def fundeAbajo(al,agua):
    h=al.shape[0]; n=int(h*agua); f=np.ones(h); f[h-n:]=(1-np.arange(n)/n)**1.6; return al*f[:,None]
def capa(f,h,x,y,luz=.78,agua=.3,espejo=False):
    im=Image.open(L+f).convert('RGBA'); w=round(im.width*h/im.height); im=im.resize((w,h),Image.LANCZOS)
    if espejo: im=im.transpose(Image.FLIP_LEFT_RIGHT)
    im=tinte(im,luz); al=fundeAbajo(np.array(im.split()[3]).astype(float),agua); im.putalpha(Image.fromarray(al.astype('uint8')))
    base.alpha_composite(im,(x,y))
# 1. la cuarta, atrás a la derecha: recorte de cuarta.webp con borde difuminado
c=Image.open(L+'cuarta.webp').convert('RGBA').crop((250,0,1000,640)); s=.78
c=c.resize((round(c.width*s),round(c.height*s)),Image.LANCZOS); cw,ch=c.size
yy,xx=np.mgrid[0:ch,0:cw]; dx=(xx-cw*.52)/(cw*.5); dy=(yy-ch*.42)/(ch*.56)
m=np.clip((1-np.sqrt(dx**2+dy**2))/.32,0,1)**1.4
m=m*np.clip(yy/90,0,1)*np.clip((cw-xx)/70,0,1); m=fundeAbajo(m*255,.28)
c=ImageEnhance.Brightness(c).enhance(.92); c.putalpha(Image.fromarray(m.astype('uint8')))
base.alpha_composite(c,(W-cw-20,40))
# 2. las tres, de atrás hacia adelante
capa('leon-solo.png',215,30,150,luz=.66)
capa('oso-solo.png',225,300,185,luz=.62)
capa('leopardo-solo.png',300,120,300,luz=.8)
# 3. olas encima de todo lo de abajo
orig=Image.open(L+'mar.webp').convert('RGBA'); y0=480; ola=orig.crop((0,y0,W,H))
f=np.clip(np.arange(ola.height)/(ola.height*.6),0,1)**1.3*.85
ola.putalpha(Image.fromarray(np.tile((f*255)[:,None],(1,W)).astype('uint8')))
base.alpha_composite(ola,(0,y0))
base.convert('RGB').save(L+'bestias.webp',quality=82,method=6)
