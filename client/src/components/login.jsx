import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import LoginForm from '../forms/login_form.jsx';

class Login extends Component {
  render() {
    return (
      <div className="login default-container">
        <Row className="show-grid">
            <Col xs={8} xsOffset={2}>
              <LoginForm />
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);