<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
    //

    //Add Report

    public function add_report(Request $request, $id){

        
        /**Validate the data using validation rules
    */
    $validator = Validator::make($request->all(), [
        'user_id' => 'required',
        'time_in' => 'required',
       
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
      return response()->json(['user'=>$report, 'success'=>'time in succesfull'], 200);

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


       //Get logs for report

       public function get_report(Request $request, $id){

        $report=Report::where('user_id', $id)->get();
        return response()->json(['log'=>$report], 200);
        
       }

}
