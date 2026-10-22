<?php
namespace App\Http\Requests\Source;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreSourceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'source_type' => [
                'required',
                'string',
                'max:40',
            ],
            'identifier' => ['nullable', 'string', 'max:255'],
            'publisher' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'url' => ['nullable', 'url', 'max:65535'],
            'metadata' => ['nullable', 'array'],
        ];
    }
}
