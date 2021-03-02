import React, { Component } from 'react';
import config from '../../config/config'


class Report extends Component {

    constructor(props) {
        super(props)
        this.state = {
            logs: null,
            users: null,
            spinner:false
        }
    }


    componentDidMount() {


        const retrievedObject = localStorage.getItem('user');
        var user
        if (retrievedObject)
            user = JSON.parse(retrievedObject)


        const UserToken = localStorage.getItem('token');
        axios.get(`${config.url}get/report/${user.id}`, {
            headers: {
                'Authorization': `Bearer ${UserToken}`
            }
        })
            // .auth( )
            .then(res => {
                // document.getElementById('spinner').style.display = 'none'
                console.log(res)
                if (res.data.log) {
                    this.setState({
                        logs: res.data.log
                    })
                }
            })
            .catch(err => {
                // document.getElementById('spinner').style.display = 'none'
                console.log(err);
            })

        axios.get(`${config.url}admin/get/users/${user.id}`, {
            headers: {
                'Authorization': `Bearer ${UserToken}`
            }
        })
            // .auth( )
            .then(res => {
                // document.getElementById('spinner').style.display = 'none'
                console.log(res)
                if (res.data.log) {
                    this.setState({
                        users: res.data.log
                    })
                }
            })
            .catch(err => {
                // document.getElementById('spinner').style.display = 'none'
                console.log(err);
            })





    }

    fetchLog(id){

        this.setState(
            {
                logs:null,
                spinner:true
            }
        )

        const UserToken = localStorage.getItem('token');
        axios.get(`${config.url}get/report/${id}`, {
            headers: {
                'Authorization': `Bearer ${UserToken}`
            }
        })
            // .auth( )
            .then(res => {
                // document.getElementById('spinner').style.display = 'none'
                console.log(res)
                if (res.data.log) {
                    this.setState({
                        logs: res.data.log,
                        spinner:false
                    })
                }
            })
            .catch(err => {
                // document.getElementById('spinner').style.display = 'none'
                console.log(err);
            })

    }



    render() {

        const retrievedObject = localStorage.getItem('user');
        var user
        if (retrievedObject)
            user = JSON.parse(retrievedObject)

        const logs = this.state.logs ? this.state.logs.map((data) => {
            return (
                <tr>

                    <td>{data.date_log}</td>
                    <td>{data.time_in}:00 Hrs</td>
                    <td>{data.time_out}:00 Hrs</td>
                </tr>

            )
        }) : <tr><td>No log record found</td></tr>

        const user_specific = this.state.users ? this.state.users.map((data) => {
            return (
                <div key={data.id} className="card bg-light" style={{ cursor: 'pointer', marginTop: '2px' }} title="Click to view specific user logs" onClick={(e)=>this.fetchLog(data.id)}>
                    <h3>{data.name}</h3>
                    <p>{data.email}</p>
                </div>
            )
        }) : '';

        const spinner=this.state.spinner?<div className="spinner-border" role="status" style={{ marginLeft: '50%' }}>
        <span className="sr-only">Loading...</span>
    </div>:''


        return (
            <div className="report">

                <div className="user-data">
                    <h3>Users</h3>
                    <div className="card bg-primary" style={{ color: 'white', cursor: 'pointer' }} onClick={(e)=>this.fetchLog(user.id)}>
                        <h3>{user.name}</h3>
                        <p>{user.email}</p>
                    </div>
                    {user_specific}

                </div>
                <div className="table-data">
                    <h3>Logs for 2021</h3>
                    <table class="table table-hover">
                        <thead>
                            <tr>

                                <th scope="col">Date</th>
                                <th scope="col">TimeIn</th>
                                <th scope="col">TimeOut</th>
                            </tr>
                        </thead>
                        <tbody>
                            {logs}
                            {spinner}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Report;