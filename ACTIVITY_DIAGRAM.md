# Dokumentasi Lengkap Activity Diagram — Sistem Informasi PK IPNU-IPPNU

Dokumen ini memuat **7 Activity Diagram lengkap** yang merepresentasikan seluruh proses bisnis dan Use Case utama dalam aplikasi, lengkap dengan pembagian jalur tanggung jawab (**Swimlane / Partition**).

---

## 1. Pendaftaran & Pembayaran Kegiatan (Publik & Midtrans)
Alur pengunjung saat mendaftar kegiatan, menangani agenda gratis vs berbayar, hingga konfirmasi pembayaran.

```mermaid
flowchart TD
    Start((●))
    EndNode(((◉)))

    subgraph Pengunjung["👤 PENGUNJUNG"]
        A1["Buka Menu Kegiatan & Pilih Agenda"]
        A2["Klik Tombol 'Daftar Kegiatan'"]
        A3["Isi Form Data Diri (Nama, Email, No HP)"]
        A4["Klik 'Kirim Pendaftaran'"]
        A5["Pilih Metode Pembayaran (QRIS/VA)"]
        A6["Lakukan Pembayaran Sesuai Tagihan"]
        A7["Terima Bukti Pendaftaran & Tiket"]
    end

    subgraph Sistem["💻 SISTEM INFORMASI"]
        B1["Tampilkan Detail Kegiatan"]
        B2["Tampilkan Form Pendaftaran"]
        B3["Validasi Input Pendaftaran"]
        B4{"Input Valid?"}
        B5["Tampilkan Pesan Error"]
        B6["Simpan Data (Status: Pending)"]
        B7{"Agenda Berbayar?"}
        B8["Ubah Status: Confirmed"]
        B9["Request Snap Token ke Midtrans"]
        B10["Tampilkan Pop-up Pembayaran Midtrans"]
        B11["Terima Webhook/Callback Transaksi"]
        B12["Validasi Signature & Cek Status"]
        B13{"Pembayaran Sukses?"}
        B14["Update Status: Paid & Confirmed"]
        B15["Update Status: Cancelled / Expired"]
        B16["Tampilkan Notifikasi Berhasil"]
    end

    subgraph Midtrans["🏦 MIDTRANS API"]
        C1["Generate Snap Token & Order ID"]
        C2["Proses Transaksi Pembayaran"]
        C3["Kirim Callback Status ke Server"]
    end

    Start --> A1 --> B1 --> A2 --> B2 --> A3 --> A4 --> B3 --> B4
    B4 -- "Tidak" --> B5 --> A3
    B4 -- "Ya" --> B6 --> B7
    B7 -- "Gratis" --> B8 --> A7 --> EndNode
    B7 -- "Berbayar" --> B9 --> C1 --> B10 --> A5 --> A6 --> C2 --> C3 --> B11 --> B12 --> B13
    B13 -- "Ya" --> B14 --> B16 --> A7
    B13 -- "Tidak" --> B15 --> EndNode
```

---

## 2. Login & Autentikasi Pengurus (Semua Role)
Alur verifikasi login pengguna (Admin, Ketua, Ketua Departemen).

```mermaid
flowchart TD
    Start((●))
    EndNode(((◉)))

    subgraph Pengurus["👤 PENGURUS"]
        L1["Buka Halaman /login"]
        L2["Input Email & Password"]
        L3["Klik Tombol 'Masuk'"]
        L4["Masuk ke Dashboard Sesuai Role"]
    end

    subgraph SistemAuth["💻 SISTEM APLIKASI"]
        S1["Tampilkan Form Login"]
        S2["Validasi Format Input"]
        S3{"Kredensial Cocok?"}
        S4["Tampilkan Error: 'Email/Password salah'"]
        S5["Regenerate Session & Cek Role"]
        S6["Arahkan ke Dashboard Sesuai Role"]
    end

    subgraph DB["🗄️ DATABASE"]
        D1["Cari Akun berdasarkan Email & Cek Hash Password"]
    end

    Start --> L1 --> S1 --> L2 --> L3 --> S2 --> D1 --> S3
    S3 -- "Tidak" --> S4 --> S1
    S3 -- "Ya" --> S5 --> S6 --> L4 --> EndNode
```

