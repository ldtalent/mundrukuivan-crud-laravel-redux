<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/




Route::prefix('user')->group(function () {

  
    Route::post('/login', 'Api\Auth\AuthController@login');
    
    // private routes for user
    Route::middleware('auth:api')->group(function(){
    
        Route::get('/logout', 'Api\Auth\AuthController@logout');
        Route::get('/get/report/{id}', 'Api\AdminController@get_report');
        Route::post('/time_in', 'Api\AdminController@time_in');
        Route::post('/time_out/{id}', 'Api\AdminController@time_out');
    
    });


    // private routes for admin only
    Route::middleware('auth:api', 'admin:api')->group(function(){
    
      

        Route::post('/delete/{id}', 'Api\AdminController@delete_user');
        Route::post('/add', 'Api\AdminController@add_user');
        Route::post('/edit/{id}', 'Api\AdminController@edit_user');
        Route::get('/get', 'Api\AdminController@get_users');
        Route::get('/get', 'Api\AdminController@get_users');
       
        Route::post('/admin/get/user/{id}', 'Api\AdminController@get_user');
        Route::get('/admin/get/users/{id}', 'Api\AdminController@get_user_specific');
       
    
    });
    
    

    });
    
    
