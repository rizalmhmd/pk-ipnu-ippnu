<?php

namespace App\Mail;

use App\Models\AgendaRegistration;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class RegistrationApprovedMail extends Mailable
{
    use Queueable, SerializesModels;

    public AgendaRegistration $registration;
    public string $registrantName;
    public string $agendaTitle;
    public string $ticketCode;
    public string $qrUrl;

    /**
     * Create a new message instance.
     */
    public function __construct(AgendaRegistration $registration)
    {
        $this->registration = $registration;
        $this->registrantName = $registration->getRegistrantName();
        $this->agendaTitle = $registration->agenda?->title ?? 'Kegiatan';
        $this->ticketCode = 'REG-' . str_pad((string) $registration->id, 5, '0', STR_PAD_LEFT);
        
        // Generate QR code image URL with opaque ticket signature (no registrant PII leaked externally)
        $sig = substr(hash_hmac('sha256', "{$this->ticketCode}|{$registration->agenda_id}", (string) config('app.key')), 0, 12);
        $qrData = urlencode("TICKET:{$this->ticketCode}|SIG:{$sig}");
        $this->qrUrl = "https://api.qrserver.com/v1/create-qr-code/?size=180x180&data={$qrData}";
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "E-Ticket & Bukti Pendaftaran Resmi: {$this->agendaTitle} [{$this->ticketCode}]",
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.registration_approved',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}

