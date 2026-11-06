<?php
namespace App\Http\Controllers\Admin;

use App\Domain\Technologies\Queries\SearchTechnologies;
use App\Domain\Technologies\Models\Technology;
use App\Http\Controllers\Controller;
use App\Domain\TechnologyCategories\Models\TechnologyCategory;
use App\Domain\Media\Queries\MediaQuery;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;


use App\Domain\Technologies\Actions\CreateTechnology;
use App\Domain\Technologies\Actions\UpdateTechnology;
use App\Domain\Technologies\Actions\DeleteTechnology;
use App\Domain\Technologies\Actions\AttachMediaToTechnology;
use App\Http\Requests\Technology\StoreTechnologyRequest;
use App\Http\Requests\Technology\UpdateTechnologyRequest;
use App\Http\Requests\Technology\AttachMediaRequest;
use Illuminate\Http\RedirectResponse;

class TechnologyController extends Controller
{
    public function index(Request $request,SearchTechnologies $query,MediaQuery $mediaQuery): Response {
        
        
        $filters = $request->only([
            'search',
            'category_id',
            'status',
            'per_page',
        ]);

        $c = Technology::class;
       //dd($c);
        
        $media = $mediaQuery->get([
            //'model_type' => Technology::class,
        ]);

        $media = $media->map(fn ($media) => [
            'id' => $media->id,
            'name' => $media->name,
            'file_name' => $media->file_name,
            'mime_type' => $media->mime_type,
            'size' => $media->size,
            'url' => $media->getUrl(),
            'thumbnail' => $media->hasGeneratedConversion('thumb')
                ? $media->getUrl('thumb')
                : $media->getUrl(),
        ])->values();

        

        return Inertia::render('Technologies/Index', [
            'technologies' => $query->execute($filters),
            'categories' => TechnologyCategory::query()
                ->orderBy('name')
                ->get(['id', 'name']),
            'filters' => $filters,
            'media' => $media,
           
        ]);

    }



    public function store(StoreTechnologyRequest $request,CreateTechnology $action): RedirectResponse {
        
       // dd($request);
        $action->execute($request->validated());
        return redirect()->back()->with('success','Технология успешно создана!');

    }


    public function update(UpdateTechnologyRequest $request,Technology $technology,UpdateTechnology $action) {
        $action->execute($technology,$request->validated());
        return redirect()->route('technologies.index')->with('success', 'Technology updated successfully');
    }


    public function destroy(Technology $technology,DeleteTechnology $action): RedirectResponse {
        $action->execute($technology);
        return redirect()->route('technologies.index')->with('success', 'Technology deleted successfully.');
    }


    public function edit(Technology $technology)
    {
        return inertia('Technologies/EditTechnology', [
            'technology' => [
                ...$technology->toArray(),
                'media' => $technology
                    ->getMedia('images')
                    ->map(fn ($media) => [
                        'id' => $media->id,
                        'name' => $media->name,
                        'file_name' => $media->file_name,
                        'mime_type' => $media->mime_type,
                        'size' => $media->size,
                        'url' => $media->getUrl(),
                        'thumbnail' => $media->hasGeneratedConversion('thumb')
                            ? $media->getUrl('thumb')
                            : $media->getUrl(),
                    ])
                    ->values(),
            ],
        ]);
    }

    
    public function attachMedia(AttachMediaRequest $request,Technology $technology,AttachMediaToTechnology $action) {    
       //dd($technology,$request->validated('media_id'));
        $action->execute($technology,$request->validated('media_id'));
        return back()->with('success', 'Image attached successfully.');
    }

    
}
