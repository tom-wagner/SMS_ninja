import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { /*TBD*/ } from '../actions/index.js';

class Messages extends Component {
  render() {
    return (
      <div>
        <Row className="show-grid">
          <Col xs={8} xsOffset={2}>
            <div className="messages-container">
              <h1 className="form-header">Scheduled Messages</h1>
              <ul>
                {this.props.scheduledMessages.reverse().map(message => {
                  if (message.messageText) {
                    let styledNumber = '(' + message.recipient.slice(0, 3) + ') ' + message.recipient.slice(3, 6) + ' - ' + message.recipient.slice(6);
                    
                    return (
                      <li key={message._id}><b>To: {styledNumber}</b>
                        <ul>
                          <li>Message: {message.messageText}</li>
                          <li>Scheduled time: {message.dateTime}</li>
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