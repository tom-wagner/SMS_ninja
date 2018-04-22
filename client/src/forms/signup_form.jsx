import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { handleSignUp, changeView } from '../actions/index.js';
import { connect } from 'react-redux';

class SignUpForm extends Component {
  render() {
    const { error, handleSubmit, pristine, reset, submitting, handleSignUp } = this.props;
    return (
      <div className="form-container">
        <h1 className="form-header">Sign Up</h1>
        <form onSubmit={handleSubmit(handleSignUp)} className="form" >
          <Field 
            name="username"
            type="text"
            component={renderField}
            label="Username"
            className="one-line-input"
          />
          <Field 
            name="password"
            type="password"
            component={renderField}
            label="Password"
            className="one-line-input"
          />
          <Field 
            name="email"
            type="email"
            component={renderField}
            label="Email"
            className="one-line-input"
          />
          <Field 
            name="phoneNumber"
            type="tel"
            component={renderField}
            label="Phone Number"
            className="one-line-input"
          />
          {error && <strong>{error}</strong>}
          <div>
            <button type="submit" disabled={submitting} className="btn-default">
              Sign Up
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

const renderField = ({ className, input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} className={className} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);

const mapDispatchToProps = (dispatch) => {
  return {
    handleSignUp: (values) => {
      dispatch(handleSignUp(values));
      
      // LATER: Check availability of username in database
      // LATER: Add to users table in the database
      // LATER: Live validate inputs

      // For now, just change the view:
      dispatch(changeView('login'));
    }
  };
};

// USE LATER IF NEEDED ---> flip null back to mapStateToProps within connect() below
// const mapStateToProps = (state) => {
//   return {

//   }
// }

SignUpForm = connect(null, mapDispatchToProps)(SignUpForm);

export default reduxForm({
  form: 'SignUpForm',
  /*validationFunction*/
  /*warningFunction*/
})(SignUpForm);