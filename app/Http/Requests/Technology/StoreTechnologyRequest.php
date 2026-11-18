<?php
namespace App\Http\Requests\Technology;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;
use Illuminate\Support\Str;
use App\Domain\Technologies\Models\Technology;

class StoreTechnologyRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'category_id' => ['required', 'integer', 'exists:technology_categories,id'],
            'slug' => ['nullable', 'string', 'max:255', 'alpha_dash', 'unique:technologies,slug'],
            'abbreviation' => ['nullable', 'string', 'max:100'],
            'status' => ['required', 'string', 'in:draft,published,archived'],
            'translations' => ['required', 'array'],
           // 'translations.*.locale' => ['required', 'string', 'in:ru,uz,en'],
            'translations.*.name' => ['nullable', 'string', 'max:255'],
            'translations.*.description' => ['nullable', 'string'],
        ];
    }

    protected function prepareForValidation(): void
    {
        $translations = $this->input('translations', []);

        // Ищем имя для генерации slug: сначала то, что ввел пользователь в slug, 
        // либо берем название из доступных языков перевода
        $source = $this->slug 
            ?? $translations['ru']['name'] 
            ?? $translations['uz']['name'] 
            ?? $translations['en']['name'] 
            ?? null;

        if ($source) {
            $slug = Str::slug($source);
            $originalSlug = $slug;
            $count = 1;

            // Проверяем уникальность в базе данных
            // (Если это обновление, нужно исключить текущую запись: ->where('id', '!=', $this->route('technology')?->id))
            while (Technology::where('slug', $slug)->exists()) {
                $slug = "{$originalSlug}-{$count}";
                $count++;
            }

            
            // Если вы используете метод merge в Form Request, достаточно написать так:
            $this->merge(['slug' => $slug]);
        }
    }

    public function after(): array
    {
        return [
            function (Validator $validator) {
                $translations = $this->input('translations', []);

                $hasTitle = collect(['ru', 'uz', 'en'])
                    ->contains(
                        fn ($language) => filled(
                            $translations[$language]['name'] ?? null
                        )
                    );

                if (! $hasTitle) {
                    $validator->errors()->add(
                        'translations',
                        'Введите название термина хотя бы на одном языке.'
                    );
                }
            },
        ];
    }
}