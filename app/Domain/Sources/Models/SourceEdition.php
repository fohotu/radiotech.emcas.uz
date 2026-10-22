<?php
namespace App\Domains\Sources\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SourceEdition extends Model
{
    protected $fillable = [
        'source_id',
        'edition_label',
        'version',
        'published_on',
        'effective_from',
        'effective_until',
        'status',
        'document_url',
        'file_path',
        'notes',
        'metadata',
    ];

    protected function casts(): array
    {
        return [
            'published_on' => 'date',
            'effective_from' => 'date',
            'effective_until' => 'date',
            'metadata' => 'array',
        ];
    }

    public function source(): BelongsTo
    {
        return $this->belongsTo(Source::class);
    }
}