#!/usr/bin/env python3
"""Konversi draf laporan (Markdown) ke .docx dengan format akademik Indonesia.

Format yang diterapkan:
- Times New Roman 12 pt, spasi 1,5
- Margin: kiri 4 cm, kanan 3 cm, atas 3 cm, bawah 3 cm
- Judul bab (H1) rata tengah, kapital, tebal
- Sub-bab (H2/H3) rata kiri, tebal
- Tabel bergaris (Table Grid)
- Blok kode dengan font monospace
"""

import re
import sys
from pathlib import Path

from docx import Document
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Cm, Pt, RGBColor


def set_base_style(document):
    style = document.styles["Normal"]
    style.font.name = "Times New Roman"
    style.font.size = Pt(12)
    style.font.color.rgb = RGBColor(0, 0, 0)
    rpr = style.element.get_or_add_rPr()
    rfonts = rpr.get_or_add_rFonts()
    rfonts.set(qn("w:eastAsia"), "Times New Roman")
    rfonts.set(qn("w:cs"), "Times New Roman")
    pf = style.paragraph_format
    pf.line_spacing = 1.5
    pf.space_after = Pt(6)


def set_margins(document):
    for section in document.sections:
        section.left_margin = Cm(4)
        section.right_margin = Cm(3)
        section.top_margin = Cm(4)
        section.bottom_margin = Cm(3)


def shade_cell(cell, color="D9D9D9"):
    tcpr = cell._tc.get_or_add_tcPr()
    shd = OxmlElement("w:shd")
    shd.set(qn("w:val"), "clear")
    shd.set(qn("w:fill"), color)
    tcpr.append(shd)


INLINE = re.compile(r"(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)")


def add_runs(paragraph, text, base_size=12, bold=False, italic=False, mono=False):
    """Tulis teks dengan penanganan **tebal**, *miring*, dan `kode`."""
    font_name = "Consolas" if mono else "Times New Roman"
    for chunk in INLINE.split(text):
        if not chunk:
            continue
        if chunk.startswith("**") and chunk.endswith("**") and len(chunk) > 4:
            run = paragraph.add_run(chunk[2:-2])
            run.bold = True
        elif chunk.startswith("`") and chunk.endswith("`") and len(chunk) > 2:
            run = paragraph.add_run(chunk[1:-1])
            run.font.name = "Consolas"
            run.font.size = Pt(base_size - 1)
        elif chunk.startswith("*") and chunk.endswith("*") and len(chunk) > 2:
            run = paragraph.add_run(chunk[1:-1])
            run.italic = True
        else:
            run = paragraph.add_run(chunk)
        run.font.name = font_name
        if not (chunk.startswith("`") and chunk.endswith("`")):
            run.font.size = Pt(base_size)
        if bold:
            run.bold = True
        if italic and not (chunk.startswith("*") and chunk.endswith("*")):
            run.italic = True
        for r in (run,):
            rpr = r._element.get_or_add_rPr()
            rf = rpr.get_or_add_rFonts()
            rf.set(qn("w:eastAsia"), font_name)
    return paragraph


def add_paragraph(document, text, size=12, bold=False, italic=False,
                  align=None, mono=False, space_after=6):
    p = document.add_paragraph()
    if align is not None:
        p.alignment = align
    p.paragraph_format.line_spacing = 1.5
    p.paragraph_format.space_after = Pt(space_after)
    if text.strip() == "":
        return p
    add_runs(p, text.strip(), base_size=size, bold=bold, italic=italic, mono=mono)
    return p


def add_bullet(document, text, level=0):
    p = document.add_paragraph(style="List Bullet")
    p.paragraph_format.left_indent = Cm(1.0 + 0.6 * level)
    p.paragraph_format.line_spacing = 1.5
    p.paragraph_format.space_after = Pt(3)
    add_runs(p, text.strip())
    return p


def add_numbered(document, text):
    p = document.add_paragraph(style="List Number")
    p.paragraph_format.left_indent = Cm(1.0)
    p.paragraph_format.line_spacing = 1.5
    p.paragraph_format.space_after = Pt(3)
    add_runs(p, text.strip())
    return p


BASE_DIR = Path.cwd()   # direktori acuan untuk path gambar relatif


def split_row(line):
    cells = [c.strip() for c in line.strip().strip("|").split("|")]
    return cells


def add_table(document, rows):
    header, body = rows[0], rows[1:]
    table = document.add_table(rows=1, cols=len(header))
    table.style = "Table Grid"
    table.alignment = WD_TABLE_ALIGNMENT.CENTER

    hdr = table.rows[0].cells
    for i, text in enumerate(header):
        hdr[i].text = ""
        para = hdr[i].paragraphs[0]
        para.paragraph_format.line_spacing = 1.0
        para.paragraph_format.space_after = Pt(2)
        add_runs(para, text, base_size=10, bold=True)
        shade_cell(hdr[i])

    for row in body:
        cells = table.add_row().cells
        for i, text in enumerate(row):
            if i >= len(cells):
                break
            cells[i].text = ""
            para = cells[i].paragraphs[0]
            para.paragraph_format.line_spacing = 1.0
            para.paragraph_format.space_after = Pt(2)
            if text.startswith("@@IMG:"):
                rel = text.split(":", 1)[1].strip()
                cand = Path(rel)
                path = cand if cand.is_absolute() else (BASE_DIR / rel)
                if not path.exists():
                    path = BASE_DIR / "docs" / rel
                para.alignment = WD_ALIGN_PARAGRAPH.CENTER
                if path.exists():
                    para.add_run().add_picture(str(path), width=Cm(1.9))
                else:
                    add_runs(para, f"[{rel}]", base_size=9)
            else:
                add_runs(para, text, base_size=10)

    document.add_paragraph().paragraph_format.space_after = Pt(4)
    return table


