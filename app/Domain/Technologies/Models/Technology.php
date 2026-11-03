<?php

namespace App\Domain\Technologies\Models;

use App\Domain\TechnologyCategories\Models\TechnologyCategory;
use App\Domain\Terms\Models\Term;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Spatie\Image\Enums\Fit;

/*

Laravel Media Library
Хранение, связи с моделями, конвертация

Uppy
React интерфейс загрузки файлов

*/

use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;


class Technology extends Model implements HasMedia
{
     use InteractsWithMedia;
    
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



    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('images')
            ->acceptsMimeTypes([
                'image/jpeg',
                'image/png',
                'image/webp',
            ]);

        $this->addMediaCollection('documents')
            ->acceptsMimeTypes([
                'application/pdf',
                'application/msword',
            ]);
    }

    public function registerMediaConversions(?Media $media = null): void
    {
        $this->addMediaConversion('thumb')
            ->fit(Fit::Contain, 300, 300)
            ->nonQueued();

        $this->addMediaConversion('preview')
            ->fit(Fit::Max, 1200, 1200)
            ->format('webp');
    }
}