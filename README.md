<p align="center">
  <img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="320" alt="PKPT IPNU IPPNU UNSIQ Logo">
</p>

<h1 align="center">🟢 Sistem Informasi PKPT IPNU IPPNU UNSIQ</h1>

<p align="center">
  <strong>Portal Resmi & Sistem Manajemen Organisasi Pimpinan Komisariat Perguruan Tinggi<br>Ikatan Pelajar Nahdlatul Ulama & Ikatan Pelajar Putri Nahdlatul Ulama<br>Universitas Sains Al-Qur'an (UNSIQ) Jawa Tengah di Wonosobo</strong>
</p>

<p align="center">
  <em>"Belajar, Berjuang, Bertaqwa"</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Laravel-12.x-FF2D20?style=for-the-badge&logo=laravel&logoColor=white" alt="Laravel">
  <img src="https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React">
  <img src="https://img.shields.io/badge/Inertia.js-2.0-9553E9?style=for-the-badge&logo=inertia&logoColor=white" alt="Inertia.js">
  <img src="https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/Midtrans-Payment_Gateway-002B49?style=for-the-badge&logoColor=white" alt="Midtrans">
  <img src="https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge" alt="License">
</p>

---

## 📖 Tentang Aplikasi

**Sistem Informasi PKPT IPNU IPPNU UNSIQ** adalah aplikasi web modern yang dibangun untuk menunjang tata kelola administrasi, digitalisasi pendaftaran kegiatan, publikasi informasi, serta database kader PKPT IPNU IPPNU UNSIQ secara terintegrasi, transparan, dan efisien.

Aplikasi ini menggabungkan keandalan **Laravel 12** di sisi backend dan interaktivitas modern **React 19** melalui **Inertia.js v2**, dilengkapi integrasi sistem pembayaran otomatis via **Midtrans Payment Gateway**.

---

## ✨ Fitur-Fitur Unggulan

### 🌐 1. Portal Publik (Front Office)
* **Beranda Interaktif:** Showcase agenda terdekat, statistik anggota/kader, cuplikan berita terhangat, dan mutiara kata (quotes).
* **Profil Organisasi:** Visi & Misi, Kilas Sejarah, serta Bagan Struktur Kepengurusan PKPT IPNU & IPPNU.
* **Media & Informasi:**
  * Warta Berita seputar kegiatan komisariat dan kampus.
  * Artikel & Opini karya kader dan pengurus.
  * Galeri multimedia dokumentasi kegiatan (foto & video).
* **Agenda & Pendaftaran Kegiatan Online:**
  * Pendaftaran event/kegiatan (Makesta, Pelatihan, Seminar, dll.) secara mandiri.
  * Validasi identitas otomatis menggunakan NIK parser.
  * **Pembayaran Otomatis Midtrans:** Dukungan QRIS, Virtual Account (BCA, BNI, BRI, Mandiri), dan e-Wallet dengan sinkronisasi status otomatis (real-time).

---

### 🛡️ 2. Panel Admin & Manajemen (Back Office)
Sistem dilengkapi otorisasi bertingkat berbasis peran (**Role-Based Access Control / RBAC**):

| Role / Peran | Hak Akses & Cakupan Fitur |
| :--- | :--- |
| 👑 **Administrator** | Manajemen pengguna (*User Management*), pengaturan halaman dinamis (*Page Settings*), dan konfigurasi global website (*Site Settings*). |
| 🔰 **Ketua IPNU & IPPNU** | Manajemen Agenda Kegiatan, verifikasi & monitoring data pendaftar event, sinkronisasi pembayaran Midtrans, Database Anggota/Kader (*Members*), Statistik, dan Galeri. |
| ✍️ **Ketua Departemen** | Pengelolaan Berita (*Posts*), Publikasi Artikel/Opini (*Articles*), dan Quotes/Kutipan Inspiratif (*Quotes*). |

---

## 🛠️ Tech Stack & Ekosistem

