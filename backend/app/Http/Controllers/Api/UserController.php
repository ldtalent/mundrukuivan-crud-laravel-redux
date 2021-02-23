<?php

namespace App\Http\Controllers\Api;
use App\Exprience;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{

    /**Profile edit 
         */

    public function profile_edit(Request $request){

         /**Validate the data using validation rules
         */
        $validator = Validator::make($request->all(), [
            'user_id' => 'required',
            'profesion' => 'required',
            'company' => 'required',
            'location' => 'required',
            'bios'=>'required',
            'skills'=>'required',
           
        ]);

    }



    /**Add Exprience 
         */

        public function add_exprience(Request $request){

            /**Validate the data using validation rules
            */
           $validator = Validator::make($request->all(), [
               'user_id' => 'required',
               'title' => 'required',
               'company' => 'required',
               'location' => 'required',
               'description'=>'required',
               'from_date'=>'required',
               'to_date'=>'required',
              
           ]);

            /**Check the validation becomes fails or not*/
         if ($validator->fails()) {
            /**Return error message
            */
            return response()->json([ 'error'=> $validator->errors() ]);
        }

         /**Store all values of the fields
         */
        $newExprience = $request->all();


         /**Insert a new exprience data  in the table
         */
        $data = Exprience::create($newExprience);
    
   
       }
    
}
