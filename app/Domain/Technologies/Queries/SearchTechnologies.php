<?php
namespace App\Domain\Technologies\Queries;

use App\Domain\Technologies\Models\Technology;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class SearchTechnologies
{
    public function execute(array $filters = []): LengthAwarePaginator
    {
        return Technology::query()
            ->when(
                $filters['search'] ?? null,
                function ($query, string $search) {
                    $query->where(function ($query) use ($search) {
                        $query->where('name', 'like', "%{$search}%")
                            ->orWhere('slug', 'like', "%{$search}%")
                            ->orWhere('abbreviation', 'like', "%{$search}%");
                    });
                }
            )
            ->when(
                $filters['category_id'] ?? null,
                fn ($query, $categoryId) => $query->where(
                    'category_id',
                    $categoryId
                )
            )
            ->when(
                $filters['status'] ?? null,
                fn ($query, string $status) => $query->where(
                    'status',
                    $status
                )
            )
            ->with('category')
            ->with('translations')
          //  ->withCount('terms')
            ->orderBy('name')
            ->paginate(
                min(max((int) ($filters['per_page'] ?? 15), 1), 100)
            )
            ->withQueryString();
    }
}