* **Backend Framework:** [Laravel 12](https://laravel.com) (PHP 8.2+)
* **Frontend Framework:** [React 19](https://react.dev) + [Inertia.js v2](https://inertiajs.com)
* **Styling & UI:** [Tailwind CSS 3.4](https://tailwindcss.com), [Lucide React Icons](https://lucide.dev), [Framer Motion](https://www.framer.com/motion/)
* **Build Tool:** [Vite 7](https://vitejs.dev)
* **Database:** MySQL
* **Payment Gateway:** [Midtrans Snap & Core API](https://midtrans.com)
* **Media Storage:** Cloudinary & Local Storage
* **Realtime Server:** Laravel Reverb / Pusher

---

## 🚀 Panduan Instalasi & Menjalankan Project

Ikuti langkah-langkah berikut untuk menjalankan project ini di komputer lokal:

### 1. Prasyarat Sistem
* PHP `>= 8.2`
* Composer `>= 2.x`
* Node.js `>= 18.x` & NPM
* Web Server (Laragon / XAMPP) & MySQL

---

### 2. Kloning Repository & Masuk ke Direktori
```bash
git clone https://github.com/username/pk-ipnu-ippnu.git
cd pk-ipnu-ippnu
```

---

### 3. Install Dependensi (PHP & Node.js)
```bash
# Install PHP vendor packages
composer install

# Install Javascript dependencies
npm install
```

---

### 4. Konfigurasi Environment (`.env`)
Salin file konfigurasi environment dan generate application key:
```bash
cp .env.example .env
php artisan key:generate
```

Buka file `.env` dan sesuaikan pengaturan database serta Midtrans:
```env
APP_NAME="PKPT IPNU IPPNU UNSIQ"
APP_URL=http://pk-ipnu-ippnu.test

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=pk_ipnu_ippnu
DB_USERNAME=root
DB_PASSWORD=

# Konfigurasi Midtrans (Sandbox / Production)
MIDTRANS_SERVER_KEY=your_midtrans_server_key
MIDTRANS_CLIENT_KEY=your_midtrans_client_key
MIDTRANS_IS_PRODUCTION=false
```

---

### 5. Migrasi Database & Seeder
Buat database di MySQL sesuai nama di `.env` (misal: `pk_ipnu_ippnu`), lalu jalankan:
```bash
php artisan migrate --seed
```

---

### 6. Symbolic Link Storage
Pastikan storage file dapat diakses publik:
```bash
php artisan storage:link
```

---

### 7. Jalankan Server Pengembangan
Jalankan server Laravel dan Vite compiler:

**Opsi A (Sekaligus via Concurrent Dev Script):**
```bash
composer run dev
```

**Opsi B (Terpisah):**
* Terminal 1 (Laravel Server):
  ```bash
  php artisan serve
  ```
* Terminal 2 (Vite Frontend):
  ```bash
  npm run dev
  ```

Buka browser Anda di `http://127.0.0.1:8000` atau via Laragon `http://pk-ipnu-ippnu.test`.

---

## 📁 Struktur Direktori Utama

```
pk-ipnu-ippnu/
├── app/
│   ├── Http/
│   │   ├── Controllers/     # Public, Admin, & Profile Controllers
│   │   └── Middleware/      # Role-based Authorization Middleware
│   └── Models/              # Agenda, Registration, Member, Post, etc.
├── database/
│   ├── migrations/          # Struktur skema tabel database
│   └── seeders/             # Data awal / dummy data
├── public/                  # Asset publik & entry point index.php
├── resources/
│   ├── js/
│   │   ├── Components/      # Reusable React components
│   │   ├── Layouts/         # AppLayout, AdminLayout, GuestLayout
│   │   └── Pages/           # Halaman publik & panel Admin (Inertia)
│   └── css/                 # Tailwind stylesheet
├── routes/
│   ├── web.php              # Rute publik & manajemen admin
│   └── auth.php             # Rute autentikasi
└── vite.config.js           # Konfigurasi bundling Vite
```

---

## 🤝 Kontribusi

Kontribusi selalu terbuka! Jika Anda ingin menambahkan fitur atau memperbaiki bug:
1. Fork repository ini
2. Buat branch fitur baru (`git checkout -b fitur-keren`)
3. Commit perubahan Anda (`git commit -m 'Menambahkan fitur keren'`)
4. Push ke branch Anda (`git push origin fitur-keren`)
5. Ajukan **Pull Request**

---

## 📜 Lisensi

Project ini dilisensikan di bawah [MIT License](LICENSE).

<p align="center">
  Dikelola dengan ❤️ oleh <strong>Departemen Media & Komunikasi PKPT IPNU IPPNU UNSIQ</strong>
</p>