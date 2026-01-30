import { apiClient, type ApiResponse } from '@/shared/api';

import type {
  GetPlacesRequest,
  Place,
  UpdatePlaceContentBody,
  UpdatePlaceContentRequest,
} from '../model/types';

// 지도 칩 정보 조회 (장소 목록)
export async function getPlaces({
  chip,
}: GetPlacesRequest): Promise<ApiResponse<Place[]>> {
  const response = await apiClient.get<ApiResponse<Place[]>>('/places', {
    params: { chip },
  });
  return response.data;
}

// 장소 내용 수정
export async function updatePlaceContent({
  placeId,
  content,
}: UpdatePlaceContentRequest): Promise<ApiResponse> {
  const body: UpdatePlaceContentBody = { content };
  const response = await apiClient.patch<ApiResponse>(
    `/places/${placeId}/content`,
    body,
  );

  // code가 1200이면 해당 장소가 없음
  if (response.data.code === 1200) {
    throw new Error(response.data.message);
  }

  return response.data;
}
