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

const tableWidth = 700;
const pageX = 75;

// Data definitions
const testData = {
    auth: {
        id: 't430',
        subLetter: 'a',
        subTitle: 'Pengujian Modul Autentikasi & Hak Akses Pengurus',
        tableNum: 'Tabel 4. 30',
        tableTitle: 'Pengujian Modul Autentikasi & Hak Akses',
        intro: 'Pengujian ini bertujuan untuk memastikan keamanan akses portal manajemen pengurus (/login) dan keandalan pembatasan hak akses berbasis peran (Role-Based Access Control) antara admin, ketua, dan departemen.',
        headers: ['No', 'Skenario Pengujian', 'Masukan (Input)', 'Hasil yang Diharapkan', 'Hasil Pengamatan', 'Kesimpulan'],
        colWidths: ['5%', '21%', '20%', '26%', '20%', '8%'],
        rows: [
            [
                '1',
                'Login dengan data valid (Role Administrator)',
                'Email: admin@pkpt.org<br/>Password: admin123',
                'Sistem memvalidasi kredensial, membuat sesi login, dan mengarahkan pengguna ke halaman Dashboard Admin dengan akses menu penuh.',
                'Sesuai harapan, dialihkan ke /admin/dashboard dengan hak akses Administrator.',
                'Valid'
            ],
            [
                '2',
                'Login dengan data valid (Role Ketua IPNU/IPPNU)',
                'Email: ketua@pkpt.org<br/>Password: ketua123',
                'Sistem mengotentikasi pengguna dan menampilkan Dashboard dengan menu terbatas (Agenda, Pendaftar, Anggota, Galeri, Statistik).',
                'Sesuai harapan, dialihkan ke Dashboard dengan batasan menu khusus Ketua.',
                'Valid'
            ],
            [
                '3',
                'Login dengan data valid (Role Departemen)',
                'Email: departemen@pkpt.org<br/>Password: dept123',
                'Sistem mengotentikasi pengguna dan hanya menampilkan menu konten (Berita, Artikel, Quotes).',
                'Sesuai harapan, menu manajemen anggota/pendaftar tersembunyi sesuai hak akses.',
                'Valid'
            ],
            [
                '4',
                'Login dengan kata sandi salah',
                'Email: admin@pkpt.org<br/>Password: salah123',
                'Sistem menolak proses login dan menampilkan pesan peringatan error bahwa kredensial tidak sesuai.',
                'Tampil pesan peringatan kesalahan kredensial dan form sandi dikosongkan kembali.',
                'Valid'
            ],
            [
                '5',
                'Login dengan format email tidak valid',
                'Email: bukan-email<br/>Password: admin123',
                'Validasi form memblokir pengiriman dan meminta pengguna memasukkan alamat surel yang sah.',
                'Muncul validasi &quot;Format email tidak valid&quot; pada antarmuka.',
                'Valid'
            ],
            [
                '6',
                'Uji fitur intip kata sandi (Show/Hide Password)',
                'Klik ikon mata (Eye) pada kolom kata sandi',
                'Tipe input berubah dari password menjadi text, menampilkan teks sandi secara terbuka.',
                'Ikon berubah menjadi EyeOff dan karakter sandi dapat terbaca.',
                'Valid'
            ],
            [
                '7',
                'Mengakses halaman admin tanpa sesi login',
                'URL langsung: /admin/dashboard',
                'Akses ditolak oleh middleware auth, pengguna otomatis dialihkan ke halaman /login.',
                'Pengguna diarahkan ke /login dan tidak dapat melihat data admin.',
                'Valid'
            ],
            [
                '8',
                'Proses keluar (Logout) sistem',
                'Klik tombol [ Keluar ] pada panel sidebar',
                'Sesi autentikasi dihapus dari server dan pengguna diarahkan kembali ke halaman beranda publik.',
                'Sesi terhapus sempurna, tombol kembali ke halaman admin tidak dapat diakses.',
                'Valid'
            ]
        ]
    },
    publicInfo: {
        id: 't431',
        subLetter: 'b',
        subTitle: 'Pengujian Modul Publik & Navigasi Informasi',
        tableNum: 'Tabel 4. 31',
        tableTitle: 'Pengujian Modul Publik & Navigasi Informasi',
        intro: 'Pengujian ini memastikan seluruh halaman publik dapat diakses dengan cepat, memiliki tata letak responsif, dan menyajikan data dinamis dari basis data secara akurat.',
        headers: ['No', 'Skenario Pengujian', 'Masukan (Input)', 'Hasil yang Diharapkan', 'Hasil Pengamatan', 'Kesimpulan'],
        colWidths: ['5%', '21%', '20%', '26%', '20%', '8%'],
        rows: [
            [
                '1',
                'Mengakses halaman Beranda utama',
                'URL: /',
                'Menampilkan navbar transparan/blur, slider kutipan tokoh, seksi feature pengenalan, 4 kartu statistik, warta terkini, artikel opini, sambutan ketua, dan agenda terdekat.',
                'Halaman termuat lengkap dengan seluruh komponen visual dan data dari database.',
                'Valid'
            ],
            [
                '2',
                'Efek pengguliran (Scroll) Navbar',
                'Gulir halaman ke bawah melebihi 50px',
                'Bilah navigasi berubah latar belakang menjadi hijau emerald pekat dengan efek bayangan dan tetap melayang (sticky).',
                'Transisi visual navbar berjalan mulus (smooth transition).',
                'Valid'
            ],
            [
                '3',
                'Mengakses menu dropdown Profil',
                'Sorot kursor ke menu Profil lalu klik Visi &amp; Misi',
                'Dropdown terbuka menampilkan pilihan (Visi Misi, Sejarah, Struktur) dan mengarahkan ke halaman yang sesuai.',
                'Halaman /profil/visi-misi termuat dengan deskripsi visi dan misi organisasi.',
                'Valid'
            ],
            [
                '4',
                'Membuka detail berita',
                'Klik salah satu kartu berita pada seksi Berita Terkini',
                'Menampilkan halaman /berita/{slug} berisi gambar utama resolusi penuh, nama penulis, tanggal terbit, dan isi warta lengkap.',
                'Halaman detail warta berita tampil proporsional sesuai data slug.',
                'Valid'
            ],
            [
                '5',
                'Membuka detail artikel opini kader',
                'Klik salah satu kartu artikel opini',
                'Menampilkan halaman /artikel/{slug} berisi judul opini, foto pendukung, nama kader penulis, dan narasi gagasan.',
                'Artikel termuat rapi dan nyaman dibaca pada perangkat desktop maupun seluler.',
                'Valid'
            ],
            [
                '6',
                'Membuka halaman Galeri dokumentasi',
                'Klik menu Galeri pada navbar',
                'Menampilkan galeri foto kegiatan dalam format grid modern dengan judul kegiatan pada setiap foto.',
                'Foto-foto kegiatan termuat secara dinamis dari tabel galleries.',
                'Valid'
            ],
            [
                '7',
                'Pemuatan kalender &amp; daftar kegiatan',
                'Klik menu Agenda pada navbar',
                'Menampilkan daftar kegiatan yang diurutkan berdasarkan tanggal pelaksanaan terdekat.',
                'Agenda kegiatan masa depan termuat lengkap beserta waktu dan lokasinya.',
                'Valid'
            ]
        ]
    },
    formNik: {
        id: 't432',
        subLetter: 'c',
        subTitle: 'Pengujian Formulir Pendaftaran Dinamis & Validasi NIK',
        tableNum: 'Tabel 4. 32',
        tableTitle: 'Pengujian Formulir Pendaftaran & Validasi NIK',
        intro: 'Pengujian ini memverifikasi keandalan formulir pendaftaran kegiatan, validasi format data, kalkulasi otomatis NIK, serta pencegahan pendaftaran ganda pada agenda yang sama.',
        headers: ['No', 'Skenario Pengujian', 'Masukan (Input)', 'Hasil yang Diharapkan', 'Hasil Pengamatan', 'Kesimpulan'],
        colWidths: ['5%', '21%', '20%', '26%', '20%', '8%'],
        rows: [
            [
                '1',
                'Pendaftaran dengan data lengkap dan valid',
                'Nama: Ahmad Fauzi<br/>WA: 081234567890<br/>Email: ahmad@unsiq.ac.id<br/>NIK: 3509121405040001 (16 digit)<br/>Metode: midtrans',
                'Data berhasil divalidasi, disimpan ke tabel agenda_registrations dengan status pending, dan diarahkan ke halaman pembayaran Midtrans.',
                'Data tersimpan dengan kode REG-..., dialihkan ke rute /kegiatan/payment/{id}.',
                'Valid'
            ],
            [
                '2',
                'Mengosongkan kolom wajib (Required field)',
                'Kolom Nama Lengkap dan Nomor WhatsApp dikosongkan',
                'Sistem membatalkan submit dan memunculkan pesan galat &quot;Kolom ini wajib diisi&quot; pada field terkait.',
                'Form tidak terkirim dan muncul tanda peringatan merah pada input yang kosong.',
                'Valid'
            ],
            [
                '3',
                'Input nomor WhatsApp kurang dari 9 digit',
                'No WA: 0812',
                'Sistem menolak data dengan notifikasi &quot;Nomor WhatsApp minimal 9 digit&quot;.',
                'Pesan error validasi nomor telepon berhasil ditampilkan.',
                'Valid'
            ],
            [
                '4',
                'Input NIK kurang dari 16 digit',
                'NIK: 35091234 (8 digit)',
                'Sistem menolak input dengan notifikasi &quot;NIK harus berupa 16 digit angka&quot;.',
                'Peringatan validasi NIK berhasil mencegah input yang tidak lengkap.',
                'Valid'
            ],
            [
                '5',
                'Input NIK 16 digit valid (Uji parser wilayah)',
                'NIK: 3509121405040001',
                'Fitur parseFullNik otomatis mendeteksi dan menampilkan informasi: Jenis Kelamin (Laki-Laki), Tanggal Lahir (14-05-2004), Kecamatan (Sumbersari), Kab/Kota (Jember), Provinsi (Jatim).',
                'Kotak hijau deteksi identitas NIK muncul otomatis di bawah kolom NIK.',
                'Valid'
            ],
            [
                '6',
                'Uji pencegahan pendaftaran ganda (Duplicate Registration)',
                'Menginput kembali NIK atau No WA yang sama pada agenda yang sama',
                'Sistem memeriksa data pendaftar aktif, menolak pendaftaran kedua, dan memunculkan pesan peringatan bahwa peserta sudah terdaftar.',
                'Sistem mendeteksi duplikasi data dan menggagalkan pendaftaran ganda.',
                'Valid'
            ],
            [
                '7',
                'Mengakses pendaftaran agenda yang sudah ditutup',
                'Akses URL pendaftaran agenda dengan is_registration_open = false',
                'Sistem menampilkan pesan bahwa pendaftaran untuk kegiatan tersebut telah ditutup.',
                'Akses formulir dicegah dan muncul notifikasi pendaftaran ditutup.',
                'Valid'
            ]
        ]
    },
    payment: {
        id: 't433',
        subLetter: 'd',
        subTitle: 'Pengujian Transaksi & Pembayaran Kegiatan',
        tableNum: 'Tabel 4. 33',
        tableTitle: 'Pengujian Transaksi & Pembayaran Kegiatan',
        intro: 'Pengujian ini memastikan transaksi pembayaran baik melalui Payment Gateway Midtrans (otomatis) maupun transfer bank konvensional (manual) dapat tercatat dan tersinkronisasi statusnya secara tepat.',
        headers: ['No', 'Skenario Pengujian', 'Masukan (Input)', 'Hasil yang Diharapkan', 'Hasil Pengamatan', 'Kesimpulan'],
        colWidths: ['5%', '21%', '20%', '26%', '20%', '8%'],
        rows: [
            [
                '1',
                'Pemuatan pop-up pembayaran otomatis Midtrans',
                'Akses halaman pembayaran dengan metode midtrans, klik tombol [ Bayar Sekarang ]',
                'Skrip Snap Midtrans mengeksekusi token transaksi dan memunculkan pop-up pilihan kanal bayar (QRIS, VA BCA/BRI/Mandiri, E-Wallet).',
                'Modal Snap Midtrans terbuka dengan rincian total tagihan yang sesuai.',
                'Valid'
            ],
            [
                '2',
                'Pengecekan status pembayaran otomatis via tombol verifikasi',
                'Klik tombol [ Sudah Bayar? Cek Status Pembayaran ]',
                'Sistem mengirimkan request ke endpoint verifikasi, memeriksa status transaksi ke server Midtrans, dan memperbarui status pendaftaran jika sudah lunas.',
                'Muncul dialog SweetAlert2 memuat status mutasi transaksi terkini.',
                'Valid'
            ],
            [
                '3',
                'Simulasi penerimaan notifikasi Webhook Midtrans (Settlement)',
                'Webhook payload Midtrans dengan status settlement',
                'Endpoint /api/midtrans-callback memvalidasi signature key, mengubah status pendaftaran menjadi approved, dan mencatat waktu bayar.',
                'Status pendaftaran di basis data otomatis berubah menjadi approved secara real-time.',
                'Valid'
            ],
            [
                '4',
                'Pendaftaran metode Transfer Manual dengan bukti pembayaran',
                'Pilih metode transfer, unggah berkas bukti_transfer.jpg (ukuran 1,2 MB)',
                'Sistem memvalidasi tipe file berkas gambar, menyimpan file ke storage, dan mencatat status pending menunggu verifikasi admin.',
                'Berkas bukti transfer tersimpan dengan aman dan tampil di panel admin.',
                'Valid'
            ],
            [
                '5',
                'Unggah bukti transfer dengan format tidak didukung',
                'Unggah berkas berformat bukti.pdf atau bukti.exe',
                'Sistem menolak unggahan dengan notifikasi &quot;File bukti pembayaran harus berupa gambar (jpeg, png, jpg, webp)&quot;.',
                'Berkas non-gambar ditolak sebelum formulir dapat dikirimkan.',
                'Valid'
            ],
            [
                '6',
                'Unggah bukti transfer melebihi ukuran batas maksimum',
                'Unggah file gambar berukuran 8 MB (Batas: 5 MB)',
                'Sistem menolak unggahan dengan notifikasi &quot;Ukuran maksimal file bukti pembayaran adalah 5MB&quot;.',
                'Sistem membatasi ukuran unggahan demi menjaga stabilitas penyimpanan server.',
                'Valid'
            ]
        ]
    },
    dashboard: {
        id: 't434',
        subLetter: 'e',
        subTitle: 'Pengujian Dashboard Admin & Panel Notifikasi',
        tableNum: 'Tabel 4. 34',
        tableTitle: 'Pengujian Dashboard Admin & Panel Notifikasi',
        intro: 'Pengujian ini memverifikasi keakuratan penyajian data statistik, ketersediaan menu navigasi sesuai role, serta fungsionalitas pemantauan aktivitas sistem.',
        headers: ['No', 'Skenario Pengujian', 'Masukan (Input)', 'Hasil yang Diharapkan', 'Hasil Pengamatan', 'Kesimpulan'],
        colWidths: ['5%', '21%', '20%', '26%', '20%', '8%'],
        rows: [
            [
                '1',
                'Tampilan ringkasan metrik statistik',
                'Membuka halaman /admin/dashboard',
                'Menampilkan 8 kartu metrik (Berita, Artikel, Anggota, Agenda, Pendaftar, Galeri, Quotes, Statistik) dengan angka total data yang akurat dari database.',
                'Nilai perhitungan kartu statistik sama persis dengan jumlah baris tabel database.',
                'Valid'
            ],
            [
                '2',
                'Indikator status sistem',
                'Pemuatan elemen status card',
                'Menampilkan indikator titik hijau berdenyut (pulse) dengan status teks &quot;Online &amp; Stabil&quot;.',
                'Tampilan status sistem aktif dan memberikan umpan balik visual yang baik.',
                'Valid'
            ],
            [
                '3',
                'Pemantauan aktivitas sistem terkini (Live Updates)',
                'Pemuatan seksi Aktivitas Terakhir',
                'Menampilkan daftar aktivitas terbaru (agenda baru, warta baru, pendaftar baru) dengan urutan waktu termutakhir (timestamp).',
                'Data aktivitas tercatat dan terurut secara kronologis dari yang terbaru.',
                'Valid'
            ],
            [
                '4',
                'Tombol aksi cepat (Quick Shortcuts)',
                'Klik tombol pintasan [ + Post Berita ] atau [ + Agenda Baru ]',
                'Sistem langsung mengarahkan pengguna ke halaman formulir pembuatan konten yang relevan.',
                'Pengalihan halaman form pembuatan berjalan cepat tanpa kendala.',
                'Valid'
            ],
            [
                '5',
                'Fitur pengalih tema tampilan (Dark / Light Mode)',
                'Klik tombol pengubah tema pada topbar',
                'Seluruh antarmuka admin beralih warna latar antara tema gelap (slate-950) dan tema terang (slate-50), status preferensi disimpan di local storage.',
                'Mode gelap dan terang berfungsi sempurna pada seluruh elemen antarmuka admin.',
                'Valid'
            ]
        ]
    },
    registrations: {
        id: 't435',
        subLetter: 'f',
        subTitle: 'Pengujian Modul Manajemen Data Pendaftar & Verifikasi',
        tableNum: 'Tabel 4. 35',
        tableTitle: 'Pengujian Modul Manajemen Data Pendaftar',
        intro: 'Pengujian ini memastikan pengurus dapat mengelola data peserta kegiatan secara efektif, memverifikasi pembayaran manual, serta melakukan sinkronisasi status transaksi dengan Midtrans.',
        headers: ['No', 'Skenario Pengujian', 'Masukan (Input)', 'Hasil yang Diharapkan', 'Hasil Pengamatan', 'Kesimpulan'],
        colWidths: ['5%', '21%', '20%', '26%', '20%', '8%'],
        rows: [
            [
                '1',
                'Membuka daftar pendaftar global',
                'URL: /admin/registrations',
                'Menampilkan tabel 6 kolom: Waktu Daftar, Pendaftar &amp; Agenda (Nama, WA, Email, NIK), Metode, Status, Bukti Bayar, dan Aksi.',
                'Tabel data pendaftar termuat lengkap dengan badge status berwarna.',
                'Valid'
            ],
            [
                '2',
                'Fitur pemfilteran data per agenda',
                'Pilih opsi agenda pada dropdown Filter Agenda (contoh: Makesta Raya 2026)',
                'Tabel hanya menampilkan peserta yang mendaftar pada agenda yang dipilih.',
                'Data dalam tabel otomatis terfilter sesuai agenda tanpa perlu memuat ulang seluruh halaman.',
                'Valid'
            ],
            [
                '3',
                'Fitur sinkronisasi massal status Midtrans',
                'Klik tombol [ Sinkronkan Semua Midtrans ]',
                'Sistem menjalankan perintah pengecekan ke API Midtrans untuk semua pendaftaran berstatus pending, dan memperbarui status menjadi approved jika transaksi lunas.',
                'Ikon refresh berputar dan status pembayaran terperbarui secara serentak.',
                'Valid'
            ],
            [
                '4',
                'Pratinjau detail pendaftar dan bukti bayar',
                'Klik tombol ikon [ Mata ] pada baris pendaftar',
                'Membuka modal pop-up menampilkan seluruh isian form peserta, rincian Midtrans, dan pratinjau foto bukti transfer.',
                'Seluruh data formulir peserta dan foto bukti transfer tampil jelas pada modal.',
                'Valid'
            ],
            [
                '5',
                'Persetujuan pendaftar manual (Approve)',
                'Klik tombol ikon centang hijau [ Setujui ] pada pendaftar pending',
                'Status pendaftar berubah menjadi approved dan tombol aksi persetujuan hilang.',
                'Status pendaftar berhasil diperbarui menjadi approved di database.',
                'Valid'
            ],
            [
                '6',
                'Penolakan pendaftar (Reject) disertai alasan',
                'Klik tombol ikon silang merah [ Tolak ], isi alasan penolakan pada dialog SweetAlert2',
                'Status berubah menjadi rejected dan sistem otomatis mengirimkan surel penolakan beserta alasannya kepada pendaftar.',
                'Status pendaftar terbarui dan fungsi pengiriman email notifikasi tereksekusi.',
                'Valid'
            ],
            [
                '7',
                'Hapus data pendaftar',
                'Klik tombol ikon [ Hapus ] lalu konfirmasi dialog',
                'Data pendaftar dihapus secara permanen dari tabel agenda_registrations.',
                'Baris pendaftar terhapus dari tampilan tabel dan data berkurang di basis data.',
                'Valid'
            ]
        ]
    },
    cms: {
        id: 't436',
        subLetter: 'g',
        subTitle: 'Pengujian Modul Content Management System (CMS)',
        tableNum: 'Tabel 4. 36',
        tableTitle: 'Pengujian Modul Pengelolaan Konten CMS',
        intro: 'Pengujian ini memverifikasi fungsionalitas publikasi dan pemeliharaan konten informasi (warta berita, artikel opini, galeri kegiatan, dan kutipan ulama).',
        headers: ['No', 'Skenario Pengujian', 'Masukan (Input)', 'Hasil yang Diharapkan', 'Hasil Pengamatan', 'Kesimpulan'],
        colWidths: ['5%', '21%', '20%', '26%', '20%', '8%'],
        rows: [
            [
                '1',
                'Menambahkan berita baru dengan data lengkap',
                'Judul: Pelantikan Pengurus Baru...<br/>Unggah Foto: pelantikan.jpg<br/>Isi Berita: Teks narasi lengkap',
                'Berita berhasil disimpan, slug dibuat otomatis dari judul, gambar tersimpan, dan berita langsung muncul di tabel serta halaman depan web.',
                'Data warta berita baru berhasil tersimpan dan langsung terlihat di portal publik.',
                'Valid'
            ],
            [
                '2',
                'Tambah berita tanpa mengisi judul',
                'Kolom judul dikosongkan',
                'Sistem menolak submit dan menampilkan pesan validasi &quot;The title field is required&quot;.',
                'Validasi form memblokir pengiriman formulir kosong.',
                'Valid'
            ],
            [
                '3',
                'Fitur pratinjau foto langsung (Live Image Preview)',
                'Memilih file foto pada area dropzone foto',
                'Gambar yang dipilih langsung tampil di layar sebelum formulir dikirimkan, dilengkapi tombol batal (X).',
                'Pratinjau foto langsung muncul seketika di dalam bingkai unggah.',
                'Valid'
            ],
            [
                '4',
                'Mengubah (Edit) berita yang sudah terbit',
                'Klik tombol [ Edit ], ubah judul atau isi berita, lalu klik simpan',
                'Data berita diperbarui di tabel posts dan perubahan langsung tercermin pada halaman web publik.',
                'Pembaruan isi warta berhasil diterapkan tanpa mengubah data yang tidak diedit.',
                'Valid'
            ],
            [
                '5',
                'Menghapus warta berita',
                'Klik tombol [ Hapus ] pada salah satu warta',
                'Muncul dialog konfirmasi; jika disetujui, data berita beserta file fotonya dihapus dari sistem.',
                'Berita terhapus dari daftar admin dan tidak lagi muncul di halaman publik.',
                'Valid'
            ],
            [
                '6',
                'Menambahkan artikel opini kader',
                'Judul opini, nama penulis kader, foto pendukung, dan isi artikel',
                'Artikel tersimpan di tabel articles dengan status published dan dapat diakses pada menu Artikel.',
                'Artikel opini baru berhasil terbit dan terindeks di halaman arsip artikel.',
                'Valid'
            ],
            [
                '7',
                'Manajemen data pengurus (Members)',
                'Tambah pengurus baru (Nama, Jabatan, Tipe: IPNU/IPPNU, Level: BPH/Dept, Foto)',
                'Data pengurus tersimpan dan tersusun rapi pada bagan struktur organisasi di menu Profil.',
                'Susunan pengurus tampil sesuai urutan tingkat (level) dan kelompok organisasi.',
                'Valid'
            ]
        ]
    },
    recap: {
        id: 't437',
        tableNum: 'Tabel 4. 37',
        tableTitle: 'Rekapitulasi Hasil Pengujian Black Box',
        headers: ['No', 'Modul / Fitur yang Diuji', 'Jumlah Butir Uji', 'Jumlah Valid', 'Jumlah Tidak Valid', 'Persentase Keberhasilan'],
        colWidths: ['6%', '38%', '14%', '14%', '14%', '14%'],
        rows: [
            ['1', 'Modul Autentikasi &amp; Hak Akses Pengurus', '8', '8', '0', '100%'],
            ['2', 'Modul Publik &amp; Navigasi Informasi', '7', '7', '0', '100%'],
            ['3', 'Formulir Pendaftaran Dinamis &amp; Validasi NIK', '7', '7', '0', '100%'],
            ['4', 'Transaksi &amp; Pembayaran Kegiatan (Midtrans &amp; Manual)', '6', '6', '0', '100%'],
            ['5', 'Dashboard Admin &amp; Panel Notifikasi', '5', '5', '0', '100%'],
            ['6', 'Modul Manajemen Data Pendaftar &amp; Verifikasi', '7', '7', '0', '100%'],
            ['7', 'Pengelolaan Konten CMS (Berita, Artikel, Media)', '7', '7', '0', '100%']
        ]
    }
};

