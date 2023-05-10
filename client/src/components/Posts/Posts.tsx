import { QueryKeys } from 'api';
import { getPosts } from 'api/posts';
import { Post } from 'interfaces';
import { useQuery } from 'react-query';
import { PostsProps } from './types';
import { PostsList } from './components/PostsList';
import { sortParam } from 'utils';

export const Posts = ({}: PostsProps) => {
  return (
    <>
      <PostsList sortBy={sortParam.DATE} />
      <PostsList sortBy={sortParam.GRADE} />
    </>
  );
};
