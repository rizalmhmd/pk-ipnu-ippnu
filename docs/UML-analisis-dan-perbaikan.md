# Analisis & Perbaikan Bagian UML

Dokumen pendamping untuk menyusun/ memperbaiki bagian UML pada laporan KP. Berisi: (1) diagnosis kesalahan yang lazim terjadi, (2) rancangan UML yang benar untuk sistem PKPT IPNU-IPPNU UNEJ, (3) aturan penempatan di laporan.

Semua rancangan di bawah disusun dari pembacaan langsung `routes/web.php`, `app/Models`, `app/Http/Controllers`, dan `database/migrations`.

---

## 1. Diagnosis: mengapa bagian UML sering dianggap salah

### 1.1 Kesalahan konseptual (paling fatal)

| # | Kesalahan | Kenapa salah | Perbaikan |
|---|---|---|---|
| 1 | **ERD disebut *class diagram*** | ERD memodelkan **tabel** (ada PK/FK, tanpa metode) dan **bukan diagram UML**. *Class diagram* memodelkan **kelas** (ada atribut + metode + visibilitas) | Tulis dua sub-bab terpisah: "Perancangan Basis Data (ERD)" dan "Class Diagram" |
| 2 | **Diagram diletakkan di Bab 2** | Bab 2 = landasan teori. Diagram adalah **hasil perancangan** | Teori UML → Bab 2. Diagram sistem → Bab 3 |
| 3 | **Aktor = nama orang** ("Fajar", "Admin Budi") | Aktor adalah **peran**, bukan individu | Gunakan "Admin", "Ketua", "Departemen", "Pengunjung" |
| 4 | *Use case* berupa **kata benda** ("Berita", "Agenda") | *Use case* adalah **fungsi/layanan**, harus diawali kata kerja | "Melihat Berita", "Kelola Berita" |
| 5 | **CRUD dipecah jadi 4 *use case*** (Tambah Berita, Edit Berita, Hapus Berita, Lihat Berita) | Membuat *use case diagram* menjadi daftar menu, bukan model kebutuhan | Satu *use case* "Kelola Berita"; rincian Create/Read/Update/Delete ditulis di *use case scenario* (tabel skenario) |
| 6 | **Arah `<<include>>` / `<<extend>>` terbalik** | Keduanya bergaris putus-putus berpanah dan sering tertukar | `<<include>>`: panah **dari** induk **ke** yang disertakan (wajib). `<<extend>>`: panah **dari** tambahan **ke** induk (opsional) |

### 1.2 Kesalahan notasi teknis

| # | Kesalahan | Perbaikan |
|---|---|---|
| 7 | *Activity diagram* tanpa *initial node* / *final node* | Wajib ada: satu ● di awal, minimal satu ◉ di akhir |
| 8 | Percabangan (◇) tanpa keterangan kondisi di salah satu jalur | Tulis kondisi di atas garis, mis. `[valid]` / `[tidak valid]` |
| 9 | *Sequence diagram* tanpa *activation bar* | Tambahkan persegi panjang sempit di atas *lifeline* saat objek aktif |
| 10 | *Return message* digambar dengan **garis lurus** | *Return* harus **garis putus-putus** + panah terbuka |
| 11 | *Class diagram* tanpa multiplisitas | Tulis `1`, `1..*`, `0..*` di kedua ujung relasi |
| 12 | *Class diagram* dibuat untuk **setiap tabel** | Buat untuk kelas yang memiliki **perilaku**; tabel murni cukup di ERD |

---

## 2. Rancangan UML yang benar untuk sistem ini

### 2.1 *Use Case Diagram*

**Aktor (4):**
| Aktor | Keterangan |
|---|---|
| Pengunjung | Publik, tanpa login — mengakses 10 halaman informasi |
| Admin | Mengelola seluruh modul + pengguna + pengaturan |
| Ketua | Mengelola agenda, galeri, anggota, statistik |
| Departemen | Mengelola berita, artikel, kutipan |

**Saran pemodelan:** gunakan **generalisasi**. Buat aktor abstrak **"Pengelola"** yang mewarisi *Login*, *Melihat Dashboard*, dan *Kelola Profil Sendiri*; lalu `Admin`, `Ketua`, `Departemen` menjadi aktor turunan. Ini jauh lebih rapi daripada menggambar 3 aktor dengan *use case* yang sama berulang-ulang.

