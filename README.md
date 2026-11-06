<!-- ======================================================== -->
<!-- HEADER BANNER ANIMASI (WAVING GRADIENT + FADE IN)       -->
<!-- ======================================================== -->
<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=0:064e3b,25:047857,60:059669,100:10b981&height=220&section=header&text=PKPT%20IPNU%20IPPNU%20UNSIQ&fontSize=42&fontColor=ffffff&animation=fadeIn&fontAlignY=36&desc=Sistem%20Informasi%20Kaderisasi%20%26%20Digitalisasi%20Organisasi&descAlignY=60&descSize=16" alt="Header Banner PKPT IPNU IPPNU UNSIQ" width="100%" />
</p>

<!-- ======================================================== -->
<!-- ANIMATED TYPING SVG SUB-HEADER                          -->
<!-- ======================================================== -->
<p align="center">
  <a href="https://git.io/typing-svg">
    <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=20&duration=3000&pause=1000&color=059669&center=true&vCenter=true&width=680&lines=%E2%9C%A8+Selamat+Datang+di+Portal+Resmi+PKPT+IPNU+IPPNU+UNSIQ;%F0%9F%8C%BF+Semboyan%3A+Belajar%2C+Berjuang%2C+Bertaqwa;%F0%9F%92%B3+Sistem+Pendaftaran+Kegiatan+%2B+Midtrans+Payment;%F0%9F%94%90+Multi-Role+Access+(Admin%2C+Ketua%2C+Departemen);%F0%9F%9A%80+Modern+Full-Stack+Web+Application" alt="Typing Tagline" />
  </a>
</p>

<!-- ======================================================== -->
<!-- BADGES                                                   -->
<!-- ======================================================== -->
<p align="center">
  <img src="https://img.shields.io/badge/Status-Active_Development-10B981?style=for-the-badge&logo=git&logoColor=white" alt="Status">
  <img src="https://img.shields.io/badge/PHP-8.2+-777BB4?style=for-the-badge&logo=php&logoColor=white" alt="PHP">
  <img src="https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React">
  <img src="https://img.shields.io/badge/Inertia.js-2.0-9553E9?style=for-the-badge&logo=inertia&logoColor=white" alt="Inertia.js">
  <img src="https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/Midtrans-Payment_Gateway-002B49?style=for-the-badge&logo=cashapp&logoColor=white" alt="Midtrans">
  <img src="https://img.shields.io/badge/License-MIT-047857.svg?style=for-the-badge" alt="License">
</p>

<!-- ======================================================== -->
<!-- TECH STACK ICONS DENGAN THEME DARK                      -->
<!-- ======================================================== -->
<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=laravel,react,tailwind,vite,mysql,php,js,postman,github,vscode&theme=dark" alt="Tech Stack Icons" />
  </a>
</p>

---

## 📌 Sekilas Tentang Platform

> **"Mewujudkan tata kelola organisasi pelajar santri yang adaptif, modern, dan berkemajuan di era digital."**

**Sistem Informasi PKPT IPNU IPPNU UNSIQ** dirancang khusus sebagai pusat informasi publik, portal kaderisasi, serta manajemen administratif terpadu bagi **Pimpinan Komisariat Perguruan Tinggi Ikatan Pelajar Nahdlatul Ulama & Ikatan Pelajar Putri Nahdlatul Ulama Universitas Sains Al-Qur'an (UNSIQ) Wonosobo**.

Platform ini mengintegrasikan alur pendaftaran kegiatan mahasiswa baru / kader secara mandiri dengan sistem verifikasi transaksi otomatis (QRIS, Bank Transfer, dan e-Wallet).

---

## 🔄 Alur Sistem Aplikasi (System Workflow)

```mermaid
flowchart LR
    A["🌐 Calon Kader / Mahasiswa"] --> B["Portal Informasi & Agenda"]
    B --> C["Form Pendaftaran Kegiatan"]
    C --> D["💳 Midtrans Payment Gateway"]
    D -- Notifikasi Pembayaran --> E["⚡ Webhook / Auto Verification"]
    E --> F["📄 Bukti Pendaftaran & Tiket"]
    F --> G["👥 Database Anggota & Rekap Panitia"]
    
    style A fill:#047857,stroke:#fff,stroke-width:2px,color:#fff
    style D fill:#002b49,stroke:#fff,stroke-width:2px,color:#fff
    style G fill:#064e3b,stroke:#fff,stroke-width:2px,color:#fff
```

---

## 🌟 Fitur & Komponen Unggulan

<details open>
<summary><b>🌐 1. Portal Publik (Front Office)</b></summary>
<br>

* 🏛️ **Profil Lembaga Lengkap:** Sejarah pendirian, visi misi pergerakan, dan bagan struktur kepengurusan interaktif.
* 📰 **Pusat Media & Berita:** Kabar terupdate agenda kegiatan komisariat, liputan opini, esai, dan karya literasi kader.
* 🖼️ **Galeri Multimedia:** Dokumentasi momen kegiatan formal maupun non-formal (kaderisasi, workshop, kajian).
* 📅 **Kalender Agenda & Event:** Penayangan jadwal kegiatan mendatang lengkap dengan deskripsi, pamflet, dan kuota peserta.
* 💬 **Mutiara Kata (Quotes):** Tampilan kutipan bijak dan nasihat dari para muassis NU serta tokoh inspiratif.

</details>

