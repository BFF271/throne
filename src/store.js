import { createStore, applyMiddleware } from 'redux';
// thunk allows multiple actions to be run together
import thunk from 'redux-thunk';

// import the combined reducers from ./reducers/index.js
import reducer from './reducers';
import { loadState, saveState } from './localStorage';

// Get existing state from localStorage
const persistedState = loadState();

// Create Store with data
const store = createStore(
  reducer,
  persistedState,
  applyMiddleware(thunk)
);

// Listen for any changes to the state and update localStorage
store.subscribe(() => {
  saveState(store.getState());
});


export default store;
