<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pemberitahuan Pendaftaran Ditolak</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f4f6f9;
            margin: 0;
            padding: 0;
            color: #333333;
        }
        .container {
            max-width: 600px;
            margin: 30px auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
            border: 1px border #e5e7eb;
        }
        .header {
            background-color: #047857;
            padding: 24px;
            text-align: center;
            color: #ffffff;
        }
        .header h2 {
            margin: 0;
            font-size: 20px;
            font-weight: 700;
            letter-spacing: 0.5px;
        }
        .header p {
            margin: 6px 0 0;
            font-size: 13px;
            opacity: 0.9;
        }
        .content {
            padding: 32px 28px;
        }
        .greeting {
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 16px;
            color: #1f2937;
        }
        .badge-status {
            display: inline-block;
            background-color: #fef2f2;
            color: #dc2626;
            border: 1px solid #fecaca;
            padding: 6px 14px;
            border-radius: 20px;
            font-size: 13px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 20px;
        }
        .info-card {
            background-color: #f9fafb;
            border-left: 4px solid #dc2626;
            padding: 16px;
            border-radius: 6px;
            margin: 20px 0;
        }
        .info-card p {
            margin: 4px 0;
            font-size: 14px;
        }
        .reason-box {
            background-color: #fff5f5;
            border: 1px dashed #f87171;
            padding: 14px 16px;
            border-radius: 8px;
            margin-top: 16px;
        }
        .reason-title {
            font-size: 12px;
            font-weight: 700;
            color: #b91c1c;
            text-transform: uppercase;
            margin-bottom: 4px;
        }
        .reason-text {
            font-size: 14px;
            color: #7f1d1d;
            margin: 0;
        }
        .footer {
            background-color: #f9fafb;
            padding: 20px;
            text-align: center;
            border-top: 1px solid #f3f4f6;
            font-size: 12px;
            color: #6b7280;
        }
        .footer a {
            color: #047857;
            text-decoration: none;
            font-weight: 600;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>Pimpinan Komisariat IPNU IPPNU</h2>
            <p>Pemberitahuan Status Pendaftaran Agenda</p>
        </div>

        <div class="content">
            <div class="greeting">Assalamu'alaikum Wr. Wb., Halo {{ $registrantName }}</div>

            <div class="badge-status">Status Pendaftaran: Ditolak</div>

            <p style="font-size: 14px; line-height: 1.6; color: #4b5563;">
                Terima kasih atas minat dan partisipasi Anda. Melalui surat elektronik ini, kami menginformasikan bahwa pendaftaran Anda untuk kegiatan:
            </p>

            <div class="info-card">
                <p><strong>Agenda:</strong> {{ $agendaTitle }}</p>
                <p><strong>Tanggal Kegiatan:</strong> {{ $registration->agenda?->event_date ? $registration->agenda->event_date->format('d F Y') : '-' }}</p>
                <p><strong>Metode Pembayaran:</strong> {{ strtoupper($registration->payment_method ?? 'CASH') }}</p>
            </div>

            @if(!empty($reason))
            <div class="reason-box">
                <div class="reason-title">Alasan Penolakan / Catatan Panitia:</div>
                <p class="reason-text">{{ $reason }}</p>
            </div>
            @else
            <p style="font-size: 14px; line-height: 1.6; color: #4b5563;">
                Mohon maaf, pendaftaran Anda belum dapat kami proses lebih lanjut saat ini (misalnya karena bukti pembayaran kurang jelas/tidak valid atau kuota kegiatan penuh).
            </p>
            @endif

            <p style="font-size: 14px; line-height: 1.6; color: #4b5563; margin-top: 24px;">
                Jika Anda merasa ada kekeliruan atau ingin mendaftar ulang dengan bukti transfer yang valid, silakan hubungi pengurus / panitia kegiatan.
            </p>

            <p style="font-size: 14px; font-weight: 600; color: #1f2937; margin-top: 28px; margin-bottom: 0;">
                Wallahul Muwaffiq ila Aqwamith Thariq<br>
                Wassalamu'alaikum Wr. Wb.
            </p>
        </div>

        <div class="footer">
            <p style="margin: 0 0 6px 0;">&copy; {{ date('Y') }} PK IPNU IPPNU. All rights reserved.</p>
            <p style="margin: 0;">Email ini dikirim secara otomatis oleh sistem, mohon tidak membalas langsung ke email ini.</p>
        </div>
    </div>
</body>
</html>
