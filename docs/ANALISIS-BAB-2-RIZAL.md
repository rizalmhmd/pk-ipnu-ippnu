# Analisis Laporan KP Rizal — Fokus BAB II dan UML

Berdasarkan pembacaan `docs/Kerja Praktek Rizal.pdf` (44 halaman), dibandingkan dengan:
- **`docs/01. Buku Panduan KP Teknik Informatika.pdf`** — aturan resmi UNSIQ
- **`docs/FIRMAN TEMPLATE KP.pdf`** — laporan yang **sudah lulus** (Firmansyah Putra, 2022150002, 2025)
- **`docs/02. Template Laporan KP Teknik Informatika (1).docx`** — templat resmi

---

## 1. Ringkasan temuan

| # | Temuan | Tingkat | Pasal panduan yang dilanggar |
|---|---|---|---|
| 1 | **ERD diletakkan di dalam sub-bab UML** (2.8.4) | 🔴 Fatal | Konsep UML |
| 2 | **Daftar Pustaka hanya 4 entri**, padahal teks mengutip 19 sumber | 🔴 Fatal | 3.3.1 |
| 3 | **3 sitasi ke dokumentasi resmi** (Laravel, React, Oracle) | 🔴 Fatal | 4.9.g.4 |
| 4 | Tidak ada **Class Diagram** | 🟠 Sedang | Kesesuaian dengan contoh lulus |
| 5 | Typo **"Squence Diagram"** | 🟡 Kecil | — |
| 6 | **Daftar Isi tidak sinkron** dengan isi (2.1.5, dan 2.3.2–2.8 tidak tercantum) | 🟠 Sedang | 3.1.6 |
| 7 | **Daftar Tabel & Daftar Gambar masih kosong** | 🟠 Sedang | 3.1.7, 3.1.8 |
| 8 | Bab I menjanjikan fitur yang **tidak ada di kode** | 🟠 Sedang | Konsistensi |
| 9 | Satu sumber di bawah 2022 (Muhyidin et al., 2020) | 🟡 Kecil | Permintaan sendiri |

---

## 2. Masalah UML — inti dari yang Anda curigai

### 2.1 Perbandingan langsung dengan laporan yang sudah lulus

| Aspek | FIRMAN (lulus 2025) | RIZAL (milik Anda) | Penilaian |
|---|---|---|---|
| Sub-bab UML | **2.11** Diagram UML | 2.8 UML | ✅ |
| Anak sub-bab UML | 2.11.1 Use Case<br>2.11.2 **Class Diagram**<br>2.11.3 Activity<br>2.11.4 Sequence | 2.8.1 Use Case<br>2.8.2 Activity<br>2.8.3 Sequence<br>2.8.4 **ERD** | ❌ |
| Posisi ERD | **2.12** — sub-bab **sendiri, di luar** UML | **2.8.4 — di dalam** UML | ❌ **Salah** |
| Jumlah diagram | 4 (use case, class, activity, sequence) | 4 (use case, activity, sequence, **ERD**) | ❌ |
| Diagram digambar di BAB IV | 4.4–4.8 | Belum ada (Bab IV masih "Isi sub bab 1") | ⚠️ |

**Kesimpulan:** tebakan Anda tepat. Kesalahannya bukan pada tabel simbol — tabel 2.1, 2.2, 2.3 Anda **sudah sama persis** dengan laporan yang lulus (Aktor, Usecase, Association, Generalization, Include, Extend; Start Point, Activity, Join/Fork, Decision, Swimlane, Finish Point; Aktor, Lifeline, Control, Boundary, Entity, Activation box, Message). Jadi tabelnya aman.

**Yang salah ada dua:**
1. **ERD dimasukkan sebagai anak sub-bab UML.** ERD *bukan* diagram UML. ERD berasal dari pemodelan basis data relasional (Chen, 1976), sedangkan UML dikelola OMG. Laporan FIRMAN yang lulus menempatkan ERD di **2.12**, terpisah dari UML di **2.11**.
2. **Class Diagram tidak ada**, padahal FIRMAN memuatnya sebagai 2.11.2 lengkap dengan tabel simbolnya (Kelas, Asosiasi, Asosiasi berarah, Generalisasi, Dependensi, Agregasi).

