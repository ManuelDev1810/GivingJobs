import React, {Component} from 'react';
import {Link} from 'react-router-dom'

class Login extends Component{
    constructor(){
        super();
        this.login = this.login.bind(this);
    }

    login(){
        let emailInput = this.email.value
        let passwordInput = this.password.value

        let post = {
            method: "POST",
            headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            body: JSON.stringify({email: emailInput, password: passwordInput})
        }

        fetch('https://localhost:44365/api/account/login', post)
            .then(response => response.json())
            .then(response => console.log(response))
            .then(this.props.history.push('/'))
    }

    render(){
        return(
            <div>
                <a className="w-25"><Link to="/">Home</Link></a>
                <a className="w-35 ml-3"><Link to="/Register">Register</Link></a>
                <hr />
                <h2>Log in</h2>
                <form className="">
                    <div className="form-group">
                        <label for="email">Email</label>
                        <input className="form-control" type="text" id="email" ref={(email) => this.email = email} />
                    </div>

                    <div className="form-group">
                        <label for="password">Password</label>
                        <input className="form-control" type="password" id="password" ref={(password) => this.password = password} />
                    </div>

                    <input onClick={this.login} className="btn btn-primary" value="Submit" />
                </form>
            </div>
        )
    }
}

export default Login;