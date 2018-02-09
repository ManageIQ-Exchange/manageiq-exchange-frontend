import { GET_SPIN_SUCCESS, GET_SPIN_ERROR } from "../actions/typeActions";

const stateDeafult = {
  detailsSpin: {},
  error: null
};
export const detailsSpin = (state = {}, action: any) => {
  let newState = {};
  switch (action.type) {
    case GET_SPIN_SUCCESS:
      if (action.spin) {
        newState = Object.assign({}, state);
        newState.detailsSpin = Object.assign({}, action.spin);
        return newState;
      } else return state;

    case GET_SPIN_ERROR:
      return state;
    default:
      return state;
  }
};
