<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('term_definitions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('term_id')
                ->constrained()->cascadeOnDelete();

            $table->string('language_code', 10);
            $table->longText('definition');

            $table->foreignId('source_edition_id')->nullable()
                ->constrained('source_editions')->nullOnDelete();

            $table->string('page_reference', 100)->nullable();
            $table->string('clause_reference', 100)->nullable();
            $table->boolean('is_preferred')->default(false);
            $table->text('editorial_note')->nullable();

            $table->foreignId('created_by')->nullable()
                ->constrained('users')->nullOnDelete();
            $table->foreignId('updated_by')->nullable()
                ->constrained('users')->nullOnDelete();

            $table->timestamps();

            $table->index(['term_id', 'language_code']);
            $table->index(['source_edition_id', 'clause_reference']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('term_definitions');
    }
};