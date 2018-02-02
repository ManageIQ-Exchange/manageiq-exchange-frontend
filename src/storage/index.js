import { User } from '../models/user';

export function recoverUser() {
  let user = new User();

  user.authentication_token = sessionStorage.getItem('authentication_token');
  user.github_id = sessionStorage.getItem('github_id');
  user.github_login = sessionStorage.getItem('github_login');
  user.github_bio = sessionStorage.getItem('github_bio');
  user.github_location = sessionStorage.getItem('github_location');
  user.github_company = sessionStorage.getItem('github_company');
  user.github_avatar_url = sessionStorage.getItem('github_avatar_url');
  user.github_html_url = sessionStorage.getItem('github_html_url');
  user.karma = sessionStorage.getItem('karma');
  user.name = sessionStorage.getItem('name');

  return user;
}

export function deleteUser() {
  let user = new User();

  Object.keys(user).forEach(key => {
    sessionStorage.removeItem(key);
  });
}
