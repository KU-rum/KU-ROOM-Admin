import { useState } from 'react';

import {
  useAddBanner,
  useDeleteBanner,
  useGetBanners,
} from '@/entities/banner';

export function useEditBannerForm() {
  const [link, setLink] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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

    if (files[0].size > 10 * 1024 * 1024) {
      alert(
        '압축 후 총 용량이 10MB를 초과합니다. 10MB 이하로 추가 가능합니다.',
      );
      setSelectedFile(null);
      return;
    }

    setSelectedFile(files[0]);
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
  };
}
