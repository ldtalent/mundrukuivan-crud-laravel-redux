import React, { Component } from 'react';
import classnames from 'classnames';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            errors: {}
        }
    }

    onChange(e) {

        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault()


        console.log(this.state)
    }

    render() {

        return (
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Sign Up</h1>
                            <p className="lead text-center">Create your TalentConnector account</p>
                            <form noValidate onSubmit={(e) => this.onSubmit(e)}>
                                <div className="form-group">
                                    <input type="text" className={classnames('form-control form-control-lg', { 'is-invalid': this.state.name })} value={this.state.name} placeholder="Name" name="name" onChange={(e) => this.onChange(e)} />
                                    {this.state.name !== '' ? <div className="invalid-feedback">{this.state.name}</div> : ''}
                                </div>
                                <div className="form-group">
                                    <input type="email" className={classnames('form-control form-control-lg', { 'is-invalid': this.state.email })} value={this.state.email} placeholder="Email Address" name="email" onChange={(e) => this.onChange(e)} />
                                    <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
                               
                                    {this.state.email !== '' ? <div className="invalid-feedback">{this.state.email}</div> : ''}
                                </div>
                                <div className="form-group">
                                    <input type="password" className={classnames('form-control form-control-lg', { 'is-invalid': this.state.password })} value={this.state.password} placeholder="Password" name="password" onChange={(e) => this.onChange(e)} />
                                    {this.state.password !== '' ? <div className="invalid-feedback">{this.state.password}</div> : ''}
                                </div>
                                <div className="form-group">
                                    <input type="password" className={classnames('form-control form-control-lg', { 'is-invalid': this.state.password2 })} value={this.state.password2} placeholder="Confirm Password" name="password2" onChange={(e) => this.onChange(e)} />
                                    {this.state.password2 !== '' ? <div className="invalid-feedback">{this.state.password2}</div> : ''}
                                </div>
                                <input type="submit" className="btn btn-info btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>


        )
    }
}

export default Register;