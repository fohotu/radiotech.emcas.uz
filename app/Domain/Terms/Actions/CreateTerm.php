<?php

namespace App\Domain\Terms\Actions;

use App\Domain\Terms\Models\Term;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use InvalidArgumentException;

class CreateTerm
{
    private const LANGUAGES = ['ru', 'uz', 'en'];

    public function execute(array $data, ?int $userId = null): Term
    {
        return DB::transaction(function () use ($data, $userId) {
            $translations = $data['translations'] ?? [];

            if (! is_array($translations) || empty($translations)) {
                throw new InvalidArgumentException(
                    'At least one translation is required.'
                );
            }

            $term = Term::create([
                'uuid' => (string) Str::uuid(),
                'status' => $data['status'],
                'created_by' => $userId,
                'updated_by' => $userId,
                'published_at' => $data['status'] === 'published'
                    ? now()
                    : null,
            ]);

            foreach (self::LANGUAGES as $language) {
                $translation = $translations[$language] ?? null;

                if (! is_array($translation)) {
                    continue;
                }

                $title = trim($translation['title'] ?? '');

                if ($title === '') {
                    continue;
                }

                $term->translations()->create([
                    'language_code' => $language,
                    'title' => $title,
                    'description' => $translation['description'] ?? null,
                    'pronunciation' => $translation['pronunciation'] ?? null,
                    'usage_note' => $translation['usage_note'] ?? null,
                    'slug' => Str::slug($title) . '-' . Str::lower(Str::random(6)),
                    'created_by' => $userId,
                    'updated_by' => $userId,
                ]);

                $definition = trim($translation['definition'] ?? '');

                if ($definition !== '') {
                    $term->definitions()->create([
                        'language_code' => $language,
                        'definition' => $definition,
                        'is_preferred' => true,
                        'created_by' => $userId,
                        'updated_by' => $userId,
                    ]);
                }
            }

            if ($term->translations()->count() === 0) {
                throw new InvalidArgumentException(
                    'At least one translation with a title is required.'
                );
            }

            return $term;
        });
    }
}