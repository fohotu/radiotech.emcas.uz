<?php

namespace App\Domain\Technologies\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TechnologyTranslation extends Model
{
    protected $fillable = [
        'technology_id',
        'locale',
        'name',
        'description',
    ];

    public function technology(): BelongsTo
    {
        return $this->belongsTo(Technology::class, 'technology_id');
    }
}