Akibatnya, kalimat pembuka 2.8 Anda — *"empat jenis diagram UML digunakan"* — menjadi **tidak benar**, karena yang keempat (ERD) bukan UML.

### 2.2 Perbaikan struktur yang disarankan

Ubah bagian 2.8 menjadi berikut. Perubahan minimal: ERD dinaikkan menjadi sub-bab sendiri, dan Class Diagram disisipkan.

```
2.8. Unified Modeling Language (UML)
     2.8.1 Use Case Diagram          (Tabel 2.1 — sudah ada)
     2.8.2 Class Diagram             (BARU — Tabel 2.2)
     2.8.3 Activity Diagram          (Tabel 2.2 lama → Tabel 2.3)
     2.8.4 Sequence Diagram          (Tabel 2.3 lama → Tabel 2.4; perbaiki ejaan)
2.9. Entity Relationship Diagram (ERD)   ← dikeluarkan dari 2.8
```

Dengan susunan ini, kalimat pembuka 2.8 tetap benar: *"empat jenis diagram UML digunakan, yaitu use case diagram, class diagram, activity diagram, dan sequence diagram."* — persis seperti FIRMAN.

### 2.3 Perbaikan kecil lainnya

| Lokasi | Sekarang | Menjadi |
|---|---|---|
| 2.8.3 | **Squence** Diagram | **Sequence** Diagram |
| Tabel 2.1 | Belum ada *System Boundary* | Boleh ditambahkan (opsional — FIRMAN juga tidak ada) |
| Tabel 2.2 | "Join/Fork" digabung | Boleh dipisah: Fork memecah alur, Join menggabungkan |
| 2.8.4 | Narasi sudah berupa **rancangan** ("ERD dalam penelitian ini memodelkan entitas pengguna, konten, kegiatan, pendaftar, presensi, dan pembayaran") | Pindahkan kalimat rancangan ke **BAB IV**; di Bab II cukup teori + tabel simbol ERD |

> Catatan: FIRMAN juga menulis "Squence" di 4.6 dan tetap lulus, jadi ini tidak fatal — tetapi lebih baik diperbaiki.

### 2.4 Tempat menggambar diagramnya

Seluruh diagram **tidak** diletakkan di Bab II. Menurut FIRMAN yang lulus, Bab IV disusun:

```
4.1 Analisis Kebutuhan Sistem
4.2 Perancangan Sistem
4.3 Tahapan Analisis
4.4 Use Case Diagram
4.5 Activity Diagram
4.6 Sequence Diagram
4.7 Class Diagram
4.8 Entity Relationship Diagram
4.9 Perancangan Basis Data
4.10 Implementasi
4.11 Pengujian Sistem
4.12 Hasil dan Evaluasi
```

Rancangan use case, activity, 2 sequence, class diagram, dan ERD untuk sistem Anda **sudah saya siapkan** dalam format Mermaid di `docs/UML-analisis-dan-perbaikan.md`.

---

## 3. Daftar Pustaka — masalah paling serius

Panduan 3.3.1 menyatakan: *"Semua referensi yang dirujuk dalam naskah harus dicantumkan dalam daftar pustaka, dan sebaliknya."*

**Kondisi Anda sekarang:**

- Daftar Pustaka: **4 entri** (hal. 34)
- Sitasi di dalam teks: **19 sumber unik**
- **15 sumber belum tercantum**

### 3.1 Sumber jurnal/buku yang belum masuk Daftar Pustaka (12)

