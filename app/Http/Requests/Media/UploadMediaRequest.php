<?php
namespace App\Http\Requests\Media;

use Illuminate\Foundation\Http\FormRequest;

class UploadMediaRequest extends FormRequest
{
    public function authorize(): bool
    {
       // return $this->user() !== null;
        return true;
    }

    public function rules(): array
    {
        return [
            'file' => [
                'required',
                'file',
                'max:10240',
                'mimes:jpg,jpeg,png,webp',
            ],

            'collection' => [
                'required',
                'in:images,documents',
            ],
        ];
    }

    public function rules1(): array
    {
        return [
            'file' => [
                'required',
                'file',
                'max:10240',
            ],

            'collection' => [
                'sometimes',
                'string',
                'in:images,documents',
            ],

            'properties' => [
                'sometimes',
                'array',
            ],

            'properties.*' => [
                'nullable',
                'string',
                'max:255',
            ],

            'disk' => [
                'sometimes',
                'nullable',
                'string',
                'in:public,local',
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'file.required' => 'Please select a file.',
            'file.file' => 'Invalid file.',
            'file.max' => 'Maximum file size is 10 MB.',

            'collection.in' => 'Invalid media collection.',

            'properties.array' => 'Invalid file properties.',

            'disk.in' => 'Invalid storage disk.',
        ];
    }

    public function collection(): string
    {
        return $this->input('collection', 'images');
    }

    public function properties(): array
    {
        return $this->input('properties', []);
    }

    public function disk(): ?string
    {
        return $this->input('disk');
    }
}
