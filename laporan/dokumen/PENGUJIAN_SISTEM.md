# 4.12. Pengujian Sistem

Pengujian sistem merupakan tahapan krusial dalam siklus pengembangan perangkat lunak untuk memastikan bahwa seluruh fungsi, modul, validasi, dan integrasi antarmuka yang telah dibangun berjalan sesuai dengan spesifikasi kebutuhan pengguna (*user requirements*) dan bebas dari galat (*error*).

Pada sistem ini, metode pengujian yang digunakan adalah **Metode Pengujian Kotak Hitam (*Black Box Testing*)**. Metode ini berfokus pada pengujian fungsionalitas masukan (*input*) dan keluaran (*output*) perangkat lunak tanpa perlu menguji atau mengetahui struktur kode internal program. Pengujian dilakukan dengan teknik *Equivalence Partitioning* dan *Boundary Value Analysis* untuk menguji skenario valid maupun skenario tidak valid pada setiap modul sistem.

---

### 4.12.1. Rencana Pengujian Sistem

Pengujian fungsionalitas Sistem Informasi PKPT IPNU-IPPNU mencakup 7 (tujuh) kelompok modul utama:
1. **Pengujian Modul Autentikasi & Hak Akses Pengurus** (Login, validasi sandi, sesi *Remember Me*, otorisasi *Role-Based Access Control* / RBAC, dan Logout).
2. **Pengujian Modul Publik & Navigasi Informasi** (Beranda utama, profil visi-misi-sejarah-struktur, direktori berita, artikel opini, galeri, dan agenda).
3. **Pengujian Formulir Pendaftaran Dinamis & Validasi NIK** (Validasi kolom dinamis `form_schema`, validasi regex format NIK 16 digit, fitur deteksi wilayah otomatis `parseFullNik`, serta proteksi pendaftaran ganda/*duplicate registration*).
4. **Pengujian Modul Transaksi & Pembayaran Kegiatan** (Integrasi *Midtrans Snap Payment Gateway*, verifikasi pembayaran transfer manual, *webhook callback*, dan pengecekan status transaksi).
5. **Pengujian Modul Dashboard Admin & Panel Notifikasi** (Penyesuaian menu *sidebar* berdasarkan peran pengguna, pemuatan metrik statistik secara *real-time*, dan pencatatan log aktivitas sistem).
6. **Pengujian Modul Manajemen Data Pendaftar & Verifikasi** (Pencarian, pemfilteran berdasarkan agenda, sinkronisasi massal status transaksi Midtrans, persetujuan pendaftar, dan penolakan pendaftaran dengan pengiriman surel otomatis).
7. **Pengujian Modul Content Management System (CMS)** (Operasi *Create, Read, Update, Delete* / CRUD pada berita, artikel, galeri, kutipan tokoh/quotes, serta validasi unggah berkas foto).

---

### 4.12.2. Hasil Pengujian Fungsionalitas Sistem (Black Box Testing)

Berikut adalah rincian pelaksanaan uji coba pada masing-masing modul sistem beserta hasil pengamatan dan kesimpulannya:

#### a. Pengujian Modul Autentikasi & Hak Akses Pengurus

Pengujian ini bertujuan untuk memastikan keamanan akses portal manajemen pengurus (`/login`) dan keandalan pembatasan hak akses berbasis peran (*Role-Based Access Control*) antara `admin`, `ketua`, dan `departemen`.

<p align="center"><b>Tabel 4. 30 Pengujian Modul Autentikasi & Hak Akses</b></p>

| No | Skenario Pengujian | Masukan (Input) | Hasil yang Diharapkan | Hasil Pengamatan | Kesimpulan |
|:--:|:---|:---|:---|:---|:---:|
| 1 | Login dengan data valid (Role Administrator) | Email: `admin@pkpt.org`<br>Password: `admin123` | Sistem memvalidasi kredensial, membuat sesi login, dan mengarahkan pengguna ke halaman Dashboard Admin dengan akses menu penuh. | Sesuai harapan, dialihkan ke `/admin/dashboard` dengan hak akses Administrator. | **Valid** |
| 2 | Login dengan data valid (Role Ketua IPNU/IPPNU) | Email: `ketua@pkpt.org`<br>Password: `ketua123` | Sistem mengotentikasi pengguna dan menampilkan Dashboard dengan menu terbatas (Agenda, Pendaftar, Anggota, Galeri, Statistik). | Sesuai harapan, dialihkan ke Dashboard dengan batasan menu khusus Ketua. | **Valid** |
| 3 | Login dengan data valid (Role Departemen) | Email: `departemen@pkpt.org`<br>Password: `dept123` | Sistem mengotentikasi pengguna dan hanya menampilkan menu konten (Berita, Artikel, Quotes). | Sesuai harapan, menu manajemen anggota/pendaftar tersembunyi sesuai hak akses. | **Valid** |
| 4 | Login dengan kata sandi salah | Email: `admin@pkpt.org`<br>Password: `salah123` | Sistem menolak proses login dan menampilkan pesan peringatan error bahwa kredensial tidak sesuai. | Tampil pesan peringatan kesalahan kredensial dan form sandi dikosongkan kembali. | **Valid** |
| 5 | Login dengan format email tidak valid | Email: `bukan-email`<br>Password: `admin123` | Validasi form memblokir pengiriman dan meminta pengguna memasukkan alamat surel yang sah. | Muncul validasi *"Format email tidak valid"* pada antarmuka. | **Valid** |
| 6 | Uji fitur intip kata sandi (*Show/Hide Password*) | Klik ikon mata (*Eye*) pada kolom kata sandi | Tipe input input berubah dari `password` menjadi `text`, menampilkan teks sandi secara terbuka. | Ikon berubah menjadi `EyeOff` dan karakter sandi dapat terbaca. | **Valid** |
| 7 | Mengakses halaman admin tanpa sesi login | URL langsung: `/admin/dashboard` | Akses ditolak oleh middleware `auth`, pengguna otomatis dialihkan ke halaman `/login`. | Pengguna diarahkan ke `/login` dan tidak dapat melihat data admin. | **Valid** |
| 8 | Proses keluar (*Logout*) sistem | Klik tombol `[ Keluar ]` pada panel *sidebar* | Sesi autentikasi dihapus dari server dan pengguna diarahkan kembali ke halaman beranda publik. | Sesi terhapus sempurna, tombol kembali ke halaman admin tidak dapat diakses. | **Valid** |

---

#### b. Pengujian Modul Publik & Navigasi Informasi

Pengujian ini memastikan seluruh halaman publik dapat diakses dengan cepat, memiliki tata letak responsif, dan menyajikan data dinamis dari basis data secara akurat.

<p align="center"><b>Tabel 4. 31 Pengujian Modul Publik & Navigasi Informasi</b></p>

| No | Skenario Pengujian | Masukan (Input) | Hasil yang Diharapkan | Hasil Pengamatan | Kesimpulan |
|:--:|:---|:---|:---|:---|:---:|
| 1 | Mengakses halaman Beranda utama | URL: `/` | Menampilkan navbar transparan/blur, slider kutipan tokoh, seksi feature pengenalan, 4 kartu statistik, warta terkini, artikel opini, sambutan ketua, dan agenda terdekat. | Halaman termuat lengkap dengan seluruh komponen visual dan data dari database. | **Valid** |
| 2 | Efek pengguliran (*Scroll*) Navbar | Gulir halaman ke bawah melebihi 50px | Bilah navigasi berubah latar belakang menjadi hijau *emerald* pekat dengan efek bayangan dan tetap melayang (*sticky*). | Transisi visual navbar berjalan mulus (*smooth transition*). | **Valid** |
| 3 | Mengakses menu dropdown Profil | Sorot kursor ke menu `Profil` lalu klik `Visi & Misi` | Dropdown terbuka menampilkan pilihan (Visi Misi, Sejarah, Struktur) dan mengarahkan ke halaman yang sesuai. | Halaman `/profil/visi-misi` termuat dengan deskripsi visi dan misi organisasi. | **Valid** |
| 4 | Membuka detail berita | Klik salah satu kartu berita pada seksi Berita Terkini | Menampilkan halaman `/berita/{slug}` berisi gambar utama resolusi penuh, nama penulis, tanggal terbit, dan isi warta lengkap. | Halaman detail warta berita tampil proporsional sesuai data slug. | **Valid** |
| 5 | Membuka detail artikel opini kader | Klik salah satu kartu artikel opini | Menampilkan halaman `/artikel/{slug}` berisi judul opini, foto pendukung, nama kader penulis, dan narasi gagasan. | Artikel termuat rapi dan nyaman dibaca pada perangkat desktop maupun seluler. | **Valid** |
| 6 | Membuka halaman Galeri dokumentasi | Klik menu `Galeri` pada navbar | Menampilkan galeri foto kegiatan dalam format grid modern dengan judul kegiatan pada setiap foto. | Foto-foto kegiatan termuat secara dinamis dari tabel `galleries`. | **Valid** |
| 7 | Pemuatan kalender & daftar kegiatan | Klik menu `Agenda` pada navbar | Menampilkan daftar kegiatan yang diurutkan berdasarkan tanggal pelaksanaan terdekat. | Agenda kegiatan masa depan termuat lengkap beserta waktu dan lokasinya. | **Valid** |

---

#### c. Pengujian Formulir Pendaftaran Dinamis & Validasi NIK

Pengujian ini memverifikasi keandalan formulir pendaftaran kegiatan, validasi format data, kalkulasi otomatis NIK, serta pencegahan pendaftaran ganda pada agenda yang sama.

<p align="center"><b>Tabel 4. 32 Pengujian Formulir Pendaftaran & Validasi NIK</b></p>

| No | Skenario Pengujian | Masukan (Input) | Hasil yang Diharapkan | Hasil Pengamatan | Kesimpulan |
|:--:|:---|:---|:---|:---|:---:|
| 1 | Pendaftaran dengan data lengkap dan valid | Nama: `Ahmad Fauzi`<br>WA: `081234567890`<br>Email: `ahmad@unsiq.ac.id`<br>NIK: `3509121405040001` (16 digit)<br>Metode: `midtrans` | Data berhasil divalidasi, disimpan ke tabel `agenda_registrations` dengan status `pending`, dan diarahkan ke halaman pembayaran Midtrans. | Data tersimpan dengan kode `REG-...`, dialihkan ke rute `/kegiatan/payment/{id}`. | **Valid** |
| 2 | Mengosongkan kolom wajib (*Required field*) | Kolom Nama Lengkap dan Nomor WhatsApp dikosongkan | Sistem membatalkan submit dan memunculkan pesan galat *"Kolom ini wajib diisi"* pada field terkait. | Form tidak terkirim dan muncul tanda peringatan merah pada input yang kosong. | **Valid** |
| 3 | Input nomor WhatsApp kurang dari 9 digit | No WA: `0812` | Sistem menolak data dengan notifikasi *"Nomor WhatsApp minimal 9 digit"*. | Pesan error validasi nomor telepon berhasil ditampilkan. | **Valid** |
| 4 | Input NIK kurang dari 16 digit | NIK: `35091234` (8 digit) | Sistem menolak input dengan notifikasi *"NIK harus berupa 16 digit angka"*. | Peringatan validasi NIK berhasil mencegah input yang tidak lengkap. | **Valid** |
| 5 | Input NIK 16 digit valid (Uji parser wilayah) | NIK: `3509121405040001` | Fitur `parseFullNik` otomatis mendeteksi dan menampilkan informasi: Jenis Kelamin (Laki-Laki), Tanggal Lahir (14-05-2004), Kecamatan (Sumbersari), Kab/Kota (Jember), Provinsi (Jatim). | Kotak hijau deteksi identitas NIK muncul otomatis di bawah kolom NIK. | **Valid** |
| 6 | Uji pencegahan pendaftaran ganda (*Duplicate Registration*) | Menginput kembali NIK atau No WA yang sama pada agenda yang sama | Sistem memeriksa data pendaftar aktif, menolak pendaftaran kedua, dan memunculkan pesan peringatan bahwa peserta sudah terdaftar. | Sistem mendeteksi duplikasi data dan menggagalkan pendaftaran ganda. | **Valid** |
| 7 | Mengakses pendaftaran agenda yang sudah ditutup | Akses URL pendaftaran agenda dengan `is_registration_open = false` | Sistem menampilkan pesan bahwa pendaftaran untuk kegiatan tersebut telah ditutup. | Akses formulir dicegah dan muncul notifikasi pendaftaran ditutup. | **Valid** |

---

#### d. Pengujian Transaksi & Pembayaran Kegiatan

Pengujian ini memastikan transaksi pembayaran baik melalui *Payment Gateway Midtrans* (otomatis) maupun transfer bank konvensional (manual) dapat tercatat dan tersinkronisasi statusnya secara tepat.

<p align="center"><b>Tabel 4. 33 Pengujian Transaksi & Pembayaran Kegiatan</b></p>

| No | Skenario Pengujian | Masukan (Input) | Hasil yang Diharapkan | Hasil Pengamatan | Kesimpulan |
|:--:|:---|:---|:---|:---|:---:|
| 1 | Pemuatan pop-up pembayaran otomatis Midtrans | Akses halaman pembayaran dengan metode `midtrans`, klik tombol `[ Bayar Sekarang ]` | Skrip Snap Midtrans mengeksekusi token transaksi dan memunculkan pop-up pilihan kanal bayar (QRIS, VA BCA/BRI/Mandiri, E-Wallet). | Modal Snap Midtrans terbuka dengan rincian total tagihan yang sesuai. | **Valid** |
| 2 | Pengecekan status pembayaran otomatis via tombol verifikasi | Klik tombol `[ Sudah Bayar? Cek Status Pembayaran ]` | Sistem mengirimkan request ke endpoint verifikasi, memeriksa status transaksi ke server Midtrans, dan memperbarui status pendaftaran jika sudah lunas. | Muncul dialog SweetAlert2 memuat status mutasi transaksi terkini. | **Valid** |
| 3 | Simulasi penerimaan notifikasi Webhook Midtrans (*Settlement*) | Webhook payload Midtrans dengan status `settlement` | Endpoint `/api/midtrans-callback` memvalidasi signature key, mengubah status pendaftaran menjadi `approved`, dan mencatat waktu bayar. | Status pendaftaran di basis data otomatis berubah menjadi `approved` secara *real-time*. | **Valid** |
| 4 | Pendaftaran metode Transfer Manual dengan bukti pembayaran | Pilih metode `transfer`, unggah berkas `bukti_transfer.jpg` (ukuran 1,2 MB) | Sistem memvalidasi tipe file berkas gambar, menyimpan file ke storage, dan mencatat status `pending` menunggu verifikasi admin. | Berkas bukti transfer tersimpan dengan aman dan tampil di panel admin. | **Valid** |
| 5 | Unggah bukti transfer dengan format tidak didukung | Unggah berkas berformat `bukti.pdf` atau `bukti.exe` | Sistem menolak unggahan dengan notifikasi *"File bukti pembayaran harus berupa gambar (jpeg, png, jpg, webp)"*. | Berkas non-gambar ditolak sebelum formulir dapat dikirimkan. | **Valid** |
| 6 | Unggah bukti transfer melebihi ukuran batas maksimum | Unggah file gambar berukuran 8 MB (Batas: 5 MB) | Sistem menolak unggahan dengan notifikasi *"Ukuran maksimal file bukti pembayaran adalah 5MB"*. | Sistem membatasi ukuran unggahan demi menjaga stabilitas penyimpanan server. | **Valid** |

---

#### e. Pengujian Dashboard Admin & Panel Notifikasi

Pengujian ini memverifikasi keakuratan penyajian data statistik, ketersediaan menu navigasi sesuai *role*, serta fungsionalitas pemantauan aktivitas sistem.

<p align="center"><b>Tabel 4. 34 Pengujian Dashboard Admin & Panel Notifikasi</b></p>

| No | Skenario Pengujian | Masukan (Input) | Hasil yang Diharapkan | Hasil Pengamatan | Kesimpulan |
|:--:|:---|:---|:---|:---|:---:|
| 1 | Tampilan ringkasan metrik statistik | Membuka halaman `/admin/dashboard` | Menampilkan 8 kartu metrik (Berita, Artikel, Anggota, Agenda, Pendaftar, Galeri, Quotes, Statistik) dengan angka total data yang akurat dari database. | Nilai perhitungan kartu statistik sama persis dengan jumlah baris tabel database. | **Valid** |
| 2 | Indikator status sistem | Pemuatan elemen *status card* | Menampilkan indikator titik hijau berdenyut (*pulse*) dengan status teks *"Online & Stabil"*. | Tampilan status sistem aktif dan memberikan umpan balik visual yang baik. | **Valid** |
| 3 | Pemantauan aktivitas sistem terkini (*Live Updates*) | Pemuatan seksi Aktivitas Terakhir | Menampilkan daftar aktivitas terbaru (agenda baru, warta baru, pendaftar baru) dengan urutan waktu termutakhir (*timestamp*). | Data aktivitas tercatat dan terurut secara kronologis dari yang terbaru. | **Valid** |
| 4 | Tombol aksi cepat (*Quick Shortcuts*) | Klik tombol pintasan `[ + Post Berita ]` atau `[ + Agenda Baru ]` | Sistem langsung mengarahkan pengguna ke halaman formulir pembuatan konten yang relevan. | Pengalihan halaman form pembuatan berjalan cepat tanpa kendala. | **Valid** |
| 5 | Fitur pengalih tema tampilan (*Dark / Light Mode*) | Klik tombol pengubah tema pada *topbar* | Seluruh antarmuka admin beralih warna latar antara tema gelap (*slate-950*) dan tema terang (*slate-50*), status preferensi disimpan di *local storage*. | Mode gelap dan terang berfungsi sempurna pada seluruh elemen antarmuka admin. | **Valid** |

---

#### f. Pengujian Modul Manajemen Data Pendaftar & Verifikasi

Pengujian ini memastikan pengurus dapat mengelola data peserta kegiatan secara efektif, memverifikasi pembayaran manual, serta melakukan sinkronisasi status transaksi dengan Midtrans.

<p align="center"><b>Tabel 4. 35 Pengujian Modul Manajemen Data Pendaftar</b></p>

| No | Skenario Pengujian | Masukan (Input) | Hasil yang Diharapkan | Hasil Pengamatan | Kesimpulan |
|:--:|:---|:---|:---|:---|:---:|
| 1 | Membuka daftar pendaftar global | URL: `/admin/registrations` | Menampilkan tabel 6 kolom: Waktu Daftar, Pendaftar & Agenda (Nama, WA, Email, NIK), Metode, Status, Bukti Bayar, dan Aksi. | Tabel data pendaftar termuat lengkap dengan *badge* status berwarna. | **Valid** |
| 2 | Fitur pemfilteran data per agenda | Pilih opsi agenda pada dropdown `Filter Agenda` (contoh: *Makesta Raya 2026*) | Tabel hanya menampilkan peserta yang mendaftar pada agenda yang dipilih. | Data dalam tabel otomatis terfilter sesuai agenda tanpa perlu memuat ulang seluruh halaman. | **Valid** |
| 3 | Fitur sinkronisasi massal status Midtrans | Klik tombol `[ Sinkronkan Semua Midtrans ]` | Sistem menjalankan perintah pengecekan ke API Midtrans untuk semua pendaftaran berstatus *pending*, dan memperbarui status menjadi *approved* jika transaksi lunas. | Ikon refresh berputar dan status pembayaran terperbarui secara serentak. | **Valid** |
| 4 | Pratinjau detail pendaftar dan bukti bayar | Klik tombol ikon `[ Mata ]` pada baris pendaftar | Membuka modal pop-up menampilkan seluruh isian form peserta, rincian Midtrans, dan pratinjau foto bukti transfer. | Seluruh data formulir peserta dan foto bukti transfer tampil jelas pada modal. | **Valid** |
| 5 | Persetujuan pendaftar manual (*Approve*) | Klik tombol ikon centang hijau `[ Setujui ]` pada pendaftar pending | Status pendaftar berubah menjadi `approved` dan tombol aksi persetujuan hilang. | Status pendaftar berhasil diperbarui menjadi `approved` di database. | **Valid** |
| 6 | Penolakan pendaftar (*Reject*) disertai alasan | Klik tombol ikon silang merah `[ Tolak ]`, isi alasan penolakan pada dialog SweetAlert2 | Status berubah menjadi `rejected` dan sistem otomatis mengirimkan surel penolakan beserta alasannya kepada pendaftar. | Status pendaftar terbarui dan fungsi pengiriman email notifikasi tereksekusi. | **Valid** |
| 7 | Hapus data pendaftar | Klik tombol ikon `[ Hapus ]` lalu konfirmasi dialog | Data pendaftar dihapus secara permanen dari tabel `agenda_registrations`. | Baris pendaftar terhapus dari tampilan tabel dan data berkurang di basis data. | **Valid** |

---

#### g. Pengujian Modul Content Management System (CMS)

Pengujian ini memverifikasi fungsionalitas publikasi dan pemeliharaan konten informasi (warta berita, artikel opini, galeri kegiatan, dan kutipan ulama).

<p align="center"><b>Tabel 4. 36 Pengujian Modul Pengelolaan Konten CMS</b></p>

| No | Skenario Pengujian | Masukan (Input) | Hasil yang Diharapkan | Hasil Pengamatan | Kesimpulan |
|:--:|:---|:---|:---|:---|:---:|
| 1 | Menambahkan berita baru dengan data lengkap | Judul: *Pelantikan Pengurus Baru...*<br>Unggah Foto: `pelantikan.jpg`<br>Isi Berita: Teks narasi lengkap | Berita berhasil disimpan, slug dibuat otomatis dari judul, gambar tersimpan, dan berita langsung muncul di tabel serta halaman depan web. | Data warta berita baru berhasil tersimpan dan langsung terlihat di portal publik. | **Valid** |
| 2 | Tambah berita tanpa mengisi judul | Kolom judul dikosongkan | Sistem menolak submit dan menampilkan pesan validasi *"The title field is required"*. | Validasi form memblokir pengiriman formulir kosong. | **Valid** |
| 3 | Fitur pratinjau foto langsung (*Live Image Preview*) | Memilih file foto pada area *dropzone* foto | Gambar yang dipilih langsung tampil di layar sebelum formulir dikirimkan, dilengkapi tombol batal (*X*). | Pratinjau foto langsung muncul seketika di dalam bingkai unggah. | **Valid** |
| 4 | Mengubah (*Edit*) berita yang sudah terbit | Klik tombol `[ Edit ]`, ubah judul atau isi berita, lalu klik simpan | Data berita diperbarui di tabel `posts` dan perubahan langsung tercermin pada halaman web publik. | Pembaruan isi warta berhasil diterapkan tanpa mengubah data yang tidak diedit. | **Valid** |
| 5 | Menghapus warta berita | Klik tombol `[ Hapus ]` pada salah satu warta | Muncul dialog konfirmasi; jika disetujui, data berita beserta file fotonya dihapus dari sistem. | Berita terhapus dari daftar admin dan tidak lagi muncul di halaman publik. | **Valid** |
| 6 | Menambahkan artikel opini kader | Judul opini, nama penulis kader, foto pendukung, dan isi artikel | Artikel tersimpan di tabel `articles` dengan status *published* dan dapat diakses pada menu Artikel. | Artikel opini baru berhasil terbit dan terindeks di halaman arsip artikel. | **Valid** |
| 7 | Manajemen data pengurus (*Members*) | Tambah pengurus baru (Nama, Jabatan, Tipe: IPNU/IPPNU, Level: BPH/Dept, Foto) | Data pengurus tersimpan dan tersusun rapi pada bagan struktur organisasi di menu Profil. | Susunan pengurus tampil sesuai urutan tingkat (*level*) dan kelompok organisasi. | **Valid** |

---

### 4.12.3. Rekapitulasi dan Kesimpulan Hasil Pengujian

Berdasarkan seluruh tahapan pengujian kotak hitam (*Black Box Testing*) yang telah dilaksanakan pada 7 (tujuh) kelompok modul fungsional, diperoleh ringkasan evaluasi pengujian sebagaimana tercantum pada tabel berikut:

<p align="center"><b>Tabel 4. 37 Rekapitulasi Hasil Pengujian Black Box</b></p>

| No | Modul / Fitur yang Diuji | Jumlah Butir Uji | Jumlah Valid | Jumlah Tidak Valid | Persentase Keberhasilan |
|:--:|:---|:---:|:---:|:---:|:---:|
| 1 | Modul Autentikasi & Hak Akses Pengurus | 8 | 8 | 0 | 100% |
| 2 | Modul Publik & Navigasi Informasi | 7 | 7 | 0 | 100% |
| 3 | Formulir Pendaftaran Dinamis & Validasi NIK | 7 | 7 | 0 | 100% |
| 4 | Transaksi & Pembayaran Kegiatan (Midtrans & Manual) | 6 | 6 | 0 | 100% |
| 5 | Dashboard Admin & Panel Notifikasi | 5 | 5 | 0 | 100% |
| 6 | Modul Manajemen Data Pendaftar & Verifikasi | 7 | 7 | 0 | 100% |
| 7 | Pengelolaan Konten CMS (Berita, Artikel, Media) | 7 | 7 | 0 | 100% |
| **Total** | **47 Butir Uji** | **47** | **0** | **100%** |

$$\text{Persentase Keberhasilan} = \frac{\text{Jumlah Kasus Uji Valid}}{\text{Total Kasus Uji}} \times 100\% = \frac{47}{47} \times 100\% = 100\%$$

### Kesimpulan Pengujian:
Berdasarkan hasil rekapitulasi pengujian pada Tabel 4. 37, seluruh skenario pengujian fungsionalitas yang berjumlah **47 butir uji** pada Sistem Informasi PKPT IPNU-IPPNU memperoleh hasil **100% Valid**. 

Sistem telah terbukti mampu:
1. Menjaga keamanan hak akses pengurus melalui pembatasan otorisasi peran (*RBAC*) yang ketat.
2. Menyajikan informasi publik, warta berita, artikel opini, dan profil organisasi secara responsif dan dinamis.
3. Memvalidasi data calon peserta secara berlapis (termasuk validasi keabsahan NIK 16 digit dan pencegahan registrasi ganda).
4. Memproses transaksi pendaftaran secara otomatis menggunakan gerbang pembayaran *Midtrans* maupun verifikasi bukti transfer manual.
5. Mempermudah manajemen organisasi melalui panel kendali admin yang informatif, terstruktur, dan ramah pengguna.

Dengan demikian, Sistem Informasi PKPT IPNU-IPPNU dinyatakan **layak, andal, dan siap dioperasikan (*ready for deployment*)** untuk mendukung kegiatan operasional dan kaderisasi organisasi.

