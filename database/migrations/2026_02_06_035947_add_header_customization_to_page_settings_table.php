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
            $table->string('header_bg_color')->nullable()->after('hero_image');
            $table->string('header_text_color')->nullable()->after('header_bg_color');
            $table->string('header_bg_image')->nullable()->after('header_text_color');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('page_settings', function (Blueprint $table) {
            $table->dropColumn(['header_bg_color', 'header_text_color', 'header_bg_image']);
        });
    }
};
