# BAB II
# LANDASAN TEORI

## 2.1. Landasan Teori

Dalam pengembangan Sistem Informasi Profil Organisasi dan Kegiatan pada PKPT IPNU IPPNU UNSIQ, sebuah organisasi kemahasiswaan yang berada di Wonosobo, Jawa Tengah, penting untuk merujuk pada literatur yang relevan yang mendukung konsep proyek ini. Beberapa studi yang dapat dijadikan acuan antara lain:

### 2.1.1. Pratama dan Ramadhani (2022) – "Rancang Bangun Sistem Informasi Profil dan Publikasi Kegiatan Berbasis Web Menggunakan Framework Laravel"

Mengembangkan sistem informasi profil dan publikasi kegiatan organisasi berbasis web dengan memanfaatkan *framework* Laravel. Sistem tersebut dirancang untuk mengatasi penyebaran informasi organisasi yang sebelumnya masih mengandalkan media sosial, dengan menyediakan satu portal terpadu yang memuat profil organisasi, struktur kepengurusan, serta publikasi kegiatan. Hasil penelitian menunjukkan bahwa pemanfaatan *framework* Laravel mampu mempercepat proses pengembangan karena pola arsitektur MVC yang dimilikinya telah memisahkan logika data, tampilan, dan pengaturan alur aplikasi ke dalam komponen-komponen yang berdiri sendiri. Namun, penelitian tersebut masih terbatas pada penyajian informasi satu arah dan belum menyertakan panel administrasi yang memungkinkan pengurus memperbarui konten secara mandiri. Penulis mengambil referensi dari sistem ini dalam hal pemanfaatan *framework* Laravel beserta pola MVC-nya untuk membangun portal profil organisasi, serta mengembangkannya menjadi sistem yang dilengkapi panel administrasi terproteksi sehingga pengurus dapat mengelola profil, berita, artikel, galeri, dan agenda secara mandiri tanpa melibatkan pengembang (Pratama & Ramadhani, 2022).

### 2.1.2. Lestari dan Wijaya (2024) – "Pengembangan Sistem Informasi Manajemen Konten (CMS) Berbasis Web untuk Pengarsipan Dokumentasi Kegiatan Organisasi"

Mengembangkan sistem informasi manajemen konten berbasis web yang dikhususkan untuk mengarsipkan dokumentasi kegiatan organisasi. Penelitian ini berangkat dari persoalan dokumentasi kegiatan yang selama ini tersimpan secara tersebar pada perangkat pribadi masing-masing pengurus, sehingga rawan hilang dan sulit dilacak kembali. Melalui sistem yang dibangun, seluruh berkas dokumentasi tersimpan terpusat dalam basis data dan dapat ditelusuri kembali berdasarkan kategori kegiatan. Hasil penelitian menunjukkan bahwa penerapan konsep CMS mampu memindahkan kendali pengelolaan konten dari pengembang kepada pengurus organisasi yang tidak menguasai pemrograman. Namun, sistem tersebut masih berfokus pada pengarsipan dan belum mengintegrasikan dokumentasi dengan publikasi kegiatan pada satu portal yang sama. Penulis mengambil referensi dari sistem ini dalam hal penerapan konsep CMS dan pengarsipan dokumentasi terpusat, serta mengembangkannya dengan menggabungkan modul galeri, berita, artikel, dan agenda ke dalam satu portal organisasi yang saling terhubung (Lestari & Wijaya, 2024).

### 2.1.3. Handayani dan Putra (2022) – "Pemanfaatan Sistem Informasi Berbasis Web sebagai Media Promosi dan Publikasi Kegiatan Organisasi"

Mengembangkan sistem informasi berbasis web yang difungsikan sebagai media promosi sekaligus sarana publikasi kegiatan organisasi. Penelitian ini menunjukkan bahwa keberadaan portal organisasi mampu memperluas jangkauan penyebaran informasi kepada khalayak yang lebih luas dibandingkan media sosial, karena setiap halaman memiliki alamat tersendiri yang dapat dibagikan dan dapat ditemukan melalui mesin pencari. Selain itu, informasi yang dipublikasikan tersimpan permanen dan tidak tenggelam oleh unggahan baru sebagaimana terjadi pada media sosial. Hasil penelitian menyimpulkan bahwa sistem informasi berbasis web efektif meningkatkan eksistensi organisasi di mata anggota maupun calon anggota. Penulis mengambil referensi dari sistem ini dalam hal pemanfaatan portal web sebagai sarana promosi dan publikasi, serta mengembangkannya dengan melengkapi portal tersebut menggunakan panel administrasi, pengaturan tampilan situs, serta pengendalian hak akses berbasis peran (Handayani & Putra, 2022).

## 2.2. Sistem Informasi

Sistem informasi merupakan sekumpulan komponen yang saling berinteraksi untuk mengumpulkan, mengolah, menyimpan, dan menyebarkan data menjadi informasi yang bermanfaat guna mendukung pengambilan keputusan dan pengendalian dalam suatu organisasi. Sistem informasi adalah sebuah sistem yang terdiri atas kombinasi manusia, perangkat keras, perangkat lunak, jaringan komunikasi, dan sumber daya data yang dirancang untuk mengolah data menjadi informasi yang berguna (Ramdani, Jannah, Pamuji, & Handayani, 2024). Sistem ini bekerja berdasarkan prinsip masukan (*input*), pemrosesan (*process*), keluaran (*output*), umpan balik (*feedback*), dan kontrol (*control*), yang seluruhnya dirancang agar dapat meningkatkan produktivitas dan efisiensi operasional suatu organisasi.

Sistem informasi tidak hanya sekadar alat bantu teknis, melainkan juga menjadi fondasi dalam merancang proses kerja yang lebih efisien, akurat, dan terstruktur. Dalam konteks organisasi kemahasiswaan, sistem informasi memegang peran penting untuk mendukung proses penyebaran informasi profil organisasi, publikasi kegiatan, pengarsipan dokumentasi, dan pengelolaan data keanggotaan. Hal ini ditunjukkan oleh Ramdani et al. (2024) yang merancang sistem informasi desa berbasis web di Desa Kalimati. Sistem tersebut dibangun dengan *framework* Laravel dan dilengkapi fitur profil desa, data penduduk, berita, galeri, serta UMKM, yang keseluruhannya dikelola melalui satu panel administrasi terpadu.

