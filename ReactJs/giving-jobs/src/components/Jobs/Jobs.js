import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Job from '../Job/Job'

class Jobs extends Component{

    constructor(props){
        super(props);
        this.state = {
          categories: [],
          search: ''
        }
        this.updateSearch = this.updateSearch.bind(this)
    }

    componentWillMount(){
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

    updateSearch(event){
        this.setState({search: event.target.value.substr(0,20)})
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

     static renderJobsTable(jobs, state, props){
       let  filteredJobs = jobs.filter(
            (job) => {
              //Return whatever that is not -1, indexof returns -1 if not find anything.. 
              //So if you cannot get this particular name of the job DONT RETURN ANYTHING
              return job.name.toLowerCase().indexOf(state.search.toLowerCase()) !== -1;
            }
       ).reverse();
        return(
          <div className="row justify-content-between">
              <h2 className="col-12 mito">Jobs</h2>
              <table className="table col-8">
    
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Date</th>
                      <th scope="col">Category</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredJobs.map(job => 
                          <tr onClick={() => this.jobComponent(job.id, props)} key={job.id}>
                            <td>{job.name}</td><td>{Jobs.date(job.date)}</td>
                            <td>{job.category.name}</td>
                          </tr>
                    )}
                  </tbody>
                  
              </table>
                  <div className="card col-3">
                    <div className="card-body d-flex flex-column">
                        <h3 className="card-title">Categories</h3>
                        {state.categories.map(category => 
                          <Link key={category.id} className="btn btn-success mb-3" to={{pathname: '/Category', state:{id: category.id}}}>{category.name}</Link>
                        )}
                    </div>
                </div> 
          </div>
        );
      }
      
      render() {
        
        let content = this.props.loading
        ? <p><em>Loading...</em></p>
        : Jobs.renderJobsTable(this.props.jobs, this.state, this.props);
        return(
          <div>
            <input className="mb-2 form-control" type="text" name="nombre" placeholder="Search By Name"  onChange={this.updateSearch} />
            {content}
            {/* {this.isAnAdmin()} */}
          </div>
        )
      }
    }

export default Jobs