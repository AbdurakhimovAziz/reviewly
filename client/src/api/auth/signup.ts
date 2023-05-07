import axiosInstance from '../axios';
import { endpoints } from '../endpoints';
import { RegisterRequest, ServerResponse } from '../types';

export const signup = async (
  body: RegisterRequest
): Promise<ServerResponse> => {
  const { data } = await axiosInstance.post(endpoints.register, body);
  return data;
};