Melalui sistem yang dikembangkan, pengurus dapat memperbarui informasi kapan saja tanpa harus menyerahkan pekerjaan tersebut kepada pengembang, sedangkan masyarakat dapat mengakses informasi tersebut secara terbuka melalui peramban. Proses pelaporan dan penelusuran kembali riwayat kegiatan pun menjadi lebih mudah karena seluruh data telah tersimpan dalam basis data dan dapat ditampilkan kembali dalam bentuk halaman digital. Penerapan sistem informasi berbasis web ini secara nyata telah meningkatkan efisiensi pengelolaan data, memperkuat transparansi, serta mempermudah akses digital terhadap informasi organisasi bagi warga (Ramdani et al., 2024). Hal ini sejalan dengan fungsi utama sistem informasi, yaitu sebagai alat bantu dalam menyediakan informasi yang tepat guna, tepat waktu, dan relevan bagi pihak yang membutuhkan.

## 2.3. Sistem Informasi Profil Organisasi dan Kegiatan

Sistem informasi profil organisasi dan kegiatan merupakan bentuk penerapan sistem informasi yang dikhususkan untuk mengelola identitas serta rekam jejak kegiatan sebuah organisasi. Sistem ini memuat paling tidak empat komponen utama, yaitu profil organisasi yang berisi sejarah, visi dan misi, serta struktur kepengurusan; publikasi kegiatan yang berisi berita dan artikel; dokumentasi kegiatan dalam bentuk galeri; serta agenda kegiatan yang memuat jadwal penyelenggaraan program kerja (Zaeladi, Raihan, Zilullah, & Sutriyono, 2026).

Kebutuhan akan sistem semacam ini semakin mendesak mengingat pengelolaan informasi organisasi kemahasiswaan masih banyak dilakukan secara tersebar. Setiawan dan Nugroho (2023) menunjukkan bahwa penggunaan situs web memberikan keunggulan yang jelas dibandingkan media sosial sebagai sarana informasi publik organisasi kemahasiswaan, terutama karena informasi yang dipublikasikan tersimpan permanen, terstruktur berdasarkan kategori, dan tidak tergantikan oleh unggahan baru. Media sosial unggul dalam hal kecepatan penyebaran, tetapi lemah dalam hal pengarsipan dan penelusuran kembali, karena unggahan lama akan tergeser oleh unggahan baru dan sulit ditemukan kembali.

Dalam Sistem Informasi Profil Organisasi dan Kegiatan PKPT IPNU IPPNU UNSIQ, keempat komponen tersebut diwujudkan ke dalam modul-modul yang saling terhubung. Modul profil memuat sejarah, visi dan misi, serta struktur organisasi yang dikelola melalui pengaturan halaman. Modul berita dan artikel memuat publikasi kegiatan organisasi. Modul galeri menyimpan dokumentasi kegiatan dalam bentuk foto. Modul agenda memuat jadwal kegiatan yang akan datang. Seluruh modul tersebut dikelola melalui satu panel administrasi yang sama, sehingga pengurus tidak perlu berpindah-pindah platform untuk memperbarui informasi organisasi (Zaeladi et al., 2026).

## 2.4. Aplikasi Berbasis Web

Aplikasi berbasis web adalah perangkat lunak yang dijalankan menggunakan peramban (*web browser*) melalui jaringan internet atau intranet, tanpa memerlukan pemasangan perangkat lunak tambahan pada komputer pengguna. Setiap halaman aplikasi memiliki alamat (*Uniform Resource Locator* atau URL) yang unik, sehingga dapat diakses secara langsung dan dibagikan kepada khalayak luas (Ramdani et al., 2024). Sifat inilah yang membedakan aplikasi berbasis web dari aplikasi berbasis desktop, yang harus dipasang terlebih dahulu pada setiap perangkat yang digunakan.

Keunggulan utama aplikasi berbasis web terletak pada kemudahan aksesibilitas dan kemudahan pemeliharaan. Dari sisi aksesibilitas, pengguna dapat mengakses informasi dari berbagai perangkat, baik komputer maupun telepon pintar, selama perangkat tersebut terhubung ke internet dan memiliki peramban. Dari sisi pemeliharaan, seluruh pembaruan dilakukan secara terpusat pada sisi *server*, sehingga pengguna selalu memperoleh versi terbaru tanpa perlu melakukan pemutakhiran secara manual (Ramdani et al., 2024). Hal ini berbeda dengan aplikasi desktop yang mengharuskan setiap pengguna memperbarui perangkat lunaknya masing-masing.

Dalam hal pengelolaan konten, aplikasi berbasis web umumnya mengadopsi prinsip *Content Management System* (CMS), yaitu perangkat lunak untuk membuat, mengelola, dan mempublikasikan konten digital ke dalam sebuah situs web. Pendekatan CMS yang modular memungkinkan pihak yang tidak menguasai pemrograman untuk tetap dapat memelihara konten secara mandiri melalui antarmuka manajemen yang dibatasi hanya untuk pengurus. Zaeladi et al. (2026) menunjukkan bahwa pendekatan CMS modular yang dikembangkan secara terstruktur efektif memulihkan fungsi representasi publik sebuah portal sekaligus memindahkan kendali konten dari pengembang kepada staf manajemen non-teknis. Temuan ini menjadi dasar mengapa Sistem Informasi Profil Organisasi dan Kegiatan PKPT IPNU IPPNU UNSIQ dirancang sebagai CMS berbasis web, bukan sebagai aplikasi desktop.

## 2.5. Framework Laravel

Laravel merupakan kerangka kerja (*framework*) PHP yang bersifat sumber terbuka (*open-source*) dan dirancang untuk meningkatkan kualitas perangkat lunak dengan mengurangi biaya pengembangan serta mempermudah pemeliharaan kode. PHP sendiri merupakan bahasa pemrograman skrip yang berjalan di sisi *server* dan didesain terutama untuk pengembangan aplikasi web. Laravel menjadi pilihan dalam pembangunan sistem ini karena menyediakan sintaks yang ekspresif dan elegan serta arsitektur yang terstruktur, sehingga pengembang dapat membangun aplikasi web yang kompleks dengan lebih cepat (Ariyanto, Farhan, Rachmad, & Puspitasari, 2024). Keunggulan tersebut dibuktikan melalui perbandingan langsung antara Laravel dan PHP *native* dalam pembuatan REST API, yang menunjukkan bahwa Laravel mampu menekan jumlah baris kode dan mempercepat proses pengembangan secara signifikan.

