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

export function username(state = '', action) {
  switch (action.type) {
    case DID_LOG_IN:
      return action.payload.username;
    case DID_LOG_OUT:
      return '';
    default:
      return state;
  }
}

export function phoneNumber(state = '', action) {
  // LATER: LOOK UP PHONE NUMBER FROM DATABASE AT LOGIN
  switch (action.type) {
    case DID_LOG_IN:
      return action.payload.phoneNumber;
    case DID_LOG_OUT:
      return '';
    default:
      return state;
  }
}

export function toggleLogIn(state = false, action) {
  switch (action.type) {
    case DID_LOG_IN:
      return true;
    case DID_LOG_OUT:
      return false;
    default:
      return state;
  }
}

export function scheduledMessages(state = [], action) {
  switch (action.type) {
    case DID_LOG_IN:
      return action.payload.messages;
    case DID_LOG_OUT:
      return [];
    default:
      return state;
  }
}

export function previouslySentMessages(state = [], action) {
  switch (action.type) {
    case DID_LOG_OUT:
      return [];
    default:
      return state;
  }
}

export function view(state = 'login', action) {
  switch (action.type) {
    case NAV_TO_LOG_IN:
      return action.view;
    case NAV_TO_MAIN:
      return action.view;
    case NAV_TO_MESSAGES:
      return action.view;
    case NAV_TO_SIGN_UP:
      return action.view;
    default:
      return state;
  }
};