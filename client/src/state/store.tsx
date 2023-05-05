import {
  combineReducers,
  configureStore,
  PreloadedState,
} from '@reduxjs/toolkit';
import { reducer as appReducer } from '.';
import { RootState } from './types';

export const rootReducer = combineReducers({
  app: appReducer,
});

// export const setupStore = (preloadedState?: PreloadedState<RootState>) =>
//   configureStore({
//     reducer: rootReducer,
//     preloadedState,
//   });

export const store = configureStore({
  reducer: rootReducer,
});
