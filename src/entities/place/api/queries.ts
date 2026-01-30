import { useMutation, useQuery } from '@tanstack/react-query';

import type { ChipCategory, UpdatePlaceContentRequest } from '../model/types';
import { getPlaces, updatePlaceContent } from './placeApi';

// 지도 칩 정보 조회 (장소 목록)
export function useGetPlaces(chip: ChipCategory | null) {
  return useQuery({
    queryKey: ['places', chip],
    queryFn: () => getPlaces({ chip: chip! }),
    enabled: !!chip,
  });
}

// 장소 내용 수정 Mutation
export function useUpdatePlaceContent() {
  return useMutation({
    mutationFn: (data: UpdatePlaceContentRequest) => updatePlaceContent(data),
  });
}
