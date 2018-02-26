import { User } from '../models/user';

export default class providerStorage {
  constructor() {
    this.provider = localStorage;
  }

  static recoverUser() {
    let user = new User();
    let storage = new this();
    let provider = storage.provider;

    user.authentication_token = provider.getItem('authentication_token');
    user.github_id = provider.getItem('github_id');
    user.github_login = provider.getItem('github_login');
    user.github_bio = provider.getItem('github_bio');
    user.github_location = provider.getItem('github_location');
    user.github_company = provider.getItem('github_company');
    user.github_avatar_url = provider.getItem('github_avatar_url');
    user.github_html_url = provider.getItem('github_html_url');
    user.karma = provider.getItem('karma');
    user.name = provider.getItem('name');

    return user;
  }

  static deleteUser() {
    let user = new User();
    let storage = new this();
    let provider = storage.provider;
    Object.keys(user).forEach(key => {
      provider.removeItem(key);
    });
  }

  static sessionUserDataSave(data) {
    let storage = new this();
    let provider = storage.provider;

    provider.setItem('authentication_token', data.authentication_token);
    provider.setItem('github_id', data.user.github_id);
    provider.setItem('github_login', data.user.github_login);
    provider.setItem('github_bio', data.user.github_bio);
    provider.setItem('github_location', data.user.github_location);
    provider.setItem('github_company', data.user.github_company);
    provider.setItem('github_avatar_url', data.user.github_avatar_url);
    provider.setItem('github_html_url', data.user.github_html_url);
    provider.setItem('karma', data.user.karma);
    provider.setItem('name', data.user.name);
  }

  static getItem(item) {
    let storage = new this();
    let provider = storage.provider;

    return provider.getItem(item);
  }
}