<details open>
<summary><b>💳 2. Sistem Pendaftaran Kegiatan & Payment Gateway Otomatis</b></summary>
<br>

* 📝 **Registrasi Online:** Formulir pendaftaran cerdas yang dilengkapi validasi data otomatis (termasuk parser NIK).
* 💰 **Payment Gateway Midtrans:** Pembayaran instan via **QRIS (GoPay, OVO, ShopeePay, Dana)**, **Virtual Account (BCA, BNI, BRI, Mandiri)**.
* 🔄 **Sinkronisasi Realtime:** Callback webhook otomatis mengubah status pembayaran peserta tanpa perlu konfirmasi manual yang melelahkan.
* 🖨️ **Struk / Bukti Registrasi:** Peserta mendapatkan kode unik registrasi dan bukti keikutsertaan kegiatan.

</details>

<details>
<summary><b>🛡️ 3. Manajemen Multi-Role Dashboard (Back Office)</b></summary>
<br>

Sistem membagi hak akses berdasarkan tingkatan peran pengurus:

| Peran (Role) | Lencana | Cakupan Fitur & Tanggung Jawab |
| :--- | :---: | :--- |
| **Super Admin** | 👑 | Mengelola akun user & role, konfigurasi website (*Site Settings*), serta manajemen tampilan halaman (*Page Settings*). |
| **Ketua IPNU & IPPNU** | 🔰 | Monitoring pendaftar kegiatan, sinkronisasi massal status Midtrans, database kader (*Members*), statistik organisasi, dan kurasi galeri. |
| **Ketua Departemen** | ✍️ | Publikasi warta berita (*Posts*), artikel & karya tulis (*Articles*), serta kurasi kutipan inspiratif (*Quotes*). |

</details>

---

## 💻 Panduan Instalasi & Menjalankan di Lokal

<details>
<summary><b>📋 Prasyarat Komputer (Prerequisites)</b></summary>
<br>

* **PHP:** Versi `>= 8.2` (dengan ekstensi `pdo_mysql`, `mbstring`, `openssl`, `curl`)
* **Composer:** Versi `>= 2.x`
* **Node.js & NPM:** Node `>= 18.x`
* **Database:** MySQL / MariaDB (Direkomendasikan via **Laragon**)

</details>

<details open>
<summary><b>⚡ Langkah-Langkah Menjalankan Project</b></summary>
<br>

**1. Kloning Repository:**
```bash
git clone https://github.com/username/pk-ipnu-ippnu.git
cd pk-ipnu-ippnu
```

**2. Instalasi Paket Dependensi:**
```bash
composer install
npm install
```

**3. Setup File Environment (`.env`):**
```bash
cp .env.example .env
php artisan key:generate
```

**4. Konfigurasi Database & Kunci Integrasi (`.env`):**
```env
APP_NAME="PKPT IPNU IPPNU UNSIQ"
APP_URL=http://pk-ipnu-ippnu.test

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=pk_ipnu_ippnu
DB_USERNAME=root
DB_PASSWORD=

# Integrasi Midtrans
MIDTRANS_SERVER_KEY=SB-Mid-server-xxxxxxxxx
MIDTRANS_CLIENT_KEY=SB-Mid-client-xxxxxxxxx
MIDTRANS_IS_PRODUCTION=false
```

**5. Migrasi & Data Seeder:**
```bash
php artisan migrate --seed
php artisan storage:link
```

**6. Jalankan Server Aplikasi:**

*Mode Simultan (Concurrent)*:
```bash
composer run dev
```

*Atau Mode Terpisah*:
```bash
# Terminal 1 (Backend API & Web Server)
php artisan serve

# Terminal 2 (Vite Frontend React Compiler)
npm run dev
```

Akses aplikasi pada peramban melalui `http://127.0.0.1:8000` atau via Laragon `http://pk-ipnu-ippnu.test`.

</details>

---

## 📂 Struktur Direktori Proyek

```plaintext
pk-ipnu-ippnu/
├── app/
│   ├── Http/Controllers/        # Public, Admin & Auth Controllers
│   ├── Middleware/             # Role authorization (admin, ketua, departemen)
│   └── Models/                 # Agenda, Registration, Member, Post, etc.
├── database/
│   ├── migrations/             # Skema tabel database
│   └── seeders/                # Data default & seeder akun
├── resources/
│   ├── js/
│   │   ├── Components/         # Komponen React (Navbar, Footer, Card, Modal)
│   │   ├── Layouts/            # AppLayout, AdminLayout, GuestLayout
│   │   └── Pages/              # View halaman React (Inertia Pages)
│   └── css/                    # Desain kustom Tailwind CSS
├── routes/
│   ├── web.php                 # Routing website publik & panel admin
│   └── auth.php                # Routing autentikasi login
└── vite.config.js              # Bundler konfigurasi Vite + React
```

---

<p align="center">
  <b>"Belajar, Berjuang, Bertaqwa"</b><br>
  Dikelola dengan dedikasi oleh <strong>Departemen Media & Komunikasi PKPT IPNU IPPNU UNSIQ</strong>
</p>

<!-- ======================================================== -->
<!-- FOOTER BANNER ANIMASI (WAVING GRADIENT)                  -->
<!-- ======================================================== -->
<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=0:064e3b,25:047857,60:059669,100:10b981&height=120&section=footer" alt="Footer Banner" width="100%" />
</p>
