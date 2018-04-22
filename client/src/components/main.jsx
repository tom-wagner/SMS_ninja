import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import CreateMessageForm from '../forms/create_message.jsx';

class Main extends Component {
  render() {
    return (
      <div>
        <Row className="show-grid">
          <Col xs={8} xsOffset={2}>
            <CreateMessageForm />
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect(null, null)(Main);