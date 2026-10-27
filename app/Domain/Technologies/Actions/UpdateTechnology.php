<?php
namespace App\Domain\Technologies\Actions;

use App\Domain\Technologies\Models\Technology;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class UpdateTechnology
{
    public function execute(Technology $technology, array $data): Technology
    {
        return DB::transaction(function () use ($technology, $data) {
            $translations = $data['translations'] ?? [];

            unset(
                $data['translations'],
                $data['description']
            );

            $englishName = $translations['en']['name'] ?? null;
            $russianName = $translations['ru']['name'] ?? null;
            $uzbekName = $translations['uz']['name'] ?? null;

            $data['name'] = $englishName
                ?: ($russianName ?: ($uzbekName ?: $technology->name));

            $data['slug'] = !empty($data['slug'])
                ? $data['slug']
                : Str::slug($data['name'] ?: Str::uuid()->toString());

            $technology->update($data);

            foreach ($translations as $locale => $translation) {
                if (empty($translation['name'])) {
                    $technology->translations()
                        ->where('locale', $locale)
                        ->delete();

                    continue;
                }

                $technology->translations()->updateOrCreate(
                    ['locale' => $locale],
                    [
                        'name' => $translation['name'],
                        'description' => $translation['description'] ?? null,
                    ]
                );
            }

            return $technology->load('translations');
        });
    }
}
