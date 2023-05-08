import axiosInstance from '../axios';
import { endpoints } from '../endpoints';
import { ServerResponse } from '../types';
import { RegisterRequest } from './types';

export const signup = async (
  body: RegisterRequest
): Promise<ServerResponse> => {
  const { data } = await axiosInstance.post(endpoints.register, body);
  return data;
};
