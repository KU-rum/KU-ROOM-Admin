import { useMutation } from '@tanstack/react-query';

import type { UpdatePlaceContentRequest } from '../model/types';
import { updatePlaceContent } from './placeApi';

// 장소 내용 수정 Mutation
export function useUpdatePlaceContent() {
  return useMutation({
    mutationFn: (data: UpdatePlaceContentRequest) => updatePlaceContent(data),
  });
}
