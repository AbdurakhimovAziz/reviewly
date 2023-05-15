import { IconButton, Stack, Tooltip } from '@mui/material';
import { Delete as DeleteIcon, Edit, Visibility } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { QueryKeys } from 'api';
import { deletePost } from 'api/posts';
import { useMutation, useQueryClient } from 'react-query';
import { TableActionsProps } from './types';

export const TableActions = ({ postId }: TableActionsProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.POSTS]);
    },
  });

  const handleDeleteClick = () => mutate(postId);
  const handlePreviewClick = () => navigate(`/posts/${postId}`);

  return (
    <Stack gap={1} direction="row">
      <Tooltip title="Delete">
        <IconButton color="error" onClick={handleDeleteClick}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Edit">
        <IconButton color="info">
          <Edit />
        </IconButton>
      </Tooltip>
      <Tooltip title="View" onClick={handlePreviewClick}>
        <IconButton color="inherit">
          <Visibility />
        </IconButton>
      </Tooltip>
    </Stack>
  );
};
