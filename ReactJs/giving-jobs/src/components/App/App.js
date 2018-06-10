import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import Login from '../Login/Login'
import Register from '../Register/Register'
import HeaderBar from '../HeaderBar/HeaderBar'
import CreateJob from '../CreateJob/CreateJob'
import Job from '../Job/Job'
import Jobs from '../Jobs/Jobs'
import {Route, Link, BrowserRouter as Router } from 'react-router-dom'

class App extends Component {

  constructor(){
    super();
    this.state = {
       user: sessionStorage.getItem('user') || null
    }

    this.logIn = this.logIn.bind(this);
  }

  logIn(user){
    if(sessionStorage.getItem('user') == null){
        sessionStorage.setItem('user', JSON.stringify(user))
        let data = JSON.parse(sessionStorage.getItem('user'))
        this.setState({user: data})
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
            <Route exact path="/" render={props => <Jobs {...props} />} />
            <Route path="/CreateJob" render={props => <CreateJob {... props} />} />
            <Route path="/Login" render={props => <Login {...props} user={this.state.user} logIn={this.logIn} />} />
            <Route path="/Register" render={props => <Register {...props} />}/>
            <Route path="/Job" render={props => <Job {...props} />} />
        </div>
      </Router>
    )
  }
}

export default App;
