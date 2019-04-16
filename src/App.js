import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      users: [],
      selectedUser: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.startSearch = this.startSearch.bind(this);
    this.selectUser = this.selectUser.bind(this);
  }

  handleChange(event) {
    const { value } = event.target;
    this.setState({
      search: value
    });
  }

  startSearch() {
    fetch(`https://searchapi.jsx.fr/?search=${this.state.search}`)
      .then(res => res.json())
      .then(users => {
        console.log(users);
        this.setState({
          users: users
        });
      });
  }

  selectUser(index) {
    this.setState({
      selectedUser: this.state.users[index]
    })
  }

  render() {
    const selected = this.state.selectedUser;
    return (
      <div className="App">
        <input name="search" type="text" onChange={this.handleChange} />
        <button onClick={this.startSearch}>
          Search
        </button>
        <ul>
          {
            this.state.users.map((user, index) => (
              <li 
                key={user.login.uuid}
                onClick={() => this.selectUser(index)}
              >
                {user.name.first} {user.name.last}
              </li>
            ))
          }
        </ul>
        {
          selected && (
            <img src={selected.picture.large} />
          )
        }
      </div>
    );
  }
}

export default App;
