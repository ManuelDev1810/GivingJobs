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
                <div className="container formulario">               
                    <div >
                        <div className="col-xs-4 col-xs-offset-4">
                                <center> <img src="imgs/LOGO4.png" className="logo" /></center>
                        </div>
                    </div>

                    <div className="espaciado">
                        <div >
                            <fieldset  className="col-xs-10 col-xs-offset-1">
                            <center><label ClassName="hidden-xs"><h3>LOG IN</h3></label></center>
                                <form className="form-horizontal">

                                    <div class="form-group">
                                                        
                                        <label  className="col-xs-12" htmlFor="email">Email</label>
                                        <div className="col-xs-10 col-offset-1">
                                            <input className="form-control" type="text" id="email" ref={(email) => this.email = email} />
                                        </div>
                
                                        <label className="col-xs-12" htmlFor="password">Password</label>
                                        <div className="col-xs-10 col-offset-1">
                                            <input className="form-control" type="password" id="password" ref={(password) => this.password = password} />
                                        </div>     

                                    </div>  

                                    <div class="form-group">
                                        <center><input onClick={this.login} className="btn btn-primary mb-3" defaultValue="Submit" /></center>
                                        {this.state.successfullLogIn ? <div className="alert alert-danger" role="alert">Credenciales erroneas</div> : ''}
                                    </div>

                                 </form>
                            </fieldset>
                        </div>
                    </div>

                 </div >
            </div>
        )
    }
}

export default Login;