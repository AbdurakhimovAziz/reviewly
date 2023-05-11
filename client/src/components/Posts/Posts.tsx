import { Button, Stack, Typography } from '@mui/material';
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { routePaths } from 'router';
import { sortParam } from 'utils';
import { PostsList } from './components/PostsList';
import { PostsProps } from './types';
import { sortOptionTitleMap } from './utils';

export const Posts = ({}: PostsProps) => {
  const navigate = useNavigate();
  const goToPostsPage = (sortBy: sortParam) => {
    navigate(routePaths.POSTS, {
      state: { sortBy },
    });
  };

  return (
    <Stack gap={2}>
      {(Object.entries(sortOptionTitleMap) as [sortParam, string][]).map(
        ([option, title]) => (
          <Fragment key={option}>
            <Typography variant="h4">{title}</Typography>
            <PostsList sortBy={option} />
            <Button onClick={() => goToPostsPage(option)}>View more</Button>
          </Fragment>
        )
      )}
    </Stack>
  );
};
