# 4.10. Perancangan Antarmuka (Desain Mockup)

Perancangan antarmuka (*user interface* / *wireframe mockup*) dilakukan untuk menggambarkan struktur tata letak (*layout*), alur navigasi, serta penempatan komponen antarmuka pada Sistem Informasi Pimpinan Komisariat Perguruan Tinggi (PKPT) IPNU-IPPNU sebelum ditransformasikan menjadi tampilan akhir. Desain antarmuka ini mengacu langsung pada komponen halaman *frontend* berbasis React & Inertia.js yang terbagi menjadi antarmuka publik dan antarmuka panel pengurus (`admin`, `ketua`, dan `departemen`).

---

### a. Desain Antarmuka Halaman Beranda

Halaman Beranda ([`Welcome.jsx`](file:///e:/zallzall/pk-ipnu-ippnu/resources/js/Pages/Welcome.jsx)) merupakan halaman utama yang diakses oleh pengunjung melalui rute `/`. Tata letak halaman ini tersusun secara vertikal dari atas ke bawah dengan urutan komponen persis seperti yang ditampilkan pada aplikasi:

1. **Bilah Navigasi Publik ([`Navbar.jsx`](file:///e:/zallzall/pk-ipnu-ippnu/resources/js/Components/Navbar.jsx))**: Menampilkan identitas logo **PKPT IPNU IPPNU — Portal Resmi** di sisi kiri, serta deretan menu navigasi di sisi kanan yang terdiri atas `Beranda`, dropdown `Profil` (`Visi & Misi`, `Sejarah`, `Struktur Organisasi`), `Berita`, `Artikel`, `Galeri`, `Agenda`, dan `Kegiatan`.
2. **Bagian *Hero Section* ([`HeroSection.jsx`](file:///e:/zallzall/pk-ipnu-ippnu/resources/js/Components/HeroSection.jsx))**: Menampilkan gambar latar utama organisasi disertai kutipan tokoh (*quotes* aktif dari tabel `quotes`) dan tombol penjelajahan.
3. **Bagian Pengenalan Organisasi ([`HomeFeature.jsx`](file:///e:/zallzall/pk-ipnu-ippnu/resources/js/Components/HomeFeature.jsx))**: Menampilkan dua kolom yang terdiri atas foto kegiatan di sisi kiri serta subjudul, judul pengenalan, deskripsi organisasi, dan tombol tautan di sisi kanan.
4. **Bagian Statistik Organisasi (`StatCard`)**: Menampilkan 4 kartu indikator statistik secara berjajar horizontal dari tabel `statistics`.
5. **Banner Pembatas (*ElegantHero*)**: Menampilkan slogan *"Portal Resmi — Selamat Datang di PKPT IPNU IPPNU — Mewujudkan Kader yang Berilmu, Beramal, dan Bertaqwa"*.
6. **Seksi Berita Terkini & Artikel Terbaru**: Masing-masing menampilkan 4 kartu publikasi terbaru secara berjajar (`NewsCard` dari tabel `posts` dan `ArticleCard` dari tabel `articles`) lengkap dengan tautan `Lihat Semua →`.
7. **Seksi Sambutan Ketua & Agenda Terdekat**: Terletak berdampingan sebanyak 2 kolom di bagian bawah halaman. Kolom kiri menampilkan kartu **Sambutan Ketua** beserta foto profil bulat Ketua dan kutipan sambutan, sedangkan kolom kanan menampilkan kartu **Agenda Terdekat** yang memuat 3 daftar agenda terdekat beserta tombol `Lihat Semua Agenda`, ditutup dengan bagian *Footer*.

*(Lihat **Gambar 4. 24 Desain Antarmuka Halaman Beranda** pada Tab 1 file [`mockup_diagram.drawio`](file:///e:/zallzall/pk-ipnu-ippnu/laporan/diagram/mockup_diagram.drawio))*

---

### b. Desain Antarmuka Halaman Pendaftaran Kegiatan

Halaman Pendaftaran Kegiatan ([`RegistrationForm.jsx`](file:///e:/zallzall/pk-ipnu-ippnu/resources/js/Pages/Kegiatan/RegistrationForm.jsx)) diakses oleh calon peserta melalui rute `/kegiatan/{agenda}/daftar`. Tata letak halaman ini menggunakan satu kartu terpusat (*single centered card*) di bawah *header banner*:

1. **Header Banner Kegiatan**: Menampilkan tautan `← Kembali ke Kegiatan`, judul besar `Pendaftaran Kegiatan`, serta subjudul nama agenda yang dipilih.
2. **Kartu Formulir Pendaftaran Terpusat**:
   - **Pamflet / Poster Kegiatan**: Ditampilkan penuh di bagian paling atas kartu apabila agenda memiliki gambar pamflet (`image_url`).
   - **Kotak Harga Tiket Masuk (HTM)**: Menampilkan informasi biaya pendaftaran kegiatan (`registration_fee`) di dalam kotak berlatar lembut.
   - **Pilihan Metode Pembayaran**: Menampilkan 3 tombol radio kartu berjajar horizontal, yaitu **`Otomatis (Midtrans)`**, **`Cash / Langsung`**, dan **`Manual Transfer`**. Apabila peserta memilih `Manual Transfer`, sistem menampilkan kotak `Informasi Rekening` beserta input unggah berkas `Unggah Bukti Pembayaran *`.
   - **Input Formulir Dinamis (`form_schema`)**: Menampilkan kolom isian peserta secara berurutan ke bawah (`Nama Lengkap *`, `Nomor WhatsApp / HP *`, `Alamat Email *`, dan `NIK (KTP / Kartu Keluarga)`). Khusus pada kolom NIK 16 digit, sistem dilengkapi fitur deteksi otomatis (`parseFullNik`) yang menampilkan informasi jenis kelamin, tanggal lahir, kecamatan, kabupaten/kota, dan provinsi peserta, diakhiri dengan tombol penuh **`Daftar Sekarang`**.

*(Lihat **Gambar 4. 25 Desain Antarmuka Halaman Pendaftaran Kegiatan** pada Tab 2 file [`mockup_diagram.drawio`](file:///e:/zallzall/pk-ipnu-ippnu/laporan/diagram/mockup_diagram.drawio))*

---

### c. Desain Antarmuka Halaman Pembayaran Kegiatan

Halaman Pembayaran Kegiatan ([`Payment.jsx`](file:///e:/zallzall/pk-ipnu-ippnu/resources/js/Pages/Kegiatan/Payment.jsx)) diakses melalui rute `/kegiatan/payment/{registration}` setelah peserta memilih metode pembayaran otomatis Midtrans.

Komponen utama pada halaman ini meliputi:
1. **Header Banner Pembayaran**: Menampilkan tautan `← Kembali ke Kegiatan`, judul `Selesaikan Pembayaran`, serta nama kegiatan.
2. **Kartu Ringkasan Tagihan Terpusat**:
   - Menampilkan ikon dompet (*Wallet*) di bagian tengah atas diikuti teks `Total Pembayaran` dan nominal tagihan berukuran besar.
   - **Kotak Rincian Pendaftaran**: Menampilkan baris `ID Pendaftaran` (`REG-{id}`), `Nama Peserta`, serta badge `Status Pembayaran` (`MENUNGGU PEMBAYARAN`).
   - **Tombol Aksi Pembayaran**: Terdiri dari dua tombol bertumpuk secara vertikal, yaitu tombol utama **`Bayar Sekarang (Buka Midtrans)`** yang memunculkan *pop-up* pembayaran *Midtrans Snap* (QRIS, Virtual Account, E-Wallet), serta tombol sekunder **`Sudah Bayar? Cek Status Pembayaran`** untuk memverifikasi status transaksi secara langsung ke server Midtrans.

*(Lihat **Gambar 4. 26 Desain Antarmuka Halaman Pembayaran Kegiatan** pada Tab 3 file [`mockup_diagram.drawio`](file:///e:/zallzall/pk-ipnu-ippnu/laporan/diagram/mockup_diagram.drawio))*

---

### d. Desain Antarmuka Halaman Login Pengurus

Halaman Login Pengurus ([`Login.jsx`](file:///e:/zallzall/pk-ipnu-ippnu/resources/js/Pages/Auth/Login.jsx) dan [`GuestLayout.jsx`](file:///e:/zallzall/pk-ipnu-ippnu/resources/js/Layouts/GuestLayout.jsx)) merupakan halaman autentikasi pengurus pada rute `/login`.

Komponen utama pada halaman ini meliputi:
1. **Header Identitas di Luar Kartu**: Menampilkan kotak ikon logo organisasi di bagian tengah atas, diikuti judul **`PKPT IPNU IPPNU`** dan subjudul **`PORTAL ADMINISTRASI`**.
2. **Kartu Formulir Login**:
   - Input **`ALAMAT EMAIL`** dengan ikon amplop di sisi kiri.
   - Input **`PASSWORD`** dengan ikon gembok di sisi kiri serta tombol ikon mata (*Eye/EyeOff*) di sisi kanan untuk melihat atau menyembunyikan kata sandi.
   - Baris opsi kotak centang **`Ingat Saya`** di sisi kiri dan tautan **`Lupa Password?`** di sisi kanan.
   - Tombol penuh **`Masuk ke Dashboard`** beserta teks hak cipta `© 2026 PKPT IPNU IPPNU` di bagian bawah kartu.

*(Lihat **Gambar 4. 27 Desain Antarmuka Halaman Login Pengurus** pada Tab 4 file [`mockup_diagram.drawio`](file:///e:/zallzall/pk-ipnu-ippnu/laporan/diagram/mockup_diagram.drawio))*

---

### e. Desain Antarmuka Halaman Dashboard Admin

Halaman Dashboard Admin ([`Dashboard.jsx`](file:///e:/zallzall/pk-ipnu-ippnu/resources/js/Pages/Admin/Dashboard.jsx) dan [`AdminLayout.jsx`](file:///e:/zallzall/pk-ipnu-ippnu/resources/js/Layouts/AdminLayout.jsx)) merupakan halaman utama panel pengurus pada rute `/admin/dashboard`.

Komponen utama pada halaman ini meliputi:
1. **Bilah Samping Navigasi ([`Sidebar.jsx`](file:///e:/zallzall/pk-ipnu-ippnu/resources/js/Components/Admin/Sidebar.jsx))**: Menampilkan identitas **`AdminPanel`** beserta badge role pengguna (`ADMIN`, `KETUA`, atau `DEPT`), grup **`MENU`** (`Dashboard`, `Berita`, `Artikel`, `Quotes`, `Galeri`, `Anggota`, `Agenda`, `Pendaftar`, `Statistik`), grup **`SYSTEM`** (`Manajemen User`, `Pengaturan`, `Halaman`, `Profil`), serta tombol **`Lihat Website`** dan **`Keluar`** di bagian bawah.
2. **Bilah Atas (*Topbar*) & Header Overview**: Menampilkan tombol lipat *sidebar*, pengubah tema terang/gelap (*Dark Mode*), ikon lonceng notifikasi, profil pengurus, judul **`Dashboard Overview`**, serta indikator **`STATUS SISTEM: Online & Stabil`**.
3. **Grid 8 Kartu Statistik (2 Baris × 4 Kolom)**: Menampilkan jumlah data secara *real-time* untuk `BERITA`, `ARTIKEL`, `ANGGOTA`, `AGENDA`, `PENDAFTAR`, `GALERI`, `QUOTES`, dan `STATISTIK`.
4. **Panel Aktivitas Terakhir & Pintasan Cepat**: Bagian bawah terbagi menjadi dua kolom, yaitu kolom kiri lebar yang menampilkan **`Aktivitas Terakhir (LIVE UPDATES)`**, serta kolom kanan yang menampilkan kartu **`Mulai Kelola Konten Hari Ini`** (berisi tombol pintasan `Post Berita`, `Buat Artikel`, `Agenda Baru`, `Upload Galeri`, `Tambah Quote`) dan kartu **`INSPIRASI HARIAN`**.

*(Lihat **Gambar 4. 28 Desain Antarmuka Halaman Dashboard Admin** pada Tab 5 file [`mockup_diagram.drawio`](file:///e:/zallzall/pk-ipnu-ippnu/laporan/diagram/mockup_diagram.drawio))*

---

### f. Desain Antarmuka Halaman Manajemen Data Pendaftar

Halaman Manajemen Data Pendaftar ([`Admin/Registrations/Index.jsx`](file:///e:/zallzall/pk-ipnu-ippnu/resources/js/Pages/Admin/Registrations/Index.jsx)) pada rute `/admin/registrations` digunakan oleh pengurus untuk memantau, menyinkronkan pembayaran Midtrans, serta memverifikasi seluruh pendaftar kegiatan.

Komponen utama pada halaman ini meliputi:
1. **Header & Kontrol Filter Global**: Menampilkan judul **`Data Pendaftar Global`**, tombol **`Sinkronkan Semua Midtrans`** untuk memperbarui status seluruh transaksi *pending* secara massal, serta *dropdown* filter **`Semua Agenda`**.
2. **Tabel Data Pendaftar (6 Kolom)**: Menampilkan kolom `WAKTU DAFTAR`, `PENDAFTAR & AGENDA` (memuat nama peserta, nama agenda, badge nomor WhatsApp, email, dan NIK), `METODE` (`MIDTRANS`, `TRANSFER`, atau `CASH`), `STATUS` (`APPROVED`, `PENDING`, `REJECTED` beserta status transaksi Midtrans), `BUKTI BAYAR` (ikon pratinjau gambar), serta kolom `AKSI` (tombol ikon **Mata/Detail**, **Sync Midtrans**, **Setujui [✓]**, **Tolak [✕]**, dan **Hapus**).
3. **Modal Pop-up `Detail Jawaban Form`**: Ditampilkan ketika pengurus menekan tombol ikon mata (`Eye`), memuat nama agenda, kotak **`Informasi Midtrans`** (`Order ID`, `Status Midtrans`, `Metode/Channel`, `Waktu Bayar`, dan tombol `Sinkronkan Sekarang`), serta seluruh jawaban formulir peserta lengkap dengan hasil deteksi wilayah NIK otomatis (`Kecamatan`, `Kabupaten/Kota`, `Provinsi`).

*(Lihat **Gambar 4. 29 Desain Antarmuka Halaman Manajemen Data Pendaftar** pada Tab 6 file [`mockup_diagram.drawio`](file:///e:/zallzall/pk-ipnu-ippnu/laporan/diagram/mockup_diagram.drawio))*

---

### g. Desain Antarmuka Halaman Kelola Konten

Halaman Kelola Konten ([`Admin/Posts/Index.jsx`](file:///e:/zallzall/pk-ipnu-ippnu/resources/js/Pages/Admin/Posts/Index.jsx), [`Admin/Posts/Create.jsx`](file:///e:/zallzall/pk-ipnu-ippnu/resources/js/Pages/Admin/Posts/Create.jsx), serta [`Admin/Articles/Index.jsx`](file:///e:/zallzall/pk-ipnu-ippnu/resources/js/Pages/Admin/Articles/Index.jsx)) digunakan oleh pengurus (`admin` dan `departemen`) pada rute `/admin/posts` dan `/admin/articles` untuk mengelola publikasi berita, artikel opini kader, maupun konten informasi organisasi lainnya.

Komponen utama pada Halaman Kelola Konten meliputi:
1. **Header & Tabel Daftar Konten (`Index.jsx`)**:
   - Menampilkan judul **`Kelola Berita`** (atau **`Kelola Artikel`**) beserta tombol aksi **`+ Tambah Berita`** di sudut kanan atas.
   - Menampilkan tabel daftar konten dengan 3 kolom utama sesuai implementasi sistem:
     - **`INFORMASI BERITA`**: Menampilkan pratinjau *thumbnail* foto (`image_url`), judul berita/artikel, badge tanggal publikasi (`published_at`), serta keterangan penulis (`Oleh: Admin`).
     - **`STATISTIK`**: Menampilkan indikator status publikasi (`Published` dengan indikator titik aktif).
     - **`AKSI`**: Menyediakan tiga tombol ikon manajemen, yaitu **`Lihat [Mata]`** untuk membuka halaman berita publik, **`Edit [Pensil]`** untuk mengubah isi konten, dan **`Hapus [Tempat Sampah]`** untuk menghapus konten.
2. **Formulir Tambah / Edit Konten & Panel Panduan (`Create.jsx` / `Edit.jsx`)**:
   - Terbagi menjadi dua kolom (`lg:col-span-8` di sisi kiri dan `lg:col-span-4` di sisi kanan):
     - **Kolom Kiri (Formulir Utama)**: Memuat input **`Judul Berita`**, area unggah gambar bergaris putus-putus **`Gambar Utama (Unggah Foto Berita)`** dengan pratinjau gambar langsung (*live image preview*) berformat JPG/PNG/WEBP (maksimal 5MB), kolom area teks **`Isi Berita Lengkap`**, serta tombol **`Reset Form`** dan **`PUBLIKASIKAN SEKARANG`**.
     - **Kolom Kanan (Kartu `Tips Menulis`)**: Menampilkan kartu panduan penulisan konten (menggunakan judul yang singkat dan tepat, gambar berkualitas tinggi, serta paragraf yang nyaman dibaca) untuk menjaga kualitas publikasi organisasi.

*(Lihat **Gambar 4. 30 Desain Antarmuka Halaman Kelola Konten** pada Tab 7 file [`mockup_diagram.drawio`](file:///e:/zallzall/pk-ipnu-ippnu/laporan/diagram/mockup_diagram.drawio))*

