<?php
namespace App\Http\Requests\Technology;

use Illuminate\Foundation\Http\FormRequest;

class AttachMediaRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'media_id' => [
                'required',
                'integer',
                 'exists:media,id',
            ],
        ];
    }
}