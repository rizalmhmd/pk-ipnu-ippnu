<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('quotes', function (Blueprint $table) {
            $table->id();
            $table->text('content');
            $table->string('author')->nullable();
            $table->string('image')->nullable();
            $table->integer('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        if (Schema::hasTable('hero_slides')) {
            $slides = DB::table('hero_slides')->get();
            foreach ($slides as $slide) {
                DB::table('quotes')->insert([
                    'content' => $slide->subtitle ?? $slide->title ?? 'No Content',
                    'author' => $slide->subtitle ? $slide->title : null,
                    'image' => $slide->image,
                    'order' => $slide->order,
                    'is_active' => $slide->is_active,
                    'created_at' => $slide->created_at,
                    'updated_at' => $slide->updated_at,
                ]);
            }
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quotes');
    }
};
