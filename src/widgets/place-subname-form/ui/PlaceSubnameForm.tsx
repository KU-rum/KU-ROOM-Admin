import { useState } from 'react';

import { CHIP_LABELS, type ChipCategory, useGetPlaces } from '@/entities/place';
import { Alert, Button, Card, Input, Select } from '@/shared/ui';

const chipOptions = Object.entries(CHIP_LABELS).map(([value, label]) => ({
  value,
  label,
}));

export function PlaceSubnameForm() {
  const [selectedChip, setSelectedChip] = useState<ChipCategory | null>(null);
  const [placeId, setPlaceId] = useState('');
  const [subName, setSubName] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const isPending = false;

  const { data: placesData, isLoading: isLoadingPlaces } =
    useGetPlaces(selectedChip);

  const places = placesData?.data ?? [];

  const placeOptions = places.map((place) => ({
    value: place.placeId.toString(),
    label: `${place.name}${place.subName ? ` (${place.subName})` : ''}`,
  }));

  const selectedPlace = places.find((p) => p.placeId.toString() === placeId);

  const isValid = placeId !== '' && subName.trim() !== '';

  const handleChipChange = (chip: ChipCategory | '') => {
    setSelectedChip(chip === '' ? null : chip);
    setPlaceId('');
    setIsSuccess(false);
    setIsError(false);
  };

  const handlePlaceChange = (id: string) => {
    setPlaceId(id);
    setIsSuccess(false);
    setIsError(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    // TODO: API 연동 예정
    console.log('Submit:', { placeId, subName });
  };

  const handleReset = () => {
    setSelectedChip(null);
    setPlaceId('');
    setSubName('');
    setIsSuccess(false);
    setIsError(false);
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 칩 카테고리 선택 */}
        <Select
          id="chip"
          label="카테고리"
          required
          options={chipOptions}
          value={selectedChip ?? ''}
          onChange={(value) => handleChipChange(value as ChipCategory | '')}
          placeholder="카테고리를 선택하세요"
          disabled={isPending}
        />

        {/* 장소 선택 */}
        <Select
          id="place"
          label="장소"
          required
          options={placeOptions}
          value={placeId}
          onChange={handlePlaceChange}
          placeholder={
            isLoadingPlaces
              ? '장소 목록 불러오는 중...'
              : selectedChip
                ? '장소를 선택하세요'
                : '카테고리를 먼저 선택하세요'
          }
          disabled={isPending || !selectedChip || isLoadingPlaces}
        />

        {/* 선택된 장소 정보 */}
        {placeId && selectedPlace && (
          <div className="rounded-lg bg-primary-50 p-4">
            <h4 className="text-sm font-medium text-primary-800">
              선택된 장소 정보
            </h4>
            <dl className="mt-2 space-y-2 text-sm text-primary-700">
              <div className="flex gap-2">
                <dt className="font-medium">ID:</dt>
                <dd>{selectedPlace.placeId}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="font-medium">이름:</dt>
                <dd>{selectedPlace.name}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="font-medium">현재 부가 이름:</dt>
                <dd>{selectedPlace.subName || '(없음)'}</dd>
              </div>
            </dl>
          </div>
        )}

        {/* 변경할 부가 이름 입력 */}
        <Input
          id="subName"
          label="변경할 부가 이름"
          required
          value={subName}
          onChange={(e) => setSubName(e.target.value)}
          placeholder="변경할 부가 이름을 입력하세요"
          disabled={isPending || !placeId}
        />

        {/* 결과 메시지 */}
        {isSuccess && (
          <Alert variant="success">
            장소 부가 이름이 성공적으로 수정되었습니다.
          </Alert>
        )}

        {isError && (
          <Alert variant="error">오류가 발생했습니다. 다시 시도해주세요.</Alert>
        )}

        {/* 버튼 */}
        <div className="flex items-center gap-3 pt-2">
          <Button
            type="submit"
            variant="primary"
            disabled={!isValid}
            isLoading={isPending}
          >
            {isPending ? '수정 중...' : '수정하기'}
          </Button>

          <Button
            type="button"
            variant="secondary"
            onClick={handleReset}
            disabled={isPending}
          >
            초기화
          </Button>
        </div>
      </form>
    </Card>
  );
}
