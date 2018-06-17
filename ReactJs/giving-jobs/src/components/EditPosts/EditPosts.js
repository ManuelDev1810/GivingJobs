import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'

class EditPosts extends  Component{

    constructor(props){
        super(props)
        this.state = {
            search: ''
        }
        this.updateSearch = this.updateSearch.bind(this)
        this.deleteJob = this.deleteJob.bind(this)
    }

    date(date){
        var dateCreated = new Date(date);
        return(dateCreated.toDateString())
    }

    updateSearch(event){
        this.setState({search: event.target.value.substr(0,20)})
        console.log(this.state.search)
    }

    deleteJob(id){
        fetch('https://localhost:44365/api/home/delete/' + id, {method: 'delete'})
        .then(() => this.props.getJobs())
    }

    renderJobs(isAnAdmin, user, jobs){
        let filteredJobs = jobs.filter(
            job => {
                return job.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
            }
        );
        if(isAnAdmin){
        return(
            <div>
                    <h1>Edit Posts</h1>
                    <input type="text" className="form-control mb-3" placeholder="Search" onChange={this.updateSearch} />  
                    <table className="table col-8">
                        <thead className="thead-dark">
                        <tr>
                            <th scope="col">Location</th>
                            <th scope="col">Postiion</th>
                            <th scope="col">Company</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                        </thead>
    
                        <tbody>
                        {filteredJobs.map(job => 
                                <tr key={job.id}>
                                    <td>{job.location}</td>
                                    <td>{job.position}</td>
                                    <td>{job.company}</td>
                                    <td><Link className="btn btn-info" to={{pathname:'/EditPost', state:{isAnAdmin, job, user}}}>Edit</Link></td>
                                    <td><button className="btn btn-danger" onClick={() => this.deleteJob(job.id)}>Delete</button></td>
                                </tr>
                        )}
                        </tbody>
                        
                    </table>
                    
                </div>
            )
        }
    }

    render(){
        return(
            <div>
                <Link className="w-25" to="/">Home</Link>
                <hr />
                {this.props.isAnAdmin ? <h4>{`Admin: ${Object.prototype.toString.call(this.props.user) === "[object String]" ? JSON.parse(this.props.user).userName : this.props.user.userName} `}</h4> : ''}
                {this.renderJobs(this.props.isAnAdmin, this.props.user, this.props.jobs)}
            </div>
        )
    }
}

export default EditPosts