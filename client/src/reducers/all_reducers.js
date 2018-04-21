// export reducers here, ex:

// export function itemsHasErrored(state = false, action) {
//   switch (action.type) {
//       case 'ITEMS_HAS_ERRORED':
//           return action.hasErrored;
//       default:
//           return state;
//   }
// }
// export function itemsIsLoading(state = false, action) {
//   switch (action.type) {
//       case 'ITEMS_IS_LOADING':
//           return action.isLoading;
//       default:
//           return state;
//   }
// }
// export function items(state = [], action) {
//   switch (action.type) {
//       case 'ITEMS_FETCH_DATA_SUCCESS':
//           return action.items;
//       default:
//           return state;
//   }
// }

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

export function username(state = '', action) {
  return state;
}

export function phoneNumber(state = '', action) {
  return state;
}

export function isLoggedIn(state = false, action) {
  return state;
}

export function scheduledMessages(state = [], action) {
  return state;
}

export function previouslySentMessages(state = [], action) {
  return state;
}

// export function view(state = 'login', action) {
//   return state; 
// }

// START HERE!!!
export function view(state = 'login', action) {
  switch (action.type) {
    case NAV_TO_LOG_IN:
      return 'login';
    case NAV_TO_MAIN:
      return 'main';
    case NAV_TO_MESSAGES:
      return 'messages';
    case NAV_TO_SIGN_UP:
      return 'signUp';
    default:
      return state;
  }
};