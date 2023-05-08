import { createSlice } from '@reduxjs/toolkit';
import { MainState } from 'store';
import { theme } from 'utils';

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
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { changeColorMode, setToken, setLogout, setUser } =
  mainSlice.actions;

export const { reducer } = mainSlice;
