const config = {
  version: '1.0',
  GALAXY_API_BACKEND: process.env.GALAXY_API_BACKEND
    ? process.env.GALAXY_API_BACKEND
    : 'http://backend1-myproject.192.168.42.197.nip.io/',
  GALAXY_API_VERSION: 'v1',
  GITHUB_OAUTH_ID: process.env.GITHUB_OAUTH_ID
    ? process.env.GITHUB_OAUTH_ID
    : '3e7f2871ca45fbcbb171',
  GITHUB_REDIRECTUI: ''
};

export default config;
