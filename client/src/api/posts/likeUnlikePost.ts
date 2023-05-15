import axiosInstance from 'api/axios';
import { endpoints } from 'api/endpoints';
import { Post } from 'interfaces';

export const likeUnlikePost = async (postId: string) => {
  const { data } = await axiosInstance.post<Post>(
    `${endpoints.posts}/${postId}/like`
  );
  return data;
};
