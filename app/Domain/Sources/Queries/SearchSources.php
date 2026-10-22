<?php
namespace App\Domain\Sources\Queries;

use App\Domain\Sources\Models\Source;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class SearchSources
{
    public function execute(array $filters = []): LengthAwarePaginator
    {
        return Source::query()
            ->when(
                $filters['search'] ?? null,
                function ($query, string $search) {
                    $query->where(function ($query) use ($search) {
                        $query
                            ->where('title', 'like', "%{$search}%")
                            ->orWhere('identifier', 'like', "%{$search}%")
                            ->orWhere('publisher', 'like', "%{$search}%");
                    });
                }
            )
            ->when(
                $filters['source_type'] ?? null,
                fn ($query, string $type) => $query->where(
                    'source_type',
                    $type
                )
            )
            ->when(
                $filters['publisher'] ?? null,
                fn ($query, string $publisher) => $query->where(
                    'publisher',
                    'like',
                    "%{$publisher}%"
                )
            )
            ->when(
                $filters['with_editions'] ?? false,
                fn ($query) => $query->with('editions')
            )
            ->orderBy('title')
            ->paginate($filters['per_page'] ?? 15)
            ->withQueryString();
    }
}
