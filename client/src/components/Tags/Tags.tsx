import { getTags } from 'api/tags';
import { useQuery } from 'react-query';

export const Tags = () => {
  const { data, isError, isLoading } = useQuery('tags', () => getTags());

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return <div>Tags</div>;
};
