import cv2, numpy as np
from PIL import Image
from psd_tools import PSDImage
src=cv2.cvtColor(cv2.imread('before.jpg'),cv2.COLOR_BGR2RGB); H,W=src.shape[:2]
f=src.astype(np.float32)/255
# 1) Levels: black point 3%, white point 96%, then gentle S-curve on luminance
lo,hi=0.03,0.96
lv=np.clip((f-lo)/(hi-lo),0,1)
s=lv**0.92
s=s+0.10*np.sin(2*np.pi*(s-0.5)+np.pi/2*0)*0  # placeholder removed below
curve=lambda x: x+0.12*x*(1-x)*(2*x-1)*-1*-1   # mild contrast S-curve
s=np.clip(curve(s),0,1)
# 2) colour: pull teal cast out of shadows/greys (neutralise grey wall), keep warm skin
wb=np.array([1.02,1.0,0.97],np.float32)
s=np.clip(s*wb,0,1)
step2=(s*255).astype(np.uint8)
# 3) spot healing: red blemish blobs on cheek/forehead (Telea inpaint, small radius)
img=step2.copy()
lab=cv2.cvtColor(img,cv2.COLOR_RGB2LAB).astype(np.float32)
a=lab[...,1]; med=cv2.medianBlur(lab[...,1].astype(np.uint8),31).astype(np.float32)
red=a-med
roi=np.zeros((H,W),bool); roi[900:1330,300:760]=True   # face skin, excl. beard
roi[1180:1330,300:520]=False
roi[1120:1190,400:500]=False   # eye
roi[1170:1330,560:760]=False   # beard edge
L=lab[...,0]; medL=cv2.medianBlur(L.astype(np.uint8),31).astype(np.float32)
cand=(red>4.5)&(np.abs(L-medL)<60)&roi
cand=cv2.morphologyEx(cand.astype(np.uint8),cv2.MORPH_OPEN,np.ones((2,2),np.uint8))
n,lbl,st,_=cv2.connectedComponentsWithStats(cand)
mask=np.zeros((H,W),np.uint8)
for i in range(1,n):
    if 6<=st[i,4]<=260: mask[lbl==i]=255
mask=cv2.dilate(mask,np.ones((5,5),np.uint8))
print('spots healed:',int((cv2.connectedComponents(mask)[0])-1))
step3=cv2.inpaint(step2,mask,4,cv2.INPAINT_TELEA)
cv2.imwrite('spot_mask_debug.png',mask)
# 4) unify background: neutral flat grey wall on the left, hand-drawn polygon, feathered
poly=np.array([(0,0),(300,0),(300,600),(150,780),(140,870),(215,940),(222,1110),(232,1250),(212,1400),(212,1500),(0,1600)],np.int32)
m=np.zeros((H,W),np.float32); cv2.fillPoly(m,[poly],1.0); m=cv2.GaussianBlur(m,(0,0),18)[...,None]
flat=cv2.GaussianBlur(step3,(0,0),60).astype(np.float32)
grey=flat.mean(2,keepdims=True)*np.array([1.0,1.0,1.0],np.float32)
step4=(step3*(1-0.7*m)+grey*(0.7*m)).clip(0,255).astype(np.uint8)
# 5) sharpen: unsharp mask on luminance only, subject-wide, radius 1.2 amount 0.6
ycc=cv2.cvtColor(step4,cv2.COLOR_RGB2YCrCb).astype(np.float32)
y=ycc[...,0]; bl=cv2.GaussianBlur(y,(0,0),1.4); ycc[...,0]=np.clip(y+0.6*(y-bl),0,255)
step5=cv2.cvtColor(ycc.astype(np.uint8),cv2.COLOR_YCrCb2RGB)
Image.fromarray(step5).save('after.jpg',quality=95)
Image.fromarray(step5).save('after.png')
p=PSDImage.new('RGB',(W,H))
for name,arr in [('01 Original',src),('02 Levels + curves + white balance',step2),('03 Spot healing',step3),('04 Background unify',step4),('05 Sharpen (luminance)',step5)]:
    p.create_pixel_layer(Image.fromarray(arr),name=name)
p.save('retouch.psd')
# side-by-side
sb=np.concatenate([src,step5],1); Image.fromarray(sb).resize((1333,1000)).save('before_after.png')
