import * as actions from "../actions/typeActions";

const initStage = {
  tags: [],
  error: null,
  filterTags: []
};
export const tags = (tags = initStage, action: any) => {
  let newState = {};
  switch (action.type) {
    case actions.GET_TAGS_SUCCESS:
      newState.tags = [...action.tags];
      return newState;
    case actions.GET_TAGS_ERROR:
      newState = { ...tags };
      newState.error = { ...action.error };
      return newState;
    case actions.ADD_POPULAR_TAG_SUCCESS:
      let filterTags = [...tags.filterTags];
      filterTags.push(action.filterTag);
      newState = {...tags};
      newState.filterTags = filterTags;
      return newState;
    default:
      return tags;
  }
};
export default tags;
