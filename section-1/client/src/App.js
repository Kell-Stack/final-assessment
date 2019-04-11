import React, { Component } from 'react';
import {Jumbotron} from 'react-bootstrap';
import './App.css';

const API = '/getall/'

const Header = (props) => {
  return (
    <Jumbotron>
      <h1>{props.title}</h1>
      <div className="container">
      </div>
    </Jumbotron>
  )
}

const DataListItem = (props) => {
  return(
    <li>
      <span className="name">Name: {props.name}</span>
      <span className="grade">Grade: {props.grade}</span>
    </li>
  )
};

class AddListItem extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        name: "",
        grade: ""
    }
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleGradeChange = this.handleGradeChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleNameChange = (e) => {
    // console.log(this.state.name)
    this.setState ({name: e.target.value})
  }

  handleGradeChange = (e) => {
    this.setState ({grade: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.addStudent(
      this.state.name,
      this.state.grade
    )
  }

  render(){
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input value={this.state.name} onChange={this.handleNameChange} />
        </label>
        <label>
          Grade:
          <input value={this.state.grade} onChange={this.handleGradeChange} />
        </label>
        <input type="submit" value="Submit" />
    </form>
    )

  }
};

class App extends Component {
  constructor() {
    super();
    // this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      example: [],
      allInfo: [],
      }
    };

  addInfo = (name, grade) => {
    console.log(name)
    const body = {
      name,
      grade
    }
    let id = null

   fetch('/getall/', {
      method: 'post',
      headers: ({'Content-Type':'application/json'}),
      body: JSON.stringify(body)
    })
    .then(resp => {
      if (!resp.ok) {
        if (resp.status >= 400 && resp.status < 500) {
          return resp.json().then(data => {
            let err = { errorMessage: data.message };
            throw err;
          })
        } else {
          let err = { errorMessage: 'Sorry girl, the server is not responding. Unable to Add Info' };
          throw err;
        }
      }
      // console.log('resp.json', resp.json());
      return resp.json();
    })
    .then (
      data => {
        console.log(data,"heyyyyyyyyy kelly");
      })

    this.setState ({
        allInfo: [
          ...this.state.allInfo,
          {
            id: id,
            name: name,
            grade: grade
          }
        ]
    })
    }


  loadAll() {
    fetch(API, {
      headers: {"content-type": "application/json"}
    })
      .then(resp => {
        if (!resp.ok) {
          if (resp.status >= 400 && resp.status < 500) {
            return resp.json().then(data => {
              let err = {
                errorMessage: data.message
              };
              throw err;
            });
          } else {
            let err = {
              errorrMessage: "Error FETCHING and parsing data from YOUR API juheard"
            };
            throw err;
          }
        }
        return resp.json();
      })

      .then(allInfo => {
        this.setState({allInfo: allInfo})
      });
  }

  componentDidMount() {
    this.loadAll();
  }

  render() {
    return (
      <div>
        <div className ="App">
          <Header
            title = "Final Assessment"
          />
        </div>

        <div className="GetAllInfo">
          <ul>
            {
              this.state.allInfo.map(info => {
                return(
                  <DataListItem
                    key={info.id}
                    name={info.name}
                    grade={info.grade}
                  />
                )
              })
            }
          </ul>

        <div className="form">
          <AddListItem
            addStudent={this.addInfo}
          />
        </div>
      </div>
    </div>
    )
  }
}

export default App;
