<?php
namespace App\Domain\TechnologyCategories\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TechnologyCategoryTranslation extends Model
{
    protected $table = 'technology_category_translations';

    protected $fillable = [
        'technology_category_id',
        'locale',
        'name',
        'description',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(
            TechnologyCategory::class,
            'technology_category_id',
        );
    }
}
