import {createSlice} from '@reduxjs/toolkit';
import config from '../../config/config'


export const timeSlice=createSlice({

    name:'time',
    initialState:{
        time_in:false
    },
    reducers:{
        time_in:(state, action)=>{

            state.time_in=action.payload
        }
    }
})




export const {time_in}=timeSlice.actions;


export const postTimeIn=(data)=>dispatch=>{
    const UserToken = localStorage.getItem('token');

    axios.post(`${config.url}time_in`, data, {
        headers: {
          'Authorization': `Bearer ${UserToken}`
        }} )
    .then(res =>{
        if(!res.data.error){

            localStorage.setItem('time_in', true)
            localStorage.setItem('report_id', res.data.report.id)
            dispatch(time_in(true))
        }
      })
      .catch(err => {
          console.log(err)
        //   document.getElementById('Uploadspinner').style.display = 'block'
        //   document.getElementById('FailUploadAlert').style.display = 'block'
      })

}


export const postTimeOut=(data, user_id)=>dispatch=>{
    const UserToken = localStorage.getItem('token');

    axios.post(`${config.url}time_out/${user_id}`, data, {
        headers: {
          'Authorization': `Bearer ${UserToken}`
        }} )
    .then(res =>{
        console.log(res)
        if(res.data.success){

            localStorage.setItem('time_in', false)
            dispatch(time_in(false))
        }
      })
      .catch(err => {
          console.log(err)
        //   document.getElementById('Uploadspinner').style.display = 'block'
        //   document.getElementById('FailUploadAlert').style.display = 'block'
      })

}

export default timeSlice.reducer;
