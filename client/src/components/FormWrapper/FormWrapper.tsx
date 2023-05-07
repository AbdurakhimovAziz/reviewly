import { Container, CssBaseline, Box } from '@mui/material';
import { PropsWithChildren } from 'react';

export const FormWrapper = ({ children }: PropsWithChildren) => {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {children}
      </Box>
    </Container>
  );
};
