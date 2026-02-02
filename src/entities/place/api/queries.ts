import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type {
  ChipCategory,
  CreatePlaceRequest,
  UpdatePlaceContentRequest,
  UpdatePlaceImagesRequest,
  UpdatePlaceSubnameRequest,
} from '../model/types';
import {
  createPlace,
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
    queryKey: ['places', placeId],
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
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdatePlaceImagesRequest) => updatePlaceImages(data),
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ['places'],
      });
    },
  });
}

// 장소 부가 이름 수정 Mutation
export function useUpdatePlaceSubname() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdatePlaceSubnameRequest) => updatePlaceSubname(data),
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ['places'],
      });
    },
  });
}

// 장소 추가 mutation
export function useCreatePlace() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePlaceRequest) => createPlace(data),
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ['places'],
      });
      alert('장소 추가 성공');
    },
    onError: () => {
      alert('장소 추가 실패');
    },
  });
}
