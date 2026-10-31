# 4.9. Perancangan Basis Data

Perancangan basis data dilakukan untuk mendukung kebutuhan sistem dalam mencatat dan mengelola data kepengurusan, publikasi berita dan artikel, serta pendaftaran dan pembayaran kegiatan pada **Sistem Informasi PK IPNU-IPPNU**. Basis data dirancang menggunakan MySQL, dan mencakup seluruh 11 tabel entitas aplikasi yaitu `users`, `agendas`, `agenda_registrations`, `members`, `posts`, `articles`, `galleries`, `quotes`, `statistics`, `site_settings`, dan `page_settings`.

---

### a. Tabel Users

<div align="center">Tabel 4. 19 Users</div>

| Nama Field | Tipe Field | Lebar | Keterangan |
| :--- | :--- | :--- | :--- |
| id | BIGINT | 20 | Primary key, auto increment |
| name | VARCHAR | 255 | Nama lengkap pengguna / pengurus |
| email | VARCHAR | 255 | Alamat email pengguna (unik) |
| role | ENUM | - | Hak akses pengguna (`admin`, `ketua`, `departemen`) |
| email_verified_at | TIMESTAMP | - | Waktu verifikasi email (opsional) |
| password | VARCHAR | 255 | Kata sandi akun (terenkripsi *hash*) |
| remember_token | VARCHAR | 100 | Token sesi *remember me* (opsional) |
| created_at | DATETIME | - | Tanggal input data pengguna |
| updated_at | DATETIME | - | Tanggal pembaruan data pengguna |

---

### b. Tabel Agendas

<div align="center">Tabel 4. 20 Agendas</div>

| Nama Field | Tipe Field | Lebar | Keterangan |
| :--- | :--- | :--- | :--- |
| id | BIGINT | 20 | Primary key, auto increment |
| title | VARCHAR | 255 | Nama atau judul kegiatan/agenda |
| category | VARCHAR | 255 | Kategori agenda (`nasional`, `organisasi`, `keagamaan`, `khusus`) |
| description | TEXT | - | Deskripsi lengkap kegiatan (opsional) |
| event_date | DATE | - | Tanggal pelaksanaan kegiatan |
| event_time | TIME | - | Waktu pelaksanaan kegiatan (opsional) |
| location | VARCHAR | 255 | Lokasi pelaksanaan kegiatan (opsional) |
| is_registration_open | TINYINT | 1 | Status buka/tutup pendaftaran (`1` = buka, `0` = tutup) |
| registration_fee | VARCHAR | 255 | Nominal biaya pendaftaran kegiatan (opsional) |
| payment_account | VARCHAR | 255 | Informasi nomor rekening pembayaran manual (opsional) |
| form_schema | JSON | - | Skema kolom formulir pendaftaran dinamis (opsional) |
| image | VARCHAR | 255 | Path/URL poster atau gambar kegiatan (opsional) |
| created_at | DATETIME | - | Tanggal input agenda |
| updated_at | DATETIME | - | Tanggal pembaruan agenda |

---

### c. Tabel Agenda Registrations

<div align="center">Tabel 4. 21 Agenda Registrations</div>

| Nama Field | Tipe Field | Lebar | Keterangan |
| :--- | :--- | :--- | :--- |
| id | BIGINT | 20 | Primary key, auto increment |
| agenda_id | BIGINT | 20 | Foreign key ke tabel `agendas` (`id`) |
| user_id | BIGINT | 20 | Foreign key ke tabel `users` (`id`) (opsional) |
| responses | JSON | - | Data jawaban formulir pendaftar (nama, telepon, email, NIK, dll) |
| status | VARCHAR | 255 | Status verifikasi pendaftaran (`pending`, `approved`, `rejected`) |
| payment_proof | VARCHAR | 255 | Path file bukti transfer pembayaran manual (opsional) |
| payment_method | VARCHAR | 255 | Metode pembayaran (`cash`, `transfer`, `midtrans`) |
| snap_token | VARCHAR | 255 | Token pembayaran *Midtrans Snap* (opsional) |
| midtrans_order_id | VARCHAR | 255 | Kode unik *Order ID* transaksi Midtrans (opsional) |
| midtrans_payment_type | VARCHAR | 255 | Kanal pembayaran Midtrans seperti `qris`, `bank_transfer` (opsional) |
| midtrans_transaction_status | VARCHAR | 255 | Status transaksi dari Midtrans (`pending`, `settlement`, `expire`) |
| midtrans_settlement_time | TIMESTAMP | - | Waktu pelunasan transaksi di Midtrans (opsional) |
| created_at | DATETIME | - | Tanggal pendaftaran peserta |
| updated_at | DATETIME | - | Tanggal pembaruan status pendaftaran |

---

### d. Tabel Members

<div align="center">Tabel 4. 22 Members</div>

