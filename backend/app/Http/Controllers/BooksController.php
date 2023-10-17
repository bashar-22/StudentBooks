<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Book; 
use App\Models\User; 
use App\Models\Log; 
use Carbon\Carbon;
use App\Http\Requests\BookFormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\DB;
class BooksController extends Controller

{
    //
    public function index(Request $request)
    {
        //

          $search = $request->input('search');
          $user = auth()->user();
   
        $query = Book::query();
          if ($search) {
              $query->where(function ($query) use ($search) {
                  $query->where('title', 'LIKE', '%' . $search . '%')
                        ->orWhere('author', 'LIKE', '%' . $search . '%');
              });
          }

          $query->orderBy('reservation_expiration_date', 'desc');
          
          $books = $query->paginate(5);
         
          return response()->json($books, 200);
      
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(BookFormRequest $request)
    {
        // Get the authenticated user
         $user = auth()->user();
         if ($user->user_type === 'admin') {

         $validatedData = $request->validated();
        $book = new Book($validatedData);
       
        $book->user_id =null;

        
        $book->save();

        return response()->json($book, 201);
         }
         else
         {
              // User is not an admin, return a response indicating permission denied
        return response()->json(['message' => 'Permission denied. Only admins can create books.'], 403);
         }


    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
         // Get the authenticated user
         $authuser = auth()->user();
        // Find the book by ID
        $book = Book::with('user')->find($id);
        
        if (is_null($book)) {
            return response()->json(['error' => 'Book not found.'], 404);
        }
        if ($book->user) {
            
            $book['user_email'] = $book->user->email;
        } else {
            $book['user_email'] = null;
        }
        return response()->json($book, 200);
    }
    public function edit(string $id)
    {
        // Get the authenticated user
    $user = auth()->user();
    if ($user->user_type !== 'admin') {
        return response()->json(['error' => 'Permission denied. Only admins can view this book.'], 403);
    }
     // Find the book by ID
       $book = Book::find($id);
        
        if (is_null($book)) {
            return response()->json(['error' => 'Book not found.'], 404);
        }

       
         return response()->json($book, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(BookFormRequest $request, string $id)
    {
    
        $user = auth()->user();

        if ($user->user_type !== 'admin') {
            return response()->json(['errors' => ['Auth'=>['Permission denied. Only admins can update books.']]], 403);
        }

        $book = Book::find($id);

        if (is_null($book)) {
            return response()->json(['errors' =>['NoBook' => ['Book not found.']]], 404);
        }

        $validatedData = $request->validated();
        $book->update($validatedData);

        return response()->json(['message' => 'Book updated successfully.'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {

        // Get the authenticated user
        $user = auth()->user();
        // Check if the authenticated user is an admin
        if ($user->user_type !== 'admin') {
            return response()->json(['error' => 'Permission denied. Only admins can delete books.'], 403);
        }


        $book = Book::find($id);
        if (is_null($book) ) {
            return response()->json(['error' => 'Book not found.'], 404);
        }
         // Delete all log records with the same book ID
         DB::table('logs')->where('book_id', $book->id)->delete();
        $book->delete();
        return response()->json(null, 204);
    }

    public function returnBook(Request $request, string $id)
    {
       
    // Get the authenticated user
    $adminUser = auth()->user();

    // Check if the authenticated user is an admin
    if ($adminUser->user_type !== 'admin') {
        return response()->json(['errors' => ['Auth'=>['Permission denied. Only admins can reserve books.']]], 403);
    }

    // Find the book by ID
    $book = Book::find($id);
    

    // Check if the book exists
    if (is_null($book)) {
        return response()->json(['errors' =>['NoBook' => ['Book not found.']]], 404);
    }

    if ($book->user->id === null) {
        return response()->json(['error' => ['returned'=>['The book is already returned and it is available in the library.']]], 403);
    }

    $validationRules = [
        'return_date' => ['required', 'date', function ($attribute, $value, $fail) use ($book) {
            $utcPlus2Value = Carbon::parse($value)->setTimezone('Europe/Belgrade'); // Convert $value to UTC+2
            $reservationDate = Carbon::parse($book->reservation_date);
            if (!$utcPlus2Value->isSameDay($reservationDate) && $utcPlus2Value->lessThan($reservationDate)) {
                $fail("The Return Date must be a date after or equal to the reservation date.");
              
            }
        }],
    ];
    $validatedData = $request->validate($validationRules);

    // to ensure atmoicity
    DB::beginTransaction();
    try {
        // Perform your Eloquent operations here
        $book->user_id = null;
        // Create a new log entry
        $log = new Log();
        $log->book_id = $book->id;
        $log->user_id =  $book->user->id; // Assuming the admin's user ID should be logged
        $log->reservation_date = $book->reservation_date; // You may retrieve this value from the book or request
        $log->reservation_expiration_date = $book->reservation_expiration_date;
        //$carbonDate= $validatedData['return_date'];
       
        $log->return_date =Carbon::parse($validatedData['return_date'])->setTimezone('Europe/Belgrade');;
        $log->isbn=$book->isbn;
        $log-> email=$book->user->email;
        $log-> serial_number=$book->serial_number;
   
        $log->save();
          
        // reset reservation and reservation expire dates
        $book->reservation_date=null;
        $book->reservation_expiration_date=null;
   
        $book->save();
   
    
        DB::commit(); // Commit the transaction
        return response()->json(['message' => 'Book returned successfully.'], 200);

    } catch (\Exception $e) {
        // Handle exceptions and roll back the transaction if necessary
        return response()->json(['error' => ['returned'=>[$e]]], 500);
        DB::rollBack();
    }

   
    }

    public function reserveBook(Request $request, string $id)
    {
    // Get the authenticated admin user
    $adminUser = auth()->user();

    // Check if the authenticated user is an admin
    if ($adminUser->user_type !== 'admin') {
        return response()->json(['errors' => ['Auth'=>['Permission denied. Only admins can reserve books.']]], 403);
    }

    // Find the book by ID
    $book = Book::find($id);

    // Check if the book exists
    if (is_null($book)) {
        return response()->json(['errors' =>['NoBook' => ['Book not found.']]], 404);
    }

    // Check if the book already has a user_id assigned
    if (!is_null($book->user_id)) {
        return response()->json(['errors' => ['AlreadyReserved'=>['Book is already reserved.']]], 422); // 422 Unprocessable Entity
    }

    // Validate the request data (email and reservation date)
    $validatedData = $request->validate([
        'email' => ['required', 'email', 'exists:users,email'], // Check if the email exists in the users table
        'reservation_date' => ['required', 'date'],
    ]);

    // Find the user by email
    $user = User::where('email', $validatedData['email'])->first();

    // Assign the user_id from the users table to the book
    $book->user_id = $user->id;
    $book->reservation_date =Carbon::parse($validatedData['reservation_date'])->setTimezone('Europe/Belgrade');
    $book-> reservation_expiration_date=Carbon::parse($validatedData['reservation_date'])->setTimezone('Europe/Belgrade')->addDays(15);
    $book->save();

    return response()->json(['message' => 'Book reserved successfully.'], 200);
}

public function showMyBooks(Request $request)
{
    // Get the authenticated user
    $user = auth()->user();

    // Query the books reserved by the user


    $query = $user->books();

    // Apply search filters if provided in the request
    $search = $request->input('search');
    if ($search) {
        $query->where(function ($query) use ($search) {
            $query->where('title', 'LIKE', '%' . $search . '%')
                  ->orWhere('author', 'LIKE', '%' . $search . '%');
        });
    }

    // Sort the results by reservation_expiration_date in ascending order
    $query->orderBy('reservation_expiration_date', 'asc');

    // Paginate the results (you can adjust the number of items per page as needed)
    $books = $query->paginate(5); // Change '10' to your desired items per page

    return response()->json($books, 200);
}


}
