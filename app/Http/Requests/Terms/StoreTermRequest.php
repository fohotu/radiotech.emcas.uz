<?php

namespace App\Http\Requests\Terms;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;

class StoreTermRequest extends FormRequest
{

    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    

    public function rules(): array
    {
        return [
            'status' => [
                'required',
                'string',
                'in:draft,published,archived',
            ],

            'translations' => [
                'required',
                'array',
            ],

            'translations.ru' => ['nullable', 'array'],
            'translations.uz' => ['nullable', 'array'],
            'translations.en' => ['nullable', 'array'],

            // Название
            'translations.ru.title' => ['nullable', 'string', 'max:255'],
            'translations.uz.title' => ['nullable', 'string', 'max:255'],
            'translations.en.title' => ['nullable', 'string', 'max:255'],

            // Краткое описание
            'translations.ru.description' => ['nullable', 'string'],
            'translations.uz.description' => ['nullable', 'string'],
            'translations.en.description' => ['nullable', 'string'],

            // Определение
            'translations.ru.definition' => ['nullable', 'string'],
            'translations.uz.definition' => ['nullable', 'string'],
            'translations.en.definition' => ['nullable', 'string'],

            // Произношение
            'translations.ru.pronunciation' => ['nullable', 'string', 'max:255'],
            'translations.uz.pronunciation' => ['nullable', 'string', 'max:255'],
            'translations.en.pronunciation' => ['nullable', 'string', 'max:255'],

            // Примечание
            'translations.ru.usage_note' => ['nullable', 'string'],
            'translations.uz.usage_note' => ['nullable', 'string'],
            'translations.en.usage_note' => ['nullable', 'string'],
        ];
    }


    public function after(): array
    {
        return [
            function (Validator $validator) {
                $translations = $this->input('translations', []);

                $hasTitle = collect(['ru', 'uz', 'en'])
                    ->contains(
                        fn ($language) => filled(
                            $translations[$language]['title'] ?? null
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
