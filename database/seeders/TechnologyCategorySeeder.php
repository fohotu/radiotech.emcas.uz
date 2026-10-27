<?php
namespace Database\Seeders;

use App\Domain\TechnologyCategories\Models\TechnologyCategory;
use App\Domain\TechnologyCategories\Models;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TechnologyCategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            [
                'slug' => 'mobile-communications',
                'name' => 'Mobil aloqa',
                'translations' => [
                    'ru' => [
                        'name' => 'Мобильная связь',
                        'description' => 'Технологии мобильной сотовой связи.',
                    ],
                    'uz' => [
                        'name' => 'Mobil aloqa',
                        'description' => 'Mobil uyali aloqa texnologiyalari.',
                    ],
                    'en' => [
                        'name' => 'Mobile Communications',
                        'description' => 'Mobile cellular communication technologies.',
                    ],
                ],
            ],
            [
                'slug' => 'satellite-communications',
                'name' => 'Sun’iy yo‘ldosh aloqasi',
                'translations' => [
                    'ru' => [
                        'name' => 'Спутниковая связь',
                        'description' => 'Технологии связи с использованием спутников.',
                    ],
                    'uz' => [
                        'name' => 'Sun’iy yo‘ldosh aloqasi',
                        'description' => 'Sun’iy yo‘ldoshlar orqali aloqa texnologiyalari.',
                    ],
                    'en' => [
                        'name' => 'Satellite Communications',
                        'description' => 'Communication technologies using satellites.',
                    ],
                ],
            ],
            [
                'slug' => 'wireless-access',
                'name' => 'Simsiz ulanish',
                'translations' => [
                    'ru' => [
                        'name' => 'Беспроводной доступ',
                        'description' => 'Технологии беспроводного доступа к сетям.',
                    ],
                    'uz' => [
                        'name' => 'Simsiz ulanish',
                        'description' => 'Tarmoqlarga simsiz ulanish texnologiyalari.',
                    ],
                    'en' => [
                        'name' => 'Wireless Access',
                        'description' => 'Wireless network access technologies.',
                    ],
                ],
            ],
            [
                'slug' => 'radio-broadcasting',
                'name' => 'Radioeshittirish',
                'translations' => [
                    'ru' => [
                        'name' => 'Радиовещание',
                        'description' => 'Технологии передачи радио- и телевизионных программ.',
                    ],
                    'uz' => [
                        'name' => 'Radioeshittirish',
                        'description' => 'Radio va televizion dasturlarni uzatish texnologiyalari.',
                    ],
                    'en' => [
                        'name' => 'Radio Broadcasting',
                        'description' => 'Technologies for transmitting radio and television programs.',
                    ],
                ],
            ],
            [
                'slug' => 'internet-of-things',
                'name' => 'Buyumlar interneti',
                'translations' => [
                    'ru' => [
                        'name' => 'Интернет вещей',
                        'description' => 'Технологии связи между устройствами интернета вещей.',
                    ],
                    'uz' => [
                        'name' => 'Buyumlar interneti',
                        'description' => 'Buyumlar interneti qurilmalari o‘rtasidagi aloqa texnologiyalari.',
                    ],
                    'en' => [
                        'name' => 'Internet of Things',
                        'description' => 'Communication technologies for Internet of Things devices.',
                    ],
                ],
            ],
        ];

        DB::transaction(function () use ($categories) {
            foreach ($categories as $item) {
                $category = TechnologyCategory::updateOrCreate(
                    [
                        'slug' => $item['slug'],
                        'name' => $item['name']
                    ],
                );

                foreach ($item['translations'] as $locale => $translation) {
                    $category->translations()->updateOrCreate(
                        ['locale' => $locale],
                        [
                            'name' => $translation['name'],
                            'description' => $translation['description'],
                        ],
                    );
                }
            }
        });
    }
}
