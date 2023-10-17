<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\ChangePasswordRequest;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;
class ChangePasswordController extends Controller
{
    //
     //
     public function process(ChangePasswordRequest $request)
     {
         return $this->getPasswordResetTableRow($request)->count()> 0 ? $this->changePassword($request) : $this->tokenNotFoundResponse();
     }
 
     private function getPasswordResetTableRow($request)
     {
         return DB::table('password_reset_tokens')->where(['email' => $request->email,'token' =>$request->resetToken]);
     }
 
     private function tokenNotFoundResponse()
     {
         $errors = ['Token or Email is incorrect'];
         return response()->json(['errors' => ['email'=> $errors ]],Response::HTTP_UNPROCESSABLE_ENTITY);
     }
 
     private function changePassword($request)
     {
         $user = User::whereEmail($request->email)->first();
         $user->update(['password'=>$request->password]);
         $this->getPasswordResetTableRow($request)->delete();
         return response()->json(['data'=>'Password Successfully Changed'],Response::HTTP_CREATED);
     }
}
