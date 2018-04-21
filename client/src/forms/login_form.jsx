import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { handleLogin, changeView } from '../actions/index.js';
import { connect } from 'react-redux';

class LoginForm extends Component {
  render() {
    const { error, handleSubmit, pristine, reset, submitting, handleLogin } = this.props;
    return (
      <form onSubmit={handleSubmit(handleLogin)}>
        <Field 
          name="username"
          type="text"
          component={renderField}
          label="Username"
        /><br/>
        <Field 
          name="password"
          type="password"
          component={renderField}
          label="Password"
        />
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
    )
  }
}

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
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