<?php
namespace App\Domain\Terms\Models;

use Illuminate\Database\Eloquent\Model;

class TermDefinition extends Model
{
    
    protected $fillable = [
        'term_id',
        'language_code',
        'definition',
        'is_preferred',
        'created_by',
        'updated_by',
    ];
    
}
