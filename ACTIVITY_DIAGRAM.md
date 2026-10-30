# Dokumentasi Lengkap Activity Diagram — Sistem Informasi PK IPNU-IPPNU

Dokumen ini memuat **7 Activity Diagram lengkap** yang merepresentasikan seluruh proses bisnis dan Use Case utama dalam aplikasi, lengkap dengan pembagian jalur tanggung jawab (**Swimlane / Partition**).

> 💡 **Catatan Metodologi & Notasi UML**:
> - **Pendekatan Swimlane**: Mengadopsi arsitektur 3-Tier (*User Presentation*, *Application Logic / Sistem*, dan *Data Storage / Third-Party Gateway*).
> - **Penanganan Validasi**: Setiap proses *input* dilengkapi *Decision Node* untuk menangani kondisi validasi gagal (*alternative path*) maupun validasi sukses (*happy path*).
> - **File Mentahan draw.io**: File [**`activity_diagram.drawio`**](file:///e:/zallzall/pk-ipnu-ippnu/activity_diagram.drawio) dapat dibuka dan diekspor melalui **[app.diagrams.net](https://app.diagrams.net/)**.

---

## 1. Pendaftaran & Pembayaran Kegiatan (Publik & Midtrans)
Alur pengunjung saat mendaftar kegiatan, menangani agenda gratis vs berbayar, integrasi Snap Midtrans, serta penanganan sukses maupun pembatalan/expired.

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
        A8["Terima Notifikasi Pembayaran Batal / Expired"]
    end

    subgraph Sistem["💻 SISTEM INFORMASI"]
        B1["Tampilkan Detail Kegiatan"]
        B2["Tampilkan Form Pendaftaran"]
        B3["Validasi Input Pendaftaran"]
        B4{"Input Valid?"}
        B5["Tampilkan Pesan Error Validasi"]
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
        B17["Tampilkan Pesan Transaksi Gagal / Kadaluarsa"]
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
    B13 -- "Tidak" --> B15 --> B17 --> A8 --> EndNode
```

---

## 2. Login & Autentikasi Pengurus (Semua Role)
Alur verifikasi login pengguna (Admin, Ketua, Ketua Departemen) dengan hashing kata sandi dan pengecekan otorisasi peran.

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
Alur melihat daftar konten, menambah berita baru, validasi ukuran file gambar, hingga publikasi ke sistem.

```mermaid
flowchart TD
    Start((●))
    EndNode(((◉)))

    subgraph Dept["👤 KETUA DEPARTEMEN / ADMIN"]
        K1["Buka Menu Berita / Artikel"]
        K2["Klik Tombol 'Tambah Data'"]
        K3["Isi Form: Judul, Konten, & Upload Gambar"]
        K4["Klik 'Simpan / Publikasikan'"]
        K5["Melihat Daftar Konten Terupdate"]
    end

    subgraph SistemKonten["💻 SISTEM INFORMASI"]
        SK1["Tampilkan Tabel Daftar Berita / Artikel"]
        SK2["Tampilkan Form Tambah Berita"]
        SK3["Validasi Input & Ukuran Gambar (Max 2MB)"]
        SK4{"Validasi Valid?"}
        SK5["Tampilkan Pesan Error Validasi"]
        SK6["Generate Slug & Upload File ke Storage"]
        SK7["Simpan Data ke Database"]
        SK8["Tampilkan Pesan Sukses & Refresh Daftar"]
    end

    subgraph DBKonten["🗄️ DATABASE & STORAGE"]
        DK1["Storage Simpan File Foto Sampul"]
        DK2["Tabel 'posts' / 'articles' Tambah Record Baru"]
    end

    Start --> K1 --> SK1 --> K2 --> SK2 --> K3 --> K4 --> SK3 --> SK4
    SK4 -- "Tidak" --> SK5 --> SK2
    SK4 -- "Ya" --> SK6 --> DK1 --> SK7 --> DK2 --> SK8 --> K5 --> EndNode
```

---

## 4. Pengelolaan Agenda Kegiatan (Ketua IPNU/IPPNU & Admin)
Alur pembuatan dan pembaruan agenda kegiatan organisasi beserta kuota dan tarif pendaftaran.

```mermaid
flowchart TD
    Start((●))
    EndNode(((◉)))

    subgraph Ketua["👤 KETUA IPNU/IPPNU / ADMIN"]
        G1["Buka Menu 'Agenda Kegiatan'"]
        G2["Klik Tombol 'Tambah Agenda'"]
        G3["Isi Form: Judul, Tanggal, Lokasi, Biaya, Kuota, Deskripsi"]
        G4["Klik 'Simpan Agenda'"]
        G5["Melihat Agenda Baru pada Daftar"]
    end

    subgraph SistemAgenda["💻 SISTEM INFORMASI"]
        SG1["Tampilkan Tabel Daftar Agenda Kegiatan"]
        SG2["Tampilkan Form Tambah Agenda"]
        SG3["Validasi Data (Tanggal, Kuota, Biaya)"]
        SG4{"Validasi Sukses?"}
        SG5["Tampilkan Pesan Error Validasi"]
        SG6["Simpan Data Agenda ke Database"]
        SG7["Tampilkan Notifikasi Sukses & Refresh Daftar"]
    end

    subgraph DBAgenda["🗄️ DATABASE"]
        DG1["Tabel 'agendas' Menyimpan Record Baru"]
    end

    Start --> G1 --> SG1 --> G2 --> SG2 --> G3 --> G4 --> SG3 --> SG4
    SG4 -- "Tidak" --> SG5 --> SG2
    SG4 -- "Ya" --> SG6 --> DG1 --> SG7 --> G5 --> EndNode
```

---

## 5. Pengelolaan Data Pendaftar & Sinkronisasi Midtrans (Ketua & Admin)
Alur memantau pendaftar kegiatan, cek status pembayaran, sinkronisasi *real-time* ke Midtrans API, dan pembaharuan status lokal.

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
        SP5["Perbarui Data Status di Database (Paid/Pending/Expired)"]
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
Alur pendataan keanggotaan IPNU/IPPNU (biodata, jabatan, departemen, validasi NIA unik, dan upload foto).

```mermaid
flowchart TD
    Start((●))
    EndNode(((◉)))

    subgraph KetuaAnggota["👤 KETUA IPNU/IPPNU / ADMIN"]
        M1["Buka Menu 'Data Anggota'"]
        M2["Klik Tombol 'Tambah Anggota'"]
        M3["Isi Form: Nama, NIA, Departemen, Jabatan, & Foto"]
        M4["Klik 'Simpan'"]
        M5["Melihat Daftar Anggota Terupdate"]
    end

    subgraph SistemAnggota["💻 SISTEM INFORMASI"]
        SM1["Tampilkan Tabel Daftar Anggota"]
        SM2["Tampilkan Form Tambah Anggota"]
        SM3["Validasi Input (NIA Unik, Nama, Format Foto)"]
        SM4{"Data Valid & NIA Belum Terdaftar?"}
        SM5["Tampilkan Pesan Error / Duplikasi NIA"]
        SM6["Upload Foto Anggota & Simpan Data ke DB"]
        SM7["Tampilkan Pesan 'Data Anggota Berhasil Disimpan'"]
    end

    subgraph DBAnggota["🗄️ DATABASE & STORAGE"]
        DM1["Storage Simpan Foto Anggota"]
        DM2["Tabel 'members' Simpan Record Baru"]
    end

    Start --> M1 --> SM1 --> M2 --> SM2 --> M3 --> M4 --> SM3 --> SM4
    SM4 -- "Tidak" --> SM5 --> SM2
    SM4 -- "Ya" --> SM6 --> DM1 --> DM2 --> SM7 --> M5 --> EndNode
```

---

## 7. Pengelolaan Data Pengguna / User Management (Administrator Only)
Alur administrator membuat akun pengurus baru lengkap dengan *role assignment* dan enkripsi kata sandi.

```mermaid
flowchart TD
    Start((●))
    EndNode(((◉)))

    subgraph AdminUser["👤 ADMINISTRATOR"]
        U1["Buka Menu 'Kelola Pengguna'"]
        U2["Klik Tombol 'Tambah Pengguna Baru'"]
        U3["Input: Nama, Email, Password, & Pilih Role (Admin/Ketua/Departemen)"]
        U4["Klik 'Simpan Pengguna'"]
        U5["Melihat Daftar Pengguna Terupdate"]
    end

    subgraph SistemUser["💻 SISTEM INFORMASI"]
        SU1["Tampilkan Tabel Daftar Pengguna"]
        SU2["Tampilkan Form Tambah User"]
        SU3["Validasi Data (Email Unik, Password Minimal 8 Karakter)"]
        SU4{"Validasi Berhasil?"}
        SU5["Tampilkan Pesan Error Validasi"]
        SU6["Hash Password (Bcrypt) & Simpan Akun Baru"]
        SU7["Tampilkan Notifikasi 'Akun Pengguna Berhasil Dibuat'"]
    end

    subgraph DBUser["🗄️ DATABASE"]
        DU1["Tabel 'users' Menyimpan User Baru dengan Role"]
    end

    Start --> U1 --> SU1 --> U2 --> SU2 --> U3 --> U4 --> SU3 --> SU4
    SU4 -- "Tidak" --> SU5 --> SU2
    SU4 -- "Ya" --> SU6 --> DU1 --> SU7 --> U5 --> EndNode
```

