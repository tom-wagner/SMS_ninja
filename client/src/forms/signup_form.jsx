import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import {
  email,
  maxLength15,
  minLength8,
  required,
  atLeastOneUpperCaseLetter,
  atLeastOneLowerCaseLetter,
  atLeastOneSpecialCharacter,
  atLeastOneNumber,
} from './form_validation/signup_form_validation.js';

const renderField = ({ className, input, label, placeholder, type, meta: { touched, error, warning } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={placeholder || label} type={type} className={className} />
      {touched && 
        ((error && <span className="error">❗ {error}</span>) ||
        (warning && <span className="warning">❗ {warning}</span>))}
    </div>
  </div>
);

const normalizePhone = (value, previousValue) => {
  if (!value) {
    return value
  }
  const onlyNums = value.replace(/[^\d]/g, '')
  if (!previousValue || value.length > previousValue.length) {
    // typing forward
    if (onlyNums.length === 3) {
      return onlyNums + '-'
    }
    if (onlyNums.length === 6) {
      return onlyNums.slice(0, 3) + '-' + onlyNums.slice(3) + '-'
    }
  }
  if (onlyNums.length <= 3) {
    return onlyNums
  }
  if (onlyNums.length <= 6) {
    return onlyNums.slice(0, 3) + '-' + onlyNums.slice(3)
  }
  return onlyNums.slice(0, 3) + '-' + onlyNums.slice(3, 6) + '-' + onlyNums.slice(6, 10)
}

const SignUpForm = (props) => {
  const { error, handleSubmit, pristine, reset, submitting, handleSignUp } = props;

  return (
    <form onSubmit={handleSubmit} className="form">
      <Field
        name="username"
        type="text"
        component={renderField}
        label="Username"
        className="one-line-input"
        validate={[required, maxLength15]}
        warn={[required, maxLength15]}
      />
      <Field
        name="password"
        type="password"
        component={renderField}
        label="Password"
        className="one-line-input"
        validate={[required, maxLength15]}
        warn={[minLength8, required, maxLength15, atLeastOneUpperCaseLetter, atLeastOneLowerCaseLetter, atLeastOneNumber, atLeastOneSpecialCharacter]}
      />
      <Field
        name="email"
        type="email"
        component={renderField}
        label="Email"
        className="one-line-input"
        warn={[email, required]}
        validate={required}
      />
      <Field
        name="phoneNumber"
        type="text"
        component={renderField}
        label="Phone Number"
        placeholder="(999-999-9999)"
        className="one-line-input"
        normalize={normalizePhone}
        validate={required}
        warn={required}
      />
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