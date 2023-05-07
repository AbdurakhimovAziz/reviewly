import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useForm } from 'react-hook-form';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { routePaths } from '../../router';
import { RegisterFormValues } from './types';
import { signup } from '../../api';
import { useAppDispatch } from '../../redux';
import { HttpStatusCode, isAxiosError } from 'axios';
import { useState } from 'react';

export const RegisterForm = () => {
  const [formError, setFormError] = useState<string | null>(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>();

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const res = await signup(data);
      if (res.success) {
        navigate(routePaths.LOGIN);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === HttpStatusCode.Conflict) {
          setFormError('Email already exists');
        } else {
          setFormError('Something went wrong. Please try again later');
        }
      }
    }
  };

  return (
    <>
      <Typography component="h1" variant="h5">
        Sign Up
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
          type="email"
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
          id="username"
          label="Username"
          autoComplete="username"
          error={Boolean(errors.username)}
          helperText={errors.username && 'Username is required'}
          {...register('username', { required: true })}
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
          Sign Up
        </Button>
        {formError && (
          <Typography color="error" marginBottom={1} align="center">
            {formError}
          </Typography>
        )}
        <Grid container>
          <Grid item>
            <Typography>
              Already have an account?{' '}
              <Link
                component={RouterLink}
                to={routePaths.LOGIN}
                underline="always"
              >
                Sign In
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
