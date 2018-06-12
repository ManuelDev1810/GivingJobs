import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Job from '../Job/Job'

class Jobs extends Component{

    constructor(props){
        super(props);
        this.state = {
          jobs: [],
          categories: [],
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

      fetch('https://localhost:44365/api/category')
      .then(resposne => resposne.json())
      .then(data => {
        this.setState({
          categories: data
        })
      })
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

    static date(date){
      var dateCreated = new Date(date);
      return(dateCreated.toDateString())
    }

     static renderJobsTable(jobs, categories, props){
        return(

            <div className="row justify-content-between">
              <h2 className="col-12">Jobs</h2>
              
              <table className="table col-8">
    
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Date</th>
                      <th scope="col">Category</th>
                    </tr>
                  </thead>

                  <tbody>
                    {jobs.map(job => 
                          <tr onClick={() => this.jobComponent(job.id, props)} key={job.id}>
                            <td>{job.name}</td><td>{Jobs.date(job.date)}</td><td>{job.category.name}</td>
                          </tr>
                    )}
                  </tbody>
                  
              </table>

                  <div className="card col-3">
                    <div className="card-body d-flex flex-column">
                        <h3 className="card-title">Categories</h3>
                        {categories.map(category => 
                          <Link key={category.id} to="#">{category.name}</Link>
                        )}
                    </div>
                </div> 
          </div>
        );
      }
      
      render() {
        
        let content = this.state.loading
        ? <p><em>Loading...</em></p>
        : Jobs.renderJobsTable(this.state.jobs, this.state.categories, this.props);


        
        return(
          <div>
            {content}
            {this.isAnAdmin()}
          </div>
        )
      }
    }

export default Jobs