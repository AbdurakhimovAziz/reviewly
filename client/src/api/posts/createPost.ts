import axiosInstance from 'api/axios';
import { endpoints } from 'api/endpoints';
import { PostCreateRequest } from 'forms/AddEditPost/types';
import { Post } from 'interfaces';

export const createPost = async (post: PostCreateRequest): Promise<Post> => {
  const { data } = await axiosInstance.post<Post>(endpoints.posts, post);
  return data;
};
