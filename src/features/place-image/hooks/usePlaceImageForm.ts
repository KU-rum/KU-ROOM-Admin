import { useState } from 'react';

import {
  type ChipCategory,
  useGetPlaceById,
  useGetPlaces,
} from '@/entities/place';

export function usePlaceImageForm() {
  const [selectedChip, setSelectedChip] = useState<ChipCategory | null>(null);
  const [placeId, setPlaceId] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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

  const isValid = placeId !== '' && selectedFile !== null;

  const handleChipChange = (chip: ChipCategory | '') => {
    setSelectedChip(chip === '' ? null : chip);
    setPlaceId('');
  };

  const handlePlaceChange = (id: string) => {
    setPlaceId(id);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValid) return;

    // TODO: API 연동
    console.log('Submit:', { placeId, file: selectedFile });
  };

  const handleReset = () => {
    setSelectedChip(null);
    setPlaceId('');
    setSelectedFile(null);
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
    selectedFile,
    handleFileChange,

    // Selected place info
    selectedPlace,

    // Place detail
    placeDetail,
    isLoadingPlaceDetail,
    isPlaceDetailError,

    // Validation
    isValid,

    // Actions
    handleSubmit,
    handleReset,
  };
}
