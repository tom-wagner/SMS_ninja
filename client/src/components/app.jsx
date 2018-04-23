import React, { Component } from 'react';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap'
import { connect } from 'react-redux';
import { changeView, toggleLogIn, handleLogOut } from '../actions/index.js'

// import AnyComponent from './components/filename.jsx'
// All required components below:
import Login from './login.jsx';
import Main from './main.jsx';
import Messages from './messages.jsx';
import SignUp from './signup.jsx';

class App extends Component {
          
  render() {
    let divToRender = null;
    let view = this.props.view;

    const { changeView, handleLogOut, isLoggedIn } = this.props;

    if (view === 'login') {
      divToRender = <Login />;
    } else if (view === 'signUp') {
      divToRender = <SignUp />;
    } else if (view === 'main') {
      divToRender = <Main />;
    } else if (view === 'messages') {
      divToRender = <Messages />;
    }

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
                (isLoggedIn)
                ? <Nav pullRight>
                    <NavItem eventKey={'main'} onClick={() => { changeView('main') }}>
                      Schedule a SMS/Text Message
                    </NavItem>
                    <NavItem eventKey={'messages'} onClick={() => { changeView('messages') }}>
                      Scheduled Messages
                    </NavItem>
                    <NavItem eventKey={'login'} onClick={() => { handleLogOut() }}>
                      Log Out
                    </NavItem>
                  </Nav>
                : <Nav pullRight>
                    <NavItem eventKey={'signUp'} onClick={() => { changeView('signUp') }}>
                      Sign Up
                    </NavItem>
                    <NavItem eventKey={'login'} onClick={() => { changeView('login') }}>
                      Log In
                    </NavItem>
                  </Nav>
              }
            </Navbar.Collapse>
          </Navbar>
        </div>
        <div className="main">
          {divToRender}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.username,
    phoneNumber: state.phoneNumber,
    isLoggedIn: state.isLoggedIn,
    scheduledMessages: state.scheduledMessages,
    previouslySentMessages: state.previouslySentMessages,
    view: state.view,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeView: (view) => dispatch(changeView(view)),
    handleLogOut: () => {
      dispatch(handleLogOut());
      dispatch(changeView('login'));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);