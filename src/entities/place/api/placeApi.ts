import { apiClient, type ApiResponse } from '@/shared/api';

import type {
  AddPlaceImagesRequest,
  CreatePlaceRequest,
  DeletePlaceImageRequest,
  GetPlacesRequest,
  Place,
  PlaceDetail,
  PlaceImage,
  UpdatePlaceContentBody,
  UpdatePlaceContentRequest,
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

// 장소 추가
export async function createPlace({
  categoryChip,
  name,
  subName,
  content,
  latitude,
  longitude,
}: CreatePlaceRequest) {
  const response = await apiClient.post<ApiResponse>('/places', {
    categoryChip,
    name,
    subName,
    content,
    latitude,
    longitude,
  });

  return response.data;
}

// 장소 이미지 조회
export async function getPlaceImages(placeId: string) {
  const response = await apiClient.get<ApiResponse<PlaceImage[]>>(
    `/places/${placeId}/images`,
  );

  return response.data.data;
}

// 장소 이미지 추가
export async function addPlaceImages({
  placeId,
  images,
}: AddPlaceImagesRequest): Promise<ApiResponse> {
  const formData = new FormData();

  // 여러 개의 이미지 파일 추가
  images.forEach((image) => {
    formData.append('images', image);
  });

  const response = await apiClient.patch<ApiResponse>(
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

// 장소 이미지 삭제
export async function deletePlaceImage({
  placeId,
  placeImageId,
}: DeletePlaceImageRequest) {
  const response = await apiClient.delete<ApiResponse>(
    `/places/${placeId}/images/${placeImageId}`,
  );

  return response.data;
}
