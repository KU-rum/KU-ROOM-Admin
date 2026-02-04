import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type {
  AddPlaceImagesRequest,
  ChipCategory,
  CreatePlaceRequest,
  DeletePlaceImageRequest,
  UpdateLocationRequest,
  UpdatePlaceContentRequest,
  UpdatePlaceSubnameRequest,
} from '../model/types';
import {
  addPlaceImages,
  createPlace,
  deletePlaceImage,
  getPlaceById,
  getPlaceImages,
  getPlaces,
  updatePlaceContent,
  updatePlaceLocation,
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
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdatePlaceContentRequest) => updatePlaceContent(data),
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ['places'],
      });
    },
  });
}

// 장소 이미지 조회
export function useGetPlaceImages(placeId: string | null) {
  return useQuery({
    queryKey: ['places', 'images', placeId],
    queryFn: () => getPlaceImages(placeId!),
    enabled: !!placeId,
  });
}

// 장소 이미지 추가 Mutation
export function useAddPlaceImages() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: AddPlaceImagesRequest) => addPlaceImages(data),
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ['places'],
      });
      alert('이미지 추가 성공');
    },
    onError: () => {
      alert('이미지 추가 실패');
    },
  });
}

export function useDeletePlaceImage() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: DeletePlaceImageRequest) => deletePlaceImage(data),
    onSuccess: (_data, variables) => {
      qc.invalidateQueries({
        queryKey: ['places', 'images', variables.placeId],
      });
      alert('이미지 삭제 성공');
    },
    onError: () => {
      alert('이미지 삭제 실패');
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

// 장소 위치 수정 mutation
export function useUpdateLocation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateLocationRequest) => updatePlaceLocation(data),
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ['places'],
      });
      alert('장소 위치 수정 성공');
    },
    onError: () => {
      alert('장소 위치 수정 실패');
    },
  });
}
