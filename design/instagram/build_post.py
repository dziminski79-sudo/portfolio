from PIL import Image, ImageDraw, ImageFont
from psd_tools import PSDImage
import numpy as np, shutil
S='/tmp/claude-0/-home-user-portfolio/c75e4de4-051f-531b-88dc-a8da76ff5dfa/'
FD=S+'scratchpad/geist/package/dist/fonts/geist-sans/'
W,H=1080,1350; M=72
BG=(10,10,10); FG=(245,245,245); AC=(245,158,11)
src=Image.open(S+'images/1.jpg').convert('RGB')
sc=W/src.width; photo=src.resize((W,round(src.height*sc)),Image.LANCZOS)
top=40; photo=photo.crop((0,top,W,top+H))
shutil.copy(S+'images/1.jpg','source_photo.jpg')
L={}
L['Photo']=photo.convert('RGBA')
L['Darken 35%']=Image.new('RGBA',(W,H),BG+(int(255*.35),))
y=np.linspace(0,1,H)[:,None]*np.ones((1,W))
a_top=np.clip(1-y/0.40,0,1)**1.3*0.80; a_bot=np.clip((y-0.72)/0.28,0,1)**1.2*0.88
g=np.zeros((H,W,4),np.uint8); g[...,:3]=BG; g[...,3]=(np.maximum(a_top,a_bot)*255).astype(np.uint8)
L['Gradient top+bottom']=Image.fromarray(g,'RGBA')
def text_layer(s,font,size,xy,fill):
    t=Image.new('RGBA',(W,H),(0,0,0,0)); ImageDraw.Draw(t).text(xy,s,font=ImageFont.truetype(FD+font,size),fill=fill,anchor='ls'); return t
L['Title']=text_layer('Skin Fade','Geist-Bold.ttf',170,(M,M+150),FG)
L['Price']=text_layer('45 USD · 45 min','Geist-SemiBold.ttf',62,(M,M+150+30+62),AC)
L['URL']=text_layer('Book online: fadeco-booking.vercel.app','Geist-SemiBold.ttf',48,(M,H-M),FG)
flat=Image.new('RGBA',(W,H))
for v in L.values(): flat=Image.alpha_composite(flat,v)
flat.convert('RGB').save('post_skin_fade_1080x1350.png')
f=Image.open('post_skin_fade_1080x1350.png').resize((300,375),Image.LANCZOS); f.save('check_300px.png')
p=PSDImage.new('RGB',(W,H))
for k,v in L.items(): p.create_pixel_layer(v,name=k)
p.save('post_skin_fade_1080x1350.psd')
