<?php
namespace App\Domain\Media\Actions;

use Illuminate\Support\Facades\DB;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class DeleteMediaAction
{
    public function execute(Media $media): void
    {
        DB::transaction(function () use ($media) {
            $media->delete();
        });
    }
}
