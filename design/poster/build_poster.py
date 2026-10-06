import qrcode, shutil
from PIL import Image, ImageDraw, ImageFont
from psd_tools import PSDImage
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.colors import CMYKColor

FD='/tmp/claude-0/-home-user-portfolio/c75e4de4-051f-531b-88dc-a8da76ff5dfa/scratchpad/geist/package/dist/fonts/geist-sans/'
BOLD=FD+'Geist-Bold.ttf'; REG=FD+'Geist-Regular.ttf'; MED=FD+'Geist-Medium.ttf'
URL='https://fadeco-booking.vercel.app'
W,H,B=297,420,5            # trim, bleed (mm)
M=24                       # side margin from trim (safe zone is >=10mm; 24 = comfortable)
DPI=300; mm=DPI/25.4
PW,PH=round((W+2*B)*mm),round((H+2*B)*mm)
BG=(10,10,10); FG=(245,245,245); AC=(245,158,11)
# CMYK for PDF (0-1): rich black, near-white, amber
C_BG=CMYKColor(0.55,0.45,0.45,0.95); C_FG=CMYKColor(0,0,0,0.04); C_AC=CMYKColor(0,0.40,1,0)
C_QRDARK=CMYKColor(0.55,0.45,0.45,0.95)

pdfmetrics.registerFont(TTFont('GB',BOLD)); pdfmetrics.registerFont(TTFont('GR',REG)); pdfmetrics.registerFont(TTFont('GM',MED))
def pil_font(path,size_mm): return ImageFont.truetype(path,round(size_mm*mm))
def tw(fontname,text,size_mm): return pdfmetrics.stringWidth(text,fontname,size_mm)  # in mm units (scaled)

# --- geometry (mm, y from top of the bleed canvas) ---
x0=B+M
avail=W-2*M
head=['Book your','barber','online']
hs=avail/ (tw('GB',head[0],1))   # fit longest line to safe width
lead=hs*0.98
y_cap_top=B+30
# baselines (cap height ~0.71em)
base=[y_cap_top+hs*0.71+i*lead for i in range(3)]
sub_s=11.5; sub_lines=['Pick a service, a barber and a time','in under a minute']
sub_base0=base[2]+hs*0.22+sub_s*1.0
sub_base=[sub_base0+i*sub_s*1.35 for i in range(2)]
qr_plate=104; qr_quiet=8; qr_mod=qr_plate-2*qr_quiet   # 88mm code (>=40mm)
qx=B+W-M-qr_plate; qy=B+H-M-qr_plate-6
foot_s=5.2; foot_base=B+H-M-6
ac_rule=(x0,qy+qr_plate-1.2,x0+34,qy+qr_plate)          # small amber rule above footer, 2nd accent spot
ac_rule=(x0, foot_base-foot_s*0.71-7, x0+34, foot_base-foot_s*0.71-7+1.6)

qr=qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_M,border=0); qr.add_data(URL); qr.make(fit=True)
mat=qr.get_matrix(); n=len(mat)

# --- raster layers ---
def layer(): return Image.new('RGBA',(PW,PH),(0,0,0,0))
def P(v): return round(v*mm)
L={}
L['Background']=Image.new('RGBA',(PW,PH),BG+(255,))
t=layer(); d=ImageDraw.Draw(t)
fb=pil_font(BOLD,hs)
for i in (0,1): d.text((P(x0),P(base[i])),head[i],font=fb,fill=FG,anchor='ls')
L['Headline white']=t
t=layer(); ImageDraw.Draw(t).text((P(x0),P(base[2])),head[2],font=fb,fill=AC,anchor='ls'); L['Headline accent']=t
t=layer(); d=ImageDraw.Draw(t); fr=pil_font(REG,sub_s)
for i,s in enumerate(sub_lines): d.text((P(x0),P(sub_base[i])),s,font=fr,fill=FG,anchor='ls')
L['Subtitle']=t
t=layer(); d=ImageDraw.Draw(t)
d.rectangle((P(qx),P(qy),P(qx+qr_plate),P(qy+qr_plate)),fill=FG)
L['QR plate']=t
t=layer(); d=ImageDraw.Draw(t); cell=qr_mod/n
for r in range(n):
    for c in range(n):
        if mat[r][c]:
            d.rectangle((P(qx+qr_quiet+c*cell),P(qy+qr_quiet+r*cell),P(qx+qr_quiet+(c+1)*cell)-1,P(qy+qr_quiet+(r+1)*cell)-1),fill=BG)
L['QR code']=t
t=layer(); ImageDraw.Draw(t).rectangle([P(v) for v in ac_rule],fill=AC); L['Accent rule']=t
t=layer(); ImageDraw.Draw(t).text((P(x0),P(foot_base)),'Fade & Co. | Concept project',font=pil_font(MED,foot_s),fill=FG,anchor='ls'); L['Footer']=t

# preview PNG (sRGB, flattened, with bleed)
flat=Image.new('RGBA',(PW,PH))
for k in L: flat=Image.alpha_composite(flat,L[k])
flat=flat.convert('RGB'); flat.save('poster/plakat_A3_podglad.png',dpi=(DPI,DPI))
# trim-marked small preview unnecessary

# PSD CMYK layered
psd=PSDImage.new('RGB',(PW,PH))
for k,v in L.items():
    psd.create_pixel_layer(v,name=k)
psd.save('poster/plakat_A3.psd')

# --- vector PDF with CMYK, TrimBox/BleedBox ---
pt=72/25.4
c=canvas.Canvas('poster/plakat_A3_druk.pdf',pagesize=((W+2*B)*pt,(H+2*B)*pt))
c.setTitle('Fade & Co. - plakat A3'); 
c.setTrimBox((B*pt,B*pt,(B+W)*pt,(B+H)*pt)); c.setBleedBox((0,0,(W+2*B)*pt,(H+2*B)*pt))
PH_pt=(H+2*B)*pt
def Y(v): return PH_pt-v*pt
c.setFillColor(C_BG); c.rect(0,0,(W+2*B)*pt,PH_pt,stroke=0,fill=1)
def text(s,font,size,x,base,col):
    c.setFillColor(col); c.setFont(font,size*pt); c.drawString(x*pt,Y(base),s)
for i in (0,1): text(head[i],'GB',hs,x0,base[i],C_FG)
text(head[2],'GB',hs,x0,base[2],C_AC)
for i,s in enumerate(sub_lines): text(s,'GR',sub_s,x0,sub_base[i],C_FG)
c.setFillColor(C_FG); c.rect(qx*pt,Y(qy+qr_plate),qr_plate*pt,qr_plate*pt,stroke=0,fill=1)
c.setFillColor(C_QRDARK)
for r in range(n):
    for cc in range(n):
        if mat[r][cc]:
            c.rect((qx+qr_quiet+cc*cell)*pt,Y(qy+qr_quiet+(r+1)*cell),cell*pt+0.05,cell*pt+0.05,stroke=0,fill=1)
c.setFillColor(C_AC); c.rect(ac_rule[0]*pt,Y(ac_rule[3]),(ac_rule[2]-ac_rule[0])*pt,(ac_rule[3]-ac_rule[1])*pt,stroke=0,fill=1)
text('Fade & Co. | Concept project','GM',foot_s,x0,foot_base,C_FG)
c.showPage(); c.save()
print('px',PW,PH,'head size mm',round(hs,1),'qr mod',n)