---

## 3. Pengelolaan Berita & Artikel (Ketua Departemen & Admin)
Alur CRUD penerbitan artikel/berita organisasi dan pengelolaan gambar sampul.

```mermaid
flowchart TD
    Start((●))
    EndNode(((◉)))

    subgraph Dept["👤 KETUA DEPARTEMEN / ADMIN"]
        K1["Buka Menu Berita / Artikel"]
        K2["Klik 'Tambah Data'"]
        K3["Isi Form: Judul, Konten, & Upload Gambar"]
        K4["Klik 'Simpan / Publikasikan'"]
        K5["Melihat Daftar Konten Terbit"]
    end

    subgraph SistemKonten["💻 SISTEM INFORMASI"]
        SK1["Tampilkan Form Tambah Berita"]
        SK2["Validasi Input & Ukuran Gambar (Max 2MB)"]
        SK3{"Validasi Valid?"}
        SK4["Tampilkan Pesan Error Form"]
        SK5["Generate Slug & Upload File ke Storage"]
        SK6["Simpan Data ke Database"]
        SK7["Tampilkan Pesan Sukses"]
    end

    subgraph DBKonten["🗄️ DATABASE & STORAGE"]
        DK1["Storage Simpan File Foto"]
        DK2["Tabel 'posts' / 'articles' Tambah Record"]
    end

    Start --> K1 --> SK1 --> K2 --> SK1 --> K3 --> K4 --> SK2 --> SK3
    SK3 -- "Tidak" --> SK4 --> SK1
    SK3 -- "Ya" --> SK5 --> DK1 --> SK6 --> DK2 --> SK7 --> K5 --> EndNode
```

---

## 4. Pengelolaan Agenda Kegiatan (Ketua IPNU/IPPNU & Admin)
Alur pembuatan dan pembaruan agenda kegiatan organisasi.

```mermaid
flowchart TD
    Start((●))
    EndNode(((◉)))

    subgraph Ketua["👤 KETUA IPNU/IPPNU / ADMIN"]
        G1["Buka Menu 'Agenda Kegiatan'"]
        G2["Klik 'Tambah Agenda'"]
        G3["Isi: Judul, Tanggal, Lokasi, Harga, Deskripsi, Kuota"]
        G4["Klik 'Simpan Agenda'"]
        G5["Melihat Agenda Baru pada Daftar"]
    end

    subgraph SistemAgenda["💻 SISTEM INFORMASI"]
        SG1["Tampilkan Form Tambah Agenda"]
        SG2["Validasi Data (Tanggal, Kuota, Biaya)"]
        SG3{"Validasi Sukses?"}
        SG4["Tampilkan Pesan Error Validasi"]
        SG5["Simpan Data Agenda ke Database"]
        SG6["Kirim Flash Message Sukses"]
    end

    subgraph DBAgenda["🗄️ DATABASE"]
        DG1["Tabel 'agendas' Menyimpan Record Baru"]
    end

    Start --> G1 --> SG1 --> G2 --> SG1 --> G3 --> G4 --> SG2 --> SG3
    SG3 -- "Tidak" --> SG4 --> SG1
    SG3 -- "Ya" --> SG5 --> DG1 --> SG6 --> G5 --> EndNode
```

---

## 5. Pengelolaan Data Pendaftar & Sinkronisasi Midtrans (Ketua & Admin)
Alur memantau pendaftar kegiatan, cek status bayar, sinkronisasi ulang ke Midtrans, dan update status.

