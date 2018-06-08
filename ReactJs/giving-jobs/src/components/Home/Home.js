import React, { Component } from 'react';
import {Route, Link } from 'react-router-dom'
import CreateJob from '../CreateJob/CreateJob'
import Jobs from '../Jobs/Jobs'


class Home extends Component {
    constructor(){
        super();
        this.state = {
          jobs: [],
          loading: true
        }
      }
    
      componentWillMount(){
        fetch('https://localhost:44365//api/home')
        .then(response => response.json())
        .then((data) => {
          this.setState({
            jobs: data,
            loading: false
          });
        });
      }

      render() {
        
        return(
          <div>
            <Jobs 
              jobs={this.state.jobs} 
              loading={this.state.loading}
            />
          </div>
        )
    }
}


export default Home;