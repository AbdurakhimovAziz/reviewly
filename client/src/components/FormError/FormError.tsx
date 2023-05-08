import { Typography } from '@mui/material';
import { FormErrorProps } from './types';

export const FormError = ({ error }: FormErrorProps) => {
  return (
    <>
      {error && (
        <Typography color="error" marginBottom={1} align="center">
          {error}
        </Typography>
      )}
    </>
  );
};
