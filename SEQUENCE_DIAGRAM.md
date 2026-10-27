# Dokumentasi Lengkap Sequence Diagram — Sistem Informasi PK IPNU-IPPNU
*(Sesuai Standar Formal UML: Tanpa Emotikon, Notasi Boundary-Control-Entity)*

Dokumen ini memuat **6 Sequence Diagram lengkap** yang merepresentasikan interaksi objek pada use case utama aplikasi. Komponen diklasifikasikan menggunakan stereotipe arsitektur UML standar:
- **Aktor**: Pengguna manusia (`Pengunjung`, `Pengurus`, `Administrator`)
- **Boundary (`<<boundary>>`)**: Komponen antarmuka pengguna / UI View
- **Control (`<<control>>`)**: Komponen pengendali logika bisnis / Controller
- **Entity (`<<entity>>`)**: Komponen entitas data / Model Database
- **External System (`<<external system>>`)**: Layanan eksternal (*Midtrans Payment Gateway / File Storage*)

---

## 1. Sequence Diagram: Pendaftaran & Pembayaran Kegiatan (Publik & Midtrans)

```mermaid
sequenceDiagram
    autonumber
    actor Pengunjung as Pengunjung
    participant View as <<boundary>><br/>:KegiatanView
    participant Controller as <<control>><br/>:PublicController
    participant Model as <<entity>><br/>:AgendaRegistration
    participant Gateway as <<external system>><br/>:MidtransGateway

    Pengunjung->>View: pilihAgendaDanKlikDaftar()
    View->>Controller: getFormPendaftaran(agendaId)
    Controller-->>View: renderView(formPendaftaran)
    View-->>Pengunjung: tampilkanFormInputData()

    Pengunjung->>View: submitPendaftaran(nama, email, phone)
    View->>Controller: storePendaftaran(requestPayload)
    activate Controller
    Controller->>Controller: validasiInputData()
    Controller->>Model: create(dataRegistrasi, status='pending')
    activate Model
    Model-->>Controller: instanceRegistrasiTersimpan
    deactivate Model

    alt Kegiatan Berbayar
        Controller->>Gateway: createSnapTransaction(orderId, grossAmount)
        activate Gateway
        Gateway-->>Controller: returnSnapToken(token, redirectUrl)
        deactivate Gateway

        Controller-->>View: redirectPayment(snapToken)
        View-->>Pengunjung: showSnapPopup(token)

        Pengunjung->>Gateway: prosesPembayaran(metodeDipilih)
        activate Gateway
        Gateway-->>Pengunjung: notifikasiPembayaranSelesai
        
        Gateway->>Controller: midtransCallback(payloadWebhook)
        deactivate Gateway
        Controller->>Controller: verifikasiSignatureKey()
        
        alt Transaksi Sukses (Settlement)
            Controller->>Model: updateStatus(status='confirmed', payment_status='settlement')
            Controller-->>Gateway: responseHttp200(ok)
            Controller-->>View: broadcastStatusSukses()
            View-->>Pengunjung: renderBuktiPendaftaran(tiket)
        else Transaksi Gagal / Kadaluarsa
            Controller->>Model: updateStatus(status='cancelled', payment_status='failed')
            Controller-->>Gateway: responseHttp200(ok)
            View-->>Pengunjung: renderPesanGagal()
        end
    else Kegiatan Gratis
        Controller->>Model: updateStatus(status='confirmed', payment_status='free')
        Controller-->>View: redirectHalamanSukses()
        View-->>Pengunjung: renderTiketGratis()
    end
    deactivate Controller
```

---

## 2. Sequence Diagram: Autentikasi / Login Pengurus

```mermaid
sequenceDiagram
    autonumber
    actor Pengurus as Pengurus
    participant LoginView as <<boundary>><br/>:LoginView
    participant AuthCtrl as <<control>><br/>:AuthenticatedSessionController
    participant UserModel as <<entity>><br/>:User
    participant DashCtrl as <<control>><br/>:DashboardController

    Pengurus->>LoginView: getLoginPage()
    LoginView-->>Pengurus: renderFormLogin()

    Pengurus->>LoginView: inputKredensial(email, password)
    LoginView->>AuthCtrl: submitLogin(credentials)
    activate AuthCtrl

    AuthCtrl->>AuthCtrl: validasiFormatInput()
    AuthCtrl->>UserModel: getUserByEmail(email)
    activate UserModel
    UserModel-->>AuthCtrl: returnUserData(userRecord)
    deactivate UserModel

    AuthCtrl->>AuthCtrl: verifyPasswordHash(password, hash)

    alt Kredensial Valid
        AuthCtrl->>AuthCtrl: loginAndRegenerateSession(user)
        AuthCtrl-->>LoginView: redirectToDashboard()
        
        LoginView->>DashCtrl: getDashboardByRole(userRole)
        activate DashCtrl
        DashCtrl->>DashCtrl: periksaWewenangRole()
        DashCtrl-->>LoginView: renderDashboard(stats, menuList)
        deactivate DashCtrl

        LoginView-->>Pengurus: displayDashboardPage()
    else Kredensial Tidak Valid
        AuthCtrl-->>LoginView: returnValidationError('Email atau password salah')
        LoginView-->>Pengurus: displayErrorMessage()
    end
    deactivate AuthCtrl
```

---

## 3. Sequence Diagram: Pengelolaan Konten (Tambah Berita / Artikel)

