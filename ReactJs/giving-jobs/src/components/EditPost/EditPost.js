import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class EditPost extends Component {

    constructor(props){
        super(props)
        this.state = {
            categories: [],
            successfullEdit: false
        }
        this.editJob = this.editJob.bind(this)
        this.renderPost = this.renderPost.bind(this)
    }

    componentWillMount(){
        this.props.getJobs()
        if(this.props.location.state === undefined){
            this.props.history.push('/')
        } else {
            fetch('https://localhost:44365/api/category')
            .then(resposne => resposne.json())
            .then(data => {
               this.setState({categories: data})
            })
        }
    }

    editJob(){
        let id = this.id.value
        let name = this.name.value
        let description = this.description.value
        let categoryId = this.category.value
        let userName = this.userName.value
        let userEmail = this.userEmail.value
        let company = this.company.value
        let location = this.location.value
        let position = this.position.value
        let type = this.type.value
        let file = this.logo.files[0]
        let pathLogo = file !== undefined ? file.name : null

        let put = {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id,name,description,categoryId,userName,userEmail,company,location,position,type,pathLogo})
        }

        let data = new FormData()
        data.append('file', file)
        let img = {
            method: 'POST',
            body: data
        }

        this.sendData(put, img)
    }

    async sendData(put, img){
        try{
            const responseModel  = await fetch('https://localhost:44365/api/home', put)
            const responseImg = await fetch('https://localhost:44365//api/home/img', img);
            if(responseModel.status === 200 && responseImg.status === 200){
    
                 await responseModel.json();
                this.props.getJobs();
                if(this.props.isAnAdmin === true){
                    this.props.history.push('/EditPosts')
                }else {
                    this.props.history.push('/Profile')
                }
    
            } else {
                this.setState({successfullLogIn:true})
            }
        }catch(e){
            this.setState({successfullLogIn:true})
        }

    }

    renderPost(){

        let props = this.props.location.state;
        if(props == undefined){
            this.props.history.push('/')
        } else {
            return(
                <div>
                <div className="mt-3">
                    <Link className="w-25"  to="/"> <i class="fas fa-home"></i> Home</Link>
                </div>
                <hr />
                <h2>{`Edit: ${props.job.name}`}</h2>
                <div>
                    {this.state.successfullLogIn ? <div className="alert alert-danger mt-3" role="alert">Hay campos vacios</div> : ''}
                    <input type="hidden" value={props.job.id} ref={id => this.id = id} />
                    <input type="hidden" value={props.job.userEmail} ref={userEmail => this.userEmail = userEmail} />
                    <input type="hidden" value={props.job.userName} ref={userName => this.userName = userName} />
                    <div className="form-group">
                        <label htmlFor="id">Name</label>
                        <input type="text" className="form-control w-50" id="id" ref={name => this.name = name}  />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="company">Company</label>
                        <input className="form-control w-50" type="text" id="company" ref={(company) => this.company = company}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="location">Location</label>
                        <input className="form-control w-50" type="text" id="location" ref={(location) => this.location = location}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="position">Position</label>
                        <input className="form-control w-50" type="text" id="position" ref={(position) => this.position = position}/>
                    </div>

                    <div>
                        <label >Logo</label>
                        <input type="file" name="file" ref={logo => this.logo = logo} />
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

                    <div className="form-group">
                        <label htmlFor="categories">Type</label>
                        <select id="categories" className="form-control" ref={type => this.type = type}>
                                <option value="Full Time">Full Time</option>
                                <option value="Parte Time">Part Time</option>
                                <option value="Freelance">Freelance</option>
                        </select>
                    </div>
                </div>
                <button className="btn btn-primary" onClick={this.editJob}>Edit</button>
            </div>
            )
        }
    }

    render(){
        return(
            <div>
                {this.renderPost()}
            </div>
        )
    }
}

export default EditPost