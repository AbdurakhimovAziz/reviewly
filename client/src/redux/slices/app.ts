import { createSlice } from '@reduxjs/toolkit';
import { theme } from '../../utils/constants';

const initialState = {
  colorMode: theme.LIGHT,
  user: null,
  token: null,
};

export const appSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    changeColorMode: (state) => {
      state.colorMode =
        state.colorMode === theme.LIGHT ? theme.DARK : theme.LIGHT;
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { changeColorMode, setLogin, setLogout } = appSlice.actions;

export const { reducer } = appSlice;
