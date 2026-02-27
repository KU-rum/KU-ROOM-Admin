import { useState } from 'react';

import {
  useAddBanner,
  useDeleteBanner,
  useGetBanners,
} from '@/entities/banner';
import { compressImage } from '@/shared/lib/utils';

export function useEditBannerForm() {
  const [link, setLink] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);

  const {
    data: bannersData,
    isLoading: isLoadingBanners,
    isError: isBannersError,
  } = useGetBanners();

  const { mutate: addBanner, isPending: isPendingAddBanner } = useAddBanner();

  const { mutate: deleteBanner } = useDeleteBanner();

  const handleChangeLink = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value);
  };

  const isValid = link.trim() !== '' && selectedFile !== null;

  const reset = () => {
    setLink('');
    setSelectedFile(null);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsCompressing(true);

    try {
      const compressedFile = await compressImage(Array.from(files), 0.2);
      setSelectedFile(compressedFile[0]);
    } catch {
      alert('이미지 압축 중 오류가 발생했습니다.');
      setSelectedFile(null);
    } finally {
      setIsCompressing(false);
      e.target.value = ''; // 같은 파일 다시 선택 가능하게(원하면 제거)
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValid || isPendingAddBanner) return;

    addBanner({ link, image: selectedFile }, { onSuccess: () => reset() });
  };

  const handleReset = () => {
    reset();
  };

  const handleDeleteBanner = (bannerId: number) => {
    const result = window.confirm('정말 삭제하시겠습니까?');
    if (result) {
      deleteBanner(bannerId);
    }
  };

  return {
    bannersData,
    link,
    selectedFile,
    isLoadingBanners,
    isBannersError,
    handleChangeLink,
    handleFileChange,
    handleSubmit,
    handleDeleteBanner,
    handleReset,
    isValid,
    isPendingAddBanner,
    isCompressing,
  };
}
