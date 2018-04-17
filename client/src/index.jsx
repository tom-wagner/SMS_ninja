import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {/* REQUIRED COMPONENTS HERE*/} from 'react-bootstrap'

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
      loggedIn: true
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
          {
            (this.state.loggedIn)
              ? <div>
                  <p>Home</p>
                  <p>Scheduled Messages</p>
                  <p>Log Out</p>
                </div>
              : <div>
                  <p>Log In</p>
                  <p>Sign Up</p>
                </div>
          }
        </div>
        <div>
          {this.renderView()}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));