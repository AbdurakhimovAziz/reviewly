import { Button, Container, Stack, Typography } from '@mui/material';
import { QueryKeys } from 'api';
import { getUserPosts } from 'api/user/getUserPosts';
import { LoadingComponent } from 'components/LoadingComponent';
import { UsersPostsTable } from 'components/UsersPostsTable';
import { useQuery } from 'react-query';
import { Link, Navigate, useParams } from 'react-router-dom';
import { routePaths } from 'router';
import { getUser, useAppSelector } from 'store';
import { isAllowedToModify } from 'utils';

export const ProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const user = useAppSelector(getUser)!;

  if (!id) return <Navigate to={routePaths.HOME} />;

  if (!isAllowedToModify(user, id)) return <Navigate to={routePaths.HOME} />;

  const {
    data: posts,
    isLoading,
    isError,
  } = useQuery([QueryKeys.POSTS, id], () => getUserPosts(id));

  if (!posts) return null;

  return (
    <LoadingComponent isLoading={isLoading} isError={isError}>
      <Container maxWidth="lg" sx={{ paddingY: 2 }}>
        <Stack gap={2} marginBottom={2}>
          <Typography variant="h2">Profile</Typography>
          <Typography variant="h4"> username: {user.username} </Typography>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h3">Your posts: </Typography>
            <Button
              component={Link}
              to={routePaths.CREATE_POST}
              variant="contained"
              color="info"
            >
              Create Post
            </Button>
          </Stack>
        </Stack>

        <UsersPostsTable posts={posts} />
      </Container>
    </LoadingComponent>
  );
};
