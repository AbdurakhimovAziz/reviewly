import { CircularProgress, Grid } from '@mui/material';
import { QueryKeys } from 'api';
import { getPosts } from 'api/posts';
import { useQuery } from 'react-query';
import { PostsItem } from '../PostsItem';
import { PostsListProps } from './types';

export const PostsList = ({ sortBy, limit, tag }: PostsListProps) => {
  const { data, isLoading, isError, isFetching } = useQuery(
    [QueryKeys.POSTS, sortBy],
    () => getPosts({ sortBy, limit, tag })
  );

  if (isLoading || isFetching) {
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
