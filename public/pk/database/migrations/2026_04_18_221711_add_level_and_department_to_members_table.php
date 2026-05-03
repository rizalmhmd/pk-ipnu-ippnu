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
        Schema::table('members', function (Blueprint $table) {
            $table->integer('level')->default(3)->after('position'); // 1: Top, 2: Departemen, 3: Anggota
            $table->string('department')->nullable()->after('level'); // E.g., 'Kaderisasi', 'Dakwah'
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('members', function (Blueprint $table) {
            $table->dropColumn(['level', 'department']);
        });
    }
};
