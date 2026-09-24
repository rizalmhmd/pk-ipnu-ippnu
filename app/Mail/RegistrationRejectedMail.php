<?php

namespace App\Mail;

use App\Models\AgendaRegistration;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class RegistrationRejectedMail extends Mailable
{
    use Queueable, SerializesModels;

    public AgendaRegistration $registration;
    public string $registrantName;
    public string $agendaTitle;
    public ?string $reason;

    /**
     * Create a new message instance.
     */
    public function __construct(AgendaRegistration $registration, ?string $reason = null)
    {
        $this->registration = $registration;
        $this->registrantName = $registration->getRegistrantName();
        $this->agendaTitle = $registration->agenda?->title ?? 'Kegiatan';
        $this->reason = $reason;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "Pemberitahuan Pendaftaran Agenda: {$this->agendaTitle} Ditolak",
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.registration_rejected',
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
