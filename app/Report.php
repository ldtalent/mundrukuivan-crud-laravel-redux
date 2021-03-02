<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    //

    protected $fillable = [
        'user_id', 'time_out', 'time_in', 'date_log'
    ];
}
