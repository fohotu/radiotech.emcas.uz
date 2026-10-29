<?php
namespace App\Http\Requests\TechnologyCategory;

use App\Domain\Technologies\Models\TechnologyCategory;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateTechnologyCategoryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        /** @var TechnologyCategory|null $category */
        $category = $this->route('technologyCategory');

        $categoryId = $category instanceof TechnologyCategory
            ? $category->id
            : $category;

        return [
            'parent_id' => [
                'nullable',
                'integer',
                Rule::exists('technology_categories', 'id')
                    ->whereNull('deleted_at'),
                Rule::notIn([$categoryId]),
            ],

            'slug' => [
                'required',
                'string',
                'max:255',
                'alpha_dash',
                Rule::unique('technology_categories', 'slug')
                    ->ignore($categoryId),
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
