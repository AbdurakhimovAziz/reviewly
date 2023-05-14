import { PostGroup } from 'utils';
import { Tag } from './Tag';
import { User } from './User';

export interface Post {
  _id: string;
  title: string;
  author: User;
  reviewedItem: string;
  group: PostGroup;
  tags: Tag[];
  body: string;
  previewText: string;
  imageUrl: string;
  grade: number;
  likes: Record<string, boolean>;
  createdAt: string;
  updatedAt: string;
}
