import { formFieldType } from 'forms/types';
import * as yup from 'yup';
import { RegisterFormValues } from './types';

export const schema = yup.object<RegisterFormValues>().shape({
  email: yup.string().email().required(),
  username: yup.string().required().min(3).max(20),
  password: yup.string().required().min(8).max(20),
});

export const registerFormFields: formFieldType<RegisterFormValues> = {
  email: {
    id: 'email',
    label: 'Email Address',
    type: 'email',
    autocomplete: 'email',
    autofocus: true,
  },
  username: {
    id: 'username',
    label: 'Username',
    type: 'text',
    autocomplete: 'username',
  },
  password: {
    id: 'password',
    label: 'Password',
    type: 'password',
    autocomplete: 'current-password',
  },
};
