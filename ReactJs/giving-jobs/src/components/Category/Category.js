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

    renderJosbOfCategory(state){
        return(
        <div>
            <h2>Category {state.category.name}</h2>
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