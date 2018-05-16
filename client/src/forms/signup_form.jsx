import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';


const required = value => {
  return value ? undefined : 'Required';
};

const email = value => {
  return value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email address' : undefined;
};

const renderField = ({ className, input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} className={className} />
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
);

const SignUpForm = (props) => {
  const { error, handleSubmit, pristine, reset, submitting, handleSignUp } = props;

  return (
    <form onSubmit={handleSubmit} className="form" >
      <Field
        name="username"
        type="text"
        component={renderField}
        label="Username"
        className="one-line-input"
        /* validate={required} */
        warn={required}
      />
      <Field
        name="password"
        type="password"
        component={renderField}
        label="Password"
        className="one-line-input"
        warn={required}
      />
      <Field
        name="email"
        type="email"
        component={renderField}
        label="Email"
        className="one-line-input"
        warn={email}
      />
      <Field
        name="phoneNumber"
        type="tel"
        component={renderField}
        label="Phone Number"
        className="one-line-input"
      />
      {/* {error && <strong>{error}</strong>} */}
      <div>
        <button type="submit" disabled={submitting} className="btn-default">
          Sign Up
          </button>
        <button type="button" disabled={pristine || submitting} onClick={reset} className="btn-default secondary-btn">
          Clear Values
          </button>
      </div>
    </form>
  );
};

export default reduxForm({form: 'SignUpForm'})(SignUpForm);

// USE LATER IF NEEDED ---> flip null back to mapStateToProps within connect() below
// const mapStateToProps = (state) => {
//   return {

//   }
// }