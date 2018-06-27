import React, { Component } from 'react';
import {Route, Link } from 'react-router-dom'


class CreateJob extends Component {

    constructor(){
      super();
      this.state = {categories: [], successfullLogIn: false}
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
        let company = this.company.value
        let location = this.location.value
        let position = this.position.value
        let type = this.type.value
        let file = this.logo.files[0]
        let pathLogo = file !== undefined ? file.name : null

     
        
        let post = {
            method: 'POST',
            headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            body: JSON.stringify({name: nameInput, description: descriptionInput, categoryId: categoryInput, userName, userEmail,company,location,position,type, pathLogo,file})
        }
        let data = new FormData()
        data.append('file', file)
        let img = {
            method: 'POST',
            body: data
        }
        this.sendData(post, img)
    }

    async sendData(post, img){
        try{
            const responseModel  = await fetch('https://localhost:44365//api/home', post);
            const responseImg = await fetch('https://localhost:44365//api/home/img', img);
            if(responseModel.status !== 200 && responseImg.status !== 200){
                this.setState({successfullLogIn:true})
            } else {
                const data = responseModel.json()
                this.onHandleCreateJob(data)
            }
        }catch(e){
            this.setState({successfullLogIn:true})
        }
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
                <form className="" encType="multipart/form-data">
                    {this.state.successfullLogIn ? <div className="alert alert-danger mt-3" role="alert">Hay campos vacios</div> : ''}
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input className="form-control" type="text" id="name" ref={(name) => this.name = name}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="company">Company</label>
                        <input className="form-control" type="text" id="company" ref={(company) => this.company = company}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="location">Location</label>
                        <input className="form-control" type="text" id="location" ref={(location) => this.location = location}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="position">Position</label>
                        <input className="form-control" type="text" id="position" ref={(position) => this.position = position}/>
                    </div>

                    <div>
                        <label>Logo</label>
                        <input type="file" name="file" ref={logo => this.logo = logo} />
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
                        <label htmlFor="categories">Type</label>
                        <select id="categories" className="form-control" ref={type => this.type = type}>
                                <option value="Full Time">Full Time</option>
                                <option value="Parte Time">Part Time</option>
                                <option value="Freelance">Freelance</option>
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