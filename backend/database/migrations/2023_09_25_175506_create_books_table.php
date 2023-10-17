<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('books', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('author');
            $table->text('publisher')->nullable();
            $table->text('language')->nullable();
            $table->string('isbn');
            $table->unsignedInteger('serial_number')->unique();
           

            $table->date('reservation_date')->nullable();
        $table->date('reservation_expiration_date')->nullable();
      

            $table->timestamps();
            $table->unsignedBigInteger('user_id')->nullable();
         $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');

            


        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('books');
    }
};
