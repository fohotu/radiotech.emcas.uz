<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('sources', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('source_type', 40)->default('standard');
            $table->string('identifier')->nullable();
            $table->string('publisher')->nullable();
            $table->text('description')->nullable();
            $table->text('url')->nullable();
            $table->json('metadata')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->index(['source_type', 'title']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sources');
    }
};