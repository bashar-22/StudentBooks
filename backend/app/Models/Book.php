<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;
    protected $fillable=[
        'user_id','title','author','publisher','language','reservation_date','isbn','serial_number','reservation_expiration_date','return_date'
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
