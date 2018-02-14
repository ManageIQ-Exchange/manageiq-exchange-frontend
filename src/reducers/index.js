import { combineReducers } from "redux";
import { user } from "./userReducer";
import { users } from "./usersReducer";
import { apiVersion } from "./apiVersionReducer";

import { spinsCandidates } from "./spinsReducer";
import { tags } from "./tagReducer";
import { tops } from "./topReducer";
import { spins } from "./spinReducer";
import { detailsSpin } from "./detailsSpin";
import { search } from "./searchReducers";

export default combineReducers({
  user,
  users,
  spinsCandidates,
  spins,
  apiVersion,
  tags,
  tops,
  detailsSpin,
  search
});
