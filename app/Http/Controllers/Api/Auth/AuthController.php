<?php

namespace App\Http\Controllers\Api\Auth;


use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    
     //User login function 

     public function login(Request $request)
     {
         $loginData = $request->validate([
             'email' => 'required|email',
             'password' => 'required'
         ]);
         
         $data = $request->all();
         $userCount = User::where('email', $data['email']);
         $role_check=User::where('email', $data['email'])->first();
 
         if (!$userCount->count()) {
             return response(['error'=>'User email not found']);
         }
 
         //checking user role in the User Auth controller 
 
        
 
         //checking authentication match for user type User 
 
 
         if (!auth()->attempt($loginData)) {
             return response(['error' => 'Invalid Password']);
         }
         
 
         
         //Generating access  token for the User
         $accessToken = auth()->user()->createToken('reactlaravel')->accessToken;
 
 
         //Returning response for  the user 
 
         return response(['user' => auth()->user(), 'access_token' => $accessToken]);
 
     }



     //User Logout funtion

    public function logout(Request $request)
    {
        

        if (Auth::check()) {

              Auth::user()->AauthAcessToken()->delete();
              
           }

        $request->user()->token()->revoke();

        return response()->json([
            'message' => 'Successfully logged out'
        ]);
    }

 
 
}
