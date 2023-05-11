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
import FavoriteIcon from '@mui/icons-material/Favorite';
import { PostsItemProps } from './types';
import { useNavigate } from 'react-router-dom';

export const PostsItem = ({ post }: PostsItemProps) => {
  const previewedText = post.body.slice(0, 100);
  const navigate = useNavigate();

  const viewPost = () => navigate(`/posts/${post._id}`);

  return (
    <Grid
      item
      xs={6}
      md={4}
      sx={{
        width: 240,
      }}
    >
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
              height="auto"
              alt="Post Image"
            />
          )}
          <CardContent sx={{ height: '100%' }}>
            <Typography variant="h5" component="h2">
              {post.title}
            </Typography>
            <Typography variant="caption" component="h2">
              Author: {post.author.username}
            </Typography>
            <Typography
              variant="body2"
              marginY={2}
              color="textSecondary"
              component="p"
            >
              {previewedText}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
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
          <IconButton aria-label="add to favorites">
            <FavoriteIcon sx={{ color: 'red' }} />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};
