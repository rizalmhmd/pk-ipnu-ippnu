# 4.11. Implementasi Antarmuka

Tahap implementasi antarmuka merupakan pembuktian bahwa perancangan antarmuka (*mockup/wireframe*) yang dirancang pada sub-bab sebelumnya telah berhasil direalisasikan ke dalam bentuk perangkat lunak yang fungsional, interaktif, dan responsif. Pada sistem ini, antarmuka pengguna (*User Interface*) dibangun menggunakan pustaka **React.js** dengan bantuan penghubung **Inertia.js** dan kerangka kerja CSS **Tailwind CSS**. Palet warna utama mengusung perpaduan warna hijau zamrud (*emerald*) khas identitas organisasi IPNU-IPPNU serta warna abu-abu netral (*slate*) untuk memberikan kesan modern, bersih, dan elegan.

Berikut merupakan hasil tangkapan layar (*screenshot*) antarmuka aplikasi yang telah beroperasi:

---

### 4.11.1. Implementasi Halaman Beranda

Halaman Beranda diimplementasikan melalui komponen [`Welcome.jsx`](file:///e:/zallzall/pk-ipnu-ippnu/resources/js/Pages/Welcome.jsx) yang dimuat langsung saat pengunjung mengakses alamat web utama. Halaman ini menyajikan visual yang dinamis dengan fitur *real-time update* konten.

```
+--------------------------------------------------------------------------+
|  [TEMPATKAN SCREENSHOT APLIKASI BERWARNA HALAMAN BERANDA DI SINI]        |
|  (Tangkapan layar browser penuh dari navbar, hero banner slider,         |
|   4 kartu statistik, berita terkini, artikel opini, sambutan ketua,      |
|   hingga agenda terdekat)                                                |
+--------------------------------------------------------------------------+
```
<p align="center"><b>Gambar 4. 31 Implementasi Halaman Beranda</b></p>

**Deskripsi Implementasi:**
Halaman beranda telah berhasil diimplementasikan secara interaktif dan berwarna penuh. Komponen navbar bersifat *sticky* dengan efek *blur* saat digulir (*scroll*). Bagian *Hero Section* memuat gambar latar organisasi disertai slider kutipan ulama (*quotes*), diikuti seksi pengenalan *HomeFeature*, 4 kartu ringkasan statistik kader, deretan kartu berita (*NewsCard*) dan artikel (*ArticleCard*) terbaru, serta seksi sambutan Ketua dan daftar agenda terdekat yang dimuat langsung dari basis data.

---

### 4.11.2. Implementasi Halaman Pendaftaran Kegiatan

Halaman Pendaftaran Kegiatan diimplementasikan pada komponen [`RegistrationForm.jsx`](file:///e:/zallzall/pk-ipnu-ippnu/resources/js/Pages/Kegiatan/RegistrationForm.jsx) yang dapat diakses melalui rute `/kegiatan/{agenda}/daftar`.

```
+--------------------------------------------------------------------------+
|  [TEMPATKAN SCREENSHOT APLIKASI BERWARNA FORM PENDAFTARAN DI SINI]       |
|  (Tangkapan layar formulir pendaftaran: pamflet kegiatan di atas,        |
|   pilihan 3 metode pembayaran, input nama, wa, email, NIK dengan         |
|   deteksi otomatis data wilayah, dan tombol Daftar Sekarang)             |
+--------------------------------------------------------------------------+
```
<p align="center"><b>Gambar 4. 32 Implementasi Halaman Pendaftaran Kegiatan</b></p>

**Deskripsi Implementasi:**
Formulir pendaftaran telah berfungsi penuh untuk menerima input data dari calon peserta kegiatan. Desain halaman menerapkan tata letak kartu terpusat (*centered single card*) yang responsif diakses baik melalui desktop maupun *smartphone*. Fitur unggulan pada formulir ini adalah validasi dinamis (`form_schema`), integrasi pemrosesan NIK 16 digit otomatis yang langsung mendeteksi jenis kelamin, tanggal lahir, kecamatan, kabupaten, dan provinsi pendaftar, serta pilihan opsi pembayaran langsung (*Midtrans*, *Transfer Bank Manual*, atau *Cash*).

---

### 4.11.3. Implementasi Halaman Pembayaran

Halaman Pembayaran diimplementasikan pada komponen [`Payment.jsx`](file:///e:/zallzall/pk-ipnu-ippnu/resources/js/Pages/Kegiatan/Payment.jsx) pada rute `/kegiatan/payment/{registration}`.

```
+--------------------------------------------------------------------------+
|  [TEMPATKAN SCREENSHOT APLIKASI BERWARNA SNAP MIDTRANS DI SINI]          |
|  (Tangkapan layar halaman detail tagihan beserta modal pop-up Snap       |
|   Midtrans yang menampilkan opsi QRIS / GoPay / Virtual Account)         |
+--------------------------------------------------------------------------+
```
<p align="center"><b>Gambar 4. 33 Implementasi Halaman Pembayaran Kegiatan</b></p>

**Deskripsi Implementasi:**
Antarmuka pembayaran telah terintegrasi secara langsung dengan *Payment Gateway Midtrans*. Ketika halaman terbuka, sistem otomatis memunculkan *pop-up* Snap Midtrans sesuai token transaksi (`snap_token`). Calon peserta dapat memilih metode pembayaran instan seperti QRIS (GoPay, OVO, ShopeePay, m-Banking) maupun Transfer Virtual Account (BCA, BRI, BNI, Mandiri). Halaman ini juga dilengkapi tombol polling otomatis *"Sudah Bayar? Cek Status Pembayaran"* yang memverifikasi mutasi transaksi tanpa perlu peserta mengunggah struk transfer fisik.

---

### 4.11.4. Implementasi Halaman Login Pengurus

Halaman Login Pengurus diimplementasikan pada komponen [`Login.jsx`](file:///e:/zallzall/pk-ipnu-ippnu/resources/js/Pages/Auth/Login.jsx) dan kerangka antarmuka [`GuestLayout.jsx`](file:///e:/zallzall/pk-ipnu-ippnu/resources/js/Layouts/GuestLayout.jsx).

```
+--------------------------------------------------------------------------+
|  [TEMPATKAN SCREENSHOT APLIKASI BERWARNA HALAMAN LOGIN DI SINI]          |
|  (Tangkapan layar portal login administrasi: logo PKPT IPNU IPPNU,       |
|   input email, input password dengan tombol intip mata, checkbox         |
|   Ingat Saya, dan tombol Masuk ke Dashboard)                             |
+--------------------------------------------------------------------------+
```
<p align="center"><b>Gambar 4. 34 Implementasi Halaman Login Pengurus</b></p>

**Deskripsi Implementasi:**
Halaman autentikasi dirender dengan desain kartu bersih dan terpusat. Form login terhubung dengan sistem keamanan Laravel Breeze yang memverifikasi kredensial email dan password terenkripsi bcrypt pada tabel `users`. Antarmuka dilengkapi fitur interaktif tombol intip sandi (*show/hide password* menggunakan ikon Lucide) serta kotak centang *Remember Me* untuk mempertahankan sesi *login* pengurus.

---

### 4.11.5. Implementasi Dashboard Admin

Halaman Dashboard Admin diimplementasikan pada komponen [`Dashboard.jsx`](file:///e:/zallzall/pk-ipnu-ippnu/resources/js/Pages/Admin/Dashboard.jsx) dan kerangka tata letak [`AdminLayout.jsx`](file:///e:/zallzall/pk-ipnu-ippnu/resources/js/Layouts/AdminLayout.jsx).

```
+--------------------------------------------------------------------------+
|  [TEMPATKAN SCREENSHOT APLIKASI BERWARNA DASHBOARD ADMIN DI SINI]        |
|  (Tangkapan layar dashboard: sidebar kiri, topbar status online,         |
|   grid 8 kartu statistik berwarna gradien, timeline aktivitas terakhir,  |
|   dan pintasan kelola konten)                                            |
+--------------------------------------------------------------------------+
```
<p align="center"><b>Gambar 4. 35 Implementasi Halaman Dashboard Admin</b></p>

**Deskripsi Implementasi:**
Implementasi panel kendali *dashboard* telah berjalan optimal dan informatif. Antarmuka menyajikan bilah navigasi samping (*Sidebar*) dinamis yang menyesuaikan hak akses pengguna (`admin`, `ketua`, `departemen`). Bagian utama menampilkan indikator status sistem *online*, 8 kartu metrik statistik berwarna dengan efek gradien dan bayangan lembut, daftar *timeline* aktivitas sistem terkini secara *live*, serta tombol pintasan cepat (*quick shortcuts*) untuk mempublikasikan konten baru secara efisien.

---

### 4.11.6. Implementasi Halaman Manajemen Data Pendaftar

Halaman Manajemen Data Pendaftar diimplementasikan pada komponen [`Admin/Registrations/Index.jsx`](file:///e:/zallzall/pk-ipnu-ippnu/resources/js/Pages/Admin/Registrations/Index.jsx).

```
+--------------------------------------------------------------------------+
|  [TEMPATKAN SCREENSHOT APLIKASI BERWARNA TABEL PENDAFTAR DI SINI]        |
|  (Tangkapan layar tabel pendaftar: tombol sinkronisasi massal midtrans,  |
|   filter agenda, tabel dengan badge status warna-warni, serta modal      |
|   pop-up detail pendaftar)                                               |
+--------------------------------------------------------------------------+
```
<p align="center"><b>Gambar 4. 36 Implementasi Halaman Manajemen Data Pendaftar</b></p>

**Deskripsi Implementasi:**
Halaman manajemen pendaftaran terwujud dalam bentuk tabel data modern yang dilengkapi fitur filter per agenda kegiatan dan pencarian. Pengurus dapat memantau waktu daftar, rincian kontak peserta (WhatsApp, Email, NIK), metode pembayaran, dan status transaksi. Tersedia pula fitur *"Sinkronkan Semua Midtrans"* untuk memperbarui status transaksi secara massal, tombol persetujuan cepat (*Approve/Reject*), serta modal pratinjau jawaban lengkap beserta bukti transfer peserta.

---

### 4.11.7. Implementasi Halaman Kelola Konten

Halaman Kelola Konten diimplementasikan melalui komponen [`Admin/Posts/Index.jsx`](file:///e:/zallzall/pk-ipnu-ippnu/resources/js/Pages/Admin/Posts/Index.jsx) dan [`Admin/Posts/Create.jsx`](file:///e:/zallzall/pk-ipnu-ippnu/resources/js/Pages/Admin/Posts/Create.jsx) (serta pengelola artikel di [`Admin/Articles/Index.jsx`](file:///e:/zallzall/pk-ipnu-ippnu/resources/js/Pages/Admin/Articles/Index.jsx)).

```
+--------------------------------------------------------------------------+
|  [TEMPATKAN SCREENSHOT APLIKASI BERWARNA HALAMAN KELOLA KONTEN DI SINI]  |
|  (Tangkapan layar tabel manajemen berita/artikel dan form editor:        |
|   input judul, dropzone foto dengan live preview, textarea isi,          |
|   dan kartu tips menulis di sisi kanan)                                  |
+--------------------------------------------------------------------------+
```
<p align="center"><b>Gambar 4. 37 Implementasi Halaman Kelola Konten</b></p>

**Deskripsi Implementasi:**
Panel CMS (*Content Management System*) telah sukses direalisasikan untuk memfasilitasi pengurus dalam mempublikasikan berita dan opini kader. Antarmuka menyediakan tabel warta kegiatan lengkap dengan tombol lihat, edit, dan hapus. Form penambahan konten dilengkapi area *drag-and-drop* unggah foto dengan fitur *live image preview* seketika, editor narasi warta, serta panel kartu *"Tips Menulis"* di sisi kanan yang memandu pengurus menghasilkan artikel yang rapi dan menarik.

