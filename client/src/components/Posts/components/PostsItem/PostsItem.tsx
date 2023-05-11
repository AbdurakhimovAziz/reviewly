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
import { useNavigate } from 'react-router-dom';
import { PostsItemProps } from './types';

export const PostsItem = ({ post }: PostsItemProps) => {
  const navigate = useNavigate();

  const viewPost = () => navigate(`/posts/${post._id}`);

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
          <IconButton aria-label="add to favorites">
            <FavoriteIcon sx={{ color: 'red' }} />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};
