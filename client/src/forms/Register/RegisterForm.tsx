import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { signup } from 'api';
import { HttpStatusCode, isAxiosError } from 'axios';
import { FormError } from 'components/FormError';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { routePaths } from 'router';
import { ErrorMessages } from 'utils';
import { RegisterFormValues } from './types';
import { registerFormFields, schema } from './utils';
import { SocialAuth } from 'forms/SocialAuth';

export const RegisterForm = () => {
  const [formError, setFormError] = useState<string | null>(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = useCallback(
    async (data: RegisterFormValues) => {
      try {
        const res = await signup(data);
        if (res.success) {
          navigate(routePaths.LOGIN);
        }
      } catch (error) {
        if (isAxiosError(error)) {
          if (error.response?.status === HttpStatusCode.Conflict) {
            setFormError(ErrorMessages.DUPLICATE_EMAIL);
          } else {
            setFormError(ErrorMessages.SERVER_ERROR);
          }
        }
      }
    },
    [navigate]
  );

  const handleFormChange = () => setFormError(null);

  return (
    <>
      <Typography component="h1" variant="h5">
        Sign Up
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        onChange={handleFormChange}
        noValidate
        sx={{ mt: 1 }}
      >
        {Object.keys(registerFormFields).map((key) => {
          const field = key as keyof RegisterFormValues;
          const { autocomplete, id, label, type, autofocus } =
            registerFormFields[field];
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
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
          Sign Up
        </Button>
        <FormError error={formError} />
        <SocialAuth isSignUp />
        <Grid container mt={2}>
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
