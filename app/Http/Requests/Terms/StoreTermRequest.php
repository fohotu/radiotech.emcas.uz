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
            
            'status' => ['required', 'string', 'in:draft,published,archived'],
            'translations' => ['required', 'array'],
            'translations.*.title' => ['nullable', 'string', 'max:255'],
            'translations.*.description' => ['nullable', 'string'],
            'translations.*.definition' => ['nullable', 'string'],
            'translations.*.pronunciation' => ['nullable', 'string', 'max:255'],
            'translations.*.usage_note' => ['nullable', 'string'],

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
