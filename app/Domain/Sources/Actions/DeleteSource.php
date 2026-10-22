<?php
namespace App\Domain\Sources\Actions;

use App\Domain\Sources\Models\Source;

class DeleteSource
{
    public function execute(Source $source): void
    {
        $source->delete();
    }
}
