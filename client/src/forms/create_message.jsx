import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { handleScheduleMessageSubmit, changeView } from '../actions/index.js';
import { connect } from 'react-redux';

class CreateMessageForm extends Component {
  render() {
    const { error, handleSubmit, pristine, reset, submitting, handleScheduleMessageSubmit } = this.props;
    return (
      <div>
        Schedule a message!
        <br/>
        <br/>
        {/* passing this.props as the 2nd argument to the submitHandler below in order to access state */}
        <form
          onSubmit={ handleSubmit(values => { handleScheduleMessageSubmit(values, this.props) })}
          className="form" >
          <Field 
            name="username"
            type="text"
            component={renderField}
            label="Username"
            className="one-line-input"
          /><br/>
          <Field 
            name="phoneNumber"
            type="tel"
            component={renderField}
            label="Phone Number"
            className="one-line-input"
          /><br/>
          <Field
            name="msg"
            type="textarea"
            component={renderField}
            label="Message Text"
            className="one-line-input text-box"
          /><br/>
          <Field 
            name="dateTime"
            type="datetime-local"
            component={renderField}
            label="When should we send the message?"
            className="one-line-input"
          /><br/>
          
          {error && <strong>{error}</strong>}
          <div>
            <br/>
            <button type="submit" disabled={submitting}>
              Log In
            </button>
            <br/><br/>
            <button type="button" disabled={pristine || submitting} onClick={reset}>
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
      console.log('in submit - values: ', values);
      console.log('in submit - props: ', props);

      // send Axios request to Server
      // THEN update scheduled messages array
      // THEN alert user whether it was successful
    }
  };
};

// USE LATER IF NEEDED
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

// NEED TO CONVERT TO AN ACTION:
// sendMessage(msgData) {
//   console.log('firing!!');
//   var options = {
//     method: 'POST',
//     url: '/SMS',
//     params: msgData
//   }
//   axios(options).then(result => {
//     console.log(result);

//     // alert user of success
//     window.alert('message sent successfully!');
//   }).catch(err => {
//     console.log(err);
//   });
// }