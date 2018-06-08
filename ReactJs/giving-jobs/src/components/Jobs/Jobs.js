import React, {Component} from 'react'

class Jobs extends Component{

    constructor(props){
        super(props);
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
    
        let content = this.props.loading
        ? <p><em>Loading...</em></p>
        : Jobs.renderJobsTable(this.props.jobs);
        
        return(
          <div>
            {content}
          </div>
        )
    }
}

export default Jobs