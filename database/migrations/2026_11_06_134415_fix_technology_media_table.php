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
        Schema::dropIfExists('technology_media');

        Schema::create('technology_media', function (Blueprint $table) {
            $table->id();

            $table->foreignId('technology_id')
                ->constrained('technologies')
                ->cascadeOnDelete();

            $table->foreignId('media_id')
                ->constrained('media')
                ->cascadeOnDelete();

            $table->timestamps();

            $table->unique(['technology_id', 'media_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