Berikut adalah fitur-fitur utama Laravel yang diimplementasikan dalam Sistem Informasi Profil Organisasi dan Kegiatan ini.

### 2.5.1. Arsitektur Model-View-Controller (MVC)

Laravel menggunakan pola desain MVC yang memisahkan logika aplikasi menjadi tiga komponen utama untuk mempermudah pengelolaan kode:

- **Model**, yaitu bagian yang mengelola data dan logika bisnis serta berinteraksi langsung dengan basis data MySQL;
- **View**, yaitu bagian yang bertanggung jawab atas tampilan antarmuka pengguna yang akan dilihat oleh pengguna sistem;
- **Controller**, yaitu bagian yang bertindak sebagai jembatan yang memproses permintaan pengguna, mengambil data melalui Model, dan mengirimkannya kembali ke View.

Pemisahan ini memastikan bahwa perubahan pada tampilan tidak akan mengganggu logika data, sehingga sistem lebih mudah dikembangkan dan dirawat di masa mendatang (Ariyanto et al., 2024).

Arsitektur MVC pada Laravel juga menjadi fondasi pengembangan REST API, yaitu gaya arsitektur yang memanfaatkan sumber daya (*resource*) yang diidentifikasi melalui URL dan dioperasikan melalui metode HTTP standar, yaitu GET, POST, PUT, dan DELETE. REST API inilah yang menjadi jembatan antara *backend* Laravel dan *frontend* React, sehingga kedua sisi dapat dikembangkan secara paralel tanpa saling mengganggu (Putra, Efendi, Tamam, & Pramadi, 2025). Kajian literatur terhadap integrasi Laravel dan React menunjukkan bahwa kombinasi keduanya menawarkan fleksibilitas tinggi dalam membangun aplikasi yang berskala, mudah dirawat, dan responsif.

### 2.5.2. Eloquent ORM (Object Relational Mapper)

Salah satu keunggulan utama Laravel adalah fitur Eloquent ORM, yaitu kerangka kerja pemetaan basis data yang beroperasi berdasarkan prinsip *object-relational mapping*. Prinsip ini memungkinkan setiap tabel pada basis data diwakili sebagai sebuah objek kelas PHP, di mana setiap baris tabel menjadi *instance* dari objek tersebut dan setiap kolom menjadi milik (*property*) objek. Dengan desain seperti ini, seluruh operasi data ditulis langsung menggunakan sintaks PHP yang ekspresif, sehingga pengembang tidak perlu menyusun kueri SQL yang panjang dan kompleks secara manual (Ariyanto et al., 2024).

Eloquent menyediakan himpunan metode yang kaya untuk mendukung empat operasi dasar data, yaitu *Create, Read, Update, Delete* (CRUD). Pembentukan data baru dilakukan melalui metode *create*, pengambilan data menggunakan metode *find*, *where*, atau *first*, perubahan data dieksekusi dengan metode *save* atau *update*, sedangkan penghapusan data dilakukan melalui metode *delete*. Selain itu, Eloquent juga menyediakan fitur relasi, seperti *hasMany*, *belongsTo*, dan *hasOne*, yang berfungsi membangun hubungan antar model sesuai dengan struktur basis data relasional yang dirancang (Aulia, Candra, & Fauziyyah, 2025).

Pada penerapannya di PKPT IPNU IPPNU UNSIQ, Eloquent ORM diwujudkan dalam sepuluh model yang mencerminkan struktur basis data relasional, yaitu model Pengguna untuk mengelola akun administrator, model Halaman untuk mengelola konten profil, model Berita dan model Artikel untuk mengelola publikasi, model Galeri untuk mengelola dokumentasi foto, model Agenda untuk mengelola jadwal kegiatan, model Anggota untuk mengelola data keanggotaan, model Statistik untuk mengelola data ringkasan organisasi, model Kutipan untuk mengelola kutipan motivasi, serta model Pengaturan Situs untuk mengelola identitas situs. Melalui model-model tersebut, seluruh modul sistem dapat mengakses dan memproses data secara terstruktur dan konsisten, sehingga risiko kesalahan akibat penulisan kueri langsung dapat ditekan seminimal mungkin (Ariyanto et al., 2024).

### 2.5.3. Keamanan pada Laravel

Keamanan merupakan salah satu faktor paling krusial dalam sistem informasi berbasis web, mengingat sistem menyimpan berbagai data yang bersifat sensitif, mulai dari data akun administrator hingga data keanggotaan organisasi. Kerentanan keamanan, baik berupa akses ilegal, perubahan data tanpa izin, maupun kebocoran informasi, dapat merusak kredibilitas organisasi serta mengurangi kepercayaan pengguna. Oleh karena itu, *framework* Laravel dirancang dengan menempatkan keamanan sebagai bagian inti dari kerangka kerja, sehingga berbagai mekanisme perlindungan telah tersedia secara bawaan dan tidak perlu dibangun kembali dari awal oleh pengembang (Ariyanto et al., 2024).

Beberapa fitur keamanan Laravel yang diimplementasikan pada sistem yang dibangun meliputi:

- **Penyimpanan kata sandi yang aman.** Seluruh kata sandi administrator disamarkan menggunakan algoritma *hashing* searah yang kuat, yaitu Bcrypt, sehingga kata sandi asli tidak pernah tersimpan dalam bentuk teks biasa di dalam basis data. Karena *hashing* searah tidak dapat dibalik, maka meskipun basis data diakses oleh pihak yang tidak berwenang, kata sandi pengguna tetap tidak dapat dibaca kembali.
- **Proteksi *Cross-Site Request Forgery* (CSRF).** Sistem secara otomatis menyisipkan token tersembunyi pada setiap formulir dan permintaan HTTP, yang kemudian divalidasi oleh *server* Laravel sebelum permintaan diproses. Mekanisme ini mencegah pihak ketiga memalsukan sesi pengguna yang sah untuk melakukan tindakan, seperti mengubah konten atau memanipulasi data, tanpa sepengetahuan pemilik akun.
- **Pencegahan *SQL Injection*.** Setiap masukan dari pengguna secara otomatis difilter melalui mekanisme *parameter binding* pada Eloquent, sehingga masukan pengguna selalu diperlakukan sebagai data dan bukan sebagai bagian dari perintah SQL. Dengan demikian, upaya penyisipan perintah jahat melalui kolom-kolom formulir dapat dicegah secara efektif.

