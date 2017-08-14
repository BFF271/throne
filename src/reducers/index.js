import { combineReducers } from 'redux';

// import reducers
import users from './userReducer';
import activeUser from './loginReducer';
import comments from './commentReducer';
export default combineReducers({
  users,
  activeUser,
  comments
})
