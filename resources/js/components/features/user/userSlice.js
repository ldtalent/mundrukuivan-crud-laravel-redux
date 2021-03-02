import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../../config/config'


export const userSlice=createSlice({
    name:'user',
    initialState:{
        users:null,
        addstatus:false,
        errors:null,
        user_id:null,
        edit_status:false
    },

    reducers:{
    adduser:(state, action)=>{
        state.addstatus=action.payload
    }
    ,
    getUsers:(state, action)=>{
        state.users=action.payload;
    },

    errors:(state, action)=>{
        state.errors=action.payload;
    },
    set_user_id:(state, action)=>{

        state.user_id=action.payload
    },
    edit_user:(state, action)=>{
        state.edit_status=action.payload
    }
}
})



export  const {adduser, getUsers, errors, set_user_id, edit_user}=userSlice.actions;

export const addUserToDb=(data)=>dispatch=>{
    

    const UserToken = localStorage.getItem('token');

    axios.post(`${config.url}add`, data, {
        headers: {
          'Authorization': `Bearer ${UserToken}`
        }} )
    .then(res =>{
        console.log(res)
        if(!res.data.error){
        
            dispatch(adduser(true));
       
        }
        else{
            dispatch(errors(res.data.error))
        }
      })
      .catch(err => {
          console.log(err)
        //   document.getElementById('Uploadspinner').style.display = 'block'
        //   document.getElementById('FailUploadAlert').style.display = 'block'
      })
      

}



export const editingUser=(data, id, history)=>dispatch=>{
    

    const UserToken = localStorage.getItem('token');

    axios.post(`${config.url}edit/${id}`, data, {
        headers: {
          'Authorization': `Bearer ${UserToken}`
        }} )
    .then(res =>{
        console.log(res)
        if(res.data.user){
        dispatch(edit_user(true));
         history.push('/users');
        }
        
      })
      .catch(err => {
          console.log(err)
        //   document.getElementById('Uploadspinner').style.display = 'block'
        //   document.getElementById('FailUploadAlert').style.display = 'block'
      })
      

}




export default userSlice.reducer;