<?php

namespace App\Http\Controllers\Admin;


use App\Http\Controllers\Controller;
use App\Http\Requests\Source\StoreSourceRequest;
use Illuminate\Http\RedirectResponse;


use App\Domain\Sources\Actions\CreateSource;
use App\Domain\Sources\Queries\SearchSources;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SourceController extends Controller
{

    public function index(Request $request,SearchSources $query): Response {
        $sources = $query->execute(
            $request->only([
                'search',
                'source_type',
                'publisher',
                'with_editions',
                'per_page',
            ])
        );

        return Inertia::render('Sources/Index', [
            'sources' => $sources,
            'filters' => $request->only([
                'search',
                'source_type',
                'publisher',
            ]),
        ]);
    }


    public function store(StoreSourceRequest $request,CreateSource $action): RedirectResponse {
        $action->execute($request->validated());
        return redirect()->back()->with('success', 'Источник успешно создан!');
    }

}