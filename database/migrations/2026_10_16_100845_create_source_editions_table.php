<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('source_editions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('source_id')
                ->constrained()->cascadeOnDelete();

            $table->string('edition_label')->nullable();
            $table->string('version')->nullable();
            $table->date('published_on')->nullable();
            $table->date('effective_from')->nullable();
            $table->date('effective_until')->nullable();
            $table->string('status', 24)->default('current')->index();
            $table->text('document_url')->nullable();
            $table->string('file_path')->nullable();
            $table->text('notes')->nullable();
            $table->json('metadata')->nullable();
            $table->timestamps();

            $table->index(['source_id', 'published_on']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('source_editions');
    }
};