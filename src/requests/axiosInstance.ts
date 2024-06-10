import authRequests from '../pages/auth/requests/auth.ts';
import axios, { AxiosError } from 'axios';
import { routePaths } from '../config/configRoutes/configRoutes.tsx';
import { storage } from '../storage/storage.ts';
import config from '../config/config.ts';

export const axiosInstance = axios.create({
  baseURL: config.HOST,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem(storage.accessToken);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response) {
      const { status } = error.response;
      if (status === 401) {
        try {
          const resRefresh = await authRequests.refreshToken(); // Assuming refreshToken is a function returning a function
          if (resRefresh?.status === 200 && resRefresh?.data) {
            const { access_token, refresh_token } = resRefresh.data;
            localStorage.setItem(storage.accessToken, access_token);
            localStorage.setItem(storage.refreshToken, refresh_token);

            return axiosInstance(error.config);
          }
        } catch (refreshError) {
          const refreshErr = refreshError as AxiosError;
          if (refreshErr.response?.status !== 200) {
            localStorage.removeItem(storage.accessToken);
            localStorage.removeItem(storage.refreshToken);
            window.location.href = routePaths.ADMIN_AUTH_LOGIN;
            throw refreshErr;
          }
        }
      }
    }
    return Promise.reject(error);
  }
);
