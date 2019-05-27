import React, { Component } from 'react'
import Axios from 'axios';

const url="http://localhost:53962/api/blgs/"

export default class Blog extends Component {

     

    constructor(props){
        super(props)

        this.state ={
            data:{
                Title:"",
                Description:"",
            },BlogList:[],isError:false,
        }
    }


    componentWillMount(){
       
            Axios.get(url)
            .then(res=>{
                console.log(res.data)
                this.setState({BlogList:res.data})
            }).catch(err=>{console.error(err)
                this.setState({isError:true})
               
               })
      
    }
 


    submit(e){
        e.preventDefault()

        Axios.post(url,this.state.data)
        .then(res=>{
            console.log(res.data)
            this.setState(res.data)
        }).catch(err=>{console.error(err)
            this.setState({isError:true})
           
           })

    }

handle(e){
    const newdata ={...this.state.data}

    newdata[e.target.id]=e.target.value

    this.setState({data:newdata})


}

remove(id){
    console.log(id)
    Axios.delete(url+id)
    .then(res=>{
        console.log(res.data)
        const mydata = this.state.BlogList.filter(item=>item.id !==id)
        this.setState({BlogList:mydata})
    })
}

update(id){
    console.log(id)
    this.props.history.push("/Update/"+id)
}

    render() {

     const display = this.state.BlogList.map(item=>
        <tr key={item.id}>
          
            <td>{item.Title}</td>
            <td>{item.Description}</td>
            <td><button onClick={()=>this.update(item.id)} className="btn btn-success">Update</button></td>
            <td><button onClick={()=>this.remove(item.id)}  className="btn btn-danger">Delete</button></td>
        </tr>
        
        )



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
              { this.state.isError && <div className="alert alert-danger">Error occured please try later</div>}

               <table className="table table-stripped"> 
                   <tbody>
                       {display}
                   </tbody>
               </table>
            </div>
        )
    }
}
