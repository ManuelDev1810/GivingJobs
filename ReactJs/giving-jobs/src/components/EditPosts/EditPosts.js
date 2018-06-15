import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class EditPosts extends  Component{

    constructor(props){
        super(props)
    }

    componentWillMount(){
        this.props.onIsAnAdmin()
        console.log(this.props.isAnAdmin)
    }

    date(date){
        var dateCreated = new Date(date);
        return(dateCreated.toDateString())
    }

    renderJobs(){
        if(this.props.isAnAdmin){
            return(
                <div>
                    <table className="table col-8">

                        <thead className="thead-dark">
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Date</th>
                            <th scope="col">Category</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                        </thead>
    
                        <tbody>
                        {this.props.jobs.map(job => 
                                <tr key={job.id}>
                                    <td>{job.name}</td><td>{this.date(job.date)}</td>
                                    <td>{job.category.name}</td>
                                    <td><Link className="btn btn-info" to="#">Edit</Link></td>
                                    <td><Link className="btn btn-danger" to="#">Delete</Link></td>
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
                <h1>EditPosts</h1>  
                {this.props.isAnAdmin ? <h4>{`Admin: ${JSON.parse(this.props.user).userName}`}</h4> : ''}
                {this.renderJobs()}
            </div>
        )
    }
}

export default EditPosts