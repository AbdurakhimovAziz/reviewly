import * as yup from 'yup';

import { formFieldType } from '../types';
import { AddEditPostFormValues } from './types';
import { PostGroup } from 'utils';

export const schema = yup.object<AddEditPostFormValues>().shape({
  title: yup.string().required(),
  reviewedItem: yup.string().required(),
  group: yup.string().required(),
  tagNames: yup.array().of(yup.string()),
  body: yup.string().required(),
  imageUrl: yup.string(),
  grade: yup.number().min(0).max(10).required(),
});

export const postGroupOptions: PostGroup[] = Object.values(
  PostGroup
) as PostGroup[];
