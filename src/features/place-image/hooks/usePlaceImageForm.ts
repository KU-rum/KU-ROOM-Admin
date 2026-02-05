import { useState } from 'react';

import {
  type ChipCategory,
  useAddPlaceImages,
  useDeletePlaceImage,
  useGetPlaceById,
  useGetPlaceImages,
  useGetPlaces,
} from '@/entities/place';
import { compressImage } from '@/shared/lib/utils';

export function usePlaceImageForm() {
  const [selectedChip, setSelectedChip] = useState<ChipCategory | null>(null);
  const [placeId, setPlaceId] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isCompressing, setIsCompressing] = useState(false);

  // 칩 선택 시 장소 목록 조회
  const {
    data: placesData,
    isLoading: isLoadingPlaces,
    isError: isPlacesError,
  } = useGetPlaces(selectedChip);

  const places = placesData?.data ?? [];

  // 장소 선택 시 상세 정보 조회
  const {
    data: placeDetailData,
    isLoading: isLoadingPlaceDetail,
    isError: isPlaceDetailError,
  } = useGetPlaceById(placeId || null);

  const placeDetail = placeDetailData?.data;

  // 장소 이미지 조회
  const {
    data: placeImagesData,
    isPending: isPendingPlaceImage,
    isError: isPlaceImageError,
  } = useGetPlaceImages(placeId || null);

  // 장소 이미지 수정 Mutation
  const { mutate, isPending, isSuccess, isError, error, reset } =
    useAddPlaceImages();

  // 장소 이미지 삭제
  const { mutate: deleteImage } = useDeletePlaceImage();

  const isValid = placeId !== '' && selectedFiles.length > 0;

  const handleChipChange = (chip: ChipCategory | '') => {
    setSelectedChip(chip === '' ? null : chip);
    setPlaceId('');
    reset();
  };

  const handlePlaceChange = (id: string) => {
    setPlaceId(id);
    reset();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsCompressing(true);

    try {
      const compressedFiles = await compressImage(Array.from(files));
      const totalSize = compressedFiles.reduce((sum, f) => sum + f.size, 0);
      if (totalSize > 10 * 1024 * 1024) {
        alert(
          '압축 후 총 용량이 10MB를 초과합니다. 10MB 이하로 추가 가능합니다.',
        );
        setSelectedFiles([]);
        return;
      }
      setSelectedFiles(compressedFiles);
    } catch {
      alert('이미지 압축 중 오류가 발생했습니다.');
      setSelectedFiles([]);
    } finally {
      setIsCompressing(false);
      e.target.value = ''; // 같은 파일 다시 선택 가능하게(원하면 제거)
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValid) return;

    mutate(
      { placeId, images: selectedFiles },
      {
        onSettled: () => {
          setSelectedFiles([]);
        },
      },
    );
  };

  const handleReset = () => {
    setSelectedChip(null);
    setPlaceId('');
    setSelectedFiles([]);
    reset();
  };

  const handleDeleteImage = (placeId: string, placeImageId: number) => {
    const result = window.confirm('정말 삭제하시겠습니까?');
    if (result) {
      deleteImage({ placeId, placeImageId });
    }
  };

  // 선택된 장소 정보
  const selectedPlace = places.find((p) => p.placeId.toString() === placeId);

  return {
    // Chip state
    selectedChip,
    handleChipChange,

    // Places state
    places,
    isLoadingPlaces,
    isPlacesError,

    // Form state
    placeId,
    handlePlaceChange,
    selectedFiles,
    handleFileChange,

    // Selected place info
    selectedPlace,

    // Place detail
    placeDetail,
    isLoadingPlaceDetail,
    isPlaceDetailError,

    placeImagesData,
    isPendingPlaceImage,
    isPlaceImageError,

    // Validation
    isValid,

    // Mutation state
    isPending,
    isSuccess,
    isError,
    error,

    isCompressing,

    // Actions
    handleSubmit,
    handleReset,
    handleDeleteImage,
  };
}
