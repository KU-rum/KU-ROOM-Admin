import { useCallback, useState } from 'react';

import {
  type ChipCategory,
  useGetPlaceById,
  useGetPlaces,
  useUpdateLocation,
} from '@/entities/place';
import type { LatLng } from '@/shared/types';

export function useUpdateLocationForm() {
  const [selectedChip, setSelectedChip] = useState<ChipCategory | null>(null);
  const [placeId, setPlaceId] = useState('');
  const [location, setLocation] = useState<LatLng | null>(null);

  // 칩 선택 시 장소 목록 조회
  const { data: placesData, isLoading: isLoadingPlaces } =
    useGetPlaces(selectedChip);

  const places = placesData?.data ?? [];

  // 장소 선택 시 상세 정보 조회
  const { data: placeDetailData, isLoading: isLoadingPlaceDetail } =
    useGetPlaceById(placeId || null);

  const placeDetail = placeDetailData?.data;

  const { mutate, isPending } = useUpdateLocation();

  const isValid =
    placeId !== '' &&
    location !== null &&
    !(
      location.lat === placeDetail?.latitude &&
      location.lng === placeDetail?.longitude
    );

  const handleChipChange = (chip: ChipCategory | '') => {
    setSelectedChip(chip === '' ? null : chip);
    setPlaceId('');
  };

  const handlePlaceChange = (id: string) => {
    setPlaceId(id);
  };

  const handleChangeLocationCenter = useCallback((center: LatLng) => {
    setLocation(center);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValid) return;
    mutate({
      placeId: Number(placeId),
      latitude: location.lat,
      longitude: location.lng,
    });
  };

  const handleReset = () => {
    setSelectedChip(null);
    setPlaceId('');
  };

  return {
    // Chip state
    selectedChip,
    handleChipChange,

    // Places state
    places,
    isLoadingPlaces,

    // Form state
    placeId,
    handlePlaceChange,

    // Place detail
    placeDetail,
    isLoadingPlaceDetail,

    isPending,

    location,
    handleChangeLocationCenter,

    // Validation
    isValid,

    // Actions
    handleSubmit,
    handleReset,
  };
}
