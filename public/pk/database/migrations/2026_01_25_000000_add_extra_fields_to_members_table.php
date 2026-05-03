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
            $table->string('instagram')->nullable()->after('photo');
            $table->enum('type', ['ipnu', 'ippnu'])->default('ipnu')->after('instagram');
            $table->integer('order')->default(0)->after('type'); // Added for custom sorting
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('members', function (Blueprint $table) {
            $table->dropColumn(['instagram', 'type', 'order']);
        });
    }
};
