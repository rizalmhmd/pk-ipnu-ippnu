# 4.4. Use Case Diagram

Use Case Diagram menggambarkan interaksi fungsional antara pengguna luar (*aktor*) dengan sistem perangkat lunak yang dibangun. Diagram ini menjelaskan "apa" yang dapat dilakukan oleh sistem berdasarkan hak akses masing-masing aktor, yakni **Admin**, **Ketua IPNU/IPPNU**, **Ketua Departemen**, dan **Pengunjung**.

Sesuai dengan standar baku **UML (*Unified Modeling Language*)**:
- **Batas Sistem (*System Boundary*)**: Dinyatakan dengan kotak batas sistem bertuliskan nama sistem di bagian atas dalam kotak: **"Sistem Informasi PKPT IPNU IPPNU UNSIQ"**.
- **Aktivitas Sistem (*Use Case*)**: Seluruh fungsi dan aktivitas sistem digambarkan dalam bentuk elips/oval dan wajib berada di **DALAM** kotak batas sistem.
- **Aktor (*Actor*)**: Aktor merupakan entitas eksternal (pengguna) sehingga wajib berada di **LUAR** kotak batas sistem dan dihubungkan ke *Use Case* menggunakan garis asosiasi lurus.
- **Relasi Antar *Use Case***:
  - `<<include>>`: Menunjukkan fungsionalitas yang wajib disertakan/dijalankan oleh use case pemanggil.
  - `<<extend>>`: Menunjukkan fungsionalitas tambahan/kondisional/opsional.

