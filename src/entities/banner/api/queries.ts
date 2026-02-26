import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type { AddBannerRequest } from '../model/types';
import { addBannerApi, deleteBannerApi, getBannersApi } from './bannerApi';

export function useGetBanners() {
  return useQuery({
    queryKey: ['banners'],
    queryFn: () => getBannersApi(),
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 20,
  });
}

export function useAddBanner() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: AddBannerRequest) => addBannerApi(data),
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ['banners'],
      });
      alert('배너 추가 성공');
    },
    onError: (error) => {
      alert(`배너 추가 실패 : ${error.message}`);
    },
  });
}

export function useDeleteBanner() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (bannerId: number) => deleteBannerApi(bannerId),
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ['banners'],
      });
      alert('배너 삭제 성공');
    },
    onError: () => {
      alert('배너 삭제 실패');
    },
  });
}
