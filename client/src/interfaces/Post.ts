import { PostGroup } from 'utils';
import { Tag } from './Tag';

export interface Post {
  _id: string;
  title: string;
  author: string;
  reviewedItem: string;
  group: PostGroup;
  tags: Tag[];
  body: string;
  imageUrl: string;
  grade: number;
  likes: Map<string, boolean>;
  createdAt: string;
  updatedAt: string;
}
