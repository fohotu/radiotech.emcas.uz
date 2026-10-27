<?php

namespace App\Domain\Technologies\Actions;

use App\Domain\Technologies\Models\Technology;
use Illuminate\Support\Facades\DB;

class DeleteTechnology
{
    public function execute(Technology $technology): void
    {
        DB::transaction(function () use ($technology) {
            $technology->translations()->delete();
            $technology->delete();
        });
    }
}