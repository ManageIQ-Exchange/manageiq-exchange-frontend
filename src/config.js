const config = {
  version: '1.0',
  EXCHANGE_API_BACKEND: process.env.EXCHANGE_API_BACKEND
    ? process.env.EXCHANGE_API_BACKEND
    : 'http://backend2-galaxy.192.168.42.246.nip.io/',
  EXCHANGE_API_VERSION: 'v1',
  GITHUB_OAUTH_ID: process.env.GITHUB_OAUTH_ID
    ? process.env.GITHUB_OAUTH_ID
    : '3e7f2871ca45fbcbb171',
  GITHUB_REDIRECTUI: ''
};

export default config;
