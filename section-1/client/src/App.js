import React, { Component } from 'react';
import {Jumbotron, Button} from 'react-bootstrap';
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

function simulateNetworkRequest() {
  return new Promise(resolve => setTimeout(resolve, 200));
}

const DataListItem = (props) => {
  const { isLoading }= false
  return(
    <div className="ud-buttons">
      <li>
        <span className="name">Name: {props.name}</span>
        <span className="grade">Grade: {props.grade}</span>
      </li>
          <Button
          onClick={() => props.removeStudent(props.id)}
          disabled={isLoading}

          >
          {isLoading ? "✖" : "✖✖✖✖✖✖"}
          </Button>
    </div>
  )
};

class AddListItem extends React.Component {
    constructor(props) {
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
      this.setState({
        name: e.target.value
      })
    }

    handleGradeChange = (e) => {
      this.setState({
        grade: e.target.value
      })
    }

    handleSubmit = (e) => {
      e.preventDefault();

      this.props.addStudent(
        this.state.name,
        this.state.grade
      )
    }



    handleClick() {
      this.setState({ isLoading: true }, () => {
        simulateNetworkRequest().then(() => {
          this.setState({ isLoading: false });
        });
      });
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
    console.log(body, '⛔️')
    const id = null

    fetch('/getall/', {
        method: 'post',
        headers: ({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify(body)
      })
      .then(resp => {
        if (!resp.ok) {
          if (resp.status >= 400 && resp.status < 500) {
            return resp.json().then(data => {
              let err = {
                errorMessage: data.message
              };
              throw err;
            })
          } else {
            let err = {
              errorMessage: 'Sorry girl, the server is not responding. Unable to Add Info'
            };
            throw err;
          }
        }
        // console.log('resp.json', resp.json());
        return resp.json();
      })
      .then(
        data => {
          console.log(data, "heyyyyyyyyy kelly");
        })

    this.setState({
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
        headers: {
          "content-type": "application/json"
        }
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
        this.setState({
          allInfo: allInfo
        })
      });
  }

  componentDidMount() {
    this.loadAll();
  }

  removeInfo = (id) => {
    let delInf = API + id;
    console.log( "ctrl alt del ctrl alt del ESCAPE ESCAPE 🍕", delInf)

    fetch(delInf, {
        method: 'delete',
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
            })
          } else {
            let err = {
              errorMessage: 'Sorry girl, the server is not responding. Unable to REMOVE info'
            };
            throw err;
          }
        }
        return resp.json();
      })
      .catch(() => {
        console.log('failed to fetch💯')
      })
      .then(() => {

        let searchAndDelete = this.state.allInfo.filter(infoo => infoo.id !== id)
        console.log(searchAndDelete, "🇨🇩")
        this.setState(
          {
            allInfo: searchAndDelete
        });
      });
  };


  // componentWillMount() {
  //   this.removeInfo();
  // }

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
                    id={info.id}
                    name={info.name}
                    grade={info.grade}
                    removeStudent={this.removeInfo}
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
