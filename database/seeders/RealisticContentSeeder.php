<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\SiteSetting;
use App\Models\PageSetting;
use App\Models\Statistic;
use App\Models\Quote;
use App\Models\Agenda;
use App\Models\AgendaRegistration;
use App\Models\Post;
use App\Models\Article;
use App\Models\Gallery;
use App\Models\Member;
use Illuminate\Support\Str;

class RealisticContentSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::first();
        $adminId = $admin ? $admin->id : 1;

        // 1. SiteSetting
        SiteSetting::updateOrCreate(
            ['id' => 1],
            [
                'site_name' => 'PKPT IPNU IPPNU UNSIQ',
                'meta_description' => 'Website Resmi Pimpinan Komisariat Perguruan Tinggi IPNU IPPNU Universitas Sains Al-Qur\'an (UNSIQ) Jawa Tengah di Wonosobo.',
                'footer_description' => 'Wadah kaderisasi Pelajar Nahdlatul Ulama di lingkungan perguruan tinggi yang berlandaskan pada nilai Belajar, Berjuang, dan Bertaqwa.',
                'address' => 'Gedung PKM UNSIQ, Jl. KH. Hasyim Asy\'ari Km. 03, Kalibeber, Mojotengah, Wonosobo, Jawa Tengah 56351',
                'email' => 'pkipnuippnuunsiq@gmail.com',
                'phone' => '082220618853',
                'instagram' => 'pkptipnuippnu_unsiq',
                'youtube' => 'PKPT IPNU IPPNU UNSIQ Official',
                'copyright_text' => 'Hak Cipta Dilindungi © ' . date('Y') . ' PKPT IPNU IPPNU UNSIQ',
                'home_news_title' => 'Warta Berita Terkini',
                'home_agenda_title' => 'Agenda Kegiatan Terdekat',
                'default_hero_title' => 'Selamat Datang di PKPT IPNU IPPNU UNSIQ',
                'default_hero_subtitle' => 'Belajar, Berjuang, Bertaqwa untuk Kejayaan Bangsa dan Agama',
                'default_hero_image' => 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1920&q=80',
            ]
        );

        // 2. PageSetting
        $pageSettings = [
            'home' => [
                'title' => 'Beranda Utama',
                'feature_subtitle' => 'Mengenal Lebih Dekat',
                'feature_title' => 'Komisariat Perguruan Tinggi Nahdlatul Ulama',
                'feature_description' => 'PKPT IPNU-IPPNU UNSIQ hadir sebagai kawah candradimuka bagi mahasiswa nahdliyyin untuk mengasah intelektualitas, spiritualitas, serta kepemimpinan yang berakhlakul karimah dan berhaluan Ahlussunnah wal Jamaah An-Nahdliyyah.',
                'feature_image_url' => 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=1200&q=80',
                'feature_button_text' => 'Pelajari Visi & Misi Kami',
                'feature_button_url' => '/profil/visi-misi',
                'header_bg_image_url' => 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1920&q=80',
            ],
            'home_greeting' => [
                'hero_title' => 'Sambutan Ketua PKPT',
                'hero_description' => 'Selamat datang di portal informasi digital PKPT IPNU IPPNU UNSIQ. Semoga sistem ini mempermudah segenap kader dan mahasiswa dalam mengakses warta, artikel ilmiah, serta berpartisipasi aktif dalam berbagai agenda kaderisasi organisasi kita tercinta.',
                'hero_image_url' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
            ],
            'profile' => [
                'title' => 'Profil Organisasi',
                'content' => 'Pimpinan Komisariat Perguruan Tinggi (PKPT) IPNU-IPPNU Universitas Sains Al-Qur\'an (UNSIQ) Jawa Tengah di Wonosobo merupakan basis kaderisasi keterpelajaran NU di tingkat kampus perguruan tinggi yang bertujuan membentuk insan cendekia yang berilmu, beramal, dan bertaqwa.',
            ],
            'news' => [
                'title' => 'Warta & Informasi',
                'content' => 'Kumpulan berita resmi seputar kegiatan, prestasi kader, dan informasi keorganisasian PKPT IPNU IPPNU UNSIQ.',
            ],
            'articles' => [
                'title' => 'Opini & Karya Kader',
                'content' => 'Ruang gagasan ilmiah, pemikiran kritis, dan tulisan inspiratif kader mahasiswa Nahdlatul Ulama.',
            ],
            'gallery' => [
                'title' => 'Galeri Dokumentasi',
                'content' => 'Dokumentasi visual momen bersejarah dan kilas balik kegiatan organisasi.',
            ],
            'agenda' => [
                'title' => 'Kalender Agenda & Kegiatan',
                'content' => 'Jadwal rangkaian kegiatan, pelatihan kader, seminar, serta pendaftaran kegiatan online.',
            ],
        ];

        foreach ($pageSettings as $pageName => $data) {
            PageSetting::updateOrCreate(
                ['page_name' => $pageName],
                $data
            );
        }

        // 3. Statistics
        Statistic::query()->delete();
        $statisticsData = [
            [
                'title' => 'Kader Aktif',
                'subtitle' => 'Mahasiswa',
                'value' => '250+',
                'unit' => 'Kader',
                'description' => 'Kader aktif yang tersebar di berbagai fakultas UNSIQ',
                'icon' => 'fa-users',
                'color' => 'emerald',
                'order' => 1,
                'is_active' => true,
            ],
            [
                'title' => 'Agenda Kegiatan',
                'subtitle' => 'Terlaksana',
                'value' => '24',
                'unit' => 'Program',
                'description' => 'Program kerja tahunan yang telah dan sedang berlangsung',
                'icon' => 'fa-calendar-check',
                'color' => 'blue',
                'order' => 2,
                'is_active' => true,
            ],
            [
                'title' => 'Departemen & Lembaga',
                'subtitle' => 'Bidang Khidmat',
                'value' => '6',
                'unit' => 'Divisi',
                'description' => 'Divisi penggerak kaderisasi, dakwah, dan media digital',
                'icon' => 'fa-sitemap',
                'color' => 'amber',
                'order' => 3,
                'is_active' => true,
            ],
            [
                'title' => 'Warta & Opini',
                'subtitle' => 'Karya Literasi',
                'value' => '48',
                'unit' => 'Karya',
                'description' => 'Artikel ilmiah dan berita kegiatan yang telah dipublikasikan',
                'icon' => 'fa-newspaper',
                'color' => 'purple',
                'order' => 4,
                'is_active' => true,
            ],
        ];
        foreach ($statisticsData as $stat) {
            Statistic::create($stat);
        }

        // 4. Quotes
        Quote::query()->delete();
        $quotesData = [
            [
                'content' => 'Siapa yang mau mengurusi NU, saya anggap ia santriku. Siapa yang menjadi santriku, saya doakan husnul khatimah beserta anak cucunya.',
                'author' => 'Hadhratusysyaikh KH. M. Hasyim Asy\'ari',
                'image' => 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80',
                'order' => 1,
                'is_active' => true,
            ],
            [
                'content' => 'Pemuda hari ini adalah pemimpin hari esok. Pelajar NU harus senantiasa memegang teguh trilogi: Belajar, Berjuang, dan Bertaqwa.',
                'author' => 'Prof. Dr. KH. Tolchah Mansoer (Pendiri IPNU)',
                'image' => 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
                'order' => 2,
                'is_active' => true,
            ],
            [
                'content' => 'Jadilah kader pelajar putri yang cerdas, mandiri, berakhlak mulia, serta siap mengabdi untuk kemaslahatan umat dan bangsa.',
                'author' => 'Hj. Nihayah Bakri (Pendiri IPPNU)',
                'image' => 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
                'order' => 3,
                'is_active' => true,
            ],
        ];
        foreach ($quotesData as $quote) {
            Quote::create($quote);
        }

        // 5. Agendas & Registrations
        AgendaRegistration::query()->delete();
        Agenda::query()->delete();
        $defaultSchema = [
            ['id' => 'field_name', 'label' => 'Nama Lengkap', 'type' => 'text', 'required' => true],
            ['id' => 'field_phone', 'label' => 'Nomor WhatsApp / HP', 'type' => 'text', 'required' => true],
            ['id' => 'field_email', 'label' => 'Alamat Email', 'type' => 'email', 'required' => true],
            ['id' => 'field_nik', 'label' => 'NIK (KTP / KK)', 'type' => 'nik', 'required' => true],
            ['id' => 'field_prodi', 'label' => 'Program Studi / Fakultas', 'type' => 'text', 'required' => false],
        ];

        $agenda1 = Agenda::create([
            'title' => 'Makesta Raya PKPT IPNU IPPNU UNSIQ 2026',
            'category' => 'Kaderisasi',
            'description' => 'Masa Kesetiaan Anggota (Makesta) merupakan gerbang awal pengkaderan resmi bagi mahasiswa untuk bergabung menjadi bagian dari keluarga besar Nahdlatul Ulama. Fasilitas mencakup sertifikat resmi pengkaderan, seminar kit, konsumsi, dan atribut peserta.',
            'event_date' => now()->addDays(14)->toDateString(),
            'event_time' => '08:00:00',
            'location' => 'Aula Gedung Al-A\'la Kampus II UNSIQ',
            'is_registration_open' => true,
            'registration_fee' => 'Rp 25.000',
            'payment_account' => 'Bank BRI 0021-01-089765-50-2 a.n PKPT IPNU IPPNU UNSIQ',
            'image' => 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=80',
            'form_schema' => $defaultSchema,
        ]);

        $agenda2 = Agenda::create([
            'title' => 'Seminar Nasional Kepemimpinan & Moderasi Beragama',
            'category' => 'Seminar',
            'description' => 'Seminar nasional kepelajaran membedah peran strategis generasi muda dalam menangkal paham radikalisme dan memperkuat toleransi beragama di lingkungan perguruan tinggi.',
            'event_date' => now()->addDays(21)->toDateString(),
            'event_time' => '09:00:00',
            'location' => 'Gedung Serbaguna UNSIQ Wonosobo',
            'is_registration_open' => true,
            'registration_fee' => 'Gratis',
            'payment_account' => null,
            'image' => 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1000&q=80',
            'form_schema' => $defaultSchema,
        ]);

        $agenda3 = Agenda::create([
            'title' => 'Pelatihan Jurnalistik & Media Kreatif Pelajar',
            'category' => 'Pelatihan',
            'description' => 'Workshop intensif penulisan berita, fotografi jurnalistik, dan pengelolaan media dakwah digital untuk mencetak santri cyber yang kreatif dan berintegritas.',
            'event_date' => now()->addDays(28)->toDateString(),
            'event_time' => '13:00:00',
            'location' => 'Laboratorium Komputer Lantai 3 FITK UNSIQ',
            'is_registration_open' => true,
            'registration_fee' => 'Rp 15.000',
            'payment_account' => 'Bank Mandiri 136-00-1987654-1 a.n PKPT IPNU IPPNU UNSIQ',
            'image' => 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=1000&q=80',
            'form_schema' => $defaultSchema,
        ]);

        $agenda4 = Agenda::create([
            'title' => 'Kajian Dwi-Mingguan Kitab Kuning & Dzikir Bersama',
            'category' => 'Keagamaan',
            'description' => 'Kajian rutin pembacaan Kitab Adabul Alim wal Muta\'allim karya Hadhratusysyaikh KH. Hasyim Asy\'ari bersama Majelis Dzikir dan Shalawat PKPT.',
            'event_date' => now()->addDays(7)->toDateString(),
            'event_time' => '19:30:00',
            'location' => 'Masjid Baitul Qur\'an KH. Muntaha Al-Hafidz',
            'is_registration_open' => false,
            'registration_fee' => 'Gratis',
            'payment_account' => null,
            'image' => 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=1000&q=80',
            'form_schema' => $defaultSchema,
        ]);

        // 6. Agenda Registrations (Sample Registrants for Reports & Dashboard)
        $registrationsData = [
            [
                'agenda_id' => $agenda1->id,
                'user_id' => $adminId,
                'responses' => [
                    'field_name' => 'Ahmad Fauzi',
                    'field_phone' => '081234567890',
                    'field_email' => 'ahmad.fauzi@unsiq.ac.id',
                    'field_nik' => '3509121405040001',
                    'field_prodi' => 'Teknik Informatika (FASTIKOM)',
                ],
                'status' => 'approved',
                'payment_method' => 'midtrans',
                'midtrans_order_id' => 'REG-104-' . time(),
                'midtrans_payment_type' => 'qris',
                'midtrans_transaction_status' => 'settlement',
                'midtrans_settlement_time' => now()->subHours(2),
                'created_at' => now()->subHours(3),
            ],
            [
                'agenda_id' => $agenda1->id,
                'user_id' => null,
                'responses' => [
                    'field_name' => 'Siti Aminah',
                    'field_phone' => '085712345678',
                    'field_email' => 'siti.aminah@unsiq.ac.id',
                    'field_nik' => '3509125408040002',
                    'field_prodi' => 'Pendidikan Agama Islam (FITK)',
                ],
                'status' => 'pending',
                'payment_method' => 'transfer',
                'payment_proof' => 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
                'midtrans_order_id' => 'REG-103-' . (time() - 3600),
                'created_at' => now()->subHours(5),
            ],
            [
                'agenda_id' => $agenda1->id,
                'user_id' => null,
                'responses' => [
                    'field_name' => 'Dewi Lestari',
                    'field_phone' => '082198765432',
                    'field_email' => 'dewi.lestari@unsiq.ac.id',
                    'field_nik' => '3307014506040003',
                    'field_prodi' => 'Ilmu Al-Qur\'an dan Tafsir (FSH)',
                ],
                'status' => 'pending',
                'payment_method' => 'cash',
                'midtrans_order_id' => 'REG-101-' . (time() - 7200),
                'created_at' => now()->subHours(8),
            ],
            [
                'agenda_id' => $agenda2->id,
                'user_id' => null,
                'responses' => [
                    'field_name' => 'M. Rizky Pratama',
                    'field_phone' => '081355556666',
                    'field_email' => 'rizky.pratama@unsiq.ac.id',
                    'field_nik' => '3307021509030004',
                    'field_prodi' => 'Manajemen (FE)',
                ],
                'status' => 'approved',
                'payment_method' => 'midtrans',
                'midtrans_order_id' => 'REG-102-' . (time() - 10800),
                'midtrans_payment_type' => 'bank_transfer',
                'midtrans_transaction_status' => 'settlement',
                'midtrans_settlement_time' => now()->subHours(10),
                'created_at' => now()->subHours(11),
            ],
            [
                'agenda_id' => $agenda3->id,
                'user_id' => null,
                'responses' => [
                    'field_name' => 'Budi Santoso',
                    'field_phone' => '087788990011',
                    'field_email' => 'budi.santoso@unsiq.ac.id',
                    'field_nik' => '3307031201020005',
                    'field_prodi' => 'Komunikasi Penyiaran Islam (FDK)',
                ],
                'status' => 'rejected',
                'payment_method' => 'midtrans',
                'midtrans_order_id' => 'REG-100-' . (time() - 86400),
                'midtrans_payment_type' => 'echannel',
                'midtrans_transaction_status' => 'expire',
                'created_at' => now()->subDay(),
            ],
        ];

        foreach ($registrationsData as $reg) {
            AgendaRegistration::create($reg);
        }

        // 7. Posts (News)
        Post::query()->delete();
        $postsData = [
            [
                'user_id' => $adminId,
                'title' => 'Pelantikan Pengurus Baru PKPT IPNU-IPPNU UNSIQ Periode 2026-2027 Berlangsung Khidmat',
                'slug' => 'pelantikan-pengurus-baru-pkpt-ipnu-ippnu-unsiq-2026',
                'image' => 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=80',
                'content' => "Wonosobo — Pimpinan Komisariat Perguruan Tinggi (PKPT) IPNU-IPPNU Universitas Sains Al-Qur'an (UNSIQ) Jawa Tengah di Wonosobo resmi melantik jajaran pengurus baru masa khidmat 2026-2027 bertempat di Aula Kampus Utama.\n\nAcara pelantikan dihadiri oleh segenap jajaran pimpinan rektorat, Pengurus Cabang Nahdlatul Ulama (PCNU) Kabupaten Wonosobo, Pimpinan Cabang IPNU-IPPNU, serta perwakilan organisasi kemahasiswaan se-UNSIQ.\n\nDalam amanatnya, Rektor UNSIQ menegaskan pentingnya peran kader IPNU-IPPNU sebagai garda terdepan penjaga moderasi beragama di lingkungan kampus. 'Mahasiswa NU harus unggul dalam ilmu pengetahuan dan teknologi tanpa meninggalkan akar tradisi kepesantrenan dan akhlakul karimah,' tutur beliau.",
                'published_at' => now()->subDays(2),
            ],
            [
                'user_id' => $adminId,
                'title' => 'Semarak Makesta Raya: Ratusan Mahasiswa Baru Antusias Bergabung Jadi Kader NU',
                'slug' => 'semarak-makesta-raya-ratusan-mahasiswa-gabung-kader-nu',
                'image' => 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
                'content' => "Antusiasme mahasiswa baru UNSIQ mengikuti Masa Kesetiaan Anggota (Makesta) Raya 2026 sangat tinggi. Lebih dari dua ratus peserta memadati lokasi kegiatan pengkaderan yang berlangsung selama dua hari penuh.\n\nMakesta mengusung kurikulum komprehensif mencakup materi Aswaja An-Nahdliyyah, sejarah perjuangan IPNU-IPPNU, keorganisasian, wawasan kebangsaan, dan kepemimpinan transformatif. Kegiatan ditutup dengan prosesi pembaiatan yang berlangsung haru dan khidmat.",
                'published_at' => now()->subDays(5),
            ],
            [
                'user_id' => $adminId,
                'title' => 'Peringati Harlah, Kader IPNU-IPPNU Gelar Aksi Tanam 1.000 Pohon di Lereng Sindoro',
                'slug' => 'peringati-harlah-kader-ipnu-ippnu-gelar-aksi-tanam-pohon',
                'image' => 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80',
                'content' => "Memperingati Hari Lahir IPNU dan IPPNU, puluhan kader PKPT IPNU-IPPNU UNSIQ menggelar aksi peduli lingkungan dengan menanam 1.000 bibit pohon di kawasan resapan air lereng Gunung Sindoro.\n\nKegiatan ini merupakan pengejawantahan dari nilai fiqhul bi'ah (etika pelestarian lingkungan dalam Islam) untuk mencegah bahaya tanah longsor dan menjaga kelestarian ekosistem alam pegunungan Wonosobo.",
                'published_at' => now()->subDays(8),
            ],
            [
                'user_id' => $adminId,
                'title' => 'PKPT IPNU-IPPNU UNSIQ Luncurkan Sistem Informasi Manajemen Digital Terpadu',
                'slug' => 'pkpt-ipnu-ippnu-unsiq-luncurkan-sistem-informasi-manajemen-digital',
                'image' => 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
                'content' => "Menjawab tantangan digitalisasi organisasi, Departemen Media dan Kominfo PKPT IPNU-IPPNU UNSIQ resmi merilis portal sistem informasi terpadu berbasis web.\n\nSistem ini menghadirkan fitur pendaftaran kegiatan terintegrasi dengan Payment Gateway Midtrans (QRIS, VA, E-Wallet), arsip warta dan artikel opini kader, transparansi statistik organisasi, serta panel administrasi berbasis peran (Role-Based Access Control).",
                'published_at' => now()->subDays(12),
            ],
        ];

        foreach ($postsData as $post) {
            Post::create($post);
        }

        // 8. Articles (Kader Opinions)
        Article::query()->delete();
        $articlesData = [
            [
                'user_id' => $adminId,
                'title' => 'Peran Kader IPNU-IPPNU dalam Menjawab Tantangan Disrupsi Digital',
                'slug' => 'peran-kader-ipnu-ippnu-dalam-menjawab-tantangan-disrupsi-digital',
                'author' => 'Ahmad Fauzi (Departemen Kaderisasi)',
                'image' => 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80',
                'content' => "Perkembangan pesat teknologi informasi membawa arus disrupsi yang tak terelakkan di segala bidang kehidupan, tak terkecuali dunia kepemudaan dan kepelajaran. Sebagai kader Nahdlatul Ulama yang bergelut di lingkungan perguruan tinggi, mahasiswa dituntut tidak sekadar menjadi konsumen teknologi, melainkan produsen narasi positif yang menyebarkan kedamaian dan literasi digital beradab.\n\nKader IPNU-IPPNU memiliki tanggung jawab moral untuk mengisi ruang-ruang digital dengan konten Aswaja yang ramah, santun, dan mencerahkan.",
                'published_at' => now()->subDay(),
            ],
            [
                'user_id' => $adminId,
                'title' => 'Meneguhkan Trilogi IPNU: Belajar, Berjuang, Bertaqwa di Era Modern',
                'slug' => 'meneguhkan-trilogi-ipnu-belajar-berjuang-bertaqwa-di-era-modern',
                'author' => 'M. Rizky Pratama (Kader IPNU)',
                'image' => 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1200&q=80',
                'content' => "Semboyan 'Belajar, Berjuang, Bertaqwa' bukan sekadar deretan kata pemanis organisasi, melainkan kompas moral yang membimbing setiap langkah gerak kader pelajar NU.\n\nBelajar menuntut kita untuk selalu haus akan ilmu pengetahuan; Berjuang mengajarkan keikhlasan dalam berkhidmah untuk agama dan bangsa; sementara Bertaqwa menjadi fondasi spiritual yang membentengi integritas moral mahasiswa di tengah godaan zaman.",
                'published_at' => now()->subDays(4),
            ],
            [
                'user_id' => $adminId,
                'title' => 'Transformasi Gerakan Pelajar Putri di Lingkungan Perguruan Tinggi',
                'slug' => 'transformasi-gerakan-pelajar-putri-di-lingkungan-perguruan-tinggi',
                'author' => 'Siti Aminah (Kader IPPNU)',
                'image' => 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80',
                'content' => "Keberadaan IPPNU di ranah perguruan tinggi memiliki urgensi yang sangat strategis. Di tengah dinamika pergerakan perempuan masa kini, kader IPPNU memegang peran penting dalam mengkombinasikan kecerdasan intelektual, kemandirian karakter, dan nilai-nilai keagamaan yang moderat.\n\nPelajar putri adalah madrasah pertama bagi generasi masa depan.",
                'published_at' => now()->subDays(7),
            ],
            [
                'user_id' => $adminId,
                'title' => 'Moderasi Beragama: Pondasi Kepemimpinan Pelajar Generasi Z',
                'slug' => 'moderasi-beragama-pondasi-kepemimpinan-pelajar-generasi-z',
                'author' => 'Dewi Lestari (Departemen Kominfo)',
                'image' => 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80',
                'content' => "Di tengah maraknya polarisasi opini di media sosial, generasi Z dihadapkan pada tantangan mempertahankan toleransi dan persatuan bangsa. Konsep Wasathiyah (moderat) yang diajarkan oleh para ulama Nahdlatul Ulama menjadi vaksin paling ampuh dalam menangkal ekstremisme dan intoleransi di lingkungan kampus.",
                'published_at' => now()->subDays(10),
            ],
        ];

        foreach ($articlesData as $article) {
            Article::create($article);
        }

        // 9. Galleries
        Gallery::query()->delete();
        $galleriesData = [
            [
                'title' => 'Makesta Raya PKPT IPNU-IPPNU UNSIQ 2026',
                'image_path' => 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80',
            ],
            [
                'title' => 'Pelantikan & Rapat Kerja Pengurus Masa Khidmat 2026-2027',
                'image_path' => 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1000&q=80',
            ],
            [
                'title' => 'Bakti Sosial & Penanaman Bibit Pohon di Lereng Sindoro',
                'image_path' => 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1000&q=80',
            ],
            [
                'title' => 'Seminar Nasional Kepemimpinan Mahasiswa & Moderasi Beragama',
                'image_path' => 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1000&q=80',
            ],
            [
                'title' => 'Workshop Jurnalistik & Pengelolaan Media Kreatif Pelajar',
                'image_path' => 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=1000&q=80',
            ],
            [
                'title' => 'Kajian Rutin Dwi-Mingguan Pembacaan Kitab Kuning',
                'image_path' => 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=1000&q=80',
            ],
        ];

        foreach ($galleriesData as $gal) {
            Gallery::create($gal);
        }

        // 10. Members (Pengurus)
        Member::query()->delete();
        $membersData = [
            [
                'user_id' => $adminId,
                'name' => 'Rekan M. Irfan Zidni',
                'position' => 'Ketua Mandataris PKPT IPNU UNSIQ',
                'type' => 'ipnu',
                'level' => 1,
                'department' => 'Pengurus Harian',
                'order' => 1,
                'photo' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
                'instagram' => 'irfanzidni_',
            ],
            [
                'user_id' => null,
                'name' => 'Rekanita Nurul Hidayah',
                'position' => 'Ketua Mandataris PKPT IPPNU UNSIQ',
                'type' => 'ippnu',
                'level' => 1,
                'department' => 'Pengurus Harian',
                'order' => 2,
                'photo' => 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
                'instagram' => 'nurulhidayah',
            ],
            [
                'user_id' => null,
                'name' => 'Rekan Ahmad Fauzi',
                'position' => 'Sekretaris Jenderal IPNU',
                'type' => 'ipnu',
                'level' => 1,
                'department' => 'Pengurus Harian',
                'order' => 3,
                'photo' => 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
                'instagram' => 'fauzi_ahmad',
            ],
            [
                'user_id' => null,
                'name' => 'Rekanita Siti Fatimah',
                'position' => 'Sekretaris Jenderal IPPNU',
                'type' => 'ippnu',
                'level' => 1,
                'department' => 'Pengurus Harian',
                'order' => 4,
                'photo' => 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
                'instagram' => 'fatimah_siti',
            ],
            [
                'user_id' => null,
                'name' => 'Rekan M. Rizky Pratama',
                'position' => 'Koordinator Departemen Kaderisasi',
                'type' => 'ipnu',
                'level' => 2,
                'department' => 'Departemen Kaderisasi',
                'order' => 5,
                'photo' => 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
                'instagram' => 'rizkypratama',
            ],
            [
                'user_id' => null,
                'name' => 'Rekanita Dewi Lestari',
                'position' => 'Koordinator Departemen Media & Kominfo',
                'type' => 'ippnu',
                'level' => 2,
                'department' => 'Departemen Kominfo',
                'order' => 6,
                'photo' => 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
                'instagram' => 'dewilestari',
            ],
        ];

        foreach ($membersData as $member) {
            Member::create($member);
        }
    }
}
