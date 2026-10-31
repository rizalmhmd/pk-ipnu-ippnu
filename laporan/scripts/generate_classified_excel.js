import ExcelJS from 'exceljs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Data kelompok pengujian - TIDAK ADA email atau password rahasia, murni generik & aman
const featureGroups = [
    {
        letter: 'a',
        subHeading: 'a.   Pengujian Fitur Autentikasi & Hak Akses',
        tableNum: 'Tabel 4. 30',
        tableTitle: 'Pengujian Fitur Autentikasi & Hak Akses',
        sheetName: 'Tabel 4.30 - Autentikasi',
        rows: [
            {
                fitur: 'Login (berhasil)',
                input: 'Email dan password valid (Role Administrator)',
                output: 'Masuk ke dashboard admin dengan hak akses menu penuh',
                hasil: 'âœ…\nBerhasil'
            },
            {
                fitur: 'Login (berhasil)',
                input: 'Email dan password valid (Role Ketua IPNU/IPPNU)',
                output: 'Masuk ke dashboard dengan batasan menu khusus Ketua (Agenda, Pendaftar, Anggota, Galeri)',
                hasil: 'âœ…\nBerhasil'
            },
            {
                fitur: 'Login (berhasil)',
                input: 'Email dan password valid (Role Departemen)',
                output: 'Masuk ke dashboard dengan menu khusus pengelolaan konten (Berita, Artikel, Quotes)',
                hasil: 'âœ…\nBerhasil'
            },
            {
                fitur: 'Login (gagal)',
                input: 'Password salah',
                output: 'Muncul pesan error: "Kredensial yang diberikan tidak cocok dengan data kami"',
                hasil: 'âœ…\nBerhasil'
            },
            {
                fitur: 'Login (gagal)',
                input: 'Format email tidak valid (contoh: bukan-email)',
                output: 'Muncul pesan error: "Format email tidak valid"',
                hasil: 'âœ…\nBerhasil'
            },
            {
                fitur: 'Lihat kata sandi (berhasil)',
                input: 'Klik ikon mata pada kolom password',
                output: 'Karakter password tampil secara terbuka (teks biasa)',
                hasil: 'âœ…\nBerhasil'
            },
            {
                fitur: 'Akses halaman admin tanpa login (gagal)',
                input: 'Akses URL /admin/dashboard secara langsung di browser',
                output: 'Akses ditolak oleh middleware auth dan dialihkan ke halaman login',
                hasil: 'âœ…\nBerhasil'
            },
            {
                fitur: 'Logout dari sistem (berhasil)',
                input: 'Klik tombol Keluar pada sidebar',
                output: 'Sesi login dihapus dan diarahkan kembali ke beranda utama publik',
                hasil: 'âœ…\nBerhasil'
            }
        ]
    },
    {
        letter: 'b',
        subHeading: 'b.   Pengujian Fitur Informasi Publik & Navigasi',
        tableNum: 'Tabel 4. 31',
        tableTitle: 'Pengujian Fitur Informasi Publik & Navigasi',
        sheetName: 'Tabel 4.31 - Informasi Publik',
        rows: [
            {
                fitur: 'Menampilkan Beranda utama (berhasil)',
                input: 'Mengakses URL utama sistem ( / )',
                output: 'Tampilan beranda lengkap berisi banner hero, statistik, warta terbaru, dan agenda terdekat',
                hasil: 'âœ…\nBerhasil'
            },
            {
                fitur: 'Scroll navbar sticky (berhasil)',
                input: 'Gulir halaman ke bawah melebihi 50px',
                output: 'Bilah navigasi berubah latar menjadi hijau pekat berbayang dan tetap melayang',
                hasil: 'âœ…\nBerhasil'
            },
            {
                fitur: 'Navigasi menu Profil (berhasil)',
                input: 'Klik menu Profil > Visi & Misi',
                output: 'Menampilkan halaman profil visi dan misi organisasi',
                hasil: 'âœ…\nBerhasil'
            },
            {
                fitur: 'Melihat detail berita (berhasil)',
                input: 'Klik salah satu kartu berita pada beranda',
                output: 'Menampilkan halaman warta berita lengkap dengan foto utama, penulis, tanggal, dan isi berita',
                hasil: 'âœ…\nBerhasil'
            },
            {
                fitur: 'Melihat detail artikel opini (berhasil)',
                input: 'Klik salah satu kartu artikel opini',
                output: 'Menampilkan narasi opini lengkap beserta nama kader penulis dan foto pendukung',
                hasil: 'âœ…\nBerhasil'
            },
            {
                fitur: 'Melihat galeri dokumentasi (berhasil)',
                input: 'Klik menu Galeri pada navigasi',
                output: 'Menampilkan foto-foto dokumentasi kegiatan organisasi dalam format grid responsif',
                hasil: 'âœ…\nBerhasil'
            },
            {
                fitur: 'Melihat daftar agenda kegiatan (berhasil)',
                input: 'Klik menu Agenda pada navigasi',
                output: 'Menampilkan daftar kegiatan yang diurutkan dari tanggal pelaksanaan terdekat',
                hasil: 'âœ…\nBerhasil'
            }
        ]
    },
    {
        letter: 'c',
        subHeading: 'c.   Pengujian Fitur Formulir Pendaftaran Kegiatan',
        tableNum: 'Tabel 4. 32',
        tableTitle: 'Pengujian Fitur Formulir Pendaftaran Kegiatan',
        sheetName: 'Tabel 4.32 - Pendaftaran',
        rows: [
            {
                fitur: 'Pendaftaran kegiatan (berhasil)',
                input: 'Mengisi seluruh data formulir dengan lengkap dan benar (Nama, WA, Email, NIK 16 digit)',
                output: 'Data pendaftaran tersimpan ke basis data dan dialihkan ke halaman transaksi pembayaran',
                hasil: 'âœ…\nBerhasil'
            },
            {
                fitur: 'Pendaftaran kolom wajib kosong (gagal)',
                input: 'Kolom Nama Lengkap dan Nomor WhatsApp dikosongkan',
                output: 'Muncul pesan error: "Kolom ini wajib diisi" pada field terkait',
                hasil: 'âœ…\nBerhasil'
            },
            {
                fitur: 'Validasi nomor WhatsApp (gagal)',
                input: 'Nomor WhatsApp kurang dari 9 digit (contoh: 0812)',
                output: 'Muncul pesan error: "Nomor WhatsApp minimal 9 digit"',
                hasil: 'âœ…\nBerhasil'
            },
            {
                fitur: 'Validasi format NIK (gagal)',
                input: 'NIK kurang dari 16 digit (contoh: 8 digit angka)',
                output: 'Muncul pesan error: "NIK harus berupa 16 digit angka"',
                hasil: 'âœ…\nBerhasil'
            },
            {
                fitur: 'Deteksi wilayah otomatis via NIK (berhasil)',
                input: 'Input NIK 16 digit valid',
                output: 'Sistem otomatis mendeteksi dan menampilkan jenis kelamin, tanggal lahir, kecamatan, kabupaten, dan provinsi',
                hasil: 'âœ…\nBerhasil'
            },
            {
                fitur: 'Pendaftaran ganda / duplikat (gagal)',
                input: 'Mendaftar kembali dengan NIK atau No WA yang sudah terdaftar pada agenda yang sama',
                output: 'Muncul pesan error: "Anda sudah terdaftar pada kegiatan ini"',
                hasil: 'âœ…\nBerhasil'
            },
            {
                fitur: 'Pendaftaran agenda yang ditutup (gagal)',
                input: 'Mengakses URL formulir kegiatan yang sudah ditutup status pendaftarannya',
                output: 'Formulir dicegah dan muncul notifikasi bahwa pendaftaran telah ditutup',
                hasil: 'âœ…\nBerhasil'
            }
        ]
    },
    {
        letter: 'd',
        subHeading: 'd.   Pengujian Fitur Pembayaran & Transaksi',
        tableNum: 'Tabel 4. 33',
        tableTitle: 'Pengujian Fitur Pembayaran & Transaksi',
        sheetName: 'Tabel 4.33 - Pembayaran',
        rows: [
            {
                fitur: 'Pembayaran via Midtrans (berhasil)',
                input: 'Klik tombol Bayar Sekarang pada halaman pembayaran',
                output: 'Pop-up Snap Midtrans terbuka menampilkan kanal QRIS, Virtual Account Bank, dan E-Wallet',
                hasil: 'âœ…\nBerhasil'
            },
            {
                fitur: 'Cek status pembayaran Midtrans (berhasil)',
                input: 'Klik tombol Sudah Bayar? Cek Status Pembayaran',
                output: 'Sistem memeriksa status transaksi ke server Midtrans dan menampilkan status pembayaran terkini',
                hasil: 'âœ…\nBerhasil'
            },
            {
                fitur: 'Konfirmasi pelunasan Webhook (berhasil)',
                input: 'Server Midtrans mengirim sinyal notifikasi settlement (lunas)',
                output: 'Status pendaftaran di basis data otomatis berubah menjadi approved (lunas) secara real-time',
                hasil: 'âœ…\nBerhasil'
            },
            {
                fitur: 'Pembayaran transfer manual (berhasil)',
                input: 'Pilih metode transfer manual dan upload foto bukti transfer',
                output: 'Berkas bukti bayar tersimpan dan status pendaftaran menjadi pending verifikasi admin',
                hasil: 'âœ…\nBerhasil'
            },
            {
                fitur: 'Upload bukti transfer bukan gambar (gagal)',
                input: 'Unggah berkas dokumen (contoh: format .pdf atau .docx)',
                output: 'Muncul pesan error: "File bukti pembayaran harus berupa gambar (jpeg, png, jpg, webp)"',
                hasil: 'âœ…\nBerhasil'
            },
            {
                fitur: 'Upload bukti transfer melebihi 5MB (gagal)',
                input: 'Unggah file gambar berukuran lebih dari 5 MB',
                output: 'Muncul pesan error: "Ukuran maksimal file bukti pembayaran adalah 5MB"',
                hasil: 'âœ…\nBerhasil'
            }
        ]
    },
    {
        letter: 'e',
        subHeading: 'e.   Pengujian Fitur Dashboard Admin & Pengaturan',
        tableNum: 'Tabel 4. 34',
        tableTitle: 'Pengujian Fitur Dashboard Admin',
        sheetName: 'Tabel 4.34 - Dashboard Admin',
        rows: [
            {
                fitur: 'Menampilkan metrik statistik (berhasil)',
                input: 'Buka halaman dashboard admin (/admin/dashboard)',
                output: 'Menampilkan kartu metrik total data (Berita, Artikel, Anggota, Agenda, Pendaftar, dll.) secara akurat',
                hasil: 'âœ…\nBerhasil'
            },
            {
                fitur: 'Menampilkan indikator status sistem (berhasil)',
                input: 'Pemuatan halaman dashboard admin',
                output: 'Menampilkan kartu status "Online & Stabil" dengan indikator titik hijau aktif',
                hasil: 'âœ…\nBerhasil'
            },
            {
                fitur: 'Menampilkan log aktivitas terbaru (berhasil)',
                input: 'Pemuatan seksi Aktivitas Terakhir pada dashboard',
                output: 'Menampilkan daftar aktivitas pendaftaran dan berita terbaru secara kronologis waktu',
                hasil: 'âœ…\nBerhasil'
            },
            {
                fitur: 'Pintasan cepat / Quick action (berhasil)',
                input: 'Klik tombol pintasan [+ Post Berita] atau [+ Agenda Baru]',
                output: 'Langsung dialihkan ke form pembuatan konten yang dipilih',
                hasil: 'âœ…\nBerhasil'
            },
            {
                fitur: 'Ganti tema Dark / Light Mode (berhasil)',
                input: 'Klik tombol pengubah tema pada header dashboard',
                output: 'Tampilan antarmuka dashboard admin beralih antara tema gelap dan terang secara instan',
                hasil: 'âœ…\nBerhasil'
            }
        ]
    },
    {
        letter: 'f',
        subHeading: 'f.   Pengujian Fitur Pengelolaan Data Pendaftar',
        tableNum: 'Tabel 4. 35',
        tableTitle: 'Pengujian Fitur Pengelolaan Data Pendaftar',
        sheetName: 'Tabel 4.35 - Data Pendaftar',
        rows: [
            {
                fitur: 'Menampilkan tabel data pendaftar (berhasil)',
                input: 'Buka halaman manajemen pendaftar (/admin/registrations)',
                output: 'Menampilkan tabel peserta lengkap dengan kolom identitas, agenda, status bayar, dan tombol aksi',
                hasil: 'âœ…\nBerhasil'
            },
            {
                fitur: 'Filter pendaftar per agenda (berhasil)',
                input: 'Pilih salah satu agenda pada dropdown filter agenda',
                output: 'Tabel hanya menampilkan peserta yang mendaftar pada agenda yang dipilih',
                hasil: 'âœ…\nBerhasil'
            },
            {
                fitur: 'Sinkronisasi massal status Midtrans (berhasil)',
                input: 'Klik tombol [Sinkronkan Semua Midtrans]',
                output: 'Sistem memeriksa transaksi pending ke Midtrans dan mengupdate status pendaftar secara serentak',
                hasil: 'âœ…\nBerhasil'
            },
            {
                fitur: 'Pratinjau bukti bayar transfer (berhasil)',
                input: 'Klik tombol ikon mata pada baris data pendaftar',
                output: 'Pop-up modal muncul menampilkan rincian data peserta dan foto bukti transfer',
                hasil: 'âœ…\nBerhasil'
            },
            {
                fitur: 'Verifikasi / Approve pendaftar manual (berhasil)',
                input: 'Klik tombol centang hijau [Setujui] pada data pendaftar pending',
                output: 'Status pendaftar berhasil diperbarui menjadi approved di basis data',
                hasil: 'âœ…\nBerhasil'
            },
            {
                fitur: 'Penolakan pendaftar disertai alasan (berhasil)',
                input: 'Klik tombol silang merah [Tolak] dan ketik alasan penolakan pada dialog',
                output: 'Status pendaftar berubah menjadi rejected dan sistem otomatis mengirimkan surel penolakan ke peserta',
                hasil: 'âœ…\nBerhasil'
            },
            {
                fitur: 'Hapus data pendaftar (berhasil)',
                input: 'Klik tombol ikon Hapus dan konfirmasi dialog peringatan',
                output: 'Data pendaftar terhapus secara permanen dari basis data',
                hasil: 'âœ…\nBerhasil'
            }
        ]
    },
    {
        letter: 'g',
        subHeading: 'g.   Pengujian Fitur Pengelolaan Konten (CMS)',
        tableNum: 'Tabel 4. 36',
        tableTitle: 'Pengujian Fitur Pengelolaan Konten (CMS)',
        sheetName: 'Tabel 4.36 - Konten CMS',
        rows: [
            {
                fitur: 'Menambah berita kegiatan (berhasil)',
                input: 'Isi judul berita, unggah foto sampul, dan ketik narasi berita lengkap',
                output: 'Berita tersimpan, slug URL terbentuk otomatis, dan warta langsung tampil pada beranda publik',
                hasil: 'âœ…\nBerhasil'
            },
            {
                fitur: 'Menambah berita tanpa judul (gagal)',
                input: 'Kolom judul dikosongkan',
                output: 'Muncul pesan error: "The title field is required"',
                hasil: 'âœ…\nBerhasil'
            },
            {
                fitur: 'Pratinjau foto sebelum upload (berhasil)',
                input: 'Pilih file foto dari perangkat komputer pada kolom upload',
                output: 'Pratinjau foto langsung tampil di layar form sebelum formulir disimpan',
                hasil: 'âœ…\nBerhasil'
            },
            {
                fitur: 'Mengubah / Edit berita kegiatan (berhasil)',
                input: 'Klik tombol Edit pada salah satu berita, ubah teks, lalu klik simpan',
                output: 'Pembaruan berita tersimpan dan perubahan langsung tercermin pada situs publik',
                hasil: 'âœ…\nBerhasil'
            },
            {
                fitur: 'Menghapus berita (berhasil)',
                input: 'Klik tombol Hapus pada berita yang dipilih lalu konfirmasi dialog',
                output: 'Berita beserta berkas foto sampulnya terhapus secara permanen dari server',
                hasil: 'âœ…\nBerhasil'
            },
            {
                fitur: 'Menambah artikel opini kader (berhasil)',
                input: 'Isi judul artikel, nama kader penulis, unggah foto, dan ketik isi artikel',
                output: 'Artikel tersimpan dengan status published dan muncul di halaman arsip artikel',
                hasil: 'âœ…\nBerhasil'
            },
            {
                fitur: 'Mengelola struktur pengurus (berhasil)',
                input: 'Input nama pengurus, jabatan, organisasi (IPNU/IPPNU), tingkat (BPH/Dept), dan foto',
                output: 'Data pengurus tersimpan dan tersusun rapi pada bagan struktur organisasi di menu profil',
                hasil: 'âœ…\nBerhasil'
            },
            {
                fitur: 'Mengelola kutipan / quotes ulama (berhasil)',
                input: 'Input teks kutipan motivasi, nama ulama tokoh, dan foto pendukung',
                output: 'Kutipan tersimpan dan tampil pada slider beranda utama',
                hasil: 'âœ…\nBerhasil'
            }
        ]
    }
];

