import { combineReducers } from 'redux';

// import reducers
import users from './userReducer';
import activeUser from './loginReducer';
export default combineReducers({
  users,
  activeUser
})
