import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class Register extends Component {
    constructor(){
        super();
        this.register = this.register.bind(this);
    }

    register(){
        let nameInput = this.name.value
        let passwordInput = this.password.value
        let emailInput = this.email.value
        
        let post = {
            method: "POST",
            headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            body: JSON.stringify({name: nameInput, password: passwordInput, email: emailInput})
        }

        fetch('https://localhost:44365/api/account', post)
            .then(response => response.json())
            .then(response => console.log(response))
            .then(this.props.history.push('/Login'))
    }

    render(){
        return(
            <div>
                <Link className="w-25" to="/">Home</Link>
                <hr />
                <h2>Register</h2>
                <form className="">
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input className="form-control" type="text" id="name" ref={(name) => this.name = name}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input className="form-control" type="text" id="email" ref={(email) => this.email = email} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input className="form-control" type="password" id="password" ref={(password) => this.password = password} />
                    </div>

                    <input onClick={this.register} className="btn btn-primary" defaultValue="Submit" />
                </form>
            </div>
        )
    }
}

export default Register