import { Grid } from '@mui/material';
import { QueryKeys } from 'api';
import { getPosts } from 'api/posts';
import { LoadingComponent } from 'components/LoadingComponent';
import { useQuery } from 'react-query';
import { PostsItem } from '../PostsItem';
import { PostsListProps } from './types';

export const PostsList = ({ sortBy, limit, tag }: PostsListProps) => {
  const { data, isLoading, isError } = useQuery(
    [QueryKeys.POSTS, sortBy, tag],
    () => getPosts({ sortBy, limit, tag })
  );

  if (!data) return <div>No data found</div>;

  return (
    <LoadingComponent isError={isError} isLoading={isLoading}>
      <Grid container spacing={4}>
        {data.map((post) => (
          <PostsItem post={post} key={post._id}></PostsItem>
        ))}
      </Grid>
    </LoadingComponent>
  );
};
