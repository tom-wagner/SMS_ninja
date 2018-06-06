import React, { Component } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { handleScheduleMessageSubmit, changeView, updateMessages } from '../actions/index.js';
import { connect } from 'react-redux';
import axios from 'axios';
import { toastr } from 'react-redux-toastr';

class CreateMessageForm extends Component {
  render() {
    const {
      error,
      handleSubmit,
      pristine,
      reset,
      submitting,
      handleScheduleMessageSubmit,
      form,
      shouldSendNow
    } = this.props;

    console.log('this.props within createMessageForm: ', this.props);

    return (
      <div className="form-container">
        <h1 className="form-header">Schedule or Send a Message</h1>
        {/* passing this.props as the 2nd argument to the submitHandler below in order to access state */}
        <form
          onSubmit={ handleSubmit(values => { handleScheduleMessageSubmit(values, this.props) })}
          className="form" >
          <Field
            formName={form}
            name="recipient"
            type="tel"
            component={renderField}
            label="Phone Number"
            className="one-line-input"
          />
          <Field
            name="messageText"
            type="textarea"
            component={renderField}
            label="Message Text"
            className="one-line-input text-box"
          />
          <div>
            <br/>
            <label>Delivery time:</label>
            <div>
              <label>
                <Field name="sendTime" component="input" type="radio" value="sendNow" />
                {' '}
                Send Now
              </label>
              {' '}{' '}{' '}{' '}{' '}{' '}
              <label>
                <Field name="sendTime" component="input" type="radio" value="sendLater" />
                {' '}
                Send Later
              </label>
            </div>
          </div>
          <br/>
          {shouldSendNow === 'sendLater' && <div>
            <Field 
              name="dateTime"
              type="datetime-local"
              component={renderField}
              label="Time and Date to Send"
              className="one-line-input"
            />
          </div>}
          {error && <strong>{error}</strong>}
          <br/>
          <div>
            <button type="submit" disabled={submitting} className="btn-default" >
              Send/Schedule Message
            </button>
            <button type="button" disabled={submitting} onClick={reset} className="btn-default secondary-btn">
              Clear Values
            </button>
          </div>
        </form>
      </div>
    )
  }
}

const renderField = ({ className, input, label, type, meta: { touched, error } }) => {
  let inputToRender = null;

  if (type === 'textarea') {
    inputToRender = <textarea {...input} placeholder={label} type={type} className={className} />;
  } else {
    inputToRender = <input {...input} placeholder={label} type={type} className={className} />;
  }
  
  return (
    <div>
      <label>{label}</label>
      <div>
        {inputToRender}
        {touched && error && <span>{error}</span>}
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch, state) => {
  return {
    handleScheduleMessageSubmit: (values, props) => {
      const { dateTime, messageText, recipient, sendTime } = values;
      const { username, reset, form } = props;

      console.log('data after schedule message submit: ', { username, messageText, dateTime, sendTime });

      axios({ method: 'post', url: '/SMS', data: { username, messageText, recipient, dateTime, sendTime }})
        .then(resp => {
          dispatch(reset(form));
          toastr.success(resp.data);

          console.log('response after schedule message submit: ', resp);
          
          axios
            .get('/messages', { params: { username } })
            .then(messages => {
              console.log('messages after getting /messages within create_message: ', messages);
              dispatch(updateMessages(messages.data))
            });
        })
        .catch(err => {
          console.log({ err });
          toastr.error('Error!', err.response.data);
        });
    },
    getMessages: (username) => {
      axios
        .get('/messages', { params: { username }})
        .then(messages => {
          console.log('messages after getting /messages within create_message: ', messages);
          dispatch(updateMessages(messages.data));
        })
        .catch(err => {
          console.log({ err });
          toastr.error('Error: ', 'Unable to fetch scheduled messages, please try again later.');
        })
    },
  };
};

CreateMessageForm = reduxForm({
  form: 'CreateMessageForm',
})(CreateMessageForm);

const selector = formValueSelector('CreateMessageForm');

CreateMessageForm = connect(
  state => {
    const shouldSendNow = selector(state, 'sendTime');
    return {
      username: state.username,
      phoneNumber: state.phoneNumber,
      isLoggedIn: state.isLoggedIn,
      scheduledMessages: state.scheduledMessages,
      previouslySentMessages: state.previouslySentMessages,
      view: state.view,
      shouldSendNow,
    };
  }
, mapDispatchToProps)(CreateMessageForm);

export default CreateMessageForm;