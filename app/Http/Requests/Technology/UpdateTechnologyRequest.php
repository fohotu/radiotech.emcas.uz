<?php

namespace App\Http\Requests\Technology;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateTechnologyRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $technology = $this->route('technology');

        return [
            'category_id' => [
                'required',
                'integer',
                'exists:technology_categories,id',
            ],

            'slug' => [
                'nullable',
                'string',
                'max:255',
                'alpha_dash',
                Rule::unique('technologies', 'slug')
                    ->ignore($technology),
            ],

            'abbreviation' => [
                'nullable',
                'string',
                'max:100',
            ],

            'status' => [
                'required',
                'string',
                'in:draft,published,archived',
            ],

            'translations' => [
                'required',
                'array',
            ],

            'translations.ru' => [
                'required',
                'array',
            ],
            'translations.ru.name' => [
                'nullable',
                'string',
                'max:255',
            ],
            'translations.ru.description' => [
                'nullable',
                'string',
            ],

            'translations.uz' => [
                'required',
                'array',
            ],
            'translations.uz.name' => [
                'nullable',
                'string',
                'max:255',
            ],
            'translations.uz.description' => [
                'nullable',
                'string',
            ],

            'translations.en' => [
                'required',
                'array',
            ],
            'translations.en.name' => [
                'nullable',
                'string',
                'max:255',
            ],
            'translations.en.description' => [
                'nullable',
                'string',
            ],
        ];
    }
}
