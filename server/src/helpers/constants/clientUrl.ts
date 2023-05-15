// export const CLIENT_URL = 'http://localhost:5173';
export const CLIENT_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://reviewly-project.netlify.app'
    : 'http://localhost:5173';
