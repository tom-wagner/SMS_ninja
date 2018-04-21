import React, { Component } from 'react';
import {/* REQUIRED COMPONENTS HERE*/} from 'react-bootstrap';
import { connect } from 'react-redux';
import LoginForm from '../forms/login_form.jsx';

class Login extends Component {
  render() {
    return (
      <div className="login">
          <LoginForm />
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);