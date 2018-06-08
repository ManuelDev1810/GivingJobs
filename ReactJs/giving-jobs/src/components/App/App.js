import React, { Component } from 'react';
import Home from '../Home/Home'
import Login from '../Login/Login'
import Register from '../Register/Register'
import HeaderBar from '../HeaderBar/HeaderBar'
import CreateJob from '../CreateJob/CreateJob'
import {Route, Link, BrowserRouter as Router } from 'react-router-dom'

class App extends Component {

  constructor(){
    super();
    this.state = {
      user: null
    }

    this.logIn = this.logIn.bind(this);
  }

  logIn(user){
    this.setState({user})
    console.log(user)
  }

  render(){
    return(
      <Router>
        <div className="container">
            <HeaderBar user={this.state.user} />
            <Route exact path="/" component={Home} />
            <Route path="/CreateJob" render={props => <CreateJob {... props} />} />
            <Route path="/Login" render={props => <Login {...props} user={this.state.user} logIn={this.logIn} />} />
            <Route path="/Register" render={props => <Register {...props} />}/>
        </div>
      </Router>
    )
  }
}

export default App;
