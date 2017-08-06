import { combineReducers } from 'redux';

// import reducers
import users from './userReducer';
import loginInfo from './loginReducer';

export default combineReducers({
  loginInfo,
  users
})
