<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BookFormRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $bookId = $this->route('book');
        return [
            'title' => [
                'required',
                'string',
                'max:255',
            ],
            'author' =>['required', 'string','max:255'],
            'publisher'=>'max:255',
            'language'=>'max:255',
            //isbn is not unique
            'isbn'=>'required',
            'serial_number' => [
                'numeric',
                'max:9999999999',
                'unique:books,serial_number,' . $bookId,
            ]
        ];
    }
}
