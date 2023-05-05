import React from 'react';
import { Container } from 'react-bootstrap';
import { Header } from './components/Header';
import { LoginForm } from './forms/Login';
import { Route, Routes } from 'react-router-dom';
import { router } from './router';

function App() {
  return (
    <>
      <Routes>
        {router.map((route) => (
          <Route
            path={route.path}
            key={route.path}
            element={<Container>{route.component}</Container>}
          />
        ))}
      </Routes>
    </>
  );
}

export default App;
