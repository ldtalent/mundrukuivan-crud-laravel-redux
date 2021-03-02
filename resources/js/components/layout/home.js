import React, { Component } from 'react';
import {connect} from 'react-redux';
import {postTimeIn, postTimeOut} from '../../components/features/report/timeSlice'


class Home extends Component {


    constructor(props) {
        super(props);


        this.state={
            user_id:'',
            time_in:'',
            date_log:'',
            time_switch:false,

            spinner:false
        }
    }


    
    componentDidMount(){
        const time = localStorage.getItem('time_in');
        if(time===true){
            this.setState({
                time_switch:true
            })
        }
        else{
            this.setState({
                time_switch:false,
                
            })
        }
        
    }


    UNSAFE_componentWillReceiveProps(nextProps){
        if(nextProps.time.time_in===true){
            this.setState({
                time_switch:true,
                spinner:false
            })
        }
        else{
           this.setState({
               time_switch:false,
               spinner:false
           })
        }
    }


    time_in(e, time_format, date_format) {
        const retrievedObject = localStorage.getItem('user');
        var user
        if(retrievedObject)
         user = JSON.parse(retrievedObject)
        
              
         this.setState({
             spinner:true
         })

         const data={
             user_id:user.id,
             time_in:time_format,
             time_out:'non',
             date_log:date_format
         }

        this.props.postTimeIn(data);
        
        




    }

    time_out(e, time_format) {

        this.setState({
            spinner:true
        })
        const time_out={time_out:time_format};
        const report_id = localStorage.getItem('report_id');
      


        this.props.postTimeOut(time_out, report_id)




    }

    render() {

        var weekday = new Array(7);
        weekday[0] = "Sun";
        weekday[1] = "Mon";
        weekday[2] = "Tue";
        weekday[3] = "Wed";
        weekday[4] = "Thurs";
        weekday[5] = "Fri";
        weekday[6] = "Sat";

        const date = new Date();

        const date_format = `${weekday[date.getDay()]},${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
        const time_format = `${date.getHours()}:${date.getMinutes()}`;

        const time_button=this.state.time_switch===true?<button style={{backgroundColor:'red'}} className="btn-info" onClick={(e) => this.time_out(e, time_format)}>Time Out</button>:
        <button className="btn-info" onClick={(e) => this.time_in(e, time_format, date_format)}>Time In</button>;


        const spinner = this.state.spinner === true ? <div className="spinner-border" role="status" style={{ marginLeft: '50%' }}>
        <span className="sr-only">Loading...</span>
    </div> :''

        return (
            <div className="Home">
                {spinner}
                <h1>{date.getHours()}:{date.getMinutes()} Hrs</h1>
                <p>{weekday[date.getDay()]}, {date.getMonth() + 1}/{date.getDate()}/{date.getFullYear()}</p>
                {time_button}
            </div>
        )
    }
}

const maStateToProps=state=>({
    time:state.time
})
export default connect(maStateToProps, {postTimeIn,postTimeOut})(Home);