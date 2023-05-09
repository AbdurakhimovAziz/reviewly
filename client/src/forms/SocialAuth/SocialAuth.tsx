import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import { Box, Button, Typography } from '@mui/material';
import { endpoints } from 'api';
import axiosInstance from 'api/axios';
import { SocialAuthProps } from './types';

export const SocialAuth = ({ isSignUp }: SocialAuthProps) => {
  const buttonTxt = isSignUp ? 'Sign Up' : 'Sign in';

  const handleGoogleAuth = () =>
    window.open(
      `${axiosInstance.defaults.baseURL}${endpoints.google}`,
      '_self'
    );

  const handleGithubAuth = () =>
    window.open(
      `${axiosInstance.defaults.baseURL}${endpoints.github}`,
      '_self'
    );

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        marginTop: '0.5rem',
      }}
    >
      <Typography variant="body2" color="text.secondary" align="center">
        OR
      </Typography>
      <Button
        onClick={handleGoogleAuth}
        variant="outlined"
        fullWidth
        startIcon={<GoogleIcon />}
      >
        {buttonTxt} with Google
      </Button>
      <Button
        onClick={handleGithubAuth}
        variant="outlined"
        fullWidth
        startIcon={<GitHubIcon />}
      >
        {buttonTxt} with GitHub
      </Button>
    </Box>
  );
};
