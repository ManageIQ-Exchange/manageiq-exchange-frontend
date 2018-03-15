import { GET_USERS_SUCCESS, GET_USERS_ERROR } from '../actions/typeActions';

const initialState = {
  users: [],
  error: null,
  meta: {}
};
export const users = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case GET_USERS_SUCCESS:
      newState = Object.assign({}, state);
      newState.users = [...action.users.data];
      newState.meta = Object.assign({}, action.users.meta);
      return newState;
    case GET_USERS_ERROR:
      newState = Object.assign({}, state);
      newState.error = Object.assign({}, action.error);
      return newState;
    default:
      return state;
  }
};
