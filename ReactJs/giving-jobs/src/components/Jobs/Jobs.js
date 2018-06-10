import React, {Component} from 'react'
import Job from '../Job/Job'

class Jobs extends Component{

    constructor(props){
        super(props);
        this.state = {
          jobs: [],
          loading: true
        }
    }

    componentWillMount(){
      fetch('https://localhost:44365/api/home')
      .then(response => response.json())
      .then(data => {
        this.setState({
          jobs: data,
          loading: false
        });
      })
    }

    letmesee(){
      fetch('https://localhost:44365/api/account/isAnAdmin')
      .then(response => response.json())
      .then(response => console.log(response))
    }

     static jobComponent(id, props){
      props.history.push({
        pathname: '/Job',
        state: {id : id}
      })
    }

     static renderJobsTable(jobs, props){
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
                          <tr onClick={() => {this.jobComponent(job.id, props)}} key={job.id}>
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
        : Jobs.renderJobsTable(this.state.jobs, this.props);


        
        return(
          <div>
            {content}
            {this.letmesee()}
          </div>
        )
      }
    }

export default Jobs