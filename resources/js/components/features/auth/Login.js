const { Component } = require("react")

import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginResult } from './loginSlice';
import { withRouter } from 'react-router-dom';
import { login, isAuth } from './loginSlice'




class Login extends Component {


    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            email_input: false,
            password_field: false,
            errors: null,
            spinner: false
        }
    }



    componentDidMount() {
        const token = localStorage.getItem('token');

        if(token){
            this.props.history.push('/dashboard');
        }


    }


    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.auth.errors) {
            this.setState({
                errors: nextProps.auth.errors
            })
        }

        if (nextProps.auth) {
            this.setState({
                spinner: false
            })
        }
    }

    onInputChange(e) {


        this.setState({
            [e.target.name]: e.target.value,
            email_input: false,
            password_empty: false
        })
    }

    onSubmit(e) {

        if (this.state.email !== "" && this.state.password !== "") {
            this.setState({
                spinner: true
            })
        }

        if (this.state.email === "") {
            this.setState({
                email_input: true
            })

        }
        if (this.state.password === "") {
            this.setState({
                password_field: true
            })

        }
        e.preventDefault();
        this.props.loginResult(this.state, this.props.history)
    }


    render() {

        const password_empty = this.state.password_field === true ? <h3 style={{ color: 'red' }}>Password field can not be empty</h3> : '';
        const email_empty = this.state.email_input === true ? <h3 style={{ color: 'red' }}>email field can not be empty</h3> : '';
        const email_pass_validation = this.state.errors ? <h3 style={{ color: 'red' }}>{this.state.errors}</h3> : '';
        const spinner = this.state.spinner === true ? <div className="spinner-border" role="status" style={{ marginLeft: '50%' }}>
            <span className="sr-only">Loading...</span>
        </div> : '';

        return (
            <div className="login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Log In</h1>
                            <form onSubmit={(e) => this.onSubmit(e)}>
                                {spinner}
                                {email_pass_validation}
                                <div className="form-group">

                                    <input type="email" className="form-control form-control-lg" value={this.state.email} placeholder="Email Address" name="email" onChange={(e) => this.onInputChange(e)} />
                                    {email_empty}
                                </div>
                                <div className="form-group">
                                    <input type="password" className='form-control form-control-lg' value={this.state.password} placeholder="Password" name="password" onChange={(e) => this.onInputChange(e)} />
                                    {password_empty}
                                </div>
                                <button type="submit" className="btn btn-info">Login to Clocking</button>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { loginResult, login, isAuth })(withRouter(Login));