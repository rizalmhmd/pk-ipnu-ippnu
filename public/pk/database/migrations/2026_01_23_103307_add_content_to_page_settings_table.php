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
        Schema::table('page_settings', function (Blueprint $table) {
            $table->text('content_sejarah')->nullable()->after('hero_image');
            $table->text('content_visi_misi')->nullable()->after('content_sejarah');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('page_settings', function (Blueprint $table) {
            $table->dropColumn(['content_sejarah', 'content_visi_misi']);
        });
    }
};
