<?php

namespace Tests\Feature;

use App\Models\Agenda;
use App\Models\AgendaRegistration;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AttendanceTest extends TestCase
{
    use RefreshDatabase;

    private function createAdmin(): User
    {
        return User::factory()->create([
            'role' => 'admin',
            'email_verified_at' => now(),
        ]);
    }

    private function createAgenda(): Agenda
    {
        return Agenda::create([
            'title' => 'MAKESTA UNSIQ 2026',
            'description' => 'Masa Kesetiaan Anggota',
            'event_date' => now()->addDays(7),
            'event_time' => '08:00',
            'location' => 'Gedung PCNU Wonosobo',
            'category' => 'Kaderisasi',
            'is_registration_open' => true,
        ]);
    }

    public function test_admin_can_check_in_using_valid_qr_payload_and_prevents_duplicate(): void
    {
        $admin = $this->createAdmin();
        $agenda = $this->createAgenda();

        $reg = AgendaRegistration::create([
            'agenda_id' => $agenda->id,
            'responses' => ['field_name' => 'Ahmad Fauzi', 'field_email' => 'ahmad@example.com'],
            'status' => 'approved',
            'payment_method' => 'midtrans',
        ]);

        // First check-in with signed QR payload succeeds
        $response = $this->actingAs($admin)->postJson(route('admin.attendance.checkIn'), [
            'code' => $reg->qr_payload,
            'agenda_id' => $agenda->id,
        ]);

        $response->assertOk()
            ->assertJson([
                'success' => true,
                'status' => 'checked_in',
            ]);

        $reg->refresh();
        $this->assertNotNull($reg->attended_at);
        $this->assertEquals($admin->id, $reg->checked_in_by);

        // Duplicate check-in is gracefully reported
        $dupResponse = $this->actingAs($admin)->postJson(route('admin.attendance.checkIn'), [
            'code' => $reg->ticket_code,
            'agenda_id' => $agenda->id,
        ]);

        $dupResponse->assertOk()
            ->assertJson([
                'success' => false,
                'status' => 'already_checked_in',
            ]);
    }

    public function test_invalid_qr_signature_and_pending_registration_are_rejected(): void
    {
        $admin = $this->createAdmin();
        $agenda = $this->createAgenda();

        $approved = AgendaRegistration::create([
            'agenda_id' => $agenda->id,
            'responses' => ['field_name' => 'Siti Aminah'],
            'status' => 'approved',
            'payment_method' => 'cash',
        ]);

        // Tampered HMAC signature
        $this->actingAs($admin)->postJson(route('admin.attendance.checkIn'), [
            'code' => "TICKET:{$approved->ticket_code}|SIG:deadbeef0000",
        ])->assertStatus(403)
          ->assertJson(['status' => 'invalid_signature']);

        // Pending registration cannot check in
        $pending = AgendaRegistration::create([
            'agenda_id' => $agenda->id,
            'responses' => ['field_name' => 'Budi Santoso'],
            'status' => 'pending',
            'payment_method' => 'transfer',
        ]);

        $this->actingAs($admin)->postJson(route('admin.attendance.checkIn'), [
            'code' => $pending->ticket_code,
        ])->assertStatus(422)
          ->assertJson(['status' => 'not_approved']);
    }

    public function test_admin_can_toggle_attendance_manually(): void
    {
        $admin = $this->createAdmin();
        $agenda = $this->createAgenda();

        $reg = AgendaRegistration::create([
            'agenda_id' => $agenda->id,
            'responses' => ['field_name' => 'Rina Kartika'],
            'status' => 'approved',
            'payment_method' => 'cash',
        ]);

        // Mark present
        $this->actingAs($admin)
            ->put(route('admin.registrations.toggleAttendance', $reg->id))
            ->assertRedirect();

        $this->assertNotNull($reg->fresh()->attended_at);

        // Cancel attendance
        $this->actingAs($admin)
            ->put(route('admin.registrations.toggleAttendance', $reg->id))
            ->assertRedirect();

        $this->assertNull($reg->fresh()->attended_at);
    }

    public function test_participant_self_check_in_respects_admin_open_toggle_and_token(): void
    {
        $admin = $this->createAdmin();
        $agenda = $this->createAgenda();

        $reg = AgendaRegistration::create([
            'agenda_id' => $agenda->id,
            'responses' => ['field_name' => 'Dewi Lestari', 'field_email' => 'dewi@example.com'],
            'status' => 'approved',
            'payment_method' => 'midtrans',
        ]);

        // Invalid token is rejected with 403
        $this->get(route('kegiatan.attendance.show', [
            'registration' => $reg->id,
            'token' => 'invalid-token',
        ]))->assertStatus(403);

        // Self check-in blocked when agenda attendance is closed
        $this->post(route('kegiatan.attendance.confirm', $reg->id), [
            'token' => $reg->getAttendanceToken(),
        ])->assertRedirect()
          ->assertSessionHas('error');

        $this->assertNull($reg->fresh()->attended_at);

        // Admin opens self-attendance for the agenda
        $this->actingAs($admin)
            ->put(route('admin.attendance.toggleOpen', $agenda->id))
            ->assertRedirect();

        $this->assertTrue($agenda->fresh()->is_attendance_open);

        // Participant confirms attendance with valid token
        $this->post(route('kegiatan.attendance.confirm', $reg->id), [
            'token' => $reg->getAttendanceToken(),
        ])->assertRedirect()
          ->assertSessionHas('success');

        $this->assertNotNull($reg->fresh()->attended_at);
    }
}
