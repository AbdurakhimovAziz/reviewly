import axiosInstance from 'api/axios';
import { Post } from 'interfaces';
import { sortParam } from 'utils';

export const getPosts = async ({ limit = 10, sortBy = sortParam.DATE }) => {
  const { data } = await axiosInstance.get<Post[]>('/posts', {
    params: {
      limit,
      sortBy,
    },
  });
  return data;
};
