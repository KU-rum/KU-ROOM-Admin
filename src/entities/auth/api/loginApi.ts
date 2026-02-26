import { apiClient, type ApiResponse } from '@/shared';

import type { LoginRequest, LoginResponse } from '../model/types';

export async function loginApi({ loginId, password }: LoginRequest) {
  const response = await apiClient.post<ApiResponse<LoginResponse>>(
    '/auth/login',
    {
      loginId,
      password,
    },
  );
  return response.data.data;
}
