import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: {
    data: [],
    status: 'loading',
  },
  tags: {
    data: [],
    status: 'loading',
  },
};

export const posts = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
  },
});

export const { setPosts } = posts.actions;
export const { reducer } = posts;
