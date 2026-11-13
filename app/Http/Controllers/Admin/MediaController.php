<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use App\Domain\Technologies\Models\Technology;
use App\Domain\Media\Actions\UploadMediaAction;
use App\Domain\Media\Actions\DeleteMediaAction;
use App\Http\Requests\Media\UploadMediaRequest;
use App\Domain\Media\Models\MediaUpload;
use App\Domain\Media\Models\MediaLibrary;
use Illuminate\Support\Str;

class MediaController extends Controller
{
    
    public function store(UploadMediaRequest $request,UploadMediaAction $action) {
        
        $library = MediaLibrary::firstOrCreate(['id' => 1]);
        $media = $action->execute(
            model: $library,
            file: $request->file('file'),
            collection: $request->collection(),
            properties: $request->properties(),
        );
        
        return response()->json([
            'media' => [
                'id' => $media->id,
                'uuid' => $media->uuid,
                'name' => $media->name,
                'file_name' => $media->file_name,
                'mime_type' => $media->mime_type,
                'size' => $media->size,
                'url' => $media->getUrl(),
                'thumbnail' => $media->getUrl('thumb'),
            ],
        ], 201);
        

    }

    public function store2(UploadMediaRequest $request,UploadMediaAction $action) {
        
        
        $upload = MediaUpload::create([
            'uuid' => (string) Str::uuid(),
        ]);

        $media = $action->execute(
            model: $upload,
            file: $request->file('file'),
            collection: $request->collection(),
            properties: $request->properties(),
        );

        return response()->json([

            'media' => [
                'id' => $media->id,
                'uuid' => $media->uuid,
                'name' => $media->name,
                'file_name' => $media->file_name,
                'mime_type' => $media->mime_type,
                'size' => $media->size,
                'url' => $media->getUrl(),
                'thumbnail' => $media->hasGeneratedConversion('thumb')
                    ? $media->getUrl('thumb')
                    : $media->getUrl(),
            ],
        ], 201);

    }


    public function store1(
        UploadMediaRequest $request,
        Technology $technology,
        UploadMediaAction $action
    ) {
      //  $this->authorize('update', $technology);
        $media = $action->execute(
            model: $technology,
            file: $request->file('file'),
            collection: $request->collection(),
            properties: $request->properties(),
          //disk: $request->disk(),
        );

    

        return response()->json([
            'media' => [
                'id' => $media->id,
                'name' => $media->name,
                'file_name' => $media->file_name,
                'mime_type' => $media->mime_type,
                'url' => $media->getUrl(),
                'thumb_url' => $media->hasGeneratedConversion('thumb')
                    ? $media->getUrl('thumb')
                    : $media->getUrl(),
            ],
        ]);
    }

    public function destroy(
        Media $media,
        DeleteMediaAction $action
    ) {

       // $this->authorize('update', $media->model);
        $action->execute($media);

        return response()->json([
            'message' => 'File deleted successfully',
        ]);
    }



    public function Index()
    {
        $media = Media::query()
            ->latest()
            ->get()
            ->map(fn ($item) => [
                'id' => $item->id,
                'uuid' => $item->uuid,
                'model_type' => $item->model_type,
                'model_id' => $item->model_id,
                'collection_name' => $item->collection_name,
                'name' => $item->name,
                'file_name' => $item->file_name,
                'mime_type' => $item->mime_type,
                'size' => $item->size,
                'url' => $item->getUrl(),
                'thumbnail' => $item->hasGeneratedConversion('thumb')
                    ? $item->getUrl('thumb')
                    : $item->getUrl(),
            ])
            ->values();

        return inertia('Media/Index', [
          //  'technology' => $technology->toArray(),
            'media' => $media,
        ]);

    }
    
}