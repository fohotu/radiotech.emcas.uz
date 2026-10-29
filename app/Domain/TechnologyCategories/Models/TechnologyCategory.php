<?php

namespace App\Domain\TechnologyCategories\Models;

use App\Domain\Technologies\Models\Technology;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class TechnologyCategory extends Model
{
    protected $fillable = [
        'parent_id',
        'name',
        'slug',
        'sort_order',
        'is_active',
    ];

    public function parent(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(self::class, 'parent_id');
    }

    public function children(): HasMany
    {
        return $this->hasMany(self::class, 'parent_id')
            ->orderBy('sort_order');
    }

    public function translations(): HasMany
    {
        return $this->hasMany(TechnologyCategoryTranslation::class);
    }

    public function technologies(): HasMany
    {
        return $this->hasMany(Technology::class, 'category_id');
    }

    public function activeChildren(): HasMany
    {
        return $this->children()->where('is_active', true);
    }
}