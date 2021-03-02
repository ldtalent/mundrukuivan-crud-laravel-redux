import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './features/auth/Login';
import Header from './layout/Header';
import Home from '../components/layout/home';
import Report from './features/report/report';
import Users from './features/user/user';
import EditUser from './features/user/edit';
import { connect } from 'react-redux';
import { login, isAuth } from './features/auth/loginSlice'

//checking login status and get set user data

const token = localStorage.getItem('token');




class Start extends Component {

    constructor(props) {
        super(props);
        this.state = {
            login: false
        }

    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        
        const retrievedObject = localStorage.getItem('user');
        var user
        if(retrievedObject)
         user = JSON.parse(retrievedObject)

        if (token) {
          
            this.props.isAuth(true);
            this.props.login(user);
        
            
        }

        else {
            this.props.isAuth(false);
            this.props.login({});

        }

    }
    
    UNSAFE_componentWillReceiveProps(nextProps){


        console.log(nextProps)
        if(nextProps.auth.isAuthenticated){
            this.setState({
                login:true
            })
        }
        else{
            this.setState({
                login:false
            })
        }
    }



    render() {
        return (

            <Router>
                {this.state.login === true ? <Header/> : ''}
                <Route exact path="/" component={Login} />
                <Route exact path="/dashboard" component={Home} />
                <Route exact path="/reports" component={Report} />
                <Route exact path="/users" component={Users} />
                <Route exact path="/edituser" component={EditUser} />
            </Router>


        )
    }

}
const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { login, isAuth })(Start);

