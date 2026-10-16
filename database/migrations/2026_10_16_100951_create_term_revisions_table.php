<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('term_revisions', function (Blueprint $table) {
            $table->id();

            $table->foreignId('term_id')
                ->constrained('terms')->cascadeOnDelete();

            $table->unsignedInteger('revision_number');
            $table->string('action', 24)->default('updated');
            $table->json('snapshot');
            $table->text('change_summary')->nullable();

            $table->foreignId('changed_by')->nullable()
                ->constrained('users')->nullOnDelete();

            $table->timestamp('created_at')->useCurrent();

            $table->unique(['term_id', 'revision_number']);
            $table->index(['term_id', 'created_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('term_revisions');
    }
};