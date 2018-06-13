import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import Login from '../Login/Login'
import Register from '../Register/Register'
import HeaderBar from '../HeaderBar/HeaderBar'
import CreateJob from '../CreateJob/CreateJob'
import Category from '../Category/Category'
import Job from '../Job/Job'
import Jobs from '../Jobs/Jobs'
import {Route, Link, BrowserRouter as Router } from 'react-router-dom'

class App extends Component {

  constructor(){
    super();
    this.state = {
       user: sessionStorage.getItem('user') || null,
       jobs: [],
       loading: true
    }
    this.logIn = this.logIn.bind(this);
  }

  componentWillMount(){
    fetch('https://localhost:44365/api/home')
    .then(response => response.json())
    .then(data => this.setState({jobs: data, loading: false}))
  }

  logIn(user){
    if(sessionStorage.getItem('user') == null){
        sessionStorage.setItem('user', JSON.stringify(user))
        let data = JSON.parse(sessionStorage.getItem('user'))
        this.setState({user: data})
        console.log(data)
    } else {
      sessionStorage.clear()
      this.setState({user: null})
    }
    
  }

  render(){
    return(
      <Router>
        <div className="container">
            <HeaderBar user={this.state.user} logout={this.logIn} />
            <Route exact path="/" render={props => <Jobs {...props} jobs={this.state.jobs} loading={this.state.loading} />} />
            <Route path="/CreateJob" render={props => <CreateJob {... props} />} />
            <Route path="/Login" render={props => <Login {...props} user={this.state.user} logIn={this.logIn} />} />
            <Route path="/Register" render={props => <Register {...props} />}/>
            <Route path="/Job" render={props => <Job {...props} />} />
            <Route path="/Category" render={props => <Category {...props} />} />
        </div>
      </Router>
    )
  }
}

export default App;