```mermaid
usecaseDiagram
left to right direction

actor "Pengunjung" as P
actor "Pengelola (abstrak)" as G
actor "Admin" as A
actor "Ketua" as K
actor "Departemen" as D

G <|-- A
G <|-- K
G <|-- D

rectangle "Situs Web PKPT IPNU-IPPNU UNEJ" {
  P -- (Melihat Beranda)
  P -- (Melihat Berita)
  P -- (Melihat Artikel)
  P -- (Melihat Galeri)
  P -- (Melihat Agenda)
  P -- (Melihat Profil: sejarah, visi-misi, struktur)

  (Melihat Beranda) .> (Memuat Ulang Konten Realtime) : <<extend>>

  G -- (Login)
  G -- (Melihat Dashboard)
  G -- (Kelola Profil Sendiri)

  A -- (Kelola Pengguna)
  A -- (Kelola Pengaturan Situs)
  A -- (Kelola Pengaturan Halaman)

  K -- (Kelola Agenda)
  K -- (Kelola Galeri)
  K -- (Kelola Anggota)
  K -- (Kelola Statistik)

  D -- (Kelola Berita)
  D -- (Kelola Artikel)
  D -- (Kelola Kutipan)

  (Kelola Pengguna) ..> (Autentikasi) : <<include>>
  (Kelola Pengaturan Situs) ..> (Autentikasi) : <<include>>
  (Kelola Pengaturan Halaman) ..> (Autentikasi) : <<include>>
  (Kelola Agenda) ..> (Autentikasi) : <<include>>
  (Kelola Galeri) ..> (Autentikasi) : <<include>>
  (Kelola Anggota) ..> (Autentikasi) : <<include>>
  (Kelola Statistik) ..> (Autentikasi) : <<include>>
  (Kelola Berita) ..> (Autentikasi) : <<include>>
  (Kelola Artikel) ..> (Autentikasi) : <<include>>
  (Kelola Kutipan) ..> (Autentikasi) : <<include>>
  (Kelola Berita) ..> (Unggah Gambar ke Cloudinary) : <<include>>
  (Kelola Galeri) ..> (Unggah Gambar ke Cloudinary) : <<include>>
}
```

**Catatan penulisan di laporan:**
- Gunakan **`<<include>>` hanya untuk hal yang benar-benar selalu terjadi** (autentikasi, unggah gambar).
- Gunakan **`<<extend>>` untuk perilaku bersyarat** (pembaruan realtime hanya terjadi bila ada *event* masuk).
- Jangan membuat `<<include>>` dari *Login* ke *Autentikasi* — *Login* **adalah** proses autentikasi, jadi cukup ditulis sebagai satu *use case*.

### 2.2 *Activity Diagram* — contoh: "Kelola Berita"

```mermaid
flowchart TD
    A([● Mulai]) --> B[Pengelola membuka halaman Kelola Berita]
    B --> C[Sistem memeriksa peran via middleware]
    C --> D{Peran sesuai?}
    D -- Tidak --> E[Tampilkan pesan 403: Anda tidak memiliki akses]
    E --> Z([◉ Selesai])
    D -- Ya --> F[Tampilkan daftar berita]
    F --> G{Pilih aksi}
    G -- Tambah --> H[Isi form: judul, konten, gambar]
    G -- Ubah --> I[Ubah data pada form]
    G -- Hapus --> J[Konfirmasi hapus via SweetAlert2]
    H --> K{Validasi}
    I --> K
    K -- Gagal --> L[Tampilkan pesan kesalahan validasi]
    L --> H
    K -- Berhasil --> M[Simpan ke tabel posts]
    J -- Ya --> N[Hapus baris dari tabel posts]
    J -- Tidak --> F
    M --> O[Observer: event created/updated]
    N --> O
    O --> P[Sebarkan event ContentUpdated via Pusher]
    P --> Q[Peramban pengunjung memuat ulang data]
    Q --> Z
```

**Yang perlu diperhatikan:**
- Ada satu ● di awal dan satu ◉ di akhir.
- Setiap percabangan (◇) memiliki keterangan kondisi pada garisnya.
- Alur berakhir juga pada cabang "tidak punya akses" — bukan hanya pada cabang sukses.

### 2.3 *Sequence Diagram* — contoh: "Pengunjung membuka halaman Beranda"

