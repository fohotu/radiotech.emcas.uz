<?php
namespace App\Domain\Technologies\Queries;

use App\Domain\Technologies\Models\Technology;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class SearchTechnologies
{
    public function execute1(array $filters = []): LengthAwarePaginator
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
            ->with('media')
          //  ->withCount('terms')
            ->orderBy('name')
            ->paginate(
                min(max((int) ($filters['per_page'] ?? 15), 1), 100)
            )
            ->through(fn (Technology $technology) => [
                'id' => $technology->id,
                'name' => $technology->name,
                'slug' => $technology->slug,
                'abbreviation' => $technology->abbreviation,
                'status' => $technology->status,
                'selected_media_id' => $technology->getFirstMedia('image')?->id,
            ])
            ->withQueryString();
    }


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
                fn ($query, $categoryId) => $query->where('category_id', $categoryId)
            )
            ->when(
                $filters['status'] ?? null,
                fn ($query, string $status) => $query->where('status', $status)
            )
            ->with([
                'category',
                'translations',
                //'media',
                'libraryMedia',
            ])
            ->orderBy('name')
            ->paginate(
                min(max((int) ($filters['per_page'] ?? 15), 1), 100)
            )
            ->through(fn (Technology $technology) => [
                'id' => $technology->id,
                'name' => $technology->name,
                'slug' => $technology->slug,
                'abbreviation' => $technology->abbreviation,
                'status' => $technology->status,

                'selected_media_id' => $technology->libraryMedia->first()?->id,
                'selected_media_url' => $technology->libraryMedia->first()?->getUrl(),
            ])
            /*
            ->through(fn (Technology $technology) => [
                'id' => $technology->id,
                'name' => $technology->name,
                'slug' => $technology->slug,
                'abbreviation' => $technology->abbreviation,
                'status' => $technology->status,
                'selected_media_id' => $technology->getFirstMedia('images')?->id,
            ])
            */
            ->withQueryString();
    }
}