// Function to generate raw HTML for testing table
function generateTestingTableHtml(data) {
    let html = `<table style="width:100%;border-collapse:collapse;font-family:'Times New Roman';font-size:12px;color:#000000;border:1px solid #000000;">`;
    html += `<tr style="background-color:#a6a6a6;font-weight:bold;text-align:center;">`;
    data.headers.forEach((h, idx) => {
        html += `<td style="border:1px solid #000000;padding:6px;width:${data.colWidths[idx]};">${h}</td>`;
    });
    html += `</tr>`;

    data.rows.forEach(r => {
        html += `<tr>`;
        html += `<td style="border:1px solid #000000;padding:5px 6px;text-align:center;">${r[0]}</td>`;
        html += `<td style="border:1px solid #000000;padding:5px 6px;">${r[1]}</td>`;
        html += `<td style="border:1px solid #000000;padding:5px 6px;">${r[2]}</td>`;
        html += `<td style="border:1px solid #000000;padding:5px 6px;">${r[3]}</td>`;
        html += `<td style="border:1px solid #000000;padding:5px 6px;">${r[4]}</td>`;
        html += `<td style="border:1px solid #000000;padding:5px 6px;text-align:center;font-weight:bold;color:#057a55;">${r[5]}</td>`;
        html += `</tr>`;
    });
    html += `</table>`;
    return html;
}