// Tabel Rekapitulasi Ringkasan
const recapRows = [
    ['1', 'Pengujian Fitur Autentikasi & Hak Akses', 8, 8, 0, '100%'],
    ['2', 'Pengujian Fitur Informasi Publik & Navigasi', 7, 7, 0, '100%'],
    ['3', 'Pengujian Fitur Formulir Pendaftaran Kegiatan', 7, 7, 0, '100%'],
    ['4', 'Pengujian Fitur Pembayaran & Transaksi', 6, 6, 0, '100%'],
    ['5', 'Pengujian Fitur Dashboard Admin & Pengaturan', 5, 5, 0, '100%'],
    ['6', 'Pengujian Fitur Pengelolaan Data Pendaftar', 7, 7, 0, '100%'],
    ['7', 'Pengujian Fitur Pengelolaan Konten (CMS)', 8, 8, 0, '100%']
];

// Border styling
const thinBlackBorder = {
    top: { style: 'thin', color: { argb: 'FF000000' } },
    bottom: { style: 'thin', color: { argb: 'FF000000' } },
    left: { style: 'thin', color: { argb: 'FF000000' } },
    right: { style: 'thin', color: { argb: 'FF000000' } }
};

const headers = ['No', 'Fitur yang Diuji', 'Input yang Diberikan', 'Output yang Diharapkan', 'Hasil'];

