# Analisis Proyek Website PKPT IPNU-IPPNU UNEJ
**Bahan pendukung penyusunan Laporan Kerja Praktek**

Dokumen ini berisi hasil analisis terhadap *source code* website PKPT IPNU-IPPNU UNEJ yang ada di repository ini. Isinya dipakai sebagai bahan verifikasi agar Bab 2 (landasan teori) dan Bab 3/4 (analisis, perancangan, implementasi) sesuai dengan kondisi sistem yang sebenarnya — bukan teori yang tidak dipakai di proyek.

---

## 1. Identitas Sistem

| Aspek | Keterangan |
|---|---|
| Nama sistem | Website profil & portal informasi PKPT IPNU-IPPNU UNEJ |
| Jenis sistem | *Content Management System* (CMS) berbasis web, monolitik |
| Model pengguna | Publik (pengunjung anonim) dan pengelola internal (3 level peran) |
| Bahasa antarmuka | Indonesia |
| Pola arsitektur | MVC (*Model–View–Controller*) + *server-side rendering adapter* (Inertia.js) |
| Basis data | MySQL (`pkpt`) |
| Penyimpanan berkas | Cloudinary (CDN eksternal), bukan disk lokal |

---

## 2. Tech Stack (bahan inti landasan teori Bab 2)

Semua teori yang ditulis di Bab 2 sebaiknya merujuk pada teknologi berikut — karena semua ini benar-benar dipakai di kode:

### 2.1 Sisi server
| Teknologi | Versi | Peran dalam sistem |
|---|---|---|
| PHP | ^8.2 | Bahasa pemrograman sisi server |
| Laravel | ^12.0 | Kerangka kerja (*framework*) utama; routing, ORM, autentikasi, migrasi |
| Eloquent ORM | (bagian Laravel) | Pemetaan objek–relasional untuk 12 tabel |
| Inertia.js (adapter Laravel) | ^2.0 | Menjembatani controller Laravel dengan komponen React tanpa REST API |
| Laravel Breeze | ^2.3 | Scaffolding autentikasi (login, register, reset password, verifikasi email) |
| Ziggy | ^2.6 | Menggunakan *named route* Laravel di dalam kode React |
| Cloudinary Laravel | ^3.0 | Unggah & optimasi gambar ke CDN |
| Pusher PHP Server / Laravel Reverb | ^7.2 / ^1.0 | Broadcasting *event realtime* |
| Laravel Tinker, Pail, Pint | — | Alat bantu pengembangan (REPL, log, *code style*) |

### 2.2 Sisi klien
| Teknologi | Versi | Peran |
|---|---|---|
| React | ^19.2 | Pustaka antarmuka berbasis komponen |
| @inertiajs/react | ^2.3 | Klien Inertia; menggantikan React Router |
| Vite | ^7.0 | *Build tool* + HMR; juga build SSR (`vite build --ssr`) |
| Tailwind CSS | ^3.4 | *Utility-first CSS framework* |
| Framer Motion | ^12.31 | Animasi antarmuka |
| Lucide React | ^0.563 | Ikon SVG |
| SweetAlert2 | ^11.26 | Dialog notifikasi & konfirmasi hapus |
| Axios | ^1.11 | HTTP klien |
| Laravel Echo + Pusher JS | ^2.3 / ^8.4 | Menerima broadcast realtime di browser |

### 2.3 Konsep yang wajib ada di landasan teori
Berikut konsep yang **benar-benar terimplementasi**, sehingga aman dan relevan untuk ditulis:
1. **Website & CMS** — pengertian situs web statis vs dinamis, sistem pengelolaan konten.
2. **Arsitektur MVC** — terlihat jelas: `app/Models`, `app/Http/Controllers`, `resources/js/Pages`.
3. **Monolith dengan Inertia.js** — pendekatan "modern monolith": tidak ada REST/GraphQL API terpisah, controller langsung mengembalikan komponen React. Ini poin yang menarik secara akademik.
4. **ORM & migrasi basis data** — Eloquent + 25 file migrasi yang merekam evolusi skema.
5. **Middleware & RBAC** (*Role-Based Access Control*) — `RoleMiddleware` dengan 3 peran: `admin`, `ketua`, `departemen`.
6. **Observer & Event Broadcasting** — `ContentObserver` memicu `ContentUpdated` ke kanal `public-content` lewat Pusher → pembaruan konten *realtime* tanpa refresh.
7. **CDN & *cloud storage*** — Cloudinary untuk gambar, bukan `storage/app/public`.
8. **SSR** (*Server-Side Rendering*) — ada `resources/js/ssr.jsx` dan skrip `ssr`, relevan untuk bahasan SEO.
9. **Relasi basis data** — `hasOne`, `hasMany`, `belongsTo`, `nullOnDelete`.

---

## 3. Arsitektur & Alur Kerja Sistem

### 3.1 Alur permintaan (*request lifecycle*)
```
Browser → routes/web.php
        → Middleware (web, auth, verified, role)
        → Controller (PublicController / Admin\*Controller)
        → Model (Eloquent) → MySQL
        → Inertia::render('Nama/Komponen', data)
        → resources/js/Pages/**.jsx (React)
        → Browser (tanpa reload halaman penuh)
```

