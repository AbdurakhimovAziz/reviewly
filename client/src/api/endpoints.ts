// export const BASE_URL = 'http://localhost:3000';
export const BASE_URL = 'https://reviewly-server.onrender.com';
export enum endpoints {
  login = '/auth/login',
  register = '/auth/register',
  users = '/users',
  profile = '/auth/profile',
  google = '/auth/google',
  github = '/auth/github',
  posts = '/posts',
  post = '/posts/:id',
}
