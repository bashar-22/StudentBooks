
<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ChangePasswordController;
use App\Http\Controllers\ResetPasswordController;
use App\Http\Controllers\BooksController;
use App\Http\Controllers\LogsController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::group([

    'middleware' => 'api',
   

], function ($router) {

    Route::post('login', [AuthController::class, 'login']);
    Route::post('signup', [AuthController::class, 'signup']);
   
    Route::post('sendPasswordResetLink', [ResetPasswordController::class,'sendEmail']);
    Route::post('logout', [AuthController::class,'logout']);
    Route::post('resetPassword', [ChangePasswordController::class,'process']);

});

Route::middleware('jwt.auth')->group(function () {

     // Route for showing a user's books
    Route::get('my-books', [BooksController::class, 'showMyBooks']);

    Route::apiResource('books', BooksController::class);
    // Route for returning a book
    Route::post('books/return/{id}', [BooksController::class, 'returnBook']);

    // Route for reserving a book
    Route::post('books/reserve/{id}', [BooksController::class, 'reserveBook']);
    Route::get('books/edit/{id}', [BooksController::class, 'edit']);
    Route::resource('logs', LogsController::class);

   
});
 