```mermaid
sequenceDiagram
    autonumber
    actor U as Pengunjung
    participant B as Browser / React 19
    participant R as Router (web.php)
    participant M as Middleware
    participant C as PublicController
    participant E as Model Eloquent
    participant DB as MySQL (pkpt)

    U->>B: Mengakses "/"
    B->>R: GET /
    R->>M: Lewati middleware web
    M-->>R: Lolos
    R->>C: Panggil index()
    activate C
    C->>E: Post::latest()->take(3)->get()
    activate E
    E->>DB: SELECT ... FROM posts ORDER BY published_at DESC LIMIT 3
    DB-->>E: Baris data
    E-->>C: Koleksi Post
    deactivate E
    C->>E: Agenda::whereDate(...)->get()
    E->>DB: SELECT ... FROM agendas
    DB-->>E: Baris data
    E-->>C: Koleksi Agenda
    C-->>B: Inertia::render("Welcome", props)
    deactivate C
    B-->>U: Halaman Beranda tampil (tanpa reload)
```

**Yang perlu diperhatikan:**
- Panah `->>` = *synchronous message* (garis lurus, panah penuh).
- Panah `-->>` = *return message* (garis putus-putus, panah terbuka).
- `activate` / `deactivate` menghasilkan *activation bar*.
- Objek diurutkan kiri → kanan sesuai urutan keterlibatan.

**Variasi untuk alur admin (tambahan objek):**

```mermaid
sequenceDiagram
    autonumber
    actor A as Admin
    participant B as Browser
    participant MW as RoleMiddleware
    participant C as PostController
    participant M as Model Post
    participant DB as MySQL
    participant CL as Cloudinary
    participant OB as ContentObserver
    participant PS as Pusher

    A->>B: Submit form Berita
    B->>MW: POST /admin/posts
    MW->>MW: Periksa role user
    alt role bukan admin/departemen
        MW-->>B: HTTP 403
    else role sesuai
        MW->>C: store(Request)
        activate C
        C->>CL: Unggah berkas gambar
        CL-->>C: URL gambar
        C->>M: Post::create([...])
        activate M
        M->>DB: INSERT INTO posts
        DB-->>M: id baru
        M->>OB: created($post)
        OB->>PS: broadcast(ContentUpdated)
        deactivate M
        C-->>B: Redirect + flash message
        deactivate C
    end
    PS-->>B: Event content.updated (ke pengunjung)
```

### 2.4 *Class Diagram*

**Penting:** ini *class diagram* perangkat lunak, **bukan** skema tabel.

```mermaid
classDiagram
    class User {
        -id: int
        -name: string
        -email: string
        -password: string
        -role: enum
        +member() HasOne
        +posts() HasMany
        +articles() HasMany
        +isAdmin() bool
        +isKetua() bool
        +isDepartemen() bool
    }

    class Post {
        -id: int
        -user_id: int
        -title: string
        -slug: string
        -image: string
        -content: text
        -published_at: datetime
        +user() BelongsTo
        +getImageUrlAttribute() string
    }

    class Article {
        -id: int
        -user_id: int
        -title: string
        -slug: string
        -author: string
        -content: text
        -published_at: datetime
        +user() BelongsTo
        +getImageUrlAttribute() string
    }

    class Agenda {
        -id: int
        -title: string
        -category: string
        -description: text
        -event_date: date
        -location: string
    }

    class Gallery {
        -id: int
        -title: string
        -image_path: string
        +getImageUrlAttribute() string
    }

    class Member {
        -id: int
        -user_id: int
        -name: string
        -position: string
        -level: int
        -department: string
        -type: enum
        -photo: string
        -order: int
        +user() BelongsTo
        +getPhotoUrlAttribute() string
    }

    class Quote {
        -id: int
        -content: text
        -author: string
        -order: int
        -is_active: bool
    }

    class Statistic {
        -id: int
        -title: string
        -value: string
        -unit: string
        -icon: string
        -order: int
        +scopeActive() Builder
        +scopeOrdered() Builder
    }

    class PageSetting {
        -id: int
        -page_name: string
        -hero_title: string
        -hero_description: text
        -feature_title: string
        +getHeroImageUrlAttribute() string
    }

    class SiteSetting {
        -id: int
        -site_name: string
        -site_logo: string
        -favicon: string
        -email: string
        -instagram: string
        +getSiteLogoUrlAttribute() string
    }

    class ContentObserver {
        +created(model) void
        +updated(model) void
        +deleted(model) void
        -broadcast(model, action) void
    }

    User "1" --> "0..1" Member : memiliki
    User "1" --> "0..*" Post : menulis
    User "1" --> "0..*" Article : menulis
    Member --> User : belongsTo
    Post --> User : belongsTo
    Article --> User : belongsTo
    ContentObserver ..> Post : mengamati
    ContentObserver ..> Article : mengamati
    ContentObserver ..> Agenda : mengamati
    ContentObserver ..> Gallery : mengamati
    ContentObserver ..> Member : mengamati
    ContentObserver ..> Quote : mengamati
    ContentObserver ..> Statistic : mengamati
    ContentObserver ..> SiteSetting : mengamati
```

