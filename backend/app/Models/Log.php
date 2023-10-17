<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Log extends Model
{
    use HasFactory;
    protected $fillable=[
        'user_id','book_id','serial_number','isbn','reservation_date','reservation_expiration_date','return_date',
    ];
}
