import {configureStore} from '@reduxjs/toolkit';
import LoginReducer from '../components/features/auth/loginSlice';
import timeReducer from './features/report/timeSlice';
import userReducer from './features/user/userSlice';



export default configureStore({
    reducer:{

       
        auth:LoginReducer,
        time:timeReducer,
        user:userReducer
       
    }
})