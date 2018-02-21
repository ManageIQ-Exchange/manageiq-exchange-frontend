import { GET_SPIN_SUCCESS, GET_SPIN_ERROR } from '../actions/typeActions';

const stateDeafult = {
  spin: {},
  error: null
};
export const detailsSpin = (state = {}, action: any) => {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case GET_SPIN_SUCCESS:
      if (action.spin) {
        newState.spin = Object.assign({}, action.spin.data);
        return newState;
      } else return state;

    case GET_SPIN_ERROR:
      return state;
    default:
      return state;
  }
};
