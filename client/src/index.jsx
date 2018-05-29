import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app.jsx';

// Alerts via ReduxToastr
import ReduxToastr from 'react-redux-toastr';

// REDUX:
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

// MORE REDUX:
import rootReducer from './reducers/root_reducer.js';
const store = createStore(rootReducer, applyMiddleware(thunk));

console.log('Initial state: ', store.getState());

ReactDOM.render(
  <Provider store={store} >
    <div>
      <App />
      <ReduxToastr
        timeOut={2500}
        newestOnTop={false}
        preventDuplicates
        position="top-right"
        transitionIn="fadeIn"
        transitionOut="fadeOut"
        />
    </div>
  </Provider>,
  document.getElementById('app')
);