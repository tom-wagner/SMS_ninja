import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { deleteMessage, updateMessages } from '../actions/index.js';
import moment from 'moment';
import axios from 'axios';
import { toastr } from 'react-redux-toastr';

class Messages extends Component {
  render() {
    return (
      <div>
        <Row className="show-grid">
          <Col xs={8} xsOffset={2}>
            <div className="messages-container">
              <h1 className="form-header">Scheduled Messages</h1><br/>
              <div className = "msg-list">
                {this.props.scheduledMessages.map((message, idx) => {
                  if (message.messageText) {
                    let styledNumber = '(' + message.recipient.slice(0, 3) + ') ' + message.recipient.slice(3, 6) + ' - ' + message.recipient.slice(6);
                    let date = moment(message.dateTime).format('MMMM Do YYYY, h:mm a');
                    return (
                      <div className="ind-msg" key={ message._id }>
                        <span className="message-line-item"><b>To: {styledNumber}</b></span>
                        <button className="float-right btn-lg btn-danger" onClick={() => this.props.deleteMessage(message._id, idx)}>
                          <span className="glyphicon glyphicon-trash" aria-hidden="true"></span>
                        </button>
                        <br/>
                        <span className="message-line-item">Message: { message.messageText }</span>
                        <br/>
                        <span><i>Scheduled time: {date}</i></span> 
                        <div className="clear"></div>
                      </div>
                    );
                  }
                })}
              </div>
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
  };
};

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
          console.log({ err });
          toastr.error('Error: ', 'Error deleting message from the database, please try again.')
        });
    },
    getMessages: (username) => {
      axios
        .get('/messages', { params: { username }})
        .then(messages => {
          dispatch(updateMessages(messages.data));
        })
        .catch(err => {
          console.log({ err });
          toastr.error('Error: ', 'Unable to fetch scheduled messages, please try again later.');
        })
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Messages);