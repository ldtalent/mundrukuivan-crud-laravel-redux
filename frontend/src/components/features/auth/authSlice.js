import {createSlice} from '@reduxjs/toolkit';


export const authSlice=createSlice({

    name:'user',
    initialState:{
        user:{},
        isAuthenticated:false,
        errors:{}
    },

    reducers:{
        loginData:(state, action)=>{

         state.user=action.payload; 
        },
         
        isAuthenticated:(state, action)=>{
           state.isAuthenticated=action.payload
        },

        error:(state, action)=>{
         state.errors=action.payload;

        }
    }


})

export const {loginData, error, isAuthenticated} =authSlice.actions;

export const Registering=(userData)=>dispatch=>{

    dispatch(error(userData));

   

}

export const LoginUser=(userData, history)=>dispatch=>{
    dispatch(loginData(userData));
    dispatch(isAuthenticated(true))
    history.push('/dashboard');

}


export default authSlice.reducer;