import { createSlice } from '@reduxjs/toolkit';
import { theme } from '../../utils/constants';
import { MainState } from '../types';

const initialState: MainState = {
  colorMode: theme.LIGHT,
  user: null,
  token: null,
};

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    changeColorMode: (state) => {
      state.colorMode =
        state.colorMode === theme.LIGHT ? theme.DARK : theme.LIGHT;
    },
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { changeColorMode, login, logout, setUser } = mainSlice.actions;

export const { reducer } = mainSlice;
