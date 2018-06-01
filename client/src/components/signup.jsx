import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import { handleSignUp, changeView } from '../actions/index.js';
import SignUpForm from '../forms/signup_form.jsx';

class SignUp extends Component {
  render() {
    return (
      <div>
        <Row className="show-grid">
          <Col xs={8} xsOffset={2}>
            <div className="form-container">
              <h1 className="form-header">Sign Up</h1>
              <SignUpForm onSubmit={this.props.handleSignUp} />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleSignUp: (values) => {
      const { username, email, phoneNumber, password} = values;
      var options = { method: 'post', url: '/newUser', data: { username, email, phoneNumber, password }}

      axios(options)
        .then(result => {
          toastr.success('Sign up successful!', 'Log in to begin sending and scheduling messages');
          dispatch(handleSignUp(values));
          dispatch(changeView('login'));
        })
        .catch(err => toastr.error('Serer error, please try again.'));
    }
  };
};

export default connect(null, mapDispatchToProps)(SignUp);