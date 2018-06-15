import React, {Component} from 'react'

class Profile extends Component {

    constructor(props){
        super(props)
    }

    infoUser(){
        if(this.props.user){
            return(
                <div>
                    <p>Primero haz que el usuario pueda actualizar sus datos y despues un commit</p>
                </div>
            )
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