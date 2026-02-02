import { useMutation, useQuery } from '@tanstack/react-query';

import type {
  ChipCategory,
  UpdatePlaceContentRequest,
  UpdatePlaceImagesRequest,
  UpdatePlaceSubnameRequest,
} from '../model/types';
import {
  getPlaceById,
  getPlaces,
  updatePlaceContent,
  updatePlaceImages,
  updatePlaceSubname,
} from './placeApi';

// 지도 칩 정보 조회 (장소 목록)
export function useGetPlaces(chip: ChipCategory | null) {
  return useQuery({
    queryKey: ['places', chip],
    queryFn: () => getPlaces({ chip: chip! }),
    enabled: !!chip,
  });
}

// 장소 정보 조회
export function useGetPlaceById(placeId: string | null) {
  return useQuery({
    queryKey: ['place', placeId],
    queryFn: () => getPlaceById(placeId!),
    enabled: !!placeId,
  });
}

// 장소 내용 수정 Mutation
export function useUpdatePlaceContent() {
  return useMutation({
    mutationFn: (data: UpdatePlaceContentRequest) => updatePlaceContent(data),
  });
}

// 장소 이미지 수정 Mutation
export function useUpdatePlaceImages() {
  return useMutation({
    mutationFn: (data: UpdatePlaceImagesRequest) => updatePlaceImages(data),
  });
}

// 장소 부가 이름 수정 Mutation
export function useUpdatePlaceSubname() {
  return useMutation({
    mutationFn: (data: UpdatePlaceSubnameRequest) => updatePlaceSubname(data),
  });
}
