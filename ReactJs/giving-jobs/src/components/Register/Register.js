import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class Register extends Component {
    constructor(){
        super();
        this.state = {successfullLogIn: false}
        this.register = this.register.bind(this);
    }

    componentWillMount(){
        if(this.props.user){
            this.props.history.push('/')
        }
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
        this.submitData(post)
    }

    async submitData(data){
       const response = await fetch('https://localhost:44365/api/account', data)
       if(response.status !== 200){
        this.setState({successfullLogIn:true})
       }else{
        this.props.history.push('/Login')
       }
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
                    {this.state.successfullLogIn ? <div className="alert alert-danger mt-3" role="alert">Credenciales erroneas todos inputs deben de estar llenos y la clave debe tener mayusculas, numeros y una letra fuera del abc</div> : ''}
                </form>
            </div>
        )
    }
}

export default Register