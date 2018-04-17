import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Login from './components/login.jsx';
import Main from './components/main.jsx';
import Messages from './components/messages.jsx';
import SignUp from './components/signup.jsx';

// import AnyComponent from './components/filename.jsx'

class App extends React.Component {
  constructor(props) {
  	super(props)
  	this.state = {
      view: 'login'
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
        {this.renderView()}
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));