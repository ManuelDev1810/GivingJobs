import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class Profile extends Component {

    constructor(props){
        super(props)
        this.state = {jobs: [], search: ''}
        this.sendData = this.sendData.bind(this)
        this.updateSearch = this.updateSearch.bind(this)
    }

    async componentWillMount(){
        let userName = this.props.user.userName == undefined ? JSON.parse(this.props.user).userName : this.props.user.userName
        const response = await fetch('https://localhost:44365/api/home/jobsOfUser/' + userName)
        const data = await response.json()
        this.setState({jobs:data})
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

    updateSearch(event){
        this.setState({search: event.target.value})
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
                    <h4>Edit your credentials</h4>
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

    date(date){
        var dateCreated = new Date(date);
        return(dateCreated.toDateString())
    }

    deleteJob(id){
        fetch('https://localhost:44365/api/home/delete/' + id, {method: 'delete'})
        .then(() => this.componentWillMount())
    }

    jobsOfUser(){
        let user = this.props.user == undefined ? JSON.parse(this.props.user) : this.props.user
        let filterJobs = this.state.jobs.filter(
            job => {
                return job.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
            }
        )
        if(!this.props.isAnAdmin){
            if(this.state.jobs.length !== 0){
                console.log('AHORA SI COMIENZA A HACER LA TABLA Y ESO')
                console.log(this.state.jobs)
                return(
                    <div>
                        <h1 className="mt-3">Yours Posts</h1>
                        <h3 className="mt-3">Search</h3>
                        <input className="form-control mt-3 mb-3" placeholder="Search by name" onChange={this.updateSearch} />
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
                            {filterJobs.map(job => 
                                    <tr key={job.id}>
                                        <td>{job.name}</td>
                                        <td>{this.date(job.date)}</td>
                                        <td>{job.category.name}</td>
                                        <td><Link className="btn btn-info" to={{pathname:'/EditPost', state:{job, user}}}>Edit</Link></td>
                                        <td><button className="btn btn-danger" onClick={() => this.deleteJob(job.id)}>Delete</button></td>
                                    </tr>
                            )}
                            </tbody>
                        
                    </table>
                    </div>
                )
            }
            
        }
    }

    render(){
        return(
            <div>
                <Link className="w-25" to="/">Home</Link>
                <hr />
                {this.infoUser()}
                {this.jobsOfUser()}
            </div>
        )
    }
}

export default Profile