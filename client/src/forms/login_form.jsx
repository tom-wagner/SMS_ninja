import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { handleLogin, changeView } from '../actions/index.js';
import { connect } from 'react-redux';
import axios from 'axios';
import { toastr } from 'react-redux-toastr';

class LoginForm extends Component {
  render() {
    const { error, handleSubmit, pristine, reset, submitting, handleLogin } = this.props;
    return (
      <div className="form-container">
        <h1 className="form-header">Log In</h1>
        <form onSubmit={handleSubmit(handleLogin)} className="form" >
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
          {error && <strong>{error}</strong>}
          <div>
            <button type="submit" disabled={submitting} className="btn-default">
              Log In
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
    handleLogin: (values) => {
      const { username, password } = values;

      axios({
        method: 'post',
        url: '/login',
        data: { username, password }
      }).then(response => {
        let phoneNumber = response.data;
        dispatch(handleLogin(username, password, phoneNumber));
        dispatch(changeView('main'));
      }).catch(err => {
        toastr.error('Error: ', err);
      });
    }
  };
};

LoginForm = connect(null, mapDispatchToProps)(LoginForm);

export default reduxForm({
  form: 'LoginForm',
  /*validationFunction*/
  /*warningFunction*/
})(LoginForm);