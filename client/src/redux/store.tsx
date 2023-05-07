import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { reducer as mainReducer } from './slices/main';
import { reducer as postsReducer } from './slices/posts';

export const rootReducer = combineReducers({
  main: mainReducer,
  posts: postsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