### 3.2 Struktur direktori penting
```
app/Http/Controllers/PublicController.php   → 10 halaman publik
app/Http/Controllers/Admin/*Controller.php  → 11 resource controller (CRUD)
app/Models/                                 → 9 model Eloquent
app/Observers/ContentObserver.php           → pemicu update realtime
app/Http/Middleware/RoleMiddleware.php      → pembatasan akses per peran
database/migrations/                        → 25 migrasi (riwayat evolusi skema)
resources/js/Pages/                         → halaman React (publik & admin)
resources/js/Components/                    → komponen antarmuka yang dipakai ulang
resources/js/Layouts/                       → PublicLayout, AdminLayout, GuestLayout
```

### 3.3 Pola desain yang digunakan (bisa diangkat di Bab 2/3)
| Pola | Implementasi di kode |
|---|---|
| MVC | Pemisahan Model–View(React)–Controller |
| Observer | `ContentObserver` pada 8 model |
| Event-driven | `ContentUpdated implements ShouldBroadcastNow` |
| Middleware / *Pipeline* | `role:admin,ketua` pada grup *route* |
| Dependency Injection | Constructor/type-hint khas Laravel |
| *Resource Controller* | `Route::resource()` untuk 11 modul CRUD |
| *Service Provider* | `AppServiceProvider::boot()` berbagi data global |
| *Active Record* | Eloquent Model |

---

## 4. Hak Akses (RBAC)

| Peran | Hak akses |
|---|---|
| `admin` | Semua modul + manajemen pengguna + pengaturan situs & halaman |
| `ketua` | Agenda, Galeri, Anggota, Statistik |
| `departemen` | Berita (posts), Artikel, Kutipan (quotes) |
| Semua peran terautentikasi | Dashboard, ubah profil sendiri |

Implementasi: `Route::middleware('role:...')` di `routes/web.php` + `RoleMiddleware` yang mengembalikan HTTP 403 pada permintaan Inertia.

> **Catatan untuk laporan:** ini bisa dikembangkan menjadi tabel *use case*/aktor pada Bab 3.

---

## 5. Struktur Basis Data

12 tabel utama (hasil pembacaan migrasi):

| Tabel | Fungsi | Kolom penting |
|---|---|---|
| `users` | Akun pengelola | `role` (enum: admin/ketua/departemen), email, password |
| `posts` | Berita | `title`, `slug` (unik), `image`, `content`, `published_at`, `user_id` |
| `articles` | Artikel | `title`, `slug` (unik), `image`, `content`, `author`, `published_at`, `user_id` |
| `agendas` | Agenda kegiatan | `title`, `category`, `description`, `event_date`, `event_time`, `location` |
| `galleries` | Galeri foto | `title`, `image_path` |
| `members` | Struktur organisasi | `name`, `position`, `level` (1 pimpinan / 2 departemen / 3 anggota), `department`, `type` (ipnu/ippnu), `photo`, `instagram`, `order`, `user_id` |
| `quotes` | Kutipan/mutiara kata | `content`, `author`, `image`, `order`, `is_active` |
| `statistics` | Data statistik beranda | `title`, `subtitle`, `value`, `unit`, `icon`, `color`, `order`, `is_active` |
| `page_settings` | Konten per halaman | `page_name` (unik), hero (judul/deskripsi/gambar), warna & gambar header, bagian *feature* |
| `site_settings` | Identitas situs global | `site_name`, logo, favicon, SEO meta, alamat, kontak, media sosial, teks footer |
| `hero_slides` | Slide beranda | `title`, `subtitle`, `image`, `order`, `is_active` |
| `cache`, `jobs` | Infrastruktur Laravel | — |

**Relasi:**
- `users` 1—1 `members` (`hasOne`)
- `users` 1—N `posts`, `users` 1—N `articles` (`hasMany`)
- `members`, `posts`, `articles` → `belongsTo` `users` (dengan `nullOnDelete`)

**Optimasi:** migrasi `2026_05_26_optimize_indexes_and_add_author_relations` menambahkan indeks pada `agendas(event_date, category)`, `quotes(is_active, order)`, `statistics(is_active, order)`, `members(type, level, department, order)`, `posts(published_at)`, `articles(published_at)`.

> **Catatan:** ERD untuk Bab 3 bisa langsung digambar dari tabel di atas. Terdapat 1 tabel (`hero_slides`) yang tidak memiliki model dan controller — pastikan apakah masih dipakai atau sudah tidak terpakai (lihat bagian 8).

---

## 6. Fitur Sistem

