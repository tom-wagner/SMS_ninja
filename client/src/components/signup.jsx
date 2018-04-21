import React, { Component } from 'react';
import {/* REQUIRED COMPONENTS HERE*/} from 'react-bootstrap';
import { connect } from 'react-redux';
import SignUpForm from '../forms/signup_form.jsx';

class SignUp extends Component {
  render() {
    return (
      <div>
        <SignUpForm />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {

  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);