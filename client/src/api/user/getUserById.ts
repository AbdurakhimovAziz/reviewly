import { User } from '../../interfaces/User';
import axiosInstance from '../axios';
import { endpoints } from '../endpoints';

export const getUserById = async (id: string): Promise<User> => {
  const { data } = await axiosInstance.get(`${endpoints.users}/${id}`);
  return data;
};
