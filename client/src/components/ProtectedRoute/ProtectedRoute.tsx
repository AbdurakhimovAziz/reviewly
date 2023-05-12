import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { routePaths } from 'router';
import { getUser, useAppSelector } from 'store';

export const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const user = useAppSelector(getUser);
  const isAuth = Boolean(user);

  if (!isAuth) return <Navigate to={routePaths.HOME} />;
  return <>{children}</>;
};
