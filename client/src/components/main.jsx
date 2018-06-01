import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import CreateMessageForm from '../forms/create_message.jsx';
import { updateMessages } from '../actions/index.js';
import axios from 'axios';

class Main extends Component {
  componentDidMount() {
    this.props.getMessages(this.props.username);
  }

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

const mapStateToProps = (state) => {
  return {
    username: state.username,
    scheduledMessages: state.scheduledMessages,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMessages: (username) => {
      axios
        .get('/messages', { params: { username }})
        .then(messages => {
          dispatch(updateMessages(messages.data));
        })
        .catch(err => {
          // rudimentary error handling:
          console.log({ err });
          window.alert('Unable to fetch scheduled messages, please try again later.');
        })
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);