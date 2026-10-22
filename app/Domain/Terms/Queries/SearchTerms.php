<?php
namespace App\Domain\Terms\Queries;

use App\Domain\Terms\Models\Term;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class SearchTerms
{
    public function execute(array $filters = []): LengthAwarePaginator
    {
        return Term::query()
            ->with('translations')
            ->when(
                $filters['status'] ?? null,
                fn ($query, $status) => $query->where('status', $status)
            )
            ->when(
                $filters['search'] ?? null,
                function ($query, $search) {
                    $query->whereHas('translations', function ($translation) use ($search) {
                        $translation->where('title', 'like', "%{$search}%");
                    });
                }
            )
            ->latest()
            ->paginate(15)
            ->withQueryString();
    }
}