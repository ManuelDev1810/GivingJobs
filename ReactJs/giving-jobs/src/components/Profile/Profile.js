import React, {Component} from 'react'

class Profile extends Component {

    constructor(props){
        super(props)
        this.sendData = this.sendData.bind(this)
    }

    sendData(){
        let name = this.name.value
        let email = this.email.value
        let password = this.password.value
        let originalName = JSON.parse(this.props.user).userName

        let post = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name,email,password,originalName})
        
        }
        this.props.editUser(post)
    }

    infoUser(){     
        var user = {}
        if(Object.prototype.toString.call(this.props.user) === "[object String]"){
            user = JSON.parse(this.props.user)
        } else {
            user = this.props.user
        }
        if(user){
            return(
                <div>
                    <p>Primero haz que el usuario pueda actualizar sus datos y despues un commit</p>
                    <h2>{`User: ${user.userName}`}</h2>
                    <div className="form-group">
                        <input type="hidden" className="form-control w-50" id="id" defaultValue={user.userName} disabled/>
                        <input type="hidden" className="form-control w-50" id="id" defaultValue={user.id} disabled/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control w-50" id="name" ref={name => this.name = name} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="text" className="form-control w-50" id="email" ref={email => this.email = email}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="pass">Password</label>
                        <input type="text" className="form-control w-50" id="pass" ref={password => this.password = password}/>
                    </div>
                    <button className="btn btn-primary btn-lg" onClick={this.sendData}>Edit</button>
                </div>
            )
        }else {
            return(<div>No User Was Found</div>)
        }
    }

    render(){
        return(
            <div>
                <h2>User</h2>
                {this.infoUser()}
            </div>
        )
    }
}

export default Profile