import React, { Component } from 'react'
import Axios from 'axios';

export default class Update extends Component {

constructor(props){

    super(props)

    this.state={
        data:{
            Title:"",
            Description:"",
        },BlogList:[],
    }
}
componentWillMount(){
    const id = this.props.match.params.id
       
    Axios.get("http://localhost:53962/api/blgs/"+id)
    .then(res=>{
        console.log(res.data)
        this.setState({data:res.data})
    }).catch(err=>console.error(err))

}



submit(e){
e.preventDefault()
const id = this.props.match.params.id 
Axios.put("http://localhost:53962/api/blgs/"+id,this.state.data)
.then(res=>{
    console.log(res.data)
    this.props.history.push("/")
}).catch(err=>console.log(err))

}

handle(e){
const newdata ={...this.state.data}

newdata[e.target.id]=e.target.value

this.setState({data:newdata})


}



    render() {






        return (
            <div className="container">
                <form onSubmit={(e)=>this.submit(e)}>

<div className="form-group">
  <label htmlFor="Title">Title</label>
  <input onChange={(e)=>this.handle(e)} value={this.state.data.Title} type="text" className="form-control" name="Title" id="Title"  placeholder="Title"/>
</div>

<div className="form-group">
  <label htmlFor="Description">Description</label>
  <input onChange={(e)=>this.handle(e)} value={this.state.data.Description} type="text" className="form-control" name="Description" id="Description"  placeholder="Description"/>
</div>

<button  className="btn btn-primary">Submit</button>






</form>
            </div>
        )
    }
}
