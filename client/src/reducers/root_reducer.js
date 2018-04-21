import { combineReducers } from 'redux';
import { username, phoneNumber, isLoggedIn, scheduledMessages, previouslySentMessages, view } from './all_reducers.js';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  username,
  phoneNumber,
  isLoggedIn,
  scheduledMessages,
  previouslySentMessages,
  view, // DONE
  form: formReducer // DONE
});