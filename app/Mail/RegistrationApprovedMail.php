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
    public string $attendanceUrl;

    /**
     * Create a new message instance.
     */
    public function __construct(AgendaRegistration $registration)
    {
        $this->registration = $registration;
        $this->registrantName = $registration->getRegistrantName();
        $this->agendaTitle = $registration->agenda?->title ?? 'Kegiatan';
        $this->ticketCode = $registration->ticket_code;
        $this->qrUrl = $registration->qr_url;
        $this->attendanceUrl = $registration->self_check_in_url;
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

