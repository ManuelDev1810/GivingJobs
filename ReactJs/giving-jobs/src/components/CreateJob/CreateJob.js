import React, { Component } from 'react';
import {Route, Link } from 'react-router-dom'


class CreateJob extends Component {

    constructor(){
      super();
      this.state = {categories: []}
      this.submitData = this.submitData.bind(this)
      this.onHandleCreateJob = this.onHandleCreateJob.bind(this)
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

    submitData(){
        let nameInput = this.name.value
        let descriptionInput = this.email.value
        let emailInput = this.description.value
        let categoryInput = this.category.value
        
        let post = {
            method: "POST",
            headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            body: JSON.stringify({name: nameInput, description: descriptionInput, email: emailInput, categoryId: categoryInput})
        }

        fetch('https://localhost:44365//api/home', post)
            .then(response => response.json())
            .then(data => this.onHandleCreateJob(data))
    }

    onHandleCreateJob(job){
        this.props.addNewJob(job)
        window.location.reload()
        this.props.history.push('/')
    }

    render(){
        return(
            <div>
                <a className="w-25"><Link to="/">Home</Link></a>
                <hr />
                <h2>Create a Job</h2>
                <form className="">
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input className="form-control" type="text" id="name" ref={(name) => this.name = name}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input className="form-control" type="text" id="email" ref={(email) => this.email = email} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="categories">Category</label>
                        <select id="categories" className="form-control" ref={category => this.category = category}>
                           {this.state.categories.map(category =>
                                <option key={category.id} name="categoryId" value={category.id}>{category.name}</option>
                            )}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea className="form-control" id="description" ref={(description) => this.description = description}></textarea>
                    </div>

                    <input onClick={this.submitData} className="btn btn-primary" value="Submit" />
                </form>
            </div>
        )
    }
}

export default CreateJob;