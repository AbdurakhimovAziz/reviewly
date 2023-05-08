import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import { reducer as mainReducer } from './slices/main';
import { reducer as postsReducer } from './slices/posts';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['main'],
};

export const rootReducer = combineReducers({
  main: mainReducer,
  posts: postsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);