// Function to generate recap table HTML
function generateRecapTableHtml(data) {
    let html = `<table style="width:100%;border-collapse:collapse;font-family:'Times New Roman';font-size:12px;color:#000000;border:1px solid #000000;">`;
    html += `<tr style="background-color:#a6a6a6;font-weight:bold;text-align:center;">`;
    data.headers.forEach((h, idx) => {
        html += `<td style="border:1px solid #000000;padding:6px;width:${data.colWidths[idx]};">${h}</td>`;
    });
    html += `</tr>`;

    data.rows.forEach(r => {
        html += `<tr>`;
        html += `<td style="border:1px solid #000000;padding:5px 6px;text-align:center;">${r[0]}</td>`;
        html += `<td style="border:1px solid #000000;padding:5px 6px;">${r[1]}</td>`;
        html += `<td style="border:1px solid #000000;padding:5px 6px;text-align:center;">${r[2]}</td>`;
        html += `<td style="border:1px solid #000000;padding:5px 6px;text-align:center;font-weight:bold;color:#057a55;">${r[3]}</td>`;
        html += `<td style="border:1px solid #000000;padding:5px 6px;text-align:center;">${r[4]}</td>`;
        html += `<td style="border:1px solid #000000;padding:5px 6px;text-align:center;font-weight:bold;color:#057a55;">${r[5]}</td>`;
        html += `</tr>`;
    });

    html += `<tr style="background-color:#d9d9d9;font-weight:bold;text-align:center;">`;
    html += `<td style="border:1px solid #000000;padding:6px;" colspan="2">Total Kasus Uji</td>`;
    html += `<td style="border:1px solid #000000;padding:6px;">47</td>`;
    html += `<td style="border:1px solid #000000;padding:6px;color:#057a55;">47</td>`;
    html += `<td style="border:1px solid #000000;padding:6px;">0</td>`;
    html += `<td style="border:1px solid #000000;padding:6px;color:#057a55;">100%</td>`;
    html += `</tr>`;

    html += `</table>`;
    return html;
}

