import { RootState } from './types';

export const getColorMode = (state: RootState) => state.app.colorMode;
export const getUser = (state: RootState) => state.app.user;
export const getToken = (state: RootState) => state.app.token;
export const getPosts = (state: RootState) => state.posts.posts;
export const getTags = (state: RootState) => state.posts.tags;
