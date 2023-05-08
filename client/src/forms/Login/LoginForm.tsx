import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { login } from 'api';
import { getUserById } from 'api/user';
import { HttpStatusCode, isAxiosError } from 'axios';
import { FormError } from 'components/FormError';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { routePaths } from 'router';
import { useAppDispatch } from 'store';
import { setToken, setUser } from 'store/slices/main';
import { ErrorMessages } from 'utils';
import { LoginFormValues } from './types';
import { loginFormFields, schema } from './utils';

export const LoginForm = () => {
  const [formError, setFormError] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const { userId, token, success } = await login(data);
      dispatch(setToken(token));
      if (success) {
        const user = await getUserById(userId);
        dispatch(setUser(user));
        navigate(routePaths.HOME);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === HttpStatusCode.Unauthorized) {
          setFormError(ErrorMessages.INVALID_CREDENTIALS);
        } else {
          setFormError(ErrorMessages.SERVER_ERROR);
        }
      }
    }
  };

  const handleFormChange = () => setFormError(null);

  return (
    <>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box
        component="form"
        onChange={handleFormChange}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{ mt: 1 }}
      >
        {Object.keys(loginFormFields).map((key) => {
          const field = key as keyof LoginFormValues;
          const { autocomplete, id, label, type, autofocus, errorMsg } =
            loginFormFields[field];
          return (
            <TextField
              key={id}
              margin="normal"
              required
              fullWidth
              id={id}
              label={label}
              autoComplete={autocomplete}
              autoFocus={autofocus}
              type={type}
              error={Boolean(errors[field])}
              helperText={errors[field] && errors[field]?.message}
              {...register(field)}
            />
          );
        })}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        <FormError error={formError} />
        <Grid container>
          <Grid item>
            <Typography>
              Don't have an account?{' '}
              <Link
                component={RouterLink}
                to={routePaths.REGISTER}
                underline="always"
              >
                Sign Up
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
