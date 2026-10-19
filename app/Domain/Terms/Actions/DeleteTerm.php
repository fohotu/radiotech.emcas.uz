<?php

namespace App\Domain\Terms\Actions;

use App\Domain\Terms\Models\Term;

class DeleteTerm
{
    public function execute(Term $term): void
    {
        $term->delete();
    }
}