<?php
namespace App\Domain\Sources\Actions;

use App\Domain\Sources\Models\Source;
use Illuminate\Support\Arr;

class UpdateSource
{
    public function execute(Source $source, array $data): Source
    {
        $source->update(
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

        return $source->refresh();
    }
}
