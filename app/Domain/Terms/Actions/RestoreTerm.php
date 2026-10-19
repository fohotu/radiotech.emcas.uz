<?php

namespace App\Domain\Terms\Actions;

use App\Domain\Terms\Models\Term;

class RestoreTerm
{
    public function execute(int $id): Term
    {
        $term = Term::withTrashed()->findOrFail($id);

        $term->restore();

        return $term;
    }
}