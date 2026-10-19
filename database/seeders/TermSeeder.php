<?php
namespace Database\Seeders;

use App\Domain\Terms\Models\Term;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class TermSeeder extends Seeder
{
    public function run(): void
    {
        $samples = [
            [
                'en' => [
                    'title' => 'Database',
                    'description' => 'An organized collection of data.',
                    'definition' => 'A structured collection of information stored and accessed electronically.',
                    'pronunciation' => 'ˈdeɪtəbeɪs',
                    'usage_note' => 'Commonly used in software development.',
                ],
                'ru' => [
                    'title' => 'База данных',
                    'description' => 'Организованная совокупность данных.',
                    'definition' => 'Структурированная совокупность информации, хранящейся и обрабатываемой электронным способом.',
                    'pronunciation' => null,
                    'usage_note' => 'Часто используется в разработке программного обеспечения.',
                ],
                'uz' => [
                    'title' => 'Ma’lumotlar bazasi',
                    'description' => 'Tartiblangan ma’lumotlar to‘plami.',
                    'definition' => 'Elektron shaklda saqlanadigan va qayta ishlanadigan tuzilgan ma’lumotlar majmuasi.',
                    'pronunciation' => null,
                    'usage_note' => 'Dasturiy ta’minot ishlab chiqishda keng qo‘llaniladi.',
                ],
                'aliases' => [
                    'en' => ['DB', 'Data store'],
                    'ru' => ['БД'],
                    'uz' => ['MB'],
                ],
            ],
            [
                'en' => [
                    'title' => 'Application Programming Interface',
                    'description' => 'An interface for communication between software components.',
                    'definition' => 'A set of rules and protocols that allows software components to communicate.',
                    'pronunciation' => null,
                    'usage_note' => 'Often abbreviated as API.',
                ],
                'ru' => [
                    'title' => 'Программный интерфейс приложения',
                    'description' => 'Интерфейс взаимодействия программных компонентов.',
                    'definition' => 'Набор правил и протоколов, обеспечивающих взаимодействие программных компонентов.',
                    'pronunciation' => null,
                    'usage_note' => 'Часто обозначается аббревиатурой API.',
                ],
                'uz' => [
                    'title' => 'Dasturiy interfeys',
                    'description' => 'Dasturiy komponentlarning o‘zaro aloqa interfeysi.',
                    'definition' => 'Dasturiy komponentlarning o‘zaro ishlashini ta’minlaydigan qoidalar va protokollar to‘plami.',
                    'pronunciation' => null,
                    'usage_note' => 'Ko‘pincha API qisqartmasi bilan ifodalanadi.',
                ],
                'aliases' => [
                    'en' => ['API', 'Software interface'],
                    'ru' => ['API'],
                    'uz' => ['API'],
                ],
            ],
            [
                'en' => [
                    'title' => 'Framework',
                    'description' => 'A reusable structure for building software applications.',
                    'definition' => 'A reusable set of components and conventions that provides a foundation for application development.',
                    'pronunciation' => null,
                    'usage_note' => 'Laravel is a PHP framework.',
                ],
                'ru' => [
                    'title' => 'Фреймворк',
                    'description' => 'Готовая структура для разработки программных приложений.',
                    'definition' => 'Набор повторно используемых компонентов и соглашений, служащий основой разработки приложений.',
                    'pronunciation' => null,
                    'usage_note' => 'Laravel является PHP-фреймворком.',
                ],
                'uz' => [
                    'title' => 'Freymvork',
                    'description' => 'Dasturiy ilovalarni yaratish uchun tayyor tuzilma.',
                    'definition' => 'Ilovalarni ishlab chiqish uchun asos bo‘ladigan qayta ishlatiladigan komponentlar va qoidalar to‘plami.',
                    'pronunciation' => null,
                    'usage_note' => 'Laravel PHP freymvorkidir.',
                ],
                'aliases' => [
                    'en' => ['Development framework'],
                    'ru' => ['Программный каркас'],
                    'uz' => ['Dasturiy karkas'],
                ],
            ],
        ];

        /*
        //mysql
        DB::statement('SET FOREIGN_KEY_CHECKS=0');

        DB::table('term_revisions')->truncate();
        DB::table('term_aliases')->truncate();
        DB::table('term_definitions')->truncate();
        DB::table('term_translations')->truncate();
        DB::table('terms')->truncate();

        DB::statement('SET FOREIGN_KEY_CHECKS=1');
        */

        //sqlite
        DB::statement('PRAGMA foreign_keys = OFF');

        try {
            DB::table('term_revisions')->delete();
            DB::table('term_aliases')->delete();
            DB::table('term_definitions')->delete();
            DB::table('term_translations')->delete();
            DB::table('terms')->delete();
        } finally {
            DB::statement('PRAGMA foreign_keys = ON');
        }

        DB::transaction(function () use ($samples) {
            foreach (range(1, 50) as $i) {
                $sample = $samples[($i - 1) % count($samples)];

                $status = fake()->randomElement([
                    'draft',
                    'published',
                    'archived',
                ]);

                $term = Term::create([
                    'uuid' => (string) Str::uuid(),
                    'status' => $status,
                    'created_by' => null,
                    'updated_by' => null,
                    'view_count' => fake()->numberBetween(0, 5000),
                    'published_at' => $status === 'published'
                        ? fake()->dateTimeBetween('-2 years', 'now')
                        : null,
                ]);

                foreach (['en', 'ru', 'uz'] as $languageCode) {
                    $translation = $sample[$languageCode];

                    $title = $translation['title'];

                    // Give repeated sample terms unique titles.
                    if ($i > count($samples)) {
                        $title .= " {$i}";
                    }

                    $term->translations()->create([
                        'language_code' => $languageCode,
                        'title' => $title,
                        'description' => $translation['description'],
                        'pronunciation' => $translation['pronunciation'],
                        'usage_note' => $translation['usage_note'],
                        'slug' => Str::slug($title) . '-' . $i,
                    ]);

                    $term->definitions()->create([
                        'language_code' => $languageCode,
                        'definition' => $translation['definition'],
                        'source_edition_id' => null,
                        'page_reference' => null,
                        'clause_reference' => null,
                        'is_preferred' => true,
                        'editorial_note' => 'Generated test data.',
                    ]);

                    foreach ($sample['aliases'][$languageCode] as $alias) {
                        $term->aliases()->create([
                            'language_code' => $languageCode,
                            'alias' => $alias,
                            'alias_type' => 'synonym',
                            'is_preferred' => false,
                            'source_edition_id' => null,
                            'notes' => 'Generated test data.',
                        ]);
                    }
                }

                // Revision creation is omitted here because
                // the term_revisions migration has not been provided.
            }
        });
    }
}
