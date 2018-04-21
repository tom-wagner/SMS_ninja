import React, { Component } from 'react';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap'
import { connect } from 'react-redux';
import { fetchMessages } from '../actions/index.js'

// import AnyComponent from './components/filename.jsx'
import Login from './login.jsx';
import Main from './main.jsx';
import Messages from './messages.jsx';
import SignUp from './signup.jsx';

class App extends Component {
  // constructor(props) {
  // 	super(props)
  // 	this.state = {
  //     view: 'main',
  //     loggedIn: false
  //   }
  //   this.renderView = this.renderView.bind(this);
  //   this.sendMessage = this.sendMessage.bind(this);
  // }

  
  // NEED TO CONVERT TO AN ACTION:
  // sendMessage(msgData) {
    //   console.log('firing!!');
    //   var options = {
      //     method: 'POST',
      //     url: '/SMS',
      //     params: msgData
      //   }
      //   axios(options).then(result => {
        //     console.log(result);
        
        //     // alert user of success
        //     window.alert('message sent successfully!');
        //   }).catch(err => {
          //     console.log(err);
          //   });
          // }
          
  render() {
    let divToRender = null;
    let view = this.props.view;

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
                (this.props.isLoggedIn)
                ? <Nav pullRight>
                    {/* NEED TO REFACTOR CLICK HANDLING */}
                    <NavItem eventKey={1} onClick={() => { this.setState({view: 'main'})}}>
                      Home
                    </NavItem>
                    {/* NEED TO REFACTOR CLICK HANDLING */}
                    <NavItem eventKey={2} onClick={() => { this.setState({view: 'messages'})}}>>
                      Scheduled Messages
                    </NavItem>
                    {/* NEED TO REFACTOR CLICK HANDLING */}
                    <NavItem eventKey={3} onClick={() => { this.setState({view: 'login'})}}>
                      Log Out
                    </NavItem>
                  </Nav>
                : <Nav pullRight>
                    {/* NEED TO REFACTOR CLICK HANDLING */}
                    <NavItem eventKey={4} onClick={() => { this.setState({view: 'signUp'})}}>
                      Sign Up
                    </NavItem>
                    {/* NEED TO REFACTOR CLICK HANDLING */}
                    <NavItem eventKey={5} onClick={() => { this.setState({view: 'login'})}}>
                      Log In
                    </NavItem>
                  </Nav>
              }
            </Navbar.Collapse>
          </Navbar>
        </div>
        <div className="main">
          {/* This is a div within app.jsx!! */}
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
    fetchMessages: (username) => dispatch(messagesFetchData(username))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);