import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to escape XML attributes
function escapeXml(unsafe) {
    if (!unsafe) return '';
    return unsafe
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

const tableWidth = 720;
const pageX = 65;

// Read the test cases from generate_exact_excel.js or define directly
import ExcelJS from 'exceljs';

async function updateDrawio() {
    const wb = new ExcelJS.Workbook();
    await wb.xlsx.readFile(path.join(__dirname, '..', 'pengujian', 'pengujian_sistem.xlsx'));
    const ws = wb.getWorksheet('Tabel Pengujian Sistem');

    let rows = [];
    ws.eachRow((row, rowNumber) => {
        if (rowNumber > 1) {
            rows.push({
                no: row.getCell(1).value,
                fitur: row.getCell(2).value,
                input: String(row.getCell(3).value || '').replace(/\n/g, '<br/>'),
                output: String(row.getCell(4).value || '').replace(/\n/g, '<br/>'),
                hasil: '&#9989;<br/>Berhasil'
            });
        }
    });

    let html = `<table style="width:100%;border-collapse:collapse;font-family:'Times New Roman';font-size:12px;color:#000000;border:1px solid #000000;">`;
    html += `<tr style="font-weight:bold;text-align:center;background-color:#ffffff;">`;
    html += `<td style="border:1px solid #000000;padding:8px 4px;width:6%;">No</td>`;
    html += `<td style="border:1px solid #000000;padding:8px;width:24%;">Fitur yang Diuji</td>`;
    html += `<td style="border:1px solid #000000;padding:8px;width:28%;">Input yang Diberikan</td>`;
    html += `<td style="border:1px solid #000000;padding:8px;width:30%;">Output yang Diharapkan</td>`;
    html += `<td style="border:1px solid #000000;padding:8px 4px;width:12%;">Hasil</td>`;
    html += `</tr>`;

    rows.forEach(r => {
        html += `<tr>`;
        html += `<td style="border:1px solid #000000;padding:6px 4px;text-align:center;">${r.no}</td>`;
        html += `<td style="border:1px solid #000000;padding:6px;">${r.fitur}</td>`;
        html += `<td style="border:1px solid #000000;padding:6px;">${r.input}</td>`;
        html += `<td style="border:1px solid #000000;padding:6px;">${r.output}</td>`;
        html += `<td style="border:1px solid #000000;padding:6px 4px;text-align:center;font-weight:bold;color:#000000;">${r.hasil}</td>`;
        html += `</tr>`;
    });
    html += `</table>`;

    let totalHeight = 40 + (rows.length * 52) + 100;
    let tableHeight = rows.length * 52 + 40;

    let xml = `<mxfile host="app.diagrams.net" modified="${new Date().toISOString()}" agent="Antigravity" version="21.0.0" type="device">\n`;
    xml += `  <diagram id="tabel-pengujian-sistem" name="Tabel Pengujian Sistem">\n`;
    xml += `    <mxGraphModel dx="1200" dy="800" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="850" pageHeight="${totalHeight}" math="0" shadow="0">\n`;
    xml += `      <root>\n`;
    xml += `        <mxCell id="0" />\n`;
    xml += `        <mxCell id="1" parent="0" />\n`;
    xml += `        <mxCell id="tbl_main" value="${escapeXml(html)}" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;overflow=fill;" vertex="1" parent="1">\n`;
    xml += `          <mxGeometry x="${pageX}" y="40" width="${tableWidth}" height="${tableHeight}" as="geometry" />\n`;
    xml += `        </mxCell>\n`;
    xml += `      </root>\n`;
    xml += `    </mxGraphModel>\n`;
    xml += `  </diagram>\n`;
    xml += `</mxfile>\n`;

    fs.writeFileSync(path.join(__dirname, '..', 'diagram', 'pengujian_sistem.drawio'), xml, 'utf-8');
    console.log('Successfully updated pengujian_sistem.drawio to match exact 5-column format!');
}

updateDrawio().catch(console.error);

