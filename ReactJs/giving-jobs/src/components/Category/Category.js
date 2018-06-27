import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class Category extends Component{
    constructor(props){
        super(props);

        this.state = {
            category: null,
            jobs: []
        }
    }

    componentDidMount(){
        if(this.props.location.state !== undefined){
            fetch('https://localhost:44365/api/category/' + this.props.location.state.id)
            .then(response => response.json())
            .then(data => {
                this.setState({category:data.categori, jobs: data.jobs})
                // console.log(data)
            })
        }
    }

    date(date){
        var dateCreated = new Date(date);
        return(dateCreated.toDateString())
    }

    renderJosbOfCategory(state){
        const sizePost = {
            width: 400,
            height: 400,
            marginBottom: '500px'
        }

        const styleImg = {
            width: '100%',
            height: '100%'
        }

        return(
        <div>
            <h2>Category {state.category.name}</h2>
            <h4>Description</h4>
            <p>{state.category.description}</p>
            <h4>Jobs</h4>
            {state.jobs.map(job => 
                <div key={job.id} className="card" style={sizePost}>
                    <img style={styleImg} className="card-img-top" src={require('E:/LocalGit/GivingJobs/ReactJs/giving-jobs/src/imgs/' + job.pathLogo)} />
                    <div className="card-body">
                    <h5 className="card-title">{`Job: ${job.name}`}</h5>
                    <p class="card-text">{job.description}</p>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">{`Company: ${job.company}`}</li>
                        <li class="list-group-item">{`Location: ${job.location}`}</li>
                        <li class="list-group-item">{`Category: ${job.category.name}`}</li>
                        <li class="list-group-item">{`Type: ${job.type}`}</li>
                        <li class="list-group-item">{`Date: ${this.date(job.date)}`}</li>
                        <li className="list-group-item">Send CV to <b>{job.userEmail}</b></li>
                    </ul>
                </div>
                </div>
            ).reverse()}
        </div>
        )
    }
    
    renderNotFound(){
        return(
            <div>
                <p>No Category was found</p>
            </div>
        )
    }

    render(){
        let content = this.state.category ? this.renderJosbOfCategory(this.state) : this.renderNotFound(this.state)
        return(
            <div>
                <Link className="w-25" to="/">Home</Link>
                <hr />
                {content}
            </div>    
        )
    }
}

export default Category