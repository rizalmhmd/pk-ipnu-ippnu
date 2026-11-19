<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('agenda_registrations', function (Blueprint $table) {
            $table->timestamp('attended_at')->nullable()->after('midtrans_settlement_time');
            $table->foreignId('checked_in_by')->nullable()->after('attended_at')->constrained('users')->nullOnDelete();
            $table->string('attendance_note')->nullable()->after('checked_in_by');
        });
    }

    public function down(): void
    {
        Schema::table('agenda_registrations', function (Blueprint $table) {
            $table->dropConstrainedForeignId('checked_in_by');
            $table->dropColumn(['attended_at', 'attendance_note']);
        });
    }
};
