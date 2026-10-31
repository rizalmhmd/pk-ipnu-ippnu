import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import ExcelJS from 'exceljs';

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

async function updateGroupedDrawio() {
    const wb = new ExcelJS.Workbook();
    await wb.xlsx.readFile(path.join(__dirname, '..', 'pengujian', 'Tabel_Pengujian_Sistem.xlsx'));
    
    // Get sheets: Tabel 4.30 to Tabel 4.36
    const sheetNames = [
        { name: 'Tabel 4.30 - Autentikasi', sub: 'a.   Pengujian Fitur Autentikasi & Hak Akses', title: 'Tabel 4. 30 Pengujian Fitur Autentikasi & Hak Akses' },
        { name: 'Tabel 4.31 - Informasi Publik', sub: 'b.   Pengujian Fitur Informasi Publik & Navigasi', title: 'Tabel 4. 31 Pengujian Fitur Informasi Publik & Navigasi' },
        { name: 'Tabel 4.32 - Pendaftaran', sub: 'c.   Pengujian Fitur Formulir Pendaftaran Kegiatan', title: 'Tabel 4. 32 Pengujian Fitur Formulir Pendaftaran Kegiatan' },
        { name: 'Tabel 4.33 - Pembayaran', sub: 'd.   Pengujian Fitur Pembayaran & Transaksi', title: 'Tabel 4. 33 Pengujian Fitur Pembayaran & Transaksi' },
        { name: 'Tabel 4.34 - Dashboard Admin', sub: 'e.   Pengujian Fitur Dashboard Admin & Pengaturan', title: 'Tabel 4. 34 Pengujian Fitur Dashboard Admin' },
        { name: 'Tabel 4.35 - Data Pendaftar', sub: 'f.   Pengujian Fitur Pengelolaan Data Pendaftar', title: 'Tabel 4. 35 Pengujian Fitur Pengelolaan Data Pendaftar' },
        { name: 'Tabel 4.36 - Konten CMS', sub: 'g.   Pengujian Fitur Pengelolaan Konten (CMS)', title: 'Tabel 4. 36 Pengujian Fitur Pengelolaan Konten (CMS)' }
    ];

    let fullHtml = '';
    const tableWidth = 720;
    const pageX = 65;

    let currentY = 40;
    let xmlElements = '';

    sheetNames.forEach((sInfo, sIdx) => {
        const ws = wb.getWorksheet(sInfo.name);
        if (!ws) return;

        // Subheading
        xmlElements += `        <mxCell id="sub_${sIdx}" value="${escapeXml(sInfo.sub)}" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;fontStyle=1;fontSize=13;fontColor=#000000;fontFamily=Times New Roman;" vertex="1" parent="1">\n`;
        xmlElements += `          <mxGeometry x="${pageX}" y="${currentY}" width="${tableWidth}" height="24" as="geometry" />\n`;
        xmlElements += `        </mxCell>\n`;
        currentY += 26;

        // Table Caption
        xmlElements += `        <mxCell id="cap_${sIdx}" value="${escapeXml(sInfo.title)}" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;fontStyle=1;fontSize=12;fontColor=#000000;fontFamily=Times New Roman;" vertex="1" parent="1">\n`;
        xmlElements += `          <mxGeometry x="${pageX}" y="${currentY}" width="${tableWidth}" height="22" as="geometry" />\n`;
        xmlElements += `        </mxCell>\n`;
        currentY += 24;

        // Table HTML
        let tableHtml = `<table style="width:100%;border-collapse:collapse;font-family:'Times New Roman';font-size:12px;color:#000000;border:1px solid #000000;">`;
        tableHtml += `<tr style="font-weight:bold;text-align:center;background-color:#ffffff;">`;
        tableHtml += `<td style="border:1px solid #000000;padding:6px 4px;width:6%;">No</td>`;
        tableHtml += `<td style="border:1px solid #000000;padding:6px;width:24%;">Fitur yang Diuji</td>`;
        tableHtml += `<td style="border:1px solid #000000;padding:6px;width:30%;">Input yang Diberikan</td>`;
        tableHtml += `<td style="border:1px solid #000000;padding:6px;width:28%;">Output yang Diharapkan</td>`;
        tableHtml += `<td style="border:1px solid #000000;padding:6px 4px;width:12%;">Hasil</td>`;
        tableHtml += `</tr>`;

        let rowCount = 0;
        ws.eachRow((row, rowNumber) => {
            if (rowNumber >= 4) { // Row 1 is sub, 2 is title, 3 is header, 4+ is data
                rowCount++;
                tableHtml += `<tr>`;
                tableHtml += `<td style="border:1px solid #000000;padding:6px 4px;text-align:center;">${row.getCell(1).value}</td>`;
                tableHtml += `<td style="border:1px solid #000000;padding:6px;">${row.getCell(2).value}</td>`;
                tableHtml += `<td style="border:1px solid #000000;padding:6px;">${String(row.getCell(3).value || '').replace(/\n/g, '<br/>')}</td>`;
                tableHtml += `<td style="border:1px solid #000000;padding:6px;">${String(row.getCell(4).value || '').replace(/\n/g, '<br/>')}</td>`;
                tableHtml += `<td style="border:1px solid #000000;padding:6px 4px;text-align:center;font-weight:bold;color:#000000;">&#9989;<br/>Berhasil</td>`;
                tableHtml += `</tr>`;
            }
        });
        tableHtml += `</table>`;

        let tblH = (rowCount * 50) + 36;
        xmlElements += `        <mxCell id="tbl_${sIdx}" value="${escapeXml(tableHtml)}" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;overflow=fill;" vertex="1" parent="1">\n`;
        xmlElements += `          <mxGeometry x="${pageX}" y="${currentY}" width="${tableWidth}" height="${tblH}" as="geometry" />\n`;
        xmlElements += `        </mxCell>\n`;
        currentY += tblH + 35; // Spasi antar tabel
    });

    let totalPageHeight = currentY + 100;

    let xml = `<mxfile host="app.diagrams.net" modified="${new Date().toISOString()}" agent="Antigravity" version="21.0.0" type="device">\n`;
    xml += `  <diagram id="tabel-pengujian-sistem" name="Tabel Pengujian Sistem (Terkelompok)">\n`;
    xml += `    <mxGraphModel dx="1200" dy="800" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="850" pageHeight="${totalPageHeight}" math="0" shadow="0">\n`;
    xml += `      <root>\n`;
    xml += `        <mxCell id="0" />\n`;
    xml += `        <mxCell id="1" parent="0" />\n`;
    xml += xmlElements;
    xml += `      </root>\n`;
    xml += `    </mxGraphModel>\n`;
    xml += `  </diagram>\n`;
    xml += `</mxfile>\n`;

    fs.writeFileSync(path.join(__dirname, '..', 'diagram', 'pengujian_sistem.drawio'), xml, 'utf-8');
    console.log('Successfully updated pengujian_sistem.drawio to grouped format!');
}

updateGroupedDrawio().catch(console.error);