| Sitasi di teks | Jumlah kemunculan |
|---|---|
| Ramdani et al. (2024) | 4 |
| Ariyanto et al. (2024) | 3 |
| Syaputri et al. (2024) | 2 |
| Narulita et al. (2024) | 3 |
| Putra et al. (2025) | 4 |
| Aulia et al. (2025) | 2 |
| Akmal et al. (2026) | 3 |
| Hardika et al. (2024) | 1 |
| Rahmadhani et al. (2024) | 1 |
| Zaeladi et al. (2026) | 1 |
| Muhyidin et al. (2020) | 3 |
| Fahrurroji, Salman, & Nugraha (2026) | 1 |

> **Catatan:** nama-nama di atas saya baca dari sitasi di dalam teks. Anda perlu melengkapi judul, nama jurnal, volume, nomor, dan halamannya dari berkas sumber masing-masing.

### 3.2 Tiga sitasi yang harus diganti (dokumentasi resmi)

Panduan 4.9.g.4: *"Publikasi di web selain e-book, e-journal, dan e-proceeding **tidak diperbolehkan** untuk dijadikan rujukan penelitian ilmiah."*

| Sitasi | Konteks | Pengganti yang sudah saya siapkan |
|---|---|---|
| (Laravel, 2026) ×7 | Eloquent ORM, CSRF, keamanan | Stauffer (2023); Kharismatunnisaa et al. (2023); Anugra et al. (2025) |
| (React, 2026) ×2 | Komponen React | Rizzi et al. (2025) |
| (Oracle, 2026) ×3 | Definisi MySQL/RDBMS | Anugra et al. (2025) |

---

## 4. Daftar Isi, Daftar Tabel, Daftar Gambar

### 4.1 Daftar Isi tidak sinkron

Daftar Isi (hal. vi–vii) hanya mencantumkan Bab II sampai **2.1.5 Arsitektur MVC (hal. 16)**, padahal di badan laporan Bab II berlanjut sampai halaman 30.

| Di Daftar Isi | Di badan laporan | Keterangan |
|---|---|---|
| 2.1.5 Arsitektur MVC | **2.3.1** Arsitektur MVC | ❌ Nomor di Daftar Isi salah |
| tidak tercantum | 2.3.2 Eloquent ORM | ❌ Hilang |
| tidak tercantum | 2.3.3 Keamanan (Security) | ❌ Hilang |
| tidak tercantum | 2.4 Teknologi React | ❌ Hilang |
| tidak tercantum | 2.5 MySQL | ❌ Hilang |
| tidak tercantum | 2.6 Waterfall | ❌ Hilang |
| tidak tercantum | 2.7 UI/UX (+2.7.1, 2.7.2) | ❌ Hilang |
| tidak tercantum | 2.8 UML (+2.8.1–2.8.4) | ❌ Hilang |

**Penomoran di badan laporan sudah benar** (2.3.1 MVC). Yang salah hanya Daftar Isi. Solusi paling aman: di Word, klik kanan Daftar Isi → **Update Field → Update entire table** setelah nomor-nomor diperbaiki.

### 4.2 Daftar Tabel & Daftar Gambar masih kosong

Halaman viii (DAFTAR TABEL) dan ix (DAFTAR GAMBAR) **masih kosong**, padahal isi laporan sudah memuat:
- Tabel 2.1 Simbol Usecase Diagram
- Tabel 2.2 Simbol Actifity Diagram *(perhatikan ejaan: "Actifity" → "Activity")*
- Tabel 2.3 Simbol Sequence Diagram
- Gambar 2.5 Model Pengembangan Waterfall

Penomorannya sudah benar (menyertakan nomor bab) sesuai 4.6f. Tinggal dibuatkan daftarnya.

---

## 5. Ketidaksesuaian antara BAB I dan kode yang Anda bangun

BAB I (1.2 Tujuan, 1.4 Batasan) menyatakan sistem memiliki:
- **Pendaftaran peserta online**
- **Validasi pembayaran/transfer (HTM)**
- **Presensi kehadiran digital**

Namun hasil pembacaan *source code* menunjukkan modul yang benar-benar ada:

