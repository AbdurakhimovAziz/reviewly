import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { reducer as appReducer } from './slices/app';
import { reducer as postsReducer } from './slices/posts';

export const rootReducer = combineReducers({
  app: appReducer,
  posts: postsReducer,
});

// export const setupStore = (preloadedState?: PreloadedState<RootState>) =>
//   configureStore({
//     reducer: rootReducer,
//     preloadedState,
//   });

export const store = configureStore({
  reducer: rootReducer,
});
