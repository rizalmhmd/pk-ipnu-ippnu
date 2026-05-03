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
            $table->string('feature_subtitle')->nullable();
            $table->string('feature_title')->nullable();
            $table->text('feature_description')->nullable();
            $table->text('feature_image')->nullable();
            $table->string('feature_button_text')->nullable();
            $table->string('feature_button_url')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('page_settings', function (Blueprint $table) {
            $table->dropColumn([
                'feature_subtitle',
                'feature_title',
                'feature_description',
                'feature_image',
                'feature_button_text',
                'feature_button_url'
            ]);
        });
    }
};
