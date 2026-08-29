#!/usr/bin/env python3
"""Konversi draf laporan (Markdown) ke PDF dengan format Buku Panduan KP UNSIQ.

Format: A4, margin atas 4 cm / bawah 3 cm / kiri 4 cm / kanan 3 cm,
Times 12 pt, spasi 1,5, rata kiri-kanan.
"""

import re
import sys
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import cm
from reportlab.platypus import (
    BaseDocTemplate, Frame, KeepTogether, ListFlowable, ListItem,
    PageTemplate, Paragraph, Preformatted, Spacer, Table, TableStyle,
)

MARGIN_TOP = 4 * cm
MARGIN_BOTTOM = 3 * cm
MARGIN_LEFT = 4 * cm
MARGIN_RIGHT = 3 * cm

S_BODY = ParagraphStyle("Body", fontName="Times-Roman", fontSize=12, leading=18,
                        alignment=TA_JUSTIFY, spaceAfter=6)
S_BAB = ParagraphStyle("Bab", fontName="Times-Bold", fontSize=12, leading=18,
                       alignment=TA_CENTER, spaceAfter=4)
S_H2 = ParagraphStyle("H2", fontName="Times-Bold", fontSize=12, leading=18,
                      alignment=TA_JUSTIFY, spaceBefore=6, spaceAfter=6)
S_H3 = ParagraphStyle("H3", fontName="Times-Bold", fontSize=12, leading=18,
                      alignment=TA_JUSTIFY, spaceBefore=6, spaceAfter=6)
S_CAP = ParagraphStyle("Cap", fontName="Times-Roman", fontSize=12, leading=18,
                       alignment=TA_CENTER, spaceAfter=2)
S_SRC = ParagraphStyle("Src", fontName="Times-Roman", fontSize=10, leading=14,
                       alignment=TA_CENTER, spaceAfter=10)
S_GRUP = ParagraphStyle("Grup", fontName="Times-Bold", fontSize=12, leading=18,
                        spaceBefore=6, spaceAfter=6)
S_PUSTAKA = ParagraphStyle("Pustaka", fontName="Times-Roman", fontSize=12, leading=18,
                           alignment=TA_JUSTIFY, leftIndent=1.25 * cm,
                           firstLineIndent=-1.25 * cm, spaceAfter=6)
S_TD = ParagraphStyle("TD", fontName="Times-Roman", fontSize=10, leading=13)
S_TDH = ParagraphStyle("TDH", fontName="Times-Bold", fontSize=10, leading=13)
S_CODE = ParagraphStyle("Code", fontName="Courier", fontSize=9, leading=11)
S_BULLET = ParagraphStyle("Bullet", parent=S_BODY, leftIndent=1 * cm,
                          bulletIndent=0.3 * cm, spaceAfter=3)


