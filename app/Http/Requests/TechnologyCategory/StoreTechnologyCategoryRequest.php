<?php
namespace App\Http\Requests\TechnologyCategory;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreTechnologyCategoryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'parent_id' => [
                'nullable',
                'integer',
                Rule::exists('technology_categories', 'id')
                    ->whereNull('deleted_at'),
            ],

            'slug' => [
                'required',
                'string',
                'max:255',
                'alpha_dash',
                Rule::unique('technology_categories', 'slug'),
            ],

            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],

            'sort_order' => ['sometimes', 'integer', 'min:0'],
            'is_published' => ['sometimes', 'boolean'],

            'translations' => ['sometimes', 'array'],
            'translations.ru' => ['sometimes', 'array'],
            'translations.uz' => ['sometimes', 'array'],
            'translations.en' => ['sometimes', 'array'],

            'translations.ru.name' => [
                'nullable', 'string', 'max:255',
            ],
            'translations.ru.description' => [
                'nullable', 'string',
            ],

            'translations.uz.name' => [
                'nullable', 'string', 'max:255',
            ],
            'translations.uz.description' => [
                'nullable', 'string',
            ],

            'translations.en.name' => [
                'nullable', 'string', 'max:255',
            ],
            'translations.en.description' => [
                'nullable', 'string',
            ],
        ];
    }
}
