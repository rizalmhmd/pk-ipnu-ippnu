# Catatan Penerapan Buku Panduan KP – Teknik Informatika UNSIQ

Ringkasan aturan dari `01. Buku Panduan KP Teknik Informatika.pdf` (FASTIKOM UNSIQ) yang memengaruhi penulisan Bab II, beserta penyesuaian yang sudah diterapkan pada draf.

---

## 1. Sistematika laporan menurut panduan (hal. 10–11)

| Bab | Isi |
|---|---|
| **BAB I** Pendahuluan | Latar Belakang, Tujuan, Manfaat, Batasan, **Identitas KP** (waktu, lokasi, deskripsi instansi), Sistematika Penulisan |
| **BAB II** Landasan Teori | Teori-teori yang berhubungan dengan permasalahan; sumber teori harus dirujuk dalam kalimat dan dicantumkan di Daftar Pustaka |
| **BAB III** Tinjauan Umum | Gambaran umum instansi, sistem yang sedang berjalan, urutan proses penyelesaian masalah |
| **BAB IV** Hasil dan Pembahasan | Analisis sistem berjalan, usulan solusi, **perancangan dan rekayasa sistem** sebagai solusi |
| **BAB V** Penutup | Kesimpulan, Saran |

**Dampak pada draf:** Bab II **hanya** berisi landasan teori. Bagian "Tinjauan Pustaka / penelitian sejenis" yang sempat dibuat **dihapus**, dan posisi kebaruan diserap ke dalam teks (misalnya pada 2.2 dan 2.5).

**Diagram UML tidak diletakkan di Bab II**, melainkan di **BAB IV**, karena Bab IV memuat "perancangan dan rekayasa sistem sebagai solusi". Teori notasi UML tetap di Bab II.

---

## 2. Format yang sudah diterapkan pada .docx

| Aturan panduan | Pasal | Status |
|---|---|---|
| Kertas HVS 80 g, A4, satu sisi | 4.1, 4.2a | Siap cetak |
| Margin: atas 4 cm, bawah 3 cm, kiri 4 cm, kanan 3 cm | 4.2b | ✅ Diterapkan |
| Times New Roman 12 pt, rata kiri-kanan (*justify*) | 4.2c | ✅ |
| Spasi 1,5 (*before* 0, *after* 0) | 4.2d | ✅ |
| Judul bab: kapital, tengah, tebal, tanpa titik; "BAB II" lalu nama bab di bawahnya | 4.5b–c | ✅ |
| Tingkat sub-bab maksimal derajat ketiga (2.1 → 2.1.1 → 2.1.1.1) | 4.5e | ✅ (maksimal 2.4.7) |
| Daftar butir memakai *bullet* bila tidak dirujuk, huruf bila dirujuk | 4.5f | ✅ *bullet* |
| Nomor tabel menyertakan nomor bab | 4.6f | ✅ Tabel 2.1 – Tabel 2.13 |
| Judul tabel di **atas** tabel, rata tengah | 4.6h | ✅ |
| Judul gambar di **bawah** gambar, rata tengah | 4.6i | Berlaku saat Anda menyisipkan diagram UML di Bab IV |
| Baris "Sumber:" di bawah tabel/gambar | Contoh 4.6p | ✅ Ditambahkan pada setiap tabel |
| Tabel dan gambar rata tengah terhadap halaman | 4.6e | ✅ |

**Yang belum bisa diatur oleh .docx ini** dan perlu Anda kerjakan di Word:
- Penomoran halaman: Bagian Awal memakai angka romawi kecil (i, ii, iii) di **tengah bawah**; Bagian Isi dan Akhir memakai angka Arab di **sudut kanan atas**; halaman pertama setiap bab nomornya di **tengah bawah** (4.3).
- Setiap bab dimulai pada halaman baru (4.5a).
- Halaman judul, pengesahan, kata pengantar, daftar isi/tabel/gambar (3.1).

---

## 3. Aturan kutipan dan Daftar Pustaka

**Kutipan memakai APA (Nama, Tahun)** — bukan nomor (4.8). Dua bentuk yang dipakai:
- Nama penulis menjadi bagian kalimat: *Sommerville (2026) menyatakan bahwa …*
- Nama penulis di dalam kurung: *… pemodelan sistem (Hafsari et al., 2024).*

**Daftar Pustaka** (4.9):
- APA, diurutkan **alfabetis** menurut nama belakang;
- **Dikelompokkan menurut kategori media publikasinya**: buku; majalah/jurnal ilmiah/prosiding; laporan penelitian; elektronik;
- Baris kedua menjorok 5 ketuk dari margin kiri (indentasi gantung), jarak antar baris 1,5 spasi.

