import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from '@mui/material';
import { PostsList } from 'components/Posts/components/PostsList';
import { sortOptionValueMap, sortOptions } from 'components/Posts/utils';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { sortParam } from 'utils';

export const PostsPage = () => {
  const { state } = useLocation();
  const [sortBy, setSortBy] = useState<sortParam>(
    state?.sortBy || sortParam.DATE
  );
  const [limit, setLimit] = useState(30);
  const tag: string | undefined = state?.tag;

  const handleSelectChange = (event: SelectChangeEvent) => {
    setSortBy(event.target.value as sortParam);
  };

  return (
    <Box paddingY={4}>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="space-between"
        marginBottom={2}
      >
        <Typography variant="h4">
          Posts{' '}
          {tag && (
            <Typography component="span" variant="h5" color="success">
              with tag {tag}
            </Typography>
          )}
        </Typography>

        <FormControl>
          <InputLabel id="sort-option">Sort By</InputLabel>
          <Select
            labelId="sort-option"
            id="sort-option-select"
            value={sortBy}
            label="sortBy"
            onChange={handleSelectChange}
          >
            {sortOptions.map((option) => (
              <MenuItem value={option} key={option}>
                {sortOptionValueMap[option]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
      <PostsList sortBy={sortBy} limit={limit} tag={tag} />
    </Box>
  );
};
