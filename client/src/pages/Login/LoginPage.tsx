import { FormWrapper } from 'components/FormWrapper';
import { LoginForm } from 'forms/Login';
import { Navigate } from 'react-router-dom';
import { routePaths } from 'router';
import { useAppSelector, getUser } from 'store';

export const LoginPage = () => {
  const isAuth = Boolean(useAppSelector(getUser));
  if (isAuth) {
    return <Navigate to={routePaths.HOME} />;
  }

  return (
    <FormWrapper>
      <LoginForm />
    </FormWrapper>
  );
};
