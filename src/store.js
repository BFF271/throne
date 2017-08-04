import { createStore } from 'redux';

// import the combined reducers from ./reducers/index.js
import reducer from './reducers';

export default createStore(reducer);