```mermaid
flowchart TD
    Start((●))
    EndNode(((◉)))

    subgraph KetuaPendaftar["👤 KETUA IPNU/IPPNU / ADMIN"]
        P1["Buka Menu 'Data Pendaftaran'"]
        P2["Filter berdasarkan Agenda / Status"]
        P3["Klik Tombol 'Sync Midtrans' / 'Ubah Status'"]
        P4["Melihat Status Pendaftaran Terupdate"]
    end

    subgraph SistemPendaftar["💻 SISTEM INFORMASI"]
        SP1["Ambil Data Pendaftar dari Database"]
        SP2["Tampilkan Tabel Pendaftar"]
        SP3["Kirim Request Cek Status ke Midtrans API"]
        SP4["Terima Status Terkini dari Midtrans"]
        SP5["Perbarui Data Status di Database (Paid/Pending)"]
        SP6["Tampilkan Notifikasi 'Sinkronisasi Berhasil'"]
    end

    subgraph MidtransAPI["🏦 MIDTRANS API"]
        MP1["Cek Status Transaksi Order ID"]
        MP2["Kirim Response Status Pembayaran"]
    end

    Start --> P1 --> SP1 --> SP2 --> P2 --> P3 --> SP3 --> MP1 --> MP2 --> SP4 --> SP5 --> SP6 --> P4 --> EndNode
```

---

## 6. Pengelolaan Data Anggota / Members (Ketua & Admin)
Alur pendataan keanggotaan IPNU/IPPNU (biodata, jabatan, departemen, dan foto).

```mermaid
flowchart TD
    Start((●))
    EndNode(((◉)))

    subgraph KetuaAnggota["👤 KETUA IPNU/IPPNU / ADMIN"]
        M1["Buka Menu 'Data Anggota'"]
        M2["Klik 'Tambah Anggota'"]
        M3["Isi Data: Nama, NIA, Departemen, Jabatan, Foto"]
        M4["Klik 'Simpan'"]
        M5["Melihat Daftar Anggota Terupdate"]
    end

    subgraph SistemAnggota["💻 SISTEM INFORMASI"]
        SM1["Tampilkan Form Anggota"]
        SM2["Validasi Input (NIA Unik, Nama, Format Foto)"]
        SM3{"Data Valid & NIA Belum Terdaftar?"}
        SM4["Tampilkan Pesan Error / Duplikasi NIA"]
        SM5["Upload Foto Anggota & Simpan Data ke DB"]
        SM6["Tampilkan Pesan 'Data Anggota Berhasil Disimpan'"]
    end

    subgraph DBAnggota["🗄️ DATABASE & STORAGE"]
        DM1["Storage Simpan Foto Anggota"]
        DM2["Tabel 'members' Simpan Record Baru"]
    end

    Start --> M1 --> SM1 --> M2 --> SM1 --> M3 --> M4 --> SM2 --> SM3
    SM3 -- "Tidak" --> SM4 --> SM1
    SM3 -- "Ya" --> SM5 --> DM1 --> DM2 --> SM6 --> M5 --> EndNode
```

---

## 7. Pengelolaan Data Pengguna / User Management (Administrator Only)
Alur admin membuatkan akun pengurus (karena registrasi publik dinonaktifkan).

```mermaid
flowchart TD
    Start((●))
    EndNode(((◉)))

    subgraph AdminUser["👤 ADMINISTRATOR"]
        U1["Buka Menu 'Kelola Pengguna'"]
        U2["Klik 'Tambah Pengguna Baru'"]
        U3["Input: Nama, Email, Password, & Pilih Role (Admin/Ketua/Departemen)"]
        U4["Klik 'Simpan Pengguna'"]
        U5["Melihat Daftar Pengguna Terupdate"]
    end

    subgraph SistemUser["💻 SISTEM INFORMASI"]
        SU1["Tampilkan Form Tambah User"]
        SU2["Validasi Data (Email Unik, Password Minimal 8 Karakter)"]
        SU3{"Validasi Berhasil?"}
        SU4["Tampilkan Pesan Error Validasi"]
        SU5["Hash Password (Bcrypt) & Simpan Akun Baru"]
        SU6["Tampilkan Notifikasi 'Akun Pengguna Berhasil Dibuat'"]
    end

    subgraph DBUser["🗄️ DATABASE"]
        DU1["Tabel 'users' Menyimpan User Baru dengan Role"]
    end

    Start --> U1 --> SU1 --> U2 --> SU1 --> U3 --> U4 --> SU2 --> SU3
    SU3 -- "Tidak" --> SU4 --> SU1
    SU3 -- "Ya" --> SU5 --> DU1 --> SU6 --> U5 --> EndNode
```
