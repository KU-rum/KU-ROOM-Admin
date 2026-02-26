import { useState } from 'react';

import { useAddBanner } from '@/entities/place';

export function useEditBannerForm() {
  const [link, setLink] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { mutate, isPending: isPendingAddBanner } = useAddBanner();

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

    if (!isValid) return;
    // TODO: 서버 링크 추가 요청

    mutate({ link, image: selectedFile });
  };

  const handleReset = () => {
    reset();
  };

  return {
    link,
    selectedFile,
    handleChangeLink,
    handleFileChange,
    handleSubmit,
    handleReset,
    isValid,
    isPendingAddBanner,
  };
}
