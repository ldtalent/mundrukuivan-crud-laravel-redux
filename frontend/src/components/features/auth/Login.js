import React, { Component } from 'react';
import {connect} from 'react-redux';
import classnames from 'classnames';
import {withRouter} from 'react-router-dom';
import {LoginUser} from './authSlice';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state={
          
            email:'',
            password:'',
            errrors:{}
         
        }
    }

    onChange(e){
       
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault()
        this.props.LoginUser(this.state, this.props.history);

    }
  
    UNSAFE_componentWillReceiveProps(nextProps){
       
        if(nextProps.auth.errors){
            this.setState({
                errors:nextProps.auth.errors
            })
        }
    }


    render() {

        
        return (
            <div className="login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Log In</h1>
                            <p className="lead text-center">Sign in to your TalentConnector account</p>
                            <form onSubmit={(e)=>this.onSubmit(e)}>
                                <div className="form-group">
                                    <input type="email" className="form-control form-control-lg" value={this.state.email} placeholder="Email Address" name="email" onChange={(e)=>this.onChange(e)} />
                                </div>
                                <div className="form-group">
                                    <input type="password" className={classnames('form-control form-control-lg', { 'is-invalid': this.state.password2 })} value={this.state.password2} placeholder="Confirm Password" name="password" onChange={(e) => this.onChange(e)} />
                                    {this.state.errors && (<div className="invalid-feedback">{this.state.password}</div>)}
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




const mapStateToProps=(state)=>({
    auth:state.auth
})

export default connect(mapStateToProps, {LoginUser})(withRouter(Login));