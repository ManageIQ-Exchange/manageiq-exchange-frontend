import {
  GET_SPINS_SEARCH_SUCCESS,
  GET_SPINS_SEARCH_ERROR,
  SEARCH_LOADING
} from "../actions/typeActions";

const defaultState = {
  spinSearch: [],
  meta: {},
  error: null,
  isLoading: false
};
export const search = (state = defaultState, action: any) => {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case GET_SPINS_SEARCH_SUCCESS:
      newState.spinSearch = action.spins.data ? [...action.spins.data] : [];
      newState.meta = Object.assign({}, action.spins.meta);
      newState.error = null;
      return newState;
    case GET_SPINS_SEARCH_ERROR:
      newState.error = action.error;
      return newState;
    case SEARCH_LOADING:
      newState.isLoading = action.isLoading;
      return newState;
    default:
      return state;
  }
};
