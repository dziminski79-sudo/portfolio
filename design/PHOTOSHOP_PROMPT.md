Pracuj w Photoshopie na moim komputerze (computer use). Repo: dziminski79-sudo/portfolio, gałąź `claude/gallant-gauss-qa4h8b`, folder `design/`. Najpierw pobierz/zsynchronizuj tę gałąź (git fetch + checkout), pliki źródłowe są w `design/`. Przed każdym większym krokiem w Photoshopie pytaj mnie o zgodę, pracuj powoli i zrób zrzut ekranu po każdym kroku. Wszystko zapisuj w `design/photoshop/`.

## ZADANIE A: Retusz przed i po (priorytet)
Plik: `design/retouch/before.jpg` (1333x2000 px, sRGB, 8 bit). Bez filtrów AI i bez Generative Fill / Content-Aware Fill.
Warstwy nazwij dokładnie tak:
1. `01 Original`: warstwa tła z oryginałem.
2. `02 Levels + curves`: Levels (wejście 8 / gamma 1,09 / 245) i Curves (punkty 64→61 i 191→194), jako warstwy dopasowania.
3. Color Balance (Midtones): Red +4, Blue −5, w tej samej grupie co krok 2 (nazwa grupy `02 Levels + curves`).
4. `03 Spot healing`: nowa pusta warstwa, Spot Healing Brush (J), Sample All Layers, 8-12 px, twardość 100%, Proximity Match. Usuń małe czerwone krosty na czole i policzku. Nie ruszaj ucha, oka, brody.
5. `04 Background unify`: Polygonal Lasso na lewej ścianie, współrzędne w px oryginału: (0,0), (300,0), (300,600), (150,780), (140,870), (215,940), (222,1110), (232,1250), (212,1400), (212,1500), (0,1600). Feather 30 px. Stamp visible (Ctrl+Alt+Shift+E), Gaussian Blur 60 px, Desaturate (Shift+Ctrl+U), maska z zaznaczenia, Opacity 70%.
6. `05 Sharpen`: Stamp visible, Unsharp Mask Amount 60%, Radius 1,4 px, Threshold 0, tryb mieszania Luminosity.
Eksport: `retouch.psd` (z warstwami), `before.png` (oryginał), `after.png` (wynik, pełna rozdzielczość). Na końcu wypisz listę 5-7 wykonanych kroków (z punktów powyżej) i jednym zdaniem, co zrobiłeś ręcznie.
Źródło zdjęcia i licencja: dopiszę sam do `design/retouch/SOURCE.txt`.

## ZADANIE B: Post na Instagram 1080x1350 px (po zadaniu A)
Tło: `design/instagram/source_photo.jpg`, przeskalowane do szerokości 1080, kadr od góry (offset ok. 40 px), przyciemnione (warstwa #0A0A0A, 35%) plus gradienty od góry (do ok. 40% wysokości) i od dołu (od 72%).
Teksty jako edytowalne warstwy tekstowe, czcionka Geist (jeśli brak, zainstaluj z `design/` lub paczki npm `geist`):
- "Skin Fade": Geist Bold 170 px, #F5F5F5, lewy margines 72 px, baseline 222 px od góry.
- "45 USD · 45 min": Geist SemiBold 62 px, #F59E0B, baseline 314 px od góry.
- "Book online: fadeco-booking.vercel.app": Geist SemiBold 48 px, #F5F5F5, baseline 1278 px od góry.
Referencja wyglądu: `design/instagram/post_skin_fade_1080x1350.png`. Tekst ma być czytelny po zmniejszeniu do 300 px szerokości. Eksport: PNG i PSD.

## ZADANIE C: Plakat A3 (opcjonalnie, tylko jeśli A i B gotowe)
Odtwórz `design/poster/plakat_A3_podglad.png` w Photoshopie z edytowalnym tekstem: 297x420 mm + 5 mm spadu, CMYK, 300 ppi, tło #0A0A0A, tekst #F5F5F5, akcent #F59E0B tylko na "online" i cienkiej kresce nad stopką, Geist, kod QR do https://fadeco-booking.vercel.app (min 4x4 cm, w referencji 88 mm). Eksport: PSD, PDF do druku, PNG podglądowy.
