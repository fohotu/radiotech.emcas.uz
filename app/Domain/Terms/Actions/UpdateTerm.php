<?php

namespace App\Domain\Terms\Actions;

use App\Domain\Terms\Models\Term;
use Illuminate\Support\Facades\DB;

class UpdateTerm
{
    public function execute(
        Term $term,
        array $data,
        int $userId
    ): Term {
        return DB::transaction(function () use ($term, $data, $userId) {
            $term->update([
                'status' => $data['status'],
                'updated_by' => $userId,
                'published_at' => $data['status'] === 'published'
                    ? ($term->published_at ?? now())
                    : null,
            ]);

            $term->translations()->updateOrCreate(
                [
                    'language_code' => strtolower($data['language_code']),
                ],
                [
                    'title' => $data['title'],
                    'description' => $data['description'] ?? null,
                    'updated_by' => $userId,
                ]
            );

            return $term->refresh();
        });
    }
}