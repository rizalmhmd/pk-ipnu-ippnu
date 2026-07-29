<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('agendas', function (Blueprint $table) {
            $table->string('image')->nullable()->after('form_schema');
            $table->string('payment_account')->nullable()->after('registration_fee');
        });

        Schema::table('agenda_registrations', function (Blueprint $table) {
            $table->string('payment_method')->default('transfer')->after('payment_proof');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('agendas', function (Blueprint $table) {
            $table->dropColumn(['image', 'payment_account']);
        });

        Schema::table('agenda_registrations', function (Blueprint $table) {
            $table->dropColumn('payment_method');
        });
    }
};
