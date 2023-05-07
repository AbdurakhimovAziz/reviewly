import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { HttpStatusCode, isAxiosError } from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { login } from '../../api';
import { useAppDispatch } from '../../redux';
import { routePaths } from '../../router';
import { LoginFormValues } from './types';
import { getUserById } from '../../api/user';
import { setToken, setUser } from '../../redux/slices/main';

export const LoginForm = () => {
  const [formError, setFormError] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

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
          setFormError('Invalid email or password');
        } else {
          setFormError('Something went wrong. Please try again later');
        }
      }
    }
  };

  return (
    <>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{ mt: 1 }}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          autoComplete="email"
          autoFocus
          error={Boolean(errors.email)}
          helperText={errors.email && 'Email is required'}
          {...register('email', { required: true })}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          error={Boolean(errors.password)}
          helperText={errors.password && 'Password is required'}
          {...register('password', { required: true })}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        {formError && (
          <Typography color="error" marginBottom={1} align="center">
            {formError}
          </Typography>
        )}
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
