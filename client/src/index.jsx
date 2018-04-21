import React from 'react';
import ReactDOM from 'react-dom';

// import AnyComponent from './components/filename.jsx'
import App from './components/app.jsx';

// REDUX:
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

// MORE REDUX:
import rootReducer from './reducers/root_reducer.js';
const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store} >
    <App />
  </Provider>,
  document.getElementById('app')
);