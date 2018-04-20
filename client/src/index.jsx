import React from 'react';
import { render } from 'react-dom';

// REDUX:
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import {} from 'react-router-redux';

import axios from 'axios';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap'


// REDUX:
// import reducers from './reducers/all_reducers.js';
// const reducer = combineReducers({
//   ...reducers,
//   routing: routeReducer
// });

import Login from './components/login.jsx';
import Main from './components/main.jsx';
import Messages from './components/messages.jsx';
import SignUp from './components/signup.jsx';

// import AnyComponent from './components/filename.jsx'

class App extends React.Component {
  constructor(props) {
  	super(props)
  	this.state = {
      view: 'main',
      loggedIn: false
    }
    this.renderView = this.renderView.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  renderView() {
    const view = this.state.view;

    if (view === 'login') {
      return <Login />;
    } else if (view === 'signUp') {
      return <SignUp />;
    } else if (view === 'main') {
      return <Main sendMessage={this.sendMessage} />;
    } else if (view === 'messages') {
      return <Messages />;
    }
  }

  sendMessage(msgData) {
    console.log('firing!!');
    var options = {
      method: 'POST',
      url: '/SMS',
      params: msgData
    }
    axios(options).then(result => {
      console.log(result);

      // alert user of success
      window.alert('message sent successfully!');
    }).catch(err => {
      console.log(err);
    });
  }

  render () {
    return (
      <div>
        <div className="nav">
          <Navbar fluid fixedTop>
            <Navbar.Header>
              <Navbar.Brand>
                SMS Ninja
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              { // TOGGLE NAVBAR BASED ON WHETHER USER IS LOGGED IN
                (this.state.loggedIn)
                ? <Nav pullRight>
                    <NavItem eventKey={1} onClick={() => { this.setState({view: 'main'})}}>
                      Home
                    </NavItem>
                    <NavItem eventKey={2} onClick={() => { this.setState({view: 'messages'})}}>>
                      Scheduled Messages
                    </NavItem>
                    <NavItem eventKey={3} onClick={() => { this.setState({view: 'login'})}}>
                      Log Out
                    </NavItem>
                  </Nav>
                : <Nav pullRight>
                    <NavItem eventKey={4} onClick={() => { this.setState({view: 'signUp'})}}>
                      Sign Up
                    </NavItem>
                    <NavItem eventKey={5} onClick={() => { this.setState({view: 'login'})}}>
                      Log In
                    </NavItem>
                  </Nav>
              }
            </Navbar.Collapse>
          </Navbar>
        </div>
        <div className="main">
          {this.renderView()}
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById('app'));