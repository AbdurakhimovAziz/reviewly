import * as yup from 'yup';
import { formFieldType } from '../types';
import { LoginFormValues } from './types';

export const schema = yup.object<LoginFormValues>().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(8).max(20),
});

export const loginFormFields: formFieldType<LoginFormValues> = {
  email: {
    id: 'email',
    label: 'Email Address',
    type: 'email',
    autocomplete: 'email',
    autofocus: true,
  },
  password: {
    id: 'password',
    label: 'Password',
    type: 'password',
    autocomplete: 'current-password',
  },
};