function renderGroupTable(ws, grp, startRow = 1) {
    let r = startRow;

    // 1. Sub-heading (misal: "c.   Pengujian Fitur Kasir" -> "a.   Pengujian Fitur Autentikasi & Hak Akses")
    let subRow = ws.getRow(r);
    subRow.getCell(1).value = grp.subHeading;
    ws.mergeCells(r, 1, r, 5);
    subRow.getCell(1).font = { name: 'Times New Roman', size: 12, bold: true, color: { argb: 'FF000000' } };
    subRow.getCell(1).alignment = { horizontal: 'left', vertical: 'middle' };
    subRow.height = 24;
    r++;

    // 2. Table Title (misal: "Tabel 4. 24 Pengujian Kasir" -> "Tabel 4. 30 Pengujian Fitur Autentikasi & Hak Akses")
    let titleRow = ws.getRow(r);
    titleRow.getCell(1).value = `${grp.tableNum} ${grp.tableTitle}`;
    ws.mergeCells(r, 1, r, 5);
    titleRow.getCell(1).font = { name: 'Times New Roman', size: 12, bold: true, color: { argb: 'FF000000' } };
    titleRow.getCell(1).alignment = { horizontal: 'center', vertical: 'middle' };
    titleRow.height = 22;
    r++;

    // 3. Table Header: No | Fitur yang Diuji | Input yang Diberikan | Output yang Diharapkan | Hasil
    let headerRow = ws.getRow(r);
    headers.forEach((h, idx) => {
        let cell = headerRow.getCell(idx + 1);
        cell.value = h;
        cell.font = { name: 'Times New Roman', size: 11, bold: true, color: { argb: 'FF000000' } };
        cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
        cell.border = thinBlackBorder;
    });
    headerRow.height = 28;
    r++;

    // 4. Data Rows (nomor dimulai dari 1 untuk setiap tabel)
    grp.rows.forEach((item, idx) => {
        let row = ws.getRow(r);

        // No
        let c1 = row.getCell(1);
        c1.value = idx + 1;
        c1.font = { name: 'Times New Roman', size: 11, color: { argb: 'FF000000' } };
        c1.alignment = { horizontal: 'center', vertical: 'middle' };
        c1.border = thinBlackBorder;

        // Fitur yang Diuji
        let c2 = row.getCell(2);
        c2.value = item.fitur;
        c2.font = { name: 'Times New Roman', size: 11, color: { argb: 'FF000000' } };
        c2.alignment = { horizontal: 'left', vertical: 'middle', wrapText: true };
        c2.border = thinBlackBorder;

        // Input yang Diberikan
        let c3 = row.getCell(3);
        c3.value = item.input;
        c3.font = { name: 'Times New Roman', size: 11, color: { argb: 'FF000000' } };
        c3.alignment = { horizontal: 'left', vertical: 'middle', wrapText: true };
        c3.border = thinBlackBorder;

        // Output yang Diharapkan
        let c4 = row.getCell(4);
        c4.value = item.output;
        c4.font = { name: 'Times New Roman', size: 11, color: { argb: 'FF000000' } };
        c4.alignment = { horizontal: 'left', vertical: 'middle', wrapText: true };
        c4.border = thinBlackBorder;

        // Hasil
        let c5 = row.getCell(5);
        c5.value = item.hasil;
        c5.font = { name: 'Times New Roman', size: 11, bold: true, color: { argb: 'FF000000' } };
        c5.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
        c5.border = thinBlackBorder;

        row.height = 36;
        r++;
    });

    return r;
}

