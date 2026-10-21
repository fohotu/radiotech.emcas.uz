<?php

namespace App\Domain\Terms\Actions;

use App\Domain\Terms\Models\Term;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class UpdateTerm
{
    private const LANGUAGES = ['ru', 'uz', 'en'];

    public function execute(Term $term, array $data, ?int $userId = null): Term
    {
        return DB::transaction(function () use ($term, $data, $userId) {
            $translations = $data['translations'] ?? [];

            $updateData = [
                'updated_by' => $userId,
            ];

            if (isset($data['status'])) {
                $updateData['status'] = $data['status'];

                if ($data['status'] === 'published' && is_null($term->published_at)) {
                    $updateData['published_at'] = now();
                }
            }

            $term->update($updateData);

            foreach (self::LANGUAGES as $language) {
                $translationData = $translations[$language] ?? null;

                if (! is_array($translationData)) {
                    continue;
                }

                $title = trim($translationData['title'] ?? '');

                if ($title === '') {
                    // Удаляем перевод и определение, если поле заголовка очистили
                    $term->translations()->where('language_code', $language)->delete();
                    $term->definitions()->where('language_code', $language)->delete();
                    continue;
                }

                $existingTranslation = $term->translations()
                    ->where('language_code', $language)
                    ->first();

                // Генерируем новый слаг только если заголовок изменился или перевода еще не было
                $slug = ($existingTranslation && $existingTranslation->title === $title)
                    ? $existingTranslation->slug
                    : Str::slug($title) . '-' . Str::lower(Str::random(6));

                $term->translations()->updateOrCreate(
                    ['language_code' => $language],
                    [
                        'title' => $title,
                        'term_id' => $term->id,
                        'description' => $translationData['description'] ?? null,
                        'pronunciation' => $translationData['pronunciation'] ?? null,
                        'usage_note' => $translationData['usage_note'] ?? null,
                        'slug' => $slug,
                        'updated_by' => $userId,
                        'created_by' => $existingTranslation->created_by ?? $userId,
                    ]
                );

                $definition = trim($translationData['definition'] ?? '');

                if ($definition !== '') {
                    $term->definitions()->updateOrCreate(
                        ['language_code' => $language],
                        [
                            'definition' => $definition,
                            'is_preferred' => true,
                            'updated_by' => $userId,
                        ]
                    );
                } else {
                    $term->definitions()->where('language_code', $language)->delete();
                }
            }

            return $term->fresh(['translations', 'definitions']);
        });
    }
}