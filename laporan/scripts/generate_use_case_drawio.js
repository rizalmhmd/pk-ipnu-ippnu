import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function escapeXml(unsafe) {
    if (!unsafe) return '';
    return unsafe
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

const SYSTEM_TITLE = "Sistem Informasi PKPT IPNU IPPNU UNSIQ";
const FONT = "fontFamily=Times New Roman;";
const ACTOR_STYLE = `shape=umlActor;verticalLabelPosition=bottom;verticalAlign=top;html=1;outlineConnect=0;strokeColor=#000000;strokeWidth=1.5;fillColor=#ffffff;${FONT}fontSize=12;fontColor=#000000;`;
const UC_STYLE = `ellipse;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#000000;strokeWidth=1.3;${FONT}fontSize=12;fontColor=#000000;`;
const SUB_UC_STYLE = `ellipse;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#000000;strokeWidth=1.3;${FONT}fontSize=12;fontColor=#000000;`;
const BOUNDARY_STYLE = `rounded=0;whiteSpace=wrap;html=1;verticalAlign=top;fontStyle=1;fontSize=13;${FONT}fillColor=none;strokeColor=#000000;strokeWidth=1.5;spacingTop=10;fontColor=#000000;dashed=0;`;
const ASSOC_EDGE = `edgeStyle=none;html=1;endArrow=none;strokeColor=#000000;strokeWidth=1.2;`;
const INCLUDE_EDGE = `edgeStyle=none;html=1;dashed=1;endArrow=open;endSize=6;strokeColor=#000000;strokeWidth=1.2;${FONT}fontSize=10;fontColor=#000000;`;
const CAPTION_STYLE = `text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;${FONT}fontSize=14;fontStyle=1;fontColor=#000000;`;

function generateAllInOneXml() {
    let xml = '';

    // =============================================================
    // 1. GAMBAR 4.1 USE CASE ADMIN
    // =============================================================
    xml += `        <!-- Kotak Batas Sistem Admin -->\n`;
    xml += `        <mxCell id="box_admin" value="${escapeXml(SYSTEM_TITLE)}" style="${BOUNDARY_STYLE}" vertex="1" parent="1">\n`;
    xml += `          <mxGeometry x="200" y="25" width="460" height="440" as="geometry" />\n`;
    xml += `        </mxCell>\n\n`;

    xml += `        <!-- Aktor Admin (Di Luar Kotak Sebelah Kiri) -->\n`;
    xml += `        <mxCell id="act_admin" value="Admin" style="${ACTOR_STYLE}" vertex="1" parent="1">\n`;
    xml += `          <mxGeometry x="80" y="230" width="40" height="80" as="geometry" />\n`;
    xml += `        </mxCell>\n\n`;

    // 6 Elips Admin (Di Dalam Kotak)
    const adminUcs = [
        { id: "adm_uc1", val: "Login", y: 60, w: 160 },
        { id: "adm_uc2", val: "Lihat Dashboard Admin", y: 130, w: 160 },
        { id: "adm_uc3", val: "Kelola Data Master (CRUD)", y: 200, w: 170 },
        { id: "adm_uc4", val: "Kelola Pengguna (User)", y: 270, w: 160 },
        { id: "adm_uc5", val: "Kelola Pengaturan Situs", y: 340, w: 160 },
        { id: "adm_uc6", val: "Logout", y: 410, w: 160 }
    ];
    adminUcs.forEach(uc => {
        xml += `        <mxCell id="${uc.id}" value="${escapeXml(uc.val)}" style="${UC_STYLE}" vertex="1" parent="1">\n`;
        xml += `          <mxGeometry x="240" y="${uc.y}" width="${uc.w}" height="42" as="geometry" />\n`;
        xml += `        </mxCell>\n`;
        xml += `        <mxCell id="e_${uc.id}" style="${ASSOC_EDGE}" edge="1" parent="1" source="act_admin" target="${uc.id}"><mxGeometry relative="1" as="geometry" /></mxCell>\n`;
    });

    // 3 Sub-Elips Admin (Di Dalam Kotak)
    const adminSubs = [
        { id: "adm_sub1", val: "Data Anggota", y: 145 },
        { id: "adm_sub2", val: "Agenda Kegiatan", y: 202 },
        { id: "adm_sub3", val: "Berita &amp; Artikel", y: 260 }
    ];
    adminSubs.forEach(sub => {
        xml += `        <mxCell id="${sub.id}" value="${sub.val}" style="${SUB_UC_STYLE}" vertex="1" parent="1">\n`;
        xml += `          <mxGeometry x="490" y="${sub.y}" width="140" height="38" as="geometry" />\n`;
        xml += `        </mxCell>\n`;
        xml += `        <mxCell id="ext_${sub.id}" value="&amp;lt;&amp;lt;include&amp;gt;&amp;gt;" style="${INCLUDE_EDGE}" edge="1" parent="1" source="adm_uc3" target="${sub.id}"><mxGeometry relative="1" as="geometry" /></mxCell>\n`;
    });

    xml += `        <mxCell id="cap_4_1" value="Gambar 4.1 Use Case Admin" style="${CAPTION_STYLE}" vertex="1" parent="1">\n`;
    xml += `          <mxGeometry x="180" y="480" width="350" height="30" as="geometry" />\n`;
    xml += `        </mxCell>\n\n`;

    // =============================================================
    // 2. GAMBAR 4.2 USE CASE KETUA IPNU / IPPNU
    // =============================================================
    xml += `        <!-- Kotak Batas Sistem Ketua IPNU/IPPNU -->\n`;
    xml += `        <mxCell id="box_ketua" value="${escapeXml(SYSTEM_TITLE)}" style="${BOUNDARY_STYLE}" vertex="1" parent="1">\n`;
    xml += `          <mxGeometry x="910" y="25" width="480" height="440" as="geometry" />\n`;
    xml += `        </mxCell>\n\n`;

    xml += `        <!-- Aktor Ketua (Di Luar Kotak Sebelah Kiri) -->\n`;
    xml += `        <mxCell id="act_ketua" value="Ketua IPNU/IPPNU" style="${ACTOR_STYLE}" vertex="1" parent="1">\n`;
    xml += `          <mxGeometry x="780" y="230" width="40" height="80" as="geometry" />\n`;
    xml += `        </mxCell>\n\n`;

    const ketuaUcs = [
        { id: "ket_uc1", val: "Login", y: 60, w: 170 },
        { id: "ket_uc2", val: "Lihat Dashboard", y: 130, w: 170 },
        { id: "ket_uc3", val: "Kelola Kegiatan &amp; Pendaftar", y: 200, w: 180 },
        { id: "ket_uc4", val: "Kelola Data Anggota", y: 270, w: 170 },
        { id: "ket_uc5", val: "Kelola Galeri &amp; Statistik", y: 340, w: 170 },
        { id: "ket_uc6", val: "Logout", y: 410, w: 170 }
    ];
    ketuaUcs.forEach(uc => {
        xml += `        <mxCell id="${uc.id}" value="${uc.val}" style="${UC_STYLE}" vertex="1" parent="1">\n`;
        xml += `          <mxGeometry x="960" y="${uc.y}" width="${uc.w}" height="42" as="geometry" />\n`;
        xml += `        </mxCell>\n`;
        xml += `        <mxCell id="e_${uc.id}" style="${ASSOC_EDGE}" edge="1" parent="1" source="act_ketua" target="${uc.id}"><mxGeometry relative="1" as="geometry" /></mxCell>\n`;
    });

    xml += `        <mxCell id="ket_sub1" value="Agenda Kegiatan" style="${SUB_UC_STYLE}" vertex="1" parent="1"><mxGeometry x="1220" y="145" width="145" height="38" as="geometry" /></mxCell>\n`;
    xml += `        <mxCell id="ket_sub2" value="Verifikasi Pendaftar" style="${SUB_UC_STYLE}" vertex="1" parent="1"><mxGeometry x="1220" y="202" width="145" height="38" as="geometry" /></mxCell>\n`;
    xml += `        <mxCell id="ket_sub3" value="Sinkronisasi Midtrans" style="${SUB_UC_STYLE}" vertex="1" parent="1"><mxGeometry x="1220" y="260" width="145" height="38" as="geometry" /></mxCell>\n`;

    xml += `        <mxCell id="ext_ket_1" value="&amp;lt;&amp;lt;include&amp;gt;&amp;gt;" style="${INCLUDE_EDGE}" edge="1" parent="1" source="ket_uc3" target="ket_sub1"><mxGeometry relative="1" as="geometry" /></mxCell>\n`;
    xml += `        <mxCell id="ext_ket_2" value="&amp;lt;&amp;lt;include&amp;gt;&amp;gt;" style="${INCLUDE_EDGE}" edge="1" parent="1" source="ket_uc3" target="ket_sub2"><mxGeometry relative="1" as="geometry" /></mxCell>\n`;
    xml += `        <mxCell id="ext_ket_3" value="&amp;lt;&amp;lt;extend&amp;gt;&amp;gt;" style="${INCLUDE_EDGE}" edge="1" parent="1" source="ket_sub3" target="ket_uc3"><mxGeometry relative="1" as="geometry" /></mxCell>\n`;

    xml += `        <mxCell id="cap_4_2" value="Gambar 4.2 Use Case Ketua IPNU/IPPNU" style="${CAPTION_STYLE}" vertex="1" parent="1">\n`;
    xml += `          <mxGeometry x="900" y="480" width="350" height="30" as="geometry" />\n`;
    xml += `        </mxCell>\n\n`;

    // =============================================================
    // 3. GAMBAR 4.3 USE CASE KETUA DEPARTEMEN
    // =============================================================
    xml += `        <!-- Kotak Batas Sistem Ketua Departemen -->\n`;
    xml += `        <mxCell id="box_dept" value="${escapeXml(SYSTEM_TITLE)}" style="${BOUNDARY_STYLE}" vertex="1" parent="1">\n`;
    xml += `          <mxGeometry x="200" y="565" width="460" height="440" as="geometry" />\n`;
    xml += `        </mxCell>\n\n`;

    xml += `        <!-- Aktor Ketua Departemen (Di Luar Kotak Sebelah Kiri) -->\n`;
    xml += `        <mxCell id="act_dept" value="Ketua Departemen" style="${ACTOR_STYLE}" vertex="1" parent="1">\n`;
    xml += `          <mxGeometry x="80" y="770" width="40" height="80" as="geometry" />\n`;
    xml += `        </mxCell>\n\n`;

    const deptUcs = [
        { id: "dep_uc1", val: "Login", y: 600, w: 170 },
        { id: "dep_uc2", val: "Lihat Dashboard", y: 670, w: 170 },
        { id: "dep_uc3", val: "Kelola Publikasi Konten", y: 740, w: 170 },
        { id: "dep_uc4", val: "Kelola Quotes", y: 810, w: 170 },
        { id: "dep_uc5", val: "Kelola Profil Akun", y: 880, w: 170 },
        { id: "dep_uc6", val: "Logout", y: 950, w: 170 }
    ];
    deptUcs.forEach(uc => {
        xml += `        <mxCell id="${uc.id}" value="${uc.val}" style="${UC_STYLE}" vertex="1" parent="1">\n`;
        xml += `          <mxGeometry x="240" y="${uc.y}" width="${uc.w}" height="42" as="geometry" />\n`;
        xml += `        </mxCell>\n`;
        xml += `        <mxCell id="e_${uc.id}" style="${ASSOC_EDGE}" edge="1" parent="1" source="act_dept" target="${uc.id}"><mxGeometry relative="1" as="geometry" /></mxCell>\n`;
    });

    const deptSubs = [
        { id: "dep_sub1", val: "Berita Organisasi", y: 685 },
        { id: "dep_sub2", val: "Artikel Opini / Kader", y: 742 },
        { id: "dep_sub3", val: "Kategori Konten", y: 800 }
    ];
    deptSubs.forEach(sub => {
        xml += `        <mxCell id="${sub.id}" value="${sub.val}" style="${SUB_UC_STYLE}" vertex="1" parent="1">\n`;
        xml += `          <mxGeometry x="490" y="${sub.y}" width="140" height="38" as="geometry" />\n`;
        xml += `        </mxCell>\n`;
        xml += `        <mxCell id="ext_${sub.id}" value="&amp;lt;&amp;lt;include&amp;gt;&amp;gt;" style="${INCLUDE_EDGE}" edge="1" parent="1" source="dep_uc3" target="${sub.id}"><mxGeometry relative="1" as="geometry" /></mxCell>\n`;
    });

    xml += `        <mxCell id="cap_4_3" value="Gambar 4.3 Use Case Ketua Departemen" style="${CAPTION_STYLE}" vertex="1" parent="1">\n`;
    xml += `          <mxGeometry x="180" y="1020" width="350" height="30" as="geometry" />\n`;
    xml += `        </mxCell>\n\n`;

    // =============================================================
    // 4. GAMBAR 4.4 USE CASE PENGUNJUNG
    // =============================================================
    xml += `        <!-- Kotak Batas Sistem Pengunjung -->\n`;
    xml += `        <mxCell id="box_guest" value="${escapeXml(SYSTEM_TITLE)}" style="${BOUNDARY_STYLE}" vertex="1" parent="1">\n`;
    xml += `          <mxGeometry x="910" y="565" width="480" height="440" as="geometry" />\n`;
    xml += `        </mxCell>\n\n`;

    xml += `        <!-- Aktor Pengunjung (Di Luar Kotak Sebelah Kiri) -->\n`;
    xml += `        <mxCell id="act_guest" value="Pengunjung" style="${ACTOR_STYLE}" vertex="1" parent="1">\n`;
    xml += `          <mxGeometry x="780" y="770" width="40" height="80" as="geometry" />\n`;
    xml += `        </mxCell>\n\n`;

    const guestUcs = [
        { id: "gst_uc1", val: "Melihat Profil Organisasi", y: 600, w: 170 },
        { id: "gst_uc2", val: "Membaca Berita &amp; Artikel", y: 670, w: 170 },
        { id: "gst_uc3", val: "Melihat Galeri &amp; Agenda", y: 740, w: 170 },
        { id: "gst_uc4", val: "Mendaftar Kegiatan", y: 810, w: 170 },
        { id: "gst_uc5", val: "Melakukan Pembayaran", y: 880, w: 170 },
        { id: "gst_uc6", val: "Melihat Bukti &amp; Tiket", y: 950, w: 170 }
    ];
    guestUcs.forEach(uc => {
        xml += `        <mxCell id="${uc.id}" value="${uc.val}" style="${UC_STYLE}" vertex="1" parent="1">\n`;
        xml += `          <mxGeometry x="960" y="${uc.y}" width="${uc.w}" height="42" as="geometry" />\n`;
        xml += `        </mxCell>\n`;
        xml += `        <mxCell id="e_${uc.id}" style="${ASSOC_EDGE}" edge="1" parent="1" source="act_guest" target="${uc.id}"><mxGeometry relative="1" as="geometry" /></mxCell>\n`;
    });

    xml += `        <mxCell id="gst_sub1" value="Tunai / Cash" style="${SUB_UC_STYLE}" vertex="1" parent="1"><mxGeometry x="1220" y="825" width="145" height="38" as="geometry" /></mxCell>\n`;
    xml += `        <mxCell id="gst_sub2" value="Transfer Bank" style="${SUB_UC_STYLE}" vertex="1" parent="1"><mxGeometry x="1220" y="882" width="145" height="38" as="geometry" /></mxCell>\n`;
    xml += `        <mxCell id="gst_sub3" value="Midtrans (QRIS &amp; VA)" style="${SUB_UC_STYLE}" vertex="1" parent="1"><mxGeometry x="1220" y="940" width="145" height="38" as="geometry" /></mxCell>\n`;

    xml += `        <mxCell id="ext_gst_1" value="&amp;lt;&amp;lt;extend&amp;gt;&amp;gt;" style="${INCLUDE_EDGE}" edge="1" parent="1" source="gst_sub1" target="gst_uc5"><mxGeometry relative="1" as="geometry" /></mxCell>\n`;
    xml += `        <mxCell id="ext_gst_2" value="&amp;lt;&amp;lt;extend&amp;gt;&amp;gt;" style="${INCLUDE_EDGE}" edge="1" parent="1" source="gst_sub2" target="gst_uc5"><mxGeometry relative="1" as="geometry" /></mxCell>\n`;
    xml += `        <mxCell id="ext_gst_3" value="&amp;lt;&amp;lt;extend&amp;gt;&amp;gt;" style="${INCLUDE_EDGE}" edge="1" parent="1" source="gst_sub3" target="gst_uc5"><mxGeometry relative="1" as="geometry" /></mxCell>\n`;

    xml += `        <mxCell id="cap_4_4" value="Gambar 4.4 Use Case Pengunjung" style="${CAPTION_STYLE}" vertex="1" parent="1">\n`;
    xml += `          <mxGeometry x="900" y="1020" width="350" height="30" as="geometry" />\n`;
    xml += `        </mxCell>\n`;

    return xml;
}

function generateSingleDiagramXml(type) {
    let xml = '';
    const boxW = 460;
    const boxH = 440;
    const boxX = 200;
    const boxY = 25;

    xml += `        <!-- Kotak Batas Sistem -->\n`;
    xml += `        <mxCell id="sbox" value="${escapeXml(SYSTEM_TITLE)}" style="${BOUNDARY_STYLE}" vertex="1" parent="1">\n`;
    xml += `          <mxGeometry x="${boxX}" y="${boxY}" width="${boxW}" height="${boxH}" as="geometry" />\n`;
    xml += `        </mxCell>\n\n`;

    let actName = "";
    let caption = "";
    let ucs = [];
    let subs = [];
    let isExtend = false;

    if (type === 'admin') {
        actName = "Admin";
        caption = "Gambar 4.1 Use Case Admin";
        ucs = [
            { id: "u1", val: "Login", y: 60, w: 160 },
            { id: "u2", val: "Lihat Dashboard Admin", y: 130, w: 160 },
            { id: "u3", val: "Kelola Data Master (CRUD)", y: 200, w: 170 },
            { id: "u4", val: "Kelola Pengguna (User)", y: 270, w: 160 },
            { id: "u5", val: "Kelola Pengaturan Situs", y: 340, w: 160 },
            { id: "u6", val: "Logout", y: 410, w: 160 }
        ];
        subs = [
            { id: "s1", val: "Data Anggota", y: 145 },
            { id: "s2", val: "Agenda Kegiatan", y: 202 },
            { id: "s3", val: "Berita &amp; Artikel", y: 260 }
        ];
    } else if (type === 'ketua') {
        actName = "Ketua IPNU/IPPNU";
        caption = "Gambar 4.2 Use Case Ketua IPNU/IPPNU";
        ucs = [
            { id: "u1", val: "Login", y: 60, w: 170 },
            { id: "u2", val: "Lihat Dashboard", y: 130, w: 170 },
            { id: "u3", val: "Kelola Kegiatan &amp; Pendaftar", y: 200, w: 180 },
            { id: "u4", val: "Kelola Data Anggota", y: 270, w: 170 },
            { id: "u5", val: "Kelola Galeri &amp; Statistik", y: 340, w: 170 },
            { id: "u6", val: "Logout", y: 410, w: 170 }
        ];
        subs = [
            { id: "s1", val: "Agenda Kegiatan", y: 145, type: "inc" },
            { id: "s2", val: "Verifikasi Pendaftar", y: 202, type: "inc" },
            { id: "s3", val: "Sinkronisasi Midtrans", y: 260, type: "ext" }
        ];
    } else if (type === 'dept') {
        actName = "Ketua Departemen";
        caption = "Gambar 4.3 Use Case Ketua Departemen";
        ucs = [
            { id: "u1", val: "Login", y: 60, w: 170 },
            { id: "u2", val: "Lihat Dashboard", y: 130, w: 170 },
            { id: "u3", val: "Kelola Publikasi Konten", y: 200, w: 170 },
            { id: "u4", val: "Kelola Quotes", y: 270, w: 170 },
            { id: "u5", val: "Kelola Profil Akun", y: 340, w: 170 },
            { id: "u6", val: "Logout", y: 410, w: 170 }
        ];
        subs = [
            { id: "s1", val: "Berita Organisasi", y: 145 },
            { id: "s2", val: "Artikel Opini / Kader", y: 202 },
            { id: "s3", val: "Kategori Konten", y: 260 }
        ];
    } else if (type === 'guest') {
        actName = "Pengunjung";
        caption = "Gambar 4.4 Use Case Pengunjung";
        ucs = [
            { id: "u1", val: "Melihat Profil Organisasi", y: 60, w: 170 },
            { id: "u2", val: "Membaca Berita &amp; Artikel", y: 130, w: 170 },
            { id: "u3", val: "Melihat Galeri &amp; Agenda", y: 200, w: 170 },
            { id: "u4", val: "Mendaftar Kegiatan", y: 270, w: 170 },
            { id: "u5", val: "Melakukan Pembayaran", y: 340, w: 170 },
            { id: "u6", val: "Melihat Bukti &amp; Tiket", y: 410, w: 170 }
        ];
        subs = [
            { id: "s1", val: "Tunai / Cash", y: 285, target: "u5" },
            { id: "s2", val: "Transfer Bank", y: 342, target: "u5" },
            { id: "s3", val: "Midtrans (QRIS &amp; VA)", y: 400, target: "u5" }
        ];
        isExtend = true;
    }

    // Aktor di luar sebelah kiri
    xml += `        <!-- Aktor (Di Luar Kotak Sebelah Kiri) -->\n`;
    xml += `        <mxCell id="sact" value="${escapeXml(actName)}" style="${ACTOR_STYLE}" vertex="1" parent="1">\n`;
    xml += `          <mxGeometry x="80" y="230" width="40" height="80" as="geometry" />\n`;
    xml += `        </mxCell>\n\n`;

    ucs.forEach(uc => {
        xml += `        <mxCell id="${uc.id}" value="${uc.val}" style="${UC_STYLE}" vertex="1" parent="1">\n`;
        xml += `          <mxGeometry x="240" y="${uc.y}" width="${uc.w}" height="42" as="geometry" />\n`;
        xml += `        </mxCell>\n`;
        xml += `        <mxCell id="e_${uc.id}" style="${ASSOC_EDGE}" edge="1" parent="1" source="sact" target="${uc.id}"><mxGeometry relative="1" as="geometry" /></mxCell>\n`;
    });

    subs.forEach(s => {
        xml += `        <mxCell id="${s.id}" value="${s.val}" style="${SUB_UC_STYLE}" vertex="1" parent="1">\n`;
        xml += `          <mxGeometry x="490" y="${s.y}" width="145" height="38" as="geometry" />\n`;
        xml += `        </mxCell>\n`;

        if (type === 'ketua') {
            if (s.type === 'ext') {
                xml += `        <mxCell id="rel_${s.id}" value="&amp;lt;&amp;lt;extend&amp;gt;&amp;gt;" style="${INCLUDE_EDGE}" edge="1" parent="1" source="${s.id}" target="u3"><mxGeometry relative="1" as="geometry" /></mxCell>\n`;
            } else {
                xml += `        <mxCell id="rel_${s.id}" value="&amp;lt;&amp;lt;include&amp;gt;&amp;gt;" style="${INCLUDE_EDGE}" edge="1" parent="1" source="u3" target="${s.id}"><mxGeometry relative="1" as="geometry" /></mxCell>\n`;
            }
        } else if (isExtend) {
            xml += `        <mxCell id="rel_${s.id}" value="&amp;lt;&amp;lt;extend&amp;gt;&amp;gt;" style="${INCLUDE_EDGE}" edge="1" parent="1" source="${s.id}" target="${s.target}"><mxGeometry relative="1" as="geometry" /></mxCell>\n`;
        } else {
            xml += `        <mxCell id="rel_${s.id}" value="&amp;lt;&amp;lt;include&amp;gt;&amp;gt;" style="${INCLUDE_EDGE}" edge="1" parent="1" source="u3" target="${s.id}"><mxGeometry relative="1" as="geometry" /></mxCell>\n`;
        }
    });

    xml += `        <mxCell id="scap" value="${escapeXml(caption)}" style="${CAPTION_STYLE}" vertex="1" parent="1">\n`;
    xml += `          <mxGeometry x="${boxX}" y="${boxY + boxH + 15}" width="${boxW}" height="30" as="geometry" />\n`;
    xml += `        </mxCell>\n`;

    return xml;
}

function buildDrawioXml() {
    let full = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    full += `<mxfile host="app.diagrams.net" modified="2026-11-06T20:35:00.000Z" agent="Antigravity" version="21.0.0" type="device">\n\n`;

    // TAB 1: Semua Use Case (4 Gambar Bab 4)
    full += `  <diagram id="all-in-one" name="Semua Use Case (Format Skripsi)">\n`;
    full += `    <mxGraphModel dx="1600" dy="1200" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1800" pageHeight="1200" math="0" shadow="0">\n`;
    full += `      <root>\n        <mxCell id="0" />\n        <mxCell id="1" parent="0" />\n`;
    full += generateAllInOneXml();
    full += `      </root>\n    </mxGraphModel>\n  </diagram>\n\n`;

    // TAB 2: Gambar 4.1 Use Case Admin
    full += `  <diagram id="diag_admin" name="Gambar 4.1 Admin">\n`;
    full += `    <mxGraphModel dx="1000" dy="700" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="800" pageHeight="550" math="0" shadow="0">\n`;
    full += `      <root>\n        <mxCell id="0" />\n        <mxCell id="1" parent="0" />\n`;
    full += generateSingleDiagramXml('admin');
    full += `      </root>\n    </mxGraphModel>\n  </diagram>\n\n`;

    // TAB 3: Gambar 4.2 Use Case Ketua IPNU/IPPNU
    full += `  <diagram id="diag_ketua" name="Gambar 4.2 Ketua">\n`;
    full += `    <mxGraphModel dx="1000" dy="700" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="800" pageHeight="550" math="0" shadow="0">\n`;
    full += `      <root>\n        <mxCell id="0" />\n        <mxCell id="1" parent="0" />\n`;
    full += generateSingleDiagramXml('ketua');
    full += `      </root>\n    </mxGraphModel>\n  </diagram>\n\n`;

    // TAB 4: Gambar 4.3 Use Case Ketua Departemen
    full += `  <diagram id="diag_dept" name="Gambar 4.3 Departemen">\n`;
    full += `    <mxGraphModel dx="1000" dy="700" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="800" pageHeight="550" math="0" shadow="0">\n`;
    full += `      <root>\n        <mxCell id="0" />\n        <mxCell id="1" parent="0" />\n`;
    full += generateSingleDiagramXml('dept');
    full += `      </root>\n    </mxGraphModel>\n  </diagram>\n\n`;

    // TAB 5: Gambar 4.4 Use Case Pengunjung
    full += `  <diagram id="diag_guest" name="Gambar 4.4 Pengunjung">\n`;
    full += `    <mxGraphModel dx="1000" dy="700" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="800" pageHeight="550" math="0" shadow="0">\n`;
    full += `      <root>\n        <mxCell id="0" />\n        <mxCell id="1" parent="0" />\n`;
    full += generateSingleDiagramXml('guest');
    full += `      </root>\n    </mxGraphModel>\n  </diagram>\n\n`;

    full += `</mxfile>\n`;
    return full;
}

const targetPath = path.join(__dirname, '..', 'diagram', 'use_case_diagram.drawio');
const xmlOutput = buildDrawioXml();
fs.writeFileSync(targetPath, xmlOutput, 'utf8');
console.log(`Successfully updated use_case_diagram.drawio without merged diagram! Target: ${targetPath}`);
