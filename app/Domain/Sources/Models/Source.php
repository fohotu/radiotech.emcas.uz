<?php
namespace App\Domain\Sources\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Source extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'title',
        'source_type',
        'identifier',
        'publisher',
        'description',
        'url',
        'metadata',
    ];

    protected function casts(): array
    {
        return [
            'metadata' => 'array',
        ];
    }

    public function editions(): HasMany
    {
        return $this->hasMany(SourceEdition::class);
    }
}
