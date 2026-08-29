"""Pembangkit gambar simbol UML dan ERD untuk tabel pada laporan KP.

Menghasilkan berkas PNG di docs/simbol/ dengan supersampling 4x supaya
garisnya halus saat dicetak.
"""
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

OUT = Path(__file__).resolve().parent.parent / "docs" / "simbol"
OUT.mkdir(parents=True, exist_ok=True)

S = 4                       # faktor supersampling
W, H = 200, 110             # ukuran logis (px)
FONT_PATH = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
BW = 2                      # tebal garis logis


def _font(size):
    return ImageFont.truetype(FONT_PATH, size * S)


def new_canvas():
    img = Image.new("RGB", (W * S, H * S), "white")
    return img, ImageDraw.Draw(img)


def save(img, name):
    img = img.resize((W, H), Image.LANCZOS)
    img.save(OUT / f"{name}.png")
    return name


def line(d, a, b, width=BW, fill="black", dash=None):
    if dash:
        x1, y1 = a
        x2, y2 = b
        total = ((x2 - x1) ** 2 + (y2 - y1) ** 2) ** 0.5
        n = max(int(total / dash), 1)
        for i in range(0, n, 2):
            t0, t1 = i / n, min((i + 1) / n, 1.0)
            d.line([(x1 + (x2 - x1) * t0, y1 + (y2 - y1) * t0),
                    (x1 + (x2 - x1) * t1, y1 + (y2 - y1) * t1)],
                   fill=fill, width=width * S)
    else:
        d.line([a, b], fill=fill, width=width * S)


def arrow_head(d, tip, direction=(1, 0), size=14, filled=True):
    """Menggambar kepala panah di ujung `tip`."""
    tx, ty = tip
    dx, dy = direction
    bx, by = tx - dx * size, ty - dy * size
    px, py = -dy * size * 0.45, dx * size * 0.45
    pts = [(tx, ty), (bx + px, by + py), (bx - px, by - py)]
    if filled:
        d.polygon(pts, fill="black")
    else:
        d.line([pts[0], pts[1], pts[2], pts[0]], fill="black", width=BW * S)


def text(d, xy, s, size=13, anchor="mm"):
    d.text(xy, s, font=_font(size), fill="black", anchor=anchor)


# ---------------------------------------------------------------- Use Case
def aktor():
    img, d = new_canvas()
    r = 13
    d.ellipse([100 - r, 18 - r, 100 + r, 18 + r], outline="black", width=BW * S)
    line(d, (100, 31), (100, 70))
    line(d, (70, 46), (130, 46))
    line(d, (100, 70), (76, 96))
    line(d, (100, 70), (124, 96))
    return save(img, "usecase-aktor")


def usecase():
    img, d = new_canvas()
    d.ellipse([22, 22, 178, 88], outline="black", width=BW * S)
    return save(img, "usecase-usecase")


def association():
    img, d = new_canvas()
    line(d, (25, 55), (175, 55))
    return save(img, "usecase-association")


def generalization_uc():
    img, d = new_canvas()
    line(d, (25, 55), (120, 55))
    d.polygon([(120, 34), (120, 76), (170, 55)], outline="black", fill="white",
              width=BW * S)
    return save(img, "usecase-generalization")


def include_uc():
    img, d = new_canvas()
    line(d, (25, 62), (160, 62), dash=11)
    arrow_head(d, (168, 62), size=16)
    text(d, (100, 32), "\u00abinclude\u00bb", size=14)
    return save(img, "usecase-include")


def extend_uc():
    img, d = new_canvas()
    line(d, (25, 62), (160, 62), dash=11)
    arrow_head(d, (168, 62), size=16)
    text(d, (100, 32), "\u00abextend\u00bb", size=14)
    return save(img, "usecase-extend")


# ------------------------------------------------------------ Class Diagram
def kelas():
    img, d = new_canvas()
    d.rectangle([26, 14, 174, 96], outline="black", fill="white", width=BW * S)
    line(d, (26, 44), (174, 44))
    line(d, (26, 72), (174, 72))
    text(d, (100, 29), "Nama Kelas", size=13)
    text(d, (100, 58), "atribut", size=12)
    text(d, (100, 84), "metode()", size=12)
    return save(img, "class-kelas")


def asosiasi():
    img, d = new_canvas()
    line(d, (25, 55), (175, 55))
    return save(img, "class-asosiasi")


def asosiasi_berarah():
    img, d = new_canvas()
    line(d, (25, 55), (156, 55))
    arrow_head(d, (172, 55), size=16)
    return save(img, "class-asosiasi-berarah")


def generalisasi_cls():
    img, d = new_canvas()
    line(d, (25, 55), (120, 55))
    d.polygon([(120, 34), (120, 76), (170, 55)], outline="black", fill="white",
              width=BW * S)
    return save(img, "class-generalisasi")


def dependensi():
    img, d = new_canvas()
    line(d, (25, 55), (150, 55), dash=11)
    arrow_head(d, (172, 55), size=17, filled=False)
    return save(img, "class-dependensi")