### 6.1 Halaman publik (10 rute)
| Rute | Halaman |
|---|---|
| `/` | Beranda (hero, sambutan, statistik, berita, agenda, kutipan) |
| `/profil` → `/profil/visi-misi` | Visi & Misi |
| `/profil/sejarah` | Sejarah |
| `/profil/struktur-organisasi` | Struktur organisasi (IPNU & IPPNU, berdasar `level`) |
| `/berita`, `/berita/{slug}` | Daftar & detail berita |
| `/artikel`, `/artikel/{slug}` | Daftar & detail artikel |
| `/galeri` | Galeri foto + *lightbox* |
| `/agenda` | Agenda + kalender nasional + hari libur nasional |
| `/api/agendas` | Endpoint JSON untuk konsumsi JS |

### 6.2 Panel admin (prefix `/admin`)
- Dashboard dengan jumlah data
- CRUD: Posts, Articles, Agendas, Galleries, Members, Quotes, Statistics
- Manajemen pengguna (admin saja)
- Pengaturan halaman & pengaturan situs (admin saja)
- Profil pribadi + ganti password
- Pembaruan *realtime* lewat Pusher (`useRealtimeUpdates.js`)

---

## 7. Integrasi Pihak Ketiga

| Layanan | Kegunaan | Konfigurasi |
|---|---|---|
| Cloudinary | Unggah, simpan, dan optimasi gambar (logo, berita, galeri, anggota) | `FILESYSTEM_DISK=cloudinary`, `config/cloudinary.php` |
| Pusher | Broadcasting *event* `content.updated` di kanal `public-content` | `BROADCAST_CONNECTION=pusher` |
| Reverb | Alternatif *websocket* mandiri milik Laravel (tersedia, belum aktif) | `config/reverb.php` |

---

## 8. Temuan & Rekomendasi (bahan evaluasi / saran Bab 5)

Hal-hal ini ditemukan langsung dari pemeriksaan kode. Sebagian **penting untuk keamanan**:

1. **`.env` terunggah ke repository** — berisi `APP_KEY`, kredensial basis data, dan kunci API Cloudinary/Pusher. File ini ada di *commit* walaupun `.gitignore` sudah mencantumkan `.env`.
   **Tindakan:** ganti semua kredensial, hapus dari riwayat Git, tambahkan ke `.gitignore` secara paksa (`git rm --cached .env`).

2. **`unzipper.php` di direktori utama** — skrip ekstraksi arsip berbasis web tanpa autentikasi. Jika dapat diakses publik, siapa pun bisa mengunggah dan mengekstrak berkas ke server.
   **Tindakan:** hapus dari *production* (ini alat bantu saat *deploy* di *shared hosting*).

3. **`public/pk/` berisi salinan utuh aplikasi (2,4 MB)** — duplikasi *source code* di dalam folder publik, termasuk `.env` dan konfigurasi.
   **Tindakan:** hapus; selain memperbesar ukuran, ini membuka konfigurasi ke akses publik.

4. **Kompabilitas *shared hosting*** — `AppServiceProvider` memiliki logika khusus mendeteksi struktur folder (`base_path('../index.php')`) dan mengarahkan URL ke `/web-pkpt/storage/...`. Ini menunjukkan *deployment* ke *shared hosting* (ProFreeHost), bukan VPS.
   **Catatan:** bisa ditulis di laporan sebagai bagian dari bab implementasi/ *deployment*.

5. **`hero_slides` tidak punya Model/Controller** — tabel ada di migrasi tetapi tidak digunakan. Pertimbangkan dihapus atau dijelaskan sebagai *unused feature*.

6. **Query berulang di setiap permintaan admin** — `AppServiceProvider::boot()` menghitung `Post::count()`, `Gallery::count()`, `Member::count()`, `Agenda::count()` untuk *sidebar* pada setiap *request* `/admin*`. Bisa di-*cache*.
   Ini justru **bagus untuk ditulis di Bab 2** sebagai alasan penggunaan *caching*, dan di Bab 5 sebagai saran perbaikan.

7. **Pengujian otomatis belum mengikuti perkembangan** — folder `tests/` hanya berisi pengujian bawaan Breeze (autentikasi & profil); modul berita/artikel/agenda belum punya pengujian.

---

## 9. Pemetaan ke Bab Laporan Kerja Praktek

| Bab | Sumber data dari proyek ini |
|---|---|
| **Bab 1 – Pendahuluan** | Latar belakang: digitalisasi informasi organisasi kemahasiswaan; ruang lingkup: 10 halaman publik + 11 modul admin |
| **Bab 2 – Landasan Teori** | Semua teknologi di bagian 2 + konsep di 2.3 (MVC, Inertia, ORM, RBAC, Observer, CDN, SSR) |
| **Bab 3 – Analisis & Perancangan** | Alur sistem (3.1), pola desain (3.3), tabel aktor & hak akses (4), ERD & skema (5), daftar fitur (6) |
| **Bab 4 – Implementasi & Pembahasan** | Struktur direktori, *screenshot* halaman, potongan kode *controller/middleware/observer*, konfigurasi Cloudinary & Pusher, proses *deploy* ke *shared hosting* |
| **Bab 5 – Penutup** | Kesimpulan + saran perbaikan dari bagian 8 |

---

*Dokumen ini dibuat otomatis dari hasil pembacaan source code pada branch `arena/01a04941-pk-ipnu-ippnu` (commit `f7fcf05`).*
