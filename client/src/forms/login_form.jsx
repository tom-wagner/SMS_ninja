import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { handleLogin, changeView } from '../actions/index.js';
import { connect } from 'react-redux';

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
      dispatch(handleLogin(values))
      
      // LATER: check if user was authenticated then conditionally do something

      // For now, just change the view:
      dispatch(changeView('main'));
    }
  };
};

// USE LATER IF NEEDED ---> flip null back to mapStateToProps within connect() below
// const mapStateToProps = (state) => {
//   return {

//   }
// }

LoginForm = connect(null, mapDispatchToProps)(LoginForm);

export default reduxForm({
  form: 'LoginForm',
  /*validationFunction*/
  /*warningFunction*/
})(LoginForm);