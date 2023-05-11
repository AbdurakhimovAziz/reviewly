import { Box, Button, CircularProgress, Grid } from '@mui/material';
import { QueryKeys } from 'api';
import { getPosts } from 'api/posts';
import { useQuery } from 'react-query';
import { PostsItem } from '../PostsItem';
import { PostsListProps } from './types';

export const PostsList = ({ sortBy, limit }: PostsListProps) => {
  const { data, isLoading, isError } = useQuery([QueryKeys.POSTS, sortBy], () =>
    getPosts({ sortBy, limit })
  );

  if (isLoading) {
    return <CircularProgress />;
  }
  if (isError) {
    return <div>Error</div>;
  }
  return (
    <Grid container spacing={4}>
      {data!.map((post) => (
        <PostsItem post={post} key={post._id}></PostsItem>
      ))}
    </Grid>
  );
};
