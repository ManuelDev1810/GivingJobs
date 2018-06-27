import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class Jobs extends Component{

    constructor(props){
        super(props);
        this.state = {
          search: '',
          currentPage: 1,
          jobsPerPage: 20
        }
        this.updateSearch = this.updateSearch.bind(this)
        this.handleClick = this.handleClick.bind(this);
    }

    updateSearch(event){
        this.setState({search: event.target.value.substr(0,20)})
    }

    handleClick(event) {
      console.log(event)
     this.setState({currentPage:Number(event.target.id)})
    }

   isAdminLabels(admin){
      if(admin){
        return(
          <div>
            <th scope="col">Edit</th>
            <th scope="col">Category</th>
          </div>
        )
      }
    }

    jobComponent(id, props){
      props.history.push({
        pathname: '/Job',
        state: {id : id}
      })
    }
    
    date(date){
      var dateCreated = new Date(date);
      return(dateCreated.toDateString())
    }

    renderJobsTable(jobs, state, props){

      let  filteredJobs = jobs.filter(
          job => {
            //Return whatever that is not -1, indexof returns -1 if not find anything.. 
            //So if you cannot get this particular name of the job DONT RETURN ANYTHING
            return (job.location.toLowerCase().indexOf(state.search.toLowerCase()) !== -1  || 
                    job.position.toLowerCase().indexOf(state.search.toLowerCase()) !== -1 ||
                    job.company.toLowerCase().indexOf(state.search.toLowerCase()) !== -1 ||
                    job.category.name.toLowerCase().indexOf(state.search.toLowerCase()) !== -1 ||
                    this.date(job.date).toLowerCase().indexOf(state.search.toLowerCase()) !== -1
                  );
          }
      ).reverse();

      //Logic for displaying current jobs
      const indexOfLastJob = state.currentPage * state.jobsPerPage;
      const indexOfFirstJob = indexOfLastJob - state.jobsPerPage;
      const currentJobs = filteredJobs.reverse().slice(indexOfFirstJob,indexOfLastJob)

      //Logic for displating page numbers
      const pageNumbers = [];
      for(let i = 1; i <= Math.ceil(filteredJobs.length / state.jobsPerPage); i++){
        pageNumbers.push(i)
      }

      return(
        <div className="row justify-content-between">
            <h2 className="col-12 mito">JOBS</h2>
            <table className="table table-hover col-8 tablita">

            {/* Jobs */}
            
                <thead className="thead">
                  <tr className="circulo">
                    <th scope="col">Location</th>
                    <th scope="col">Position</th>
                    <th scope="col">Company</th>
                    <th scope="col">Category</th>
                    <th scope="col">Date</th>
                  </tr>
                </thead>

                <tbody className="tbody">
                  {filteredJobs.map(job => 
                        <tr onClick={() => this.jobComponent(job.id, props)} key={job.id}>
                          <td>{job.location}</td>
                          <td>{job.position}</td>
                          <td>{job.company}</td>
                          <td>{job.category.name}</td>
                          <td>{this.date(job.date)}</td>
                        </tr>
                  )}
                </tbody>
                      
                {pageNumbers.map( page =>
                  <a className="mr-3" key={page} id={page} onClick={this.handleClick}>{page}</a>
                )}
            </table>
            
            {/* Cateogires */}

            <div className="card col-3 carta">
                  <div className="card-body d-flex flex-column carta2">
                      <h3 className="card-title carta-titulo">Categories</h3>
                      {props.categories.map(category => 
                        <Link key={category.id} className="btn btn-success mb-3 botones" to={{pathname: '/Category', state:{id: category.id}}}>{category.name}</Link>
                      )}
                  </div>
            </div> 
            
        </div>
      );
    }
      
      render() {
        let content = this.props.loading
        ? <p><em>Loading...</em></p>
        : this.renderJobsTable(this.props.jobs, this.state, this.props);
        console.log(this.props.loading)
        return(
          <div>
            <input className="mb-2 form-control" type="text" name="nombre" placeholder="Search"  onChange={this.updateSearch} />
            {content}
          </div>
        )
      }
    }

export default Jobs