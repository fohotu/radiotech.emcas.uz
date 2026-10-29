<?php
namespace App\Domain\TechnologyCategories\Actions;

use App\Domain\TechnologyCategories\Models\TechnologyCategory;
use Illuminate\Support\Facades\DB;

class CreateTechnologyCategory
{
    public function execute(array $data): TechnologyCategory
    {
        return DB::transaction(function () use ($data) {
            $translations = $data['translations'] ?? [];

            unset($data['translations']);

            $category = TechnologyCategory::create($data);

            foreach ($translations as $locale => $translation) {
                if (blank($translation['name'] ?? null)) {
                    continue;
                }

                $category->translations()->create([
                    'locale' => $locale,
                    'name' => $translation['name'],
                    'description' => $translation['description'] ?? null,
                ]);
            }

            return $category->load('translations');
        });
    }
}
