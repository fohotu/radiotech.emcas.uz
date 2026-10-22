<?php
namespace App\Domain\Sources\Actions;

use App\Domain\Sources\Models\Source;
use Illuminate\Support\Arr;

class CreateSource
{
    public function execute(array $data): Source
    {
        return Source::create(
            Arr::only($data, [
                'title',
                'source_type',
                'identifier',
                'publisher',
                'description',
                'url',
                'metadata',
            ])
        );
    }
}
