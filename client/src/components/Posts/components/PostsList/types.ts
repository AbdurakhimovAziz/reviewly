import { sortParam } from 'utils';

export type PostsListProps = {
  sortBy: sortParam;
  limit?: number;
  tag?: string;
};
