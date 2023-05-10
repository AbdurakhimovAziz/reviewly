import { RootState } from './types';

export const getColorMode = (state: RootState) => state.main.colorMode;
export const getUser = (state: RootState) => state.main.user;
export const getToken = (state: RootState) => state.main.token;
