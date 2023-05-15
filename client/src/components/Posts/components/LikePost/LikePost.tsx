import { IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { LikePostProps } from './types';
import { useMutation, useQueryClient } from 'react-query';
import { likeUnlikePost } from 'api/posts';
import { QueryKeys } from 'api';

export const LikePost = ({ isLiked, postId }: LikePostProps) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: likeUnlikePost,
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.POSTS]);
    },
  });

  const handleLikeClick = () => mutate(postId);

  return (
    <IconButton aria-label="add to favorites" onClick={handleLikeClick}>
      <FavoriteIcon sx={{ color: isLiked ? 'red' : 'inherit' }} />
    </IconButton>
  );
};
