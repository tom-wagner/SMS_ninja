import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap'

import Login from './components/login.jsx';
import Main from './components/main.jsx';
import Messages from './components/messages.jsx';
import SignUp from './components/signup.jsx';

// import AnyComponent from './components/filename.jsx'

class App extends React.Component {
  constructor(props) {
  	super(props)
  	this.state = {
      view: 'login',
      loggedIn: false
    }
    this.renderView = this.renderView.bind(this);
  }

  renderView() {
    const view = this.state.view;

    if (view === 'login') {
      return <Login />;
    } else if (view === 'signUp') {
      return <SignUp />;
    } else if (view === 'main') {
      return <Main />;
    } else if (view === 'messages') {
      return <Messages />;
    }
  }

  render () {
    return (
      <div>
        <div className="nav">
          <Navbar inverse fluid fixedTop>
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
                    <NavItem eventKey={1}>
                      Home
                    </NavItem>
                    <NavItem eventKey={2}>
                      Scheduled Messages
                    </NavItem>
                    <NavItem eventKey={3}>
                      Log Out
                    </NavItem>
                  </Nav>
                : <Nav pullRight>
                    <NavItem eventKey={4}>
                      Sign Up
                    </NavItem>
                    <NavItem eventKey={5}>
                      Log In
                    </NavItem>
                  </Nav>
              }
            </Navbar.Collapse>
          </Navbar>
        </div>
        <div>
          {this.renderView()}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));