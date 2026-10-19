<?php
namespace App\Domain\Terms\Queries;

use App\Domain\Terms\Models\Term;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class ListTerms
{
    public function execute(array $filters = [],int $perPage = 15): LengthAwarePaginator {
        return Term::query()
            ->with(['translations', 'definitions', 'aliases'])
            ->when(
                ! empty($filters['search']),
                function ($query) use ($filters) {
                    $search = trim($filters['search']);

                    $query->whereHas('translations', function ($translationQuery) use ($search) {
                        $translationQuery->where('name', 'like', "%{$search}%");
                    });
                }
            )
            ->when(
                ! empty($filters['status']),
                fn ($query) => $query->where('status', $filters['status'])
            )
            ->when(
                ! empty($filters['trashed']),
                fn ($query) => $query->onlyTrashed()
            )
            ->latest()
            ->paginate($perPage)
            ->withQueryString();
    }
}
