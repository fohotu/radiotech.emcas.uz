<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Domain\Terms\Actions\CreateTerm;
use App\Domain\Terms\Actions\DeleteTerm;
use App\Domain\Terms\Actions\RestoreTerm;
use App\Domain\Terms\Actions\UpdateTerm;
use App\Domain\Terms\Models\Term;
use App\Domain\Terms\Queries\SearchTerms;
use App\Http\Requests\Terms\StoreTermRequest;
use App\Http\Requests\UpdateTermRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TermController extends Controller
{
    public function index(Request $request,SearchTerms $searchTerms): Response {
        
        $query = $request->only(['search', 'status']);
        $terms = $searchTerms->execute($query);
        return Inertia::render('Terms/Index', [
            'terms' => $terms,
            'filters' => $query,
        ]);

    }

    public function show(Term $term): Response
    {
        $term->load(['translations', 'definitions', 'aliases']);

        return Inertia::render('Terms/Show', [
            'term' => $term,
        ]);
    }

    public function store(StoreTermRequest $request,CreateTerm $action): RedirectResponse {
        
       // dd($request);

        $action->execute(
            $request->validated(),
            mt_rand(100000, 999999),
           // (int) $request->user()->id
        );

        return to_route('terms.index')
            ->with('success', 'Термин создан.');
    }

    public function update(
        UpdateTermRequest $request,
        Term $term,
        UpdateTerm $action
    ): RedirectResponse {
        $action->execute(
            $term,
            $request->validated(),
            (int) $request->user()->id
        );

        return to_route('terms.index')
            ->with('success', 'Термин обновлён.');
    }

    public function destroy(
        Term $term,
        DeleteTerm $action
    ): RedirectResponse {
        $action->execute($term);

        return to_route('terms.index')
            ->with('success', 'Термин удалён.');
    }

    public function restore(
        int $id,
        RestoreTerm $action
    ): RedirectResponse {
        $action->execute($id);

        return to_route('terms.index')
            ->with('success', 'Термин восстановлен.');


    }


    public function create(): Response
    {
       // dd('create');
        return Inertia::render('Terms/Create');
    }

    public function edit(Term $term): Response
    {
        $term->load(['translations', 'definitions', 'aliases']);

        return Inertia::render('Terms/Edit', [
            'term' => $term,
        ]);
    }
}