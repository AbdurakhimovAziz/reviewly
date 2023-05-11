import Chip from '@mui/material/Chip';
import { useNavigate } from 'react-router-dom';
import { TagProps } from './types';
import { routePaths } from 'router';

export const TagItem = ({ tag }: TagProps) => {
  const navigate = useNavigate();
  const goToPostsPage = () => {
    navigate(`${routePaths.POSTS}`, {
      state: { tag: tag.name },
    });
  };

  return (
    <Chip
      label={`#${tag.name}`}
      component="button"
      variant="outlined"
      onClick={goToPostsPage}
      color="primary"
      clickable
      sx={{ marginBottom: 2 }}
    />
  );
};
