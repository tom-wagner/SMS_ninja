import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { /*TBD*/ } from '../actions/index.js';
import moment from 'moment';

class Messages extends Component {
  render() {
    return (
      <div>
        <Row className="show-grid">
          <Col xs={8} xsOffset={2}>
            <div className="messages-container">
              <h1 className="form-header">Scheduled Messages</h1>
              <ul>
                {this.props.scheduledMessages.reverse().map((message, id) => {
                  if (message.messageText) {
                    let styledNumber = '(' + message.recipient.slice(0, 3) + ') ' + message.recipient.slice(3, 6) + ' - ' + message.recipient.slice(6);
                    let date = moment(message.dateTime).format('MMMM Do YYYY, h:mm a');
                    return (
                      <li key={id} className="ind-msg"><b>To: {styledNumber}</b>
                        <ul>
                          <li>Message: {message.messageText}</li>
                          <li><i>Scheduled time: {date}</i></li>
                        </ul>
                      </li>
                    );
                  }
                })}
              </ul>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    scheduledMessages: state.scheduledMessages,
    // username: state.username,
    // phoneNumber: state.phoneNumber,
    // isLoggedIn: state.isLoggedIn,
    // previouslySentMessages: state.previouslySentMessages,
    // view: state.view,
  }
}

const mapDispatchToProps = (dispatch) => {
  // USE LATER TO MODIFY/DELETE ON CLICK
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Messages);