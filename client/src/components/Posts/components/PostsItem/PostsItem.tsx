import Box from '@mui/material/Box';
import { PostsItemProps } from './types';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';

export const PostsItem = ({ post }: PostsItemProps) => {
  return (
    <Card sx={{ maxWidth: 240 }}>
      {post.imageUrl && (
        <CardMedia
          component="img"
          image={post.imageUrl}
          height="auto"
          alt="Post Image"
        />
      )}
      <CardContent>
        <Typography variant="h5" component="h2">
          {post.title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {post.body}
        </Typography>
      </CardContent>
    </Card>
  );
};
