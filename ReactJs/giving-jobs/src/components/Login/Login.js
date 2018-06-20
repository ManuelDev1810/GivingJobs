import React, {Component} from 'react';
import {Link} from 'react-router-dom'

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {successfullLogIn: false}
        this.login = this.login.bind(this);
        this.onHandleUser = this.onHandleUser.bind(this);
    }

    componentWillMount(){
        if(this.props.user != null){
            this.props.history.push('/')
        }
    }

    componentWillUnmount(){
        this.setState({successfullLogIn:false})
    }

    login(){
        let emailInput = this.email.value
        let passwordInput = this.password.value

        if(emailInput === '' || passwordInput === ''){
            this.setState({successfullLogIn:true})
        } else {
    
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
                .then(response => this.onHandleUser(response))
                .then(() => this.props.history.push("/"))
                .catch(() => this.setState({successfullLogIn:true}))
        }
    }

    onHandleUser(user){
        this.props.logIn(user)
    }

    render(){
        return(
            <div>
                <Link className="w-25"  to="/">Home</Link>
                <Link to="/Register" className="w-35 ml-3">Register</Link>
                <hr />
                <h2>Log in</h2>
                <form className="">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input className="form-control" type="text" id="email" ref={(email) => this.email = email} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input className="form-control" type="password" id="password" ref={(password) => this.password = password} />
                    </div>

                    <input onClick={this.login} className="btn btn-primary mb-3" defaultValue="Submit" />
                    {this.state.successfullLogIn ? <div className="alert alert-danger" role="alert">Credenciales erroneas</div> : ''}
                </form>
            </div>
        )
    }
}

export default Login;