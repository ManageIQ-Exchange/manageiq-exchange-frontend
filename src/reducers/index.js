import { combineReducers } from 'redux';
import { user } from './userReducer';
import { apiVersion } from './apiVersionReducer';
import {spins} from './spinsReducer';

export default combineReducers({
  user,
  spins,
  apiVersion
});
