import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class EditPost extends Component {

    constructor(props){
        super(props)
        this.state = {
            categories: []
        }
        this.editJob = this.editJob.bind(this)
    }

    componentWillMount(){
        console.log(this.props.location.state.job)
        fetch('https://localhost:44365/api/category')
        .then(resposne => resposne.json())
        .then(data => {
           this.setState({categories: data})
        })
    }

    editJob(){
        let id = this.id.value
        let name = this.name.value
        let description = this.description.value
        let categoryId = this.category.value
        console.log(categoryId)
        let put = {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id,name,description,categoryId})
        }
        fetch('https://localhost:44365/api/home', put)
        .then(response => response.json())
        .then(() => this.props.getJobs())
        .then(() => this.props.history.push('/EditPosts'))
    }

    render(){
        let props = this.props.location.state;
        return(
            <div>
                <Link className="w-25" to="/">Home</Link>
                <hr />
                <h2>{`Edit: ${props.job.name}`}</h2>
                <div>
                    <input type="hidden" value={props.job.id} ref={id => this.id = id} />
                    <div className="form-group">
                        <label htmlFor="id">Name</label>
                        <input type="text" className="form-control w-50" id="id" ref={name => this.name = name}  />
                    </div>

                     <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea type="text" className="form-control w-50" id="description" ref={description => this.description = description}>
                        </textarea>
                    </div>

                     <div className="form-group">
                        <label htmlFor="category">Category</label>
                        <select className="form-control w-50" id="categories" ref={category => this.category = category}>
                            {this.state.categories.map(category => 
                                <option key={category.id} value={category.id}>{category.name}</option>
                            )}
                        </select>
                    </div>
                </div>
                <button className="btn btn-primary" onClick={this.editJob}>Edit</button>
            </div>
        )
    }
}

export default EditPost