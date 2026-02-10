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

// Request interceptor - 토큰 추가
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response interceptor - 에러 처리
apiClient.interceptors.response.use(
  (response) => {
    const body = response.data;

    if (isApiResponse(body) && body.code === 401) {
      const apiError: ApiErrorBody = {
        code: body.code,
        status: body.status,
        message: body.message,
      };

      alert('잘못된 토큰입니다. 다시 로그인해주세요.');
      localStorage.removeItem('accessToken');
      if (window.location.pathname !== '/login') {
        window.location.replace('/login');
      }

      return Promise.reject(new ApiClientError(apiError));
    }

    return response;
  },
  (error: unknown) => {
    let apiError: ApiErrorBody = {
      message: '요청 실패',
      status: 'ERROR',
    };

    // axios 에러일 때만 response.data 접근
    if (axios.isAxiosError<ApiErrorBody>(error)) {
      const data = error.response?.data;

      apiError = {
        code: data?.code ?? error.response?.status,
        status: data?.status ?? error.response?.statusText ?? 'ERROR',
        message: data?.message ?? error.message ?? '요청 실패',
      };

      if (error.response?.status === 401 || apiError.code === 401) {
        alert('잘못된 토큰입니다. 다시 로그인해주세요.');
        localStorage.removeItem('accessToken');
        if (window.location.pathname !== '/login') {
          window.location.replace('/login');
        }
      }
    } else {
      // axios 에러가 아닌 경우도 통일
      apiError = { message: '알 수 없는 오류', status: 'ERROR' };
    }

    // error.response.message 형태로 쓰게 만들기
    return Promise.reject(new ApiClientError(apiError));
  },
);
