import React, { Component } from 'react';
import {/* REQUIRED COMPONENTS HERE*/} from 'react-bootstrap';
import { connect } from 'react-redux';
import { /*TBD*/ } from '../actions/index.js';

class Messages extends Component {
  render() {
    console.log(this.props.scheduledMessages);
    // const scheduledMessages = this.props.scheduledMessages.map(message => {
    //   console.log(message);
    //   if (message.messageText !== undefined) {
        {/* <li key={message._id}>
          <ul>
            <li>Recipient: {message.recipient}</li> 
            <li>Message: {message.messageText}</li>
            <li>Scheduled time: {message.dateTime}</li> 
          </ul>
        </li> */}
    //   }
    // });

    return (
      <div>
        <ul>
          {this.props.scheduledMessages.map(message => {
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
    );
  }
}

const mapStateToProps = (state) => {
  return {
    scheduledMessages: state.scheduledMessages,
    username: state.username,
    phoneNumber: state.phoneNumber,
    isLoggedIn: state.isLoggedIn,
    previouslySentMessages: state.previouslySentMessages,
    view: state.view,
  }
}

const mapDispatchToProps = (dispatch) => {
  // USE LATER TO MODIFY/DELETE ON CLICK
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Messages);