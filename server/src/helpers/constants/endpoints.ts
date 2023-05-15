export const Endpoints = {
  AUTH: {
    BASE: '/auth',
    LOGIN: '/login',
    REGISTER: '/register',
    GRANT_ADMIN: '/grant-admin',
    PROFILE: '/profile',
    GOOGLE: '/google',
    GOOGLE_REDIRECT: '/google/redirect',
    GITHUB: '/github',
    GITHUB_REDIRECT: '/github/redirect',
  },

  USERS: {
    BASE: '/users',
    GET_ALL: '/',
    GET_ONE: '/:id',
    UPDATE: '/:id',
    DELETE: '/:id',
    GET_POSTS: '/:id/posts',
  },

  POSTS: {
    BASE: '/posts',
    GET_ALL: '/',
    GET_ONE: '/:id',
    CREATE: '/',
    UPDATE: '/:id',
    DELETE: '/:id',
    LIKE: '/:id/like',
  },
};
