import { Autocomplete, Chip, TextField } from '@mui/material';
import { QueryKeys } from 'api';
import { getTags } from 'api/tags';
import { useMemo } from 'react';
import { Controller } from 'react-hook-form';
import { useQuery } from 'react-query';
import { TagsInputProps } from './types';
import { replaceSpacesWithDashes } from './utils';

export const TagsInput = ({ control, errors, defaultTags }: TagsInputProps) => {
  const { data: tags } = useQuery([QueryKeys.TAGS], () => getTags(100), {
    initialData: [],
  });

  const tagNames = useMemo(
    () => defaultTags?.map(({ name }) => name),
    [defaultTags]
  );

  return (
    <>
      {tags && (
        <Controller
          name="tagNames"
          control={control}
          defaultValue={tagNames || []}
          render={({ field }) => (
            <Autocomplete
              {...field}
              sx={{ marginBottom: 2 }}
              multiple
              id="tags"
              options={tags.map(({ name }) => name)}
              freeSolo
              onChange={(_, value) =>
                field.onChange(
                  value.map((name) => replaceSpacesWithDashes(name))
                )
              }
              renderTags={(value: readonly string[], getTagProps) =>
                value.map((option: string, index: number) => (
                  <Chip
                    variant="outlined"
                    color="primary"
                    label={option}
                    {...getTagProps({ index })}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="tags"
                  placeholder="Favorites"
                  error={Boolean(errors.tagNames)}
                  helperText={errors.tagNames?.message}
                />
              )}
            />
          )}
        />
      )}
    </>
  );
};