**Catatan:**
- Baris ketiga pada setiap kotak berisi **metode** — inilah pembeda utama dari ERD (`getImageUrlAttribute()`, `scopeActive()`, `isAdmin()`).
- `ContentObserver` menggunakan **dependency** (garis putus-putus), karena ia tidak menyimpan referensi permanen ke model.
- Multiplisitas ditulis di kedua ujung: `1` — `0..*`, dst.

### 2.5 ERD (terpisah dari *class diagram*)

```mermaid
erDiagram
    users ||--o| members : "memiliki"
    users ||--o{ posts : "menulis"
    users ||--o{ articles : "menulis"

    users {
        bigint id PK
        string name
        string email
        string password
        enum role
    }

    members {
        bigint id PK
        bigint user_id FK
        string name
        string position
        int level
        string department
        enum type
        string photo
        int order
    }

    posts {
        bigint id PK
        bigint user_id FK
        string title
        string slug
        string image
        text content
        timestamp published_at
    }

    articles {
        bigint id PK
        bigint user_id FK
        string title
        string slug
        string author
        text content
        timestamp published_at
    }

    agendas {
        bigint id PK
        string title
        string category
        string location
        date event_date
    }

    galleries {
        bigint id PK
        string title
        string image_path
    }

    quotes {
        bigint id PK
        text content
        string author
        int order
        bool is_active
    }

    statistics {
        bigint id PK
        string title
        string value
        string unit
        int order
        bool is_active
    }

    page_settings {
        bigint id PK
        string page_name
        string hero_title
        text hero_description
        string feature_title
    }

    site_settings {
        bigint id PK
        string site_name
        string site_logo
        string email
        string instagram
    }
```

Sub-bab ini ditulis dengan judul **"Perancangan Basis Data (ERD)"**, diletakkan **terpisah** dari sub-bab *class diagram*.

---

## 3. Penempatan di dalam laporan

Menurut **Buku Panduan KP Teknik Informatika UNSIQ**, sistematika bagian isi adalah:

| Bab | Isi menurut panduan | Tempat untuk UML |
|---|---|---|
| **BAB I** Pendahuluan | Latar belakang, tujuan, manfaat, batasan, identitas KP, sistematika penulisan | — |
| **BAB II** Landasan Teori | Teori-teori yang berhubungan dengan permasalahan | **Teori UML saja** (pengertian, tabel notasi, aturan `include`/`extend`, perbedaan *class diagram* vs ERD). **Tidak ada gambar diagram** |
| **BAB III** Tinjauan Umum | Gambaran umum instansi, sistem yang sedang berjalan, urutan proses penyelesaian masalah | Boleh memuat *flowchart* sistem berjalan (bukan UML rancangan) |
| **BAB IV** Hasil dan Pembahasan | Analisis sistem berjalan, usulan solusi, **perancangan dan rekayasa sistem** sebagai solusi | **Semua diagram UML**: *use case, activity, sequence, class diagram*, dan ERD |
| **BAB V** Penutup | Kesimpulan dan saran | — |

Jadi seluruh rancangan UML pada bagian 2 dokumen ini diletakkan pada **BAB IV**, sedangkan teori notasinya sudah tersedia di `docs/BAB-2-Landasan-Teori.md`.

---

## 4. Daftar periksa sebelum dikumpulkan

- [ ] Setiap definisi memiliki sitasi, dan sebagian besar terbitan 2022–2026
- [ ] Tidak ada diagram di Bab 2 (kecuali diwajibkan panduan)
- [ ] Aktor ditulis sebagai peran, bukan nama orang
- [ ] *Use case* diawali kata kerja
- [ ] CRUD tidak dipecah menjadi 4 *use case* terpisah
- [ ] Arah `<<include>>` dan `<<extend>>` sudah dicek ulang
- [ ] *Activity diagram* memiliki ● dan ◉
- [ ] *Sequence diagram* memiliki *activation bar* dan *return* bergaris putus-putus
- [ ] *Class diagram* memuat metode dan multiplisitas
- [ ] ERD ditulis di sub-bab tersendiri, tidak dicampur dengan *class diagram*
- [ ] Semua diagram diberi nomor dan judul, misalnya "Gambar 3.1 *Use Case Diagram* Sistem"
- [ ] Setiap diagram diikuti narasi penjelasan minimal satu paragraf
