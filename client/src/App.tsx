import { Container, CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { getUserById } from 'api/user';
import { ProtectedRoute } from 'components/ProtectedRoute';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { setToken, setUser } from 'store/slices/main';
import { Header } from './components/Header';
import { router } from './router';
import { getColorMode } from './store';
import { getTheme } from './theme';

function App() {
  const mode = useSelector(getColorMode);
  const dispatch = useDispatch();
  const theme = useMemo(() => createTheme(getTheme(mode)), [mode]);

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
          {router.map(({ path, isProtected, component }) => (
            <Route
              path={path}
              key={path}
              element={
                isProtected ? (
                  <ProtectedRoute>{component}</ProtectedRoute>
                ) : (
                  component
                )
              }
            />
          ))}
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
