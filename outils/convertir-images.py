"""Convertit les images sources (assets/) en AVIF + WebP à plusieurs largeurs pour site/assets/img.

Usage : python3 outils/convertir-images.py assets site/assets/img   (nécessite Pillow ≥ 11.3)
"""
import os
import sys
from PIL import Image

SRC = sys.argv[1]
OUT = sys.argv[2]
os.makedirs(OUT, exist_ok=True)

# nom source -> (largeurs, qualité WebP, qualité AVIF, fallback)
JOBS = {
    "angelica-portrait.png": ([300, 420, 567], 86, 70, "png"),
    "machine-a-ecrire.png": ([360, 480, 739], 84, 66, "png"),
    "acilegna-logo.png": ([305], 90, 74, "png"),
    "grille-toyota-chalons.jpg": ([220, 334], 86, 70, "jpg"),
    "grille-pachirart.jpg": ([220, 334], 86, 70, "jpg"),
    "grille-vanillesens.jpg": ([220, 426], 86, 70, "jpg"),
    "grille-chalons-sarry-basket.jpg": ([220, 426], 86, 70, "jpg"),
    "grille-jci-chalons.jpg": ([220, 426], 86, 70, "jpg"),
    "texture-papier.jpg": ([512], 80, 60, "jpg"),
}


def resized(im, w):
    if w == im.width:
        return im
    h = round(im.height * w / im.width)
    if im.mode == "RGBA":
        # Redimensionnement prémultiplié : pas de liseré sombre sur le détourage
        return im.convert("RGBa").resize((w, h), Image.LANCZOS).convert("RGBA")
    return im.resize((w, h), Image.LANCZOS)


rows = []
for name, (widths, q_webp, q_avif, fallback) in JOBS.items():
    im = Image.open(os.path.join(SRC, name))
    im.load()
    im = im.convert("RGBA" if im.mode in ("RGBA", "LA", "P") else "RGB")
    stem = os.path.splitext(name)[0]
    src_size = os.path.getsize(os.path.join(SRC, name))
    for w in widths:
        r = resized(im, w)
        suffix = "" if w == im.width else f"-{w}"
        base = os.path.join(OUT, f"{stem}{suffix}")
        r.save(base + ".webp", "WEBP", quality=q_webp, method=6, alpha_quality=100)
        r.save(base + ".avif", "AVIF", quality=q_avif, speed=2, subsampling="4:4:4" if r.mode == "RGBA" else "4:2:0")
        rows.append((f"{stem}{suffix}", r.size, os.path.getsize(base + ".webp"), os.path.getsize(base + ".avif")))
    # Repli pour les rares navigateurs sans WebP/AVIF, à la taille d'origine
    if fallback == "png":
        im.save(os.path.join(OUT, f"{stem}.png"), "PNG", optimize=True)
    else:
        im.save(os.path.join(OUT, f"{stem}.jpg"), "JPEG", quality=86, optimize=True, progressive=True)
    rows.append((f"{stem}.{fallback} (repli, source {src_size // 1024} Ko)", im.size, os.path.getsize(os.path.join(OUT, f"{stem}.{fallback}")), 0))

for n, size, wb, av in rows:
    print(f"{n:52s} {size[0]:>4}x{size[1]:<4} webp {wb / 1024:7.1f} Ko   avif {av / 1024:7.1f} Ko")
