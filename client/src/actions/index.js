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

// export const navToLogin = () => {
//   return {
//     type: NAV_TO_LOG_IN,
//     view: null,
//   };
// };

// export const navToSignUp = () => {
//   return {
//     type: NAV_TO_SIGN_UP,
//     view: null,
//   };
// };

// export const navToMain = () => {
//   return {
//     type: NAV_TO_MAIN,
//     view: null,
//   };
// };

// export const navToMessages = () => {
//   return {
//     type: NAV_TO_MESSAGES,
//     view: null,
//   };
// };