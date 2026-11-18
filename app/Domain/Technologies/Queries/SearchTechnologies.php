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


    public function execute2(array $filters = []): LengthAwarePaginator
    {
        $m = Technology::query()
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
                'category_id' => $technology->category_id,
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
        dd($m);
        return $m;    
    }



    public function execute(array $filters = []): LengthAwarePaginator
    {
        $search = trim($filters['search'] ?? '');
        $locale = $filters['locale'] ?? null;

        return Technology::query()
            ->when($search !== '', function ($query) use ($search) {
                $query->where(function ($query) use ($search) {
                    // Основная таблица
                    $query->where('name', 'like', "%{$search}%")
                        ->orWhere('slug', 'like', "%{$search}%")
                        ->orWhere('abbreviation', 'like', "%{$search}%")

                        // Таблица переводов
                        ->orWhereHas('translations', function ($translation) use ($search) {
                            $translation->where('name', 'like', "%{$search}%")
                                ->orWhere('description', 'like', "%{$search}%");
                               // ->orWhere('definition', 'like', "%{$search}%");
                        });
                });
            })
            ->when(
                $filters['category_id'] ?? null,
                fn ($query, $categoryId) =>
                    $query->where('category_id', $categoryId)
            )
            ->when(
                $filters['status'] ?? null,
                fn ($query, $status) =>
                    $query->where('status', $status)
            )
            ->with([
                'category',
                'translations' => fn ($query) =>
                    $query->when(
                        $locale,
                        fn ($q) => $q->where('locale', $locale)
                    ),
                'libraryMedia',
            ])
            ->orderBy('name')
            ->paginate(
                min(max((int) ($filters['per_page'] ?? 15), 1), 100)
            )
            ->through(function (Technology $technology) {
                $media = $technology->libraryMedia->first();

                return [
                    'id' => $technology->id,
                    'name' => $technology->name,
                    'slug' => $technology->slug,
                    'abbreviation' => $technology->abbreviation,
                    'status' => $technology->status,
                    'category_id' => $technology->category_id,
                    'category_name' => $technology->category?->name,

                    'translations' => $technology->translations
                        ->mapWithKeys(fn ($translation) => [
                            $translation->locale => [
                                'name' => $translation->name,
                                'description' => $translation->description,
                               // 'definition' => $translation->definition,
                              //  'pronunciation' => $translation->pronunciation,
                              //  'usage_note' => $translation->usage_note,
                            ],
                        ]),

                    'selected_media_id' => $media?->id,
                    'selected_media_url' => $media?->getUrl(),
                ];
            })
            ->withQueryString();
    }

}
