import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class Job extends Component {

    constructor(props){
        super(props);
        this.state = {
            job: null
        }
    }

    //Start to work here
    componentWillMount(){
        if(this.props.location.state !== undefined){
            fetch('https://localhost:44365/api/home/job/' + this.props.location.state.id)
            .then(response => response.json())
            .then(data => this.setState({job:data}))
        }
    }

    static changedPath(img){
        console.log(img.replace(img, "/"))
    }


    static renderJob(state){
        if(state !== null)
        return(
        <div>
            <Link className="w-25" to="/">Home</Link>
            <hr />
            {this.changedPath(state.job.pathLogo)}
            <img src={require('E:/LocalGit/GivingJobs/ReactJs/giving-jobs/src/imgs/' + state.job.pathLogo)} />
            <p>{state.job.pathLogo}</p>
            <p>{state.job.id}</p>
            <p>{state.job.name}</p>
            <p>{state.job.date}</p>
            <p>{state.job.description}</p>
            <p>{state.job.email}</p>
            <p>{state.job.category.name}</p>
            <p>Enviar CV e informacion a <b>{state.job.userEmail}</b></p>
        </div>
        )
    }

    static renderNotFound(){
        return(
            <div>
                <Link className="w-25" to="/">Home</Link>
                <hr />
                <p>Loading</p>
            </div>
        )
    }

    render(){

        let content = this.state.job ? Job.renderJob(this.state) : Job.renderNotFound()
        return(
            <div>
                {content}
                {console.log(this.state.job)}
            </div>
        )
    }
}

export default Job