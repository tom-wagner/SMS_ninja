import React, { Component } from 'react'
import {/* REQUIRED COMPONENTS HERE*/} from 'react-bootstrap'
import { connect } from 'react-redux';
import CreateMessageForm from '../forms/create_message.jsx';

class Main extends Component {
  render() {
    return (
      <CreateMessageForm />
    );
  }
}

export default connect(null, null)(Main);