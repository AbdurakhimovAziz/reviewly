import axiosInstance from '../axios';
import { endpoints } from '../endpoints';
import { LoginRequest, LoginResponse } from '../types';

export const login = async (body: LoginRequest): Promise<LoginResponse> => {
  const { data } = await axiosInstance.post(endpoints.login, body);
  return data;
};
