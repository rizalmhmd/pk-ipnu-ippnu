import ExcelJS from 'exceljs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// All 47 test cases customized specifically for PKPT IPNU IPPNU UNSIQ system
const testCases = [
    // --- 1. Autentikasi & Hak Akses ---
    {
        no: 1,
        modul: 'Autentikasi & Hak Akses',
        fitur: 'Login Administrator (berhasil)',
        input: 'Username/Email: admin@pkpt.org\nPassword: admin123',
        output: 'Masuk ke dashboard admin dengan hak akses menu penuh',
        hasil: 'âœ…\nBerhasil'
    },
    {
        no: 2,
        modul: 'Autentikasi & Hak Akses',
        fitur: 'Login Ketua (berhasil)',
        input: 'Username/Email: ketua@pkpt.org\nPassword: ketua123',
        output: 'Masuk ke dashboard dengan batasan menu khusus Ketua (Agenda, Pendaftar, Anggota, Galeri)',
        hasil: 'âœ…\nBerhasil'
    },
    {
        no: 3,
        modul: 'Autentikasi & Hak Akses',
        fitur: 'Login Departemen (berhasil)',
        input: 'Username/Email: departemen@pkpt.org\nPassword: dept123',
        output: 'Masuk ke dashboard dengan menu khusus pengelolaan konten (Berita, Artikel, Quotes)',
        hasil: 'âœ…\nBerhasil'
    },
    {
        no: 4,
        modul: 'Autentikasi & Hak Akses',
        fitur: 'Login kata sandi salah (gagal)',
        input: 'Email: admin@pkpt.org\nPassword: salah123',
        output: 'Muncul pesan error: "Kredensial yang diberikan tidak cocok dengan data kami"',
        hasil: 'âœ…\nBerhasil'
    },
    {
        no: 5,
        modul: 'Autentikasi & Hak Akses',
        fitur: 'Login format email salah (gagal)',
        input: 'Email: bukan-email\nPassword: admin123',
        output: 'Muncul pesan error: "Format email tidak valid"',
        hasil: 'âœ…\nBerhasil'
    },
    {
        no: 6,
        modul: 'Autentikasi & Hak Akses',
        fitur: 'Lihat kata sandi / Show password (berhasil)',
        input: 'Klik ikon mata pada kolom password',
        output: 'Tipe input berubah dari password ke text dan karakter sandi dapat terbaca',
        hasil: 'âœ…\nBerhasil'
    },
    {
        no: 7,
        modul: 'Autentikasi & Hak Akses',
        fitur: 'Akses halaman admin tanpa login (gagal)',
        input: 'Mengakses URL /admin/dashboard secara langsung',
        output: 'Akses ditolak oleh middleware auth dan dialihkan ke halaman login',
        hasil: 'âœ…\nBerhasil'
    },
    {
        no: 8,
        modul: 'Autentikasi & Hak Akses',
        fitur: 'Logout dari sistem (berhasil)',
        input: 'Klik tombol Keluar pada sidebar',
        output: 'Sesi login dihapus dan dialihkan kembali ke halaman utama publik',
        hasil: 'âœ…\nBerhasil'
    },

    // --- 2. Halaman Publik & Navigasi Informasi ---
    {
        no: 9,
        modul: 'Halaman Publik & Informasi',
        fitur: 'Menampilkan Beranda utama (berhasil)',
        input: 'Mengakses URL /',
        output: 'Menampilkan navbar, banner hero, statistik, warta terbaru, dan agenda kegiatan',
        hasil: 'âœ…\nBerhasil'
    },
    {
        no: 10,
        modul: 'Halaman Publik & Informasi',
        fitur: 'Scroll navbar sticky (berhasil)',
        input: 'Gulir halaman ke bawah melebihi 50px',
        output: 'Bilah navigasi berubah latar menjadi hijau pekat berbayang dan tetap melayang',
        hasil: 'âœ…\nBerhasil'
    },
    {
        no: 11,
        modul: 'Halaman Publik & Informasi',
        fitur: 'Melihat profil Visi & Misi (berhasil)',
        input: 'Sorot menu Profil lalu klik Visi & Misi',
        output: 'Masuk ke halaman /profil/visi-misi memuat narasi visi dan misi organisasi',
        hasil: 'âœ…\nBerhasil'
    },
    {
        no: 12,
        modul: 'Halaman Publik & Informasi',
        fitur: 'Membuka detail berita (berhasil)',
        input: 'Klik salah satu kartu berita terkini',
        output: 'Menampilkan halaman /berita/{slug} memuat foto resolusi penuh, penulis, tanggal, dan isi berita',
        hasil: 'âœ…\nBerhasil'
    },
    {
        no: 13,
        modul: 'Halaman Publik & Informasi',
        fitur: 'Membuka detail artikel opini (berhasil)',
        input: 'Klik salah satu kartu artikel opini',
        output: 'Menampilkan halaman /artikel/{slug} memuat judul opini, foto pendukung, nama kader, dan isi gagasan',
        hasil: 'âœ…\nBerhasil'
    },
    {
        no: 14,
        modul: 'Halaman Publik & Informasi',
        fitur: 'Melihat galeri dokumentasi (berhasil)',
        input: 'Klik menu Galeri pada navbar',
        output: 'Menampilkan galeri foto kegiatan dalam format grid modern',
        hasil: 'âœ…\nBerhasil'
    },
    {
        no: 15,
        modul: 'Halaman Publik & Informasi',
        fitur: 'Melihat daftar agenda kegiatan (berhasil)',
        input: 'Klik menu Agenda pada navbar',
        output: 'Menampilkan daftar kegiatan yang diurutkan berdasarkan tanggal pelaksanaan terdekat',
        hasil: 'âœ…\nBerhasil'
    },

    // --- 3. Formulir Pendaftaran Dinamis & Validasi NIK ---
    {
        no: 16,
        modul: 'Pendaftaran & Validasi NIK',
        fitur: 'Pendaftaran kegiatan (berhasil)',
        input: 'Mengisi form dengan data valid (Nama, WA, Email, NIK 16 digit) dan memilih metode bayar',
        output: 'Data pendaftar tersimpan ke basis data dan diarahkan ke halaman transaksi',
        hasil: 'âœ…\nBerhasil'
    },
    {
        no: 17,
        modul: 'Pendaftaran & Validasi NIK',
        fitur: 'Pendaftaran dengan kolom wajib kosong (gagal)',
        input: 'Kolom Nama Lengkap dan Nomor WhatsApp dikosongkan',
        output: 'Muncul pesan error: "Kolom ini wajib diisi" pada field terkait',
        hasil: 'âœ…\nBerhasil'
    },
    {
        no: 18,
        modul: 'Pendaftaran & Validasi NIK',
        fitur: 'Pendaftaran dengan nomor WhatsApp salah (gagal)',
        input: 'Nomor WhatsApp kurang dari 9 digit (contoh: 0812)',
        output: 'Muncul pesan error: "Nomor WhatsApp minimal 9 digit"',
        hasil: 'âœ…\nBerhasil'
    },
    {
        no: 19,
        modul: 'Pendaftaran & Validasi NIK',
        fitur: 'Pendaftaran dengan NIK tidak lengkap (gagal)',
        input: 'NIK kurang dari 16 digit (contoh: 8 digit)',
        output: 'Muncul pesan error: "NIK harus berupa 16 digit angka"',
        hasil: 'âœ…\nBerhasil'
    },
    {
        no: 20,
        modul: 'Pendaftaran & Validasi NIK',
        fitur: 'Deteksi wilayah otomatis via NIK (berhasil)',
        input: 'Input NIK 16 digit valid (contoh: 3509121405040001)',
        output: 'Kotak hijau deteksi muncul otomatis menampilkan jenis kelamin, tanggal lahir, kecamatan, kabupaten, dan provinsi',
        hasil: 'âœ…\nBerhasil'
    },
    {
        no: 21,
        modul: 'Pendaftaran & Validasi NIK',
        fitur: 'Pendaftaran ganda / duplikat (gagal)',
        input: 'Menginputkan kembali NIK atau No WA yang sama pada agenda yang sama',
        output: 'Muncul pesan error: "Anda sudah terdaftar pada kegiatan ini"',
        hasil: 'âœ…\nBerhasil'
    },
    {
        no: 22,
        modul: 'Pendaftaran & Validasi NIK',
        fitur: 'Pendaftaran agenda yang ditutup (gagal)',
        input: 'Mengakses URL form agenda dengan status buka pendaftaran = nonaktif',
        output: 'Akses form dicegah dan muncul notifikasi pendaftaran telah ditutup',
        hasil: 'âœ…\nBerhasil'
    },

    // --- 4. Transaksi & Pembayaran Kegiatan ---
    {
        no: 23,
        modul: 'Pembayaran & Transaksi',
        fitur: 'Membuka pop-up bayar Midtrans (berhasil)',
        input: 'Klik tombol Bayar Sekarang pada halaman pembayaran Midtrans',
        output: 'Pop-up Snap Midtrans terbuka menampilkan kanal QRIS, Virtual Account, dan E-Wallet',
        hasil: 'âœ…\nBerhasil'
    },
    {
        no: 24,
        modul: 'Pembayaran & Transaksi',
        fitur: 'Cek status pembayaran Midtrans (berhasil)',
        input: 'Klik tombol Sudah Bayar? Cek Status Pembayaran',
        output: 'Sistem memeriksa status transaksi ke API Midtrans dan menampilkan status terkini',
        hasil: 'âœ…\nBerhasil'
    },
    {
        no: 25,
        modul: 'Pembayaran & Transaksi',
        fitur: 'Webhook notifikasi pelunasan Midtrans (berhasil)',
        input: 'Server Midtrans mengirim callback settlement',
        output: 'Status pendaftar di basis data otomatis berubah menjadi approved (lunas) secara real-time',
        hasil: 'âœ…\nBerhasil'
    },
    {
        no: 26,
        modul: 'Pembayaran & Transaksi',
        fitur: 'Upload bukti transfer manual (berhasil)',
        input: 'Pilih metode transfer manual dan upload foto bukti transfer (format .jpg, 1 MB)',
        output: 'Berkas bukti bayar tersimpan dan status pendaftaran menjadi pending verifikasi admin',
        hasil: 'âœ…\nBerhasil'
    },
    {
        no: 27,
        modul: 'Pembayaran & Transaksi',
        fitur: 'Upload bukti transfer format tidak sah (gagal)',
        input: 'Unggah file dengan ekstensi selain gambar (contoh: bukti.pdf atau bukti.exe)',
        output: 'Muncul pesan error: "File bukti pembayaran harus berupa gambar (jpeg, png, jpg, webp)"',
        hasil: 'âœ…\nBerhasil'
    },
    {
        no: 28,
        modul: 'Pembayaran & Transaksi',
        fitur: 'Upload bukti transfer melebihi 5MB (gagal)',
        input: 'Unggah file gambar berukuran 8 MB (batas sistem: 5 MB)',
        output: 'Muncul pesan error: "Ukuran maksimal file bukti pembayaran adalah 5MB"',
        hasil: 'âœ…\nBerhasil'
    },

    // --- 5. Dashboard Admin & Panel Notifikasi ---
    {
        no: 29,
        modul: 'Dashboard Admin',
        fitur: 'Menampilkan metrik statistik (berhasil)',
        input: 'Buka halaman /admin/dashboard',
        output: 'Menampilkan 8 kartu ringkasan total data (Berita, Artikel, Anggota, Agenda, Pendaftar, dll.) secara akurat',
        hasil: 'âœ…\nBerhasil'
    },
    {
        no: 30,
        modul: 'Dashboard Admin',
        fitur: 'Menampilkan indikator status sistem (berhasil)',
        input: 'Pemuatan halaman dashboard admin',
        output: 'Menampilkan status card "Online & Stabil" dengan indikator titik hijau berdenyut',
        hasil: 'âœ…\nBerhasil'
    },
    {
        no: 31,
        modul: 'Dashboard Admin',
        fitur: 'Menampilkan log aktivitas terbaru (berhasil)',
        input: 'Pemuatan seksi Aktivitas Terakhir pada dashboard',
        output: 'Menampilkan daftar aktivitas terbaru secara kronologis berdasarkan waktu',
        hasil: 'âœ…\nBerhasil'
    },
    {
        no: 32,
        modul: 'Dashboard Admin',
        fitur: 'Pintasan cepat / Quick shortcuts (berhasil)',
        input: 'Klik tombol [+ Post Berita] atau [+ Agenda Baru]',
        output: 'Langsung diarahkan ke halaman formulir pembuatan konten yang relevan',
        hasil: 'âœ…\nBerhasil'
    },
    {
        no: 33,
        modul: 'Dashboard Admin',
        fitur: 'Ganti tema Dark / Light Mode (berhasil)',
        input: 'Klik tombol pengubah tema pada topbar',
        output: 'Seluruh antarmuka admin beralih antara tema gelap dan terang secara instan',
        hasil: 'âœ…\nBerhasil'
    },

    // --- 6. Manajemen Data Pendaftar Kegiatan ---
    {
        no: 34,
        modul: 'Kelola Data Pendaftar',
        fitur: 'Menampilkan tabel data pendaftar (berhasil)',
        input: 'Buka halaman /admin/registrations',
        output: 'Menampilkan tabel pendaftar lengkap dengan kolom nama, kontak, agenda, status bayar, dan aksi',
        hasil: 'âœ…\nBerhasil'
    },
    {
        no: 35,
        modul: 'Kelola Data Pendaftar',
        fitur: 'Filter pendaftar berdasarkan agenda (berhasil)',
        input: 'Pilih agenda tertentu pada dropdown filter agenda',
        output: 'Tabel hanya menampilkan data peserta yang mendaftar pada agenda yang dipilih',
        hasil: 'âœ…\nBerhasil'
    },
    {
        no: 36,
        modul: 'Kelola Data Pendaftar',
        fitur: 'Sinkronisasi massal status Midtrans (berhasil)',
        input: 'Klik tombol [Sinkronkan Semua Midtrans]',
        output: 'Sistem memeriksa transaksi pending ke Midtrans dan mengupdate status pendaftar secara serentak',
        hasil: 'âœ…\nBerhasil'
    },
    {
        no: 37,
        modul: 'Kelola Data Pendaftar',
        fitur: 'Pratinjau detail pendaftar & bukti bayar (berhasil)',
        input: 'Klik tombol ikon mata pada baris pendaftar',
        output: 'Pop-up modal muncul menampilkan seluruh isian form peserta dan pratinjau foto bukti transfer',
        hasil: 'âœ…\nBerhasil'
    },
    {
        no: 38,
        modul: 'Kelola Data Pendaftar',
        fitur: 'Persetujuan pendaftar manual (berhasil)',
        input: 'Klik tombol centang hijau [Setujui] pada pendaftar pending',
        output: 'Status pendaftar berhasil diperbarui menjadi approved di basis data',
        hasil: 'âœ…\nBerhasil'
    },
    {
        no: 39,
        modul: 'Kelola Data Pendaftar',
        fitur: 'Penolakan pendaftar disertai alasan (berhasil)',
        input: 'Klik tombol silang merah [Tolak] dan isi alasan penolakan',
        output: 'Status pendaftar berubah menjadi rejected dan sistem otomatis mengirimkan surel penolakan ke peserta',
        hasil: 'âœ…\nBerhasil'
    },
    {
        no: 40,
        modul: 'Kelola Data Pendaftar',
        fitur: 'Hapus data pendaftar (berhasil)',
        input: 'Klik tombol ikon Hapus dan konfirmasi dialog peringatan',
        output: 'Data pendaftar dihapus secara permanen dari basis data',
        hasil: 'âœ…\nBerhasil'
    },

    // --- 7. Modul Content Management System (CMS) ---
    {
        no: 41,
        modul: 'Kelola Konten CMS',
        fitur: 'Tambah berita kegiatan (berhasil)',
        input: 'Isi judul berita, unggah foto sampul, dan tulis narasi berita lengkap',
        output: 'Berita tersimpan, slug URL terbentuk otomatis, dan warta langsung tampil pada beranda publik',
        hasil: 'âœ…\nBerhasil'
    },
    {
        no: 42,
        modul: 'Kelola Konten CMS',
        fitur: 'Tambah berita tanpa judul (gagal)',
        input: 'Kolom judul dikosongkan',
        output: 'Muncul pesan error: "The title field is required"',
        hasil: 'âœ…\nBerhasil'
    },
    {
        no: 43,
        modul: 'Kelola Konten CMS',
        fitur: 'Pratinjau foto langsung / Live Preview (berhasil)',
        input: 'Pilih file foto dari komputer pada area dropzone unggah',
        output: 'Foto langsung tampil di layar formulir sebelum tombol simpan ditekan',
        hasil: 'âœ…\nBerhasil'
    },
    {
        no: 44,
        modul: 'Kelola Konten CMS',
        fitur: 'Ubah / Edit berita kegiatan (berhasil)',
        input: 'Klik tombol Edit pada salah satu berita, ubah teks, lalu klik simpan',
        output: 'Pembaruan data berita tersimpan dan perubahan langsung tercermin pada situs publik',
        hasil: 'âœ…\nBerhasil'
    },
    {
        no: 45,
        modul: 'Kelola Konten CMS',
        fitur: 'Hapus warta berita (berhasil)',
        input: 'Klik tombol Hapus pada berita yang dipilih lalu konfirmasi dialog',
        output: 'Berita beserta berkas foto sampulnya terhapus secara permanen dari server',
        hasil: 'âœ…\nBerhasil'
    },
    {
        no: 46,
        modul: 'Kelola Konten CMS',
        fitur: 'Tambah artikel opini kader (berhasil)',
        input: 'Isi judul artikel, nama kader penulis, unggah foto, dan tulis narasi opini',
        output: 'Artikel berhasil disimpan dengan status published dan muncul di arsip artikel',
        hasil: 'âœ…\nBerhasil'
    },
    {
        no: 47,
        modul: 'Kelola Konten CMS',
        fitur: 'Kelola struktur pengurus organisasi (berhasil)',
        input: 'Tambah pengurus baru (Nama, Jabatan, Tipe: IPNU/IPPNU, Tingkat: BPH/Dept, Foto)',
        output: 'Data pengurus tersimpan dan tersusun rapi pada bagan struktur organisasi di menu profil',
        hasil: 'âœ…\nBerhasil'
    }
];

