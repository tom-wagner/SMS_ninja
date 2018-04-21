import { combineReducers } from 'redux';
import { /* reducers here */ } from './all_reducers.js';

export default combineReducers({
  username: null,
  phoneNumber: null,
  isLoggedIn: null,
  scheduledMessages: null,
  previouslySentMessages: null,
  view: null,
});