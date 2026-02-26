import { useMutation } from '@tanstack/react-query';

import type { AddBannerRequest } from '../model/types';
import { addBannerApi } from './bannerApi';

export function useAddBanner() {
  // 추후 배너 조회 api 캐싱 초기화
  // const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: AddBannerRequest) => addBannerApi(data),
    onSuccess: () => {
      // qc.invalidateQueries({
      //   queryKey: ['places'],
      // });
      alert('배너 추가 성공');
    },
    onError: (error) => {
      alert(`배너 추가 실패 : ${error.message}`);
    },
  });
}
