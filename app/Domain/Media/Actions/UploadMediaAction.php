<?php
namespace App\Domain\Media\Actions;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class UploadMediaAction
{
    public function execute(
        HasMedia $model,
        UploadedFile $file,
        string $collection = 'default',
        array $properties = [],
        ?string $disk = null
    ): Media {
        return DB::transaction(function () use (
            $model,
            $file,
            $collection,
            $properties,
            $disk
        ) {
            $adder = $model
                ->addMedia($file)
                ->withCustomProperties($properties);

            if ($disk) {
                $adder->toMediaCollection($collection, $disk);
            } else {
                $adder->toMediaCollection($collection);
            }

            return $model->getMedia($collection)->last();
            
        });
    }
}
