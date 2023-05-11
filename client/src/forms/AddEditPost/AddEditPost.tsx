import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import {
  AddEditPostFormValues,
  AddEditPostProps,
  AddEditPostTextField,
  AddEditPostTextFields,
} from './types';
import { useCallback, useState } from 'react';
import { Container, MenuItem, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { postGroupOptions } from './utils';

export const AddEditPostForm = ({ post }: AddEditPostProps) => {
  const [value, setValue] = useState('Initial value');
  const {
    register,
    formState: { errors },
  } = useForm<AddEditPostFormValues>();

  const handleBodyChange = useCallback((value: string) => {
    setValue(value);
    console.log(value);
  }, []);

  console.log(postGroupOptions);

  return (
    <Container component="form">
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

      <SimpleMDE onChange={handleBodyChange} />
    </Container>
  );
};
