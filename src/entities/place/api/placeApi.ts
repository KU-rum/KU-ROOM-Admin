import { apiClient, type ApiResponse } from '@/shared/api';

import type {
  GetPlacesRequest,
  Place,
  PlaceDetail,
  UpdatePlaceContentBody,
  UpdatePlaceContentRequest,
  UpdatePlaceImagesRequest,
  UpdatePlaceSubnameBody,
  UpdatePlaceSubnameRequest,
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

// 장소 정보 조회
export async function getPlaceById(
  placeId: string,
): Promise<ApiResponse<PlaceDetail>> {
  const response = await apiClient.get<ApiResponse<PlaceDetail>>(
    `/places/${placeId}`,
  );
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

// 장소 이미지 수정
export async function updatePlaceImages({
  placeId,
  images,
}: UpdatePlaceImagesRequest): Promise<ApiResponse> {
  const formData = new FormData();

  // 여러 개의 이미지 파일 추가
  images.forEach((image) => {
    formData.append('images', image);
  });

  const response = await apiClient.put<ApiResponse>(
    `/places/${placeId}/images`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return response.data;
}

// 장소 부가 이름 수정
export async function updatePlaceSubname({
  placeId,
  subName,
}: UpdatePlaceSubnameRequest): Promise<ApiResponse> {
  const body: UpdatePlaceSubnameBody = { subName };
  const response = await apiClient.patch<ApiResponse>(
    `/places/${placeId}/sub-name`,
    body,
  );

  if (response.data.code === 1200) {
    throw new Error(response.data.message);
  }

  return response.data;
}