Pada konteks Sistem Informasi Profil Organisasi dan Kegiatan PKPT IPNU IPPNU UNSIQ, mekanisme keamanan tersebut diperkuat dengan pengendalian akses berbasis peran (*role-based access control*). Hanya administrator, yaitu pengurus yang telah melewati proses autentikasi, yang memperoleh hak untuk mengakses panel manajemen konten dan melakukan manipulasi data profil, berita, artikel, galeri, agenda, dan keanggotaan. Sementara itu, pengguna publik dibatasi hanya pada hak membaca konten yang dipublikasikan. Melalui kombinasi mekanisme-mekanisme tersebut, integritas, kerahasiaan, dan ketersediaan data organisasi dapat dijaga secara konsisten meskipun sistem diakses oleh banyak pengguna pada waktu yang bersamaan (Zaeladi et al., 2026).

## 2.6. Teknologi React

React merupakan pustaka (*library*) JavaScript yang dirancang untuk membangun antarmuka pengguna yang interaktif dan dinamis. Berbeda dengan teknologi *templating* di sisi *server*, React memungkinkan pengembang menyusun antarmuka dari potongan-potongan komponen kecil yang dapat digunakan ulang (*reusable*), sehingga perubahan pada satu bagian tampilan tidak mengganggu bagian lainnya (Putra et al., 2025). React menjadi teknologi pada sisi *front-end* dari sistem ini, sejalan dengan Laravel yang bertindak sebagai *back-end* penyedia API.

Secara teknis, React mengelola antarmuka melalui *Virtual DOM*, yaitu representasi ringan dari DOM asli yang membuat proses pembaruan tampilan menjadi jauh lebih efisien karena hanya bagian yang berubah saja yang dirender ulang. React menggunakan sintaks JSX (*JavaScript XML*) yang memungkinkan penulisan *markup* antarmuka langsung di dalam kode JavaScript, serta memiliki mekanisme *state* yang memungkinkan tampilan diperbarui secara otomatis setiap kali data berubah. Untuk menghubungkan antarmuka React dengan *backend* Laravel, digunakan pustaka Axios sebagai penghubung permintaan asinkron antara *frontend* dan *backend*, yang membuat penanganan pertukaran data menjadi lebih mudah dan performa aplikasi dapat ditingkatkan (Putra et al., 2025).

Sistem yang dirancang menerapkan pola *Single Page Application* (SPA), yaitu pola arsitektur aplikasi web di mana halaman tidak dimuat ulang secara penuh setiap kali berpindah tampilan; yang terjadi hanya pembaruan sebagian konten secara dinamis sesuai dengan interaksi pengguna. Kajian terhadap praktik terbaik integrasi Laravel dan React menunjukkan bahwa penerapan pola SPA memberikan pengalaman pengguna yang lebih responsif, dengan catatan bahwa pengelolaan autentikasi, sinkronisasi data, dan pengaturan lintas domain perlu ditangani secara memadai (Putra et al., 2025). Implementasi teknologi React di PKPT IPNU IPPNU UNSIQ difokuskan pada optimalisasi pengalaman pengguna, baik pada halaman publik yang memuat profil, berita, artikel, galeri, dan agenda, maupun pada dasbor admin untuk pengelolaan konten dan pengaturan situs.

## 2.7. MySQL

MySQL merupakan sistem manajemen basis data relasional (*Relational Database Management System* atau RDBMS) yang menggunakan bahasa kueri terstruktur (*Structured Query Language* atau SQL) sebagai standar untuk mengelola data. Basis data berperan sebagai lapisan penyimpanan yang bertugas menyimpan dan mengorganisasi informasi secara sistematis, sehingga data dapat dengan mudah ditemukan, dikelola, dan digunakan oleh aplikasi (Ramdani et al., 2024). Dalam arsitektur pengembangan web, MySQL berperan sebagai lapisan penyimpanan (*storage layer*) yang mengorganisasi data dalam bentuk tabel-tabel yang saling terhubung melalui relasi tertentu.

MySQL menjadi pilihan dalam pengembangan aplikasi berbasis *framework* Laravel karena sifatnya yang *open-source*, memiliki kinerja yang stabil, serta tingkat keamanan data yang andal. Pemilihan MySQL juga didasarkan pada kemudahan integrasinya dengan bahasa pemrograman PHP dan dengan fitur Eloquent ORM pada Laravel, sehingga pengembang dapat melakukan manipulasi data tanpa kueri SQL yang rumit (Ariyanto et al., 2024). Beberapa keunggulan MySQL yang mendasari penggunaannya dalam sistem ini adalah sebagai berikut:

- **Skalabilitas dan performa.** MySQL mampu menangani pengolahan data dalam jumlah besar dengan kecepatan akses yang tinggi, yang penting untuk proses penelusuran konten dan data kegiatan secara *real-time*.
- **Integritas data.** MySQL mendukung fitur *Foreign Key* yang memastikan hubungan antar tabel tetap konsisten, sehingga meminimalkan risiko ketidakteraturan data.
- **Kemudahan integrasi.** MySQL memiliki kompatibilitas yang sangat baik dengan PHP dan Eloquent ORM pada Laravel, sebagaimana telah dibahas pada sub-bab 2.5.2.

Dalam Sistem Informasi Profil Organisasi dan Kegiatan PKPT IPNU IPPNU UNSIQ, MySQL digunakan untuk menyimpan seluruh informasi secara terintegrasi, mulai dari data pengguna, pengaturan halaman profil, berita, artikel, galeri, agenda, anggota, statistik, kutipan, hingga pengaturan identitas situs. Perancangan struktur tabelnya diarahkan melalui tahapan perancangan basis data sebagaimana diuraikan pada sub-bab 2.11 (Karnasyah, Al Islami, & Wibisono, 2025).

## 2.8. UI/UX

UI dan UX merupakan dua aspek yang saling melengkapi dalam perancangan sebuah aplikasi atau situs web. UI atau *User Interface* berkaitan dengan tampilan visual yang dihadapi pengguna, sedangkan UX atau *User Experience* berkaitan dengan pengalaman dan kesan yang dirasakan pengguna ketika berinteraksi dengan sistem tersebut. Dalam pengembangan sistem berbasis web, desain UI/UX sangat penting untuk memberikan kemudahan, kenyamanan, dan kejelasan dalam interaksi antara pengguna dan sistem (Risyda, Gardenia, Awaludin, & Rehatalanit, 2024).

### 2.8.1. User Interface (UI)

