import axiosInstance from 'api/axios';
import { Tag } from 'interfaces';

export const getTags = async (limit = 100) => {
  const { data } = await axiosInstance.get<Tag[]>('/tags', {
    params: {
      limit,
    },
  });
  return data;
};