async function buildClassifiedExcel() {
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'Antigravity';
    workbook.created = new Date();

    // =========================================================================
    // SHEET 1: SEMUA TABEL TERKELOMPOK (Format Persis Contoh Gambar Laporan)
    // =========================================================================
    const wsAll = workbook.addWorksheet('Laporan Pengujian (Lengkap)', {
        views: [{ showGridLines: true }]
    });

    wsAll.columns = [
        { width: 6 },   // No
        { width: 34 },  // Fitur yang Diuji
        { width: 38 },  // Input yang Diberikan
        { width: 45 },  // Output yang Diharapkan
        { width: 14 }   // Hasil
    ];

    let currentRow = 1;

    for (let grp of featureGroups) {
        currentRow = renderGroupTable(wsAll, grp, currentRow);
        currentRow += 2; // 2 baris spasi pemisah antar tabel
    }

    // Tambahkan Tabel Rekapitulasi di bagian akhir Sheet 1
    let recapSubRow = wsAll.getRow(currentRow);
    recapSubRow.getCell(1).value = 'Tabel 4. 37 Rekapitulasi Hasil Pengujian Black Box';
    wsAll.mergeCells(currentRow, 1, currentRow, 5);
    recapSubRow.getCell(1).font = { name: 'Times New Roman', size: 12, bold: true, color: { argb: 'FF000000' } };
    recapSubRow.getCell(1).alignment = { horizontal: 'center', vertical: 'middle' };
    recapSubRow.height = 24;
    currentRow++;

    // Header Rekap
    let recapHeader = wsAll.getRow(currentRow);
    ['No', 'Fitur yang Diuji', 'Jumlah Uji', 'Jumlah Valid', 'Persentase'].forEach((h, idx) => {
        let cell = recapHeader.getCell(idx + 1);
        cell.value = h;
        cell.font = { name: 'Times New Roman', size: 11, bold: true };
        cell.alignment = { horizontal: 'center', vertical: 'middle' };
        cell.border = thinBlackBorder;
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFA6A6A6' } };
    });
    recapHeader.height = 26;
    currentRow++;

    // Rows Rekap
    recapRows.forEach(rData => {
        let row = wsAll.getRow(currentRow);
        row.getCell(1).value = rData[0];
        row.getCell(1).alignment = { horizontal: 'center', vertical: 'middle' };
        row.getCell(1).border = thinBlackBorder;

        row.getCell(2).value = rData[1];
        row.getCell(2).alignment = { horizontal: 'left', vertical: 'middle' };
        row.getCell(2).border = thinBlackBorder;

        row.getCell(3).value = rData[2];
        row.getCell(3).alignment = { horizontal: 'center', vertical: 'middle' };
        row.getCell(3).border = thinBlackBorder;

        row.getCell(4).value = rData[3];
        row.getCell(4).alignment = { horizontal: 'center', vertical: 'middle' };
        row.getCell(4).font = { name: 'Times New Roman', size: 11, bold: true, color: { argb: 'FF057A55' } };
        row.getCell(4).border = thinBlackBorder;

        row.getCell(5).value = rData[5];
        row.getCell(5).alignment = { horizontal: 'center', vertical: 'middle' };
        row.getCell(5).font = { name: 'Times New Roman', size: 11, bold: true, color: { argb: 'FF057A55' } };
        row.getCell(5).border = thinBlackBorder;

        row.height = 22;
        currentRow++;
    });

    // Total Row
    let totalRow = wsAll.getRow(currentRow);
    totalRow.getCell(1).value = 'Total';
    wsAll.mergeCells(currentRow, 1, currentRow, 2);
    totalRow.getCell(1).font = { name: 'Times New Roman', size: 11, bold: true };
    totalRow.getCell(1).alignment = { horizontal: 'center', vertical: 'middle' };
    totalRow.getCell(1).border = thinBlackBorder;
    totalRow.getCell(2).border = thinBlackBorder;
    totalRow.getCell(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD9D9D9' } };

    totalRow.getCell(3).value = 48; // Total 48 test cases
    totalRow.getCell(3).font = { name: 'Times New Roman', size: 11, bold: true };
    totalRow.getCell(3).alignment = { horizontal: 'center', vertical: 'middle' };
    totalRow.getCell(3).border = thinBlackBorder;
    totalRow.getCell(3).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD9D9D9' } };

    totalRow.getCell(4).value = 48;
    totalRow.getCell(4).font = { name: 'Times New Roman', size: 11, bold: true, color: { argb: 'FF057A55' } };
    totalRow.getCell(4).alignment = { horizontal: 'center', vertical: 'middle' };
    totalRow.getCell(4).border = thinBlackBorder;
    totalRow.getCell(4).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD9D9D9' } };

    totalRow.getCell(5).value = '100%';
    totalRow.getCell(5).font = { name: 'Times New Roman', size: 11, bold: true, color: { argb: 'FF057A55' } };
    totalRow.getCell(5).alignment = { horizontal: 'center', vertical: 'middle' };
    totalRow.getCell(5).border = thinBlackBorder;
    totalRow.getCell(5).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD9D9D9' } };
    totalRow.height = 24;

    // =========================================================================
    // SHEET-SHEET TERPISAH PER MODUL (Tabel 4.30 s/d 4.36)
    // =========================================================================
    for (let grp of featureGroups) {
        const ws = workbook.addWorksheet(grp.sheetName, {
            views: [{ showGridLines: true }]
        });
        ws.columns = [
            { width: 6 },
            { width: 34 },
            { width: 38 },
            { width: 45 },
            { width: 14 }
        ];
        renderGroupTable(ws, grp, 1);
    }

    // Simpan berkas ke Tabel_Pengujian_Sistem.xlsx
    const targetFile1 = path.join(__dirname, '..', 'pengujian', 'Tabel_Pengujian_Sistem.xlsx');
    await workbook.xlsx.writeFile(targetFile1);
    console.log('Successfully saved to:', targetFile1);

    // Coba simpan juga ke pengujian_sistem.xlsx jika tidak sedang dibuka di Excel
    try {
        const targetFile2 = path.join(__dirname, '..', 'pengujian', 'pengujian_sistem.xlsx');
        await workbook.xlsx.writeFile(targetFile2);
        console.log('Successfully saved to:', targetFile2);
    } catch (e) {
        console.log('pengujian_sistem.xlsx is currently open in Excel, saved to Tabel_Pengujian_Sistem.xlsx instead.');
    }
}

buildClassifiedExcel().catch(err => {
    console.error('Error generating Excel:', err);
    process.exit(1);
});