def agragasi():
    img, d = new_canvas()
    line(d, (70, 55), (175, 55))
    d.polygon([(70, 55), (52, 38), (34, 55), (52, 72)],
              outline="black", fill="white", width=BW * S)
    return save(img, "class-agragasi")


def multiplisitas():
    img, d = new_canvas()
    line(d, (40, 55), (160, 55))
    text(d, (30, 38), "1", size=14)
    text(d, (170, 38), "0..*", size=14)
    return save(img, "class-multiplisitas")


# --------------------------------------------------------- Activity Diagram
def start_point():
    img, d = new_canvas()
    d.ellipse([82, 37, 118, 73], fill="black")
    return save(img, "activity-start")


def activity_box():
    img, d = new_canvas()
    d.rounded_rectangle([30, 38, 170, 72], radius=16, outline="black",
                        fill="white", width=BW * S)
    return save(img, "activity-activity")


def join_fork():
    img, d = new_canvas()
    d.rectangle([88, 18, 112, 92], fill="black")
    return save(img, "activity-join")


def decision():
    img, d = new_canvas()
    d.polygon([(100, 20), (172, 55), (100, 90), (28, 55)],
              outline="black", fill="white", width=BW * S)
    return save(img, "activity-decision")


def swimlane():
    img, d = new_canvas()
    d.rectangle([18, 14, 182, 96], outline="black", fill="white", width=BW * S)
    line(d, (100, 14), (100, 96))
    line(d, (18, 38), (182, 38))
    d.rectangle([42, 50, 78, 78], outline="black", fill="white", width=BW * S)
    return save(img, "activity-swimlane")


def finish_point():
    img, d = new_canvas()
    d.ellipse([76, 31, 124, 79], outline="black", fill="white", width=BW * S)
    d.ellipse([90, 45, 110, 65], fill="black")
    return save(img, "activity-finish")


# --------------------------------------------------------- Sequence Diagram
def lifeline():
    img, d = new_canvas()
    d.rectangle([64, 16, 136, 46], outline="black", fill="white", width=BW * S)
    line(d, (100, 46), (100, 100), dash=11)
    return save(img, "sequence-lifeline")


def control_obj():
    img, d = new_canvas()
    d.rectangle([62, 30, 138, 80], outline="black", fill="white", width=BW * S)
    d.ellipse([70, 38, 86, 54], outline="black", width=BW * S)
    line(d, (78, 54), (78, 72))
    arrow_head(d, (100, 46), size=12)
    line(d, (86, 46), (94, 46))
    return save(img, "sequence-control")


def boundary_obj():
    img, d = new_canvas()
    d.ellipse([78, 24, 122, 68], outline="black", fill="white", width=BW * S)
    line(d, (100, 24), (100, 96))
    return save(img, "sequence-boundary")


def entity_obj():
    img, d = new_canvas()
    d.ellipse([78, 20, 122, 64], outline="black", fill="white", width=BW * S)
    line(d, (36, 64), (164, 64))
    return save(img, "sequence-entity")


def activation():
    img, d = new_canvas()
    d.rectangle([84, 16, 116, 94], outline="black", fill="white", width=BW * S)
    return save(img, "sequence-activation")


def message():
    img, d = new_canvas()
    line(d, (25, 55), (156, 55))
    arrow_head(d, (172, 55), size=16)
    text(d, (95, 30), "pesan()", size=13)
    return save(img, "sequence-message")


# ------------------------------------------------------------------- ERD
def entitas():
    img, d = new_canvas()
    d.rectangle([30, 32, 170, 78], outline="black", fill="white", width=BW * S)
    text(d, (100, 55), "Entitas", size=14)
    return save(img, "erd-entitas")


def atribut():
    img, d = new_canvas()
    d.ellipse([24, 30, 176, 80], outline="black", fill="white", width=BW * S)
    return save(img, "erd-atribut")


def relasi():
    img, d = new_canvas()
    d.polygon([(100, 22), (172, 55), (100, 88), (28, 55)],
              outline="black", fill="white", width=BW * S)
    return save(img, "erd-relasi")


def garis():
    img, d = new_canvas()
    line(d, (25, 55), (175, 55))
    return save(img, "erd-garis")


def kardinalitas():
    img, d = new_canvas()
    line(d, (40, 55), (140, 55))
    text(d, (28, 36), "1", size=15)
    # crow's foot
    line(d, (140, 55), (172, 32))
    line(d, (140, 55), (172, 55))
    line(d, (140, 55), (172, 78))
    text(d, (178, 36), "N", size=15)
    return save(img, "erd-kardinalitas")


ALL = [
    aktor, usecase, association, generalization_uc, include_uc, extend_uc,
    kelas, asosiasi, asosiasi_berarah, generalisasi_cls, dependensi, agragasi,
    multiplisitas,
    start_point, activity_box, join_fork, decision, swimlane, finish_point,
    lifeline, control_obj, boundary_obj, entity_obj, activation, message,
    entitas, atribut, relasi, garis, kardinalitas,
]

if __name__ == "__main__":
    for fn in ALL:
        print(fn())
    print("\nTotal", len(ALL), "simbol ->", OUT)
