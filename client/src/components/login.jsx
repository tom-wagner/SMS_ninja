import React, { Component } from 'react';
import {/* REQUIRED COMPONENTS HERE*/} from 'react-bootstrap';
import { connect } from 'react-redux';
import { handleLogin } from '../actions/index.js';

class Login extends Component {

  // HOW DO I CAPTURE FORM DATA IN REDUX??
  // handleChange(prop, evt) {
  //   var formData = this.state.formData;
    
  //   formData[prop] = evt.target.value

  //   this.setState({formData: formData});
  // }

  render() {
    return (
      <div className="login">
          {/* <form onSubmit={this.handleSubmit}> */}
            {/* Username:<br/> NEED TO HANDLE DIFFERENT PHONE NUMBER INPUT FORMATS/TYPES */}
            {/* <input className="create-input" type="text" onChange={this.handleChange.bind(this, 'username')} value={this.state.formData.username} ></input><br/><br/> */}
            {/* Password:<br/> */}
            {/* <input className="create-input" type="text" onChange={this.handleChange.bind(this, 'password')} value={this.state.formData.password} ></input><br/><br/> */}
            {/* <button className="create-submit-button" type="submit">Log In</button> */}
          {/* </form> */}
          This is a login div!!
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