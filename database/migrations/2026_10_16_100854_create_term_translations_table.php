<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('term_translations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('term_id')
                ->constrained()->cascadeOnDelete();

            $table->string('language_code', 10);
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('pronunciation')->nullable();
            $table->text('usage_note')->nullable();
            $table->string('slug')->nullable();

            $table->foreignId('created_by')->nullable()
                ->constrained('users')->nullOnDelete();
            $table->foreignId('updated_by')->nullable()
                ->constrained('users')->nullOnDelete();

            $table->timestamps();

            $table->unique(['term_id', 'language_code']);
            $table->index(['language_code', 'title']);
            $table->index('slug');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('term_translations');
    }
};