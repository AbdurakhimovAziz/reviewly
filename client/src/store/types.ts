import { User } from 'interfaces/User';
import { theme } from 'utils';
import { store, rootReducer } from './store';

export type AppStore = typeof store;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export interface MainState {
  user: User | null;
  token: string | null;
  colorMode: theme;
}
