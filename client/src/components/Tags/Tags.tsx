import { Typography } from '@mui/material';
import { getTags } from 'api/tags';
import { LoadingComponent } from 'components/LoadingComponent';
import { useQuery } from 'react-query';
import { TagsList } from './components/TagsList';

export const Tags = () => {
  const { data, isError, isLoading } = useQuery('tags', () => getTags());
  if (!data) return <div>No tags found</div>;

  return (
    <LoadingComponent isError={isError} isLoading={isLoading}>
      <Typography variant="h4">Tags</Typography>
      <TagsList tags={data} />
    </LoadingComponent>
  );
};
