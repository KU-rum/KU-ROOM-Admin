import { apiClient, type ApiResponse } from '@/shared';

import type { AddBannerRequest } from '../model/types';

// 배너 추가
export async function addBannerApi({
  link,
  image,
}: AddBannerRequest): Promise<ApiResponse> {
  const formData = new FormData();

  formData.append('links', link);
  formData.append('images', image);

  const response = await apiClient.patch<ApiResponse>(`/banner`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
}
