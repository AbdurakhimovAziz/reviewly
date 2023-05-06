import { RootState } from './types';

export const getMode = (state: RootState) => state.app.mode;
export const getUser = (state: RootState) => state.app.user;
export const getToken = (state: RootState) => state.app.token;
export const getPosts = (state: RootState) => state.posts.posts;
export const getTags = (state: RootState) => state.posts.tags;
