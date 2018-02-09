import { sessionUserDataSave } from "../components/SocialButtonLogin/utils";
import {
  signInSuccess,
  signInError,
  signOutUser,
  getSpinsUserSuccess,
  getSpinsUserError,
  getSpinsCandidatesUserSuccess,
  getSpinsCandidatesUserError,
  reloadSpinSuccess,
  reloadSpinError,
  publishSpinSuccess,
  publishSpinError,
  getUsersSuccess,
  getUsersError,
  getUserSuccess,
  getUserError
} from "../actions/index";
import { recoverUser, deleteUser } from "../storage/";
import Api from "../service/Api";

export function signIn(code, provider) {
  return dispatch => {
    Api.SignIn(code, provider)
      .then(response => {
        let user = { ...response.data.data.user };
        user.authentication_token = response.data.data.authentication_token;
        sessionUserDataSave(response.data.data);
        dispatch(signInSuccess(user));
      })
      .catch(error => {
        dispatch(signInError());
      });
  };
}
export function signOut() {
  return dispatch => {
    deleteUser();
    dispatch(signOutUser());
  };
}

export function checkSessionUser() {
  return dispatch => {
    let user = recoverUser();
    if (user.github_login && user.github_login !== "")
      dispatch(signInSuccess(user));
    else dispatch(signInError());
  };
}

export function getUserSpinsCandidates() {
  return dispatch => {
    let user = recoverUser();
    if (user) {
      return Api.GetUserSpinsCandidates(user.github_id)
        .then(response => {
          let spins = { ...response.data };
          dispatch(getSpinsCandidatesUserSuccess(spins));
        })
        .catch(error => {
          dispatch(getSpinsCandidatesUserError());
        });
    }
  };
}
export function getSpinsUser(githubName) {
  return dispatch => {
    return Api.GetUserSpins(githubName)
      .then(response => {
        let spins = { ...response.data };
        dispatch(getSpinsUserSuccess(spins));
      })
      .catch(error => {
        dispatch(getSpinsUserError());
      });
  };
}
export function refreshSpins() {
  return dispatch => {
    return Api.RefreshSpins()
      .then(response => {
        dispatch(reloadSpinSuccess());
      })
      .catch(error => {
        dispatch(reloadSpinError());
      });
  };
}
export function publishSpin(id) {
  return dispatch => {
    return Api.publishSpin(id)
      .then(response => {
        dispatch(publishSpinSuccess());
      })
      .catch(error => {
        dispatch(publishSpinError());
      });
  };
}
export function validateSpin(id) {
  return dispatch => {
    return Api.validateSpin(id)
      .then(response => {
        dispatch(publishSpinSuccess());
      })
      .catch(error => {
        dispatch(publishSpinError());
      });
  };
}
export function getInformationUserProfile(id) {
  return dispatch => {
    return Api.GetUser(id)
      .then(response => {
        dispatch(getUserSuccess(response.data));
        return Api.GetUserSpins(response.data.data.login)
          .then(response => {
            let spins = { ...response.data };
            dispatch(getSpinsUserSuccess(spins));
          })
          .catch(error => {
            dispatch(getSpinsUserError());
          });

      })
      .catch(error => {
        dispatch(getUserError(error));
      });
  }
}
export function getUsers() {
  return dispatch => {
    return Api.GetUsers()
      .then(response => {
        dispatch(getUsersSuccess(response.data));
      })
      .catch(error => {
        dispatch(getUsersError(error));
      });
  };
}
export function getUser(id) {
  return dispatch => {
    return Api.GetUser(id)
      .then(response => {
        dispatch(getUserSuccess(response.data));
      })
      .catch(error => {
        dispatch(getUserError(error));
      });
  };
}