| Dijanjikan di Bab I | Ada di kode? |
|---|---|
| Profil organisasi, berita, artikel, galeri, agenda | ✅ Ada |
| Manajemen anggota (struktur IPNU/IPPNU) | ✅ Ada |
| Statistik, kutipan, pengaturan halaman | ✅ Ada |
| **Pendaftaran peserta** | ❌ Tidak ada |
| **Pembayaran/HTM** | ❌ Tidak ada |
| **Presensi kehadiran** | ❌ Tidak ada |

Ini berisiko besar saat sidang. Pilih salah satu:

- **Opsi A (lebih aman):** revisi BAB I agar ruang lingkupnya sama dengan yang benar-benar dibangun — profil, berita, artikel, galeri, agenda, dan struktur organisasi.
- **Opsi B:** bangun ketiga modul itu sebelum sidang (pekerjaan besar).

Saya sarankan **Opsi A**.

Hal lain di 1.5 Identitas KP:
- **Waktu Pelaksanaan: Juli–Januari 2027** — kemungkinan salah ketik; periksa kembali.
- **Jumlah Pegawai: 53** — ini jumlah pengurus organisasi, bukan pegawai. Sebaiknya diubah menjadi "Jumlah Pengurus".
- Nama instansi sudah benar: **PKPT IPNU IPPNU UNSIQ** (bukan UNEJ). Draf Bab II buatan saya sebelumnya menyebut "UNEJ" karena ada sisa teks templat di kode — akan saya perbaiki.

---

## 6. Urutan perbaikan yang disarankan

Kerjakan dari yang paling berat dampaknya:

1. **Keluarkan ERD dari 2.8** → jadikan **2.9** (Sub-bab tersendiri). *Paling fatal.*
2. **Tambahkan 2.8.2 Class Diagram** beserta tabel simbolnya (Kelas, Asosiasi, Asosiasi berarah, Generalisasi, Dependensi, Agregasi) — salin pola dari FIRMAN 2.11.2.
3. **Perbaiki ejaan** "Squence" → "Sequence", "Actifity" → "Activity".
4. **Ganti 3 sitasi dokumentasi** (Laravel, React, Oracle) dengan jurnal/buku.
5. **Lengkapi Daftar Pustaka** dengan 12 sumber yang belum tercantum.
6. **Update Daftar Isi** (perbaiki 2.1.5 → 2.3.1, tambahkan 2.3.2–2.8).
7. **Buat Daftar Tabel dan Daftar Gambar.**
8. **Sesuaikan BAB I** dengan fitur yang benar-benar ada (atau bangun fiturnya).
9. Baru kemudian kerjakan **BAB III** dan **BAB IV**.

---

## 7. Bahan yang sudah tersedia untuk Anda

| Berkas | Isi |
|---|---|
| `docs/UML-analisis-dan-perbaikan.md` | Rancangan use case, activity, 2 sequence, class diagram, dan ERD siap pakai (format Mermaid) + penempatannya di BAB IV |
| `docs/BAB-2-Landasan-Teori.md` | Contoh narasi landasan teori dengan 18 referensi 2022–2026, sudah memakai format APA dan aturan panduan UNSIQ |
| `docs/catatan-panduan-UNSIQ.md` | Ringkasan aturan panduan + daftar periksa |
| `docs/analisis-proyek.md` | Bedah *source code*: 12 tabel, relasi, 3 peran, arsitektur |

**Catatan:** draf `BAB-2-Landasan-Teori.md` saya susun sebelum membaca laporan Anda, sehingga masih menyebut "UNEJ" dan belum memakai susunan sub-bab Anda (2.1 Sistem Informasi … 2.8 UML). Setelah Anda mengonfirmasi, saya akan **menyatukannya ke dalam struktur Bab II Anda yang sekarang** — bukan menggantinya — supaya nomor sub-bab tetap berurutan dan tidak perlu menulis ulang 24 halaman yang sudah ada.
