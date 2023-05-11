import { Box, Container, Typography } from '@mui/material';
import { Posts } from 'components/Posts';

export const HomePage = () => {
  return (
    <Box paddingX={4} paddingY={5}>
      <Posts />
    </Box>
  );
};
