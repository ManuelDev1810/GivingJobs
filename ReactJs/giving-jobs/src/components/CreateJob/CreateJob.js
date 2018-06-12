import React, { Component } from 'react';
import {Route, Link } from 'react-router-dom'


class CreateJob extends Component {

    constructor(){
      super();
      this.submitData = this.submitData.bind(this)
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
            body: JSON.stringify({name: nameInput, description: descriptionInput, email: emailInput, category: categoryInput})
        }

        fetch('https://localhost:44365//api/home', post)
            .then(response => response.json())
            .then(response => console.log(response))
            .then(this.props.history.push('/'))
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
                            <option>Programming</option>
                                    <option>Design</option>
                            <option>Databases</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input className="form-control" type="text" id="description" ref={(description) => this.description = description} />
                    </div>

                    <input onClick={this.submitData} className="btn btn-primary" value="Submit" />
                </form>
            </div>
        )
    }
}

export default CreateJob;