// Estimate table heights
function getTableHeight(data) {
    let base = 36; // header
    for (let r of data.rows) {
        let maxLen = Math.max(r[1].length, r[2].length, r[3].length, r[4].length);
        if (maxLen > 150) base += 85;
        else if (maxLen > 90) base += 65;
        else base += 45;
    }
    return base;
}

// Generate the complete single page diagram (Bab 4.12)
function generateFullChapterDiagram() {
    let xml = `  <diagram id="pengujian-lengkap" name="Bab 4.12 Pengujian Sistem (Lengkap)">\n`;
    xml += `    <mxGraphModel dx="1400" dy="1000" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="850" pageHeight="6500" math="0" shadow="0">\n`;
    xml += `      <root>\n`;
    xml += `        <mxCell id="0" />\n`;
    xml += `        <mxCell id="1" parent="0" />\n\n`;

    let currentY = 40;

    // Judul Utama 4.12
    xml += `        <!-- JUDUL & PARAGRAF PENGANTAR -->\n`;
    xml += `        <mxCell id="sec_title" value="4.12.    Pengujian Sistem" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;fontStyle=1;fontSize=14;fontColor=#000000;fontFamily=Times New Roman;" vertex="1" parent="1">\n`;
    xml += `          <mxGeometry x="${pageX}" y="${currentY}" width="${tableWidth}" height="26" as="geometry" />\n`;
    xml += `        </mxCell>\n`;
    currentY += 32;

    const introText = `&lt;div style=&quot;text-align:justify;line-height:1.6;text-indent:36px;font-family:&amp;#39;Times New Roman&amp;#39;;font-size:12.5px;color:#000000;&quot;&gt;Pengujian sistem merupakan tahapan krusial dalam siklus pengembangan perangkat lunak untuk memastikan bahwa seluruh fungsi, modul, validasi, dan integrasi antarmuka yang telah dibangun berjalan sesuai dengan spesifikasi kebutuhan pengguna (&lt;i&gt;user requirements&lt;/i&gt;) dan bebas dari galat (&lt;i&gt;error&lt;/i&gt;). Pada sistem ini, metode pengujian yang digunakan adalah &lt;b&gt;Metode Pengujian Kotak Hitam (&lt;i&gt;Black Box Testing&lt;/i&gt;)&lt;/b&gt;. Metode ini berfokus pada pengujian fungsionalitas masukan (&lt;i&gt;input&lt;/i&gt;) dan keluaran (&lt;i&gt;output&lt;/i&gt;) perangkat lunak tanpa perlu menguji atau mengetahui struktur kode internal program. Pengujian dilakukan dengan teknik &lt;i&gt;Equivalence Partitioning&lt;/i&gt; dan &lt;i&gt;Boundary Value Analysis&lt;/i&gt; untuk menguji skenario valid maupun skenario tidak valid pada setiap modul sistem.&lt;/div&gt;`;
    xml += `        <mxCell id="sec_intro" value="${introText}" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;whiteSpace=wrap;" vertex="1" parent="1">\n`;
    xml += `          <mxGeometry x="${pageX}" y="${currentY}" width="${tableWidth}" height="80" as="geometry" />\n`;
    xml += `        </mxCell>\n`;
    currentY += 90;

    // 4.12.1 Rencana Pengujian
    xml += `        <!-- 4.12.1 Rencana Pengujian Sistem -->\n`;
    xml += `        <mxCell id="sec_plan_title" value="4.12.1.  Rencana Pengujian Sistem" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;fontStyle=1;fontSize=13;fontColor=#000000;fontFamily=Times New Roman;" vertex="1" parent="1">\n`;
    xml += `          <mxGeometry x="${pageX}" y="${currentY}" width="${tableWidth}" height="24" as="geometry" />\n`;
    xml += `        </mxCell>\n`;
    currentY += 28;

    const planText = `&lt;div style=&quot;text-align:justify;line-height:1.6;font-family:&amp;#39;Times New Roman&amp;#39;;font-size:12px;color:#000000;&quot;&gt;Pengujian fungsionalitas Sistem Informasi PKPT IPNU-IPPNU mencakup 7 (tujuh) kelompok modul utama:&lt;br/&gt;1. &lt;b&gt;Pengujian Modul Autentikasi &amp;amp; Hak Akses Pengurus&lt;/b&gt; (Login, validasi sandi, sesi &lt;i&gt;Remember Me&lt;/i&gt;, otorisasi RBAC, dan Logout).&lt;br/&gt;2. &lt;b&gt;Pengujian Modul Publik &amp;amp; Navigasi Informasi&lt;/b&gt; (Beranda utama, profil visi-misi-sejarah-struktur, direktori berita, artikel opini, galeri, dan agenda).&lt;br/&gt;3. &lt;b&gt;Pengujian Formulir Pendaftaran Dinamis &amp;amp; Validasi NIK&lt;/b&gt; (Validasi kolom dinamis &lt;i&gt;form_schema&lt;/i&gt;, regex NIK 16 digit, deteksi wilayah otomatis &lt;i&gt;parseFullNik&lt;/i&gt;, serta proteksi pendaftaran ganda).&lt;br/&gt;4. &lt;b&gt;Pengujian Modul Transaksi &amp;amp; Pembayaran Kegiatan&lt;/b&gt; (Integrasi &lt;i&gt;Midtrans Snap Payment Gateway&lt;/i&gt;, verifikasi transfer manual, webhook callback, dan cek status transaksi).&lt;br/&gt;5. &lt;b&gt;Pengujian Modul Dashboard Admin &amp;amp; Panel Notifikasi&lt;/b&gt; (Penyesuaian menu sidebar berbasis peran, pemuatan metrik real-time, dan log aktivitas sistem).&lt;br/&gt;6. &lt;b&gt;Pengujian Modul Manajemen Data Pendaftar &amp;amp; Verifikasi&lt;/b&gt; (Pencarian, pemfilteran per agenda, sinkronisasi massal status Midtrans, approval, dan penolakan via surel otomatis).&lt;br/&gt;7. &lt;b&gt;Pengujian Modul Content Management System (CMS)&lt;/b&gt; (Operasi CRUD pada warta berita, artikel opini, dokumentasi galeri, kutipan tokoh/quotes, serta validasi berkas foto).&lt;/div&gt;`;
    xml += `        <mxCell id="sec_plan_desc" value="${planText}" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;whiteSpace=wrap;" vertex="1" parent="1">\n`;
    xml += `          <mxGeometry x="${pageX}" y="${currentY}" width="${tableWidth}" height="140" as="geometry" />\n`;
    xml += `        </mxCell>\n`;
    currentY += 150;

    // 4.12.2 Hasil Pengujian
    xml += `        <!-- 4.12.2 Hasil Pengujian Fungsionalitas Sistem -->\n`;
    xml += `        <mxCell id="sec_res_title" value="4.12.2.  Hasil Pengujian Fungsionalitas Sistem (Black Box Testing)" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;fontStyle=1;fontSize=13;fontColor=#000000;fontFamily=Times New Roman;" vertex="1" parent="1">\n`;
    xml += `          <mxGeometry x="${pageX}" y="${currentY}" width="${tableWidth}" height="24" as="geometry" />\n`;
    xml += `        </mxCell>\n`;
    currentY += 28;

    // Loop through 7 modules
    const modules = ['auth', 'publicInfo', 'formNik', 'payment', 'dashboard', 'registrations', 'cms'];

    for (let modKey of modules) {
        let m = testData[modKey];
        let tHeight = getTableHeight(m);

        xml += `\n        <!-- ========================================================================= -->\n`;
        xml += `        <!-- ${m.subLetter}. ${m.subTitle} -->\n`;
        xml += `        <!-- ========================================================================= -->\n`;

        // Subheading
        xml += `        <mxCell id="sub_${m.id}" value="${m.subLetter}.   ${m.subTitle}" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;fontStyle=1;fontSize=13;fontColor=#000000;fontFamily=Times New Roman;" vertex="1" parent="1">\n`;
        xml += `          <mxGeometry x="${pageX}" y="${currentY}" width="${tableWidth}" height="24" as="geometry" />\n`;
        xml += `        </mxCell>\n`;
        currentY += 24;

        // Intro narrative
        let introEsc = escapeXml(`&lt;div style=&quot;text-align:justify;line-height:1.5;font-family:&amp;#39;Times New Roman&amp;#39;;font-size:12px;color:#000000;&quot;&gt;${m.intro}&lt;/div&gt;`);
        // wait! escapeXml already did escaping, let's just make sure
        let introVal = `&lt;div style=&quot;text-align:justify;line-height:1.5;font-family:&amp;#39;Times New Roman&amp;#39;;font-size:12px;color:#000000;&quot;&gt;${m.intro.replace(/"/g, '&quot;')}&lt;/div&gt;`;
        xml += `        <mxCell id="intro_${m.id}" value="${introVal}" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;whiteSpace=wrap;" vertex="1" parent="1">\n`;
        xml += `          <mxGeometry x="${pageX}" y="${currentY}" width="${tableWidth}" height="26" as="geometry" />\n`;
        xml += `        </mxCell>\n`;
        currentY += 28;

        // Caption
        xml += `        <mxCell id="cap_${m.id}" value="${m.tableNum} ${m.tableTitle}" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;fontStyle=1;fontSize=12;fontColor=#000000;fontFamily=Times New Roman;" vertex="1" parent="1">\n`;
        xml += `          <mxGeometry x="${pageX}" y="${currentY}" width="${tableWidth}" height="22" as="geometry" />\n`;
        xml += `        </mxCell>\n`;
        currentY += 22;

        // Table
        let tableRawHtml = generateTestingTableHtml(m);
        let tableEscaped = escapeXml(tableRawHtml);
        xml += `        <mxCell id="tbl_${m.id}" value="${tableEscaped}" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;overflow=fill;" vertex="1" parent="1">\n`;
        xml += `          <mxGeometry x="${pageX}" y="${currentY}" width="${tableWidth}" height="${tHeight}" as="geometry" />\n`;
        xml += `        </mxCell>\n`;
        currentY += tHeight + 25;
    }

    // 4.12.3 Rekapitulasi & Kesimpulan
    xml += `\n        <!-- ========================================================================= -->\n`;
    xml += `        <!-- 4.12.3. Rekapitulasi dan Kesimpulan Hasil Pengujian -->\n`;
    xml += `        <!-- ========================================================================= -->\n`;
    xml += `        <mxCell id="sec_recap_title" value="4.12.3.  Rekapitulasi dan Kesimpulan Hasil Pengujian" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;fontStyle=1;fontSize=13;fontColor=#000000;fontFamily=Times New Roman;" vertex="1" parent="1">\n`;
    xml += `          <mxGeometry x="${pageX}" y="${currentY}" width="${tableWidth}" height="24" as="geometry" />\n`;
    xml += `        </mxCell>\n`;
    currentY += 28;

    const recapIntroText = `&lt;div style=&quot;text-align:justify;line-height:1.6;font-family:&amp;#39;Times New Roman&amp;#39;;font-size:12px;color:#000000;&quot;&gt;Berdasarkan seluruh tahapan pengujian kotak hitam (&lt;i&gt;Black Box Testing&lt;/i&gt;) yang telah dilaksanakan pada 7 (tujuh) kelompok modul fungsional, diperoleh ringkasan evaluasi pengujian sebagaimana tercantum pada tabel berikut:&lt;/div&gt;`;
    xml += `        <mxCell id="recap_intro" value="${recapIntroText}" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;whiteSpace=wrap;" vertex="1" parent="1">\n`;
    xml += `          <mxGeometry x="${pageX}" y="${currentY}" width="${tableWidth}" height="32" as="geometry" />\n`;
    xml += `        </mxCell>\n`;
    currentY += 34;

    // Caption 4.37
    xml += `        <mxCell id="cap_recap" value="Tabel 4. 37 Rekapitulasi Hasil Pengujian Black Box" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;fontStyle=1;fontSize=12;fontColor=#000000;fontFamily=Times New Roman;" vertex="1" parent="1">\n`;
    xml += `          <mxGeometry x="${pageX}" y="${currentY}" width="${tableWidth}" height="22" as="geometry" />\n`;
    xml += `        </mxCell>\n`;
    currentY += 22;

    // Table 4.37
    let recapTableHtml = generateRecapTableHtml(testData.recap);
    let recapTableEsc = escapeXml(recapTableHtml);
    let recapHeight = 250;
    xml += `        <mxCell id="tbl_recap" value="${recapTableEsc}" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;overflow=fill;" vertex="1" parent="1">\n`;
    xml += `          <mxGeometry x="${pageX}" y="${currentY}" width="${tableWidth}" height="${recapHeight}" as="geometry" />\n`;
    xml += `        </mxCell>\n`;
    currentY += recapHeight + 15;

    // Formula Box
    let formulaHtml = `&lt;div style=&quot;font-family:&amp;#39;Times New Roman&amp;#39;;font-size:12.5px;line-height:1.6;color:#000000;background-color:#f8fafc;border:1px solid #cbd5e1;padding:10px;text-align:center;&quot;&gt;&lt;b&gt;Perhitungan Persentase Keberhasilan Pengujian:&lt;/b&gt;&lt;br/&gt;Persentase Keberhasilan = (Jumlah Kasus Uji Valid / Total Kasus Uji) &amp;times; 100%&lt;br/&gt;= (47 / 47) &amp;times; 100% = &lt;b style=&quot;color:#057a55;&quot;&gt;100% (Sangat Baik / Valid)&lt;/b&gt;&lt;/div&gt;`;
    xml += `        <mxCell id="box_formula" value="${formulaHtml}" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;" vertex="1" parent="1">\n`;
    xml += `          <mxGeometry x="${pageX}" y="${currentY}" width="${tableWidth}" height="70" as="geometry" />\n`;
    xml += `        </mxCell>\n`;
    currentY += 80;

    // Conclusion Narrative Box
    let conclusionHtml = `&lt;div style=&quot;font-family:&amp;#39;Times New Roman&amp;#39;;font-size:12px;line-height:1.6;color:#000000;text-align:justify;border:1px solid #cbd5e1;padding:12px;background-color:#ffffff;&quot;&gt;&lt;b&gt;Kesimpulan Pengujian:&lt;/b&gt;&lt;br/&gt;Berdasarkan hasil rekapitulasi pengujian pada Tabel 4. 37, seluruh skenario pengujian fungsionalitas yang berjumlah &lt;b&gt;47 butir uji&lt;/b&gt; pada Sistem Informasi PKPT IPNU-IPPNU memperoleh hasil &lt;b style=&quot;color:#057a55;&quot;&gt;100% Valid&lt;/b&gt;.&lt;br/&gt;&lt;br/&gt;Sistem telah terbukti mampu:&lt;br/&gt;1. Menjaga keamanan hak akses pengurus melalui pembatasan otorisasi peran (RBAC) yang ketat.&lt;br/&gt;2. Menyajikan informasi publik, warta berita, artikel opini, dan profil organisasi secara responsif dan dinamis.&lt;br/&gt;3. Memvalidasi data calon peserta secara berlapis (termasuk validasi keabsahan NIK 16 digit dan pencegahan registrasi ganda).&lt;br/&gt;4. Memproses transaksi pendaftaran secara otomatis menggunakan gerbang pembayaran Midtrans maupun verifikasi transfer manual.&lt;br/&gt;5. Mempermudah tata kelola organisasi melalui panel kendali admin yang informatif, terstruktur, dan ramah pengguna.&lt;br/&gt;&lt;br/&gt;Dengan demikian, Sistem Informasi PKPT IPNU-IPPNU dinyatakan &lt;b&gt;layak, andal, dan siap dioperasikan (&lt;i&gt;ready for deployment&lt;/i&gt;)&lt;/b&gt; untuk mendukung kegiatan operasional dan kaderisasi organisasi.&lt;/div&gt;`;
    xml += `        <mxCell id="box_conclusion" value="${conclusionHtml}" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;whiteSpace=wrap;" vertex="1" parent="1">\n`;
    xml += `          <mxGeometry x="${pageX}" y="${currentY}" width="${tableWidth}" height="200" as="geometry" />\n`;
    xml += `        </mxCell>\n`;
    currentY += 220;

    xml += `      </root>\n`;
    xml += `    </mxGraphModel>\n`;
    xml += `  </diagram>\n`;

    return { xml, totalHeight: currentY + 100 };
}

