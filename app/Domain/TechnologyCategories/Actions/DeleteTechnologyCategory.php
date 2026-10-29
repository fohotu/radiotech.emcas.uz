<?php
namespace App\Domain\TechnologyCategories\Actions;

use App\Domain\TechnologyCategories\Models\TechnologyCategory;
use Illuminate\Support\Facades\DB;

class DeleteTechnologyCategory
{
    public function execute(TechnologyCategory $category): void
    {
        DB::transaction(function () use ($category) {
            $category->delete();
        });
    }
}
