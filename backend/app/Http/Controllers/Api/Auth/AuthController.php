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
     //registering user

     public function register(Request $request)
     {
         /**Validate the data using validation rules
         */
         $validator = Validator::make($request->all(), [
             'first_name' => 'required',
             'last_name' => 'required',
             'email' => 'required|email|unique:users',
             'password' => 'required|min:6',
            
         ]);
              
         /**Check the validation becomes fails or not*/
         if ($validator->fails()) {
             /**Return error message
             */
             return response()->json([ 'error'=> $validator->errors() ]);
         }
     
         /**Store all values of the fields
         */
         $newuser = $request->all();
     
             /**Create an encrypted password using the hash
         */
         $newuser['password'] = Hash::make($newuser['password']);
     
         /**Insert a new user in the table
         */
         $user = User::create($newuser);
     
             /**Create an access token for the user
         */
         $success['token'] = $user->createToken('reactlaravel')->accessToken;
     
         //send an email verification to the user 
     
     
         //$user->sendApiEmailVerificationNotification();
     
     
         /**Return success message with token value
         */
         return response()->json(['success'=>$success, 'verify'=>'email verification needed', 'user'=>$user], 200);
     }



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
            return response(['message' => 'Invalid Password']);
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
