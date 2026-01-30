import { useState } from 'react';

import {
  type ChipCategory,
  useGetPlaceById,
  useGetPlaces,
  useUpdatePlaceImages,
} from '@/entities/place';

export function usePlaceImageForm() {
  const [selectedChip, setSelectedChip] = useState<ChipCategory | null>(null);
  const [placeId, setPlaceId] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

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

  // 장소 이미지 수정 Mutation
  const { mutate, isPending, isSuccess, isError, error, reset } =
    useUpdatePlaceImages();

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // FileList를 File[] 배열로 변환
      setSelectedFiles(Array.from(files));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValid) return;

    mutate({ placeId, images: selectedFiles });
  };

  const handleReset = () => {
    setSelectedChip(null);
    setPlaceId('');
    setSelectedFiles([]);
    reset();
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

    // Validation
    isValid,

    // Mutation state
    isPending,
    isSuccess,
    isError,
    error,

    // Actions
    handleSubmit,
    handleReset,
  };
}
