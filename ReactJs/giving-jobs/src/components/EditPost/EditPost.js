import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class EditPost extends Component {

    constructor(props){
        super(props)
    }

    componentWillMount(){
        console.log(this.props.location.state.job)
    }

    render(){
        return(
            <div>
                <Link className="w-25" to="/">Home</Link>
                <hr />
                <p>{this.props.location.state.job.name}</p>
                <p>{this.props.location.state.job.date}</p>
                <p>{this.props.location.state.job.description}</p>
                <p>{this.props.location.state.job.category.name}</p>
            </div>
        )
    }
}

export default EditPost