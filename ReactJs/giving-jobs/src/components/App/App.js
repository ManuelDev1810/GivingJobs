import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import Login from '../Login/Login'
import Register from '../Register/Register'
import HeaderBar from '../HeaderBar/HeaderBar'
import CreateJob from '../CreateJob/CreateJob'
import Category from '../Category/Category'
import Job from '../Job/Job'
import Jobs from '../Jobs/Jobs'
import Profile from '../Profile/Profile'
import EditPosts from '../EditPosts/EditPosts'
import EditPost from '../EditPost/EditPost'
import {Route, BrowserRouter as Router } from 'react-router-dom'

class App extends Component {

  constructor(){
    super();
    this.state = {
       user: sessionStorage.getItem('user') || null,
       jobs: [],
       categories: [],
       jobsOfUser: [],
       loading: true,
       isAnAdmin: false,
       successfulEditing: false
    }
    this.logIn = this.logIn.bind(this);
    this.addNewJob = this.addNewJob.bind(this);
    this.onIsAnAdmin = this.onIsAnAdmin.bind(this);
    this.onHandleAdmin = this.onHandleAdmin.bind(this);
    this.getJobs = this.getJobs.bind(this);
    this.editUser = this.editUser.bind(this);
    this.goneOfProfile = this.goneOfProfile.bind(this);
  }

  componentWillMount(){
    fetch('https://localhost:44365/api/category')
      .then(resposne => resposne.json())
      .then(data => {
        this.setState({
          categories: data
        })
      })
      this.getJobs()
  }

  getJobs(){
    fetch('https://localhost:44365/api/home')
    .then(response => response.json())
    .then(data => this.setState({jobs: data, loading: false}))
    this.onIsAnAdmin();
  }

  onIsAnAdmin(){
    var user = {}
    if(Object.prototype.toString.call(this.state.user) === "[object String]"){
        user = JSON.parse(this.state.user)
    } else {
      user = this.state.user
    }
    if(user != null || user != undefined){
        console.log(user.userName)
        fetch('https://localhost:44365/api/account/' + user.userName)
        .then(response => response.json())
        .then(response => this.onHandleAdmin(response))
    }
  }

  onHandleAdmin(admin){
    if(admin){
      this.setState({isAnAdmin:true})
    } else {
      this.setState({isAnAdmin:false})
    }
  }

  logIn(user){
    if(sessionStorage.getItem('user') == null){
        sessionStorage.setItem('user', JSON.stringify(user))
        let data = JSON.parse(sessionStorage.getItem('user'))
        this.setState({user: data})
        this.onIsAnAdmin();
    } else {
      sessionStorage.clear()
      this.setState({user: null, isAnAdmin: false})
    }
  }

  addNewJob(job){
    this.setState({jobs: [...this.state.jobs, job]})
  }

  editUser(user){
    console.log(user)
    fetch('https://localhost:44365/api/account/edit', user)
    .then(response => response.json())
    .then(data => {
      sessionStorage.setItem('user', JSON.stringify(data))
      let user = JSON.parse(sessionStorage.getItem('user'))
      this.setState({user, successfulEditing:true})
    }).catch(e => console.log(e.message))
  }

  goneOfProfile(){
    this.setState({successfulEditing:false})
  }

  render(){
    return(
      <Router>
        <div className="container">
            <HeaderBar user={this.state.user} logout={this.logIn} />
            <Route exact path="/" render={props => <Jobs {...props} jobs={this.state.jobs} 
                loading={this.state.loading} 
                categories={this.state.categories} getJobs={this.getJobs} />} />
            <Route path="/CreateJob" render={props => <CreateJob {... props} addNewJob={this.addNewJob} user={this.state.user} />} />
            <Route path="/Login" render={props => <Login {...props} user={this.state.user} logIn={this.logIn} />} />
            <Route path="/Register" render={props => <Register {...props} user={this.state.user}/>}/>
            <Route path="/Job" render={props => <Job {...props} />} />
            <Route path="/Category" render={props => <Category {...props} />} />
            <Route path="/Profile" render={props => <Profile {...props} user={this.state.user} 
                isAnAdmin={this.state.isAnAdmin} editUser={this.editUser} successfulEditing={this.state.successfulEditing}
                goneOfProfile={this.goneOfProfile} />} />
            <Route path="/EditPosts" render={props => <EditPosts {...props} jobs={this.state.jobs}
                isAnAdmin={this.state.isAnAdmin} onIsAnAdmin={this.onIsAnAdmin} user={this.state.user} getJobs={this.getJobs}
                onHandleAdmin={this.onHandleAdmin} />} />
            <Route path="/EditPost" render={props => <EditPost {...props} getJobs={this.getJobs} isAnAdmin={this.state.isAnAdmin} />} />
        </div>
      </Router>
    )
  }
}

export default App;
