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
        Schema::create('statistics', function (Blueprint $table) {
            $table->id();
            $table->string('title'); // e.g., "PENDAPATAN (2024)"
            $table->string('subtitle')->nullable(); // e.g., "Miliar"
            $table->string('value'); // e.g., "75,33" or "23,1"
            $table->string('unit')->nullable(); // e.g., "USD", "%" 
            $table->text('description')->nullable(); // Additional info
            $table->string('icon')->default('fa-chart-line'); // FontAwesome icon class
            $table->string('color')->default('emerald'); // Color theme: emerald, blue, amber, red
            $table->integer('order')->default(0); // Display order
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('statistics');
    }
};
