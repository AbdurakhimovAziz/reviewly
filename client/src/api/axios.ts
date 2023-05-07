import axios from 'axios';
import { BASE_URL } from './endpoints';
import { store } from '../redux';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    console.log('config: ', config);

    const token = store.getState().main.token;
    console.log('token: ', token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const originalRequest = error.config;

    // Retry the request if it fails with a 401 error and there is a valid token available
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Logic to obtain a new token or refresh the existing token
      const newToken = store.getState().main.token;
      console.log('newToken: ', newToken);

      // Update the Authorization header with the new token
      if (newToken) {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(originalRequest); // Retry the original request with the new token
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
