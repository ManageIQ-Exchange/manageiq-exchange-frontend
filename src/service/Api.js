import axios from 'axios';
import config from '../config';
import { toQuery } from '../lib/';
import providerStorage from '../storage';
// Server Backend
const BackendServer = config.EXCHANGE_API_BACKEND;
// Version of API
const Version = config.EXCHANGE_API_VERSION;
// Root API Base
export const ApiBaseURL = `${BackendServer}/${Version}`;

// Api Version
const ApiVersion = `${BackendServer}/`;

// Users
export const ApiSignin = `${ApiBaseURL}/users/sign_in`; /* User Log in */
export const ApiSignout = `${ApiBaseURL}/users/sign_out`; /* User Log out */
const ApiGetUsers = `${ApiBaseURL}/users`; /* List of Users */
const ApiGetUser = `${ApiBaseURL}/users/`; /* Get a specific user  adding id or username in path */
export const ApiGetUserSpins = `${ApiBaseURL}/spin_candidates/`; /* Get a specific user  adding id or username in path */

// GIT
const GetUserStats = `https://api.github.com/users/`; /* Get a specific user stats in GIT  adding id or username in path */

// Spins
export const ApiGetSpins = `${ApiBaseURL}/spins`; /* Get Spins */
const ApiPublishSpin = `${ApiBaseURL}/spin_candidates/`; /* Refresh Spins */

// TAG
const ApiTags = `${ApiBaseURL}/tags/`;

// TOPLIST
const ApiTops = `${ApiBaseURL}/top/`;

class Api {
  headerSignIn(code, provider) {
    return {
      code: code,
      provider: provider
    };
  }
  headerAuthenticated() {
    return {
      'X-USER-ID': providerStorage.getItem('github_id'),
      'X-USER-TOKEN': providerStorage.getItem('authentication_token')
    };
  }

  static version() {
    const api = new this();
    api.request('get', ApiVersion);
    return api;
  }

  static SignIn(code, provider) {
    const api = new this();
    api.request('post', ApiSignin, api.headerSignIn(code, provider));
    return api;
  }
  static SignOut() {
    const api = new this();
    api.request('delete', ApiSignout, api.headerAuthenticated());
    return api;
  }

  static GetUsers() {
    const api = new this();
    api.request('get', ApiGetUsers);
    return api;
  }
  static GetUser(id_or_username) {
    const api = new this();
    api.request('get', ApiGetUser + id_or_username + '?expand=resources');
    return api;
  }
  static GetUsersBy(username) {
    const api = new this();
    api.request('get', ApiGetUsers + '?query=' + username);
    return api;
  }
  static GetUserSpinsCandidates(id) {
    const api = new this();
    let header = Object.assign(api.headerAuthenticated(), { id: id });
    api.request('get', ApiGetUserSpins, header);
    return api;
  }
  static GetUserSpins(name) {
    const api = new this();
    const params = toQuery({
      expand: 'resources'
    });
    const url = `${ApiGetUsers}/${name}/spins/?${params}`;
    api.request('get', url, api.headerAuthenticated());
    return api;
  }
  static RefreshSpins() {
    const api = new this();
    api.request('post', ApiGetUserSpins + 'refresh', api.headerAuthenticated());
    return api;
  }
  static publishSpin(spinCandidateId) {
    const api = new this();
    api.request(
      'post',
      ApiPublishSpin + spinCandidateId + '/publish',
      api.headerAuthenticated()
    );
    return api;
  }
  static unpublishSpin(spinCandidateId) {
    const api = new this();
    api.request(
      'post',
      ApiPublishSpin + spinCandidateId + '/unpublish',
      api.headerAuthenticated()
    );
    return api;
  }


  static validateSpin(spinCandidateId) {
    const api = new this();
    api.request(
      'post',
      ApiPublishSpin + spinCandidateId + '/validate',
      api.headerAuthenticated()
    );
    return api;
  }

  static GetUserSpinsBy(username, spinName) {
    const api = new this();
    api.request('get', ApiGetUser + username + '/spins?query=' + spinName);
    return api;
  }

  static GetUserSpin(username, repoName) {
    const api = new this();
    api.request(
      'get',
      ApiGetUser + username + '/spins/' + repoName + '?expand=resources'
    );
    return api;
  }
  static GitUserStats(idOrUsername) {
    const api = new this();
    api.request('get', GetUserStats + idOrUsername);
    return api;
  }
  static GetSpins(params) {
    const api = new this();

    const query = params ? toQuery(params) : '';
    api.request('get', ApiGetSpins + '?' + query + '&expand=resources');
    return api;
  }
  static GetSpin(id) {
    const api = new this();
    api.request('get', `${ApiGetSpins}/${id}?expand=resources`);
    return api;
  }
  static generateUrlDownload(id, idRelease) {
    return `${ApiGetSpins}/${id}/releases/`;
  }
  static GetSpinsBy(param, value) {
    const api = new this();
    api.request('get', ApiGetSpins + '?query=' + value);
    return api;
  }

  static GetTags() {
    const api = new this();
    api.request('get', `${ApiTags}?`, api.headerAuthenticated());
    return api;
  }
  static GetTops() {
    const api = new this();
    api.request('get', ApiTops, api.headerAuthenticated());
    return api;
  }

  request(method, url, headers = {}, params = {}, data = {}) {
    this.promise = new Promise((resolve, reject) => {
      // GET request for remote image
      axios({
        method: method,
        url: url,
        data: data,
        headers: headers,
        params: params
      })
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          this.showError(error);
          reject(new Error(error));

        });
    });
  }

  showError(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error(`[${error.response.status}] ${error.response.statusText}`);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(`Request send but not response: ${error}`);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log(`Error in Request: ${error.message}`);
    }
    console.error(`[${error.config.method}][${error.config.url}]${error}`);
  }

  then(...args) {
    return this.promise.then(...args);
  }

  catch(...args) {
    return this.promise.then(...args);
  }
}

export default Api;
