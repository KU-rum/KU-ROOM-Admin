import { CHIP_LABELS, type ChipCategory } from '@/entities/place';
import { useUpdateLocationForm } from '@/features/update-location';
import { Button, Card, Map, Select } from '@/shared/ui';

const chipOptions = Object.entries(CHIP_LABELS)
  .filter((item) => item[0] !== 'BUILDING')
  .map(([value, label]) => ({
    value,
    label,
  }));

export function UpdateLocationForm() {
  const {
    selectedChip,
    handleChipChange,
    places,
    isLoadingPlaces,
    placeId,
    handlePlaceChange,
    placeDetail,
    isLoadingPlaceDetail,
    isPending,
    location,
    handleChangeLocationCenter,
    isValid,
    handleSubmit,
    handleReset,
  } = useUpdateLocationForm();

  // 장소 옵션
  const placeOptions = places.map((place) => ({
    value: place.placeId.toString(),
    label: `${place.name}${place.subName ? ` (${place.subName})` : ''}`,
  }));

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
          disabled={isLoadingPlaces}
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
          disabled={!selectedChip || isLoadingPlaces}
        />

        {/* 선택된 장소 정보 */}
        {placeId && (
          <div className="rounded-lg bg-primary-50 p-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-primary-800">
                선택된 장소 정보
              </h4>
              {isLoadingPlaceDetail && (
                <span className="text-xs text-primary-600">불러오는 중...</span>
              )}
            </div>

            {placeDetail && (
              <dl className="mt-2 space-y-2 text-sm text-primary-700">
                <div className="flex gap-2">
                  <dt className="font-medium">ID:</dt>
                  <dd>{placeDetail.placeId}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="font-medium">이름:</dt>
                  <dd>{placeDetail.name}</dd>
                </div>
                {placeDetail.subName && (
                  <div className="flex gap-2">
                    <dt className="font-medium">부가 이름:</dt>
                    <dd>{placeDetail.subName}</dd>
                  </div>
                )}
                <div className="flex gap-2">
                  <dt className="font-medium">현재 위치:</dt>
                  <dd>
                    {placeDetail.latitude.toFixed(6)}{' '}
                    {placeDetail.longitude.toFixed(6)}
                  </dd>
                </div>
              </dl>
            )}
          </div>
        )}
        {placeDetail && (
          <div>
            <label
              id="center"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              변경할 위치 : {location?.lat.toFixed(6)}{' '}
              {location?.lng.toFixed(6)}
            </label>
            <Map
              handleChangeCenter={handleChangeLocationCenter}
              initialLocation={{
                lat: placeDetail.latitude,
                lng: placeDetail.longitude,
              }}
            />
          </div>
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
