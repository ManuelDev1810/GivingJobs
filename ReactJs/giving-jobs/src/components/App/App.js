import React, { Component } from 'react';


class App extends Component {


  constructor(){
    super();

    this.state = {
      jobs: [],
      isLoaded: true
    }
  }

  componentWillMount(){
      fetch('https://localhost:44365//api/home')
        .then(response => response.json())
        .then((result) => {
          this.setState({
            jobs: result,
            isLoaded: false
          });
        })
  }

  render() {

    if(this.state.idLoaded) {
      return <p>Loading</p>
    } else {
      return (
        <div className="container">
          <h1>Giving Jobs</h1>
            <hr />
            <table className="table">
  
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Id</th><th scope="col">Name</th><th scope="col">Email</th><th scope="col">Description</th>
                  </tr>
                </thead>

                <tbody>
                  {this.state.jobs.map(job => (
                        <tr key={job.id}>
                          <th scope="row">{job.id}</th><td>{job.name}</td><td>{job.email}</td><td>{job.description}</td>
                        </tr>
                      ))}
                </tbody>
                
          </table>
        </div>
      );
    }
  }
}

export default App;
