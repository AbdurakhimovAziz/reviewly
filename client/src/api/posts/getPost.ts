import axiosInstance from 'api/axios';
import { Post } from 'interfaces';

export const getPost = async (id: string) => {
  const { data } = await axiosInstance.get<Post>(`/posts/${id}`);
  return data;
};
