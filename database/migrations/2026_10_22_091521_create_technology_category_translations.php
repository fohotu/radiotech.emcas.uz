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
        Schema::create('technology_category_translations', function (Blueprint $table) {
            $table->id();

            $table->foreignId('technology_category_id')
                ->constrained('technology_categories')
                ->cascadeOnDelete();

            $table->string('locale', 5);
            $table->string('name');
            $table->text('description')->nullable();

            $table->timestamps();

            $table->unique(
                ['technology_category_id', 'locale'],
                'tech_cat_trans_locale_unique'
            );
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('technology_category_translations');
    }
};