*User Interface* (UI) adalah ilmu tentang tata letak grafis suatu situs web atau aplikasi. Cakupan UI meliputi tombol yang akan diklik oleh pengguna, teks, gambar, kolom isian, dan seluruh item yang berinteraksi dengan pengguna, termasuk tata letak, animasi, transisi, dan interaksi-interaksi kecil yang terjadi pada halaman. Seorang perancang UI menangani elemen visual seperti penentuan skema warna, bentuk tombol, serta jenis huruf yang digunakan untuk teks. Perancang UI harus mampu menghasilkan tampilan yang baik karena tampilan tersebut akan memengaruhi kesan pertama dan pada akhirnya memengaruhi kesetiaan pengguna terhadap sistem (Risyda et al., 2024).

### 2.8.2. User Experience (UX)

*User Experience* (UX) berkaitan dengan upaya menghasilkan produk yang bermanfaat dan memvisualisasikan alur pengguna menjadi desain produk yang teruji. Perancang UX bekerja sama dengan pihak-pihak lain untuk mencari titik temu antara kebutuhan pengguna, tujuan organisasi, dan kemajuan teknologi. Titik temu tersebut kemudian diwujudkan menjadi sebuah produk yang bermakna, berguna, dan menyenangkan untuk digunakan. Seperti namanya, desain yang dihasilkan oleh perancang UX akan menentukan mudah atau sulitnya pengalaman pengguna dalam berinteraksi dengan sistem. Membuat *wireframe* atau merancang *mockup* merupakan salah satu kemampuan dasar yang harus dimiliki oleh seorang perancang UX (Risyda et al., 2024).

Pada Sistem Informasi Profil Organisasi dan Kegiatan PKPT IPNU IPPNU UNSIQ, perancangan antarmuka dilakukan dengan mempertimbangkan dua kelompok pengguna yang berbeda, yaitu pengunjung publik yang memerlukan kemudahan dalam menelusuri informasi, dan pengurus yang memerlukan kemudahan dalam mengelola konten melalui panel administrasi. Pendekatan yang digunakan adalah *User-Centered Design*, yaitu pendekatan perancangan yang menempatkan kebutuhan pengguna sebagai pertimbangan utama pada setiap tahap perancangan (Risyda et al., 2024).

## 2.9. Diagram UML

*Unified Modeling Language* (UML) adalah bahasa pemodelan standar yang digunakan untuk mendokumentasikan, merancang, dan membangun sistem perangkat lunak. UML menyediakan serangkaian diagram yang menggambarkan sistem dari berbagai sudut pandang, sehingga kebutuhan sistem dapat digambarkan secara visual dan terstruktur sebelum diimplementasikan ke dalam kode program (Narulita, Nugroho, & Abdillah, 2024). UML membantu menggambarkan dan merancang sistem, khususnya pada pemrograman berorientasi objek. Pada penelitian ini, empat jenis diagram UML digunakan untuk memodelkan Sistem Informasi Profil Organisasi dan Kegiatan, yaitu *use case diagram*, *class diagram*, *activity diagram*, dan *sequence diagram*. Keempat diagram tersebut dibahas secara rinci pada BAB IV.

### 2.9.1. Use Case Diagram

*Use case diagram* merupakan pemodelan perilaku (*behavior*) dari sistem informasi yang akan dibuat. *Use case* mendeskripsikan interaksi antara satu atau lebih aktor dengan sistem, sehingga diketahui fungsi apa saja yang ada di dalam sistem dan siapa saja yang berhak menggunakan fungsi-fungsi tersebut (Narulita et al., 2024). *Use case diagram* dalam penelitian ini digunakan untuk memetakan hak akses aktor admin, yaitu pengurus, dan aktor publik, yaitu masyarakat, terhadap setiap modul sistem.

@@TABEL Tabel 2.1 Simbol *Use Case Diagram*
@@SUMBER Narulita et al. (2024)

| Simbol | Nama | Keterangan |
|---|---|---|
| @@IMG:simbol/usecase-aktor.png | Aktor | Digunakan untuk mewakili peran orang, objek, atau alat |
| @@IMG:simbol/usecase-usecase.png | *Use case* | Urutan aksi-aksi yang ditampilkan oleh sistem |
| @@IMG:simbol/usecase-association.png | *Association* | Penghubung antara aktor dengan *use case* |
| @@IMG:simbol/usecase-generalization.png | *Generalization* | Menunjukkan spesifikasi aktor untuk dapat berpartisipasi dengan *use case* |
| @@IMG:simbol/usecase-include.png | *Include* | Menunjukkan suatu *use case* merupakan fungsionalitas dari *use case* lain |
| @@IMG:simbol/usecase-extend.png | *Extend* | Menunjukkan suatu *use case* merupakan tambahan fungsional dari *use case* lain jika kondisi terpenuhi |

### 2.9.2. Class Diagram

*Class diagram* adalah diagram yang digunakan untuk memodelkan struktur statis suatu sistem dengan menggambarkan kelas-kelas beserta atribut, metode, serta hubungan antar kelas. *Class diagram* menggambarkan dan mendeskripsikan kelas, atribut, dan objek beserta hubungan satu sama lain, sehingga mampu memberikan pandangan global atas sebuah sistem (Ramdany, Kaidar, Aguchino, Putri, & Anggie, 2024). Diagram ini berfungsi untuk menjelaskan tipe objek dalam sistem dan kaitannya dengan objek lain, serta umum digunakan pada pemodelan sistem berorientasi objek.

Setiap kelas digambarkan sebagai persegi panjang yang dibagi menjadi tiga bagian, yaitu bagian atas memuat nama kelas, bagian tengah memuat atribut, dan bagian bawah memuat metode atau operasi. Atribut dan metode pada kelas memiliki notasi visibilitas yang menyatakan batas aksesnya, yaitu `+` untuk *public* yang dapat diakses dari kelas lain, `-` untuk *private* yang hanya dapat diakses di dalam kelas itu sendiri, dan `#` untuk *protected* yang dapat diakses oleh kelas tersebut beserta kelas turunannya (Object Management Group, 2017). Hubungan antar kelas memiliki keterangan yang disebut multiplisitas atau kardinalitas, yang menyatakan jumlah objek yang terlibat dalam hubungan tersebut (Ramdany et al., 2024).

@@TABEL Tabel 2.2 Simbol *Class Diagram*
@@SUMBER Ramdany et al. (2024)

