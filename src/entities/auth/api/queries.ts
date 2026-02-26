import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import type { ApiClientError } from '@/shared/api/types';

import type { LoginRequest, LoginResponse } from '../model/types';
import { loginApi } from './loginApi';

// 로그인 mutation
export function useLogin() {
  const navigate = useNavigate();
  return useMutation<LoginResponse | undefined, ApiClientError, LoginRequest>({
    mutationFn: (loginData) => loginApi(loginData),
    onSuccess: (response) => {
      if (!response) {
        alert('로그인 중 오류 발생');
        return;
      }
      const raw = response.tokenResponse.accessToken ?? '';
      const tokenOnly = raw.replace(/^Bearer\s+/i, '');
      localStorage.setItem('accessToken', tokenOnly);
      navigate('/');
    },
    onError: (error) => {
      alert(error.response?.message ?? error.message);
    },
  });
}
