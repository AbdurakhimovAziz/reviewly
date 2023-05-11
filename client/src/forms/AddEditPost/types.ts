import { formFieldType } from 'forms/types';
import { Post } from 'interfaces';
import { type } from 'os';
import { PostGroup } from 'utils';
import { postGroupOptions } from './utils';

export type AddEditPostProps = {
  post?: Post;
};

export type AddEditPostFormValues = {
  title: string;
  reviewedItem: string;
  group: PostGroup;
  tagNames: string[];
  body: string;
  imageUrl: string;
  grade: number;
};

export type AddEditPostTextField = Pick<
  AddEditPostFormValues,
  'title' | 'reviewedItem' | 'group'
>;

export const AddEditPostTextFields: formFieldType<
  Partial<AddEditPostTextField>
> = {
  title: {
    id: 'title',
    label: 'Title',
    type: 'text',
    autofocus: true,
  },
  reviewedItem: {
    id: 'reviewedItem',
    label: 'Reviewed Item Name',
    type: 'text',
  },
  group: {
    id: 'group',
    label: 'Group',
    type: 'select',
    options: postGroupOptions,
  },
};
