import axiosInstance from 'api/axios';
import { endpoints } from 'api/endpoints';
import { Post } from 'interfaces';

export const getUserPosts = async (userId: string) => {
  const { data } = await axiosInstance.get<Post[]>(
    `${endpoints.users}/${userId}${endpoints.posts}`
  );
  return data;
};
