import { FormWrapper } from 'components/FormWrapper';
import { RegisterForm } from 'forms/Register';
import { Navigate } from 'react-router-dom';
import { routePaths } from 'router';
import { useAppSelector, getUser } from 'store';

export const RegisterPage = () => {
  const isAuth = Boolean(useAppSelector(getUser));
  if (isAuth) {
    return <Navigate to={routePaths.HOME} />;
  }
  return (
    <FormWrapper>
      <RegisterForm></RegisterForm>
    </FormWrapper>
  );
};
