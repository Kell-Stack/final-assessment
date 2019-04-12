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
        <span className="fname">First: {props.firstname} </span>
        <span className="lname">Last: {props.lastname} </span>
      </li>
          <Button
          onClick={() => props.removeStudent(props.id)}
          disabled={isLoading}

          >
          {isLoading ? "⭕️" : "❌"}
          </Button>
          <Button
          onClick={() => props.editStudent(props.id)}
          disabled={isLoading}

          >
          {isLoading ? "📝" : "✏️"}
          </Button>
    </div>
  )
};

class AddListItem extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        first: "",
        last: ""
      }
      this.handleFirstNameChange = this.handleFirstNameChange.bind(this)
      this.handleLastNameChange = this.handleLastNameChange.bind(this)
      this.handleEdit = this.handleEdit.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidUpdate(prevProps){
      if (prevProps.selectStudent !== this.props.selectStudent){
        this.setState({...this.props.selectStudent})
      }
    }

    handleFirstNameChange = (e) => {
      // console.log(this.state.name)
      this.setState({
        firstname: e.target.value
      })
    }

    handleLastNameChange = (e) => {
      this.setState({
        lastname: e.target.value
      })
    }

    handleSubmit = (e) => {
      e.preventDefault();

      if (this.state.id ) {
      this.props.editStudentInfo(
        this.state.id, this.state.firstname, this.state.lastname)

      } else {
        this.props.addStudent(
          this.state.firstname,
          this.state.lastname
        )
      }
      this.setState ({id:null, firstname:"", lastname:""} )
    }

    handleEdit = () => {
      this.props.editStudentInfo(this.state.id, this.state.firstname, this.state.lastname)
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
            Add Apprentice
        <br/>
        </label>

        <label>
          First Name:
          <input value={this.state.firstname} onChange={this.handleFirstNameChange} />
        </label>

        <label>
          Last Name:
          <input value={this.state.lastname} onChange={this.handleLastNameChange} />
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
      selectStudent: null
    }
  };

  addInfo = (first, last) => {
    console.log(first,last)
    const body = {
      first,
      last
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
              errorMessage: 'Be sure you are adding CHARACTERS in the Name field'
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
          first: first,
          last: last
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

  editInfo = (id,first,last) => {
      let updateInf = API + id;
      console.log("✏️update ✏️", updateInf)

      fetch(updateInf, {
          method: 'put',
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify({first, last})
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
                errorMessage: 'Sorry girl, the server is not responding. Unable to EDIT info✏️'
              };
              throw err;
            }
          }
          return resp.json();
        })
        .then((updatedInfo) => {
          let update = this.state.allInfo.filter(updateby => updateby.id !== id)
          console.log(update, "🔐")
          this.setState({
            allInfo: [...update, updatedInfo]
          });
        })
        .catch(() => {
          console.log('📍failed to fetch')
        })
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
        console.log(searchAndDelete, "🔆")
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
            title = "Techtonica Apprentices & Cohorts"
          />
        </div>

        <div className="GetAllInfo">
          <ul>
            {
              this.state.allInfo.map(info => {
                return(
                  <DataListItem
                    key={info.id}
                    idA={info.apprentice_id}
                    idC={info.cohort_id}
                    firstname={info.first}
                    lastname={info.last}
                    removeStudent={this.removeInfo}
                    editStudent={() => this.setState({selectStudent:info})}
                  />
                )
              })
            }
          </ul>

        <div className="form">
          <AddListItem
            addStudent={this.addInfo}
            selectStudent={this.state.selectStudent}
            editStudentInfo= {this.editInfo}
          />
        </div>
      </div>
    </div>
    )
  }
}

export default App;