| Nama Field | Tipe Field | Lebar | Keterangan |
| :--- | :--- | :--- | :--- |
| id | BIGINT | 20 | Primary key, auto increment |
| user_id | BIGINT | 20 | Foreign key ke tabel `users` (`id`) (opsional) |
| name | VARCHAR | 255 | Nama lengkap pengurus/anggota |
| position | VARCHAR | 255 | Jabatan dalam struktur organisasi |
| level | INT | 11 | Tingkatan struktur (`1` = BPH/Inti, `2` = Departemen, `3` = Anggota) |
| department | VARCHAR | 255 | Nama departemen/lembaga pengurus (opsional) |
| photo | VARCHAR | 255 | Path/URL foto profil pengurus (opsional) |
| instagram | VARCHAR | 255 | Username atau tautan akun Instagram (opsional) |
| type | ENUM | - | Kategori badan otonom (`ipnu`, `ippnu`) |
| order | INT | 11 | Urutan tampil pada halaman struktur organisasi |
| created_at | DATETIME | - | Tanggal input data anggota |
| updated_at | DATETIME | - | Tanggal pembaruan data anggota |

---

### e. Tabel Posts

<div align="center">Tabel 4. 23 Posts</div>

| Nama Field | Tipe Field | Lebar | Keterangan |
| :--- | :--- | :--- | :--- |
| id | BIGINT | 20 | Primary key, auto increment |
| user_id | BIGINT | 20 | Foreign key ke tabel `users` (`id`) pembuat berita (opsional) |
| title | VARCHAR | 255 | Judul berita kegiatan organisasi |
| slug | VARCHAR | 255 | Tautan ramah SEO (*URL slug*, unik) |
| image | VARCHAR | 255 | Path/URL gambar sampul berita (opsional) |
| content | TEXT | - | Isi lengkap artikel berita |
| published_at | TIMESTAMP | - | Tanggal dan waktu berita dipublikasikan (opsional) |
| created_at | DATETIME | - | Tanggal pembuatan berita |
| updated_at | DATETIME | - | Tanggal pembaruan berita |

---

### f. Tabel Articles

<div align="center">Tabel 4. 24 Articles</div>

| Nama Field | Tipe Field | Lebar | Keterangan |
| :--- | :--- | :--- | :--- |
| id | BIGINT | 20 | Primary key, auto increment |
| user_id | BIGINT | 20 | Foreign key ke tabel `users` (`id`) pengunggah artikel (opsional) |
| title | VARCHAR | 255 | Judul artikel/opini kader |
| slug | VARCHAR | 255 | Tautan ramah SEO (*URL slug*, unik) |
| author | VARCHAR | 255 | Nama penulis artikel/opini (opsional) |
| image | VARCHAR | 255 | Path/URL gambar ilustrasi artikel (opsional) |
| content | TEXT | - | Isi lengkap tulisan artikel |
| published_at | TIMESTAMP | - | Tanggal dan waktu artikel diterbitkan (opsional) |
| created_at | DATETIME | - | Tanggal pembuatan artikel |
| updated_at | DATETIME | - | Tanggal pembaruan artikel |

---

### g. Tabel Galleries

<div align="center">Tabel 4. 25 Galleries</div>

| Nama Field | Tipe Field | Lebar | Keterangan |
| :--- | :--- | :--- | :--- |
| id | BIGINT | 20 | Primary key, auto increment |
| title | VARCHAR | 255 | Judul atau keterangan dokumentasi foto |
| image_path | VARCHAR | 255 | Path/URL file foto dokumentasi kegiatan |
| created_at | DATETIME | - | Tanggal unggah foto galeri |
| updated_at | DATETIME | - | Tanggal pembaruan foto galeri |

---

### h. Tabel Quotes

<div align="center">Tabel 4. 26 Quotes</div>

| Nama Field | Tipe Field | Lebar | Keterangan |
| :--- | :--- | :--- | :--- |
| id | BIGINT | 20 | Primary key, auto increment |
| content | TEXT | - | Isi teks kutipan motivasi/tokoh |
| author | VARCHAR | 255 | Nama tokoh/pencetus kutipan (opsional) |
| image | VARCHAR | 255 | Path/URL foto tokoh pada kutipan (opsional) |
| order | INT | 11 | Urutan tampil slide kutipan di halaman utama |
| is_active | TINYINT | 1 | Status tampil kutipan (`1` = aktif, `0` = nonaktif) |
| created_at | DATETIME | - | Tanggal input kutipan |
| updated_at | DATETIME | - | Tanggal pembaruan kutipan |

---

### i. Tabel Statistics

<div align="center">Tabel 4. 27 Statistics</div>

