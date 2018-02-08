import { combineReducers } from 'redux';
import { user } from './userReducer';
import { users } from './usersReducer';
import { apiVersion } from './apiVersionReducer';

import { spins } from './spinsReducer';
import { tags } from './tagReducer';
import { tops } from './topReducer';

export default combineReducers({
  user,
  users,
  spins,
  apiVersion,
  tags,
  tops
});
