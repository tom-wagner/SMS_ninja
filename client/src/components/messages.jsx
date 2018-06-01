import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { deleteMessage } from '../actions/index.js';
import moment from 'moment';
import axios from 'axios';

class Messages extends Component {
  render() {
    return (
      <div>
        <Row className="show-grid">
          <Col xs={8} xsOffset={2}>
            <div className="messages-container">
              <h1 className="form-header">Scheduled Messages</h1><br/>
              <h4 className="form-header">For user: {this.props.username}</h4>
              <ul>
                {this.props.scheduledMessages.reverse().map((message, idx) => {
                  if (message.messageText) {
                    let styledNumber = '(' + message.recipient.slice(0, 3) + ') ' + message.recipient.slice(3, 6) + ' - ' + message.recipient.slice(6);
                    let date = moment(message.dateTime).format('MMMM Do YYYY, h:mm a');
                    return (
                      <li key={idx} className="ind-msg"><b>To: {styledNumber}</b>
                        <ul>
                          <li>Message: {message.messageText}</li>
                          <li className="bottom-li"><i>Scheduled time: {date}</i></li>
                        </ul>
                        <button type="button" className="bottom-li btn-danger" /*pull-right*/ onClick={() => this.props.deleteMessage(message._id, idx)}>
                          <span className="glyphicon glyphicon-trash" aria-hidden="true"></span>
                        </button>
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
    username: state.username,
    // phoneNumber: state.phoneNumber,
    // isLoggedIn: state.isLoggedIn,
    // previouslySentMessages: state.previouslySentMessages,
    // view: state.view,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteMessage: (id, idx) => {
      axios
        .delete('/message', { params: { _id: id }})
        .then(result => {
          console.log({ result });
          dispatch(deleteMessage(idx));
        })
        .catch(err => {
          // rudimentary error handling:
          window.alert('Error deleting message from the database, please try again.')
        });
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Messages);