import React, { Component } from 'react';
import Home from '../Home/Home'
import Login from '../Login/Login'
import Register from '../Register/Register'
import CreateJob from '../CreateJob/CreateJob'
import {Route, Link, BrowserRouter as Router } from 'react-router-dom'

class App extends Component {

  constructor(){
    super();
  }

  render(){
    return(
      <Router>
        <div className="container">
            <div className="row justify-content-between mt-3">
              <h1>Giving Jobs</h1>    
              <Link to="/Login">Log In</Link>
              <Link to='/CreateJob'>Create Job</Link>
            </div>
            <hr />
            <Route exact path="/" component={Home} />
            <Route path="/CreateJob" render={props => <CreateJob {... props} />} />
            <Route path="/Login" render={props => <Login {...props} />} />
            <Route path="/Register" render={props => <Register {...props} />}/>
        </div>
      </Router>
    )
  }
}

export default App;
