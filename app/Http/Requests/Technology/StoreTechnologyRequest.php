<?php
namespace App\Http\Requests\Technology;

use Illuminate\Foundation\Http\FormRequest;

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
}