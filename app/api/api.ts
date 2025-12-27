import axios, { AxiosError } from 'axios';

export type ApiErrorResponse = {
  message?: string;
  error?: string;
  validation?: {
    body?: {
      message?: string;
    };
  };
};

export type ApiError = AxiosError<ApiErrorResponse>;

export const Api = axios.create({
  baseURL: 'https://notehub-api.goit.study',
  withCredentials: true,
});
