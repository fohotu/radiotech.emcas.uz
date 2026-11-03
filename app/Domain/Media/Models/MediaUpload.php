<?php 
namespace App\Domain\Media\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class MediaUpload extends Model implements HasMedia
{
    use InteractsWithMedia;

    protected $fillable = [
        'uuid',
    ];
}