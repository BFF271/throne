import { createStore } from 'redux';

// import the combined reducers from ./reducers/index.js
import reducer from './reducers';

// Get existing state from localStorage
const persistedState = localStorage.getItem('reduxSocialAppState') ? JSON.parse(localStorage.getItem('reduxSocialAppState')) : {}

// Create Store with data
const store = createStore(reducer, persistedState);

// Listen for any changes to the state and update localStorage
store.subscribe(()=>{
  localStorage.setItem('reduxSocialAppState', JSON.stringify(store.getState()))
  console.log(localStorage.getItem('reduxSocialAppState'));
})

export default store;
