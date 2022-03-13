import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch, Link, Redirect, useParams } from "react-router-dom";

import PropertyReport from './PropertyReport'
let notice='';
class Create extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Name: '',
      EmailAdd: '',
      Phone: '',
      data: [],
      Experiment:[
        {
          questionTitle:'',
          answer:''
        }
      ],
      displayHome:true,
    };
  }

  componentDidMount(){
    this.callAPI(this.state);
  }
  
  handleExperimentChange= (event, idx) => {

    console.log("handleExperimentChange event.target.value", event.target.value)
    console.log("handleExperimentChange event.target:", event.target)

    const newExperiment = this.state.Experiment.map((Experiment,ExperimentIdx)=>{
      if(idx!==ExperimentIdx){
        return Experiment;
      }
      console.log("event.target.name:", event.target.name)
      console.log("event.target.value:", event.target.value)
      return {...Experiment, [event.target.name]:event.target.value }  
    })

    this.setState({Experiment:newExperiment})

  }

  handleInputChange = e => {
    
    this.setState({
      [e.target.name]: e.target.value,
    });


  };

  handleSubmit = async e => {
    e.preventDefault();
    console.log("this.state:", this.state)
    console.log("e.target.value:", e.target.value)
    const { Name, EmailAdd, Phone,Experiment } = this.state;

    const book = {
      Name,
      EmailAdd,
      Phone,
      Experiment,
    };

    console.log("book posting:", book)

    await axios
      .post('http://localhost:3006/create', book)
      .then(() => console.log('Book Created'),
        notice="Submitted Success!",
        console.log("book:",book),
        console.log("this.state.data:", this.state.data),
        
        
      ).then(
        ()=>this.callAPI(),
        this.setState(book)

      )
      .catch(err => {
        console.error('post error:',err);
      });
  };
  async callAPI()
  {
     //API request
     await axios.get("http://localhost:3006/home").then(response => {
        
      //getting and setting api data into variable
      console.log("response.data[0].exp:", response.data[0].exp)
      
      this.setState({ data : response.data });

      
      })
  }

  handleClick= e =>{
    this.setState({
      Experiment:[...this.state.Experiment, {questionTitle:'',answer:''}]
    });
  }
  experimentToAdd(){
    let {Experiment} = this.state;
    return Experiment.map((Experiment, idx) => {
      return(
        <div key={idx}>
          
            <label>
              Question:
              <textarea
                name='questionTitle'
                value={Experiment.questionTitle}
                onChange = {
                  event=> this.handleExperimentChange(event,idx)
                }
              >
              
              </textarea>
            </label>
          <br />
          <label>
            Answer:
            <textarea
              name='answer'
              value={Experiment.answer}
              onChange = {
                event=> this.handleExperimentChange(event,idx)
              }
            >
            
            </textarea>
          </label>
          <hr />
        </div>
      )
    })
  }
  Child = () => {
    
    return <PropertyReport notice={notice} thisState={this.state} />
  }
  render() {
    return (
      <div>
        <Router>
          <ul>
          
            <li>
              <button  className="btn btn-warning">
              <Link  to='/PropertyReport' >
                
              PropertyReport
                
              </Link>
              </button>
            </li>
          </ul>
          <Switch>
            <Route path='/PropertyReport'  children={
             this.Child

              }
            />
          </Switch>

        </Router>
        {console.log("displayHome:", this.state.displayHome)}
       <>
        
        <br />
        <div className="container-fluid p-5 bg-primary text-white text-center">
          <h1>Submit Form to backend handle</h1>
        </div>
        <div className="container mt-5">
          <form onSubmit={this.handleSubmit}>

            <div className="form-group mb-3">
              <input
                type="text"
                className="form-control"
                name="Name"
                placeholder="Name "
                onChange={this.handleInputChange}
              />
            </div>
           
            <div className="form-group mb-3">
              <input
                type="text"
                className="form-control"
                name="EmailAdd"
                placeholder="EmailAdd"
                onChange={this.handleInputChange}
              />
            </div>
           
            <div className="form-group mb-3">
              <input
                type="text"
                className="form-control"
                name="Phone"
                placeholder=" Phone"
                onChange={this.handleInputChange}
              />
            </div>
            <hr/>

            <button className="btn btn-warning" type='button' onClick={e=> this.handleClick(e)} >
              add new Experiment
            </button>
            {
              this.experimentToAdd()
            }
          
           
              <button className="btn btn-success" type="submit">
                Submit
              </button>

              
              
          </form>
          
          <h3 className="mt-3">Submition Details:{notice}</h3>
   

          {/* <PropertyReport notice={notice} thisState={this.state} /> */}
        </div>
        </> 
        
      </div>
    );
  }



}

export default Create;