import { CircularProgress, Stack, Typography } from '@mui/material';
import { getTags } from 'api/tags';
import { useQuery } from 'react-query';
import { TagsList } from './components/TagsList';

export const Tags = () => {
  const { data, isError, isLoading } = useQuery('tags', () => getTags());

  if (isLoading) return <CircularProgress />;
  if (isError) return <div>Error</div>;
  if (!data) return <div>No tags found</div>;

  return (
    <>
      <Typography variant="h4">Tags</Typography>
      <TagsList tags={data} />
    </>
  );
};
