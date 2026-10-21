<?php

namespace App\Domain\Terms\Models;

use Illuminate\Database\Eloquent\Model;

class TermTranslation extends Model
{
    protected $fillable = [
        'term_id',
        'language_code',
        'title',
        'description',
        'pronunciation',
        'usage_note',
        'slug',
        'created_by',
        'updated_by',
    ];
}
