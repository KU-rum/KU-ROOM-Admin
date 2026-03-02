import axios from 'axios';

import { ApiClientError, type ApiErrorBody, type ApiResponse } from './types';

const isApiResponse = (
  x: unknown,
): x is { code: number; status: string; message: string } => {
  if (!x || typeof x !== 'object') return false;
  const obj = x as ApiResponse;
  return (
    typeof obj.code === 'number' &&
    typeof obj.status === 'string' &&
    typeof obj.message === 'string'
  );
};

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const handleInvalidToken = () => {
  alert('잘못된 토큰입니다. 다시 로그인해주세요.');
  localStorage.removeItem('accessToken');
  if (window.location.pathname !== '/login') {
    window.location.replace('/login');
  }
};

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    const body = response.data;

    if (isApiResponse(body) && body.code === 1005) {
      const apiError: ApiErrorBody = {
        code: body.code,
        status: body.status,
        message: body.message,
      };

      handleInvalidToken();
      return Promise.reject(new ApiClientError(apiError));
    }

    return response;
  },
  (error: unknown) => {
    let apiError: ApiErrorBody = {
      message: '알 수 없는 오류',
      status: 'ERROR',
    };

    if (axios.isAxiosError<ApiErrorBody>(error)) {
      const data = error.response?.data;

      apiError = {
        code: data?.code ?? error.response?.status,
        status: data?.status ?? error.response?.statusText ?? 'ERROR',
        message: data?.message ?? error.message ?? '알 수 없는 오류',
      };

      const responseStatus = error.response?.status;
      const responseCode = Number(data?.code);
      if (
        responseStatus === 401 ||
        responseStatus === 403 ||
        responseCode === 1005
      ) {
        handleInvalidToken();
      }
    } else {
      apiError = { message: '네트워크 연결 오류', status: 'ERROR' };
    }

    return Promise.reject(new ApiClientError(apiError));
  },
);