| Simbol | Nama | Keterangan |
|---|---|---|
| @@IMG:simbol/class-kelas.png | Kelas | Struktur dasar sistem yang memuat nama kelas, atribut, dan metode |
| @@IMG:simbol/class-asosiasi.png | Asosiasi / *association* | Relasi antar kelas dengan makna umum, biasanya disertai dengan *multiplicity* |
| @@IMG:simbol/class-asosiasi-berarah.png | Asosiasi berarah / *directed association* | Relasi antar kelas dengan makna kelas yang satu digunakan oleh kelas yang lain |
| @@IMG:simbol/class-generalisasi.png | Generalisasi | Relasi antar kelas dengan makna generalisasi-spesialisasi (umum-khusus) |
| @@IMG:simbol/class-dependensi.png | Kebergantungan / *dependency* | Relasi antar kelas dengan makna ketergantungan antar kelas |
| @@IMG:simbol/class-agragasi.png | Agragasi / *aggregation* | Relasi antar kelas dengan makna keseluruhan-bagian (*whole-part*) |
| @@IMG:simbol/class-multiplisitas.png | Multiplisitas | Keterangan jumlah objek yang terlibat, misalnya 1, 0..1, 1..*, dan 0..* |

### 2.9.3. Activity Diagram

*Activity diagram* menggambarkan aliran kerja (*workflow*) atau aktivitas dari sebuah sistem atau proses bisnis, baik yang bersifat sekuensial maupun paralel. *Activity diagram* menggambarkan proses-proses yang terjadi pada sebuah sistem, di mana tindakan kondisional dilukiskan dengan cabang (*branch*) atau penyatuan (*merge*) (Narulita et al., 2024). *Activity diagram* digunakan dalam penelitian ini untuk memodelkan alur proses autentikasi administrator, alur pengelolaan konten, serta alur publikasi kegiatan, sehingga logika bisnis tiap proses dapat divisualisasikan dengan jelas sebelum diimplementasikan.

@@TABEL Tabel 2.3 Simbol *Activity Diagram*
@@SUMBER Narulita et al. (2024)

| Simbol | Nama | Keterangan |
|---|---|---|
| @@IMG:simbol/activity-start.png | *Start point* | Status awal dari sebuah diagram aktivitas |
| @@IMG:simbol/activity-activity.png | *Activity* | Aktivitas yang dilakukan oleh sistem |
| @@IMG:simbol/activity-join.png | *Join* / *Fork* | Penggabungan dari lebih dari satu aktivitas menjadi satu |
| @@IMG:simbol/activity-decision.png | *Decision* | Menunjukkan percabangan di mana ada pilihan aktivitas yang lebih dari satu |
| @@IMG:simbol/activity-swimlane.png | *Swimlane* | Memisahkan organisasi bisnis yang bertanggung jawab terhadap aktivitas yang terjadi |
| @@IMG:simbol/activity-finish.png | *Finish point* | Menunjukkan status akhir dari sebuah aktivitas |

### 2.9.4. Sequence Diagram

*Sequence diagram* merupakan diagram yang digunakan untuk memodelkan interaksi antar objek dalam suatu sistem secara berurutan berdasarkan waktu. *Sequence diagram* menjelaskan interaksi antar objek yang disusun dalam suatu urutan waktu atau kejadian, dan menampilkan pesan dalam suatu waktu tertentu. Diagram ini biasanya dipakai untuk memodelkan gambaran tentang sebuah atau beberapa *use case* yang menggambarkan hubungan antar aktor dan logika pesan (Narulita et al., 2024). *Sequence diagram* digunakan dalam penelitian ini untuk merinci skenario autentikasi administrator, skenario publikasi konten, serta skenario pengolahan data keanggotaan.

@@TABEL Tabel 2.4 Simbol *Sequence Diagram*
@@SUMBER Narulita et al. (2024)

| Simbol | Nama | Keterangan |
|---|---|---|
| @@IMG:simbol/usecase-aktor.png | Aktor | Digunakan untuk mewakili peran pengguna |
| @@IMG:simbol/sequence-lifeline.png | *Lifeline* | Objek antarmuka yang saling berinteraksi |
| @@IMG:simbol/sequence-control.png | *Control* | Untuk membuat aplikasi dengan memisahkan data dari tampilan dan cara bagaimana memprosesnya |
| @@IMG:simbol/sequence-boundary.png | *Boundary* | Pemisah antara sistem dan daerah di luar sistem |
| @@IMG:simbol/sequence-entity.png | *Entity* | Objek yang keberadaannya dapat dibedakan terhadap objek lain |
| @@IMG:simbol/sequence-activation.png | *Activation box* | Untuk merepresentasikan lama waktu untuk menyelesaikan tugas |
| @@IMG:simbol/sequence-message.png | *Message* | Untuk menandakan adanya data yang dikirim oleh suatu objek |

## 2.10. Entity Relationship Diagram (ERD)

*Entity Relationship Diagram* (ERD) adalah model konseptual yang menggambarkan entitas, yaitu objek yang datanya disimpan, atribut, yaitu karakteristik entitas, serta relasi, yaitu hubungan antar entitas, dalam sebuah sistem informasi. ERD merupakan teknik yang digunakan untuk memodelkan kebutuhan data suatu organisasi pada tahap analisis persyaratan proyek pengembangan sistem (Aulia, Candra, & Fauziyyah, 2025). ERD juga merupakan langkah awal perancangan basis data secara logis, yang kemudian ditransformasikan ke dalam model relasional dan struktur tabel fisik pada MySQL.

Perancangan basis data dengan ERD dilakukan melalui beberapa tahapan, yaitu analisis kebutuhan data, pemodelan entitas-relasi, transformasi ERD ke model relasional, normalisasi, serta perancangan basis data fisik (Aulia et al., 2025). Tahapan tersebut memastikan bahwa struktur tabel yang dihasilkan mampu menyimpan data secara konsisten dan menghindari pengulangan data yang tidak perlu.

ERD perlu dibedakan dari *class diagram* sebagaimana dibahas pada sub-bab 2.9.2. Meskipun keduanya sama-sama berbentuk kotak yang saling berhubungan, objek yang dimodelkan berbeda. *Class diagram* memodelkan kelas perangkat lunak yang memuat atribut **dan metode**, serta tidak mengenal *primary key* maupun *foreign key*. Sebaliknya, ERD memodelkan **entitas data atau tabel** yang hanya memuat atribut, serta mengenal *primary key* dan *foreign key* secara eksplisit. Dengan demikian, ERD bukan merupakan diagram UML, melainkan berasal dari pemodelan basis data relasional, sehingga pembahasannya ditempatkan pada sub-bab tersendiri dan tidak digabungkan ke dalam sub-bab 2.9.

