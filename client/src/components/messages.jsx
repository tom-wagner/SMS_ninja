import React, { Component } from 'react';
import {/* REQUIRED COMPONENTS HERE*/} from 'react-bootstrap';
import { connect } from 'react-redux';
import { /*TBD*/ } from '../actions/index.js';

class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    return (
      <div>
        This is all the users scheduled messages!
      </div>
    );
  }
}

export default connect(null, null)(Messages);