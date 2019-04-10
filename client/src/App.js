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

class App extends Component {
  constructor() {
    super();
    // this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      example: [],
      allInfo: []
    };
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
                      name={info.name}
                      grade={info.grade}
                    />
                  )
                })
            }
          </ul>
        </div>
      </div>
    )
  }
}

export default App;
