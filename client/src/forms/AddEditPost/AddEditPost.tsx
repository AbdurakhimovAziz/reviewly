import {
  Button,
  CircularProgress,
  Container,
  MenuItem,
  TextField,
} from '@mui/material';
import { createPost } from 'api/posts/createPost';
import { uploadImage } from 'api/posts/uploadImage';
import 'easymde/dist/easymde.min.css';
import { MouseEvent, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import SimpleMDE from 'react-simplemde-editor';
import { getUser, useAppSelector } from 'store';
import { GradeInput } from './components/GradeInput';
import { ImageInput } from './components/ImageInput';
import { TagsInput } from './components/TagsInput';
import {
  AddEditPostFormValues,
  AddEditPostProps,
  AddEditPostTextField,
  AddEditPostTextFields,
  PostCreateRequest,
  PostUpdateRequest,
} from './types';
import { updatePost } from 'api/posts';

export const AddEditPostForm = ({ post }: AddEditPostProps) => {
  const [bodyText, setBodyText] = useState(post?.body || '');
  const [image, setImage] = useState<File | null>();
  const [imagePreview, setImagPreview] = useState<string>(post?.imageUrl || '');
  const user = useAppSelector(getUser);
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<AddEditPostFormValues>({
    defaultValues: {
      title: post?.title || '',
      grade: post?.grade || 0,
      imageUrl: post?.imageUrl || '',
    },
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const img = acceptedFiles[0];
    setImagPreview(URL.createObjectURL(img));
    setImage(img);
  }, []);

  const handleImageDelete = (e: MouseEvent) => {
    e.stopPropagation();
    setImagPreview('');
    setImage(null);
  };

  const { mutate: createMutate, isLoading: createIsLoading } = useMutation({
    mutationFn: createPost,
    onSuccess: (data) => {
      navigate(`/posts/${data._id}`);
    },
  });

  const { mutate: updateMutate, isLoading } = useMutation({
    mutationFn: (value: PostUpdateRequest) => updatePost(post?._id!, value),
    onSuccess: (data) => {
      navigate(`/posts/${data._id}`);
    },
  });

  const handleBodyChange = useCallback((value: string) => {
    setBodyText(value);
  }, []);

  const handlePostUpdate = useCallback(
    async (formValues: AddEditPostFormValues) => {
      if (!user || !post) return;

      const editedPost: PostUpdateRequest = {
        ...formValues,
        body: bodyText,
        author: post.author._id!,
        previewText: bodyText.slice(0, 100),
        imageUrl: post.imageUrl,
      };

      if (image) {
        const { secure_url } = await uploadImage(image);
        editedPost.imageUrl = secure_url;
      }

      updateMutate(editedPost);
    },
    [image, bodyText, user, updateMutate, post]
  );

  const handlePostCreate = useCallback(
    async (formValues: AddEditPostFormValues) => {
      if (!user) return;

      const newPost: PostCreateRequest = {
        ...formValues,
        body: bodyText,
        author: user._id,
        previewText: bodyText.slice(0, 100),
      };

      if (image) {
        const { secure_url } = await uploadImage(image);
        newPost.imageUrl = secure_url;
      }

      createMutate(newPost);
    },
    [image, bodyText, user, createMutate]
  );

  const onSubmit = useCallback(
    async (formValues: AddEditPostFormValues) => {
      if (post) {
        handlePostUpdate(formValues);
      } else {
        handlePostCreate(formValues);
      }
    },
    [post, handlePostUpdate, handlePostCreate]
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

      <ImageInput
        onDrop={onDrop}
        onDelete={handleImageDelete}
        imageUrl={imagePreview}
      />
      <GradeInput control={control} defaultValue={post?.grade} max={10} />
      <SimpleMDE
        onChange={handleBodyChange}
        defaultValue={post?.body}
        value={bodyText}
      />
      <TagsInput control={control} errors={errors} defaultTags={post?.tags} />
      <Button type="submit" fullWidth variant="contained" color="primary">
        {createIsLoading ? (
          <CircularProgress />
        ) : post ? (
          'Update Post'
        ) : (
          'Create Post'
        )}
      </Button>
    </Container>
  );
};
