import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PeopleTable from "./views/peopleTable";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Game of Thrones - Families</h1>
        </header>
          <div>
          <PeopleTable/>
          </div>
      </div>
    );
  }
}

export default App;
