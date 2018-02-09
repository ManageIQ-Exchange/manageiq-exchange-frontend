import * as actions from '../actions/typeActions';

export const spinsCandidates = (spins = {}, action: any) => {
  let newState = {};
  switch (action.type) {
    case actions.GET_SPINS_CANDIDATES_SUCCESS:
      newState = {...action.spins};
      return newState;
    case actions.GET_SPINS_CANDIDATES_ERROR:
    case actions.RELOAD_SPIN_SUCCESS:
    case actions.RELOAD_SPIN_ERROR:
    case actions.PUBLISH_SPIN_SUCCESS:
    case actions.PUBLISH_SPIN_ERROR:
    case actions.VALIDATE_SPIN_ERROR:
    case actions.VALIDATE_SPIN_SUCCESS:
      return spins;
    default:
      return spins;
  }
};
export default spinsCandidates;
