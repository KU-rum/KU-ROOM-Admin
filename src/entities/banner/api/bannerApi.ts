import { apiClient, type ApiResponse } from '@/shared';

import type { AddBannerRequest, Banner } from '../model/types';

// 배너 조회
export async function getBannersApi() {
  const response = await apiClient.get<ApiResponse<Banner[]>>('banner');

  return response.data.data;
}

// 배너 추가
export async function addBannerApi({
  link,
  image,
}: AddBannerRequest): Promise<ApiResponse> {
  const formData = new FormData();

  formData.append('links', link);
  formData.append('images', image);

  const response = await apiClient.patch<ApiResponse>('/banner', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
}

export async function deleteBannerApi(bannerId: number) {
  const response = await apiClient.delete<ApiResponse>(`/banner/${bannerId}`);

  return response.data;
}
