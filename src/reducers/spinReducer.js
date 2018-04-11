import * as actions from '../actions/typeActions';

const initState = {
  spinsUser: [],
  error: null,
  userDetails: {},
  meta: {}
};
export const spins = (state = initState, action) => {
  let newState = {};
  switch (action.type) {
    case actions.GET_SPINS_SUCCESS:
      if (action.spins) {
        let spinsUser = action.spins.data ? [...action.spins.data] : [];
        let newState = Object.assign({}, state);
        newState.spinsUser = spinsUser;
        newState.meta = action.spins.meta ? action.spins.meta : {};
        return newState;
      } else return state;

    case actions.GET_USER_SUCCESS:
      let user = Object.assign({}, action.user.data);
      newState = Object.assign({}, state);
      newState.userDetails = user;
      return newState;
    case actions.GET_USER_ERROR:
      newState = Object.assign({}, state);
      newState.error = action.error;
      return newState;
    case actions.GET_SPINS_ERROR:
      newState = Object.assign({}, state);
      newState.error = action.error;
      return newState;
    default:
      return state;
  }
};
export default spins;
