import * as actions from '../actions/typeActions';

const initStage = {
  mostStarred: {
    name: '',
    data: []
  },
  mostWatched: {
    name: '',
    data: []
  },
  mostDownloaded: {
    name: '',
    data: []
  },
  topTags: {
    name: '',
    data: []
  },
  topContributors: {
    name: '',
    data: []
  },
  Newest: {
    name: '',
    data: []
  },
  error: null
};
export const tops = (state = initStage, action) => {
  let newState = {};
  switch (action.type) {
    case actions.GET_TOP_SUCCESS:
      let data = Object.assign({}, action.tops.data);
      newState = Object.assign({}, state);
      if (data) {
        newState.mostStarred.data = [...data['Most Starred']];
        newState.mostStarred.name = 'Most Starred';
        newState.mostWatched.data = [...data['Most Watched']];
        newState.mostWatched.name = 'Most Watched';
        newState.mostDownloaded.data = [...data['Most Downloaded']];
        newState.mostDownloaded.name = 'Most Downloaded';
        newState.topTags.data = [...data['Top Tags']];
        newState.topTags.name = 'Top Tags';
        newState.topContributors.data = [...data['Top Contributors']];
        newState.topContributors.name = 'Top Contributors';
        newState.Newest.data = [...data['Newest']];
        newState.Newest.name = 'Newest';
      }
      return newState;
    case actions.GET_TOP_ERROR:
      newState = Object.assign({}, state);
      newState.error = { ...action.error };
      return newState;
    default:
      return state;
  }
};
export default tops;
