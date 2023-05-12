import axiosInstance from 'api/axios';
import { endpoints } from 'api/endpoints';

export const deletePost = async (id: string) => {
  const { data } = await axiosInstance.delete(`${endpoints.posts}/${id}`);
  return data;
};
