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
            $table->index('event_date');
            $table->index('category');
        });

        Schema::table('quotes', function (Blueprint $table) {
            $table->index(['is_active', 'order']);
        });

        Schema::table('statistics', function (Blueprint $table) {
            $table->index(['is_active', 'order']);
        });

        Schema::table('members', function (Blueprint $table) {
            $table->index(['type', 'level', 'department']);
            $table->index('order');
        });

        Schema::table('posts', function (Blueprint $table) {
            $table->foreignId('user_id')->nullable()->after('id')->constrained()->nullOnDelete();
            $table->index('published_at');
        });

        Schema::table('articles', function (Blueprint $table) {
            $table->foreignId('user_id')->nullable()->after('id')->constrained()->nullOnDelete();
            $table->index('published_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('articles', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
            $table->dropIndex(['published_at']);
            $table->dropColumn('user_id');
        });

        Schema::table('posts', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
            $table->dropIndex(['published_at']);
            $table->dropColumn('user_id');
        });

        Schema::table('members', function (Blueprint $table) {
            $table->dropIndex(['type', 'level', 'department']);
            $table->dropIndex(['order']);
        });

        Schema::table('statistics', function (Blueprint $table) {
            $table->dropIndex(['is_active', 'order']);
        });

        Schema::table('quotes', function (Blueprint $table) {
            $table->dropIndex(['is_active', 'order']);
        });

        Schema::table('agendas', function (Blueprint $table) {
            $table->dropIndex(['event_date']);
            $table->dropIndex(['category']);
        });
    }
};
