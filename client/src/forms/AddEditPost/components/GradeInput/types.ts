import { AddEditPostFormValues } from 'forms/AddEditPost/types';
import { Control } from 'react-hook-form';

export type GradeInputProps = {
  control: Control<AddEditPostFormValues>;
  defaultValue?: number;
  max?: number;
};
