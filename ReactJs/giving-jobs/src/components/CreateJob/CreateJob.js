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
        this.props.user || this.props.history.push('/')

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
        let descriptionInput = this.description.value
        let categoryInput = this.category.value
        let userName = this.props.user.userName == undefined ? JSON.parse(this.props.user).userName : this.props.user.userName
        let userEmail = this.props.user.email == undefined ? JSON.parse(this.props.user).email : this.props.user.email
    
        
        let post = {
            method: 'POST',
            headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            body: JSON.stringify({name: nameInput, description: descriptionInput, categoryId: categoryInput, userName, userEmail})
        }

        fetch('https://localhost:44365//api/home', post)
            .then(response => response.json())
            .then(data => this.onHandleCreateJob(data))
            .then(() => console.log(post))
    }

    onHandleCreateJob(job){
        this.props.addNewJob(job)
        window.location.reload()
        this.props.history.push('/')
    }

    render(){
        return(
            <div>
                <Link className="w-25" to="/">Home</Link>
                <hr />
                <h2>Create a Job</h2>
                <form className="">
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input className="form-control" type="text" id="name" ref={(name) => this.name = name}/>
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

                    <input onClick={this.submitData} className="btn btn-primary" defaultValue="Submit"  />
                </form>
            </div>
        )
    }
}

export default CreateJob;