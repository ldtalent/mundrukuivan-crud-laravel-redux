import React, { Component } from 'react';
import {connect} from 'react-redux';
import config from '../../config/config';
import {withRouter} from 'react-router-dom';
import { editingUser}  from './userSlice';

class EditUser extends Component {

    constructor(props) {
        super(props)

        this.state = {
            name: '',
            email: '',
            password: '',
            user_type: '',
            errors: {},
            add_status: false,
            check_status_user:null,
            check_status_admin:null,
            user_id:null

        }

    }

    componentDidMount(){
        console.log(this.props)
        if(this.props.user.user_id){
              this.setState({
                  user_id: this.props.user.user_id
              })

            const UserToken = localStorage.getItem('token');

            axios.post(`${config.url}admin/get/user/${this.props.user.user_id}`, {}, {
                headers: {
                    'Authorization': `Bearer ${UserToken}`
                }
            })
                .then(res => {
                  
                    if (res.data.user) {
    
                     this.setState({
                         name:res.data.user.name,
                         email:res.data.user.email,
                         check_status_admin: res.data.user.user_type==='admin'?'checked':null,
                         check_status_user: res.data.user.user_type==='user'?'checked':null,
                     })
                    }
    
                })
                .catch(err => {
                    console.log(err)
                    //   document.getElementById('Uploadspinner').style.display = 'block'
                    //   document.getElementById('FailUploadAlert').style.display = 'block'
                })


        }
    }

    change(e) {

        if (this.state.name || this.state.user_type || this.state.email || this.state.password) {
            this.setState({
                errors: {}
            })
        }
        this.setState({
            [e.target.name]: e.target.value
        })

        console.log(this.state)
    }

    user(e, user) {



        if (user === 'admin') {
            this.setState(
                {
                    user_type: 'admin'
                }
            )
        }
        else {
            this.setState({
                user_type: 'user'
            })
        }

        if (this.state.errors.user_type) {
            this.setState({
                errors: {}
            })
        }

    }

    onSubmit(e) {

        e.preventDefault();
       this.props.editingUser(this.state, this.state.user_id, this.props.history)

    }



    render() {

        return (
            <div className="user_edit">
                <h3>Edit User</h3>
                <form onSubmit={(e) => this.onSubmit(e)}>
                    <div className="form-group">
                        <label for="exampleInputEmail1">Name</label>
                        <input type="text" className="form-control" value={this.state.name} name="name" id="name" aria-describedby="emailHelp" placeholder="Full Name" onChange={(e) => this.change(e)} />
                        {this.state.errors.name && (<h4 style={{ color: 'red' }}>{this.state.errors.name}</h4>)}
                    </div>
                    <div className="form-group">
                        <label for="exampleInputEmail1">Email </label>
                        <input type="email" className="form-control" value={this.state.email} name="email" id="email" aria-describedby="emailHelp" placeholder="Email" onChange={(e) => this.change(e)} />
                        {this.state.errors.email && (<h4 style={{ color: 'red' }}>{this.state.errors.email}</h4>)}
                    </div>
                    <div className="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" value={this.state.password} name="password" id="password" placeholder="Password" onChange={(e) => this.change(e)} />
                        {this.state.errors.password && (<h4 style={{ color: 'red' }}>{this.state.errors.password}</h4>)}
                    </div>
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="Admin" name='admin' onClick={(e) => this.user(e, 'admin')} />
                        <label className="form-check-label" for="exampleCheck1">Admin</label>
                        <input type="checkbox" name="user" className="form-check-input" id="User" style={{ marginLeft: '5px' }} onClick={(e) => this.user(e, 'user')}  />
                        <label className="form-check-label" for="exampleCheck1" style={{ marginLeft: '20px' }}>User</label>

                        {this.state.errors.user_type && (<h4 style={{ color: 'red' }}>{this.state.errors.user_type}</h4>)}
                    </div>
                         <div  style={{textAlign:'center'}}>
                         <button type="submit" className="btn btn-primary">Edit User</button>
                         </div>
                   
              
                </form>
            </div>
        )
    }
}

const mapStateToProps=state=>({
    user:state.user
})

export default connect(mapStateToProps, {editingUser})(withRouter(EditUser));