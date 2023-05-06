import { Header } from './components/Header';
import { Route, Routes } from 'react-router-dom';
import { router } from './router';
import { useSelector } from 'react-redux';
import { getMode } from './redux';
import { useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { themeSettings } from './theme';

function App() {
  const mode = useSelector(getMode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <ThemeProvider theme={theme}>
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