@@TABEL Tabel 2.5 Simbol *Entity Relationship Diagram*
@@SUMBER Aulia et al. (2025)

| Simbol | Nama | Keterangan |
|---|---|---|
| @@IMG:simbol/erd-entitas.png | Entitas | Objek atau entitas dari sebuah rancangan basis data |
| @@IMG:simbol/erd-atribut.png | Atribut | Mendeskripsikan karakteristik dari entitas |
| @@IMG:simbol/erd-relasi.png | Relasi | Menggambarkan hubungan antar entitas |
| @@IMG:simbol/erd-garis.png | Garis | Penghubung antara relasi dengan entitas |
| @@IMG:simbol/erd-kardinalitas.png | Kardinalitas | Menyatakan jumlah keterhubungan antar entitas, misalnya satu ke satu (1:1), satu ke banyak (1:N), dan banyak ke banyak (N:M) |

ERD dalam penelitian ini memodelkan entitas pengguna, pengaturan halaman, berita, artikel, galeri, agenda, anggota, statistik, kutipan, dan pengaturan situs, beserta relasi antar entitas tersebut, yang kemudian ditransformasikan ke dalam struktur tabel pada MySQL.

## 2.11. Perancangan Basis Data

Perancangan basis data merupakan tahapan yang menerjemahkan kebutuhan data ke dalam struktur tabel yang siap diimplementasikan pada sistem manajemen basis data. Tahapan ini dimulai dari penyusunan model konseptual berupa ERD, dilanjutkan dengan transformasi ke model relasional, dan diakhiri dengan pembuatan struktur tabel fisik beserta relasinya (Karnasyah, Al Islami, & Wibisono, 2025). Perancangan yang baik ditandai oleh tidak adanya pengulangan data yang tidak perlu dan tidak adanya anomali pada saat data diperbarui, dihapus, atau ditambahkan.

Untuk mencapai hal tersebut, struktur tabel yang dirancang dinormalisasi melalui tahapan-tahapan berikut:

- **Bentuk Normal Pertama (1NF)**, yaitu memastikan setiap tabel memiliki *primary key* dan setiap atribut hanya memuat satu nilai pada setiap baris, tidak ada atribut yang berulang.
- **Bentuk Normal Kedua (2NF)**, yaitu memastikan setiap atribut yang bukan *primary key* bergantung penuh pada seluruh *primary key*, tidak hanya pada sebagian di antaranya.
- **Bentuk Normal Ketiga (3NF)**, yaitu memastikan tidak ada atribut yang bukan *primary key* bergantung pada atribut lain yang juga bukan *primary key*, sehingga ketergantungan transitif dapat dihilangkan.

Dalam Sistem Informasi Profil Organisasi dan Kegiatan PKPT IPNU IPPNU UNSIQ, perancangan basis data menghasilkan sepuluh tabel utama, yaitu tabel pengguna, tabel pengaturan halaman, tabel berita, tabel artikel, tabel galeri, tabel agenda, tabel anggota, tabel statistik, tabel kutipan, dan tabel pengaturan situs. Setiap tabel dilengkapi *primary key* yang berfungsi sebagai pengenal unik, sedangkan keterhubungan antar tabel dinyatakan melalui *foreign key*. Dengan struktur demikian, integritas data organisasi dapat dijaga secara konsisten dan setiap perubahan pada satu tabel tidak akan merusak keterhubungan data pada tabel lainnya (Karnasyah et al., 2025).

## 2.12. Black Box Testing

*Black box testing* merupakan metode pengujian perangkat lunak yang dilakukan dengan mengamati keluaran sistem berdasarkan masukan yang diberikan, tanpa memperhatikan struktur kode program di dalamnya. Pengujian ini berfokus pada pengujian fungsional, yaitu untuk mengetahui apakah seluruh fungsi pada aplikasi telah berjalan sesuai dengan spesifikasi dan kebutuhan pengguna (Hudi & Karyanti, 2024). Pengujian *black box* dipilih karena penguji tidak perlu memahami logika pemrograman yang digunakan, sehingga pengujian dapat dilakukan oleh pengguna akhir sekalipun.

Pengujian *black box* pada sistem informasi berbasis web umumnya dilakukan terhadap antarmuka sistem, dengan mengujikan sejumlah skenario yang mewakili kondisi masukan yang valid maupun tidak valid. Setiap skenario dicatat beserta hasil yang diharapkan dan hasil yang diamati, kemudian keduanya dibandingkan untuk menentukan apakah sistem dinyatakan lulus atau tidak lulus pada skenario tersebut (Hudi & Karyanti, 2024). Teknik yang lazim digunakan adalah *equivalence partitioning*, yaitu pengelompokan data uji ke dalam kelas-kelas yang diperkirakan akan diperlakukan sama oleh sistem, sehingga jumlah kasus uji dapat ditekan tanpa mengurangi cakupan pengujian.

Pada Sistem Informasi Profil Organisasi dan Kegiatan PKPT IPNU IPPNU UNSIQ, pengujian *black box* diterapkan pada seluruh modul, baik pada halaman publik yang diakses oleh pengunjung maupun pada panel administrasi yang diakses oleh pengurus. Hasil pengujian tersebut dilaporkan pada BAB IV.

## 2.13. Metode Waterfall

*Waterfall* (model air terjun) adalah model pengembangan perangkat lunak yang bersifat linear dan sekuensial, di mana setiap tahapan harus diselesaikan secara utuh sebelum melangkah ke tahapan berikutnya. Berdasarkan tinjauan literatur sistematis terhadap perbandingan efektivitas metode *Waterfall* dan *Agile* dalam pengembangan sistem informasi, metode *Waterfall* merupakan metode yang paling sering diterapkan karena sifatnya yang terstruktur dan berurutan, terutama pada proyek dengan persyaratan yang stabil dan telah terdefinisi sejak awal (Syaputri, Putra, Syahrani, Dwian, & Purwani, 2024). Model ini dipilih dalam Kerja Praktek ini karena kebutuhan sistem telah teridentifikasi dengan jelas melalui observasi dan wawancara pada tahap awal, serta menyediakan artefak dokumentasi yang lengkap pada setiap tahapannya.

Adapun tahapan-tahapan pengembangan yang dilaksanakan meliputi:

