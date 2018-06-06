import {
  DID_GET_MESSAGES,
  DID_SCHEDULE_MESSAGE,
  DID_SIGN_UP,
  DID_LOG_IN,
  DID_LOG_OUT,
  NAV_TO_LOG_IN,
  NAV_TO_SIGN_UP,
  NAV_TO_MAIN,
  NAV_TO_MESSAGES,
  DELETE_MESSAGE,
  UPDATED_MESSAGES,
} from '../action_types.js';

export const fetchMessages = username => {
  return {
    type: DID_GET_MESSAGES,
    payload: null,
  };
};

export const handleScheduleMessageSubmit = (msgData) => { // username, phoneNumber, message, dateTime
  return {
    type: DID_SCHEDULE_MESSAGE,
    payload: msgData,
  };
};

export const deleteMessage = (idx) => {
  return {
    type: DELETE_MESSAGE,
    payload: idx,
  };
};

export const updateMessages = (messages) => {
  console.log('messages within updateMessages: ', messages);
  return {
    type: UPDATED_MESSAGES,
    payload: messages,
  };
};

export const handleSignUp = (values) => {
  return {
    type: DID_SIGN_UP,
    payload: true,
  };
};

export const handleLogin = (username, password, phoneNumber) => {
  return {
    type: DID_LOG_IN,
    payload: { username, password, phoneNumber },
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