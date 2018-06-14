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

    componentWillMount(){
        if(this.props.location.state != undefined){
            fetch('https://localhost:44365/api/category/' + this.props.location.state.id)
            .then(response => response.json())
            .then(data => {
                this.setState({category:data.categori, jobs: data.jobs})
            })
        }
    }

    static renderJosbOfCategory(state){
        return(
        <div>
            <h2>Category</h2>
            <h5>{state.category.name}</h5>
            <h4>Description</h4>
            <p>{state.category.description}</p>
            <h4>Jobs</h4>
            {state.jobs.map(job => 
                <div key={job.id}>
                    <h5>{job.id}</h5>
                    <p>{job.name}</p>
                    <p>{job.date}</p>
                    <p>{job.description}</p>
                    <p>{job.email}</p>
                </div>
            )}
        </div>
        )
    }
    
    static renderNotFound(state){
        return(
            <div>
                <p>No Category was found</p>
            </div>
        )
    }

    render(){
        let content = this.state.category ? Category.renderJosbOfCategory(this.state) : Category.renderNotFound(this.state)
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