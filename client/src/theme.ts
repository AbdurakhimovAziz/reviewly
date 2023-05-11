import { theme } from './utils';

export const getTheme = (mode: theme) => {
  return {
    palette: {
      mode: mode,
      primary: {
        main: '#16a085',
      },
      secondary: {
        main: '#de354e',
      },
      success: {
        main: '#16a03f',
      },
    },
    typography: {
      fontFamily: ['Roboto', 'sans-serif'].join(','),
      fontSize: 12,
      h1: {
        fontFamily: ['Roboto', 'sans-serif'].join(','),
        fontSize: 40,
      },
      h2: {
        fontFamily: ['Roboto', 'sans-serif'].join(','),
        fontSize: 32,
      },
      h3: {
        fontFamily: ['Roboto', 'sans-serif'].join(','),
        fontSize: 24,
      },
      h4: {
        fontFamily: ['Roboto', 'sans-serif'].join(','),
        fontSize: 20,
      },
      h5: {
        fontFamily: ['Roboto', 'sans-serif'].join(','),
        fontSize: 16,
      },
      h6: {
        fontFamily: ['Roboto', 'sans-serif'].join(','),
        fontSize: 14,
      },
    },
  };
};

export type Theme = ReturnType<typeof getTheme>;
