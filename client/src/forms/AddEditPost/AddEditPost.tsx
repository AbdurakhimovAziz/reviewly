import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Container,
  MenuItem,
  Paper,
  Rating,
  TextField,
  Typography,
} from '@mui/material';
import { QueryKeys } from 'api';
import { createPost } from 'api/posts/createPost';
import { uploadImage } from 'api/posts/uploadImage';
import { getTags } from 'api/tags';
import 'easymde/dist/easymde.min.css';
import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Controller, set, useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import SimpleMDE from 'react-simplemde-editor';
import { getUser, useAppSelector } from 'store';
import {
  AddEditPostFormValues,
  AddEditPostProps,
  AddEditPostTextField,
  AddEditPostTextFields,
  FileWithPreview,
  PostCreateRequest,
} from './types';

export const AddEditPostForm = ({ post }: AddEditPostProps) => {
  const [bodyText, setBodyText] = useState('');
  const [image, setImage] = useState<FileWithPreview | null>(null);
  const user = useAppSelector(getUser);
  const navigate = useNavigate();
  const { data: tags } = useQuery([QueryKeys.TAGS], () => getTags(100), {
    initialData: [],
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<AddEditPostFormValues>();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const img = acceptedFiles[0] as FileWithPreview;
    img.preview = URL.createObjectURL(img);
    setImage(img);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg'],
    },
    maxFiles: 1,
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: createPost,
    onSuccess: (data) => {
      console.log(data);
      navigate(`/posts/${data._id}`);
    },
  });

  const handleBodyChange = useCallback(
    (value: string) => {
      setBodyText(value);
    },
    [bodyText]
  );

  const onSubmit = useCallback(
    async (formValues: AddEditPostFormValues) => {
      if (!user) return;

      const newPost: PostCreateRequest = {
        ...formValues,
        grade: Number(formValues.grade),
        body: bodyText,
        author: user._id,
        previewText: bodyText.slice(0, 100),
      };

      if (image) {
        const { url } = await uploadImage(image);
        newPost.imageUrl = url;
      }

      mutate(newPost);
    },
    [image]
  );

  return (
    <Container
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ paddingY: 4 }}
    >
      {Object.keys(AddEditPostTextFields).map((key) => {
        const field = key as keyof AddEditPostTextField;
        const { autocomplete, id, label, type, autofocus, options } =
          AddEditPostTextFields[field];
        return (
          <TextField
            key={id}
            margin="normal"
            required
            fullWidth
            id={id}
            label={label}
            type={type}
            autoFocus={autofocus}
            autoComplete={autocomplete}
            {...register(field)}
            select={options ? true : false}
            error={Boolean(errors[field])}
            helperText={errors[field]?.message}
            defaultValue={post ? post[field] : options ? options[0] : undefined}
          >
            {options &&
              options.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
          </TextField>
        );
      })}

      <Controller
        name="grade"
        control={control}
        defaultValue={2}
        render={({ field }) => (
          <>
            <Typography>Grade: </Typography> <Rating max={10} {...field} />
          </>
        )}
      />

      <Box component="div" marginY={4} {...getRootProps()}>
        <input accept="iamge/*" {...getInputProps()} />
        {image ? (
          <Paper width="100%" component="img" src={image.preview} />
        ) : isDragActive ? (
          <Paper sx={{ padding: 4 }} className="dropzone">
            Drop your image files here
          </Paper>
        ) : (
          <Paper sx={{ padding: 4 }} className="dropzone">
            Drag and drop some files here, or click to select files
          </Paper>
        )}
      </Box>

      <SimpleMDE onChange={handleBodyChange} defaultValue={post?.body} />

      {tags && (
        <Controller
          name="tagNames"
          control={control}
          defaultValue={[]}
          render={({ field }) => (
            <Autocomplete
              {...field}
              sx={{ marginBottom: 2 }}
              multiple
              id="tags"
              options={tags.map(({ name }) => name)}
              freeSolo
              onChange={(event, value) => field.onChange(value)}
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

      <Button type="submit" fullWidth variant="contained" color="primary">
        {post ? 'Update' : 'Create'} Post
      </Button>
    </Container>
  );
};
