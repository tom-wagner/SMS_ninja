import { combineReducers } from 'redux';
import { username, phoneNumber, toggleLogIn, scheduledMessages, previouslySentMessages, view } from './all_reducers.js';
import { reducer as reduxFormReducer } from 'redux-form';
import { reducer as toastrReducer } from 'react-redux-toastr'

export default combineReducers({
  username,
  phoneNumber,
  isLoggedIn: toggleLogIn,
  scheduledMessages,
  previouslySentMessages,
  view,
  form: reduxFormReducer,
  toastr: toastrReducer,
});