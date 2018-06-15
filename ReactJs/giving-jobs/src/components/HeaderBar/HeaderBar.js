import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'

class HeaderBar extends Component{
    constructor(props){
        super(props);
        this.authenticated = this.authenticated.bind(this);
    }

    logout(){
        fetch('https://localhost:44365/api/account/logout')
        .then(() => this.props.logout())
    }

    authenticated(){
        if(this.props.user){
            return (
                <div className="justify-content-end col-2">
                    <p>Hello {JSON.parse(sessionStorage.user).userName} <Link to="/Profile" className="fas fa-cog"></Link>  <a href="#" onClick={() => this.logout()}>Logout</a></p>
                    <Link  to='/CreateJob'>Create Job</Link>
                </div>
            )
        } else {
            return(
                <div className="justify-content-end col-2">
                    <Link to="/Login" className="mr-3">Log In</Link>
                    <Link to="/Register" className="mr-3">Register</Link>
                </div>
            )
        }
    }

    render(){
        return(
            <div className="row mt-3">
                <h1 className="col-10">Giving Jobs</h1>    
                {this.authenticated()}
            </div>
        )
    }
}

export default HeaderBar