<?php

namespace App\Http\Controllers\Api;


use App\Http\Controllers\Controller;
use App\User;
use App\Report;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
class AdminController extends Controller
{
    //

    public function add_user(Request $request){

        /**Validate the data using validation rules
    */
    $validator = Validator::make($request->all(), [
        'name' => 'required',
        'email' => 'required|email|unique:users',
        'password' => 'required',
        'user_type'=>'required',
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
    $success['token'] = $user->createToken('trailanalytics')->accessToken;

    //send an email verification to the user 


    //$user->sendApiEmailVerificationNotification();


    /**Return success message with token value
    */
    return response()->json(['success'=>$success, 'verify'=>'email verification needed', 'user'=>$user], 200);
    }

//editing user 

    public function edit_user(Request $request, $id){


   
     $user=User::find($id);

     if($user){

        if($request->name)
         $user->name=$request->name;

         if($request->email)
         $user->email=$request->email;

         if($request->password)
         $user->password=$request->password;

         if($request->user_type)
         $user->user_type=$request->user_type;

         $user->save();

         return response()->json(['success'=>'Successfully edited user', 'user'=>$user], 200);
     }


    }



    //Deleting user 
    public function delete_user(Request $request, $id){

        $user=User::find($id);
   
        if($user){
   
           $user->delete();
   
            return response()->json(['success'=>'Successfully deleted user', 'user'=>$user], 200);
        }
   
   
       }
   
       //Get Users for Admin Display


       public function get_users(Request $request){

           $user=User::all();

           if($user){
            return response()->json(['user'=>$user], 200);
           }
       }

       //Add Report

       public function time_in(Request $request){

        
        /**Validate the data using validation rules
    */
    $validator = Validator::make($request->all(), [
        'user_id' => 'required',
        'time_in' => 'required',
        'date_log'=>'required'
       
    ]);

          
    /**Check the validation becomes fails or not*/
    if ($validator->fails()) {
        /**Return error message
        */
        return response()->json([ 'error'=> $validator->errors() ]);
    }

     /**Store all values of the fields
      * 

    */  

      $newReport = $request->all();

      $report = Report::create($newReport);
      
      if($report)
      return response()->json(['report'=>$report, 'success'=>'time in succesfull'], 200);

       }
    






       //user time out report

    public function time_out(Request $request, $id){

          /**Validate the data using validation rules
    */
    $validator = Validator::make($request->all(), [

        'time_out' => 'required',
       
    ]);

          
    /**Check the validation becomes fails or not*/
    if ($validator->fails()) {
        /**Return error message
        */
        return response()->json([ 'error'=> $validator->errors() ]);
    }
      
        $report=Report::find($id);

        if($report)
        {
        $report->time_out=$request->time_out;

        if($report->save())

        return response()->json(['user'=>$report, 'success'=>'time out succesfull'], 200);
        }

       }



       //get logs for report

       public function get_reports(Request $request){

        $reports=Report::all();

        return response()->json(['user'=>$reports], 200);

       }


       //get a user 

       public function get_user(Request $request, $id){

           $user=User::find($id);

           if($user){
            return response()->json(['user'=>$user], 200);
           }
       }


       //Get logs for report

       public function get_report(Request $request, $id){

        $report=Report::where('user_id', $id)->orderBy('time_in', 'asc')->get();
        return response()->json(['log'=>$report], 200);
        
       }

       
       //Get logs for report

       public function get_user_specific(Request $request, $id){

        $report=User::where('id', '!=', $id)->get();
        return response()->json(['log'=>$report], 200);
        
       }

}
