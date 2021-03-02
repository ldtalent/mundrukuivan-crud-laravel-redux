import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login, isAuth, logout } from '../features/auth/loginSlice'
import { withRouter } from 'react-router-dom';

class Header extends Component {



    logOut() {

        this.props.logout(this.props.history);
    }


    render() {
        const retrievedObject = localStorage.getItem('user');
        var user
        if (retrievedObject)
            user = JSON.parse(retrievedObject)


        return (

            <nav className="navbar navbar-expand-lg navbar-info bg-info" style={{ color: 'white' }}>
                <span className="navbar-brand" style={{ textAlign: 'center' }}><Link to="/dashboard" style={{ color: 'white' }}> Clocking <p >{user.email}({user.user_type})</p> </Link></span>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">

                    </ul>
                    <ul className="form-inline my-2 my-lg-0" style={{ marginRight: '4px', listStyle: 'none' }}>
                        <li ><Link to="/reports" style={{ color: 'white' }}> Report</Link></li>
                        {user.user_type === 'admin' ? <li > <Link to="/users" style={{ color: 'white' }}>Users</Link></li> : ''}
                        <li> <Link to="/" style={{ color: 'white' }} onClick={(e) => this.logOut()}>Logout</Link></li>
                    </ul>
                </div>
            </nav>

        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { isAuth, login, logout })(withRouter(Header));