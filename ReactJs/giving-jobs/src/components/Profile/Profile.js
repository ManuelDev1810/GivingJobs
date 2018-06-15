import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class Profile extends Component {

    constructor(props){
        super(props)
        this.sendData = this.sendData.bind(this)
    }

    componentWillMount(){
        console.log(this.props.isAnAdmin)
    }

    componentWillUnmount(){
        this.props.goneOfProfile();
    }

    sendData(){
        let name = this.name.value
        let email = this.email.value
        let password = this.password.value
        let originalName =  ''

        if(Object.prototype.toString.call(this.props.user) === "[object String]"){
            originalName = JSON.parse(this.props.user).userName
        } else {
            originalName = this.props.user.userName
        }

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
                    {this.props.isAnAdmin ? <h2>{`Admin: ${user.userName}`}</h2> : <h2>{`User: ${user.userName}`}</h2>}
                    <h4>Edit Information</h4>
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
                        <input type="password" className="form-control w-50" id="pass" ref={password => this.password = password}/>
                    </div>
                    {this.props.successfulEditing ? <div className="alert alert-success" role="alert">Editacion exitosa</div> : ''}
                    <button className="btn btn-primary btn-lg" onClick={this.sendData}>Edit</button>
                    <div></div>
                    {this.props.isAnAdmin ? <Link to="EditPosts" className="btn btn-secondary btn-lg mt-3">Edit / Delete Jobs</Link>: ''}
                </div>
            )
        }else {
            return(<div>No User Was Found</div>)
        }
    }

    render(){
        return(
            <div>
                <Link className="w-25" to="/">Home</Link>
                <hr />
                {this.infoUser()}
                
            </div>
        )
    }
}

export default Profile