<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>E-Ticket & Konfirmasi Pendaftaran</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f0fdf4;
            margin: 0;
            padding: 0;
            color: #1f2937;
        }
        .container {
            max-width: 620px;
            margin: 30px auto;
            background-color: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 10px 25px -5px rgba(5, 150, 105, 0.1), 0 8px 10px -6px rgba(5, 150, 105, 0.1);
            border: 1px solid #d1fae5;
        }
        .header {
            background: linear-gradient(135deg, #065f46 0%, #047857 50%, #059669 100%);
            padding: 28px 24px;
            text-align: center;
            color: #ffffff;
        }
        .header h2 {
            margin: 0;
            font-size: 22px;
            font-weight: 800;
            letter-spacing: 0.5px;
        }
        .header p {
            margin: 6px 0 0;
            font-size: 13px;
            color: #d1fae5;
            font-weight: 500;
        }
        .content {
            padding: 32px 28px;
        }
        .greeting {
            font-size: 16px;
            font-weight: 700;
            margin-bottom: 8px;
            color: #065f46;
        }
        .sub-greeting {
            font-size: 14px;
            line-height: 1.6;
            color: #4b5563;
            margin-bottom: 24px;
        }
        .ticket-card {
            background: linear-gradient(to bottom, #f9fafb, #ffffff);
            border: 2px dashed #059669;
            border-radius: 14px;
            padding: 24px;
            margin: 20px 0;
            position: relative;
        }
        .ticket-badge {
            display: inline-block;
            background-color: #dcfce7;
            color: #15803d;
            border: 1px solid #86efac;
            padding: 5px 12px;
            border-radius: 9999px;
            font-size: 11px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 12px;
        }
        .ticket-code {
            font-family: 'Courier New', Courier, monospace;
            font-size: 22px;
            font-weight: 900;
            color: #065f46;
            letter-spacing: 2px;
            margin-bottom: 16px;
        }
        .ticket-grid {
            display: table;
            width: 100%;
            margin-top: 14px;
        }
        .ticket-col-info {
            display: table-cell;
            vertical-align: top;
            width: 65%;
            padding-right: 14px;
        }
        .ticket-col-qr {
            display: table-cell;
            vertical-align: middle;
            text-align: center;
            width: 35%;
            border-left: 1px dashed #d1d5db;
            padding-left: 14px;
        }
        .info-row {
            margin-bottom: 10px;
        }
        .info-label {
            font-size: 11px;
            font-weight: 700;
            color: #6b7280;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 2px;
        }
        .info-value {
            font-size: 14px;
            font-weight: 700;
            color: #1f2937;
        }
        .qr-image {
            width: 130px;
            height: 130px;
            border-radius: 8px;
            border: 1px solid #e5e7eb;
            display: block;
            margin: 0 auto 6px auto;
        }
        .qr-caption {
            font-size: 10px;
            color: #6b7280;
            font-weight: 600;
        }
        .notice-card {
            background-color: #f0fdf4;
            border-left: 4px solid #059669;
            padding: 16px;
            border-radius: 8px;
            margin: 24px 0;
            font-size: 13px;
            line-height: 1.6;
            color: #064e3b;
        }
        .notice-card ul {
            margin: 6px 0 0 0;
            padding-left: 20px;
        }
        .notice-card li {
            margin-bottom: 4px;
        }
        .footer {
            background-color: #f9fafb;
            padding: 24px;
            text-align: center;
            border-top: 1px solid #e5e7eb;
            font-size: 12px;
            color: #6b7280;
        }
        .footer a {
            color: #059669;
            text-decoration: none;
            font-weight: 700;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <h2>Pimpinan Komisariat IPNU IPPNU</h2>
            <p>E-Ticket & Bukti Resmi Pendaftaran Kegiatan</p>
        </div>

        <!-- Content -->
        <div class="content">
            <div class="greeting">Assalamu'alaikum Wr. Wb., Rekan/Rekanita {{ $registrantName }}</div>
            <div class="sub-greeting">
                Selamat! Pendaftaran Anda telah <strong>berhasil diverifikasi dan disetujui (Approved)</strong> oleh panitia pelaksana. Berikut adalah bukti pendaftaran dan e-ticket resmi Anda:
            </div>

            <!-- E-Ticket Card -->
            <div class="ticket-card">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span class="ticket-badge">&#10003; Resmi Terverifikasi</span>
                </div>
                <div class="ticket-code">{{ $ticketCode }}</div>

                <div class="ticket-grid">
                    <div class="ticket-col-info">
                        <div class="info-row">
                            <div class="info-label">Nama Kegiatan</div>
                            <div class="info-value" style="color: #047857;">{{ $agendaTitle }}</div>
                        </div>

                        <div class="info-row">
                            <div class="info-label">Nama Peserta</div>
                            <div class="info-value">{{ $registrantName }}</div>
                        </div>

                        <div class="info-row">
                            <div class="info-label">Tanggal Pelaksanaan</div>
                            <div class="info-value">
                                {{ $registration->agenda?->event_date ? $registration->agenda->event_date->format('d F Y') : '-' }}
                            </div>
                        </div>

                        @if(!empty($registration->agenda?->event_time))
                        <div class="info-row">
                            <div class="info-label">Waktu</div>
                            <div class="info-value">{{ substr($registration->agenda->event_time, 0, 5) }} WIB</div>
                        </div>
                        @endif

                        @if(!empty($registration->agenda?->location))
                        <div class="info-row">
                            <div class="info-label">Lokasi</div>
                            <div class="info-value">{{ $registration->agenda->location }}</div>
                        </div>
                        @endif

                        <div class="info-row">
                            <div class="info-label">Metode Pembayaran</div>
                            <div class="info-value" style="text-transform: uppercase;">
                                {{ $registration->payment_method ?? 'CASH' }}
                                @if($registration->payment_method === 'midtrans' && $registration->midtrans_payment_type)
                                    ({{ str_replace('_', ' ', $registration->midtrans_payment_type) }})
                                @endif
                            </div>
                        </div>
                    </div>

                    <div class="ticket-col-qr">
                        <img src="{{ $qrUrl }}" alt="QR Code Presensi" class="qr-image" />
                        <div class="qr-caption">Scan saat Presensi / Registrasi Ulang</div>
                    </div>
                </div>
            </div>

            <!-- Notice Card -->
            <div class="notice-card">
                <strong>Catatan Penting untuk Peserta:</strong>
                <ul>
                    <li>Simpan email ini atau ambil tangkapan layar (screenshot) kode tiket / QR code di atas.</li>
                    <li>Tunjukkan e-ticket ini kepada panitia saat registrasi ulang di lokasi kegiatan.</li>
                    <li>Hadir 15 menit sebelum acara dimulai dengan mengenakan busana yang rapi dan sopan.</li>
                    <li>Jika ada pertanyaan mengenai agenda ini, Anda dapat menghubungi narahubung panitia.</li>
                </ul>
            </div>

            <p style="font-size: 14px; font-weight: 600; color: #1f2937; margin-top: 24px; margin-bottom: 0;">
                Selamat bergabung dan berproses bersama IPNU IPPNU!<br>
                <em>Belajar, Berjuang, Bertaqwa</em><br><br>
                Wallahul Muwaffiq ila Aqwamith Thariq<br>
                Wassalamu'alaikum Wr. Wb.
            </p>
        </div>

        <!-- Footer -->
        <div class="footer">
            <p style="margin: 0 0 6px 0;">&copy; {{ date('Y') }} PK IPNU IPPNU. All rights reserved.</p>
            <p style="margin: 0;">Email konfirmasi otomatis. Mohon simpan bukti pendaftaran ini dengan baik.</p>
        </div>
    </div>
</body>
</html>

