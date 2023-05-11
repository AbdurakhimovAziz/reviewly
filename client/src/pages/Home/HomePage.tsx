import { Box, Container, Typography } from '@mui/material';
import { Posts } from 'components/Posts';
import { Tags } from 'components/Tags';

export const HomePage = () => {
  return (
    <Box paddingX={4} paddingY={5}>
      <Tags />
      <Posts />
    </Box>
  );
};
