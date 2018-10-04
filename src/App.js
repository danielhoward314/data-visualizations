import React, { Component } from 'react';
import {Router} from 'react-router-dom'
import Navbar from './Navbar'
import Routes from './Routes'
import history from './History'

class App extends Component {
  render() {
    return (
      <Router history={history} >
        <div>
          <Navbar />
          <Routes />
        </div>
      </Router >
    );
  }
}

export default App;
