<?php
namespace App\Http\Controllers\Admin;

use App\Domain\Technologies\Queries\SearchTechnologies;
use App\Domain\Technologies\Models\Technology;
use App\Http\Controllers\Controller;
use App\Domain\TechnologyCategories\Models\TechnologyCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;


use App\Domain\Technologies\Actions\CreateTechnology;
use App\Domain\Technologies\Actions\UpdateTechnology;
use App\Domain\Technologies\Actions\DeleteTechnology;
use App\Http\Requests\Technology\StoreTechnologyRequest;
use App\Http\Requests\Technology\UpdateTechnologyRequest;
use Illuminate\Http\RedirectResponse;

class TechnologyController extends Controller
{
    public function index(Request $request,SearchTechnologies $query): Response {
        
        $filters = $request->only([
            'search',
            'category_id',
            'status',
            'per_page',
        ]);

        return Inertia::render('Technologies/Index', [
            'technologies' => $query->execute($filters),
            'categories' => TechnologyCategory::query()
                ->orderBy('name')
                ->get(['id', 'name']),
            'filters' => $filters,
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


    
}
