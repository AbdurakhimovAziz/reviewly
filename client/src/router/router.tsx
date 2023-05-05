import { HomePage } from '../pages/Home';
import { LoginPage } from '../pages/Login';
import { RegisterPage } from '../pages/Register';
import { routePaths } from './routes';

export const router = [
  {
    path: routePaths.HOME,
    component: <HomePage />,
  },
  {
    path: routePaths.REGISTER,
    component: <RegisterPage />,
  },
  {
    path: routePaths.LOGIN,
    component: <LoginPage />,
  },
];