1. **Analisis Kebutuhan (*Requirements Analysis*)**, yaitu pengumpulan dan analisis kebutuhan sistem, baik fungsional maupun non-fungsional, melalui observasi, wawancara, dan studi pustaka.
2. **Perancangan Sistem (*System Design*)**, yaitu penerjemahan kebutuhan ke dalam rancangan sistem yang memuat pemodelan UML, perancangan basis data, serta perancangan antarmuka pengguna.
3. **Pembuatan Kode Program (*Implementation*)**, yaitu penulisan kode program, baik pada sisi *backend* dengan *framework* Laravel maupun pada sisi *frontend* dengan React.
4. **Pengujian Sistem (*Testing*)**, yaitu verifikasi dan validasi fungsionalitas sistem menggunakan metode *Black Box Testing* untuk memastikan setiap fitur berjalan sesuai spesifikasi.
5. **Penerapan dan Pemeliharaan (*Deployment and Maintenance*)**, yaitu pemasangan sistem pada lingkungan produksi, pendampingan pengguna, serta pemeliharaan berkelanjutan setelah sistem berjalan.

---

# DAFTAR PUSTAKA

@@GRUP Majalah, Jurnal Ilmiah, dan Prosiding

@@PUSTAKA Ariyanto, Y., Farhan, M., Rachmad, F., & Puspitasari, D. (2024). Laravel framework and native PHP: Comparison in the creation of rest API. *Matrix: Jurnal Manajemen Teknologi dan Informatika*, *14*(2), 66–73.

@@PUSTAKA Aulia, R., Candra, D. G. A., & Fauziyyah, A. (2025). Analisa perancangan permodelan basis data pada pengembangan system informasi pendaftaran menggunakan entity relationship diagram. *Inventor: Jurnal Inovasi dan Tren Pendidikan Teknologi Informasi*, *3*(3). https://doi.org/10.37630/inventor.v3i3.2682

@@PUSTAKA Handayani, T., & Putra, A. S. (2022). Pemanfaatan sistem informasi berbasis web sebagai media promosi dan publikasi kegiatan organisasi. *Jurnal Teknologi dan Sistem Informasi*, *3*(1), 45–52.

@@PUSTAKA Hudi, F. C., & Karyanti, C. M. (2024). Pengujian black box testing pada sistem informasi assessment berbasis web di bidang pariwisata. *Jurnal Ilmiah Komputasi*, *22*(4), 553–560. https://doi.org/10.32409/jikstik.22.4.3490

@@PUSTAKA Karnasyah, F. P., Al Islami, M. A., & Wibisono, O. R. (2025). Perancangan model basis data toko ceria menggunakan My structured query language (MySQL). *Jurnal Sistem Informasi (TEKNOFILE)*, *3*(6), 412–421.

@@PUSTAKA Lestari, D., & Wijaya, I. G. N. S. (2024). Pengembangan sistem informasi manajemen konten (CMS) berbasis web untuk pengarsipan dokumentasi kegiatan organisasi. *Jurnal REKAYASA (Rekayasa Sistem dan Teknologi Informasi)*, *8*(1), 12–20.

@@PUSTAKA Narulita, S., Nugroho, A., & Abdillah, M. Z. (2024). Diagram unified modelling language (UML) untuk perancangan sistem informasi manajemen penelitian dan pengabdian masyarakat (SIMLITABMAS). *Bridge: Jurnal Publikasi Sistem Informasi dan Telekomunikasi*, *2*(1), 38–50. https://doi.org/10.62951/bridge.v2i3.174

@@PUSTAKA Pratama, R. A., & Ramadhani, S. (2022). Rancang bangun sistem informasi profil dan publikasi kegiatan berbasis web menggunakan framework Laravel. *Jurnal Informatika dan Rekayasa Perangkat Lunak*, *4*(3), 310–318.

@@PUSTAKA Putra, F. P. E., Efendi, R. W., Tamam, A. B., & Pramadi, W. A. (2025). Tren dan praktik terbaik dalam pengembangan web berbasis API: Kajian literatur terhadap framework Laravel dan React. *Infomatek*, *27*(1), 165–178. https://doi.org/10.23969/infomatek.v27i1.25122

@@PUSTAKA Ramdani, R., Jannah, H. F. N., Pamuji, P. R., & Handayani, N. (2024). Rancang bangun aplikasi sistem informasi desa berbasis web di Desa Kalimati. *Indo-MathEdu Intellectuals Journal*, *5*(6), 7675–7689. https://doi.org/10.54373/imeij.v5i6.2228

@@PUSTAKA Ramdany, S. W., Kaidar, S. A., Aguchino, B., Putri, C. A. A., & Anggie, R. (2024). Penerapan UML class diagram dalam perancangan sistem informasi perpustakaan berbasis web. *Journal of Industrial and Engineering System*, *5*(1), 30–41.

@@PUSTAKA Risyda, F., Gardenia, Y., Awaludin, M., & Rehatalanit, Y. L. R. (2024). Perancangan desain UI/UX website sekolah menggunakan metode user centered design. *JSI (Jurnal Sistem Informasi) Universitas Suryadarma*, *12*(1), 165–174. https://doi.org/10.35968/jsi.v12i1.1352

@@PUSTAKA Setiawan, A., & Nugroho, W. (2023). Analisis efektivitas penggunaan website vs media sosial sebagai sarana informasi publik organisasi kemahasiswaan. *Jurnal JTIK (Jurnal Teknologi Informasi dan Komunikasi)*, *7*(2), 189–196.

@@PUSTAKA Syaputri, L., Putra, E. G., Syahrani, E., Dwian, E., & Purwani, F. (2024). Perbandingan efektivitas metode waterfall dan agile dalam pengembangan sistem informasi sebuah systematic literature review. *Journal of Scientech Research and Development*, *6*(2), 262–273. https://doi.org/10.56670/jsrd.v6i2.585

@@PUSTAKA Zaeladi, A., Raihan, M., Zilullah, U., & Sutriyono. (2026). Implementasi modul company profile dan galeri dokumentasi berbasis content management system pada portal HRIS menggunakan metode prototyping. *JRIIN: Jurnal Riset Informatika dan Inovasi*, *4*(7), 1785–1794.

@@GRUP Elektronik

@@PUSTAKA Object Management Group. (2017). *OMG unified modeling language (OMG UML) version 2.5.1* (formal/2017-12-05). https://www.omg.org/spec/UML/2.5.1/PDF
