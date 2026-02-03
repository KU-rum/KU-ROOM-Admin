import { useCallback, useState } from 'react';

import { type ChipCategory, useCreatePlace } from '@/entities/place';
import type { LatLng } from '@/shared/types';

export function useAddLocationForm() {
  const [selectedChip, setSelectedChip] = useState<ChipCategory | null>(null);
  const [title, setTitle] = useState('');
  const [subName, setSubName] = useState('');
  const [content, setContent] = useState('');
  const [location, setLocation] = useState<LatLng | null>(null);

  const { mutate: createPlace, isPending } = useCreatePlace();

  const handleChipChange = (chip: ChipCategory | '') => {
    setSelectedChip(chip === '' ? null : chip);
  };

  const handleChangeTitle = (
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    setTitle(e.target.value);
  };

  const handleChangeSubName = (
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    setSubName(e.target.value);
  };

  const handleChangeContent = (
    e: React.ChangeEvent<HTMLTextAreaElement, HTMLTextAreaElement>,
  ) => {
    setContent(e.target.value);
  };

  const handleChangeLocationCenter = useCallback((center: LatLng) => {
    setLocation(center);
  }, []);

  const isValid =
    selectedChip !== null &&
    title.trim() !== '' &&
    subName.trim() !== '' &&
    content.trim() !== '' &&
    location !== null;

  const reset = () => {
    setSelectedChip(null);
    setTitle('');
    setSubName('');
    setContent('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValid) return;
    createPlace({
      categoryChip: selectedChip,
      name: title,
      subName: subName,
      content: content,
      latitude: location.lat,
      longitude: location.lng,
    });
    reset();
  };

  const handleReset = () => {
    reset();
  };

  return {
    selectedChip,
    title,
    subName,
    content,
    location,
    handleChipChange,
    handleChangeTitle,
    handleChangeSubName,
    handleChangeContent,
    handleChangeLocationCenter,
    handleSubmit,
    handleReset,
    isValid,
    isPending,
  };
}
