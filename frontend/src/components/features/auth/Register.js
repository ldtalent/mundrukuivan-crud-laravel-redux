import React, { Component } from 'react';
import classnames from 'classnames';
import {connect} from 'react-redux';
import {Registering} from './authSlice'
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';

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

    UNSAFE_componentWillReceiveProps(nextProps){
       
        if(nextProps.auth.errors){
            this.setState({
                errors:nextProps.auth.errors
            })
        }
    }

    onSubmit(e) {
        e.preventDefault()
        this.props.Registering(this.state, this.props.history)

       
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
                                    <input type="text" className={classnames('form-control form-control-lg', { 'is-invalid': this.state.errors.name })} value={this.state.name} placeholder="Name" name="name" onChange={(e) => this.onChange(e)} />
                                    {this.state.errors.name &&(<div className="invalid-feedback">{this.state.name}</div> )}
                                </div>
                                <div className="form-group">
                                    <input type="email" className={classnames('form-control form-control-lg', { 'is-invalid': this.state.email })} value={this.state.email} placeholder="Email Address" name="email" onChange={(e) => this.onChange(e)} />
                                    <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
                               
                                    {this.state.errors.email&&(<div className="invalid-feedback">{this.state.email}</div>)}
                                </div>
                                <div className="form-group">
                                    <input type="password" className={classnames('form-control form-control-lg', { 'is-invalid': this.state.password })} value={this.state.password} placeholder="Password" name="password" onChange={(e) => this.onChange(e)} />
                                    {this.state.errors.password &&(<div className="invalid-feedback">{this.state.password}</div>)}
                                </div>
                                <div className="form-group">
                                    <input type="password" className={classnames('form-control form-control-lg', { 'is-invalid': this.state.password2 })} value={this.state.password2} placeholder="Confirm Password" name="password2" onChange={(e) => this.onChange(e)} />
                                    {this.state.errors.password2 && (<div className="invalid-feedback">{this.state.password2}</div>)}
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

Register.propTypes={
    Registering: PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired,

}

const mapStateToProps=(state)=>({
    auth:state.auth
})

export default connect(mapStateToProps, {Registering})(withRouter(Register));