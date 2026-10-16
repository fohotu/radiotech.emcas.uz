<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('term_aliases', function (Blueprint $table) {
            $table->id();
            $table->foreignId('term_id')
                ->constrained()->cascadeOnDelete();

            $table->string('language_code', 10);
            $table->string('alias');
            $table->string('alias_type', 32)->default('synonym');
            $table->boolean('is_preferred')->default(false);

            $table->foreignId('source_edition_id')->nullable()
                ->constrained('source_editions')->nullOnDelete();

            $table->text('notes')->nullable();
            $table->timestamps();

            $table->unique(
                ['term_id', 'language_code', 'alias', 'alias_type'],
                'term_alias_unique'
            );

            $table->index(['language_code', 'alias']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('term_aliases');
    }
};