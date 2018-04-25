import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { handleSignUp, changeView } from '../actions/index.js';
import { connect } from 'react-redux';
import axios from 'axios';

class SignUpForm extends Component {
  render() {
    const { error, handleSubmit, pristine, reset, submitting, handleSignUp } = this.props;

    const required = value => {
      console.log('value in required: ', value);
      console.log('result of ternary in required: ', value ? undefined : 'Required');
      return value ? undefined : 'Required';
    }

    const email = value => {
      console.log('value in email: ', value);
      console.log('value of ternary in email: ', value ? 'Invalid email address' : undefined);
      return value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email address' : undefined;
    }

    const renderField = ({
      className,
      input,
      label,
      type,
      meta: { touched, error, warning }
    }) => (
      <div>
        <label>{label}</label>
        <div>
          <input {...input} placeholder={label} type={type} className={className} />
          {/* as of now warnings and errors are not being thrown when they should be! */}
          {console.log({
            label: label,
            type: type,
            touched: touched,
            warning: warning,
            error: error
          })}
          {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
        </div>
      </div>
    );

    // TO DO TOMORROW:
      // TRY IN CodeSandbox LIKE THE EXAMPLE DID
      // ASK AROUND IF ANYONE HAS USED REDUX FORM PREVIOUSLY

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
            validate={required}
            /* warn={required} */
          />
          <Field 
            name="password"
            type="password"
            component={renderField}
            label="Password"
            className="one-line-input"
            validate={required}
          />
          <Field 
            name="email"
            type="email"
            component={renderField}
            label="Email"
            className="one-line-input"
            validate={email}
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
            <button type="button" disabled={pristine || submitting} onClick={reset} className="btn-default secondary-btn">
              Clear Values
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleSignUp: (values) => {
      // Add to users table in the database
      const { username, email, phoneNumber, password} = values;

      var options = {
        method: 'post',
        url: '/newUser',
        data: { username, email, phoneNumber, password }
      }
      axios(options).then(result => {
        console.log(result);
      }).catch(err => {
        console.log(err);
      });
      
      dispatch(handleSignUp(values));
      
      // For now, just change the view:
      dispatch(changeView('login'));

      // LATER: Check availability of username in database
      // LATER: Live validate inputs
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