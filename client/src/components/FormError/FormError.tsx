import { Typography } from '@mui/material';
import { FormErrorProps } from './types';

export const FormError = ({ error }: FormErrorProps) => {
  return (
    <>
      {error && (
        <Typography color="error" marginTop={1} align="center">
          {error}
        </Typography>
      )}
    </>
  );
};
