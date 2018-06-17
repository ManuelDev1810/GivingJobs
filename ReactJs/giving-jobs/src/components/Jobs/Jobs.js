import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class Jobs extends Component{

    constructor(props){
        super(props);
        this.state = {
          search: ''
        }
        this.updateSearch = this.updateSearch.bind(this)
    }

    updateSearch(event){
        this.setState({search: event.target.value.substr(0,20)})
    }

    static isAdminLabels(admin){
      if(admin){
        return(
          <div>
            <th scope="col">Edit</th>
            <th scope="col">Category</th>
          </div>
        )
      }
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
            job => {
              //Return whatever that is not -1, indexof returns -1 if not find anything.. 
              //So if you cannot get this particular name of the job DONT RETURN ANYTHING
              return (job.location.toLowerCase().indexOf(state.search.toLowerCase()) !== -1  || 
                      job.position.toLowerCase().indexOf(state.search.toLowerCase()) !== -1 ||
                      job.company.toLowerCase().indexOf(state.search.toLowerCase()) !== -1 ||
                      job.category.name.toLowerCase().indexOf(state.search.toLowerCase()) !== -1 ||
                      Jobs.date(job.date).toLowerCase().indexOf(state.search.toLowerCase()) !== -1
                    );
            }
       ).reverse();
        return(
          <div className="row justify-content-between">
              <h2 className="col-12 mito">Jobs</h2>
              <table className="table col-8">
    
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">Location</th>
                      <th scope="col">Postiion</th>
                      <th scope="col">Company</th>
                      <th scope="col">Category</th>
                      <th scope="col">Date</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredJobs.map(job => 
                          <tr onClick={() => this.jobComponent(job.id, props)} key={job.id}>
                            <td>{job.location}</td>
                            <td>{job.position}</td>
                            <td>{job.company}</td>
                            <td>{job.category.name}</td>
                            <td>{Jobs.date(job.date)}</td>
                          </tr>
                    ).reverse()}
                  </tbody>
                  
              </table>
                  <div className="card col-3">
                    <div className="card-body d-flex flex-column">
                        <h3 className="card-title">Categories</h3>
                        {props.categories.map(category => 
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
            <input className="mb-2 form-control" type="text" name="nombre" placeholder="Search"  onChange={this.updateSearch} />
            {content}
          </div>
        )
      }
    }

export default Jobs