import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { handleScheduleMessageSubmit, changeView } from '../actions/index.js';
import { connect } from 'react-redux';
import axios from 'axios';

class CreateMessageForm extends Component {
  render() {
    console.log('this.props in CreateMessageForm', this.props);
    const { error, handleSubmit, pristine, reset, submitting, handleScheduleMessageSubmit } = this.props;
    return (
      <div className="form-container">
        <h1 className="form-header">Schedule a Message</h1>
        {/* passing this.props as the 2nd argument to the submitHandler below in order to access state */}
        <form
          onSubmit={ handleSubmit(values => { handleScheduleMessageSubmit(values, this.props) })}
          className="form" >
          <Field 
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
          <Field 
            name="dateTime"
            type="datetime-local"
            component={renderField}
            label="Time/date to send - BETA... aka NOT WORKING -- msg sends now"
            className="one-line-input"
          />
          {error && <strong>{error}</strong>}
          <div>
            {/* need to clear values on submit*/}
            <button type="submit" disabled={submitting} className="btn-default" >
              Schedule Message
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
      console.log('props in handle: ', props);
      const { dateTime, messageText, recipient } = values;
      const { username } = props;

      axios({
        method: 'post',
        url: '/SMS',
        data: { username, messageText, recipient, dateTime }
      }).then(result => {
        console.log('result: ', result);
        // Update scheduled messages array
        dispatch(handleScheduleMessageSubmit({ username, recipient, messageText, dateTime }));
        // resetForm();
        window.alert('message sent successfully!');
      }).catch(err => {
        console.log('err: ', err);
      });

      // toDoLater! -- reset form to be blank upon success
      // toDoLater! -- improve error handling
    }
  };
};

const mapStateToProps = (state) => {
  return {
    username: state.username,
    phoneNumber: state.phoneNumber,
    isLoggedIn: state.isLoggedIn,
    scheduledMessages: state.scheduledMessages,
    previouslySentMessages: state.previouslySentMessages,
    view: state.view,
  }
}

CreateMessageForm = connect(mapStateToProps, mapDispatchToProps)(CreateMessageForm);

export default reduxForm({
  form: 'CreateMessageForm',
  /*validationFunction*/
  /*warningFunction*/
})(CreateMessageForm);