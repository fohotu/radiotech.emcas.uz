<?php
namespace App\Http\Controllers\Admin;

use App\Domain\TechnologyCategories\Actions\CreateTechnologyCategory;
use App\Domain\TechnologyCategories\Actions\DeleteTechnologyCategory;
use App\Domain\TechnologyCategories\Actions\UpdateTechnologyCategory;
use App\Domain\TechnologyCategories\Models\TechnologyCategory;
use App\Http\Controllers\Controller;
use App\Http\Requests\TechnologyCategory\StoreTechnologyCategoryRequest;
use App\Http\Requests\TechnologyCategory\UpdateTechnologyCategoryRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TechnologyCategoryController extends Controller
{
    public function index(Request $request): Response
    {
        $filters = $request->only([
            'search',
            'parent_id',
            'is_published',
            'per_page',
        ]);

        $categories = TechnologyCategory::query()
            ->with(['translations', 'parent'])
            ->when(
                $filters['search'] ?? null,
                function ($query, $search) {
                    $query->where(function ($query) use ($search) {
                        $query->where('name', 'like', "%{$search}%")
                            ->orWhere('slug', 'like', "%{$search}%")
                            ->orWhereHas(
                                'translations',
                                fn ($query) => $query
                                    ->where('name', 'like', "%{$search}%")
                            );
                    });
                }
            )
            ->when(
                $filters['parent_id'] ?? null,
                fn ($query, $parentId) => $query
                    ->where('parent_id', $parentId)
            )
            ->when(
                isset($filters['is_published'])
                    && $filters['is_published'] !== '',
                fn ($query) => $query->where(
                    'is_published',
                    $filters['is_published']
                )
            )
            ->orderBy('sort_order')
            ->orderBy('name')
            ->paginate((int) ($filters['per_page'] ?? 15))
            ->withQueryString();

        return Inertia::render('TechnologyCategories/Index', [
            'categories' => $categories,
            'parentCategories' => TechnologyCategory::query()
                ->orderBy('name')
                ->get(['id', 'parent_id', 'name']),
            'filters' => $filters,
        ]);
    }

    public function store(
        StoreTechnologyCategoryRequest $request,
        CreateTechnologyCategory $action
    ): RedirectResponse {
        $action->execute($request->validated());

        return redirect()
            ->back()
            ->with('success', 'Категория успешно создана!');
    }

    public function update(UpdateTechnologyCategoryRequest $request,TechnologyCategory $technologyCategory,UpdateTechnologyCategory $action): RedirectResponse {
        $action->execute($technologyCategory,$request->validated());
        return redirect()->route('technology-categories.index')->with('success', 'Категория успешно обновлена!');
    }

    public function destroy(
        TechnologyCategory $technologyCategory,
        DeleteTechnologyCategory $action
    ): RedirectResponse {
        $action->execute($technologyCategory);

        return redirect()
            ->route('technology-categories.index')
            ->with('success', 'Категория успешно удалена!');
    }
}
