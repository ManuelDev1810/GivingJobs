import React, {Component} from 'react'
import {Link} from 'react-router-dom'

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
                    <p>Hello {JSON.parse(sessionStorage.user).userName} <Link to="/Profile" className="fas fa-cog mr-sm-2 oro"></Link>  <Link className="btn  mr-sm-2 oro" to="/" onClick={() => this.logout()}>Logout</Link></p>
                    <Link  to='/CreateJob'  className=" btn mr-sm-2 oro">Create Job</Link>
                </div>
            )
        } else {
            return(
                <div className="justify-content-end col-2 power">
                    <Link to="/Login" className=" btn  mr-sm-2 oro">Log In</Link>
                    <Link to="/Register" className=" btn  my-2 my-sm-0 oro">Register</Link>
                </div>
            )
        }
    }

    render(){
        return(
            <nav className="navbar navbar-dark  poncho" >
                <span className="navbar-brand" href="#">
                    <Link to="/"><img src="./imgs/LOGO1.png" width="200" height="80" className ="d-inline-block align-top" alt="aun no hay na"/></Link>
                </span>
                 {this.authenticated()}   
        </nav> 
        )
    }
}

export default HeaderBar