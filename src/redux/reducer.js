import { combineReducers } from 'redux';
import users from './reducers/users';
import polls from './reducers/polls';
// import { routerReducer } from 'react-router-redux';

export default combineReducers({
	users,
  	polls
});