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
        Schema::create('technologies', function (Blueprint $table) {
            $table->id();

            $table->foreignId('category_id')
                ->constrained('technology_categories')
                ->restrictOnDelete();

            $table->string('slug')->unique();
            $table->string('name');
            $table->string('abbreviation')->nullable();
            $table->text('description')->nullable();

            $table->string('status', 24)->default('draft')->index();

            $table->json('metadata')->nullable();

            $table->timestamps();
            $table->softDeletes();

            $table->index(['category_id', 'name']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('technologies');
    }
};
