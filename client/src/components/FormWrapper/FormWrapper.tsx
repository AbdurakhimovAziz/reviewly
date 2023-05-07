import { Box, Container } from '@mui/material';
import { PropsWithChildren } from 'react';

export const FormWrapper = ({ children }: PropsWithChildren) => {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        borderRadius={3}
        padding={4}
        boxShadow={4}
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
