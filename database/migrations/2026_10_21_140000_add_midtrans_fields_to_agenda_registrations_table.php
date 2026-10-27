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
        Schema::table('agenda_registrations', function (Blueprint $table) {
            $table->string('midtrans_order_id')->nullable()->index()->after('snap_token');
            $table->string('midtrans_payment_type')->nullable()->after('midtrans_order_id');
            $table->string('midtrans_transaction_status')->nullable()->after('midtrans_payment_type');
            $table->timestamp('midtrans_settlement_time')->nullable()->after('midtrans_transaction_status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('agenda_registrations', function (Blueprint $table) {
            $table->dropColumn([
                'midtrans_order_id',
                'midtrans_payment_type',
                'midtrans_transaction_status',
                'midtrans_settlement_time',
            ]);
        });
    }
};
