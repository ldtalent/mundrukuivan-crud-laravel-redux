import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../../config/config'

export const loginSlice=createSlice({
    name:'user',
   initialState:{
       user:{},
       isAuthenticated:false,
       errors:null
   },

   reducers:{
       login:(state, action)=>{
           state.user=action.payload;
       },
       isAuth:(state, action)=>{
           state.isAuthenticated=action.payload
       },
       errors:(state, action)=>{
           state.errors=action.payload
       }
   }
})

export const {login, isAuth, errors}=loginSlice.actions;


export const loginResult=(data, history)=>dispatch=>{

    axios.post(`${config.url}login`, data).then(response=>{
        console.log(response);

        if(response.data.user && response.data.access_token)
        {
        localStorage.setItem('token', response.data.access_token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        dispatch(login(response.data.user))
        dispatch(isAuth(true));
        history.push('/dashboard');
        }
        else{
        dispatch(errors(response.data.error))
        }
       
    })

    
}

export const logout=(history)=>dispatch=>{

    const UserToken = localStorage.getItem('token');
    axios.get(`${config.url}logout`,  {
        headers: {
          'Authorization': `Bearer ${UserToken}`
        }})
        // .auth( )
        .then(res =>{
            // document.getElementById('spinner').style.display = 'none'
           if(res.data.message){
               localStorage.removeItem('token');
               localStorage.removeItem('user')
               dispatch(isAuth(false));
               dispatch(login({}));
               history.push('/');
              
           }
        })
        .catch(err => {
            // document.getElementById('spinner').style.display = 'none'
            console.log(err);
        })

       
}



export default loginSlice.reducer;