import { useState } from 'react';

import { useUpdatePlaceContent } from '@/entities/place';

export function usePlaceContentForm() {
  const [placeId, setPlaceId] = useState('');
  const [content, setContent] = useState('');

  const { mutate, isPending, isSuccess, isError, error, reset } =
    useUpdatePlaceContent();

  const isValid = placeId.trim() !== '' && content.trim() !== '';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValid) return;

    mutate({ placeId: placeId.trim(), content: content.trim() });
  };

  const handleReset = () => {
    setPlaceId('');
    setContent('');
    reset();
  };

  return {
    // Form state
    placeId,
    setPlaceId,
    content,
    setContent,

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
