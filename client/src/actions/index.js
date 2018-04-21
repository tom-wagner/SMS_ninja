import {
  DID_GET_MESSAGES,
  DID_SCHEDULE_MESSAGE,
  DID_SIGN_UP,
  DID_LOG_IN,
  DID_LOG_OUT,
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

export const handleScheduleMessageSubmit = (values) => { // username, phoneNumber, message, dateTime
  return {
    type: DID_SCHEDULE_MESSAGE,
    payload: null
  };
};

export const handleSignUp = (values) => {
  console.log('values from sign up form: ', values);
  // TO DO LATER: Add user to database

  return {
    type: DID_SIGN_UP,
    payload: true
  };
};

export const handleLogin = (values) => {
  console.log('username and password: ', values);

  // TO DO LATER:
  // authenticate user
  // fetch their scheduled messages
  // set up session
  // store phone number in state

  // To do now:
  // flip isLoggedIn to true
  return {
    type: DID_LOG_IN,
    payload: values
  };
};

export const handleLogOut = () => {
  return {
    type: DID_LOG_OUT,
  };
};

export const changeView = (view) => {
  if (view === 'main') {
    return {
      type: NAV_TO_MAIN,
      view: 'main',
    };
  } else if (view === 'login') {
    return {
      type: NAV_TO_LOG_IN,
      view: 'login',
    };
  } else if (view === 'signUp') {
    return {
      type: NAV_TO_SIGN_UP,
      view: 'signUp',
    };
  } else if (view === 'messages') {
    return {
      type: NAV_TO_MESSAGES,
      view: 'messages',
    };
  } else {
    console.error('ERROR, NO MATCHING VIEW FOUND');
  }
};