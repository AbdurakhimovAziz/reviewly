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
import { useCallback, useState } from 'react';
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
  FileWithPreview,
  PostCreateRequest,
} from './types';

export const AddEditPostForm = ({ post }: AddEditPostProps) => {
  const [bodyText, setBodyText] = useState('');
  const [image, setImage] = useState<FileWithPreview | null>(null);
  const user = useAppSelector(getUser);
  const navigate = useNavigate();

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

  const handleImageDelete = () => setImage(null);

  const { mutate, isLoading } = useMutation({
    mutationFn: createPost,
    onSuccess: (data) => {
      navigate(`/posts/${data._id}`);
    },
  });

  const handleBodyChange = useCallback((value: string) => {
    setBodyText(value);
  }, []);

  const onSubmit = useCallback(
    async (formValues: AddEditPostFormValues) => {
      if (!user) return;

      const newPost: PostCreateRequest = {
        ...formValues,
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
    [image, bodyText, user, mutate]
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

      <ImageInput onDrop={onDrop} onDelete={handleImageDelete} image={image} />
      <GradeInput control={control} defaultValue={0} max={10} />
      <SimpleMDE
        onChange={handleBodyChange}
        defaultValue={post?.body}
        value={bodyText}
      />
      <TagsInput control={control} errors={errors} defaultTags={post?.tags} />
      <Button type="submit" fullWidth variant="contained" color="primary">
        {isLoading ? (
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
