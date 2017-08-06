import { createStore } from 'redux';

// import the combined reducers from ./reducers/index.js
import reducer from './reducers';
import { loadState, saveState } from './localStorage';

// Get existing state from localStorage
const persistedState = loadState();

// Create Store with data
const store = createStore(reducer, {});

// Listen for any changes to the state and update localStorage
store.subscribe(() => {
  saveState(store.getState());
});


export default store;
