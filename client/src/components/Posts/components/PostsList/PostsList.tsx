import { Box } from '@mui/material';
import { QueryKeys } from 'api';
import { getPosts } from 'api/posts';
import { useQuery } from 'react-query';
import { PostsItem } from '../PostsItem';
import { PostsListProps } from './types';

export const PostsList = ({ sortBy }: PostsListProps) => {
  const { data, isLoading, isError } = useQuery([QueryKeys.POSTS, sortBy], () =>
    getPosts({ sortBy })
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }
  return (
    <Box display="flex" gap="1rem">
      {data!.map((post) => (
        <PostsItem post={post} key={post._id}></PostsItem>
      ))}
    </Box>
  );
};