Draf memuat **18 referensi** dalam 3 kelompok: 3 buku, 13 jurnal/prosiding, 2 dokumen lembaga.

### ⚠️ Aturan yang paling sering meloloskan kesalahan

Panduan menyatakan pada butir 4.9.g.4:

> "Publikasi di web selain *e-book*, *e-journal*, dan *e-proceeding* **tidak diperbolehkan** untuk dijadikan rujukan penelitian ilmiah."

Artinya **dokumentasi resmi tidak boleh dikutip**. Karena itu seluruh rujukan ke `laravel.com/docs`, `react.dev`, `inertiajs.com`, `cloudinary.com`, dan `pusher.com` **sudah dibuang** dan diganti jurnal atau buku:

| Teknologi | Sumber lama (dilarang) | Sumber pengganti |
|---|---|---|
| Laravel | laravel.com/docs | Stauffer (2023); Kharismatunnisaa et al. (2023); Anugra et al. (2025) |
| React | react.dev | Rizzi et al. (2025) |
| Cloudinary | cloudinary.com | Anugra et al. (2025) |
| Pusher | pusher.com | Ramadhani et al. (2026) |
| Inertia.js | inertiajs.com | Dijelaskan sebagai bagian dari *frontend tooling* Laravel dengan rujukan Stauffer (2023) dan Rizzi et al. (2025) |

**Catatan jujur untuk Inertia.js:** belum ada buku atau jurnal yang membahas Inertia.js secara langsung. Bila dosen penguji meminta rujukan khusus, dua pilihan yang aman: (1) tambahkan laporan KP/penelitian terdahulu yang memakai Inertia.js bila ada di perpustakaan UNSIQ, atau (2) biarkan sebagai uraian teknis yang ditopang rujukan Laravel dan SPA di atas.

---

## 4. Rentang tahun referensi

Permintaan Anda: keluaran **2022 sampai sekarang (2026)**. Capaiannya:

| Tahun | Jumlah |
|---|---|
| 2026 | 3 (Sommerville; Ramadhani et al.; Supriyanto et al.) |
| 2025 | 3 (Anugra et al.; Hasibuan et al.; Rizzi et al.) |
| 2024 | 5 (Abidin et al.; Ayu et al.; Hafsari et al.; Khairi & Alda; Ningrum et al.) |
| 2023 | 4 (Pressman & Maxim; Kharismatunnisaa et al.; Saputra & Zakaria; Stauffer) |
| 2022 | 1 (Olindo & Syaripudin) |
| 2017 | 1 (OMG UML 2.5.1) |

**Satu pengecualian yang disengaja: OMG UML 2.5.1 (2017).** Ini standar resmi UML yang masih berlaku hingga sekarang — OMG belum menerbitkan versi pengganti. Mengutip standar primer jauh lebih kuat secara akademik daripada buku terbitan 2024 yang merangkum standar yang sama, dan panduan mengizinkan kategori "dokumen lembaga" pada kelompok pustaka elektronik (4.9.h.4).

---

## 5. Daftar periksa sebelum dikumpulkan

- [ ] Setiap definisi memuat kutipan (Nama, Tahun)
- [ ] Semua entri Daftar Pustaka dirujuk di teks, dan sebaliknya
- [ ] Tidak ada rujukan ke situs dokumentasi
- [ ] Diagram UML dipindahkan ke **BAB IV**
- [ ] ERD ditulis pada sub-bab tersendiri, terpisah dari *class diagram*
- [ ] Penomoran halaman diatur di Word sesuai 4.3
- [ ] Daftar Tabel dan Daftar Gambar dibuat (hanya ada 2 contoh di panduan, tetapi bagian isi mewajibkannya)
- [ ] **BAB III** diisi dengan data yang belum saya miliki: sejarah dan visi-misi PKPT IPNU-IPPNU UNEJ, struktur kepengurusan, serta alur sistem yang berjalan sebelum adanya *website* (masih manual lewat media sosial?)

---

## 6. Yang saya butuhkan untuk melanjutkan

Agar **BAB III** dan **BAB IV** bisa disusun, kirimkan:

1. Nama lengkap dan alamat instansi PKPT IPNU-IPPNU UNEJ
2. Periode kepengurusan dan tanggal pelaksanaan kerja praktek
3. Data struktur organisasi (nama pengurus dan jabatannya)
4. Alur penyebaran informasi **sebelum** *website* ini ada
5. Nama pendamping lapangan dan dosen pembimbing
