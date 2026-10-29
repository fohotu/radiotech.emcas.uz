<?php
namespace App\Domain\TechnologyCategories\Actions;

use App\Domain\TechnologyCategories\Models\TechnologyCategory;
use Illuminate\Support\Facades\DB;

class UpdateTechnologyCategory
{
    public function execute(
        TechnologyCategory $category,
        array $data
    ): TechnologyCategory {
        return DB::transaction(function () use ($category, $data) {
            $translations = $data['translations'] ?? [];

            unset($data['translations']);

            $category->update($data);

            foreach ($translations as $locale => $translation) {
                if (blank($translation['name'] ?? null)) {
                    continue;
                }

                $category->translations()->updateOrCreate(
                    ['locale' => $locale],
                    [
                        'name' => $translation['name'],
                        'description' => $translation['description'] ?? null,
                    ]
                );
            }

            return $category->load('translations');
        });
    }
}
