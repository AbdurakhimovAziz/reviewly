import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import { QueryKeys } from 'api';
import { deletePost } from 'api/posts';
import ReactMarkdown from 'react-markdown';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { getUser, useAppSelector } from 'store';
import { PostsItemProps } from './types';
import { LikePost } from '../LikePost';

export const PostsItem = ({ post }: PostsItemProps) => {
  const navigate = useNavigate();
  const user = useAppSelector(getUser);
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.POSTS, post._id]);
    },
  });

  const viewPost = () => navigate(`/posts/${post._id}`);
  const handleDeleteClick = () => mutate(post._id);

  return (
    <Grid item xs={6} md={4}>
      <Card
        elevation={5}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <CardActionArea sx={{ flexGrow: 1 }} onClick={viewPost}>
          {post.imageUrl && (
            <CardMedia
              component="img"
              image={post.imageUrl}
              height={200}
              width={150}
              alt="Post Image"
              sx={{
                objectFit: 'cover',
              }}
            />
          )}
          <CardContent sx={{ height: '100%' }}>
            <Typography variant="h5" fontWeight="bold" component="h2">
              {post.title}
            </Typography>
            <Typography variant="caption" component="h2">
              By
              <Typography component="span" fontWeight="bold" marginLeft={1}>
                {post.author.username}
              </Typography>
            </Typography>
            <Typography
              variant="body2"
              marginY={2}
              color="textSecondary"
              component="p"
            >
              {post.previewText}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              fontWeight="bold"
              component="p"
            >
              Grade: {post.grade}/10
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions
          sx={{
            marginTop: 'auto',
          }}
        >
          <Button size="small" onClick={viewPost}>
            Read more
          </Button>
          {user && (
            <LikePost postId={post._id} isLiked={user._id in post.likes} />
          )}
          {user && user?._id === post.author._id && (
            <IconButton
              color="error"
              aria-label="delete"
              onClick={handleDeleteClick}
            >
              <DeleteIcon />
            </IconButton>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
};
