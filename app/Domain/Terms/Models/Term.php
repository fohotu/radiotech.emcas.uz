<?php
namespace App\Domain\Terms\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Term extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'uuid',
        'status',
        'created_by',
        'updated_by',
        'view_count',
        'published_at',
    ];

    protected function casts(): array
    {
        return [
            'published_at' => 'datetime',
            'view_count' => 'integer',
        ];
    }

    public function translations(): HasMany
    {
        return $this->hasMany(TermTranslation::class);
    }

    public function definitions(): HasMany
    {
        return $this->hasMany(TermDefinition::class);
    }

    public function aliases(): HasMany
    {
        return $this->hasMany(TermAlias::class);
    }

    public function revisions(): HasMany
    {
        return $this->hasMany(TermRevision::class);
    }

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(\App\Models\User::class, 'created_by');
    }

    public function updatedBy(): BelongsTo
    {
        return $this->belongsTo(\App\Models\User::class, 'updated_by');
    }
}