import * as actions from '../actions/typeActions';

const defaultState = {
  spins: [],
  error: null,
  isLoading: false
}
export const spinsCandidates = (state = defaultState, action: any) => {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case actions.GET_SPINS_CANDIDATES_SUCCESS:
      if (action.spins.data) newState.spins = [...action.spins.data];
      return newState;
    case actions.GET_SPINS_CANDIDATES_ERROR:
    case actions.RELOAD_SPIN_SUCCESS:
    case actions.RELOAD_SPIN_ERROR:
    case actions.PUBLISH_SPIN_SUCCESS:
    case actions.VALIDATE_SPIN_ERROR:
    case actions.VALIDATE_SPIN_SUCCESS:
    case actions.UNPUBLISH_SPIN_SUCCESS:
      return state;
    case actions.PUBLISH_SPIN_ERROR:
      newState.error = new Error();
      return newState;
    case actions.SPINS_CANDIDATES_LOADING:
      newState.isLoading = action.isLoading;
      return newState;
    default:
      return state;
  }
};
export default spinsCandidates;
