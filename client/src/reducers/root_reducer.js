import { combineReducers } from 'redux';
import { username, phoneNumber, toggleLogIn, scheduledMessages, previouslySentMessages, view } from './all_reducers.js';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  username,
  phoneNumber,
  isLoggedIn: toggleLogIn,
  scheduledMessages,
  previouslySentMessages,
  view, // DONE
  form: formReducer // DONE
});