import * as actions from "../actions/typeActions";

const initStage = {
  mostStarred: [],
  mostWatched: [],
  mostDownloaded: [],
  topTags: [],
  topContributors: [],
  Newest: [],
  error: null
};
export const tops = (state = initStage, action: any) => {
  let newState = {};
  switch (action.type) {
    case actions.GET_TOP_SUCCESS:
      let data = { ...action.tops.data };

      if (data) {
        newState.mostStarred = [...data['Most Starred']];
        newState.mostWatched = [...data['Most Watched']];
        newState.mostDownloaded = [...data['Most Downloaded']];
        newState.topTags = [...data['Top Tags']];
        newState.topContributors = [...data['Top Contributors']];
        newState.Newest = [...data['Newest']];
      }
       console.log("newState", newState);
      return newState;
    case actions.GET_TOP_ERROR:
      newState = { ...state };
      newState.error = { ...action.error };
      return newState;
    default:
      return state;
  }
};
export default tops;
