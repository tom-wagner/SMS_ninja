import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import axios from 'axios';
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

const mapStateToProps = (state) => {
  return {

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleSignUp: (values) => {
      // Add to users table in the database
      console.log('values!!', values);

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

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);