> 💡 **File Siap Pakai di draw.io**:
> File mentahan [**`use_case_diagram.drawio`**](file:///e:/zallzall/pk-ipnu-ippnu/laporan/diagram/use_case_diagram.drawio) sudah **100% diperbarui dan siap digunakan**. Tersedia dalam 6 Tab:
> 1. **Tab 1: Use Case Global (Sistem)** - Seluruh 4 aktor dan semua use case dalam 1 batas sistem utama.
> 2. **Tab 2: Semua Use Case (Gambar 4.1 - 4.4)** - Format 4 diagram sekaligus lengkap dengan kotak batas sistem masing-masing.
> 3. **Tab 3: Gambar 4.1 Use Case Admin** - Format 1 halaman khusus Admin (siap ekspor Word/PDF).
> 4. **Tab 4: Gambar 4.2 Use Case Ketua IPNU/IPPNU** - Format 1 halaman khusus Ketua.
> 5. **Tab 5: Gambar 4.3 Use Case Ketua Departemen** - Format 1 halaman khusus Departemen.
> 6. **Tab 6: Gambar 4.4 Use Case Pengunjung** - Format 1 halaman khusus Pengunjung.

---

## 4.4.1. Use Case Admin

Aktor Admin memiliki hak akses tertinggi (*Super User*) di dalam sistem. Admin bertanggung jawab mengelola seluruh data master organisasi, akun pengguna pengurus, dan pengaturan konfigurasi website. Aktor Admin berada di luar batas sistem dan berinteraksi dengan 6 use case utama di dalam kotak sistem.

```mermaid
flowchart LR
    %% Aktor di LUAR Kotak
    Admin["👤 Admin"]

    subgraph SysAdmin["Sistem Informasi PKPT IPNU IPPNU UNSIQ"]
        %% 6 Elips Utama Vertikal
        UC1(["Login"])
        UC2(["Lihat Dashboard Admin"])
        UC3(["Kelola Data Master (CRUD)"])
        UC4(["Kelola Pengguna (User)"])
        UC5(["Kelola Pengaturan Situs"])
        UC6(["Logout"])

        %% 3 Sub-Elips di Kanan (Include)
        Sub1(["Data Anggota"])
        Sub2(["Agenda Kegiatan"])
        Sub3(["Berita & Artikel"])

        %% Relasi Include Antar Use Case
        UC3 -.->|«include»| Sub1
        UC3 -.->|«include»| Sub2
        UC3 -.->|«include»| Sub3
    end

    %% Garis Asosiasi dari Luar Kotak ke Dalam Kotak
    Admin --- UC1
    Admin --- UC2
    Admin --- UC3
    Admin --- UC4
    Admin --- UC5
    Admin --- UC6
```

<div align="center">
<strong>Gambar 4.1 Use Case Admin</strong>
</div>

<br>

### Deskripsi Hak Akses Admin:
Aktor Admin memiliki wewenang penuh dalam memelihara keberlangsungan sistem:
1. **Login & Logout**: Mengamankan otentikasi akun dengan kata sandi terenkripsi.
2. **Lihat Dashboard Admin**: Memantau statistik ringkasan total kader/anggota, pendaftar aktif, berita, dan kegiatan.
3. **Kelola Data Master**: Menambah, mengubah, dan menghapus data utama yang mencakup *Data Anggota*, *Agenda Kegiatan*, serta *Berita & Artikel*.
4. **Kelola Pengguna**: Menetapkan hak akses peran (*role assignment*) untuk akun Ketua dan Ketua Departemen.
5. **Kelola Pengaturan Situs**: Mengonfigurasi identitas organisasi, logo, kontak resmi, dan tautan media sosial.

---

## 4.4.2. Use Case Ketua IPNU / IPPNU

Aktor Ketua IPNU/IPPNU memegang wewenang manajerial organisasi tingkat pimpinan: memantau program kerja kegiatan, memvalidasi pendaftar kegiatan, melakukan sinkronisasi pembayaran online, dan mengelola database kader/anggota.

```mermaid
flowchart LR
    %% Aktor di LUAR Kotak
    Ketua["👤 Ketua IPNU/IPPNU"]

    subgraph SysKetua["Sistem Informasi PKPT IPNU IPPNU UNSIQ"]
        %% 6 Elips Utama Vertikal
        UC1(["Login"])
        UC2(["Lihat Dashboard"])
        UC3(["Kelola Kegiatan & Pendaftar"])
        UC4(["Kelola Data Anggota"])
        UC5(["Kelola Galeri & Statistik"])
        UC6(["Logout"])

        %% 3 Sub-Elips di Kanan
        Sub1(["Agenda Kegiatan"])
        Sub2(["Verifikasi Pendaftar"])
        Sub3(["Sinkronisasi Midtrans"])

        %% Relasi Include & Extend
        UC3 -.->|«include»| Sub1
        UC3 -.->|«include»| Sub2
        Sub3 -.->|«extend»| UC3
    end

    %% Garis Asosiasi
    Ketua --- UC1
    Ketua --- UC2
    Ketua --- UC3
    Ketua --- UC4
    Ketua --- UC5
    Ketua --- UC6
```

<div align="center">
<strong>Gambar 4.2 Use Case Ketua IPNU/IPPNU</strong>
</div>

<br>

### Deskripsi Hak Akses Ketua IPNU/IPPNU:
1. **Kelola Kegiatan & Pendaftar**: Membuat jadwal agenda dan memantau calon peserta yang mendaftar.
2. **Verifikasi Pendaftar**: Menyetujui (*approve*) atau menolak (*reject*) formulir pendaftar kegiatan.
3. **Sinkronisasi Midtrans**: Fungsi `<<extend>>` untuk memeriksa status pembayaran otomatis secara *real-time* dari server payment gateway Midtrans.
4. **Kelola Data Anggota & Statistik**: Menyimpan direktori kepengurusan dan rekapitulasi jumlah kader aktif.

---

## 4.4.3. Use Case Ketua Departemen

Aktor Ketua Departemen bertanggung jawab atas publikasi media, literasi, artikel opini kader, dan kutipan motivasi (*quotes*) organisasi.

```mermaid
flowchart LR
    %% Aktor di LUAR Kotak
    Dept["👤 Ketua Departemen"]

    subgraph SysDept["Sistem Informasi PKPT IPNU IPPNU UNSIQ"]
        %% 6 Elips Utama Vertikal
        UC1(["Login"])
        UC2(["Lihat Dashboard"])
        UC3(["Kelola Publikasi Konten"])
        UC4(["Kelola Quotes"])
        UC5(["Kelola Profil Akun"])
        UC6(["Logout"])

        %% 3 Sub-Elips di Kanan
        Sub1(["Berita Organisasi"])
        Sub2(["Artikel Opini / Kader"])
        Sub3(["Kategori Konten"])

        %% Relasi Include
        UC3 -.->|«include»| Sub1
        UC3 -.->|«include»| Sub2
        UC3 -.->|«include»| Sub3
    end

    %% Garis Asosiasi
    Dept --- UC1
    Dept --- UC2
    Dept --- UC3
    Dept --- UC4
    Dept --- UC5
    Dept --- UC6
```

<div align="center">
<strong>Gambar 4.3 Use Case Ketua Departemen</strong>
</div>

<br>

### Deskripsi Hak Akses Ketua Departemen:
1. **Kelola Publikasi Konten**: Menulis dan mempublikasikan siaran berita resmi dan artikel kader ke website.
2. **Kelola Quotes**: Memperbarui kutipan kalam ulama dan motivasi perjuangan yang tampil di beranda website.
3. **Kelola Profil Akun**: Mengubah data profil dan kata sandi mandiri.

---

## 4.4.4. Use Case Pengunjung

Aktor Pengunjung merupakan pihak luar (masyarakat, siswa, calon kader) yang mengakses informasi organisasi secara bebas, mendaftar kegiatan, dan menyelesaikan transaksi pembayaran tiket.

```mermaid
flowchart LR
    %% Aktor di LUAR Kotak
    Guest["👤 Pengunjung"]

    subgraph SysGuest["Sistem Informasi PKPT IPNU IPPNU UNSIQ"]
        %% 6 Elips Utama Vertikal
        UC1(["Melihat Profil Organisasi"])
        UC2(["Membaca Berita & Artikel"])
        UC3(["Melihat Galeri & Agenda"])
        UC4(["Mendaftar Kegiatan"])
        UC5(["Melakukan Pembayaran"])
        UC6(["Melihat Bukti & Tiket"])

        %% 3 Sub-Elips di Kanan (Metode Pembayaran)
        Sub1(["Tunai / Cash"])
        Sub2(["Transfer Bank"])
        Sub3(["Midtrans (QRIS & VA)"])

        %% Relasi Extend Pilihan Pembayaran
        Sub1 -.->|«extend»| UC5
        Sub2 -.->|«extend»| UC5
        Sub3 -.->|«extend»| UC5
    end

    %% Garis Asosiasi
    Guest --- UC1
    Guest --- UC2
    Guest --- UC3
    Guest --- UC4
    Guest --- UC5
    Guest --- UC6
```

<div align="center">
<strong>Gambar 4.4 Use Case Pengunjung</strong>
</div>

<br>

### Deskripsi Hak Akses Pengunjung:
1. **Melihat Informasi Publik**: Mengakses sejarah, visi misi, struktur kepengurusan, berita, artikel, dan galeri kegiatan.
2. **Mendaftar Kegiatan**: Mengisi data diri pada form kegiatan yang sedang membuka pendaftaran.
3. **Melakukan Pembayaran**: Jika agenda berbayar, pengunjung dapat memilih opsi pembayaran (*extend*) via Tunai, Transfer Bank, atau otomatis lewat Midtrans (QRIS dan Virtual Account).
4. **Melihat Bukti & Tiket**: Mengunduh atau menampilkan kode registrasi sebagai tanda bukti sah pendaftaran.
