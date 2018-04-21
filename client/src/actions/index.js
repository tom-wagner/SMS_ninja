import {
  DID_GET_MESSAGES,
  DID_SCHEDULE_MESSAGE,
  DID_SIGN_UP,
  DID_LOG_IN
} from '../action_types.js';


export const fetchMessages = username => {
  return {
    type: DID_GET_MESSAGES,
    payload: null
  };
};

export const handleScheduleMessageSubmit = (username, phoneNumber, message, dateTime) => {
  return {
    type: DID_SCHEDULE_MESSAGE,
    payload: null
  };
};

export const handleLogin = (username, passwordInput) => {
  return {
    type: DID_LOG_IN,
    payload: null
  };
};

export const handleSignUp = (username, email, passwordInput, phoneNumber) => {
  return {
    type: DID_SIGN_UP,
    payload: null
  };
};