// Function to generate an individual tab diagram
function generateIndividualTabDiagram(modKey) {
    let m = testData[modKey];
    let isRecap = (modKey === 'recap');
    let tHeight = isRecap ? 250 : getTableHeight(m);
    let pageHeight = isRecap ? 750 : (tHeight + 200);

    let tabName = isRecap ? 'Tabel 4.37 Rekapitulasi' : `${m.tableNum} ${m.subTitle.split('Pengujian ')[1] || m.subTitle}`;
    let tabId = `tab-${modKey}`;

    let xml = `  <diagram id="${tabId}" name="${escapeXml(tabName)}">\n`;
    xml += `    <mxGraphModel dx="1200" dy="800" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="850" pageHeight="${Math.max(1000, pageHeight)}" math="0" shadow="0">\n`;
    xml += `      <root>\n`;
    xml += `        <mxCell id="0" />\n`;
    xml += `        <mxCell id="1" parent="0" />\n\n`;

    let currentY = 40;

    if (!isRecap) {
        // Subheading
        xml += `        <mxCell id="sub_${modKey}" value="${m.subLetter}.   ${m.subTitle}" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;fontStyle=1;fontSize=13;fontColor=#000000;fontFamily=Times New Roman;" vertex="1" parent="1">\n`;
        xml += `          <mxGeometry x="${pageX}" y="${currentY}" width="${tableWidth}" height="24" as="geometry" />\n`;
        xml += `        </mxCell>\n`;
        currentY += 26;

        let introVal = `&lt;div style=&quot;text-align:justify;line-height:1.5;font-family:&amp;#39;Times New Roman&amp;#39;;font-size:12px;color:#000000;&quot;&gt;${m.intro.replace(/"/g, '&quot;')}&lt;/div&gt;`;
        xml += `        <mxCell id="intro_${modKey}" value="${introVal}" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;whiteSpace=wrap;" vertex="1" parent="1">\n`;
        xml += `          <mxGeometry x="${pageX}" y="${currentY}" width="${tableWidth}" height="32" as="geometry" />\n`;
        xml += `        </mxCell>\n`;
        currentY += 36;

        // Caption
        xml += `        <mxCell id="cap_${modKey}" value="${m.tableNum} ${m.tableTitle}" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;fontStyle=1;fontSize=12;fontColor=#000000;fontFamily=Times New Roman;" vertex="1" parent="1">\n`;
        xml += `          <mxGeometry x="${pageX}" y="${currentY}" width="${tableWidth}" height="22" as="geometry" />\n`;
        xml += `        </mxCell>\n`;
        currentY += 22;

        // Table
        let tableRawHtml = generateTestingTableHtml(m);
        let tableEscaped = escapeXml(tableRawHtml);
        xml += `        <mxCell id="tbl_${modKey}" value="${tableEscaped}" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;overflow=fill;" vertex="1" parent="1">\n`;
        xml += `          <mxGeometry x="${pageX}" y="${currentY}" width="${tableWidth}" height="${tHeight}" as="geometry" />\n`;
        xml += `        </mxCell>\n`;
    } else {
        // Caption
        xml += `        <mxCell id="cap_${modKey}" value="${m.tableNum} ${m.tableTitle}" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;fontStyle=1;fontSize=12;fontColor=#000000;fontFamily=Times New Roman;" vertex="1" parent="1">\n`;
        xml += `          <mxGeometry x="${pageX}" y="${currentY}" width="${tableWidth}" height="22" as="geometry" />\n`;
        xml += `        </mxCell>\n`;
        currentY += 22;

        let recapTableHtml = generateRecapTableHtml(m);
        let recapTableEsc = escapeXml(recapTableHtml);
        xml += `        <mxCell id="tbl_${modKey}" value="${recapTableEsc}" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;overflow=fill;" vertex="1" parent="1">\n`;
        xml += `          <mxGeometry x="${pageX}" y="${currentY}" width="${tableWidth}" height="${tHeight}" as="geometry" />\n`;
        xml += `        </mxCell>\n`;
        currentY += tHeight + 15;

        // Formula Box
        let formulaHtml = `&lt;div style=&quot;font-family:&amp;#39;Times New Roman&amp;#39;;font-size:12.5px;line-height:1.6;color:#000000;background-color:#f8fafc;border:1px solid #cbd5e1;padding:10px;text-align:center;&quot;&gt;&lt;b&gt;Perhitungan Persentase Keberhasilan Pengujian:&lt;/b&gt;&lt;br/&gt;Persentase Keberhasilan = (Jumlah Kasus Uji Valid / Total Kasus Uji) &amp;times; 100%&lt;br/&gt;= (47 / 47) &amp;times; 100% = &lt;b style=&quot;color:#057a55;&quot;&gt;100% (Sangat Baik / Valid)&lt;/b&gt;&lt;/div&gt;`;
        xml += `        <mxCell id="box_formula" value="${formulaHtml}" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;" vertex="1" parent="1">\n`;
        xml += `          <mxGeometry x="${pageX}" y="${currentY}" width="${tableWidth}" height="70" as="geometry" />\n`;
        xml += `        </mxCell>\n`;
        currentY += 80;

        // Conclusion Narrative Box
        let conclusionHtml = `&lt;div style=&quot;font-family:&amp;#39;Times New Roman&amp;#39;;font-size:12px;line-height:1.6;color:#000000;text-align:justify;border:1px solid #cbd5e1;padding:12px;background-color:#ffffff;&quot;&gt;&lt;b&gt;Kesimpulan Pengujian:&lt;/b&gt;&lt;br/&gt;Berdasarkan hasil rekapitulasi pengujian pada Tabel 4. 37, seluruh skenario pengujian fungsionalitas yang berjumlah &lt;b&gt;47 butir uji&lt;/b&gt; pada Sistem Informasi PKPT IPNU-IPPNU memperoleh hasil &lt;b style=&quot;color:#057a55;&quot;&gt;100% Valid&lt;/b&gt;.&lt;br/&gt;&lt;br/&gt;Sistem telah terbukti mampu:&lt;br/&gt;1. Menjaga keamanan hak akses pengurus melalui pembatasan otorisasi peran (RBAC) yang ketat.&lt;br/&gt;2. Menyajikan informasi publik, warta berita, artikel opini, dan profil organisasi secara responsif dan dinamis.&lt;br/&gt;3. Memvalidasi data calon peserta secara berlapis (termasuk validasi keabsahan NIK 16 digit dan pencegahan registrasi ganda).&lt;br/&gt;4. Memproses transaksi pendaftaran secara otomatis menggunakan gerbang pembayaran Midtrans maupun verifikasi transfer manual.&lt;br/&gt;5. Mempermudah tata kelola organisasi melalui panel kendali admin yang informatif, terstruktur, dan ramah pengguna.&lt;br/&gt;&lt;br/&gt;Dengan demikian, Sistem Informasi PKPT IPNU-IPPNU dinyatakan &lt;b&gt;layak, andal, dan siap dioperasikan (&lt;i&gt;ready for deployment&lt;/i&gt;)&lt;/b&gt; untuk mendukung kegiatan operasional dan kaderisasi organisasi.&lt;/div&gt;`;
        xml += `        <mxCell id="box_conclusion" value="${conclusionHtml}" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;whiteSpace=wrap;" vertex="1" parent="1">\n`;
        xml += `          <mxGeometry x="${pageX}" y="${currentY}" width="${tableWidth}" height="200" as="geometry" />\n`;
        xml += `        </mxCell>\n`;
    }

    xml += `      </root>\n`;
    xml += `    </mxGraphModel>\n`;
    xml += `  </diagram>\n`;

    return xml;
}

// Assemble full XML
function generateDrawioFile() {
    let fullRes = generateFullChapterDiagram();
    console.log('Total height calculated for Bab 4.12:', fullRes.totalHeight);

    let xml = `<mxfile host="app.diagrams.net" modified="${new Date().toISOString()}" agent="Antigravity" version="21.0.0" type="device">\n`;
    xml += fullRes.xml;

    // Add individual tabs
    const allModules = ['auth', 'publicInfo', 'formNik', 'payment', 'dashboard', 'registrations', 'cms', 'recap'];
    for (let modKey of allModules) {
        xml += generateIndividualTabDiagram(modKey);
    }

    xml += `</mxfile>\n`;
    return xml;
}

const outputPath = path.join(__dirname, '..', 'diagram', 'pengujian_sistem.drawio');
const outputXml = generateDrawioFile();
fs.writeFileSync(outputPath, outputXml, 'utf-8');
console.log('Successfully generated:', outputPath, 'Length:', outputXml.length, 'bytes');
