import React, { Component } from 'react';
import {Route, Link } from 'react-router-dom'
import CreateJob from '../CreateJob/CreateJob'

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

        
          
        
        //   fetch('https://localhost:44365/api/account/IsIn')
        //  .then(response => response.json())
        //  .then(response => console.log(response)) 
      }



      static renderJobsTable(jobs){
        return(
            <div>
              <h2>Jobs</h2>
              
              <table className="table">
    
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">Id</th><th scope="col">Name</th><th scope="col">Email</th><th scope="col">Description</th>
                    </tr>
                  </thead>

                  <tbody>
                    {jobs.map(job => 
                          <tr key={job.id}>
                            <th scope="row">{job.id}</th><td>{job.name}</td><td>{job.email}</td><td>{job.description}</td>
                          </tr>
                    )}
                  </tbody>
                  
              </table>
          </div>
        );
      }
    
      render() {
    
        let content = this.state.loading
        ? <p><em>Loading...</em></p>
        : Home.renderJobsTable(this.state.jobs);
        
        return(
          <div>
            {content}
          </div>
        )
    }
}


export default Home;