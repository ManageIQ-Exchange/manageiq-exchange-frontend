export class User {
  name: string;
  admin: boolean;
  staff: boolean;
  karma: integer;
  github_avatar_url: string;
  github_html_url: string;
  github_id: string;
  github_login: string;
  github_company: string;
  github_type: string;
  github_blog: string;
  github_location: string;
  github_bio: string;
  github_created_at: datetime;
  github_updated_at: datetime;
  email: string;
  remember_created_at: datetime;
  sign_in_count: integer;
  current_sign_in_at: datetime;
  last_sign_in_at: datetime;
  current_sign_in_ip: inet;
  last_sign_in_ip: inet;
  updated_at: datetime;
  created_at: datetime;
  authentication_token: string;
  logged: boolean;

  constructor() {
    this.github_id = "";
    this.login = "";
    this.github_login = "";
    this.url_profile = "";
    this.name = "";
    this.avatar =  "";
    this.company = "";
    this.github_type = "";
    this.github_blog = "";
    this.github_location = "";
    this.github_bio = "";
    this.github_created_at = "";
    this.github_updated_at = "";
    this.authentication_token = "";
    this.staff = "";
    this.karma = "";
    this.github_avatar_url = "";
    this.github_company = "";
    this.github_html_url = "";
    this.logged = false;
  }
}
