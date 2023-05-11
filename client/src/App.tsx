import { Container, CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { getUserById } from 'api/user';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { setToken, setUser } from 'store/slices/main';
import { Header } from './components/Header';
import { router } from './router';
import { getColorMode } from './store';

function App() {
  const mode = useSelector(getColorMode);
  const dispatch = useDispatch();
  const theme = useMemo(() => createTheme({ palette: { mode: mode } }), [mode]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const userId = urlParams.get('userId');

    if (token && userId) {
      dispatch(setToken(token));
      getUserById(userId).then((user) => dispatch(setUser(user)));
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <Header></Header>
      <Container>
        <Routes>
          {router.map((route) => (
            <Route
              path={route.path}
              key={route.path}
              element={route.component}
            />
          ))}
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
