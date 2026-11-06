<?php

namespace App\Domain\Media\Queries;


use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;
use App\Domain\Media\Models\Media;
class MediaQuery
{
    public function get(array $filters = []): Collection
    {
        return Media::query()
            ->when(
                $filters['model_type'] ?? null,
                fn (Builder $query, $value) => $query->where('model_type', $value)
            )
            ->when(
                $filters['model_id'] ?? null,
                fn (Builder $query, $value) => $query->where('model_id', $value)
            )
            ->when(
                $filters['collection_name'] ?? null,
                fn (Builder $query, $value) => $query->where('collection_name', $value)
            )
            ->latest()
            ->get();
    }
}