import React, { Component } from 'react';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state={
          
            email:'',
            password:'',
         
        }
    }

    onChange(e){
       
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault()


        console.log(this.state)
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
                                    <input type="password" className="form-control form-control-lg" value={this.state.password} placeholder="Password" name="password" onChange={(e)=>this.onChange(e)} />
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

export default Login;