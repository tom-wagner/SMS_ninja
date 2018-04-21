import {
  DID_GET_MESSAGES,
  DID_SCHEDULE_MESSAGE,
  DID_SIGN_UP,
  DID_LOG_IN,
  NAV_TO_LOG_IN,
  NAV_TO_SIGN_UP,
  NAV_TO_MAIN,
  NAV_TO_MESSAGES
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

export const navToLogin = () => {
  return {
    type: NAV_TO_LOG_IN,
    payload: null,
  };
};

export const navToSignUp = () => {
  return {
    type: NAV_TO_SIGN_UP,
    payload: null,
  };
};

export const navToMain = () => {
  return {
    type: NAV_TO_MAIN,
    payload: null,
  };
};

export const navToMessages = () => {
  return {
    type: NAV_TO_MESSAGES,
    payload: null,
  };
};