def convert(md_path: Path, out_path: Path, title_lines_centered=True):
    global BASE_DIR
    BASE_DIR = Path(md_path).resolve().parent
    lines = md_path.read_text(encoding="utf-8").splitlines()
    doc = Document()
    set_base_style(doc)
    set_margins(doc)

    i = 0
    in_code = False
    code_buffer = []
    table_buffer = []

    def flush_table():
        nonlocal table_buffer
        if table_buffer:
            add_table(doc, table_buffer)
            table_buffer = []

    def flush_code():
        nonlocal code_buffer
        if code_buffer:
            text = "\n".join(code_buffer)
            p = doc.add_paragraph()
            p.paragraph_format.left_indent = Cm(1.0)
            p.paragraph_format.line_spacing = 1.0
            p.paragraph_format.space_after = Pt(6)
            add_runs(p, text, base_size=10, mono=True)
            code_buffer = []

    while i < len(lines):
        line = lines[i]
        stripped = line.strip()

        # Blok kode
        if stripped.startswith("```"):
            flush_table()
            if in_code:
                flush_code()
                in_code = False
            else:
                in_code = True
                code_buffer = []
            i += 1
            continue

        if in_code:
            code_buffer.append(line.rstrip())
            i += 1
            continue

        # Tabel
        if stripped.startswith("|") and stripped.endswith("|"):
            cells = split_row(stripped)
            if all(re.fullmatch(r":?-{2,}:?", c) for c in cells if c):
                i += 1
                continue
            table_buffer.append(cells)
            i += 1
            continue

        flush_table()

        # Penanda khusus format UNSIQ
        if stripped.startswith("@@TABEL "):
            add_paragraph(doc, stripped[8:].strip(), size=12,
                          align=WD_ALIGN_PARAGRAPH.CENTER, space_after=2)
            i += 1
            continue

        if stripped.startswith("@@SUMBER "):
            add_paragraph(doc, "Sumber: " + stripped[9:].strip(), size=10,
                          align=WD_ALIGN_PARAGRAPH.CENTER, space_after=8)
            i += 1
            continue

        if stripped.startswith("@@GRUP "):
            add_paragraph(doc, stripped[7:].strip(), size=12, bold=True, space_after=6)
            i += 1
            continue

        if stripped.startswith("@@PUSTAKA "):
            p = doc.add_paragraph()
            p.paragraph_format.left_indent = Cm(1.25)
            p.paragraph_format.first_line_indent = Cm(-1.25)
            p.paragraph_format.line_spacing = 1.5
            p.paragraph_format.space_after = Pt(0)
            p.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
            add_runs(p, stripped[10:].strip())
            i += 1
            continue

        # Garis pemisah
        if stripped in ("---", "***", "___"):
            i += 1
            continue

        # Kosong
        if not stripped:
            i += 1
            continue

        # Heading
        m = re.match(r"^(#{1,6})\s+(.*)$", stripped)
        if m:
            level = len(m.group(1))
            text = m.group(2).strip()
            if level == 1:
                add_paragraph(doc, text.upper(), size=12, bold=True,
                              align=WD_ALIGN_PARAGRAPH.CENTER, space_after=10)
            elif level == 2:
                add_paragraph(doc, text, size=12, bold=True, space_after=6)
            elif level == 3:
                add_paragraph(doc, text, size=12, bold=True, space_after=6)
            else:
                add_paragraph(doc, text, size=12, bold=True, italic=True, space_after=4)
            i += 1
            continue

        # Kutipan / catatan
        if stripped.startswith(">"):
            text = stripped.lstrip(">").strip()
            if text:
                p = doc.add_paragraph()
                p.paragraph_format.left_indent = Cm(1.0)
                p.paragraph_format.line_spacing = 1.5
                add_runs(p, text, base_size=11, italic=True)
                p.runs[0].font.color.rgb = RGBColor(0x33, 0x33, 0x33)
            i += 1
            continue

        # Daftar berbutir
        m = re.match(r"^(\s*)[-*+]\s+(.*)$", line)
        if m:
            indent = len(m.group(1))
            add_bullet(doc, m.group(2), level=min(indent // 2, 3))
            i += 1
            continue

        # Daftar bernomor
        m = re.match(r"^\s*\d+[.)]\s+(.*)$", line)
        if m:
            add_numbered(doc, m.group(1))
            i += 1
            continue

        # Paragraf biasa
        add_paragraph(doc, stripped, align=WD_ALIGN_PARAGRAPH.JUSTIFY)
        i += 1

    flush_table()
    flush_code()
    doc.save(str(out_path))
    print(f"Tersimpan: {out_path}")


if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Gunakan: python md_to_docx.py <berkas.md> <berkas.docx>")
        sys.exit(1)
    convert(Path(sys.argv[1]), Path(sys.argv[2]))
