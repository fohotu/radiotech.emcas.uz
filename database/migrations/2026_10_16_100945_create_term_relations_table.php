<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('term_relations', function (Blueprint $table) {
            $table->id();

            $table->foreignId('term_id')
                ->constrained('terms')->cascadeOnDelete();

            $table->foreignId('related_term_id')
                ->constrained('terms')->cascadeOnDelete();

            $table->string('relation_type', 40);

            $table->foreignId('source_edition_id')->nullable()
                ->constrained('source_editions')->nullOnDelete();

            $table->text('note')->nullable();

            $table->foreignId('created_by')->nullable()
                ->constrained('users')->nullOnDelete();

            $table->timestamps();

            $table->unique(
                ['term_id', 'related_term_id', 'relation_type'],
                'term_relation_unique'
            );

            $table->index(['related_term_id', 'relation_type']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('term_relations');
    }
};