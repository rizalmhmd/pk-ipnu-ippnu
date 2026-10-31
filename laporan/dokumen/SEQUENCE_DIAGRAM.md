# Dokumentasi Lengkap Sequence Diagram — Sistem Informasi PK IPNU-IPPNU
*(Format Hitam Putih: Actor Stickman – Frontend (Inertia React) – Route (web.php) – Controller – Tabel Database)*

Dokumen ini memuat **7 Sequence Diagram lengkap** dengan tampilan **Hitam Putih (Monochrome)** yang merepresentasikan alur interaksi sistem sesuai gambar referensi:
- **Actor (Stickman)**: Pengguna aplikasi (`Pengunjung`, `User (Admin/Pengurus)`, `User (Admin/Ketua Dept)`, `User (Admin/Ketua)`, `User (Administrator)`)
- **Frontend (`Frontend (Inertia React)`)**: Antarmuka pengguna berbasis React & Inertia.js
- **Route (`Route (web.php)`)**: Pengarah rute HTTP Laravel (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`)
- **Controller (`...Controller`)**: Pengendali logika bisnis di `app/Http/Controllers`
- **Database Table (Cylinder)**: Tabel basis data MySQL (`agenda_registrations`, `users`, `posts`, `agendas`, `members`) serta layanan eksternal (`Midtrans API`)

---

## 1. Sequence Diagram - 1) Pendaftaran & Pembayaran Kegiatan (Midtrans)

```mermaid
%%{init: {'theme': 'neutral'}}%%
sequenceDiagram
    actor User as Pengunjung
    participant FE as Frontend<br/>(Inertia React)
    participant Route as Route<br/>(web.php)
    participant Ctrl as PublicController
    participant Midtrans as Midtrans API
    participant DB as agenda_registrations

    User->>FE: Akses form pendaftaran kegiatan
    FE->>Route: GET /kegiatan/{agenda}/daftar
    Route->>Ctrl: kegiatanDaftar(agenda)
    Ctrl-->>FE: form pendaftaran + detail agenda
    User->>FE: Kirim data pendaftaran & metode bayar
    FE->>Route: POST /kegiatan/{agenda}/daftar
    Route->>Ctrl: kegiatanStoreDaftar()
    alt metode = midtrans (berbayar)
        Ctrl->>Midtrans: createSnapToken(order_id, nominal)
        Midtrans-->>Ctrl: snap_token
        Midtrans->>Ctrl: POST /midtrans/callback (settlement)
        Ctrl->>DB: insert/update status = 'approved'
    end
    Ctrl-->>FE: redirect + bukti pendaftaran
```

---

## 2. Sequence Diagram - 2) Autentikasi & Login Pengurus

```mermaid
%%{init: {'theme': 'neutral'}}%%
sequenceDiagram
    actor User as User (Admin/Pengurus)
    participant FE as Frontend<br/>(Inertia React)
    participant Route as Route<br/>(web.php)
    participant Ctrl as AuthenticatedSessionController
    participant DB as users

    User->>FE: Akses halaman Login
    FE->>Route: GET /login
    Route->>Ctrl: create()
    Ctrl-->>FE: tampilkan form login
    User->>FE: Input email & password
    FE->>Route: POST /login
    Route->>Ctrl: store(LoginRequest)
    alt kredensial valid
        Ctrl->>DB: query user by email & cek password
        Ctrl->>DB: regenerate session login
    end
    Ctrl-->>FE: redirect /admin/dashboard
```

---

## 3. Sequence Diagram - 3) Kelola Berita & Artikel (CRUD + Foto)

```mermaid
%%{init: {'theme': 'neutral'}}%%
sequenceDiagram
    actor User as User (Admin/Ketua Dept)
    participant FE as Frontend<br/>(Inertia React)
    participant Route as Route<br/>(web.php)
    participant Ctrl as PostController
    participant DB as posts

    User->>FE: Akses modul Berita & Artikel
    FE->>Route: GET /admin/posts
    Route->>Ctrl: index()
    Ctrl->>DB: query posts terbaru (paginate)
    Ctrl-->>FE: list berita
    User->>FE: Simpan/Ubah data berita
    FE->>Route: POST/PUT /admin/posts
    Route->>Ctrl: store()/update()
    alt ada file gambar
        Ctrl->>DB: upload foto & generate slug
    end
    Ctrl->>DB: insert/update post
    Ctrl-->>FE: redirect + success message
```

---

## 4. Sequence Diagram - 4) Kelola Agenda Kegiatan (CRUD + Form Schema)

```mermaid
%%{init: {'theme': 'neutral'}}%%
sequenceDiagram
    actor User as User (Admin/Ketua)
    participant FE as Frontend<br/>(Inertia React)
    participant Route as Route<br/>(web.php)
    participant Ctrl as AgendaController
    participant DB as agendas

    User->>FE: Akses modul Agenda Kegiatan
    FE->>Route: GET /admin/agendas
    Route->>Ctrl: index()
    Ctrl->>DB: query agendas + kategori
    Ctrl-->>FE: list agenda
    User->>FE: Simpan/Ubah data agenda
    FE->>Route: POST/PUT /admin/agendas
    Route->>Ctrl: store()/update()
    Ctrl->>DB: insert/update agenda + form_schema
    alt ada upload pamflet
        Ctrl->>DB: simpan file pamflet kegiatan
    end
    Ctrl-->>FE: redirect + success message
```

---

## 5. Sequence Diagram - 5) Verifikasi Pendaftar & Sinkronisasi Midtrans

```mermaid
%%{init: {'theme': 'neutral'}}%%
sequenceDiagram
    actor User as User (Admin/Ketua)
    participant FE as Frontend<br/>(Inertia React)
    participant Route as Route<br/>(web.php)
    participant Ctrl as AgendaRegistrationController
    participant Midtrans as Midtrans API
    participant DB as agenda_registrations

    User->>FE: Akses modul Pendaftaran Kegiatan
    FE->>Route: GET /admin/registrations
    Route->>Ctrl: index()
    Ctrl->>DB: query registrations + agenda
    Ctrl-->>FE: list pendaftar kegiatan
    User->>FE: Ubah status / Sync Midtrans
    FE->>Route: POST/PATCH /admin/registrations/{id}
    Route->>Ctrl: syncMidtrans() / updateStatus()
    alt klik Sync Midtrans
        Ctrl->>Midtrans: getTransactionStatus(order_id)
        Midtrans-->>Ctrl: status (settlement/expire)
        Ctrl->>DB: update status ('approved'/'rejected')
    end
    Ctrl-->>FE: redirect + success message
```

---

## 6. Sequence Diagram - 6) Kelola Data Anggota (CRUD + Foto)

```mermaid
%%{init: {'theme': 'neutral'}}%%
sequenceDiagram
    actor User as User (Admin/Ketua)
    participant FE as Frontend<br/>(Inertia React)
    participant Route as Route<br/>(web.php)
    participant Ctrl as MemberController
    participant DB as members

    User->>FE: Akses modul Data Anggota
    FE->>Route: GET /admin/members
    Route->>Ctrl: index()
    Ctrl->>DB: query members + departemen
    Ctrl-->>FE: list anggota
    User->>FE: Simpan/Ubah data anggota
    FE->>Route: POST/PUT /admin/members
    Route->>Ctrl: store()/update()
    Ctrl->>DB: insert/update member
    alt ada foto anggota
        Ctrl->>DB: upload & simpan path foto
    end
    Ctrl-->>FE: redirect + success message
```

---

## 7. Sequence Diagram - 7) Kelola Pengguna / User (CRUD + Role)

```mermaid
%%{init: {'theme': 'neutral'}}%%
sequenceDiagram
    actor User as User (Administrator)
    participant FE as Frontend<br/>(Inertia React)
    participant Route as Route<br/>(web.php)
    participant Ctrl as UserController
    participant DB as users

    User->>FE: Akses modul Kelola Pengguna
    FE->>Route: GET /admin/users
    Route->>Ctrl: index()
    Ctrl->>DB: query users + role
    Ctrl-->>FE: list pengguna
    User->>FE: Simpan/Ubah data pengguna
    FE->>Route: POST/PUT /admin/users
    Route->>Ctrl: store()/update()
    Ctrl->>DB: insert/update user + role
    alt password diisi
        Ctrl->>DB: hash password (bcrypt)
    end
    Ctrl-->>FE: redirect + success message
```
