export class User {
  github_id: string;
  login: string;
  url_profile: string;
  name: string;
  avatar: string;
  company: string;
  github_type: string;
  github_blog: string;
  github_location: string;
  github_bio: string;
  github_created_at: string;
  github_updated_at: string;
  logged: boolean;

  constructor() {
    this.github_id = "";
    this.login = "";
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
    this.logged = false;
  }
}
