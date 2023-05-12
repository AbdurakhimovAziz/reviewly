import axiosInstance from 'api/axios';
import { endpoints } from 'api/endpoints';
import { Post } from 'interfaces';

export const getPost = async (id: string) => {
  const { data } = await axiosInstance.get<Post>(`${endpoints.posts}/${id}`);
  return data;
};
