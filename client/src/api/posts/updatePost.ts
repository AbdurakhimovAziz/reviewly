import axiosInstance from 'api/axios';
import { endpoints } from 'api/endpoints';
import { PostUpdateRequest } from 'forms/AddEditPost/types';

export const updatePost = async (
  postId: string,
  editedPost: PostUpdateRequest
) => {
  const { data } = await axiosInstance.patch(
    `${endpoints.posts}/${postId}`,
    editedPost
  );

  return data;
};
