<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Log; 
use App\Models\User; 
class LogsController extends Controller
{
    public function index(Request $request)
    {
         // Get the authenticated user
        $user = auth()->user();
        if ($user->user_type !== 'admin') {
            return response()->json(['errors' =>['Auth'=>['Permission denied. Only admins can view the logs.']]], 403);
        }
        $request->validate([
            'email' => 'nullable|email', // Email is optional but should be a valid email format if provided
            'from_date' => 'date_format:Y-m-d|nullable', // From date is optional and should be in 'Y-m-d' format
            'to_date' => 'date_format:Y-m-d|nullable', // To date is optional and should be in 'Y-m-d' format
        ]);
    
        $email = $request->input('email');

        $query = Log::query();
        if ($email) {
            // Check if a user with the provided email exists
            $user = User::where('email', $email)->first();
        
            if ($user) {
                // If a user exists, retrieve their user ID and use it for filtering
                $userId = $user->id;
                $query->where('user_id', $userId);
            } else {
                // If no user with the provided email exists, you can decide what to do,
                // for example, you can return an empty result or an error message.
                return response()->json(['errors' =>['Auth' => ['The email address provided not found.']]], 404);
            }
        }

        $fromDate = $request->input('from_return_date');
        $toDate = $request->input('to_return_date');
      
        // Filter logs based on the 'from_date' and 'to_date'
        if ($fromDate) {
            $query->whereDate('return_date', '>=', $fromDate);
        }
        if ($toDate) {
            $query->whereDate('return_date', '<=', $toDate);
        }


       
        $query->join('books', 'logs.book_id', '=', 'books.id');
        $query->join('users', 'logs.user_id', '=', 'users.id');

        // Select the desired columns from the joined tables
        $logs = $query->select('logs.reservation_date','logs.reservation_expiration_date','logs.return_date', 'books.title as title', 'users.email as email','books.serial_number as serial_number','books.isbn')->paginate(5);
        return response()->json($logs,200);


    }
}
