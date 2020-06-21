import { combineReducers } from 'redux';
import alert from './alert.reducer';
import auth from './auth.reducer';
import profile from './profile.reducer';
import post from './post.reducers';

export default combineReducers({
  alert,
  auth,
  profile,
  post
});
