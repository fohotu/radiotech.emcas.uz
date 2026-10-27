<?php
namespace App\Domain\Technologies\Actions;

use App\Domain\Technologies\Models\Technology;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class CreateTechnology
{
    public function execute(array $data): Technology
    {
        return DB::transaction(function () use ($data) {
            $translations = $data['translations'] ?? [];

            unset(
                $data['translations'],
               //$data['name'],
                $data['description']
            );

            //dd($translations);

            $data['name'] =  $translations['en']['name']
                    ?? $translations['ru']['name']
                    ?? $translations['uz']['name'];

            $data['slug'] = $data['slug'] ?? Str::slug(
                $translations['en']['name']
                    ?? $translations['ru']['name']
                    ?? $translations['uz']['name']
                    ?? Str::uuid()->toString()
            );
/*

array:4 [▼ // app/Domain/Technologies/Actions/CreateTechnology.php:28
  "category_id" => "7"
  "slug" => "3456"
  "abbreviation" => "54"
  "status" => "draft"
]

*/
          //  dd($data);

            $technology = Technology::create($data);

            foreach ($translations as $locale => $translation) {
                if (empty($translation['name'])) {
                    continue;
                }

                $technology->translations()->create([
                    'locale' => $locale,
                    'name' => $translation['name'],
                    'description' => $translation['description'] ?? null,
                ]);
            }
            return $technology->load('translations');

        });
    }
}