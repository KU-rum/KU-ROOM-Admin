import { apiClient, type ApiResponse } from '@/shared/api';

import type {
  UpdatePlaceContentBody,
  UpdatePlaceContentRequest,
} from '../model/types';

// 장소 내용 수정
export async function updatePlaceContent({
  placeId,
  content,
}: UpdatePlaceContentRequest): Promise<ApiResponse> {
  const body: UpdatePlaceContentBody = { content };
  const response = await apiClient.patch<ApiResponse>(
    `/places/${placeId}/content`,
    body
  );
  return response.data;
}
