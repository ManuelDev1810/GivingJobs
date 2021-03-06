import React, {Component} from 'react'
import {Link} from 'react-router-dom'


class Job extends Component {

    constructor(props){
        super(props);
        this.state = {
            job: null
        }
    }

    //Start to work here
    componentDidMount(){
        if(this.props.location.state !== undefined){
            fetch('https://localhost:44365/api/home/job/' + this.props.location.state.id)
            .then(response => response.json())
            .then(data => this.setState({job:data}))
        }
        console.log('JOB' + this.state.job)
    }

    // static changedPath(img){
    //     console.log(img.replace(img, "/"))
    // }

    static date(date){
        var dateCreated = new Date(date);
        return(dateCreated.toDateString())
    }


    static renderJob(state){

        const sizePost = {
            width: 400,
            height: 400
        }

        const styleImg = {
            width: '100%',
            height: '100%'
        }

        if(state !== null)
        return(
        <div>
            <div className="mt-3">
                <Link className="w-25"  to="/"> <i class="fas fa-home"></i> Home</Link>
            </div>
            <hr />
            {/* {this.changedPath(state.job.pathLogo)} */}

           <center> <div className="texto">

                               <center> <div style={sizePost} className="card">
                                    <div className="tico"><img style={styleImg} className="card-img-top tico" src={require('E:/LocalGit/GivingJobs/ReactJs/giving-jobs/src/imgs/' + state.job.pathLogo)} /></div>
                                    <div className="card-body">
                                        <h5 className="card-title">{`Job: ${state.job.name}`}</h5>
                                        <p class="card-text">{state.job.description}</p>
                                        <ul class="list-group list-group-flush color1 ">
                                            <li class="list-group-item color1">{`Company: ${state.job.company}`}</li>
                                            <li class="list-group-item color1">{`Location: ${state.job.location}`}</li>
                                            <li class="list-group-item color1">{`Category: ${state.job.category.name}`}</li>
                                            <li class="list-group-item color1">{`Type: ${state.job.type}`}</li>
                                            <li class="list-group-item color1">{`Date: ${this.date(state.job.date)}`}</li>
                                            <li className="list-group-item color1">Send CV to <b>{state.job.userEmail}</b></li>
                                        </ul>
                                    </div>
                                </div></center>

            </div> </center>

        </div>
        )
    }

    static renderNotFound(){
        return(
            <div>
                <Link className="w-25" to="/"><i class="fas fa-home"></i></Link>
                <hr />
                <p>Loading</p>
            </div>
        )
    }

    render(){

        let content = this.state.job ? Job.renderJob(this.state) : Job.renderNotFound()
        return(
            <div>
                {content}
                {console.log(this.state.job)}
            </div>
        )
    }
}

export default Job