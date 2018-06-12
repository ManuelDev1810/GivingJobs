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
      }).then(data => console.log(this.state.jobs))
    }

    isAnAdmin(){
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

    static hola(date){
      var dateCreated = new Date(date);
      return(dateCreated.toDateString())
    }

     static renderJobsTable(jobs, props){
        return(

            <div>
              <h2>Jobs</h2>
              
              <table className="table">
    
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">Id</th><th scope="col">Name</th>
                      <th scope="col">Date</th>
                      <th scope="col">Category</th>
                    </tr>
                  </thead>

                  <tbody>
                    {jobs.map(job => 
                          <tr onClick={() => this.jobComponent(job.id, props)} key={job.id}>
                            <th scope="row">{job.id}</th><td>{job.name}</td><td>{Jobs.hola(job.date)}</td><td>{job.category}</td>
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
            {this.isAnAdmin()}
          </div>
        )
      }
    }

export default Jobs