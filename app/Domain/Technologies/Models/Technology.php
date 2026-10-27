<?php

namespace App\Domain\Technologies\Models;

use App\Domain\TechnologyCategories\Models\TechnologyCategory;
use App\Domain\Terms\Models\Term;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Technology extends Model
{
    protected $fillable = [
        'category_id',
        'name',
        'slug',
        'abbreviation',
        'description',
        'status',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(TechnologyCategory::class, 'category_id');
    }

    public function terms(): BelongsToMany
    {
        return $this->belongsToMany(
            Term::class,
            'technology_term',
            'technology_id',
            'term_id'
        )->withTimestamps();
    }

    public function translations(): HasMany
    {
        return $this->hasMany(TechnologyTranslation::class, 'technology_id');
    }
}