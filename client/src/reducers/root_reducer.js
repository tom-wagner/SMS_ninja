import { combineReducers } from 'redux';
import { username, phoneNumber, isLoggedIn, scheduledMessages, previouslySentMessages, view } from './all_reducers.js';

export default combineReducers({
  username,
  phoneNumber,
  isLoggedIn,
  scheduledMessages,
  previouslySentMessages,
  view // DONE
});