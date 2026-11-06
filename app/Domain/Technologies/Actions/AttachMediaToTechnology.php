<?php

namespace App\Domain\Technologies\Actions;

use App\Domain\Media\Models\Media;
use App\Domain\Media\Models\MediaLibrary;
use App\Domain\Technologies\Models\Technology;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class AttachMediaToTechnology
{
    public function execute(Technology $technology, int $mediaId): void
    {
        DB::transaction(function () use ($technology, $mediaId) {

            $library = MediaLibrary::findOrFail(1);
           // dd($library->getMorphClass());
           
            $media = Media::query()
                ->where('model_type', $library->getMorphClass())
                ->where('model_id', $library->id)
                ->where('collection_name', 'images')
                ->findOrFail($mediaId);
           

            // У Technology только одно основное изображение
            $technology->libraryMedia()->sync([$media->id]);
        });
    }
}