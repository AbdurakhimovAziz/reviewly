import { AddEditPostFormValues } from 'forms/AddEditPost/types';
import { Tag } from 'interfaces';
import { Control, FieldErrors } from 'react-hook-form';

export type TagsInputProps = {
  defaultTags?: Tag[];
  control: Control<AddEditPostFormValues>;
  errors: FieldErrors<AddEditPostFormValues>;
};
