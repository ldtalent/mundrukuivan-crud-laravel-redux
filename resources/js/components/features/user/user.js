import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import config from '../../config/config';
import { addUserToDb, adduser, set_user_id } from './userSlice';
import { withRouter } from 'react-router-dom';


class Users extends Component {


    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            user_type: '',
            users: null,
            errors: {},
            add_status: false,
            delete_status: false,
            edit_status: false
        }
    }

    componentDidMount() {


        if(this.props.user.edit_status)
        {
            this.setState({
                edit_status: true
            })
        }
      
        const UserToken = localStorage.getItem('token');
        axios.get(`${config.url}get`, {
            headers: {
                'Authorization': `Bearer ${UserToken}`
            }
        })
            // .auth( )
            .then(res => {
                // document.getElementById('spinner').style.display = 'none'
                console.log(res)
                if (res.data.user) {
                    this.setState({
                        users: res.data.user
                    })
                }
            })
            .catch(err => {
                // document.getElementById('spinner').style.display = 'none'
                console.log(err);
            })


    }

    UNSAFE_componentWillReceiveProps(nextProps) {

        if (nextProps.user.user) {
            this.setState({
                users: nextProps.user.user
            }
            )
        }

        if (nextProps.user.errors) {
            this.setState({
                errors: nextProps.user.errors
            }
            )
        }

        if (nextProps.user.addstatus === true) {


            this.componentDidMount()

            this.setState({
                add_status: true
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
        this.props.addUserToDb(this.state)

    }

    deleteUser(id) {

        var result = confirm("Are you sure you want to delete the user?");

        if(result){
        const UserToken = localStorage.getItem('token');

        axios.post(`${config.url}delete/${id}`, {}, {
            headers: {
                'Authorization': `Bearer ${UserToken}`
            }
        })
            .then(res => {
                console.log(res)
                if (res.data.success) {

                    this.componentDidMount()

                    this.setState({
                        delete_status: true
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

    //set user_id in redux store

    setUserId(id) {
        this.props.set_user_id(id);
    }

    render() {

        const user_list = this.state.users !== null ? this.state.users.map((data) => {
            return (
                <tr key={data.id}>
                    <th scope="row">1</th>
                    <td><Link to="/edituser" onClick={(e) => this.setUserId(data.id)}>{data.name}</Link></td>
                    <td>{data.email}</td>
                    <td>{data.user_type}</td>
                    <td>{data.created_at}</td>
                    <td><button className="bg-danger" onClick={(e) => this.deleteUser(data.id)}>Delete</button></td>
                </tr>
            )
        }) : '';

        const spinner = this.state.users === null ? <div className="spinner-border" role="status" style={{ marginLeft: '50%' }}>
            <span className="sr-only">Loading...</span>
        </div> : '';

        const success = this.state.add_status ? <div class="alert alert-success" role="alert">
            User added succesfully
     </div> : '';
        const delete_success = this.state.delete_status ? <div class="alert alert-success" role="alert">
            User deleted successfully
</div> : '';

        const edit = this.state.edit_status ? <div class="alert alert-success" role="alert">
            User edited succesfully
     </div> : '';

        return (
            <div className="user_margin">

                {success}
                {delete_success}
                {edit}

                <div className="user_deatils">
                    <h3>Users</h3>
                    <button type="button" className="btn btn-info" data-toggle="modal" data-target="#exampleModal" data-whatever="@fat" >Add User</button>
                </div>
                <table className="table" style={{ marginTop: '2px' }}>
                    <thead className="bg-primary" style={{ color: 'white' }}>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">name</th>
                            <th scope="col">email</th>
                            <th scope="col">role</th>
                            <th scope="col">created</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {user_list}
                        {spinner}
                    </tbody>
                </table>


                <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">AddUser</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={(e) => this.onSubmit(e)}>
                                    <div className="form-group">
                                        <label for="exampleInputEmail1">Name</label>
                                        <input type="text" className="form-control" name="name" id="name" aria-describedby="emailHelp" placeholder="Full Name" onChange={(e) => this.change(e)} />
                                        {this.state.errors.name && (<h4 style={{ color: 'red' }}>{this.state.errors.name}</h4>)}
                                    </div>
                                    <div className="form-group">
                                        <label for="exampleInputEmail1">Email </label>
                                        <input type="email" className="form-control" name="email" id="email" aria-describedby="emailHelp" placeholder="Email" onChange={(e) => this.change(e)} />
                                        {this.state.errors.email && (<h4 style={{ color: 'red' }}>{this.state.errors.email}</h4>)}
                                    </div>
                                    <div className="form-group">
                                        <label for="exampleInputPassword1">Password</label>
                                        <input type="password" className="form-control" name="password" id="password" placeholder="Password" onChange={(e) => this.change(e)} />
                                        {this.state.errors.password && (<h4 style={{ color: 'red' }}>{this.state.errors.password}</h4>)}
                                    </div>
                                    <div className="form-check">
                                        <input type="checkbox" className="form-check-input" id="Admin" name='admin' onClick={(e) => this.user(e, 'admin')} />
                                        <label className="form-check-label" for="exampleCheck1">Admin</label>
                                        <input type="checkbox" name="user" className="form-check-input" id="User" style={{ marginLeft: '5px' }} onClick={(e) => this.user(e, 'user')} />
                                        <label className="form-check-label" for="exampleCheck1" style={{ marginLeft: '20px' }}>User</label>

                                        {this.state.errors.user_type && (<h4 style={{ color: 'red' }}>{this.state.errors.user_type}</h4>)}
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button type="submit" className="btn btn-primary">+ Add User</button>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps, { addUserToDb, adduser, set_user_id })(withRouter(Users));