| Nama Field | Tipe Field | Lebar | Keterangan |
| :--- | :--- | :--- | :--- |
| id | BIGINT | 20 | Primary key, auto increment |
| title | VARCHAR | 255 | Judul indikator statistik (misal: Jumlah Kader) |
| subtitle | VARCHAR | 255 | Subjudul statistik (opsional) |
| value | VARCHAR | 255 | Nilai/angka capaian statistik |
| unit | VARCHAR | 255 | Satuan nilai statistik seperti `Orang`, `Kegiatan` (opsional) |
| description | TEXT | - | Deskripsi tambahan indikator statistik (opsional) |
| icon | VARCHAR | 255 | Nama kelas ikon tampilan statistik |
| color | VARCHAR | 255 | Tema warna kartu statistik (`emerald`, `blue`, `amber`, `red`) |
| order | INT | 11 | Nomor urutan tampil statistik |
| is_active | TINYINT | 1 | Status aktif indikator (`1` = tampil, `0` = sembunyi) |
| created_at | DATETIME | - | Tanggal input statistik |
| updated_at | DATETIME | - | Tanggal pembaruan statistik |

---

### j. Tabel Site Settings

<div align="center">Tabel 4. 28 Site Settings</div>

| Nama Field | Tipe Field | Lebar | Keterangan |
| :--- | :--- | :--- | :--- |
| id | BIGINT | 20 | Primary key, auto increment |
| site_name | VARCHAR | 255 | Nama resmi situs organisasi |
| site_logo | VARCHAR | 255 | Path/URL file logo organisasi (opsional) |
| favicon | VARCHAR | 255 | Path/URL ikon *favicon* situs (opsional) |
| meta_description | TEXT | - | Deskripsi meta SEO website (opsional) |
| footer_description | TEXT | - | Teks deskripsi singkat pada *footer* (opsional) |
| address | VARCHAR | 255 | Alamat sekretariat PK IPNU-IPPNU (opsional) |
| email | VARCHAR | 255 | Email kontak resmi organisasi (opsional) |
| phone | VARCHAR | 255 | Nomor telepon/WhatsApp sekretariat (opsional) |
| instagram | VARCHAR | 255 | Tautan media sosial Instagram (opsional) |
| facebook | VARCHAR | 255 | Tautan media sosial Facebook (opsional) |
| twitter | VARCHAR | 255 | Tautan media sosial Twitter/X (opsional) |
| youtube | VARCHAR | 255 | Tautan kanal YouTube resmi (opsional) |
| copyright_text | VARCHAR | 255 | Teks hak cipta pada bagian bawah halaman (opsional) |
| home_news_title | VARCHAR | 255 | Judul seksi berita terkini di beranda |
| home_agenda_title | VARCHAR | 255 | Judul seksi agenda terdekat di beranda |
| default_hero_title | VARCHAR | 255 | Judul *banner hero* bawaan halaman utama (opsional) |
| default_hero_subtitle | TEXT | - | Subjudul *banner hero* bawaan (opsional) |
| default_hero_image | VARCHAR | 255 | Gambar latar *hero* bawaan (opsional) |
| created_at | DATETIME | - | Tanggal pembuatan konfigurasi situs |
| updated_at | DATETIME | - | Tanggal pembaruan konfigurasi situs |

---

### k. Tabel Page Settings

<div align="center">Tabel 4. 29 Page Settings</div>

| Nama Field | Tipe Field | Lebar | Keterangan |
| :--- | :--- | :--- | :--- |
| id | BIGINT | 20 | Primary key, auto increment |
| page_name | VARCHAR | 255 | Kode penanda halaman (`home`, `profile`, `gallery`, `news`) |
| hero_title | VARCHAR | 255 | Judul *header/hero* masing-masing halaman (opsional) |
| hero_description | TEXT | - | Deskripsi singkat pada *header* halaman (opsional) |
| hero_image | VARCHAR | 255 | Gambar latar *hero* halaman (opsional) |
| header_bg_color | VARCHAR | 255 | Kode warna latar *header* halaman (opsional) |
| header_text_color | VARCHAR | 255 | Kode warna teks *header* halaman (opsional) |
| header_bg_image | VARCHAR | 255 | Gambar latar kustomisasi *header* halaman (opsional) |
| content_sejarah | TEXT | - | Teks konten sejarah organisasi pada halaman profil (opsional) |
| content_visi_misi | TEXT | - | Teks konten visi & misi organisasi pada halaman profil (opsional) |
| feature_subtitle | VARCHAR | 255 | Subjudul seksi fitur unggulan (opsional) |
| feature_title | VARCHAR | 255 | Judul seksi fitur unggulan (opsional) |
| feature_description | TEXT | - | Deskripsi seksi fitur unggulan (opsional) |
| feature_image | TEXT | - | Gambar ilustrasi seksi fitur unggulan (opsional) |
| feature_button_text | VARCHAR | 255 | Teks tombol aksi pada seksi fitur (opsional) |
| feature_button_url | VARCHAR | 255 | Tautan URL tombol aksi pada seksi fitur (opsional) |
| created_at | DATETIME | - | Tanggal input pengaturan halaman |
| updated_at | DATETIME | - | Tanggal pembaruan pengaturan halaman |
