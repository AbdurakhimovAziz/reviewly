import { CircularProgress, Stack, Typography } from '@mui/material';
import { getTags } from 'api/tags';
import { useQuery } from 'react-query';
import { Tag } from './components/Tag';

export const Tags = () => {
  const { data, isError, isLoading } = useQuery('tags', () => getTags());

  if (isLoading) return <CircularProgress />;
  if (isError) return <div>Error</div>;

  return (
    <>
      <Typography variant="h4">Tags</Typography>
      <Stack direction="row" spacing={1} flexWrap="wrap" paddingY={2}>
        {data?.length ? (
          data!.map((tag) => <Tag tag={tag} key={tag._id} />)
        ) : (
          <Typography>No tags found</Typography>
        )}
      </Stack>
    </>
  );
};
