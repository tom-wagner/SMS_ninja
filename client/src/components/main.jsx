import React, { Component } from 'react'
import {/* REQUIRED COMPONENTS HERE*/} from 'react-bootstrap'
import { connect } from 'react-redux';
import { handleScheduleMessageSubmit } from '../actions/index.js';

class Main extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     formData: {
  //       phoneNumber: '',
  //       msg: '',
  //       dateTime: '',
  //     }
  //   };

  //   this.handleChange = this.handleChange.bind(this);
  //   this.handleSubmit = this.handleSubmit.bind(this);
  // }

  // NEED TO REFACTOR TO ACTION
  // HOW DO I CAPTURE FORM DATA IN REDUX??
  // handleChange(prop, evt) {
  //   var formData = this.state.formData;
    
  //   formData[prop] = evt.target.value

  //   this.setState({formData: formData});
  // }

  // NEED TO REFACTOR TO ACTION HANDLER
  // handleSubmit(evt) {
  //   var data = this.state.formData;

  //   // reset state
  //   this.setState({
  //     formData: {
  //       phoneNumber: '',
  //       msg: '',
  //       dateTime: '',
  //     }
  //   });

  //   this.props.sendMessage(data);
  //   evt.preventDefault();
  // }

  render() {
    return (
      <div>
        Send a text message!<br/><br/>
          <form onSubmit={this.handleSubmit}>
            Phone Number:<br/> {/*NEED TO HANDLE DIFFERENT PHONE NUMBER INPUT FORMATS/TYPES*/}
            <input className="create-input" type="tel" onChange={this.handleChange.bind(this, 'phoneNumber')} value={this.state.formData.phoneNumber} ></input><br/><br/>
            Message:<br/>
            <textarea className="create-body-textarea" onChange={this.handleChange.bind(this, 'msg')} value={this.state.formData.msg} ></textarea><br/><br/>
            Time and date to send the message:<br/>
            <input type="datetime-local" onChange={this.handleChange.bind(this, 'dateTime')} value={this.state.formData.dateTime}/><br/><br/>
            <button className="create-submit-button" type="submit">Send text</button>
          </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(Main);