import axiosInstance from 'api/axios';
import { endpoints } from 'api/endpoints';
import { Post } from 'interfaces';
import { sortParam } from 'utils';

export const getPosts = async ({
  limit = 10,
  sortBy = sortParam.DATE,
  tag = '',
}) => {
  const { data } = await axiosInstance.get<Post[]>(endpoints.posts, {
    params: {
      limit,
      sortBy,
      tag,
    },
  });
  return data;
};