// Excel Borders and Fills
const thinBlackBorder = {
    top: { style: 'thin', color: { argb: 'FF000000' } },
    bottom: { style: 'thin', color: { argb: 'FF000000' } },
    left: { style: 'thin', color: { argb: 'FF000000' } },
    right: { style: 'thin', color: { argb: 'FF000000' } }
};

async function generateExactExcel() {
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'Antigravity';
    workbook.created = new Date();

    // ========================================================
    // SHEET 1: TABEL PENGUJIAN SISTEM (Utuh 47 Butir Uji)
    // Sesuai dengan gambar format pengguna
    // ========================================================
    const wsAll = workbook.addWorksheet('Tabel Pengujian Sistem', {
        views: [{ showGridLines: true }]
    });

    // Column widths
    wsAll.columns = [
        { width: 6 },   // No
        { width: 34 },  // Fitur yang Diuji
        { width: 38 },  // Input yang Diberikan
        { width: 45 },  // Output yang Diharapkan
        { width: 14 }   // Hasil
    ];

    // Header Row (Row 1)
    const headerRow = wsAll.getRow(1);
    const headers = ['No', 'Fitur yang Diuji', 'Input yang Diberikan', 'Output yang Diharapkan', 'Hasil'];

    headers.forEach((h, idx) => {
        const cell = headerRow.getCell(idx + 1);
        cell.value = h;
        cell.font = { name: 'Times New Roman', size: 12, bold: true, color: { argb: 'FF000000' } };
        cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
        cell.border = thinBlackBorder;
    });
    headerRow.height = 30;

    // Data Rows
    testCases.forEach((tc, index) => {
        const rowNum = index + 2;
        const row = wsAll.getRow(rowNum);

        // Col 1: No
        const c1 = row.getCell(1);
        c1.value = tc.no;
        c1.font = { name: 'Times New Roman', size: 11, color: { argb: 'FF000000' } };
        c1.alignment = { horizontal: 'center', vertical: 'middle' };
        c1.border = thinBlackBorder;

        // Col 2: Fitur yang Diuji
        const c2 = row.getCell(2);
        c2.value = tc.fitur;
        c2.font = { name: 'Times New Roman', size: 11, color: { argb: 'FF000000' } };
        c2.alignment = { horizontal: 'left', vertical: 'middle', wrapText: true };
        c2.border = thinBlackBorder;

        // Col 3: Input yang Diberikan
        const c3 = row.getCell(3);
        c3.value = tc.input;
        c3.font = { name: 'Times New Roman', size: 11, color: { argb: 'FF000000' } };
        c3.alignment = { horizontal: 'left', vertical: 'middle', wrapText: true };
        c3.border = thinBlackBorder;

        // Col 4: Output yang Diharapkan
        const c4 = row.getCell(4);
        c4.value = tc.output;
        c4.font = { name: 'Times New Roman', size: 11, color: { argb: 'FF000000' } };
        c4.alignment = { horizontal: 'left', vertical: 'middle', wrapText: true };
        c4.border = thinBlackBorder;

        // Col 5: Hasil
        const c5 = row.getCell(5);
        c5.value = tc.hasil;
        c5.font = { name: 'Times New Roman', size: 11, bold: true, color: { argb: 'FF000000' } };
        c5.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
        c5.border = thinBlackBorder;

        row.height = 38;
    });

    // ========================================================
    // SHEET 2: PENGUJIAN PER MODUL (Dikelompokkan dengan Header Modul)
    // ========================================================
    const wsGrouped = workbook.addWorksheet('Pengujian per Kategori Modul', {
        views: [{ showGridLines: true }]
    });

    wsGrouped.columns = [
        { width: 6 },   // No
        { width: 34 },  // Fitur yang Diuji
        { width: 38 },  // Input yang Diberikan
        { width: 45 },  // Output yang Diharapkan
        { width: 14 }   // Hasil
    ];

    let gRow = 1;

    // Group test cases by module
    const modules = [
        'Autentikasi & Hak Akses',
        'Halaman Publik & Informasi',
        'Pendaftaran & Validasi NIK',
        'Pembayaran & Transaksi',
        'Dashboard Admin',
        'Kelola Data Pendaftar',
        'Kelola Konten CMS'
    ];

    modules.forEach(modName => {
        // Group Header Row
        const groupTitleRow = wsGrouped.getRow(gRow);
        groupTitleRow.getCell(1).value = `Kategori: ${modName}`;
        wsGrouped.mergeCells(gRow, 1, gRow, 5);
        groupTitleRow.getCell(1).font = { name: 'Times New Roman', size: 11, bold: true, color: { argb: 'FF000000' } };
        groupTitleRow.getCell(1).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFF2F4F7' }
        };
        groupTitleRow.getCell(1).alignment = { horizontal: 'left', vertical: 'middle' };
        groupTitleRow.getCell(1).border = thinBlackBorder;
        groupTitleRow.height = 24;
        gRow++;

        // Sub Table Header
        const subHeaderRow = wsGrouped.getRow(gRow);
        headers.forEach((h, idx) => {
            const cell = subHeaderRow.getCell(idx + 1);
            cell.value = h;
            cell.font = { name: 'Times New Roman', size: 11, bold: true, color: { argb: 'FF000000' } };
            cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
            cell.border = thinBlackBorder;
        });
        subHeaderRow.height = 26;
        gRow++;

        // Filter items
        const items = testCases.filter(t => t.modul === modName);
        items.forEach(tc => {
            const row = wsGrouped.getRow(gRow);

            row.getCell(1).value = tc.no;
            row.getCell(1).font = { name: 'Times New Roman', size: 11 };
            row.getCell(1).alignment = { horizontal: 'center', vertical: 'middle' };
            row.getCell(1).border = thinBlackBorder;

            row.getCell(2).value = tc.fitur;
            row.getCell(2).font = { name: 'Times New Roman', size: 11 };
            row.getCell(2).alignment = { horizontal: 'left', vertical: 'middle', wrapText: true };
            row.getCell(2).border = thinBlackBorder;

            row.getCell(3).value = tc.input;
            row.getCell(3).font = { name: 'Times New Roman', size: 11 };
            row.getCell(3).alignment = { horizontal: 'left', vertical: 'middle', wrapText: true };
            row.getCell(3).border = thinBlackBorder;

            row.getCell(4).value = tc.output;
            row.getCell(4).font = { name: 'Times New Roman', size: 11 };
            row.getCell(4).alignment = { horizontal: 'left', vertical: 'middle', wrapText: true };
            row.getCell(4).border = thinBlackBorder;

            row.getCell(5).value = tc.hasil;
            row.getCell(5).font = { name: 'Times New Roman', size: 11, bold: true };
            row.getCell(5).alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
            row.getCell(5).border = thinBlackBorder;

            row.height = 36;
            gRow++;
        });

        gRow += 1; // blank row between categories
    });

    // Write file
    const outputPath = path.join(__dirname, '..', 'pengujian', 'pengujian_sistem.xlsx');
    await workbook.xlsx.writeFile(outputPath);
    console.log('Successfully generated pengujian_sistem.xlsx matching user image format!');
}

generateExactExcel().catch(err => {
    console.error('Error generating Excel:', err);
    process.exit(1);
});

