import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { TagItem } from '../Tag';
import { TagsListProps } from './types';

export const TagsList = ({ tags }: TagsListProps) => {
  return (
    <Stack direction="row" spacing={1} flexWrap="wrap" paddingY={2}>
      {tags?.length ? (
        tags!.map((tag) => <TagItem tag={tag} key={tag._id} />)
      ) : (
        <Typography>No tags found</Typography>
      )}
    </Stack>
  );
};