```mermaid
sequenceDiagram
    autonumber
    actor Pengurus as Ketua Departemen / Admin
    participant PostView as <<boundary>><br/>:PostCreateView
    participant PostCtrl as <<control>><br/>:PostController
    participant Storage as <<external system>><br/>:FileStorage
    participant PostModel as <<entity>><br/>:Post

    Pengurus->>PostView: getCreatePostPage()
    PostView-->>Pengurus: renderFormInputBerita()

    Pengurus->>PostView: submitBerita(title, content, imageFile)
    PostView->>PostCtrl: storePost(requestData)
    activate PostCtrl

    PostCtrl->>PostCtrl: validasiDataForm()

    alt Validasi Berhasil
        PostCtrl->>PostCtrl: generateSlug(title)
        PostCtrl->>Storage: putFile('posts/images', imageFile)
        activate Storage
        Storage-->>PostCtrl: returnFilePath(imagePath)
        deactivate Storage

        PostCtrl->>PostModel: create(title, slug, content, imagePath, authorId)
        activate PostModel
        PostModel-->>PostCtrl: recordCreatedInstance
        deactivate PostModel

        PostCtrl-->>PostView: redirectWithSuccessFlash('Berita berhasil disimpan')
        PostView-->>Pengurus: displaySuccessMessage()
    else Validasi Gagal
        PostCtrl-->>PostView: returnWithErrors(validationErrors)
        PostView-->>Pengurus: displayFormErrors()
    end
    deactivate PostCtrl
```

---

## 4. Sequence Diagram: Pengelolaan Agenda Kegiatan

```mermaid
sequenceDiagram
    autonumber
    actor Ketua as Ketua IPNU/IPPNU / Admin
    participant AgendaView as <<boundary>><br/>:AgendaCreateView
    participant AgendaCtrl as <<control>><br/>:AgendaController
    participant AgendaModel as <<entity>><br/>:Agenda

    Ketua->>AgendaView: getCreateAgendaPage()
    AgendaView-->>Ketua: renderFormInputAgenda()

    Ketua->>AgendaView: submitAgenda(title, date, location, price, quota)
    AgendaView->>AgendaCtrl: storeAgenda(requestPayload)
    activate AgendaCtrl

    AgendaCtrl->>AgendaCtrl: validasiDataAgenda()

    alt Validasi Sukses
        AgendaCtrl->>AgendaModel: create(title, date, location, price, quota)
        activate AgendaModel
        AgendaModel-->>AgendaCtrl: recordAgendaTersimpan
        deactivate AgendaModel

        AgendaCtrl-->>AgendaView: redirectWithSuccess('Agenda berhasil ditambahkan')
        AgendaView-->>Ketua: displaySuccessNotification()
    else Validasi Gagal
        AgendaCtrl-->>AgendaView: returnValidationErrors()
        AgendaView-->>Ketua: displayInputErrors()
    end
    deactivate AgendaCtrl
```

---

## 5. Sequence Diagram: Sinkronisasi Status Pembayaran Midtrans Manual

```mermaid
sequenceDiagram
    autonumber
    actor Pengurus as Ketua IPNU/IPPNU / Admin
    participant RegView as <<boundary>><br/>:RegistrationIndexView
    participant RegCtrl as <<control>><br/>:AgendaRegistrationController
    participant Gateway as <<external system>><br/>:MidtransGateway
    participant RegModel as <<entity>><br/>:AgendaRegistration

    Pengurus->>RegView: klikSyncMidtrans(registrationId)
    RegView->>RegCtrl: postSyncMidtrans(id)
    activate RegCtrl

    RegCtrl->>RegModel: findOrFail(id)
    activate RegModel
    RegModel-->>RegCtrl: returnRegistrationData(orderId)
    deactivate RegModel

    RegCtrl->>Gateway: getTransactionStatus(orderId)
    activate Gateway
    Gateway-->>RegCtrl: returnStatusResponse(transactionStatus)
    deactivate Gateway

    RegCtrl->>RegModel: update(payment_status, status)
    activate RegModel
    RegModel-->>RegCtrl: updateSuccess
    deactivate RegModel

    RegCtrl-->>RegView: redirectWithSuccess('Status pembayaran berhasil disinkronkan')
    RegView-->>Pengurus: updateTampilanTabelStatus()
    deactivate RegCtrl
```

---

## 6. Sequence Diagram: Manajemen Pengguna / Users (Admin Only)

```mermaid
sequenceDiagram
    autonumber
    actor Admin as Administrator
    participant UserView as <<boundary>><br/>:UserCreateView
    participant UserCtrl as <<control>><br/>:UserController
    participant UserModel as <<entity>><br/>:User

    Admin->>UserView: getCreateUserPage()
    UserView-->>Admin: renderFormTambahUser()

    Admin->>UserView: submitUser(name, email, password, role)
    UserView->>UserCtrl: storeUser(requestPayload)
    activate UserCtrl

    UserCtrl->>UserCtrl: validasiEmailUnikDanPassword()

    alt Validasi Berhasil
        UserCtrl->>UserCtrl: hashPassword(bcrypt)
        UserCtrl->>UserModel: create(name, email, hashedPassword, role)
        activate UserModel
        UserModel-->>UserCtrl: userRecordCreated
        deactivate UserModel

        UserCtrl-->>UserView: redirectWithSuccess('Pengguna berhasil dibuat')
        UserView-->>Admin: displayUpdatedUserList()
    else Validasi Gagal
        UserCtrl-->>UserView: returnValidationErrors('Email sudah digunakan / password tidak valid')
        UserView-->>Admin: displayErrorAlert()
    end
    deactivate UserCtrl
```
