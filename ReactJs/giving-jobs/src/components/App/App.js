import React, { Component } from 'react';
import Home from '../Home/Home'
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
            <h1>Giving Jobs</h1>    
            <hr />
            <Route exact path="/" component={Home} />
            <Route path="/CreateJob" render={props => <CreateJob {... props} />} />
        </div>
      </Router>
    )
  }
}

export default App;
