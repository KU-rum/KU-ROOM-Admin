import { useState } from 'react';

import {
  type ChipCategory,
  useGetPlaces,
  useUpdatePlaceContent,
} from '@/entities/place';

export function usePlaceContentForm() {
  const [selectedChip, setSelectedChip] = useState<ChipCategory | null>(null);
  const [placeId, setPlaceId] = useState('');
  const [content, setContent] = useState('');

  // 칩 선택 시 장소 목록 조회
  const {
    data: placesData,
    isLoading: isLoadingPlaces,
    isError: isPlacesError,
  } = useGetPlaces(selectedChip);

  const places = placesData?.data ?? [];

  const { mutate, isPending, isSuccess, isError, error, reset } =
    useUpdatePlaceContent();

  const isValid = placeId !== '' && content.trim() !== '';

  const handleChipChange = (chip: ChipCategory | '') => {
    setSelectedChip(chip === '' ? null : chip);
    setPlaceId(''); // 칩 변경 시 장소 선택 초기화
    reset();
  };

  const handlePlaceChange = (id: string) => {
    setPlaceId(id);
    reset();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValid) return;

    mutate({ placeId, content: content.trim() });
  };

  const handleReset = () => {
    setSelectedChip(null);
    setPlaceId('');
    setContent('');
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
    content,
    setContent,

    // Selected place info
    selectedPlace,

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
