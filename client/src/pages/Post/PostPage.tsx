import {
  Box,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from '@mui/material';
import { QueryKeys } from 'api';
import { getPost } from 'api/posts/getPost';
import { TagsList } from 'components/Tags/components/TagsList';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { useQuery } from 'react-query';
import { Navigate, useParams } from 'react-router-dom';
import { routePaths } from 'router';

export const PostPage = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) return <Navigate to={routePaths.HOME} />;

  const {
    data: post,
    isLoading,
    isError,
  } = useQuery([QueryKeys.POST, id], () => getPost(id));

  if (isLoading) return <CircularProgress />;
  if (isError) return <div>error</div>;
  if (!post) return <Navigate to={routePaths.HOME} />;

  return (
    <Container sx={{ paddingY: 4 }}>
      <Stack direction="column" spacing={2}>
        <Typography variant="h1">{post.title}</Typography>
        <Box component="img" src={post.imageUrl} />
        <Stack direction="row" spacing={1}>
          <Typography variant="h6" component="h2">
            By {post.author.username}
          </Typography>
          <Typography variant="h6" component="h2">
            on {new Date(post.createdAt).toLocaleDateString()}
          </Typography>
        </Stack>
        <Typography variant="h6" component="h2">
          Grade: {post.grade}/10
        </Typography>
        <Typography variant="h6">
          Reviewed item: <ReactMarkdown>{post.reviewedItem}</ReactMarkdown>
        </Typography>
        <Box paddingY={2}>
          <ReactMarkdown>{post?.body}</ReactMarkdown>
        </Box>
        <Box paddingY={2}>
          <TagsList tags={post.tags} />
        </Box>
      </Stack>
    </Container>
  );
};
