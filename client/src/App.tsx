import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { getColorMode } from './redux';
import { router } from './router';
import { CssBaseline } from '@mui/material';

function App() {
  const mode = useSelector(getColorMode);
  const theme = useMemo(() => createTheme({ palette: { mode: mode } }), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <Header></Header>
      <Routes>
        {router.map((route) => (
          <Route path={route.path} key={route.path} element={route.component} />
        ))}
      </Routes>
    </ThemeProvider>
  );
}

export default App;
