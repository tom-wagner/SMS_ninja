import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import SignUpForm from '../forms/signup_form.jsx';

class SignUp extends Component {
  render() {
    return (
      <div>
        <Row className="show-grid">
          <Col xs={8} xsOffset={2}>
            <SignUpForm />
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

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);