def esc(text):
    return (text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;"))


OPEN = {
    "***": "<b><i>",
    "**": "<b>",
    "*": "<i>",
    "`": '<font face="Courier" size="10">',
}
CLOSE = {
    "***": "</i></b>",
    "**": "</b>",
    "*": "</i>",
    "`": "</font>",
}


def inline(text):
    """Ubah **tebal**, *miring*, dan `kode` menjadi tag ReportLab.

    Memakai tumpukan (stack) agar penanda yang bersarang, misalnya
    **model *Waterfall***, menghasilkan tag yang berpasangan dengan benar.
    """
    text = esc(text)
    tokens = re.split(r"(\*\*\*|\*\*|\*|`)", text)
    stack, out = [], []
    for tok in tokens:
        if tok in OPEN:
            if stack and stack[-1] == tok:
                stack.pop()
                out.append(CLOSE[tok])
            elif tok in stack:
                while stack and stack[-1] != tok:
                    out.append(CLOSE[stack.pop()])
                if stack and stack[-1] == tok:
                    stack.pop()
                    out.append(CLOSE[tok])
            else:
                stack.append(tok)
                out.append(OPEN[tok])
        else:
            out.append(tok)
    while stack:
        out.append(CLOSE[stack.pop()])
    result = "".join(out)
    return re.sub(r"(?:<b></b>|<i></i>|<font[^>]*></font>)", "", result)


def split_row(line):
    return [c.strip() for c in line.strip().strip("|").split("|")]


def build_table(rows, story, caption=None, source=None):
    if caption:
        story.append(Paragraph(esc(caption), S_CAP))
    header, body = rows[0], rows[1:]
    data = [[Paragraph(inline(c), S_TDH) for c in header]]
    for row in body:
        data.append([Paragraph(inline(c), S_TD) for c in row])

    avail = A4[0] - MARGIN_LEFT - MARGIN_RIGHT
    table = Table(data, colWidths=[avail / len(header)] * len(header), repeatRows=1)
    table.setStyle(TableStyle([
        ("GRID", (0, 0), (-1, -1), 0.5, colors.black),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#E8E8E8")),
        ("LEFTPADDING", (0, 0), (-1, -1), 4),
        ("RIGHTPADDING", (0, 0), (-1, -1), 4),
        ("TOPPADDING", (0, 0), (-1, -1), 3),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
    ]))
    story.append(table)
    if source:
        story.append(Spacer(1, 4))
        story.append(Paragraph("Sumber: " + esc(source), S_SRC))
    else:
        story.append(Spacer(1, 10))


def convert(md_path: Path, out_path: Path):
    lines = md_path.read_text(encoding="utf-8").splitlines()
    story = []

    i = 0
    in_code = False
    code_buf = []
    table_buf = []
    pending_caption = None
    pending_source = None

    def flush_table():
        nonlocal table_buf, pending_caption, pending_source
        if table_buf:
            build_table(table_buf, story, pending_caption, pending_source)
            table_buf = []
            pending_caption = None
            pending_source = None

    def flush_code():
        nonlocal code_buf
        if code_buf:
            story.append(Spacer(1, 4))
            story.append(Preformatted("\n".join(code_buf), S_CODE))
            story.append(Spacer(1, 8))
            code_buf = []

    while i < len(lines):
        line = lines[i]
        s = line.strip()

        if s.startswith("```"):
            flush_table()
            if in_code:
                flush_code()
                in_code = False
            else:
                in_code = True
                code_buf = []
            i += 1
            continue

        if in_code:
            code_buf.append(line.rstrip())
            i += 1
            continue

        if s.startswith("@@TABEL "):
            pending_caption = s[8:].strip()
            i += 1
            continue

        if s.startswith("@@SUMBER "):
            pending_source = s[9:].strip()
            i += 1
            continue

        if s.startswith("|") and s.endswith("|"):
            cells = split_row(s)
            if all(re.fullmatch(r":?-{2,}:?", c) for c in cells if c):
                i += 1
                continue
            table_buf.append(cells)
            i += 1
            continue

        flush_table()

        if s in ("---", "***", "___") or not s:
            i += 1
            continue

        if s.startswith("@@GRUP "):
            story.append(Paragraph(esc(s[7:].strip()), S_GRUP))
            i += 1
            continue

        if s.startswith("@@PUSTAKA "):
            story.append(Paragraph(inline(s[10:].strip()), S_PUSTAKA))
            i += 1
            continue

        m = re.match(r"^(#{1,6})\s+(.*)$", s)
        if m:
            level, text = len(m.group(1)), m.group(2).strip()
            if level == 1:
                story.append(Paragraph(esc(text.upper()), S_BAB))
            elif level == 2:
                story.append(Paragraph(esc(text), S_H2))
            else:
                story.append(Paragraph(esc(text), S_H3))
            i += 1
            continue

        m = re.match(r"^[-*+]\s+(.*)$", s)
        if m:
            items = []
            while i < len(lines) and re.match(r"^\s*[-*+]\s+", lines[i]):
                items.append(ListItem(Paragraph(inline(lines[i].strip()[2:].strip()),
                                                S_BULLET), leftIndent=1 * cm))
                i += 1
            story.append(ListFlowable(items, bulletType="bullet", start="-",
                                      leftIndent=1 * cm, bulletFontSize=10))
            story.append(Spacer(1, 4))
            continue

        story.append(Paragraph(inline(s), S_BODY))
        i += 1

    flush_table()
    flush_code()

    def footer(canvas, doc):
        canvas.saveState()
        canvas.setFont("Times-Roman", 11)
        canvas.drawRightString(A4[0] - MARGIN_RIGHT, MARGIN_BOTTOM - 1.2 * cm,
                               str(canvas.getPageNumber()))
        canvas.restoreState()

    doc = BaseDocTemplate(str(out_path), pagesize=A4,
                          leftMargin=MARGIN_LEFT, rightMargin=MARGIN_RIGHT,
                          topMargin=MARGIN_TOP, bottomMargin=MARGIN_BOTTOM,
                          title=out_path.stem)
    frame = Frame(MARGIN_LEFT, MARGIN_BOTTOM,
                  A4[0] - MARGIN_LEFT - MARGIN_RIGHT,
                  A4[1] - MARGIN_TOP - MARGIN_BOTTOM, id="body")
    doc.addPageTemplates([PageTemplate(id="utama", frames=[frame], onPage=footer)])
    doc.build(story)
    print(f"Tersimpan: {out_path}")


if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Gunakan: python md_to_pdf.py <berkas.md> <berkas.pdf>")
        sys.exit(1)
    convert(Path(sys.argv[1]), Path(sys.argv[2]))
